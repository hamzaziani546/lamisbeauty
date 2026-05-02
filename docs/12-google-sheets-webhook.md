# Google Sheets Webhook

## Files

- `scripts/google-apps-script-webhook.js`
- `templates/orders-sheet-columns.csv`
- `templates/orders-sheet-template.csv`
- `templates/tracking-events.csv`

## Sheet Setup

1. Create a new Google Sheet.
2. Name the first tab `Orders`.
3. Add columns from `templates/orders-sheet-columns.csv`.
4. Open Extensions -> Apps Script.
5. Paste `scripts/google-apps-script-webhook.js`.
6. Add script property:

```text
WEBHOOK_SECRET=<same value as backend GOOGLE_SHEETS_WEBHOOK_SECRET>
```

7. Deploy as Web App:
   - Execute as: Me.
   - Who has access: Anyone with the link.
8. Copy Web App URL into backend env:

```env
GOOGLE_SHEETS_WEBHOOK_URL=
GOOGLE_SHEETS_WEBHOOK_SECRET=
```

## Backend Payload To Sheet

Backend should POST:

```json
{
  "webhook_secret": "secret",
  "order_id": "uuid",
  "order_number": "LB-20260501-0001",
  "status": "new",
  "customer_name": "سارة محمد",
  "phone_e164": "+9665xxxxxxxx",
  "total_sar": 349,
  "currency": "SAR",
  "payment_method": "cod",
  "items": [
    {
      "product_id": "marine-collagen-latte",
      "product_name_ar": "لاتيه الكولاجين البحري",
      "offer_id": "three",
      "quantity": 1,
      "unit_count": 3,
      "price_sar": 349,
      "source": "pdp"
    }
  ],
  "upsell_accepted": false,
  "utm_source": "tiktok",
  "utm_medium": "paid",
  "utm_campaign": "collagen_ksa",
  "utm_content": "ugc_01",
  "utm_term": "",
  "landing_page": "https://lamisbeauty.site/products/marine-collagen-latte",
  "event_id": "LB-20260501-0001",
  "fbp": "",
  "fbc": "",
  "ttp": "",
  "ttclid": "",
  "sc_click_id": "",
  "client_ip": "203.0.113.10",
  "user_agent": "Mozilla/5.0",
  "notes": ""
}
```

## Operational Notes

- The Sheet is not the source of truth. PostgreSQL is.
- Sheet delivery can fail without losing orders.
- Add a retry/admin flow later if sheet failures matter operationally.
- Keep the webhook URL private. The shared secret blocks casual misuse but is not a replacement for good operational hygiene.
