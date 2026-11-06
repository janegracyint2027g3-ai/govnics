// api/_lib/knowledge-graph/knowledgeGraphService.js
// GOVENICS GRC — Enterprise Compliance Knowledge Graph Engine
// High-performance graph traversal, multi-entity relationship mapping,
// semantic research queries, path tracing, and cross-regulatory matrix discovery.

import fs from "fs";
import path from "path";

let GRAPH_CACHE = null;

export function invalidateGraphCache() {
  GRAPH_CACHE = null;
  NODE_INDEX.clear();
  ADJACENCY_OUT.clear();
  ADJACENCY_IN.clear();
  console.log('[knowledgeGraph] Cache invalidated — will reload from disk on next request.');
}
let ADJACENCY_OUT = new Map();
let ADJACENCY_IN = new Map();
let NODE_INDEX = new Map();

// ─── 1. Graph Data Loader & Indexer ──────────────────────────────────────────

export function loadKnowledgeGraph() {
  if (GRAPH_CACHE) return GRAPH_CACHE;

  const possiblePaths = [
    path.join(process.cwd(), "compliance_platform", "reports", "knowledge_graph.json"),
    path.join(process.cwd(), "..", "compliance_platform", "reports", "knowledge_graph.json"),
  ];

  let rawData = null;
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      try {
        rawData = JSON.parse(fs.readFileSync(p, "utf8"));
        break;
      } catch (err) {
        console.warn(`[knowledgeGraph] Error reading ${p}:`, err.message);
      }
    }
  }

  if (!rawData || !rawData.nodes || !rawData.edges) {
    console.warn("[knowledgeGraph] Graph file not found on disk, initializing minimal fallback graph.");
    rawData = {
      version: "2.0-research",
      generated_at: new Date().toISOString(),
      nodes: [],
      edges: []
    };
  }

  GRAPH_CACHE = rawData;
  rebuildIndexes(rawData);
  return GRAPH_CACHE;
}

function rebuildIndexes(graph) {
  NODE_INDEX.clear();
  ADJACENCY_OUT.clear();
  ADJACENCY_IN.clear();

  for (const node of graph.nodes || []) {
    NODE_INDEX.set(node.id, node);
    ADJACENCY_OUT.set(node.id, []);
    ADJACENCY_IN.set(node.id, []);
  }

  for (const edge of graph.edges || []) {
    const src = edge.source;
    const tgt = edge.target;
    const rel = edge.relation || edge.type || "CONNECTED_TO";

    if (!ADJACENCY_OUT.has(src)) ADJACENCY_OUT.set(src, []);
    if (!ADJACENCY_IN.has(tgt)) ADJACENCY_IN.set(tgt, []);

    ADJACENCY_OUT.get(src).push({ target: tgt, relation: rel, properties: edge.properties || {} });
    ADJACENCY_IN.get(tgt).push({ source: src, relation: rel, properties: edge.properties || {} });
  }
}

// ─── 2. Search & Filter Engine for Research ───────────────────────────────────

export function searchKnowledgeGraph(options = {}) {
  const graph = loadKnowledgeGraph();
  const {
    q = "",
    type = null,
    industry = null,
    offering = null,
    authority = null,
    limit = 50
  } = options;

  const searchLower = (q || "").toLowerCase().trim();
  const typeFilter = type && type !== "All" ? type.toLowerCase() : null;
  const industryFilter = industry && industry !== "All" ? industry.toLowerCase() : null;
  const offeringFilter = offering && offering !== "All" ? offering.toLowerCase() : null;

  const matchedNodes = [];

  for (const node of graph.nodes) {
    // Type filter
    if (typeFilter && node.type.toLowerCase() !== typeFilter) {
      continue;
    }

    // Text query matching label, id, and properties
    if (searchLower) {
      const labelMatch = (node.label || "").toLowerCase().includes(searchLower);
      const idMatch = (node.id || "").toLowerCase().includes(searchLower);
      const propsMatch = JSON.stringify(node.properties || {}).toLowerCase().includes(searchLower);

      if (!labelMatch && !idMatch && !propsMatch) {
        continue;
      }
    }

    // Contextual Industry / Offering filtering via 1-hop edges
    if (industryFilter || offeringFilter) {
      const outEdges = ADJACENCY_OUT.get(node.id) || [];
      const inEdges = ADJACENCY_IN.get(node.id) || [];
      const neighborIds = [
        ...outEdges.map(e => e.target.toLowerCase()),
        ...inEdges.map(e => e.source.toLowerCase())
      ];

      if (industryFilter && !neighborIds.some(id => id.includes(industryFilter))) {
        continue;
      }
      if (offeringFilter && !neighborIds.some(id => id.includes(offeringFilter))) {
        continue;
      }
    }

    // Attach immediate relationship metadata for research context
    const outConnections = (ADJACENCY_OUT.get(node.id) || []).map(e => ({
      targetId: e.target,
      targetLabel: NODE_INDEX.get(e.target)?.label || e.target,
      targetType: NODE_INDEX.get(e.target)?.type || "Unknown",
      relation: e.relation
    }));

    const inConnections = (ADJACENCY_IN.get(node.id) || []).map(e => ({
      sourceId: e.source,
      sourceLabel: NODE_INDEX.get(e.source)?.label || e.source,
      sourceType: NODE_INDEX.get(e.source)?.type || "Unknown",
      relation: e.relation
    }));

    matchedNodes.push({
      ...node,
      connections: {
        outgoing: outConnections,
        incoming: inConnections,
        totalDegree: outConnections.length + inConnections.length
      }
    });

    if (matchedNodes.length >= limit) break;
  }

  // Collect relevant connecting edges between matched nodes
  const matchedNodeIds = new Set(matchedNodes.map(n => n.id));
  const relevantEdges = graph.edges.filter(
    e => matchedNodeIds.has(e.source) || matchedNodeIds.has(e.target)
  );

  return {
    totalMatches: matchedNodes.length,
    query: { q, type, industry, offering },
    nodes: matchedNodes,
    edges: relevantEdges
  };
}

// ─── 3. Graph Traversal & Lineage Pathfinder ─────────────────────────────────

export function traverseGraph(rootId, depth = 2, relationFilter = null) {
  loadKnowledgeGraph();
  const maxDepth = Math.min(Math.max(1, parseInt(depth, 10) || 1), 3);
  const rootNode = NODE_INDEX.get(rootId);

  if (!rootNode) {
    return null;
  }

  const visitedNodeIds = new Set([rootId]);
  const collectedNodes = [rootNode];
  const collectedEdges = [];

  let currentFrontier = [rootId];

  for (let currentDepth = 1; currentDepth <= maxDepth; currentDepth++) {
    const nextFrontier = [];

    for (const currId of currentFrontier) {
      // 1. Outgoing relations
      const outEdges = ADJACENCY_OUT.get(currId) || [];
      for (const edge of outEdges) {
        if (relationFilter && edge.relation !== relationFilter) continue;

        collectedEdges.push({ source: currId, target: edge.target, relation: edge.relation });

        if (!visitedNodeIds.has(edge.target)) {
          visitedNodeIds.add(edge.target);
          const tgtNode = NODE_INDEX.get(edge.target);
          if (tgtNode) {
            collectedNodes.push(tgtNode);
            nextFrontier.push(edge.target);
          }
        }
      }

      // 2. Incoming relations
      const inEdges = ADJACENCY_IN.get(currId) || [];
      for (const edge of inEdges) {
        if (relationFilter && edge.relation !== relationFilter) continue;

        collectedEdges.push({ source: edge.source, target: currId, relation: edge.relation });

        if (!visitedNodeIds.has(edge.source)) {
          visitedNodeIds.add(edge.source);
          const srcNode = NODE_INDEX.get(edge.source);
          if (srcNode) {
            collectedNodes.push(srcNode);
            nextFrontier.push(edge.source);
          }
        }
      }
    }

    currentFrontier = nextFrontier;
    if (currentFrontier.length === 0) break;
  }

  // Deduplicate edges
  const uniqueEdgeMap = new Map();
  for (const e of collectedEdges) {
    const key = `${e.source}->${e.relation}->${e.target}`;
    uniqueEdgeMap.set(key, e);
  }

  return {
    root: rootNode,
    traversalDepth: maxDepth,
    nodeCount: collectedNodes.length,
    edgeCount: uniqueEdgeMap.size,
    nodes: collectedNodes,
    edges: Array.from(uniqueEdgeMap.values())
  };
}

// ─── 4. Full Entity Dossier Generator ─────────────────────────────────────────

export function getEntityDossier(entityId) {
  loadKnowledgeGraph();
  const node = NODE_INDEX.get(entityId);
  if (!node) return null;

  const outEdges = ADJACENCY_OUT.get(entityId) || [];
  const inEdges = ADJACENCY_IN.get(entityId) || [];

  const authorities = [];
  const sections = [];
  const obligations = [];
  const industries = [];
  const offerings = [];

  // Group incoming
  for (const e of inEdges) {
    const srcNode = NODE_INDEX.get(e.source);
    if (!srcNode) continue;
    if (srcNode.type === "Government_Authority") authorities.push(srcNode);
    if (srcNode.type === "Regulatory_Act") authorities.push(srcNode);
  }

  // Group outgoing
  for (const e of outEdges) {
    const tgtNode = NODE_INDEX.get(e.target);
    if (!tgtNode) continue;
    if (tgtNode.type === "Section_Provision") sections.push(tgtNode);
    else if (tgtNode.type === "Compliance_Obligation") obligations.push(tgtNode);
    else if (tgtNode.type === "Applicable_Industry") industries.push(tgtNode);
    else if (tgtNode.type === "Govenics_Offering") offerings.push(tgtNode);
    else if (tgtNode.type === "Government_Authority") authorities.push(tgtNode);
  }

  return {
    entity: node,
    dossier: {
      governingAuthorities: authorities,
      statutorySections: sections,
      complianceObligations: obligations,
      applicableIndustries: industries,
      alignedOfferings: offerings,
      totalConnectedEntities: authorities.length + sections.length + obligations.length + industries.length + offerings.length
    }
  };
}

// ─── 5. Graph Analytics & Cross-Regulatory Matrix ─────────────────────────────

export function getGraphAnalytics() {
  const graph = loadKnowledgeGraph();

  const nodeTypes = {};
  for (const n of graph.nodes) {
    nodeTypes[n.type] = (nodeTypes[n.type] || 0) + 1;
  }

  const relationshipTypes = {};
  for (const e of graph.edges) {
    const rel = e.relation || e.type || "UNKNOWN";
    relationshipTypes[rel] = (relationshipTypes[rel] || 0) + 1;
  }

  // Calculate highest-degree central nodes
  const nodeDegrees = [];
  for (const node of graph.nodes) {
    const outDeg = (ADJACENCY_OUT.get(node.id) || []).length;
    const inDeg = (ADJACENCY_IN.get(node.id) || []).length;
    nodeDegrees.push({
      id: node.id,
      label: node.label,
      type: node.type,
      degree: outDeg + inDeg,
      outDegree: outDeg,
      inDegree: inDeg
    });
  }

  nodeDegrees.sort((a, b) => b.degree - a.degree);

  return {
    summary: {
      totalNodes: graph.nodes.length,
      totalEdges: graph.edges.length,
      graphDensity: graph.nodes.length > 1
        ? (graph.edges.length / (graph.nodes.length * (graph.nodes.length - 1))).toFixed(4)
        : 0
    },
    nodeTypes,
    relationshipTypes,
    topHubEntities: nodeDegrees.slice(0, 10)
  };
}

// ─── 6. Exporter (Cypher, JSON, Adjacency List) ───────────────────────────────

export function exportKnowledgeGraph(format = "json") {
  const graph = loadKnowledgeGraph();

  if (format === "cypher") {
    // Generate Neo4j Cypher statements
    const lines = ["// GOVENICS Knowledge Graph Neo4j Export", ""];
    for (const n of graph.nodes) {
      const props = JSON.stringify(n.properties || {}).replace(/"([^"]+)":/g, "$1:");
      lines.push(`CREATE (:${n.type} {id: "${n.id}", label: "${(n.label || '').replace(/"/g, '\\"')}", properties: '${props}'});`);
    }
    lines.push("");
    for (const e of graph.edges) {
      const rel = e.relation || e.type || "RELATION";
      lines.push(`MATCH (a {id: "${e.source}"}), (b {id: "${e.target}"}) CREATE (a)-[:${rel}]->(b);`);
    }
    return lines.join("\n");
  }

  if (format === "adjacency") {
    const adj = {};
    for (const [id, edges] of ADJACENCY_OUT.entries()) {
      adj[id] = edges.map(e => `${e.relation}->${e.target}`);
    }
    return adj;
  }

  return graph;
}

