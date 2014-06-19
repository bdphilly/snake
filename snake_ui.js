(function(root) {
  var SnakeGame = root.SnakeGame = (root.SnakeGame || {});
  var SnakeUI = SnakeGame.SnakeUI = (SnakeGame.SnakeUI || {});

  var View = SnakeUI.View = function (htmlEl) {
    this.$el = htmlEl;


  }

  View.prototype.handleKeyEvent = function (event) {
    switch(event.keyCode) {
      case 87:
        this.snake.turn("N");
        break;
      case 68:
        this.snake.turn("E");
        break;
      case 83:
        this.snake.turn("S");
        break;
      case 65:
        this.snake.turn("W");
        break;
      default:
        break;
    }
  };

  View.prototype.start = function () {
    this.snake = new SnakeGame.Snake();
    var view = this

    // var HTML = this.snake.render();

    function step () {
      this.snake.render();
      this.snake.move();
    }

    $(document).ready(function() {
      $(document).keydown(function(event) {
        view.handleKeyEvent(event);
      });
    });

    var timerId = 0;
    // if (timerId)clearInteral(timerId)
    timerId = setInterval(function () {
      view.snake.render();
      view.snake.move();
      if (view.snake.isDead) {
        clearInterval(timerId);
      }
    }, 200);
  };

})(this);