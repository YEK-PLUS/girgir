const typeChecker = (value, type) => typeof value === type; // eslint-disable-line valid-typeof
const lengthChecker = (value, min, max) => {
  if (typeof value === 'string') {
    return (
      (min ? value.length >= min : true) && (max ? value.length <= max : true)
    );
  }
  if (typeof value === 'number') return (min ? value >= min : true) && (max ? value <= max : true);
  return false;
};

const allTrueArr = (arr) => arr.filter((e) => e).length === arr.length;

const checkLoop = (body, part) => Object.entries(part).map(([key, value]) => {
  let isValid = false;
  const param = body[key];

  if (key === 'isObject' || key === 'isPoint') isValid = true;
  else if (!param) isValid = false;
  else if (value.isDisabled) isValid = true;
  else if (value.isObject) isValid = allTrueArr(checkLoop(param, value));
  else if (value.isPoint) isValid = true;
  else {
    const typeCheck = typeChecker(param, value.type);
    const lengthCheck = lengthChecker(
      param,
      value.type === 'string' ? value.minLen : value.min,
      value.type === 'string' ? value.maxLen : value.max,
    );
    isValid = typeCheck && lengthCheck;
  }
  return isValid;
});

module.exports = (body, part) => allTrueArr(checkLoop(body, part));
