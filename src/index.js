const config = require('./config');
const handlerCreator = require('./handler');
const { createRoutes, regex } = require('./utils');

const defaultOptions = {
  errorMessage: 'wrong inputs',
};

const main = (_options) => {
  const options = {
    errorMessage: _options.errorMessage || defaultOptions.errorMessage,
  };
  const routes = createRoutes(config);
  const routeRegex = regex(routes);
  const handler = handlerCreator(routeRegex, config);
  return async (req, res, next) => {
    const result = await handler(req);

    // TODO: special error messages for different inputs
    if (!result) return res.status(401).json({ error: options.errorMessage });
    if (typeof result === 'string') return res.status(401).json({ error: result });
    return next();
  };
};

module.exports = main;
