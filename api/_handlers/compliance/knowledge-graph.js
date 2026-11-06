import fs from 'fs';
import path from 'path';

/**
 * GET /api/compliance/knowledge-graph
 * Serves the compliance knowledge graph nodes and edges.
 */
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const kgPath = path.join(process.cwd(), 'compliance_platform', 'reports', 'knowledge_graph.json');
    if (fs.existsSync(kgPath)) {
      const data = JSON.parse(fs.readFileSync(kgPath, 'utf8'));
      return res.status(200).json({ success: true, ...data });
    }
    return res.status(404).json({ success: false, error: 'Knowledge graph not yet generated.' });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
