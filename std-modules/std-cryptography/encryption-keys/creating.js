
export const createEncryptionKey = (cryptoKey, iv) => Object.freeze({
  cryptoKey, iv
})

export const createEncryptionParam = ({cryptoKey, iv}) => Object({
  name: cryptoKey.algorithm.name, iv
})