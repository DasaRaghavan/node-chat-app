var isRealString = (str) => {
  // console.log(str)
  return typeof(str) === 'string' && str.trim().length > 0;
};

module.exports = {isRealString};
