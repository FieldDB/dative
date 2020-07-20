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
      _print(_safe('<div class="servers-config-widget dative-widget-center ui-widget\n  ui-widget-content ui-corner-all">\n\n  <div class="dative-widget-header header-no-body ui-corner-bottom ui-widget-header\n    ui-corner-top dative-tooltip">\n\n    <div class=\'dative-widget-header-title\'>Servers</div>\n\n    <div class=\'button-container-left\'>\n\n      '));
    
      if (this.hideable) {
        _print(_safe('\n        <button class="toggle-appear dative-tooltip" title="show servers">\n            <i class=\'fa fa-caret-right fa-fw\'></i>\n        </button>\n      '));
      }
    
      _print(_safe('\n\n      <button class="add-server dative-tooltip" title="create a new server">\n        <i class=\'fa fa-plus fa-fw\'></i>\n      </button>\n\n    </div>\n\n    <div class=\'button-container-right\'>\n\n      <button class="servers-help dative-tooltip" title="Help with servers">\n        <i class=\'fa fa-question fa-fw\'></i>\n      </button>\n\n    </div>\n\n  </div>\n\n  <div class="dative-widget-body">\n    <div class="no-servers-msg">There are no server configurations.</div>\n  </div>\n\n</div>\n\n'));
    
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
