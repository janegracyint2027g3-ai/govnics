import { getSession } from '../../_lib/auth.js';
import fs from 'fs';
import path from 'path';

/**
 * GET /api/cms-sync/status
 * Returns the latest CMS synchronization status report and mapping.
 */
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const reportPath = path.join(process.cwd(), 'content_sync', 'output', 'sync_report.json');
    const mappingPath = path.join(process.cwd(), 'content_sync', 'output', 'govenics_cms_mapping.json');

    let report = null;
    let mapping = null;

    if (fs.existsSync(reportPath)) {
      report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
    }
    if (fs.existsSync(mappingPath)) {
      mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));
    }

    return res.status(200).json({
      success: true,
      status: report ? 'configured' : 'initialized',
      last_sync: report?.timestamp || null,
      summary: report?.cms_summary || mapping?.summary || null,
      report,
      mapping_summary: mapping?.summary || null,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

