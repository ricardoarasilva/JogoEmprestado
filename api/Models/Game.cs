namespace api.Models
{
  using MongoDB.Bson;
  using MongoDB.Bson.Serialization.Attributes;

  public class Game {
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string Genre { get; set; }

    public Friend BorrowedTo { get; set; }

  }
}