import { wordBank, alphabet } from "./data.js";

/*---------------------------- Variables (state) ----------------------------*/

//setting up what the board internally looks like

let board = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

let boardFull = false;
let currentRow = 0;
let currentColIndex = 0;
let winner = false;

let winningWord = wordBank[Math.floor(Math.random() * wordBank.length)]
  .toUpperCase()
  .split("");

console.log("This is the Random Word: ", winningWord);

/*------------------------ Cached Element References ------------------------*/

const boardOneEl = document.querySelector(".boardOne");
const boardTwoEl = document.querySelector(".boardTwo");
const boardThreeEl = document.querySelector(".boardThree");
const boardFourEl = document.querySelector(".boardFour");
const boardFiveEl = document.querySelector(".boardFive");
const boardSixEl = document.querySelector(".boardSix");
const displayMessage = document.querySelector("#message");
const displayKeyboard = document.querySelectorAll(".keyLetter");

let currentIntBoard = boardOneEl;
let currentRowIndex = board[currentRow];

/*-------------------------------- Functions --------------------------------*/

const checkWinner = () => {
  winner = true;
  colorMe();

  for (let i = 0; i < winningWord.length; i++) {
    let currentLetter = winningWord[i];
    let userCurrentLetter = currentIntBoard.children[i].innerText;
    if (currentLetter !== userCurrentLetter) {
      winner = false;
    } else {
      currentIntBoard.children[i].style.backgroundColor = "#6AAA64";
    }
    displayKeyboard.forEach((keyElement) => {
      if (keyElement.innerText === userCurrentLetter) {
        keyElement.classList.add("incorrect");
      }

      if (
        keyElement.innerText === userCurrentLetter &&
        winningWord.includes(userCurrentLetter)
      ) {
        keyElement.classList.remove("incorrect");
        keyElement.classList.add("misplaced");
      }

      if (
        keyElement.innerText === userCurrentLetter &&
        currentLetter === userCurrentLetter
      ) {
        keyElement.classList.remove("incorrect");
        keyElement.classList.remove("misplaced");
        keyElement.classList.add("correct");
      }
    });
  }
};

const colorMe = () => {
  for (let i = 0; i < winningWord.length; i++) {
    if (winningWord.indexOf(board[currentRow][i]) !== -1) {
      currentIntBoard.children[i].style.backgroundColor = "#C9B458";
    } else {
      currentIntBoard.children[i].style.backgroundColor = "#787C7E";
    }
  }
};

const moveToNextRow = () => {
  if (currentRow < board.length) {
    currentRow++;
    currentRowIndex = board[currentRow];
  }
};

const moveToNextRowDisplay = () => {
  if (currentIntBoard === boardOneEl) {
    currentIntBoard = boardTwoEl;
  } else if (currentIntBoard === boardTwoEl) {
    currentIntBoard = boardThreeEl;
  } else if (currentIntBoard === boardThreeEl) {
    currentIntBoard = boardFourEl;
  } else if (currentIntBoard === boardFourEl) {
    currentIntBoard = boardFiveEl;
  } else if (currentIntBoard === boardFiveEl) {
    currentIntBoard = boardSixEl;
  }
};

const updateInternalBoard = (letter) => {
  for (let i = 0; i < board.length; i++) {
    if (board[currentRow][i] === "") {
      board[currentRow][i] = letter;
      break;
    }
  }
};

const updateDisplayBoard = (letter) => {
  for (let i = 0; i < currentIntBoard.children.length; i++) {
    if (currentIntBoard.children[i].innerText === "") {
      currentIntBoard.children[i].innerText = letter;
      return;
    }
  }
};

const displayBackspace = () => {
  for (let i = currentIntBoard.children.length - 1; i >= 0; i--) {
    if (currentIntBoard.children[i].innerText != "") {
      currentIntBoard.children[i].innerText = "";
      return;
    }
  }
};

const updateBoard = (char) => {
  updateInternalBoard(char);
  updateDisplayBoard(char);
  currentColIndex += 1;
};

const backspace = () => {
  board[currentRow][currentColIndex - 1] = "";
  currentColIndex -= 1;
  displayBackspace();
};

const handleKey = (event) => {
  const key = event.key.toUpperCase();

  const enterKey = document.querySelector("#enter");
  const backKey = document.querySelector("#back");

  // highlights the keyboard on the page for accessibility reasons
  displayKeyboard.forEach((keyElement) => {
    if (keyElement.innerText == key) {
      keyElement.classList.add("highlight");
      setTimeout(() => {
        keyElement.classList.remove("highlight");
      }, 200);
    }
  });

  if (key === "BACKSPACE") {
    backKey.classList.add("highlight");
    setTimeout(() => {
      backKey.classList.remove("highlight");
    }, 200);
    if (currentColIndex === 0) {
      return;
    } else {
      backspace();
    }
  } else if (key === "ENTER") {
    enterKey.classList.add("highlight");
    setTimeout(() => {
      enterKey.classList.remove("highlight");
    }, 200);
    if (board[currentRow].includes("")) {
      return;
    } else {
      // checking with an API to confirm if this is an actual word.
      let selectedWord = board[currentRow].join("");

      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${selectedWord}`)
        .then((data) => data.json())
        .then((data) => {
          if (data.length) {
            checkWinner();
            if (winner) {
              displayMessage.innerText = "You Win!";
              return;
            } else if (currentRow === 5) {
              displayMessage.innerText = `You lose! The word is: ${winningWord.join(
                ""
              )}`;
              console.log(
                "If you are looking at the console, it will not change...you still lose :) "
              );
            } else {
              displayMessage.innerText = "";
              currentColIndex = 0;
              moveToNextRow();
              moveToNextRowDisplay();
            }
          } else {
            displayMessage.innerText = "Not a word, Try again";
            setTimeout(() => {
              displayMessage.innerText = "";
            }, 1000);
          }
        });
    }
  } else if (alphabet.includes(key) && board[currentRow][4] === "") {
    updateBoard(key);
  } else {
    return;
  }
};

/*----------------------------- Event Listeners -----------------------------*/

window.addEventListener("keydown", handleKey);
// window.addEventListener("click", handleKey);

document.addEventListener("DOMContentLoaded", () => {
  function closeModal() {
    document.getElementById("instructionsModal").style.display = "none";
  }
  document.getElementById("instructionsModal").style.display = "block";
  document.querySelector(".close-button").addEventListener("click", closeModal);
  document.querySelector("button").addEventListener("click", closeModal);
});
