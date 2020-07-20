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
      _print(_safe('<td class="live-task-container">\n    <div class="live-task"></div>\n</td>\n<td class=\'resource-representation\'></td>\n<td>'));
    
      _print(this.taskName);
    
      _print(_safe('</td>\n<td>'));
    
      _print(this.successful);
    
      _print(_safe('</td>\n<td class=\'time-elapsed\'>'));
    
      _print(this.timeElapsed);
    
      _print(_safe('</td>\n<td>'));
    
      _print(this.startDate);
    
      _print(_safe('</td>\n<td>'));
    
      _print(this.endDate);
    
      _print(_safe('</td>\n\n'));
    
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
