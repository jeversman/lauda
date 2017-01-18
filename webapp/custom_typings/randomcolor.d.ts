interface RandomColorOptions {
  hue?: 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'pink' | 'monochrome' | 'random';
  luminosity?: 'bright' | 'light' | 'dark' | 'random';
  seed?: string;
  format?: 'rgb' | 'rgbArray' | 'hsl' | 'hslArray' | 'hex' | 'hsvArray' | 'hsla' | 'rgba';
}

interface RandomColorListOptions extends RandomColorOptions {
  count: number;
}

declare function randomColor(options?: RandomColorOptions): string;
declare function randomColor(options?: RandomColorListOptions): string[];

export = randomColor;
