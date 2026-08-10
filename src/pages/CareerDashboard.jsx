import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CircuitBackground from '../components/CircuitBackground'
import Icon from '../components/Icon'

// Maps aptitude label keywords → visual profile card data (from PDF scoring guide)
const PROFILES_10TH = [
  {
    keys: ['analytical', 'scientific', 'part 1'],
    icon: 'flask', color: '#22c55e',
    title: 'The Analytical / Scientific Mind',
    stream: 'Science (PCM / PCB)',
    careers: 'Engineering, Data Science, Medicine, Research, Architecture',
  },
  {
    keys: ['creative', 'expressive', 'part 2'],
    icon: 'palette', color: '#e879f9',
    title: 'The Creative / Expressive Mind',
    stream: 'Arts & Humanities',
    careers: 'Design, Journalism, Literature, Fine Arts, Media, Law',
  },
  {
    keys: ['enterprising', 'leadership', 'part 3'],
    icon: 'briefcase', color: '#f59e0b',
    title: 'The Enterprising / Leadership Mind',
    stream: 'Commerce / Business',
    careers: 'Management, Finance, Entrepreneurship, Marketing, Corporate Law',
  },
  {
    keys: ['empathetic', 'social', 'part 4'],
    icon: 'users', color: '#0d9488',
    title: 'The Empathetic / Social Mind',
    stream: 'Humanities or Science (PCB)',
    careers: 'Psychology, Healthcare, Teaching, Social Work, Public Policy',
  },
  {
    keys: ['practical', 'technical', 'part 5'],
    icon: 'settings', color: '#3b82f6',
    title: 'The Practical / Technical Mind',
    stream: 'Science (Computer Science) or Vocational / Diploma',
    careers: 'IT/Software, Robotics, Applied Engineering, Digital Media, Skilled Trades',
  },
  {
    keys: ['multipotentialite', 'diverse', 'mix'],
    icon: 'globe', color: '#a855f7',
    title: 'The Multipotentialite',
    stream: 'Interdisciplinary combinations',
    careers: 'Commerce with Math, Arts with Economics — shadow professionals to narrow interests',
  },
]

const PROFILES_12TH = [
  {
    keys: ['deep tech', 'analytical', 'part 1'],
    icon: 'code', color: '#22c55e',
    title: 'The Deep Tech / Analytical Mind',
    stream: 'B.Tech / B.E. or B.Sc. (Physics, Mathematics, Data Science)',
    careers: 'Engineering, Data Science, AI, Research, Architecture',
  },
  {
    keys: ['creative', 'design', 'part 2'],
    icon: 'film', color: '#e879f9',
    title: 'The Creative / Design Mind',
    stream: 'B.Arch, B.Des (UI/UX), B.A. (Journalism, Mass Comm, Fine Arts)',
    careers: 'UI/UX, Film, Architecture, Graphic Design, Journalism, Digital Arts',
  },
  {
    keys: ['enterprise', 'strategic', 'part 3'],
    icon: 'bar-chart', color: '#f59e0b',
    title: 'The Enterprise / Strategic Mind',
    stream: 'BBA, B.Com (Hons), CA/CS/CFA, Integrated Law (BBA LLB)',
    careers: 'Finance, Investment Banking, Entrepreneurship, Corporate Law, CA',
  },
  {
    keys: ['health', 'society', 'part 4'],
    icon: 'health', color: '#0d9488',
    title: 'The Health / Society Mind',
    stream: 'MBBS, BDS, B.Sc. (Psychology, Nursing), BA LLB, B.A. (Pol. Science)',
    careers: 'Medicine, Psychology, Law, Civil Services, Social Work, Diplomacy',
  },
  {
    keys: ['applied', 'operational', 'part 5'],
    icon: 'send', color: '#3b82f6',
    title: 'The Applied / Operational Mind',
    stream: 'B.Sc. Hospitality, Commercial Pilot Training, Culinary Arts, Supply Chain',
    careers: 'Aviation, Hotel Management, Culinary Arts, Logistics, Tourism',
  },
]

function matchProfile(label, grade) {
  if (!label) return null
  const lower = label.toLowerCase()
  const profiles = grade === '12th' ? PROFILES_12TH : PROFILES_10TH
  return profiles.find(p => p.keys.some(k => lower.includes(k))) || null
}

export default function CareerDashboard() {
  const { user, authHeader } = useAuth()
  const navigate = useNavigate()
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/user/results', { headers: authHeader() })
      .then(r => r.json())
      .then(d => setResults(d.ok ? d.results : []))
      .catch(() => setResults([]))
      .finally(() => setLoading(false))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const bgStyle = { background: 'linear-gradient(135deg, #0c1f3a 0%, #0d3556 40%, #0b4a52 70%, #0a5c5c 100%)' }
  const cardStyle = { background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)' }

  function renderStatusCard() {
    if (loading) {
      return (
        <div className="rounded-2xl p-10 text-center" style={cardStyle}>
          <div className="text-white/40 text-sm">Loading your assessment status…</div>
        </div>
      )
    }

    const latest = results?.[0]

    if (!latest) {
      return (
        <div className="rounded-2xl p-10 text-center" style={cardStyle}>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
               style={{ background: 'rgba(251,191,36,0.15)', border: '1.5px solid rgba(251,191,36,0.35)' }}>
            <Icon name="compass" className="w-8 h-8" style={{ color: '#fbbf24' }} />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Start Your Career Assessment</h2>
          <p className="text-white/50 text-sm leading-relaxed mb-4 max-w-sm mx-auto">
            Answer 50 thoughtfully crafted questions across 5 aptitude areas to discover the career path
            that best matches your strengths and interests.
          </p>
          <div className="grid grid-cols-1 gap-2 max-w-xs mx-auto mb-8 text-left">
            {(user?.grade === '12th' ? [
              'Part 1: Research, Analytics & Deep Tech',
              'Part 2: Creativity, Design & Media',
              'Part 3: Enterprise, Finance & Strategy',
              'Part 4: Human Health, Society & Law',
              'Part 5: Execution, Operations & Applied Skills',
            ] : [
              'Part 1: Analytical, Logical & Scientific Thinking',
              'Part 2: Creativity, Expression & Humanities',
              'Part 3: Leadership, Business & Communication',
              'Part 4: Empathy, Society & Healthcare',
              'Part 5: Technology, Practical & Hands-On',
            ]).map((p, i) => (
              <div key={p} className="flex items-center gap-2 text-xs text-white/55">
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{ background: 'rgba(251,191,36,0.2)', color: '#fbbf24' }}>{i + 1}</span>
                {p}
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate('/career/questionnaire')}
            className="px-10 py-3.5 rounded-xl font-bold text-sm text-white transition-all hover:brightness-110 active:scale-95"
            style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', boxShadow: '0 0 20px rgba(251,191,36,0.3)' }}>
            Take Career Assessment →
          </button>
        </div>
      )
    }

    if (!latest.result_released) {
      return (
        <div className="rounded-2xl p-10 text-center" style={cardStyle}>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
               style={{ background: 'rgba(251,191,36,0.15)', border: '1.5px solid rgba(251,191,36,0.35)' }}>
            <Icon name="clock" className="w-8 h-8" style={{ color: '#fbbf24' }} />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Assessment Under Review</h2>
          <p className="text-white/50 text-sm leading-relaxed mb-2 max-w-sm mx-auto">
            You completed the assessment on{' '}
            <span className="text-white/70">
              {new Date(latest.submitted_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>.
          </p>
          <p className="text-white/40 text-xs max-w-xs mx-auto mb-8">
            Our career counsellor is reviewing your responses. Your personalised career report will appear here once released.
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: '#f59e0b' }} />
            <span className="text-amber-300 text-sm font-medium">Results pending expert review</span>
          </div>
        </div>
      )
    }

    // Results released — match a profile from the label
    const profile = matchProfile(latest.label, user?.grade)

    return (
      <div className="space-y-4">
        {/* Profile card */}
        {profile && (
          <div className="rounded-2xl p-8" style={{ background: `${profile.color}12`, border: `1.5px solid ${profile.color}35` }}>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                   style={{ background: `${profile.color}20`, border: `1.5px solid ${profile.color}50` }}>
                <Icon name={profile.icon} className="w-7 h-7" style={{ color: profile.color }} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest mb-1" style={{ color: profile.color }}>Your Aptitude Profile</p>
                <h2 className="text-lg font-extrabold text-white">{profile.title}</h2>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <p className="text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: profile.color }}>Recommended Stream</p>
                <p className="text-white/80 text-sm leading-relaxed">{profile.stream}</p>
              </div>
              <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <p className="text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: profile.color }}>Explore Careers In</p>
                <p className="text-white/80 text-sm leading-relaxed">{profile.careers}</p>
              </div>
            </div>
          </div>
        )}

        {/* Counsellor's analysis */}
        {latest.ai_analysis && (
          <div className="rounded-2xl p-6" style={{ background: 'rgba(251,191,36,0.07)', border: '1px solid rgba(251,191,36,0.2)' }}>
            <p className="text-xs font-semibold uppercase tracking-wider mb-3 text-amber-300">Counsellor's Career Guidance</p>
            <p className="text-white/75 text-sm leading-relaxed whitespace-pre-line">{latest.ai_analysis}</p>
          </div>
        )}

        {/* Admin notes */}
        {latest.admin_notes && (
          <div className="rounded-2xl p-6" style={{ background: 'rgba(96,165,250,0.07)', border: '1px solid rgba(96,165,250,0.2)' }}>
            <p className="text-xs font-semibold uppercase tracking-wider mb-3 text-blue-300">Additional Notes</p>
            <p className="text-white/70 text-sm leading-relaxed">{latest.admin_notes}</p>
          </div>
        )}

        {latest.released_at && (
          <p className="text-white/25 text-xs text-right">
            Released on {new Date(latest.released_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden" style={bgStyle}>
      <CircuitBackground opacity={0.04} />
      <Navbar />

      <div className="relative z-10 flex-1 px-4 py-16 max-w-2xl mx-auto w-full">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 mb-4 text-xs font-semibold text-amber-300"
               style={{ background: 'rgba(251,191,36,0.15)', border: '1px solid rgba(251,191,36,0.3)' }}>
            <Icon name="graduation-cap" className="w-3.5 h-3.5" />
            Student Career Fit Evaluation Platform
          </div>
          <h1 className="text-3xl font-extrabold text-white">
            Welcome, {user?.name?.split(' ')[0]}!
          </h1>
          <p className="text-white/50 text-sm mt-1">
            {user?.grade ? `Grade ${user.grade} • Career Assessment` : 'Career Assessment'}
          </p>
        </div>

        {renderStatusCard()}
      </div>

      <Footer />
    </div>
  )
}
