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
      _print(_safe('<div class=\'suggestion-button-container\'>\n    <button class=\'toggle-suggestions dative-tooltip\'\n            title=\'show suggested values for this '));
    
      _print(this.label);
    
      _print(_safe(' field\'\n            tabindex=\'-1\'\n        ><i class=\'fa fa-ellipsis-v\'></i></button>\n</div>\n<div class=\''));
    
      _print(this.fieldLabelContainerClass);
    
      _print(_safe('\'></div>\n<div class=\''));
    
      _print(this.fieldInputContainerClass);
    
      _print(_safe(' with-suggestions\'></div>\n<div class=\'suggestions invisible ui-corner-bottom\'></div>\n<div class=\'dative-field-validation-container\'>\n    <div\n        class=\'ui-state-error\n               ui-corner-all\n               dative-field-validation-error\'\n        ><i class=\'fa fa-fw fa-exclamation-triangle\'></i\n        ><span class=\'dative-field-validation-error-message\'></span></div>\n</div>\n<div class=\'dative-field-warnings-container\' style=\'display: none;\'>\n    <div\n        class=\'ui-state-highlight\n               ui-corner-all\n               dative-field-validation-warning\'\n        ><i class=\'fa fa-fw fa-exclamation-circle\'></i\n        ><span class=\'dative-field-validation-warning-message\'></span></div>\n</div>\n\n'));
    
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
