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
      var i, integer, len, ref, selected;
    
      _print(_safe('<div class=\'button-container-left\'>\n\n  <button class="first-page dative-tooltip"\n    title="go to first page">\n    <i class="fa fa-angle-double-left fa-fw"></i>\n  </button>\n\n  <button class="previous-page dative-tooltip"\n    title="go to previous page">\n    <i class="fa fa-angle-left fa-fw"></i>\n  </button>\n\n</div>\n\n<div class=\'button-container-center\'>\n\n  <select name=\'items-per-page\'>\n    '));
    
      ref = this.possibleItemsPerPage;
      for (i = 0, len = ref.length; i < len; i++) {
        integer = ref[i];
        _print(_safe('\n      '));
        selected = integer === this.itemsPerPage ? 'selected' : '';
        _print(_safe('\n      <option value=\''));
        _print(integer);
        _print(_safe('\' '));
        _print(selected);
        _print(_safe('\n        >'));
        _print(integer);
        _print(_safe(' '));
        _print(this.pluralizeByNum('item', integer));
        _print(_safe(' per page\n      </option>\n    '));
      }
    
      _print(_safe('\n  </select>\n\n  <button class="current-minus-3 dative-tooltip"\n    title="go three pages back"></button>\n\n  <button class="current-minus-2 dative-tooltip"\n    title="go two pages back"></button>\n\n  <button class="current-minus-1 dative-tooltip"\n    title="go one page back"></button>\n\n  <button class="current-page dative-tooltip"\n    title="current page"></button>\n\n  <button class="current-plus-1 dative-tooltip"\n    title="go one page forward"></button>\n\n  <button class="current-plus-2 dative-tooltip"\n    title="go two pages forward"></button>\n\n  <button class="current-plus-3 dative-tooltip"\n    title="go three pages forward"></button>\n\n</div>\n\n<div class=\'button-container-right\'>\n\n  <button class="next-page dative-tooltip"\n    title="go to next page">\n    <i class="fa fa-angle-right fa-fw"></i>\n  </button>\n\n  <button class="last-page dative-tooltip"\n    title="go to last page">\n    <i class="fa fa-angle-double-right fa-fw"></i>\n  </button>\n\n</div>\n\n'));
    
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
