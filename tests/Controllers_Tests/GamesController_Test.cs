
using System.Collections.Generic;
using api.Models;
using api.Controllers;
using Xunit;
using Microsoft.Extensions.Configuration;
using System.IO;
using Microsoft.AspNetCore.Mvc;
using Xunit.Abstractions;
using System.Linq;

namespace api.tests.Services
{
  public class GamesController_Tests
  {

    private readonly ITestOutputHelper output;

    private GamesController gamesController;

    public GamesController_Tests(ITestOutputHelper output)
    {
        this.output = output;

        IConfiguration configuration = new ConfigurationBuilder()
        .SetBasePath(Directory.GetCurrentDirectory())
        .AddJsonFile("appsettings.json")
        .Build();

      var config = new ServerConfig();

      configuration.Bind(config);

      var apiContext = new ApiContext(config.MongoDB);

      var repoGame = new GameRepository(apiContext);

      
      //Given
      gamesController = new GamesController(repoGame);
    }

    [Fact]
    public async void CrudFriend()
    {
      //CREATE
      var gamePost = new Game{
        Title = "Game Test",
        Description = "Description Test",
        Genre = "Genre Test"
      };

      var postResult = await gamesController.Post(gamePost);

      var okPostResult = (OkObjectResult)postResult.Result;

      var game = okPostResult.Value as Game;

      Assert.NotEmpty(game.Id);

      //UPDATE
      gamePost.Title = "Test2";

      var putResult = await gamesController.Put(game.Id,gamePost);

      var okPutResult = (OkObjectResult)putResult.Result;

      game = okPutResult.Value as Game;

      Assert.Equal("Test2", game.Title);

      //LIST
      var getLResult = await gamesController.Get();

      var okGetLResult = (ObjectResult)getLResult.Result;

      var lgame = okGetLResult.Value as IEnumerable<Game>;

      Assert.NotEmpty(lgame.Where(a => a.Title == "Test2"));

      //GET
      var getResult = await gamesController.Get(game.Id);

      var okGetResult = (ObjectResult)getResult.Result;

      game = okGetResult.Value as Game;

      Assert.Equal("Test2", game.Title);


      //REMOVE
      var deleteResult = await gamesController.Delete(game.Id);

      Assert.IsType<OkResult>(deleteResult);
    }
  }
}