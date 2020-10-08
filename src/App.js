// Importing React and useState hook, that allows us to use state in a functional component
import React, { Fragment, useState } from "react";
// import our css file
import "./App.css";
// Import our spinning image
import img from "./assets/images/roulletteTable.png";

//
const App = () => {
  // Here we create our state and set it to an empty array
  const [currentMatrixData, setCurrentMatrixData] = useState([]);
  // Array to hold initial data
  let matrixData = [];
  // Array to hold final matrix data
  let newMatrix = [];

  // This function simply generates a 2D Array matrix.
  const drawTable = () => {
    // Define the number of rows and columns/cells that we want in the array matrix
    const totalRows = 5;
    const cellsInRow = 5;
    // Create the Min and Max Variable
    const min = 10;
    const max = 49;

    // Creating rows
    // We need a nested for loop because we want to create a row, and create cells inside the row at the same time.
    for (let r = 0; r < totalRows; r++) {
      // Creating a new 'row' array. This action will be performed on every iteration
      let row = [];

      // Create cells in row
      for (let c = 0; c < cellsInRow; c++) {
        let cell; // Variable to hold random cell value
        let cellText = Math.floor(Math.random() * (max - min + 1)) + min; // Actual logic to generate a random number for each cell
        cell = cellText; // Update the cell to hold the random two-digit value
        row.push(cell); // Finally, push the cells to the row array.
      }

      // We're now pushing our rows to the matrixData array on every iteration of the outer loop
      matrixData.push(row); // Possible output after every iteration is [23, 46, 45, 14, 19]

      // At the end of the for loop iterations, we should end up with an array containing 5 other arrays - like
      // matrixData = [
      //               [23, 46, 45, 14, 19]
      //               [33, 16, 25, 34, 11]
      //               [23, 46, 45, 25, 18]
      //               [23, 24, 45, 41, 29]
      //               [23, 46, 45, 38, 44]
      //            ]
    } // End For Loop

    // This logic maps the matrix data to a new array and sets the the original matrixData array to be empty.
    if (matrixData.length === 5) {
      // Mapping matrixData to new Array
      matrixData.map((rowItem) => {
        return newMatrix.push(rowItem);
      });
      // Emptying out the old array
      matrixData = [];
    }

    // We are setting our currentMatrixData state data to be the newMatrix value and forcing our component to re-render
    setCurrentMatrixData(newMatrix);
  }; // End Function

  // Here we are mapping through our state and creating elements from our currentMatrixData
  const rows = currentMatrixData.map((item, i) => {
    const entry = item.map((element, j) => {
      return <td key={j}>{element}</td>;
    });
    return <tr key={i}>{entry}</tr>;
  });

  return (
    // These <></> tags are react fragments. we use it when we don't want to use extra HTML elements to add extra nesting
    <Fragment>
      {/* This container contains the spinning table */}
      <div className="container">
        <img src={img} alt="roulletteTable" onClick={() => drawTable() } />
      </div>
      {/* This is the left part of the screen(for desktop/tabs) that contains the table data */}
      <div className="left">
        <h1>Lucky Numbers</h1>
        <div className="showTable">
          <table>
            <tbody>
              {rows}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

export default App;