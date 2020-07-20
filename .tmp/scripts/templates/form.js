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
      _print(_safe('<div class="dative-widget-header ui-widget-header ui-corner-top">\n\n  <div class=\'button-container-left\'>\n\n    '));
    
      if (this.addUpdateType === 'add') {
        _print(_safe('\n      <button class="hide-form-widget dative-tooltip"\n        title="hide this new form widget">\n        <i class=\'fa fa-times fa-fw\'></i>\n      </button>\n    '));
      } else {
        _print(_safe('\n      <button class="hide-form-details dative-tooltip"\n        title="hide the buttons and extra data of this form">\n        <i class=\'fa fa-angle-double-up fa-fw\'></i>\n      </button>\n  '));
      }
    
      _print(_safe('\n\n    <button class="toggle-secondary-data dative-tooltip"\n      title="hide the secondary data of this form">\n      <i class=\'fa fa-angle-up fa-fw\'></i>\n    </button>\n\n    <button class="toggle-data-labels dative-tooltip"\n      title="show labels">labels:\n      <i class=\'fa fa-toggle-off fa-fw\'></i>\n    </button>\n\n  </div>\n\n  <div class=\'dative-widget-header-title\'>'));
    
      _print(this.headerTitle || '');
    
      _print(_safe('</div>\n\n  <div class=\'button-container-right\'>\n\n    <button class="update-form dative-tooltip"\n      '));
    
      if (this.addUpdateType === 'add') {
        _print(_safe('\n        title="edit the details of this form"\n      '));
      } else {
        _print(_safe('\n        title="update this form"\n      '));
      }
    
      _print(_safe('\n      ><i class=\'fa fa-pencil-square-o fa-fw\'></i>\n    </button>\n\n    <!-- TODO: make assoiate part of the update interface.\n    <button class="associate-form dative-tooltip"\n      title="associate this form to a file">\n      <i class=\'fa fa-link fa-fw\'></i>\n    </button>\n    -->\n\n    <button class="export-form dative-tooltip"\n      title="export this form"\n      ><i class=\'fa fa-download fa-fw\'></i>\n    </button>\n\n    '));
    
      if (this.addUpdateType === 'update') {
        _print(_safe('\n\n      <button class="remember-form dative-tooltip"\n        title="copy this form to your personal clipboard"\n        ><i class=\'fa fa-clipboard fa-fw\'></i>\n      </button>\n\n      <button class="delete-form dative-tooltip"\n        title="delete this form"\n        ><i class=\'fa fa-trash fa-fw\'></i>\n      </button>\n\n      <button class="duplicate-form dative-tooltip"\n        title="duplicate this form"\n        ><i class=\'fa fa-copy fa-fw\'></i>\n      </button>\n\n      <button class="form-history dative-tooltip"\n        title="view the history of this form"\n        ><i class=\'fa fa-history fa-fw\'></i>\n      </button>\n\n    '));
      }
    
      _print(_safe('\n\n  </div>\n\n</div>\n\n\n<div class=\'dative-widget-body\'>\n\n  <div class=\'update-form-widget update-widget dative-widget-center ui-widget\n    ui-widget-content ui-corner-all\'></div>\n\n  <div class=\'form-primary-data dative-form-primary-data\'>\n    <div class=\'form-igt-data dative-form-igt\'></div>\n    <div class=\'form-translations-data\'></div>\n  </div>\n\n  <div class=\'form-secondary-data\'></div>\n\n</div>\n\n'));
    
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
