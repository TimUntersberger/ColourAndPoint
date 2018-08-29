import { User } from "../entites/index";
import Http from "http-status-codes";
import DataTransferObject from "util/dataTransferObject";
import Base from "./base";

export default class Users extends Base{
  static async find(filter: Partial<User>){
    const whereExpression = "where " + Object
      .keys(filter)
      .map(key => { 
        const value = filter[key];
        return `${key}=${typeof value === "string"
          ? `'${value}'`
          : value
        }`
      })
      .join(" and ");
      
    const result = await this.executeQuery("select * from users " + whereExpression);
    return new DataTransferObject({
      resource: null,
      status: Http.OK
    });
  }
  static create(username: String, password: String){
    return new DataTransferObject({
      status: Http.OK
    });
  }
}