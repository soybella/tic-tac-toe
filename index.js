// specify variables based on css classes
const selectBox = document.querySelector(".game-start-menu"),
  selectPlayerX = selectBox.querySelector(".pick-players .icon-x"),
  selectPlayerO = selectBox.querySelector(".pick-players .icon-o"),
  gameBoard = document.querySelector("#game-board"),
  players = document.querySelector(".pick-players"),
  playerButton = document.querySelectorAll(".pick-player-button"),
  cellElements = document.querySelectorAll("#game-board-grid section span"),
  gameEndMessage = document.querySelector(".game-end-message"),
  restartButton = document.querySelector(".restart-button"),
  playerDisplay = document.querySelector("#playerDisplay"),
  newGameButton = document.querySelector("#new-game-solo");
newGameButton.addEventListener("click", startGame);
let playerButtonClicked = false;
runAi = true;

window.onload = () => {
  //make sure all boxes in board are clickable
  for (let i = 0; i < cellElements.length; i++) {
    cellElements[i].setAttribute("onclick", "clickedBox(this)");
  }
  playerDisplay.style.display = "none";
};

playerButton.forEach((button) => {
  button.addEventListener("click", function () {
    playerButtonClicked = true;
  });
});

selectPlayerX.onclick = () => {
  playerDisplay.innerHTML = "You chose X.";
  playerDisplay.style.display = "block";
};

selectPlayerO.onclick = () => {
  playerDisplay.innerHTML = "You chose O.";
  playerDisplay.style.display = "block";
  players.setAttribute(
    "class",
    "third-container pick-players players active player"
  );
  aiPlayer();
};

// Define the event listener function
function handleMouseOver() {
  if (players.classList.contains("active")) {
    this.style.backgroundImage = "url('./images/icon-o-outline.svg')";
    this.style.backgroundRepeat = "no-repeat";
    this.style.backgroundPosition = "center";
    // this.style.pointerEvents = "none";
  } else {
    this.style.backgroundImage = "url('./images/icon-x-outline.svg')";
    this.style.backgroundRepeat = "no-repeat";
    this.style.backgroundPosition = "center";
    // this.style.pointerEvents = "none";
  }
}

// Attach the event listener to each cell element
cellElements.forEach((element) => {
  element.addEventListener("mouseover", handleMouseOver);
});

function handleMouseOut() {
  this.style = "none";
}

cellElements.forEach((element) =>
  element.addEventListener("mouseout", handleMouseOut)
);

function startGame() {
  if (!playerButtonClicked) {
    alert("Player must choose a mark!");
  } else {
    selectBox.classList.add("hide");
    gameBoard.classList.remove("hide");
  }
}

// user interaction with board
function clickedBox(element) {
  if (players.classList.contains("players")) {
    playerSign = "circle-humanPlayer";
    element.classList.add("circle");
    players.classList.remove("active");
    element.setAttribute("id", playerSign);
    element.removeEventListener("mouseover", handleMouseOver);
  } else {
    playerSign = "x-humanPlayer";
    element.classList.add("x");
    players.classList.add("active");
    element.setAttribute("id", playerSign);
    element.removeEventListener("mouseover", handleMouseOver);
  }
  selectWinner();
  console.log(element);
  // element.style.pointerEvents = "none";
  gameBoard.style.pointerEvents = "none";

  // buffer time to pretend computer is thinking
  let randomTimeDelay = (Math.random() * 1000 + 200).toFixed();
  setTimeout(() => {
    aiPlayer(runAi);
  }, randomTimeDelay);
}

// computer interaction with board
function aiPlayer() {
  let emptyBoxes = [];
  if (runAi) {
    playerSign = "circle-aiPlayer";
    for (let i = 0; i < cellElements.length; i++) {
      if (
        !cellElements[i].classList.contains("x") &&
        !cellElements[i].classList.contains("circle")
      ) {
        emptyBoxes.push(i);
      }
    }

    //get random box from remaining tiles
    let randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
    console.log(randomBox);
    if (emptyBoxes.length > 0) {
      // cellElements[randomBox].innerHTML = "";
      if (players.classList.contains("player")) {
        playerSign = "x-aiPlayer";
        cellElements[randomBox].classList.add("x");
        cellElements[randomBox].setAttribute("id", playerSign);
        players.classList.add("active");
      } else {
        cellElements[randomBox].classList.add("circle");
        cellElements[randomBox].setAttribute("id", playerSign);
        players.classList.remove("active");
      }
      selectWinner();
    }
    cellElements[randomBox].style.pointerEvents = "none";
    gameBoard.style.pointerEvents = "auto";
    playerSign = "x";
  }
}

// get the sign of a certain box
function getIdValue(className) {
  return document.querySelector(".box" + className).id;
  // console.log(document.querySelector(".box" + className).id);
}

//check 3 tiles if they are the same sign
function checkIdSign(val1, val2, val3, sign) {
  if (
    getIdValue(val1) == sign &&
    getIdValue(val2) == sign &&
    getIdValue(val3) == sign
  ) {
    return true;
  }
  // console.log(getIdValue(sign));
}

// check winner
function selectWinner() {
  let headerLarge = document.querySelector(".game-end-header-large");
  let headerSmall = document.querySelector(".game-end-header-small");
  if (
    checkIdSign(1, 2, 3, playerSign) ||
    checkIdSign(4, 5, 6, playerSign) ||
    checkIdSign(7, 8, 9, playerSign) ||
    checkIdSign(1, 4, 7, playerSign) ||
    checkIdSign(2, 5, 8, playerSign) ||
    checkIdSign(3, 6, 9, playerSign) ||
    checkIdSign(1, 5, 9, playerSign) ||
    checkIdSign(3, 5, 7, playerSign)
  ) {
    if (playerSign == "x-aiPlayer" || playerSign == "circle-aiPlayer") {
      headerSmall.innerHTML = "Oh no, you lost...";
    } else {
      headerSmall.innerHTML = "You won!";
    }
    if (playerSign == "x-humanPlayer" || playerSign == "x-aiPlayer") {
      headerLarge.innerHTML = "X takes the round!";
    } else {
      headerLarge.innerHTML = "O takes the round!";
    }

    console.log(playerSign);
    runAi = false;
    aiPlayer(runAi);

    //buffer time to show winner
    setTimeout(() => {
      gameEndMessage.classList.add("show");
      // if (playerSign == "x-aiPlayer" || playerSign == "circle-aiPlayer") {
      //   headerSmall.innerHTML = "Oh no, you lost...";
      //   // headerSmall.innerHTML = "You won!";
      // }
      // headerLarge.innerHTML = `
      //   ${playerSign} takes the round!
      // `;
      // gameEndMessage.innerHTML = `Player <p>${playerSign}</p> won the game!`;
      // gameBoard.classList.remove("show");
    }, 700);
  } else {
    // headerSmall.innerHTML = "Oh no, you lost...";
    if (
      getIdValue(1) != "" &&
      getIdValue(2) != "" &&
      getIdValue(3) != "" &&
      getIdValue(4) != "" &&
      getIdValue(5) != "" &&
      getIdValue(6) != "" &&
      getIdValue(7) != "" &&
      getIdValue(8) != "" &&
      getIdValue(9) != ""
    ) {
      runAi = false;
      aiPlayer(runAi);

      // buffer time to show match as a draw
      setTimeout(() => {
        let headerLarge = document.querySelector(".game-end-header-large");
        let headerSmall = document.querySelector(".game-end-header-small");

        gameEndMessage.classList.add("show");
        headerSmall.style.display = "none";
        headerLarge.innerHTML = "Round Tied";
        headerLarge.style.color = "#A8BFC9";
        headerLarge.style.marginTop = "0";
      }, 700);
      // won text?
    }
  }
}

// function handleTurnButton() {
//   turnButton.innerHTML = playerCircle ? "O turn" : "X turn";
// }

// function isDraw() {
//   return [...cellElements].every((cell) => {
//     return (
//       cell.classList.contains(playerX_class) ||
//       cell.classList.contains(playerCircle_class)
//     );
//   });
// }

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
