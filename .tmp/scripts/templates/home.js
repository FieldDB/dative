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
      _print(_safe('<div class=\'dative-page-header ui-widget-header ui-corner-top\'>\n\n    '));
    
      if (this.header) {
        _print(_safe('\n        <div class=\'dative-page-header-title\'>'));
        _print(this.header);
        _print(_safe('</div>\n    '));
      } else {
        _print(_safe('\n        <div class=\'dative-page-header-title\'>Dative Home Page</div>\n    '));
      }
    
      _print(_safe('\n\n</div>\n\n<div class=\'dative-page-body large-unicode-font\'>\n    '));
    
      if (this.html) {
        _print(_safe('\n        <div class=\'html-snippet homepage\'>\n            '));
        _print(_safe(this.html));
        _print(_safe('\n        </div>\n    '));
      } else {
        _print(_safe('\n        <p class=\'paragraph-widget ui-corner-all\'>Welcome to Dative, an\n            application for linguistic fieldwork.</p>\n    '));
      }
    
      _print(_safe('\n</div>\n\n\n'));
    
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
