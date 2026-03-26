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
                return squares[a];
            }
        }
        return null;
    };

    const winnerSymbol = calculateWinner(board);
    const isDraw = !winnerSymbol && !board.includes(null);

    let winnerName = null;
    if (winnerSymbol === 'X') winnerName = playerX || 'Jogador X';
    if (winnerSymbol === 'O') winnerName = playerO || 'Jogador O';

    const applyMove = (index, symbol) => {
        setBoard((prevBoard) => {
            const newBoard = [...prevBoard];
            newBoard[index] = symbol;
            return newBoard;
        });
        setXIsNext(symbol === 'X' ? false : true);
    };

    const resetBoard = () => {
        setBoard(Array(9).fill(null));
        setXIsNext(true);
    };

    return {
        board,
        xIsNext,
        playerX, setPlayerX,
        playerO, setPlayerO,
        winnerSymbol,
        winnerName,
        isDraw,
        applyMove,
        resetBoard
    };
};