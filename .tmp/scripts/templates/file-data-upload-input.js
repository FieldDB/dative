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
      _print(_safe('<button\n    class=\''));
    
      _print(this["class"]);
    
      _print(_safe('\n        ui-corner-all\n        form-add-input\n        dative-tooltip\n        dative-input-field\'\n    title=\''));
    
      _print(this.title);
    
      _print(_safe('\'\n    >Choose file<i\n        class=\'fa fa-fw fa-upload\'></i></button>\n\n<div class=\'file-upload-container\'>\n    <div class=\'file-upload-status\'>Uploading file data ...</div>\n    <div class=\'file-upload-progress-bar\'></div>\n</div>\n\n\n<!-- this is the hidden input tag -->\n<div\n    style=\'height: 0px;width:0px; overflow:hidden;\'\n    ><input\n        type="file"\n        name=\'file-upload-input\'\n        tabindex=\'999\'\n        /></div>\n\n'));
    
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
