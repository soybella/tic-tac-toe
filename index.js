// specify variables based on css classes
const selectBox = document.querySelector(".game-start-menu"),
  selectPlayerX = selectBox.querySelector(".pick-players .icon-x"),
  selectPlayerO = selectBox.querySelector(".pick-players .icon-o"),
  gameBoard = document.querySelector("#game-board"),
  players = document.querySelector(".pick-players"),
  playerButton = document.querySelectorAll(".pick-player-button"),
  cellElements = document.querySelectorAll("#game-board-grid section span"),
  gameEndMessage = document.querySelector(".game-end-message"),
  restartGameMessage = document.querySelector(".restart-game-message"),
  restartButton = document.querySelector(".restart-button"),
  quitButton = document.querySelector(".quit-button"),
  cancelRestartButton = document.querySelector(".cancel-restart-button"),
  confirmRestartButton = document.querySelector(".confirm-restart-button"),
  nextRoundButton = document.querySelector(".next-round-button"),
  playerDisplay = document.querySelector("#playerDisplay"),
  newGameButton = document.querySelector("#new-game-solo"),
  headerLarge = document.querySelector(".game-end-header-large"),
  headerSmall = document.querySelector(".game-end-header-small"),
  turnButton = document.querySelector(".turn-button");
newGameButton.addEventListener("click", startGame);
quitButton.addEventListener("click", quitGame);
nextRoundButton.addEventListener("click", nextRound);
confirmRestartButton.addEventListener("click", nextRound);
restartButton.addEventListener("click", restartGame);
window.addEventListener("resize", centerMainContent);
let playerXScore = 0;
let playerOScore = 0;
let tiesScore = 0;
let playerButtonClicked = false;
runAi = true;

window.onload = () => {
  for (let i = 0; i < cellElements.length; i++) {
    cellElements[i].setAttribute("onclick", "clickedBox(this)");
  }
  playerDisplay.style.display = "none";
};

function centerMainContent() {
  let centeredContent = document.querySelector("body");
  let windowHeight = window.innerHeight;
  let contentHeight = centeredContent.offsetHeight;

  let marginTop = (windowHeight - contentHeight) / 2;

  centeredContent.style.marginTop = marginTop + "px";
}
centerMainContent();

playerButton.forEach((button) => {
  button.addEventListener("click", function () {
    playerButtonClicked = true;
  });
});

selectPlayerX.onclick = () => {
  playerDisplay.innerHTML = "You chose X.";
  playerDisplay.style.display = "block";
  selectPlayerX.classList.add("light-background");
  selectPlayerO.classList.remove("light-background");
  turnButton.innerHTML = "X Turn";
  document.getElementById("player-one").innerHTML = "X (You)";
  document.getElementById("player-two").innerHTML = "O (CPU)";
};

selectPlayerO.onclick = () => {
  playerDisplay.innerHTML = "You chose O.";
  playerDisplay.style.display = "block";
  selectPlayerX.classList.remove("light-background");
  selectPlayerO.classList.add("light-background");
  players.setAttribute(
    "class",
    "third-container pick-players players active player"
  );
  document.getElementById("player-two").innerHTML = "O (You)";
  document.getElementById("player-one").innerHTML = "X (CPU)";
  turnButton.innerHTML = "O Turn";
  aiPlayer(runAi);
};

function handleMouseOver() {
  if (players.classList.contains("active")) {
    this.style.backgroundImage = "url('./images/icon-o-outline.svg')";
    this.style.backgroundRepeat = "no-repeat";
    this.style.backgroundPosition = "center";
  } else {
    this.style.backgroundImage = "url('./images/icon-x-outline.svg')";
    this.style.backgroundRepeat = "no-repeat";
    this.style.backgroundPosition = "center";
  }
}

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

function quitGame() {
  location.reload();
}

function handleTurnButton() {
  if (playerSign === "x-aiPlayer" || playerSign === "x-humanPlayer") {
    turnButton.innerHTML = "O Turn";
  } else {
    turnButton.innerHTML = "X Turn";
  }
}

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
    element.setAttribute("id", playerSign);
    element.removeEventListener("mouseover", handleMouseOver);
  }
  handleTurnButton();
  selectWinner();
  gameBoard.style.pointerEvents = "none";

  let randomTimeDelay = Math.floor(Math.random() * 1000 + 200); // Use Math.floor to get an integer
  setTimeout(() => {
    aiPlayer(runAi);
  }, randomTimeDelay);
}

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

    let randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
    if (emptyBoxes.length > 0) {
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
      handleTurnButton();
      selectWinner();
    }
    cellElements[randomBox].style.pointerEvents = "none";
    gameBoard.style.pointerEvents = "auto";
  }
}

function restartGame() {
  restartGameMessage.classList.add("show");
  cancelRestartButton.addEventListener("click", () => {
    restartGameMessage.classList.remove("show");
  });
}

function nextRound() {
  runAi = true;
  gameEndMessage.classList.remove("show");
  restartGameMessage.classList.remove("show");
  cellElements.forEach((element) => {
    element.removeAttribute("id");
    element.classList.remove("x", "circle");
    element.style.pointerEvents = "auto";
    element.addEventListener("mouseover", handleMouseOver);
  });
  if (playerSign === "circle-humanPlayer" || playerSign === "x-aiPlayer") {
    aiPlayer();
    gameBoard.style.pointerEvents = "none";
  }
  gameBoard.style.pointerEvents = "auto";
}

function updateScores(playerSign) {
  if (playerSign === "x-humanPlayer") {
    playerXScore++;
    turnButton.innerHTML = "X turn";
    document.getElementById("playerXScore").innerHTML = `${playerXScore}`;
  } else if (playerSign === "circle-humanPlayer") {
    playerOScore++;
    turnButton.innerHTML = "X Turn";
    document.getElementById("playerOScore").innerHTML = `${playerOScore}`;
  } else if (playerSign === "x-aiPlayer") {
    playerXScore++;
    document.getElementById("playerXScore").innerHTML = `${playerXScore}`;
  } else if (playerSign === "circle-aiPlayer") {
    playerOScore++;
    document.getElementById("playerOScore").innerHTML = `${playerOScore}`;
  }
}

function getIdValue(className) {
  return document.querySelector(".box" + className).id;
}

function checkIdSign(val1, val2, val3, sign) {
  if (
    getIdValue(val1) == sign &&
    getIdValue(val2) == sign &&
    getIdValue(val3) == sign
  ) {
    return true;
  }
}

function selectWinner() {
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
    if (playerSign === "x-aiPlayer" || playerSign === "circle-aiPlayer") {
      headerSmall.innerHTML = "Oh no, you lost...";
    } else {
      headerSmall.innerHTML = "You won!";
    }
    if (playerSign === "x-humanPlayer" || playerSign === "x-aiPlayer") {
      headerLarge.innerHTML = "X takes the round!";
    } else {
      headerLarge.innerHTML = "O takes the round!";
    }

    runAi = false;
    aiPlayer(runAi);

    setTimeout(() => {
      gameEndMessage.classList.add("show");
      gameEndMessage.style.pointerEvents = "auto";
      updateScores(playerSign);
    }, 700);
  } else {
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

      setTimeout(() => {
        gameEndMessage.classList.add("show");
        headerSmall.style.display = "none";
        headerLarge.innerHTML = "Round Tied";
        headerLarge.style.color = "#A8BFC9";
        headerLarge.style.marginTop = "0";
        tiesScore++;
        document.getElementById("tiesScore").innerHTML = `${tiesScore}`;
      }, 700);
    }
  }
}
