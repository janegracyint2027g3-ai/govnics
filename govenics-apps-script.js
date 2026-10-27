/**
 * Trustgrid.ai – Universal Google Sheets Bridge (v3)
 * ─────────────────────────────────────────────────────────────────────────────
 * Handles ALL data submissions from the Trustgrid.ai website:
 *   • User Behavior analytics (93-field events)
 *   • Lead forms (Inbound Leads, Book for Consultation, Talk to Expert, etc.)
 *   • Traffic Analysis
 *
 * HOW TO DEPLOY:
 *  1. Paste this entire file into Google Apps Script (Extensions → Apps Script)
 *  2. Click Save (disk icon)
 *  3. Click Deploy → New Deployment
 *  4. Type: Web App | Execute as: Me | Who has access: Anyone
 *  5. Click Deploy → Authorize → Allow
 *  6. Copy the /exec URL → paste into Vercel env vars as VITE_GOOGLE_SCRIPT_URL and GOOGLE_SCRIPT_URL
 *  7. Redeploy your Vercel project
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ── Configuration ─────────────────────────────────────────────────────────────
const SPREADSHEET_ID = '1HLLZ_DfV-IPrw7i5c7lz323OpL77dFpAXkSkbAsuTSU';

// ── Email & Automation Configuration ──────────────────────────────────────────
const ADMIN_EMAIL = 'pooja@deeptrust.tech, bv@trustflow.in';
const PRIMARY_ADMIN = 'pooja@deeptrust.tech';

// SMTP Settings (Note: GAS uses GmailApp, these are stored for reference/tracking)
const SMTP_CONFIG = {
    username: 'pooja@deeptrust.tech',
    password: 'India@2050',
    outgoing_server: 'mail.deeptrust.tech',
    smtp_port: 465
};
/**
 * ── Spreadsheet UI Menu ──────────────────────────────────────────────────────
 * Adds a custom menu to the spreadsheet to refresh the dashboard.
 */
function onOpen() {
    const ui = SpreadsheetApp.getUi();
    ui.createMenu('🚀 Trustgrid Setup')
        .addItem('Refresh Analytics Dashboard', 'updateAnalyticsDashboard')
        .addSeparator()
        .addSubMenu(ui.createMenu('📊 Behaviour Analytics')
            .addItem('🔄 Refresh All Behaviour Analytics', 'refreshAllBehaviourAnalytics')
            .addSeparator()
            .addItem('📈 Update Engagement Metrics', 'updateEngagementMetrics')
            .addItem('🧠 Update Behaviour Metrics', 'updateBehaviourMetrics')
            .addItem('🚦 Update Traffic Analytics', 'updateTrafficAnalytics')
            .addItem('👤 Update User Behaviour Library', 'updateUserBehaviourLibrary')
            .addSeparator()
            .addItem('📋 Generate Daily Report', 'generateDailyReport')
            .addItem('📅 Generate Weekly Report', 'generateWeeklyReport')
            .addItem('📊 Update Reports & Trends', 'updateReportsAndTrends')
            .addSeparator()
            .addItem('⏰ Setup Cron Triggers', 'setupCronTriggers'))
        .addSeparator()
        .addItem('Run Email Test (Verify Config)', 'testEmail')
        .addSeparator()
        .addItem('Help & Documentation', 'showHelp')
        .addToUi();
}

function showHelp() {
    const message = 'The dashboard aggregates "User Behavior" data into rankings and visualizations.\n\n' +
        '1. Pareto Chart: Shows which pages drive the most traffic.\n' +
        '2. Map Chart: Visualizes global visitor distribution.\n' +
        '3. Weighted Ranking: Ranks pages by (Count × Total Duration).\n' +
        '4. Co-Occurrence Matrix: Relationships between pages (Duration / Page Count).\n' +
        '5. Time Analysis: Peak visitor hours (Morning, Evening, etc.).\n\n' +
        'Click "Refresh Dashboard" whenever you want to see the latest data.';
    SpreadsheetApp.getUi().alert('Analytics Help', message, SpreadsheetApp.getUi().ButtonSet.OK);
}

// Column order for User Behavior sheet (93 fields, strictly ordered)
const USER_BEHAVIOR_COLUMNS = [
    'ip_address', 'geo_country', 'geo_state', 'geo_city', 'geo_latitude', 'geo_longitude',
    'user_id', 'user_name', 'user_email', 'user_type', 'returning_user',
    'first_visit_timestamp', 'last_visit_timestamp', 'total_sessions', 'total_time_spent', 'avg_session_duration',
    'session_id', 'session_number', 'session_start_time', 'session_end_time',
    'total_session_duration', 'total_pages_visited', 'bounce',
    'traffic_source', 'referrer_url', 'campaign_name', 'utm_source', 'utm_medium',
    'utm_campaign', 'utm_term', 'utm_content',
    'page', 'page_url', 'previous_page', 'next_page', 'entry_page', 'exit_page',
    'page_title', 'time_on_page', 'scroll_percentage', 'max_scroll_depth',
    'interaction_count', 'inactivity_time',
    'event_id', 'event_name', 'event_category', 'event_action', 'event_label', 'section',
    'element_type', 'element_id', 'element_class', 'element_text',
    'click_position_x', 'click_position_y',
    'form_id', 'form_field_name', 'form_completion_status', 'form_abandonment',
    'goal_name', 'goal_completed', 'conversion_id', 'conversion_value', 'funnel_step',
    'device_type', 'device_brand', 'device_model', 'operating_system',
    'browser', 'browser_version', 'screen_width', 'screen_height',
    'viewport_width', 'viewport_height', 'language', 'timezone',
    'network_type', 'connection_speed', 'page_load_time', 'dom_load_time',
    'first_contentful_paint', 'largest_contentful_paint', 'time_to_interactive',
    'js_error_message', 'api_error_message', 'http_status_code',
    'cpu_cores', 'memory_size',
    'tab_visibility_status', 'back_button_used', 'copy_event', 'paste_event', 'rage_click_detected',
    'user_segment', 'timestamp'
];

// ── Main Entry Point ──────────────────────────────────────────────────────────
function doPost(e) {
    try {
        // Parse body — handles both JSON string and form-encoded data
        let body = {};
        if (e.postData && e.postData.contents) {
            body = JSON.parse(e.postData.contents);
        }

        const tableName = body.table || body.sheetName || 'Inbound Leads';
        const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

        // ── Route to correct handler ────────────────────────────────────────────
        if (tableName === 'User Behavior') {
            handleUserBehavior(ss, body);
        } else if (tableName === 'Chatbot Leads') {
            handleChatbotLead(ss, body);
        } else if (tableName === 'CareerApplications') {
            handleCareerApplication(ss, body);
        } else {
            handleLeadForm(ss, tableName, body);
        }

        return buildResponse({ status: 'success', table: tableName, dashboardUpdated: true });

    } catch (err) {
        console.error('doPost error:', err);
        return buildResponse({ status: 'error', message: err.toString() });
    }
}

// Also handle GET (for testing the script is live)
function doGet(e) {
    return buildResponse({ status: 'ok', message: 'Trustgrid Analytics Bridge is running.' });
}

// ── User Behavior Handler ─────────────────────────────────────────────────────
function handleUserBehavior(ss, body) {
    const name = 'User Behavior';
    let sheet = ss.getSheetByName(name);
    if (!sheet) {
        sheet = ss.insertSheet(name);
        sheet.appendRow(USER_BEHAVIOR_COLUMNS);
        sheet.getRange(1, 1, 1, USER_BEHAVIOR_COLUMNS.length).setFontWeight('bold').setBackground('#1e293b').setFontColor('#ffffff');
        sheet.setFrozenRows(1);
    }

    let events = [];
    if (body.events && Array.isArray(body.events)) {
        events = body.events;
    } else if (body.fields) {
        events = [body.fields];
    } else {
        events = [body];
    }

    if (events.length === 0) return;
    
    // Filter out localhost data
    events = events.filter(function(event) {
        if (!event.page_url) return true;
        const pageUrl = event.page_url.toLowerCase();
        return !pageUrl.includes("localhost") && !pageUrl.includes("127.0.0.1");
    });
    if (events.length === 0) return;

    let currentHeaders = sheet.getRange(1, 1, 1, Math.max(1, sheet.getLastColumn())).getValues()[0];
    let headerMap = {};
    currentHeaders.forEach(function (h, i) { if (h) headerMap[h] = i + 1; });

    let allRequiredHeaders = [...USER_BEHAVIOR_COLUMNS];
    Object.keys(events[0]).forEach(function (key) {
        if (key !== 'table' && !allRequiredHeaders.includes(key) && !headerMap[key]) {
            allRequiredHeaders.push(key);
        }
    });

    let newHeaders = [...currentHeaders];
    let headersChanged = false;
    allRequiredHeaders.forEach(function (h) {
        if (!headerMap[h]) {
            newHeaders.push(h);
            headerMap[h] = newHeaders.length;
            headersChanged = true;
        }
    });

    if (headersChanged) {
        sheet.getRange(1, 1, 1, newHeaders.length).setValues([newHeaders]);
        sheet.getRange(1, 1, 1, newHeaders.length).setFontWeight('bold').setBackground('#1e293b').setFontColor('#ffffff');
        currentHeaders = newHeaders;
    }

    events.forEach(function (event) {
        const row = currentHeaders.map(function (h) {
            if (h === 'timestamp' || h === 'Timestamp') return new Date().toISOString();
            const val = event[h];
            if (val === null || val === undefined) return '';
            if (typeof val === 'boolean') return val.toString();
            return val;
        });
        sheet.appendRow(row);
    });
}

// ── Lead Form Handler ─────────────────────────────────────────────────────────
function handleLeadForm(ss, tableName, body) {
    const sheet = getOrCreateSheet(ss, tableName, null);
    let dataFields = {};
    if (body.fields && typeof body.fields === 'object' && !Array.isArray(body.fields)) {
        dataFields = body.fields;
    } else {
        const { table, sheetName, ...rest } = body;
        dataFields = rest;
    }

    if (!dataFields['Timestamp'] && !dataFields['submitted_at']) {
        dataFields['Timestamp'] = new Date().toISOString();
    }

    if (sheet.getLastRow() === 0) {
        const headers = Object.keys(dataFields);
        sheet.appendRow(headers);
        const headerRange = sheet.getRange(1, 1, 1, headers.length);
        headerRange.setFontWeight('bold').setBackground('#1e293b').setFontColor('#ffffff');
        sheet.setFrozenRows(1);
    }

    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const row = headers.map(function (h) {
        if (h === 'Timestamp') return new Date().toISOString();
        return dataFields[h] !== undefined ? dataFields[h] : '';
    });

    sheet.appendRow(row);

    // ── Post-Submission Actions ─────────────────────────────────────────────
    try {
        // 1. Internal Notification (Let the team know)
        sendInternalNotification(dataFields, tableName);

        // 2. User Acknowledgement (Thank the customer)
        sendConfirmationEmail(dataFields, tableName);

        // 3. Specialized handlers
        if (tableName === 'Book for Consultation') {
            handleConsultationInvite(dataFields);
        }
    } catch (e) {
        console.error('Post-submission error:', e);
        logToSystem('Action failed for ' + tableName + ': ' + e.toString());
    }
}

/**
 * ── Internal Lead Notification (For Admin) ──────────────────────────────────
 * Sends a professional 'Lead Report' to pooja@deeptrust.tech.
 */
function sendInternalNotification(dataFields, tableName) {
    const userName = dataFields['First Name'] || dataFields['Name'] || 'New Prospect';
    const userEmail = dataFields['Email'] || dataFields['email'] || dataFields['Work Email'] || 'N/A';
    const logoUrl = 'https://trustgrid.ai/brand-icon.png';

    const subject = `🚀 [NEW LEAD] ${tableName} - ${userName}`;

    const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&display=swap');
            body { font-family: 'Outfit', sans-serif; background-color: #f1f5f9; margin: 0; padding: 0; }
        </style>
    </head>
    <body style="margin: 0; padding: 40px 0; background-color: #f1f5f9;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);">
            <div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 40px; text-align: center;">
                <img src="${logoUrl}" alt="TrustGrid AI" style="width: 140px; margin-bottom: 20px;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">New Lead Generated</h1>
                <p style="color: #94a3b8; margin: 10px 0 0 0;">Source: ${tableName}</p>
            </div>
            <div style="padding: 40px;">
                <div style="border-left: 4px solid #3b82f6; padding-left: 20px; margin-bottom: 30px;">
                    <h2 style="margin: 0; font-size: 18px; color: #1e293b;">Lead Captured</h2>
                    <p style="margin: 5px 0 0 0; color: #64748b;">${new Date().toLocaleString()}</p>
                </div>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                    ${Object.entries(dataFields)
            .filter(([key]) => !['Timestamp', 'table', 'submitted_at', 'id'].includes(key))
            .map(([key, value]) => `
                        <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 500;">${key}</td>
                            <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: 600; text-align: right;">${value}</td>
                        </tr>
                    `).join('')}
                </table>
                <div style="text-align: center;">
                    <a href="https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}" style="display: inline-block; background-color: #3b82f6; color: #ffffff; padding: 16px 32px; border-radius: 12px; text-decoration: none; font-weight: 600; box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.5);">Open Spreadsheet</a>
                </div>
            </div>
            <div style="background-color: #f8fafc; padding: 20px; text-align: center; color: #94a3b8; font-size: 12px;">
                Lead automation powered by TrustGrid AI System
            </div>
        </div>
    </body>
    </html>
    `;

    try {
        GmailApp.sendEmail(ADMIN_EMAIL, subject, "", {
            htmlBody: htmlBody,
            name: "TrustGrid AI Lead Engine",
            replyTo: userEmail
        });
        console.log('Internal lead alert sent.');
    } catch (err) {
        console.error('Internal Notification Error:', err);
    }
}

function logToSystem(message) {
    try {
        const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
        const logSheet = getOrCreateSheet(ss, "System Logs", ["Timestamp", "Status/Message"]);
        logSheet.appendRow([new Date().toLocaleString(), message]);
        // Keep logs slightly cleaner by auto-resizing
        logSheet.autoResizeColumns(1, 2);
    } catch (err) {
        console.error('Logging failed:', err);
    }
}

function getOrCreateSheet(ss, name, columns) {
    let sheet = ss.getSheetByName(name);
    if (!sheet) sheet = ss.insertSheet(name);
    if (columns && (sheet.getLastRow() === 0)) {
        sheet.appendRow(columns);
        sheet.getRange(1, 1, 1, columns.length).setFontWeight('bold').setBackground('#1e293b').setFontColor('#ffffff');
        sheet.setFrozenRows(1);
    }
    return sheet;
}

/**
 * ── professional User Acknowledgement Email ──────────────────────────────────
 * A premium 'Thank You' email for the customer.
 */
function sendConfirmationEmail(dataFields, tableName) {
    const userEmail = dataFields['Email'] || dataFields['email'] || dataFields['Work Email'] || dataFields['Email Address'] || dataFields['user_email'];
    const userName = dataFields['First Name'] || dataFields['Name'] || dataFields['user_name'] || 'there';
    const logoUrl = 'https://trustgrid.ai/brand-icon.png';

    if (!userEmail) return;

    let subject = "Confirmed: Your Inquiry with TrustGrid.AI";
    let headerTitle = "We've Received Your Request";
    let welcomeMsg = "Thank you for reaching out to TrustGrid.AI. We've received your request and our acceleration team is already looking into how we can best support your goals.";

    if (tableName === 'Book for Consultation') {
        subject = "Scheduled: Your TrustGrid.AI Consultation Request";
        headerTitle = "Consultation Confirmed";
        welcomeMsg = "We're excited to partner with you. A senior strategist is reviewing your details to ensure our upcoming session is tailored precisely to your revenue challenges.";
    }

    const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&display=swap');
            body { font-family: 'Outfit', sans-serif; color: #0f172a; margin: 0; padding: 0; }
        </style>
    </head>
    <body style="margin: 0; padding: 0; background-color: #ffffff;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
                <td align="center" style="padding: 40px 0;">
                    <div style="max-width: 600px; text-align: left; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
                        <!-- Gradient Header -->
                        <div style="background: linear-gradient(to right, #2563eb, #1d4ed8); padding: 60px 40px; text-align: center;">
                            <img src="${logoUrl}" alt="TrustGrid AI" style="width: 150px; margin-bottom: 30px;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -0.02em;">${headerTitle}</h1>
                        </div>

                        <!-- Content Body -->
                        <div style="padding: 50px 40px;">
                            <p style="font-size: 18px; line-height: 1.6; margin-bottom: 25px;">Hi ${userName},</p>
                            <p style="font-size: 17px; line-height: 1.6; color: #334155; margin-bottom: 35px;">${welcomeMsg}</p>
                            
                            <!-- Detail Card -->
                            <div style="background-color: #f8fafc; border: 1px dotted #cbd5e1; border-radius: 10px; padding: 30px; margin-bottom: 40px;">
                                <h3 style="margin: 0 0 20px 0; font-size: 14px; text-transform: uppercase; color: #64748b; letter-spacing: 0.1em;">Request Summary</h3>
                                <table width="100%" style="font-size: 15px;">
                                    ${Object.entries(dataFields)
            .filter(([key]) => !['Timestamp', 'table', 'submitted_at'].includes(key))
            .map(([key, value]) => `
                                        <tr>
                                            <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;">${key}</td>
                                            <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; text-align: right;">${value}</td>
                                        </tr>
                                    `).join('')}
                                </table>
                            </div>

                            <div style="text-align: center;">
                                <a href="https://trustgrid.ai" style="display: inline-block; background-color: #0f172a; color: #ffffff; padding: 18px 40px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">Visit TrustGrid Website</a>
                            </div>

                            <p style="margin-top: 50px; border-top: 1px solid #f1f5f9; padding-top: 30px; font-size: 15px; color: #64748b;">
                                Best regards,<br>
                                <span style="color: #0f172a; font-weight: 700; font-size: 18px;">The TrustGrid AI Team</span>
                            </p>
                        </div>

                        <!-- Professional Footer -->
                        <div style="background-color: #f8fafc; padding: 40px; border-top: 1px solid #f1f5f9; text-align: center;">
                            <h2 style="font-size: 16px; margin-bottom: 10px;">TrustGrid.AI</h2>
                            <p style="color: #94a3b8; font-size: 13px; margin-bottom: 20px;">
                                501 E Kennedy Blvd Suite 1400, Tampa, FL 33602<br>
                                Enterprise-Grade Revenue Intelligence
                            </p>
                            <div style="font-size: 13px;">
                                <a href="https://trustgrid.ai" style="color: #2563eb; text-decoration: none; margin: 0 10px;">Website</a>
                                <a href="https://trustgrid.ai/privacy" style="color: #2563eb; text-decoration: none; margin: 0 10px;">Privacy Policy</a>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `;

    try {
        GmailApp.sendEmail(userEmail, subject, "", {
            htmlBody: htmlBody,
            name: "TrustGrid AI Notification",
            replyTo: PRIMARY_ADMIN
        });
        console.log('Acknowledgement sent to client.');
    } catch (err) {
        console.error('Acknowledgement Email Error:', err);
    }
}

function handleConsultationInvite(dataFields) {
    const userEmail = dataFields['Email'] || dataFields['email'] || dataFields['Work Email'] || dataFields['Email Address'];
    const userName = dataFields['First Name'] || dataFields['Name'] || 'Guest';
    const dateStr = dataFields['Preferred Date'];
    const timeStr = dataFields['Preferred Time'];

    if (!userEmail || !dateStr || !timeStr) return;

    try {
        const start = new Date(dateStr + 'T' + timeStr + ':00');
        if (isNaN(start.getTime())) return;
        const end = new Date(start.getTime() + 30 * 60 * 1000); // 30 mins

        CalendarApp.getDefaultCalendar().createEvent(
            'Consultation: TrustGrid AI x ' + userName,
            start,
            end,
            {
                guests: userEmail,
                sendInvites: true,
                description: 'TrustGrid AI Consultation Session'
            }
        );
    } catch (e) {
        console.error('Calendar Error:', e);
    }
}

function testEmail() {
    const ui = SpreadsheetApp.getUi();
    try {
        GmailApp.sendEmail(ADMIN_EMAIL, "TrustGrid AI System Test", "If you see this, your email automation is authorized!");
        ui.alert('Success!', 'A test email has been sent to ' + ADMIN_EMAIL + '. Please check your inbox.', ui.ButtonSet.OK);
    } catch (err) {
        ui.alert('Test Failed', 'Error: ' + err.toString(), ui.ButtonSet.OK);
    }
}

function logToSystem(message) {
    try {
        const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
        const logSheet = getOrCreateSheet(ss, "System Logs", ["Timestamp", "Status/Message"]);
        logSheet.appendRow([new Date().toLocaleString(), message]);
        logSheet.autoResizeColumns(1, 2);
    } catch (err) {
        console.error('Logging failed:', err);
    }
}

// ── Analytics Dashboard Engine ───────────────────────────────────────────────

function updateAnalyticsDashboard() {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sourceSheet = ss.getSheetByName('User Behavior');
    if (!sourceSheet || sourceSheet.getLastRow() < 2) return;

    const data = sourceSheet.getDataRange().getValues();
    const headers = data[0];
    const pageUrlIdx = headers.indexOf('page_url');
    // Filter out localhost data from the entire set
    const rows = data.slice(1).filter(function (row) {
        const url = (row[pageUrlIdx] || '').toLowerCase();
        return !url.includes('localhost') && !url.includes('127.0.0.1');
    });

    const pageIdx = headers.indexOf('page');
    const durationIdx = headers.indexOf('time_on_page');
    const countryIdx = headers.indexOf('geo_country');
    const segmentIdx = headers.indexOf('user_segment');

    const pageStats = {};
    const countryStats = {};
    const segmentStats = {};
    let totalVisits = 0;

    rows.forEach(function (row) {
        const page = row[pageIdx] || 'Unknown';
        const duration = parseFloat(row[durationIdx]) || 0;
        const country = row[countryIdx] || 'Unknown';
        const segment = row[segmentIdx] || 'Casual Browser';

        if (!pageStats[page]) pageStats[page] = { count: 0, totalDuration: 0 };
        pageStats[page].count++;
        pageStats[page].totalDuration += duration;
        totalVisits++;

        if (!countryStats[country]) countryStats[country] = 0;
        countryStats[country]++;

        if (!segmentStats[segment]) segmentStats[segment] = 0;
        segmentStats[segment]++;
    });

    let pageRanking = Object.keys(pageStats).map(function (page) {
        const stats = pageStats[page];
        const durationSeconds = stats.totalDuration / 1000;
        const avgDuration = durationSeconds / stats.count;
        const weight = stats.count * (durationSeconds / 60);
        return [page, stats.count, durationSeconds, avgDuration, weight];
    });

    pageRanking.sort(function (a, b) { return b[1] - a[1]; });

    let cumulativeCount = 0;
    pageRanking = pageRanking.map(function (row) {
        cumulativeCount += row[1];
        return [...row, (cumulativeCount / totalVisits)];
    });

    const geoRanking = Object.keys(countryStats).map(function (c) { return [c, countryStats[c]]; }).sort(function (a, b) { return b[1] - a[1]; });
    const mapData = geoRanking.filter(function (r) {
        const c = r[0].toLowerCase();
        return c !== 'unknown' && c !== 'unknown country' && c !== 'undefined' && c !== '';
    });
    const segmentRanking = Object.keys(segmentStats).map(function (s) { return [s, segmentStats[s]]; }).sort(function (a, b) { return b[1] - a[1]; });

    let dashSheet = ss.getSheetByName('Analytics Dashboard');
    if (!dashSheet) dashSheet = ss.insertSheet('Analytics Dashboard');
    dashSheet.clear();

    const headStyle = { fontWeight: 'bold', background: '#2563eb', fontColor: '#ffffff' };

    // 1. Summary Table (Sorted by Count)
    writeTable(dashSheet, 1, 1, ['Page Name', 'Visit Count', 'Total Duration (s)', 'Avg Duration (s)', 'Engagement Score', 'Cumulative %'], pageRanking, headStyle);

    // 2. Page Ranking by Duration (Sorted by Duration)
    const pageRankingByDuration = [...pageRanking].sort(function (a, b) { return b[2] - a[2]; });
    writeTable(dashSheet, pageRanking.length + 4, 1, ['Page Name (by Duration)', 'Duration (s)'], pageRankingByDuration.map(r => [r[0], r[2]]), headStyle);

    // 3. Page Ranking by Engagement (Sorted by Score)
    const pageRankingByWeight = [...pageRanking].sort(function (a, b) { return b[4] - a[4]; });
    writeTable(dashSheet, (pageRanking.length * 2) + 7, 1, ['Page Name (by Score)', 'Engagement Score'], pageRankingByWeight.map(r => [r[0], r[4]]), headStyle);

    // 4. Geo and Segment Tables
    writeTable(dashSheet, 1, 8, ['Country', 'Visitor Count'], geoRanking, headStyle);
    writeTable(dashSheet, geoRanking.length + 4, 8, ['User Segment', 'Event Count'], segmentRanking, headStyle);

    // 5. Build Map Data (Placed at a fixed offset to avoid calculation errors)
    const mapStartRow = 100; // Place map data far down out of sight
    writeTable(dashSheet, mapStartRow, 1, ['Country', 'Visitors'], mapData, headStyle);

    dashSheet.getRange(2, 6, pageRanking.length, 1).setNumberFormat('0.0%');
    dashSheet.autoResizeColumns(1, 15);

    buildDashboardCharts(dashSheet, pageRanking.length, mapData.length, segmentRanking.length, mapStartRow);
    updateTimeAnalysis(ss, rows, headers);
    updateCoOccurrenceMatrix(ss, rows, headers);
}

function writeTable(sheet, startRow, startCol, headers, data, style) {
    if (data.length === 0) return;
    sheet.getRange(startRow, startCol, 1, headers.length).setValues([headers]).setFontWeight(style.fontWeight).setBackground(style.background).setFontColor(style.fontColor);
    sheet.getRange(startRow + 1, startCol, data.length, headers.length).setValues(data);
}

function buildDashboardCharts(sheet, pageCount, mapCount, segmentCount, mapStartRow) {
    const existing = sheet.getCharts();
    existing.forEach(function (c) { sheet.removeChart(c); });

    const chartWidth = 550;
    const chartHeight = 350;
    const labelRange = sheet.getRange(1, 1, pageCount + 1, 1);
    const countRange = sheet.getRange(1, 2, pageCount + 1, 1);
    const durationRange = sheet.getRange(1, 3, pageCount + 1, 1);
    const weightRange = sheet.getRange(1, 5, pageCount + 1, 1);
    const cumulativeRange = sheet.getRange(1, 6, pageCount + 1, 1);

    // 1. Page Ranking by Count
    const countChart = sheet.newChart()
        .setChartType(Charts.ChartType.BAR)
        .addRange(labelRange).addRange(countRange)
        .setPosition(2, 11, 0, 0)
        .setOption('title', 'Top Pages (by Visit Count)')
        .setOption('width', chartWidth).setOption('height', chartHeight).build();
    sheet.insertChart(countChart);

    // 2. Page Ranking by Session Duration
    const durationChart = sheet.newChart()
        .setChartType(Charts.ChartType.BAR)
        .addRange(labelRange).addRange(durationRange)
        .setPosition(2, 19, 0, 0)
        .setOption('title', 'Top Pages (by Total Duration s)')
        .setOption('width', chartWidth).setOption('height', chartHeight).build();
    sheet.insertChart(durationChart);

    // 3. Page Ranking by Count X Duration (Weight)
    const weightChart = sheet.newChart()
        .setChartType(Charts.ChartType.COLUMN)
        .addRange(labelRange).addRange(weightRange)
        .setPosition(20, 11, 0, 0)
        .setOption('title', 'Engagement Score (Count x Duration)')
        .setOption('width', chartWidth).setOption('height', chartHeight).build();
    sheet.insertChart(weightChart);

    // 4. Pareto Analysis
    const paretoChart = sheet.newChart()
        .setChartType(Charts.ChartType.COMBO)
        .addRange(labelRange).addRange(countRange).addRange(cumulativeRange)
        .setPosition(20, 19, 0, 0)
        .setOption('title', 'Pareto Analysis (80/20 Traffic)')
        .setOption('series', { 0: { type: 'bars' }, 1: { type: 'line', targetAxisIndex: 1 } })
        .setOption('width', chartWidth).setOption('height', chartHeight).build();
    sheet.insertChart(paretoChart);

    // 5. Google Map Graph
    if (mapCount > 0) {
        const geoRange = sheet.getRange(mapStartRow, 1, mapCount + 1, 2);
        const mapChart = sheet.newChart()
            .setChartType(Charts.ChartType.GEO)
            .addRange(geoRange)
            .setPosition(38, 11, 0, 0)
            .setOption('title', 'Global Traffic Distribution (Map)')
            .setOption('width', chartWidth * 2)
            .setOption('height', 450)
            .setOption('region', 'world')
            .setOption('displayMode', 'regions')
            .setOption('colorAxis', { colors: ['#e3f2fd', '#1565c0'] }) // Soft to Deep blue
            .build();
        sheet.insertChart(mapChart);
    }
}

/**
 * Redesigned Co-Occurrence Matrix (Pure Heatmap Chart Look)
 */
function updateCoOccurrenceMatrix(ss, rows, headers) {
    const pageIdx = headers.indexOf('page');
    const sessionIdIdx = headers.indexOf('session_id');
    const timeOnPageIdx = headers.indexOf('time_on_page');
    if (pageIdx === -1 || sessionIdIdx === -1) return;

    const sessionData = {};
    const allPagesSet = new Set();

    rows.forEach(function (row) {
        const sid = row[sessionIdIdx];
        const page = row[pageIdx] || 'Unknown';
        const duration = parseFloat(row[timeOnPageIdx]) || 0;
        if (!sid) return;
        allPagesSet.add(page);
        if (!sessionData[sid]) { sessionData[sid] = { pages: new Set(), totalDuration: 0 }; }
        sessionData[sid].pages.add(page);
        sessionData[sid].totalDuration += duration;
    });

    const pageList = Array.from(allPagesSet).sort();
    if (pageList.length === 0) return;

    // Initialize Matrix and Occurrence Tally
    const matrix = {};
    const countMatrix = {};
    pageList.forEach(function (p1) {
        matrix[p1] = {};
        countMatrix[p1] = {};
        pageList.forEach(function (p2) {
            matrix[p1][p2] = 0;
            countMatrix[p1][p2] = 0;
        });
    });

    // Populate Matrix
    Object.values(sessionData).forEach(function (session) {
        const uniquePages = Array.from(session.pages);
        if (uniquePages.length === 0) return;

        // Base value: (Total Session Duration / Unique Pages)
        // We accumulate this across all sessions where these pages co-occur
        const val = (session.totalDuration / uniquePages.length);

        uniquePages.forEach(function (p1) {
            uniquePages.forEach(function (p2) {
                matrix[p1][p2] += val;
                countMatrix[p1][p2]++;
            });
        });
    });

    // Calculate final Average (and convert to seconds)
    pageList.forEach(function (p1) {
        pageList.forEach(function (p2) {
            if (countMatrix[p1][p2] > 0) {
                // Average milliseconds / 1000 = Average Seconds
                matrix[p1][p2] = (matrix[p1][p2] / countMatrix[p1][p2]) / 1000;
            }
        });
    });


    let sheet = ss.getSheetByName('Co-Occurrence Matrix');
    if (!sheet) sheet = ss.insertSheet('Co-Occurrence Matrix');
    sheet.clear();

    const output = [];
    pageList.forEach(function (p1) {
        const row = [p1];
        pageList.forEach(function (p2) { row.push(matrix[p1][p2]); });
        output.push(row);
    });
    output.push(['', ...pageList]);

    const fullRange = sheet.getRange(1, 1, output.length, output[0].length);
    fullRange.setValues(output);

    const rowCount = pageList.length;
    const colCount = pageList.length;
    const cellSize = 45;

    if (rowCount > 0) {
        sheet.setRowHeights(1, rowCount, cellSize);
        sheet.setRowHeight(rowCount + 1, 150); // Larger space for angled labels
        for (let i = 2; i <= colCount + 1; i++) {
            sheet.setColumnWidth(i, cellSize + 10);
        }
    }
    sheet.autoResizeColumn(1);

    if (rowCount > 0 && colCount > 0) {
        const dataRange = sheet.getRange(1, 2, rowCount, colCount);
        dataRange.setFontSize(8)
            .setHorizontalAlignment('center')
            .setVerticalAlignment('middle')
            .setNumberFormat('0') // Round to nearest second for readability
            .setBorder(true, true, true, true, true, true, '#e2e8f0', SpreadsheetApp.BorderStyle.SOLID);

        // Ensure text is visible (remove transparent color if it was there)
        dataRange.setFontColor('#1e293b');

        sheet.getRange(1, 1, rowCount, 1)
            .setHorizontalAlignment('right')
            .setVerticalAlignment('middle')
            .setFontSize(10)
            .setFontColor('#1e293b')
            .setFontWeight('bold');

        sheet.getRange(rowCount + 1, 2, 1, colCount)
            .setTextRotation(45)
            .setVerticalAlignment('top')
            .setHorizontalAlignment('left')
            .setFontSize(10)
            .setFontColor('#1e293b')
            .setFontWeight('bold');

        // MANUAL Heatmap (Bypasses buggy Conditional Formatting API)
        const dataValues = dataRange.getValues();
        let maxVal = 0;
        dataValues.forEach(function (r) { r.forEach(function (v) { if (v > maxVal) maxVal = v; }); });

        const colors = dataValues.map(function (row) {
            return row.map(function (val) {
                if (maxVal === 0) return '#ffffff';
                return interpolateColor('#ffffff', '#1d4ed8', val / maxVal);
            });
        });
        dataRange.setBackgrounds(colors);
    }
    sheet.setFrozenColumns(1);
}

function updateTimeAnalysis(ss, rows, headers) {
    const timestampIdx = headers.indexOf('timestamp');
    if (timestampIdx === -1) return;
    const hourlyStats = Array(24).fill(0).map((_, i) => [`${i}:00`, 0]);
    const periodStats = { 'Early (5-8)': 0, 'Morning (8-12)': 0, 'Afternoon (12-17)': 0, 'Evening (17-21)': 0, 'Night (21-24)': 0, 'Late Night (0-5)': 0 };

    rows.forEach(function (row) {
        const ts = row[timestampIdx];
        if (!ts) return;
        const date = new Date(ts);
        if (isNaN(date.getTime())) return;
        const hour = date.getHours();
        hourlyStats[hour][1]++;
        if (hour >= 5 && hour < 8) periodStats['Early (5-8)']++;
        else if (hour >= 8 && hour < 12) periodStats['Morning (8-12)']++;
        else if (hour >= 12 && hour < 17) periodStats['Afternoon (12-17)']++;
        else if (hour >= 17 && hour < 21) periodStats['Evening (17-21)']++;
        else if (hour >= 21 || hour < 0) periodStats['Night (21-24)']++;
        else periodStats['Late Night (0-5)']++;
    });

    let sheet = ss.getSheetByName('Time Analysis');
    if (!sheet) sheet = ss.insertSheet('Time Analysis');
    sheet.clear();
    writeTable(sheet, 1, 1, ['Period', 'Visits'], Object.keys(periodStats).map(k => [k, periodStats[k]]), { fontWeight: 'bold', background: '#2563eb', fontColor: '#ffffff' });
    writeTable(sheet, 1, 4, ['Hour', 'Count'], hourlyStats, { fontWeight: 'bold', background: '#2563eb', fontColor: '#ffffff' });

    const existing = sheet.getCharts();
    existing.forEach(function (c) { sheet.removeChart(c); });

    const hourlyChart = sheet.newChart().setChartType(Charts.ChartType.COLUMN).addRange(sheet.getRange(1, 4, 25, 2))
        .setPosition(1, 7, 0, 0).setOption('title', 'Hourly Traffic').setOption('width', 800).build();
    sheet.insertChart(hourlyChart);
}

function interpolateColor(color1, color2, ratio) {
    const r1 = parseInt(color1.substring(1, 3), 16), g1 = parseInt(color1.substring(3, 5), 16), b1 = parseInt(color1.substring(5, 7), 16);
    const r2 = parseInt(color2.substring(1, 3), 16), g2 = parseInt(color2.substring(3, 5), 16), b2 = parseInt(color2.substring(5, 7), 16);
    const r = Math.round(r1 + (r2 - r1) * ratio).toString(16).padStart(2, '0');
    const g = Math.round(g1 + (g2 - g1) * ratio).toString(16).padStart(2, '0');
    const b = Math.round(b1 + (b2 - b1) * ratio).toString(16).padStart(2, '0');
    return '#' + r + g + b;
}

function buildResponse(data) {
    return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

// ══════════════════════════════════════════════════════════════════════════════
// ██  BEHAVIOUR ANALYTICS MODULE                                            ██
// ══════════════════════════════════════════════════════════════════════════════

// ── 1. CHATBOT LEADS ──────────────────────────────────────────────────────────
// Tracks all chatbot interactions that qualify as leads (user provided info,
// requested demo, wanted callback, asked to speak to expert, etc.)

const CHATBOT_LEADS_COLUMNS = [
    'Timestamp', 'Lead ID', 'Session ID', 'IP Address',
    'Country', 'State', 'City',
    'User Name', 'User Email', 'User Phone',
    'Chat Intent', 'Quick Action Used', 'Lead Score',
    'Messages Count', 'Chat Duration (s)', 'Conversation Summary',
    'Page Where Chat Started', 'Referrer URL', 'Device Type',
    'Lead Status', 'Follow Up Required', 'Agent Name'
];

function handleChatbotLead(ss, body) {
    const name = 'Chatbot Leads';
    const sheet = getOrCreateSheet(ss, name, CHATBOT_LEADS_COLUMNS);

    let dataFields = body.fields || body;
    dataFields['Timestamp'] = new Date().toISOString();
    dataFields['Lead ID'] = dataFields['Lead ID'] || Utilities.getUuid();

    // Score the lead based on intent
    const intent = (dataFields['Chat Intent'] || '').toLowerCase();
    let score = 30; // Base score
    if (intent.includes('demo') || intent.includes('book')) score = 90;
    else if (intent.includes('expert') || intent.includes('consult')) score = 85;
    else if (intent.includes('partner')) score = 80;
    else if (intent.includes('offering') || intent.includes('product')) score = 60;
    else if (intent.includes('job') || intent.includes('career')) score = 20;
    else if (intent.includes('browsing')) score = 10;
    dataFields['Lead Score'] = score;
    dataFields['Lead Status'] = score >= 70 ? 'Hot' : score >= 40 ? 'Warm' : 'Cold';
    dataFields['Follow Up Required'] = score >= 60 ? 'Yes' : 'No';

    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const row = headers.map(function (h) {
        return dataFields[h] !== undefined ? dataFields[h] : '';
    });
    sheet.appendRow(row);

    // Send notification for hot leads
    if (score >= 70) {
        try {
            sendInternalNotification(dataFields, 'Chatbot Lead (HOT 🔥)');
        } catch (e) {
            console.error('Chatbot lead notification error:', e);
        }
    }
}


// ── 2. ENGAGEMENT METRICS ─────────────────────────────────────────────────────
// Computes engagement metrics from User Behavior data

function updateEngagementMetrics() {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sourceSheet = ss.getSheetByName('User Behavior');
    if (!sourceSheet || sourceSheet.getLastRow() < 2) return;

    const data = sourceSheet.getDataRange().getValues();
    const headers = data[0];
    const rows = data.slice(1);

    const pageIdx = headers.indexOf('page');
    const timeOnPageIdx = headers.indexOf('time_on_page');
    const scrollIdx = headers.indexOf('scroll_percentage');
    const interactionIdx = headers.indexOf('interaction_count');
    const bounceIdx = headers.indexOf('bounce');
    const sessionIdIdx = headers.indexOf('session_id');
    const eventNameIdx = headers.indexOf('event_name');
    const rageClickIdx = headers.indexOf('rage_click_detected');
    const inactivityIdx = headers.indexOf('inactivity_time');
    const formCompletionIdx = headers.indexOf('form_completion_status');

    // Aggregate metrics
    const pageEngagement = {};
    const sessions = new Set();
    let totalBounces = 0;
    let totalPageViews = 0;
    let totalClicks = 0;
    let totalScrollDepths = 0;
    let totalFormSubmits = 0;
    let totalFormAbandons = 0;
    let totalRageClicks = 0;

    rows.forEach(function (row) {
        const page = row[pageIdx] || 'Unknown';
        const timeOnPage = parseFloat(row[timeOnPageIdx]) || 0;
        const scroll = parseFloat(row[scrollIdx]) || 0;
        const interactions = parseInt(row[interactionIdx]) || 0;
        const bounce = row[bounceIdx] === true || row[bounceIdx] === 'true';
        const sessionId = row[sessionIdIdx];
        const eventName = row[eventNameIdx] || '';
        const rageClick = row[rageClickIdx] === true || row[rageClickIdx] === 'true';
        const formStatus = row[formCompletionIdx] || '';

        if (sessionId) sessions.add(sessionId);
        if (bounce) totalBounces++;
        if (eventName === 'click') totalClicks++;
        if (rageClick) totalRageClicks++;
        if (formStatus === 'submitted') totalFormSubmits++;
        if (formStatus === 'abandoned') totalFormAbandons++;

        totalPageViews++;
        totalScrollDepths += scroll;

        if (!pageEngagement[page]) {
            pageEngagement[page] = {
                views: 0, totalTime: 0, totalScroll: 0,
                totalInteractions: 0, bounces: 0
            };
        }
        pageEngagement[page].views++;
        pageEngagement[page].totalTime += timeOnPage;
        pageEngagement[page].totalScroll += scroll;
        pageEngagement[page].totalInteractions += interactions;
        if (bounce) pageEngagement[page].bounces++;
    });

    const totalSessions = sessions.size || 1;
    const avgScrollDepth = totalPageViews > 0 ? (totalScrollDepths / totalPageViews).toFixed(1) : 0;
    const bounceRate = ((totalBounces / totalSessions) * 100).toFixed(1);
    const avgPagesPerSession = (totalPageViews / totalSessions).toFixed(1);

    // Build Engagement Metrics sheet
    let sheet = ss.getSheetByName('Engagement Metrics');
    if (!sheet) sheet = ss.insertSheet('Engagement Metrics');
    sheet.clear();

    const headStyle = { fontWeight: 'bold', background: '#059669', fontColor: '#ffffff' };

    // Summary KPIs
    const summaryData = [
        ['Total Page Views', totalPageViews],
        ['Total Unique Sessions', totalSessions],
        ['Bounce Rate', bounceRate + '%'],
        ['Avg Pages per Session', avgPagesPerSession],
        ['Avg Scroll Depth', avgScrollDepth + '%'],
        ['Total Clicks', totalClicks],
        ['Total Form Submissions', totalFormSubmits],
        ['Total Form Abandonments', totalFormAbandons],
        ['Rage Clicks Detected', totalRageClicks],
        ['Generated At', new Date().toLocaleString()]
    ];
    writeTable(sheet, 1, 1, ['Metric', 'Value'], summaryData, headStyle);

    // Per-Page Engagement
    const pageData = Object.keys(pageEngagement).map(function (page) {
        const p = pageEngagement[page];
        const avgTime = (p.totalTime / p.views / 1000).toFixed(1);
        const avgScroll = (p.totalScroll / p.views).toFixed(1);
        const pageBounceRate = ((p.bounces / p.views) * 100).toFixed(1);
        const engagementScore = (
            (p.views * 0.3) +
            (parseFloat(avgTime) * 0.3) +
            (parseFloat(avgScroll) * 0.2) +
            (p.totalInteractions * 0.2)
        ).toFixed(1);
        return [page, p.views, avgTime + 's', avgScroll + '%', pageBounceRate + '%', p.totalInteractions, engagementScore];
    }).sort(function (a, b) { return parseFloat(b[6]) - parseFloat(a[6]); });

    writeTable(sheet, 14, 1, [
        'Page', 'Views', 'Avg Time on Page', 'Avg Scroll Depth',
        'Bounce Rate', 'Total Interactions', 'Engagement Score'
    ], pageData, headStyle);

    sheet.autoResizeColumns(1, 10);
    logToSystem('Engagement Metrics updated successfully.');
}


// ── 3. BEHAVIOUR METRICS ──────────────────────────────────────────────────────
// Segments and analyzes user behaviour patterns

function updateBehaviourMetrics() {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sourceSheet = ss.getSheetByName('User Behavior');
    if (!sourceSheet || sourceSheet.getLastRow() < 2) return;

    const data = sourceSheet.getDataRange().getValues();
    const headers = data[0];
    const rows = data.slice(1);

    const segmentIdx = headers.indexOf('user_segment');
    const userTypeIdx = headers.indexOf('user_type');
    const deviceIdx = headers.indexOf('device_type');
    const browserIdx = headers.indexOf('browser');
    const osIdx = headers.indexOf('operating_system');
    const sessionIdIdx = headers.indexOf('session_id');
    const pageIdx = headers.indexOf('page');
    const timeOnPageIdx = headers.indexOf('time_on_page');
    const copyIdx = headers.indexOf('copy_event');
    const pasteIdx = headers.indexOf('paste_event');
    const rageIdx = headers.indexOf('rage_click_detected');
    const backBtnIdx = headers.indexOf('back_button_used');
    const tabVisIdx = headers.indexOf('tab_visibility_status');
    const entryPageIdx = headers.indexOf('entry_page');
    const exitPageIdx = headers.indexOf('exit_page');

    // Segment breakdown
    const segmentCounts = {};
    const deviceCounts = {};
    const browserCounts = {};
    const osCounts = {};
    const userTypeCounts = { 'new': 0, 'returning': 0 };

    // Behavioural signals
    let copyEvents = 0, pasteEvents = 0, rageClicks = 0, backButtonUsed = 0;
    let hiddenTabCount = 0;

    // Entry/Exit analysis
    const entryPages = {};
    const exitPages = {};

    // Session flow analysis
    const sessionFlows = {};

    rows.forEach(function (row) {
        const segment = row[segmentIdx] || 'Unknown';
        const device = row[deviceIdx] || 'Unknown';
        const browser = row[browserIdx] || 'Unknown';
        const os = row[osIdx] || 'Unknown';
        const userType = row[userTypeIdx] || 'new';
        const sessionId = row[sessionIdIdx] || '';
        const page = row[pageIdx] || '';
        const entryPage = row[entryPageIdx] || '';
        const exitPage = row[exitPageIdx] || '';

        segmentCounts[segment] = (segmentCounts[segment] || 0) + 1;
        deviceCounts[device] = (deviceCounts[device] || 0) + 1;
        browserCounts[browser] = (browserCounts[browser] || 0) + 1;
        osCounts[os] = (osCounts[os] || 0) + 1;
        if (userTypeCounts[userType] !== undefined) userTypeCounts[userType]++;

        if (row[copyIdx] === true || row[copyIdx] === 'true') copyEvents++;
        if (row[pasteIdx] === true || row[pasteIdx] === 'true') pasteEvents++;
        if (row[rageIdx] === true || row[rageIdx] === 'true') rageClicks++;
        if (row[backBtnIdx] === true || row[backBtnIdx] === 'true') backButtonUsed++;
        if (row[tabVisIdx] === 'hidden') hiddenTabCount++;

        if (entryPage) entryPages[entryPage] = (entryPages[entryPage] || 0) + 1;
        if (exitPage) exitPages[exitPage] = (exitPages[exitPage] || 0) + 1;

        if (sessionId && page) {
            if (!sessionFlows[sessionId]) sessionFlows[sessionId] = [];
            sessionFlows[sessionId].push(page);
        }
    });

    // Build Behaviour Metrics sheet
    let sheet = ss.getSheetByName('Behaviour Metrics');
    if (!sheet) sheet = ss.insertSheet('Behaviour Metrics');
    sheet.clear();

    const headStyle = { fontWeight: 'bold', background: '#7c3aed', fontColor: '#ffffff' };

    // User Segments
    const segmentData = Object.keys(segmentCounts).map(function (s) {
        return [s, segmentCounts[s], ((segmentCounts[s] / rows.length) * 100).toFixed(1) + '%'];
    }).sort(function (a, b) { return b[1] - a[1]; });
    writeTable(sheet, 1, 1, ['User Segment', 'Count', '% of Total'], segmentData, headStyle);

    // Behavioural Signals Summary
    const signalData = [
        ['Copy Events', copyEvents],
        ['Paste Events', pasteEvents],
        ['Rage Clicks', rageClicks],
        ['Back Button Uses', backButtonUsed],
        ['Tab Hidden Transitions', hiddenTabCount],
        ['New Users', userTypeCounts['new']],
        ['Returning Users', userTypeCounts['returning']],
        ['Generated At', new Date().toLocaleString()]
    ];
    writeTable(sheet, segmentData.length + 4, 1, ['Behavioural Signal', 'Count'], signalData, headStyle);

    // Device Breakdown
    const deviceData = Object.keys(deviceCounts).map(function (d) {
        return [d, deviceCounts[d]];
    }).sort(function (a, b) { return b[1] - a[1]; });
    writeTable(sheet, 1, 5, ['Device Type', 'Count'], deviceData, headStyle);

    // Browser Breakdown
    const browserData = Object.keys(browserCounts).map(function (b) {
        return [b, browserCounts[b]];
    }).sort(function (a, b) { return b[1] - a[1]; });
    writeTable(sheet, deviceData.length + 4, 5, ['Browser', 'Count'], browserData, headStyle);

    // OS Breakdown
    const osData = Object.keys(osCounts).map(function (o) {
        return [o, osCounts[o]];
    }).sort(function (a, b) { return b[1] - a[1]; });
    writeTable(sheet, deviceData.length + browserData.length + 7, 5, ['Operating System', 'Count'], osData, headStyle);

    // Top Entry Pages
    const entryData = Object.keys(entryPages).map(function (p) {
        return [p, entryPages[p]];
    }).sort(function (a, b) { return b[1] - a[1]; }).slice(0, 10);
    writeTable(sheet, 1, 8, ['Top Entry Page', 'Count'], entryData, headStyle);

    // Top Exit Pages
    const exitData = Object.keys(exitPages).map(function (p) {
        return [p, exitPages[p]];
    }).sort(function (a, b) { return b[1] - a[1]; }).slice(0, 10);
    writeTable(sheet, entryData.length + 4, 8, ['Top Exit Page', 'Count'], exitData, headStyle);

    sheet.autoResizeColumns(1, 12);
    logToSystem('Behaviour Metrics updated successfully.');
}


// ── 4. TRAFFIC ANALYTICS ──────────────────────────────────────────────────────
// Aggregated traffic source and campaign analysis

function updateTrafficAnalytics() {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sourceSheet = ss.getSheetByName('User Behavior');
    if (!sourceSheet || sourceSheet.getLastRow() < 2) return;

    const data = sourceSheet.getDataRange().getValues();
    const headers = data[0];
    const rows = data.slice(1);

    const sourceIdx = headers.indexOf('traffic_source');
    const referrerIdx = headers.indexOf('referrer_url');
    const utmSourceIdx = headers.indexOf('utm_source');
    const utmMediumIdx = headers.indexOf('utm_medium');
    const utmCampaignIdx = headers.indexOf('utm_campaign');
    const sessionIdIdx = headers.indexOf('session_id');
    const ipIdx = headers.indexOf('ip_address');
    const pageIdx = headers.indexOf('page');
    const countryIdx = headers.indexOf('geo_country');
    const cityIdx = headers.indexOf('geo_city');
    const timeOnPageIdx = headers.indexOf('time_on_page');
    const bounceIdx = headers.indexOf('bounce');

    // Traffic Source Aggregation
    const sources = {};
    const referrers = {};
    const campaigns = {};
    const utmBreakdown = {};
    const countrySessions = {};
    const citySessions = {};
    const uniqueIPs = new Set();

    rows.forEach(function (row) {
        const source = row[sourceIdx] || 'direct';
        const referrer = row[referrerIdx] || '';
        const utmSource = row[utmSourceIdx] || '';
        const utmMedium = row[utmMediumIdx] || '';
        const utmCampaign = row[utmCampaignIdx] || '';
        const ip = row[ipIdx] || '';
        const country = row[countryIdx] || 'Unknown';
        const city = row[cityIdx] || 'Unknown';
        const timeOnPage = parseFloat(row[timeOnPageIdx]) || 0;
        const bounce = row[bounceIdx] === true || row[bounceIdx] === 'true';

        if (ip) uniqueIPs.add(ip);

        if (!sources[source]) sources[source] = { sessions: 0, totalTime: 0, bounces: 0 };
        sources[source].sessions++;
        sources[source].totalTime += timeOnPage;
        if (bounce) sources[source].bounces++;

        if (referrer && !referrer.includes('trustgrid')) {
            const domain = referrer.replace(/https?:\/\//, '').split('/')[0];
            referrers[domain] = (referrers[domain] || 0) + 1;
        }

        if (utmCampaign) {
            if (!campaigns[utmCampaign]) campaigns[utmCampaign] = 0;
            campaigns[utmCampaign]++;
        }

        const utmKey = [utmSource, utmMedium, utmCampaign].filter(Boolean).join(' / ');
        if (utmKey) utmBreakdown[utmKey] = (utmBreakdown[utmKey] || 0) + 1;

        countrySessions[country] = (countrySessions[country] || 0) + 1;
        citySessions[city] = (citySessions[city] || 0) + 1;
    });

    // Build Traffic Analytics sheet
    let sheet = ss.getSheetByName('Traffic Analytics');
    if (!sheet) sheet = ss.insertSheet('Traffic Analytics');
    sheet.clear();

    const headStyle = { fontWeight: 'bold', background: '#dc2626', fontColor: '#ffffff' };

    // Summary
    const summaryData = [
        ['Total Events', rows.length],
        ['Unique IPs', uniqueIPs.size],
        ['Unique Countries', Object.keys(countrySessions).length],
        ['Unique Cities', Object.keys(citySessions).length],
        ['Generated At', new Date().toLocaleString()]
    ];
    writeTable(sheet, 1, 1, ['Traffic Summary', 'Value'], summaryData, headStyle);

    // Source Breakdown
    const sourceData = Object.keys(sources).map(function (s) {
        const d = sources[s];
        const avgTime = (d.totalTime / d.sessions / 1000).toFixed(1);
        const bounceRate = ((d.bounces / d.sessions) * 100).toFixed(1);
        return [s, d.sessions, avgTime + 's', bounceRate + '%'];
    }).sort(function (a, b) { return b[1] - a[1]; });
    writeTable(sheet, 9, 1, ['Traffic Source', 'Sessions', 'Avg Time', 'Bounce Rate'], sourceData, headStyle);

    // Top Referrers
    const referrerData = Object.keys(referrers).map(function (r) {
        return [r, referrers[r]];
    }).sort(function (a, b) { return b[1] - a[1]; }).slice(0, 15);
    writeTable(sheet, 1, 6, ['Referring Domain', 'Count'], referrerData, headStyle);

    // Campaign Performance
    const campaignData = Object.keys(campaigns).map(function (c) {
        return [c, campaigns[c]];
    }).sort(function (a, b) { return b[1] - a[1]; });
    if (campaignData.length > 0) {
        writeTable(sheet, referrerData.length + 4, 6, ['Campaign', 'Sessions'], campaignData, headStyle);
    }

    // UTM Breakdown
    const utmData = Object.keys(utmBreakdown).map(function (u) {
        return [u, utmBreakdown[u]];
    }).sort(function (a, b) { return b[1] - a[1]; });
    if (utmData.length > 0) {
        writeTable(sheet, 1, 9, ['UTM (Source / Medium / Campaign)', 'Count'], utmData, headStyle);
    }

    // Top Countries
    const countryData = Object.keys(countrySessions).map(function (c) {
        return [c, countrySessions[c]];
    }).sort(function (a, b) { return b[1] - a[1]; }).slice(0, 20);
    writeTable(sheet, utmData.length + 4, 9, ['Country', 'Sessions'], countryData, headStyle);

    // Top Cities
    const cityData = Object.keys(citySessions).map(function (c) {
        return [c, citySessions[c]];
    }).sort(function (a, b) { return b[1] - a[1]; }).slice(0, 20);
    writeTable(sheet, utmData.length + countryData.length + 7, 9, ['City', 'Sessions'], cityData, headStyle);

    sheet.autoResizeColumns(1, 12);
    logToSystem('Traffic Analytics updated successfully.');
}


// ── 5. USER BEHAVIOUR LIBRARY ─────────────────────────────────────────────────
// Per-user aggregated behaviour profile

function updateUserBehaviourLibrary() {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sourceSheet = ss.getSheetByName('User Behavior');
    if (!sourceSheet || sourceSheet.getLastRow() < 2) return;

    const data = sourceSheet.getDataRange().getValues();
    const headers = data[0];
    const rows = data.slice(1);

    const userIdIdx = headers.indexOf('user_id');
    const ipIdx = headers.indexOf('ip_address');
    const countryIdx = headers.indexOf('geo_country');
    const cityIdx = headers.indexOf('geo_city');
    const sessionIdIdx = headers.indexOf('session_id');
    const pageIdx = headers.indexOf('page');
    const timeOnPageIdx = headers.indexOf('time_on_page');
    const deviceIdx = headers.indexOf('device_type');
    const browserIdx = headers.indexOf('browser');
    const segmentIdx = headers.indexOf('user_segment');
    const timestampIdx = headers.indexOf('timestamp');
    const firstVisitIdx = headers.indexOf('first_visit_timestamp');
    const entryPageIdx = headers.indexOf('entry_page');
    const totalSessionsIdx = headers.indexOf('total_sessions');
    const userTypeIdx = headers.indexOf('user_type');

    const users = {};

    rows.forEach(function (row) {
        const userId = row[userIdIdx] || 'anonymous';
        const ip = row[ipIdx] || '';
        const country = row[countryIdx] || '';
        const city = row[cityIdx] || '';
        const sessionId = row[sessionIdIdx] || '';
        const page = row[pageIdx] || '';
        const timeOnPage = parseFloat(row[timeOnPageIdx]) || 0;
        const device = row[deviceIdx] || '';
        const browser = row[browserIdx] || '';
        const segment = row[segmentIdx] || '';
        const timestamp = row[timestampIdx] || '';
        const firstVisit = row[firstVisitIdx] || '';
        const entryPage = row[entryPageIdx] || '';
        const totalSessions = parseInt(row[totalSessionsIdx]) || 1;

        if (!users[userId]) {
            users[userId] = {
                ip: ip,
                country: country,
                city: city,
                sessions: new Set(),
                pages: {},
                totalTime: 0,
                device: device,
                browser: browser,
                segment: segment,
                firstVisit: firstVisit || timestamp,
                lastVisit: timestamp,
                entryPage: entryPage,
                totalSessions: totalSessions,
                events: 0
            };
        }

        const u = users[userId];
        if (sessionId) u.sessions.add(sessionId);
        u.pages[page] = (u.pages[page] || 0) + 1;
        u.totalTime += timeOnPage;
        u.events++;
        if (timestamp > u.lastVisit) u.lastVisit = timestamp;
        if (segment) u.segment = segment; // Use latest segment
    });

    // Build User Behaviour Library sheet
    let sheet = ss.getSheetByName('User Behaviour Library');
    if (!sheet) sheet = ss.insertSheet('User Behaviour Library');
    sheet.clear();

    const headStyle = { fontWeight: 'bold', background: '#0ea5e9', fontColor: '#ffffff' };

    const libraryHeaders = [
        'User ID', 'IP Address', 'Country', 'City',
        'Total Sessions', 'Total Events', 'Total Time (s)',
        'Avg Session Time (s)', 'Pages Visited', 'Top Page',
        'Device', 'Browser', 'Segment',
        'First Visit', 'Last Visit', 'Days Active'
    ];

    const libraryData = Object.keys(users).map(function (uid) {
        const u = users[uid];
        const sessionCount = Math.max(u.sessions.size, u.totalSessions);
        const totalTimeSec = (u.totalTime / 1000).toFixed(0);
        const avgSessionTime = sessionCount > 0 ? (u.totalTime / sessionCount / 1000).toFixed(0) : 0;
        const pagesVisited = Object.keys(u.pages).length;
        const topPage = Object.keys(u.pages).sort(function (a, b) {
            return u.pages[b] - u.pages[a];
        })[0] || '';

        let daysActive = 0;
        try {
            const first = new Date(u.firstVisit);
            const last = new Date(u.lastVisit);
            daysActive = Math.max(1, Math.ceil((last - first) / (1000 * 60 * 60 * 24)));
        } catch (e) { daysActive = 1; }

        return [
            uid, u.ip, u.country, u.city,
            sessionCount, u.events, totalTimeSec,
            avgSessionTime, pagesVisited, topPage,
            u.device, u.browser, u.segment,
            u.firstVisit, u.lastVisit, daysActive
        ];
    }).sort(function (a, b) { return b[5] - a[5]; }); // Sort by events desc

    writeTable(sheet, 1, 1, libraryHeaders, libraryData, headStyle);

    // Summary stats at bottom
    const totalUsers = libraryData.length;
    const returningUsers = libraryData.filter(function (r) { return r[4] > 1; }).length;
    const avgEvents = totalUsers > 0 ? (libraryData.reduce(function (s, r) { return s + r[5]; }, 0) / totalUsers).toFixed(0) : 0;

    const summaryRow = libraryData.length + 4;
    writeTable(sheet, summaryRow, 1, ['Library Summary', 'Value'], [
        ['Total Unique Users', totalUsers],
        ['Returning Users', returningUsers],
        ['New Users', totalUsers - returningUsers],
        ['Avg Events per User', avgEvents],
        ['Generated At', new Date().toLocaleString()]
    ], headStyle);

    sheet.autoResizeColumns(1, 16);
    logToSystem('User Behaviour Library updated successfully.');
}


// ── 6. DAILY REPORTS ──────────────────────────────────────────────────────────
// Generates daily summary report (date, total sessions, unique IPs, top page, generated at)

function generateDailyReport() {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sourceSheet = ss.getSheetByName('User Behavior');
    if (!sourceSheet || sourceSheet.getLastRow() < 2) return;

    const data = sourceSheet.getDataRange().getValues();
    const headers = data[0];
    const rows = data.slice(1);

    const timestampIdx = headers.indexOf('timestamp');
    const sessionIdIdx = headers.indexOf('session_id');
    const ipIdx = headers.indexOf('ip_address');
    const pageIdx = headers.indexOf('page');
    const bounceIdx = headers.indexOf('bounce');
    const timeOnPageIdx = headers.indexOf('time_on_page');
    const scrollIdx = headers.indexOf('scroll_percentage');
    const interactionIdx = headers.indexOf('interaction_count');

    const today = new Date();
    const todayStr = Utilities.formatDate(today, Session.getScriptTimeZone(), 'yyyy-MM-dd');

    // Filter today's data
    const todayRows = rows.filter(function (row) {
        const ts = row[timestampIdx];
        if (!ts) return false;
        try {
            const rowDate = Utilities.formatDate(new Date(ts), Session.getScriptTimeZone(), 'yyyy-MM-dd');
            return rowDate === todayStr;
        } catch (e) { return false; }
    });

    if (todayRows.length === 0) {
        logToSystem('No data found for Daily Report on ' + todayStr);
        return;
    }

    const sessions = new Set();
    const ips = new Set();
    const pageCounts = {};
    const pageEngagement = {};
    const sourceCounts = {};
    let totalBounces = 0;
    let totalTime = 0;
    let totalScroll = 0;
    let totalInteractions = 0;

    todayRows.forEach(function (row) {
        const sid = row[sessionIdIdx];
        const ip = row[ipIdx];
        let page = row[pageIdx] || 'Unknown';
        if (page === '/book-demo') page = '/book-consultation';
        
        const isBounce = row[bounceIdx] === true || row[bounceIdx] === 'true';
        const timeOnPage = parseFloat(row[timeOnPageIdx]) || 0;
        const scroll = parseFloat(row[scrollIdx]) || 0;
        const interactions = parseInt(row[interactionIdx]) || 0;
        const source = row[headers.indexOf('traffic_source')] || 'direct';

        if (sid) sessions.add(sid);
        if (ip) ips.add(ip);
        if (isBounce) totalBounces++;
        
        totalTime += timeOnPage;
        totalScroll += scroll;
        totalInteractions += interactions;
        sourceCounts[source] = (sourceCounts[source] || 0) + 1;

        pageCounts[page] = (pageCounts[page] || 0) + 1;
        if (!pageEngagement[page]) pageEngagement[page] = { views: 0, score: 0 };
        pageEngagement[page].views++;
        pageEngagement[page].score += ((timeOnPage / 10000) * 0.4) + ((scroll / 100) * 0.4) + (interactions * 0.2);
    });

    const totalSessions = sessions.size || 1;
    const bounceRate = ((totalBounces / totalSessions) * 100).toFixed(1);
    const avgEngagement = (totalInteractions / totalSessions).toFixed(1);
    
    // Format sources for email
    const topSources = Object.keys(sourceCounts).map(s => {
        return { name: s, count: sourceCounts[s], share: ((sourceCounts[s] / todayRows.length) * 100).toFixed(0) };
    }).sort((a, b) => b.count - a.count).slice(0, 3);

    const sortedPages = Object.keys(pageCounts).sort(function (a, b) {
        return pageCounts[b] - pageCounts[a];
    });
    const topPage = sortedPages[0] || 'N/A';
    const top5Pages = sortedPages.slice(0, 5).map(p => {
        return { name: p, views: pageCounts[p], score: (pageEngagement[p].score / pageEngagement[p].views).toFixed(1) };
    });

    // Write to Daily Reports sheet
    const sheetName = 'Daily Reports';
    let sheet = ss.getSheetByName(sheetName);
    const reportHeaders = ['Date', 'Sessions', 'Unique IPs', 'Page Views', 'Bounce Rate', 'Avg Engagement', 'Top Page', 'Generated At'];
    
    if (!sheet) {
        sheet = ss.insertSheet(sheetName);
        sheet.appendRow(reportHeaders);
        sheet.getRange(1, 1, 1, reportHeaders.length).setFontWeight('bold').setBackground('#f59e0b').setFontColor('#ffffff');
        sheet.setFrozenRows(1);
    }

    // Trend Logic: Get yesterday's sessions
    const existingData = sheet.getDataRange().getValues();
    let yesterdaySessions = 0;
    if (existingData.length > 1) {
        yesterdaySessions = existingData[existingData.length - 1][1]; 
    }
    const sessionTrend = yesterdaySessions > 0 ? (((sessions.size - yesterdaySessions) / yesterdaySessions) * 100).toFixed(1) : 0;

    let rowToUpdate = -1;
    for (let i = 1; i < existingData.length; i++) {
        if (existingData[i][0] === todayStr) {
            rowToUpdate = i + 1;
            break;
        }
    }

    const reportRow = [todayStr, sessions.size, ips.size, todayRows.length, bounceRate + '%', avgEngagement, topPage, new Date().toLocaleString()];

    if (rowToUpdate > 0) {
        sheet.getRange(rowToUpdate, 1, 1, reportHeaders.length).setValues([reportRow]);
    } else {
        sheet.appendRow(reportRow);
    }

    sheet.autoResizeColumns(1, reportHeaders.length);
    logToSystem('Detailed Daily Report generated for ' + todayStr);

    // Send daily summary email
    try {
        const metrics = {
            sessions: sessions.size,
            ips: ips.size,
            views: todayRows.length,
            bounceRate: bounceRate + '%',
            engagement: avgEngagement,
            trend: sessionTrend,
            topPages: top5Pages,
            sources: topSources
        };
        sendDailyReportEmail(todayStr, metrics);
    } catch (e) {
        console.error('Daily report email failed:', e);
    }
}

function sendDailyReportEmail(date, m) {
    const logoUrl = 'https://trustgrid.ai/brand-icon.png';
    const spreadsheetUrl = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}`;
    const subject = `📊 Analytics Intelligence – ${date}`;

    const trendColor = m.trend >= 0 ? '#10b981' : '#ef4444';
    const trendIcon = m.trend >= 0 ? '↑' : '↓';

    const pagesHtml = m.topPages.map((p, i) => `
        <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px;">${i + 1}</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: 600; font-size: 13px;">${p.name}</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: 700; text-align: right; font-size: 13px;">${p.views}</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; text-align: right;"><span style="background: #eff6ff; color: #3b82f6; padding: 4px 8px; border-radius: 6px; font-size: 11px; font-weight: 700;">${p.score}</span></td>
        </tr>
    `).join('');

    const sourcesHtml = m.sources.map(s => `
        <div style="flex: 1; min-width: 80px; text-align: center;">
            <div style="font-size: 11px; color: #64748b; text-transform: uppercase; font-weight: 700; margin-bottom: 4px;">${s.name}</div>
            <div style="font-size: 16px; font-weight: 700; color: #0f172a;">${s.share}%</div>
        </div>
    `).join('');

    const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&display=swap');
            body { font-family: 'Outfit', sans-serif; background-color: #f8fafc; margin: 0; padding: 0; }
        </style>
    </head>
    <body style="margin: 0; padding: 40px 0; background-color: #f8fafc;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.05);">
            <div style="background: #0f172a; padding: 40px; text-align: center;">
                <img src="${logoUrl}" alt="TrustGrid AI" style="width: 120px; margin-bottom: 24px;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">Daily Performance Insight</h1>
                <p style="color: #94a3b8; margin: 8px 0 0 0; font-size: 15px;">${date}</p>
            </div>

            <div style="padding: 40px;">
                <!-- KPI Section -->
                <div style="display: flex; gap: 16px; margin-bottom: 24px;">
                    <div style="flex: 1; background: #f1f5f9; border-radius: 16px; padding: 16px; text-align: center;">
                        <div style="font-size: 11px; color: #64748b; text-transform: uppercase; font-weight: 700; margin-bottom: 4px;">Sessions</div>
                        <div style="font-size: 24px; font-weight: 700; color: #0f172a;">${m.sessions}</div>
                        <div style="font-size: 11px; color: ${trendColor}; font-weight: 600; margin-top: 2px;">${trendIcon} ${Math.abs(m.trend)}% vs yest.</div>
                    </div>
                    <div style="flex: 1; background: #f1f5f9; border-radius: 16px; padding: 16px; text-align: center;">
                        <div style="font-size: 11px; color: #64748b; text-transform: uppercase; font-weight: 700; margin-bottom: 4px;">Bounce Rate</div>
                        <div style="font-size: 24px; font-weight: 700; color: #0f172a;">${m.bounceRate}</div>
                    </div>
                </div>

                <div style="display: flex; gap: 16px; margin-bottom: 32px;">
                    <div style="flex: 1; background: #eff6ff; border-radius: 16px; padding: 16px; text-align: center;">
                        <div style="font-size: 11px; color: #3b82f6; text-transform: uppercase; font-weight: 700; margin-bottom: 4px;">Engagement</div>
                        <div style="font-size: 24px; font-weight: 700; color: #1e3a8a;">${m.engagement}</div>
                    </div>
                    <div style="flex: 1; background: #f0fdf4; border-radius: 16px; padding: 16px; text-align: center;">
                        <div style="font-size: 11px; color: #10b981; text-transform: uppercase; font-weight: 700; margin-bottom: 4px;">Visitors</div>
                        <div style="font-size: 24px; font-weight: 700; color: #064e3b;">${m.ips}</div>
                    </div>
                </div>

                <!-- Traffic Sources -->
                <div style="background: #f8fafc; border-radius: 16px; padding: 20px; margin-bottom: 32px;">
                    <h4 style="margin: 0 0 16px 0; font-size: 12px; color: #94a3b8; text-transform: uppercase; text-align: center;">Traffic Source Breakdown</h4>
                    <div style="display: flex; justify-content: space-around;">
                        ${sourcesHtml}
                    </div>
                </div>

                <!-- Pages Table -->
                <h3 style="margin: 0 0 16px 0; font-size: 15px; color: #0f172a; font-weight: 700; border-left: 4px solid #3b82f6; padding-left: 12px;">Top Content Analytics</h3>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 32px;">
                    <thead>
                        <tr>
                            <th style="text-align: left; padding-bottom: 8px; border-bottom: 1px solid #f1f5f9; color: #94a3b8; font-size: 11px;">RANK</th>
                            <th style="text-align: left; padding-bottom: 11px; border-bottom: 1px solid #f1f5f9; color: #94a3b8; font-size: 11px;">CONTENT</th>
                            <th style="text-align: right; padding-bottom: 11px; border-bottom: 1px solid #f1f5f9; color: #94a3b8; font-size: 11px;">VIEWS</th>
                            <th style="text-align: right; padding-bottom: 11px; border-bottom: 1px solid #f1f5f9; color: #94a3b8; font-size: 11px;">SCORE</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${pagesHtml}
                    </tbody>
                </table>

                <div style="text-align: center;">
                    <a href="${spreadsheetUrl}" style="display: inline-block; background: #0f172a; color: #ffffff; padding: 16px 32px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 15px;">Access Live Analytics Workspace</a>
                </div>
            </div>

            <div style="background: #f1f5f9; padding: 24px; text-align: center; color: #94a3b8; font-size: 11px;">
                Generated automatically by Trustflow.ai Bridge
            </div>
        </div>
    </body>
    </html>`;

    GmailApp.sendEmail(ADMIN_EMAIL, subject, '', {
        htmlBody: htmlBody,
        name: 'Trustflow Analytics'
    });
}


// ── 7. WEEKLY REPORTS ─────────────────────────────────────────────────────────
// Generates weekly summary (week start, end, total sessions, unique IPs, top 5 pages, generated at)

function generateWeeklyReport() {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sourceSheet = ss.getSheetByName('User Behavior');
    if (!sourceSheet || sourceSheet.getLastRow() < 2) return;

    const data = sourceSheet.getDataRange().getValues();
    const headers = data[0];
    const rows = data.slice(1);

    const timestampIdx = headers.indexOf('timestamp');
    const sessionIdIdx = headers.indexOf('session_id');
    const ipIdx = headers.indexOf('ip_address');
    const pageIdx = headers.indexOf('page');

    // Calculate week boundaries (Monday to Sunday)
    const today = new Date();
    const dayOfWeek = today.getDay();
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() + mondayOffset);
    weekStart.setHours(0, 0, 0, 0);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);

    const weekStartStr = Utilities.formatDate(weekStart, Session.getScriptTimeZone(), 'yyyy-MM-dd');
    const weekEndStr = Utilities.formatDate(weekEnd, Session.getScriptTimeZone(), 'yyyy-MM-dd');

    // Filter this week's data
    const weekRows = rows.filter(function (row) {
        const ts = row[timestampIdx];
        if (!ts) return false;
        try {
            const rowDate = new Date(ts);
            return rowDate >= weekStart && rowDate <= weekEnd;
        } catch (e) { return false; }
    });

    const sessions = new Set();
    const ips = new Set();
    const pageCounts = {};

    weekRows.forEach(function (row) {
        const sid = row[sessionIdIdx];
        const ip = row[ipIdx];
        let page = row[pageIdx] || 'Unknown';
        if (page === '/book-demo') page = '/book-consultation';

        if (sid) sessions.add(sid);
        if (ip) ips.add(ip);
        pageCounts[page] = (pageCounts[page] || 0) + 1;
    });

    // Get top 5 pages
    const topPages = Object.keys(pageCounts).sort(function (a, b) {
        return pageCounts[b] - pageCounts[a];
    }).slice(0, 5);
    const top5PagesStr = topPages.map(function (p, i) {
        return (i + 1) + '. ' + p + ' (' + pageCounts[p] + ')';
    }).join(' | ');

    // Write to Weekly Reports sheet
    const sheetName = 'Weekly Reports';
    let sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
        sheet = ss.insertSheet(sheetName);
        sheet.appendRow(['Week Starting', 'Week Ending', 'Total Sessions', 'Unique IPs', 'Top 5 Pages', 'Generated At']);
        sheet.getRange(1, 1, 1, 6).setFontWeight('bold').setBackground('#8b5cf6').setFontColor('#ffffff');
        sheet.setFrozenRows(1);
    }

    // Check if this week's report already exists
    const existingData = sheet.getDataRange().getValues();
    let rowToUpdate = -1;
    for (let i = 1; i < existingData.length; i++) {
        if (existingData[i][0] === weekStartStr) {
            rowToUpdate = i + 1;
            break;
        }
    }

    const reportRow = [weekStartStr, weekEndStr, sessions.size, ips.size, top5PagesStr, new Date().toLocaleString()];

    if (rowToUpdate > 0) {
        sheet.getRange(rowToUpdate, 1, 1, 6).setValues([reportRow]);
    } else {
        sheet.appendRow(reportRow);
    }

    sheet.autoResizeColumns(1, 6);
    logToSystem('Weekly Report generated for ' + weekStartStr + ' to ' + weekEndStr);

    // Send weekly summary email
    try {
        sendWeeklyReportEmail(weekStartStr, weekEndStr, sessions.size, ips.size, topPages, pageCounts);
    } catch (e) {
        console.error('Weekly report email failed:', e);
    }
}

function sendWeeklyReportEmail(weekStart, weekEnd, sessions, uniqueIPs, topPages, pageCounts) {
    const logoUrl = 'https://trustgrid.ai/brand-icon.png';
    const subject = '📈 Weekly Analytics Report – ' + weekStart + ' to ' + weekEnd;

    const pagesHtml = topPages.map(function (p, i) {
        return '<tr><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;">#' + (i + 1) + '</td><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600;">' + p + '</td><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; text-align: right; font-weight: 700;">' + (pageCounts[p] || 0) + '</td></tr>';
    }).join('');

    const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&display=swap');
            body { font-family: 'Outfit', sans-serif; background-color: #f1f5f9; margin: 0; padding: 0; }
        </style>
    </head>
    <body style="margin: 0; padding: 40px 0; background-color: #f1f5f9;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);">
            <div style="background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%); padding: 40px; text-align: center;">
                <img src="${logoUrl}" alt="TrustGrid AI" style="width: 120px; margin-bottom: 20px;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">Weekly Analytics Report</h1>
                <p style="color: #e9d5ff; margin: 10px 0 0 0;">${weekStart} → ${weekEnd}</p>
            </div>
            <div style="padding: 40px;">
                <div style="display: flex; gap: 20px; margin-bottom: 30px;">
                    <div style="flex: 1; background: #f8fafc; border-radius: 12px; padding: 20px; text-align: center;">
                        <div style="font-size: 32px; font-weight: 700; color: #0f172a;">${sessions}</div>
                        <div style="font-size: 13px; color: #64748b; margin-top: 4px;">Total Sessions</div>
                    </div>
                    <div style="flex: 1; background: #f8fafc; border-radius: 12px; padding: 20px; text-align: center;">
                        <div style="font-size: 32px; font-weight: 700; color: #0f172a;">${uniqueIPs}</div>
                        <div style="font-size: 13px; color: #64748b; margin-top: 4px;">Unique IPs</div>
                    </div>
                </div>
                <h3 style="font-size: 14px; text-transform: uppercase; color: #64748b; letter-spacing: 0.1em; margin-bottom: 16px;">Top 5 Pages</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr><th style="text-align: left; padding: 10px 0; border-bottom: 2px solid #e2e8f0; color: #94a3b8; font-size: 12px;">Rank</th><th style="text-align: left; padding: 10px 0; border-bottom: 2px solid #e2e8f0; color: #94a3b8; font-size: 12px;">Page</th><th style="text-align: right; padding: 10px 0; border-bottom: 2px solid #e2e8f0; color: #94a3b8; font-size: 12px;">Views</th></tr>
                    ${pagesHtml}
                </table>
            </div>
            <div style="background-color: #f8fafc; padding: 20px; text-align: center; color: #94a3b8; font-size: 12px;">
                TrustGrid AI – Automated Weekly Report
            </div>
        </div>
    </body>
    </html>`;

    GmailApp.sendEmail(ADMIN_EMAIL, subject, '', {
        htmlBody: htmlBody,
        name: 'TrustGrid AI Weekly Report'
    });
}


// ── 8. REPORTS & TRENDS ───────────────────────────────────────────────────────
// Dashboard: Daily Traffic Trend, Weekly Sessions Comparison, Traffic Source Breakdown,
// Cron Trigger Execution Log

function updateReportsAndTrends() {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

    let sheet = ss.getSheetByName('Reports & Trends');
    if (!sheet) sheet = ss.insertSheet('Reports & Trends');
    sheet.clear();

    const headStyle = { fontWeight: 'bold', background: '#0f172a', fontColor: '#ffffff' };

    // ─── A. Daily Traffic Trend ─────────────────────────────────────────────
    const sourceSheet = ss.getSheetByName('User Behavior');
    if (sourceSheet && sourceSheet.getLastRow() >= 2) {
        const data = sourceSheet.getDataRange().getValues();
        const headers = data[0];
        const rows = data.slice(1);
        const timestampIdx = headers.indexOf('timestamp');
        const sessionIdIdx = headers.indexOf('session_id');
        const ipIdx = headers.indexOf('ip_address');
        const pageIdx = headers.indexOf('page');
        const sourceIdx = headers.indexOf('traffic_source');

        // Aggregate by date
        const dailyData = {};
        const sourceCounts = {};

        rows.forEach(function (row) {
            const ts = row[timestampIdx];
            const source = row[sourceIdx] || 'direct';
            if (!ts) return;
            try {
                const dateStr = Utilities.formatDate(new Date(ts), Session.getScriptTimeZone(), 'yyyy-MM-dd');
                if (!dailyData[dateStr]) {
                    dailyData[dateStr] = { sessions: new Set(), ips: new Set(), pageViews: 0 };
                }
                const sessionId = row[sessionIdIdx];
                const ip = row[ipIdx];
                if (sessionId) dailyData[dateStr].sessions.add(sessionId);
                if (ip) dailyData[dateStr].ips.add(ip);
                dailyData[dateStr].pageViews++;

                sourceCounts[source] = (sourceCounts[source] || 0) + 1;
            } catch (e) { }
        });

        // Daily trend table
        const dailyTrend = Object.keys(dailyData).sort().map(function (date) {
            const d = dailyData[date];
            return [date, d.sessions.size, d.ips.size, d.pageViews];
        });

        writeTable(sheet, 1, 1, ['Date', 'Sessions', 'Unique IPs', 'Page Views'], dailyTrend, headStyle);

        // Build daily traffic chart
        if (dailyTrend.length > 0) {
            const existing = sheet.getCharts();
            existing.forEach(function (c) { sheet.removeChart(c); });

            const chartRange = sheet.getRange(1, 1, dailyTrend.length + 1, 4);
            const trendChart = sheet.newChart()
                .setChartType(Charts.ChartType.LINE)
                .addRange(chartRange)
                .setPosition(1, 6, 0, 0)
                .setOption('title', 'Daily Traffic Trend')
                .setOption('width', 700)
                .setOption('height', 350)
                .setOption('curveType', 'function')
                .build();
            sheet.insertChart(trendChart);
        }

        // ─── B. Weekly Sessions Comparison (from Weekly Reports) ────────────
        const weeklySheet = ss.getSheetByName('Weekly Reports');
        if (weeklySheet && weeklySheet.getLastRow() >= 2) {
            const weeklyData = weeklySheet.getDataRange().getValues();
            const weeklyRows = weeklyData.slice(1);

            const weeklyComparison = weeklyRows.map(function (row) {
                return [row[0] + ' – ' + row[1], row[2], row[3]];
            });

            const weeklyStartRow = dailyTrend.length + 4;
            writeTable(sheet, weeklyStartRow, 1, ['Week', 'Sessions', 'Unique IPs'], weeklyComparison, headStyle);

            if (weeklyComparison.length > 1) {
                const wcRange = sheet.getRange(weeklyStartRow, 1, weeklyComparison.length + 1, 3);
                const wcChart = sheet.newChart()
                    .setChartType(Charts.ChartType.COLUMN)
                    .addRange(wcRange)
                    .setPosition(weeklyStartRow, 6, 0, 0)
                    .setOption('title', 'Weekly Sessions Comparison')
                    .setOption('width', 700)
                    .setOption('height', 350)
                    .build();
                sheet.insertChart(wcChart);
            }
        }

        // ─── C. Traffic Source Breakdown ─────────────────────────────────────
        const sourceData = Object.keys(sourceCounts).map(function (s) {
            return [s, sourceCounts[s], ((sourceCounts[s] / rows.length) * 100).toFixed(1) + '%'];
        }).sort(function (a, b) { return b[1] - a[1]; });

        const sourceStartRow = (dailyTrend.length || 0) + 20 + 4;
        writeTable(sheet, sourceStartRow, 1, ['Traffic Source', 'Count', '% Share'], sourceData, headStyle);

        if (sourceData.length > 0) {
            const srcRange = sheet.getRange(sourceStartRow, 1, sourceData.length + 1, 2);
            const pieChart = sheet.newChart()
                .setChartType(Charts.ChartType.PIE)
                .addRange(srcRange)
                .setPosition(sourceStartRow, 6, 0, 0)
                .setOption('title', 'Traffic Source Breakdown')
                .setOption('width', 500)
                .setOption('height', 350)
                .setOption('pieHole', 0.4)
                .build();
            sheet.insertChart(pieChart);
        }
    }

    // ─── D. Cron Trigger Execution Log ──────────────────────────────────────
    const cronSheet = ss.getSheetByName('Cron Execution Log');
    if (cronSheet && cronSheet.getLastRow() >= 2) {
        const cronData = cronSheet.getDataRange().getValues();
        const cronRows = cronData.slice(1).slice(-20); // Last 20 entries

        const cronStartRow = 50;
        writeTable(sheet, cronStartRow, 1, cronData[0], cronRows,
            { fontWeight: 'bold', background: '#64748b', fontColor: '#ffffff' });
    }

    sheet.autoResizeColumns(1, 12);
    logToSystem('Reports & Trends dashboard updated.');
}


// ── CRON TRIGGER SETUP & EXECUTION ────────────────────────────────────────────
// Sets up time-based triggers for automated report generation

function setupCronTriggers() {
    // Remove existing triggers to avoid duplicates
    const triggers = ScriptApp.getProjectTriggers();
    triggers.forEach(function (trigger) {
        const funcName = trigger.getHandlerFunction();
        if (['cronDailyReport', 'cronWeeklyReport', 'cronRefreshAllAnalytics'].includes(funcName)) {
            ScriptApp.deleteTrigger(trigger);
        }
    });

    // HR Weekly Report - runs every Friday at 5:00 PM
    ScriptApp.newTrigger('cronWeeklyAlertsHR')
        .timeBased()
        .onWeekDay(ScriptApp.WeekDay.FRIDAY)
        .atHour(17)
        .nearMinute(0)
        .create();

    // HR Monthly Report - runs 1st of every month at 9:00 AM
    ScriptApp.newTrigger('cronMonthlyAlertsHR')
        .timeBased()
        .onMonthDay(1)
        .atHour(9)
        .nearMinute(0)
        .create();

    // Daily Report – runs every day at 11:30 PM
    ScriptApp.newTrigger('cronDailyReport')
        .timeBased()
        .everyDays(1)
        .atHour(23)
        .nearMinute(30)
        .create();

    // Weekly Report – runs every Monday at 8:00 AM
    ScriptApp.newTrigger('cronWeeklyReport')
        .timeBased()
        .onWeekDay(ScriptApp.WeekDay.MONDAY)
        .atHour(8)
        .nearMinute(0)
        .create();

    // Full Analytics Refresh – runs every 6 hours
    ScriptApp.newTrigger('cronRefreshAllAnalytics')
        .timeBased()
        .everyHours(6)
        .create();

    logCronExecution('setupCronTriggers', 'All cron triggers configured successfully.');
    SpreadsheetApp.getUi().alert('✅ Cron Triggers Set Up',
        'The following automated tasks are now scheduled:\n\n' +
        '• Daily Report → Every day at 11:30 PM\n' +
        '• Weekly Report → Every Monday at 8:00 AM\n' +
        '• Full Analytics Refresh → Every 6 hours',
        SpreadsheetApp.getUi().ButtonSet.OK);
}

function cronDailyReport() {
    logCronExecution('cronDailyReport', 'Starting...');
    try {
        generateDailyReport();
        logCronExecution('cronDailyReport', '✅ Completed successfully.');
    } catch (e) {
        logCronExecution('cronDailyReport', '❌ Failed: ' + e.toString());
    }
}

function cronWeeklyReport() {
    logCronExecution('cronWeeklyReport', 'Starting...');
    try {
        generateWeeklyReport();
        updateReportsAndTrends();
        logCronExecution('cronWeeklyReport', '✅ Completed successfully.');
    } catch (e) {
        logCronExecution('cronWeeklyReport', '❌ Failed: ' + e.toString());
    }
}

function cronRefreshAllAnalytics() {
    logCronExecution('cronRefreshAllAnalytics', 'Starting full refresh...');
    try {
        updateEngagementMetrics();
        updateBehaviourMetrics();
        updateTrafficAnalytics();
        updateUserBehaviourLibrary();
        updateAnalyticsDashboard();
        updateReportsAndTrends();
        logCronExecution('cronRefreshAllAnalytics', '✅ Full refresh completed.');
    } catch (e) {
        logCronExecution('cronRefreshAllAnalytics', '❌ Failed: ' + e.toString());
    }
}

function logCronExecution(functionName, status) {
    try {
        const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
        const sheetName = 'Cron Execution Log';
        let sheet = ss.getSheetByName(sheetName);
        if (!sheet) {
            sheet = ss.insertSheet(sheetName);
            sheet.appendRow(['Timestamp', 'Function', 'Status']);
            sheet.getRange(1, 1, 1, 3).setFontWeight('bold').setBackground('#334155').setFontColor('#ffffff');
            sheet.setFrozenRows(1);
        }
        sheet.appendRow([new Date().toLocaleString(), functionName, status]);
        sheet.autoResizeColumns(1, 3);
    } catch (e) {
        console.error('Cron log error:', e);
    }
}


// ── MASTER REFRESH (Manual via Menu) ──────────────────────────────────────────
// Runs all behaviour analytics updates at once

function refreshAllBehaviourAnalytics() {
    const ui = SpreadsheetApp.getUi();
    ui.alert('🔄 Refreshing...', 'All Behaviour Analytics sheets are being updated. This may take a moment.', ui.ButtonSet.OK);

    try {
        updateEngagementMetrics();
        updateBehaviourMetrics();
        updateTrafficAnalytics();
        updateUserBehaviourLibrary();
        generateDailyReport();
        generateWeeklyReport();
        updateReportsAndTrends();
        updateAnalyticsDashboard();

        ui.alert('✅ Complete', 'All Behaviour Analytics sheets have been updated successfully!', ui.ButtonSet.OK);
    } catch (e) {
        ui.alert('❌ Error', 'Something went wrong: ' + e.toString(), ui.ButtonSet.OK);
        logToSystem('refreshAllBehaviourAnalytics failed: ' + e.toString());
    }
}



// ==========================================
// CAREER APPLICATIONS MODULE (GOVENICS)
// ==========================================

function handleCareerApplication(ss, data) {
    const sheetName = 'CareerApplications';
    const sheet = getOrCreateSheet(ss, sheetName, ['Timestamp', 'name', 'email', 'phone', 'experience', 'position', 'linkedinUrl', 'message', 'resumeFilename']);
    
    // Add row
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const row = headers.map(h => {
        if (h === 'Timestamp') return new Date().toISOString();
        if (h === 'resumeFilename') return data.resumeFilename || '';
        return data[h] !== undefined ? data[h] : '';
    });
    sheet.appendRow(row);
    
    let attachment = null;
    if (data.resumeData && data.resumeFilename) {
        try {
            const decoded = Utilities.base64Decode(data.resumeData);
            attachment = Utilities.newBlob(decoded, data.resumeMimeType || 'application/pdf', data.resumeFilename);
        } catch (err) {
            console.error('Failed to decode base64 resume', err);
        }
    }
    
    const subject = `New Career Application: ${data.name || 'Candidate'} for ${data.position || 'Open Role'}`;
    const bodyText = `
Hello HR Team,

A new career application has been received.

Name: ${data.name || ''}
Email: ${data.email || ''}
Phone: ${data.phone || ''}
Position: ${data.position || ''}
Experience: ${data.experience || ''}
LinkedIn: ${data.linkedinUrl || 'N/A'}

Message:
${data.message || 'N/A'}

Regards,
Automated System
    `;
    
    const emailOptions = {
        to: 'hrms2026@isisecurity.in,pooja.test2026@gmail.com',
        subject: subject,
        body: bodyText
    };
    if (attachment) {
        emailOptions.attachments = [attachment];
    }
    
    MailApp.sendEmail(emailOptions);
}

// ------------------------------------------
// HR ALERTS
// ------------------------------------------

function generateAlertsHR(title, daysAgo) {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let totalCareers = 0;
    
    const careersSheet = ss.getSheetByName('CareerApplications');
    if (careersSheet && careersSheet.getLastRow() > 1) {
        totalCareers = countRecentRows(careersSheet, daysAgo);
    }
    
    const subject = `Govenics GRC - ${title} Summary`;
    const bodyText = `
Hello Team,

Here is your ${title} summary from the Govenics website.

- New Career Applications: ${totalCareers}

Please check the Google Sheet for full details.

Regards,
Govenics Automated System
    `;
    
    MailApp.sendEmail('hrms2026@isisecurity.in,pooja.test2026@gmail.com', subject, bodyText);
}

function cronWeeklyAlertsHR() {
    logCronExecution('cronWeeklyAlertsHR', 'Starting...');
    try {
        generateAlertsHR('Weekly HR', 7);
        logCronExecution('cronWeeklyAlertsHR', '✅ Completed.');
    } catch(e) {
        logCronExecution('cronWeeklyAlertsHR', '❌ Failed: ' + e.toString());
    }
}

function cronMonthlyAlertsHR() {
    logCronExecution('cronMonthlyAlertsHR', 'Starting...');
    try {
        generateAlertsHR('Monthly HR', 30);
        logCronExecution('cronMonthlyAlertsHR', '✅ Completed.');
    } catch(e) {
        logCronExecution('cronMonthlyAlertsHR', '❌ Failed: ' + e.toString());
    }
}

function countRecentRows(sheet, days) {
    const data = sheet.getDataRange().getValues();
    if (data.length <= 1) return 0;
    
    const headers = data[0];
    const timeIndex = headers.indexOf('Timestamp');
    if (timeIndex === -1) return data.length - 1;
    
    const now = new Date();
    const threshold = new Date(now.getTime() - (days * 24 * 60 * 60 * 1000));
    
    let count = 0;
    for (let i = 1; i < data.length; i++) {
        const timestamp = new Date(data[i][timeIndex]);
        if (timestamp >= threshold) {
            count++;
        }
    }
    return count;
}
