const isOneWord = (input) => {
  const regex = /\w\s+\w/;
  return !regex.test(input);
};


module.exports = isOneWord;