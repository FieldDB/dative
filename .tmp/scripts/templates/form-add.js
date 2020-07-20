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
      _print(_safe('<div class=\'dative-page-header ui-widget-header ui-corner-top\'>\n  <div class=\'dative-page-header-title\'>'));
    
      _print(this.headerTitle);
    
      _print(_safe('</div>\n  <!-- <div class=\'dative-page-header-widgets\'></div> -->\n</div>\n\n<div class=\'dative-page-body\'>\n\n  <form action="form/add_ajax" method="post" class="formAdd">\n\n    <ul class="fieldset">\n\n      <li>\n        <label for="transcription">Transcription</label>\n        <select name="grammaticality" id="grammaticality" class="grammaticality">\n        </select>\n        <textarea rows="1" name="transcription" class="transcription ui-corner-all\n        form-add-input" id="transcription"\n        maxlength="510">'));
    
      _print(this.transcription);
    
      _print(_safe('</textarea>\n      </li>\n\n      <li>\n        <label for="morpheme_break">Morpheme Break</label>\n        <textarea name="morpheme_break" id="morpheme_break" class="ui-corner-all"\n        maxlength="510">'));
    
      _print(this.morpheme_break);
    
      _print(_safe('</textarea>\n      </li>\n\n      <li>\n        <label for="morpheme_gloss">Morpheme Gloss</label>\n        <textarea name="morpheme_gloss" id="morpheme_gloss" class="ui-corner-all"\n        maxlength="510">'));
    
      _print(this.morpheme_gloss);
    
      _print(_safe('</textarea>\n      </li>\n\n      <li>\n        <label for="translations-0.transcription">Translation</label>\n        <select name="translations-0.grammaticality"\n          id="translations0grammaticality" class="grammaticality">\n        </select>\n        <textarea name="translations-0.transcription"\n          id="translations0transcription"\n          class="translation ui-corner-all"\n          '));
    
      if (this.translations[0]) {
        _print(_safe('\n            >'));
        _print(this.translations[0].transcription);
        _print(_safe('</textarea>\n          '));
      } else {
        _print(_safe('\n            ></textarea>\n          '));
      }
    
      _print(_safe('\n        <button class="insertTranslationFieldButton"\n          title="Add another translation.">Add Translation</button>\n      </li>\n\n    </ul>\n\n    <ul class="fieldset">\n      <li>\n        <label for="comments">General Comments</label>\n        <textarea name="comments" id="comments" class="ui-corner-all"\n          >'));
    
      _print(this.comments);
    
      _print(_safe('</textarea>\n      </li>\n      <li>\n        <label for="speaker_comments">Speaker Comments</label>\n        <textarea name="speaker_comments" id="speaker_comments" class="ui-corner-all"\n        >'));
    
      _print(this.speaker_comments);
    
      _print(_safe('</textarea>\n      </li>\n      <li>\n        <label for="elicitation_method">Elicitation Method</label>\n        <select name="elicitation_method" id="elicitation_method"></select>\n      </li>\n      <li>\n        <div class="tags-multiselect">\n          <label for="tags">Tags</label>\n          <select name="tags" id="tags" multiple="multiple"></select>\n        </div>\n      </li>\n      <li>\n        <label for="syntactic_category">Category</label>\n        <select name="syntactic_category" id="syntactic_category"></select>\n      </li>\n    </ul>\n\n    <ul class="fieldset">\n      <li>\n        <label for="speaker">Speaker</label>\n        <select name="speaker" id="speaker"></select>\n      </li>\n      <li>\n        <label for="elicitor">Elicitor</label>\n        <select name="elicitor" id="elicitor"></select>\n      </li>\n      <li>\n        <label for="verifier">Verifier</label>\n        <select name="verifier" id="verifier"></select>\n      </li>\n      <li>\n        <label for="source">Source</label>\n        <select name="source" id="source"></select>\n      </li>\n      <li>\n        <label for="date_elicited">Date Elicited</label>\n        <input type="text" name="date_elicited" id="date_elicited"\n          class="dateElicited ui-corner-all" value="'));
    
      _print(this.date_elicited);
    
      _print(_safe('"/>\n      </li>\n    </ul>\n\n    <ul class="fieldset">\n      <li class="center">\n        <input id="submit-button" type="submit" value="Add Form" />\n      </li>\n    </ul>\n  </form>\n</div>\n\n\n'));
    
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
