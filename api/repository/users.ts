import { User } from "../entites/index";

export default class Users {
  static find(filter: Partial<User>): User{
    return filter as User;
  }
}