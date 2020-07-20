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
      var object, ref, verb;
    
      _print(_safe('<div class="dative-widget-header ui-widget-header ui-corner-top">\n\n  '));
    
      if (this.parentFile) {
        _print(_safe('\n      <div class=\'dative-widget-header-title container-center-left\n        parent-file-header-title\'\n        >'));
        _print(this.headerTitle);
        _print(_safe('</div>\n  '));
      } else {
        _print(_safe('\n    <div class=\'dative-widget-header-title container-center\'\n        >'));
        _print(this.headerTitle);
        _print(_safe('</div>\n  '));
      }
    
      _print(_safe('\n\n  <div class=\'button-container-left\'>\n\n    '));
    
      if (this.parentFile) {
        _print(_safe('\n        <button class="deselect dative-tooltip"\n                title="Deselect this file as the parent file"\n            >deselect</button>\n    '));
      } else {
        _print(_safe('\n        <button class="hide-file-data-widget dative-tooltip"\n                title="hide the file data widget of this '));
        _print(this.resourceName);
        _print(_safe('">\n            <i class=\'fa fa-times fa-fw\'></i>\n        </button>\n    '));
      }
    
      _print(_safe('\n\n  </div>\n\n  <div class=\'button-container-right\'>\n\n    <span class="spinner-container"></span>\n\n    '));
    
      if (this.parentFile) {
        _print(_safe('\n\n        <span class=\'current-time-seconds\'>0s</span>\n\n        <button class=\'set-current-position-to-start dative-tooltip\'\n                title=\'set current position as the “start” value\'\n            >set start</button>\n\n        <button class=\'set-current-position-to-end dative-tooltip\'\n            title=\'set current position as the “end” value\'\n            >set end</button>\n\n    '));
      } else {
        _print(_safe('\n\n        '));
        if (this.undownloadable) {
          _print(_safe('\n            <a href="'));
          _print(this.fileURL);
          _print(_safe('" type="'));
          _print(this.MIMEType);
          _print(_safe('" target="_blank">\n                <button class=\'file-data-download dative-tooltip\'\n                        title=\'visit the page where this '));
          _print(this.resourceName);
          _print(_safe('’s data\n                            are stored\'\n                ><i class=\'fa fa-fw fa-external-link\'></i></button>\n            </a>\n        '));
        } else {
          _print(_safe('\n            <a href="'));
          _print(this.fileURL);
          _print(_safe('" type="'));
          _print(this.MIMEType);
          _print(_safe('"\n            download="'));
          _print(this.name);
          _print(_safe('" target="_blank">\n                <button class=\'file-data-download dative-tooltip\'\n                        title=\'download the file data of this '));
          _print(this.resourceName);
          _print(_safe('\'\n                ><i class=\'fa fa-fw fa-download\'></i></button>\n        </a>\n        '));
        }
        _print(_safe('\n\n        <button class=\'file-data-help dative-tooltip\'\n                title=\'help with viewing the file data of this\n                '));
        _print(this.resourceName);
        _print(_safe('\'\n        ><i class=\'fa fa-fw fa-question\'></i>\n        </button>\n\n    '));
      }
    
      _print(_safe('\n\n  </div>\n\n</div>\n\n<div '));
    
      _print(this.containerStyle);
    
      _print(_safe(' class="dative-widget-body ui-corner-bottom">\n\n        '));
    
      if (this.MIMEType === 'application/pdf') {
        _print(_safe('\n            <object class="file-data-pdf"\n                    data="'));
        _print(this.fileURL);
        _print(_safe('"\n                    type="'));
        _print(this.MIMEType);
        _print(_safe('"\n                    name="'));
        _print(this.name);
        _print(_safe('"\n                    >'));
        _print(this.name);
        _print(_safe('</object>\n        '));
      } else if (this.type === 'audio') {
        _print(_safe('\n            <audio class="file-data-audio" controls>\n                <!-- We try to load the reduced .ogg copy here -->\n                '));
        if (this.lossyFilename && this.MIMEType === 'audio/x-wav') {
          _print(_safe('\n                    <source\n                        src="'));
          _print(this.reducedURL);
          _print(_safe('"\n                        type="audio/ogg">\n                '));
        }
        _print(_safe('\n                <source\n                    src="'));
        _print(this.fileURL);
        _print(_safe('"\n                    type="'));
        _print(this.MIMEType);
        _print(_safe('">\n                Your browser does not support the audio tag.\n            </audio>\n        '));
      } else if (this.type === 'video' && this.canPlayVideo) {
        _print(_safe('\n            <video class="file-data-video ui-corner-bottom" controls>\n                <source\n                    src="'));
        _print(this.fileURL);
        _print(_safe('"\n                    type="'));
        _print(this.MIMEType);
        _print(_safe('">\n                Your browser does not support the video tag.\n            </video>\n        '));
      } else if (this.type === 'image') {
        _print(_safe('\n            <img class="file-data-image ui-corner-bottom"\n                 src="'));
        _print(this.fileURL);
        _print(_safe('"></img>\n        '));
      } else if (this.embedCode) {
        _print(_safe('\n            '));
        _print(_safe(this.embedCode));
        _print(_safe('\n        '));
      } else {
        _print(_safe('\n            '));
        object = this.name ? "the file " + this.name : "this file";
        _print(_safe('\n            '));
        verb = (ref = this.type) === 'audio' || ref === 'video' ? 'play' : 'display';
        _print(_safe('\n            <div class=\'file-data-no-display\'>Sorry, '));
        _print(object);
        _print(_safe(' cannot be\n                '));
        _print(verb);
        _print(_safe('ed.</div>\n        '));
      }
    
      _print(_safe('\n\n</div>\n\n'));
    
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
