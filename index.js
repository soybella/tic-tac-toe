let handleClick = (event) => {
  let playerMark = event.target;

  if (playerMark === playerMarkX) {
    playerPick.style.display = "block";
    playerPick.innerHTML = "You chose: X";
    playerMark.style.backgroundColor = "#1f3641";

    let playerMarkX = new Image();
    playerMarkX.src = "./images/icon-x.svg";
    playerMarkX.classList.add("playerMarkX");

    useStoredTarget(playerMarkX);
  } else {
    playerPick.style.display = "block";
    playerPick.innerHTML = "You chose: O";

    let playerMarkO = new Image();
    playerMarkO.src = "./images/icon-o.svg";
    playerMarkO.classList.add("playerMarkO");

    useStoredTarget(playerMarkO);
  }
};

let hoverImageElement = document.querySelector(".hoverImage");

let showHover = () => {
  markGridItems.forEach((button) => {
    button.addEventListener("mouseover", () => {
      if (
        !button.querySelector(".playerMarkX") &&
        !button.querySelector(".playerMarkO")
      ) {
        if (!button.contains(hoverImageElement)) {
          button.appendChild(hoverImageElement);
          // button.removeChild(hoverImageElement);
        } else {
          hoverImageElement.classList.add("hoverX");
        }
      }
    });
  });
};

let hideHover = () => {
  markGridItems.forEach((button) => {
    button.addEventListener("mouseout", () => {
      if (
        !button.querySelector(".playerMarkX") &&
        !button.querySelector(".playerMarkO")
      ) {
        hoverImageElement.classList.remove("hoverX");
      }
    });
  });
};

let useStoredTarget = (playerMark) => {
  markGridItems.forEach((button) => {
    button.addEventListener("click", () => {
      if (
        !button.querySelector(".playerMarkX") &&
        !button.querySelector(".playerMarkO")
      ) {
        button.appendChild(playerMark.cloneNode(true));
        button.removeChild(hoverImageElement);
      } else {
        alert("This box is already marked! Try another.");
      }
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
    location.reload();
  });
};

// let markGridItems = document.querySelectorAll(".grid-item");
let markGridItems = document.querySelectorAll(".grid-item");

// let playerMarkHover = document.querySelector(".hoverImage");

let playerPick = document.getElementById("playerPick");
playerPick.style.display = "none";

let restartButton = document.querySelector("#restart-button");
restartButton.addEventListener("click", handleRestartButtonClick);

let newGame = document.querySelector("#new-game-solo");
newGame.addEventListener("click", handleNewGame);

let playerMarkX = document.querySelector(".icon-x");
playerMarkX.addEventListener("click", handleClick);

let playerMarkO = document.querySelector(".icon-o");
playerMarkO.addEventListener("click", handleClick);
