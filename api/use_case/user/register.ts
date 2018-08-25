import DataTransferObject from "util/dataTransferObject";
import Http from "http-status-codes";
import Errors from "api/errors";
import { User } from "api/entites";
import { Users } from "api/repository";

export default class Register{
  static call(username: string, password: string): DataTransferObject{
    const responseDto = Users.create(username, password);
    switch(responseDto.status){
      case Http.OK:
        return this.handleUserCreated(responseDto.resource);
      case Http.CONFLICT:
        return this.handleConflict(responseDto);
    }
  }
  
  static handleUserCreated(user: User): DataTransferObject{
    return new DataTransferObject({
      resource: user,
      status: Http.OK
    });
  }

  static handleConflict(dto: DataTransferObject): DataTransferObject{
    return new DataTransferObject({
      status: Http.CONFLICT,
      errors: [Errors.UsernameAlreadyUsed]
    });
  }
}