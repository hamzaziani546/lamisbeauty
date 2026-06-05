/**
 * Google Apps Script webhook for Lamis Beauty COD orders.
 *
 * Sheet columns (must match exactly):
 *   date | order ID | Country | name | phone | product | SKU | quantity | total price | currency | status | confirmation_sent_at | confirmed_at
 *
 * Tabs: Sheet1 (all orders), confirmed, follow_up
 *
 * Deployment:
 * 1. Open your Google Sheet ("orders Lamis store").
 * 2. Extensions → Apps Script.
 * 3. Paste this file → Save.
 * 4. Deploy → New deployment → Web app → Execute as: Me → Who has access: Anyone.
 * 5. Copy the Web App URL into backend env var GOOGLE_SHEETS_WEBHOOK_URL.
 */

var SHEET_NAME = 'Sheet1';
var HEADER = [
  'date',
  'order ID',
  'Country',
  'name',
  'phone',
  'product',
  'SKU',
  'quantity',
  'total price',
  'currency',
  'status',
  'confirmation_sent_at',
  'confirmed_at'
];

function setupOrderSheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  ['Sheet1', 'confirmed', 'follow_up'].forEach(function(name) {
    var sheet = ss.getSheetByName(name) || ss.insertSheet(name);
    _ensureHeader(sheet);
  });
}

function doPost(e) {
  try {
    var payload = JSON.parse(e.postData.contents || '{}');

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    }

    _ensureHeader(sheet);

    var row = [
      payload.date || '',
      payload.order_id || '',
      payload.country || 'Morocco',
      payload.name || '',
      payload.phone || '',
      payload.product || '',
      payload.sku || '',
      payload.quantity || '',
      payload.total_price || '',
      payload.currency || 'MAD',
      payload.status || 'new',
      '',
      ''
    ];

    sheet.appendRow(row);

    return _jsonResponse({ ok: true, order_id: payload.order_id || '' }, 200);
  } catch (error) {
    return _jsonResponse({ ok: false, error: String(error) }, 500);
  }
}

function _ensureHeader(sheet) {
  if (sheet.getLastRow() > 0) return;
  sheet.appendRow(HEADER);
}

function _jsonResponse(body, statusCode) {
  return ContentService
    .createTextOutput(JSON.stringify({ statusCode: statusCode, ok: body.ok, order_id: body.order_id || '', error: body.error || '' }))
    .setMimeType(ContentService.MimeType.JSON);
}
