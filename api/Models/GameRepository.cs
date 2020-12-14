namespace api.Models
{
  using System.Collections.Generic;
  using System.Threading.Tasks;
  using MongoDB.Driver;
  using MongoDB.Bson;
  using System.Linq;

  public class GameRepository: IGameRepository
  {
    private readonly IApiContext _context;

    public GameRepository(IApiContext context){
      _context = context;
    }
    public async Task<IEnumerable<Game>> GetAllGames(){
      return await _context
                    .Games
                    .Find(_ => true)
                    .ToListAsync();
    }
    public Task<Game> GetGame(string id) {
      FilterDefinition<Game> filter =
        Builders<Game>.Filter.Eq(m => m.Id, id);
      return _context
              .Games
              .Find(filter)
              .FirstOrDefaultAsync();
    }
    public async Task Create(Game game)
    {
      await _context.Games.InsertOneAsync(game);
    }

    public async Task<bool> Update(Game game)
    {
      ReplaceOneResult updateResult =
        await _context
                .Games
                .ReplaceOneAsync(
                  filter: g => g.Id == game.Id,
                  replacement: game
                );
      return updateResult.IsAcknowledged && updateResult.ModifiedCount > 0;
    }

    public async Task<bool> Delete(string id)
    {
      FilterDefinition<Game> filter = 
        Builders<Game>.Filter.Eq(m => m.Id, id);
      DeleteResult deleteResult =  await _context.Games
        .DeleteOneAsync(filter);
      return deleteResult.IsAcknowledged && deleteResult.DeletedCount > 0;
    }
  }
}