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
let currentRowIndex = 0;
let currentColIndex = 0;
let currentRow = 0;

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

let currentBoardEl = boardOneEl;

/*-------------------------------- Functions --------------------------------*/

const goBackOneSpace = () => {};

const checkWinner = () => {
  winner = false;
  for (let i = 0; i < 5; i++) {
    let currentLetter = randomWord[i];
    let userCurrentLetter = currentBoardEl.children[i].innerText;
    if (currentLetter === userCurrentLetter) {
      winner = true;
    }
  }
  if (winner) {
    console.log("You win");
  } else {
    console.log("Wrong");
    // currentRowIndex += 1;
    // currentColIndex = 0;
  }
};

const updateInternalBoard = (letter) => {
  for (let i = 0; i < board.length; i++) {
    if (board[i] === "") {
      board[i] = letter;

      break;
    }
  }
};

const updateDisplayBoard = (letter) => {
  console.log("This is the letter being passed on update", letter);
  for (let i = 0; i < currentBoardEl.children.length; i++) {
    if (currentBoardEl.children[i].innerText === "") {
      currentBoardEl.children[i].innerText = letter;
      break;
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
    ///IF CHECKWINNER IS FALSE, MOVE SOMETHING TO THE NEXT ROW
  }

  //still need to fix backspace
  //   if (key === "BACKSPACE") {
  //     if (currentCol > 0) {
  //       currentCol--;
  //       board[currentRow][currentCol] = "";
  //     } else if (currentRow > 0) {
  //       currentRow--;
  //       currentCol = board[currentRow].length - 1;
  //       board[currentRow][currentCol] = "";
  //     }
  //  }
  else if (alphabet.includes(key)) {
    updateBoard(key);
  } else {
    console.log("key is invalid");
  }

  //Need a checker if it's the backspace key

  console.log(board);
};

/*----------------------------- Event Listeners -----------------------------*/

window.addEventListener("keydown", handleKey);
