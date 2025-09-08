import React, { useState } from 'react';
import './App.css';

// PUBLIC_INTERFACE
const Board = ({ squares, onClick }) => {
  return (
    <div className="game-board">
      {squares.map((square, i) => (
        <Square key={i} value={square} onClick={() => onClick(i)} />
      ))}
    </div>
  );
};

// PUBLIC_INTERFACE
const Square = ({ value, onClick }) => {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
};

// PUBLIC_INTERFACE
const App = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [notification, setNotification] = useState('');

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (i) => {
    if (squares[i] || calculateWinner(squares)) return;

    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);

    const winner = calculateWinner(newSquares);
    if (winner) {
      setNotification(`Player ${winner} wins!`);
    } else if (!newSquares.includes(null)) {
      setNotification("It's a tie!");
    } else {
      setNotification(`Next player: ${!xIsNext ? 'X' : 'O'}`);
    }
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setNotification('Next player: X');
  };

  return (
    <div className="App">
      <div className="game-container">
        <h1>Tic Tac Toe</h1>
        <div className="notification">{notification}</div>
        <Board squares={squares} onClick={handleClick} />
        <button className="reset-button" onClick={resetGame}>
          Reset Game
        </button>
      </div>
    </div>
  );
};

export default App;
