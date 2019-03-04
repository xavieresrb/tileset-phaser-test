var Game = {
  _WIDTH: 320,
  _HEIGTH: 400
};

loadApp = function() {
  
  var game = new Phaser.Game(1024, 600, Phaser.AUTO, "game");
  
  game.state.add("Game", Game.Ananas);
  
  game.state.start("Game");

  const win = nw.Window.get();
  // win.maximize();
};
