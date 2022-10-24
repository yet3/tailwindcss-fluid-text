declare function plugin(
  options?: Partial<{
    generateFromFontSizes: boolean;
    screenUnit: 'rem' | 'px';
    fontSizeUnit: 'rem' | 'px';
    rootFontSize: number;
    sizeMin: string | number;
    sizeMax: string | number;
    screenMin: string | number;
    screenMax: string | number;
  }>
): { handler: () => void };

declare namespace plugin {
  const __isOptionsFunction: true;
}

export = plugin;
