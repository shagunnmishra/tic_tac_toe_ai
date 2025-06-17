let board = ["", "", "", "", "", "", "", "", ""];
let human = "X";
let ai = "O";
let gameOver = false;

function makeMove(index) {
  if (board[index] === "" && !gameOver) {
    board[index] = human;
    updateBoard();
    if (!checkWinner(human)) {
      let bestMove = findBestMove();
      board[bestMove] = ai;
      updateBoard();
      checkWinner(ai);
    }
  }
}

function updateBoard() {
  const cells = document.querySelectorAll(".cell");
  board.forEach((val, i) => {
    cells[i].textContent = val;
  });
}

function checkWinner(player) {
  const wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  for (let combo of wins) {
    if (combo.every(i => board[i] === player)) {
      document.getElementById("status").textContent = `${player} wins!`;
      gameOver = true;
      return true;
    }
  }

  if (!board.includes("")) {
    document.getElementById("status").textContent = "It's a draw!";
    gameOver = true;
    return true;
  }

  return false;
}

function restart() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameOver = false;
  document.getElementById("status").textContent = "";
  updateBoard();
}

function findBestMove() {
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < board.length; i++) {
    if (board[i] === "") {
      board[i] = ai;
      let score = minimax(board, 0, false);
      board[i] = "";
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  return move;
}

function minimax(newBoard, depth, isMaximizing) {
  if (checkStaticWinner(human)) return -1;
  if (checkStaticWinner(ai)) return 1;
  if (!newBoard.includes("")) return 0;

  if (isMaximizing) {
    let best = -Infinity;
    for (let i = 0; i < newBoard.length; i++) {
      if (newBoard[i] === "") {
        newBoard[i] = ai;
        best = Math.max(best, minimax(newBoard, depth + 1, false));
        newBoard[i] = "";
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < newBoard.length; i++) {
      if (newBoard[i] === "") {
        newBoard[i] = human;
        best = Math.min(best, minimax(newBoard, depth + 1, true));
        newBoard[i] = "";
      }
    }
    return best;
  }
}

function checkStaticWinner(player) {
  const wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return wins.some(combo => combo.every(i => board[i] === player));
}
