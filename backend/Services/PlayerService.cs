using Microsoft.EntityFrameworkCore;
using TicTacToe.Api.Data.Context;
using TicTacToe.Api.Models.DTO;
using TicTacToe.Api.Services.Interfaces;

namespace TicTacToe.Api.Services
{
    public class PlayerService : IPlayerService
    {
        private readonly TicTacToeDbContext _context;

        public PlayerService(TicTacToeDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<PlayerRankingResponse>> GetRankingAsync()
        {
            var ranking = await _context.Players
                .Select(p => new PlayerRankingResponse
                {
                    Username = p.Username,
                    TotalVictories = p.WonMatches.Count
                })
                .OrderByDescending(r => r.TotalVictories)
                .Take(10) // Traz apenas o Top 10 para não sobrecarregar a API
                .ToListAsync();

            return ranking;
        }
    }
}