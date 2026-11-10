// Polska odmiana liczebników: 1 pytanie, 2–4 pytania, 5+ pytań (ale 22 pytania, 12 pytań).
export const plural = (n, one, few, many) =>
  n === 1 ? one : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? few : many
