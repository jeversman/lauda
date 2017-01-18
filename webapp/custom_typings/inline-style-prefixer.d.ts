import {CSSProperties} from "react";


export interface PrefixerConfig {
  userAgent?: string;
  keepUnprefixed?: boolean;
}

export default class Prefixer {
  constructor(config?: PrefixerConfig);

  cssPrefix: string;
  jsPrefix: string;
  prefixedKeyframes: string;

  prefix(style: CSSProperties): CSSProperties;
  prefixAll(style: CSSProperties): CSSProperties;
}
