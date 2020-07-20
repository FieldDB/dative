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
      _print(_safe('<div class=\'dative-login-dialog\'>\n\n  <ul class=\'fieldset\'>\n\n    <li class="active-server"></li>\n\n    <li>\n      <label for=\'username\'>Username</label>\n      <input type=\'text\' name=\'username\' class=\'username dative-tooltip ui-corner-all\'\n        title="enter your username" tabindex=0 id="big" />\n      <span class=\'ui-state-error ui-corner-all dative-login-failed\n        username-error\'></span>\n    </li>\n\n    <li>\n      <label for=\'password\'>Password</label>\n      <input type=\'password\' name=\'password\' class=\'password dative-tooltip ui-corner-all\'\n        title="enter your password" tabindex=0 />\n      <span class=\'ui-state-error ui-corner-all dative-login-failed\n        password-error\'></span>\n    </li>\n\n  </ul>\n\n</div>\n\n<div class=\'dative-login-dialog-target\'><div>\n\n'));
    
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
