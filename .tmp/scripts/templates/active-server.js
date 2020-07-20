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
      var i, len, ref, server;
    
      _print(_safe('<label for="activeServer">'));
    
      _print(this.label);
    
      _print(_safe('</label>\n<select name="activeServer" class="activeServer">\n  <option value="null">--</option>\n  '));
    
      ref = this.servers;
      for (i = 0, len = ref.length; i < len; i++) {
        server = ref[i];
        _print(_safe('\n    '));
        if (server.id === this.activeServerId) {
          _print(_safe('\n      <option value="'));
          _print(server.id);
          _print(_safe('" selected >'));
          _print(server.name);
          _print(_safe('</option>\n    '));
        } else {
          _print(_safe('\n      <option value="'));
          _print(server.id);
          _print(_safe('">'));
          _print(server.name);
          _print(_safe('</option>\n    '));
        }
        _print(_safe('\n  '));
      }
    
      _print(_safe('\n</select>\n\n'));
    
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
