import { User } from "../entites/index";
import Http from "http-status-codes";
import DataTransferObject from "util/dataTransferObject";

export default class Users {
  static find(filter: Partial<User>){
    return new DataTransferObject({
      resource: filter as User,
      status: Http.OK
    });
  }
  static create(username: String, password: String){
    return new DataTransferObject({
      status: Http.OK
    });
  }
}