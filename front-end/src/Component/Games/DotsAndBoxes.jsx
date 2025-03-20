import React, { useState } from 'react';
import './DotsAndBoxes.css';

const size = 4; // Grid size

const DotsAndBoxes = () => {
    const [horizontalLines, setHorizontalLines] = useState(Array(size * (size + 1)).fill(false));
    const [verticalLines, setVerticalLines] = useState(Array((size + 1) * size).fill(false));
    const [boxes, setBoxes] = useState(Array(size * size).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState('A');

    const handleLineClick = (index, isHorizontal) => {
        if (isHorizontal && horizontalLines[index]) return;
        if (!isHorizontal && verticalLines[index]) return;

        if (isHorizontal) {
            setHorizontalLines(prev => {
                const newLines = [...prev];
                newLines[index] = true;
                return newLines;
            });
        } else {
            setVerticalLines(prev => {
                const newLines = [...prev];
                newLines[index] = true;
                return newLines;
            });
        }

        checkForBoxes();
    };

    const checkForBoxes = () => {
        let newBoxes = [...boxes];
        let completedBox = false;

        for (let i = 0; i < size * size; i++) {
            const top = horizontalLines[i];
            const bottom = horizontalLines[i + size];
            const left = verticalLines[i];
            const right = verticalLines[i + 1];

            if (top && bottom && left && right && !newBoxes[i]) {
                newBoxes[i] = currentPlayer;
                completedBox = true;
            }
        }

        setBoxes(newBoxes);
        if (!completedBox) {
            setCurrentPlayer(currentPlayer === 'A' ? 'B' : 'A');
        }
    };

    return (
        <div className="dots-and-boxes">
            <h1>Dots and Boxes</h1>
            <div className="grid">
                {Array.from({ length: size + 1 }).map((_, row) => (
                    <div key={row} className="row">
                        {Array.from({ length: size + 1 }).map((_, col) => (
                            <div key={col} className="dot-container">
                                <div className="dot"></div>
                                {col < size && (
                                    <div
                                        className={`line horizontal ${horizontalLines[row * size + col] ? 'active' : ''}`}
                                        onClick={() => handleLineClick(row * size + col, true)}
                                    ></div>
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <h2>Current Player: {currentPlayer}</h2>
        </div>
    );
};

export default DotsAndBoxes;