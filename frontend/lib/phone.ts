/**
 * Client-side KSA phone normalization and validation.
 * Mirrors the backend logic in app/services/phone.py.
 */

const KSA_PATTERNS = [
  /^\+9665(\d{8})$/,
  /^009665(\d{8})$/,
  /^9665(\d{8})$/,
  /^05(\d{8})$/,
  /^5(\d{8})$/,
];

export function normalizeKsaPhone(raw: string): {
  e164: string;
  digits: string;
} {
  const cleaned = raw.replace(/[\s\-\(\)]/g, "").trim();

  for (const pattern of KSA_PATTERNS) {
    const m = cleaned.match(pattern);
    if (m) {
      const local8 = m[1];
      const digits = `9665${local8}`;
      return { e164: `+${digits}`, digits };
    }
  }

  throw new Error("رقم الجوال يجب أن يكون رقماً سعودياً صحيحاً يبدأ بـ 05");
}

export function isValidKsaPhone(raw: string): boolean {
  try {
    normalizeKsaPhone(raw);
    return true;
  } catch {
    return false;
  }
}
