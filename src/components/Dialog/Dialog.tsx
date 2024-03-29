import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

import styles from "./Dialog.module.css";
import { WinStatus } from "../../App";

interface DialogProps {
  setShowPortal: Dispatch<SetStateAction<boolean>>;
  winStatus: WinStatus;
  width: number;
  height: number;
  mineCount: number;
  setWidth: Dispatch<SetStateAction<number>>;
  setHeight: Dispatch<SetStateAction<number>>;
  setMineCount: Dispatch<SetStateAction<number>>;
  resetGame: (width: number, height: number, mineCount: number) => void;
  elapsedTime: number;
  gameActive: boolean;
}

export default function Dialog({
  setShowPortal,
  winStatus,
  width,
  height,
  mineCount,
  setWidth,
  setHeight,
  setMineCount,
  resetGame,
  elapsedTime,
  gameActive,
}: DialogProps) {
  const [tempWidth, setTempWidth] = useState(width);
  const [tempHeight, setTempHeight] = useState(height);
  const [tempMineCount, setTempMineCount] = useState(mineCount);

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

    const handleEnterKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        confirmDimensions(width, height, mineCount);
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    document.addEventListener("keydown", handleEnterKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("keydown", handleEnterKey);
    };
  }, [setShowPortal, width, height, mineCount]);

  const confirmDimensions = (
    width: number,
    height: number,
    mineCount: number
  ) => {
    setWidth(width);
    setHeight(height);
    setMineCount(mineCount);
    setShowPortal(false);
    resetGame(width, height, mineCount);
  };

  const mineCountInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const area = tempHeight * tempWidth;
    if (tempMineCount > area) {
      setTempMineCount(area - 1);
      if (mineCountInput.current) {
        mineCountInput.current.value = String(area);
      }
    }
  }, [tempHeight, tempWidth, tempMineCount, mineCountInput]);

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
          {!gameActive && (
            <p style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              <span>{String(~~(elapsedTime / 60)).padStart(2, "0")}:</span>
              <span>{String(elapsedTime % 60).padStart(2, "0")}</span>
            </p>
          )}

          <label className={styles.sliderContainer}>
            <span className={styles.label}>Width</span>
            <input
              type="range"
              value={tempWidth}
              onChange={(e) => setTempWidth(parseInt(e.target.value, 10))}
              min={3}
              max={16}
            />
            <span className={styles.dimensionCount}>{tempWidth}</span>
          </label>
          <label className={styles.sliderContainer}>
            <span className={styles.label}>Height</span>
            <input
              type="range"
              value={tempHeight}
              onChange={(e) => setTempHeight(parseInt(e.target.value, 10))}
              min={3}
              max={16}
            />
            <span className={styles.dimensionCount}>{tempHeight}</span>
          </label>
          <label className={styles.sliderContainer}>
            <span className={styles.label}>Mines</span>
            <input
              type="range"
              value={tempMineCount}
              onChange={(e) => setTempMineCount(parseInt(e.target.value, 10))}
              min={5}
              max={Math.min(24, tempHeight * tempWidth - 1)}
              ref={mineCountInput}
            />
            <span className={styles.dimensionCount}>{tempMineCount}</span>
          </label>
          <button
            className={styles.playAgainBtn}
            onClick={() =>
              confirmDimensions(tempWidth, tempHeight, tempMineCount)
            }
          >
            Play Again
          </button>
          <p style={{ display: "flex", gap: "0.5rem" }}>
            <span>Tip:</span>
            <span>
              You can hold the Shift key to activate flagging mode. You can also
              place flags by right-clicking on a tile.
            </span>
          </p>
          <p style={{ textAlign: "center" }}>
            Created by&nbsp;
            <a target="_blank" href="https://tylertierney.com">
              Tyler Tierney
            </a>
            .
          </p>
          <p style={{ textAlign: "center" }}>
            View the full code&nbsp;
            <a
              target="_blank"
              href="https://github.com/tylertierney/minesweeper"
            >
              here
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
