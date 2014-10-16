(function () {
  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var View = Snake.View = function ($el) {
    this.$el = $el;
    this.board = new Board();
    this.bindOnEvents();
    this.beginStep();
  }

  View.DIR_FOR_KEY_CODE = {
    87: "n",
    65: "w",
    83: "s",
    68: "e"
  }

  View.prototype.bindOnEvents = function () {
    this.$el.on("keydown", function (event) {
      var direction = View.DIR_FOR_KEY_CODE[event.direction];
      this.board.snake.turn(direction);
    }.bind(this));
  };

  View.prototype.beginStep = function () {
    setInterval(function () {
      this.board.snake.move();
      var $pre = $(this.board.render());
      this.$el.append($pre);
    }.bind(this), 500)
  };
})();
