/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
define(function(require) {

  const LoginDialogView = require('../../../scripts/views/login-dialog');
  const ApplicationSettingsModel = require('../../../scripts/models/application-settings');

  return describe('Login Dialog View', function() {

    before(function() {
      // Spy on methods...
      sinon.spy(LoginDialogView.prototype, '_authenticateFail');
      sinon.spy(LoginDialogView.prototype, '_authenticateEnd');
      sinon.spy(LoginDialogView.prototype, '_authenticateSuccess');
      sinon.spy(LoginDialogView.prototype, 'toggle');
      sinon.spy(LoginDialogView.prototype, 'validate');
      sinon.spy(LoginDialogView.prototype, '_submitWithEnter');
      sinon.spy(LoginDialogView.prototype, '_disableButtons');
      sinon.spy(LoginDialogView.prototype, 'login');
      sinon.spy(LoginDialogView.prototype, 'logout');
      return sinon.spy(LoginDialogView.prototype, 'forgotPassword');
    });

    beforeEach(function(done) {
      // Create test fixture using js-fixtures https://github.com/badunk/js-fixtures
      fixtures.path = 'fixtures';
      const callback = () => {
        this.$fixture = fixtures.window().$("<div id='js-fixtures-fixture'></div>");
        this.$ = function(selector) { return this.$fixture.find(selector); };

        sinon.stub(ApplicationSettingsModel.prototype, 'logout');
        sinon.stub(ApplicationSettingsModel.prototype, 'authenticate');
        this.checkIfLoggedInStub = sinon.stub();
        ApplicationSettingsModel.prototype.checkIfLoggedIn = this.checkIfLoggedInStub;
        this.applicationSettingsModel = new ApplicationSettingsModel();
        this.applicationSettingsModel.set('loggedIn', false);
        this.loginDialogView = new LoginDialogView({
          el: this.$fixture,
          model: this.applicationSettingsModel
        });
        this.loginDialogView.render();
        return done();
      };
      return fixtures.load('fixture.html', callback);
    });

    afterEach(function() {
      fixtures.cleanUp();
      this.loginDialogView.close();
      this.loginDialogView.remove();

      // Reset spies & stubs
      this.checkIfLoggedInStub.reset();
      ApplicationSettingsModel.prototype.logout.restore();
      ApplicationSettingsModel.prototype.authenticate.restore();

      LoginDialogView.prototype._authenticateFail.reset();
      LoginDialogView.prototype._authenticateEnd.reset();
      LoginDialogView.prototype._authenticateSuccess.reset();
      LoginDialogView.prototype.toggle.reset();
      LoginDialogView.prototype.validate.reset();
      LoginDialogView.prototype._submitWithEnter.reset();
      LoginDialogView.prototype._disableButtons.reset();
      LoginDialogView.prototype.login.reset();
      LoginDialogView.prototype.logout.reset();
      return LoginDialogView.prototype.forgotPassword.reset();
    });

    after(function() {
      // Restore spied-on methods
      LoginDialogView.prototype._authenticateFail.restore();
      LoginDialogView.prototype._authenticateEnd.restore();
      LoginDialogView.prototype._authenticateSuccess.restore();
      LoginDialogView.prototype.toggle.restore();
      LoginDialogView.prototype.validate.restore();
      LoginDialogView.prototype._submitWithEnter.restore();
      LoginDialogView.prototype._disableButtons.restore();
      LoginDialogView.prototype.login.restore();
      return LoginDialogView.prototype.forgotPassword.restore();
    });

    describe('Initialization', function() {

      it('creates a jQueryUI dialog', function() {
        const $f = selector => this.loginDialogView.$target.find(selector);
        expect($f('.dative-login-dialog-widget')).to.have.prop('tagName', 'DIV');
        expect($f('.dative-login-dialog-widget .forgot-password'))
          .to.have.prop('tagName', 'BUTTON');
        expect($f('.dative-login-dialog-widget .login'))
          .to.have.prop('tagName', 'BUTTON');
        expect($f('.dative-login-dialog-widget .logout'))
          .to.have.prop('tagName', 'BUTTON');
        return expect($f('.blargon-five')).not.to.have.prop('tagName');
      });

      return it('dis/enables buttons according to authentication state', function() {
        const $f = selector => this.loginDialogView.$target.find(selector);
        expect($f('button.logout')).to.have.class('ui-state-disabled');
        expect($f('button.login')).not.to.have.class('ui-state-disabled');
        expect($f('button.forgot-password')).not.to.have.class('ui-state-disabled');
        expect($f('input.password')).not.to.have.attr('disabled');
        expect($f('input.username')).not.to.have.attr('disabled');

        this.loginDialogView.model.set('loggedIn', true);
        expect($f('button.logout')).not.to.have.class('ui-state-disabled');
        expect($f('button.login')).to.have.class('ui-state-disabled');
        expect($f('button.forgot-password')).to.have.class('ui-state-disabled');
        expect($f('input.password')).to.have.attr('disabled');
        return expect($f('input.username')).to.have.attr('disabled');
      });
    });

    describe('Event responsivity', function() {

      it('responds to Bacbkone-wide events', function() {
        // Need to reset these spies because the app sett model can do unpredictable
        // things, depending on the state of the local storage app settings ...
        this.loginDialogView._authenticateFail.reset();
        this.loginDialogView._authenticateEnd.reset();
        this.loginDialogView._authenticateSuccess.reset();
        this.loginDialogView.toggle.reset();

        expect(this.loginDialogView._authenticateFail).not.to.have.been.called;
        expect(this.loginDialogView._authenticateEnd).not.to.have.been.called;
        expect(this.loginDialogView._authenticateSuccess).not.to.have.been.called;
        expect(this.loginDialogView.toggle).not.to.have.been.called;

        Backbone.trigger('authenticate:fail');
        Backbone.trigger('authenticate:fail');
        Backbone.trigger('authenticate:fail');
        Backbone.trigger('authenticate:end');
        Backbone.trigger('authenticate:end');
        Backbone.trigger('authenticate:success');

        expect(this.loginDialogView._authenticateFail).to.have.been.calledThrice;
        expect(this.loginDialogView._authenticateEnd).to.have.been.calledTwice;
        expect(this.loginDialogView._authenticateSuccess).to.have.been.calledOnce;
        expect(this.loginDialogView.toggle).not.to.have.been.called;

        Backbone.trigger('loginDialog:toggle');
        Backbone.trigger('loginDialog:toggle');
        Backbone.trigger('loginDialog:toggle');

        expect(this.loginDialogView._authenticateFail).to.have.been.calledThrice;
        expect(this.loginDialogView._authenticateEnd).to.have.been.calledTwice;
        expect(this.loginDialogView._authenticateSuccess).to.have.been.calledOnce;
        return expect(this.loginDialogView.toggle).to.have.been.calledThrice;
      });

      it('listens to its model', function() {
        this.loginDialogView._disableButtons.reset();
        expect(this.loginDialogView._disableButtons).not.to.have.been.called;
        this.loginDialogView.model.set('loggedIn', true);
        expect(this.loginDialogView._disableButtons).to.have.been.calledOnce;
        this.loginDialogView.model.set('loggedIn', false);
        expect(this.loginDialogView._disableButtons).to.have.been.calledTwice;
        this.loginDialogView.model.set('serverURL', 'http://www.google.com');
        return expect(this.loginDialogView._disableButtons).to.have.been.calledTwice;
      });

      it('responds to button clicks', function() {
        const $f = selector => this.loginDialogView.$target.find(selector);
        expect(this.loginDialogView.login).not.to.have.been.called;
        expect(this.loginDialogView.logout).not.to.have.been.called;
        expect(this.loginDialogView.forgotPassword).not.to.have.been.called;

        $f('button.login').click();
        expect(this.loginDialogView.login).to.have.been.calledOnce;
        expect(this.loginDialogView.logout).not.to.have.been.called;
        expect(this.loginDialogView.forgotPassword).not.to.have.been.called;

        $f('button.forgot-password').click();
        expect(this.loginDialogView.login).to.have.been.calledOnce;
        expect(this.loginDialogView.logout).not.to.have.been.called;
        expect(this.loginDialogView.forgotPassword).to.have.been.calledOnce;

        this.loginDialogView.model.set('loggedIn', true);
        $f('button.logout').click();
        expect(this.loginDialogView.login).to.have.been.calledOnce;
        expect(this.loginDialogView.logout).to.have.been.calledOnce;
        return expect(this.loginDialogView.forgotPassword).to.have.been.calledOnce;
      });

      return it.skip('responds to keyup/down events (???)', function() {
        // NOTE: this test just is not working: the simulated keyup events are not
        // triggering the expected view methods. I can't figure out why. It's
        // probably either because there is some glitch involving triggering
        // keyup/down events on input elements or it has something to do with
        // the jQueryUI dialog box and/or the fact that the fixture is in a
        // hidden iframe. I am giving up on this for now. A good reference on
        // this stuff is http://stackoverflow.com/questions/832059/definitive-way-to-trigger-keypress-events-with-jquery

        expect(this.loginDialogView.validate).not.to.have.been.called;
        expect(this.loginDialogView._submitWithEnter).not.to.have.been.called;

        const keyupEvent = $.Event('keyup');
        keyupEvent.which = 13;

        this.loginDialogView.$el.trigger(keyupEvent);
        expect(this.loginDialogView.validate).not.to.have.been.called;
        expect(this.loginDialogView._submitWithEnter).not.to.have.been.called;

        //@loginDialogView.dialogOpen() # even doing this doesn't help things ...
        this.loginDialogView.$el.find('.dative-login-dialog-widget .username')
          .trigger(keyupEvent);

        // None of the following cause the `validate` method to be called, even 
        // though it should be called (and is when you manually explore the GUI...)
        this.loginDialogView.$source.find('.password').trigger(keyupEvent);
        this.loginDialogView.$source.find('.password').first().trigger(keyupEvent);
        this.loginDialogView.$target.find('.password').first().focus().trigger(keyupEvent);
        this.loginDialogView.$source.find('.password').first().focus();
        this.loginDialogView.$source.find('.password').trigger(keyupEvent);

        // This will fail
        expect(this.loginDialogView.validate).to.have.been.calledOnce;
        return console.log(this.loginDialogView.validate.callCount);
      });
    }); // returns 0, should return 1

    return describe('Validation', () => it('prevents login attempts unless all fields have content', function() {
      const $f = selector => this.loginDialogView.$target.find(selector);
      const authenticateLoginSpy = sinon.spy();
      Backbone.on('authenticate:login', authenticateLoginSpy);
      expect(authenticateLoginSpy).not.to.have.been.called;
      expect(this.loginDialogView.login).not.to.have.been.called;

      // authenticate:login not called because no values in inputs
      $f('button.login').click();
      expect(authenticateLoginSpy).not.to.have.been.called;
      expect(this.loginDialogView.login).to.have.been.calledOnce;
      expect($f('.username-error')).to.have.text('required');
      expect($f('.password-error')).to.have.text('required');

      // authenticate:login not called because no values in username
      this.loginDialogView._initializeDialog(); // to reset things, e.g., error msgs
      $f('input.password').val('somepassword');
      $f('button.login').click();
      expect(authenticateLoginSpy).not.to.have.been.called;
      expect(this.loginDialogView.login).to.have.been.calledTwice;
      expect($f('.username-error')).to.have.text('required');
      expect($f('.password-error')).to.have.text('');

      // authenticate:login IS called because there are values in both inputs
      this.loginDialogView._initializeDialog(); // to reset things, e.g., error msgs
      $f('input.password').val('somepassword');
      $f('input.username').val('someusername');
      $f('button.login').click();
      expect(authenticateLoginSpy).to.have.been.calledOnce;
      expect(this.loginDialogView.login).to.have.been.calledThrice;
      expect($f('.username-error')).to.have.text('');
      expect($f('.password-error')).to.have.text('');

      return Backbone.off('authenticate:login', authenticateLoginSpy);
    }));
  });
});

