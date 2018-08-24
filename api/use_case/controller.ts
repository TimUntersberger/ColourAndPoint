import Http from "http-status-codes";

export default class Controller{
  static call(): Object{
    return { status: Http.OK };
  }
}
