
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
  public class FriendsController_Tests
  {

    private readonly ITestOutputHelper output;

    private FriendsController friendsController;

    public FriendsController_Tests(ITestOutputHelper output)
    {
        this.output = output;

        IConfiguration configuration = new ConfigurationBuilder()
        .SetBasePath(Directory.GetCurrentDirectory())
        .AddJsonFile("appsettings.json")
        .Build();

      var config = new ServerConfig();

      configuration.Bind(config);

      var apiContext = new ApiContext(config.MongoDB);

      var repoFriend = new FriendRepository(apiContext);

      
      //Given
      friendsController = new FriendsController(repoFriend);
    }

    [Fact]
    public async void CrudFriend()
    {
      //CREATE
      var friendPost = new Friend{
        Fullname = "Friend Test",
        Address = "Address Test"
      };

      var postResult = await friendsController.Post(friendPost);

      var okPostResult = (OkObjectResult)postResult.Result;

      var fr = okPostResult.Value as Friend;

      Assert.NotEmpty(fr.Id);

      //UPDATE
      friendPost.Fullname = "Test2";

      var putResult = await friendsController.Put(fr.Id,friendPost);

      var okPutResult = (OkObjectResult)putResult.Result;

      fr = okPutResult.Value as Friend;

      Assert.Equal("Test2", fr.Fullname);

      //LIST
      var getLResult = await friendsController.Get();

      var okGetLResult = (ObjectResult)getLResult.Result;

      var lfr = okGetLResult.Value as IEnumerable<Friend>;

      Assert.NotEmpty(lfr.Where(a => a.Fullname == "Test2"));

      //GET
      var getResult = await friendsController.Get(fr.Id);

      var okGetResult = (ObjectResult)getResult.Result;

      fr = okGetResult.Value as Friend;

      Assert.Equal("Test2", fr.Fullname);


      //REMOVE
      var deleteResult = await friendsController.Delete(fr.Id);

      Assert.IsType<OkResult>(deleteResult);
    }
  }
}