/*-------------------------------- Constants --------------------------------*/

import { fiveLetterWords, alphabet } from "./data.js";

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
let randomWord = fiveLetterWords[
  Math.floor(Math.random() * fiveLetterWords.length)
]
  .toUpperCase()
  .split("");

console.log("This is the Random Word: ", randomWord);

/*------------------------ Cached Element References ------------------------*/

const boardOneEl = document.querySelector(".boardOne");
const boardTwoEl = document.querySelector(".boardTwo");
const boardThreeEl = document.querySelector(".boardThree");
const boardFourEl = document.querySelector(".boardFour");
const boardFiveEl = document.querySelector(".boardFive");
const boardSixEl = document.querySelector(".boardSix");

let currentIntBoard = boardOneEl;
let currentRowIndex = board[currentRow];

/*-------------------------------- Functions --------------------------------*/

const checkWinner = () => {
  winner = true;
  getMyYellows();

  for (let i = 0; i < randomWord.length; i++) {
    let currentLetter = randomWord[i];
    let userCurrentLetter = currentIntBoard.children[i].innerText;
    if (currentLetter !== userCurrentLetter) {
      winner = false;
    } else {
      currentIntBoard.children[i].style.backgroundColor = "green";
    }
  }
};

const getMyYellows = () => {
  for (let i = 0; i < randomWord.length; i++) {
    if (randomWord.indexOf(board[currentRow][i]) !== -1) {
      currentIntBoard.children[i].style.backgroundColor = "yellow";
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
  //   console.log("this is where i'll be passing the letter", event.key);
  const key = event.key.toUpperCase();

  if (key === "BACKSPACE") {
    if (currentColIndex === 0) {
      return;
    } else {
      backspace();
    }
  } else if (key === "ENTER") {
    if (board[currentRow].includes("")) {
      return;
    } else {
      checkWinner();
      if (winner) {
        console.log("you win");
      }
      if (currentRow === 5) {
        console.log("You lose");
      } else {
        currentColIndex = 0;
        moveToNextRow();
        moveToNextRowDisplay();
      }
    }
  } else if (alphabet.includes(key) && board[currentRow][4] === "") {
    updateBoard(key);
  } else {
    console.log("key is invalid");
  }
};

/*----------------------------- Event Listeners -----------------------------*/

window.addEventListener("keydown", handleKey);
