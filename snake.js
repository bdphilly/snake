(function(root) {
  var SnakeGame = root.SnakeGame = (root.SnakeGame || {})

  var Snake = SnakeGame.Snake = function (board) {
    this.direction = "N";
    var startLink = 210;
    this.segments = [startLink];
    this.isDead = false;
    this.board = board;
    this.apple = _.random(0, 399);
  };

  var Board = SnakeGame.Board = function () {
    this.snake = new Snake;
  };

  Snake.prototype.checkEating = function () {
    var head = _.last(this.segments)
    if (head !== this.apple) {
      this.segments.shift();
    } else {
      while (_.contains(this.segments, this.apple)) {
        this.apple = _.random(0, 399);
      }
    }
  };

  Snake.prototype.move = function (id) {
    var head = this.segments[this.segments.length - 1];

    switch(this.direction) {
      case "N":
        var newHeadPos = head - 20;
        if (newHeadPos < 0) {
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
    if (_.uniq(this.segments).length !== this.segments.length) {
      this.isDead = true;
    }

    if (this.isDead) { 
      // this.renderDeath();
      this.isDead = true;
    }
    this.checkEating();
  };

  Snake.prototype.turn = function (dir) {
    this.direction = dir;
  };

  Snake.prototype.render = function () {
    $('#board').empty();
    for (var i = 0; i < 400; i++) {
      if (_.contains(this.segments, i)) {
        $('#board').append("<div class='square snake' data-id='" + i + "'></div>");
      } else if (this.apple === i) {
        $('#board').append("<div class='square apple' data-id='" + i + "'></div>");
      } else {
        $('#board').append("<div class='square' data-id='" + i + "'></div>");    
      }
    };
  };

  Snake.prototype.renderDeath = function () {
    $('#board').empty();
    for (var i = 0; i < 400; i++) {
      $('#board').append("<div class='square death' data-id='" + i + "'></div>");
    }
  };

})(this);