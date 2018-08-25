import Http from "http-status-codes";
import DataTransferObject from "util/dataTransferObject"

export default class Controller{
  static call(): Object{
    return new DataTransferObject({ status: Http.OK });
  }
}
