const CryptoJS = require("crypto-js");

const SECRET = "tuttifrutti";

module.exports = {
  encrypt: value => CryptoJS.AES.encrypt(value, SECRET).toString(),
  decrypt: value =>
    CryptoJS.AES.decrypt(value, SECRET).toString(CryptoJS.enc.Utf8)
};
