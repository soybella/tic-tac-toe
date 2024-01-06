const playerX_class = "x";
const playerCircle_class = "circle";
const winning_combination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const cellElements = document.querySelectorAll("[data-cell]");
const gameBoardGrid = document.getElementById("game-board-grid");
const gameEndMessageDisplay = document.getElementById("game-end-message");
const quitButton = document.querySelector(".quit-button");
const restartButton = document.querySelector(".restart-button");
const turnButton = document.querySelector(".turn-button");
const playerOne = document.getElementById("player-one");
const playerX = document.querySelector(".icon-x");
const playerO = document.querySelector(".icon-o");
// console.log(playerO);
// console.log(playerX);
let circleTurn;

startGame();

quitButton.addEventListener("click", handleQuit);
restartButton.addEventListener("click", handleQuit);
turnButton.addEventListener("click", handleTurnButton);
// playerIcons.forEach((icon) => {
//   icon.addEventListener("click", playerSelection);
// });
playerX.addEventListener("click", playerSelection);
playerO.addEventListener("click", playerSelection);

// playerOne.innerHTML = "test";

function handleQuit() {
  location.reload();
}

function startGame() {
  circleTurn = false;
  cellElements.forEach((cell) => {
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
  handleTurnButton();
}

function handleClick(event) {
  const cell = event.target;
  // const player = event.target;
  const currentClass = circleTurn ? playerCircle_class : playerX_class;
  playerSelection();
  placeMark(cell, currentClass);
  if (checkForWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    switchTurns();
    setBoardHoverClass();
    handleTurnButton();
    setPlayers();
    // playerPick();
  }
}

function playerSelection(event) {
  let player = event.target;
  let setPlayer = player === playerO ? playerCircle_class : playerX_class;

  console.log(setPlayer);
}

function setPlayers() {
  if (circleTurn) {
    playerOne.innerHTML = "O (You)";
  } else {
    playerOne.innerHTML = "X (You)";
  }
}

function handleTurnButton() {
  turnButton.innerHTML = circleTurn ? "O turn" : "X turn";
}

let placeMark = (cell, currentClass) => {
  cell.classList.add(currentClass);
};

let switchTurns = () => {
  circleTurn = !circleTurn;
};

function setBoardHoverClass() {
  gameBoardGrid.classList.remove(playerX_class);
  gameBoardGrid.classList.remove(playerCircle_class);
  if (circleTurn) {
    gameBoardGrid.classList.add(playerCircle_class);
  } else {
    gameBoardGrid.classList.add(playerX_class);
  }
}

function checkForWin(currentClass) {
  return winning_combination.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(playerX_class) ||
      cell.classList.contains(playerCircle_class)
    );
  });
}

function endGame(draw) {
  let headerLarge = document.querySelector(".game-end-header-large");
  let headerSmall = document.querySelector(".game-end-header-small");

  if (draw) {
    headerSmall.style.display = "none";
    headerLarge.innerHTML = "Round Tied";
    headerLarge.style.color = "#A8BFC9";
    headerLarge.style.marginTop = "0";
    gameEndMessageDisplay.classList.add("show");
  } else {
    headerSmall.innerHTML = `${circleTurn ? "You won!" : "Oh no, you lost..."}`;
    headerLarge.innerHTML = `${circleTurn ? "O" : "X"} takes the win!`;
    gameEndMessageDisplay.classList.add("show");
  }
}
