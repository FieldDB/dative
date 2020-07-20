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
      var formAttribute, i, j, label, len, len1, ref, ref1;
    
      _print(_safe('<div class=\'index-cell import-preview-table-header-cell\'></div>\n\n<div class=\'import-preview-table-header-cell import-preview-controls-cell\'>\n\n    <button class=\'select-all-for-import ui-corner-all\'>Select All</button>\n\n    <button class=\'select-none-for-import ui-corner-all\'>De-select All</button>\n\n</div>\n\n'));
    
      ref = this.columnLabels;
      for (i = 0, len = ref.length; i < len; i++) {
        label = ref[i];
        _print(_safe('\n\n    <div class=\'import-preview-table-header-cell import-preview-values-cell\'>\n\n        <select\n            class=\'column-header dative-tooltip\'\n            title=\'Choose the form field label that the values in this column\n                belong to\'>\n            <option value=\'\'>Please select a form field label.</option>\n            '));
        ref1 = this.sortedFormAttributes;
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          formAttribute = ref1[j];
          _print(_safe('\n                '));
          if (formAttribute === label) {
            _print(_safe('\n                    <option value=\''));
            _print(formAttribute);
            _print(_safe('\' selected\n                        >'));
            _print(this.snake2regular(formAttribute));
            _print(_safe('</option>\n                '));
          } else {
            _print(_safe('\n                    <option value=\''));
            _print(formAttribute);
            _print(_safe('\'\n                        >'));
            _print(this.snake2regular(formAttribute));
            _print(_safe('</option>\n                '));
          }
          _print(_safe('\n            '));
        }
        _print(_safe('\n        </select>\n\n        '));
        if (label) {
          _print(_safe('\n            <i  class=\'column-alert ui-corner-all fa fa-fw\n                    fa-exclamation-triangle ui-state-highlight invisible\n                    dative-tooltip\'\n                title=\'Values in this column will not be imported because\n                    users cannot specify “'));
          _print(this.snake2regular(label));
          _print(_safe('” values;\n                    they can only be specified by the system.\'></i>\n        '));
        } else {
          _print(_safe('\n            <i  class=\'column-alert ui-corner-all fa fa-fw\n                    fa-exclamation-triangle ui-state-highlight invisible\n                    dative-tooltip\'\n                title=\'Values in this column will not be imported; please choose a\n                    form field label for this column.\'></i>\n        '));
        }
        _print(_safe('\n\n    </div>\n\n'));
      }
    
      _print(_safe('\n\n'));
    
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
