/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
define(function(require) {

  const BaseModel = require('../../../scripts/models/base');

  return describe('Base Model', function() {

    before(function() {
      // Stub XHR: see http://sinonjs.org/docs/#server
      this.xhr = sinon.useFakeXMLHttpRequest();
      const requests = (this.requests = []);
      return this.xhr.onCreate = xhr => requests.push(xhr);
    });

    beforeEach(function() {
      return this.baseModel = new BaseModel();
    });

    after(function() {
      return this.xhr.restore();
    });

    return it('can perform a CORS request', function() {
      const onload = sinon.spy();
      const onerror = sinon.spy();
      const url = 'http://www.google.com';
      expect(this.requests).to.have.length(0);
      this.baseModel.cors({
        url,
        onload,
        onerror
      });
      expect(this.requests).to.have.length(1);
      const request = this.requests[0];
      expect(request.method).to.equal('GET');
      expect(request.requestBody).to.be.null;
      expect(request.withCredentials).to.be.true;
      expect(request.url).to.equal(url);

      let msg = {msg: 'a JSON message from Google!'};
      this.requests[this.requests.length - 1].respond(200,
        {"Content-Type": "application/json"},
        JSON.stringify(msg));
      expect(onload).to.have.been.calledOnce;
      expect(onerror).not.to.have.been.called;
      expect(onload).to.have.been.calledWith(msg); // BaseModel._jsonify turns this into an object.

      this.baseModel.cors({
        url,
        onload,
        onerror
      });

      // Note that the `onerror` callback is NOT called with a 4/500 status code...
      // Here I make the response return invalid JSON. The _jsonify wrapper in
      // base.js handles this by passing on the response body as is.
      msg = JSON.stringify({msg: 'failface'}).slice(0, +-3 + 1 || undefined);
      this.requests[this.requests.length - 1].respond(500,
        {"Content-Type": "application/json"},
        msg);
      expect(onload).to.have.been.calledTwice;
      expect(onload).to.have.been.calledWith(msg);
      return expect(onerror).not.to.have.been.called;
    });
  });
});

