namespace api.Controllers
{
  using api.Models;
  using System;
  using System.Collections.Generic;
  using System.Linq;
  using System.Threading.Tasks;
  using Microsoft.AspNetCore.Mvc;
  using Microsoft.AspNetCore.Authorization;

  [Produces("application/json")]
  [Route("api/[Controller]")]
  public class GamesController: Controller 
  {
    private readonly IGameRepository _repo;

    public GamesController(IGameRepository repo){
      _repo = repo;
    }

    // GET api/todos
    [HttpGet]
    [Authorize]
    public async Task<ActionResult<IEnumerable<Game>>> Get()
    {
      return new ObjectResult(await _repo.GetAllGames());
    }
        // GET api/todos/1
    [HttpGet("{id}")]
    [Authorize]
    public async Task<ActionResult<Game>> Get(string id)
    {
      var todo = await _repo.GetGame(id);
      if (todo == null)
        return new NotFoundResult();
      
      return new ObjectResult(todo);
    }
        // POST api/todos
    [HttpPost]
    [Authorize(Roles = "admin")]
    public async Task<ActionResult<Game>> Post([FromBody] Game game)
    {
      await _repo.Create(game);
      return new OkObjectResult(game);
    }
        // PUT api/todos/1
    [HttpPut("{id}")]
    [Authorize(Roles = "admin")]
    public async Task<ActionResult<Game>> Put(string id, [FromBody] Game game)
    {
      var todoFromDb = await _repo.GetGame(id);
      if (todoFromDb == null)
        return new NotFoundResult();
      game.Id = todoFromDb.Id;
      await _repo.Update(game);
      return new OkObjectResult(game);
    }
        // DELETE api/todos/1
    [HttpDelete("{id}")]
    [Authorize(Roles = "admin")]
    public async Task<IActionResult> Delete(string id)
    {
      var post = await _repo.GetGame(id);
      if (post == null)
        return new NotFoundResult();
      await _repo.Delete(id);
      return new OkResult();
    }

  }

}