namespace api.Models {
  using System.Collections.Generic;
  using System.Threading.Tasks;

  public interface IGameRepository 
  {
    Task<IEnumerable<Game>> GetAllGames();
    Task<Game> GetGame(string id);
    Task Create(Game game);
    Task<bool> Update(Game game);
    Task<bool> Delete(string id);
  }
}