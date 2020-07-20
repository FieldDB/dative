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
      var i, j, len, len1, ref, ref1, ref2, ref3, themeName, themeNameHumanReadable;
    
      _print(_safe('<div class=\'dative-page-header ui-widget-header ui-corner-top\'>\n\n    <div class=\'button-container-left\'>\n        <button class="all-settings dative-tooltip"\n                title="Show all settings"\n                ><i class=\'fa fa-th-large fa-fw\'></i>\n        </button>\n    </div>\n\n    <div class=\'dative-page-header-title\'>'));
    
      _print(this.headerTitle);
    
      _print(_safe('</div>\n\n    <div class=\'button-container-right\'>\n\n        <button class="application-settings-help dative-tooltip"\n                title="Help with application settings"\n                ><i class=\'fa fa-question fa-fw\'></i>\n        </button>\n\n    </div>\n\n</div>\n\n<div class=\'dative-page-body\'>\n\n    <div class=\'application-settings-big-buttons\'>\n\n        <div class=\'big-button ui-corner-all servers dative-tooltip\'\n             title=\'Configure the OLD servers that you want to\n                connect to\'\n            ><div class=\'big-button-text\'>Servers</div>\n            <div class=\'big-button-icon\'>\n                <i class=\'fa fa-server fa-4x fa-fw fa-align-center\'></i>\n            </div>\n        </div>\n\n        '));
    
      if (this.loggedIn === true) {
        _print(_safe('\n\n            <div class=\'big-button ui-corner-all server-settings dative-tooltip\'\n                title=\'Configure the settings of the OLD server that you\n                    are logged in to\'\n                ><div class=\'big-button-text\'>Server Settings</div>\n                <div class=\'big-button-icon\'>\n                    <i class=\'fa fa-server fa-4x fa-fw fa-align-center\'></i>\n                    <i class=\'fa fa-cogs fa-4x fa-fw fa-align-center\'></i>\n                </div>\n            </div>\n\n            <div class=\'big-button ui-corner-all input-validation dative-tooltip\'\n                title=\'Control the possible values of certain form fields\'\n                ><div class=\'big-button-text\'>Input Validation</div>\n                <div class=\'big-button-icon\'>\n                    <i class=\'fa fa-check-circle fa-4x fa-fw fa-align-center\'></i>\n                    <i class=\'fa fa-times-circle fa-4x fa-fw fa-align-center\'></i>\n                </div>\n            </div>\n\n            <div class=\'big-button ui-corner-all keyboard-preferences dative-tooltip\'\n                title=\'Configure Dative keyboards to be used on specific input fields\'\n                ><div class=\'big-button-text\'>Keyboard Preferences</div>\n                <div class=\'big-button-icon\'>\n                    <i class=\'fa fa-keyboard-o fa-4x fa-fw fa-align-center\'></i>\n                </div>\n            </div>\n\n        '));
      }
    
      _print(_safe('\n\n        <div class=\'big-button ui-corner-all appearance dative-tooltip\'\n             title=\'Change how your Dative looks\'\n            ><div class=\'big-button-text\'>Appearance</div>\n            <div class=\'big-button-icon\'>\n                <i class=\'fa fa-picture-o fa-4x fa-fw fa-align-center\'></i>\n            </div>\n        </div>\n\n    </div>\n\n    <div class=\'application-settings-interfaces\'>\n\n        <div class=\'servers-interface application-settings-interface\'>\n            <div class=\'active-server\'></div>\n            <div class=\'servers-collection\'></div>\n        </div>\n\n        <div class=\'appearance-interface application-settings-interface\'>\n\n            '));
    
      ref = this.jQueryUIThemes;
      for (i = 0, len = ref.length; i < len; i++) {
        ref1 = ref[i], themeName = ref1[0], themeNameHumanReadable = ref1[1];
        _print(_safe('\n                '));
        if (themeName === this.activeJQueryUITheme) {
          _print(_safe('\n                    <div class=\'jquery-theme-image-container dative-tooltip\n                                dative-shadowed-widget ui-corner-all\n                                ui-state-highlight\n                                theme-'));
          _print(themeName);
          _print(_safe('\'\n                         tabindex=\'0\'\n                         title=\'Click to make Dative look like this\n                            “'));
          _print(themeNameHumanReadable);
          _print(_safe('” theme\'>\n                '));
        } else {
          _print(_safe('\n                    <div class=\'jquery-theme-image-container dative-tooltip\n                                dative-shadowed-widget ui-corner-all\n                                theme-'));
          _print(themeName);
          _print(_safe('\'\n                         tabindex=\'0\'\n                         title=\'Click to make Dative look like this\n                            “'));
          _print(themeNameHumanReadable);
          _print(_safe('” theme\'>\n                '));
        }
        _print(_safe('\n                        <div class=\'jquery-theme-name\'>'));
        _print(themeNameHumanReadable);
        _print(_safe('</div>\n                        <img src=\'images/jqueryui-theme-examples/'));
        _print(themeName);
        _print(_safe('.png\' />\n                    </div>\n            '));
      }
    
      _print(_safe('\n\n        </div>\n\n        <div class=\'server-settings-interface ui-corner-all\n            dative-paginated-item dative-shadowed-widget dative-widget-center\n            ui-widget ui-widget-content application-settings-interface\'></div>\n\n        <div class=\'keyboard-preferences-interface ui-corner-all\n            dative-paginated-item dative-shadowed-widget dative-widget-center\n            ui-widget ui-widget-content application-settings-interface\'></div>\n\n    </div>\n\n</div>\n\n  <!--\n  <div class="applicationSettingsForm">\n    <ul class="fieldset">\n\n      <li class="active-server"></li>\n\n      <li class="server-config-container"></li>\n\n      <li class="theme-selector">\n        <label for=\'css-theme\'>Theme</label>\n        <select name=\'css-theme\'>\n          '));
    
      ref2 = this.jQueryUIThemes;
      for (j = 0, len1 = ref2.length; j < len1; j++) {
        ref3 = ref2[j], themeName = ref3[0], themeNameHumanReadable = ref3[1];
        _print(_safe('\n            '));
        if (themeName === this.activeJQueryUITheme) {
          _print(_safe('\n              <option value="'));
          _print(themeName);
          _print(_safe('" selected\n              >'));
          _print(themeNameHumanReadable);
          _print(_safe('</option>\n            '));
        } else {
          _print(_safe('\n              <option value="'));
          _print(themeName);
          _print(_safe('"\n              >'));
          _print(themeNameHumanReadable);
          _print(_safe('</option>\n            '));
        }
        _print(_safe('\n          '));
      }
    
      _print(_safe('\n        </select>\n      </li>\n\n    </ul>\n  </div>\n  -->\n\n'));
    
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
