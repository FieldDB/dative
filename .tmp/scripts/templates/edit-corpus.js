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
      _print(_safe('  <div class="dative-widget-header ui-widget-header ui-corner-top">\n\n    <div class=\'dative-widget-header-title\'>Edit the details of this\n    corpus</div>\n\n  </div>\n\n  <div class="dative-widget-body">\n\n    <ul class="fieldset">\n\n      <li>\n        <label for=\'title\'>Title</label>\n        <input type="text" maxlength="255" name="title"\n          class="title ui-corner-all corpus-edit-input dative-tooltip"\n          title="Modify the title of this corpus" value="'));
    
      _print(this.title);
    
      _print(_safe('" />\n        <div class=\'dative-edit-corpus-failed-container\'>\n          <span class=\'ui-state-error ui-corner-all dative-edit-corpus-failed\n            title-error edit-corpus-error\'></span>\n        </div>\n      </li>\n\n      <li>\n        <label for=\'description\'>description</label>\n        <textarea rows="1" name="description"\n          class="description ui-corner-all corpus-edit-input dative-tooltip"\n          title="Modify the description of this corpus"\n        >'));
    
      _print(this.description);
    
      _print(_safe('</textarea>\n        <div class=\'dative-edit-corpus-failed-container\'>\n          <span class=\'ui-state-error ui-corner-all dative-edit-corpus-failed\n            description-error edit-corpus-error\'></span>\n        </div>\n      </li>\n\n      <li>\n        <label for=\'\'></label>\n        <button class=\'request-edit-corpus dative-tooltip\'\n          title=\'save corpus changes\'\n          ><i class="fa fa-fw fa-floppy-o"></i>Save Corpus Details</button>\n      </li>\n\n      <p class=\'ui-state-error\'>WARNing: Corpus metadata update currently\n      deactivated in Dative.</p>\n\n    </ul>\n\n  </div>\n\n\n'));
    
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
