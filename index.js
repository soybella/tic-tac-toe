let handleClick = (event) => {
  let playerMark = event.target;

  if (playerMark === playerMarkX) {
    playerPick.style.display = "block";
    playerPick.innerHTML = "You chose: X";
    playerMark.style.backgroundColor = "#1f3641";

    let playerMarkX = new Image();
    playerMarkX.src = "./images/icon-x.svg";
    playerMarkX.classList.add("playerMarkX");
    // playerMarkX.style.width = 60;
    // playerMarkX.style.height = 60;

    useStoredTarget(playerMarkX);
  } else {
    playerPick.style.display = "block";
    playerPick.innerHTML = "You chose: O";

    let playerMarkO = new Image();
    playerMarkO.src = "./images/icon-o.svg";
    playerMarkO.classList.add("playerMarkO");
    // playerMarkO.width = 60;
    // playerMarkO.height = 60;

    useStoredTarget(playerMarkO);
  }
};

let markGridItems = document.querySelectorAll(".grid-item");

let hoverX = document.getElementsByClassName("hoverX");
let hoverXArray = Array.from(hoverX);

let showPlayerMarkHover = () => {
  hoverXArray.forEach((element) => {
    element.style.opacity = "1";
  });
};

let hidePlayerMarkHover = () => {
  hoverXArray.forEach((element) => {
    element.style.opacity = "0";
  });
};

markGridItems.forEach((button) => {
  button.addEventListener("mouseover", showPlayerMarkHover);
  button.addEventListener("mouseout", hidePlayerMarkHover);
});

let useStoredTarget = (playerMark) => {
  markGridItems.forEach((button) => {
    button.addEventListener("click", () => {
      console.log(playerMark);
      if (
        !button.querySelector(".playerMarkX") &&
        !button.querySelector(".playerMarkO")
      ) {
        button.appendChild(playerMark.cloneNode(true));
        playerMark.style.opacity = "1";
      } else {
        alert("This box is already marked! Try another.");
      }
    });
  });
};

// NEXT figure out how to show outline of X or O on hover
// let hoverX = document.getElementsByClassName("hoverX");
// let hoverXArray = Array.from(hoverX);
// console.log(hoverXArray);

// let showPlayerMarkHover = (event) => {
//   let hoverMark = event.target;
//   console.log(hoverMark);
//   hoverXArray.forEach((button) => {
//     button.style.opacity = "1";
//   });
// };

// let hidePlayerMarkHover = () => {
//   hoverXArray.forEach((button) => {
//     button.style.opacity = "0";
//   });
// };

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

let playerPick = document.getElementById("playerPick");
playerPick.style.display = "none";

// let markGridItems = document.querySelectorAll(".grid-item");

let restartButton = document.querySelector("#restart-button");
restartButton.addEventListener("click", handleRestartButtonClick);

let newGame = document.querySelector("#new-game-solo");
newGame.addEventListener("click", handleNewGame);

let playerMarkX = document.querySelector(".icon-x");
playerMarkX.addEventListener("click", handleClick);

let playerMarkO = document.querySelector(".icon-o");
playerMarkO.addEventListener("click", handleClick);
