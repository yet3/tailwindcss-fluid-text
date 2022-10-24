const VALUE_REGEX = new RegExp(/\d*([.]\d*)?[px|r?em]?/);
const PX_REGEX = new RegExp(/\d*([.]\d*)?px?/);
const REM_REGEX = new RegExp(/\d*([.]\d*)?r?em?/);
exports.PX_REGEX = PX_REGEX;
exports.REM_REGEX = REM_REGEX;

exports.OPTS_SCHEMA = {
  sizeMin: {
    value: 1,
    type: ['number', 'string'],
    regex: VALUE_REGEX,
  },
  sizeMax: {
    value: 2,
    type: ['number', 'string'],
    regex: VALUE_REGEX,
  },
  screenMin: {
    value: 375,
    type: ['number', 'string'],
    regex: VALUE_REGEX,
  },
  screenMax: {
    value: 1024,
    type: ['number', 'string'],
    regex: VALUE_REGEX,
  },
  screenUnit: { value: 'px', type: ['string'] },
  fontSizeUnit: { value: 'rem', type: ['string'] },
  rootFontSize: { value: 16, type: ['number'] },
  generateFromFontSizes: { value: true, type: ['boolean'] },
};
