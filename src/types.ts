export interface GlobalsRegexTransformer {
  (value: string, idx: number): string;
}

export interface GlobalsRegexNode extends RegExp {
  transform?: GlobalsRegexTransformer;
}

export interface GlobalsRegexConfig {
  [k: string]: string | GlobalsRegexNode;
}

export interface RollupGlobalsFn {
  (moduleId: string): string;
}

export interface GlobalTemplate {
  TPL: string | GlobalsRegexNode;
  toString(): string;
}
