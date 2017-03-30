function isEquals(val1, val2) {
  return val1 === val2;
}

function isArray(val) {
  return val instanceof Array;
}

function isUndefined(val) {
  return isEquals(val, undefined);
}

function isDefined(val) {
  return !isUndefined(val) && !isNull(val, null);
}

function isNull(val) {
  return isEquals(val, null);
}

function isString(val) {
  return isEquals(typeof val, 'string');
}

function isObject(val) {
  return isEquals(typeof val, 'object');
}

function isFunction(val) {
  return isEquals(typeof val, 'function');
}

function extendsObject(dst, src) {
  if (!isObject(dst) || !isObject(src)) {
    throw Error('extendsObject only accepts Objects');
  }
  Object.keys(src).forEach(function (item) {
    dst[item] = src[item];
  });
  return dst;
}