import { useState } from "react";
import Tile from "./components/Tile/Tile";
import "./index.css";

export type TileValue = number | "mine";

export interface ITile {
  value: TileValue;
  covered: boolean;
  flagged: boolean;
  background: "#c6c6c6" | "red";
}

class Board {
  squares: Array<ITile> = [];
  width: number = 9;
  height: number = 9;
  constructor(width = 9, height = 9) {
    this.width = width;
    this.height = height;
    this.squares = Array(width * height)
      .fill(null)
      .map(() => ({
        value: 0,
        covered: true,
        flagged: false,
        background: "#c6c6c6",
      }));

    let bombsToPlace = 10;
    while (bombsToPlace) {
      const random = ~~(Math.random() * (this.width * this.height));
      let i = 0;
      while (i < this.width * this.height) {
        const curr = (random + i) % (this.width * this.height);
        if (this.squares[curr].value !== "mine") {
          this.squares[curr].value = "mine";
          bombsToPlace--;
          break;
        } else {
          i++;
        }
      }
    }

    this.squares = this.squares.map((square, i) => {
      if (square.value !== "mine") {
        return { ...square, value: this.getProximity(i) };
      }
      return square;
    });
  }

  getProximity = (index: number): number => {
    const neighbors = this.getNeighbors(index);

    const mineCount = neighbors
      .map((i) => this.squares[i])
      .reduce((count: number, neighbor: ITile) => {
        if (neighbor.value === "mine") {
          return count + 1;
        }
        return count;
      }, 0);

    return mineCount;
  };

  getNeighbors = (index: number) => {
    const row = Math.floor(index / this.width);
    const col = index % this.width;

    const neighbors = [];

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const newRow = row + i;
        const newCol = col + j;
        if (
          newRow >= 0 &&
          newRow < this.height &&
          newCol >= 0 &&
          newCol < this.width
        ) {
          neighbors.push(newRow * this.width + newCol);
        }
      }
    }
    return neighbors;
  };

  findAdjacentTilesRecursively = (
    index: number,
    visited: Set<number>,
    res: Set<number>
  ) => {
    const tiles = this.squares;
    if (visited.has(index)) return res;
    if (tiles[index].value !== 0 && tiles[index].value !== "mine") {
      res.add(index);
      return res;
    }
    res.add(index);
    visited.add(index);
    for (const neighbor of this.getNeighbors(index)) {
      this.findAdjacentTilesRecursively(neighbor, visited, res);
    }

    return res;
  };

  uncoverTile = (index: number) => {
    const tile = this.squares[index];
    tile.covered = false;
    if (tile.value === "mine") {
      console.log(`YOU HIT A MINE AT ${index}`);
      tile.background = "red";
      this.squares = this.squares.map((tile) => {
        if (tile.value === "mine") return { ...tile, covered: false };
        return tile;
      });
      return this.squares;
    }
    const adjacentTiles = this.findAdjacentTilesRecursively(
      index,
      new Set(),
      new Set()
    );

    this.squares = this.squares.map((tile, i) => {
      if (i === index) return { ...tile, covered: false };
      if (adjacentTiles.has(i)) return { ...tile, covered: false };
      return tile;
    });

    return this.squares;
  };
}

export default function App() {
  // const [width, setWidth] = useState(7);
  // const [height, setHeight] = useState(7);
  const width = 7;
  const height = 7;
  const [board, setBoard] = useState(new Board(width, height));
  const [gameActive, setGameActive] = useState(true);

  const uncoverTile = (index: number) => {
    if (!gameActive) return;
    setBoard((board) => {
      return { ...board, squares: board.uncoverTile(index) };
    });
    if (board.squares[index].value === "mine") {
      setGameActive(false);
      return;
    }
  };

  const resetGame = () => {
    setBoard(() => new Board(width, height));
    setGameActive(true);
  };

  return (
    <div className="boardContainer">
      <div className="boardHeader">
        <button onClick={() => resetGame()}>reset</button>
      </div>
      <div className="board">
        {new Array(height).fill(null).map((_, i) => {
          return (
            <div className="row" key={i}>
              {new Array(width).fill(null).map((_, j) => {
                const index = i * width + j;
                return (
                  <Tile
                    key={index}
                    tile={board.squares[i * height + j]}
                    index={index}
                    uncoverTile={uncoverTile}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
