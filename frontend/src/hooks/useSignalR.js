import { useState, useEffect, useRef } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { LOG_MESSAGES } from '../constants/messages';

export const useSignalR = (roomCode, playerName, mySymbol, callbacks) => {
    const [isConnected, setIsConnected] = useState(false);
    const connectionRef = useRef(null);

    const callbacksRef = useRef(callbacks);
    useEffect(() => {
        callbacksRef.current = callbacks;
    }, [callbacks]);

    useEffect(() => {
        if (!roomCode || !playerName || !mySymbol) return;

        const hubUrl = 'https://localhost:7092/matchHub';

        const connectSignalR = async () => {
            const connection = new HubConnectionBuilder()
                .withUrl(hubUrl)
                .configureLogging(LogLevel.Information)
                .withAutomaticReconnect()
                .build();

            connection.on("ReceiveMove", (index, symbol) => {
                callbacksRef.current.onMoveReceived(index, symbol);
            });

            connection.on("PlayerJoined", (name) => {
                callbacksRef.current.onPlayerJoined(name);
                connection.invoke("SyncName", roomCode, playerName).catch(console.error);
            });

            connection.on("ReceiveNameSync", (name) => {
                callbacksRef.current.onPlayerJoined(name);
            });

            connection.on("ReceiveRestart", () => {
                callbacksRef.current.onRestartReceived();
            });

            try {
                await connection.start();

                const joinStatus = await connection.invoke("JoinRoom", roomCode, playerName, mySymbol);

                if (joinStatus === "SYMBOL_TAKEN") {
                    callbacksRef.current.onJoinError(`O símbolo '${mySymbol}' já está em uso nesta sala! Escolha o outro.`);
                    connection.stop();
                    return;
                }

                if (joinStatus === "NAME_TAKEN") {
                    callbacksRef.current.onJoinError(`O nome '${playerName}' já está na sala! Escolha outro.`);
                    connection.stop();
                    return;
                }

                console.log(LOG_MESSAGES.SIGNALR_CONNECTED, roomCode);
                setIsConnected(true);
                connectionRef.current = connection;
            } catch (err) {
                console.error(LOG_MESSAGES.SIGNALR_ERROR, err);
            }
        };

        connectSignalR();

        return () => {
            if (connectionRef.current) {
                connectionRef.current.stop();
                connectionRef.current = null;
                setIsConnected(false);
            }
        };
    }, [roomCode, playerName]);

    const sendMove = async (index, symbol) => {
        if (connectionRef.current && isConnected) {
            await connectionRef.current.invoke("SendMove", roomCode, index, symbol);
        }
    };

    const sendRestart = async () => {
        if (connectionRef.current && isConnected) {
            await connectionRef.current.invoke("SendRestart", roomCode);
        }
    };

    return { isConnected, sendMove, sendRestart };
};