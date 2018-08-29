import Register from "api/use_case/user/register";
import Http from "http-status-codes";
import Errors from "api/errors";
import { Users } from "api/repository";
import Sinon from "sinon";
import { expect } from "chai";
import DataTransferObject from "util/dataTransferObject";

describe("Api.UseCase.User.Register", function(){
  describe("#call", function(){
    const subject = () => {
      return Register.call(fakeUser.username, fakeUser.password);
    };

    let fakeUser = { username: "name", password: "pw" };
    let usersCreateStub: Sinon.SinonStub;

    before(function(){
      usersCreateStub = Sinon.stub(Users, "create");
    })

    after(function(){
      usersCreateStub.restore();
    })

    it("tries to create a new user with the correct arguments", function(){
      usersCreateStub.returns(new DataTransferObject({
        status: Http.OK,
        resource: fakeUser
      }));
      subject();
      const result = usersCreateStub.calledWithExactly(fakeUser.username, fakeUser.password);
      expect(result).to.eql(true);
    })

    context("when username is already being used", function(){
      it("returns the correct dto", function(){
        usersCreateStub.returns(new DataTransferObject({
          errors: [Errors.UniqueConstraintConflict],
          status: Http.CONFLICT
        }));
        const result = subject();
        expect(result).to.deep.equal(new DataTransferObject({
          errors: [Errors.UsernameAlreadyUsed],
          status: Http.CONFLICT
        }));
      })
    })

    context("when username is not being used", function(){
      it("returns the correct dto", function(){
        usersCreateStub.returns(new DataTransferObject({
          resource: fakeUser,
          status: Http.OK
        }));
        const result = subject();
        expect(result).to.deep.equal(new DataTransferObject({
          resource: fakeUser,
          status: Http.OK
        }))
      })
    })
  })
})