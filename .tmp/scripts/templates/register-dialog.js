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
      _print(_safe('<div class=\'dative-register-dialog\'>\n  <form action=\'register\' method=\'post\' class=\'registerForm\'>\n    <ul class=\'fieldset\'>\n\n      <li class="active-server"></li>\n\n      <li class=\'fielddb\'>\n        <label for=\'username\'>Username *</label>\n        <input type=\'text\' name=\'username\' class=\'username dative-tooltip ui-corner-all\'\n          title=\'enter the username for your new account\'\n          tabindex=0 id="big" />\n        <span class=\'dative-register-validation ui-state-error ui-corner-all\n          username-validation\'></span>\n      </li>\n\n      <li class=\'fielddb\'>\n        <label for=\'password\'>Password *</label>\n        <input type=\'password\' name=\'password\' class=\'password dative-tooltip ui-corner-all\'\n          title=\'enter a password for your new account\' tabindex=0 />\n        <span class=\'ui-state-error ui-corner-all dative-register-validation\n          password-validation\'></span>\n      </li>\n\n      <li class=\'fielddb\'>\n        <label for=\'passwordConfirm\'>Confirm password *</label>\n        <input type=\'password\' name=\'passwordConfirm\' class=\'passwordConfirm dative-tooltip ui-corner-all\'\n          title=\'repeat your new password (to make sure it is right)\' tabindex=0 />\n        <span class=\'ui-state-error ui-corner-all dative-register-validation\n          passwordConfirm-validation\'></span>\n      </li>\n\n      <li class=\'fielddb\'>\n        <label for=\'email\'>E-mail *</label>\n        <input type=\'text\' name=\'email\' class=\'email dative-tooltip ui-corner-all\'\n          title=\'enter your email address\' tabindex=0 />\n        <span class=\'ui-state-error ui-corner-all dative-register-validation\n          email-validation\'></span>\n      </li>\n\n      <li class=\'old register-info\'>\n        <span>OLD web services do not allow self-registration. To register,\n        please contact an administrator of a particular OLD web service (or set\n        up your own OLD). See the <a\n        href="http://www.onlinelinguisticdatabase.org/">OLD website</a> to find\n        an administrator. Read the <a\n        href="http://online-linguistic-database.readthedocs.org/en/latest/"\n        >documentation</a> to set up an OLD.</span>\n      </li>\n\n      <li class=\'none register-info\'>\n        <span>Please select a FieldDB web server to register with.</span>\n      </li>\n\n    </ul>\n  </form>\n</div>\n\n<div class=\'dative-register-dialog-target\'><div>\n\n\n'));
    
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
