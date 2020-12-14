namespace api.Models{
  using MongoDB.Driver;

  public interface IApiContext
  {
    IMongoCollection<Friend> Friends {get;}
    IMongoCollection<Game> Games {get;}
  }
}