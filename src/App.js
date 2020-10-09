import React, { useState } from "react";
import "./App.css";
import img from "./assets/images/roulletteTable.png";

const App = () => {
  const [currentMatrixData, setCurrentMatrixData] = useState([]);
  let matrixData = [];
  let newMatrix = [];

  // This function simply generates a 2d Array matrix.
  const drawTable = () => {
    const totalRows = 5;
    const cellsInRow = 5;
    const min = 10;
    const max = 49;

    // Creating rows
    // We need a nested for loop because we want to create a row, and create cells inside the row at the same time.
    for (let r = 0; r < totalRows; r++) {
      let row = []; // Creating a new 'row' array. This action will be performed on every iteration as long as the above condition (r < totalRows) is true.

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

    // Here we are setting our currentMatrixData state data to be the newMatrix value.
    // Another significance of this action is that we are forcing our component to re-render, which
    // is important because we don't want old matrix data to be present every time our function runs.
    setCurrentMatrixData(newMatrix);
    console.log(newMatrix);
  }; // End Function

  // Here we are mapping through our state and creating elements from our currentMatrixData
  let rows = currentMatrixData.map(function (item, i) {
    let entry = item.map(function (element, j) {
      return <td key={j}>{element}</td>;
    });
    return <tr key={i}>{entry}</tr>;
  });

  return (
    // These <></> tags are react fragments. we use it when we don't want to use extra HTML elements to add extra nesting
    <>
      {/* This container contains the spinning table */}
      <div className="container">
        <div onClick={() => drawTable()}>
          <img src={img} alt="roulletteTable" />
        </div>
      </div>
      {/* This is the left part of the screen(for desktop/tabs) that contains the table data */}
      <div className="left">
        <h1>Lucky Numbers</h1>
        <div className="showTable">
          <table>
            <tbody>{rows}</tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default App;
