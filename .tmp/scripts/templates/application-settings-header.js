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
      var activeServer, corpus, i, j, len, len1, ref, ref1, s, server;
    
      _print(_safe('<div class=\'dative-page-header ui-widget-header ui-corner-top\'>\n  <div class=\'dative-page-header-title\'>'));
    
      _print(this.headerTitle);
    
      _print(_safe('</div>\n  <div class=\'dative-page-header-widgets\'>\n    <button class="float-left edit" title="edit"></span>\n    <button class="float-left save" title="save"></span>\n  </div>\n</div>\n<div class=\'dative-page-body\'>\n\n\n\n<form id="applicationSettingsForm" action="" method="" class="applicationSettingsForm">\n  <ul class="fieldset">\n\n    '));
    
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
    
      _print(_safe('</div>\n    </li>\n    -->\n\n  </ul>\n\n\n</form>\n\n\n\n\n\n\n\n\n\n\n\n\n\n</div>\n\n\n'));
    
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
