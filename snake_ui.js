(function(root) {
  var SnakeGame = root.SnakeGame = (root.SnakeGame || {});
  var SnakeUI = SnakeGame.SnakeUI = (SnakeGame.SnakeUI || {});

  var View = SnakeUI.View = function (htmlEl) {
    this.$el = htmlEl;
  }

  View.prototype.handleKeyEvent = function (event) {
    if (this.moveFlag === false) {
      switch(event.keyCode) {
        case 87:
        case 38:
          if (this.snake.direction !== "S") {
            this.snake.turn("N");
            this.moveFlag = true;
          }
          break;
        case 68:
        case 39:
          if (this.snake.direction !== "W") {
            this.snake.turn("E");
            this.moveFlag = true;
          }
          break;
        case 83:
        case 40:
          if (this.snake.direction !== "N") {
            this.snake.turn("S");
            this.moveFlag = true;            
          }
          break;
        case 65:
        case 37:
          if (this.snake.direction !== "E") {
            this.snake.turn("W");
            this.moveFlag = true;            
          }
          break;
        default:
          break;
      }
    }
  };

  View.prototype.resetFlag = function () {
    this.moveFlag = false;
  }


 
  View.prototype.start = function () {
    this.snake = new SnakeGame.Snake();
    var view = this

    // function step () {
    //   this.snake.render();
    //   this.snake.move();
    // }

    $(document).ready(function() {
      $(document).keydown(function(event) {
        view.handleKeyEvent(event);
      });
    });

    var timerId = 0;
    
    timerId = setInterval(function () {
      view.resetFlag();
      view.snake.render();
      view.snake.move();
      if (view.snake.isDead) {
        clearInterval(timerId);
      }
    }, 150);
  };

})(this);