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

const urlFormat = (url) => `/${url
  .split('/')
  .filter((e) => e !== '')
  .join('/')}/`;

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

module.exports.paramsFilterFromUrl = paramsFilterFromUrl;
module.exports.getChilds = getChilds;
module.exports.urlFormat = urlFormat;
module.exports.getObj = getObj;
