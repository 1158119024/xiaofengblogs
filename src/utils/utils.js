import CryptoJS from 'crypto-js';

// 加密
export function Encrypt(word) {
  const key = CryptoJS.enc.Utf8.parse('abcdefg123456789');

  const srcs = CryptoJS.enc.Utf8.parse(word);
  const encrypted = CryptoJS.AES.encrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
}
// 解密
export function Decrypt(word) {
  const key = CryptoJS.enc.Utf8.parse('abcdefg123456789');

  const decrypt = CryptoJS.AES.decrypt(word, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}
