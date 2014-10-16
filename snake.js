(function () {
  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  Array.prototype.sumWith = function (that) {
    if (!(that instanceof Array) || this.length !== that.length) {
      throw "ArgumentError: argument not an array of equal length to receiver";
    }

    return this.map(function (el, idx) {
      return el + that[idx];
    });
  };


  var Snake = SnakeGame.Snake = function () {
    var randIdx = Math.floor(Math.random() * 4);
    this.direction = Snake.DIR_CHAR_VALUES["e"];

    this.segments = [Snake.FIRST_SEGMENT];
    for (var i = 0; i < 3; i++) {
      var lastSegment = this.segments[this.segments.length - 1];
      this.segments.push(lastSegment.sumWith([-1, 0]));
    }
  }

  Snake.FIRST_SEGMENT = [10, 10];
  Snake.DIR_CHARS = ["n", "e", "s", "w"];
  Snake.DIR_CHAR_VALUES = {
    "n": [-1, 0],
    "e": [0, 1],
    "s": [1, 0],
    "w": [0, -1]
  }

  Snake.prototype.move = function () {
    var headSegment = this.segments[0];
    this.segments[0] = this.segments[0].sumWith(this.direction);

    for (var i = 1; i < this.segments.length; i++) {
      var newHeadSegment = this.segments[i];
      this.segments[i] = headSegment;
      headSegment = newHeadSegment;
    }
  };

  Snake.prototype.turn = function (dirChar) {
    this.direction = Snake.DIR_CHAR_VALUES[dirChar];
  };

  Snake.prototype.colsForSegmentsInRow = function (rowIdx) {
    var segmentsInRow = this.segments.filter(function (segment) {
      return segment[0] === rowIdx;
    });

    return segmentsInRow.map(function (segment) {
      return segment[1];
    });
  };


  var Board = SnakeGame.Board = function () {
    this.snake = new Snake();
  }

  Board.SIZE = 20;

  Board.prototype.render = function () {
    var renderString = "<pre>";

    for (var i = 0; i < Board.SIZE; i++) {
      var renderStringRow = "";
      var snakeCols = this.snake.colsForSegmentsInRow(i);

      for (var j = 0; j < Board.SIZE; j++) {
        if (snakeCols.indexOf(j) !== -1) {
          renderStringRow += " S ";
        } else {
          renderStringRow += " . ";
        }
      }

      renderStringRow += "\n";
      renderString += renderStringRow;
    }

    renderString += "</pre>";
    return renderString;
  };

})();
