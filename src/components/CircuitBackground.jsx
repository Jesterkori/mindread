export default function CircuitBackground({ opacity = 0.07 }) {
  return (
    <svg className="absolute inset-0 w-full h-full" style={{ opacity, pointerEvents: 'none' }} aria-hidden="true">
      <defs>
        <pattern id="circuit-bg" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
          <path d="M15 60 H45 M45 60 V25 M45 25 H80 M80 25 V60 M80 60 H105"
                stroke="#4ade80" strokeWidth="1" fill="none" />
          <circle cx="45" cy="60" r="3" fill="#4ade80" />
          <circle cx="80" cy="25" r="3" fill="#4ade80" />
          <circle cx="80" cy="60" r="2" fill="#4ade80" />
          <path d="M25 95 H60 M60 95 V108" stroke="#60a5fa" strokeWidth="1" fill="none" />
          <circle cx="60" cy="95" r="2" fill="#60a5fa" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#circuit-bg)" />
    </svg>
  )
}
