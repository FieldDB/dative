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
      _print(_safe('<div class="dative-widget-header ui-widget-header ui-corner-top">\n\n  <div class=\'dative-widget-header-title container-center\'\n     ><span class=\'search-type-header\'>'));
    
      _print(this.searchTypeCapitalized);
    
      _print(_safe('</span>\n    Search over '));
    
      _print(this.targetResourceNamePluralCapitalized);
    
      _print(_safe('</div>\n\n  <div class=\'button-container-left\'>\n\n    <button class="hide-search-widget dative-tooltip"\n            title="hide this search widget">\n      <i class=\'fa fa-times fa-fw\'></i>\n    </button>\n\n    <button class=\'advanced-search dative-tooltip\'\n        title=\'Show the advanced search interface\'\n        >Advanced Search</button>\n\n    <button class=\'smart-search dative-tooltip\'\n        title=\'Show the smart search interface\'\n        >Smart Search</button>\n\n  </div>\n\n  <div class=\'button-container-right\'>\n\n    <span class="spinner-container"></span>\n\n    <button class=\'browse-return dative-tooltip\'\n        title=\'go back to browsing all '));
    
      _print(this.targetResourceNamePlural);
    
      _print(_safe('\'\n    >Browse All</button>\n\n    <button class=\'reset-query dative-tooltip\'\n        title=\'Reset the query\'\n        ><i class=\'fa fa-fw fa-refresh\'></i></button>\n\n    <button class=\'help dative-tooltip\'\n          title=\'help with searching '));
    
      _print(this.targetResourceNamePlural);
    
      _print(_safe('\'\n    ><i class=\'fa fa-fw fa-question\'></i>\n    </button>\n\n  </div>\n\n</div>\n\n<div class="dative-widget-body">\n\n    <div class="search-form linguistic-data-entry-form">\n\n        <div class="advanced-search-interface">\n            <ul class="fieldset advanced-search-interface"></ul>\n        </div>\n\n        <div class="smart-search-interface">\n            <textarea\n             class=\'smart-search-input dative-tooltip ui-corner-all\'\n             title=\'Enter some stuff to search for and Dative will try to guess\n                what you want\'\n             name=\'smart-search\'>'));
    
      _print(this.smartSearch);
    
      _print(_safe('</textarea>\n\n            <div class=\'smart-search-preview-container\'></div>\n\n        </div>\n\n        <ul class="fieldset button-only-fieldset">\n\n            <li class="center">\n\n                <button\n                    class="search-button dative-tooltip"\n                    title=\'browse the results of this search\'\n                >Search</button>\n\n                <button\n                    class="count-button dative-tooltip"\n                    title=\'count how many results this search returns\'\n                >Count</button>\n\n                '));
    
      if (this.targetResourceNamePlural === 'forms') {
        _print(_safe('\n                <button\n                    class="save-button dative-tooltip"\n                    title=\'save this search\'\n                >Save</button>\n                '));
      }
    
      _print(_safe('\n\n            </li>\n\n        </ul>\n\n    </div>\n\n</div>\n\n'));
    
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
