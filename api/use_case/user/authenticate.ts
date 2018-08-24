import Http from "http-status-codes";
import Errors from "api/errors";
import atob from "atob";
import _ from "lodash";
import { Users } from "../../repository";

export default class Authenticate {
  static call(token: string): Object{
    const userInfo = this.extract_user_info(token);
    const user = _.get(Users.find({ username: userInfo.username }), "resource");

    if(!user){
      return {
        errors: [Errors.InvalidUsername],
        status: Http.NOT_FOUND
      }
    }
    else if(user.password !== userInfo.password){
      return {
        errors: [Errors.InvalidPassword],
        status: Http.FORBIDDEN
      }
    }
    else{
      return { 
        status: Http.OK 
      };
    }
  }

  static extract_user_info(token: string){
    const tokens = atob(token).split(":");
    return {
      username: tokens[0],
      password: tokens[1]
    }
  }
}