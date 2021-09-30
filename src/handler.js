const { getObj, paramsFilterFromUrl, urlFormat } = require('./utils');
const checker = require('./checker');

const handler = (routeRegex, config, { originalUrl, body }) => {
  const parsedPath = urlFormat(originalUrl);

  const route = routeRegex(parsedPath);
  if (!route) return 'path unresolved';
  
  const part = getObj(config, route.split('/'));
  const params = paramsFilterFromUrl(route, parsedPath);

  const check = checker({ ...body, ...params }, part);
  if (!check) return 'wrong fields';
  return true;
};

module.exports = handler;
