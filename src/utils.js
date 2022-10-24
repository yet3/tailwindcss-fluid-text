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
      if (/-?[0-9]*r?em/gm.test(val)) return parsed;
      else if (/-?[0-9]*px/gm.test(val)) return parsed / rootFontSize;

      if (defUnit === 'px') return parsed / rootFontSize;
      return parsed;
    }
  }

  return 1;
};

exports.genCss = (opts) => {
  const {fontSizeUnit, screenUnit, rootFontSize} = opts;

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

      // size: from ${sizeMin * rootFontSize}px to ${sizeMax * rootFontSize}px
      // screen: between ${screenMin * rootFontSize}px and ${screenMax * rootFontSize}px
  return {
    'font-size': `clamp(${sizeMin}rem, ${v}vw + ${r}rem, ${sizeMax}rem);`
  };
};

exports.genName = (...parts) => {
  return ['fluid-text', ...parts].join('-');
};

exports.parseOptions = (toParse, schema, errSrc = '') => {
  const opts = { ...toParse };

  Object.keys(schema).forEach((key) => {
    const val = opts[key];
    if (val == null) opts[key] = schema[key].value;
    else if (!schema[key].type.includes(typeof val)) {
      console.warn(
        `tailwindcss-fluid-text -> ${errSrc} option '${key}' must be of type: ${schema[key].type.join(' | ')}`
      );
      opts[key] = schema[key].value;
    }
  });

  return opts;
};
