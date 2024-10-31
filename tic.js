let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = '😎';
let gameActive = true;
let moveHistory = [];
let playerColors = { 'X': '#FF5733', 'O': '#335BFF' };

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

// Handle cell click
function handleCellClick(event) {
  const clickedCell = event.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute('id'));

  if (board[clickedCellIndex] !== '' || !gameActive) return;

  board[clickedCellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;
  clickedCell.style.color = playerColors[currentPlayer];

  moveHistory.push({ player: currentPlayer, index: clickedCellIndex });
  updateMoveHistory();

  checkResult();
}

// Check for winner or draw
function checkResult() {
  let roundWon = false;
  let winningCombination;

  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      winningCombination = [a, b, c];
      break;
    }
  }

  if (roundWon) {
    highlightWinningCells(winningCombination);
    alert(`Player ${currentPlayer} has won!`);
    gameActive = false;
    return;
  }

  if (!board.includes('')) {
    alert("It's a draw!");
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === '😎' ? '🤣' : '😎';
}

// Highlight winning cells
function highlightWinningCells(cells) {
  cells.forEach(index => {
    document.getElementById(index).classList.add('highlight');
  });
}

// Update move history in the sidebar
function updateMoveHistory() {
  const moveList = document.getElementById('moveHistory');
  moveList.innerHTML = '';
  moveHistory.forEach((move, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `Move ${index + 1}: Player ${move.player} to cell ${move.index + 1}`;
    moveList.appendChild(listItem);
  });
}

// Undo the last move
function undoLastMove() {
  if (!moveHistory.length || !gameActive) return;

  const lastMove = moveHistory.pop();
  board[lastMove.index] = '';
  document.getElementById(lastMove.index).textContent = '';
  updateMoveHistory();

  currentPlayer = lastMove.player;
}

// Restart the game
function restartGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = '😎';
  gameActive = true;
  moveHistory = [];
  document.querySelectorAll('.cell').forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('highlight');
  });
  updateMoveHistory();
}

// Update player colors based on inputs
function updatePlayerColors() {
  playerColors.X = document.getElementById('playerXColor').value;
   playerColors.O = document.getElementById('playerOColor').value;
}

// Event listeners
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.getElementById('undoButton').addEventListener('click', undoLastMove);
document.getElementById('restartButton').addEventListener('click', restartGame);
document.getElementById('playerXColor').addEventListener('change', updatePlayerColors);
document.getElementById('playerOColor').addEventListener('change', updatePlayerColors);
