import _ from "lodash";
import Http from "http-status-codes";
import Sinon from "sinon";
import btoa from "btoa";
import { expect } from "chai";
import Errors from "api/errors";
import Authenticate from "api/use_case/user/authenticate";
import { Users } from "api/repository";
import DataTransferObject from "util/dataTransferObject";

function omitPassword(json){
  return _.omit(json, ["password"]);
}

describe("User.Authenticate", function(){
  describe("#call", function(){
    const fakeUser = { username: "name", password: "pw"}
    const fakeToken = btoa(`${fakeUser.username}:${fakeUser.password}`);
    const usersFindStub = Sinon.stub(Users, "find");

    let subject = () => {
      return Authenticate.call(fakeToken);
    };

    it("searches for a user with the correct arguments", function(){
      usersFindStub.returns(fakeToken);
      subject();
      const result = usersFindStub.calledWithExactly(omitPassword(fakeUser));
      expect(result).to.eql(true);
    })

    context("when user exists", function(){
      context("when the password is correct", function(){
        before(function(){
          usersFindStub.returns(new DataTransferObject({ status: Http.OK, resource: fakeUser }));
        })

        it("returns the correct dto", function(){
          expect(subject()).to.eql(new DataTransferObject({
            status: Http.OK
          }));
        })
      })

      context("when the password is not correct", function(){
        before(function(){
          usersFindStub.returns(new DataTransferObject({ status: Http.OK, resource: omitPassword(fakeToken) }));
        })

        it("returns the correct dto", function(){
          expect(subject()).to.eql(new DataTransferObject({
            errors: [Errors.InvalidPassword],
            status: Http.FORBIDDEN
          }))
        })
      })
    })

    context("when user doesn't exist", function(){
      it("returns the correct dto", function(){
        usersFindStub.returns(new DataTransferObject({ status: Http.NOT_FOUND }));

        expect(subject()).to.eql(new DataTransferObject({
          errors: [Errors.InvalidUsername],
          status: Http.NOT_FOUND
        }));
      })
    })
  })
})