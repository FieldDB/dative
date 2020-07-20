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
      var attribute, class_, ref, value;
    
      class_ = this.isHeaderRow ? 'header' : 'field';
    
      _print(_safe('\n\n'));
    
      if (!this.isHeaderRow) {
        _print(_safe('\n<div class=\'resource-as-row-cell controls-header\'>\n\n    <button class="select dative-tooltip"\n            title="select this '));
        _print(this.resourceNameHumanReadable());
        _print(_safe('"\n            >select</i>\n    </button>\n\n    <button class="view dative-tooltip"\n            title="view this '));
        _print(this.resourceNameHumanReadable());
        _print(_safe(' in more detail"\n            >view</i>\n    </button>\n\n</div>\n'));
      } else {
        _print(_safe('\n<div class=\'resource-as-row-cell\n            text\n            controls-header\n            '));
        _print(class_);
        _print(_safe('\'\n    >Controls</div>\n'));
      }
    
      _print(_safe('\n\n'));
    
      ref = this.model;
      for (attribute in ref) {
        value = ref[attribute];
        _print(_safe('\n<div class=\'resource-as-row-cell\n            text\n            '));
        _print(class_);
        _print(_safe('\n            resource-as-row-attr-'));
        _print(attribute);
        _print(_safe('\'\n    >'));
        _print(_safe(value));
        _print(_safe('</div>\n'));
      }
    
      _print(_safe('\n'));
    
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
