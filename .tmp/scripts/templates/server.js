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
      var activeIndicatorValue, i, j, len, len1, ref, ref1, serverCode, type;
    
      _print(_safe('<div class="server-config-widget dative-widget-center ui-widget\n  ui-widget-content ui-corner-all">\n\n\n    '));
    
      if (this.isActive) {
        _print(_safe('\n      '));
        activeIndicatorValue = '(active)';
        _print(_safe('\n    '));
      } else {
        _print(_safe('\n      '));
        activeIndicatorValue = '';
        _print(_safe('\n    '));
      }
    
      _print(_safe('\n\n  <div class="dative-widget-header ui-widget-header ui-corner-top">\n\n    <div class=\'dative-widget-header-title\'\n      ><span class=\'italic header-title-name\'>'));
    
      _print(this.name);
    
      _print(_safe('</span\n      > server <span class=\'active-indicator\'>'));
    
      _print(activeIndicatorValue);
    
      _print(_safe('</span\n      ></div>\n\n    <div class=\'button-container-left\'>\n\n      <button class="delete-server dative-tooltip"\n        title="delete this server">\n        <i class=\'fa fa-trash fa-fw\'></i>\n      </button>\n\n      <button class="activate-server dative-tooltip"\n        title="make this server the active one">\n        <i class=\'fa fa-toggle-off fa-fw\'></i>\n      </button>\n\n    </div>\n\n  </div>\n\n  '));
    
      if (this.isActive) {
        _print(_safe('\n    <div class="dative-widget-body ui-state-highlight ui-corner-bottom">\n  '));
      } else {
        _print(_safe('\n    <div class="dative-widget-body">\n  '));
      }
    
      _print(_safe('\n\n    <ul class="fieldset">\n\n      <li>\n        <label for="name">Name</label>\n        <input type="text" name="name" class="dative-input dative-tooltip ui-corner-all\n          dative-input-display" title="A name for the server"\n          value="'));
    
      _print(this.name);
    
      _print(_safe('" /> </li>\n\n      <li>\n        <label for="url">URL</label>\n        <input type="text" name="url" class="dative-input dative-tooltip ui-corner-all\n          dative-input-display" title="A URL for the server\n          (including protocol and port, if needed)"\n          value="'));
    
      _print(this.url);
    
      _print(_safe('" />\n      </li>\n\n      <li>\n        <label for="type">Type</label>\n        <select name="type" class="dative-input dative-input-display">\n          '));
    
      ref = this.serverTypes;
      for (i = 0, len = ref.length; i < len; i++) {
        type = ref[i];
        _print(_safe('\n            '));
        if (type === this.type) {
          _print(_safe('\n              <option value="'));
          _print(type);
          _print(_safe('" selected>'));
          _print(type);
          _print(_safe('</option>\n            '));
        } else {
          _print(_safe('\n              <option value="'));
          _print(type);
          _print(_safe('">'));
          _print(type);
          _print(_safe('</option>\n            '));
        }
        _print(_safe('\n          '));
      }
    
      _print(_safe('\n        </select>\n      </li>\n\n      <li class="serverCode">\n        <label for="serverCode">Server code</label>\n        <select name="serverCode" class="serverCode dative-input dative-input-display">\n          '));
    
      ref1 = this.serverCodes;
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        serverCode = ref1[j];
        _print(_safe('\n            '));
        if (serverCode === this.serverCode) {
          _print(_safe('\n              <option value="'));
          _print(serverCode);
          _print(_safe('" selected\n                >'));
          _print(serverCode);
          _print(_safe('</option>\n            '));
        } else {
          _print(_safe('\n              <option value="'));
          _print(serverCode);
          _print(_safe('">'));
          _print(serverCode);
          _print(_safe('</option>\n            '));
        }
        _print(_safe('\n          '));
      }
    
      _print(_safe('\n        </select>\n      </li>\n\n    </ul>\n  </div>\n</div>\n\n'));
    
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
