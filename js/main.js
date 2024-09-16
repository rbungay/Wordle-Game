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
const fullBoard = document.querySelector(".board");
const sqrEl = document.querySelectorAll(".sqr");

let currentIntBoard = boardOneEl;
let currentRowIndex = board[currentRow];

/*-------------------------------- Functions --------------------------------*/

const checkWinner = () => {
  winner = true;
  for (let i = 0; i < randomWord.length; i++) {
    let currentLetter = randomWord[i];
    let userCurrentLetter = currentIntBoard.children[i].innerText;
    if (currentLetter !== userCurrentLetter) {
      winner = false;
      checkPosition();
    } else {
      currentIntBoard.children[i].style.backgroundColor = "green";
    }
  }
};

const checkPosition = () => {
  for (let i = 0; i < randomWord.length; i++) {
    if (board[currentRow].includes(randomWord[i])) {
      console.log(
        `Position ${i}: Element ${board[currentRow][i]} is in Current Board but in the wrong position.`
      );
    } else {
      console.log(
        `Position ${i}: Element ${board[currentRow][i]} is not in the Current Board `
      );
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
  console.log("This is the letter being passed on update", letter);
  for (let i = 0; i < currentIntBoard.children.length; i++) {
    if (currentIntBoard.children[i].innerText === "") {
      currentIntBoard.children[i].innerText = letter;
      return;
    }
  }
};

const updateBoard = (char) => {
  updateInternalBoard(char);
  updateDisplayBoard(char);
};

const handleKey = (event) => {
  //   console.log("this is where i'll be passing the letter", event.key);
  const key = event.key.toUpperCase();

  if (key === "ENTER") {
    checkWinner();
    if (winner) {
      console.log("you win");
    } else {
      moveToNextRow();
      moveToNextRowDisplay();
    }
    ///IF CHECKWINNER IS FALSE, MOVE SOMETHING TO THE NEXT ROW
  } else if (alphabet.includes(key)) {
    updateBoard(key);
  } else {
    console.log("key is invalid");
  }

  //Need a checker if it's the backspace key
};

/*----------------------------- Event Listeners -----------------------------*/

window.addEventListener("keydown", handleKey);
