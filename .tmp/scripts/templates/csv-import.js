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
    
      _print(_safe('<div class="dative-widget-header ui-widget-header ui-corner-top">\n\n  <div class=\'dative-widget-header-title container-center\'\n     >Import Forms</div>\n\n  <div class=\'button-container-left\'>\n\n    <button class="hide-import-widget dative-tooltip"\n            title="hide this import widget">\n      <i class=\'fa fa-times fa-fw\'></i>\n    </button>\n\n  </div>\n\n  <div class=\'button-container-right\'>\n\n    <span class="spinner-container import-spinner-container"></span>\n\n    <button class=\'import-help dative-tooltip\'\n          title=\'help with importing forms\'\n        ><i class=\'fa fa-fw fa-question\'></i>\n    </button>\n\n  </div>\n\n</div>\n\n\n<div class="dative-widget-body dative-importer">\n\n    <div class="dative-importer-content-container">\n\n        <div class="dative-importer-import">\n\n            <ul class=\'fieldset importer-fieldset\'>\n\n                <li class=\'dative-form-field\'>\n                    <div class=\'dative-field-label-container\'>\n                        <label for=\'import_button\'\n                            class=\'dative-field-label dative-tooltip\'\n                            title=\'Choose a file to import\'\n                    >Import file</label></div>\n                    <div class=\'dative-field-input-container\'>\n                        <button\n                            class=\'choose-import-file-button\n                                ui-corner-all\n                                dative-tooltip\n                                dative-input-field\'\n                            title=\'Choose a file to import\'\n                            >Choose file</button>\n                        <span class=\'import-file-name import-file-meta\'></span>\n                        <button\n                            class=\'discard-file-button\n                                ui-corner-all\n                                dative-tooltip\n                                dative-input-field\'\n                            title=\'Discard this file\'\n                            ><i class=\'fa fa-fw fa-trash\'></i></button>\n                        <!-- this is the hidden input tag -->\n                        <div\n                            style=\'height: 0px;width:0px; overflow:hidden;\'\n                            ><input\n                                type="file"\n                                name=\'file-upload-input\'\n                                tabindex=\'999\'\n                                /></div>\n                    </div>\n                </li>\n\n                <!-- INVISIBLE until/ in case we support other, non-CSV, import formats -->\n                <li class=\'dative-form-field invisible\'>\n                    <div\n                    class=\'dative-field-label-container\'>\n                        <label for=\'import_type\'\n                            class=\'dative-field-label dative-tooltip\'\n                            title=\'Select the format of your input file\'\n                    >Import file format</label></div>\n                    <div\n                    class=\'dative-field-input-container\'>\n                        <select\n                            name=\'import_type\'\n                            class=\'import-type dative-tooltip\'\n                            title=\'Choose an import type\'>\n                            '));
    
      ref = this.importTypes;
      for (type in ref) {
        data = ref[type];
        _print(_safe('\n                                <option value=\''));
        _print(type);
        _print(_safe('\'\n                                    >'));
        _print(data.label);
        _print(_safe('</option>\n                            '));
      }
    
      _print(_safe('\n                        </select></div>\n                </li>\n\n            </ul>\n\n        </div>\n\n        <div class="dative-importer-preview">\n            <div class=\'import-controls-container\'>\n\n                <button\n                    class=\'import-selected-button\n                        ui-corner-all\n                        dative-tooltip\'\n                    title=\'Click to import all selected forms\'\n                    ><i class=\'import-selected-button-text\'>Import Selected</i><i\n                        class=\'fa fa-fw fa-upload\'></i></button>\n\n                <button\n                    class=\'stop-import-selected-button\n                        invisible\n                        ui-corner-all\n                        dative-tooltip\'\n                    title=\'Stop the current import\'\n                    >Stop Importing<i class=\'fa fa-fw fa-stop\'></i></button>\n\n                <button\n                    class=\'preview-selected-button\n                        ui-corner-all\n                        dative-tooltip\'\n                    title=\'View the selected rows as Dative forms (IGT display)\'\n                    >Preview Selected</button>\n\n                <button\n                    class=\'validate-selected-button\n                        ui-corner-all\n                        dative-tooltip\'\n                    title=\'Check for issues/errors in all selected rows\'\n                    >Validate Selected</button>\n\n                <button\n                    class=\'import-options-button\n                        ui-corner-all\n                        dative-tooltip\'\n                    title=\'Configure options for how import works\'\n                    >Options ...</button>\n\n            </div>\n\n            <div class=\'import-options-container invisible\'>\n\n                <ul>\n\n                    <li class=\'dative-tooltip\' title=\'If checked, Dative will try\n                        to identify multiple translations in the translations\n                        column, using the “translation delimiter” below.\'>\n                        '));
    
      if (this.parseTranslations) {
        _print(_safe('\n                            <i class=\'fa fa-2x fa-check-square parse-translations\n                                fa-dative-checkbox ui-corner-all\' tabindex=\'0\'></i>\n                        '));
      } else {
        _print(_safe('\n                            <i class=\'fa fa-2x fa-square parse-translations\n                                fa-dative-checkbox ui-corner-all\' tabindex=\'0\'></i>\n                        '));
      }
    
      _print(_safe('\n                        parse translations</li>\n\n                    <li class=\'dative-tooltip\' title=\'If checked, Dative will\n                        attempt to identify compatibility prefixes on\n                        translations, e.g., the “*” at the beginning of “*dog”.\'>\n                        '));
    
      if (this.identifyTranslationCompatibilities) {
        _print(_safe('\n                            <i class=\'fa fa-2x fa-check-square fa-dative-checkbox\n                                identify-translation-compatibilities ui-corner-all\'\n                                tabindex=\'0\'></i>\n                        '));
      } else {
        _print(_safe('\n                            <i class=\'fa fa-2x fa-check-square fa-dative-checkbox\n                                identify-translation-compatibilities ui-corner-all\'\n                                tabindex=\'0\'></i>\n                        '));
      }
    
      _print(_safe('\n                        identify compatibility prefixes in translations</li>\n\n                    <li class=\'dative-tooltip\' title=\'Enter a character that\n                        Dative should use for the translation delimiter; this\n                        is the character that separates individual translations.\'>\n                        <input type=\'text\' name=\'translation_delimiter\'\n                            maxlength=\'1\' class=\'ui-corner-all\'\n                            value=\''));
    
      _print(this.translationDelimiter);
    
      _print(_safe('\' />\n                        translation delimiter</li>\n\n                </ul>\n\n            </div>\n\n            <div class=\'import-report-container\'>\n\n                <div class=\'import-success-count import-report-count\'>\n                    <i class=\'fa fa-fw fa-check-circle ui-state-ok\'></i>\n                    <span class=\'import-success-count-count\'>0 successful imports</span>\n                </div>\n\n                <div class=\'import-fail-count import-report-count\'>\n                    <i class=\'fa fa-fw fa-times-circle ui-state-error-color\'></i>\n                    <span class=\'import-fail-count-count\'>0 failed imports</span>\n                </div>\n\n                <div class=\'import-abort-count import-report-count\'>\n                    <i class=\'fa fa-fw fa-exclamation-circle\'></i>\n                    <span class=\'import-abort-count-count\'>0 aborted imports</span>\n                </div>\n\n            </div>\n\n\n            <div class=\'errors-container general-errors-container\n                invisible\'>\n\n                <h1 class=\'errors-header ui-state-error ui-corner-all\'\n                    ><i class=\'errors-header-icon fa fa-fw\n                        fa-exclamation-triangle\'></i\n                    ><span class=\'errors-header-text\'>Errors</span></h1>\n\n                <button class=\'toggle-errors\' ><i class=\'fa fa-fw\n                    fa-caret-right\'></i></button>\n\n                <h1 class=\'no-errors-header ui-state-ok ui-corner-all invisible\'\n                    ><i class=\'no-errors-header-icon fa fa-fw\n                        fa-check-circle\'></i\n                    ><span class=\'no-errors-header-text\'>No Errors</span></h1>\n\n                <div class=\'general-errors-list-wrapper ui-corner-all\'>\n                    <ul class=\'general-errors-list Scrollable\'></ul>\n                </div>\n            </div>\n\n            <div class=\'warnings-container general-warnings-container\n                invisible\'>\n\n                <h1 class=\'warnings-header ui-state-highlight ui-corner-all\'\n                    ><i class=\'warnings-header-icon fa fa-fw\n                        fa-exclamation-triangle\'></i\n                    ><span class=\'warnings-header-text\'>Warnings</span>\n                  </h1>\n\n                <button class=\'toggle-warnings\' ><i class=\'fa fa-fw\n                    fa-caret-right\'></i></button>\n\n                <button class=\'fix-all-warnings dative-tooltip\' title=\'Fix all\n                    fixable warnings\' >Fix all warnings</button>\n\n                <h1 class=\'no-warnings-header ui-state-ok ui-corner-all invisible\'\n                    ><i class=\'no-warnings-header-icon fa fa-fw\n                        fa-check-circle\'></i\n                    ><span class=\'no-warnings-header-text\'>No Warnings</span></h1>\n\n                <div class=\'general-warnings-list-wrapper ui-corner-all\'>\n                    <ul class=\'general-warnings-list Scrollable\'></ul>\n                </div>\n            </div>\n\n            <div class=\'import-preview-table-wrapper ui-corner-all\'>\n                <div class=\'import-preview-table Scrollable\'>\n                    <div class=\'import-preview-table-head\'></div>\n                    <div class=\'import-preview-table-body\'></div>\n                </div>\n            </div>\n        </div>\n\n    </div>\n</div>\n\n<div class=\'import-templates\' style=\'display: none;\'>\n\n    <li class=\'import-warning-list-item\'>\n        <div class=\'import-warning ui-state-highlight ui-corner-all\'>\n            <i class=\'fa fa-fw fa-exclamation-triangle\'></i>\n            Warning: <span class=\'warning-text\'></span>\n        </div>\n        <button class=\'warning-solution import-solution\'></button>\n    </li>\n\n    <li class=\'import-error-list-item\'>\n        <div class=\'import-error ui-state-error ui-corner-all\'>\n            <i class=\'fa fa-fw fa-exclamation-triangle\'></i>\n            Error: <span class=\'error-text\'></span>\n        </div>\n        <button class=\'error-solution import-solution\'></button>\n    </li>\n\n</div>\n\n'));
    
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
