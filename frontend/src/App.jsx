import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Board from './components/Board';
import Ranking from './components/Ranking';
import { useGame } from './hooks/useGame';
import { useSignalR } from './hooks/useSignalR';
import api from './services/api';
import { LOG_MESSAGES, ALERT_MESSAGES } from './constants/messages';

// --- Styled Components ---
const AppContainer = styled.div`
    display: flex; flex-direction: column; align-items: center; gap: 2rem; padding-bottom: 3rem;
`;
const Title = styled.h1`font-size: 2.5rem; color: ${({ theme }) => theme.colors.textLight}; margin: 0; margin-top: 2rem;`;
const SetupArea = styled.div`
    display: flex; flex-direction: column; gap: 1rem; background: ${({ theme }) => theme.colors.surface};
    padding: 2rem; border-radius: ${({ theme }) => theme.sizes.borderRadius}; width: 100%; max-width: 400px;
    input, select {
        padding: 0.8rem; font-size: 1rem; border: 1px solid ${({ theme }) => theme.colors.border};
        border-radius: 4px; outline: none; background: white;
    }
`;
const Status = styled.div`font-size: 1.5rem; font-weight: bold; color: ${({ theme }) => theme.colors.textLight}; text-align: center;`;
const Button = styled.button`
    padding: 0.8rem 1.5rem; font-size: 1rem; font-weight: bold; color: white;
    background-color: ${({ theme }) => theme.colors.xPlayer}; border: none; border-radius: 4px; cursor: pointer; transition: filter 0.2s;
    &:hover { filter: brightness(1.1); }
    &:disabled { background-color: #777; cursor: not-allowed; }
`;
const ActionButtons = styled.div`display: flex; gap: 1rem; justify-content: center; margin-top: 1rem;`;

// --- Componente Principal ---
function App() {
  const {
    board, xIsNext, playerX, setPlayerX, playerO, setPlayerO,
    winnerSymbol, winnerName, isDraw, applyMove, resetBoard
  } = useGame();

  const [myName, setMyName] = useState('');
  const [roomCodeInput, setRoomCodeInput] = useState('');
  const [mySymbol, setMySymbol] = useState('X');

  const [activeRoom, setActiveRoom] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [matchSaved, setMatchSaved] = useState(false);
  const [opponentName, setOpponentName] = useState('Aguardando oponente...');

  const onMoveReceived = (index, symbol) => applyMove(index, symbol);
  const onRestartReceived = () => { resetBoard(); setMatchSaved(false); };
  const onPlayerJoined = (name) => { setOpponentName(name); };

  const onJoinError = (errorMessage) => {
    alert(errorMessage);
    setGameStarted(false);
    setActiveRoom('');
  };

  const { isConnected, sendMove, sendRestart } = useSignalR(activeRoom, myName, mySymbol, {
    onMoveReceived, onRestartReceived, onPlayerJoined, onJoinError
  });

  useEffect(() => {
    if (mySymbol === 'X') {
      setPlayerX(myName); setPlayerO(opponentName);
    } else {
      setPlayerO(myName); setPlayerX(opponentName);
    }
  }, [myName, opponentName, mySymbol, setPlayerX, setPlayerO]);

  useEffect(() => {
    const saveMatchToDatabase = async () => {
      if ((winnerSymbol || isDraw) && !matchSaved) {
        if (mySymbol === 'X') {
          try {
            const payload = {
              playerXName: playerX, playerOName: playerO,
              winnerName: isDraw ? null : winnerName
            };
            await api.post('/matches', payload);
            console.log(LOG_MESSAGES.MATCH_SAVED_SUCCESS);
          } catch (error) {
            console.error(LOG_MESSAGES.MATCH_SAVED_ERROR, error);
          }
        }
        setMatchSaved(true);
      }
    };
    saveMatchToDatabase();
  }, [winnerSymbol, isDraw, matchSaved, mySymbol, playerX, playerO, winnerName]);

  const handleStart = () => {
    if (!myName.trim() || !roomCodeInput.trim()) {
      alert(ALERT_MESSAGES.EMPTY_NAME_AND_ROOM);
      return;
    }
    setActiveRoom(roomCodeInput);
    setGameStarted(true);
  };

  const handlePlay = (index) => {
    if (board[index] || winnerSymbol) return;

    const isMyTurn = (xIsNext && mySymbol === 'X') || (!xIsNext && mySymbol === 'O');
    if (!isMyTurn) return;

    applyMove(index, mySymbol);
    sendMove(index, mySymbol);
  };

  const handleRestart = () => {
    resetBoard();
    setMatchSaved(false);
    sendRestart();
  };

  const getStatusMessage = () => {
    if (!isConnected) return `🔄 Conectando ao servidor...`;
    if (winnerSymbol) return `🏆 Vencedor: ${winnerName} (${winnerSymbol})`;
    if (isDraw) return `🤝 Empate!`;

    const isMyTurn = (xIsNext && mySymbol === 'X') || (!xIsNext && mySymbol === 'O');
    return isMyTurn ? `🎮 É a sua vez, ${myName}!` : `⏳ Aguardando a jogada de ${opponentName}...`;
  };

  return (
    <AppContainer>
      <Title>Tic Tac Toe Online</Title>

      {!gameStarted ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <SetupArea>
            <input type="text" value={myName} onChange={(e) => setMyName(e.target.value)} placeholder="O seu Nome" />
            <input type="text" value={roomCodeInput} onChange={(e) => setRoomCodeInput(e.target.value)} placeholder="Código da Sala (Ex: 1234)" />
            <select value={mySymbol} onChange={(e) => setMySymbol(e.target.value)}>
              <option value="X">Jogar com 'X' (Começa o jogo)</option>
              <option value="O">Jogar com 'O'</option>
            </select>
            <Button onClick={handleStart}>Entrar na Sala</Button>
          </SetupArea>
          <Ranking />
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
          <Status>{getStatusMessage()}</Status>

          <Board squares={board} onPlay={handlePlay} />

          <ActionButtons>
            <Button onClick={handleRestart} disabled={!winnerSymbol && !isDraw}>Jogar Novamente</Button>
            <Button style={{ background: '#555' }} onClick={() => window.location.reload()}>
              Sair da Sala
            </Button>
          </ActionButtons>
        </div>
      )}
    </AppContainer>
  );
}

export default App;