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
      _print(_safe('<div class=\'dative-tasks-dialog\'>\n\n    <div class=\'dative-tasks-content\'>\n\n        <div class=\'current-tasks\'>\n            <h2>Current Tasks</h2>\n            <div class=\'tasks-table current-tasks-table\'>\n                <div class=\'no-current-tasks\'>There are no tasks currently\n                pending.</div>\n                <table class=\'tasks-table\'>\n                    <thead>\n                        <tr>\n                            <th></th>\n                            <th>Resource</th>\n                            <th>Task</th>\n                            <th>Successful</th>\n                            <th>Time Elapsed</th>\n                            <th>Start Time</th>\n                            <th>End Time</th>\n                        </tr>\n                    </thead>\n                    <tbody></tbody>\n                </table>\n            </div>\n        </div>\n\n        <div class=\'terminated-tasks\'>\n            <h2>Terminated Tasks</h2>\n            <div class=\'tasks-table terminated-tasks-table\'>\n                <div class=\'no-terminated-tasks\'>There are no terminated\n                tasks.</div>\n                <table class=\'tasks-table\'>\n                    <thead>\n                        <tr>\n                            <th></th>\n                            <th>Resource</th>\n                            <th>Task</th>\n                            <th>Successful</th>\n                            <th>Time Elapsed</th>\n                            <th>Start Time</th>\n                            <th>End Time</th>\n                        </tr>\n                    </thead>\n                    <tbody></tbody>\n                </table>\n            </div>\n        </div>\n\n    </div>\n\n</div>\n\n<div class=\'dative-tasks-dialog-target\'><div>\n\n'));
    
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
