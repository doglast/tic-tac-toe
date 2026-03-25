using Microsoft.AspNetCore.Mvc;
using TicTacToe.Api.Models.DTO;
using TicTacToe.Api.Services.Interfaces;

namespace TicTacToe.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlayersController : ControllerBase
    {
        private readonly IPlayerService _playerService;

        public PlayersController(IPlayerService playerService)
        {
            _playerService = playerService;
        }

        [HttpGet("ranking")]
        [ProducesResponseType(typeof(IEnumerable<PlayerRankingResponse>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetRanking()
        {
            var ranking = await _playerService.GetRankingAsync();
            return Ok(ranking);
        }
    }
}