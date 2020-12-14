namespace api.Models
{
  using System.Collections.Generic;
  using System.Threading.Tasks;
  using MongoDB.Driver;
  using MongoDB.Bson;
  using System.Linq;

  public class FriendRepository: IFriendRepository
  {
    private readonly IApiContext _context;

    public FriendRepository(IApiContext context){
      _context = context;
    }
    public async Task<IEnumerable<Friend>> GetAllFriends(){
      return await _context
                    .Friends
                    .Find(_ => true)
                    .ToListAsync();
    }
    public Task<Friend> GetFriend(string id) {
      FilterDefinition<Friend> filter =
        Builders<Friend>.Filter.Eq(m => m.Id, id);
      return _context
              .Friends
              .Find(filter)
              .FirstOrDefaultAsync();
    }
    public async Task Create(Friend friend)
    {
      await _context.Friends.InsertOneAsync(friend);
    }

    public async Task<bool> Update(Friend friend)
    {
      ReplaceOneResult updateResult =
        await _context
                .Friends
                .ReplaceOneAsync(
                  filter: g => g.Id == friend.Id,
                  replacement: friend
                );
      return updateResult.IsAcknowledged && updateResult.ModifiedCount > 0;
    }

    public async Task<bool> Delete(string id)
    {
      FilterDefinition<Friend> filter = 
        Builders<Friend>.Filter.Eq(m => m.Id, id);
      DeleteResult deleteResult =  await _context.Friends
        .DeleteOneAsync(filter);
      return deleteResult.IsAcknowledged && deleteResult.DeletedCount > 0;
    }
  }
}