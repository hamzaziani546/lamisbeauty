/**
 * Google Apps Script webhook for Lamis Beauty COD orders.
 *
 * Deployment:
 * 1. Create a Google Sheet with the columns from templates/orders-sheet-columns.csv.
 * 2. Extensions -> Apps Script.
 * 3. Paste this file.
 * 4. Set Script Property WEBHOOK_SECRET to the same value as backend GOOGLE_SHEETS_WEBHOOK_SECRET.
 * 5. Deploy -> Web app -> Execute as me -> Anyone with link.
 * 6. Put the Web App URL into backend GOOGLE_SHEETS_WEBHOOK_URL.
 */

const SHEET_NAME = 'Orders';

function doPost(e) {
  try {
    const secret = PropertiesService.getScriptProperties().getProperty('WEBHOOK_SECRET');
    const payload = JSON.parse(e.postData.contents || '{}');

    if (secret && payload.webhook_secret !== secret) {
      return jsonResponse({ ok: false, error: 'unauthorized' }, 401);
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    ensureHeader(sheet);

    const row = [
      new Date(),
      payload.order_id || '',
      payload.order_number || '',
      payload.status || 'new',
      payload.customer_name || '',
      payload.phone_e164 || '',
      payload.total_sar || '',
      payload.currency || 'SAR',
      payload.payment_method || 'cod',
      stringifyItems(payload.items),
      payload.upsell_accepted ? 'yes' : 'no',
      payload.utm_source || '',
      payload.utm_medium || '',
      payload.utm_campaign || '',
      payload.utm_content || '',
      payload.utm_term || '',
      payload.landing_page || '',
      payload.event_id || '',
      payload.fbp || '',
      payload.fbc || '',
      payload.ttp || '',
      payload.ttclid || '',
      payload.sc_click_id || '',
      payload.client_ip || '',
      payload.user_agent || '',
      payload.notes || ''
    ];

    sheet.appendRow(row);

    return jsonResponse({ ok: true, order_number: payload.order_number || '' }, 200);
  } catch (error) {
    return jsonResponse({ ok: false, error: String(error) }, 500);
  }
}

function ensureHeader(sheet) {
  if (sheet.getLastRow() > 0) return;

  sheet.appendRow([
    'created_at',
    'order_id',
    'order_number',
    'status',
    'customer_name',
    'phone_e164',
    'total_sar',
    'currency',
    'payment_method',
    'items',
    'upsell_accepted',
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_content',
    'utm_term',
    'landing_page',
    'event_id',
    'fbp',
    'fbc',
    'ttp',
    'ttclid',
    'sc_click_id',
    'client_ip',
    'user_agent',
    'notes'
  ]);
}

function stringifyItems(items) {
  if (!Array.isArray(items)) return '';

  return items
    .map(function (item) {
      return [
        item.product_id || '',
        item.product_name_ar || '',
        item.offer_id || '',
        'qty=' + (item.quantity || ''),
        'units=' + (item.unit_count || ''),
        'price=' + (item.price_sar || ''),
        'source=' + (item.source || '')
      ].join(' | ');
    })
    .join('\n');
}

function jsonResponse(body, statusCode) {
  return ContentService
    .createTextOutput(JSON.stringify(Object.assign({ statusCode: statusCode }, body)))
    .setMimeType(ContentService.MimeType.JSON);
}
