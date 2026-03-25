using Microsoft.EntityFrameworkCore;
using TicTacToe.Api.Data.Context;
using TicTacToe.Api.Models.DTO;
using TicTacToe.Api.Models.Entities;
using TicTacToe.Api.Services.Interfaces;
using TicTacToe.Const.Properties;

namespace TicTacToe.Api.Services
{
    public class MatchService : IMatchService
    {
        private readonly TicTacToeDbContext _context;

        public MatchService(TicTacToeDbContext context)
        {
            _context = context;
        }

        public async Task<MatchResponse> RegisterMatchAsync(CreateMatchRequest request)
        {
            if (request.PlayerXName.Trim().Equals(request.PlayerOName.Trim(), StringComparison.OrdinalIgnoreCase))
            //Mensagem de erro vinda do projeto de Const, para evitar hardcode
                throw new ArgumentException(Resources.msgErroJogadoresComMesmoNome);

            var playerX = await GetOrCreatePlayerAsync(request.PlayerXName);
            var playerO = await GetOrCreatePlayerAsync(request.PlayerOName);

            Guid? winnerId = null;
            string winnerNameResponse = "Empate";

            if (!string.IsNullOrWhiteSpace(request.WinnerName))
            {
                if (request.WinnerName.Equals(request.PlayerXName, StringComparison.OrdinalIgnoreCase))
                {
                    winnerId = playerX.Id;
                    winnerNameResponse = playerX.Username;
                }
                else if (request.WinnerName.Equals(request.PlayerOName, StringComparison.OrdinalIgnoreCase))
                {
                    winnerId = playerO.Id;
                    winnerNameResponse = playerO.Username;
                }
                else
                {
                    throw new ArgumentException(Resources.msgErroVencedorNaoInformado);
                }
            }

            // Cria e Salva a Partida
            var match = new Match(playerX.Id, playerO.Id, winnerId);
            _context.Matches.Add(match);
            await _context.SaveChangesAsync();

            // Retorna os dados formatados para o Front-end
            return new MatchResponse
            {
                Id = match.Id,
                PlayerXName = playerX.Username,
                PlayerOName = playerO.Username,
                Winner = winnerNameResponse,
                PlayedAt = match.PlayedAt
            };
        }

        // Método auxiliar privado para buscar ou criar jogador
        private async Task<Player> GetOrCreatePlayerAsync(string username)
        {
            var cleanUsername = username.Trim();

            // Procura o jogador ignorando maiúsculas e minúsculas
            var player = await _context.Players
                .FirstOrDefaultAsync(p => p.Username.ToLower() == cleanUsername.ToLower());

            if (player == null)
            {
                player = new Player(cleanUsername);
                _context.Players.Add(player);
                // Salvamos aqui para garantir que ele ganhe um ID antes de ir para a Match
                await _context.SaveChangesAsync();
            }

            return player;
        }
    }
}