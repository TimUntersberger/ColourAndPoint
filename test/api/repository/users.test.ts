import Users from "api/repository/users";
import Sinon from "sinon";
import { expect } from "chai";

describe("Api.Repository.Users", function(){
  describe("#find", function(){
    let executeQueryStub: Sinon.SinonStub;
    before(function(){
      executeQueryStub = Sinon.stub(Users, "executeQuery");
    })
    context("when the filter has only string properties", function(){
      it("correctly forms the where expression", function(){
        Users.find({
          username: "root",
          password: "root"
        })
        const subject = executeQueryStub.calledWithExactly("select * from users where username='root' and password='root'");
        expect(subject).to.eql(true);
      })
    })
    context("when the filter doesn't have only string properties", function(){
      it("correctly forms the where expression", function(){
        Users.find({
          username: "root",
          password: "root",
          isAdmin: true
        })
        const subject = executeQueryStub.calledWithExactly("select * from users where username='root' and password='root' and isAdmin=true");
        expect(subject).to.eql(true);
      })
    })
  })
})