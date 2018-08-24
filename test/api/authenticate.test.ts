import _ from "lodash";
import Http from "http-status-codes";
import Sinon from "sinon";
import { expect } from "chai";
import * as Errors from "api/errors";
import Authenticate from "api/use_case/authenticate";
import { Users } from "api/repository";

describe("Authenticate", function(){
  describe("#call", function(){
    let fakeUser = { username: "name", password: "pw" };
    let usersFindStub: Sinon.SinonStub;

    let subject = () => {
      return Authenticate.call(fakeUser);
    };

    it("searches for a user with the correct arguments", function(){
      usersFindStub = Sinon.stub(Users, "find").returns(fakeUser);
      subject();
      const result = usersFindStub.calledWithExactly(_.omit(fakeUser, ["password"]));
      expect(result).to.eql(true);
      usersFindStub.restore();
    })

    context("when user exists", function(){
      before(function(){
        usersFindStub = Sinon.stub(Users, "find").returns(fakeUser);
      })

      context("when the password is correct", function(){
        it("returns the correct dto", function(){
          expect(subject()).to.eql({
            resource: Authenticate.build_authentication_token(fakeUser.username, fakeUser.password),
            status: Http.OK
          })
        })
      })
      context("when the password is not correct", function(){
        it.only("returns the correct dto", function(){
          expect(subject()).to.eql({
            errors: [Errors.InvalidPassword],
            status: Http.FORBIDDEN
          })
        })
      })

      after(function() {
        usersFindStub.restore();
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