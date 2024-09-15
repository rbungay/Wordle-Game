/*-------------------------------- Constants --------------------------------*/

import { fiveLetterWords, alphabet } from "./data.js";

/*---------------------------- Variables (state) ----------------------------*/

let board = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];
let winner = false;
let randomWord = fiveLetterWords[
  Math.floor(Math.random() * fiveLetterWords.length)
]
  .toUpperCase()
  .split("");

console.log("This is the Random Word: ", randomWord);

// create a variable that turns the random word chosen into a an array of words splits it into an array of singular letters

/*------------------------ Cached Element References ------------------------*/

const boardOneEl = document.querySelector(".boardOne");
const boardTwoEl = document.querySelector(".boardTwo");
const boardThreeEl = document.querySelector(".boardThree");
const boardFourEl = document.querySelector(".boardFour");
const boardFiveEl = document.querySelector(".boardFive");
const boardSixEl = document.querySelector(".boardSix");
const fullBoard = document.querySelector(".board");
const sqrEl = document.querySelectorAll(".sqr");

/*-------------------------------- Functions --------------------------------*/

const updateInternalBoard = (letter) => {
  for (let i = 0; i < board.length; i++) {
    if (board[i] === "") {
      board[i] = letter;
      break;
    }
  }
};

const checkWinner = () => {
  winner = true;
  for (let i = 0; i < 5; i++) {
    let currentLetter = randomWord[i];
    let userCurrentLetter = boardOneEl.children[i].innerText;
    if (currentLetter !== userCurrentLetter) {
      winner = false;
    }
  }
  if (winner) {
    console.log("You win");
  } else {
    console.log("Wrong");
  }
};

const updateDisplayBoard = (letter) => {
  console.log("This is the letter being passed on update", letter);
  for (let i = 0; i < boardOneEl.children.length; i++) {
    if (boardOneEl.children[i].innerText === "") {
      boardOneEl.children[i].innerText = letter;
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
  } else if (alphabet.includes(key)) {
    updateBoard(key);
  } else {
    console.log("key is invalid");
  }
  //Need a checker if it's the Enter Key
  //Need a checker if it's the backspace key
  //Need a checker if it's not one of the letters in the alphabet.

  console.log(board);
};

/*----------------------------- Event Listeners -----------------------------*/

window.addEventListener("keydown", handleKey);
