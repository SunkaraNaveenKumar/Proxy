const _ = require("lodash");

const fetchFeilds = (arr, feilds) => {
  return arr.map((obj) => _.pick(obj, feilds));
};

module.exports = fetchFeilds;
