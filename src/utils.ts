import { ITile } from "./App";

export const generateTiles = (width = 9, height = 9, bombsToPlace = 10) => {
  const squares: ITile[] = Array(width * height)
    .fill(null)
    .map(() => ({
      value: 0,
      covered: true,
      flagged: false,
      background: "#c6c6c6",
    }));

  while (bombsToPlace) {
    const random = ~~(Math.random() * (width * height));
    let i = 0;
    while (i < width * height) {
      const curr = (random + i) % (width * height);
      if (squares[curr].value !== "mine") {
        squares[curr].value = "mine";
        bombsToPlace--;
        break;
      } else {
        i++;
      }
    }
  }

  return squares.map((square, i) => {
    if (square.value !== "mine") {
      return { ...square, value: getProximity(squares, i, width, height) };
    }
    return square;
  });
};

export const getProximity = (
  tiles: ITile[],
  index: number,
  width: number,
  height: number
): number => {
  const neighbors = getNeighbors(index, width, height);

  const mineCount = neighbors
    .map((i) => tiles[i])
    .reduce((count: number, neighbor: ITile) => {
      if (neighbor.value === "mine") {
        return count + 1;
      }
      return count;
    }, 0);

  return mineCount;
};

export const getNeighbors = (index: number, width: number, height: number) => {
  const row = Math.floor(index / width);
  const col = index % width;

  const neighbors = [];

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const newRow = row + i;
      const newCol = col + j;
      if (newRow >= 0 && newRow < height && newCol >= 0 && newCol < width) {
        neighbors.push(newRow * width + newCol);
      }
    }
  }
  return neighbors;
};

export const findAdjacentTilesRecursively = (
  tiles: ITile[],
  index: number,
  visited: Set<number>,
  res: Set<number>,
  width: number,
  height: number
) => {
  if (visited.has(index)) return res;
  if (tiles[index].value !== 0 && tiles[index].value !== "mine") {
    res.add(index);
    return res;
  }
  res.add(index);
  visited.add(index);
  for (const neighbor of getNeighbors(index, width, height)) {
    findAdjacentTilesRecursively(tiles, neighbor, visited, res, width, height);
  }

  return res;
};

export const uncoverTile = (
  tiles: ITile[],
  index: number,
  width: number,
  height: number
) => {
  const tile = tiles[index];
  tile.covered = false;
  if (tile.value === "mine") {
    console.log(`YOU HIT A MINE AT ${index}`);
    tile.background = "red";
    tiles = tiles.map((tile) => {
      if (tile.value === "mine") return { ...tile, covered: false };
      return tile;
    });
    return tiles;
  }
  const adjacentTiles = findAdjacentTilesRecursively(
    tiles,
    index,
    new Set(),
    new Set(),
    width,
    height
  );

  return tiles.map((tile, i) => {
    if (i === index) return { ...tile, covered: false };
    if (adjacentTiles.has(i)) return { ...tile, covered: false };
    return tile;
  });
};

export const getDigits = (num: number) => {
  const hundreds = ~~(num / 100);
  const tens = ~~((num % 100) / 10);
  const ones = num % 10;
  return { hundreds, tens, ones };
};

export const toggleFlag = (index: number, tiles: ITile[]) => {
  return tiles.map((tile, i) => {
    if (i === index) {
      return { ...tile, flagged: !tile.flagged };
    }
    return tile;
  });
};
