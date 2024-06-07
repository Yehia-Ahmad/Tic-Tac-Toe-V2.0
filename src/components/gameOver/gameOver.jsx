import React from "react"
import styles from './gameOver.module.css'

const GameOver = ({ winner, rematch }) => {
    return (
        <div id={styles['game-over']}>
            <h2>Game Over</h2>
            {winner && <p>
                <span className={styles['game-over-winner']}>{winner}</span> Won!
            </p>}
            {!winner && <p>The Game Is Draw</p>}
            <p>
                <button onClick={rematch}>Rematch!</button>
            </p>
        </div>
    )
};

export default GameOver;
