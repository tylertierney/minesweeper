import { useState } from "react";
import Tile from "./components/Tile/Tile";
import "./index.css";

export type TileValue = number | "mine";

class Board {
  squares: Array<TileValue> = [];
  width: number = 9;
  height: number = 9;
  constructor(width = 9, height = 9) {
    this.width = width;
    this.height = height;
    this.squares = Array(width * height).fill(0);

    let bombsToPlace = 10;
    while (bombsToPlace) {
      const random = ~~(Math.random() * 81);
      let i = 0;
      while (i < 81) {
        const curr = (random + i) % 81;
        if (this.squares[curr] !== "mine") {
          this.squares[curr] = "mine";
          bombsToPlace--;
          break;
        } else {
          i++;
        }
      }
    }

    this.squares = this.squares.map((square, i) => {
      if (square !== "mine") {
        return this.getProximity(i);
      }
      return square;
    });
  }

  getProximity = (index: number): number => {
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

    const mineCount = neighbors
      .map((i) => this.squares[i])
      .reduce((count: number, neighbor: TileValue) => {
        if (neighbor === "mine") {
          return count + 1;
        }
        return count;
      }, 0);

    return mineCount;
  };
}

export default function App() {
  const [width, setWidth] = useState(9);
  const [height, setHeight] = useState(9);
  const [board, setBoard] = useState(new Board(width, height));

  return (
    <div>
      {new Array(height).fill(null).map((_, i) => {
        return (
          <div className="row" key={i}>
            {new Array(width).fill(null).map((_, j) => {
              return (
                <Tile
                  key={i * width + j}
                  value={board.squares[i * height + j]}
                  index={i * width + j}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
