const xClass = "x";
const oClass = "o";
const winningPossibilities = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
];

const gameBox = document.querySelectorAll("[data-box]");
const gameContainer = document.querySelector(".game-container");
const winningMessageText = document.querySelector("[data-id]");
const winningMessage = document.querySelector(".restart-game");
const restartBtn = document.querySelector("#restartbtn");
let oTurn;

gameStart();
function gameStart() {
  oTurn = false;
  gameBox.forEach((box) => {
    box.classList.remove(oClass);
    box.classList.remove(xClass);
    box.addEventListener("click", handleClick, { once: true });
  });
  gameHover();
  winningMessage.classList.remove("show");
}

restartBtn.addEventListener("click", gameStart);

function handleClick(e) {
  const box = e.target;
  const currentClass = oTurn ? oClass : xClass;
  placeWord(box, currentClass);
  if (checkWin(currentClass)) {
    gameEnd(false);
  } else if (isDraw()) {
    gameEnd(true);
  } else {
    switchTurns();
    gameHover();
  }
}

function isDraw() {
  return [...gameBox].every((box) => {
    return box.classList.contains(xClass) || box.classList.contains(oClass);
  });
}

function placeWord(box, currentClass) {
  box.classList.add(currentClass);
}

function gameHover() {
  gameContainer.classList.remove(xClass);
  gameContainer.classList.remove(oClass);
  if (oTurn) {
    gameContainer.classList.add(oClass);
  } else {
    gameContainer.classList.add(xClass);
  }
}
function switchTurns() {
  oTurn = !oTurn;
}

function checkWin(currentClass) {
  return winningPossibilities.some((combination) => {
    return combination.every((index) => {
      return gameBox[index].classList.contains(currentClass);
    });
  });
}

function gameEnd(draw) {
  if (draw) {
    winningMessageText.innerText = "DRAW!";
  } else {
    winningMessageText.innerText = `${oTurn ? "O" : "X"} WINS!`;
  }
  winningMessage.classList.add("show");
}
