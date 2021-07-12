import React from "react";
import "./tile.css";

interface Props {
  image?: string;
  number: number;
}

const Tile: React.FC<Props> = ({ number, image }) => {
  if (number % 2 === 0) {
    return (
      <div className="tile black-tile">
        {image && (
          <div
            className="piece-div"
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        )}
      </div>
    );
  } else {
    return (
      <div className="tile white-tile">
        {image && (
          <div
            className="piece-div"
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        )}
      </div>
    );
  }
};

export default Tile;
