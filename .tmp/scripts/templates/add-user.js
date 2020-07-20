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
      _print(_safe('  <div class="dative-widget-header ui-widget-header ui-corner-top">\n\n    <div class=\'dative-widget-header-title\'>Grant a user access to this\n    corpus</div>\n\n  </div>\n\n  <div class="dative-widget-body">\n\n    <ul class="fieldset">\n\n      <li>\n        <label for=\'role\'>Role</label>\n        <select name=\'role\'>\n          <option value=\'reader\'>Reader</option>\n          <option value=\'writer\'>Writer</option>\n          <option value=\'admin\'>Admin</option>\n        </select>\n        <div class=\'dative-add-user-failed-container\'>\n          <span class=\'ui-state-error ui-corner-all dative-add-user-failed\n            role-error\'></span>\n        </div>\n      </li>\n\n      <li>\n        <label for=\'username\'>Username</label>\n        <input type=\'text\' name=\'username\' class=\'dative-tooltip ui-corner-all\'\n          title=\'enter the username of an existing user; the form will autocomplete\n          with the usernames of existing users\' />\n        <div class=\'dative-add-user-failed-container\'>\n          <span class=\'ui-state-error ui-corner-all dative-add-user-failed\n            username-error\'></span>\n        </div>\n      </li>\n\n      <li>\n        <label for=\'username\'></label>\n        <button class=\'request-add-user dative-tooltip\'\n          title=\'request that this user be added to this corpus with the specified role\'\n          >Add User</button>\n      </li>\n\n    </ul>\n\n  </div>\n\n'));
    
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
