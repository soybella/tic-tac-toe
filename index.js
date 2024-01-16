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
const pickPlayers = document.querySelector(".pick-players");
const newGameButton = document.querySelector("#new-game-solo");
const gameMenu = document.querySelector(".game-start-menu");
const gameBoard = document.querySelector(".game-board");
const gameBoardGrid = document.getElementById("game-board-grid");
const gameEndMessageDisplay = document.getElementById("game-end-message");
const quitButton = document.querySelector(".quit-button");
const restartButton = document.querySelector(".restart-button");
const turnButton = document.querySelector(".turn-button");
const playerOne = document.getElementById("player-one");
let playerDisplay = document.getElementById("playerDisplay");
const iconX = document.querySelector(".icon-x");
const iconCircle = document.querySelector(".icon-o");
let aiPlayer = true;
let playerCircle;
let playerSign;

startGame();

// NEXT create ai player with minimax algorithm
// AFTER work on scores to update and show wins/ties/loses

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
    iconCircle.classList.add("light-background");
    iconX.classList.remove("light-background");
    // aiPlayer = iconX;
    // console.log(aiPlayer);
    aiPlayerMove();
  } else {
    console.log("playerCircle not found");
  }
}

function playerSelect_X(event) {
  let playerX = event.target;
  if (playerX) {
    playerDisplay.style.display = "block";
    playerDisplay.innerHTML = "You chose X.";
    iconX.classList.add("light-background");
    iconCircle.classList.remove("light-background");
    // aiPlayer = iconCircle;
    // if (pickPlayers.classList.contains("pick-players")) {
    //   console.log("pick player clicked");
    // }
    // console.log(aiPlayer);
    aiPlayerMove();
  }
}

function aiPlayerMove() {
  let array = [];
  if (aiPlayer) {
    // aiPlayer = iconX;
    // aiPlayer.classList.add(playerX_class);
    // console.log(aiPlayer);
    for (let i = 0; i < cellElements.length; i++) {
      if (cellElements[i].childElementCount == 0) {
        array.push(i);
        // console.log(array.push(i));
      }
    }
    let randomBox = array[Math.floor(Math.random() * array.length)];
    // console.log(randomBox);
    if (array.length > 0) {
      if (pickPlayers.classList.contains("pick-players")) {
        if (
          cellElements[randomBox].addEventListener(
            "click",
            () => {
              cellElements[randomBox].classList.add(playerCircle_class);
            },
            { once: true }
          )
        );
      } else {
        console.log("cell has no child node");
      }
    }
  }
}

function handleQuit() {
  location.reload();
}

function handleNewGame() {
  aiPlayer === true;
  if (playerDisplay.style.display === "block") {
    gameMenu.classList.add("hide");
    gameBoard.classList.remove("hide");
  } else {
    alert("Player 1 must pick a mark.");
  }
}

function startGame() {
  cellElements.forEach((cell) => {
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
  handleTurnButton();
  // aiPlayerMove();
}

function handleClick(event) {
  const cell = event.target;
  const currentClass = playerCircle ? playerCircle_class : playerX_class;
  // const currentClass = aiPlayer ? true : false;

  placeMark(cell, currentClass);
  if (checkForWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    // switchTurns();
    setBoardHoverClass();
    handleTurnButton();
    setPlayers();
    aiPlayerMove();
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

// let switchTurns = () => {
//   playerCircle = !playerCircle;
// };

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
