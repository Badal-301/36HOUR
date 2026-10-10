/**
 * Registration reference generator (isomorphic — browser + Node).
 * Produces unambiguous codes like "DS36-K7QM4T" (no 0/O/1/I/L).
 */

const REFERENCE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

export function generateReference(): string {
  let code = "";
  const cryptoObj =
    typeof crypto !== "undefined"
      ? crypto
      : (globalThis as { crypto?: Crypto }).crypto;
  if (cryptoObj?.getRandomValues) {
    const bytes = new Uint8Array(6);
    cryptoObj.getRandomValues(bytes);
    bytes.forEach((b) => {
      code += REFERENCE_ALPHABET[b % REFERENCE_ALPHABET.length];
    });
  } else {
    for (let i = 0; i < 6; i++) {
      code +=
        REFERENCE_ALPHABET[
          Math.floor(Math.random() * REFERENCE_ALPHABET.length)
        ];
    }
  }
  return `DS36-${code}`;
}
