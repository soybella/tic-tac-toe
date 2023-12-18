let handleClick = (event) => {
  let playerMark = event.target;
  if (playerMark === playerMarkX) {
    let playerMarkX = new Image();
    playerMarkX.src = "./images/icon-x.svg";
    playerMarkX.classList.add("playerMarkX");
    playerMarkX.style.width = 60;
    playerMarkX.style.height = 60;
    useStoredTarget(playerMarkX);
  } else {
    let playerMarkO = new Image();
    playerMarkO.src = "./images/icon-o.svg";
    playerMarkO.classList.add("playerMarkO");
    playerMarkO.width = 60;
    playerMarkO.height = 60;
    useStoredTarget(playerMarkO);
  }
};

let useStoredTarget = (playerMark) => {
  markGridItems.forEach((button) => {
    button.addEventListener("click", () => {
      console.log(playerMark);
      button.appendChild(playerMark.cloneNode(true));
    });
  });
};

let handleNewGame = () => {
  let gameBoard = document.getElementById("game-board");
  gameBoard.classList.add("active");

  let gameStartMenu = document.getElementById("game-start-menu");
  gameStartMenu.classList.remove("active");
};

let handleRestartButtonClick = (playerMark) => {
  markGridItems.forEach((button) => {
    button.innerHTML = "";
  });
};

let markGridItems = document.querySelectorAll(".grid-item");

let restartButton = document.querySelector("#restart-button");
restartButton.addEventListener("click", handleRestartButtonClick);

let newGame = document.querySelector("#new-game-solo");
newGame.addEventListener("click", handleNewGame);

let playerMarkX = document.querySelector(".icon-x");
playerMarkX.addEventListener("click", handleClick);

let playerMarkO = document.querySelector(".icon-o");
playerMarkO.addEventListener("click", handleClick);
