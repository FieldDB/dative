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
      var attribute, i, j, len, len1, ref, ref1,
        indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };
    
      _print(_safe('<div class="dative-widget-header ui-widget-header ui-corner-top">\n\n  <div class=\'dative-widget-header-title container-center\'\n    >'));
    
      _print(this.headerTitle);
    
      _print(_safe('</div>\n\n  <div class=\'button-container-left\'>\n\n    <button class="hide-settings-widget dative-tooltip"\n            title="hide this '));
    
      _print(this.resourceName);
    
      _print(_safe(' settings widget">\n      <i class=\'fa fa-times fa-fw\'></i>\n    </button>\n\n  </div>\n\n  <div class=\'button-container-right\'>\n\n    <span class="spinner-container"></span>\n\n    <button class=\'settings-help dative-tooltip\'\n            title=\'help with '));
    
      _print(this.resourceName);
    
      _print(_safe(' settings\'\n    ><i class=\'fa fa-fw fa-question\'></i>\n    </button>\n\n  </div>\n\n</div>\n\n<div class="dative-widget-body">\n\n    <div class="settings-container">\n\n\n        <!-- Field Visibilities -->\n\n        <div class="attribute-visibilities dative-widget-center">\n\n            <h1>Field Visibility</h1>\n\n            <button class="toggle-attribute-visibilities dative-tooltip"\n                    title="toggle controls for altering field visibilities"\n                ><i class="fa fa-fw fa-caret-right"></i>\n            </button>\n\n            <p>Control the visibility of '));
    
      _print(this.resourceName);
    
      _print(_safe(' fields.</p>\n\n            <div class="attribute-visibilities-attributes Scrollable ui-corner-all">\n\n            '));
    
      ref = this.resourceFields;
      for (i = 0, len = ref.length; i < len; i++) {
        attribute = ref[i];
        _print(_safe('\n                <div class="attribute-visibility-container dative-widget-center">\n\n                    <div class=\'attribute-visibility\n                        attribute-visibility-'));
        _print(this.utils.snake2hyphen(attribute));
        _print(_safe('\'\n                     ><select name=\''));
        _print(attribute);
        _print(_safe('\'\n                              class=\'attribute-visibility-select\'>\n                            '));
        if (indexOf.call(this.fieldCategories.hidden, attribute) >= 0) {
          _print(_safe('\n                                <option value=\'visible\'>visible</option>\n                                <option value=\'hidden\' selected>hidden</option>\n                            '));
        } else {
          _print(_safe('\n                                <option value=\'visible\' selected>visible</option>\n                                <option value=\'hidden\'>hidden</option>\n                            '));
        }
        _print(_safe('\n                        </select>\n                    </div>\n\n                    '));
        if (indexOf.call(this.fieldCategories.hidden, attribute) >= 0) {
          _print(_safe('\n                        <div class=\'attribute-name hidden large-unicode-font\n                                    attribute-'));
          _print(this.utils.snake2hyphen(attribute));
          _print(_safe('\'>\n                            <span>'));
          _print(this.utils.snake2regular(attribute));
          _print(_safe('</span>\n                        </div>\n                    '));
        } else {
          _print(_safe('\n                        <div class=\'attribute-name large-unicode-font\n                                    attribute-'));
          _print(this.utils.snake2hyphen(attribute));
          _print(_safe('\'>\n                            <span>'));
          _print(this.utils.snake2regular(attribute));
          _print(_safe('</span>\n                        </div>\n                    '));
        }
        _print(_safe('\n\n                </div>\n            '));
      }
    
      _print(_safe('\n\n            </div>\n\n        </div>\n\n\n        <!-- "Sticky" Fields: those whose values stick around -->\n\n        <div class="sticky-attributes dative-widget-center">\n\n            <h1>Sticky Fields</h1>\n\n            <button class="toggle-sticky-attributes dative-tooltip"\n                    title="toggle controls for specifying sticky fields"\n                ><i class="fa fa-fw fa-caret-right"></i>\n            </button>\n\n            <p>Specify which fields should be sticky, i.e., which should have\n                their previously entered values pre-entered when creating new\n                '));
    
      _print(this.resourceNamePlural);
    
      _print(_safe('.</p>\n\n            <div class="sticky-attributes-attributes Scrollable ui-corner-all">\n\n            '));
    
      ref1 = this.possiblyStickyAttributes;
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        attribute = ref1[j];
        _print(_safe('\n                <div class="sticky-attributes-container dative-widget-center">\n\n                    <div class=\'attribute-stickiness\n                        attribute-stickiness-'));
        _print(this.utils.snake2hyphen(attribute));
        _print(_safe('\'\n                     >\n                      '));
        if (indexOf.call(this.stickyAttributes, attribute) >= 0) {
          _print(_safe('\n                          <i data-attr=\''));
          _print(attribute);
          _print(_safe('\'\n                            class=\'stickiness-checkbox fa fa-2x fa-check-square\'></i>\n                      '));
        } else {
          _print(_safe('\n                          <i data-attr=\''));
          _print(attribute);
          _print(_safe('\'\n                            class=\'stickiness-checkbox fa fa-2x fa-square\'></i>\n                      '));
        }
        _print(_safe('\n                    </div>\n\n                    <div class=\'attribute-name large-unicode-font\n                                attribute-'));
        _print(this.utils.snake2hyphen(attribute));
        _print(_safe('\'>\n                        <span>'));
        _print(this.utils.snake2regular(attribute));
        _print(_safe('</span>\n                    </div>\n\n                </div>\n            '));
      }
    
      _print(_safe('\n\n            </div>\n\n        </div>\n\n\n        <!-- Morphological Parser Tasks -->\n\n        '));
    
      if (this.resourceName === 'form') {
        _print(_safe('\n\n            <div class=\'parsers dative-widget-center\'>\n\n                <h1>Parser, Phonology &amp; Morphology Tasks</h1>\n\n                <button class=\'toggle-parser-task-set dative-tooltip\'\n                        title=\'toggle controls for assigning tasks to parsers,\n                               phonologies and morphologies \'\n                        ><i class=\'fa fa-fw fa-caret-right\'></i></button>\n\n                <p>Assign form-related tasks to parsers, phonologies and\n                    morphologies.</p>\n\n                <div class=\'parser-task-set-container\'></div>\n            </div>\n\n        '));
      }
    
      _print(_safe('\n\n\n\n    </div>\n\n</div>\n\n\n\n'));
    
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
