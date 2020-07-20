/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// global beforeEach, describe, it, assert, expect

define(function(require) {

  const FormModel = require('../../../scripts/models/form');
  const FormsCollection = require('../../../scripts/collections/forms');
  const database = require('../../../scripts/models/database');

  // Recursive function to delete all models in a collection.
  // Taken from the indexeddb-backbonejs-adapter
  var deleteNext = function(coll, done) {
    if (coll.length === 0) {
      return done();
    } else {
      const form = coll.pop();
      return form.destroy({
        success() {
          return deleteNext(coll, done);
        },
        error() {
          return deleteNext(coll, done);
        }
      });
    }
  };

  return describe('Forms Collection', () => describe('IndexedDB behaviour', function() {

    //@timeout 10000

    it('can delete all of its form models', function(done) {
      const forms = new FormsCollection();
      return forms.fetch({
        success() {
          return deleteNext(forms, function() {
            expect(forms.models.length).to.equal(0);
            return done();
          });
        },
        error() {
          expect(false).to.be.ok;
          console.log('unable to fetch forms collection');
          return done();
        }
      });
    });

    return it('has an indexeddb database', function(done) {
      const forms = new FormsCollection();
      return forms.fetch({
        success() {
          expect(forms.models.length).to.equal(0);
          return done();
        },
        error() {
          console.log('error');
          expect(false).to.be.ok;
          return done();
        }
      });
    });
  }));
});

