/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
define(function(require) {

  const MainMenuView = require('../../../scripts/views/mainmenu');
  const ApplicationSettingsModel = require('../../../scripts/models/application-settings');

  return describe('Main Menu View', function() {

    before(function() {
      // Create test fixture.
      return this.$fixture = $("<div id='main-menu-view-fixture'></div>");
    });

    beforeEach(function() {
      // Empty out and rebind the fixture for each run.
      this.$fixture.empty().appendTo($('#fixtures'));

      // New default model and view for each test
      this.applicationSettings = new ApplicationSettingsModel();
      return this.mainMenuView = new MainMenuView({
        model: this.applicationSettings,
        el: this.$fixture
      });
    });

    afterEach(function() {
      this.mainMenuView.remove();
      return this.applicationSettings.destroy();
    });

    after(() => $('#fixtures').empty());

    it('parses shortcut strings correctly', function() {
      let map = this.mainMenuView.getShortcutMap('ctrl+A');
      expect(map).to.have.property('ctrlKey', true);
      expect(map).to.have.property('altKey', false);
      expect(map).to.have.property('shiftKey', false);
      expect(map).to.have.property('shortcutKey', 65);

      map = this.mainMenuView.getShortcutMap('ctrl+a');
      expect(map).to.have.property('ctrlKey', true);
      expect(map).to.have.property('altKey', false);
      expect(map).to.have.property('shiftKey', false);
      expect(map).to.have.property('shortcutKey', 65);

      map = this.mainMenuView.getShortcutMap('alt+ctrl+z');
      expect(map).to.have.property('ctrlKey', true);
      expect(map).to.have.property('altKey', true);
      expect(map).to.have.property('shiftKey', false);
      expect(map).to.have.property('shortcutKey', 90);

      map = this.mainMenuView.getShortcutMap('z');
      expect(map).to.have.property('ctrlKey', false);
      expect(map).to.have.property('altKey', false);
      expect(map).to.have.property('shiftKey', false);
      expect(map).to.have.property('shortcutKey', 90);

      map = this.mainMenuView.getShortcutMap('shift+ctrl+alt+rArrow');
      expect(map).to.have.property('ctrlKey', true);
      expect(map).to.have.property('altKey', true);
      expect(map).to.have.property('shiftKey', true);
      return expect(map).to.have.property('shortcutKey', 39);
    });

    it('generates shortcut abbreviations from shortcut strings', function() {
      let abbr = this.mainMenuView.getShortcutAbbreviation('shift+ctrl+alt+dArrow');
      expect(abbr).to.equal('\u2303\u2325\u21E7\u2193');

      abbr = this.mainMenuView.getShortcutAbbreviation('ctrl+a');
      return expect(abbr).to.equal('\u2303A');
    });

    it('fires the correct event when a menu button is clicked', function() {
      let $button, spy;
      this.mainMenuView.render();
      const buttons = []; // array of 2-arrays: $-wrapped button and spy
      for (let button of Array.from(this.mainMenuView.$('[data-event]').get())) {
        button = $(button);
        spy = sinon.spy();
        const dataEvent = button.attr('data-event');
        this.mainMenuView.on(dataEvent, spy);
        buttons.push([button, spy]);
      }

      // Click just the first button once.
      const [$firstButton, firstSpy] = Array.from(buttons[0]);
      for ([$button, spy] of Array.from(buttons)) {
        expect(spy).not.to.have.been.called;
      }
      $firstButton.click();
      expect(firstSpy).to.have.been.calledOnce;
      for ([$button, spy] of Array.from(buttons.slice(1))) {
        expect(spy).not.to.have.been.called;
      }

      // Click all of the buttons twice.
      for ([$button, spy] of Array.from(buttons)) {
        $button.click();
        $button.click();
      }
      expect(firstSpy).to.have.been.calledThrice;
      return (() => {
        const result = [];
        for ([$button, spy] of Array.from(buttons.slice(1))) {
        // Some menu buttons have the same data-event value so clicking one
        // twice will call the spy of the other another two times; hence some
        // spies will have been called four times.
          expect(spy.callCount).to.be.at.least(2);
          result.push(expect(spy.callCount).to.be.at.most(4));
        }
        return result;
      })();
    });

    it('fires the correct event when a keyboard shortcut is pressed', function() {
      let $button, spy;
      let shortcutString;
      this.mainMenuView.render();
      const buttons = []; // array of 3-arrays: $-wrapped button, spy, and shortcut string
      for (let button of Array.from(this.mainMenuView.$('[data-shortcut]').get())) {
        button = $(button);
        spy = sinon.spy();
        const dataEvent = button.attr('data-event');
        const dataShortcut = button.attr('data-shortcut');
        this.mainMenuView.on(dataEvent, spy);
        buttons.push([button, spy, dataShortcut]);
      }

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

      // Execute just the first shortcut.
      const [$firstButton, firstSpy, firstShortcut] = Array.from(buttons[0]);
      for ([$button, spy] of Array.from(buttons)) {
        expect(spy).not.to.have.been.called;
      }
      simulateShortcut(firstShortcut);
      expect(firstSpy).to.have.been.calledOnce;
      for ([$button, spy] of Array.from(buttons.slice(1))) {
        expect(spy).not.to.have.been.called;
      }

      // Execute all keyboard shortcuts twice.
      for ([$button, spy, shortcutString] of Array.from(buttons)) {
        simulateShortcut(shortcutString);
        simulateShortcut(shortcutString);
      }
      expect(firstSpy).to.have.been.calledThrice;
      return (() => {
        const result = [];
        for ([$button, spy] of Array.from(buttons.slice(1))) {
          result.push(expect(spy).to.have.been.calledTwice);
        }
        return result;
      })();
    });

    it('appends the correct keyboard shortcut to the menu button name', function() {
      this.mainMenuView.render();
      return (() => {
        const result = [];
        for (let button of Array.from(this.mainMenuView.$('[data-shortcut]').get())) {
          button = $(button);
          const shortcutString = button.attr('data-shortcut');
          const abbr = this.mainMenuView.getShortcutAbbreviation(shortcutString);
          result.push(expect(button.text()).to.contain(abbr));
        }
        return result;
      })();
    });

    it('indicates whether the user is logged in.', function() {
      this.mainMenuView.render();
      let $iconSpan = this.mainMenuView
        .$('a.dative-authenticated span.ui-button-icon-primary');
      if (this.applicationSettings.get('loggedIn')) {
        expect($iconSpan.attr('class')).to.contain('ui-icon-unlocked');
      } else {
        expect($iconSpan.attr('class')).to.contain('ui-icon-locked');
      }

      this.applicationSettings.set('loggedIn', true);
      $iconSpan = this.mainMenuView
        .$('a.dative-authenticated span.ui-button-icon-primary');
      expect($iconSpan.attr('class')).to.contain('ui-icon-unlocked');

      this.applicationSettings.set('loggedIn', false);
      $iconSpan = this.mainMenuView
        .$('a.dative-authenticated span.ui-button-icon-primary');
      return expect($iconSpan.attr('class')).to.contain('ui-icon-locked');
    });

    return it('fires Backbone-wide loginDialog:toggle event when the login icon is clicked.', function() {
      // NOTE: It's necessary to set the spy on the prototype before the
      // main menu object has been created.
      // Cf. http://stackoverflow.com/questions/9113186/backbone-js-click-event-spy-is-not-getting-called-using-jasmine-js-and-sinon-js
      // For additional discussion, see pp. 117-119 of Backbone.js Testing.
      const loginDialogToggleEventSpy = sinon.spy();
      const toggleLoginDialogSpy = sinon.spy(MainMenuView.prototype, 'toggleLoginDialog');
      const mainMenuView = new MainMenuView({
        model: this.applicationSettings,
        el: this.$fixture
      });
      Backbone.once('loginDialog:toggle', loginDialogToggleEventSpy);
      mainMenuView.render();
      expect(loginDialogToggleEventSpy).not.to.have.been.called;
      expect(toggleLoginDialogSpy).not.to.have.been.called;
      $('a.dative-authenticated').first().click();
      expect(toggleLoginDialogSpy).to.have.been.calledOnce;
      expect(loginDialogToggleEventSpy).to.have.been.calledOnce;
      return MainMenuView.prototype.toggleLoginDialog.restore();
    });
  });
});

