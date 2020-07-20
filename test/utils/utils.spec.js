/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
//###############################################################################
// Unit tests for utils/utils.js
//###############################################################################
//
// global beforeEach, describe, it, assert, expect
//
// TODO: test utils.selectText. Needs DOM fixture.

define(function(require) {

  const utils = require('../../../scripts/utils/utils');

  return describe('`utils` object', function() {


    describe('`utils.clone`', function() {

      // Optimist handler: unbridled success!
      const optimistHandler = {
        onsuccess() {
          return expect(true).to.be.ok;
        },
        onerror() {
          return expect(false).to.be.ok;
        }
      };

      it('can clone a date', function() {
        const d = new Date();
        const dClone = utils.clone(d);
        return expect(d.toString()).to.equal(dClone.toString());
      });

      it('can clone an array', function() {
        const a = [[[37]]];
        const aClone = utils.clone(a);
        return expect(a[0][0][0]).to.equal(aClone[0][0][0]);
    });

      return it('can clone an object', function() {
        const o = {dave: {bill: 'susan'}};
        const oClone = utils.clone(o);
        return expect(o.dave.bill).to.equal(oClone.dave.bill);
      });
    });


    describe('`utils.type`', () => it('identifies an array', function() {
      expect(utils.type([])).to.equal('array');
      return expect(typeof []).to.equal('object');
    }));


    describe('`utils.guid`', () => it('generates a GUID', function() {

      const guid = utils.guid();
      const re = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/g;
      expect(guid).to.be.a('string');
      return expect(guid).to.match(re);
    }));


    describe('`utils.emailIsValid`', () => it('recognizes good emails and not bad ones', function() {

      const good = 'jimmyjames@hotmail.com';
      const bad = 'jimmyjames@hotmail';
      expect(utils.emailIsValid(good)).to.be.ok;
      return expect(utils.emailIsValid(bad)).to.not.be.ok;
    }));


    describe('`utils.startsWith`', () => it('can tell whether one string starts with another string', function() {

      expect(utils.startsWith('prefix', 'pref')).to.be.true;
      expect(utils.startsWith('pre\u0301fix', 'pre\u0301f')).to.be.true;
      return expect(utils.startsWith('pre\u0301fix', 'pref')).to.be.false;
    }));


    describe('`utils.endsWith`', () => it('can tell whether one string ends with another string', function() {

      expect(utils.endsWith('suffix', 'fix')).to.be.true;
      expect(utils.endsWith('suffi\u0301x', 'fi\u0301x')).to.be.true;
      return expect(utils.endsWith('suffi\u0301x', 'fix')).to.be.false;
    }));


    describe('`utils.integerWithCommas`', function() {

      it('can turn a number into a string with commas in it for easier reading', () => expect(utils.integerWithCommas(123456789)).to.equal('123,456,789'));

      return it('cannot handle non-integers', () => expect(utils.integerWithCommas(12345.6789)).to.not.equal('12,345.6789'));
    });


    describe('`utils.singularize`', function() {

      it('returns the singular of regular plurals', () => expect(utils.singularize('dogs')).to.equal('dog'));

      it('returns the singular of ‘...ies’ plurals', () => expect(utils.singularize('skies')).to.equal('sky'));

      it('returns the singular of ‘...hes’ plurals', function() {

        expect(utils.singularize('bushes')).to.equal('bush');
        expect(utils.singularize('churches')).to.equal('church');
        return expect(utils.singularize('watches')).to.equal('watch');
      });

      return it('return a non-string as itself', function() {

        expect(utils.singularize(null)).to.be.null;
        expect(utils.singularize(2)).to.equal(2);
        expect(utils.singularize([])).to.eql([]);
        return expect(utils.singularize({})).to.eql({});
    });
  });


    describe('`utils.pluralize`', function() {

      it('pluralizes regular nouns', () => expect(utils.pluralize('dog')).to.equal('dogs'));

      it('pluralizes nouns ending in ‘y’', () => expect(utils.pluralize('sky')).to.equal('skies'));

      it('pluralizes ‘status’ as ‘statuses’', () => expect(utils.pluralize('status')).to.equal('statuses'));

      it('pluralizes other words ending in ‘us’ as ‘ora’ (which is crazy)', () => expect(utils.pluralize('corpus')).to.equal('corpora'));

      return it('pluralizes nouns ending in sibilants using the ‘-es’ suffix', function() {

        expect(utils.pluralize('ass')).to.equal('asses');
        expect(utils.pluralize('buzz')).to.equal('buzzes');
        expect(utils.pluralize('bush')).to.equal('bushes');
        return expect(utils.pluralize('watch')).to.equal('watches');
      });
    });


    describe('`utils.pluralizeByNumber`', function() {

      it('doesn’t pluralize when the number is 1', () => expect(utils.pluralizeByNum('corpus', 1)).to.equal('corpus'));

      return it('does pluralize when the number is not 1', function() {

        expect(utils.pluralizeByNum('corpus', 0)).to.equal('corpora');
        return expect(utils.pluralizeByNum('corpus', 6)).to.equal('corpora');
      });
    });


    describe('`utils.indefiniteDeterminer`', function() {

      it('returns ‘an’ if the complement begins with a vowel', function() {

        expect(utils.indefiniteDeterminer('owl')).to.equal('an');
        return expect(utils.indefiniteDeterminer('apple')).to.equal('an');
      });

      return it('returns ‘a’ if the complement begins with a consonant or is ‘user’', function() {

        expect(utils.indefiniteDeterminer('tower')).to.equal('a');
        return expect(utils.indefiniteDeterminer('user')).to.equal('a');
      });
    });


    describe('`utils.dateString2object`', () => it('returns a `Date()` instance, given an ISO 8601 datetime string', function() {

      const d1 = '2015-09-26T19:47:03+00:00';
      const d2 = '2015-09-26T19:47:03Z';
      const d3 = '2015-09-26T19:47:03';
      const dBad1 = '20150926T194703Z'; // This format doesn't work
      expect(utils.dateString2object(d1)).to.be.instanceof(Date);
      expect(utils.dateString2object(d2)).to.be.instanceof(Date);
      expect(utils.dateString2object(d3)).to.be.instanceof(Date);
      expect(utils.dateString2object(dBad1)).to.not.be.instanceof(Date);
      expect(utils.dateString2object(d1).getMonth()).to.equal(8);
      expect(utils.dateString2object(d3).getFullYear()).to.equal(2015);
      return expect(utils.dateString2object(dBad1).getMonth).to.be.undefined;
    }));


    describe('`utils.asDateObject`', () => it('returns a ISO 8601 date string as a Date, if possible', function() {

      const d1 = '2015-09-26T19:47:03+00:00';
      const d2 = '2015-09-26T19:47:03Z';
      const d3 = '2015-09-26T19:47:03';
      const dBad1 = '20150926T194703Z'; // This format doesn't work
      expect(utils.asDateObject(d1)).to.be.instanceof(Date);
      expect(utils.asDateObject(d2)).to.be.instanceof(Date);
      expect(utils.asDateObject(d3)).to.be.instanceof(Date);
      expect(utils.asDateObject(dBad1)).to.not.be.instanceof(Date);
      expect(utils.asDateObject(dBad1)).to.equal(dBad1);
      expect(utils.asDateObject(null)).to.be.null;
      expect(utils.asDateObject(undefined)).to.be.null;
      expect(utils.asDateObject(d1).getMonth()).to.equal(8);
      expect(utils.asDateObject(d3).getFullYear()).to.equal(2015);
      return expect(utils.asDateObject(dBad1).getMonth).to.be.undefined;
    }));


    describe('`humanDatetime`', () => it(`returns a datetime string or a Date() instance as a human-readable \
date and time string, something like ‘September 27, 2015 at 10:21 \
p.m.’`, function() {

        const humanDatetimeRegex = new RegExp(`^\
\\w+\
\\u0020\
\\d{1,2}\
,\
\\u0020\
\\d{4}\
\\u0020\
at\
\\u0020\
\\d{1,2}\
:\
\\d{2}\
\\u0020\
[ap]\\.m\\.\
$\
`);
        const d1 = '2015-09-26T19:47:03+00:00';
        const d2 = '2015-09-26T19:47:03Z';
        const d3 = '2015-09-26T19:47:03';
        const dBad1 = '20150926T194703Z';
        expect(utils.humanDatetime(d2)).to.match(humanDatetimeRegex);
        expect(utils.humanDatetime(d1)).to.match(humanDatetimeRegex);
        expect(utils.humanDatetime(d3)).to.match(humanDatetimeRegex);
        expect(utils.humanDatetime(dBad1)).to.equal(dBad1);
        expect(utils.humanDatetime(null)).to.be.null;
        return expect(utils.humanDatetime(undefined)).to.be.null;
    }));


    describe('`humanDate`', () => it(`returns a Date() instance or an ISO 8601 datetime string as a \
human-readable date string, something like ‘September 27, 2015’`, function() {

        const humanDateRegex = new RegExp(`^\
\\w+\
\\u0020\
\\d{1,2}\
,\
\\u0020\
\\d{4}\
$\
`);
        const dGood = new Date();
        const dBad1 = '2015-09-26T19:47:03+00:00';
        const dBad2 = null;
        const dBad3 = undefined;
        expect(utils.humanDate(dGood)).to.match(humanDateRegex);
        expect(utils.humanDate(dBad1)).to.match(humanDateRegex);
        expect(utils.humanDate(dBad2)).to.be.null;
        return expect(utils.humanDate(dBad3)).to.be.null;
    }));


    describe('`humanTime`', () => it(`returns a \`Date()\` instance as a human-readable time string, \
something like 5:45 p.m.`, function() {

        const humanTimeRegex = new RegExp(`^\
\\d{1,2}\
:\
\\d{2}\
\\u0020\
[ap]\\.m\\.\
$\
`);
        const humanTimeRegexWithSeconds = new RegExp(`^\
\\d{1,2}\
:\
\\d{2}\
:\
\\d{2}\
\\u0020\
[ap]\\.m\\.\
$\
`);

        const dBad1 = '2015-09-26T19:47:03+00:00';
        expect(utils.humanTime(new Date())).to.match(humanTimeRegex);
        expect(utils.humanTime(new Date(), true))
          .to.match(humanTimeRegexWithSeconds);
        expect(utils.humanTime(dBad1)).to.be.null;
        expect(utils.humanTime(null)).to.be.null;
        return expect(utils.humanTime(undefined)).to.be.null;
    }));


    describe('`timeSince`', () => it(`returns a string indicating how long ago a \`Date()\` instance is from \
now.`, function() {

        const today = new Date();
        const thirteenSecondsAgo = new Date(today.getTime() - (1000 * 13));
        const thirteenMinutesAgo = new Date(today.getTime() - (1000 * 60 * 13));
        const thirteenHoursAgo = new Date(today.getTime() - (1000 * 60 * 60 * 13));
        const thirteenDaysAgo =
          new Date(today.getTime() - (1000 * 60 * 60 * 24 * 13));
        const thirteenMonthsAgo =
          new Date(today.getTime() - (1000 * 60 * 60 * 24 * 30 * 13));
        const thirteenYearsAgo =
          new Date(today.getTime() - (1000 * 60 * 60 * 24 * 365 * 13));

        expect(utils.timeSince(thirteenSecondsAgo)).to.equal('13 seconds ago');
        expect(utils.timeSince(thirteenMinutesAgo)).to.equal('13 minutes ago');
        expect(utils.timeSince(thirteenHoursAgo)).to.equal('13 hours ago');
        expect(utils.timeSince(thirteenDaysAgo)).to.equal('13 days ago');
        expect(utils.timeSince(thirteenMonthsAgo)).to.equal('13 months ago');
        return expect(utils.timeSince(thirteenYearsAgo)).to.equal('13 years ago');
    }));


    describe('`utils.millisecondsToTimeString`', () => it(`converts a number of milliseconds to a string formatted as \
00h00m00s`, function() {

        expect(utils.millisecondsToTimeString(6000)).to.equal('00h00m06s');
        expect(utils.millisecondsToTimeString(((13 * 60000) + 7000)))
          .to.equal('00h13m07s');
        return expect(utils.millisecondsToTimeString(((13 * 60 * 60000) + (13 * 60000) + 7000)))
          .to.equal('13h13m07s');
    }));


    describe('`utils.leftPad`', function() {

      it('left-pads ‘0’s to a string', function() {

        expect(utils.leftPad('3')).to.equal('03');
        expect(utils.leftPad('13')).to.equal('13');
        return expect(utils.leftPad('13', 4)).to.equal('0013');
      });

      return it('works with numbers (not just strings)', function() {

        expect(utils.leftPad(3)).to.equal('03');
        expect(utils.leftPad(13)).to.equal('13');
        return expect(utils.leftPad(13, 4)).to.equal('0013');
      });
    });


    describe('`utils.snake2camel`', function() {

      it('converts snake_case strings to camelCase ones', function() {

        expect(utils.snake2camel('snake_case_string')).to.equal('snakeCaseString');
        return expect(utils.snake2camel('snake')).to.equal('snake');
      });

      return it('does not recognize capitalized Snake_Case as snake_case', () => expect(utils.snake2camel('Bad_Snake_Case')).to.equal('Bad_Snake_Case'));
    });


    describe('`utils.snake2hyphen`', function() {

      it('converts snake_case strings to hyphen-case ones', function() {

        expect(utils.snake2hyphen('snake_case_string')).to.equal('snake-case-string');
        return expect(utils.snake2hyphen('snake')).to.equal('snake');
      });

      return it('does recognize capitalized Snake_Case as snake_case', () => expect(utils.snake2hyphen('Bad_Snake_Case')).to.equal('Bad-Snake-Case'));
    });


    describe('`utils.snake2regular`', function() {

      it('converts snake_case strings to regular case ones', function() {

        expect(utils.snake2regular('snake_case_string'))
          .to.equal('snake case string');
        return expect(utils.snake2regular('snake')).to.equal('snake');
      });

      return it('does recognize capitalized Snake_Case as snake_case', () => expect(utils.snake2regular('Bad_Snake_Case')).to.equal('Bad Snake Case'));
    });


    describe('`utils.camel2snake`', () => it('converts camelCase strings to snake_case ones', function() {

      expect(utils.camel2snake('camelCaseString')).to.equal('camel_case_string');
      expect(utils.camel2snake('camel')).to.equal('camel');
      return expect(utils.camel2snake('CamelCaseString')).to.equal('camel_case_string');
    }));


    describe('`utils.camel2regular`', () => it('converts camelCase strings to regular case ones', function() {

      expect(utils.camel2regular('camelCaseString'))
        .to.equal('camel case string');
      expect(utils.camel2regular('camel')).to.equal('camel');
      return expect(utils.camel2regular('CamelCaseString'))
        .to.equal('camel case string');
    }));


    describe('`utils.camel2regularUpper`', () => it('converts camelCase strings to Regular Capitalized ones', function() {

      expect(utils.camel2regularUpper('camelCaseString'))
        .to.equal('Camel Case String');
      expect(utils.camel2regularUpper('camel')).to.equal('Camel');
      return expect(utils.camel2regularUpper('CamelCaseString'))
        .to.equal('Camel Case String');
    }));


    describe('`utils.camel2hyphen`', () => it('converts camelCase strings to hypen-case ones', function() {

      expect(utils.camel2hyphen('camelCaseString'))
        .to.equal('camel-case-string');
      expect(utils.camel2hyphen('camel')).to.equal('camel');
      return expect(utils.camel2hyphen('CamelCaseString'))
        .to.equal('camel-case-string');
    }));


    describe('`utils.capitalize`', () => it('capitalizes strings', function() {

      expect(utils.capitalize('camel')).to.equal('Camel');
      expect(utils.capitalize('c')).to.equal('C');
      expect(utils.capitalize('Camel')).to.equal('Camel');
      return expect(utils.capitalize('CAMEL')).to.equal('CAMEL');
    }));


    describe('`utils.encloseIfNotAlready`', function() {

      it('encloses a string in specified start and end strings', function() {

        expect(utils.encloseIfNotAlready('chien', '/', '/'))
          .to.equal('/chien/');
        expect(utils.encloseIfNotAlready('/chien/', '/', '/'))
          .to.equal('/chien/');
        expect(utils.encloseIfNotAlready('chien', '\u2018', '\u2019'))
          .to.equal('\u2018chien\u2019');
        expect(utils.encloseIfNotAlready('\u2018chien\u2019', '\u2018', '\u2019'))
          .to.equal('\u2018chien\u2019');
        expect(utils.encloseIfNotAlready(undefined, '\u2018', '\u2019'))
          .to.be.undefined;
        return expect(utils.encloseIfNotAlready(null, '\u2018', '\u2019'))
          .to.be.null;
      });

      return it('expects the bookmarks to be length-1 strings', function() {

        expect(utils.encloseIfNotAlready('chien', '\u2018\u2018', '\u2019\u2019'))
          .to.equal('\u2018\u2018chien\u2019\u2019');
        return expect(utils.encloseIfNotAlready('\u2018\u2018chien\u2019\u2019', '\u2018\u2018', '\u2019\u2019'))
          .to.equal('\u2018\u2018\u2018\u2018chien\u2019\u2019\u2019\u2019');
      });
    });


    describe('`utils.smallCapsAcronyms`', function() {

      it('encloses acronyms in a string in “small caps” spans', () => expect(utils.smallCapsAcronyms('PHI PL.PROX'))
        .to.equal(`<span class='small-caps'>phi</span> \
<span class='small-caps'>pl</span>.\
<span class='small-caps'>prox</span>`
      ));

      return it('does not recognyze a lone capitalized character as an acronym', () => expect(utils.smallCapsAcronyms('PHI P.PROX'))
        .to.equal(`<span class='small-caps'>phi</span> \
P.<span class='small-caps'>prox</span>`
      ));
    });


    describe('`utils.convertDateISO2mdySlash`', () => it(`converts an ISO 8601 date string (e.g., ‘2015-03-16’) to one in \
MM/DD/YYY format`, function() {

        expect(utils.convertDateISO2mdySlash('2015-03-16'))
          .to.equal('03/16/2015');
        expect(utils.convertDateISO2mdySlash(null)).to.be.null;
        return expect(utils.convertDateISO2mdySlash(undefined)).to.be.undefined;
    }));

    describe('`utils.isValidURL`', function() {

      it('can recognize an obviously good URL', () => expect(utils.isValidURL('http://www.google.com')).to.be.true);

      return it('will not recognize an obviously bad URL', function() {

        expect(utils.isValidURL('http:/www.google.com')).to.be.false;
        return expect(utils.isValidURL('http://www.google.')).to.be.false;
      });
    });
        // NOTE/WARN/BUG: this will fail:
        // expect(utils.isValidURL 'http://www.google').to.be.false


    describe('`utils.getExtension`', () => it('returns the extension from a file name or path', function() {

      expect(utils.getExtension('/path/to/my/file.cool.wav')).to.equal('wav');
      expect(utils.getExtension('/path/to/my/file.cool.blargon'))
        .to.equal('blargon');

      // TODO: this is perhaps not what should be returned here ...
      return expect(utils.getExtension('/path/to/my/file'))
        .to.equal('/path/to/my/file');
    }));


    describe('`utils.getFilenameAndExtension`', () => it(`returns the filename and extension of a file name/ path as a 2-ary \
array`, function() {

        expect(utils.getFilenameAndExtension('/path/to/my/file.cool.wav')[0])
          .to.equal('/path/to/my/file.cool');
        expect(utils.getFilenameAndExtension('/path/to/my/file.cool.wav')[1])
          .to.equal('wav');

        expect(utils.getFilenameAndExtension('/path/to/my/file.cool.blargon')[0])
          .to.equal('/path/to/my/file.cool');
        expect(utils.getFilenameAndExtension('/path/to/my/file.cool.blargon')[1])
          .to.equal('blargon');

        expect(utils.getFilenameAndExtension('/path/to/my/file')[0])
          .to.equal('/path/to/my/file');
        expect(utils.getFilenameAndExtension('/path/to/my/file')[1])
          .to.be.null;

        expect(utils.getFilenameAndExtension(null)[0]).to.be.null;
        expect(utils.getFilenameAndExtension(null)[1]).to.be.null;

        expect(utils.getFilenameAndExtension(undefined)[0]).to.be.undefined;
        return expect(utils.getFilenameAndExtension(undefined)[1]).to.be.null;
    }));


    describe('`utils.getMIMEType`', () => it(`returns a MIME type from a file name/path, for files with extensions \
that we care about`, function() {

        expect(utils.getMIMEType('sound.wav')).to.equal('audio/x-wav');
        expect(utils.getMIMEType('sound.mp3')).to.equal('audio/mp3');
        return expect(utils.getMIMEType('crappy-doc.doc')).to.be.undefined;
    }));


    return describe('`utils.humanFileSize`', () => it(`returns a number (of bytes) as a string expressing that quantify of \
bytes in kB, MB, GB, etc.`, function() {

        expect(utils.humanFileSize(2455)).to.equal('2.5 kB');
        return expect(utils.humanFileSize(2455123)).to.equal('2.5 MB');
    }));
  });
});

