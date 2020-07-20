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
      var attribute, buttonText, i, j, k, len, len1, len2, myAttribute, myModel, myRelation, mySubattribute, myValue, operandClass, ref, ref1, ref2, ref3, ref4, ref5, ref6, relation;
    
      _print(_safe('<table class=\'filter-expression-table\'>\n    <tr>\n\n        '));
    
      if ((ref = this.filterExpression[0]) === 'and' || ref === 'or' || ref === 'not') {
        _print(_safe('\n            '));
        buttonText = this.filterExpression[0];
        _print(_safe('\n        '));
      } else {
        _print(_safe('\n            '));
        buttonText = '<i class="fa fa-ellipsis-h"></i>';
        _print(_safe('\n        '));
      }
    
      _print(_safe('\n\n        <td class=\'middle-cell\'>\n            <div class=\'operator\'>\n                <button class=\'operator dative-tooltip\'\n                        title=\'click here to reveal buttons for changing this\n                            node.\'>'));
    
      _print(_safe(buttonText));
    
      _print(_safe('</button>\n\n                <div class=\'filter-expression-action-widget-container\'>\n                    <div class=\'filter-expression-action-widget ui-corner-all\n                        dative-shadowed-widget\'>\n\n                        <button class=\'conjoin dative-tooltip\'\n                                title=\'add an “and” to the left of this\n                                search expression.\'\n                                >and<i class=\'fa fa-arrow-left\'></i></button>\n\n                        <button class=\'make-and dative-tooltip\'\n                                title=\'change this to an “and”.\'>and</button>\n\n                        <button class=\'disjoin dative-tooltip\'\n                                title=\'add an “or” to the left of this\n                                    search expression.\'\n                                >or<i class=\'fa fa-arrow-left\'></i></button>\n\n                        <button class=\'make-or dative-tooltip\'\n                                title=\'change this to an “or”.\'>or</button>\n\n                        <button class=\'negate dative-tooltip\'\n                                title=\'negate this search\n                                    expression\'\n                                >not<i class=\'fa fa-arrow-left\'></i></button>\n\n                        <button class=\'make-not-not dative-tooltip\'\n                                title=\'remove the negation from this search\n                                expression\'><i>not</i></button>\n\n                        <button class=\'add-operand dative-tooltip\'\n                                title=\'add another search expression beneath\n                                    this one\'><i class=\'fa fa-plus\'\n                                    ></i>&nbsp;<i class=\'fa fa-arrow-right\'></i></button>\n\n                        <button class=\'destroy dative-tooltip\'\n                                title=\'destroy this search expression\'\n                            ><i class=\'fa fa-times\'></i></button>\n\n                    </div>\n                </div>\n            </div>\n        </td>\n\n        <td>\n            '));
    
      if ((ref1 = this.filterExpression[0]) === 'and' || ref1 === 'or') {
        _print(_safe('\n                '));
        operandClass = 'filter-expression-operand filter-expression-operand-array';
        _print(_safe('\n            '));
      } else {
        _print(_safe('\n                '));
        operandClass = 'filter-expression-operand';
        _print(_safe('\n            '));
      }
    
      _print(_safe('\n\n            <div class=\''));
    
      _print(operandClass);
    
      _print(_safe('\'>\n\n                '));
    
      if (this.filterExpression.length > 3) {
        _print(_safe('\n\n                    '));
        if (this.filterExpression.length === 5) {
          _print(_safe('\n                        '));
          ref2 = this.filterExpression, myModel = ref2[0], myAttribute = ref2[1], mySubattribute = ref2[2], myRelation = ref2[3], myValue = ref2[4];
          _print(_safe('\n                    '));
        } else {
          _print(_safe('\n                        '));
          ref3 = this.filterExpression, myModel = ref3[0], myAttribute = ref3[1], myRelation = ref3[2], myValue = ref3[3];
          _print(_safe('\n                        '));
          if (myValue === null) {
            _print(_safe('\n                            '));
            if (myRelation === '=') {
              _print(_safe('\n                                '));
              myRelation = 'is null';
              _print(_safe('\n                            '));
            } else if (myRelation === '!=') {
              _print(_safe('\n                                '));
              myRelation = 'is not null';
              _print(_safe('\n                            '));
            }
            _print(_safe('\n                        '));
          }
          _print(_safe('\n                    '));
        }
        _print(_safe('\n\n                    <select name=\'attribute\' class=\'attribute dative-tooltip\'\n                            tabindex=\'0\'\n                            title=\'select a '));
        _print(this.snake2regular(myModel).toLowerCase());
        _print(_safe('\n                                attribute to build a search expression on.\'>\n                        '));
        ref4 = this.attributes;
        for (i = 0, len = ref4.length; i < len; i++) {
          attribute = ref4[i];
          _print(_safe('\n                            '));
          if (attribute === myAttribute) {
            _print(_safe('\n                                <option value=\''));
            _print(attribute);
            _print(_safe('\' selected\n                                    >'));
            _print(this.snake2regular(attribute));
            _print(_safe('</option>\n                            '));
          } else {
            _print(_safe('\n                                <option value=\''));
            _print(attribute);
            _print(_safe('\'\n                                    >'));
            _print(this.snake2regular(attribute));
            _print(_safe('</option>\n                            '));
          }
          _print(_safe('\n                        '));
        }
        _print(_safe('\n                    </select>\n\n                    '));
        if (this.filterExpression.length === 5) {
          _print(_safe('\n                        <select name=\'sub-attribute\' class=\'sub-attribute\n                            dative-tooltip\' tabindex=\'0\' title=\'select a\n                            sub-attribute for the\n                            '));
          _print(this.snake2regular(myAttribute));
          _print(_safe('\'>\n                    '));
        } else {
          _print(_safe('\n                        <select name=\'sub-attribute\' class=\'sub-attribute\n                            dative-tooltip\' tabindex=\'0\' title=\'\'>\n                    '));
        }
        _print(_safe('\n                        '));
        if (this.filterExpression.length === 5) {
          _print(_safe('\n                            '));
          ref5 = this.subattributes[myAttribute].sort() || [];
          for (j = 0, len1 = ref5.length; j < len1; j++) {
            attribute = ref5[j];
            _print(_safe('\n                                '));
            if (attribute === mySubattribute) {
              _print(_safe('\n                                    <option value=\''));
              _print(attribute);
              _print(_safe('\' selected\n                                        >'));
              _print(this.snake2regular(attribute));
              _print(_safe('</option>\n                                '));
            } else {
              _print(_safe('\n                                    <option value=\''));
              _print(attribute);
              _print(_safe('\'\n                                        >'));
              _print(this.snake2regular(attribute));
              _print(_safe('</option>\n                                '));
            }
            _print(_safe('\n                            '));
          }
          _print(_safe('\n                        '));
        }
        _print(_safe('\n                    </select>\n\n                    <select name=\'relation\' class=\'relation dative-tooltip\'\n                            tabindex=\'0\'\n                            title=\'select a relation for the search expression\'>\n                        '));
        ref6 = this.relations;
        for (k = 0, len2 = ref6.length; k < len2; k++) {
          relation = ref6[k];
          _print(_safe('\n                            '));
          if (relation === myRelation) {
            _print(_safe('\n                                <option value=\''));
            _print(relation);
            _print(_safe('\' selected\n                                    >'));
            _print(relation);
            _print(_safe('</option>\n                            '));
          } else {
            _print(_safe('\n                                <option value=\''));
            _print(relation);
            _print(_safe('\'\n                                    >'));
            _print(relation);
            _print(_safe('</option>\n                            '));
          }
          _print(_safe('\n                        '));
        }
        _print(_safe('\n                    </select>\n\n                    <textarea name=\'value\' name=\'value\'\n                        class=\'value ui-corner-all dative-tooltip\'\n                        title=\'enter an expression that the (sub)attribute\n                            should match, given the specified relation\'\n                        tabindex=\'0\'>'));
        _print(myValue);
        _print(_safe('</textarea>\n                '));
      }
    
      _print(_safe('\n\n            </div>\n\n        </td>\n\n    </tr>\n</table>\n\n'));
    
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
