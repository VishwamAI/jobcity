// This import is used in the module declarations below
import * as React from 'react';

/// <reference types="react" />
/// <reference types="node" />

declare global {
  const React: typeof React;

  interface Window extends globalThis.Window {}

  namespace NodeJS {
    interface Process extends NodeJS.Process {}
  }

  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
    }
  }

  // Global objects
  const console: Console;
  const fetch: typeof globalThis.fetch;
  const alert: (message?: string) => void;
  const document: Document;
  const window: Window & typeof globalThis;

  // HTML element types
  type HTMLElement = globalThis.HTMLElement;
  type HTMLDivElement = globalThis.HTMLDivElement;
  type HTMLSpanElement = globalThis.HTMLSpanElement;
  type HTMLButtonElement = globalThis.HTMLButtonElement;
  type HTMLInputElement = globalThis.HTMLInputElement;
  type HTMLParagraphElement = globalThis.HTMLParagraphElement;
  type HTMLHeadingElement = globalThis.HTMLHeadingElement;
  type HTMLAnchorElement = globalThis.HTMLAnchorElement;
  type HTMLImageElement = globalThis.HTMLImageElement;
  type HTMLLabelElement = globalThis.HTMLLabelElement;
  type HTMLTextAreaElement = globalThis.HTMLTextAreaElement;
  type SVGSVGElement = globalThis.SVGSVGElement;

  // Additional global objects
  const process: NodeJS.Process;
  const className: string;

  // Additional type declarations
  interface Console extends globalThis.Console {}
  interface Document extends globalThis.Document {}

  // Declare global types for HTML elements
  const HTMLElement: typeof globalThis.HTMLElement;
  const HTMLDivElement: typeof globalThis.HTMLDivElement;
  const HTMLSpanElement: typeof globalThis.HTMLSpanElement;
  const HTMLButtonElement: typeof globalThis.HTMLButtonElement;
  const HTMLInputElement: typeof globalThis.HTMLInputElement;
  const HTMLParagraphElement: typeof globalThis.HTMLParagraphElement;
  const HTMLHeadingElement: typeof globalThis.HTMLHeadingElement;
  const HTMLAnchorElement: typeof globalThis.HTMLAnchorElement;
  const HTMLImageElement: typeof globalThis.HTMLImageElement;
  const HTMLLabelElement: typeof globalThis.HTMLLabelElement;
  const HTMLTextAreaElement: typeof globalThis.HTMLTextAreaElement;
  const SVGSVGElement: typeof globalThis.SVGSVGElement;
}

// Module declarations
declare module '*.svg' {
  import * as React from 'react';
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export { ReactComponent };
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.json' {
  const content: Record<string, unknown>;
  export default content;
}

export {};
