# TailwindCSS fluid text

A plugin that adds fluid typography to [TailwindCss](https://tailwindcss.com)

## Installation

```sh
npm install @yet3/tailwindcss-fluid-text
```

or

```sh
yarn add @yet3/tailwindcss-fluid-text
```

In `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  // ...
  plugins: [
    // ...
    require('@yet3/tailwindcss-fluid-text'),
  ],
};
```

## Basic usage

```html
<div class="fluid-text-base-3xl">
```
```html
<div class="fluid-text-lg-sm">
```

## Arbitrary values

```html
<!-- fluid-text-xs-base-[screenMin,screenMax]   -->
<div class="fluid-text-xs-base-[640,960]">
```

```html
<!-- fluid-text-[sizeMin,sizeMax,screenMin,screenMax]  -->
<div class="fluid-text-[1.25,3,400,960]">
```

```html
<!-- fluid-text-[sizeMin,sizeMax,screenMin,screenMax]  -->
<!-- screenMin and screenMax will be equal to values configured in plugin options  -->
<div class="fluid-text-[2,2.5]">
```

## Plugin options

|          Name         |      Type      | Default value |     Example value     |                                                          Description                                                         |
|:---------------------:|:--------------:|:-------------:|:---------------------:|:----------------------------------------------------------------------------------------------------------------------------:|
|      fontSizeUnit     |     string     |     "rem"     |      "rem", "px"      | Default unit of sizeMin and sizeMax. Can be either "rem" or "px"                                                             |
|        sizeMin        | number, string |       1       |  0.5, "24px", "3rem"  | Minimal font size. Value can be a number (will use unit from fontSizeUnit option), or as string with sufix of "px" or "rem"  |
|        sizeMax        | number, string |       2       |  2.1, "12px", "1rem"  | Maximal font size. Value can be a number (will use unit from fontSizeUnit option), or as string with sufix of "px" or "rem"  |
|       screenUnit      |     string     |      "px"     |      "rem", "px"      | Default unit of screenMin and screenMax. Can be either "rem" or "px"                                                         |
|       screenMin       | number, string |      375      |  25, "360px", "32rem" | Minimal screen width. Value can be a number (will use unit from screenUnit option), or as string with sufix of "px" or "rem" |
|       screenMax       | number, string |      1024     | 90, "1024px", "45rem" | Maximal screen width. Value can be a number (will use unit from screenUnit option), or as string with sufix of "px" or "rem" |
|      rootFontSize     |     number     |       16      |       16, 24, 32      | Font size of root element in pixels (1rem = ?px)                                                                             |
| generateFromFontSizes |     boolean    |      true     |      true, false      | Whether plugin should generate fluid-text utilities from fontSizes configured in tailwind. (can only be used in plugin options)                     |

## Full config example

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  // ...
  theme: {
    extend: {
      fluidText: {
        'sm-base': {
          sizeMin: '12px'
          sizeMax: '16px'
          screenMin: '30rem'  // 480px,
          screenMax: '60rem'  // 960px
        },
        'sm-big': {
          sizeMin: 0.75   // 0.75rem,
          sizeMax: 2      // 2rem,
          // screenMin: default 375
          // screenMax: default 1024
        },
      },
    },
  },
  plugins: [
    // ...
    require('@yet3/tailwindcss-fluid-text')({
      rootFontSize: 16, // 1rem = 16px
      fontSizeUnit: 'rem',
      sizeMin: 1,       // default min font size (in rem)
      sizeMax: 2,       // default max font size (in rem)
      screenUnit: 'px',
      screenMin: 375,   // default min screen width (in px)
      screenMax: 1024,  // default max screen width (in px)
      generateFromFontSizes: true,
    }),
  ],
};
```

## Inspired by

- [Modern Fluid Typography Using CSS Clamp](https://www.smashingmagazine.com/2022/01/modern-fluid-typography-css-clamp/)
- [bradlc/tailwindcss-fluid](https://github.com/bradlc/tailwindcss-fluid)
- [davidhellmann/tailwindcss-fluid-type](https://github.com/davidhellmann/tailwindcss-fluid-type)
