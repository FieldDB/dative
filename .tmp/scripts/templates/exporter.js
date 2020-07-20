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
      _print(_safe('<div class=\'exporter\'>\n\n    <div class=\'exporter-interface\'>\n\n        <div class=\'exporter-meta\'>\n            <h1 class=\'exporter-title\'>'));
    
      _print(this.title);
    
      _print(_safe('</h1>\n            <div class=\'exporter-description\'>'));
    
      _print(_safe(this.description));
    
      _print(_safe('</div>\n        </div>\n\n        <div class=\'exporter-controls\'>\n            '));
    
      if (this.hasSettings) {
        _print(_safe('\n                <button class=\'exporter-settings-button dative-tooltip\'\n                    title=\'Reveal/hide settings for configuring this export\'\n                    ><i class=\'fa fa-fw fa-cogs\'></i></button>\n            '));
      }
    
      _print(_safe('\n            <button class=\'export dative-tooltip\'\n                title=\'Generate an export using this exporter\'\n                >Export</button>\n        </div>\n\n        <div class=\'exporter-settings\'></div>\n\n    </div>\n\n    <div class=\'exporter-export-content-container\'>\n\n        <div class=\'exporter-export-content-pre-container ui-corner-all\'>\n            <div class=\'exporter-export-content\'></div>\n        </div>\n\n        <div class=\'exporter-export-controls\'></div>\n\n    </div>\n\n</div>\n\n'));
    
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
