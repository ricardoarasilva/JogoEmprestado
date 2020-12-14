import api from "../services/api";

export default class AuthenticationRepository {
   doAuthentication(username:string,password:string){
    return api.post('Authentication/login',{
      username: username,
      password: password
    });
  }
}