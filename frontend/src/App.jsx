import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Board from './components/Board';
import { useGame } from './hooks/useGame';
import api from './services/api';
import Ranking from './components/Ranking';
import { LOG_MESSAGES, ALERT_MESSAGES, STATUS_MESSAGES } from './constants/messages';

// ==========================================
// Styled Components (A UI do App)
// ==========================================
const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
`;

const Title = styled.h1`
    font-size: 2.5rem;
    color: ${({ theme }) => theme.colors.textLight};
    margin: 0;
`;

const SetupArea = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background: ${({ theme }) => theme.colors.surface};
    padding: 2rem;
    border-radius: ${({ theme }) => theme.sizes.borderRadius};
    
    input {
        padding: 0.8rem;
        font-size: 1rem;
        border: 1px solid ${({ theme }) => theme.colors.border};
        border-radius: 4px;
        outline: none;
    }
`;

const Status = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.textLight};
    text-align: center;
`;

const Button = styled.button`
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    font-weight: bold;
    color: white;
    background-color: ${({ theme }) => theme.colors.xPlayer};
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: filter 0.2s;

    &:hover {
        filter: brightness(1.1);
    }
`;

const ActionButtons = styled.div`
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 1rem;
`;

function App() {
  const {
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
  } = useGame();

  const [nameX, setNameX] = useState('');
  const [nameO, setNameO] = useState('');
  const [gameStarted, setGameStarted] = useState(false);

  const [matchSaved, setMatchSaved] = useState(false);

  useEffect(() => {
    const saveMatchToDatabase = async () => {
      if ((winnerSymbol || isDraw) && !matchSaved) {
        try {
          const payload = {
            playerXName: playerX,
            playerOName: playerO,
            winnerName: isDraw ? null : winnerName
          };

          await api.post('/matches', payload);

          console.log(LOG_MESSAGES.MATCH_SAVED_SUCCESS);
          setMatchSaved(true);
        } catch (error) {
          console.error(LOG_MESSAGES.MATCH_SAVED_ERROR, error);
        }
      }
    };

    saveMatchToDatabase();
  }, [winnerSymbol, isDraw, matchSaved, playerX, playerO, winnerName]);

  const handleStart = () => {
    if (!nameX.trim() || !nameO.trim()) {
      alert(ALERT_MESSAGES.EMPTY_NAMES);
      return;
    }
    startGame(nameX.trim(), nameO.trim());
    setGameStarted(true);
    setMatchSaved(false);
  };

  const handleReset = () => {
    resetBoard();
    setMatchSaved(false);
  };

  const getStatusMessage = () => {
    if (winnerSymbol) return STATUS_MESSAGES.WINNER(winnerName, winnerSymbol);
    if (isDraw) return STATUS_MESSAGES.DRAW;
    return STATUS_MESSAGES.TURN(xIsNext ? playerX : playerO, xIsNext ? 'X' : 'O');
  };

  return (
    <AppContainer>
      <Title>Tic Tac Toe</Title>

      {!gameStarted ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <SetupArea>
            <input
              type="text"
              value={nameX}
              onChange={(e) => setNameX(e.target.value)}
              placeholder="Nome do Jogador X"
            />
            <input
              type="text"
              value={nameO}
              onChange={(e) => setNameO(e.target.value)}
              placeholder="Nome do Jogador O"
            />
            <Button onClick={handleStart}>Iniciar Batalha</Button>
          </SetupArea>

          <Ranking />
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
          <Status>{getStatusMessage()}</Status>

          <Board squares={board} onPlay={handlePlay} />

          <ActionButtons>
            <Button onClick={handleReset}>Jogar Novamente</Button>
            <Button style={{ background: '#555' }} onClick={() => setGameStarted(false)}>
              Trocar Jogadores
            </Button>
          </ActionButtons>
        </div>
      )}
    </AppContainer>
  );
}

export default App;