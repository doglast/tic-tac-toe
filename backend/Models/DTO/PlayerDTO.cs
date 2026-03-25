namespace TicTacToe.Api.Models.DTO
{
    public class PlayerRankingResponse
    {
        public string Username { get; set; } = null!;
        public int TotalVictories { get; set; }
    }
}