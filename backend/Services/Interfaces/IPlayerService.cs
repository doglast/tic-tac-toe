using TicTacToe.Api.Models.DTO;

namespace TicTacToe.Api.Services.Interfaces
{
    public interface IPlayerService
    {
        Task<IEnumerable<PlayerRankingResponse>> GetRankingAsync();
    }
}