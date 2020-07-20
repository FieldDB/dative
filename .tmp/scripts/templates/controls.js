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
      _print(_safe('<div class="dative-widget-header ui-widget-header ui-corner-top">\n\n  <div class=\'dative-widget-header-title container-center\'\n    >'));
    
      _print(this.headerTitle);
    
      _print(_safe('</div>\n\n  <div class=\'button-container-left\'>\n\n    <button class="hide-controls-widget dative-tooltip"\n            title="hide this '));
    
      _print(this.resourceNameHumanReadable);
    
      _print(_safe(' controls widget">\n      <i class=\'fa fa-times fa-fw\'></i>\n    </button>\n\n  </div>\n\n  <div class=\'button-container-right\'>\n\n    <span class="spinner-container"></span>\n\n    <button class=\'controls-help dative-tooltip\'\n            title=\'help with using the controls of this\n              '));
    
      _print(this.resourceNameHumanReadable);
    
      _print(_safe('\'\n    ><i class=\'fa fa-fw fa-question\'></i>\n    </button>\n\n  </div>\n\n</div>\n\n<div class="dative-widget-body">\n\n  <div class="controls-container"></div>\n\n</div>\n\n\n'));
    
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
