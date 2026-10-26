/**
 * NexEmber waitlist → Google Sheets
 *
 * Setup (one-time, ~5 minutes) — full steps in README.md:
 *  1. Create a Google Sheet, then Extensions → Apps Script, paste this file.
 *  2. Project Settings → Script Properties → add WAITLIST_SECRET (same value as in Vercel).
 *  3. Deploy → New deployment → Web app → Execute as: Me, Who has access: Anyone.
 *  4. Copy the Web app URL into GOOGLE_SHEETS_WEBHOOK_URL in Vercel.
 */

var SHEET_NAME = 'Waitlist';
var HEADERS = [
  'Submitted at', 'Name', 'Email', 'Career stage',
  'UTM source', 'UTM medium', 'UTM campaign', 'Referrer', 'Landing page', 'User agent',
];

function doPost(e) {
  var data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return json_({ ok: false, error: 'invalid_json' });
  }

  var secret = PropertiesService.getScriptProperties().getProperty('WAITLIST_SECRET');
  if (!secret || data.secret !== secret) {
    return json_({ ok: false, error: 'unauthorised' });
  }

  var email = String(data.email || '').trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return json_({ ok: false, error: 'invalid_email' });
  }

  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var sheet = getSheet_();

    // Skip duplicates so each email appears once.
    var lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      var emails = sheet.getRange(2, 3, lastRow - 1, 1).getValues();
      for (var i = 0; i < emails.length; i++) {
        if (String(emails[i][0]).toLowerCase() === email) {
          return json_({ ok: true, duplicate: true });
        }
      }
    }

    sheet.appendRow([
      data.submittedAt ? new Date(data.submittedAt) : new Date(),
      safe_(data.name),
      email,
      safe_(data.stage),
      safe_(data.utmSource),
      safe_(data.utmMedium),
      safe_(data.utmCampaign),
      safe_(data.referrer),
      safe_(data.landingPage),
      safe_(data.userAgent),
    ]);
  } finally {
    lock.releaseLock();
  }

  return json_({ ok: true });
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// Stop values starting with = + - @ being treated as spreadsheet formulas.
function safe_(value) {
  var s = String(value == null ? '' : value).trim();
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
