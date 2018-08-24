import Controller from "api/use_case/controller";
import Http from "http-status-codes";
import { expect } from "chai"

describe("Controller", function(){
  describe("#call", function(){
    it("returns status ok", function(){
      expect(Controller.call()).to.eql({ status: Http.OK });
    })
  })
})