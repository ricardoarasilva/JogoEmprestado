namespace api.Models
{
  using System.Collections.Generic;
  using MongoDB.Bson;
  using MongoDB.Bson.Serialization.Attributes;

  public class Friend {
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }
    public string Fullname { get; set; }
    public string Address { get; set; }

  }
}