/**
 * compares two objects. Returns **true** if they're equal.
 * @param {Object} object1
 * @param {Object} object2
 * @returns {boolean}
 */
export function compare(object1, object2) {
  let equal = true;
  Object.keys(object1).forEach((key) => {
    if (object2[key] !== object1[key]) equal = false;
  });
  return equal;
}

/**
 * Removes empty fields in  objects
 * @param {Object} data
 * @returns {Object}
 */
export function clean(data) {
  const cleanData = {};
  Object.keys(data).forEach((field) => {
    if (data[field]) cleanData[field] = data[field];
  });
  return cleanData;
}
