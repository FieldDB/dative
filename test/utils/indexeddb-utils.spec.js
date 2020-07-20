/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// global beforeEach, describe, it, assert, expect

define(function(require) {

  const database = require('../../../scripts/models/database');
  const {FieldDBIDB, FormStore} = require('../../../scripts/utils/indexeddb-utils');
  const {clone} = require('../../../scripts/utils/utils');

  const databaseId = database.id; // 'fielddb-database'
  const databaseVersion = database.migrations.slice().pop().version; // 1
  const fieldDBIDB = new FieldDBIDB(databaseId, databaseVersion);


  describe('FieldDBIDB class', function() {

    this.timeout(10000);

    // Optimist handler: unbridled success!
    const optimistHandler = {
      onsuccess() {
        return expect(true).to.be.ok;
      },
      onerror() {
        return expect(false).to.be.ok;
      }
    };

    it('can open a connection to the indexedDB database', function(done) {

      expect(fieldDBIDB.datastore).to.be.null;

      // An open database has an appropriate datastore attribute
      const openHandler = _.extend((clone(optimistHandler)), {
        onsuccess() {
          expect(fieldDBIDB.datastore).is.an.instanceof(IDBDatabase);
          expect((() => {
            const result = [];
            for (let k in fieldDBIDB.datastore.objectStoreNames) {
              const v = fieldDBIDB.datastore.objectStoreNames[k];
              result.push(v);
            }
            return result;
          })())
            .to.contain('forms');
          return done();
        }
      }
      );

      return fieldDBIDB.open(openHandler);
    });

    it('can create a form', function(done) {

      const createHandler = _.extend((clone(optimistHandler)), {
        onsuccess(formObject) {
          expect(formObject.transcription).to.equal('monkey');
          return done();
        }
      }
      );

      return fieldDBIDB.create(
        {transcription: 'monkey', translation: 'singe'},
        createHandler,
        {storeName: 'forms'}
      );
    });

    it('can retrieve all forms', function(done) {

      // Count forms initially, request create
      const indexHandler = _.extend((clone(optimistHandler)), {
        onsuccess: formsArray => {
          this.initialCount = formsArray.length;
          return fieldDBIDB.create(
            {transcription: 'dog', translation: 'chien'},
            createHandler, {storeName: 'forms'});
        }
      }
      );

      // Store created form, create another
      var createHandler = _.extend((clone(optimistHandler)), {
        onsuccess: formObject => {
          expect(formObject.transcription).to.equal('dog');
          return fieldDBIDB.create(
            {transcription: 'cat', translation: 'chat'},
            createHandler2, {storeName: 'forms'});
        }
      }
      );

      // Store created form, request all again
      var createHandler2 = _.extend((clone(optimistHandler)), {
        onsuccess: formObject => {
          expect(formObject.transcription).to.equal('cat');
          return fieldDBIDB.index(indexHandler2, {storeName: 'forms'});
        }
      }
      );

      // Count forms now, request delete
      var indexHandler2 = _.extend((clone(optimistHandler)), { 
        onsuccess: formsArray => {
          this.afterCreateCount = formsArray.length;
          expect(this.afterCreateCount - this.initialCount).to.equal(2);
          return done();
        }
      }
      );

      // Start by requesting all forms
      return fieldDBIDB.index(indexHandler, {storeName: 'forms'});
    });

    it('can retrieve a specific form', function(done) {

      // Count forms initially, request create
      const indexHandler = _.extend((clone(optimistHandler)), {
        onsuccess: formsArray => {
          this.initialCount = formsArray.length;
          return fieldDBIDB.create(
            {transcription: 'dog', translation: 'chien'},
            createHandler, {storeName: 'forms'});
        }
      }
      );

      // Store created form, create another
      var createHandler = _.extend((clone(optimistHandler)), {
        onsuccess: formObject => {
          this.firstForm = formObject;
          expect(formObject.transcription).to.equal('dog');
          return fieldDBIDB.create(
            {transcription: 'cat', translation: 'chat'},
            createHandler2, {storeName: 'forms'});
        }
      }
      );

      // Store created form, retrieve the first one created
      var createHandler2 = _.extend((clone(optimistHandler)), {
        onsuccess: formObject => {
          expect(formObject.transcription).to.equal('cat');
          return fieldDBIDB.show(this.firstForm.id, showHandler, {storeName: 'forms'});
        }
      }
      );

      // Expect correct form to have been retrieved
      var showHandler = _.extend((clone(optimistHandler)), {
        onsuccess: form => {
          expect(form.transcription).to.equal(this.firstForm.transcription);
          return done();
        }
      }
      );

      // Start by requesting all forms
      return fieldDBIDB.index(indexHandler, {storeName: 'forms'});
    });

    it('can update a form', function(done) {

      // Store created form, then update it
      const createHandler = _.extend((clone(optimistHandler)), {
        onsuccess: formObject => {
          this.initialForm = formObject;
          expect(formObject.transcription).to.equal('our form');
          return fieldDBIDB.index(indexHandler, {storeName: 'forms'});
        }
      }
      );

      // Count forms, request update
      var indexHandler = _.extend((clone(optimistHandler)), {
        onsuccess: formsArray => {
          this.afterCreateCount = formsArray.length;
          const updatedForm = _.extend(this.initialForm, {transcription: 'our form modified'});
          return fieldDBIDB.update(this.initialForm.id, updatedForm, updateHandler,
            {storeName: 'forms'});
        }
      }
      );

      // Request form count
      var updateHandler = _.extend((clone(optimistHandler)), {
        onsuccess: updatedFormObject => {
          expect(updatedFormObject.transcription).to.equal('our form modified');
          return fieldDBIDB.index(indexHandler2, {storeName: 'forms'});
        }
      }
      );

      // Verify form count has not changed
      var indexHandler2 = _.extend((clone(optimistHandler)), {
        onsuccess: formsArray => {
          expect(formsArray.length).to.equal(this.afterCreateCount);
          return done();
        }
      }
      );

      // Start by creating a form
      return fieldDBIDB.create(
        {transcription: 'our form', translation: 'notre forme'},
        createHandler,
        {storeName: 'forms'}
      );
    });

    it('can delete a form', function(done) {

      // Count forms initially, request create
      const indexHandler = _.extend((clone(optimistHandler)), {
        onsuccess: formsArray => {
          this.initialCount = formsArray.length;
          return fieldDBIDB.create(
            {transcription: 'monkey', translation: 'singe'},
            createHandler,
            {storeName: 'forms'}
          );
        }
      }
      );

      // Store created form, request all forms
      var createHandler = _.extend((clone(optimistHandler)), {
        onsuccess: formObject => {
          this.ourForm = formObject;
          expect(formObject.transcription).to.equal('monkey');
          return fieldDBIDB.index(indexHandler2, {storeName: 'forms'});
        }
      }
      );

      // Count forms now, request delete
      var indexHandler2 = _.extend((clone(optimistHandler)), { 
        onsuccess: formsArray => {
          this.afterCreateCount = formsArray.length;
          return fieldDBIDB.delete(this.ourForm.id, deleteHandler, {storeName: 'forms'});
        }
      }
      );

      // Request form count
      var deleteHandler = _.extend((clone(optimistHandler)), {
        onsuccess: formObject => {
          return fieldDBIDB.index(indexHandler3, {storeName: 'forms'});
        }
      }
      );

      // Verify counts
      var indexHandler3 = _.extend((clone(optimistHandler)), {
        onsuccess: formsArray => {
          expect(this.initialCount + 1).to.equal(this.afterCreateCount);
          expect(this.afterCreateCount - 1).to.equal(formsArray.length);
          expect(this.initialCount).to.equal(formsArray.length);
          return done();
        }
      }
      );

      // Start by requesting all forms
      return fieldDBIDB.index(indexHandler, {storeName: 'forms'});
    });

    return it('can delete all forms', function(done) {

      // Count forms initially, proceed to delete all
      const indexHandler = _.extend((clone(optimistHandler)), {
        onsuccess: formsArray => {
          this.initialCount = formsArray.length;
          this.initialForms = formsArray;
          return deleteAllForms();
        }
      }
      );

      // Delete all, request all
      var deleteAllForms = () => {
        for (let form of Array.from(this.initialForms)) {
          fieldDBIDB.delete(form.id, optimistHandler, {storeName: 'forms'});
        }
        return fieldDBIDB.index(indexHandler2, {storeName: 'forms'});
      };

      // Count forms now, expect none
      var indexHandler2 = _.extend((clone(optimistHandler)), {
        onsuccess: formsArray => {
          expect(formsArray).to.have.length(0);
          return done();
        }
      }
      );

      // Start by requesting all forms
      return fieldDBIDB.index(indexHandler, {storeName: 'forms'});
    });
  });




  return describe('FormStore class', function() {

    const formStore = new FormStore(fieldDBIDB);

    this.timeout(1000);

    // Optimist handler: unbridled success!
    const optimistHandler = {
      onsuccess() {
        return expect(true).to.be.ok;
      },
      onerror() {
        return expect(false).to.be.ok;
      }
    };

    it('can create a form', function(done) {

      const createHandler = _.extend((clone(optimistHandler)), {
        onsuccess(formObject) {
          expect(formObject.transcription).to.equal('monkey');
          return done();
        }
      }
      );

      return formStore.create(
        {transcription: 'monkey', translation: 'singe'},
        createHandler
      );
    });

    it('can retrieve all forms', function(done) {

      // Count forms initially, request create
      const indexHandler = _.extend((clone(optimistHandler)), {
        onsuccess: formsArray => {
          this.initialCount = formsArray.length;
          return formStore.create(
            {transcription: 'dog', translation: 'chien'},
            createHandler);
        }
      }
      );

      // Store created form, create another
      var createHandler = _.extend((clone(optimistHandler)), {
        onsuccess: formObject => {
          expect(formObject.transcription).to.equal('dog');
          return formStore.create(
            {transcription: 'cat', translation: 'chat'},
            createHandler2);
        }
      }
      );

      // Store created form, request all again
      var createHandler2 = _.extend((clone(optimistHandler)), {
        onsuccess: formObject => {
          expect(formObject.transcription).to.equal('cat');
          return formStore.index(indexHandler2);
        }
      }
      );

      // Count forms now, request delete
      var indexHandler2 = _.extend((clone(optimistHandler)), { 
        onsuccess: formsArray => {
          this.afterCreateCount = formsArray.length;
          expect(this.afterCreateCount - this.initialCount).to.equal(2);
          return done();
        }
      }
      );

      // Start by requesting all forms
      return formStore.index(indexHandler);
    });

    it('can retrieve a specific form', function(done) {

      // Count forms initially, request create
      const indexHandler = _.extend((clone(optimistHandler)), {
        onsuccess: formsArray => {
          this.initialCount = formsArray.length;
          return formStore.create(
            {transcription: 'dog', translation: 'chien'},
            createHandler);
        }
      }
      );

      // Store created form, create another
      var createHandler = _.extend((clone(optimistHandler)), {
        onsuccess: formObject => {
          this.firstForm = formObject;
          expect(formObject.transcription).to.equal('dog');
          return formStore.create(
            {transcription: 'cat', translation: 'chat'},
            createHandler2);
        }
      }
      );

      // Store created form, retrieve the first one created
      var createHandler2 = _.extend((clone(optimistHandler)), {
        onsuccess: formObject => {
          expect(formObject.transcription).to.equal('cat');
          return formStore.show(this.firstForm.id, showHandler);
        }
      }
      );

      // Expect correct form to have been retrieved
      var showHandler = _.extend((clone(optimistHandler)), {
        onsuccess: form => {
          expect(form.transcription).to.equal(this.firstForm.transcription);
          return done();
        }
      }
      );

      // Start by requesting all forms
      return formStore.index(indexHandler);
    });

    it('can update a form', function(done) {

      // Store created form, then update it
      const createHandler = _.extend((clone(optimistHandler)), {
        onsuccess: formObject => {
          this.initialForm = formObject;
          expect(formObject.transcription).to.equal('our form');
          return formStore.index(indexHandler);
        }
      }
      );

      // Count forms, request update
      var indexHandler = _.extend((clone(optimistHandler)), {
        onsuccess: formsArray => {
          this.afterCreateCount = formsArray.length;
          const updatedForm = _.extend(this.initialForm, {transcription: 'our form modified'});
          return formStore.update(this.initialForm.id, updatedForm, updateHandler);
        }
      }
      );

      // Request form count
      var updateHandler = _.extend((clone(optimistHandler)), {
        onsuccess: updatedFormObject => {
          expect(updatedFormObject.transcription).to.equal('our form modified');
          return formStore.index(indexHandler2);
        }
      }
      );

      // Verify form count has not changed
      var indexHandler2 = _.extend((clone(optimistHandler)), {
        onsuccess: formsArray => {
          expect(formsArray.length).to.equal(this.afterCreateCount);
          return done();
        }
      }
      );

      // Start by creating a form
      return formStore.create(
        {transcription: 'our form', translation: 'notre forme'},
        createHandler
      );
    });

    it('can delete a form', function(done) {

      // Count forms initially, request create
      const indexHandler = _.extend((clone(optimistHandler)), {
        onsuccess: formsArray => {
          this.initialCount = formsArray.length;
          return formStore.create(
            {transcription: 'monkey', translation: 'singe'},
            createHandler
          );
        }
      }
      );

      // Store created form, request all forms
      var createHandler = _.extend((clone(optimistHandler)), {
        onsuccess: formObject => {
          this.ourForm = formObject;
          expect(formObject.transcription).to.equal('monkey');
          return formStore.index(indexHandler2);
        }
      }
      );

      // Count forms now, request delete
      var indexHandler2 = _.extend((clone(optimistHandler)), { 
        onsuccess: formsArray => {
          this.afterCreateCount = formsArray.length;
          return formStore.delete(this.ourForm.id, deleteHandler);
        }
      }
      );

      // Request form count
      var deleteHandler = _.extend((clone(optimistHandler)), {
        onsuccess: formObject => {
          return formStore.index(indexHandler3);
        }
      }
      );

      // Verify counts
      var indexHandler3 = _.extend((clone(optimistHandler)), {
        onsuccess: formsArray => {
          expect(this.initialCount + 1).to.equal(this.afterCreateCount);
          expect(this.afterCreateCount - 1).to.equal(formsArray.length);
          expect(this.initialCount).to.equal(formsArray.length);
          return done();
        }
      }
      );

      // Start by requesting all forms
      return formStore.index(indexHandler);
    });

    return it('can delete all forms', function(done) {

      // Count forms initially, proceed to delete all
      const indexHandler = _.extend((clone(optimistHandler)), {
        onsuccess: formsArray => {
          this.initialCount = formsArray.length;
          this.initialForms = formsArray;
          return deleteAllForms();
        }
      }
      );

      // Delete all, request all
      var deleteAllForms = () => {
        for (let form of Array.from(this.initialForms)) {
          formStore.delete(form.id, optimistHandler);
        }
        return formStore.index(indexHandler2);
      };

      // Count forms now, expect none
      var indexHandler2 = _.extend((clone(optimistHandler)), {
        onsuccess: formsArray => {
          expect(formsArray).to.have.length(0);
          return done();
        }
      }
      );

      // Start by requesting all forms
      return formStore.index(indexHandler);
    });
  });
});

