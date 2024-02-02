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
  quitButton = document.querySelector(".quit-button"),
  nextRoundButton = document.querySelector(".next-round-button"),
  playerDisplay = document.querySelector("#playerDisplay"),
  newGameButton = document.querySelector("#new-game-solo"),
  headerLarge = document.querySelector(".game-end-header-large"),
  headerSmall = document.querySelector(".game-end-header-small"),
  turnButton = document.querySelector(".turn-button");
newGameButton.addEventListener("click", startGame);
quitButton.addEventListener("click", quitGame);
nextRoundButton.addEventListener("click", nextRound);
let playerXScore = 0;
let playerOScore = 0;
let tiesScore = 0;
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
  selectPlayerX.classList.add("light-background");
  selectPlayerO.classList.remove("light-background");
  turnButton.innerHTML = "O Turn";
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
  turnButton.innerHTML = "X Turn";
  aiPlayer();
};

// Define the event listener function
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

function quitGame() {
  location.reload();
}

function handleTurnButton() {
  if (playerSign == "x-aiPlayer" || playerSign == "x-humanPlayer") {
    turnButton.innerHTML = "O Turn";
  } else {
    turnButton.innerHTML = "X Turn";
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
  handleTurnButton();
  selectWinner();
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
    playerSign = "x";
  }
}

function nextRound() {
  gameEndMessage.classList.remove("show");
  cellElements.forEach((element) => {
    element.innerHTML = "";
    element.classList.remove("x", "circle");
    element.removeAttribute("id", playerSign);
    // updateScores(playerSign);
    // element.style.pointerEvents = "auto";
    // gameBoard.style.pointerEvents = "auto";

    // clickedBox(playerSign);
    // aiPlayer();
  });
}

function updateScores(winner) {
  if (winner === "x-humanPlayer") {
    playerXScore++;
    document.getElementById("playerXScore").innerHTML = `${playerXScore}`;
  } else if (winner === "circle-humanPlayer") {
    playerOScore++;
    document.getElementById("playerOScore").innerHTML = `${playerOScore}`;
  }
  // nextRound();
}

// get the sign of a certain box
function getIdValue(className) {
  return document.querySelector(".box" + className).id;
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
}

// check winner
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
    updateScores(playerSign);
    // nextRound();

    runAi = false;
    aiPlayer(runAi);

    //buffer time to show winner
    setTimeout(() => {
      gameEndMessage.classList.add("show");
      gameEndMessage.style.pointerEvents = "auto";
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

      // buffer time to show match as a draw
      setTimeout(() => {
        gameEndMessage.classList.add("show");
        headerSmall.style.display = "none";
        headerLarge.innerHTML = "Round Tied";
        headerLarge.style.color = "#A8BFC9";
        headerLarge.style.marginTop = "0";
      }, 700);
    }
  }
}
