import React, { useState, useRef } from 'react';
import './TicTacToe.css';
import o from './Images/circle.png';
import x from './Images/cross.png';
import { BiRefresh } from 'react-icons/bi';

let data = ["", "", "", "", "", "", "", "", ""];

const TicTacToe = () => {
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);
    const [isDayTheme, setIsDayTheme] = useState(false);
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);

    let titleRef = useRef(null);
    let boxRefs = Array(9).fill(null).map(() => (null));

    const toggleTheme = () => setIsDayTheme(!isDayTheme);

    const toggle = (num) => {
        if (lock || data[num] !== "" || !isPlayerTurn) return;
        
        data[num] = "x";
        boxRefs[num].current.innerHTML = `<img src='${x}' alt='x'/>`;
        setCount(count + 1);
        setIsPlayerTurn(false);
        
        checkWin();
        if (!lock) setTimeout(aiMove, 500);
    };

    const aiMove = () => {
        if (lock) return;
        let bestMove = findBestMove();
        if (bestMove !== -1) {
            data[bestMove] = "o";
            boxRefs[bestMove].current.innerHTML = `<img src='${o}' alt='o'/>`;
            setCount(count + 1);
            checkWin();
            setIsPlayerTurn(true);
        }
    };

    const findBestMove = () => {
        for (let i = 0; i < 9; i++) {
            if (data[i] === "") return i;
        }
        return -1;
    };

    const checkWin = () => {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        
        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (data[a] && data[a] === data[b] && data[a] === data[c]) {
                won(data[a]);
                return;
            }
        }
        
        if (data.every(cell => cell !== "")) {
            titleRef.current.innerHTML = 'Match Draw';
            setLock(true);
        }
    };

    const won = (winner) => {
        setLock(true);
        titleRef.current.innerHTML = `<img src='${winner === "x" ? x : o}' alt='${winner}'/> WON`;
    };

    const reset = () => {
        setLock(false);
        data.fill("");
        titleRef.current.innerHTML = "";
        boxRefs.forEach(box => box.current.innerHTML = "");
        setIsPlayerTurn(true);
    };

    return (
        <div className={"container "}>
            
            <h1 className='title'>Tic Tac Toe <span></span></h1>
            <div className='player-indicators'>
                <span className='player'>You: <span className='mark'>X</span></span>
                <span className='player'>AI: <span className='mark'>O</span></span>
            </div>
            <h3 className='winner' ref={titleRef}></h3>
            <div className="board">
                {boxRefs.map((ref, index) => (
                    <div key={index} className="boxes" ref={ref} onClick={() => toggle(index)}></div>
                ))}
            </div>
            <button className="reset" onClick={reset} title='playagain'>
                <BiRefresh /> Play Again
            </button>
        </div>
    );
};

export default TicTacToe;
