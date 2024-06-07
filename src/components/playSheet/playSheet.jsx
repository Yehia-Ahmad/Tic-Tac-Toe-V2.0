import React, { useState, useEffect } from "react"
import Players from "../players/players.jsx";
import GameBoard from "../game-board/gameBoard.jsx";
import styles from "./playSheet.module.css";
import Log from "../log/log.jsx";
import GameOver from "../gameOver/gameOver.jsx";

let winner;
let isDraw;
let xPlayer = sessionStorage.getItem('xPlayer') || 'Player 1';
let oPlayer = sessionStorage.getItem('oPlayer') || 'Player 2';

const initialGameBoard = [
    [null, null, null],  //[0,0] [0,1] [0,2]
    [null, null, null],  //[1,0] [1,1] [1,2]
    [null, null, null]   //[2,0] [2,1] [2,2]
]

const deriveActivePlayer = (turns) => {
    let curPlayer = 'X';
    if (turns.length > 0 && turns[0].player === 'X') {
        curPlayer = 'O';
    }
    return curPlayer
}

const horizontalWinCheck = (gameBoard) => {
    if (gameBoard[0][0] === gameBoard[0][1] && gameBoard[0][1] === gameBoard[0][2] && gameBoard[0][0] !== null) {
        return gameBoard[0][0];
    } else if (gameBoard[1][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[1][2] && gameBoard[1][0] !== null) {
        return gameBoard[1][0];
    } else if (gameBoard[2][0] === gameBoard[2][1] && gameBoard[2][1] === gameBoard[2][2] && gameBoard[2][0] !== null) {
        return gameBoard[2][0];
    } else {
        return null;
    }
}

const verticalWinCheck = (gameBoard) => {
    if (gameBoard[0][0] === gameBoard[1][0] && gameBoard[1][0] === gameBoard[2][0] && gameBoard[0][0] !== null) {
        return gameBoard[0][0];
    } else if (gameBoard[0][1] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][1] && gameBoard[0][1] !== null) {
        return gameBoard[0][1];
    } else if (gameBoard[0][2] === gameBoard[1][2] && gameBoard[1][2] === gameBoard[2][2] && gameBoard[0][2] !== null) {
        return gameBoard[0][2];
    } else {
        return null;
    }
}

const diagonalWinCheck = (gameBoard) => {
    if (gameBoard[0][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][2] && gameBoard[0][0] !== null) {
        return gameBoard[0][0];
    } else if (gameBoard[0][2] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][0] && gameBoard[0][2] !== null) {
        return gameBoard[0][2];
    } else {
        return null;
    }
}

const PlaySheet = () => {
    const [gameTurns, setGameTurns] = useState([]);
    const activePlayer = deriveActivePlayer(gameTurns);
    const [gameBoard, setGameBoard] = useState(initialGameBoard);

    const handlePlayerSelected = (rowIndex, colIndex) => {
        setGameTurns((prevTurns) => {
            const updateTurns = [
                { square: { row: rowIndex, col: colIndex }, player: activePlayer }, ...prevTurns
            ];
            return updateTurns;
        });
    }

    const handleCellClick = (rowIndex, colIndex) => {
        const newBoard = [...gameBoard.map(row => [...row])];
        newBoard[rowIndex][colIndex] = activePlayer;
        setGameBoard(newBoard);

        handlePlayerSelected(rowIndex, colIndex);
    };

    const handleReset = () => {
        setGameTurns([]);
    }

    const rematch = () => {
        setGameBoard(initialGameBoard);
        winner = null;
        isDraw = false;
        handleReset();
    }


    useEffect(() => {
        setTimeout(() => {
            const horizontalWin = horizontalWinCheck(gameBoard);
            const verticalWin = verticalWinCheck(gameBoard);
            const diagonalWin = diagonalWinCheck(gameBoard);

            if (horizontalWin || verticalWin || diagonalWin) {
                winner = horizontalWin || verticalWin || diagonalWin;
                winner = winner === 'X' ? xPlayer : oPlayer;
                setGameBoard(initialGameBoard);
                handleReset();
            }
            if (gameTurns.length === 9 && !winner) {
                setGameBoard(initialGameBoard);
                winner = null;
                handleReset();
                isDraw = true;
            }
        }, 10)
    }, [gameBoard, gameTurns]);

    return (
        <main>
            <div id={styles["game-container"]}>
                <ol id={styles["players"]} className={styles["highlight-player"]}>
                    <Players name={xPlayer} symbol={"X"} isAcive={activePlayer === 'X'} />
                    <Players name={oPlayer} symbol={"O"} isAcive={activePlayer === 'O'} />
                </ol>
                {(winner || isDraw) && <GameOver winner={winner} rematch={rematch} />}
                <GameBoard onPlayerSelected={handleCellClick} gameBoard={gameBoard} />
            </div>
            <Log turns={gameTurns} />
        </main>
    )
};

export default PlaySheet;
