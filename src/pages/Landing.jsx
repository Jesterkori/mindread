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
  { icon: '💍',   title: 'Adult & Couples',      age: 'All Ages',    color: '#f97316', desc: 'Relationship wellness and balanced life for partners.' },
  { icon: '💼',   title: 'Working Professionals',age: 'All Ages',    color: '#e879f9', desc: 'Managing professional stress and work-life balance.' },
  { icon: '👴🏾', title: 'Senior Citizens',       age: '55+ Years',  color: '#a855f7', desc: 'Contentment and healthy mind for older adults.' },
  { icon: '🤝',   title: 'Single Parents',        age: 'All Ages',   color: '#ec4899', desc: 'Support for the unique challenges of solo parenting.' },
  { icon: '📖',   title: '10th Grade Career',     age: 'Ages 15–16', color: '#f59e0b', desc: 'Career aptitude and stream selection counselling for Class 10 students.' },
  { icon: '🏫',   title: '12th Grade Career',     age: 'Ages 17–18', color: '#d97706', desc: 'College readiness and career path counselling for Class 12 students.' },
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
  { icon: '🗺️', title: 'Career Pathfinding',  desc: '50-question career aptitude assessments for 10th and 12th grade students.' },
  { icon: '🎓', title: 'Stream Guidance',      desc: 'Structured career counselling helps students choose the right stream and college.' },
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
        @keyframes glow-green { 0%,100%{box-shadow:0 0 30px rgba(34,197,94,0.12),0 0 0 1.5px rgba(34,197,94,0.35)} 50%{box-shadow:0 0 60px rgba(34,197,94,0.28),0 0 0 1.5px rgba(34,197,94,0.55)} }
        @keyframes glow-amber { 0%,100%{box-shadow:0 0 30px rgba(251,191,36,0.12),0 0 0 1.5px rgba(251,191,36,0.35)} 50%{box-shadow:0 0 60px rgba(251,191,36,0.28),0 0 0 1.5px rgba(251,191,36,0.55)} }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes gradShift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        .float { animation: float 4s ease-in-out infinite }
        .drift { animation: drift 8s ease-in-out infinite }
        .glow-green { animation: glow-green 4s ease-in-out infinite }
        .glow-amber { animation: glow-amber 4s ease-in-out infinite; animation-delay:-2s }
        .hero-title { animation: fadeInUp 0.75s cubic-bezier(0.22,1,0.36,1) both }
        .hero-sub { animation: fadeInUp 0.75s cubic-bezier(0.22,1,0.36,1) 0.2s both }
        .hero-card-1 { animation: fadeInUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.38s both }
        .hero-card-2 { animation: fadeInUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.52s both }
        .grad-animate { background-size:200% auto; animation: gradShift 5s ease infinite }
        .hero-bg { background: linear-gradient(135deg,#0c1f3a 0%,#0d3556 40%,#0b4a52 70%,#0a5c5c 100%); }
      `}</style>

      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section className="hero-bg min-h-screen flex flex-col items-center justify-center relative overflow-hidden pt-16 pb-10">
        <CircuitBackground />

        {/* Decorative blobs */}
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full opacity-10 drift pointer-events-none"
             style={{ background:'radial-gradient(circle,#22c55e,transparent)' }}/>
        <div className="absolute bottom-20 left-6 w-56 h-56 rounded-full opacity-10 drift pointer-events-none"
             style={{ background:'radial-gradient(circle,#f59e0b,transparent)', animationDelay:'-3s' }}/>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-5 pointer-events-none"
             style={{ background:'radial-gradient(circle,#0d9488,transparent)' }}/>
        <span className="absolute top-32 left-12 text-yellow-300 text-2xl opacity-40 select-none drift" style={{ animationDelay:'-1s' }}>✦</span>
        <span className="absolute top-40 right-20 text-cyan-300 text-lg opacity-35 select-none float">✦</span>
        <span className="absolute top-1/3 left-1/4 text-green-300 text-sm opacity-20 select-none float" style={{ animationDelay:'-3s' }}>✦</span>
        <span className="absolute top-1/3 right-1/4 text-amber-300 text-sm opacity-20 select-none float" style={{ animationDelay:'-1.5s' }}>✦</span>
        <span className="absolute bottom-28 right-10 text-amber-300 text-xl opacity-25 select-none drift" style={{ animationDelay:'-5s' }}>⚙</span>
        <span className="absolute bottom-16 left-16 text-purple-300 text-xl opacity-20 select-none float" style={{ animationDelay:'-2s' }}>⚙</span>

        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full flex flex-col items-center">

          {/* Headline */}
          <h1 className="hero-title text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white text-center leading-tight mb-5 whitespace-nowrap"
              style={{ textShadow:'0 2px 40px rgba(34,197,94,0.18)' }}>
            Two Platforms.{' '}
            <span className="grad-animate"
                  style={{ background:'linear-gradient(90deg,#22c55e,#0d9488,#f59e0b,#22c55e)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
              One Mission.
            </span>
          </h1>


          {/* ── Two service cards ─────────────────────────────────────────── */}
          <div className="grid md:grid-cols-2 gap-5 w-full">

            {/* MindCheck */}
            <div className="hero-card-1 rounded-2xl p-7 flex flex-col glow-green"
                 style={{
                   background:'linear-gradient(160deg,rgba(34,197,94,0.1) 0%,rgba(255,255,255,0.04) 100%)',
                   backdropFilter:'blur(20px)',
                   borderTop:'1px solid rgba(74,222,128,0.2)',
                 }}>
              <div className="flex items-start gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center text-3xl shadow-lg"
                     style={{ background:'linear-gradient(135deg,rgba(34,197,94,0.3),rgba(13,148,136,0.2))', border:'1px solid rgba(34,197,94,0.45)' }}>
                  🧠
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-white" style={{ textShadow:'0 1px 12px rgba(34,197,94,0.3)' }}>MindCheck</h2>
                  <span className="text-xs font-semibold text-green-400 tracking-wide">Mental Wellness Platform</span>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"/>
                    <span className="text-xs text-white/45">Ages 10 – 65+</span>
                  </div>
                </div>
              </div>

              <p className="text-white/70 text-sm leading-relaxed mb-5">
                A professional mental wellness self-assessment platform for all age groups — students, couples, working professionals, seniors, and single parents.
              </p>

              <ul className="space-y-3 mb-7 flex-1">
                {[
                  { dot:'#4ade80', t: 'Confidential & professionally reviewed' },
                  { dot:'#4ade80', t: '6 categories tailored to every life stage' },
                  { dot:'#4ade80', t: 'Personalised results with clear guidance' },
                ].map(({ dot, t }) => (
                  <li key={t} className="flex items-center gap-3 text-sm text-white/75">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background:dot, boxShadow:`0 0 6px ${dot}` }}/>
                    {t}
                  </li>
                ))}
              </ul>

              <Link to={ctaPath}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white transition-all hover:brightness-110 hover:-translate-y-0.5 active:scale-95 shadow-lg"
                    style={{ background:'linear-gradient(135deg,#22c55e,#0d9488)', boxShadow:'0 4px 24px rgba(34,197,94,0.3)' }}>
                Take Assessment →
              </Link>
            </div>

            {/* Career Fit */}
            <div className="hero-card-2 rounded-2xl p-7 flex flex-col glow-amber"
                 style={{
                   background:'linear-gradient(160deg,rgba(251,191,36,0.1) 0%,rgba(255,255,255,0.04) 100%)',
                   backdropFilter:'blur(20px)',
                   borderTop:'1px solid rgba(251,191,36,0.2)',
                 }}>
              <div className="flex items-start gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center text-3xl shadow-lg"
                     style={{ background:'linear-gradient(135deg,rgba(251,191,36,0.3),rgba(217,119,6,0.2))', border:'1px solid rgba(251,191,36,0.45)' }}>
                  🎓
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-white" style={{ textShadow:'0 1px 12px rgba(251,191,36,0.3)' }}>Student Career Fit</h2>
                  <span className="text-xs font-semibold text-amber-400 tracking-wide">Career Evaluation Platform</span>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" style={{ animationDelay:'.5s' }}/>
                    <span className="text-xs text-white/45">Ages 15 – 20</span>
                  </div>
                </div>
              </div>

              <p className="text-white/70 text-sm leading-relaxed mb-5">
                A gateway to personalized career counseling and support for 10th and 12th-grade students. Understand your core strengths and get connected to the right career path.
              </p>

              <ul className="space-y-3 mb-7 flex-1">
                {[
                  { dot:'#fbbf24', t: '10th & 12th grade counselling support' },
                  { dot:'#fbbf24', t: 'Identify strengths and career aptitude' },
                  { dot:'#fbbf24', t: 'Connected to the right career path' },
                ].map(({ dot, t }) => (
                  <li key={t} className="flex items-center gap-3 text-sm text-white/75">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background:dot, boxShadow:`0 0 6px ${dot}` }}/>
                    {t}
                  </li>
                ))}
              </ul>

              <Link to={careerCtaPath}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white transition-all hover:brightness-110 hover:-translate-y-0.5 active:scale-95 shadow-lg"
                    style={{ background:'linear-gradient(135deg,#f59e0b,#d97706)', boxShadow:'0 4px 24px rgba(251,191,36,0.3)' }}>
                Take Assessment →
              </Link>
            </div>

          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
          <span className="text-white/30 text-xs">Scroll to explore</span>
          <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-white/50 animate-bounce"/>
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

      {/* ── CAREER FIT GRADE LEVELS ───────────────────────────────────────────── */}
      <section className="py-24" style={{ background:'linear-gradient(135deg,#1c1404,#2d1a00,#0c1f3a)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14" data-reveal>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-3 block">Career Fit Assessment</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Career Counselling for Students</h2>
            <p className="text-white/50 text-sm mt-3 max-w-lg mx-auto">
              Tailored assessments for two critical stages of a student&apos;s academic journey.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {/* 10th Grade */}
            <div data-reveal data-delay="1"
                 className="rounded-2xl p-8 flex flex-col hover:-translate-y-1 transition-all"
                 style={{ background:'rgba(251,191,36,0.08)', border:'1.5px solid rgba(251,191,36,0.25)', backdropFilter:'blur(12px)' }}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl mb-5"
                   style={{ background:'rgba(251,191,36,0.15)', border:'1px solid rgba(251,191,36,0.4)' }}>
                📖
              </div>
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-4 w-fit text-xs font-semibold text-amber-300"
                   style={{ background:'rgba(251,191,36,0.12)', border:'1px solid rgba(251,191,36,0.3)' }}>
                Ages 15–16 • Class 10
              </div>
              <h3 className="text-xl font-extrabold text-white mb-3">10th Grade Counselling</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-5 flex-1">
                Students at the crossroads of stream selection get a 50-question aptitude assessment covering technical interests, academic strengths, people skills, and career clarity — so they choose Science, Commerce, or Arts with confidence.
              </p>
              <ul className="space-y-2 mb-7">
                {['Identify core strengths and learning style', 'Stream selection — Science / Commerce / Arts', 'Early career path clarity'].map(t => (
                  <li key={t} className="flex items-center gap-2.5 text-sm text-white/70">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background:'#fbbf24', boxShadow:'0 0 6px #fbbf24' }}/>
                    {t}
                  </li>
                ))}
              </ul>
              <Link to={careerCtaPath}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all hover:brightness-110 active:scale-95"
                    style={{ background:'linear-gradient(135deg,#f59e0b,#d97706)' }}>
                Take 10th Grade Assessment →
              </Link>
            </div>

            {/* 12th Grade */}
            <div data-reveal data-delay="2"
                 className="rounded-2xl p-8 flex flex-col hover:-translate-y-1 transition-all"
                 style={{ background:'rgba(251,191,36,0.08)', border:'1.5px solid rgba(251,191,36,0.25)', backdropFilter:'blur(12px)' }}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl mb-5"
                   style={{ background:'rgba(251,191,36,0.15)', border:'1px solid rgba(251,191,36,0.4)' }}>
                🏫
              </div>
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-4 w-fit text-xs font-semibold text-amber-300"
                   style={{ background:'rgba(251,191,36,0.12)', border:'1px solid rgba(251,191,36,0.3)' }}>
                Ages 17–18 • Class 12
              </div>
              <h3 className="text-xl font-extrabold text-white mb-3">12th Grade Counselling</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-5 flex-1">
                For students choosing colleges and careers after board exams. The 50-question assessment covers subject depth, planning readiness, stress management, and decision-making — delivering a counsellor-reviewed career report.
              </p>
              <ul className="space-y-2 mb-7">
                {['College & entrance exam readiness', 'Career alignment — Engineering / Medical / Commerce / Arts', 'Personalised counsellor guidance'].map(t => (
                  <li key={t} className="flex items-center gap-2.5 text-sm text-white/70">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background:'#fbbf24', boxShadow:'0 0 6px #fbbf24' }}/>
                    {t}
                  </li>
                ))}
              </ul>
              <Link to={careerCtaPath}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all hover:brightness-110 active:scale-95"
                    style={{ background:'linear-gradient(135deg,#f59e0b,#d97706)' }}>
                Take 12th Grade Assessment →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT CAREER FIT ──────────────────────────────────────────────────── */}
      <section className="py-24" style={{ background:'linear-gradient(135deg,#fefce8,#fffbeb)' }}>
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
          <div className="grid grid-cols-2 gap-4 order-2 md:order-1" data-reveal>
            {[
              { icon:'📖', label:'10th Grade',       sub:'Stream Selection & Aptitude' },
              { icon:'🏫', label:'12th Grade',       sub:'College & Career Readiness' },
              { icon:'🎯', label:'Strength Mapping',  sub:'Know Your Core Abilities' },
              { icon:'🗺️', label:'Career Clarity',   sub:'Right Path, Right Future' },
            ].map(({ icon, label, sub }) => (
              <div key={label} className="rounded-2xl p-5 text-center border-2 hover:border-amber-300 hover:shadow-md transition-all"
                   style={{ borderColor:'rgba(251,191,36,0.3)', background:'rgba(251,191,36,0.06)' }}>
                <span className="text-3xl">{icon}</span>
                <p className="font-bold text-slate-800 text-sm mt-2">{label}</p>
                <p className="text-xs text-slate-400 mt-0.5">{sub}</p>
              </div>
            ))}
          </div>
          <div data-reveal data-delay="2" className="order-1 md:order-2">
            <span className="text-xs font-bold uppercase tracking-widest mb-3 block" style={{ color:'#d97706' }}>About Career Fit</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 leading-tight mb-5">
              Helping Students Find the Right Path
            </h2>
            <p className="text-slate-500 leading-relaxed mb-4">
              Student Career Fit is a dedicated career evaluation platform by Preflex Solutions, built for 10th and 12th grade students. Through a structured 50-question assessment, students uncover their strengths, aptitude, and interests to make confident decisions about streams and careers.
            </p>
            <p className="text-slate-500 leading-relaxed mb-6">
              Every result is reviewed by a career counsellor who provides personalised guidance — helping students and parents navigate the critical turning points of education.
            </p>
            <Link to={careerCtaPath}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all hover:brightness-110"
                  style={{ background:'linear-gradient(135deg,#f59e0b,#d97706)' }}>
              Start Career Assessment
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
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
