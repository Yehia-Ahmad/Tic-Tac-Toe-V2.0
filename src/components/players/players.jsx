import React, { useState, useRef, useEffect } from "react"
import styles from "./players.module.css";

const Players = ({ name, symbol, isAcive }) => {
  const nameRef = useRef();
  const [isEdit, setIsEdit] = useState(false);
  const [editedPlayerName, setEditedPlayerName] = useState(name);
  let playerName = <span className={styles["player-name"]}>{editedPlayerName}</span>;

  const handleEdit = () => {
    if (isEdit) {
      name = nameRef.current.value;
      setEditedPlayerName(name);
      symbol === 'X' ? sessionStorage.setItem("xPlayer", name) : sessionStorage.setItem("oPlayer", name);
    }
    setIsEdit((editing) => !editing);
  };

  if (isEdit) {
    playerName = <input required ref={nameRef} type="text" defaultValue={name} />
  }

  return (
    <li className={isAcive ? styles['active'] : null}>
      <span className={styles.player}>
        {playerName}
        <span className={styles["player-symbol"]}>{symbol}</span>
      </span>
      <button onClick={handleEdit}>{isEdit ? "Save" : "Edit"}</button>
    </li>
  )
};

export default Players;
