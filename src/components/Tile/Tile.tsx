import "./Tile.css";
import { TileValue } from "../App";

interface TileProps {
  value: TileValue;
  index: number;
}

const Tile = ({ value, index }: TileProps) => {
  return (
    <div className="tile">
      {value}
      <span style={{ position: "absolute" }}>{index}</span>
    </div>
  );
};

export default Tile;
