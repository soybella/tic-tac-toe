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
const pickPlayerElements = document.querySelectorAll(".player-icon");
const newGameButton = document.querySelector("#new-game-solo");
const gameMenu = document.querySelector(".game-start-menu");
const gameBoard = document.querySelector(".game-board");
const gameBoardGrid = document.getElementById("game-board-grid");
const gameEndMessageDisplay = document.getElementById("game-end-message");
const quitButton = document.querySelector(".quit-button");
const restartButton = document.querySelector(".restart-button");
const turnButton = document.querySelector(".turn-button");
const playerOne = document.getElementById("player-one");
const playerX = document.querySelector(".icon-x");
const playerCircle = document.querySelector(".icon-o");
let circleTurn;

startGame();

quitButton.addEventListener("click", handleQuit);
restartButton.addEventListener("click", handleQuit);
turnButton.addEventListener("click", handleTurnButton);
newGameButton.addEventListener("click", handleNewGame);
playerX.addEventListener("click", playerSelect_X);
playerCircle.addEventListener("click", playerSelect_Circle);
gameBoard.style.display = "none";

function playerSelect_X(event) {
  let player = event.target;
  if (player === playerX) {
    console.log(playerX_class);
    console.log(player);
  }
}

function playerSelect_Circle(event) {
  let player = event.target;
  if (player === playerCircle) {
    console.log(playerCircle_class);
    console.log(player);
  }
}

function handleQuit() {
  location.reload();
}

function handleNewGame() {
  gameMenu.style.display = "none";
  gameMenu.classList.remove("active");
  gameBoard.style.display = "block";
}

function startGame() {
  // circleTurn = false;
  // let player =  event.target;
  // circleTurn = player === playerO ? playerCircle_class : playerX_class;

  cellElements.forEach((cell) => {
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
  handleTurnButton();
}

function handleClick(event) {
  const cell = event.target;
  const currentClass = circleTurn ? playerCircle_class : playerX_class;
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
  }
}

function handleTurnButton() {
  turnButton.innerHTML = circleTurn ? "O turn" : "X turn";
}

function setPlayers() {
  if (circleTurn) {
    playerOne.innerHTML = "O (You)";
  } else {
    playerOne.innerHTML = "X (You)";
  }
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
