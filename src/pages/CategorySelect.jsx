import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { CATEGORIES } from '../data/questions'

const CARD_META = {
  student: {
    title: 'CHILD & TEEN ASSESSMENT',
    ageLabel: 'Ages 10–16',
    tagline: 'Help your child take their mental check-in.',
    features: ['Self-Reflection', 'Mental Clarity'],
    color: '#22c55e',
    lightBg: '#f0fdf4',
    illFrom: '#bbf7d0',
    illTo: '#86efac',
    figures: ['👧🏽', '📖', '👦🏽'],
    topIcon: '💬',
  },
  'young-adult': {
    title: 'YOUNG ADULT ASSESSMENT',
    ageLabel: 'Ages 17–25',
    tagline: 'Empowering your mental journey.',
    features: ['Future Readiness', 'Stress Management'],
    color: '#0d9488',
    lightBg: '#f0fdfa',
    illFrom: '#99f6e4',
    illTo: '#5eead4',
    figures: ['👩🏾', '📱', '👨🏾'],
    topIcon: '⚙️',
  },
  married: {
    title: 'ADULT & COUPLES ASSESSMENT',
    ageLabel: 'All Ages',
    tagline: 'For you and your partner, together.',
    features: ['Relationship Wellness', 'Balanced Life'],
    color: '#f97316',
    lightBg: '#fff7ed',
    illFrom: '#fed7aa',
    illTo: '#fdba74',
    figures: ['👨🏾', '🤝', '👩🏾'],
    topIcon: '🌿',
  },
  divorced: {
    title: 'DIVORCED / SEPARATED',
    ageLabel: 'All Ages',
    tagline: 'Healing and growth after separation.',
    features: ['Emotional Healing', 'New Beginnings'],
    color: '#e879f9',
    lightBg: '#fdf4ff',
    illFrom: '#f5d0fe',
    illTo: '#e879f9',
    figures: ['🌱', '💪🏽', '🕊️'],
    topIcon: '💙',
  },
  older: {
    title: 'SENIOR ADULT ASSESSMENT',
    ageLabel: '55+ Years',
    tagline: "Support for life's new chapters.",
    features: ['Contentment', 'Healthy Mind'],
    color: '#a855f7',
    lightBg: '#faf5ff',
    illFrom: '#e9d5ff',
    illTo: '#d8b4fe',
    figures: ['👴🏾', '📋', '👵🏾'],
    topIcon: '🌳',
  },
}

export default function CategorySelect() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleSelect(category) {
    navigate('/questionnaire', { state: { category } })
  }

  const cardElements = []
  CATEGORIES.forEach((cat, idx) => {
    const meta = CARD_META[cat.id]
    cardElements.push(
      <button
        key={cat.id}
        onClick={() => handleSelect(cat)}
        className="group text-left rounded-2xl overflow-hidden flex-1 min-w-0
                   shadow-xl hover:shadow-2xl hover:-translate-y-2 active:scale-95
                   transition-all duration-200 flex flex-col"
        style={{ border: `3px solid ${meta.color}`, background: meta.lightBg }}
      >
        {/* Title + tagline */}
        <div className="px-4 pt-4 pb-2">
          <p className="font-extrabold text-sm leading-tight uppercase"
             style={{ color: meta.color }}>
            {meta.title}
          </p>
          <p className="text-xs font-semibold text-slate-500 mt-0.5">({meta.ageLabel})</p>
          <p className="text-xs text-slate-600 mt-2 leading-snug">{meta.tagline}</p>
        </div>

        {/* Illustration */}
        <div className="mx-3 mb-3 rounded-xl h-32 flex items-center justify-center relative overflow-hidden"
             style={{ background: `linear-gradient(135deg, ${meta.illFrom}, ${meta.illTo})` }}>
          <div className="absolute top-2 right-2 text-sm opacity-70">{meta.topIcon}</div>
          <div className="absolute top-3 left-3 w-6 h-6 rounded-full bg-white opacity-20" />
          <div className="absolute bottom-3 right-6 w-4 h-4 rounded-full bg-white opacity-15" />
          <div className="flex items-end gap-2 text-4xl leading-none">
            <span>{meta.figures[0]}</span>
            <span className="mb-2 text-3xl">{meta.figures[1]}</span>
            <span>{meta.figures[2]}</span>
          </div>
        </div>

        {/* Bullets */}
        <div className="px-4 pb-4 mt-auto space-y-1.5">
          {meta.features.map(f => (
            <div key={f} className="flex items-center gap-2 text-xs text-slate-700">
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ background: meta.color }} />
              {f}
            </div>
          ))}
        </div>
      </button>
    )

    if (idx < CATEGORIES.length - 1) {
      cardElements.push(
        <div key={`arrow-after-${cat.id}`}
             className="hidden lg:flex items-center justify-center w-10 flex-shrink-0 self-center">
          <svg width="36" height="28" viewBox="0 0 36 28" fill="none">
            <path d="M2 14 Q18 2, 26 14" stroke="#4ade80" strokeWidth="2.5"
                  strokeLinecap="round" fill="none" />
            <path d="M20 8 L27 14 L20 20" stroke="#4ade80" strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )
    }
  })

  return (
    <div className="min-h-screen relative overflow-hidden"
         style={{ background: 'linear-gradient(135deg, #0c1f3a 0%, #0d3556 40%, #0b4a52 70%, #0a5c5c 100%)' }}>

      {/* Circuit board SVG background */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.07, pointerEvents: 'none' }}>
        <defs>
          <pattern id="circuit" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
            <path d="M15 60 H45 M45 60 V25 M45 25 H80 M80 25 V60 M80 60 H105"
                  stroke="#4ade80" strokeWidth="1" fill="none" />
            <circle cx="45" cy="60" r="3" fill="#4ade80" />
            <circle cx="80" cy="25" r="3" fill="#4ade80" />
            <circle cx="80" cy="60" r="2" fill="#4ade80" />
            <path d="M25 95 H60 M60 95 V108" stroke="#60a5fa" strokeWidth="1" fill="none" />
            <circle cx="60" cy="95" r="2" fill="#60a5fa" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit)" />
      </svg>

      {/* Decorative sparkles & gears */}
      <span className="absolute top-24 left-6 text-yellow-300 text-2xl opacity-50 select-none">✦</span>
      <span className="absolute top-44 left-14 text-cyan-300 text-lg opacity-35 select-none">✦</span>
      <span className="absolute top-20 right-8 text-yellow-300 text-xl opacity-45 select-none">✦</span>
      <span className="absolute top-36 right-20 text-cyan-200 text-sm opacity-30 select-none">✦</span>
      <span className="absolute bottom-48 left-8 text-green-300 text-3xl opacity-30 select-none">⚙</span>
      <span className="absolute bottom-32 right-10 text-purple-300 text-2xl opacity-30 select-none">⚙</span>
      <span className="absolute bottom-16 left-24 text-cyan-400 text-xl opacity-25 select-none">⚙</span>

      {/* Nav */}
      <header className="relative z-10 max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white/15 backdrop-blur rounded-xl flex items-center justify-center">
            <span className="text-lg">🧠</span>
          </div>
          <div>
            <p className="font-bold text-white text-sm leading-tight">MindCheck</p>
            <p className="text-xs text-white/50">Hello, {user?.name}</p>
          </div>
        </div>
        <button onClick={logout}
                className="text-sm text-white/50 hover:text-white/90 transition-colors font-medium">
          Sign out
        </button>
      </header>

      {/* Hero banner */}
      <div className="relative z-10 text-center px-6 pt-2 pb-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-wide drop-shadow-lg mb-3 leading-tight">
          MENTAL WELLNESS ASSESSMENT TOOL
        </h1>
        <p className="text-base sm:text-lg text-white/75 font-medium">
          A Gate to Personalized Counselling &amp; Support for All Ages
        </p>
      </div>

      {/* Cards row */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 pb-4">
        <div className="flex flex-col lg:flex-row items-stretch gap-3 lg:gap-0">
          {cardElements}
        </div>
      </div>

      {/* Arrow pointing down to gate */}
      <div className="relative z-10 flex justify-center my-2">
        <svg width="220" height="36" viewBox="0 0 220 36" fill="none">
          <path d="M10 8 L110 28 L210 8" stroke="#4ade80" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </div>

      {/* Gate to assistance section */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 pb-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8">

          {/* Gate circle */}
          <div className="w-56 h-56 rounded-full flex flex-col items-center justify-center text-center px-5 flex-shrink-0"
               style={{
                 background: 'radial-gradient(circle at 40% 40%, #1a3a6e, #0c1f3a)',
                 border: '3px solid #4ade80',
                 boxShadow: '0 0 40px rgba(74,222,128,0.25), 0 0 80px rgba(74,222,128,0.1)',
               }}>
            <p className="text-white font-extrabold text-sm uppercase leading-tight tracking-wide">
              YOUR GATE TO<br />FURTHER ASSISTANCE
            </p>
            <p className="text-green-300/70 text-xs my-2 font-medium">— or —</p>
            <p className="text-white font-bold text-xs uppercase leading-tight tracking-wide">
              KNOW IF YOU NEED<br />FURTHER HELP
            </p>
            <p className="text-white/55 text-xs mt-2 leading-snug">
              Determine if professional guidance is recommended.
            </p>
          </div>

          {/* Counselor circle + floating bubbles */}
          <div className="relative w-64 h-56 flex-shrink-0">
            {/* Counselor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                            w-36 h-36 rounded-full overflow-hidden shadow-2xl
                            flex items-center justify-center text-6xl"
                 style={{
                   background: 'linear-gradient(135deg, #fde68a, #fbbf24)',
                   border: '3px solid rgba(255,255,255,0.3)',
                 }}>
              👩🏽‍💼
            </div>

            {/* Bubbles */}
            <div className="absolute top-1 right-0 bg-white/90 backdrop-blur-sm rounded-xl
                            px-2.5 py-1.5 shadow-lg whitespace-nowrap">
              <p className="text-xs font-bold text-slate-700">Personalized Support</p>
            </div>
            <div className="absolute top-1/2 right-0 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-xl
                            px-2.5 py-1.5 shadow-lg whitespace-nowrap">
              <p className="text-xs font-bold text-slate-700">Confidential Care</p>
            </div>
            <div className="absolute bottom-1 right-4 bg-white/90 backdrop-blur-sm rounded-xl
                            px-2.5 py-1.5 shadow-lg whitespace-nowrap">
              <p className="text-xs font-bold text-slate-700">Gate to Counsellor Assist</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <p className="relative z-10 text-center text-white/65 text-sm font-medium pb-6 px-4">
        Find the right support path for you and your family.
      </p>
    </div>
  )
}
