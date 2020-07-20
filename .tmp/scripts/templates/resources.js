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
      _print(_safe('<div class=\'focusable-top\' tabindex=\'0\'></div>\n\n<div class=\'dative-page-header ui-widget-header ui-corner-top\n    dative-two-part-header\'>\n\n  <div class=\'dative-resources-view-header dative-two-part-header-part-one\'>\n\n    <div class=\'dative-page-header-title container-center\'>\n      <div class=\'no-resources\'></div>\n      <div class=\'pagination-info\'>\n        Browsing\n        <span class=\'browse-set\'\n            >all '));
    
      _print(this.resourceNamePluralHuman);
    
      _print(_safe('</span>.\n        <span style=\'white-space: nowrap;\'>\n        Viewing\n        <span class=\'resource-range\'></span>\n        of\n        <span class=\'resource-count\'></span>\n        </span>\n        <span style=\'white-space: nowrap; display: inline-block;\'>\n        (page\n        <span class=\'current-page\'></span>\n        of\n        <span class=\'page-count\'></span>)\n        </span>\n      </div>\n    </div>\n\n    <div class=\'button-container-left\'>\n\n      '));
    
      if (this.canCreateNew) {
        _print(_safe('\n      <button class=\'new-resource dative-tooltip\' title=\'create a new\n        '));
        _print(this.resourceNameHuman);
        _print(_safe('\'>\n        <i class=\'fa fa-fw fa-plus\'></i>\n      </button>\n      '));
      }
    
      _print(_safe('\n\n      <button class=\'expand-all dative-tooltip\' title=\'expand all\n          '));
    
      _print(this.resourceNamePluralHuman);
    
      _print(_safe('\'>\n        <i class=\'fa fa-fw fa-angle-double-down\'></i>\n      </button>\n\n      <button class=\'collapse-all dative-tooltip\' title=\'collapse all\n          '));
    
      _print(this.resourceNamePluralHuman);
    
      _print(_safe('\'>\n        <i class=\'fa fa-fw fa-angle-double-up\'></i>\n      </button>\n\n    </div>\n\n    <div class=\'button-container-right\'>\n\n      <span class=\'spinner-anchor\'></span>\n\n      '));
    
      if (this.searchable) {
        _print(_safe('\n        <button class="toggle-search dative-tooltip"\n                title="Search across '));
        _print(this.resourceNamePluralHuman);
        _print(_safe('"\n            ><i class=\'fa fa-fw fa-search\'></i></button>\n      '));
      }
    
      _print(_safe('\n\n      <button class="export-resource-collection dative-tooltip"\n              title="Export multiple '));
    
      _print(this.resourceNamePluralHuman);
    
      _print(_safe('"\n              ><i class=\'fa fa-fw fa-download\'></i>\n      </button>\n\n      '));
    
      if (this.importable) {
        _print(_safe('\n        <button class="toggle-import dative-tooltip"\n                title="Import '));
        _print(this.resourceNamePluralHuman);
        _print(_safe('"\n            ><i class=\'fa fa-fw fa-upload\'></i></button>\n      '));
      }
    
      _print(_safe('\n\n      <button class="toggle-all-labels dative-tooltip"\n              title="'));
    
      _print(this.resourceNameHuman);
    
      _print(_safe(' labels are off; click here to\n              turn them on">labels:\n        <i class=\'fa fa-toggle-off fa-fw\'></i>\n      </button>\n\n      <button class=\'resources-browse-help dative-tooltip\' title=\'help with\n        browsing '));
    
      _print(this.resourceNamePluralHuman);
    
      _print(_safe('\'>\n        <i class=\'fa fa-fw fa-question\'></i>\n      </button>\n\n    </div>\n\n  </div>\n\n  <div class=\'dative-pagination-menu-top dative-two-part-header-part-two\'></div>\n\n</div>\n\n<div class=\'dative-page-body\'>\n\n  '));
    
      if (this.searchable) {
        _print(_safe('\n      <div class=\'resource-search-view dative-new-item dative-resource-object\n        dative-widget-center dative-shadowed-widget ui-widget ui-widget-content\n        ui-corner-all\'></div>\n  '));
      }
    
      _print(_safe('\n\n  '));
    
      if (this.importable) {
        _print(_safe('\n      <div class=\'resources-import-view dative-new-item dative-resource-object\n        dative-widget-center dative-shadowed-widget ui-widget ui-widget-content\n        ui-corner-all\'></div>\n  '));
      }
    
      _print(_safe('\n\n  <div class=\'dative-pagin-items\'></div>\n\n  <div class=\'new-resource-view dative-resource-object dative-widget-center\n    dative-shadowed-widget ui-widget ui-widget-content ui-corner-all\n    dative-new-item\'></div>\n\n  <div class=\'dative-pagin-nav dative-pagin-nav-bottom\'></div>\n\n</div>\n\n<div class=\'focusable-bottom\' tabindex=\'0\'></div>\n\n'));
    
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
