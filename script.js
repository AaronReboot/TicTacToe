// this code depends on jQuery, so include it in your html after including jQuery

var turnNumber = 0; // even number turns are X's; odd number turns are O's

function valueAt(row, column) {
    return $(".board-cell").eq(3 * row + column).html();
}

function setValueAt(row, column, player) {
    $(".board-cell").eq(3 * row + column).html(player);
}

// clickHandler receives the position of the square which was clicked
function clickHandler(pos) {
    // check if square is empty
    if (valueAt(pos.row, pos.column) != "") {
        alert("Hey, this square is already taken");
        // stop here so player can choose again
        return;
    }
    if (turnNumber % 2 == 0) {
        setValueAt(pos.row, pos.column, "X");
    }
    else {
        setValueAt(pos.row, pos.column, "O");
    }

    // check if there's a winner yet
    var w = winner();
    if (w == "X" || w == "O") {
        $(".winner").html(w + " wins!");
        return;
    }

    // if no winner, check if board is full, if so declare a draw
    if (turnNumber == 8) {
        $(".winner").html("Draw!");
        return;
    }
    // advance the turn counter to switch between X and O
    turnNumber++;
}

// winner determines if there's a winner on the board, if so it returns who the winner is
function winner() {
    if (checkforWin("X")) {
        return "X";
    }
    if (checkforWin("O")) {
        return "O";
    }
}

function checkforWin(player) {
    // check each row
    for (var row = 0; row < 3; row++) {
        if (checkforWinRow(player, row)) {
            return true;
        }
    }

    // check each column
    for (var column = 0; column < 3; column++) {
        if (checkforWinColumn(player, column)) {
            return true;
        }
    }

    // check each diagonal
    if (checkforWinDiagonalLeft(player)) {
        return true;
    }
    if (checkforWinDiagonalRight(player)) {
        return true;
    }

    return false;
}

// checkforWinRow checks if player provided has won the row provided
function checkforWinRow(player, row) {
    for (var column = 0; column < 3; column++) {
        if (valueAt(row, column) != player) {
            return false;
        }
    }
    return true;
}

// checkforWinColumn checks if player provided has won the column provided
function checkforWinColumn(player, column) {
    for (var row = 0; row < 3; row++) {
        if (valueAt(row, column) != player) {
            return false;
        }
    }
    return true;
}

// checkforWinDiagonalLeft checks if player provided has won the "left" diagonal
function checkforWinDiagonalLeft(player) {
    for (var i = 0; i < 3; i++) {
        if (valueAt(i, i) != player) {
            return false;
        }
    }
    return true;
}

// checkforWinDiagonalRight checks if player provided has won the "right" diagonal
function checkforWinDiagonalRight(player) {
    for (var i = 0; i < 3; i++) {
        if (valueAt(i, 2 - i) != player) {
            return false;
        }
    }
    return true;
}

/*
    $(document).ready() waits until the page is ready to be modified
*/
$(document).ready(function() {
    var numRows = 3;
    var numColumns = 3;

    // use two for loops to add all the divs needed for the board
    for (var i = 0; i < numRows; i++) {
        // each row begins with a <div class="board-row">
        var $row = $("<div class='board-row'></div>");

        for (var j = 0; j < numColumns; j++) {
            // add a cell to the new row
            var $cell = $("<div class='board-cell'></div>");
            // add a click handler for this cell, and pass it data
            // about which cell it is
            $cell.on("click", {
                row: i,
                column: j
            }, function(event) {
                clickHandler(event.data);
            });
            $row.append($cell);
        }

        $(".board").append($row);
    }
});
