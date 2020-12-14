using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using api.Models;
using api;
using api.Services;
using api.Controllers;
using Xunit;
using Microsoft.Extensions.Configuration;
using System.IO;
using Microsoft.AspNetCore.Mvc;
using Xunit.Abstractions;
using System.Reflection;

namespace api.tests.Services
{
  public class AuthenticationController_Tests
  {

    private readonly ITestOutputHelper output;

    public AuthenticationController_Tests(ITestOutputHelper output)
    {
        this.output = output;
    }

    [Fact]
    public void DoAuthentication()
    {
      //Given
      var authController = new AuthenticationController();
      var configuration = new ConfigurationBuilder()
        .SetBasePath(Directory.GetCurrentDirectory())
        .AddJsonFile("appsettings.json")
        .Build();
      var authModel = new Autentication{
        Username = configuration["UserApi"],
        Password = configuration["PasswordApi"]
      };
      //When
      var result = authController.Authenticate(authModel, configuration);
      
      var token = result.GetType().GetProperty("token").GetValue(result, null).ToString();

      //Then
      Assert.NotEmpty(token);
    }


    [Fact]
    public void AuthenticationFail()
    {
      //Given
      var authController = new AuthenticationController();
      var configuration = new ConfigurationBuilder()
        .SetBasePath(Directory.GetCurrentDirectory())
        .AddJsonFile("appsettings.json")
        .Build();
      var authModel = new Autentication{
        Username = "test",
        Password = "test"
      };
      //When
      var result = authController.Authenticate(authModel, configuration);
      
      Assert.IsType<NotFoundObjectResult>(result);
    }
  }
}