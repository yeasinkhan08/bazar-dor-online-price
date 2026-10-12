// Bengali digits, indexed 0-9
const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

const DAYS = [
  "রবিবার",
  "সোমবার",
  "মঙ্গলবার",
  "বুধবার",
  "বৃহস্পতিবার",
  "শুক্রবার",
  "শনিবার",
];
const MONTHS = [
  "জানুয়ারি",
  "ফেব্রুয়ারি",
  "মার্চ",
  "এপ্রিল",
  "মে",
  "জুন",
  "জুলাই",
  "আগস্ট",
  "সেপ্টেম্বর",
  "অক্টোবর",
  "নভেম্বর",
  "ডিসেম্বর",
];

// 148 -> "১৪৮"
export function toBn(value) {
  return String(value).replace(/\d/g, (digit) => BN_DIGITS[digit]);
}

// 1850 -> "১,৮৫০ টাকা" | 149.5 -> "১৪৯.৫০ টাকা"
export function formatPrice(amount) {
  const decimals = Number.isInteger(amount) ? 0 : 2;
  const text = amount.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `${toBn(text)} টাকা`;
}

// { dir: "up", pct: 2.1 } -> "▲ ২.১%"
export function formatChange(change) {
  const pct = toBn(Math.abs(change.pct).toFixed(1));
  if (change.dir === "up") return `▲ ${pct}%`;
  if (change.dir === "down") return `▼ ${pct}%`;
  return `—${pct}%`;
}

// "kg" -> "কেজি"
export function unitName(unit) {
  const names = { kg: "কেজি", litre: "লিটার", dozen: "ডজন", piece: "পিস" };
  return names[unit] || unit;
}

// "kg" -> "প্রতি কেজি"
export function unitLabel(unit) {
  return `প্রতি ${unitName(unit)}`;
}

// Date in Bangladesh time -> "শনিবার, ১০ অক্টোবর, ২০২৬"
export function formatBanglaDate(date = new Date()) {
  // Bangladesh is UTC+6, so we add 6 hours and read the UTC values.
  // This gives the same answer on any server or browser.
  const dhaka = new Date(date.getTime() + 6 * 60 * 60 * 1000);
  const day = DAYS[dhaka.getUTCDay()];
  const month = MONTHS[dhaka.getUTCMonth()];
  return `${day}, ${toBn(dhaka.getUTCDate())} ${month}, ${toBn(dhaka.getUTCFullYear())}`;
}
