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
      _print(_safe('<form class="applicationSettingsForm">\n  <ul class="fieldset">\n\n    <li>\n      <label for="serverType">Server type</label>\n      <div class="dative-display dative-input-display">'));
    
      _print(this.serverType);
    
      _print(_safe('</div>\n    </li>\n\n    <li class="corpusSelect">\n      <label for="corpus">Corpus</label>\n      <div class="dative-display dative-input-display"\n        >'));
    
      _print(this.corpus || 'no corpus selected');
    
      _print(_safe('</div>\n    </li>\n\n    <li>\n      <label for="serverURL">Server URL</label>\n      <div class="dative-display dative-input-display">'));
    
      _print(this.serverURL);
    
      _print(_safe('</div>\n    </li>\n\n    <li>\n      <label for="serverPort">Server port</label>\n      <div class="dative-display dative-input-display">'));
    
      _print(this.serverPort);
    
      _print(_safe('</div>\n    </li>\n\n    <li>\n      <label for="loggedIn">Logged in</label>\n      <div class="dative-display">'));
    
      _print(this.loggedIn);
    
      _print(_safe('</div>\n    </li>\n\n    <li>\n      <label for="username">Username</label>\n      <div class="dative-display">'));
    
      _print(this.username);
    
      _print(_safe('</div>\n    </li>\n\n    <li class="center">\n      <button class="edit">Edit</button>\n    </li>\n\n  </ul>\n</form>\n\n'));
    
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
