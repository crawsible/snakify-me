(function () {
  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var View = SnakeGame.View = function ($el) {
    this.$el = $el;
    this.setupBoard();

    this.bindOnEvents();
    this.beginStep();
  }

  View.DIR_FOR_KEY_CODE = {
    87: "n",
    65: "w",
    83: "s",
    68: "e"
  }

  View.KEY_CODES = (function() {
    var keyCodes = [];
    for (var keyCode in View.DIR_FOR_KEY_CODE) {
      keyCodes.push(parseInt(keyCode));
    }
    return keyCodes;
  })()

  View.prototype.setupBoard = function () {
    var height = $(window).height();
    var width = $(window).width();
    var sideLength = (height < width ? height - 52 : width - 52);

    this.$el.height(sideLength).width(sideLength);
    this.board = new SnakeGame.Board(sideLength);

    this.drawBoard();
  };

  View.prototype.drawBoard = function () {
    this.$el.append(this.board.render());
  };

  View.prototype.bindOnEvents = function () {
    $(window).on("keydown", function (event) {
      if (View.KEY_CODES.indexOf(event.keyCode) !== -1 ) {
        var direction = View.DIR_FOR_KEY_CODE[event.keyCode];
        this.board.snake.turn(direction);
      }
    }.bind(this));
  };

  View.prototype.beginStep = function () {
    setInterval(function () {
      this.board.snake.move();
      this.board.wrapSnake();
      this.$el.empty();
      this.drawBoard();
    }.bind(this), 500)
  };

})();
