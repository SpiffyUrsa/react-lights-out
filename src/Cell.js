import React from "react";
import "./Cell.css";

/** A single cell on the board.
 *
 * This has no state --- just two props:
 *
 * - flipCellsAroundMe: a function rec'd from the board which flips this
 *      cell and the cells around of it
 *
 * - isLit: boolean, is this cell lit?
 *
 * This handles clicks --- by calling flipCellsAroundMe
 *
 **/

function Cell({ flipCellsAroundMe, isLit, coord }) {

  function handleClick(evt) {
    flipCellsAroundMe(coord)
  }

  const cellLighting = `Cell ${isLit ? "Cell-lit" : ""}`;
  return <td className={cellLighting} onClick={handleClick} />;
}

export default Cell;
