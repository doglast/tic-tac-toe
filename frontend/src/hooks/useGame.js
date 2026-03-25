import { useState } from 'react';

export const useGame = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);

    const [playerX, setPlayerX] = useState('');
    const [playerO, setPlayerO] = useState('');

    const calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a]; // Retorna 'X' ou 'O'
            }
        }
        return null;
    };

    const winnerSymbol = calculateWinner(board);
    const isDraw = !winnerSymbol && !board.includes(null);

    let winnerName = null;
    if (winnerSymbol === 'X') winnerName = playerX;
    if (winnerSymbol === 'O') winnerName = playerO;
    const handlePlay = (index) => {
        if (board[index] || winnerSymbol) return;

        const newBoard = [...board];
        newBoard[index] = xIsNext ? 'X' : 'O';

        setBoard(newBoard);
        setXIsNext(!xIsNext);
    };

    const resetBoard = () => {
        setBoard(Array(9).fill(null));
        setXIsNext(true);
    };
    const startGame = (nameX, nameO) => {
        setPlayerX(nameX);
        setPlayerO(nameO);
        resetBoard();
    };

    return {
        board,
        xIsNext,
        playerX,
        playerO,
        winnerSymbol,
        winnerName,
        isDraw,
        handlePlay,
        resetBoard,
        startGame
    };
};