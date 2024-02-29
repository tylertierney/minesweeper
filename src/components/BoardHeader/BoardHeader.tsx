import { Dispatch, SetStateAction } from "react";
import { getDigits } from "../../utils";
import styles from "./BoardHeader.module.css";
import Dialog from "../Dialog/Dialog";
import Alarm from "./Alarm/Alarm";
import { createPortal } from "react-dom";
import { WinStatus } from "../../App";
import FlagSVG from "../FlagSVG/FlagSVG";

interface BoardHeaderProps {
  elapsedTime: number;
  remainingFlags: number;
  width: number;
  height: number;
  mineCount: number;
  resetGame: (width: number, height: number, mineCount: number) => void;
  flagMode: boolean;
  setFlagMode: Dispatch<SetStateAction<boolean>>;
  winStatus: WinStatus;
  showPortal: boolean;
  setShowPortal: Dispatch<SetStateAction<boolean>>;
  setWidth: Dispatch<SetStateAction<number>>;
  setHeight: Dispatch<SetStateAction<number>>;
  setMineCount: Dispatch<SetStateAction<number>>;
  gameActive: boolean;
}

export default function BoardHeader({
  elapsedTime,
  remainingFlags,
  width,
  height,
  mineCount,
  resetGame,
  flagMode,
  setFlagMode,
  winStatus,
  showPortal,
  setShowPortal,
  setWidth,
  setHeight,
  setMineCount,
  gameActive,
}: BoardHeaderProps) {
  const elapsedTimeDigits = getDigits(elapsedTime);

  const remainingFlagsDigits = getDigits(remainingFlags);

  return (
    <div
      className={styles.boardHeader}
      style={{ gridColumnStart: "span " + width }}
    >
      <Alarm
        digits={[
          remainingFlagsDigits.hundreds,
          remainingFlagsDigits.tens,
          remainingFlagsDigits.ones,
        ]}
      />
      <div className={styles.btnContainer}>
        <button
          className={styles.resetBtn}
          onClick={() => setShowPortal((prev) => !prev)}
        >
          ?
        </button>
        {showPortal &&
          createPortal(
            <Dialog
              winStatus={winStatus}
              setShowPortal={setShowPortal}
              width={width}
              height={height}
              mineCount={mineCount}
              setWidth={setWidth}
              setHeight={setHeight}
              setMineCount={setMineCount}
              resetGame={resetGame}
              elapsedTime={elapsedTime}
              gameActive={gameActive}
            />,
            document.body
          )}

        <button
          className={styles.resetBtn}
          onClick={() => resetGame(width, height, mineCount)}
        >
          🙂
        </button>
        <button
          className={`${styles.resetBtn} ${flagMode ?? styles.flagModeActive}`}
          onClick={() => setFlagMode((prev) => !prev)}
        >
          <FlagSVG
            style={{
              width: "1.8rem",
              rotate: "30deg",
            }}
          />
        </button>
      </div>
      <Alarm
        digits={[
          elapsedTimeDigits.hundreds,
          elapsedTimeDigits.tens,
          elapsedTimeDigits.ones,
        ]}
      />
    </div>
  );
}
