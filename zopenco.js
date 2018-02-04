const ROT = require('./modules/rot.js');

const generateCoordinatesMap = () => {
  const result = {};
  const digger = new ROT.Map.Digger(60, 40);
  const digCallback = (x, y, value) => {
    if (value) { return; } /* do not store walls */
    const key = x + "," + y;
    result[key] = ".";
  }
  digger.create(digCallback.bind(this));
  return result;    
}


const map = generateCoordinatesMap();

console.log(JSON.stringify(map));