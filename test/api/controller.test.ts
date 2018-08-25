import Controller from "api/use_case/controller";
import Http from "http-status-codes";
import { expect } from "chai"
import DataTransferObject from "util/dataTransferObject";

describe("Controller", function(){
  describe("#call", function(){
    it("returns status ok", function(){
      expect(Controller.call()).to.eql(new DataTransferObject({ status: Http.OK }));
    })
  })
})