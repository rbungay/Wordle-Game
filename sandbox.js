// let board = [
//   ["R1", "b", "", "", ""],
//   ["R2", "", "", "", ""],
//   ["R3", "", "", "", ""],
//   ["", "", "", "", ""],
//   ["", "", "", "", ""],
//   ["", "", "", "", ""],
// ];

// let boardRow = board[0];
// let boardPosition = boardRow[0];
// console.log(boardRow);
// console.log(boardPosition);
// console.log(boardRow);

// for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
//   let boardRow = board[rowIndex];
//   for (let colIndex = 0; colIndex < boardRow.length; colIndex++) {
//     let boardPosition = board[rowIndex][colIndex];

//     // Log the current position
//     console.log(
//       `Position: Row ${rowIndex + 1}, Column ${
//         colIndex + 1
//       }, Value: ${boardPosition}`
//     );
//   }
// }

let board = [
  ["R1", "b", "", "", ""],
  ["R2", "", "", "", ""],
  ["R3", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

// Define variables to track the current row and column
let currentRowIndex = 0;
let currentColIndex = 0;

// Function to place a value at the current position
function placeValue(value) {
  if (currentRowIndex >= board.length) {
    console.log("Board is full. Cannot place more values.");
    return;
  }

  // Place the value in the current row and column
  board[currentRowIndex][currentColIndex] = value;

  // Move to the next column
  currentColIndex++;

  // If the current row is filled, move to the next row and reset column
  if (currentColIndex >= board[currentRowIndex].length) {
    currentRowIndex++;
    currentColIndex = 0;
  }
}

function deleteValue() {
  currentColIndex--;
  board[currentRowIndex][currentColIndex] = "";
}

// Example: Fill the board with values
let values = ["X", "Y", "Z", "A", "B", "C", "D", "E", "F", "G", "H"];
for (let i = 0; i < values.length; i++) {
  placeValue(values[i]);
}

// Print the updated board
console.log(board);

console.log(currentColIndex);
