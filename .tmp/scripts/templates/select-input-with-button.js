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
      var i, len, ref, selectOption;
    
      _print(_safe('<select\n  name=\''));
    
      _print(this.name);
    
      _print(_safe('\'\n  class=\''));
    
      _print(this["class"]);
    
      _print(_safe('\n         select-with-button\n         dative-tooltip\'\n  title=\''));
    
      _print(this.title);
    
      _print(_safe('\'>\n  '));
    
      if (!this.required) {
        _print(_safe('\n    <option></option>\n  '));
      }
    
      _print(_safe('\n  '));
    
      ref = this.selectOptions;
      for (i = 0, len = ref.length; i < len; i++) {
        selectOption = ref[i];
        _print(_safe('\n    '));
        if (this.selectValueGetter(selectOption) === this.selectValueGetter(this.value)) {
          _print(_safe('\n      <option value="'));
          _print(this.selectValueGetter(selectOption));
          _print(_safe('" selected\n        >'));
          _print(this.selectTextGetter(selectOption));
          _print(_safe('</option>\n    '));
        } else {
          _print(_safe('\n      <option value="'));
          _print(this.selectValueGetter(selectOption));
          _print(_safe('"\n        >'));
          _print(this.selectTextGetter(selectOption));
          _print(_safe('</option>\n    '));
        }
        _print(_safe('\n  '));
      }
    
      _print(_safe('\n</select>\n\n<button\n    class=\''));
    
      _print(this.buttonClass);
    
      _print(_safe('\n           dative-tooltip\'\n    title=\''));
    
      _print(this.buttonTooltip);
    
      _print(_safe('\'\n    ><i class=\'fa fa-fw '));
    
      _print(this.buttonIconClass);
    
      _print(_safe('\'></i></button>\n\n'));
    
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
