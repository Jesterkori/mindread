/* Preflex Solutions Pvt.Ltd. — two-ring C-arc of red dots, cyan at base */
export default function PreflexLogo({ size = 38 }) {
  const R  = '#e63329'   // Preflex brand red
  const R2 = '#f05540'   // slightly lighter red for inner ring
  const C  = '#1cc8d4'   // cyan accent at the base

  // All dots laid out on two concentric arcs, C-shape opening to upper-right.
  // ViewBox 36×36, arc centre (18, 19).
  // Outer ring radius ≈ 14 | Inner ring radius ≈ 8
  // Angles use SVG convention (0° = right, clockwise).
  // Arc spans ~260° from 55° → 315° leaving a gap on the upper-right.
  //
  // Outer ring — 8 dots, larger, spanning the full arc
  // Inner ring — 6 dots, smaller, slightly inside
  // Base accent — 2 small cyan dots near the lowest point of the arc

  const dots = [
    // ── Outer ring ─────────────────────────────────────────
    // angle 55°  → lower-right
    [26.0, 30.7, 2.9, R ],
    // angle 91°  → bottom-centre
    [18.0, 33.0, 2.9, R ],
    // angle 127° → lower-left
    [ 9.6, 30.2, 2.7, R ],
    // angle 163° → left
    [ 4.6, 23.2, 2.6, R ],
    // angle 199° → left (above centre)
    [ 4.6, 14.8, 2.6, R ],
    // angle 235° → upper-left
    [ 9.8,  7.7, 2.7, R ],
    // angle 271° → top
    [18.1,  5.0, 2.9, R ],
    // angle 307° → upper-right
    [26.1,  7.3, 2.9, R ],

    // ── Inner ring ─────────────────────────────────────────
    // angle 73°  → lower inner-right
    [20.7, 26.7, 1.9, R2],
    // angle 109° → lower inner-left
    [15.0, 26.6, 1.8, R2],
    // angle 155° → inner-left
    [10.8, 22.2, 1.7, R2],
    // angle 203° → inner-left (upper)
    [10.8, 15.8, 1.7, R2],
    // angle 249° → upper inner-left
    [15.2, 11.3, 1.8, R2],
    // angle 285° → upper inner-right
    [20.8, 11.2, 1.9, R2],

    // ── Cyan base accent (bottom of the arc) ──────────────
    [18.0, 35.5, 1.5, C ],
    [18.0, 37.5, 1.1, '#67e8f9'],
  ]

  return (
    <svg width={size} height={Math.round(size * 1.08)} viewBox="0 0 36 39" fill="none">
      {dots.map(([cx, cy, r, fill], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill={fill} />
      ))}
    </svg>
  )
}
