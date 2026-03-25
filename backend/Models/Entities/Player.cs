using TicTacToe.Api.Models.Entities;

namespace TicTacToe.Domain.Entities
{
    public class Player
    {
        public Guid Id { get; private set; }
        public string Username { get; private set; }
        public DateTime CreatedAt { get; private set; }

        public ICollection<Match> MatchesAsX { get; private set; } = new List<Match>();
        public ICollection<Match> MatchesAsO { get; private set; } = new List<Match>();
        public ICollection<Match> WonMatches { get; private set; } = new List<Match>();

        protected Player() { }

        public Player(string username)
        {
            Id = Guid.NewGuid();
            Username = username;
            CreatedAt = DateTime.UtcNow;
        }
    }    
}