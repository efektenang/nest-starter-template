import * as crypto from 'crypto';

export function genRandomString(length: number) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
}

export function hashing(password: any, salt: any) {
  try {
    const hash = crypto.createHmac('sha256', salt);
    hash.update(`${+process.env.AFX_EXTEND_CRYPTO_KEY}${password}`);
    const value = hash.digest('hex');

    return {
      salt: salt,
      hash: value,
    };
  } catch (er) {
    return null;
  }
}

export function encryptPassword(password: string) {
  let salt = genRandomString(+process.env.AFX_LENGTH_SALT);
  let saltHash = hashing(password, salt);
  return saltHash;
}
