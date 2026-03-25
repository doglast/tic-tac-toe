import React from 'react';
import styled from 'styled-components';
import Square from './Square';

const BoardContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, ${({ theme }) => theme.sizes.square});
    grid-template-rows: repeat(3, ${({ theme }) => theme.sizes.square});
    gap: ${({ theme }) => theme.sizes.boardGap};
`;

const Board = ({ squares, onPlay }) => {
    return (
        <BoardContainer>
            {Array.from({ length: 9 }).map((_, index) => (
                <Square
                    key={index}
                    value={squares[index]}
                    onClick={() => onPlay(index)}
                />
            ))}
        </BoardContainer>
    );
};

export default Board;