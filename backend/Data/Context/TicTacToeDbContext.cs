using Microsoft.EntityFrameworkCore;
using TicTacToe.Api.Models.Entities;
using TicTacToe.Domain.Entities;

namespace TicTacToe.Api.Data.Context
{
    public class TicTacToeDbContext : DbContext
    {
        public TicTacToeDbContext(DbContextOptions<TicTacToeDbContext> options) : base(options) { }

        public DbSet<Player> Players { get; set; }
        public DbSet<Match> Matches { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configuração da Tabela Players
            modelBuilder.Entity<Player>(entity =>
            {
                entity.ToTable("Players"); // Garante o nome exato do script SQL
                entity.HasKey(p => p.Id);
                entity.Property(p => p.Username).IsRequired().HasMaxLength(50);
                entity.HasIndex(p => p.Username).IsUnique();
            });

            // Configuração da Tabela Matches
            modelBuilder.Entity<Match>(entity =>
            {
                entity.ToTable("Matches");
                entity.HasKey(m => m.Id);

                // Amarração: Jogador X
                entity.HasOne(m => m.PlayerX)
                    .WithMany(p => p.MatchesAsX)
                    .HasForeignKey(m => m.PlayerXId)
                    .OnDelete(DeleteBehavior.Restrict);

                // Amarração: Jogador O
                entity.HasOne(m => m.PlayerO)
                    .WithMany(p => p.MatchesAsO)
                    .HasForeignKey(m => m.PlayerOId)
                    .OnDelete(DeleteBehavior.Restrict);

                // Amarração: Vencedor (Opcional/Null)
                entity.HasOne(m => m.Winner)
                    .WithMany(p => p.WonMatches)
                    .HasForeignKey(m => m.WinnerId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.Property(m => m.PlayedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
            });
        }
    }
}