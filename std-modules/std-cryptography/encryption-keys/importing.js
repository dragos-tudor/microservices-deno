import { createEncryptionKey } from "./creating.js";
import { importCryptoKey } from "../crypto-keys/importing.js";
import { EncryptionOptions } from "./encryption.options.js";
import { deserializeEncryptionKey } from "./deserializing.js";
import { getEncryptionKey } from "./getting.js";

export const importEncryptionKey = async (
  encryptionKey = getEncryptionKey(),
  options = EncryptionOptions,
  format = "raw",
) => {
  const [key, iv] = deserializeEncryptionKey(encryptionKey);
  const cryptoKey = await importCryptoKey(key, options, format);
  return createEncryptionKey(cryptoKey, iv);
}
