import Friend from "../models/friend";
import api from "../services/api";

export default class FriendsRepository {
  getAllFriends(){
    return api.get('Friends');
  }

  getFriend(friendId:string) {
    return api.get(`Friends/${friendId}`);
  }

  saveFriend(data:Friend){
    if(!data.id)
      return api.post('Friends',data);
    else
      return api.put(`Friends/${data.id}`,data);
  }

  removeFriend(friendId:string) {
    return api.delete(`Friends/${friendId}`);
  }
}