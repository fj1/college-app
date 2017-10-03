import {private_key, public_key} from "./env.js";

const utils = {
  generateHash(timestamp) {
    const md5 = require("md5");
    return md5(`${timestamp}${private_key}${public_key}`);
  },

  getPublicKey() {
    return public_key;
  }
};

export default utils;
