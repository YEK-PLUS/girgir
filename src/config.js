const path = require('path');

const configPath = path.join(process.cwd(), '.girgirrc.js');
// eslint-disable-next-line import/no-dynamic-require
module.exports = require(configPath);
