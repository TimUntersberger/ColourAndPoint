import Register from "api/use_case/user/register";
import Http from "http-status-codes";
import Errors from "api/errors";
import { Users } from "api/repository";
import Sinon from "sinon";
import { expect } from "chai";

describe("User.Register", function(){
  describe("#call", function(){
    const subject = () => {
      Register.call();
    };

    let fakeUser = { username: "name", password: "pw" };
    let usersCreateStub: Sinon.SinonStub;

    it("tries to create a new user with the correct arguments", function(){
      usersCreateStub = Sinon.stub(Users, "create");
      subject();
      const result = usersCreateStub.calledWithExactly(fakeUser.username, fakeUser.password);
      expect(result).to.eql(true);
    })

    context("when username is already being used", function(){
      usersCreateStub = Sinon.stub(Users, "create").returns({
        errors: [Errors.UniqueConstraintConflict],
        status: Http.CONFLICT
      });
      subject();
      expect(subject()).to.eql({
        errors: [Errors.UsernameAlreadyUsed],
        status: Http.CONFLICT
      });
    })
  })
})