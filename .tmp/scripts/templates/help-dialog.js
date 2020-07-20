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
      _print(_safe('<div class=\'dative-help-dialog\'>\n\n  <div class="help-search-container">\n\n    <label for="help-search">\n      <i class="fa fa-search black-fa"></i>\n    </label>\n\n    <input class="ui-corner-all dative-tooltip" type="text" name="help-search"\n      title="Search through the help text" spellcheck="false" />\n\n  </div>\n\n  <div class="help-search-spacer"></div>\n\n  <div class="help-content-container">\n    <div class="help-content"></div>\n  </div>\n\n</div>\n\n<div class=\'dative-help-dialog-target\'><div>\n\n'));
    
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
