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
      _print(_safe('<div class=\'smart-query-preview-data\'>\n\n    '));
    
      if (this.matchCount === null) {
        _print(_safe('\n        <div class=\'smart-query-preview-match-count large-unicode-font\'\n            >search pending ...</div>\n    '));
      } else {
        _print(_safe('\n        '));
        if (this.matchCount === 1) {
          _print(_safe('\n            <div class=\'smart-query-preview-match-count large-unicode-font\'\n                >'));
          _print(this.integerWithCommas(this.matchCount));
          _print(_safe(' match</div>\n        '));
        } else {
          _print(_safe('\n            <div class=\'smart-query-preview-match-count large-unicode-font\'\n                >'));
          _print(this.integerWithCommas(this.matchCount));
          _print(_safe(' matches</div>\n        '));
        }
        _print(_safe('\n    '));
      }
    
      _print(_safe('\n\n    <div class=\'smart-query-preview-description large-unicode-font\'\n        >'));
    
      _print(_safe(this.description));
    
      _print(_safe('</div>\n\n    <div class=\'smart-query-preview-buttons\'>\n\n        <button class=\'smart-query-preview-view-example dative-tooltip\'\n            title=\'See an example of a resource that matches this query\'\n            >Example</button>\n\n        <button class=\'smart-query-preview-browse dative-tooltip\'\n            title=\'Browse the resources that match this query\'\n            >Browse</button>\n\n    </div>\n\n</div>\n\n<div class=\'smart-query-preview-example-match-container\'></div>\n\n'));
    
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
