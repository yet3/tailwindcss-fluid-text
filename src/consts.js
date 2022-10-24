exports.OPTS_SCHEMA = {
  sizeMin: {
    value: 1,
    type: ["number", "string"],
  },
  sizeMax: {
    value: 2,
    type: ["number", "string"],
  },
  screenMin: {
    value: 375,
    type: ["number", "string"],
  },
  screenMax: {
    value: 1024,
    type: ["number", "string"],
  },
  screenUnit: { value: "px", type: ["string"] },
  fontSizeUnit: { value: "rem", type: ["string"] },
  rootFontSize: { value: 16, type: ["number"] },
  generateFromFontSizes: { value: true, type: ["boolean"] },
};
