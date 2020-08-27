import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
//lets- const
    for (let i = 0; i < nrows; i++) {
      let boardRow = [];

      for (let j = 0; j < ncols; j++) {

        let trueFalse = [true, false];
        //use chanceLightStartsOn
        let randIdx = Math.floor(Math.random() * 2);
        boardRow.push(trueFalse[randIdx]);

      }
      initialBoard.push(boardRow);
    }
    return initialBoard;
  }

  /** Checks each cell in row and returns true/false depending on whether the light is ON or OFF*/
//try to use every
  function hasWon() {

    for (let row of board) {
      console.log(row)
      if (row.some(val => val === true)) {
        return false;
      }
    }
    return true;
  }

  /**Gets the middle cell and all neighboring cells 
   * and if each cell is on the board, it flips to True/False
   * and return the new board
  */

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);
      const middle = [y, x]
      const bottom = [y - 1, x]
      const top = [y + 1, x]
      const left = [y, x - 1]
      const right = [y, x + 1]
      //move flipCell out
      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      let boardCopy = oldBoard.map(row => {
        return [...row]
      })

      let cellsToChange = [middle, bottom, top, left, right]

      for (let cell of cellsToChange) {
        flipCell(cell[0], cell[1], boardCopy)
      }
      return boardCopy

    });

  }

  /**Invoke cell to get cell(td) and create table for these cells */

  function generateCells() {
    const cells = []

    for (let i = 0; i < nrows; i++) {
      const row = []

      for (let j = 0; j < ncols; j++) {

        let coord = `${i}-${j}`;
        let newCell = <Cell key={coord} flipCellsAroundMe={flipCellsAround} isLit={board[i][j]} coord={coord} />
        row.push(newCell)
      }
      cells.push(<tr key={i}>{row}</tr>)
    }

    return cells
  }

  // if the game is won, just show a winning msg & render nothing else
  return (
    <div>{hasWon() ? <p>You Won</p> : <table className="Board"><tbody>{generateCells()}</tbody></table>}</div>
  )
}

export default Board;
