'use client';

import { useState } from 'react';

/**
 * Duotone fotka: sivý obrázok + farebné prekrytie (multiply alebo screen).
 * Keď sa obrázok nenačíta, zostane len farebná plocha — layout sa nerozbije.
 */
export function DuoPhoto({
  src,
  tint,
  mode = 'multiply',
  base = '#d9d9d9',
  className = '',
  style,
}: {
  src: string;
  tint?: string;
  mode?: 'multiply' | 'screen' | 'none';
  base?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`${className.includes('absolute') || className.includes('fixed') ? '' : 'relative'} overflow-hidden ${className}`} style={{ background: base, ...style }}>
      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" className="duo-img" loading="lazy" onError={() => setFailed(true)} />
      )}
      {tint && mode !== 'none' && (
        <div className={`absolute inset-0 ${mode === 'multiply' ? 'duo-overlay' : 'duo-overlay-screen'}`} style={{ background: tint }} />
      )}
    </div>
  );
}
