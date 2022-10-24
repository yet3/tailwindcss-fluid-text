const plugin = require('tailwindcss/plugin');
const { genName, genCss, parseOptions, getTextSize } = require('./utils');
const { OPTS_SCHEMA } = require('./consts');

module.exports = plugin.withOptions(
  function(options = {}) {
    return function({ addUtilities, matchUtilities, theme, e }) {
      const plugOpts = parseOptions(options, OPTS_SCHEMA, 'plugin');

      const toGen = [];
      if (plugOpts.generateFromFontSizes) {
        const fontSizes = theme('fontSize');
        if (fontSizes) {
          Object.keys(fontSizes).forEach((key1) => {
            const fMin = getTextSize(fontSizes[key1]);

            Object.keys(fontSizes).forEach((key2) => {
              if (key1 !== key2) {
                const fMax = getTextSize(fontSizes[key2]);

                toGen.push({
                  opts: { ...plugOpts, sizeMin: fMin, sizeMax: fMax },
                  name: genName(key1, key2),
                });
              }
            });
          });
        }
      }

      const fluidTexts = theme('fluidText');
      if (fluidTexts) {
        Object.keys(fluidTexts).forEach((key) => {
          toGen.push({
            opts: { ...plugOpts, ...fluidTexts[key] },
            name: genName(key),
          });
        });
      }

      const utils = {};
      const match = {};
      toGen.forEach(({ name, opts }) => {
        match[name] = (value) => {
          const split = value.split(',');
          const parsedOpts = parseOptions(
            { ...opts, screenMin: split[0], screenMax: split[1] },
            OPTS_SCHEMA,
            `${name}-value: theme`
          );
          return genCss(parsedOpts);
        };

        const utilOpts = parseOptions(opts, OPTS_SCHEMA, `${name}: theme`);
        utils[`.${e(name)}`] = genCss(utilOpts);
      });

      const generalMatchName = genName();
      match[generalMatchName] = (value) => {
        const split = value.split(',');

        const parsedOpts = parseOptions(
          {
            ...plugOpts,
            sizeMin: split[0],
            sizeMax: split[1],
            screenMin: split[2],
            screenMax: split[3],
          },
          OPTS_SCHEMA,
          `${generalMatchName}-${value}: theme`
        );
        return genCss(parsedOpts);
      };

      addUtilities(utils);
      matchUtilities(match);
    };
  },
  function() {
    return {
      variants: {
        fluidText: ['responsive'],
      },
    };
  }
);
