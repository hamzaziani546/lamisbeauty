/**
 * Client-side Morocco mobile normalization and validation.
 * Mirrors backend app/services/phone.py
 */

const MA_PATTERNS = [
  /^\+212[67](\d{8})$/,
  /^00212[67](\d{8})$/,
  /^212[67](\d{8})$/,
  /^0[67](\d{8})$/,
  /^[67](\d{8})$/,
];

export function normalizeMaPhone(raw: string): {
  e164: string;
  digits: string;
} {
  const cleaned = raw.replace(/[\s\-\(\)]/g, "").trim();

  for (const pattern of MA_PATTERNS) {
    const m = cleaned.match(pattern);
    if (m) {
      const local8 = m[1];
      const prefix = local8[0];
      const digits = `212${prefix}${local8}`;
      return { e164: `+${digits}`, digits };
    }
  }

  throw new Error("رقم الجوال يجب أن يكون رقماً مغربياً صحيحاً يبدأ بـ 06 أو 07");
}

export function isValidMaPhone(raw: string): boolean {
  try {
    normalizeMaPhone(raw);
    return true;
  } catch {
    return false;
  }
}

/** @deprecated */
export const normalizeKsaPhone = normalizeMaPhone;
/** @deprecated */
export const isValidKsaPhone = isValidMaPhone;
