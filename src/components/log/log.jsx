import React from "react"
import styles from "./log.module.css";

const Log = ({ turns }) => {
    return (
        <ol id={styles["log"]}>
            {turns.map((turn) => (
                <li key={`${turn.square.row}${turn.square.col}`}>
                    {turn.player} selected {turn.square.row},{turn.square.col}
                </li>
            ))}
        </ol>
    )
};

export default Log;
