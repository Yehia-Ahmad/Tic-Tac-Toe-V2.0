import React from "react"
import styles from "./gameBoard.module.css";

const GameBoard = ({ onPlayerSelected, gameBoard }) => {
    return (
        <ol id={styles["game-board"]}>
            {gameBoard.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex) => (
                            <li key={colIndex}>
                                <button key={colIndex} onClick={() => onPlayerSelected(rowIndex, colIndex)} disabled={playerSymbol !== null}>
                                    {playerSymbol}
                                </button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    )
};

export default GameBoard;
