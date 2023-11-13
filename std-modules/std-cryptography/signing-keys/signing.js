
export const signText = (signingKey, text) =>
  crypto.subtle.sign(
    signingKey.algorithm,
    signingKey,
    new TextEncoder().encode(text).buffer,
  );
