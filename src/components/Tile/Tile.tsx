import "./Tile.css";
import { ITile, TileValue } from "../../App";

const getColorFromValue = (value: TileValue): string => {
  if (value === 1) return "blue";

  if (value === 2) return "green";

  if (value === 3) return "red";

  if (value === 4) return "purple";

  if (value === 5) return "maroon";

  if (value === 6) return "lightblue";

  if (value === 7) return "black";

  if (value === 8) return "darkgray";
  return "";
};

const getSymbolFromValue = (value: TileValue) => {
  if (value === "mine") return "💣";
  return value;
};

interface TileProps {
  tile: ITile;
  index: number;
  uncoverTile: (index: number) => void;
}

const Tile = ({ tile, index, uncoverTile }: TileProps) => {
  const color = getColorFromValue(tile.value);

  const symbol = getSymbolFromValue(tile.value);

  return (
    <div className="tile" style={{ backgroundColor: tile.background }}>
      {tile.value !== 0 && (
        <span className={`value`} style={{ color }}>
          {symbol}
        </span>
      )}
      {tile.covered === true && (
        <div className="cover" onClick={() => uncoverTile(index)}></div>
      )}
      <span
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          fontSize: "0.5rem",
        }}
      >
        {index}
      </span>
    </div>
  );
};

export default Tile;
