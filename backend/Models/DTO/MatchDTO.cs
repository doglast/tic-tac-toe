namespace TicTacToe.Api.Models.DTO
{
    public class CreateMatchRequest
    {
        public string PlayerXName { get; set; } = null!;
        public string PlayerOName { get; set; } = null!;
        public string? WinnerName { get; set; } // Será nulo em caso de empate
    }

    public class MatchResponse
    {
        public Guid Id { get; set; }
        public string PlayerXName { get; set; } = null!;
        public string PlayerOName { get; set; } = null!;
        public string Winner { get; set; } = null!;
        public DateTime PlayedAt { get; set; }
    }
}