using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;

namespace TicTacToe.Api.Hubs
{
    public class MatchHub : Hub
    {
        // Objeto que guarda o "ConnectionId" -> "RoomCode|Symbol" para não ser possível ter mais de um jogador com a mesma combinação de sala e símbolo
        private static readonly ConcurrentDictionary<string, string> _activePlayers = new();

        public async Task<string> JoinRoom(string roomCode, string playerName, string symbol)
        {
            var playersInRoom = _activePlayers.Values
                .Where(v => v.Split('|')[0] == roomCode)
                .ToList();

            if (playersInRoom.Any(v => v.Split('|')[1] == symbol))
            {
                return "SYMBOL_TAKEN";
            }

            if (playersInRoom.Any(v => v.Split('|')[2].Equals(playerName, StringComparison.OrdinalIgnoreCase)))
            {
                return "NAME_TAKEN";
            }

            string playerData = $"{roomCode}|{symbol}|{playerName}";
            _activePlayers[Context.ConnectionId] = playerData;

            await Groups.AddToGroupAsync(Context.ConnectionId, roomCode);
            await Clients.OthersInGroup(roomCode).SendAsync("PlayerJoined", playerName);

            return "SUCCESS";
        }

        public async Task SyncName(string roomCode, string playerName)
        {
            await Clients.OthersInGroup(roomCode).SendAsync("ReceiveNameSync", playerName);
        }

        public async Task SendMove(string roomCode, int index, string symbol)
        {
            await Clients.Group(roomCode).SendAsync("ReceiveMove", index, symbol);
        }

        public async Task SendRestart(string roomCode)
        {
            await Clients.Group(roomCode).SendAsync("ReceiveRestart");
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            _activePlayers.TryRemove(Context.ConnectionId, out _);
            await base.OnDisconnectedAsync(exception);
        }
    }
}