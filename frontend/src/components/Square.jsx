import React from 'react';
import styled from 'styled-components';

const StyledSquare = styled.button`
    background: ${({ theme }) => theme.colors.surface};
    border: 1px solid ${({ theme }) => theme.colors.border};
    font-size: 3rem;
    font-weight: bold;
    cursor: pointer;
    border-radius: ${({ theme }) => theme.sizes.borderRadius};
    transition: background 0.2s;
    
    color: ${({ value, theme }) =>
        value === 'X' ? theme.colors.xPlayer :
            value === 'O' ? theme.colors.oPlayer : theme.colors.text
    };

    &:hover {
        background: ${({ theme }) => theme.colors.hover};
    }
`;

const Square = ({ value, onClick }) => {
    return (
        <StyledSquare value={value} onClick={onClick}>
            {value}
        </StyledSquare>
    );
};

export default Square;