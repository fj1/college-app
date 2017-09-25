import ENV_VARIABLES from './env.js';

const utils = {
  generateHash(timestamp) {
    const md5 = require('md5');
    const private_key = ENV_VARIABLES.private_key;
    const public_key = ENV_VARIABLES.public_key;
    return md5(`${timestamp}${private_key}${public_key}`);
  },

  getPublicKey() {
    return ENV_VARIABLES.public_key;
  }
}

export default utils