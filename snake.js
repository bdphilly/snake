(function(root) {
  var SnakeGame = root.SnakeGame = (root.SnakeGame || {})

  var Snake = SnakeGame.Snake = function () {
    this.direction = "N";
    var startPos = new Coord(10, 10)
    this.segments = [startPos];
    this.eating = false;
  }

  var Coord = SnakeGame.Coord = function (x, y) {
    this.row = x;
    this.col = y;
  }

  Coord.prototype.pos = function () {
    return [this.row, this.col];
  };

  Snake.prototype.move = function () {
    var head = this.segments[this.segments.length - 1];
    switch(this.direction) {
      case "N":
        var newHeadPos = head.plus([-1,0])
        this.segments.push(new Coord(newHeadPos[0], newHeadPos[1]));
        break;
      case "E":
        var newHeadPos = head.plus([0,1])
        this.segments.push(new Coord(newHeadPos[0], newHeadPos[1]));
        break;
      case "S":
        var newHeadPos = head.plus([1,0])
        this.segments.push(new Coord(newHeadPos[0], newHeadPos[1]));
        break;
      case "W":
        var newHeadPos = head.plus([0,-1])
        this.segments.push(new Coord(newHeadPos[0], newHeadPos[1]));
        break;
      default:
        break;
    }
    if (!this.eating) this.segments.shift();
    this.eating = false;
  };

  Snake.prototype.turn = function (dir) {
    this.direction = dir;
  };

  // Snake.prototype.eat = function () {
  //
  // };

  Coord.prototype.plus = function (coords) {
    return [this.row + coords[0], this.col + coords[1]];
  };

  var Board = SnakeGame.Board = function () {
    this.grid = [];
    for (var i = 0; i < 20; i++) {
      this.grid.push(new Array(20));
    }
    this.snake = new Snake;
    this.apples = [new Coord(5,5), new Coord(2,2), new Coord(12,6), new Coord(12,7), new Coord(12,8)];
  }

  Board.prototype.render = function () {
    for (var i = 0; i < 20; i++) {
      for (var j = 0; j < 20; j++) {
        this.grid[i][j] = " . ";
      }
    }

    for (var s = 0; s < this.snake.segments.length; s++) {
      var row = this.snake.segments[s].row;
      var col = this.snake.segments[s].col;
      this.grid[row][col] = " S ";
    }

    for (var a = 0; a < this.apples.length; a++) {
      var row = this.apples[a].row;
      var col = this.apples[a].col;

      if (this.grid[row][col] === " S ") {
        this.apples.splice(a, 1);
        this.snake.eating = true;
        a += 1000;
      } else {
        this.grid[row][col] = ' a ';
      }
    }

    var display = '';
    for (var i = 0; i < 20; i++) {
      for (var j = 0; j < 20; j++) {
        display += this.grid[i][j];
      }
      display += '<br>';
    }
    return display;
  }



})(this);

