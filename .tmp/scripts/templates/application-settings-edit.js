define(function(){
  var template = function(__obj) {
  var _safe = function(value) {
    if (typeof value === 'undefined' && value == null)
      value = '';
    var result = new String(value);
    result.ecoSafe = true;
    return result;
  };
  return (function() {
    var __out = [], __self = this, _print = function(value) {
      if (typeof value !== 'undefined' && value != null)
        __out.push(value.ecoSafe ? value : __self.escape(value));
    }, _capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return _safe(result);
    };
    (function() {
      var activeServer, corpus, i, j, k, len, len1, len2, ref, ref1, ref2, s, server;
    
      _print(_safe('<form id="applicationSettingsForm" action="" method="" class="applicationSettingsForm">\n  <ul class="fieldset">\n\n    '));
    
      activeServer = ((function() {
        var i, len, ref, results;
        ref = this.servers;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          s = ref[i];
          if (s.url === this.activeServer) {
            results.push(s);
          }
        }
        return results;
      }).call(this))[0];
    
      _print(_safe('\n\n    <li class="serverSelect">\n      <label for="activeServer">Active Server *</label>\n      <select name="activeServer" class="activeServer">\n      '));
    
      if (!this.servers.length) {
        _print(_safe('\n        <option value="noServer">configure a server in Application\n          Settings</option>\n      '));
      } else {
        _print(_safe('\n        '));
        ref = this.servers;
        for (i = 0, len = ref.length; i < len; i++) {
          server = ref[i];
          _print(_safe('\n          <option value="'));
          _print(server.url);
          _print(_safe('">'));
          _print(server.name);
          _print(_safe('</option>\n        '));
        }
        _print(_safe('\n      '));
      }
    
      _print(_safe('\n      </select>\n    </li>\n\n    <li class="corpusSelect">\n      <label for="corpus">Corpus</label>\n      <select name="corpus" class="corpus">\n      '));
    
      if (!activeServer.corpora.length) {
        _print(_safe('\n        <option value="noCorpus">login to access corpus list</option>\n      '));
      } else {
        _print(_safe('\n        '));
        ref1 = activeServer.corpora;
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          corpus = ref1[j];
          _print(_safe('\n            <option value="'));
          _print(corpus);
          _print(_safe('">'));
          _print(corpus);
          _print(_safe('</option>\n        '));
        }
        _print(_safe('\n      '));
      }
    
      _print(_safe('\n      </select>\n    </li>\n\n    <!--\n    <li>\n      <label for="loggedIn">Logged in</label>\n      <div class="dative-display">'));
    
      _print(this.loggedIn);
    
      _print(_safe('</div>\n    </li>\n\n    <li>\n      <label for="username">Username</label>\n      <div class="dative-display">'));
    
      _print(this.username);
    
      _print(_safe('</div>\n    </li>\n    -->\n\n  </ul>\n\n  <div class="dative-widget-center server-config-widget ui-widget\n    ui-widget-content ui-corner-all">\n\n    <div class="ui-widget-header ui-corner-top dative-widget-header">\n\n      <div class=\'dative-widget-header-title\'>Servers</div>\n\n      <button class="float-left toggle-appear"></button>\n      <button class="float-left add-server" title="new server"></button>\n      <button class="float-left save-server" title="save server"></button>\n\n    </div>\n\n    <div class="buffer" style="height:10px;"></div>\n\n    <div class="server-config-widget-body dative-widget-body">\n\n      <ul class="fieldset">\n\n        <li>\n          '));
    
      ref2 = this.servers;
      for (k = 0, len2 = ref2.length; k < len2; k++) {
        server = ref2[k];
        _print(_safe('\n            <ul class="fieldset">\n              <li>\n                <label for="name">Name</label>\n                <input type="text" name="name" class="dative-input\n                  dative-input-display" value="'));
        _print(server.name);
        _print(_safe('" />\n              </li>\n              <li>\n                <label for="url">URL</label>\n                <input type="text" name="url" class="dative-input\n                  dative-input-display" value="'));
        _print(server.url);
        _print(_safe('" />\n              </li>\n              <li>\n                <label for="type">Type</label>\n                <input type="text" name="type" class="dative-input\n                  dative-input-display" value="'));
        _print(server.type);
        _print(_safe('" />\n              </li>\n            </ul>\n          '));
      }
    
      _print(_safe('\n        </li>\n      </ul>\n    </div>\n  </div>\n\n</form>\n\n'));
    
    }).call(this);
    
    return __out.join('');
  }).call((function() {
    var obj = {
      escape: function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      },
      safe: _safe
    }, key;
    for (key in __obj) obj[key] = __obj[key];
    return obj;
  })());
};
  return template;
});
