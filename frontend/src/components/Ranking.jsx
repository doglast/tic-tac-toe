import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../services/api';
import { LOG_MESSAGES } from '../constants/messages';

const RankingContainer = styled.div`
    margin-top: 2rem;
    background: ${({ theme }) => theme.colors.surface};
    padding: 1.5rem;
    border-radius: ${({ theme }) => theme.sizes.borderRadius};
    width: 100%;
    max-width: 500px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h2`
    margin-top: 0;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.text};
    text-align: center;
    margin-bottom: 1.5rem;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const Th = styled.th`
    text-align: left;
    padding: 0.8rem;
    border-bottom: 2px solid ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.text};
`;

const Td = styled.td`
    padding: 0.8rem;
    border-bottom: 1px solid #444;
    color: ${({ theme }) => theme.colors.text};
`;

const EmptyMessage = styled.p`
    text-align: center;
    color: ${({ theme }) => theme.colors.border};
    font-style: italic;
`;

const Ranking = () => {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRanking = async () => {
        try {
            const response = await api.get('/players/ranking');
            setPlayers(response.data);
        } catch (error) {
            console.error(LOG_MESSAGES.FETCH_RANKING_ERROR, error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRanking();
    }, []);

    const getPositionDisplay = (index) => {
        if (index === 0) return '🥇 1º';
        if (index === 1) return '🥈 2º';
        if (index === 2) return '🥉 3º';
        return `#${index + 1}`;
    };

    return (
        <RankingContainer>
            <Title>🏆 Top 10 Vencedores</Title>

            {loading ? (
                <EmptyMessage>Carregando ranking...</EmptyMessage>
            ) : players.length === 0 ? (
                <EmptyMessage>Nenhuma partida registrada ainda.</EmptyMessage>
            ) : (
                <Table>
                    <thead>
                        <tr>
                            <Th>Posição</Th>
                            <Th>Jogador(a)</Th>
                            <Th>Vitórias</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map((player, index) => (
                            <tr key={index}>
                                <Td><strong>{getPositionDisplay(index)}</strong></Td>
                                <Td>{player.username}</Td>
                                <Td>{player.totalVictories}</Td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </RankingContainer>
    );
};

export default Ranking;