/*-------------------------------- Constants --------------------------------*/

import { fiveLetterWords, alphabet } from "./data.js";

/*---------------------------- Variables (state) ----------------------------*/

let board = ["", "", "", "", ""];
let winner = false;
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
  console.log(board);
};

const updateBoard = (char) => {
  updateInternalBoard(char);
  console.log(char);
};

const handleKey = (event) => {
  console.log("this is where i'll be passing the letter", event.key);
  updateBoard(event.key);
};

// console.log(boardOneEl.children[0].innerText);

/*----------------------------- Event Listeners -----------------------------*/

window.addEventListener("keydown", handleKey);
