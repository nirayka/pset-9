///////////////////// CONSTANTS /////////////////////////////////////
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];


///////////////////// APP STATE (VARIABLES) /////////////////////////
let board;
let turn;
let win;
let xWins = 0;
let oWins = 0;
let firstPlayer;
let turnCount;

///////////////////// CACHED ELEMENT REFERENCES /////////////////////
const squares = Array.from(document.querySelectorAll("#board div"));
const message = document.getElementById("turnHeader");

///////////////////// EVENT LISTENERS ///////////////////////////////
window.onload = init;
document.getElementById("board").onclick = takeTurn;
document.getElementById("reset-button").onclick = init;
document.getElementById("x_turn").onclick = xStarts;
document.getElementById("o_turn").onclick = oStarts;

///////////////////// FUNCTIONS /////////////////////////////////////

function init() {
  board = [
    "", "", "", "", "", "", "",
    "", "", "", "", "", "", "",
    "", "", "", "", "", "", "",
    "", "", "", "", "", "", "",
    "", "", "", "", "", "", "",
    "", "", "", "", "", "", "",
  ]
  turn = "x"
  win = null;
    if (turnCount == 1) {
    turn = "blue"
  }
  else if (turnCount == 0) {
    turn = "green"
  }
  render();
}

function render() {
  board.forEach(function(mark, index) {
    squares[index].textContent = mark;
  })
    message.textContent =
    win === "T" ? "it's a tie!" : win ? `${win} wins!` : `turn: ${turn}`;
    squares[2].innerHTML = "●" // just put this in to see what it would look like :(

}

// this doesn't work at all. figure out how to at least mark the board please !!!!

function takeTurn(e) {
  if (!win) {
    let index = squares.findIndex(function(square) {
      return square === e.target;
    });

    if (board[index] === "") {
      board[index] = turn;
      turn = turn === blue ? green : blue;
      win = getWinner();
      render();
    }
  }
}

function getWinner() {
  let winner = null;

  winningConditions.forEach(function(condition, index) {
    if (
      board[condition[0]] &&
      board[condition[0]] === board[condition[1]] &&
      board[condition[1]] === board[condition[2]]
    ) {
      winner = board[condition[0]];
      if (winner == "blue") {
        xWins++
        xCounter.innerHTML = xWins
      } else if (winner == "green") {
        oWins++
        oCounter.innerHTML = oWins
      }
    }
  });

  return winner ? winner : board.includes("") ? null : "T";
}

function blueStarts() {
  turn = "blue"
}

function greenStarts() {
  turn = "green"
}
