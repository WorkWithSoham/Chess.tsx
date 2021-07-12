import React from "react";
import { useRef } from "react";
import Tile from "../Tile/tile";
import "./chessboard.css";

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

interface Piece {
  image: string;
  x: number;
  y: number;
}

const pieces: Piece[] = [];

for (let p = 0; p < 2; p++) {
  const type = p === 0 ? "b" : "w";
  const y = type === "b" ? 7 : 0;

  pieces.push({ image: `images/rook_${type}.png`, x: 0, y });
  pieces.push({ image: `images/rook_${type}.png`, x: 7, y });
  pieces.push({ image: `images/knight_${type}.png`, x: 1, y });
  pieces.push({ image: `images/knight_${type}.png`, x: 6, y });
  pieces.push({ image: `images/bishop_${type}.png`, x: 2, y });
  pieces.push({ image: `images/bishop_${type}.png`, x: 5, y });
  pieces.push({ image: `images/king_${type}.png`, x: 4, y });
  pieces.push({ image: `images/queen_${type}.png`, x: 3, y });
}

for (let i = 0; i < horizontalAxis.length; i++) {
  pieces.push({ image: "images/pawn_b.png", x: i, y: 6 });
}

for (let i = 0; i < horizontalAxis.length; i++) {
  pieces.push({ image: "images/pawn_w.png", x: i, y: 1 });
}

export default function Chessboard() {
  let activeElement: HTMLElement | null = null;

  const grabPiece = (e: React.MouseEvent) => {
    const element = e.target as HTMLElement;
    if (element.classList.contains("piece-div")) {
      const x = e.clientX - 40;
      const y = e.clientY - 40;
      element.style.position = "absolute";
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;

      activeElement = element;
    }
  };

  const dropPiece = (e: React.MouseEvent) => {
    if (activeElement) {
      activeElement = null;
    }
  };

  const movePiece = (e: React.MouseEvent) => {
    if (activeElement && chessBoardRef.current) {
      const x = e.clientX - 40;
      const y = e.clientY - 40;
      activeElement.style.position = "absolute";

      if (x < chessBoardRef.current.offsetLeft) {
        activeElement.style.left = `${chessBoardRef.current.offsetLeft}px`;
      } else if (
        x >
        chessBoardRef.current.offsetLeft +
          chessBoardRef.current.clientWidth -
          80
      ) {
        activeElement.style.left = `${
          chessBoardRef.current.offsetLeft +
          chessBoardRef.current.clientWidth -
          80
        }px`;
      } else {
        activeElement.style.left = `${x}px`;
      }

      if (y < chessBoardRef.current.offsetTop) {
        activeElement.style.top = `${chessBoardRef.current.offsetTop}px`;
      } else if (
        y >
        chessBoardRef.current.offsetTop +
          chessBoardRef.current.clientHeight -
          80
      ) {
        activeElement.style.top = `${
          chessBoardRef.current.offsetTop +
          chessBoardRef.current.clientHeight -
          80
        }px`;
      } else {
        activeElement.style.top = `${y}px`;
      }

      // activeElement.style.top = y < chessBoardRef.current.offsetTop ? `${chessBoardRef.current.offsetTop}px`:  `${y}px`;
    }
  };

  const chessBoardRef = useRef<HTMLDivElement>(null);

  let board = [];

  for (let j = verticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontalAxis.length; i++) {
      var number = j + i;
      let image = undefined;

      pieces.forEach((p) => {
        if (p.x === i && p.y === j) {
          image = p.image;
        }
      });

      board.push(<Tile key={`${j}, ${i}`} image={image} number={number} />);
    }
  }

  return (
    <div
      id="chessboard"
      onMouseMove={(e) => movePiece(e)}
      onMouseDown={(e) => grabPiece(e)}
      onMouseUp={(e) => dropPiece(e)}
      ref={chessBoardRef}
    >
      {board}
    </div>
  );
}
