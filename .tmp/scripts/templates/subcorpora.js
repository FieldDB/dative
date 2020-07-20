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
      _print(_safe('<div class=\'focusable-top\' tabindex=\'0\'></div>\n\n<div class=\'dative-page-header ui-widget-header ui-corner-top\n    dative-two-part-header\'>\n\n  <div class=\'dative-subcorpora-view-header dative-two-part-header-part-one\'>\n\n    <div class=\'dative-page-header-title container-center\'>\n      <div class=\'no-subcorpora\'>\n        There are no subcorpora to display\n      </div>\n      <div class=\'pagination-info\'>\n        Browsing\n        <span class=\'subcorpus-range\'></span>\n        of\n        <span class=\'subcorpus-count\'></span>\n        (page\n        <span class=\'current-page\'></span>\n        of\n        <span class=\'page-count\'></span>)\n      </div>\n    </div>\n\n    <div class=\'button-container-left\'>\n\n        <button class=\'new-subcorpus dative-tooltip\' title=\'create a new\n          subcorpus\'>\n        <i class=\'fa fa-fw fa-plus\'></i>\n      </button>\n\n      <button class=\'expand-all dative-tooltip\' title=\'expand all subcorpora\'>\n        <i class=\'fa fa-fw fa-angle-double-down\'></i>\n      </button>\n\n      <button class=\'collapse-all dative-tooltip\' title=\'collapse all\n        subcorpora\'>\n        <i class=\'fa fa-fw fa-angle-double-up\'></i>\n      </button>\n\n    </div>\n\n    <div class=\'button-container-right\'>\n\n      <button class="toggle-all-labels dative-tooltip"\n        title="subcorpus labels are off; click here to turn them on">labels:\n        <i class=\'fa fa-toggle-off fa-fw\'></i>\n      </button>\n\n      <button class=\'subcorpora-browse-help dative-tooltip\' title=\'help with\n          browsing subcorpora\'>\n        <i class=\'fa fa-fw fa-question\'></i>\n      </button>\n\n    </div>\n\n  </div>\n\n  <div class=\'dative-pagination-menu-top dative-two-part-header-part-two\'></div>\n\n</div>\n\n<div class=\'dative-page-body\'>\n\n  <div class=\'dative-pagin-items\'></div>\n\n  <div class=\'new-subcorpus-view dative-subcorpus-object dative-widget-center\n    dative-shadowed-widget ui-widget ui-widget-content ui-corner-all\n    dative-new-item\'></div>\n\n  <div class=\'dative-pagin-nav dative-pagin-nav-bottom\'></div>\n\n</div>\n\n<div class=\'focusable-bottom\' tabindex=\'0\'></div>\n\n<div id=\'exporter-dialog-container\'></div>\n\n\n'));
    
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
