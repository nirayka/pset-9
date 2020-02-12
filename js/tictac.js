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
    "", "", "",
    "", "", "",
    "", "", "",
  ]
  turn = "x"
  win = null;
    if (turnCount == 1) {
    console.log("x")
    turn = "x"
  }
  else if (turnCount == 0) {
    console.log("o")
    turn = "o"
  }
  render();
}

function render() {
  board.forEach(function(mark, index) {
    squares[index].textContent = mark;
  })
    message.textContent =
    win === "T" ? "it's a tie!" : win ? `${win} wins!` : `turn: ${turn}`;
}

function takeTurn(e) {
  if (!win) {
    let index = squares.findIndex(function(square) {
      return square === e.target;
    });

    if (board[index] === "") {
      board[index] = turn;
      turn = turn === "x" ? "o" : "x";
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
      if (winner == "x") {
        xWins++
        xCounter.innerHTML = xWins
      } else if (winner == "o") {
        oWins++
        oCounter.innerHTML = oWins
      }
    }
  });

  return winner ? winner : board.includes("") ? null : "T";
}

function xStarts() {
  turn = "x"
  console.log("1")
}

function oStarts() {
  turn = "o"
  console.log("0")
}




// turn is only showing up on the tic tac toe part !!!
