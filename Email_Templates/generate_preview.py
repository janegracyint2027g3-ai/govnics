#!/usr/bin/env python3
"""
Generates the interactive, standalone HTML Preview Gallery for the GOVENICS GRC Email Template Library.
Works directly over file:// without CORS issues.
Displays bespoke headlines, distinct salutations, category tags, and responsive previews.
"""

import os
import json

BASE_DIR = r"c:\Users\janeg\Downloads\govnics-main\govnics-main\Email_Templates"
MANIFEST_PATH = os.path.join(BASE_DIR, "config", "generation-manifest.json")
PREVIEW_HTML_PATH = os.path.join(BASE_DIR, "preview", "index.html")

with open(MANIFEST_PATH, "r", encoding="utf-8") as f:
    manifest_data = json.load(f)

manifest_json_str = json.dumps(manifest_data)

html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GOVENICS GRC — Enterprise Email Template Library & Preview Gallery</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    :root {{
      --bg-dark: #0A1628;
      --bg-mid: #0F223D;
      --bg-light: #F0F4F8;
      --card-bg: #FFFFFF;
      --primary: #1E40AF;
      --primary-hover: #1D4ED8;
      --gold: #B8942A;
      --border: #E2E8F0;
      --border-dark: #1E3A5F;
      --text-main: #0F172A;
      --text-muted: #64748B;
      --text-light: #94A3B8;
      --success: #059669;
    }}
    
    * {{ box-sizing: border-box; margin: 0; padding: 0; }}
    body {{
      font-family: 'Plus Jakarta Sans', sans-serif;
      background-color: var(--bg-light);
      color: var(--text-main);
      line-height: 1.5;
    }}
    
    /* Top Navigation */
    .top-nav {{
      background-color: var(--bg-dark);
      border-bottom: 2px solid var(--gold);
      padding: 18px 40px;
      color: #FFFFFF;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    }}
    .brand-title {{
      display: flex;
      align-items: center;
      gap: 14px;
    }}
    .brand-logo-text {{
      font-size: 20px;
      font-weight: 800;
      letter-spacing: 0.05em;
      color: #FFFFFF;
    }}
    .brand-sub {{
      font-size: 11px;
      color: #7FB3D3;
      padding-left: 14px;
      border-left: 1px solid var(--border-dark);
      letter-spacing: 0.03em;
    }}
    .nav-stats {{
      display: flex;
      gap: 16px;
    }}
    .stat-pill {{
      background-color: rgba(255,255,255,0.08);
      border: 1px solid rgba(255,255,255,0.15);
      border-radius: 9999px;
      padding: 6px 16px;
      font-size: 12px;
      font-weight: 600;
      color: #E2E8F0;
    }}
    .stat-pill span {{
      color: #93C5FD;
      font-weight: 800;
      margin-right: 4px;
    }}
    
    /* Hero Banner */
    .hero {{
      background: linear-gradient(135deg, var(--bg-dark) 0%, var(--bg-mid) 100%);
      color: #FFFFFF;
      padding: 44px 40px;
      border-bottom: 1px solid var(--border-dark);
    }}
    .hero-content {{
      max-width: 1400px;
      margin: 0 auto;
    }}
    .hero-tag {{
      display: inline-block;
      background-color: rgba(30, 64, 175, 0.3);
      border: 1px solid #3B82F6;
      color: #93C5FD;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 4px 12px;
      border-radius: 4px;
      margin-bottom: 14px;
    }}
    .hero h1 {{
      font-size: 30px;
      font-weight: 800;
      margin-bottom: 10px;
      letter-spacing: -0.02em;
    }}
    .hero p {{
      font-size: 14px;
      color: #94A3B8;
      max-width: 900px;
      line-height: 1.6;
    }}
    
    /* Main Layout */
    .main-container {{
      max-width: 1400px;
      margin: 28px auto;
      padding: 0 40px;
    }}
    
    /* Filter Panel */
    .filter-panel {{
      background-color: #FFFFFF;
      border-radius: 12px;
      padding: 22px;
      border: 1px solid var(--border);
      box-shadow: 0 2px 10px rgba(0,0,0,0.03);
      margin-bottom: 26px;
    }}
    .filter-row {{
      display: flex;
      flex-wrap: wrap;
      gap: 14px;
      margin-bottom: 14px;
      align-items: center;
    }}
    .filter-row:last-child {{
      margin-bottom: 0;
    }}
    .search-box {{
      flex: 1;
      min-width: 280px;
      position: relative;
    }}
    .search-box input {{
      width: 100%;
      padding: 11px 16px 11px 40px;
      border: 1px solid var(--border);
      border-radius: 8px;
      font-size: 14px;
      font-family: inherit;
      outline: none;
      transition: border-color 0.2s;
    }}
    .search-box input:focus {{
      border-color: var(--primary);
    }}
    .search-icon {{
      position: absolute;
      left: 14px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-muted);
      font-size: 15px;
    }}
    
    .filter-chips {{
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      align-items: center;
    }}
    .filter-label {{
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-muted);
      margin-right: 6px;
    }}
    .chip {{
      padding: 6px 13px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      border: 1px solid var(--border);
      background-color: #F8FAFC;
      color: var(--text-main);
      transition: all 0.2s;
    }}
    .chip:hover {{
      background-color: #E2E8F0;
    }}
    .chip.active {{
      background-color: var(--primary);
      color: #FFFFFF;
      border-color: var(--primary);
    }}
    
    /* Templates Grid */
    .templates-grid {{
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
      gap: 22px;
    }}
    .template-card {{
      background-color: #FFFFFF;
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 22px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: transform 0.2s, box-shadow 0.2s;
      box-shadow: 0 2px 8px rgba(0,0,0,0.02);
    }}
    .template-card:hover {{
      transform: translateY(-3px);
      box-shadow: 0 12px 24px rgba(0,0,0,0.06);
      border-color: #93C5FD;
    }}
    .card-badges {{
      display: flex;
      gap: 8px;
      margin-bottom: 12px;
      align-items: center;
    }}
    .badge {{
      font-size: 11px;
      font-weight: 700;
      padding: 4px 9px;
      border-radius: 4px;
      letter-spacing: 0.03em;
    }}
    .badge-industry {{
      background-color: #EFF6FF;
      color: #1E40AF;
      border: 1px solid #BFDBFE;
    }}
    .badge-type {{
      background-color: #F8FAFC;
      color: #0F172A;
      border: 1px solid #CBD5E1;
    }}
    .badge-words {{
      background-color: #F0F4F8;
      color: #1E40AF;
      border: 1px solid #BFDBFE;
      margin-left: auto;
      font-weight: 700;
    }}
    
    .card-category {{
      font-size: 10px;
      font-weight: 800;
      color: #1E40AF;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      margin-bottom: 6px;
    }}
    .card-title {{
      font-size: 16px;
      font-weight: 800;
      color: #0A1628;
      margin-bottom: 8px;
      line-height: 1.35;
    }}
    .card-salutation {{
      font-size: 12px;
      font-weight: 600;
      color: #334155;
      background-color: #F8FAFC;
      padding: 6px 10px;
      border-left: 3px solid #1E40AF;
      margin-bottom: 14px;
      border-radius: 0 4px 4px 0;
    }}
    
    .card-subjects {{
      background-color: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 6px;
      padding: 12px;
      margin-bottom: 18px;
    }}
    .card-subjects-title {{
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-muted);
      margin-bottom: 6px;
    }}
    .subject-opt {{
      font-size: 12px;
      color: #334155;
      margin-bottom: 4px;
      font-family: 'JetBrains Mono', monospace;
    }}
    .subject-opt:last-child {{
      margin-bottom: 0;
    }}
    
    .card-actions {{
      display: flex;
      gap: 10px;
      margin-top: auto;
    }}
    .btn {{
      padding: 10px 16px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 700;
      text-align: center;
      cursor: pointer;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: all 0.2s;
      border: none;
      font-family: inherit;
    }}
    .btn-primary {{
      background-color: var(--primary);
      color: #FFFFFF;
      flex: 1;
    }}
    .btn-primary:hover {{
      background-color: var(--primary-hover);
    }}
    .btn-secondary {{
      background-color: #F1F5F9;
      color: #334155;
      border: 1px solid var(--border);
    }}
    .btn-secondary:hover {{
      background-color: #E2E8F0;
    }}
    
    /* Modal */
    .modal-overlay {{
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(10, 22, 40, 0.75);
      backdrop-filter: blur(4px);
      z-index: 1000;
      justify-content: center;
      align-items: center;
      padding: 24px;
    }}
    .modal-overlay.active {{
      display: flex;
    }}
    .modal-container {{
      background-color: #FFFFFF;
      border-radius: 14px;
      width: 100%;
      max-width: 1100px;
      height: 90vh;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    }}
    .modal-header {{
      background-color: var(--bg-dark);
      color: #FFFFFF;
      padding: 16px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid var(--gold);
    }}
    .modal-header h3 {{
      font-size: 16px;
      font-weight: 700;
    }}
    .modal-device-toggles {{
      display: flex;
      gap: 8px;
    }}
    .device-btn {{
      padding: 6px 12px;
      border-radius: 4px;
      font-size: 12px;
      background-color: rgba(255,255,255,0.1);
      color: #FFFFFF;
      border: 1px solid rgba(255,255,255,0.2);
      cursor: pointer;
    }}
    .device-btn.active {{
      background-color: var(--primary);
      border-color: var(--primary);
    }}
    .close-btn {{
      background: none;
      border: none;
      color: #94A3B8;
      font-size: 24px;
      cursor: pointer;
      line-height: 1;
      padding: 0 6px;
    }}
    .close-btn:hover {{
      color: #FFFFFF;
    }}
    .modal-body {{
      display: flex;
      flex: 1;
      overflow: hidden;
      background-color: #E2E8F0;
    }}
    .iframe-wrapper {{
      flex: 1;
      display: flex;
      justify-content: center;
      padding: 20px;
      overflow-y: auto;
      transition: all 0.3s;
    }}
    .preview-frame {{
      border: none;
      background-color: #F0F4F8;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
      border-radius: 8px;
      width: 600px;
      height: 100%;
      min-height: 600px;
      transition: width 0.3s;
    }}
    .modal-sidebar {{
      width: 360px;
      background-color: #FFFFFF;
      border-left: 1px solid var(--border);
      padding: 22px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }}
    .meta-card {{
      background-color: #F8FAFC;
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 14px;
    }}
    .meta-card h4 {{
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--primary);
      margin-bottom: 8px;
    }}
    .meta-card p {{
      font-size: 13px;
      color: var(--text-main);
      line-height: 1.4;
    }}
  </style>
</head>
<body>

  <!-- Top Navigation -->
  <header class="top-nav">
    <div class="brand-title">
      <span class="brand-logo-text">GOVENICS GRC</span>
      <span class="brand-sub">Enterprise Bespoke Email Engine &bull; ISI Group (Est. 1985)</span>
    </div>
    <div class="nav-stats">
      <div class="stat-pill"><span>54</span> 100% Unique Templates</div>
      <div class="stat-pill"><span>9</span> Industry Clusters</div>
      <div class="stat-pill"><span>6</span> Distinct Email Types</div>
      <div class="stat-pill"><span>Blue & White</span> Palette</div>
    </div>
  </header>

  <!-- Hero Banner -->
  <section class="hero">
    <div class="hero-content">
      <div class="hero-tag">Bespoke Content System</div>
      <h1>GOVENICS Enterprise Email Template Library</h1>
      <p>
        Every single template features 100% custom, captivating copy tailored specifically to its industry sector and communication objective. Structured with distinct executive salutations, situation-pain-impact callouts, 3 numbered operational checks, and risk-free takeaways in an executive Blue and White palette.
      </p>
    </div>
  </section>

  <!-- Main Content -->
  <main class="main-container">
    
    <!-- Filter Panel -->
    <div class="filter-panel">
      <div class="filter-row">
        <div class="search-box">
          <span class="search-icon">&#128269;</span>
          <input type="text" id="searchInput" placeholder="Search templates by headline, salutation, subject, industry, or ID...">
        </div>
      </div>
      
      <div class="filter-row">
        <span class="filter-label">Industry:</span>
        <div class="filter-chips" id="industryFilters">
          <button class="chip active" data-industry="all">All Industries (9)</button>
          <button class="chip" data-industry="bfsi">BFSI</button>
          <button class="chip" data-industry="manufacturing">Manufacturing</button>
          <button class="chip" data-industry="technology">Technology</button>
          <button class="chip" data-industry="infrastructure">Infrastructure</button>
          <button class="chip" data-industry="energy">Energy & Utilities</button>
          <button class="chip" data-industry="healthcare">Healthcare</button>
          <button class="chip" data-industry="food-processing">Food Processing</button>
          <button class="chip" data-industry="consumer-retail">Consumer & Retail</button>
          <button class="chip" data-industry="media-services">Media & Services</button>
        </div>
      </div>

      <div class="filter-row">
        <span class="filter-label">Email Type:</span>
        <div class="filter-chips" id="typeFilters">
          <button class="chip active" data-type="all">All Types (6)</button>
          <button class="chip" data-type="welcome">Welcome</button>
          <button class="chip" data-type="promotional">Promotional</button>
          <button class="chip" data-type="business-value">Business-Value</button>
          <button class="chip" data-type="advertising">Advertising</button>
          <button class="chip" data-type="re-engagement">Re-Engagement</button>
          <button class="chip" data-type="lead-generation">Lead-Generation</button>
        </div>
      </div>
    </div>

    <!-- Templates Grid -->
    <div class="templates-grid" id="templatesGrid"></div>

  </main>

  <!-- Preview Modal -->
  <div class="modal-overlay" id="previewModal">
    <div class="modal-container">
      <div class="modal-header">
        <h3 id="modalTitle">Template Preview</h3>
        <div class="modal-device-toggles">
          <button class="device-btn active" id="btnDesktop" onclick="setDevice('desktop')">Desktop (600px)</button>
          <button class="device-btn" id="btnMobile" onclick="setDevice('mobile')">Mobile (375px)</button>
        </div>
        <button class="close-btn" onclick="closeModal()">&times;</button>
      </div>
      <div class="modal-body">
        <div class="iframe-wrapper">
          <iframe id="previewIframe" class="preview-frame" src=""></iframe>
        </div>
        <div class="modal-sidebar">
          <div class="meta-card">
            <h4>Headline & Salutation</h4>
            <p><strong>Headline:</strong> <span id="modalHeadline"></span></p>
            <p style="margin-top:6px;"><strong>Salutation:</strong> <span id="modalSalutation"></span></p>
          </div>
          <div class="meta-card">
            <h4>Subject Lines (All &le; 6 Words)</h4>
            <div id="modalSubjects"></div>
          </div>
          <div class="meta-card">
            <h4>Content Architecture</h4>
            <p><strong>Category:</strong> <span id="modalCategory"></span></p>
            <p style="margin-top:6px;"><strong>Word Count:</strong> <span id="modalWords"></span></p>
            <p style="margin-top:6px;"><strong>Color Theme:</strong> Blue & Pure White</p>
          </div>
          <div class="meta-card">
            <h4>Personalization Tokens</h4>
            <p style="font-family:'JetBrains Mono', monospace; font-size:11px; color:#1E40AF;">
              {{{{FIRST_NAME}}}}<br>
              {{{{COMPANY_NAME}}}}<br>
              {{{{UNSUBSCRIBE_URL}}}}
            </p>
          </div>
          <a id="modalOpenExternal" class="btn btn-secondary" href="" target="_blank" style="margin-top:auto;">
            Open in Full Tab &rarr;
          </a>
        </div>
      </div>
    </div>
  </div>

  <script>
    const TEMPLATES = {manifest_json_str};

    let selectedIndustry = 'all';
    let selectedType = 'all';
    let searchQuery = '';

    const gridEl = document.getElementById('templatesGrid');
    const searchInput = document.getElementById('searchInput');

    function renderTemplates() {{
      gridEl.innerHTML = '';
      
      const filtered = TEMPLATES.filter(tpl => {{
        const matchesIndustry = (selectedIndustry === 'all' || tpl.industry === selectedIndustry);
        const matchesType = (selectedType === 'all' || tpl.emailType === selectedType);
        
        const q = searchQuery.toLowerCase();
        const matchesSearch = !q || (
          tpl.industryName.toLowerCase().includes(q) ||
          tpl.emailTypeName.toLowerCase().includes(q) ||
          tpl.headline.toLowerCase().includes(q) ||
          tpl.salutation.toLowerCase().includes(q) ||
          tpl.primarySubject.toLowerCase().includes(q) ||
          tpl.categoryTag.toLowerCase().includes(q) ||
          tpl.templateId.toLowerCase().includes(q)
        );
        
        return matchesIndustry && matchesType && matchesSearch;
      }});

      if (filtered.length === 0) {{
        gridEl.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 48px; color: #64748B;">No email templates match your filter criteria.</div>';
        return;
      }}

      filtered.forEach(tpl => {{
        const card = document.createElement('div');
        card.className = 'template-card';
        
        const fileUrl = '../' + tpl.file;
        
        card.innerHTML = `
          <div>
            <div class="card-badges">
              <span class="badge badge-industry">${{tpl.industryName}}</span>
              <span class="badge badge-type">${{tpl.emailTypeName}}</span>
              <span class="badge badge-words">${{tpl.bodyWordCount}} words</span>
            </div>
            <div class="card-category">${{tpl.categoryTag}}</div>
            <h3 class="card-title">${{tpl.headline}}</h3>
            <div class="card-salutation">${{tpl.salutation}}</div>
            <div class="card-subjects">
              <div class="card-subjects-title">3 Subject Options (&le; 6 words):</div>
              <div class="subject-opt">1. ${{tpl.subjectLines[0]}}</div>
              <div class="subject-opt">2. ${{tpl.subjectLines[1]}}</div>
              <div class="subject-opt">3. ${{tpl.subjectLines[2]}}</div>
            </div>
          </div>
          <div class="card-actions">
            <button class="btn btn-primary" onclick="openModal('${{tpl.templateId}}')">
              Preview Template
            </button>
            <a class="btn btn-secondary" href="${{fileUrl}}" target="_blank">
              Open Tab
            </a>
          </div>
        `;
        gridEl.appendChild(card);
      }});
    }}

    // Filter Listeners
    document.getElementById('industryFilters').addEventListener('click', (e) => {{
      if (e.target.dataset.industry) {{
        document.querySelectorAll('#industryFilters .chip').forEach(c => c.classList.remove('active'));
        e.target.classList.add('active');
        selectedIndustry = e.target.dataset.industry;
        renderTemplates();
      }}
    }});

    document.getElementById('typeFilters').addEventListener('click', (e) => {{
      if (e.target.dataset.type) {{
        document.querySelectorAll('#typeFilters .chip').forEach(c => c.classList.remove('active'));
        e.target.classList.add('active');
        selectedType = e.target.dataset.type;
        renderTemplates();
      }}
    }});

    searchInput.addEventListener('input', (e) => {{
      searchQuery = e.target.value.trim();
      renderTemplates();
    }});

    // Modal Controls
    const modalEl = document.getElementById('previewModal');
    const iframeEl = document.getElementById('previewIframe');

    function openModal(templateId) {{
      const tpl = TEMPLATES.find(t => t.templateId === templateId);
      if (!tpl) return;

      document.getElementById('modalTitle').textContent = `${{tpl.industryName}} &bull; ${{tpl.emailTypeName}}`;
      iframeEl.src = '../' + tpl.file;
      
      const subHtml = tpl.subjectLines.map((s, i) => `<div style="font-size:12px; font-family:'JetBrains Mono',monospace; margin-bottom:4px;">${{i+1}}. ${{s}}</div>`).join('');
      document.getElementById('modalSubjects').innerHTML = subHtml;
      document.getElementById('modalHeadline').textContent = tpl.headline;
      document.getElementById('modalSalutation').textContent = tpl.salutation;
      document.getElementById('modalCategory').textContent = tpl.categoryTag;
      document.getElementById('modalWords').textContent = `${{tpl.bodyWordCount}} words`;
      
      document.getElementById('modalOpenExternal').href = '../' + tpl.file;
      modalEl.classList.add('active');
    }}

    function closeModal() {{
      modalEl.classList.remove('active');
      iframeEl.src = '';
    }}

    function setDevice(type) {{
      const frame = document.getElementById('previewIframe');
      const btnD = document.getElementById('btnDesktop');
      const btnM = document.getElementById('btnMobile');
      
      if (type === 'mobile') {{
        frame.style.width = '375px';
        btnM.classList.add('active');
        btnD.classList.remove('active');
      }} else {{
        frame.style.width = '600px';
        btnD.classList.add('active');
        btnM.classList.remove('active');
      }}
    }}

    // Close on overlay click
    modalEl.addEventListener('click', (e) => {{
      if (e.target === modalEl) closeModal();
    }});

    // Initial render
    renderTemplates();
  </script>
</body>
</html>"""

with open(PREVIEW_HTML_PATH, "w", encoding="utf-8") as f:
    f.write(html_content)

print(f"Interactive preview gallery successfully updated at: {PREVIEW_HTML_PATH}")
