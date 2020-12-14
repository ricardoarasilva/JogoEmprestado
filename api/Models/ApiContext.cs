namespace api.Models {
  using api;
  using MongoDB.Driver;
  using System;

  public class ApiContext: IApiContext
  {
    private readonly IMongoDatabase _db;

    public ApiContext(MongoDBConfig config){
      var client = new MongoClient(config.ConnectionString);
      _db = client.GetDatabase(config.Database);
    }

    public IMongoCollection<Friend> Friends => _db.GetCollection<Friend>("Friends");
    public IMongoCollection<Game> Games => _db.GetCollection<Game>("Games");

  }
}