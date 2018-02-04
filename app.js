const Game = require("./src/game.js");

const nwContext = require("./src/nw-context.js");

loadApp = function() {
  const game = new Game();

  game.init();

  nwContext.maximize();
};
