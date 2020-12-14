namespace api.Controllers
{
  using api.Models;
  using System;
  using System.Collections.Generic;
  using System.Linq;
  using System.Threading.Tasks;
  using Microsoft.AspNetCore.Mvc;
  using api.Services;
  using Microsoft.Extensions.Configuration;
  using Microsoft.AspNetCore.Authorization;
  using Microsoft.AspNetCore.Cors;

  [Produces("application/json")]
  [Route("api/[Controller]")]
  public class AuthenticationController: Controller 
  {
     [HttpPost]
     [Route("login")]
     [AllowAnonymous]
    public dynamic Authenticate([FromBody]Autentication model, [FromServices]IConfiguration config)
    {
      if(model.Username != config["UserApi"] || model.Password != config["PasswordApi"])
        return NotFound(new {message = "Usuário ou senha inválidos "+config["UserApi"]});

      var token = TokenService.GenerateToken(model,config["RoleApi"]);

      return new {
        user = new {
          username = model.Username,
          role = config["RoleApi"]
        },
        token = token
      };
    }

  }

}