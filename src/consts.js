const PX_REM_REGEX = new RegExp(/[0-9]*(px|r?em)/gm)
const PX_REGEX = new RegExp(/[0-9]*px/gm)
const REM_REGEX = new RegExp(/[0-9]*r?em/gm)
exports.PX_REGEX = PX_REGEX;
exports.REM_REGEX = REM_REGEX

exports.OPTS_SCHEMA = {
  sizeMin: {
    value: 1,
    type: ["number", "string"],
    regex: PX_REM_REGEX
  },
  sizeMax: {
    value: 2,
    type: ["number", "string"],
    regex: PX_REM_REGEX
  },
  screenMin: {
    value: 375,
    type: ["number", "string"],
    regex: PX_REM_REGEX
  },
  screenMax: {
    value: 1024,
    type: ["number", "string"],
    regex: PX_REM_REGEX
  },
  screenUnit: { value: "px", type: ["string"] },
  fontSizeUnit: { value: "rem", type: ["string"] },
  rootFontSize: { value: 16, type: ["number"] },
  generateFromFontSizes: { value: true, type: ["boolean"] },
};
