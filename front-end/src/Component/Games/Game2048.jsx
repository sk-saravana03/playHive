import React, { useEffect, useState } from "react";
import "./Game2048.css";
const getEmptyBoard = () => [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
];

const hasValue = (board, value) => {
  return board.some(row => row.includes(value));
};

const isFull = (board) => !hasValue(board, 0);

const getRandomPosition = () => [
  Math.floor(Math.random() * 4),
  Math.floor(Math.random() * 4)
];

const generateRandom = (board) => {
  if (isFull(board)) return board;
  
  let [row, col] = getRandomPosition();
  while (board[row][col] !== 0) {
    [row, col] = getRandomPosition();
  }
  
  board[row][col] = 2;
  return board;
};

const compress = (board) => {
  return board.map(row => {
    const filtered = row.filter(num => num !== 0);
    return [...filtered, ...Array(4 - filtered.length).fill(0)];
  });
};

const merge = (board) => {
  return board.map(row => {
    for (let j = 0; j < row.length - 1; j++) {
      if (row[j] !== 0 && row[j] === row[j + 1]) {
        row[j] *= 2;
        row[j + 1] = 0;
      }
    }
    return row;
  });
};

const moveLeft = (board) => compress(merge(compress(board)));
const reverse = (board) => board.map(row => row.reverse());
const moveRight = (board) => reverse(moveLeft(reverse(board)));

const rotateLeft = (board) => {
  return board[0].map((_, colIndex) => board.map(row => row[colIndex])).reverse();
};

const rotateRight = (board) => {
  return board[0].map((_, colIndex) => board.map(row => row[colIndex])).map(row => row.reverse());
};

const moveUp = (board) => rotateRight(moveLeft(rotateLeft(board)));
const moveDown = (board) => rotateLeft(moveLeft(rotateRight(board)));

const checkWin = (board) => hasValue(board, 2048);

const hasDiff = (board, updatedBoard) => {
  return board.some((row, i) => row.some((cell, j) => cell !== updatedBoard[i][j]));
};

const isOver = (board) => ![moveLeft, moveRight, moveUp, moveDown].some(move => hasDiff(board, move(board.map(row => [...row]))));

const Cell = ({ number }) => {
  return (
    <div className={`cell cell-${number}`}>{number > 0 ? number : ""}</div>
  );
};

const Game2048 = () => {
  const [board, updateBoard] = useState(generateRandom(getEmptyBoard()));

  const checkEndGame = () => {
    if (checkWin(board)) console.log("You win!");
    else if (isOver(board)) console.log("Game over!");
  };

  const move = (moveFunc) => {
    const newBoard = moveFunc(board.map(row => [...row]));
    updateBoard(generateRandom(newBoard));
    checkEndGame();
  };

  const onKeyDown = (e) => {
    const moves = {
      ArrowLeft: moveLeft,
      ArrowRight: moveRight,
      ArrowUp: moveUp,
      ArrowDown: moveDown
    };
    if (moves[e.key]) move(moves[e.key]);
  };

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  return (
    <div className="game-board">
      {board.map((row, i) => (
        <div key={`row-${i}`} className="row">
          {row.map((cell, j) => (
            <Cell key={`cell-${i}-${j}`} number={cell} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Game2048;
