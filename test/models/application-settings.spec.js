/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// global beforeEach, describe, it, assert, expect

define(function(require) {

  const ApplicationSettingsModel = require('../../../scripts/models/application-settings');

  return describe('Application Settings Model', function() {

    before(function() {
      // Stub XHR: see http://sinonjs.org/docs/#server
      this.xhr = sinon.useFakeXMLHttpRequest();
      const requests = (this.requests = []);
      this.xhr.onCreate = xhr => requests.push(xhr);
      this.clock = sinon.useFakeTimers();

      sinon.spy(ApplicationSettingsModel.prototype, 'save');
      sinon.spy(ApplicationSettingsModel.prototype, 'authenticate');
      return sinon.spy(ApplicationSettingsModel.prototype, 'logout');
    });

    beforeEach(function() {
      this.checkIfLoggedInStub = sinon.stub();
      ApplicationSettingsModel.prototype.checkIfLoggedIn = this.checkIfLoggedInStub;
      return this.appSett = new ApplicationSettingsModel();
    });

    afterEach(function() {
      this.checkIfLoggedInStub.reset();
      ApplicationSettingsModel.prototype.save.reset();
      ApplicationSettingsModel.prototype.authenticate.reset();
      return ApplicationSettingsModel.prototype.logout.reset();
    });

    after(function() {
      this.xhr.restore();
      this.clock.restore();
      ApplicationSettingsModel.prototype.save.restore();
      ApplicationSettingsModel.prototype.authenticate.restore();
      return ApplicationSettingsModel.prototype.logout.restore();
    });

    describe('General behaviour', function() {

      it('has default values', function() {
        expect(this.appSett.get('serverURL')).to.equal('http://127.0.0.1');
        return expect(this.appSett.get('serverPort')).to.equal('5000');
      });

      it('can set values', function() {
        const appSett = new ApplicationSettingsModel();
        this.appSett.set('serverURL', 'http://www.google.com/');
        return expect(this.appSett.get('serverURL')).to.equal('http://www.google.com/');
      });

      it('sets passed attributes', function() {
        this.appSett = new ApplicationSettingsModel({
          'serverURL': 'http://127.0.0.1',
          'serverPort': '5000'
        });
        expect(this.appSett.get('serverURL')).to.equal('http://127.0.0.1');
        return expect(this.appSett.get('serverPort')).to.equal('5000');
      });

      return it('assembles a full URL from `serverURL` and `serverPort`', function() {
        this.appSett.set('serverURL', 'http://localhost');
        this.appSett.set('serverPort', '8000');
        expect(this.appSett._getURL()).to.equal('http://localhost:8000/');

        this.appSett.set('serverURL', 'http://www.google.com');
        this.appSett.set('serverPort', '');
        expect(this.appSett._getURL()).to.equal('http://www.google.com/');

        this.appSett.set('serverPort', undefined);
        return expect(this.appSett._getURL()).to.equal('http://www.google.com/');
      });
    });

    describe('localStorage behaviour', function() {

      it('saves to localStorage', function() {
        localStorage.removeItem('dativeApplicationSettings');
        expect(localStorage.getItem('dativeApplicationSettings')).to.be.null;
        this.appSett = new ApplicationSettingsModel();
        expect(localStorage.getItem('dativeApplicationSettings')).to.be.null;
        this.appSett.set();
        expect(localStorage.getItem('dativeApplicationSettings')).to.be.null;
        this.appSett.save();
        expect(JSON.parse(localStorage.getItem('dativeApplicationSettings')))
          .to.eql(this.appSett.attributes);

        this.appSett.set('serverURL', 'http://www.yahoo.com');
        this.appSett.save();
        expect(JSON.parse(localStorage.getItem('dativeApplicationSettings'))
          .serverURL).to.equal('http://www.yahoo.com');

        const appSett = new ApplicationSettingsModel();
        expect(appSett.get('serverURL')).to.equal('http://127.0.0.1'); // default value
        appSett.fetch();
        return expect(appSett.get('serverURL')).to.equal('http://www.yahoo.com');
      });

      return it('recognizes a URL change', function() {
        expect(this.appSett.checkIfLoggedIn).to.have.been.calledOnce;
        const serverURL = this.appSett.get('serverURL');
        const serverPort = this.appSett.get('serverPort');

        // Save using extant values and expect that checkIfLoggedIn won't be called.
        this.appSett.set({serverURL, serverPort});
        this.appSett.save();
        expect(this.appSett.checkIfLoggedIn).to.have.been.calledOnce;

        // Set orthogonal values and Save and expect that checkIfLoggedIn won't be called.
        this.appSett.set({persistenceType: 'thingamujig'});
        this.appSett.save();
        expect(this.appSett.checkIfLoggedIn).to.have.been.calledOnce;

        // Save using a new URL and expect that checkIfLoggedIn will be called.
        this.appSett.set({serverURL: 'http://www.yahoo.com'});
        this.appSett.save();
        expect(this.appSett.checkIfLoggedIn).to.have.been.calledTwice;

        // Save using a new port and expect that checkIfLoggedIn will be called.
        this.appSett.set({serverPort: '9001'});
        this.appSett.save();
        return expect(this.appSett.checkIfLoggedIn).to.have.been.calledThrice;
      });
    });

    describe('OLD RESTful behaviour', function() {

      it('makes authentication requests to an OLD web service', function() {

        // Verify that the request is as expected
        expect(this.requests).to.have.length(0);
        this.appSett.authenticate('fakeUsername', 'fakePassword');
        expect(this.requests).to.have.length(1);
        const request = this.requests[0];
        expect(request.method).to.equal('POST');
        expect(JSON.parse(request.requestBody)).to.eql({
          username: 'fakeUsername',
          password: 'fakePassword'
        });
        expect(request.withCredentials).to.be.true;
        expect(request.url).to.equal(`${this.appSett.get(
          'serverURL')}${(this.appSett.get('serverPort') && (':' +
          this.appSett.get('serverPort'))) || ''}/login/authenticate`
        );

        // Listen to a bunch of Backbone-wide events
        const longTaskRegisterSpy = sinon.spy();
        const longTaskDeregisterSpy = sinon.spy();
        const authenticateEndSpy = sinon.spy();
        const authenticateSuccessSpy = sinon.spy();
        const authenticateFailSpy = sinon.spy();
        Backbone.on('longTask:register', longTaskRegisterSpy);
        Backbone.on('longTask:deregister', longTaskDeregisterSpy);
        Backbone.on('authenticate:end', authenticateEndSpy);
        Backbone.on('authenticate:success', authenticateSuccessSpy);
        Backbone.on('authenticate:fail', authenticateFailSpy);

        // Simulate a successful request
        this.appSett.authenticate('goodUsername', 'goodPassword');
        let responseText = JSON.stringify({authenticated: true});
        this.requests[this.requests.length - 1].respond(200,
          {"Content-Type": "application/json"},
          responseText);
        // All relevant events are fired except FAIL
        expect(longTaskRegisterSpy).to.have.been.calledOnce;
        expect(longTaskDeregisterSpy).to.have.been.calledOnce;
        expect(authenticateEndSpy).to.have.been.calledOnce;
        expect(authenticateSuccessSpy).to.have.been.calledOnce;
        expect(authenticateFailSpy).not.to.have.been.called;
        expect(this.appSett.get('username')).to.equal('goodUsername');
        expect(this.appSett.get('loggedIn')).to.be.true;

        // Simulate an unsuccessful request
        this.appSett.set('loggedIn', false);
        this.appSett.authenticate('goodUsername', 'goodPassword');
        responseText = JSON.stringify({
          error: 'The username and password provided are not valid.'});
        this.requests[this.requests.length - 1].respond(401,
          {"Content-Type": "application/json"},
          responseText);
        // All relevant events are fired except SUCCESS
        expect(longTaskRegisterSpy).to.have.been.calledTwice;
        expect(longTaskDeregisterSpy).to.have.been.calledTwice;
        expect(authenticateEndSpy).to.have.been.calledTwice;
        expect(authenticateSuccessSpy).to.have.been.calledOnce;
        expect(authenticateFailSpy).to.have.been.calledOnce;
        expect(this.appSett.get('username')).to.equal('goodUsername'); // stays unchanged
        expect(this.appSett.get('loggedIn')).to.be.false;

        // Reset our spies. Breathe.
        longTaskRegisterSpy.reset();
        longTaskDeregisterSpy.reset();
        authenticateEndSpy.reset();
        authenticateSuccessSpy.reset();
        authenticateFailSpy.reset();

        // Simulate a response that is too slow (triggers timeout)
        /*
        * NOTE: this does NOT work, probably because Sinon's fake XHR has no timeout
        * property. (See the first link.)
        * https://github.com/cjohansen/Sinon.JS/issues/431
        * http://stackoverflow.com/questions/23360632/provoke-timeout-when-sending-ajax-request-to-sinon-fake-server
        * http://stackoverflow.com/questions/16560475/how-do-i-mock-a-timeout-or-failure-response-using-sinon-qunit
        @appSett.authenticate 'goodUsername', 'goodPassword'
        responseText = JSON.stringify authenticated: true
        @clock.tick 19000
        @requests[@requests.length - 1].respond 200,
          {"Content-Type": "application/json"},
          responseText
        * All relevant events are fired except FAIL
        expect(longTaskRegisterSpy).to.have.been.calledOnce
        expect(longTaskDeregisterSpy).to.have.been.calledOnce
        expect(authenticateEndSpy).to.have.been.calledOnce
        expect(authenticateSuccessSpy).not.to.have.been.called
        expect(authenticateFailSpy).to.have.been.calledOnce
        */

        // Stop listening to all those Backbone-wide events
        Backbone.on('longTask:register', longTaskRegisterSpy);
        Backbone.on('longTask:deregister', longTaskDeregisterSpy);
        Backbone.on('authenticate:end', authenticateEndSpy);
        Backbone.on('authenticate:success', authenticateSuccessSpy);
        return Backbone.on('authenticate:fail', authenticateFailSpy);
      });

      return it('makes logout requests to an OLD web service', function() {

        // Verify that the logout request is as expected
        this.appSett.logout();
        const request = this.requests[this.requests.length - 1];
        expect(request.method).to.equal('GET');
        expect(request.requestBody).to.be.null;
        expect(request.withCredentials).to.be.true;
        expect(request.url).to.equal(`${this.appSett.get(
          'serverURL')}${(this.appSett.get('serverPort') && (':' +
          this.appSett.get('serverPort'))) || ''}/login/logout`
        );

        // Listen to a bunch of Backbone-wide events
        const longTaskRegisterSpy = sinon.spy();
        const longTaskDeregisterSpy = sinon.spy();
        const authenticateEndSpy = sinon.spy();
        const logoutSuccessSpy = sinon.spy();
        const logoutFailSpy = sinon.spy();
        Backbone.on('longTask:register', longTaskRegisterSpy);
        Backbone.on('longTask:deregister', longTaskDeregisterSpy);
        Backbone.on('authenticate:end', authenticateEndSpy);
        Backbone.on('logout:success', logoutSuccessSpy);
        Backbone.on('logout:fail', logoutFailSpy);

        // Login
        this.appSett.authenticate('goodUsername', 'goodPassword');
        let responseText = JSON.stringify({authenticated: true});
        this.requests[this.requests.length - 1].respond(200,
          {"Content-Type": "application/json"},
          responseText);
        expect(this.appSett.get('username')).to.equal('goodUsername');
        expect(this.appSett.get('loggedIn')).to.be.true;

        // Logout
        this.appSett.logout();
        responseText = JSON.stringify({authenticated: false});
        this.requests[this.requests.length - 1].respond(200,
          {"Content-Type": "application/json"},
          responseText);
        expect(longTaskRegisterSpy).to.have.been.calledTwice;
        expect(longTaskDeregisterSpy).to.have.been.calledTwice;
        expect(authenticateEndSpy).to.have.been.calledTwice;
        expect(logoutSuccessSpy).to.have.been.calledOnce;
        expect(logoutFailSpy).not.to.have.been.called;
        expect(this.appSett.get('username')).to.equal('goodUsername'); //unchanged
        expect(this.appSett.get('loggedIn')).to.be.false;

        // You can't really fail in a logout request from the POV of the OLD's
        // API, so I'm not going to test that...

        // Stop listening to all those Backbone-wide events
        Backbone.on('longTask:register', longTaskRegisterSpy);
        Backbone.on('longTask:deregister', longTaskDeregisterSpy);
        Backbone.on('authenticate:end', authenticateEndSpy);
        Backbone.on('authenticate:success', logoutSuccessSpy);
        return Backbone.on('authenticate:fail', logoutFailSpy);
      });
    });

    describe('FieldDB RESTful behaviour', function() {

      it('makes authentication requests to FieldDB web services', function() {});

      return it('makes logout requests to FieldDB web services', function() {});
    });


    describe('Event responsivity', () => it('responds to Backbone-wide `authenticate`-namespaced events', function() {

      const longTaskRegisterSpy = sinon.spy();
      const authenticateLoginSpy = sinon.spy();
      Backbone.on('longTask:register', longTaskRegisterSpy);
      Backbone.on('authenticate:login', authenticateLoginSpy);

      expect(longTaskRegisterSpy).not.to.have.been.called;
      expect(this.appSett.authenticate).not.to.have.been.called;
      expect(this.appSett.logout).not.to.have.been.called;
      let longTaskRegisterCallCount = longTaskRegisterSpy.callCount;
      const authenticateCallCount = this.appSett.authenticate.callCount;
      const logoutCallCount = this.appSett.logout.callCount;

      Backbone.trigger('authenticate:login');
      // NOTE: the following two expects use `.above` because at this point there
      // will be several app settings models that have not been garbage-collected.
      // Each of these zombie models will respond to the Backbone-wide events. I
      // have not been able to figure out how to deal with this and make the tests
      // more elegant---not a big issue, but still annoying...
      expect(longTaskRegisterSpy.callCount).to.be.above(longTaskRegisterCallCount);
      expect(this.appSett.authenticate.callCount).to.be.above(authenticateCallCount);
      longTaskRegisterCallCount = longTaskRegisterSpy.callCount;

      Backbone.trigger('authenticate:logout');
      expect(longTaskRegisterSpy.callCount)
        .to.be.above(longTaskRegisterCallCount);
      expect(this.appSett.logout.callCount).to.be.above(logoutCallCount);

      Backbone.off('longTask:register', longTaskRegisterSpy);
      return Backbone.off('authenticate:login', authenticateLoginSpy);
    }));

    return describe('Initialization', () => it('checks if the user is logged in', function() {
      expect(this.appSett.checkIfLoggedIn).to.have.been.calledOnce;
      this.checkIfLoggedInStub.reset();
      expect(this.appSett.checkIfLoggedIn).not.to.have.been.called;
      const appSett = new ApplicationSettingsModel();
      return expect(this.appSett.checkIfLoggedIn).to.have.been.calledOnce;
    }));
  });
});

