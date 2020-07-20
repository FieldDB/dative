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
      _print(_safe('<div class="dative-widget-header ui-widget-header ui-corner-top">\n\n  <div class=\'dative-widget-header-title\'>'));
    
      _print(this.headerTitle);
    
      _print(_safe('</div>\n\n  <div class=\'button-container-left\'>\n\n    <button class="hide-form-add-widget dative-tooltip"\n            title="hide this form '));
    
      _print(this.addUpdateType);
    
      _print(_safe(' widget">\n      <i class=\'fa fa-times fa-fw\'></i>\n    </button>\n\n    <button class="toggle-secondary-data-fields dative-tooltip"\n      title="show the secondary data input fields">\n      <i class=\'fa fa-angle-down fa-fw\'></i>\n    </button>\n\n  </div>\n\n  <div class=\'button-container-right\'>\n\n    <span class="spinner-container"></span>\n\n    <button class="clear-form dative-tooltip"\n      title="clear this form: reset all fields to their default values"\n      ><i class=\'fa fa-eraser fa-fw\'></i>\n    </button>\n\n    '));
    
      if (this.addUpdateType === 'update') {
        _print(_safe('\n      <button class="undo-changes dative-tooltip"\n        title="undo changes: restore to pre-modification state"\n        ><i class=\'fa fa-undo fa-fw\'></i>\n      </button>\n    '));
      }
    
      _print(_safe('\n\n    <button class=\'form-add-help dative-tooltip\'\n      '));
    
      if (this.addUpdateType === 'add') {
        _print(_safe('\n        title=\'help with adding a form\'\n      '));
      } else {
        _print(_safe('\n        title=\'help with updating a form\'\n      '));
      }
    
      _print(_safe('\n    ><i class=\'fa fa-fw fa-question\'></i>\n    </button>\n\n  </div>\n\n</div>\n\n<div class="dative-widget-body">\n\n  <div class="form-add-form '));
    
      _print(this.activeServerType.toLowerCase());
    
      _print(_safe('">\n\n    <ul class="fieldset primary-data"></ul>\n    <ul class="fieldset secondary-data"></ul>\n\n    <ul class="fieldset button-only-fieldset">\n\n      <li class="center">\n        <button\n          class="add-form-button dative-tooltip"\n          '));
    
      if (this.addUpdateType === 'add') {
        _print(_safe('\n            title=\'Create this new form\'\n          '));
      } else {
        _print(_safe('\n            title=\'Save changes to this form\'\n          '));
      }
    
      _print(_safe('\n          >Save</button>\n\n        <button\n          class="toggle-secondary-data-fields dative-tooltip"\n          title="show the secondary data input fields"\n          ><i class=\'fa fa-angle-down fa-fw\'></i>\n        </button>\n\n      </li>\n\n    </ul>\n\n  </div>\n\n</div>\n\n'));
    
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
