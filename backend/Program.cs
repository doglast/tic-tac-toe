using Microsoft.EntityFrameworkCore;
using TicTacToe.Api.Data.Context;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

// Configura o Swagger (Documentação da API)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configura o Entity Framework Core para usar o PostgreSQL
builder.Services.AddDbContext<TicTacToeDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

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

app.UseAuthorization();

app.MapControllers();

app.Run();