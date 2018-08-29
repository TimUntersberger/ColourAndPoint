import Http from "http-status-codes";
import Errors from "api/errors";
import atob from "atob";
import { User } from "api/entites";
import _ from "lodash";
import { Users } from "api/repository";
import DataTransferObject from "util/dataTransferObject";

export default class Authenticate {
  static call(token: string): Object{
    const userInfo = this.extract_user_info(token);
    const responseDto = Users.find({ username: userInfo.username });

    if(responseDto.status === Http.OK){
      const user = responseDto.resource as User;

      if(user.password === userInfo.password){
        return new DataTransferObject({ 
          status: Http.OK 
        });
      }
      else{
        return new DataTransferObject({
          errors: [Errors.InvalidPassword],
          status: Http.FORBIDDEN
        })
      }
    }
    else{
      return new DataTransferObject({
        errors: [Errors.InvalidUsername],
        status: Http.NOT_FOUND
      })
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