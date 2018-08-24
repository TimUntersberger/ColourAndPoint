import { User } from "../entites/index";
import Http from "http-status-codes";

export default class Users {
  static find(filter: Partial<User>){
    return {
      resource: filter as User,
      status: Http.OK
    };
  }
  static create(username: String, password: String){
    return {

    }
  }
}