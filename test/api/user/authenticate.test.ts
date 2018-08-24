import _ from "lodash";
import Http from "http-status-codes";
import Sinon from "sinon";
import btoa from "btoa";
import { expect } from "chai";
import Errors from "api/errors";
import Authenticate from "api/use_case/user/authenticate";
import { Users } from "api/repository";

function omitPassword(json){
  return _.omit(json, ["password"]);
}

describe("User.Authenticate", function(){
  describe("#call", function(){
    let fakeUser = { username: "name", password: "pw"}
    let fakeToken = btoa(`${fakeUser.username}:${fakeUser.password}`);
    let usersFindStub: Sinon.SinonStub;

    let subject = () => {
      return Authenticate.call(fakeToken);
    };

    it("searches for a user with the correct arguments", function(){
      usersFindStub = Sinon.stub(Users, "find").returns(fakeToken);
      subject();
      const result = usersFindStub.calledWithExactly(omitPassword(fakeUser));
      expect(result).to.eql(true);
      usersFindStub.restore();
    })

    context("when user exists", function(){
      context("when the password is correct", function(){
        before(function(){
          usersFindStub = Sinon.stub(Users, "find").returns({ resource: fakeUser });
        })

        it("returns the correct dto", function(){
          expect(subject()).to.eql({
            status: Http.OK
          })
        })

        after(function() {
          usersFindStub.restore();
        })
      })

      context("when the password is not correct", function(){
        before(function(){
          usersFindStub = Sinon.stub(Users, "find").returns({ resource: omitPassword(fakeToken) });
        })

        it("returns the correct dto", function(){
          expect(subject()).to.eql({
            errors: [Errors.InvalidPassword],
            status: Http.FORBIDDEN
          })
        })

        after(function() {
          usersFindStub.restore();
        })
      })
    })

    context("when user doesn't exist", function(){
      before(function(){
        usersFindStub = Sinon.stub(Users, "find").returns(null);
      })

      it("returns the correct dto", function(){
        usersFindStub.returns(null);

        expect(subject()).to.eql({
          errors: [Errors.InvalidUsername],
          status: Http.NOT_FOUND
        })
      })

      after(function() {
        usersFindStub.restore();
      })
    })
  })
})