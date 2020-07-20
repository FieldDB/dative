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
      _print(_safe('  <div class="dative-widget-header ui-widget-header ui-corner-top dative-tooltip">\n\n    <div class=\'dative-widget-header-title\'>Create a new corpus</div>\n\n  </div>\n\n  <div class="dative-widget-body">\n\n    <ul class="fieldset">\n\n      <li>\n        <label for=\'corpus-title\'>Corpus title</label>\n        <input type=\'text\' name=\'corpus-title\' class=\'dative-tooltip ui-corner-all\'\n          title=\'enter the title of the corpus you would like to create\' />\n        <div class=\'dative-create-corpus-failed-container\'>\n          <span class=\'ui-state-error ui-corner-all dative-create-corpus-failed\n            corpus-title-error\'></span>\n        </div>\n      </li>\n\n      <li>\n        <label for=\'request-create-corpus\'></label>\n        <button class=\'request-create-corpus dative-tooltip\'\n          title=\'request that a corpus with the specified title be created\'\n          >Create Corpus</button>\n        <span class=\'request-create-corpus-error-tooltip dative-tooltip\'></span>\n        <span class=\'request-create-corpus-success-tooltip dative-tooltip\'></span>\n      </li>\n\n    </ul>\n\n  </div>\n\n'));
    
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
