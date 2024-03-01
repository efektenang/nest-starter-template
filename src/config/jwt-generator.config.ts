import * as CryptoJS from 'crypto-js';

export function encToken(token: any) {
  const payloadString = JSON.stringify(token);
  const encryptPayload = CryptoJS.AES.encrypt(
    payloadString,
    process.env.CRYPTO_KEY,
  ).toString();

  return encryptPayload;
}

export function decToken(token: string) {
  const decryptedBytes = CryptoJS.AES.decrypt(token, process.env.CRYPTO_KEY);

  const decryptedPayloadString = decryptedBytes.toString(CryptoJS.enc.Utf8);
  const decryptedPayload = JSON.parse(decryptedPayloadString);

  return decryptedPayload;
}
