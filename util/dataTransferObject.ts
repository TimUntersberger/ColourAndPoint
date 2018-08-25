export default class DataTransferObject{
  status: number;
  resource: any;
  collection: Array<any>;
  errors: Array<any>;

  constructor(args: {
      status: number,
      resource?: any,
      collection?: Array<any>,
      errors?: Array<any>
    }
  ){
    this.status = args.status;
    this.resource = args.resource;
    this.collection = args.collection;
    this.errors = args.errors;
  }
}