
export const verifyTextSignature = (cryptoKey, signature, text) =>
  crypto.subtle.verify(
    cryptoKey.algorithm,
    cryptoKey,
    signature,
    new TextEncoder().encode(text),
  );
