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
      var activeIndicator;
    
      _print(_safe('\n  <div class="dative-widget-header ui-widget-header ui-corner-top\n    ui-corner-bottom header-no-body">\n\n    '));
    
      activeIndicator = this.isActive ? '(active)' : '';
    
      _print(_safe('\n    <div class=\'dative-widget-header-title\'>\n      '));
    
      _print(this.title);
    
      _print(_safe('\n      <span class="active-indicator">'));
    
      _print(activeIndicator);
    
      _print(_safe('</span>\n    </div>\n\n    <div class=\'button-container-left\'>\n\n      <button class="toggle-appear dative-tooltip"\n        title="show corpus details">\n        <i class="fa fa-caret-right fa-fw"></i>\n      </button>\n\n      <button class="use-corpus dative-tooltip"\n        title="activate this corpus and view its data">\n        <i class="fa fa-toggle-off fa-fw"></i>\n      </button>\n\n      <button class="edit-corpus dative-tooltip"\n        title="show interface for editing the details of this corpus">\n        <i class="fa fa-edit fa-fw"></i>\n      </button>\n\n      <button class="add-user dative-tooltip"\n        title="show interface for managing the users of this corpus">\n        <i class="fa fa-users fa-fw"></i>\n      </button>\n\n    </div>\n\n  </div>\n\n  '));
    
      if (this.isActive) {
        _print(_safe('\n    <div class="dative-widget-body ui-state-highlight ui-corner-bottom">\n  '));
      } else {
        _print(_safe('\n    <div class="dative-widget-body">\n  '));
      }
    
      _print(_safe('\n\n    <div class="edit-corpus-widget ui-widget ui-widget-content\n      dative-widget-center ui-corner-all"></div>\n\n    <div class="add-user-widget ui-widget ui-widget-content\n      dative-widget-center ui-corner-all"></div>\n\n    <div class="users-widget admins-widget ui-widget ui-widget-content\n      dative-widget-center ui-corner-all">\n\n      <div class="dative-widget-header ui-widget-header ui-corner-top">\n        <div class=\'dative-widget-header-title\'>Admins</div>\n      </div>\n\n      <div class="dative-widget-body admins-widget-body">\n        There are no admins for this corpus.\n      </div>\n    </div>\n\n    <div class="users-widget writers-widget ui-widget ui-widget-content\n      dative-widget-center ui-corner-all">\n      <div class="dative-widget-header ui-widget-header ui-corner-top">\n        <div class=\'dative-widget-header-title\'>Writers</div>\n      </div>\n      <div class="dative-widget-body writers-widget-body">\n        There are no writers for this corpus.\n      </div>\n    </div>\n\n    <div class="users-widget readers-widget ui-widget ui-widget-content\n      dative-widget-center ui-corner-all">\n      <div class="dative-widget-header ui-widget-header ui-corner-top">\n        <div class=\'dative-widget-header-title\'>Readers</div>\n      </div>\n      <div class="dative-widget-body readers-widget-body">\n        There are no readers for this corpus.\n      </div>\n    </div>\n\n  </div>\n\n'));
    
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
