const Pedro = require('./pedro.js');
const Player = require('./player.js');
const Phaser = require('../modules/phaser.min.js');


const generateCoordinatesMap = () => {
    const result = {};
    const digger = new ROT.Map.Digger(60, 40);
    const digCallback = (x, y, value) => {
      if (value) { return; } 
      const key = x + "," + y;
      result[key] = ".";
    }
    digger.create(digCallback.bind(this));
    return result;    
  }

module.exports = class Game {
  constructor() {
    this.map = null;            // Used to display the map
    this.mapCoordinates = null;   // Used to generate the coordinates to be used by the map
    this.game = null;
    this.engine = null;
    this.ananas = null;
    this.player = null;
    this.pedro = null;
    this.floorLayer = null;
    this.numpad = {
      n: { x: 0, y: -1 },
      e: { x: 1, y: 0 },
      s: { x: 0, y: 1 },
      w: { x: -1, y: 0 }
    };

   this._generateBoot(this);
  }

  _generateBoot(that) {
    Game.Boot = function() {
      Phaser.State.call(this.Boot);
      this.bob = null;
      this.mapCoordinates = that.mapCoordinates;
      this.game = that.game;
      this.map = that.map;
      this.floorLayer = that.floorLayer;

      this.player = that.player;
      this.pedro = that.pedro;
      this.numpad = that.numpad;
    };

    Game.Boot.prototype = Object.create(Phaser.State.prototype);
    Game.Boot.prototype.constructor = Game.Boot;

    Game.Boot.prototype._drawWholeMap = function() {
      
      for (let key in this.mapCoordinates) {
        const parts = key.split(",");
        const x = parseInt(parts[0]);
        const y = parseInt(parts[1]);
        
        this.map.putTile(0, x, y, this.floorLayer);
      }

    }

    Game.Boot.prototype._placeActors = function() {
      const freeCells = Object.keys(this.mapCoordinates);
      this.player = this._createBeing(Player, freeCells); 
    }

    Game.Boot.prototype._createBeing = function(what, freeCells) {
      const index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
      const key = freeCells.splice(index, 1)[0];
      const parts = key.split(",");
      const x = parseInt(parts[0]);
      const y = parseInt(parts[1]);

      return new what(that, x, y);
    }

    Game.Boot.prototype.preload = function() {
      this.game.load.image('sci-fi-tiles', 'assets/sci-fi-tiles.png');      
      this.game.load.image('ground_1x1', 'assets/ground_1x1.png');
      this.game.load.spritesheet('Player', 'assets/player.png', 32, 48);
      this.game.load.image('Pedro', 'assets/pedro.png');
    }

    Game.Boot.prototype.create = function() {
      this.game.stage.backgroundColor = '#2d2d2d';

      // Creates a blank tilemap
      this.map = this.game.add.tilemap();

      // Add a Tileset image to the map

      this.map.addTilesetImage('ground_1x1');

      this.floorLayer = this.map.create('floorLayer', 60, 40, 32, 32);
      this.floorLayer.scrollFactorX = 0.5;
      this.floorLayer.scrollFactorY = 0.5;

      this._drawWholeMap();

      this.numpad.n.event = this.game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_8);
      this.numpad.e.event = this.game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_6);
      this.numpad.s.event = this.game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_2); 
      this.numpad.w.event = this.game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_4);

      this._placeActors();

      // Resize the world
      this.floorLayer.resizeWorld();      
    }
   

    Game.Boot.prototype.update = function() {
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
  }

  init() {
    this.mapCoordinates = generateCoordinatesMap();


    this.game = new Phaser.Game(2048, 1024, Phaser.AUTO, 'tileset', Game.Boot);
    
    

    const scheduler = new ROT.Scheduler.Simple();
    scheduler.add(this.player, true);
    // scheduler.add(this.pedro, true);
    this.engine = new ROT.Engine(scheduler);
    this.engine.start();
  }

  _generateCoordinatesMap() {
    const digger = new ROT.Map.Digger(60, 40);
    const freeCells = [];

    const digCallback = (x, y, value) => {
      if (value) { return; } /* do not store walls */

      const key = x + "," + y;
      this.mapCoordinates[key] = ".";
      freeCells.push(key);
    }

    digger.create(digCallback.bind(this));
    // this._generateBoxes(freeCells);
    // this._drawWholeMap();

    //
    // this.pedro = this._createBeing(this.PedroClass, freeCells);
  }



 


  _generateBoxes(freeCells) {
    for (let i = 0; i < 10; i++) {
      const index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
      const key = freeCells.splice(index, 1)[0];
      this.map[key] = "*";
      if (i === 0) {
        this.ananas = key;
      }
    }
  }


}

