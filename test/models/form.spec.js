/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// global beforeEach, describe, it, assert, expect

define(function(require) {

  const FormModel = require('../../../scripts/models/form');
  const database = require('../../../scripts/models/database');

  return describe('Form Model', function() {

    describe('General behaviour', function() {

      it('has default values', function() {
        const form = new FormModel();
        expect(form.get('transcription')).to.equal('');
        expect(form.get('translations')).to.be.an('array').and
          .to.be.empty;
        return expect(form.get('id')).to.be.null;
      });

      it('can set values', function() {
        const form = new FormModel();
        form.set('transcription', 'oki');
        form.set({translations: ['hello']});
        expect(form.get('transcription')).to.equal('oki');
        return expect(form.get('translations')).to.contain('hello');
      });

      return it('sets passed attributes', function() {
        const form = new FormModel({
          transcription: 'oki',
          translations: ['hello']
        });
        expect(form.get('transcription')).to.equal('oki');
        return expect(form.get('translations')).to.contain('hello');
      });
    });

    describe('OLD REST AJAX behaviour', function() {

      it('makes appropriate AJAX requests', function() {
        const ajaxSpy = sinon.spy();
        const form = new FormModel({
          transcription: 'chien',
          translations: ['dog', 'hound']
        });
        form.sync = ajaxSpy;
        expect(ajaxSpy).not.to.have.been.called;
        form.save();
        return expect(ajaxSpy).to.have.been.calledOnce;
      });

      it('makes appropriate AJAX requests (stub of FormModel.sync)', function() {
        sinon.stub(FormModel.prototype, 'sync');
        const form = new FormModel({
          transcription: 'chien',
          translations: ['dog', 'hound']
        });
        form.save();
        expect(FormModel.prototype.sync).to.have.been.calledOnce;
        expect(FormModel.prototype.sync).to.have.been.calledWith('create', form);
        return FormModel.prototype.sync.restore();
      });

      it('makes appropriate AJAX requests (stub of Backbone.sync)', function() {
        sinon.stub(Backbone, 'sync');
        const form = new FormModel({
          transcription: 'chien',
          translations: ['dog', 'hound']
        });
        form.save();
        expect(Backbone.sync).to.have.been.calledOnce;
        expect(Backbone.sync).to.have.been.calledWith('create', form);
        return Backbone.sync.restore();
      });

      return it('makes appropriate AJAX requests (with Sinon fake server)', function(done) {
        // This test illustrates how to use Sinon to inspect requests and how to
        // return fake responses.
        //
        // References:
        // - http://sinonjs.org/docs/#server
        // - http://philfreo.com/blog/how-to-unit-test-ajax-requests-with-qunit-and-sinon-js/

        // Undo backbone-indexeddb's meddling
        const idbSync = Backbone.sync;
        Backbone.sync = Backbone.ajaxSync;

        const requests = [];
        const xhr = sinon.useFakeXMLHttpRequest();
        xhr.onCreate = xhr => requests.push(xhr);

        const form = new FormModel({
          transcription: 'chien',
          translations: ['dog', 'hound']
        });
        expect(requests).to.be.empty;
        form.save({}, {
          success(model, response, options) {
            expect(response.msg).to.equal('Good create request!');
            return done();
          }
          ,
          error(model, response, options) {
            expect(false).to.be.ok;
            return done();
          }
        });

        const request = requests[0];
        expect(requests.length).to.equal(1);
        expect(request.method).to.equal('POST');
        expect(request.url).to.equal(FormModel.prototype.url);

        const requestBody = JSON.parse(request.requestBody);
        expect(requestBody.transcription).to.equal('chien');
        expect(requestBody.translations).to.contain('dog', 'hound');
        expect(requestBody.id).to.be.null;

        console.log(request.requestHeaders);

        request.respond(200, {"Content-Type": "application/json"},
          JSON.stringify({msg: 'Good create request!'}));

        Backbone.sync = idbSync;
        xhr.restore();

        return done();
      });
    });

    describe.skip('IndexedDB behaviour', function() {

      it('has an indexeddb database', function() {
        const form = new FormModel();
        return expect(form.database).to.equal(database);
      });

      it('can save to indexeddb', function() {
        const form = new FormModel();
        return form.save({
            transcription: 'imitaa',
            translation: 'dog'
          }
          , {
            success() {
              return expect(true).to.be.ok;
            },
            error() {
              return expect(false).to.be.ok;
            }
          }
        );
      });

      it('can fetch a model by id', function() {
        const form = new FormModel();
        return form.save({
            transcription: 'imitaa',
            translation: 'dog'
          }
          , {
            success() {
              expect(true).to.be.ok;
              const savedForm = new FormModel({id: form.id});
              return savedForm.fetch({
                success(object) {
                  const formObject = form.toJSON();
                  const savedFormObject = savedForm.toJSON();
                  expect(true).to.be.ok;
                  expect(savedFormObject.transcription).to.be.equal(formObject.transcription);
                  return expect(savedFormObject.translation).to.be.equal(formObject.translation);
                },
                error(object, error) {
                  return expect(false).to.be.ok;
                }
              });
            },
            error() {
              return expect(false).to.be.ok;
            }
          }
        );
      });

      it('can fetch a model by transcription index', function(done) {
        const form = new FormModel();
        return form.save({
            transcription: 'poos',
            translation: 'dog'
          }
          , {
            success() {
              expect(true).to.be.ok;
              const savedForm = new FormModel({transcription: form.get('transcription')});
              return savedForm.fetch({
                success(object) {
                  const formObject = form.toJSON();
                  const savedFormObject = savedForm.toJSON();
                  expect(true).to.be.ok;
                  expect(savedFormObject.transcription).to.be.equal(formObject.transcription);
                  expect(savedFormObject.translation).to.be.equal(formObject.translation);
                  return done();
                },
                error(object, error) {
                  expect(false).to.be.ok;
                  return done();
                }
              });
            },
            error() {
              expect(false).to.be.ok;
              return done();
            }
          }
        );
      });

      it('can not fetch a model by a non-index: translation', function(done) {
        const form = new FormModel();
        return form.save({
            transcription: 'foo',
            translation: 'bar'
          }
          , {
            success() {
              expect(true).to.be.ok;
              const savedForm = new FormModel({translation: form.get('translation')});
              return savedForm.fetch({
                success(object) {
                  expect(false).to.be.ok;
                  return done();
                },
                error(object, error) {
                  // We expect an error because the translation attribute is not
                  // indexed
                  expect(true).to.be.ok;
                  return done();
                }
              });
            },
            error() {
              expect(false).to.be.ok;
              return done();
            }
          }
        );
      });

      it('can update a form model', function(done) {
        const form = new FormModel();
        return form.save({
            transcription: 'bar',
            translation: 'baz'
          }
          , {
            success() {
              expect(form.toJSON().transcription).to.equal('bar');
              return form.save(
                  {transcription: 'foo'}
                , {
                  success() {
                    return form.fetch({
                      success(object) {
                        expect(form.toJSON().transcription).to.equal('foo');
                        expect(form.toJSON().translation).to.equal('baz');
                        return done();
                      },
                      error(object, error) {
                        expect(false).to.be.ok;
                        return done();
                      }
                    });
                  },
                  error() {
                    expect(false).to.be.ok;
                    return done();
                  }
                }
              );
            },
            error(object, error) {
              expect(false).to.be.ok;
              return done();
            }
          }
        );
      });

      return it('can delete a form model', function(done) {
        const form = new FormModel();
        return form.save({
            transcription: 'foo',
            translation: 'bar'
          }
          , {
            success(object) {
              expect(true).to.be.ok;
              return form.destroy({
                success() {
                  expect(true).to.be.ok;
                  return form.fetch({
                    success() {
                      expect(false).to.be.ok; // shouldn't be able to fetch deleted
                      return done();
                    },
                    error(object, error) {
                      expect(error).to.equal('Not Found');
                      return done();
                    }
                  });
                },
                error(object, error) {
                  expect(false).to.be.ok; // should be able to destroy
                  return done();
                }
              });
            },
            error(error) {
              expect(false).to.be.ok; // should be able to save
              return done();
            }
          }
        );
      });
    });

    return describe.skip('Relational Backbone behaviour', () => it('can be converted to a relational data structure', function() {}));
  });
});

