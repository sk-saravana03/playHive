import React, { useState, useEffect } from 'react';
import './Sudoku.css';

const generateGridWithRandomNumbers = () => {
    let grid = Array(9).fill(null).map(() => Array(9).fill(''));
    let filledCells = 20;
    while (filledCells > 0) {
        let row = Math.floor(Math.random() * 9);
        let col = Math.floor(Math.random() * 9);
        if (grid[row][col] === '') {
            grid[row][col] = Math.floor(Math.random() * 9) + 1;
            filledCells--;
        }
    }
    return grid;
};

const isValidSudoku = (grid) => {
    const isValidSet = (set) => new Set(set.filter(n => n !== '')).size === set.filter(n => n !== '').length;
    for (let i = 0; i < 9; i++) {
        if (!isValidSet(grid[i]) || !isValidSet(grid.map(row => row[i]))) return false;
    }
    for (let i = 0; i < 9; i += 3) {
        for (let j = 0; j < 9; j += 3) {
            let box = [];
            for (let x = 0; x < 3; x++) {
                for (let y = 0; y < 3; y++) {
                    box.push(grid[i + x][j + y]);
                }
            }
            if (!isValidSet(box)) return false;
        }
    }
    return true;
};

const Sudoku = () => {
    const [grid, setGrid] = useState(generateGridWithRandomNumbers());
    const [selectedCell, setSelectedCell] = useState(null);
    const [isCheckEnabled, setIsCheckEnabled] = useState(false);

    useEffect(() => {
        setIsCheckEnabled(grid.every(row => row.every(cell => cell !== '')));
    }, [grid]);

    const handleCellClick = (row, col) => {
        setSelectedCell({ row, col });
    };

    const handleInputChange = (event) => {
        if (!selectedCell) return;
        const { row, col } = selectedCell;
        const value = event.target.value;
        if (/^[1-9]?$/.test(value)) {
            const newGrid = grid.map(row => [...row]);
            newGrid[row][col] = value;
            setGrid(newGrid);
        }
    };

    const handleSubmit = () => {
        if (isValidSudoku(grid)) {
            alert('Congratulations! You won!');
        } else {
            alert('Better luck next time!');
        }
    };

    return (
        <div className="sudoku-container">
            <h1>Sudoku</h1>
            <div className="sudoku-grid">
                {grid.map((row, rowIndex) => (
                    <div key={rowIndex} className="sudoku-row">
                        {row.map((cell, colIndex) => (
                            <input
                                key={colIndex}
                                type="text"
                                value={cell}
                                maxLength="1"
                                onClick={() => handleCellClick(rowIndex, colIndex)}
                                onChange={handleInputChange}
                                className="sudoku-cell"
                                disabled={typeof cell === 'number'}
                            />
                        ))}
                    </div>
                ))}
            </div>
            <button className="check-button" disabled={!isCheckEnabled}>Check</button>
            <button className="submit-button" onClick={handleSubmit} disabled={!isCheckEnabled}>Submit</button>
        </div>
    );
};

export default Sudoku;


