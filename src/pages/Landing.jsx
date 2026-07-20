import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CircuitBackground from '../components/CircuitBackground'

/* ── Scroll-reveal hook ─────────────────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    const io  = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('revealed')
          io.unobserve(e.target)
        }
      }),
      { threshold: 0.15 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/* ── Animated counter ───────────────────────────────────────────────────────── */
function Counter({ to, suffix = '' }) {
  const ref  = useRef(null)
  const done = useRef(false)
  useEffect(() => {
    const el = ref.current
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true
        let start = 0
        const step = () => {
          start += Math.ceil(to / 40)
          if (start >= to) { el.textContent = to + suffix; return }
          el.textContent = start + suffix
          requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      }
    }, { threshold: 0.5 })
    io.observe(el)
    return () => io.disconnect()
  }, [to, suffix])
  return <span ref={ref}>0{suffix}</span>
}

const CATEGORIES = [
  { icon: '👧🏽', title: 'Children & Students',  age: 'Ages 10–16',  color: '#22c55e', desc: 'Self-reflection and mental clarity for school-going students.' },
  { icon: '👩🏾', title: 'Youngsters & Gen Z',   age: 'Ages 17–25',  color: '#0d9488', desc: 'Future readiness and stress management for college students.' },
  { icon: '💍',   title: 'Adult & Couples',   age: 'All Ages',   color: '#f97316', desc: 'Relationship wellness and balanced life for partners.' },
  { icon: '💼',   title: 'Working Professionals', age: 'All Ages',   color: '#e879f9', desc: 'Managing professional stress and work-life balance.' },
  { icon: '👴🏾', title: 'Senior Citizens',   age: '55+ Years',  color: '#a855f7', desc: 'Contentment and healthy mind for older adults.' },
  { icon: '🤝',   title: 'Single Parents',    age: 'All Ages',   color: '#ec4899', desc: 'Support for the unique challenges of solo parenting.' },
]

const STEPS = [
  { n: '01', icon: '📝', title: 'Register',            desc: 'Create your account and select the category that fits your life stage.' },
  { n: '02', icon: '✅', title: 'Admin Approval',       desc: 'Our team reviews and approves your account within 24 hours.' },
  { n: '03', icon: '🧠', title: 'Take the Assessment', desc: 'Answer 10–20 tailored questions about your mental wellness.' },
  { n: '04', icon: '📊', title: 'Get Your Results',    desc: 'Receive a personalised report with guidance and next steps.' },
]

const FEATURES = [
  { icon: '🔒', title: 'Confidential',        desc: 'Your responses are private and reviewed only by verified professionals.' },
  { icon: '🎯', title: 'Personalised',         desc: 'Questions and results are tailored to your age group and life situation.' },
  { icon: '🏫', title: 'Institution Support',  desc: 'Colleges and schools can enrol students and track wellness by section.' },
  { icon: '📈', title: 'Actionable Insights',  desc: 'Admins get CSV/PDF reports sortable by institution and section.' },
  { icon: '⚡', title: 'Fast & Simple',        desc: 'The full assessment takes under 10 minutes on any device.' },
  { icon: '🤝', title: 'Professional Review',  desc: 'Every result is reviewed by a counsellor before being released.' },
]

const DEFAULT_ABOUT_CARDS = [
  { icon: '🎓', label: 'Students',  sub: 'School & College' },
  { icon: '💑', label: 'Couples',   sub: 'Relationship Support' },
  { icon: '🌱', label: 'Recovery',  sub: 'After Separation' },
  { icon: '🌟', label: 'Seniors',   sub: 'Healthy Ageing' },
]

const DEFAULT_CONFIG = {
  powered_by:         'Preflex Solutions Pvt. Ltd.',
  hero_title:         'Mental Wellness',
  hero_line2:         'Assessment Tool',
  hero_subtitle:      'A gate to personalized counselling & support for all ages. Understand your mental wellness and get connected to the right help.',
  contact_email:      'support@preflexsol.com',
  contact_phone:      '+91 98866 29446',
  about_title:        'Why Mental Wellness Matters Today',
  about_p1:           'MindCheck is a professional mental wellness self-assessment platform developed by Preflex Solutions Pvt. Ltd. to help individuals across all age groups understand and manage their mental health.',
  about_p2:           'From school students to senior adults, our tailored assessments provide actionable insights and connect users with qualified counsellors when professional help is needed.',
  about_cards_json:   JSON.stringify(DEFAULT_ABOUT_CARDS),
  features_json:      JSON.stringify(FEATURES),
  institution_title:  'Built for Colleges & Schools',
  institution_desc:   'MindCheck offers dedicated institution support — from student enrolment and section-wise assessments to bulk reporting for counsellors and administrators.',
  logo_base64:        '',
}

export default function Landing() {
  useReveal()
  const { user } = useAuth()
  let ctaPath = '/register'
  let careerCtaPath = '/career/register'
  if (user) {
    ctaPath      = user.service === 'career_fit' ? '/career/dashboard' : '/dashboard'
    careerCtaPath = user.service === 'career_fit' ? '/career/dashboard' : '/career/register'
  }
  const [cfg, setCfg] = useState(DEFAULT_CONFIG)

  useEffect(() => {
    fetch('/api/config')
      .then((r) => r.json())
      .then((d) => { if (d.ok) setCfg({ ...DEFAULT_CONFIG, ...d.config }) })
      .catch(() => {})
  }, [])

  const features = (() => { try { return JSON.parse(cfg.features_json) } catch { return FEATURES } })()
  const aboutCards = (() => { try { return JSON.parse(cfg.about_cards_json) } catch { return DEFAULT_ABOUT_CARDS } })()

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <style>{`
        [data-reveal] { opacity:0; transform:translateY(32px); transition:opacity .6s ease, transform .6s ease; }
        [data-reveal].revealed { opacity:1; transform:translateY(0); }
        [data-reveal][data-delay="1"] { transition-delay:.1s }
        [data-reveal][data-delay="2"] { transition-delay:.2s }
        [data-reveal][data-delay="3"] { transition-delay:.3s }
        [data-reveal][data-delay="4"] { transition-delay:.4s }
        [data-reveal][data-delay="5"] { transition-delay:.5s }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes pulse-ring { 0%{transform:scale(1);opacity:.6} 100%{transform:scale(1.6);opacity:0} }
        @keyframes drift { 0%,100%{transform:translate(0,0) rotate(0deg)} 33%{transform:translate(8px,-8px) rotate(5deg)} 66%{transform:translate(-5px,5px) rotate(-3deg)} }
        .float { animation: float 4s ease-in-out infinite }
        .drift { animation: drift 8s ease-in-out infinite }
        .hero-bg { background: linear-gradient(135deg,#0c1f3a 0%,#0d3556 40%,#0b4a52 70%,#0a5c5c 100%); }
      `}</style>

      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section className="hero-bg min-h-screen flex items-center relative overflow-hidden pt-16">
        <CircuitBackground />

        {/* Decorative blobs */}
        <div className="absolute top-24 right-16 w-64 h-64 rounded-full opacity-10 drift"
             style={{ background:'radial-gradient(circle,#22c55e,transparent)' }}/>
        <div className="absolute bottom-24 left-8 w-48 h-48 rounded-full opacity-10 drift"
             style={{ background:'radial-gradient(circle,#0d9488,transparent)', animationDelay:'-3s' }}/>
        <span className="absolute top-32 left-12 text-yellow-300 text-2xl opacity-50 select-none drift" style={{ animationDelay:'-1s' }}>✦</span>
        <span className="absolute top-48 right-24 text-cyan-300 text-lg opacity-40 select-none float">✦</span>
        <span className="absolute bottom-32 right-12 text-green-300 text-3xl opacity-30 select-none drift" style={{ animationDelay:'-5s' }}>⚙</span>
        <span className="absolute bottom-20 left-20 text-purple-300 text-2xl opacity-30 select-none float" style={{ animationDelay:'-2s' }}>⚙</span>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 text-xs font-semibold text-green-300"
                 style={{ background:'rgba(74,222,128,0.15)', border:'1px solid rgba(74,222,128,0.3)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"/>
              Powered by {cfg.powered_by}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              {cfg.hero_title}<br/>
              <span style={{ background:'linear-gradient(90deg,#22c55e,#0d9488)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                {cfg.hero_line2}
              </span>
            </h1>
            <p className="text-white/70 text-lg mb-8 leading-relaxed max-w-lg">
              {cfg.hero_subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to={ctaPath}
                    className="px-7 py-3.5 rounded-xl font-bold text-white text-sm shadow-lg transition-all hover:brightness-110 hover:-translate-y-0.5 active:scale-95"
                    style={{ background:'linear-gradient(135deg,#22c55e,#0d9488)' }}>
                Take Assessment →
              </Link>
              <a href="#about"
                 className="px-7 py-3.5 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5"
                 style={{ background:'rgba(255,255,255,0.1)', border:'1.5px solid rgba(255,255,255,0.25)', color:'white' }}>
                Learn More
              </a>
            </div>
          </div>

          {/* Right — floating cards preview */}
          <div className="hidden lg:block relative h-96">
            {CATEGORIES.slice(0,4).map((cat, i) => (
              <div key={cat.title}
                   className="absolute rounded-2xl px-4 py-3 shadow-2xl float"
                   style={{
                     background:'rgba(255,255,255,0.08)', backdropFilter:'blur(12px)',
                     border:`1.5px solid ${cat.color}40`,
                     animationDelay:`${i * -1.2}s`,
                     top:  [10, 45, 20, 55][i] + '%',
                     left: [5, 40, 65, 25][i] + '%',
                   }}>
                <span className="text-2xl">{cat.icon}</span>
                <p className="text-white text-xs font-bold mt-1">{cat.title}</p>
                <p className="text-xs mt-0.5" style={{ color: cat.color }}>{cat.age}</p>
              </div>
            ))}
            {/* Center glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full"
                 style={{ background:'radial-gradient(circle,rgba(34,197,94,0.3),transparent)' }}/>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
          <span className="text-white/40 text-xs">Scroll to explore</span>
          <div className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-white/60 animate-bounce"/>
          </div>
        </div>
      </section>

      {/* ── OUR SERVICES ──────────────────────────────────────────────────────── */}
      <section className="py-20 bg-slate-50" id="services">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12" data-reveal>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-green-600 mb-3">Our Platforms</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Two Services, One Goal</h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto">Choose the platform that fits your needs — mental wellness support or career guidance for students.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* MindCheck card */}
            <div className="rounded-2xl p-8 flex flex-col shadow-lg hover:-translate-y-1 transition-transform duration-300"
                 style={{ background: 'linear-gradient(135deg,#0c1f3a,#0b4a52)', border: '1.5px solid rgba(34,197,94,0.3)' }}
                 data-reveal>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                     style={{ background: 'rgba(34,197,94,0.2)' }}>🧠</div>
                <div>
                  <h3 className="text-lg font-extrabold text-white">MindCheck</h3>
                  <span className="text-xs text-green-400 font-medium">Mental Wellness Platform</span>
                </div>
              </div>
              <p className="text-white/65 text-sm leading-relaxed mb-3">
                A professional mental wellness self-assessment platform for all age groups — students, couples, working professionals, seniors, and single parents.
              </p>
              <ul className="space-y-1.5 mb-6">
                {['Ages 10 – 65+', '6 tailored categories', 'Counsellor-reviewed results'].map(t => (
                  <li key={t} className="flex items-center gap-2 text-sm text-white/70">
                    <span className="text-green-400 font-bold">✓</span> {t}
                  </li>
                ))}
              </ul>
              <Link to={ctaPath}
                    className="mt-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all hover:brightness-110 active:scale-95"
                    style={{ background: 'linear-gradient(135deg,#22c55e,#0d9488)' }}>
                Take Assessment →
              </Link>
            </div>

            {/* Career Fit card */}
            <div className="rounded-2xl p-8 flex flex-col shadow-lg hover:-translate-y-1 transition-transform duration-300"
                 style={{ background: 'linear-gradient(135deg,#1c1404,#3b2000)', border: '1.5px solid rgba(251,191,36,0.3)' }}
                 data-reveal data-delay="2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                     style={{ background: 'rgba(251,191,36,0.2)' }}>🎓</div>
                <div>
                  <h3 className="text-lg font-extrabold text-white">Student Career Fit</h3>
                  <span className="text-xs text-amber-400 font-medium">Career Evaluation Platform</span>
                </div>
              </div>
              <p className="text-white/65 text-sm leading-relaxed mb-3">
                A gateway to personalized career counseling and support for 10th and 12th-grade students. Understand your core strengths and get connected to the right career path.
              </p>
              <ul className="space-y-1.5 mb-6">
                {['Ages 15 – 20', '10th & 12th grade counselling', 'Career path recommendations'].map(t => (
                  <li key={t} className="flex items-center gap-2 text-sm text-white/70">
                    <span className="text-amber-400 font-bold">✓</span> {t}
                  </li>
                ))}
              </ul>
              <Link to={careerCtaPath}
                    className="mt-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all hover:brightness-110 active:scale-95"
                    style={{ background: 'linear-gradient(135deg,#f59e0b,#d97706)' }}>
                Join Now →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-teal-600">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {[
            { n: 5,    s: '+', label: 'Assessment Categories' },
            { n: 20,   s: 'Q', label: 'Tailored Questions' },
            { n: 100,  s: '%', label: 'Confidential' },
            { n: 24,   s: 'h', label: 'Approval Turnaround' },
          ].map(({ n, s, label }) => (
            <div key={label} data-reveal>
              <p className="text-4xl font-extrabold"><Counter to={n} suffix={s}/></p>
              <p className="text-white/80 text-sm mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────────────────────────── */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
          <div data-reveal>
            <span className="text-xs font-bold uppercase tracking-widest text-green-500 mb-3 block">About MindCheck</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 leading-tight mb-5">
              {cfg.about_title}
            </h2>
            <p className="text-slate-500 leading-relaxed mb-4">{cfg.about_p1}</p>
            <p className="text-slate-500 leading-relaxed mb-6">{cfg.about_p2}</p>
            <Link to={ctaPath}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all hover:brightness-110"
                  style={{ background:'linear-gradient(135deg,#22c55e,#0d9488)' }}>
              Start Your Assessment
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4" data-reveal data-delay="2">
            {aboutCards.map(({ icon, label, sub }) => (
              <div key={label} className="rounded-2xl p-5 text-center border border-slate-100 hover:border-green-200 hover:shadow-md transition-all">
                <span className="text-3xl">{icon}</span>
                <p className="font-bold text-slate-800 text-sm mt-2">{label}</p>
                <p className="text-xs text-slate-400 mt-0.5">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────────────────────────── */}
      <section id="features" className="py-24" style={{ background:'linear-gradient(135deg,#f0fdf4,#f0fdfa)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14" data-reveal>
            <span className="text-xs font-bold uppercase tracking-widest text-green-500 mb-3 block">Features</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800">Everything You Need</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={f.title} data-reveal data-delay={String(i % 3 + 1)}
                   className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all">
                <span className="text-3xl">{f.icon}</span>
                <h3 className="font-bold text-slate-800 mt-3 mb-1">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14" data-reveal>
            <span className="text-xs font-bold uppercase tracking-widest text-green-500 mb-3 block">Assessment Categories</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800">Designed for Every Life Stage</h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {CATEGORIES.map((cat, i) => (
              <div key={cat.title} data-reveal data-delay={String(i + 1)}
                   className="rounded-2xl p-5 border-2 hover:-translate-y-1 hover:shadow-lg transition-all cursor-pointer"
                   style={{ borderColor: cat.color + '50', background: cat.color + '0d' }}>
                <span className="text-4xl">{cat.icon}</span>
                <p className="font-bold text-slate-800 text-sm mt-3">{cat.title}</p>
                <p className="text-xs font-semibold mt-0.5 mb-2" style={{ color: cat.color }}>{cat.age}</p>
                <p className="text-xs text-slate-500 leading-snug">{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────────── */}
      <section className="py-24" style={{ background:'linear-gradient(135deg,#0c1f3a,#0a5c5c)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14" data-reveal>
            <span className="text-xs font-bold uppercase tracking-widest text-green-400 mb-3 block">Process</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">How It Works</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((s, i) => (
              <div key={s.n} data-reveal data-delay={String(i + 1)}
                   className="rounded-2xl p-6 relative"
                   style={{ background:'rgba(255,255,255,0.07)', border:'1.5px solid rgba(255,255,255,0.12)' }}>
                <span className="absolute top-4 right-4 text-xs font-black opacity-20 text-white text-2xl">{s.n}</span>
                <span className="text-3xl">{s.icon}</span>
                <h3 className="font-bold text-white mt-3 mb-1 text-sm">{s.title}</h3>
                <p className="text-white/55 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOR INSTITUTIONS ──────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
          <div className="space-y-4" data-reveal>
            {[
              { icon:'🏫', title:'Enrol Your Institution', desc:'Colleges and schools can register their students under a verified institution.' },
              { icon:'📋', title:'Section-wise Tracking',  desc:'Students select their section before taking the assessment.' },
            ].map(item => (
              <div key={item.title} className="flex gap-4 p-5 rounded-2xl border border-slate-100 hover:border-green-200 hover:shadow-sm transition-all">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <p className="font-bold text-slate-800 text-sm">{item.title}</p>
                  <p className="text-slate-500 text-sm mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div data-reveal data-delay="2">
            <span className="text-xs font-bold uppercase tracking-widest text-green-500 mb-3 block">For Institutions</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 leading-tight mb-4">
              {cfg.institution_title}
            </h2>
            <p className="text-slate-500 leading-relaxed mb-6">{cfg.institution_desc}</p>
            <Link to={ctaPath}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all hover:brightness-110 mb-5"
                  style={{ background:'linear-gradient(135deg,#22c55e,#0d9488)' }}>
              Register Your Institution
            </Link>
            <div className="rounded-xl p-4 space-y-2"
                 style={{ background:'rgba(13,148,136,0.07)', border:'1.5px solid rgba(13,148,136,0.25)' }}>
              <p className="text-xs font-bold uppercase tracking-widest text-teal-600 mb-1">Contact Preflex Support</p>
              <a href={`mailto:${cfg.contact_email}`}
                 className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-teal-600 transition-colors">
                <span>✉</span> {cfg.contact_email}
              </a>
              <a href={`tel:${cfg.contact_phone.replace(/\s/g, '')}`}
                 className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-teal-600 transition-colors">
                <span>📞</span> {cfg.contact_phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────────── */}
      <section className="py-20" style={{ background:'linear-gradient(135deg,#22c55e,#0d9488)' }}>
        <div className="max-w-2xl mx-auto px-6 text-center" data-reveal>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Ready to Check In With Yourself?
          </h2>
          <p className="text-white/80 mb-8">
            It takes less than 10 minutes. Your responses are private. Get started today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to={ctaPath}
                  className="px-8 py-3.5 rounded-xl font-bold text-sm bg-white text-green-700 hover:bg-green-50 transition-all hover:-translate-y-0.5 shadow-lg">
              Create Free Account
            </Link>
            <Link to="/login"
                  className="px-8 py-3.5 rounded-xl font-bold text-sm text-white transition-all hover:-translate-y-0.5"
                  style={{ background:'rgba(255,255,255,0.2)', border:'1.5px solid rgba(255,255,255,0.4)' }}>
              Sign In
            </Link>
          </div>
        </div>
      </section>

      <div id="contact"><Footer /></div>
    </div>
  )
}
