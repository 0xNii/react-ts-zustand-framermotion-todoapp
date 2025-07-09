import type { ReactNode } from 'react';
import { useState, useRef, useLayoutEffect } from 'react';

type Props = {
  children: ReactNode;
  content: string;
  preferred?: 'top' | 'right' | 'bottom' | 'left';
  spacing?: number;
};

const Tooltip = ({
  children,
  content,
  preferred = 'bottom',
  spacing = 8,
}: Props) => {
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const placements = ['top', 'bottom', 'left', 'right'] as const;

  useLayoutEffect(() => {
    if (!visible) return;
    if (!triggerRef.current) return;
    if (!tooltipRef.current) return;

    const tr = triggerRef.current.getBoundingClientRect();
    const tt = tooltipRef.current.getBoundingClientRect();

    const compute = (placement: (typeof placements)[number]) => {
      switch (placement) {
        case 'top':
          return {
            top: tr.top - tt.height - spacing,
            left: tr.left + (tr.width - tt.width) / 2,
          };
        case 'bottom':
          return {
            top: tr.bottom + spacing,
            left: tr.left + (tr.width - tt.width) / 2,
          };
        case 'left':
          return {
            top: tr.top + (tr.height - tt.height) / 2,
            left: tr.left - tt.width - spacing,
          };
        case 'right':
          return {
            top: tr.top + (tr.height - tt.height) / 2,
            left: tr.right + spacing,
          };
        default:
          return { top: 0, left: 0 };
      }
    };

    let coords = compute(preferred);

    const fits = (c: { top: number; left: number }) =>
      c.top >= 0 &&
      c.left >= 0 &&
      c.top + tt.height <= window.innerHeight &&
      c.left + tt.width <= window.innerWidth;

    if (!fits(coords)) {
      for (let p of placements) {
        const alt = compute(p);
        if (fits(alt)) {
          coords = alt;
          break;
        }
      }
    }

    setPosition(coords);
  }, [visible, preferred, spacing]);

  return (
    <>
      <span
        ref={triggerRef}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        style={{ display: 'inline-block' }}
      >
        {children}
      </span>
      {visible && (
        <div
          ref={tooltipRef}
          style={{
            position: 'fixed',
            top: position.top,
            left: position.left,
            background: 'rgba(0,0,0,0.9)',
            color: '#fff',
            padding: '4px 8px',
            borderRadius: 8,
            fontSize: 12,
            pointerEvents: 'none',
            letterSpacing: '.4px',
            zIndex: 9999,
            whiteSpace: 'nowrap',
          }}
        >
          {content}
        </div>
      )}
    </>
  );
};

export default Tooltip;
