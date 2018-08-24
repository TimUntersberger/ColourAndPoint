export default class DataTransferObject{
  status: number;
  resource: any;
  collection: Array<any>;
  errors: Array<any>;

  constructor(
    status: number,
    resource?: any,
    collection?: Array<any>,
    errors?: Array<any>
  ){
    this.status = status;
    this.resource = resource;
    this.collection = collection;
    this.errors = errors;
  }
}