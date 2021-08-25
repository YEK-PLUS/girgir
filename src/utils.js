const get = (regex, path, config) => {
  const getObj = (obj, _path, defaultValue = undefined) => {
    const travel = (regexp) => String.prototype.split
      .call(_path, regexp)
      .filter(Boolean)
      .reduce(
        (res, key) => (res !== null && res !== undefined ? res[key] : res),
        obj,
      );
    const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
    return result === undefined || result === obj ? defaultValue : result;
  };
  const route = regex(path);
  if (!route) return { part: false, route };
  return { part: getObj(config, route.split('/')), route };
};

const createRoutes = (config) => {
  const getChilds = (obj) => {
    let keys = [];
    Object.keys(obj).map((key) => {
      keys.push(key);
      if (typeof obj[key] === 'object') {
        const subkeys = getChilds(obj[key]);
        keys = keys.concat(subkeys.map((subkey) => `${key}/${subkey}`));
      }
      return true;
    });
    return keys;
  };
  return getChilds(config)
    .filter((e) => e.endsWith('/isPoint'))
    .map((e) => e.replace('/isPoint', ''))
    .map((e) => `/${e}/`);
};

const regex = (list) => {
  const rList = list.map(
    (string) => new RegExp(
      string
        .split('/')
        .map((s) => s.replace(/(?::.*)/gm, '[a-zA-z0-9]*'))
        .join('/'),
    ),
  );
  return (string) => list[
    rList
      .map((r, i) => (string.replace(r, '').length === 0 ? i : -1))
      .find((e) => e >= 0)
  ];
};
const paramsFilterFromUrl = (route, url) => {
  const params = {};
  route
    .split('/')
    .map((e, i) => (e.startsWith(':') ? [e.replace(':', ''), url.split('/')[i]] : null))
    .map((param) => {
      if (param) {
        const [key, value] = param;
        params[key] = value;
      }
      return true;
    });
  return params;
};
module.exports = {
  get,
  createRoutes,
  regex,
  paramsFilterFromUrl,
};
