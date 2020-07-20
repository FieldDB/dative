/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
define(function(require) {

  const AppView = require('../../../scripts/views/app');
  const PagesView = require('../../../scripts/views/pages');
  const FormAddView = require('../../../scripts/views/form-add');
  const ApplicationSettingsModel = require('../../../scripts/models/application-settings');

  return describe('App View', function() {

    before(function() {

      // Spy on some of AppView's methods
      sinon.spy(AppView.prototype, 'render');
      sinon.spy(AppView.prototype, 'showPagesView');
      sinon.spy(AppView.prototype, 'showFormAddView');
      sinon.spy(AppView.prototype, 'showFormsView');
      sinon.spy(AppView.prototype, 'toggleLoginDialog');
      return sinon.spy(AppView.prototype, 'showApplicationSettingsView');
    });

    beforeEach(function(done) {

      // Create test fixture using js-fixtures https://github.com/badunk/js-fixtures
      fixtures.path = 'fixtures';
      const callback = () => {
        this.$fixture = fixtures.window().$("<div id='js-fixtures-fixture'></div>");
        this.document = fixtures.window().document;
        this.$ = function(selector) { return this.$fixture.find(selector); };

        // New appView for each test
        // We stub the checkIfLoggedIn method of the app settings model just so that
        // the console isn't filled with failed CORS requests.
        this.checkIfLoggedInStub = sinon.stub();
        ApplicationSettingsModel.prototype.checkIfLoggedIn = this.checkIfLoggedInStub;
        this.applicationSettingsModel = new ApplicationSettingsModel();
        this.appView = new AppView({
          el: this.$fixture,
          applicationSettings: this.applicationSettingsModel
        });

        return done();
      };

      return fixtures.load('fixture.html', callback);
    });

      // Empty out and rebind the fixture for each run.
      //@$fixture.empty().appendTo $('#fixtures')

    afterEach(function() {

      fixtures.cleanUp();

      this.checkIfLoggedInStub.reset();

      this.appView.close();
      this.appView.remove();

      AppView.prototype.render.reset();
      AppView.prototype.showPagesView.reset();
      AppView.prototype.showFormAddView.reset();
      AppView.prototype.showFormsView.reset();
      AppView.prototype.toggleLoginDialog.reset();
      return AppView.prototype.showApplicationSettingsView.reset();
    });

    after(function() {

      AppView.prototype.render.restore();
      AppView.prototype.showPagesView.restore();
      AppView.prototype.showFormAddView.restore();
      AppView.prototype.showFormsView.restore();
      AppView.prototype.toggleLoginDialog.restore();
      return AppView.prototype.showApplicationSettingsView.restore();
    });

    describe('Initialization', () => it('renders itself and its persistent sub-views on initialization', function() {

      const $mainmenu = this.$('#mainmenu');
      const $progressWidgetContainer = this.$('#progress-widget-container');
      const $notifierContainer = this.$('#notifier-container');
      const $appView = this.$('#appview');
      const $loginDialog = this.$('div.dative-login-dialog');

      // Initialization calls render
      expect(this.appView.render).to.have.been.calledOnce;
      expect(this.appView._renderedSubViews).to.have.length(4);
      expect($mainmenu).to.have.prop('tagName', 'DIV');
      expect(this.$('#nonexistent-id').prop('tagName')).to.be.undefined;

      // Test that the main menu, progress widget, container widget, and login
      // dialog are rendered as expected.
      const $mainmenuFirstChild = $mainmenu.children().first();
      expect($mainmenuFirstChild).to.have.prop('tagName', 'UL');
      expect($mainmenuFirstChild).to.have.class('sf-menu');

      const $progressFirstChild = $progressWidgetContainer.children().first();
      expect($progressFirstChild).to.have.prop('tagName', 'DIV');
      expect($progressFirstChild).to.have.class('progress-widget');

      expect($notifierContainer).to.have.html('');
      expect($appView).to.have.html('');

      const $loginDialogFirstChild = $loginDialog.children().first();
      expect($loginDialogFirstChild).to.have.prop('tagName', 'FORM');
      return expect($loginDialogFirstChild).to.have.class('loginLogin');
    }));

    describe('Event responsivity', () => it('listens to main menu events', function() {
      expect(this.appView.showPagesView).not.to.have.been.called;
      expect(this.appView.showFormAddView).not.to.have.been.called;
      expect(this.appView.showFormsView).not.to.have.been.called;
      expect(this.appView.toggleLoginDialog).not.to.have.been.called;
      expect(this.appView.showApplicationSettingsView).not.to.have.been.called;

      this.appView.mainMenuView.trigger('request:openLoginDialogBox');
      this.appView.mainMenuView.trigger('request:pages');
      this.appView.mainMenuView.trigger('request:pages');
      this.appView.mainMenuView.trigger('request:formAdd');
      this.appView.mainMenuView.trigger('request:formAdd');
      this.appView.mainMenuView.trigger('request:formAdd');

      expect(this.appView.showPagesView).to.have.been.calledTwice;
      expect(this.appView.showFormAddView).to.have.been.calledThrice;
      expect(this.appView.showFormsView).not.to.have.been.called;
      expect(this.appView.toggleLoginDialog).to.have.been.calledOnce;
      return expect(this.appView.showApplicationSettingsView).not.to.have.been.called;
    }));

    describe('Subview management', function() {

      it('renders app views in response to main menu events', function(done) {
        this.appView.mainMenuView.once('request:pages', () => {
          expect(this.appView.$('div.dative-page-header-title'))
            .to.have.text('Pages');
          return this.appView.mainMenuView.trigger('request:formAdd');
        });

        this.appView.mainMenuView.once('request:formAdd', () => {
          expect(this.appView.$('div.dative-page-header-title'))
            .to.have.text('Add a Form');
          return done();
        });

        return this.appView.mainMenuView.trigger('request:pages');
      });

      return it('correctly renders/closes visible subviews', function(done) {

        this.appView.mainMenuView.once('request:pages', () => {
          expect(this.appView.$('.dative-page-header-title')).to.have.text('Pages');
          expect(this.appView._visibleView).to.exist.and
            .to.be.an.instanceof(PagesView);
          expect(this.appView._renderedSubViews).to.have.length(5);
          return this.appView.mainMenuView.trigger('request:formAdd');
        });

        this.appView.mainMenuView.once('request:formAdd', () => {
          expect(this.appView.$('.dative-page-header-title')).to.have.text('Add a Form');
          expect(this.appView._visibleView).to.exist.and
            .to.be.an.instanceof(FormAddView);
          expect(this.appView._renderedSubViews).to.have.length(5);
          return done();
        });

        expect(this.appView._renderedSubViews).to.have.length(4);
        expect(this.appView._visibleView).to.be.undefined;
        return this.appView.mainMenuView.trigger('request:pages');
      });
    });

    return describe('GUI stuff', () => it.skip('remembers the currently focused element of a subview', function(done) {

      this.appView.mainMenuView.once('request:formAdd', () => {
        this.appView._visibleView.$('#transcription').focus();
        console.log(this.appView._visibleView.$('#transcription').prop('tagName'));
        console.log(this.appView._visibleView.$(':focus').prop('tagName'));
        return done();
      });

      return this.appView.mainMenuView.trigger('request:formAdd');
    }));
  });
});

