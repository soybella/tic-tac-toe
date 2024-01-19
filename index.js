// specify variables based on css classes
const selectBox = document.querySelector(".game-start-menu"),
  selectPlayerX = selectBox.querySelector(".pick-players .icon-x"),
  selectPlayerO = selectBox.querySelector(".pick-players .icon-o"),
  gameBoard = document.querySelector(".game-board"),
  players = document.querySelector(".pick-players"),
  cellElements = document.querySelectorAll("section span"),
  gameEndMessage = document.querySelector(".game-end-message"),
  restartButton = document.querySelector(".restart-button");

window.onload = () => {
  //make sure all boxes in board are clickable
  for (let i = 0; i < cellElements.length; i++) {
    cellElements[i].setAttribute("onclick", "clickedBox(this)");
  }
};

selectPlayerX.onclick = () => {
  selectBox.classList.add("hide");
  gameBoard.classList.remove("hide");
};

selectPlayerO.onclick = () => {
  selectBox.classList.add("hide");
  gameBoard.classList.remove("hide");
  players.setAttribute("class", "players active player");
};

let iconX = document.querySelector(".icon-x");
// iconX.classList.add("x");
let iconO = document.querySelector(".icon-o");
// iconO.classList.add("circle");
playerSign = "x";
runAi = true;

// user interaction with board
function clickedBox(element) {
  if (players.classList.contains("player")) {
    playerSign = "circle";
    // element.innerHTML = iconO;
    element.classList.add("circle");
    players.classList.remove("active");
    element.setAttribute("id", playerSign);
  } else {
    // element.innerHTML = iconX;
    element.classList.add("x");
    element.setAttribute("id", playerSign);
    players.classList.add("active");
  }
  selectWinner();
  element.style.pointerEvents = "none";
  gameBoard.style.pointerEvents = "none";

  // buffer time to pretend computer is thinking
  let randomTimeDelay = (Math.random() * 1000 + 200).toFixed();
  setTimeout(() => {
    aiPlayer(runAi);
  }, randomTimeDelay);
}

// computer interaction with board
function aiPlayer() {
  let array = [];
  if (runAi) {
    playerSign = "circle";
    // find remaining boxes that has not been mark
    for (let i = 0; i < cellElements.length; i++) {
      if (cellElements[i].childElementCount == 0) {
        array.push[i];
      }
    }
    //get random box from remaining tiles
    let randomBox = array[Math.floor(Math.random() * array.length)];
    if (array.length > 0) {
      if (players.classList.contains("player")) {
        playerSign = "x";
        cellElements[randomBox].classList.add("x");
        cellElements[randomBox].setAttribute("id", playerSign);
        players.classList.add("active");
      } else {
        cellElements[randomBox].classList.add("circle");
        cellElements[randomBox].setAttribute("id", playerSign);
        players.classList.add("active");
      }
      selectWinner();
    }
    // cellElements[randomBox].style.pointerEvents = "none";
    gameBoard.style.pointerEvents = "auto";
    playerSign = "x";
  }
}

// get the sign of a certain box
function getIdValue(className) {
  return document.querySelector(".box" + className).id;
}

//check 3 tiles if they are the same sign
function checkIdSign(val0, val1, val2, sign) {
  if (
    getIdValue(val0) == sign &&
    getIdValue(val1) == sign &&
    getIdValue(val2) == sign
  ) {
    return true;
  }
  return false;
}

// check winner
function selectWinner() {
  if (
    checkIdSign(0, 1, 2, playerSign) ||
    checkIdSign(3, 4, 5, playerSign) ||
    checkIdSign(6, 7, 8, playerSign) ||
    checkIdSign(0, 3, 6, playerSign) ||
    checkIdSign(1, 4, 7, playerSign) ||
    checkIdSign(2, 5, 8, playerSign) ||
    checkIdSign(0, 4, 8, playerSign) ||
    checkIdSign(2, 4, 6, playerSign)
  ) {
    runAi = false;
    aiPlayer(runAi);

    //buffer time to show winner
    setTimeout(() => {
      // gameEndMessage.classList.add("show");
      gameEndMessage.innerHTML = `Player <p>${playerSign}</p> won the game!`;
      gameBoard.classList.remove("show");
    }, 700);
    // won text?
  } else {
    //if draw
    // isDraw();
    if (
      getIdValue(0) != "" &&
      getIdValue(1) != "" &&
      getIdValue(2) != "" &&
      getIdValue(3) != "" &&
      getIdValue(4) != "" &&
      getIdValue(5) != "" &&
      getIdValue(6) != "" &&
      getIdValue(7) != "" &&
      getIdValue(8) != ""
    ) {
      runAi = false;
      aiPlayer(runAi);

      // buffer time to show match as a draw
      setTimeout(() => {
        // gameEndMessage.classList.add("show");
        gameEndMessage.innerHTML = "Game tied!";
        gameBoard.classList.remove("show");
      }, 700);
      // won text?
    }
  }
}

// const playerX_class = "x";
// const playerCircle_class = "circle";
// const winning_combination = [
//   [0, 1, 2],
//   [3, 4, 5],
//   [6, 7, 8],
//   [0, 3, 6],
//   [1, 4, 7],
//   [2, 5, 8],
//   [0, 4, 8],
//   [2, 4, 6],
// ];
// const cellElements = document.querySelectorAll("[data-cell]");
// const pickPlayers = document.querySelector(".pick-players");
// const newGameButton = document.querySelector("#new-game-solo");
// const gameMenu = document.querySelector(".game-start-menu");
// const gameBoard = document.querySelector(".game-board");
// const gameBoardGrid = document.getElementById("game-board-grid");
// const gameEndMessageDisplay = document.getElementById("game-end-message");
// const quitButton = document.querySelector(".quit-button");
// const restartButton = document.querySelector(".restart-button");
// const turnButton = document.querySelector(".turn-button");
// const playerOne = document.getElementById("player-one");
// let playerDisplay = document.getElementById("playerDisplay");
// const iconX = document.querySelector(".icon-x");
// const iconCircle = document.querySelector(".icon-o");
// let aiPlayer = true;
// let playerCircle;
// let playerSign;

// startGame();

// // NEXT create ai player with minimax algorithm
// // AFTER work on scores to update and show wins/ties/loses

// quitButton.addEventListener("click", handleQuit);
// restartButton.addEventListener("click", handleQuit);
// turnButton.addEventListener("click", handleTurnButton);
// newGameButton.addEventListener("click", handleNewGame);
// iconX.addEventListener("click", playerSelect_X);
// playerDisplay.classList.add("hide");
// iconCircle.addEventListener("click", function (event) {
//   storePlayerSelect_Circle(event.target);
//   usePlayerSelect_Circle();
// });

// function storePlayerSelect_Circle(target) {
//   playerCircle = target;
//   playerCircle.classList.add(playerCircle_class);
// }

// function usePlayerSelect_Circle() {
//   if (playerCircle) {
//     playerDisplay.style.display = "block";
//     playerDisplay.innerHTML = "You chose O.";
//     // gameBoardGrid.classList.add(playerCircle_class);
//     // gameBoardGrid.classList.remove(playerX_class);
//     iconCircle.classList.add("light-background");
//     iconX.classList.remove("light-background");
//     // aiPlayer = iconX;
//     // console.log(aiPlayer);
//     // aiPlayerMove();
//   } else {
//     console.log("playerCircle not found");
//   }
// }

// function playerSelect_X(event) {
//   let playerX = event.target;
//   if (playerX) {
//     playerDisplay.style.display = "block";
//     playerDisplay.innerHTML = "You chose X.";
//     iconX.classList.add("light-background");
//     iconCircle.classList.remove("light-background");
//     // aiPlayer = iconCircle;
//     // aiPlayerMove();
//   }
// }
// function timeDelay() {
//   let randomTimeDelay = (Math.random() * 1000 + 200).toFixed();
//   setTimeout(() => {
//     aiPlayerMove(aiPlayer);
//   }, randomTimeDelay);
// }

// function aiPlayerMove() {
//   let array = [];
//   if (aiPlayer) {
//     for (let i = 0; i < cellElements.length; i++) {
//       if (cellElements[i].childElementCount === 0) {
//         array.push(i);
//       }
//     }
//     let randomBox = array[Math.floor(Math.random() * array.length)];
//     console.log(randomBox);
//     if (array.length > 0) {
//       // console.log("test");
//       return randomBox;
//     } else {
//       // cellElements[randomBox].classList.add("circle");
//       // }
//       checkForWin();
//     }
//   }
// }

// function handleQuit() {
//   location.reload();
// }

// function handleNewGame() {
//   aiPlayer === true;
//   if (playerDisplay.style.display === "block") {
//     gameMenu.classList.add("hide");
//     gameBoard.classList.remove("hide");
//   } else {
//     alert("Player 1 must pick a mark.");
//   }
// }

// function startGame() {
//   cellElements.forEach((cell) => {
//     cell.addEventListener("click", handleClick, { once: true });
//   });
//   setBoardHoverClass();
//   handleTurnButton();
// }

// function handleClick(event) {
//   const cell = event.target;
//   const currentClass = playerCircle ? playerCircle_class : playerX_class;
//   aiPlayerMove();
//   placeMark(cell, currentClass);
//   if (checkForWin(currentClass)) {
//     endGame(false);
//   } else if (isDraw()) {
//     endGame(true);
//   } else {
//     setBoardHoverClass();
//     handleTurnButton();
//     setPlayers();
//   }
// }

// function handleTurnButton() {
//   turnButton.innerHTML = playerCircle ? "O turn" : "X turn";
// }

// function setPlayers() {
//   if (playerCircle) {
//     playerOne.innerHTML = "O (You)";
//   } else {
//     playerOne.innerHTML = "X (You)";
//   }
// }

// let placeMark = (cell, currentClass) => {
//   if (!cell.hasChildNodes()) {
//     cell.classList.add(currentClass);
//   }
// };

// // let switchTurns = () => {
// //   playerCircle = !playerCircle;
// // };

// function setBoardHoverClass() {
//   gameBoardGrid.classList.remove(playerX_class);
//   gameBoardGrid.classList.remove(playerCircle_class);
//   if (playerCircle) {
//     gameBoardGrid.classList.add(playerCircle_class);
//   } else {
//     gameBoardGrid.classList.add(playerX_class);
//   }
// }

// function checkForWin(currentClass) {
//   return winning_combination.some((combination) => {
//     return combination.every((index) => {
//       return cellElements[index].classList.contains(currentClass);
//     });
//   });
// }

function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(playerX_class) ||
      cell.classList.contains(playerCircle_class)
    );
  });
}

// function endGame(draw) {
//   let headerLarge = document.querySelector(".game-end-header-large");
//   let headerSmall = document.querySelector(".game-end-header-small");

//   if (draw) {
//     headerSmall.style.display = "none";
//     headerLarge.innerHTML = "Round Tied";
//     headerLarge.style.color = "#A8BFC9";
//     headerLarge.style.marginTop = "0";
//     gameEndMessageDisplay.classList.add("show");
//   } else {
//     headerSmall.innerHTML = `${
//       playerCircle ? "You won!" : "Oh no, you lost..."
//     }`;
//     headerLarge.innerHTML = `${playerCircle ? "O" : "X"} takes the win!`;
//     gameEndMessageDisplay.classList.add("show");
//   }
// }
