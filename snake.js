(function(root) {
  var SnakeGame = root.SnakeGame = (root.SnakeGame || {})

  var Snake = SnakeGame.Snake = function (board) {
    this.direction = "N";
    var startLink = 210;
    this.segments = [startLink];
    this.eating = false;
    this.isDead = false;
    this.board = board;
    this.apple = 50;
  }

  var Board = SnakeGame.Board = function () {
    // this.apple = 50;
    // for (var i = 0; i < 20; i++) {
    //   this.grid.push(new Array(20));
    // }
    this.snake = new Snake;
    
    // while (this.apples.length === 0) {
    //   var newApple = _.random(0, 399);
    //   if (!_.contains(this.snake.segments, newApple)) {
    //     this.apples.push(newApple);
    //   }
    // }
  }

  Snake.prototype.checkEating = function () {
    var head = _.last(this.segments)
    if (head !== this.apple) {
      this.segments.shift();
    } else {
      while (!_.contains(this.segments, this.apple)) {
        this.apple = _.random(0, 399);
      }
    }
  };

  // if (!this.eating) this.segments.shift();

  Snake.prototype.move = function () {
    var head = this.segments[this.segments.length - 1];

    switch(this.direction) {
      case "N":
        var newHeadPos = head - 20;
        if (newHeadPos < 0) {
          debugger
          console.log(newHeadPos);
          this.isDead = true;
          break;
        }
        this.segments.push(newHeadPos);
        
        break;
      case "E":
        var newHeadPos = head + 1;
        if (newHeadPos % 20 === 0) {
          console.log(newHeadPos);
          this.isDead = true;
          break;
        }
        this.segments.push(newHeadPos);
        
        break;
      case "S":
        var newHeadPos = head + 20;
        if (newHeadPos > 400) {
          console.log(newHeadPos);
          this.isDead = true;
          break;
        }
        this.segments.push(newHeadPos);
        
        break;
      case "W":
        var newHeadPos = head - 1;
        if (head % 20 === 0) {
          console.log(newHeadPos);
          this.isDead = true;
          break;
        }
        this.segments.push(newHeadPos);
        
        break;
      default:
        break;
    }
    if (this.isDead) { 
      debugger
      alert('dead1')
    }

    this.checkEating();
    // this.segments.shift();
  };

  Snake.prototype.turn = function (dir) {
    this.direction = dir;
  };

  // Snake.prototype.eat = function () {
  //
  // };

  // Coord.prototype.plus = function (coords) {
  //   return [this.row + coords[0], this.col + coords[1]];
  // };

  

  Board.prototype.render_ascii = function () {

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
  },

  Board.prototype.render = function () {
    $('#board').empty();
    for (var i = 0; i < 400; i++) {
      if (_.contains(this.snake.segments, i)) {
        $('#board').append("<div class='square snake' data-id='" + i + "'></div>");
      } else if (this.snake.apple === i) {
        $('#board').append("<div class='square apple' data-id='" + i + "'></div>");
      } else {
        $('#board').append("<div class='square' data-id='" + i + "'></div>");    
      }
    };

    // _.each(this.snake.segments, function(segment) {

    // }) 

    // for (var i = 0; i < 20; i++) {
    //   for (var j = 0; j < 20; j++) {
    //     this.grid[i][j] = " . ";
    //   }
    // }

    // for (var s = 0; s < this.snake.segments.length; s++) {
    //   var row = this.snake.segments[s].row;
    //   var col = this.snake.segments[s].col;
    //   this.grid[row][col] = " S ";
    // }

    // for (var a = 0; a < this.apples.length; a++) {
    //   var row = this.apples[a].row;
    //   var col = this.apples[a].col;

    //   if (this.grid[row][col] === " S ") {
    //     this.apples.splice(a, 1);
    //     this.snake.eating = true;
    //     a += 1000;
    //   } else {
    //     this.grid[row][col] = ' a ';
    //   }
    // }

    // var display = '';
    // for (var i = 0; i < 20; i++) {
    //   for (var j = 0; j < 20; j++) {
    //     display += this.grid[i][j];
    //   }
    //   display += '<br>';
    // }
    // return display;
  }


})(this);

