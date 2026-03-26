export const LOG_MESSAGES = {
    MATCH_SAVED_SUCCESS: "Partida salva com sucesso no banco de dados!",
    MATCH_SAVED_ERROR: "Erro ao salvar a partida:",
    FETCH_RANKING_ERROR: "Erro ao buscar o ranking:",
    SIGNALR_CONNECTED: "Conectado ao SignalR da Sala:",
    SIGNALR_ERROR: "Erro na conexão do SignalR: ",
};

export const ALERT_MESSAGES = {
    EMPTY_NAMES: "Por favor, preencha o nome dos dois jogadores para iniciar a batalha!",
    EMPTY_NAME_AND_ROOM: "Por favor, preencha o seu nome e o código da sala!",
};

export const STATUS_MESSAGES = {
    WINNER: (name, symbol) => `🏆 Vencedor: ${name} (${symbol})`,
    DRAW: "🤝 Empate!",
    TURN: (name, symbol) => `🎮 Vez de: ${name} (${symbol})`,
};