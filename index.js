const N = 3;
let board;
let currentPlayer;
const gameBoard = document.getElementById("gameboard");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("reset-btn");

function createBoard(n) {
  const board = [];
  for (let i = 0; i < n; i++) {
    const row = [];
    for (let j = 0; j < n; j++) {
      row.push(0);
    }
    board.push(row);
  }
  return board;
}

function renderBoard() {
  gameBoard.innerHTML = "";
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.row = i;
      cell.dataset.col = j;
      const value = board[i][j];
      if (value === 1) {
        cell.textContent = "X";
      } else if (value === -1) {
        cell.textContent = "O";
      }
      cell.addEventListener("click", handleCellClick);
      gameBoard.appendChild(cell);
    }
  }
}

function handleCellClick(event) {
  const row = parseInt(event.target.dataset.row);
  const col = parseInt(event.target.dataset.col);
  if (board[row][col] !== 0) {
    return;
  }

  board[row][col] = currentPlayer;
  renderBoard();

  if (checkWin(row, col, currentPlayer)) {
    statusText.textContent = `Player ${currentPlayer === 1 ? "X" : "O"} wins!`;
    disableBoard();
    return;
  }

  if (isDraw()) {
    statusText.textContent = "It's a draw!";
    disableBoard();
    return;
  }

  currentPlayer = -currentPlayer;
  statusText.textContent = `Player ${currentPlayer === 1 ? "X" : "O"}'s Turn`;
}

function checkWin(row, col, player) {
 
  let win = true;
  for (let j = 0; j < N; j++) {
    if (board[row][j] !== player) {
      win = false;
      break;
    }
  }
  if (win) return true;

 
  win = true;
  for (let i = 0; i < N; i++) {
    if (board[i][col] !== player) {
      win = false;
      break;
    }
  }
  if (win) return true;

 
  if (row === col) {
    win = true;
    for (let i = 0; i < N; i++) {
      if (board[i][i] !== player) {
        win = false;
        break;
      }
    }
    if (win) return true;
  }

  
  if (row + col === N - 1) {
    win = true;
    for (let i = 0; i < N; i++) {
      if (board[i][N - 1 - i] !== player) {
        win = false;
        break;
      }
    }
    if (win) return true;
  }

  return false;
}

function isDraw() {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (board[i][j] === 0) return false;
    }
  }
  return true;
}

function disableBoard() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.removeEventListener("click", handleCellClick);
  });
}

function resetGame() {
  board = createBoard(N);
  currentPlayer = 1;
  statusText.textContent = "Player X's Turn";
  renderBoard();
}

resetBtn.addEventListener("click", resetGame);


resetGame();
