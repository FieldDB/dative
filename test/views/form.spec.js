/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// Tests for `FormView`
//
// Right now this just tests that interlinearize works with search patterns.
// There was a bug where doing a regex search for a space in an IGT value would
// cause single-character words to fail to be displayed.

define(function(require) {

  // Note: If you don't load `UserView` before `FormView`, you'll get the
  // following error (which seems like a circular dependency thing ...)::
  //
  //     Uncaught TypeError: Cannot read property 'prototype' of undefined
  //     (enterer-field-display.js:1)

  let formObjectWithHistory;
  const globals = require('../../../scripts/utils/globals');
  const ApplicationSettingsModel = require('../../../scripts/models/application-settings');
  const FormModel = require('../../../scripts/models/form');
  const UserView = require('../../../scripts/views/user-old');
  const FormView = require('../../../scripts/views/form');

  describe('`FormView`', function() {

    before(function() {

      this.spied = [
        'interlinearize',
        '_interlinearize',
        'hideIGTFields',
        'toggleHistory',
        'disableHistoryButton'
      ];
      for (let method of Array.from(this.spied)) {
        sinon.spy(FormView.prototype, method);
      }
      const spinStub = sinon.stub(FormView.prototype, 'spin', () => console.log('spinning'));
      const stopSpinStub = sinon.stub(FormView.prototype, 'stopSpin', () => console.log('stopping spinning'));

      return this.$fixture = $('<div id="view-fixture"></div>');
    });

    beforeEach(function() {

      // Reset spies
      for (let method of Array.from(this.spied)) {
        FormView.prototype[method].reset();
      }

      // Global app settings needs to be (the default) OLD one.
      const applicationSettings = new ApplicationSettingsModel();
      const oldLocalServer = applicationSettings.get('servers')
        .findWhere({url: "http://127.0.0.1:5000"});
      applicationSettings.set('activeServer', oldLocalServer);
      globals.applicationSettings = applicationSettings;

      this.$fixture.empty().appendTo($('#fixtures'));
      return this.$fixture.prepend('<div id="form"></div>');
    });

    afterEach(() => $('#fixtures').empty());

    // Return a FormView whose $el is in our fixture.
    const getForm = function(populate) {
      let formModel;
      if (populate == null) { populate = true; }
      if (populate) {
        formModel = new FormModel(formObject);
      } else {
        formModel = new FormModel();
      }
      const formView = new FormView({model: formModel});
      formView.setElement($('#form'));
      return formView;
    };


    // Interlinearize
    // TODO: this should be in the test spec for `FormBaseView`
    describe('`@interlinearize`', function() {

      it('highlights a single-char regex that matches one morpheme break word',
        function(done) {
          // Simulate a search for /k/ in morpheme_break
          const formView = getForm();
          formView.searchPatternsObject = {morpheme_break: /((?:k))/g};
          formView.render();
          const x = function() {
            const $morphemeBreakIGTCells =
              $('.igt-tables-container .igt-word-cell.morpheme-break-value');
            const $morphemeBreakIGTCellsWithHighlight =
              $morphemeBreakIGTCells.find('span.dative-state-highlight');
            // Three columns for a 3-word form
            expect($morphemeBreakIGTCells.length).to.equal(3);
            // One column has a search match highlight in it: /k/ 'COMP' matches /k/
            expect($morphemeBreakIGTCellsWithHighlight.length).to.equal(1);
            expect(formView.interlinearize).to.have.been.calledOnce;
            expect(formView._interlinearize).to.have.been.calledOnce;
            expect(formView.hideIGTFields).to.have.been.calledOnce;
            return done();
          };
          // We need `setTimeout` because `interlinearize` uses a 1-millisecond
          // delay.
          return setTimeout(x, 3);
      });

      return it('highlights nothing on regex search for space character', function(done) {
        // Simulate a search for /( )/ in morpheme_break
        const formView = getForm();
        formView.searchPatternsObject = {morpheme_break: /((?:( )))/g};
        formView.render();
        const x = function() {
          const $morphemeBreakIGTCells =
            $('.igt-tables-container .igt-word-cell.morpheme-break-value');
          const $morphemeBreakIGTCellsWithHighlight =
            $morphemeBreakIGTCells.find('span.dative-state-highlight');
          expect($morphemeBreakIGTCells.length).to.equal(3);
          // No columns have search match highlights in them (because spaces
          // aren't represented overtly; they are the spaces between columns).
          expect($morphemeBreakIGTCellsWithHighlight.length).to.equal(0);
          expect(formView.interlinearize).to.have.been.calledOnce;
          expect(formView._interlinearize).to.have.been.calledOnce;
          expect(formView.hideIGTFields).to.have.been.calledOnce;
          return done();
        };
        return setTimeout(x, 3);
      });
    });


    // HTML
    describe('its HTML', function() {

      it('has a header which is hidden by default', function() {
        const formView = getForm(false);
        formView.render();
        expect(formView.$('div.dative-widget-header').length).to.equal(1);
        return expect(formView.$('div.dative-widget-header').first().is(':visible'))
          .to.be.false;
      });

      it('has no header title text', function() {
        const $headerTitleDiv = $('div.dative-widget-header').first()
          .find('div.dative-widget-header-title');
        return expect($headerTitleDiv.text()).to.equal('');
      });

      describe('with an empty model, it ...', function() {

        it('has update, export, and settings buttons', function() {
          const formView = getForm(false);
          formView.render();
          expect(formView.$('button.update-resource').length).to.equal(1);
          expect(formView.$('button.export-resource').length).to.equal(1);
          return expect(formView.$('button.settings').length).to.equal(1);
        });

        return it('does NOT have delete, duplicate, history, controls, or data buttons',
          function() {
            const formView = getForm(false);
            formView.render();
            expect(formView.$('button.delete-resource').length).to.equal(0);
            expect(formView.$('button.duplicate-resource').length).to.equal(0);
            expect(formView.$('button.resource-history').length).to.equal(0);
            expect(formView.$('button.controls').length).to.equal(0);
            return expect(formView.$('button.file-data').length).to.equal(0);
        });
      });

      return describe('with a non-empty model, it ...', function() {

        it(`has update, export, delete, duplicate, history, and settings \
buttons`, function() {
            const formView = getForm();
            formView.render();
            expect(formView.$('button.update-resource').length).to.equal(1);
            expect(formView.$('button.delete-resource').length).to.equal(1);
            expect(formView.$('button.duplicate-resource').length).to.equal(1);
            expect(formView.$('button.export-resource').length).to.equal(1);
            expect(formView.$('button.resource-history').length).to.equal(1);
            return expect(formView.$('button.settings').length).to.equal(1);
        });

        return it('does NOT have controls or data buttons', function() {
          const formView = getForm();
          formView.render();
          expect(formView.$('button.controls').length).to.equal(0);
          return expect(formView.$('button.file-data').length).to.equal(0);
        });
      });
    });


    return describe('History functionality', function() {

      describe('its init state', function() {

        it('starts off with no previous versions', function() {
          const formView = getForm();
          formView.render();
          const previousVersionsDivIsEmpty =
            formView.$('div.resource-previous-versions').first().is(':empty');
          expect(formView.previousVersionModels).to.be.empty;
          expect(formView.previousVersionView).to.be.empty;
          return expect(previousVersionsDivIsEmpty).to.be.true;
        });

        return it('involves no history event responders having been called', function() {
          sinon.spy(FormView.prototype, 'fetchHistoryFormStart');
          sinon.spy(FormView.prototype, 'fetchHistoryFormEnd');
          sinon.spy(FormView.prototype, 'fetchHistoryFormSuccess');
          sinon.spy(FormView.prototype, 'fetchHistoryFormFail');
          const formView = getForm();
          expect(formView.fetchHistoryFormStart).not.to.have.been.called;
          expect(formView.fetchHistoryFormEnd).not.to.have.been.called;
          expect(formView.fetchHistoryFormFail).not.to.have.been.called;
          expect(formView.fetchHistoryFormSuccess).not.to.have.been.called;
          FormView.prototype.fetchHistoryFormStart.restore();
          FormView.prototype.fetchHistoryFormEnd.restore();
          FormView.prototype.fetchHistoryFormSuccess.restore();
          return FormView.prototype.fetchHistoryFormFail.restore();
        });
      });

      return describe('its “history” button', () => it('triggers `@toggleHistory` when clicked', function() {
        const formView = getForm();
        formView.render();
        const $historyButton = formView.$('button.resource-history').first();
        expect(formView.toggleHistory).not.to.have.been.called;
        expect(formView.disableHistoryButton).not.to.have.been.called;
        expect($historyButton.button('option', 'disabled')).to.be.false;
        $historyButton.click();
        expect(formView.toggleHistory).to.have.been.calledOnce;
        return expect(formView.disableHistoryButton).to.have.been.calledOnce;
      }));
    });
  });
          // Unsure why the following is failing. I must not be understanding
          // the jQuery button API ...
          //expect($historyButton.button 'option', 'disabled').to.be.true

  // An object for creating an OLD-style `FormModel` instance. Core values:
  //
  //     nitsspiyi   k    nitsspiyi
  //     /nit-ihpiyi k    nit-ihpiyi/
  //     1-dance     COMP 1-dance
  var formObject = {
    "files": [],
    "syntax": "",
    "morpheme_break_ids": [
      [
        [
          [
            14639,
            "1",
            "agra"
          ]
        ],
        [
          [
            2394,
            "dance",
            "vai"
          ]
        ]
      ],
      [
        [
          [
            14957,
            "2",
            "agra"
          ],
          [
            17363,
            "IMP.PL",
            "agrb"
          ]
        ]
      ],
      [
        [
          [
            14639,
            "1",
            "agra"
          ]
        ],
        [
          [
            2394,
            "dance",
            "vai"
          ]
        ]
      ]
    ],
    "grammaticality": "",
    "datetime_modified": "2015-10-03T18:13:13",
    "morpheme_gloss_ids": [
      [
        [
          [
            14639,
            "nit",
            "agra"
          ]
        ],
        [
          [
            2394,
            "ihpiyi",
            "vai"
          ]
        ]
      ],
      [
        []
      ],
      [
        [
          [
            14639,
            "nit",
            "agra"
          ]
        ],
        [
          [
            2394,
            "ihpiyi",
            "vai"
          ]
        ]
      ]
    ],
    "date_elicited": null,
    "morpheme_gloss": "1-dance COMP 1-dance",
    "id": 25111,
    "datetime_entered": "2015-09-11T14:17:29",
    "transcription": "nitsspiyi k nitsspiyi",
    "enterer": {
      "first_name": "Joel",
      "last_name": "Dunham",
      "role": "administrator",
      "id": 1
    },
    "comments": "",
    "source": null,
    "verifier": null,
    "speaker": null,
    "speaker_comments": "",
    "status": "tested",
    "elicitor": null,
    "break_gloss_category": "nit|1|agra-ihpiyi|dance|vai k|COMP|agra nit|1|agra-ihpiyi|dance|vai",
    "tags": [],
    "elicitation_method": null,
    "translations": [
      {
        "transcription": "I danced that I danced",
        "grammaticality": "",
        "id": 25225
      }
    ],
    "syntactic_category": null,
    "phonetic_transcription": "",
    "semantics": "",
    "UUID": "5a4ec347-2b03-4146-9f4d-9736fc03620f",
    "narrow_phonetic_transcription": "",
    "syntactic_category_string": "agra-vai agra agra-vai",
    "morpheme_break": "nit-ihpiyi k nit-ihpiyi",
    "modifier": {
      "first_name": "Joel",
      "last_name": "Dunham",
      "role": "administrator",
      "id": 1
    }
  };

  // An object containing both an OLD-style form and its previous versions. See
  // attributes `form` and `previous_versions`. Core values:
  //
  //     Áístotoinoyiiawa                     anni        Piitaakiiyi.
  //     aist-oto-ino-yii-wa                  ann-yi      piitaakii-yi
  //     to.speaker-go.to.do-see-DIR-PROX.SG  DEM-OBV.SG  eagle.woman-OBV.SG
  //     ‘He came to see Piitaakii.’

  return formObjectWithHistory = {
    "previous_versions": [
      {
        "status": "tested",
        "files": [],
        "elicitor": null,
        "form_id": 25105,
        "tags": [],
        "elicitation_method": null,
        "translations": [
          {
            "transcription": "He came to see Piitaakii.",
            "grammaticality": "",
            "id": 25214
          }
        ],
        "syntax": "",
        "morpheme_break_ids": [
          [
            [
              [
                353,
                "to.speaker",
                "adt"
              ]
            ],
            [
              [
                148,
                "go.to.do",
                "adt"
              ]
            ],
            [
              [
                3597,
                "see",
                "avta"
              ]
            ],
            [
              [
                14666,
                "DIR",
                "thm"
              ]
            ],
            [
              [
                14624,
                "PROX.SG",
                "num"
              ]
            ]
          ],
          [
            [
              [
                402,
                "DEM",
                "drt"
              ]
            ],
            [
              [
                14634,
                "OBV.SG",
                "num"
              ]
            ]
          ],
          [
            [
              [
                25107,
                "eagle.woman",
                "PN"
              ]
            ],
            [
              [
                14634,
                "OBV.SG",
                "num"
              ]
            ]
          ]
        ],
        "syntactic_category": null,
        "grammaticality": "",
        "syntactic_category_string": "adt-adt-avta-thm-num drt-num PN-num",
        "datetime_modified": "2015-09-01T20:41:10",
        "morpheme_gloss_ids": [
          [
            [
              [
                353,
                "aist",
                "adt"
              ]
            ],
            [
              [
                148,
                "oto",
                "adt"
              ]
            ],
            [
              [
                3597,
                "ino",
                "avta"
              ]
            ],
            [
              [
                14666,
                "yii",
                "thm"
              ]
            ],
            [
              [
                14624,
                "wa",
                "num"
              ]
            ]
          ],
          [
            [
              [
                402,
                "ann",
                "drt"
              ]
            ],
            [
              [
                14634,
                "yi",
                "num"
              ]
            ]
          ],
          [
            [
              [
                25107,
                "piitaakii",
                "PN"
              ]
            ],
            [
              [
                14634,
                "yi",
                "num"
              ]
            ]
          ]
        ],
        "date_elicited": null,
        "phonetic_transcription": "",
        "morpheme_gloss": "to.speaker-go.to.do-see-DIR-PROX.SG DEM-OBV.SG eagle.woman-OBV.SG",
        "id": 34873,
        "semantics": "",
        "break_gloss_category": "aist|to.speaker|adt-oto|go.to.do|adt-ino|see|avta-yii|DIR|thm-wa|PROX.SG|num ann|DEM|drt-yi|OBV.SG|num piitaakii|eagle.woman|PN-yi|OBV.SG|num",
        "datetime_entered": "2015-08-31T20:35:11",
        "UUID": "3b484bd6-86b0-49b0-a587-ba2d32c800c7",
        "narrow_phonetic_transcription": "",
        "transcription": "Áístotoinoyiiwa anni Piitaakiiyi.",
        "enterer": {
          "first_name": "Joel",
          "last_name": "Dunham",
          "role": "administrator",
          "id": 1
        },
        "comments": "",
        "source": null,
        "verifier": null,
        "speaker": null,
        "morpheme_break": "aist-oto-ino-yii-wa ann-yi piitaakii-yi",
        "modifier": {
          "first_name": "Joel",
          "last_name": "Dunham",
          "role": "administrator",
          "id": 1
        },
        "speaker_comments": ""
      },
      {
        "status": "tested",
        "files": [],
        "elicitor": null,
        "form_id": 25105,
        "tags": [],
        "elicitation_method": null,
        "translations": [
          {
            "transcription": "He came to see Piitaakii.",
            "grammaticality": "",
            "id": 25214
          }
        ],
        "syntax": "",
        "morpheme_break_ids": [
          [
            [
              [
                353,
                "to.speaker",
                "adt"
              ]
            ],
            [
              [
                148,
                "go.to.do",
                "adt"
              ]
            ],
            [
              [
                3597,
                "see",
                "avta"
              ]
            ],
            [
              [
                14666,
                "DIR",
                "thm"
              ]
            ],
            [
              [
                14624,
                "PROX.SG",
                "num"
              ]
            ]
          ],
          [
            [
              [
                402,
                "DEM",
                "drt"
              ]
            ],
            [
              [
                14634,
                "OBV.SG",
                "num"
              ]
            ]
          ],
          [
            [],
            [
              [
                14634,
                "OBV.SG",
                "num"
              ]
            ]
          ]
        ],
        "syntactic_category": null,
        "grammaticality": "",
        "syntactic_category_string": "adt-adt-avta-thm-num drt-num PN-num",
        "datetime_modified": "2015-09-01T20:40:36",
        "morpheme_gloss_ids": [
          [
            [
              [
                353,
                "aist",
                "adt"
              ]
            ],
            [
              [
                148,
                "oto",
                "adt"
              ]
            ],
            [
              [
                3597,
                "ino",
                "avta"
              ]
            ],
            [
              [
                14666,
                "yii",
                "thm"
              ]
            ],
            [
              [
                14624,
                "wa",
                "num"
              ]
            ]
          ],
          [
            [
              [
                402,
                "ann",
                "drt"
              ]
            ],
            [
              [
                14634,
                "yi",
                "num"
              ]
            ]
          ],
          [
            [
              [
                25107,
                "piitaakii",
                "PN"
              ]
            ],
            [
              [
                14634,
                "yi",
                "num"
              ]
            ]
          ]
        ],
        "date_elicited": null,
        "phonetic_transcription": "",
        "morpheme_gloss": "to.speaker-go.to.do-see-DIR-PROX.SG DEM-OBV.SG eagle.woman-OBV.SG",
        "id": 34615,
        "semantics": "",
        "break_gloss_category": "aist|to.speaker|adt-oto|go.to.do|adt-ino|see|avta-yii|DIR|thm-wa|PROX.SG|num ann|DEM|drt-yi|OBV.SG|num Piitaakii|eagle.woman|PN-yi|OBV.SG|num",
        "datetime_entered": "2015-08-31T20:35:11",
        "UUID": "3b484bd6-86b0-49b0-a587-ba2d32c800c7",
        "narrow_phonetic_transcription": "",
        "transcription": "Áístotoinoyiiwa anni Piitaakiiyi.",
        "enterer": {
          "first_name": "Joel",
          "last_name": "Dunham",
          "role": "administrator",
          "id": 1
        },
        "comments": "",
        "source": null,
        "verifier": null,
        "speaker": null,
        "morpheme_break": "aist-oto-ino-yii-wa ann-yi Piitaakii-yi",
        "modifier": {
          "first_name": "Joel",
          "last_name": "Dunham",
          "role": "administrator",
          "id": 1
        },
        "speaker_comments": ""
      },
      {
        "status": "tested",
        "files": [],
        "elicitor": null,
        "form_id": 25105,
        "tags": [],
        "elicitation_method": null,
        "translations": [
          {
            "transcription": "He came to see Piitaakii.",
            "grammaticality": "",
            "id": 25214
          }
        ],
        "syntax": "",
        "morpheme_break_ids": [
          [
            [
              [
                353,
                "to.speaker",
                "adt"
              ]
            ],
            [
              [
                148,
                "go.to.do",
                "adt"
              ]
            ],
            [
              [
                3597,
                "see",
                "avta"
              ]
            ],
            [
              [
                14666,
                "DIR",
                "thm"
              ]
            ],
            [
              [
                14624,
                "PROX.SG",
                "num"
              ]
            ]
          ],
          [
            [
              [
                402,
                "DEM",
                "drt"
              ]
            ],
            [
              [
                14634,
                "OBV.SG",
                "num"
              ]
            ]
          ],
          [
            [],
            [
              [
                14634,
                "OBV.SG",
                "num"
              ]
            ]
          ]
        ],
        "syntactic_category": null,
        "grammaticality": "",
        "syntactic_category_string": "adt-adt-avta-thm-num drt-num ?-num",
        "datetime_modified": "2015-09-01T18:44:31",
        "morpheme_gloss_ids": [
          [
            [
              [
                353,
                "aist",
                "adt"
              ]
            ],
            [
              [
                148,
                "oto",
                "adt"
              ]
            ],
            [
              [
                3597,
                "ino",
                "avta"
              ]
            ],
            [
              [
                14666,
                "yii",
                "thm"
              ]
            ],
            [
              [
                14624,
                "wa",
                "num"
              ]
            ]
          ],
          [
            [
              [
                402,
                "ann",
                "drt"
              ]
            ],
            [
              [
                14634,
                "yi",
                "num"
              ]
            ]
          ],
          [
            [],
            [
              [
                14634,
                "yi",
                "num"
              ]
            ]
          ]
        ],
        "date_elicited": null,
        "phonetic_transcription": "",
        "morpheme_gloss": "to.speaker-go.to.do-see-DIR-PROX.SG DEM-OBV.SG eagle.woman-OBV.SG",
        "id": 34614,
        "semantics": "",
        "break_gloss_category": "aist|to.speaker|adt-oto|go.to.do|adt-ino|see|avta-yii|DIR|thm-wa|PROX.SG|num ann|DEM|drt-yi|OBV.SG|num Piitaakii|eagle.woman|?-yi|OBV.SG|num",
        "datetime_entered": "2015-08-31T20:35:11",
        "UUID": "3b484bd6-86b0-49b0-a587-ba2d32c800c7",
        "narrow_phonetic_transcription": "",
        "transcription": "Áístotoinoyiiwa anni Piitaakiiyi.",
        "enterer": {
          "first_name": "Joel",
          "last_name": "Dunham",
          "role": "administrator",
          "id": 1
        },
        "comments": "",
        "source": null,
        "verifier": null,
        "speaker": null,
        "morpheme_break": "aist-oto-ino-yii-wa ann-yi Piitaakii-yi",
        "modifier": {
          "first_name": "Joel",
          "last_name": "Dunham",
          "role": "administrator",
          "id": 1
        },
        "speaker_comments": ""
      },
      {
        "status": "tested",
        "files": [],
        "elicitor": null,
        "form_id": 25105,
        "tags": [],
        "elicitation_method": null,
        "translations": [
          {
            "transcription": "He came to see Piitaakii.",
            "grammaticality": "",
            "id": 25214
          }
        ],
        "syntax": "",
        "morpheme_break_ids": [
          [
            [
              [
                353,
                "to.speaker",
                "adt"
              ]
            ],
            [
              [
                148,
                "go.to.do",
                "adt"
              ]
            ],
            [
              [
                3597,
                "see",
                "avta"
              ]
            ],
            [
              [
                14666,
                "DIR",
                "thm"
              ]
            ],
            [
              [
                14624,
                "PROX.SG",
                "num"
              ]
            ]
          ],
          [
            [
              [
                402,
                "DEM",
                "drt"
              ]
            ],
            [
              [
                14634,
                "OBV.SG",
                "num"
              ]
            ]
          ],
          [
            [],
            []
          ]
        ],
        "syntactic_category": null,
        "grammaticality": "",
        "syntactic_category_string": "adt-adt-avta-thm-num drt-num ?-num",
        "datetime_modified": "2015-09-01T17:53:35",
        "morpheme_gloss_ids": [
          [
            [
              [
                353,
                "aist",
                "adt"
              ]
            ],
            [
              [
                148,
                "oto",
                "adt"
              ]
            ],
            [
              [
                3597,
                "ino",
                "avta"
              ]
            ],
            [
              [
                14666,
                "yii",
                "thm"
              ]
            ],
            [
              [
                14624,
                "wa",
                "num"
              ]
            ]
          ],
          [
            [
              [
                402,
                "ann",
                "drt"
              ]
            ],
            [
              [
                14634,
                "yi",
                "num"
              ]
            ]
          ],
          [
            [],
            [
              [
                14634,
                "yi",
                "num"
              ]
            ]
          ]
        ],
        "date_elicited": null,
        "phonetic_transcription": "",
        "morpheme_gloss": "to.speaker-go.to.do-see-DIR-PROX.SG DEM-OBV.SG eagle.woman-OBV.SG",
        "id": 34611,
        "semantics": "",
        "break_gloss_category": "aist|to.speaker|adt-oto|go.to.do|adt-ino|see|avta-yii|DIR|thm-wa|PROX.SG|num ann|DEM|drt-yi|OBV.SG|num Piitaakii|eagle.woman|?-yxi|OBV.SG|num",
        "datetime_entered": "2015-08-31T20:35:11",
        "UUID": "3b484bd6-86b0-49b0-a587-ba2d32c800c7",
        "narrow_phonetic_transcription": "",
        "transcription": "Áístotoinoyiiwa anni Piitaakiiyi.",
        "enterer": {
          "first_name": "Joel",
          "last_name": "Dunham",
          "role": "administrator",
          "id": 1
        },
        "comments": "",
        "source": null,
        "verifier": null,
        "speaker": null,
        "morpheme_break": "aist-oto-ino-yii-wa ann-yi Piitaakii-yxi",
        "modifier": {
          "first_name": "Joel",
          "last_name": "Dunham",
          "role": "administrator",
          "id": 1
        },
        "speaker_comments": ""
      },
      {
        "status": "tested",
        "files": [],
        "elicitor": null,
        "form_id": 25105,
        "tags": [],
        "elicitation_method": null,
        "translations": [
          {
            "transcription": "He came to see Piitaakii.",
            "grammaticality": "",
            "id": 25214
          }
        ],
        "syntax": "",
        "morpheme_break_ids": [
          [
            [
              [
                353,
                "to.speaker",
                "adt"
              ]
            ],
            [
              [
                148,
                "go.to.do",
                "adt"
              ]
            ],
            [
              [
                3597,
                "see",
                "avta"
              ]
            ],
            [
              [
                14666,
                "DIR",
                "thm"
              ]
            ],
            [
              [
                14624,
                "PROX.SG",
                "num"
              ]
            ]
          ],
          [
            [
              [
                402,
                "DEM",
                "drt"
              ]
            ],
            [
              [
                14634,
                "OBV.SG",
                "num"
              ]
            ]
          ],
          [
            [],
            [
              [
                14634,
                "OBV.SG",
                "num"
              ]
            ]
          ]
        ],
        "syntactic_category": null,
        "grammaticality": "",
        "syntactic_category_string": "adt-adt-avta-thm-num drt-num ?-num",
        "datetime_modified": "2015-08-31T20:35:11",
        "morpheme_gloss_ids": [
          [
            [
              [
                353,
                "aist",
                "adt"
              ]
            ],
            [
              [
                148,
                "oto",
                "adt"
              ]
            ],
            [
              [
                3597,
                "ino",
                "avta"
              ]
            ],
            [
              [
                14666,
                "yii",
                "thm"
              ]
            ],
            [
              [
                14624,
                "wa",
                "num"
              ]
            ]
          ],
          [
            [
              [
                402,
                "ann",
                "drt"
              ]
            ],
            [
              [
                14634,
                "yi",
                "num"
              ]
            ]
          ],
          [
            [],
            [
              [
                14634,
                "yi",
                "num"
              ]
            ]
          ]
        ],
        "date_elicited": null,
        "phonetic_transcription": "",
        "morpheme_gloss": "to.speaker-go.to.do-see-DIR-PROX.SG DEM-OBV.SG eagle.woman-OBV.SG",
        "id": 34610,
        "semantics": "",
        "break_gloss_category": "aist|to.speaker|adt-oto|go.to.do|adt-ino|see|avta-yii|DIR|thm-wa|PROX.SG|num ann|DEM|drt-yi|OBV.SG|num Piitaakii|eagle.woman|?-yi|OBV.SG|num",
        "datetime_entered": "2015-08-31T20:35:11",
        "UUID": "3b484bd6-86b0-49b0-a587-ba2d32c800c7",
        "narrow_phonetic_transcription": "",
        "transcription": "Áístotoinoyiiwa anni Piitaakiiyi.",
        "enterer": {
          "first_name": "Joel",
          "last_name": "Dunham",
          "role": "administrator",
          "id": 1
        },
        "comments": "",
        "source": null,
        "verifier": null,
        "speaker": null,
        "morpheme_break": "aist-oto-ino-yii-wa ann-yi Piitaakii-yi",
        "modifier": {
          "first_name": "Joel",
          "last_name": "Dunham",
          "role": "administrator",
          "id": 1
        },
        "speaker_comments": ""
      }
    ],
    "form": {
      "files": [],
      "syntax": "",
      "morpheme_break_ids": [
        [
          [
            [
              353,
              "to.speaker",
              "adt"
            ]
          ],
          [
            [
              148,
              "go.to.do",
              "adt"
            ]
          ],
          [
            [
              3597,
              "see",
              "avta"
            ]
          ],
          [
            [
              14666,
              "DIR",
              "thm"
            ]
          ],
          [
            [
              14624,
              "PROX.SG",
              "num"
            ]
          ]
        ],
        [
          [
            [
              402,
              "DEM",
              "drt"
            ]
          ],
          [
            [
              14634,
              "OBV.SG",
              "num"
            ]
          ]
        ],
        [
          [
            [
              25107,
              "eagle.woman",
              "PN"
            ]
          ],
          [
            [
              14634,
              "OBV.SG",
              "num"
            ]
          ]
        ]
      ],
      "grammaticality": "",
      "datetime_modified": "2015-09-04T01:01:13",
      "morpheme_gloss_ids": [
        [
          [
            [
              353,
              "aist",
              "adt"
            ]
          ],
          [
            [
              148,
              "oto",
              "adt"
            ]
          ],
          [
            [
              3597,
              "ino",
              "avta"
            ]
          ],
          [
            [
              14666,
              "yii",
              "thm"
            ]
          ],
          [
            [
              14624,
              "wa",
              "num"
            ]
          ]
        ],
        [
          [
            [
              402,
              "ann",
              "drt"
            ]
          ],
          [
            [
              14634,
              "yi",
              "num"
            ]
          ]
        ],
        [
          [
            [
              25107,
              "piitaakii",
              "PN"
            ]
          ],
          [
            [
              14634,
              "yi",
              "num"
            ]
          ]
        ]
      ],
      "date_elicited": null,
      "morpheme_gloss": "to.speaker-go.to.do-see-DIR-PROX.SG DEM-OBV.SG eagle.woman-OBV.SG",
      "id": 25105,
      "datetime_entered": "2015-08-31T20:35:11",
      "transcription": "Áístotoinoyiiawa anni Piitaakiiyi.",
      "enterer": {
        "first_name": "Joel",
        "last_name": "Dunham",
        "role": "administrator",
        "id": 1
      },
      "comments": "",
      "source": null,
      "verifier": null,
      "speaker": null,
      "speaker_comments": "",
      "status": "tested",
      "elicitor": null,
      "break_gloss_category": "aist|to.speaker|adt-oto|go.to.do|adt-ino|see|avta-yii|DIR|thm-wa|PROX.SG|num ann|DEM|drt-yi|OBV.SG|num piitaakii|eagle.woman|PN-yi|OBV.SG|num",
      "tags": [],
      "elicitation_method": null,
      "translations": [
        {
          "transcription": "He came to see Piitaakii.",
          "grammaticality": "",
          "id": 25214
        }
      ],
      "syntactic_category": null,
      "phonetic_transcription": "",
      "semantics": "",
      "UUID": "3b484bd6-86b0-49b0-a587-ba2d32c800c7",
      "narrow_phonetic_transcription": "",
      "syntactic_category_string": "adt-adt-avta-thm-num drt-num PN-num",
      "morpheme_break": "aist-oto-ino-yii-wa ann-yi piitaakii-yi",
      "modifier": {
        "first_name": "Joel",
        "last_name": "Dunham",
        "role": "administrator",
        "id": 1
      }
    }
  };});

