// JavaScript to handle game logic
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const cells = document.querySelectorAll(".cell");
const message = document.getElementById("message");
const resetButton = document.getElementById("reset");

function handleClick(event) {
  const cell = event.target;
  const cellIndex = cell.getAttribute("data-index");

  if (gameState[cellIndex] !== "" || checkWinner()) {
    return;
  }

  gameState[cellIndex] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWinner()) {
    message.textContent = `Player ${currentPlayer} wins!`;
  } else if (!gameState.includes("")) {
    message.textContent = "It's a draw!";
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    message.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      return true;
    }
  }
  return false;
}

function resetGame() {
  gameState = ["", "", "", "", "", "", "", "", ""];
  cells.forEach(cell => (cell.textContent = ""));
  currentPlayer = "X";
  message.textContent = `Player ${currentPlayer}'s turn`;
}

// Event listeners
cells.forEach(cell => cell.addEventListener("click", handleClick));
resetButton.addEventListener("click", resetGame);

message.textContent = `Player ${currentPlayer}'s turn`;
