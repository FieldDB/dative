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
      _print(_safe('<div class=\'dative-page-header ui-widget-header ui-corner-top\'>\n\n  <div class=\'dative-page-header-title\'>Corpora</div>\n  <div class=\'button-container-left\'>\n\n    <button class="create-corpus dative-tooltip"\n      title="show form for creating a new corpus">\n      <i class="fa fa-plus fa-fw"></i>\n    </button>\n\n    <button class="expand-all-corpora dative-tooltip"\n      title="expand all corpus views">\n      <i class="fa fa-angle-double-down fa-fw"></i>\n    </button>\n\n    <button class="collapse-all-corpora dative-tooltip"\n      title="collapse all corpus views">\n      <i class="fa fa-angle-double-up fa-fw"></i>\n    </button>\n\n  </div>\n\n</div>\n\n<div class=\'dative-page-body\'>\n\n  <div class=\'create-corpus-widget-container\'></div>\n  <div class=\'corpora-list\'></div>\n\n</div>\n\n'));
    
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
