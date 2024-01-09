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
const playerDisplay = document.getElementById("playerDisplay");
const iconX = document.querySelector(".icon-x");
const iconCircle = document.querySelector(".icon-o");
let playerCircle;

startGame();

quitButton.addEventListener("click", handleQuit);
restartButton.addEventListener("click", handleQuit);
turnButton.addEventListener("click", handleTurnButton);
newGameButton.addEventListener("click", handleNewGame);
iconX.addEventListener("click", playerSelect_X);
playerDisplay.classList.add("hide");
iconCircle.addEventListener("click", function (event) {
  storePlayerSelect_Circle(event.target);
  usePlayerSelect_Circle();
});

function storePlayerSelect_Circle(target) {
  playerCircle = target;
  playerCircle.classList.add(playerCircle_class);
}

function usePlayerSelect_Circle() {
  if (playerCircle) {
    playerDisplay.style.display = "block";
    playerDisplay.innerHTML = "You chose O.";
    gameBoardGrid.classList.add(playerCircle_class);
    gameBoardGrid.classList.remove(playerX_class);
  } else {
    console.log("playerCircle not found");
  }
}

function playerSelect_X(event) {
  let playerX = event.target;
  if (playerX) {
    playerDisplay.style.display = "block";
    playerDisplay.innerHTML = "You chose X.";
  }
}

function handleQuit() {
  location.reload();
}

function handleNewGame() {
  gameMenu.classList.add("hide");
  gameBoard.classList.remove("hide");
}

function startGame() {
  cellElements.forEach((cell) => {
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
  handleTurnButton();
}

function handleClick(event) {
  const cell = event.target;
  const currentClass = playerCircle ? playerCircle_class : playerX_class;

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
  turnButton.innerHTML = playerCircle ? "O turn" : "X turn";
}

function setPlayers() {
  if (playerCircle) {
    playerOne.innerHTML = "O (You)";
  } else {
    playerOne.innerHTML = "X (You)";
  }
}

let placeMark = (cell, currentClass) => {
  cell.classList.add(currentClass);
};

let switchTurns = () => {
  playerCircle = !playerCircle;
};

function setBoardHoverClass() {
  gameBoardGrid.classList.remove(playerX_class);
  gameBoardGrid.classList.remove(playerCircle_class);
  if (playerCircle) {
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
    headerSmall.innerHTML = `${
      playerCircle ? "You won!" : "Oh no, you lost..."
    }`;
    headerLarge.innerHTML = `${playerCircle ? "O" : "X"} takes the win!`;
    gameEndMessageDisplay.classList.add("show");
  }
}
