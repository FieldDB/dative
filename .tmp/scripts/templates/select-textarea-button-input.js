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
    
      _print(this.selectName);
    
      _print(_safe('\'\n  class=\''));
    
      _print(this.selectClass);
    
      _print(_safe('\'\n  title=\''));
    
      _print(this.selectTitle);
    
      _print(_safe('\'>\n  <option></option>\n  '));
    
      ref = this.options[this.selectOptionsAttribute] || [];
      for (i = 0, len = ref.length; i < len; i++) {
        selectOption = ref[i];
        _print(_safe('\n    '));
        if (selectOption === this.selectValue) {
          _print(_safe('\n      <option value="'));
          _print(selectOption);
          _print(_safe('" selected>'));
          _print(selectOption);
          _print(_safe('</option>\n    '));
        } else {
          _print(_safe('\n      <option value="'));
          _print(selectOption);
          _print(_safe('">'));
          _print(selectOption);
          _print(_safe('</option>\n    '));
        }
        _print(_safe('\n  '));
      }
    
      _print(_safe('\n</select>\n\n<textarea\n  rows=\'1\'\n  name=\''));
    
      _print(this.textareaName);
    
      _print(_safe('\'\n  class=\''));
    
      _print(this.textareaClass);
    
      _print(_safe('\n         ui-corner-all\n         form-add-input\n         dative-tooltip\n         dative-input-field\n         textarea-select-button\'\n  title=\''));
    
      _print(this.textareaTitle);
    
      _print(_safe('\'\n  >'));
    
      _print(this.textareaValue);
    
      _print(_safe('</textarea>\n\n<button\n  class=\''));
    
      _print(this.buttonClass);
    
      _print(_safe('\n         dative-tooltip\n         new-remove\'\n  title=\''));
    
      _print(this.buttonTitle);
    
      _print(_safe('\'\n><i\n  class=\'fa\n         fa-fw\n         '));
    
      _print(this.buttonIconClass);
    
      _print(_safe('\'\n></i\n></button>\n\n'));
    
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
