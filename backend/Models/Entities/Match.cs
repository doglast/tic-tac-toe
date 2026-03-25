namespace TicTacToe.Api.Models.Entities
{
    public class Match
    {
        public Guid Id { get; private set; }
        public Guid PlayerXId { get; private set; }
        public Player PlayerX { get; private set; }

        public Guid PlayerOId { get; private set; }
        public Player PlayerO { get; private set; }

        public Guid? WinnerId { get; private set; } // Nulo em caso de empate
        public Player? Winner { get; private set; }

        public DateTime PlayedAt { get; private set; }

        protected Match() { }

        public Match(Guid playerXId, Guid playerOId, Guid? winnerId = null)
        {
            Id = Guid.NewGuid();
            PlayerXId = playerXId;
            PlayerOId = playerOId;
            WinnerId = winnerId;
            PlayedAt = DateTime.UtcNow;
        }
    }
}
