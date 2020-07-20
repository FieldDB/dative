/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
define(function(require) {

  const BaseView = require('../../../scripts/views/base');

  return describe('Base View', function() {

    before(function() {});
      // Spy on some of BaseView's methods

    beforeEach(function(done) {

      // Create test fixture using js-fixtures https://github.com/badunk/js-fixtures
      fixtures.path = 'fixtures';
      const callback = () => {
        this.$fixture = fixtures.window().$("<div id='js-fixtures-fixture'></div>");
        this.$ = function(selector) { return this.$fixture.find(selector); };
        this.baseView = new BaseView({el: this.$fixture}); // New baseView for each test
        return done();
      };
      return fixtures.load('fixture.html', callback);
    });

    afterEach(function() {

      fixtures.cleanUp();
      this.baseView.close();
      return this.baseView.remove();
    });
      // Reset spies/stubs

    after(function() {});
      // Restore spies

    describe('String manipulation', function() {

      it('trims strings', function() {
        expect(this.baseView.trim('\n\t    fargo\t   ')).to.equal('fargo');
        return expect(this.baseView.trim('    and   then\t\n\n   ')).to.equal('and   then');
      });

      return it('converts snake case to camel case and back again', function() {
        expect(this.baseView.snake2camel('big_important_var'))
          .to.equal('bigImportantVar');
        return expect(this.baseView.camel2snake('bigImportantVar'))
          .to.equal('big_important_var');
      });
    });

    return describe('Subview management', function() {

      it('closes rendered subviews on self.close', function() {

        this.baseView.$el.html('<div id="subviewOne"></div><div id="subviewTwo"></div>');

        sinon.spy(this.baseView, 'close');

        // subview one
        this.baseView.subviewOne = new BaseView();
        this.baseView.subviewOne.setElement(this.baseView.$('#subviewOne'));
        this.baseView.subviewOne.$el.html('<button class="clickme">Click Me!</button>');
        this.baseView.rendered(this.baseView.subviewOne);
        this.baseView.subviewOne.clickResponder = sinon.spy();
        this.baseView.subviewOne.delegateEvents({'click .clickme': 'clickResponder'});
        sinon.spy(this.baseView.subviewOne, 'close');

        // subview two
        this.baseView.subviewTwo = new BaseView();
        this.baseView.subviewTwo.setElement(this.baseView.$('#subviewTwo'));
        this.baseView.subviewTwo.$el.html('<span>I am subview 2</span>');
        this.baseView.rendered(this.baseView.subviewTwo);
        sinon.spy(this.baseView.subviewTwo, 'close');

        // subview one responds to Backbone events
        this.baseView.subviewOne.eventResponder = sinon.spy();
        this.baseView.subviewOne.listenTo(Backbone, 'all', this.baseView.subviewOne.eventResponder);
        expect(this.baseView.subviewOne.eventResponder).not.to.have.been.called;
        Backbone.trigger('nonsense');
        expect(this.baseView.subviewOne.eventResponder).to.have.been.calledOnce;

        // subview one responds to its button being clicked
        expect(this.baseView.subviewOne.clickResponder).not.to.have.been.called;
        this.baseView.subviewOne.$('.clickme').click();
        expect(this.baseView.subviewOne.clickResponder).to.have.been.calledOnce;

        // Close the base view
        expect(this.baseView.close).not.to.have.been.called;
        expect(this.baseView.subviewOne.close).not.to.have.been.called;
        expect(this.baseView.subviewTwo.close).not.to.have.been.called;
        this.baseView.close();
        expect(this.baseView.close).to.have.been.calledOnce;
        expect(this.baseView.subviewOne.close).to.have.been.calledOnce;
        expect(this.baseView.subviewTwo.close).to.have.been.calledOnce;

        // subview one no longer responds to Backbone-wide events (because
        // stopListening is called in BaseView.close)
        Backbone.trigger('nonsense');
        expect(this.baseView.subviewOne.eventResponder).to.have.been.calledOnce;

        // subview one no longer responds to its button being clicked (because
        // undelegateEvents has been called in BaseView.close)
        this.baseView.subviewOne.$('.clickme').click();
        expect(this.baseView.subviewOne.clickResponder).to.have.been.calledOnce;

        this.baseView.close.restore();
        this.baseView.subviewOne.close.restore();
        return this.baseView.subviewTwo.close.restore();
      });

      return it('recursively closes subviews', function() {

        this.baseView.$el.html('<div id="subviewOne"></div>');

        sinon.spy(this.baseView, 'close');

        // subview 1
        const subviewOne = (this.baseView.subviewOne = new BaseView());
        subviewOne.setElement(this.baseView.$('#subviewOne'));
        subviewOne.$el.html('<div id="subviewOneA"></div>');
        this.baseView.rendered(subviewOne);
        sinon.spy(subviewOne, 'close');

        // subview 1a (subview of subview 1)
        const subviewOneA = (subviewOne.subviewOneA = new BaseView());
        subviewOneA.setElement(subviewOne.$('#subviewOneA'));
        subviewOneA.$el.html('<button class="clickme">Click Me!</button>');
        subviewOne.rendered(subviewOneA);
        sinon.spy(subviewOneA, 'close');
        subviewOneA.clickResponder = sinon.spy();
        subviewOneA.delegateEvents({'click .clickme': 'clickResponder'});

        // subview 1a responds to Backbone events
        subviewOneA.eventResponder = sinon.spy();
        subviewOneA.listenTo(Backbone, 'all', subviewOneA.eventResponder);
        expect(subviewOneA.eventResponder).not.to.have.been.called;
        Backbone.trigger('nonsense');
        expect(subviewOneA.eventResponder).to.have.been.calledOnce;

        // subview 1a responds to its button being clicked
        expect(subviewOneA.clickResponder).not.to.have.been.called;
        subviewOneA.$('.clickme').click();
        expect(subviewOneA.clickResponder).to.have.been.calledOnce;

        // Close subview 1
        expect(this.baseView.close).not.to.have.been.called;
        expect(subviewOne.close).not.to.have.been.called;
        expect(subviewOneA.close).not.to.have.been.called;
        expect(this.baseView._renderedSubViews).to.contain(subviewOne).and
          .to.have.length(1);
        expect(subviewOne._renderedSubViews).to.contain(subviewOneA).and
          .to.have.length(1);
        expect(subviewOneA._renderedSubViews).to.be.undefined;
        subviewOne.close();
        this.baseView.closed(subviewOne);
        expect(this.baseView.close).not.to.have.been.called;
        expect(subviewOne.close).to.have.been.calledOnce;
        expect(subviewOneA.close).to.have.been.calledOnce;
        expect(this.baseView._renderedSubViews).to.have.length(0);
        expect(subviewOne._renderedSubViews).to.contain(subviewOneA).and
          .to.have.length(1); // Note: `.closed` is not called recursively by `.close`
        expect(subviewOneA._renderedSubViews).to.be.undefined;

        // subview 1a no longer responds to Backbone-wide events (because
        // stopListening is called in BaseView.close)
        Backbone.trigger('nonsense');
        expect(subviewOneA.eventResponder).to.have.been.calledOnce;

        // subview 1a no longer responds to its button being clicked (because
        // undelegateEvents has been called in BaseView.close)
        subviewOneA.$('.clickme').click();
        expect(subviewOneA.clickResponder).to.have.been.calledOnce;

        this.baseView.close.restore();
        subviewOne.close.restore();
        return subviewOneA.close.restore();
      });
    });
  });
});

