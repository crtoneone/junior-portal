import * as React from 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      font: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          size?: string | number;
          color?: string;
          face?: string;
        },
        HTMLElement
      >;
      center: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}
