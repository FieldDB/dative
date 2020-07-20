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
      _print(_safe('<div\n  class=\''));
    
      _print(this["class"]);
    
      _print(_safe('\'\n  ><span\n    class=\''));
    
      _print(this.textClass);
    
      _print(_safe('\'\n    >'));
    
      _print(this.textValue);
    
      _print(_safe('</span>\n  (By\n  <span\n    class=\''));
    
      _print(this.usernameClass);
    
      _print(_safe('\'\n    >'));
    
      _print(this.usernameValue);
    
      _print(_safe('</span>\n  <span\n    class=\''));
    
      _print(this.timestampClass);
    
      _print(_safe('\n           dative-tooltip\'\n    title=\'This comment was made on '));
    
      _print(this.humanDatetime(this.timestampValue));
    
      _print(_safe('\'\n    >'));
    
      _print(this.timeSince(this.timestampValue));
    
      _print(_safe('</span\n  >)</div>\n\n'));
    
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
