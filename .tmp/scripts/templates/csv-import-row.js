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
      var i, index, len, ref, value;
    
      _print(_safe('<div\n    tabindex=\'0\'\n    class=\'import-preview-table-row\'>\n\n    <div class=\'index-cell import-preview-table-cell\'>\n        <div class=\'csv-row-spinner\'></div>\n        <span class=\'csv-row-index\'>'));
    
      _print(this.rowIndex + 1);
    
      _print(_safe('</span>\n    </div>\n\n    <div class=\'form-for-import-select-cell import-preview-table-cell\'>\n\n        '));
    
      if (this.selected) {
        _print(_safe('\n            <i class=\'fa fa-2x fa-check-square deselect-for-import\n                ui-corner-all\' tabindex=\'0\'></i>\n        '));
      } else {
        _print(_safe('\n            <i class=\'fa fa-2x fa-square select-for-import\n                ui-corner-all\' tabindex=\'0\'></i>\n        '));
      }
    
      _print(_safe('\n\n        <button class=\'import-csv-row dative-tooltip import-preview-row-button\'\n            title=\'Import just this form\'\n            >Import<i class=\'import-status fa fa-fw\'\n                      style=\'display: none;\'></i></button>\n\n        <button class=\'preview-row dative-tooltip import-preview-row-button\'\n            title=\'View this form in IGT format\'>Preview</button>\n\n        '));
    
      if (this.valid === null) {
        _print(_safe('\n            <button class=\'validate-csv-row dative-tooltip\n                import-preview-row-button\' title=\'Check for potential warnings\n                and errors prior to importing this row.\'\n                >Validate<i class=\'validation-status fa fa-fw\'\n                    style=\'display: none;\'></i></button>\n        '));
      } else if (this.valid === true) {
        _print(_safe('\n            <button class=\'validate-csv-row dative-tooltip\n                import-preview-row-button\' title=\'Check for potential warnings\n                and errors prior to importing this row.\'\n                >Validate<i class=\'validation-status fa fa-fw fa-check-circle\n                    ui-state-ok\'></i></button>\n        '));
      } else if (this.valid === false) {
        _print(_safe('\n            <button class=\'validate-csv-row dative-tooltip\n                import-preview-row-button\' title=\'Check for potential warnings\n                and errors prior to importing this row.\'\n                >Validate<i class=\'validation-status fa fa-fw fa-times-circle\n                    ui-state-error-color\'></i></button>\n        '));
      }
    
      _print(_safe('\n\n    </div>\n\n    '));
    
      ref = this.line;
      for (index = i = 0, len = ref.length; i < len; index = ++i) {
        value = ref[index];
        _print(_safe('\n        <div class=\'import-preview-table-cell csv-value-cell\'\n            tabindex=\'0\' title=\''));
        _print(this.columnLabelsHuman[index]);
        _print(_safe('\'\n            ><div class=\'csv-value-cell-text\'>'));
        _print(value);
        _print(_safe('</div></div>\n    '));
      }
    
      _print(_safe('\n\n    <div class=\'import-preview-table-row-under invisible\'>\n\n        <div class=\'import-preview-table-row-errors-container errors-container\n                    invisible\'>\n            <ul class=\'import-errors-list\'></ul>\n        </div>\n\n        <div class=\'import-preview-table-row-warnings-container warnings-container\n                    invisible\'>\n            <ul class=\'import-warnings-list\'></ul>\n        </div>\n\n        <div class=\'import-preview-table-row-display-container invisible\'></div>\n\n    </div>\n\n</div>\n\n<div class=\'import-templates\' style=\'display: none;\'>\n\n    <li class=\'import-warning-list-item\'>\n        <div class=\'import-warning ui-state-highlight ui-corner-all\'>\n            <i class=\'fa fa-fw fa-exclamation-triangle\'></i>\n            Warning: <span class=\'warning-text\'></span>\n        </div>\n        <button class=\'warning-solution import-solution\'></button>\n    </li>\n\n    <li class=\'import-error-list-item\'>\n        <div class=\'import-error ui-state-error ui-corner-all\'>\n            <i class=\'fa fa-fw fa-exclamation-triangle\'></i>\n            Error: <span class=\'error-text\'></span>\n        </div>\n        <button class=\'error-solution import-solution\'></button>\n    </li>\n\n</div>\n\n'));
    
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
