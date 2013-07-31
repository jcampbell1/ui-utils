describe('highlight', function () {
  var highlightFilter, testPhrase = 'Prefix Highlight Suffix';

  beforeEach(module('ui.highlight'));
  beforeEach(inject(function ($filter) {
    highlightFilter = $filter('highlight');
  }));
  describe('case insensitive', function () {
    it('should highlight a matching phrase', function () {
      expect(highlightFilter(testPhrase, 'highlight')).toEqual('Prefix <span class="ui-match">Highlight</span> Suffix');
    });
    it('should highlight every word for the \\w+ regex filter', function () {
      expect(highlightFilter(testPhrase, '\\w+')).toEqual('<span class="ui-match">Prefix</span> <span class="ui-match">Highlight</span> <span class="ui-match">Suffix</span>');
    });
    it('should highlight nothing if no match found', function () {
      expect(highlightFilter(testPhrase, 'no match')).toEqual(testPhrase);
    });
    it('should highlight nothing for the undefined filter', function () {
      expect(highlightFilter(testPhrase, undefined)).toEqual(testPhrase);
    });
    it('should highlight nothing if the regex is wrong', function () {
      expect(highlightFilter(testPhrase, '$[^.+*')).toEqual(testPhrase);
    });
    it('should be safe to highlight regex chars', function () {
      expect(highlightFilter('match a period . is fine', '\\.')).toEqual('match a period <span class="ui-match">.</span> is fine');
    });
    it('should work correctly for number filters', function () {
      expect(highlightFilter('3210123', 0)).toEqual('321<span class="ui-match">0</span>123');
    });
    it('should work correctly for number text', function () {
      expect(highlightFilter(3210123, '0')).toEqual('321<span class="ui-match">0</span>123');
    });
  });
  describe('case sensitive', function () {
    it('should highlight a matching phrase', function () {
      expect(highlightFilter(testPhrase, 'Highlight', true)).toEqual('Prefix <span class="ui-match">Highlight</span> Suffix');
    });
    it('should highlight nothing if no match found', function () {
      expect(highlightFilter(testPhrase, 'no match', true)).toEqual(testPhrase);
    });
    it('should highlight nothing for the undefined filter', function () {
      expect(highlightFilter(testPhrase, undefined, true)).toEqual(testPhrase);
    });
    it('should work correctly for number filters', function () {
      expect(highlightFilter('3210123', 0, true)).toEqual('321<span class="ui-match">0</span>123');
    });
    it('should work correctly for number text', function () {
      expect(highlightFilter(3210123, '0', true)).toEqual('321<span class="ui-match">0</span>123');
    });
    it('should not highlight a phrase with different letter-casing', function () {
      expect(highlightFilter(testPhrase, 'highlight', true)).toEqual(testPhrase);
    });
  });
  it('should highlight nothing if empty filter string passed - issue #114', function () {
    expect(highlightFilter(testPhrase, '')).toEqual(testPhrase);
  });
});