let handleClick = (event) => {
  let playerMark = event.target;

  if (playerMark === playerMarkX) {
    playerPick.style.display = "block";
    playerPick.innerHTML = "You chose: X";
    playerMark.style.backgroundColor = "#1f3641";

    let playerMarkX = new Image();
    playerMarkX.src = "./images/icon-x.svg";
    playerMarkX.classList.add("playerMarkX");
    // playerMarkX.classList.add("X");
    // console.log(playerMarkX);

    useStoredTarget(playerMarkX);
  } else {
    playerPick.style.display = "block";
    playerPick.innerHTML = "You chose: O";

    let playerMarkO = new Image();
    playerMarkO.src = "./images/icon-o.svg";
    playerMarkO.classList.add("playerMarkO");
    // playerMarkO.classList.add("O");
    // console.log(playerMarkO);

    useStoredTarget(playerMarkO);
  }
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

let handleHoverImageSource = (event) => {
  let hoverImageSource = event.target;
  // console.log(hoverImageSource);
  if (hoverImageSource === hoverImageSourceX) {
    // console.log("hover x");

    let hoverImageSourceX = new Image();
    hoverImageSourceX.src = "./images/icon-x-outline.svg";
    hoverImageSourceX.classList.add("hoverImage");

    markGridItems.forEach((button) => {
      button.addEventListener("mouseover", () => {
        if (
          !button.querySelector(".playerMarkX") &&
          !button.querySelector(".playerMarkO")
        ) {
          if (!button.contains(hoverImageSourceX)) {
            button.appendChild(hoverImageSourceX);
          } else {
            hoverImageSourceX.classList.add("hoverImageSource");
          }
        }
      });
      button.addEventListener("mouseout", () => {
        if (
          !button.querySelector(".playerMarkX") &&
          !button.querySelector(".playerMarkO")
        ) {
          hoverImageSourceX.classList.remove("hoverImageSource");
        }
      });
      button.addEventListener("click", () => {
        if (
          !button.querySelector(".playerMarkX") &&
          !button.querySelector(".playerMarkO")
        ) {
          hoverImageSourceX.classList.remove("hoverImageSource");
          button.removeChild(hoverImageSourceX);
        }
      });
    });
  } else {
    if (hoverImageSource === hoverImageSourceO) {
      // console.log("hover o");

      let hoverImageSourceO = new Image();
      hoverImageSourceO.src = "./images/icon-o-outline.svg";
      hoverImageSourceO.classList.add("hoverImage");

      markGridItems.forEach((button) => {
        button.addEventListener("mouseover", () => {
          if (
            !button.querySelector(".playerMarkX") &&
            !button.querySelector(".playerMarkO")
          ) {
            if (!button.contains(hoverImageSourceO)) {
              button.appendChild(hoverImageSourceO);
            } else {
              hoverImageSourceO.classList.add("hoverImageSource");
            }
          }
        });
        button.addEventListener("mouseout", () => {
          if (
            !button.querySelector(".playerMarkX") &&
            !button.querySelector(".playerMarkO")
          ) {
            hoverImageSourceO.classList.remove("hoverImageSource");
          }
        });
        button.addEventListener("click", () => {
          if (
            !button.querySelector(".playerMarkX") &&
            !button.querySelector(".playerMarkO")
          ) {
            hoverImageSourceO.classList.remove("hoverImageSource");
            button.removeChild(hoverImageSourceO);
          }
        });
      });
    }
  }
};

let useStoredTarget = (playerMark) => {
  markGridItems.forEach((button) => {
    button.addEventListener("click", () => {
      if (
        !button.querySelector(".playerMarkX") &&
        !button.querySelector(".playerMarkO")
      ) {
        button.appendChild(playerMark.cloneNode(true));

        let player = button.children;
        // console.log(player);
        // markGridItems.forEach(() => {
        // let checkMark = document.querySelector
        // console.log("test");
        // });

        // Make grid for each grid item button
        let ticTacToeBoardGrid = [
          [playerMark[0], playerMark[1], player[2]],
          [player[3], player[4], player[5]],
          [player[6], player[7], player[8]],
        ];

        markGridItems.forEach(() => {
          // let checkMark = document.querySelector
          console.log("test");
        });
        console.log(ticTacToeBoardGrid);

        let checkForWin = (board, player) => {
          for (let i = 0; i < 3; i++) {
            if (
              board[i][0] === player &&
              board[i][1] === player &&
              board[i][2] === player
            ) {
              return true;
            }
            if (
              board[0][0] === player &&
              board[1][1] === player &&
              board[2][2] === player
            ) {
              return true; // Diagonal win (top-left to bottom-right)
            }
            if (
              board[0][2] === player &&
              board[1][1] === player &&
              board[2][0] === player
            ) {
              return true; // Diagonal win (top-right to bottom-left)
            }
            return false;
          }
          let isXWinner = checkForWin(ticTacToeBoardGrid, player);
          console.log(isXWinner);
        };
      } else {
        alert("This box is already marked! Try another.");
      }
    });
  });
};

let hoverImageSourceX = document.querySelector(".icon-x");
hoverImageSourceX.addEventListener("click", handleHoverImageSource);

let hoverImageSourceO = document.querySelector(".icon-o");
hoverImageSourceO.addEventListener("click", handleHoverImageSource);

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

let markGridItems = document.querySelectorAll(".grid-item");

let gridItem = document.querySelector(".grid-item");

// let ticTacToeBoard = Array.from(markGridItems);
// console.log(ticTacToeBoard);

// let ticTacToeBoardGrid = [
//   [ticTacToeBoard[0], ticTacToeBoard[1], ticTacToeBoard[2]],
//   [ticTacToeBoard[3], ticTacToeBoard[4], ticTacToeBoard[5]],
//   [ticTacToeBoard[6], ticTacToeBoard[7], ticTacToeBoard[8]],
// ];
// console.log(ticTacToeBoardGrid);

// let isXWinner = checkForWin(ticTacToeBoardGrid, "X");
// console.log(isXWinner);
// console.log(ticTacToeBoardGrid);

// [player, player, player],
// [player, player, player],

// console.log(ticTacToeBoardGrid[0]);
// });

// let ticTacToeBoard = Array.from(player);
// ticTacToeBoard.push(player);
// ticTacToeBoard.forEach(() => {
//   console.log("test");
// });
// console.log(ticTacToeBoard);

// let playerClassNameCheckX = "playerMarkX";
// let playerClassNameCheckO = "playerMarkO";
// let found = false;

// for (let i = 0; i < player.length; i++) {
//   let child = player[i];
//   // console.log(child);

//   if (child.classList.contains(playerClassNameCheckX)) {
//     child.classList.add("X");
//     // found = true;
//     // break;
//   } else if (child.classList.contains(playerClassNameCheckO)) {
//     child.classList.add("O");
//     // found = true;
//   }
// }
// console.log(ticTacToeBoard);

//  if (found) {
//   // console.log(`"${playerClassNameCheckX}" found.`);
//   // let gridItems = ticTacToeBoard.map(() => {
//   //   console.log(gridItems);
//   // });
// } else {
//   console.log(`No child with class "${playerClassNameCheckX}" found.`);
// }
// let checkForWin = (board, player) => {
//   for (let i = 0; i < 3; i++) {
//     if (
//       board[i][0] === player &&
//       board[i][1] === player &&
//       board[i][2] === player
//     ) {
//       return true;
//     }
//     if (
//       board[0][0] === player &&
//       board[1][1] === player &&
//       board[2][2] === player
//     ) {
//       return true; // Diagonal win (top-left to bottom-right)
//     }
//     if (
//       board[0][2] === player &&
//       board[1][1] === player &&
//       board[2][0] === player
//     ) {
//       return true; // Diagonal win (top-right to bottom-left)
//     }
//     return false;
//   }
// };
