import { useEffect, useState } from "react";
import Tile from "./components/Tile/Tile";
import "./index.css";
import { generateTiles, toggleFlag, uncoverTile } from "./utils";
import BoardHeader from "./components/BoardHeader/BoardHeader";

export type TileValue = number | "mine";

export interface ITile {
  value: TileValue;
  covered: boolean;
  flagged: boolean;
  background: "#c6c6c6" | "red";
}

export type WinStatus = null | "won" | "lost";

export default function App() {
  const [mineCount, setMineCount] = useState(10);
  const [width, setWidth] = useState(9);
  const [height, setHeight] = useState(9);
  const [tiles, setTiles] = useState(generateTiles(width, height, mineCount));
  const [gameActive, setGameActive] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [flagMode, setFlagMode] = useState(false);
  const [winStatus, setWinStatus] = useState<WinStatus>(null);

  const handleUncoverTile = (index: number) => {
    if (!gameActive) return;

    setTiles((tiles) => uncoverTile(tiles, index, width, height));
  };

  const resetGame = (width: number, height: number, mineCount: number) => {
    setWinStatus(null);
    setElapsedTime(0);
    setTiles(generateTiles(width, height, mineCount));
    setGameActive(true);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (gameActive) {
        setElapsedTime((prev) => {
          if (prev === 999) return prev;
          return prev + 1;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [gameActive]);

  const remainingFlags =
    mineCount - tiles.reduce((acc, tile) => acc + Number(tile.flagged), 0);

  useEffect(() => {
    const handleShiftKey = (type: "up" | "down") => (e: KeyboardEvent) => {
      if (gameActive && e.key === "Shift") {
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
  }, [gameActive]);

  const handleToggleFlag = (
    index: number,
    placeOrRemove: "place" | "remove"
  ) => {
    if (!gameActive) return;

    setTiles((tiles) => {
      return toggleFlag(index, tiles, placeOrRemove, mineCount);
    });
  };

  useEffect(() => {
    const coveredTiles = tiles
      .filter((tile) => tile.value !== "mine")
      .map((tile) => tile.covered === false);

    if (coveredTiles.every((tile) => Boolean(tile))) {
      setWinStatus("won");
      setGameActive(false);
    }

    for (const tile of tiles) {
      if (!tile.covered && tile.value === "mine") {
        setWinStatus("lost");
        setGameActive(false);
        return;
      }
    }
  }, [tiles]);

  useEffect(() => {
    if (!gameActive) {
      setShowPortal(true);
    }
  }, [gameActive]);

  const [showPortal, setShowPortal] = useState(false);

  return (
    <>
      <BoardHeader
        elapsedTime={elapsedTime}
        remainingFlags={remainingFlags}
        resetGame={resetGame}
        flagMode={flagMode}
        setFlagMode={setFlagMode}
        width={width}
        height={height}
        mineCount={mineCount}
        winStatus={winStatus}
        showPortal={showPortal}
        setShowPortal={setShowPortal}
        setWidth={setWidth}
        setHeight={setHeight}
        setMineCount={setMineCount}
        gameActive={gameActive}
      />
      <div className="boardContainer" style={{ marginTop: "2.5rem" }}>
        {Array(height)
          .fill(null)
          .map((_, i) => {
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  marginBottom: i === height - 1 ? "400px" : "0px",
                }}
              >
                {Array(width)
                  .fill(null)
                  .map((_, j) => (
                    <Tile
                      key={i * width + j}
                      tile={tiles[i * width + j]}
                      index={i * width + j}
                      uncoverTile={handleUncoverTile}
                      flagMode={flagMode}
                      toggleFlag={handleToggleFlag}
                    />
                  ))}
              </div>
            );
          })}
      </div>
    </>
  );
}
