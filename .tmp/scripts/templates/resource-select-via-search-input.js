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
      _print(_safe('<div class=\'resource-select-via-search-input-container\'>\n\n<div class=\'resource-select-via-search-interface\'>\n\n    <i class="fa fa-search search-term-icon black-fa"></i>\n\n    '));
    
      if (this.multiSelect) {
        _print(_safe('\n    <input\n        type=\'text\'\n        name=\'search-term\'\n        class=\'dative-tooltip ui-corner-all resource-select-via-search-input-input\'\n        title=\'Enter a pattern to search for '));
        _print(this.resourceNameHuman);
        _print(_safe('.\'\n        />\n    '));
      } else {
        _print(_safe('\n    <input\n        type=\'text\'\n        name=\'search-term\'\n        class=\'dative-tooltip ui-corner-all resource-select-via-search-input-input\'\n        title=\'Enter a pattern to search for a '));
        _print(this.resourceNameHuman);
        _print(_safe('.\'\n        />\n    '));
      }
    
      _print(_safe('\n\n    <button\n        class=\'perform-search dative-tooltip\n            resource-select-via-search-input-button\'\n        title=\'Click here to perform the search; results will be returned in the\n            page.\'\n        >Search</button>\n\n    '));
    
      if (this.multiSelect) {
        _print(_safe('\n    <button\n        class=\'create-new-resource dative-tooltip\n            resource-select-via-search-input-button\'\n        title=\'Click here to create a new '));
        _print(this.resourceNameHumanSingular);
        _print(_safe('\n            within the page\'\n        ><i class=\'fa fa-fw fa-plus\'></i></button>\n    '));
      } else {
        _print(_safe('\n    <button\n        class=\'create-new-resource dative-tooltip\n            resource-select-via-search-input-button\'\n        title=\'Click here to create a new '));
        _print(this.resourceNameHuman);
        _print(_safe(' within the\n            page\'\n        ><i class=\'fa fa-fw fa-plus\'></i></button>\n    '));
      }
    
      _print(_safe('\n\n</div>\n\n<div class=\'resource-results-via-search-table-wrapper ui-corner-all\n    dative-shadowed-widget ui-widget ui-widget-content\'>\n\n    <div class=\'dative-widget-header ui-widget-header ui-corner-top\'>\n\n        <div class=\'button-container-left\'>\n            <span class=\'results-count\'></span>\n        </div>\n\n        <div class=\'dative-widget-header-title container-center\'\n            ><span\n                class=\'search-results-resource-name-truncated\'\n                >'));
    
      _print(this.resourceNameHumanCapitalized);
    
      _print(_safe('</span> Search Results</div>\n\n        <div class=\'button-container-right\'>\n            <span class=\'results-showing-count\'></span>\n        </div>\n\n    </div>\n\n    <div class=\'dative-widget-body ui-corner-bottom\n        resource-results-via-search-table\'></div>\n\n</div>\n\n<div class=\'selected-resource-display-container\'></div>\n<!-- <div class=\'selected-resource-display-container dative-shadowed-widget\n    ui-widget ui-widget-content ui-corner-all\'></div> -->\n\n</div>\n'));
    
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
