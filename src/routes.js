const { getChilds } = require('./utils');

const routes = (config) => getChilds(config)
  .filter((e) => e.endsWith('/isPoint'))
  .map((e) => `/${e.replace('/isPoint', '')}/`);

const regex = (config) => {
  const list = routes(config);
  const rList = list.map(
    (string) => new RegExp(
      `^${string
        .split('/')
        .map((s) => s.replace(/(?::.*)/gm, '[a-zA-z0-9]*'))
        .join('/')}$`,
    ),
  );
  return (string) => list[
    rList
      .map((r, i) => (r.test(string) ? i : -1))
      .find((e) => e >= 0)
  ];
};
module.exports.routes = routes;
module.exports.regex = regex;
module.exports = regex;
