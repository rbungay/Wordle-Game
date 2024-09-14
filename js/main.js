/*-------------------------------- Constants --------------------------------*/

import { fiveLetterWords, letters } from "./data.js";

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

/*----------------------------- Event Listeners -----------------------------*/

const updateBoard = (char) => {
  console.log("This is the actual updateBoard function");
  console.log();
};

const handleKey = (event) => {
  console.log("this is where i'll be passing the letter", event.key);
  updateBoard(event.key);
};

window.addEventListener("keydown", handleKey);
