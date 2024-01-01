const playerX_class = "x";
const playerCircle_class = "circle";
let cellElements = document.querySelectorAll("[data-cell]");
let circleTurn;

let handleClick = (event) => {
  const cell = event.target;
  const currentClass = circleTurn ? playerCircle_class : playerX_class;
  placeMark(cell, currentClass);
  // check for win
  // check for draw
  // switch turns
  switchTurns();
};

let placeMark = (cell, currentClass) => {
  cell.classList.add(currentClass);
};

let switchTurns = () => {
  circleTurn = !circleTurn;
};

cellElements.forEach((cell) => {
  cell.addEventListener("click", handleClick, { once: true });
});

// let handleClick = (event) => {
//   let playerMark = event.target;

//   if (playerMark === playerMarkX) {
//     playerPick.style.display = "block";
//     playerPick.innerHTML = "You chose: X";
//     playerMark.style.backgroundColor = "#1f3641";

//     let playerMarkX = new Image();
//     playerMarkX.src = "./images/icon-x.svg";
//     playerMarkX.classList.add("playerMarkX");

//     useStoredTarget(playerMarkX);
//   } else {
//     playerPick.style.display = "block";
//     playerPick.innerHTML = "You chose: O";

//     let playerMarkO = new Image();
//     playerMarkO.src = "./images/icon-o.svg";
//     playerMarkO.classList.add("playerMarkO");

//     useStoredTarget(playerMarkO);
//   }
//   placeMark(cell, currentClass);
// };

// let placeMark = (cell, playerMark) => {
//   cell.classList.add(playerMark);
// };

// let handleNewGame = () => {
//   let gameBoard = document.getElementById("game-board");
//   gameBoard.classList.add("active");

//   let gameStartMenu = document.getElementById("game-start-menu");
//   gameStartMenu.classList.remove("active");
// };

// let handleRestartButtonClick = (playerMark) => {
//   markGridItems.forEach((button) => {
//     location.reload();
//   });
// };

// let handleHoverImageSource = (event) => {
//   let hoverImageSource = event.target;

//   if (hoverImageSource === hoverImageSourceX) {
//     let hoverImageSourceX = new Image();
//     hoverImageSourceX.src = "./images/icon-x-outline.svg";
//     hoverImageSourceX.classList.add("hoverImage");

//     cellElements.forEach((cell) => {
//       cell.addEventListener("mouseover", () => {
//         if (
//           !cell.querySelector(".playerMarkX") &&
//           !cell.querySelector(".playerMarkO")
//         ) {
//           if (!cell.contains(hoverImageSourceX)) {
//             cell.appendChild(hoverImageSourceX);
//           } else {
//             hoverImageSourceX.classList.add("hoverImageSource");
//           }
//         }
//       });
//       cell.addEventListener("mouseout", () => {
//         if (
//           !cell.querySelector(".playerMarkX") &&
//           !cell.querySelector(".playerMarkO")
//         ) {
//           hoverImageSourceX.classList.remove("hoverImageSource");
//         }
//       });
//       cell.addEventListener("click", () => {
//         if (
//           !cell.querySelector(".playerMarkX") &&
//           !cell.querySelector(".playerMarkO")
//         ) {
//           hoverImageSourceX.classList.remove("hoverImageSource");
//           cell.removeChild(hoverImageSourceX);
//         }
//       });
//     });
//   } else {
//     if (hoverImageSource === hoverImageSourceO) {
//       let hoverImageSourceO = new Image();
//       hoverImageSourceO.src = "./images/icon-o-outline.svg";
//       hoverImageSourceO.classList.add("hoverImage");

//       cellElements.forEach((cell) => {
//         cell.addEventListener("mouseover", () => {
//           if (
//             !cell.querySelector(".playerMarkX") &&
//             !cell.querySelector(".playerMarkO")
//           ) {
//             if (!cell.contains(hoverImageSourceO)) {
//               cell.appendChild(hoverImageSourceO);
//             } else {
//               hoverImageSourceO.classList.add("hoverImageSource");
//             }
//           }
//         });
//         cell.addEventListener("mouseout", () => {
//           if (
//             !cell.querySelector(".playerMarkX") &&
//             !cell.querySelector(".playerMarkO")
//           ) {
//             hoverImageSourceO.classList.remove("hoverImageSource");
//           }
//         });
//         cell.addEventListener("click", () => {
//           if (
//             !cell.querySelector(".playerMarkX") &&
//             !cell.querySelector(".playerMarkO")
//           ) {
//             hoverImageSourceO.classList.remove("hoverImageSource");
//             cell.removeChild(hoverImageSourceO);
//           }
//         });
//       });
//     }
//   }
// };

// let useStoredTarget = (playerMark) => {
//   cellElements.forEach((cell) => {
//     cell.addEventListener("click", () => {
//       if (
//         !cell.querySelector(".playerMarkX") &&
//         !cell.querySelector(".playerMarkO")
//       ) {
//         cell.appendChild(playerMark.cloneNode(true));
//       } else {
//         alert("This box is already marked! Try another.");
//       }
//     });
//   });
// };

// let swapTurns = (playerMark) => {
//   playerMark = !playerMark;
// };

// let hoverImageSourceX = document.querySelector(".icon-x");
// hoverImageSourceX.addEventListener("click", handleHoverImageSource);

// let hoverImageSourceO = document.querySelector(".icon-o");
// hoverImageSourceO.addEventListener("click", handleHoverImageSource);

// let playerPick = document.getElementById("playerPick");
// playerPick.style.display = "none";

// let restartButton = document.querySelector("#restart-button");
// restartButton.addEventListener("click", handleRestartButtonClick);

// let newGame = document.querySelector("#new-game-solo");
// newGame.addEventListener("click", handleNewGame);

// let playerMarkX = document.querySelector(".icon-x");
// playerMarkX.addEventListener("click", handleClick);

// let playerMarkO = document.querySelector(".icon-o");
// playerMarkO.addEventListener("click", handleClick);

// let cellElements = document.querySelectorAll("[data-cell]");
// cellElements.forEach((cell) => {
//   cell.addEventListener("click", handleClick, { once: true });
// });
