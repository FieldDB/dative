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
      _print(_safe('<div id=\'mainmenu\'></div>\n<div id=\'progress-widget-container\'></div>\n<div id=\'notifier-container\'></div>\n<div id=\'appview\' class=\'ui-widget ui-widget-content ui-corner-all\'></div>\n<div id=\'login-dialog-container\'></div>\n<div id=\'register-dialog-container\'></div>\n<div id=\'alert-dialog-container\'></div>\n<div id=\'tasks-dialog-container\'></div>\n<div id=\'help-dialog-container\'></div>\n<div id=\'exporter-dialog-container\'></div>\n<div id=\'importer-dialog-container\'></div>\n<div id=\'resources-dialog-container\'></div>\n<div id=\'resource-displayer-dialog-container-1\'></div>\n<div id=\'resource-displayer-dialog-container-2\'></div>\n<div id=\'resource-displayer-dialog-container-3\'></div>\n<div id=\'resource-displayer-dialog-container-4\'></div>\n\n'));
    
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
