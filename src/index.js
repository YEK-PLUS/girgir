const config = require('./config');
const handler = require('./handler');
const regex = require('./routes');

const defaultOptions = {
  errorMessage: 'wrong inputs',
};

const main = (_options) => {
  const options = {
    errorMessage: _options.errorMessage || defaultOptions.errorMessage,
  };
  const routeRegex = regex(config);

  return async (req, res, next) => {
    const result = await handler(routeRegex, config, req);

    // TODO: special error messages for different inputs
    if (!result) return res.status(401).json({ error: options.errorMessage });
    if (typeof result === 'string') return res.status(401).json({ error: result });
    return next();
  };
};

module.exports = main;
