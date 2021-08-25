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
const checker = (fields, reqs) => {
  const requirements = Object.entries(reqs).filter(
    ([key]) => key !== 'isPoint',
  );
  return (
    !requirements
      .map(([key, req]) => {
        const value = fields[key];
        const typeCheck = typeChecker(value, req.type);
        const lengthCheck = lengthChecker(
          value,
          req.type === 'string' ? req.minLen : req.min,
          req.type === 'string' ? req.maxLen : req.max,
        );
        return !(typeCheck && lengthCheck);
      })
      .find((e) => e)
  );
};

module.exports = checker;
