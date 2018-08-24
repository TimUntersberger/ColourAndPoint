import Http from "http-status-codes";
import * as Errors from "api/errors";
import btoa from "btoa";
import { Users } from "../repository";

interface AuthenticateCallArgs{
  username: String,
  password: String
}

export default class Authenticate {
  static call(info: AuthenticateCallArgs): Object{
    const user = Users.find({ username: info.username });

    if(!user){
      return {
        errors: [Errors.InvalidUsername],
        status: Http.NOT_FOUND
      }
    }
    else if(user.password !== info.password){
      return {
        errors: [Errors.InvalidPassword],
        status: Http.FORBIDDEN
      }
    }
    else{
      return { 
        resource: this.build_authentication_token(user.username, user.password),
        status: Http.OK 
      };
    }
  }

  static build_authentication_token(username, password){
    return btoa(`${username}:${password}`);
  }
}