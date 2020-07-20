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
      var i, len, object, ref;
    
      _print(_safe('<ul\n    title=\''));
    
      _print(this.title);
    
      _print(_safe('\'\n    class=\''));
    
      _print(this["class"]);
    
      _print(_safe('\'>\n    '));
    
      ref = this.value;
      for (i = 0, len = ref.length; i < len; i++) {
        object = ref[i];
        _print(_safe('\n        <li>'));
        _print(object.name);
        _print(_safe('</li>\n    '));
      }
    
      _print(_safe('\n</ul>\n\n'));
    
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
