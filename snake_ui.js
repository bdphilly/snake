(function(root) {
  var SnakeGame = root.SnakeGame = (root.SnakeGame || {});
  var SnakeUI = SnakeGame.SnakeUI = (SnakeGame.SnakeUI || {});

  var View = SnakeUI.View = function (htmlEl) {
    this.$el = htmlEl;


  }

  View.prototype.handleKeyEvent = function (event) {
    switch(event.keyCode) {
      case 87:
        this.board.snake.turn("N");
        break;
      case 68:
        this.board.snake.turn("E");
        break;
      case 83:
        this.board.snake.turn("S");
        break;
      case 65:
        this.board.snake.turn("W");
        break;
      default:
        break;
    }
  };

  View.prototype.start = function () {
    this.board = new SnakeGame.Board();
    //makes snake turn
    var view = this

    // function step () {
    //   var asciiHTML = this.board.render();
    //   this.board.snake.move();
    //   this.$el.empty();
    //   this.$el.append(asciiHTML);
    // }

    var HTML = this.board.render();

    function step () {
      var HTML = this.board.render();
      this.board.snake.move();
    }

    $(document).ready(function() {
      $(document).keydown(function(event) {
        view.handleKeyEvent(event);
      });
    });

    setInterval(step.bind(this), 300);
  };

})(this);