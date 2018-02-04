module.exports = class Player {
  constructor(Game, x, y) {
    this._x = x;
    this._y = y;
    this.Game = Game;
    this.sprite = this.Game.game.add.sprite((this._x) * 32, (this._y -1) * 32, 'Player'); 
  }

  getX() { return this._x };
  getY() { return this._y };

  _draw() {    
  this.sprite.x = (this._x)  * 32;
  this.sprite.y = (this._y - 1)  * 32  
};

  move(x, y) {
    const newX = this._x + x;
    const newY = this._y + y;
    this.Game.game.debug.text(`previous: x:${this._x}, y:${this._y} current: x:${newX}, y: ${newY}`, 10, 10, 'red');     
    const newKey = newX + "," + newY;
    
    if (!(newKey in this.Game.mapCoordinates)) { return; } 
  
   //  this.Game.display.draw(this._x, this._y, this.Game.mapCoordinates[this._x + "," + this._y]);
    this._x = newX;
    this._y = newY;
    this._draw();
  }

  _checkBox() {
    /*
    const key = this._x + "," + this._y;
    if (this.Game.map[key] != "*") {
      alert("There is no box here!");
    } else if (key == this.Game.ananas) {
      alert("Hooray! You found an ananas and won this game.");
      this.Game.engine.lock();
      window.removeEventListener("keydown", this);
    } else {
      alert("This box is empty :-(");
    }*/
  }

  /*
  handleEvent(e) {   
    alert('mierda conyo2');
    const keyMap = {};
    keyMap[38] = 0;
    keyMap[33] = 1;
    keyMap[39] = 2;
    keyMap[34] = 3;
    keyMap[40] = 4;
    keyMap[35] = 5;
    keyMap[37] = 6;
    keyMap[36] = 7;
  
    const code = e.keyCode;
  
    if (code == 13 || code == 32) {
      this._checkBox();
      return;
    }
  
    if (!(code in keyMap)) { return; }
  
    const diff = ROT.DIRS[8][keyMap[code]];
    const newX = this._x + diff[0];
    const newY = this._y + diff[1];
    const newKey = newX + "," + newY;
    
    if (!(newKey in this.Game.mapCoordinates)) { return; } 
  
   //  this.Game.display.draw(this._x, this._y, this.Game.mapCoordinates[this._x + "," + this._y]);
    this._x = newX;
    this._y = newY;
    this._draw();
    window.removeEventListener("keydown", this);
    this.Game.engine.unlock();
}*/
}