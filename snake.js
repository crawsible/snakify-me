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
      this.segments.push(lastSegment.sumWith([0, -1]));
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


  var Board = SnakeGame.Board = function (sideLength) {
    this.sideLength = sideLength;
    this.snake = new Snake();
  }

  Board.SIZE = 25;

  Board.prototype.cellSideLength = function () {
    return (this.sideLength - ( (Board.SIZE - 1) * 2)) / Board.SIZE;
  };

  Board.prototype.wrapSnake = function () {
    this.snake.segments[0] = this.snake.segments[0].map(function (ord) {
      return (ord + Board.SIZE) % Board.SIZE;
    })
  };

  Board.prototype.render = function () {
    rows = [];

    for (var i = 0; i < Board.SIZE; i++) {
      var $row = $("<div></div>");
      $row.height(this.cellSideLength());
      $row.addClass("row");

      var snakeCols = this.snake.colsForSegmentsInRow(i);
      for (var j = 0; j < Board.SIZE; j++) {
        var $cell = $("<div></div>");
        $cell.width(this.cellSideLength());
        $cell.addClass("cell");

        if (snakeCols.indexOf(j) !== -1) {
          $cell.addClass("snake_segment");
        }

        $row.append($cell);
      }

      rows.push($row);
    }

    return rows;
  };

})();
