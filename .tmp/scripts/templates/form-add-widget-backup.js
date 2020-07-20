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
      var attribute, category, class_, elicitationMethod, grammaticality, i, id, index, inputGenerator, j, k, l, len, len1, len10, len11, len12, len13, len2, len3, len4, len5, len6, len7, len8, len9, m, n, o, p, q, r, ref, ref1, ref10, ref11, ref12, ref13, ref14, ref15, ref16, ref17, ref18, ref19, ref2, ref20, ref3, ref4, ref5, ref6, ref7, ref8, ref9, s, source, speaker, t, tag, translation, u, user, v;
    
      _print(_safe('<div class="dative-widget-header ui-widget-header ui-corner-top">\n\n  <div class=\'dative-widget-header-title\'>'));
    
      _print(this.headerTitle);
    
      _print(_safe('</div>\n\n  <div class=\'button-container-left\'>\n\n    <button class="hide-form-add-widget dative-tooltip"\n      title="hide this form add widget">\n      <i class=\'fa fa-angle-double-up fa-fw\'></i>\n    </button>\n\n    <button class="toggle-secondary-data dative-tooltip"\n      title="show the secondary data input fields">\n      <i class=\'fa fa-angle-down fa-fw\'></i>\n    </button>\n\n  </div>\n\n  <div class=\'button-container-right\'>\n\n    <button class=\'form-add-help dative-tooltip\' title=\'help with adding a form\'>\n      <i class=\'fa fa-fw fa-question\'></i>\n    </button>\n\n  </div>\n\n</div>\n\n<div class="dative-widget-body">\n\n  '));
    
      if (this.activeServerType === 'OLD') {
        _print(_safe('\n    '));
        class_ = ' old';
        _print(_safe('\n  '));
      } else if (this.activeServerType === 'FieldDB') {
        _print(_safe('\n    '));
        class_ = ' fielddb';
        _print(_safe('\n  '));
      } else {
        _print(_safe('\n    '));
        class_ = '';
        _print(_safe('\n  '));
      }
    
      _print(_safe('\n  <div class="form-add-form'));
    
      _print(class_);
    
      _print(_safe('">\n\n    <ul class="fieldset igt-data">\n\n      '));
    
      if (this.activeServerType === 'OLD') {
        _print(_safe('\n\n        <li>\n\n          <label for="transcription">Transcription</label>\n\n          <select name="grammaticality" class="grammaticality"\n            title="The grammaticality or pragmatic acceptibility judgment of the form">\n            '));
        ref = this.options.grammaticalities;
        for (i = 0, len = ref.length; i < len; i++) {
          grammaticality = ref[i];
          _print(_safe('\n              <option value="'));
          _print(grammaticality);
          _print(_safe('">'));
          _print(grammaticality);
          _print(_safe('</option>\n            '));
        }
        _print(_safe('\n          </select>\n\n          <textarea rows="1" name="transcription"\n            class="transcription ui-corner-all form-add-input dative-tooltip"\n            maxlength="255"\n            title="A transcription of the form (probably orthographic)"\n            >'));
        _print(this.transcription);
        _print(_safe('</textarea>\n\n        </li>\n\n        <li>\n\n          <label for="morphemeBreak">Morpheme Break</label>\n\n          <textarea name="morphemeBreak" maxlength="255"\n            class="ui-corner-all dative-tooltip"\n            title="A morphological analysis of the form: a sequence of morphemes\n            and delimiters"\n            >'));
        _print(this.morphemeBreak);
        _print(_safe('</textarea>\n\n        </li>\n\n        <li>\n\n          <label for="morphemeGloss">Morpheme Gloss</label>\n\n          <textarea name="morphemeGloss" class="ui-corner-all dative-tooltip"\n            maxlength="255"\n            title="A gloss for each morpheme in the morpheme break line above"\n            >'));
        _print(this.morphemeGloss);
        _print(_safe('</textarea>\n\n        </li>\n\n        '));
        if (this.translations.length) {
          _print(_safe('\n\n          '));
          ref1 = this.translations;
          for (index = j = 0, len1 = ref1.length; j < len1; index = ++j) {
            translation = ref1[index];
            _print(_safe('\n\n            <li class="translation-li">\n\n              <label class="translation-label"\n                for="translations-'));
            _print(index);
            _print(_safe('.transcription"\n                >Translation</label>\n\n              <select name="translations-'));
            _print(index);
            _print(_safe('.grammaticality"\n                class="grammaticality translation-grammaticality"\n                title="The acceptibility of this as a translation for the form">\n                '));
            ref2 = this.options.grammaticalities;
            for (k = 0, len2 = ref2.length; k < len2; k++) {
              grammaticality = ref2[k];
              _print(_safe('\n                  <option value="'));
              _print(grammaticality);
              _print(_safe('"\n                    >'));
              _print(grammaticality);
              _print(_safe('</option>\n                '));
            }
            _print(_safe('\n              </select>\n\n              <textarea name="translations-'));
            _print(index);
            _print(_safe('.transcription"\n                maxlength="255"\n                title="The text of the translation"\n                class="translation translation-transcription ui-corner-all\n                  dative-tooltip"\n                >'));
            _print(translation.transcription);
            _print(_safe('\n              </textarea>\n\n              '));
            if (index === 0) {
              _print(_safe('\n                <button class="append-translation-field\n                  append-remove-translation-field dative-tooltip"\n                  title="Add another translation.">\n                  <i class="fa fa-fw fa-plus"></i>\n                </button>\n              '));
            } else {
              _print(_safe('\n                <button class="remove-translation-field dative-tooltip\n                  append-remove-translation-field"\n                  title="Delete this translation.">\n                  <i class="fa fa-fw fa-minus"></i>\n                </button>\n              '));
            }
            _print(_safe('\n\n            </li>\n\n          '));
          }
          _print(_safe('\n\n        '));
        } else {
          _print(_safe('\n\n          <li class="translation-li">\n\n            <label for="translations-0.transcription">Translation</label>\n\n            <select name="translations-0.grammaticality"\n              class="grammaticality translation-grammaticality"\n              title="The acceptibility of this as a translation for the form">\n              '));
          ref3 = this.options.grammaticalities;
          for (l = 0, len3 = ref3.length; l < len3; l++) {
            grammaticality = ref3[l];
            _print(_safe('\n                <option value="'));
            _print(grammaticality);
            _print(_safe('">'));
            _print(grammaticality);
            _print(_safe('</option>\n              '));
          }
          _print(_safe('\n            </select>\n\n            <textarea name="translations-0.transcription"\n              maxlength="255"\n              class="translation ui-corner-all dative-tooltip"\n              title="The text of the translation"\n              ></textarea>\n\n            <button class="append-translation-field dative-tooltip\n              append-remove-translation-field"\n              title="Add another translation.">\n              <i class="fa fa-fw fa-plus"></i>\n            </button>\n\n          </li>\n\n        '));
        }
        _print(_safe('\n\n      '));
        _print(_safe('\n\n      '));
      } else if (this.activeServerType === 'FieldDB') {
        _print(_safe('\n\n      '));
        _print(_safe('\n\n        '));
        ref4 = this.h.fieldDB.igtAttributes;
        for (m = 0, len4 = ref4.length; m < len4; m++) {
          attribute = ref4[m];
          _print(_safe('\n          <li>\n            '));
          _print(_safe(this.h.fieldDB.inputGenerator(attribute)(attribute, this)));
          _print(_safe('\n          </li>\n        '));
        }
        _print(_safe('\n\n        '));
        ref5 = this.h.fieldDB.translationAttributes;
        for (n = 0, len5 = ref5.length; n < len5; n++) {
          attribute = ref5[n];
          _print(_safe('\n          <li>\n            '));
          _print(_safe(this.h.fieldDB.inputGenerator(attribute)(attribute, this)));
          _print(_safe('\n          </li>\n        '));
        }
        _print(_safe('\n\n      '));
      }
    
      _print(_safe('\n\n      </ul>\n\n\n    '));
    
      _print(_safe('\n\n    <div class="secondary-data">\n\n      <ul class="fieldset">\n\n      '));
    
      if (this.activeServerType === 'OLD') {
        _print(_safe('\n\n        <li>\n          <label for="comments">General Comments</label>\n          <textarea name="comments" class="comments ui-corner-all dative-tooltip"\n            title="General-purpose field for comments and notes about the form"\n            >'));
        _print(this.comments);
        _print(_safe('</textarea>\n        </li>\n\n        <li>\n          <label for="speakerComments">Speaker Comments</label>\n          <textarea name="speakerComments"\n            class="ui-corner-all speaker-comments dative-tooltip"\n            title="Comments made by the speaker that are relevant to this form"\n          >'));
        _print(this.speakerComments);
        _print(_safe('</textarea>\n        </li>\n\n        <li>\n          <label for="elicitationMethod">Elicitation Method</label>\n          <select name="elicitationMethod"\n            class="elicitation-method dative-tooltip elicitation-method"\n            title="Method of elicitation, e.g., translation, judgment,\n              spontaneously offered, etc.">\n            '));
        ref6 = this.options.elicitationMethods;
        for (o = 0, len6 = ref6.length; o < len6; o++) {
          ref7 = ref6[o], id = ref7[0], elicitationMethod = ref7[1];
          _print(_safe('\n              <option value="'));
          _print(id);
          _print(_safe('">'));
          _print(elicitationMethod);
          _print(_safe('</option>\n            '));
        }
        _print(_safe('\n          </select>\n        </li>\n\n        <li>\n          <div class="tags-multiselect">\n            <label for="tags">Tags</label>\n            <select name="tags" multiple="multiple" class="dative-tooltip tags"\n              title="Tags for categorizing forms">\n              '));
        ref8 = this.options.tags;
        for (p = 0, len7 = ref8.length; p < len7; p++) {
          ref9 = ref8[p], id = ref9[0], tag = ref9[1];
          _print(_safe('\n                <option value="'));
          _print(id);
          _print(_safe('">'));
          _print(tag);
          _print(_safe('</option>\n              '));
        }
        _print(_safe('\n            </select>\n          </div>\n        </li>\n\n        <li>\n          <label for="syntacticCategory">Category</label>\n          <select name="syntacticCategory"\n            class="syntactic-category dative-tooltip"\n            title="A syntactic or morphological category for this form">\n            '));
        ref10 = this.options.categories;
        for (q = 0, len8 = ref10.length; q < len8; q++) {
          ref11 = ref10[q], id = ref11[0], category = ref11[1];
          _print(_safe('\n              <option value="'));
          _print(id);
          _print(_safe('">'));
          _print(category);
          _print(_safe('</option>\n            '));
        }
        _print(_safe('\n          </select>\n        </li>\n\n      </ul>\n\n      <ul class="fieldset">\n\n        <li>\n          <label for="speaker">Speaker</label>\n          <select name="speaker" class="speaker dative-tooltip"\n            title="The speaker (i.e., consultant) of this form">\n            '));
        ref12 = this.options.speakers;
        for (r = 0, len9 = ref12.length; r < len9; r++) {
          ref13 = ref12[r], id = ref13[0], speaker = ref13[1];
          _print(_safe('\n              <option value="'));
          _print(id);
          _print(_safe('">'));
          _print(speaker);
          _print(_safe('</option>\n            '));
        }
        _print(_safe('\n          </select>\n        </li>\n\n        <li>\n          <label for="elicitor">Elicitor</label>\n          <select name="elicitor" class="elicitor dative-tooltip"\n            title="The fieldworker who elicited (i.e., recorded, transcribed)\n            this form">\n            '));
        ref14 = this.options.users;
        for (s = 0, len10 = ref14.length; s < len10; s++) {
          ref15 = ref14[s], id = ref15[0], user = ref15[1];
          _print(_safe('\n              <option value="'));
          _print(id);
          _print(_safe('">'));
          _print(user);
          _print(_safe('</option>\n            '));
        }
        _print(_safe('\n          </select>\n        </li>\n\n        <li>\n          <label for="verifier">Verifier</label>\n          <select name="verifier" class="verifier dative-tooltip"\n            title="A user who has verified the accuracy of this form">\n            '));
        ref16 = this.options.users;
        for (t = 0, len11 = ref16.length; t < len11; t++) {
          ref17 = ref16[t], id = ref17[0], user = ref17[1];
          _print(_safe('\n              <option value="'));
          _print(id);
          _print(_safe('">'));
          _print(user);
          _print(_safe('</option>\n            '));
        }
        _print(_safe('\n          </select>\n        </li>\n\n        <li>\n          <label for="source">Source</label>\n          <select name="source" class="source dative-tooltip"\n            title="A textual source whence this form was taken">\n            '));
        ref18 = this.options.sources;
        for (u = 0, len12 = ref18.length; u < len12; u++) {
          ref19 = ref18[u], id = ref19[0], source = ref19[1];
          _print(_safe('\n              <option value="'));
          _print(id);
          _print(_safe('">'));
          _print(source);
          _print(_safe('</option>\n            '));
        }
        _print(_safe('\n          </select>\n        </li>\n\n        <li>\n          <label for="dateElicited">Date Elicited</label>\n          <input type="text" name="dateElicited"\n            class="date-elicited ui-corner-all dative-tooltip"\n            title="When this form was elicited"\n            value="'));
        _print(this.dateElicited);
        _print(_safe('"/>\n        </li>\n\n      '));
        _print(_safe('\n      '));
      } else if (this.activeServerType === 'FieldDB') {
        _print(_safe('\n\n        '));
        ref20 = this.h.fieldDB.secondaryAttributes;
        for (v = 0, len13 = ref20.length; v < len13; v++) {
          attribute = ref20[v];
          _print(_safe('\n          <li>\n            '));
          inputGenerator = this.h.fieldDB.inputGenerator(attribute);
          _print(_safe('\n            '));
          _print(_safe(inputGenerator(attribute, this)));
          _print(_safe('\n          </li>\n        '));
        }
        _print(_safe('\n\n      '));
      }
    
      _print(_safe('\n\n      </ul>\n\n    </div> '));
    
      _print(_safe('\n\n    <ul class="fieldset button-only-fieldset">\n      <li class="center">\n        <button class="add-form-button dative-tooltip"\n          title="Save this new form">Add Form</button>\n      </li>\n\n      <li class=\'blargon\'>\n          The Blargon of Blargonia.\n      </li>\n\n    </ul>\n\n  </div>\n\n</div>\n\n'));
    
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
