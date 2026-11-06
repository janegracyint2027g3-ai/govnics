// api/_handlers/knowledge-graph/index.js
// GOVENICS GRC — Compliance Knowledge Graph Research API
// Pure backend: search, traversal, dossier, analytics, export.
// NO frontend UI — for research, pipeline querying, and semantic discovery only.

import {
  loadKnowledgeGraph,
  searchKnowledgeGraph,
  traverseGraph,
  getEntityDossier,
  getGraphAnalytics,
  exportKnowledgeGraph
} from '../../_lib/knowledge-graph/knowledgeGraphService.js';

import { setCorsHeaders, handleOptions } from '../../_lib/cors.js';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function successResponse(res, data, meta = {}) {
  if (!res.headersSent) {
    res.status(200).json({ success: true, ...meta, data });
  }
}

function errorResponse(res, message, status = 400, details = null) {
  if (!res.headersSent) {
    res.status(status).json({ success: false, error: message, ...(details ? { details } : {}) });
  }
}

// ─── Route Parser ─────────────────────────────────────────────────────────────
// Pathname shape: /api/knowledge-graph[/<sub>][/<id>]
// sub: search | node | traverse | analytics | export | reload | (empty → root)
// id : entity ID string (URL-encoded)

function parseKgPath(pathname) {
  // Strip leading /api/knowledge-graph
  const rest = pathname.replace(/^\/api\/knowledge-graph\/?/, '');
  const parts = rest.split('/').filter(Boolean);
  return {
    sub: parts[0] || 'root',
    entityId: parts[1] ? decodeURIComponent(parts[1]) : null
  };
}

// ─── Main Handler ─────────────────────────────────────────────────────────────

export default async function knowledgeGraphHandler(req, res) {
  setCorsHeaders(res);
  if (handleOptions(req, res)) return;

  const rawUrl = req.url || '/';
  const parsed = new URL(rawUrl, `https://${req.headers?.host || 'localhost'}`);
  const pathname = parsed.pathname.replace(/\/$/, '') || '/api/knowledge-graph';
  const qp = parsed.searchParams;

  const { sub, entityId } = parseKgPath(pathname);
  const method = (req.method || 'GET').toUpperCase();

  try {
    // ── GET /api/knowledge-graph ── full raw graph ──────────────────────────
    if (sub === 'root' || pathname === '/api/knowledge-graph') {
      if (method !== 'GET') return errorResponse(res, 'Method Not Allowed', 405);
      const graph = loadKnowledgeGraph();
      return successResponse(res, graph, {
        meta: {
          nodeCount: graph.nodes?.length ?? 0,
          edgeCount: graph.edges?.length ?? 0,
          version: graph.version || '2.0',
          generatedAt: graph.generated_at
        }
      });
    }

    // ── GET /api/knowledge-graph/search ── semantic search & filter ─────────
    if (sub === 'search') {
      if (method !== 'GET') return errorResponse(res, 'Method Not Allowed', 405);
      const opts = {
        q: qp.get('q') || '',
        type: qp.get('type') || null,
        industry: qp.get('industry') || null,
        offering: qp.get('offering') || null,
        authority: qp.get('authority') || null,
        limit: Math.min(parseInt(qp.get('limit') || '50', 10), 200)
      };
      const result = searchKnowledgeGraph(opts);
      return successResponse(res, result, { query: opts });
    }

    // ── GET /api/knowledge-graph/analytics ── graph metrics & hub entities ──
    if (sub === 'analytics') {
      if (method !== 'GET') return errorResponse(res, 'Method Not Allowed', 405);
      const analytics = getGraphAnalytics();
      return successResponse(res, analytics);
    }

    // ── GET /api/knowledge-graph/export?format=json|cypher|adjacency ────────
    if (sub === 'export') {
      if (method !== 'GET') return errorResponse(res, 'Method Not Allowed', 405);
      const format = qp.get('format') || 'json';
      const allowed = ['json', 'cypher', 'adjacency'];
      if (!allowed.includes(format)) {
        return errorResponse(res, `Invalid format. Allowed: ${allowed.join(', ')}`, 400);
      }
      const exported = exportKnowledgeGraph(format);
      if (format === 'cypher') {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.setHeader('Content-Disposition', 'attachment; filename="govenics_knowledge_graph.cypher"');
        return res.status(200).send(exported);
      }
      return successResponse(res, exported, { format });
    }

    // ── POST /api/knowledge-graph/reload ── invalidate in-memory cache ──────
    if (sub === 'reload') {
      if (method !== 'POST') return errorResponse(res, 'Method Not Allowed', 405);
      // Reset is handled by exporting a invalidate function from the service
      // We call loadKnowledgeGraph with a force flag approach via side-effect import
      const { invalidateGraphCache } = await import('../../_lib/knowledge-graph/knowledgeGraphService.js');
      if (typeof invalidateGraphCache === 'function') {
        invalidateGraphCache();
        const graph = loadKnowledgeGraph();
        return successResponse(res, {
          reloaded: true,
          nodeCount: graph.nodes?.length ?? 0,
          edgeCount: graph.edges?.length ?? 0
        });
      }
      return successResponse(res, { reloaded: false, reason: 'invalidateGraphCache not exported yet' });
    }

    // ── GET /api/knowledge-graph/node/:id ── entity dossier ─────────────────
    if (sub === 'node') {
      if (method !== 'GET') return errorResponse(res, 'Method Not Allowed', 405);
      const id = entityId || qp.get('id');
      if (!id) return errorResponse(res, 'Entity ID required. Use /api/knowledge-graph/node/<id> or ?id=<id>', 400);
      const dossier = getEntityDossier(id);
      if (!dossier) return errorResponse(res, `Entity not found: ${id}`, 404);
      return successResponse(res, dossier);
    }

    // ── GET /api/knowledge-graph/traverse/:id ── BFS traversal ──────────────
    if (sub === 'traverse') {
      if (method !== 'GET') return errorResponse(res, 'Method Not Allowed', 405);
      const id = entityId || qp.get('id');
      if (!id) return errorResponse(res, 'Entity ID required. Use /api/knowledge-graph/traverse/<id>', 400);
      const depth = parseInt(qp.get('depth') || '2', 10);
      const relation = qp.get('relation') || null;
      const traversal = traverseGraph(id, depth, relation);
      if (!traversal) return errorResponse(res, `Entity not found: ${id}`, 404);
      return successResponse(res, traversal, {
        traversalParams: { rootId: id, depth, relation }
      });
    }

    // ── Fallback ────────────────────────────────────────────────────────────
    return errorResponse(res, `Unknown knowledge-graph endpoint: ${pathname}`, 404);

  } catch (err) {
    console.error('[KnowledgeGraphAPI] Error:', err.message, err.stack);
    return errorResponse(res, 'Internal server error in Knowledge Graph API', 500, err.message);
  }
}
