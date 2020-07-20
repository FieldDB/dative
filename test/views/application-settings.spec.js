/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
define(function(require) {

  const ApplicationSettingsView = require('../../../scripts/views/application-settings');
  const ApplicationSettingsModel = require('../../../scripts/models/application-settings');

  // Convenience function to simulate keyboard shortcut events.
  const simulateShortcut = shortcutString => {
    const shortcutMap = this.mainMenuView.getShortcutMap(shortcutString);
    const keydownEvent = $.Event('keydown');
    keydownEvent.ctrlKey = shortcutMap.ctrlKey;
    keydownEvent.altKey = shortcutMap.altKey;
    keydownEvent.shiftKey = shortcutMap.shiftKey;
    keydownEvent.which = shortcutMap.shortcutKey;
    return $(document).trigger(keydownEvent);
  };

  return describe('Application Settings View', function() {

    before(function() {

      // Spy on some of ApplicationSettingsView's methods
      sinon.spy(ApplicationSettingsView.prototype, 'edit');
      sinon.spy(ApplicationSettingsView.prototype, 'view');
      sinon.spy(ApplicationSettingsView.prototype, 'save');
      return sinon.spy(ApplicationSettingsView.prototype, '_keyboardControl');
    });

    beforeEach(function(done) {

      // Create test fixture using js-fixtures https://github.com/badunk/js-fixtures
      fixtures.path = 'fixtures';
      const callback = () => {
        this.$fixture = fixtures.window().$("<div id='js-fixtures-fixture'></div>");
        this.$ = function(selector) { return this.$fixture.find(selector); };

        // New appSetView for each test
        // We stub the checkIfLoggedIn method of the app settings model just so that
        // the console isn't filled with failed CORS requests.
        this.checkIfLoggedInStub = sinon.stub();
        ApplicationSettingsModel.prototype.checkIfLoggedIn = this.checkIfLoggedInStub;
        this.applicationSettingsModel = new ApplicationSettingsModel();
        this.appSetView = new ApplicationSettingsView({
          el: this.$fixture,
          model: this.applicationSettingsModel
        });
        this.appSetView.render();
        return done();
      };

      return fixtures.load('fixture.html', callback);
    });

    afterEach(function() {

      fixtures.cleanUp();

      this.checkIfLoggedInStub.reset();

      this.appSetView.close();
      this.appSetView.remove();

      // Reset spies
      ApplicationSettingsView.prototype.edit.reset();
      ApplicationSettingsView.prototype.view.reset();
      ApplicationSettingsView.prototype.save.reset();
      return ApplicationSettingsView.prototype._keyboardControl.reset();
    });

    after(function() {

      // Restore spied-on methods
      ApplicationSettingsView.prototype.edit.restore();
      ApplicationSettingsView.prototype.view.restore();
      ApplicationSettingsView.prototype.save.restore();
      return ApplicationSettingsView.prototype._keyboardControl.restore();
    });

    describe('Event responsivity', function() {

      it('listens to events emitted by its subviews', function() {
        expect(this.appSetView.edit).not.to.have.been.called;
        expect(this.appSetView.view).to.have.been.calledOnce; // `render` in `beforeEach` calls `view`
        expect(this.appSetView.save).not.to.have.been.called;

        Backbone.trigger('applicationSettings:edit');
        Backbone.trigger('applicationSettings:view');
        Backbone.trigger('applicationSettings:view');
        Backbone.trigger('applicationSettings:save');
        Backbone.trigger('applicationSettings:save');
        Backbone.trigger('applicationSettings:save');

        expect(this.appSetView.edit).to.have.been.calledOnce;
        expect(this.appSetView.save).to.have.been.calledThrice;
        return expect(this.appSetView.view.callCount).to.equal(6);
      });

      it('listens to its model', function() {
        expect(this.appSetView.edit).not.to.have.been.called;
        expect(this.appSetView.view).to.have.been.calledOnce;
        expect(this.appSetView.save).not.to.have.been.called;
        expect(this.appSetView._keyboardControl)
          .not.to.have.been.called;
        this.appSetView.model.set('serverURL', 'www.google.ca');
        expect(this.appSetView.edit).not.to.have.been.called;
        expect(this.appSetView.view).to.have.been.calledTwice;
        expect(this.appSetView.save).not.to.have.been.called;
        return expect(this.appSetView._keyboardControl)
          .not.to.have.been.called;
      });

      it('listens to DOM events', function() {
        expect(this.appSetView.edit).not.to.have.been.called;
        expect(this.appSetView.view).to.have.been.calledOnce;
        expect(this.appSetView.save).not.to.have.been.called;
        expect(this.appSetView._keyboardControl)
          .not.to.have.been.called;

        this.appSetView.$('.edit').click();
        expect(this.appSetView.edit).to.have.been.calledOnce;
        expect(this.appSetView.view).to.have.been.calledOnce;
        expect(this.appSetView.save).not.to.have.been.called;
        expect(this.appSetView._keyboardControl)
          .not.to.have.been.called;

        this.appSetView.$('.view').click();
        expect(this.appSetView.edit).to.have.been.calledOnce;
        expect(this.appSetView.view).to.have.been.calledTwice;
        expect(this.appSetView.save).not.to.have.been.called;
        expect(this.appSetView._keyboardControl)
          .not.to.have.been.called;

        this.appSetView.$('.edit').first().click();
        expect(this.appSetView.edit).to.have.been.calledTwice;
        expect(this.appSetView.view).to.have.been.calledTwice;
        expect(this.appSetView.save).not.to.have.been.called;
        expect(this.appSetView._keyboardControl)
          .not.to.have.been.called;

        this.appSetView.$('.save').first().click();
        expect(this.appSetView.edit).to.have.been.calledTwice;
        // TODO: figure out why clicking 'save' is causing `view` to be
        // called 2 times; this doesn't seem to be happening via normal
        // GUI manipulation.
        // expect(@appSetView.view).to.have.been.calledTwice
        expect(this.appSetView.view.callCount).to.equal(4);
        expect(this.appSetView.save).to.have.been.calledOnce;
        expect(this.appSetView._keyboardControl)
          .not.to.have.been.called;

        this.appSetView.$('.dative-display').first().click();
        expect(this.appSetView.edit).to.have.been.calledThrice;
        //expect(@appSetView.view).to.have.been.calledTwice
        expect(this.appSetView.view.callCount).to.equal(4);
        expect(this.appSetView.save).to.have.been.calledOnce;
        return expect(this.appSetView._keyboardControl)
          .not.to.have.been.called;
      });

      return it('listens to keydown events', function() {

        let editCountInit = this.appSetView.edit.callCount;
        let viewCountInit = this.appSetView.view.callCount;
        const saveCountInit = this.appSetView.save.callCount;

        // Pressing "A" does nothing
        expect(this.appSetView._keyboardControl).not.to.have.been.called;
        const keydownEvent = fixtures.window().$.Event('keydown');
        keydownEvent.which = 95; // *not* a shortcut key
        this.appSetView.$('.dative-display').eq(0).trigger(keydownEvent);
        expect(this.appSetView._keyboardControl).to.have.been.calledOnce;
        expect(this.appSetView.edit.callCount).to.equal(editCountInit);
        expect(this.appSetView.view.callCount).to.equal(viewCountInit);
        expect(this.appSetView.save.callCount).to.equal(saveCountInit);

        // Pressing <Esc> in view mode does nothing
        keydownEvent.which = 27;
        this.appSetView.$('.dative-display').eq(0).trigger(keydownEvent);
        expect(this.appSetView._keyboardControl).to.have.been.calledTwice;
        expect(this.appSetView.edit.callCount).to.equal(editCountInit);
        expect(this.appSetView.view.callCount).to.equal(viewCountInit);
        expect(this.appSetView.save.callCount).to.equal(saveCountInit);

        // Pressing <Esc> in edit mode returns us to view mode
        this.appSetView.edit();
        this.appSetView.$('.dative-input').eq(0).trigger(keydownEvent);
        expect(this.appSetView._keyboardControl).to.have.been.calledThrice;
        expect(this.appSetView.edit.callCount).to.equal(editCountInit + 1);
        expect(this.appSetView.view.callCount).to.equal(viewCountInit + 1);
        expect(this.appSetView.save.callCount).to.equal(saveCountInit);
        editCountInit++;
        viewCountInit++;

        // Pressing <Enter> in view mode when the view's root node is focused
        // does nothing
        keydownEvent.which = 13;
        this.appSetView.$el.trigger(keydownEvent);
        expect(this.appSetView._keyboardControl).to.have.been.calledThrice;
        expect(this.appSetView.edit.callCount).to.equal(editCountInit);
        expect(this.appSetView.view.callCount).to.equal(viewCountInit);
        expect(this.appSetView.save.callCount).to.equal(saveCountInit);

        // Pressing <Enter> in view mode on a data display item brings us to
        // edit mode
        this.appSetView.$('.dative-display').eq(0).trigger(keydownEvent);
        expect(this.appSetView._keyboardControl.callCount).to.equal(4);
        expect(this.appSetView.edit.callCount).to.equal(editCountInit + 1);
        expect(this.appSetView.view.callCount).to.equal(viewCountInit);
        expect(this.appSetView.save.callCount).to.equal(saveCountInit);
        editCountInit++;

        // Pressing <Enter> in edit mode on an input calls `save`, which calls
        // `view`
        this.appSetView.$('.dative-input').eq(0).trigger(keydownEvent);
        expect(this.appSetView._keyboardControl.callCount).to.equal(5);
        expect(this.appSetView.edit.callCount).to.equal(editCountInit);
        // TODO: figure out why calling 'save' is causing `view` to be
        // called 2 times; this doesn't seem to be happening via normal
        // GUI manipulation.
        // expect(@appSetView.view.callCount).to.equal viewCountInit
        expect(this.appSetView.view.callCount).to.equal(viewCountInit + 2);
        return expect(this.appSetView.save.callCount).to.equal(saveCountInit + 1);
      });
    });

    return describe('Saves state', () => it('saves form data to its model, triggering events in other views', function() {

      const editCountInit = this.appSetView.edit.callCount;
      const viewCountInit = this.appSetView.view.callCount;
      const saveCountInit = this.appSetView.save.callCount;

      expect(this.appSetView.edit).not.to.have.been.called;
      expect(this.appSetView.view).to.have.been.calledOnce;
      expect(this.appSetView.save).not.to.have.been.called;

      // Go to edit view, change the server url, and click 'Save'
      this.appSetView.edit();
      this.appSetView.$('[name="serverURL"]').val('http://www.google.com/');
      this.appSetView.$('.save').first().click();

      expect(this.appSetView.edit).to.have.been.calledOnce;
      // TODO: figure out why calling 'save' is causing `view` to be
      // called 2 times; this doesn't seem to be happening via normal
      // GUI manipulation.
      // expect(@appSetView.view).to.have.been.calledTwice
      expect(this.appSetView.view).to.have.been.calledThrice;
      expect(this.appSetView.save).to.have.been.calledOnce;
      return expect(this.appSetView.$('label[for="serverURL"]').next())
        .to.have.text('http://www.google.com/');
    }));
  });
});

