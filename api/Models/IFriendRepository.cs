namespace api.Models {
  using System.Collections.Generic;
  using System.Threading.Tasks;

  public interface IFriendRepository 
  {
    Task<IEnumerable<Friend>> GetAllFriends();
    Task<Friend> GetFriend(string id);
    Task Create(Friend friend);
    Task<bool> Update(Friend friend);
    Task<bool> Delete(string id);
  }
}