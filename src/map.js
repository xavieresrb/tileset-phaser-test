const generateCoordinatesMap = () => {
  const result = {};
  const digger = new ROT.Map.Digger(60, 30);
  const digCallback = (x, y, value) => {
    if (value) {
      return;
    }
    const key = x + "," + y;
    result[key] = ".";
  };
  digger.create(digCallback.bind(this));
  return result;
};

module.exports = {
  generateCoordinatesMap
};
