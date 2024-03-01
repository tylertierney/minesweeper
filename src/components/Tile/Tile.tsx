import "./Tile.css";
import { ITile, TileValue } from "../../App";
import FlagSVG from "../FlagSVG/FlagSVG";

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
  if (value === 0) return " ";
  return value;
};

interface TileProps {
  tile: ITile;
  index: number;
  uncoverTile: (index: number) => void;
  flagMode: boolean;
  toggleFlag: (index: number, placeOrRemove: "place" | "remove") => void;
}

const Tile = ({
  tile,
  index,
  uncoverTile,
  flagMode,
  toggleFlag,
}: TileProps) => {
  const color = getColorFromValue(tile.value);

  const symbol = getSymbolFromValue(tile.value);

  return (
    <div className="tile" style={{ backgroundColor: tile.background }}>
      <span className={`value`} style={{ color }}>
        {symbol}
      </span>

      {tile.covered === true && (
        <div
          className="cover"
          onClick={(e) => {
            uncoverTile(index);
            e.stopPropagation();
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            toggleFlag(index, "place");
            e.stopPropagation();
          }}
        >
          {tile.flagged === true && (
            <div
              className="flagSpot"
              onClick={(e) => {
                toggleFlag(index, "remove");
                e.stopPropagation();
              }}
            >
              <FlagSVG style={{ width: "1.7rem", rotate: "30deg" }} />
            </div>
          )}
        </div>
      )}
      {tile.covered === true && flagMode === true && !tile.flagged && (
        <div
          className="flagSpot"
          onClick={() => toggleFlag(index, "place")}
          onContextMenu={(e) => {
            e.preventDefault();
            toggleFlag(index, "place");
            e.stopPropagation();
          }}
        >
          <FlagSVG
            style={{
              width: "1.7rem",
              rotate: "30deg",
              filter: "grayscale(100%)",
              opacity: 0.25,
            }}
          />
        </div>
      )}
      {/* <span style={{ fontSize: "0.5rem" }}>{index}</span> */}
    </div>
  );
};

export default Tile;
