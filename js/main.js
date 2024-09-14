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
  console.log(char);
};

const handleKey = (event) => {
  console.log("this is where i'll be passing the letter", event.key);
  updateBoard(event.key);
};

window.addEventListener("keydown", handleKey);

// window.onload = () => {
//   init();
// };

/*
const updateBoard = (char) =>{
    for (let i = 0; i<board.length; i++){
    if (board[i] === ""){
    board[i] === char
    break
    }
}}

let currntboard = boardOneEl to keep track of the id with the current board
const render = () => {
board.forEach(spot, index) => {
    boarrdOneEl.children[index].innerText = board[index]}
    }

init is suppose to set something up

render is suppose to show you what you need to know. */
