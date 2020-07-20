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
      _print(_safe('<textarea\n    rows=\'1\'\n    name=\''));
    
      _print(this.textareaName);
    
      _print(_safe('\'\n    class=\'ui-corner-all\n           form-add-input\n           dative-tooltip\n           dative-input-field\n           control-input\'\n    title=\''));
    
      _print(this.textareaTitle);
    
      _print(_safe('\'\n></textarea>\n<button\n    class=\''));
    
      _print(this.buttonClass);
    
      _print(_safe(' align-top dative-tooltip\'\n    title=\''));
    
      _print(this.buttonTitle);
    
      _print(_safe('\'\n>'));
    
      _print(this.buttonText);
    
      _print(_safe('</button>\n<div class=\''));
    
      _print(this.resultsContainerClass);
    
      _print(_safe('\'></div>\n\n'));
    
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
