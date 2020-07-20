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
      var colIndex, coord, dim, editable, fontSize, height, i, j, k, keyCount, l, label, len, len1, len2, meta, mode, ref, ref1, ref2, ref3, ref4, ref5, ref6, repr, rowIndex, spacerHeight, style, subIndex, subcoord, subdim, title, width;
    
      _print(_safe('<div class=\'keyboard-table\'>\n'));
    
      ref = this.keyboardLayout.rows;
      for (rowIndex = i = 0, len = ref.length; i < len; rowIndex = ++i) {
        keyCount = ref[rowIndex];
        _print(_safe('\n    <div class=\'keyboard-table-row row-'));
        _print(rowIndex);
        _print(_safe('\'>\n\n    '));
        for (colIndex = j = 0, ref1 = keyCount; 0 <= ref1 ? j < ref1 : j > ref1; colIndex = 0 <= ref1 ? ++j : --j) {
          _print(_safe('\n        '));
          coord = rowIndex + "-" + colIndex;
          _print(_safe('\n        '));
          meta = this.keyboardLayout.coord2meta[coord];
          _print(_safe('\n        '));
          ref2 = [meta != null ? meta.editable : void 0, meta != null ? meta.repr : void 0], editable = ref2[0], repr = ref2[1];
          _print(_safe('\n        '));
          dim = this.keyboardLayout.dimensions[coord];
          _print(_safe('\n\n        '));
          if (dim) {
            _print(_safe('\n\n            <!-- CASE: array of dimension objects (sub-keys) -->\n            '));
            if (dim.length) {
              _print(_safe('\n                <div class=\'keyboard-table-cell-container ui-corner-all\'>\n                    '));
              for (subIndex = k = 0, len1 = dim.length; k < len1; subIndex = ++k) {
                subdim = dim[subIndex];
                _print(_safe('\n                        '));
                subcoord = coord + "-" + subIndex;
                _print(_safe('\n                        '));
                meta = this.keyboardLayout.coord2meta[subcoord];
                _print(_safe('\n                        '));
                ref3 = [meta != null ? meta.editable : void 0, meta != null ? meta.repr : void 0], editable = ref3[0], repr = ref3[1];
                _print(_safe('\n                        '));
                width = subdim.width * this.keyboardLayout.ppi;
                _print(_safe('\n                        '));
                height = subdim.height * this.keyboardLayout.ppi;
                _print(_safe('\n                        '));
                if (height > 25) {
                  spacerHeight = 0.4 * height;
                } else {
                  spacerHeight = 0;
                }
                _print(_safe('\n                        '));
                if (editable) {
                  _print(_safe('\n                            '));
                  if (this.editable) {
                    _print(_safe('\n                                '));
                    title = meta.unicodeMetadata[0] + ". Double-click to edit.";
                    _print(_safe('\n                            '));
                  } else {
                    _print(_safe('\n                                '));
                    title = meta.unicodeMetadata[0] + ".";
                    _print(_safe('\n                            '));
                  }
                  _print(_safe('\n                        <div class=\'editable dative-tooltip keyboard-table-cell coord-'));
                  _print(subcoord);
                  _print(_safe(' ui-corner-all\'\n                             title=\''));
                  title;
                  _print(_safe('\'\n                        '));
                } else {
                  _print(_safe('\n                        <div class=\'uneditable keyboard-table-cell coord-'));
                  _print(subcoord);
                  _print(_safe(' ui-corner-all\'\n                        '));
                }
                _print(_safe('\n                             style=\'width: '));
                _print(width);
                _print(_safe('px; height: '));
                _print(height);
                _print(_safe('px;\'\n                             data-coord=\''));
                _print(subcoord);
                _print(_safe('\'>\n                            <div class=\'spacer-above-repr\'\n                                 style=\'height: '));
                _print(spacerHeight);
                _print(_safe('px;\'></div>\n                            <div class=\'key-repr keyboard-cell-repr\'\n                                 >'));
                _print(repr[0]);
                _print(_safe('</div>\n                            <div class=\'key-repr keyboard-cell-shift-repr\'\n                                 style=\'display: none;\'>'));
                _print(repr[1]);
                _print(_safe('</div>\n                            <div class=\'key-repr keyboard-cell-alt-repr\'\n                                 style=\'display: none;\'>'));
                _print(repr[2]);
                _print(_safe('</div>\n                            <div class=\'key-repr keyboard-cell-alt-shift-repr\'\n                                 style=\'display: none;\'>'));
                _print(repr[3]);
                _print(_safe('</div>\n                        </div>\n                    '));
              }
              _print(_safe('\n                </div>\n\n            <!-- CASE: single dimension objects for single key -->\n            '));
            } else {
              _print(_safe('\n                '));
              width = dim.width * this.keyboardLayout.ppi;
              _print(_safe('\n                '));
              height = dim.height * this.keyboardLayout.ppi;
              _print(_safe('\n                '));
              if (!repr[1] && height > 25) {
                style = ' style=\'margin-top: 1em;\'';
              } else {
                style = '';
              }
              _print(_safe('\n                '));
              if (((ref4 = repr[0]) != null ? ref4.length : void 0) > 5) {
                fontSize = ' font-size: 75%;';
              } else {
                fontSize = '';
              }
              _print(_safe('\n                '));
              if (height > 25) {
                spacerHeight = 0.4 * height;
              } else {
                spacerHeight = 0;
              }
              _print(_safe('\n                '));
              if (editable) {
                _print(_safe('\n                    '));
                if (this.editable) {
                  _print(_safe('\n                        '));
                  title = meta.unicodeMetadata[0] + ". Double-click to edit.";
                  _print(_safe('\n                    '));
                } else {
                  _print(_safe('\n                        '));
                  title = meta.unicodeMetadata[0] + ".";
                  _print(_safe('\n                    '));
                }
                _print(_safe('\n                <div class=\'editable dative-tooltip keyboard-table-cell coord-'));
                _print(coord);
                _print(_safe(' ui-corner-all\'\n                     title=\''));
                _print(title);
                _print(_safe('\'\n                '));
              } else {
                _print(_safe('\n                <div class=\'uneditable keyboard-table-cell coord-'));
                _print(coord);
                _print(_safe(' ui-corner-all\'\n                '));
              }
              _print(_safe('\n                     style=\'width: '));
              _print(width);
              _print(_safe('px; height: '));
              _print(height);
              _print(_safe('px;'));
              _print(fontSize);
              _print(_safe('\'\n                     data-coord=\''));
              _print(coord);
              _print(_safe('\'>\n                    <div class=\'spacer-above-repr\'\n                         style=\'height: '));
              _print(spacerHeight);
              _print(_safe('px;\'></div>\n                    <div class=\'key-repr keyboard-cell-repr\'\n                         >'));
              _print(repr[0]);
              _print(_safe('</div>\n                    <div class=\'key-repr keyboard-cell-shift-repr\'\n                         style=\'display: none;\'>'));
              _print(repr[1]);
              _print(_safe('</div>\n                    <div class=\'key-repr keyboard-cell-alt-repr\'\n                         style=\'display: none;\'>'));
              _print(repr[2]);
              _print(_safe('</div>\n                    <div class=\'key-repr keyboard-cell-alt-shift-repr\'\n                         style=\'display: none;\'>'));
              _print(repr[3]);
              _print(_safe('</div>\n                </div>\n            '));
            }
            _print(_safe('\n\n        <!-- CASE: default dimensions for single key -->\n        '));
          } else {
            _print(_safe('\n            '));
            width = this.keyboardLayout.defaultDimensions.width * this.keyboardLayout.ppi;
            _print(_safe('\n            '));
            height = this.keyboardLayout.defaultDimensions.height * this.keyboardLayout.ppi;
            _print(_safe('\n            '));
            if (((ref5 = repr[0]) != null ? ref5.length : void 0) > 5) {
              fontSize = ' font-size: 75%;';
            } else {
              fontSize = '';
            }
            _print(_safe('\n            '));
            if (height > 25) {
              spacerHeight = 0.4 * height;
            } else {
              spacerHeight = 0;
            }
            _print(_safe('\n            '));
            if (editable) {
              _print(_safe('\n                '));
              if (this.editable) {
                _print(_safe('\n                    '));
                title = meta.unicodeMetadata[0] + ". Double-click to edit.";
                _print(_safe('\n                '));
              } else {
                _print(_safe('\n                    '));
                title = meta.unicodeMetadata[0] + ".";
                _print(_safe('\n                '));
              }
              _print(_safe('\n            <div class=\'editable dative-tooltip keyboard-table-cell coord-'));
              _print(coord);
              _print(_safe(' ui-corner-all\'\n                 title=\''));
              _print(title);
              _print(_safe('\'\n            '));
            } else {
              _print(_safe('\n            <div class=\'uneditable keyboard-table-cell coord-'));
              _print(coord);
              _print(_safe(' ui-corner-all\'\n            '));
            }
            _print(_safe('\n                 style=\'width: '));
            _print(width);
            _print(_safe('px; height: '));
            _print(height);
            _print(_safe('px;'));
            _print(fontSize);
            _print(_safe('\'\n                 data-coord=\''));
            _print(coord);
            _print(_safe('\'>\n                 <div class=\'spacer-above-repr\'\n                      style=\'height: '));
            _print(spacerHeight);
            _print(_safe('px;\'></div>\n                <div class=\'key-repr keyboard-cell-repr\'>'));
            _print(repr[0]);
            _print(_safe('</div>\n                <div class=\'key-repr keyboard-cell-shift-repr\'\n                     style=\'display: none;\'>'));
            _print(repr[1]);
            _print(_safe('</div>\n                <div class=\'key-repr keyboard-cell-alt-repr\'\n                     style=\'display: none;\'>'));
            _print(repr[2]);
            _print(_safe('</div>\n                <div class=\'key-repr keyboard-cell-alt-shift-repr\'\n                     style=\'display: none;\'>'));
            _print(repr[3]);
            _print(_safe('</div>\n            </div>\n        '));
          }
          _print(_safe('\n\n    '));
        }
        _print(_safe('\n\n    </div>\n'));
      }
    
      _print(_safe('\n</div>\n\n<div class=\'keyboard-test-input-container\'>\n    <textarea class=\'dative-tooltip keyboard-test-input ui-corner-all\'\n        title=\'Test the keyboard here\'\n    ></textarea>\n</div>\n\n<div class=\'key-map-interface\' style=\'display: none;\'>\n\n    <div class=\'key-map-table ui-corner-all dative-shadowed-widget ui-widget ui-widget-content\'>\n        <div class=\'key-map-table-header dative-widget-header ui-widget-header\n            ui-corner-top\'>\n            <div class=\'dative-widget-header-title container-center\'>\n                Key #<span class=\'key-map-table-keycode\'></span>\n            </div>\n            <div class=\'button-container-left\'>\n                <button class="hide-key-map-table dative-tooltip"\n                        title="hide key map interface">\n                    <i class=\'fa fa-times fa-fw\'></i>\n                </button>\n            </div>\n        </div>\n        <div class=\'dative-widget-body\'>\n            '));
    
      ref6 = ['default', 'shift', 'alt', 'altshift'];
      for (l = 0, len2 = ref6.length; l < len2; l++) {
        mode = ref6[l];
        _print(_safe('\n            '));
        if (mode === 'altshift') {
          _print(_safe('\n                '));
          label = 'alt+shift';
          title = ' and the alt and shift keys are being held down.';
          _print(_safe('\n            '));
        } else {
          _print(_safe('\n                '));
          label = mode;
          _print(_safe('\n                '));
          if (mode === 'alt') {
            _print(_safe('\n                    '));
            title = ' and the alt key is being held down.';
            _print(_safe('\n                '));
          } else if (mode === 'shift') {
            _print(_safe('\n                    '));
            title = ' and the shift key is being held down.';
            _print(_safe('\n                '));
          } else {
            _print(_safe('\n                    '));
            title = '.';
            _print(_safe('\n                '));
          }
          _print(_safe('\n            '));
        }
        _print(_safe('\n            <div class=\'key-mapping\'>\n                <div class=\'key-mapping-label-container\'>\n                    <label for=\''));
        _print(mode);
        _print(_safe('\' class=\'key-mapping-label\'\n                        >'));
        _print(label);
        _print(_safe('</label>\n                </div>\n                <textarea name=\''));
        _print(mode);
        _print(_safe('\' data-keycode=\'\'\n                    maxlength=\'5\' title=\'Enter the character or string that\n                        should be produced when this key is pressed'));
        _print(title);
        _print(_safe('\'\n                    class=\'dative-tooltip ui-corner-all key-mapping-value\'\n                    ></textarea>\n            </div>\n            '));
      }
    
      _print(_safe('\n        </div>\n    </div>\n\n</div>\n\n'));
    
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
