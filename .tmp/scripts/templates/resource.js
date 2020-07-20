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
      var indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };
    
      _print(_safe('<div class="dative-widget-header ui-widget-header ui-corner-top">\n\n  <div class=\'button-container-left\'>\n\n    '));
    
      if (this.addUpdateType === 'add') {
        _print(_safe('\n      <button class="hide-resource-widget dative-tooltip"\n              title="hide this new '));
        _print(this.resourceNameHumanReadable());
        _print(_safe(' widget">\n        <i class=\'fa fa-times fa-fw\'></i>\n      </button>\n    '));
      } else if (!this.headerAlwaysVisible) {
        _print(_safe('\n      <button class="hide-resource-details dative-tooltip"\n              title="hide the buttons and extra data of this\n                '));
        _print(this.resourceNameHumanReadable());
        _print(_safe('">\n        <i class=\'fa fa-angle-double-up fa-fw\'></i>\n      </button>\n    '));
      }
    
      _print(_safe('\n\n    '));
    
      if (this.secondaryDataFieldsLength > 0) {
        _print(_safe('\n        <button class="toggle-secondary-data dative-tooltip"\n                title="hide the secondary data of this\n                    '));
        _print(this.resourceNameHumanReadable());
        _print(_safe('">\n            <i class=\'fa fa-angle-up fa-fw\'></i>\n        </button>\n    '));
      }
    
      _print(_safe('\n\n    '));
    
      if (!this.labelsAlwaysVisible) {
        _print(_safe('\n        <button class="toggle-data-labels dative-tooltip"\n            title="show labels">labels:\n            <i class=\'fa fa-toggle-off fa-fw\'></i>\n        </button>\n    '));
      }
    
      _print(_safe('\n\n  </div>\n\n  '));
    
      if (this.addUpdateType === 'add' || (!this.mainPageViewable)) {
        _print(_safe('\n    <div class=\'dative-widget-header-title container-center\'\n        ><span class=\'resource-icon\'>'));
        _print(_safe(this.resourceIcon));
        _print(_safe('</span\n        ><span\n            class=\'header-title-content\'\n        >'));
        _print(_safe(this.headerTitle || ''));
        _print(_safe('</span></div>\n  '));
      } else {
        _print(_safe('\n    <div class=\'dative-widget-header-title container-center\'\n        ><span class=\'resource-icon\'>'));
        _print(_safe(this.resourceIcon));
        _print(_safe('</span\n        ><span\n            class=\'header-title-content dative-tooltip\'\n            title=\'view this '));
        _print(this.resourceNameHumanReadable());
        _print(_safe(' in the main page\'\n        >'));
        _print(_safe(this.headerTitle || ''));
        _print(_safe('</span></div>\n  '));
      }
    
      _print(_safe('\n\n  <div class=\'button-container-right\'>\n\n    <span class="spinner-container"></span>\n\n    '));
    
      if (indexOf.call(this.excludedActions, 'data') < 0) {
        _print(_safe('\n      <button class="file-data dative-tooltip"\n              title="view the data of this '));
        _print(this.resourceNameHumanReadable());
        _print(_safe('"\n              >'));
        _print(_safe(this.dataTypeIcon));
        _print(_safe('\n      </button>\n    '));
      }
    
      _print(_safe('\n\n    '));
    
      if (indexOf.call(this.excludedActions, 'update') < 0 && this.updatePermitted) {
        _print(_safe('\n      <button class="update-resource dative-tooltip"\n        '));
        if (this.addUpdateType === 'add') {
          _print(_safe('\n              title="edit the details of this '));
          _print(this.resourceNameHumanReadable());
          _print(_safe('"\n        '));
        } else {
          _print(_safe('\n              title="update this '));
          _print(this.resourceNameHumanReadable());
          _print(_safe('"\n        '));
        }
        _print(_safe('\n        ><i class=\'fa fa-pencil-square-o fa-fw\'></i>\n      </button>\n    '));
      }
    
      _print(_safe('\n\n    '));
    
      if (indexOf.call(this.excludedActions, 'export') < 0) {
        _print(_safe('\n      <button class="export-resource dative-tooltip"\n              title="export this '));
        _print(this.resourceNameHumanReadable());
        _print(_safe('"\n        ><i class=\'fa fa-download fa-fw\'></i>\n      </button>\n    '));
      }
    
      _print(_safe('\n\n    '));
    
      if (this.addUpdateType === 'update') {
        _print(_safe('\n\n      '));
        if (indexOf.call(this.excludedActions, 'delete') < 0) {
          _print(_safe('\n        <button class="delete-resource dative-tooltip"\n                title="delete this '));
          _print(this.resourceNameHumanReadable());
          _print(_safe('"\n          ><i class=\'fa fa-trash fa-fw\'></i>\n        </button>\n      '));
        }
        _print(_safe('\n\n      '));
        if (indexOf.call(this.excludedActions, 'duplicate') < 0) {
          _print(_safe('\n        <button class="duplicate-resource dative-tooltip"\n                title="duplicate this '));
          _print(this.resourceNameHumanReadable());
          _print(_safe('"\n          ><i class=\'fa fa-copy fa-fw\'></i>\n        </button>\n      '));
        }
        _print(_safe('\n\n      '));
        if (indexOf.call(this.excludedActions, 'history') < 0 && this.activeServerType === 'OLD') {
          _print(_safe('\n        <button class="resource-history dative-tooltip"\n        title="view the history of this '));
          _print(this.resourceNameHumanReadable());
          _print(_safe('"\n          ><i class=\'fa fa-history fa-fw\'></i>\n        </button>\n      '));
        }
        _print(_safe('\n\n    '));
      }
    
      _print(_safe('\n\n    '));
    
      if (this.addUpdateType === 'update' || this.showControlsWithNew) {
        _print(_safe('\n\n      '));
        if (indexOf.call(this.excludedActions, 'controls') < 0) {
          _print(_safe('\n        <button class="controls dative-tooltip"\n                title="more controls"\n                ><i class=\'fa fa-tachometer fa-fw\'></i>\n        </button>\n      '));
        }
        _print(_safe('\n\n    '));
      }
    
      _print(_safe('\n\n    '));
    
      if (indexOf.call(this.excludedActions, 'settings') < 0) {
        _print(_safe('\n      <button class="settings dative-tooltip"\n              title="'));
        _print(this.resourceNameHumanReadable());
        _print(_safe(' settings"\n        ><i class=\'fa fa-gears fa-fw\'></i>\n      </button>\n    '));
      }
    
      _print(_safe('\n\n\n  </div>\n\n</div>\n\n\n<div class=\'dative-widget-body\'>\n\n  '));
    
      if (indexOf.call(this.excludedActions, 'data') < 0) {
        _print(_safe('\n    <div class=\'file-data-widget dative-widget-center\n      dative-shadowed-widget ui-widget ui-widget-content ui-corner-all\'></div>\n  '));
      }
    
      _print(_safe('\n\n  '));
    
      if (indexOf.call(this.excludedActions, 'controls') < 0) {
        _print(_safe('\n    <div class=\'controls-widget dative-widget-center\n      dative-shadowed-widget ui-widget ui-widget-content ui-corner-all\'></div>\n  '));
      }
    
      _print(_safe('\n\n  '));
    
      if (indexOf.call(this.excludedActions, 'settings') < 0) {
        _print(_safe('\n    <div class=\'settings-widget dative-widget-center\n      dative-shadowed-widget ui-widget ui-widget-content ui-corner-all\'></div>\n  '));
      }
    
      _print(_safe('\n\n  <div class=\'update-resource-widget update-widget dative-widget-center\n    dative-shadowed-widget ui-widget ui-widget-content ui-corner-all\'></div>\n\n  <div class=\'resource-primary-data large-unicode-font\'>\n      '));
    
      if (this.resourceName === 'form') {
        _print(_safe('\n          <div class=\'igt-tables-container\'></div>\n      '));
      }
    
      _print(_safe('\n  </div>\n\n  <div class=\'resource-secondary-data large-unicode-font\'></div>\n\n  '));
    
      if (indexOf.call(this.excludedActions, 'history') < 0) {
        _print(_safe('\n    <div class=\'resource-previous-versions\'></div>\n  '));
      }
    
      _print(_safe('\n\n</div>\n\n\n'));
    
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
