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
      var data, ref, type;
    
      _print(_safe('<div class=\'dative-importer-dialog\'>\n    <div class="dative-importer-dialog-content-container">\n\n        <div class="dative-importer-dialog-import">\n\n            <i class=\'import-spinner fa fa-fw fa-circle-o-notch fa-spin\'></i>\n\n            <ul class=\'fieldset importer-fieldset\'>\n\n                <li class=\'dative-form-field\'>\n                    <div class=\'dative-field-label-container\'>\n                        <label for=\'import_button\'\n                            class=\'dative-field-label dative-tooltip\'\n                            title=\'Choose a file to import\'\n                    >Import file</label></div>\n                    <div class=\'dative-field-input-container\'>\n                        <button\n                            class=\'choose-import-file-button\n                                ui-corner-all\n                                dative-tooltip\n                                dative-input-field\'\n                            title=\'Choose a file to import\'\n                            >Choose file</button>\n                        <span class=\'import-file-name\'></span>\n                        <div class=\'file-upload-container\'>\n                            <div class=\'file-upload-status\'>Uploading file data ...</div>\n                            <div class=\'file-upload-progress-bar\'></div>\n                        </div>\n                        <!-- this is the hidden input tag -->\n                        <div\n                            style=\'height: 0px;width:0px; overflow:hidden;\'\n                            ><input\n                                type="file"\n                                name=\'file-upload-input\'\n                                tabindex=\'999\'\n                                /></div>\n                    </div>\n                </li>\n\n                <li class=\'dative-form-field\'>\n                    <div\n                    class=\'dative-field-label-container\'>\n                        <label for=\'import_type\'\n                            class=\'dative-field-label dative-tooltip\'\n                            title=\'Select the format of your input file\'\n                    >Import file format</label></div>\n                    <div\n                    class=\'dative-field-input-container\'>\n                        <select\n                            name=\'import_type\'\n                            class=\'import-type dative-tooltip\'\n                            title=\'Choose an import type\'>\n                            '));
    
      ref = this.importTypes;
      for (type in ref) {
        data = ref[type];
        _print(_safe('\n                                <option value=\''));
        _print(type);
        _print(_safe('\'\n                                    >'));
        _print(data.label);
        _print(_safe('</option>\n                            '));
      }
    
      _print(_safe('\n                        </select></div>\n                </li>\n\n            </ul>\n\n        </div>\n\n        <div class="dative-importer-dialog-preview">\n            <div class=\'import-controls-container\'>\n                <button\n                    class=\'import-selected-button\n                        ui-corner-all\n                        dative-tooltip\'\n                    title=\'Click to import all selected forms\'\n                    ><i class=\'import-selected-button-text\'>Import Selected</i><i\n                        class=\'fa fa-fw fa-upload\'></i></button>\n                <button\n                    class=\'view-selected-button\n                        ui-corner-all\n                        dative-tooltip\'\n                    title=\'View the selected rows as Dative forms (IGT display)\'\n                    >View Selected</button>\n                <button\n                    class=\'validate-selected-button\n                        ui-corner-all\n                        dative-tooltip\'\n                    title=\'Check for issues/errors in all selected rows\'\n                    >Validate Selected</button>\n            </div>\n\n            <div class=\'errors-container general-errors-container\n                invisible\'>\n                <h1 class=\'errors-header ui-state-error ui-corner-all\'\n                    ><i class=\'errors-header-icon fa fa-fw\n                    fa-exclamation-triangle\'></i\n                    ><span class=\'errors-header-text\'>Errors</span></h1>\n                <div class=\'errors-inner-container\'></div>\n            </div>\n\n            <div class=\'warnings-container general-warnings-container\n                invisible\'>\n                <h1 class=\'warnings-header ui-state-highlight ui-corner-all\'\n                    ><i class=\'warnings-header-icon fa fa-fw\n                    fa-exclamation-triangle\'></i\n                    ><span class=\'warnings-header-text\'>Warnings</span></h1>\n                <div class=\'warnings-inner-container\'></div>\n            </div>\n\n            <div class=\'import-preview-table\'>\n                <div class=\'import-preview-table-head\'></div>\n                <div class=\'import-preview-table-body\'></div>\n            </div>\n        </div>\n\n    </div>\n</div>\n\n<div class=\'dative-importer-dialog-target\'><div>\n\n'));
    
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
