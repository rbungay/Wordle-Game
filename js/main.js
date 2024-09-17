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

//being able to access the rows index, and current rows on the board itself.
let currentRow = 0;

//this is to iterate through backspace
let currentColIndex = 0;

//game state where winner is false. if it turns true, game ends
let winner = false;

//getting the random word from the word bank
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

let currentIntBoard = boardOneEl;
let currentRowIndex = board[currentRow];

console.log(displayMessage.innerText);

/*-------------------------------- Functions --------------------------------*/

// const highlightDisplayKey = () => {
//     setTimeout(() => {

//     })
// }

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
  console.log(board[currentRow][currentColIndex - 1]);
  console.log(board[currentRow]);
};

const backspace = () => {
  board[currentRow][currentColIndex - 1] = "";
  console.log(board[currentRow]);
  currentColIndex -= 1;
  displayBackspace();
};

const handleKey = (event) => {
  const key = event.key.toUpperCase();
  const displayKeyboard = document.querySelectorAll(".keyLetter");
  const enterKey = document.querySelector("#enter");
  const backKey = document.querySelector("#back");

  // highlights the keyboard on the page for accessibility reasons
  displayKeyboard.forEach((keyElement) => {
    console.log("this works", keyElement);
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
      //api call needed here.
      let selectedWord = board[currentRow].join("");

      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${selectedWord}`)
        .then((data) => data.json())
        .then((data) => {
          if (data.length) {
            checkWinner();
            if (winner) {
              displayMessage.innerText = "You Win!";
              console.log("you win");
            }
            if (currentRow === 5) {
              displayMessage.innerText = `You lose! The word is: ${winningWord.join(
                ""
              )}`;
              console.log("You lose");
            } else {
              currentColIndex = 0;
              moveToNextRow();
              moveToNextRowDisplay();
            }
          } else {
            console.log("not a word");
          }
        });
    }
  } else if (alphabet.includes(key) && board[currentRow][4] === "") {
    updateBoard(key);
  } else {
    console.log("key is invalid");
  }
};

/*----------------------------- Event Listeners -----------------------------*/

window.addEventListener("keydown", handleKey);
