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

const check = (value,req) => {
  const typeCheck = typeChecker(value, req.type);
  const lengthCheck = lengthChecker(
    value,
    req.type === 'string' ? req.minLen : req.min,
    req.type === 'string' ? req.maxLen : req.max,
  );
  return typeCheck && lengthCheck
}

const checkLoop = (body, part) => Object.entries(part).map(([key, value]) => {
  let isValid = false;
  const param = body[key];

  if (key === 'isObject' || key === 'isPoint' || key === 'isCollection' || key === 'isArray') isValid = true;
  else if (!param) isValid = false;
  else if (value.isDisabled) isValid = true;
  else if (value.isArray) isValid = allTrueArr(param.map((prm)=>(check(prm, value))))
  else if (value.isCollection) isValid = allTrueArr(param.map((prm)=>allTrueArr(checkLoop(prm, value))));
  else if (value.isObject) isValid = allTrueArr(checkLoop(param, value));
  else if (value.isPoint) isValid = true;
  else isValid = check(param, value);
  return isValid;
});

module.exports = (body, part) => allTrueArr(checkLoop(body, part));
