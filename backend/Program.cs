using Microsoft.EntityFrameworkCore;
using TicTacToe.Api.Data.Context;
using TicTacToe.Api.Services;
using TicTacToe.Api.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

// Configura o Swagger (Documentação da API)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configura o Entity Framework Core para usar o PostgreSQL
builder.Services.AddDbContext<TicTacToeDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IMatchService, MatchService>();
builder.Services.AddScoped<IPlayerService, PlayerService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173") // A URL exata do seu Vite
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// ==============================================================================
// Pipeline de Requisições HTTP (Middlewares)
// ==============================================================================

// Habilita o Swagger apenas no ambiente de desenvolvimento
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowFrontend");

app.UseAuthorization();

app.MapControllers();

app.Run();