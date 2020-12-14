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
  public class FriendsController: Controller 
  {
    private readonly IFriendRepository _repo;

    public FriendsController(IFriendRepository repo){
      _repo = repo;
    }

    // GET api/todos
    [HttpGet]
    [Authorize]
    public async Task<ActionResult<IEnumerable<Friend>>> Get()
    {
      return new ObjectResult(await _repo.GetAllFriends());
    }
        // GET api/todos/1
    [HttpGet("{id}")]
    [Authorize]
    public async Task<ActionResult<Friend>> Get(string id)
    {
      var todo = await _repo.GetFriend(id);
      if (todo == null)
        return new NotFoundResult();
      
      return new ObjectResult(todo);
    }
        // POST api/todos
    [HttpPost]
    [Authorize(Roles = "admin")]
    public async Task<ActionResult<Friend>> Post([FromBody] Friend friend)
    {
      await _repo.Create(friend);
      return new OkObjectResult(friend);
    }
        // PUT api/todos/1
    [HttpPut("{id}")]
    [Authorize(Roles = "admin")]
    public async Task<ActionResult<Friend>> Put(string id, [FromBody] Friend friend)
    {
      var todoFromDb = await _repo.GetFriend(id);
      if (todoFromDb == null)
        return new NotFoundResult();
      friend.Id = todoFromDb.Id;
      await _repo.Update(friend);
      return new OkObjectResult(friend);
    }
        // DELETE api/todos/1
    [HttpDelete("{id}")]
    [Authorize(Roles = "admin")]
    public async Task<IActionResult> Delete(string id)
    {
      var post = await _repo.GetFriend(id);
      if (post == null)
        return new NotFoundResult();
      await _repo.Delete(id);
      return new OkResult();
    }

  }

}