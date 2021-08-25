const { get, paramsFilterFromUrl } = require('./utils');
const checker = require('./checker');

const handler = (options, config) => ({ originalUrl, body }) => {
  const parsedPath = `/${originalUrl
    .split('/')
    .filter((e) => e !== '')
    .join('/')}/`;
  const { part, route } = get(options, parsedPath, config);
  if (!part) return 'path unresolved';
  const params = paramsFilterFromUrl(route, parsedPath);
  const check = checker({ ...body, ...params }, part);
  if (!check) return 'wrong fields';
  return true;
};

module.exports = handler;
