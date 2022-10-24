const { OPTS_SCHEMA, REM_REGEX, PX_REGEX } = require('./consts');

exports.getTextSize = (val, defVal = 1) => {
  if (typeof val === 'string' || typeof val === 'number') return val;
  if (Array.isArray(val)) return val[0];
  if (typeof val === 'object') return val.fontSize || defVal;
  return defVal;
};

const toRemValue = (val, { rootFontSize, defUnit }) => {
  if (typeof val === 'number') {
    if (defUnit === 'px') return val / rootFontSize;
    return val;
  }

  if (typeof val === 'string') {
    const parsed = parseFloat(val);
    if (!isNaN(parsed)) {
      if (REM_REGEX.test(val)) return parsed;
      else if (PX_REGEX.test(val)) return parsed / rootFontSize;

      if (defUnit === 'px') return parsed / rootFontSize;
      return parsed;
    }
  }

  return 1;
};

exports.genCss = (opts) => {
  const { fontSizeUnit, screenUnit, rootFontSize } = opts;

  let sizeMin = toRemValue(opts.sizeMin, {
    rootFontSize: rootFontSize,
    defUnit: fontSizeUnit,
  });
  let sizeMax = toRemValue(opts.sizeMax, {
    rootFontSize: rootFontSize,
    defUnit: fontSizeUnit,
  });

  let screenMin = toRemValue(opts.screenMin, {
    rootFontSize: rootFontSize,
    defUnit: screenUnit,
  });
  let screenMax = toRemValue(opts.screenMax, {
    rootFontSize: rootFontSize,
    defUnit: screenUnit,
  });

  if (sizeMin > sizeMax) {
    let tmpSizeMax = sizeMax;
    sizeMax = sizeMin;
    sizeMin = tmpSizeMax;

    let tmpScreenMax = screenMax;
    screenMax = screenMin;
    screenMin = tmpScreenMax;
  }

  const r = (screenMin * sizeMax - screenMax * sizeMin) / (screenMin - screenMax);
  const v = (100 * (sizeMax - sizeMin)) / (screenMax - screenMin);

  return {
    'font-size': `
      /* size: from ${sizeMin * rootFontSize}px to ${sizeMax * rootFontSize}px
         screen: between ${screenMin * rootFontSize}px and ${screenMax * rootFontSize}px */
      clamp(${sizeMin}rem, ${v}vw + ${r}rem, ${sizeMax}rem);
    `,
  };
};

exports.genName = (...parts) => {
  return ['fluid-text', ...parts].join('-');
};

exports.parseOptions = (toParse, errSrc = '', defs = {}) => {
  const opts = { ...toParse };

  console.log('before', opts);
  Object.keys(OPTS_SCHEMA).forEach((key) => {
    if (OPTS_SCHEMA[key]) {
      let val = opts[key];
      if (val == null) {
        if (defs[key] != null) val = defs[key];
        else val = OPTS_SCHEMA[key].value;
      }

      if (!OPTS_SCHEMA[key].type.includes(typeof val)) {
        console.warn(
          `tailwindcss-fluid-text -> ${errSrc} option '${key}' must be of type: ${OPTS_SCHEMA[key].type.join(' | ')}`
        );
        val = OPTS_SCHEMA[key].value;
      } else if (OPTS_SCHEMA[key].regex && typeof val === 'string' && !OPTS_SCHEMA[key].regex.test(val)) {
        console.warn(`tailwindcss-fluid-text -> ${errSrc} option '${key}' must match regex: ${OPTS_SCHEMA[key].regex}`);
        val = OPTS_SCHEMA[key].value;
      }
      opts[key] = val;
    }
  });

  console.log('after', opts);
  return opts;
};
