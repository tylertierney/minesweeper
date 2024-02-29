import { Dispatch, SetStateAction, useEffect, useState } from "react";

import styles from "./Dialog.module.css";
import { WinStatus } from "../../App";

interface DialogProps {
  setShowPortal: Dispatch<SetStateAction<boolean>>;
  winStatus: WinStatus;
  width: number;
  height: number;
  setWidth: Dispatch<SetStateAction<number>>;
  setHeight: Dispatch<SetStateAction<number>>;
  resetGame: (width: number, height: number) => void;
}

export default function Dialog({
  setShowPortal,
  winStatus,
  width,
  height,
  setWidth,
  setHeight,
  resetGame,
}: DialogProps) {
  const [tempWidth, setTempWidth] = useState(width);
  const [tempHeight, setTempHeight] = useState(height);

  const gameOverMessage =
    winStatus === "won"
      ? "🎉🥳 You won! 😱🤩"
      : winStatus === "lost"
      ? "😭🤣 You lost! 🤯🚒"
      : "";

  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowPortal(false);
      }
    };

    document.addEventListener("keyup", handleEscapeKey);

    return () => document.removeEventListener("keyup", handleEscapeKey);
  }, [setShowPortal]);

  const confirmDimensions = (width: number, height: number) => {
    setWidth(width);
    setHeight(height);
    setShowPortal(false);
    resetGame(width, height);
  };

  return (
    <div className={styles.backdrop} onClick={() => setShowPortal(false)}>
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        className={styles.dialog}
      >
        <div className={styles.header}>
          <button
            className={styles.closeBtn}
            onClick={() => setShowPortal(false)}
          >
            ❌
          </button>
        </div>
        <div className={styles.body}>
          <h1 className={styles.heading}>MINESWEEPER</h1>
          <h3 className={styles.gameOverMessage}>{gameOverMessage}</h3>
          <label className={styles.label}>
            Height
            <input
              type="range"
              value={tempHeight}
              onChange={(e) => setTempHeight(parseInt(e.target.value, 10))}
            />
            {tempHeight}
          </label>
          <label className={styles.label}>
            Width
            <input
              type="range"
              value={tempWidth}
              onChange={(e) => setTempWidth(parseInt(e.target.value, 10))}
            />
            {tempWidth}
          </label>
          <button onClick={() => confirmDimensions(tempWidth, tempHeight)}>
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
}
