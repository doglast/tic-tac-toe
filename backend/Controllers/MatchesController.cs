using Microsoft.AspNetCore.Mvc;
using TicTacToe.Api.Models.DTO;
using TicTacToe.Api.Services.Interfaces;
using TicTacToe.Const.Properties;

namespace TicTacToe.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MatchesController : ControllerBase
    {
        private readonly IMatchService _matchService;

        public MatchesController(IMatchService matchService)
        {
            _matchService = matchService;
        }

        [HttpPost]
        [ProducesResponseType(typeof(MatchResponse), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> RegisterMatch([FromBody] CreateMatchRequest request)
        {
            try
            {
                var response = await _matchService.RegisterMatchAsync(request);
                return Created(string.Empty, response);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = Resources.msgErroInterno });
            }
        }
    }
}