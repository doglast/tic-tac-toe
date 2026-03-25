using TicTacToe.Api.Models.DTO;

namespace TicTacToe.Api.Services.Interfaces
{
    public interface IMatchService
    {
        Task<MatchResponse> RegisterMatchAsync(CreateMatchRequest request);
    }
}