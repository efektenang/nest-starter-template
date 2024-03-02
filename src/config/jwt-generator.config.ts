import * as CryptoJS from 'crypto-js';

export function encToken(token: any) {
  let store = '';
  let splitToken = token.split('.');

  const encryptPayload = CryptoJS.AES.encrypt(
    splitToken[1],
    process.env.CRYPTO_KEY,
  );

  splitToken[1] = encryptPayload.toString();
  store = splitToken.join('.');

  return store;
}

export function decToken(token: any) {
  let store = '';
  let splitToken = token.split('.')

  const decryptedBytes = CryptoJS.AES.decrypt(splitToken[1], process.env.CRYPTO_KEY);

  splitToken[1] = decryptedBytes.toString(CryptoJS.enc.Utf8);
  store = splitToken.join('.');

  return store;
}
