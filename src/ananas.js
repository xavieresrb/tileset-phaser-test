const Player = require("./src/player.js");
const { toCoordinates } = require("./src/utils");
const { generateCoordinatesMap } = require("./src/map");

Game.Ananas = function(game) {
  this.numpad = {
    n: { x: 0, y: -1 },
    e: { x: 1, y: 0 },
    s: { x: 0, y: 1 },
    w: { x: -1, y: 0 }
  };
  this.mapCoordinates = generateCoordinatesMap();
};

Game.Ananas.prototype = {
  _placeActors: function() {
    const freeCells = Object.keys(this.mapCoordinates);
    this.player = this._createBeing(Player, freeCells);
  },

  _createBeing: function(what, freeCells) {
    const index = Phaser.Math.between(1, freeCells.length);
    const key = freeCells.splice(index, 1)[0];
    const { x, y } = toCoordinates(key);

    return new what(this, x, y);
  },

  _generateBoxes: function(freeCells) {
    for (let i = 0; i < 10; i++) {
      const index = Phaser.Math.between(0, freeCells.length - 1);
      const key = freeCells.splice(index, 1)[0];
      const { x, y } = toCoordinates(key);
      const sprite = this.game.add.sprite(x * 32, y * 32, "Box");
      sprite.scale.setTo(2, 2);

      if (i === 0) {
        this.ananas = key;
      }
    }
  },

  preload: function() {
    this.load.image("sci-fi-tiles", "assets/sci-fi-tiles.png");
    this.load.image("ground_1x1", "assets/ground_1x1.png");
    this.load.spritesheet("Player", "assets/player.png", 32, 48);
    this.load.image("Pedro", "assets/pedro.png");
    this.load.image("Box", "assets/star.png");
  },
  create: function() {
    this.game.stage.backgroundColor = "#2d2d2d";
    // Creates a blank tilemap
    this.map = this.game.add.tilemap();

    // Add a Tileset image to the map
    this.map.addTilesetImage("ground_1x1");

    this.floorLayer = this.map.create("floorLayer", 60, 40, 32, 32);

    for (let key in this.mapCoordinates) {
      const { x, y } = toCoordinates(key);

      this.map.putTile(0, x, y, this.floorLayer);
    }

    this.numpad.n.event = this.game.input.keyboard.addKey(
      Phaser.Keyboard.NUMPAD_8
    );
    this.numpad.e.event = this.game.input.keyboard.addKey(
      Phaser.Keyboard.NUMPAD_6
    );
    this.numpad.s.event = this.game.input.keyboard.addKey(
      Phaser.Keyboard.NUMPAD_2
    );
    this.numpad.w.event = this.game.input.keyboard.addKey(
      Phaser.Keyboard.NUMPAD_4
    );

    this._generateBoxes(Object.keys(this.mapCoordinates));

    this._placeActors();

    // Resize the world
    this.floorLayer.resizeWorld();
  },
  update: function() {
    if (this.numpad.n.event.isDown) {
      this.player.move(this.numpad.n.x, this.numpad.n.y);
    }
    if (this.numpad.e.event.isDown) {
      this.player.move(this.numpad.e.x, this.numpad.e.y);
    }
    if (this.numpad.s.event.isDown) {
      this.player.move(this.numpad.s.x, this.numpad.s.y);
    }
    if (this.numpad.w.event.isDown) {
      this.player.move(this.numpad.w.x, this.numpad.w.y);
    }
  }
};
