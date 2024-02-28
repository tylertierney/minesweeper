import { useEffect, useState } from "react";
import Tile from "./components/Tile/Tile";
import "./index.css";
import { generateTiles, getDigits, toggleFlag, uncoverTile } from "./utils";

export type TileValue = number | "mine";

export interface ITile {
  value: TileValue;
  covered: boolean;
  flagged: boolean;
  background: "#c6c6c6" | "red";
}

export default function App() {
  // const [width, setWidth] = useState(7);
  // const [height, setHeight] = useState(7);
  const width = 12;
  const height = 12;
  const [tiles, setTiles] = useState(generateTiles(width, height));
  const [gameActive, setGameActive] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [flagMode, setFlagMode] = useState(false);

  const handleUncoverTile = (index: number) => {
    if (!gameActive) return;

    setTiles((tiles) => {
      return uncoverTile(tiles, index, width, height);
    });

    if (tiles[index].value === "mine") {
      setGameActive(false);
      return;
    }
  };

  const resetGame = () => {
    setElapsedTime(0);
    // setBoard(() => new Board(width, height));
    setTiles(generateTiles(width, height));
    setGameActive(true);
  };

  useEffect(() => {
    const interval = setInterval(
      () =>
        setElapsedTime((prev) => {
          if (prev === 999) return prev;
          return prev + 1;
        }),
      1000
    );

    return () => clearInterval(interval);
  }, []);

  const elapsedTimeDigits = getDigits(elapsedTime);

  const remainingFlags =
    20 - tiles.reduce((acc, tile) => acc + Number(tile.flagged), 0);

  const remainingFlagsDigits = getDigits(remainingFlags);

  useEffect(() => {
    const handleShiftKey = (type: "up" | "down") => (e: KeyboardEvent) => {
      if (e.key === "Shift") {
        if (type === "down") {
          setFlagMode(true);
        } else {
          setFlagMode(false);
        }
      }
    };

    const shiftKeyDown = handleShiftKey("down");
    const shiftKeyUp = handleShiftKey("up");

    document.addEventListener("keydown", shiftKeyDown);
    document.addEventListener("keyup", shiftKeyUp);

    return () => {
      document.removeEventListener("keydown", shiftKeyDown);
      document.removeEventListener("keyup", shiftKeyUp);
    };
  }, []);

  const handleToggleFlag = (index: number) => {
    if (!gameActive) return;
    if (remainingFlags <= 0) return;

    setTiles((tiles) => {
      return toggleFlag(index, tiles);
    });
  };

  useEffect(() => {
    const coveredTiles = tiles
      .filter((tile) => tile.value !== "mine")
      .map((tile) => tile.covered === false);

    if (coveredTiles.every((tile) => Boolean(tile))) {
      console.log("YOU WON!");
    }
  }, [tiles]);

  return (
    <>
      <div className="boardContainer">
        <div
          className="boardHeader"
          style={{ gridColumnStart: "span " + width }}
        >
          <div className="alarmContainer">
            <div className="placeholder">
              <div className="digit">8</div>
              <div className="digit">8</div>
              <div className="digit">8</div>
            </div>
            <div className="alarmText">
              <div className="digit">{remainingFlagsDigits.hundreds}</div>
              <div className="digit">{remainingFlagsDigits.tens}</div>
              <div className="digit">{remainingFlagsDigits.ones}</div>
            </div>
          </div>
          <div className="btnContainer">
            <button className="resetBtn"></button>
            <button className="resetBtn" onClick={() => resetGame()}>
              🙂
            </button>
            <button
              className="resetBtn"
              onClick={() => setFlagMode((prev) => !prev)}
            >
              ⛳️
            </button>
          </div>
          <div className="alarmContainer">
            <div className="placeholder">
              <div className="digit">8</div>
              <div className="digit">8</div>
              <div className="digit">8</div>
            </div>
            <div className="alarmText">
              <div className="digit">{elapsedTimeDigits.hundreds}</div>
              <div className="digit">{elapsedTimeDigits.tens}</div>
              <div className="digit">{elapsedTimeDigits.ones}</div>
            </div>
          </div>
        </div>
        {tiles.map((tile, i) => {
          return (
            <Tile
              key={i}
              tile={tile}
              index={i}
              uncoverTile={handleUncoverTile}
              flagMode={flagMode}
              toggleFlag={handleToggleFlag}
            />
          );
        })}
      </div>
    </>
  );
}
