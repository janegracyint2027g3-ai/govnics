import fs from 'fs';
import path from 'path';

/**
 * GET /api/compliance/search
 * Enterprise search engine across regulatory documents, acts, sections, authorities and offerings.
 */
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const indexPath = path.join(process.cwd(), 'compliance_platform', 'reports', 'search_index_report.json');
    if (!fs.existsSync(indexPath)) {
      return res.status(404).json({ success: false, error: 'Search index not available.' });
    }

    const { q, offering, industry, jurisdiction, document_type } = req.query || {};
    const data = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
    let entries = data.entries || [];

    if (q) {
      const term = q.toLowerCase();
      entries = entries.filter(e => e.searchable_text.includes(term) || e.title.toLowerCase().includes(term));
    }
    if (offering) {
      entries = entries.filter(e => e.offering.toLowerCase() === offering.toLowerCase());
    }
    if (industry) {
      entries = entries.filter(e => e.industry.toLowerCase() === industry.toLowerCase());
    }
    if (jurisdiction) {
      entries = entries.filter(e => e.jurisdiction.toLowerCase() === jurisdiction.toLowerCase());
    }
    if (document_type) {
      entries = entries.filter(e => e.document_type.toLowerCase() === document_type.toLowerCase());
    }

    return res.status(200).json({
      success: true,
      total_matches: entries.length,
      results: entries
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
