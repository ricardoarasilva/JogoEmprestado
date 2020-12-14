import Game from "../models/game";
import api from "../services/api";

export default class GamesRepository{
  getAllGames() {
    return api.get('Games');
  }

  getGame(id:string) {
    return api.get(`Games/${id}`).then((result) => {
      if(result.data.borrowedTo){
        result.data.friendId = result.data.borrowedTo.id;
      }
      return result;
    });
  }

  saveGame(data:Game){
    if(!data.id)
      return api.post('Games',data);
    else
      return api.put(`Games/${data.id}`,data);
  }

  removeGame(gameId:string) {
    return api.delete(`Games/${gameId}`);
  }
}