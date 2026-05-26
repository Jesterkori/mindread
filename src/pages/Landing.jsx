import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

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
  { icon: '👧🏽', title: 'Child & Teen', age: 'Ages 10–16', color: '#22c55e', desc: 'Self-reflection and mental clarity for school-going students.' },
  { icon: '👩🏾', title: 'Young Adult',  age: 'Ages 17–25', color: '#0d9488', desc: 'Future readiness and stress management for college students.' },
  { icon: '💍',   title: 'Adult & Couples', age: 'All Ages', color: '#f97316', desc: 'Relationship wellness and balanced life for partners.' },
  { icon: '🌱',   title: 'Divorced / Separated', age: 'All Ages', color: '#e879f9', desc: 'Emotional healing and new beginnings after separation.' },
  { icon: '👴🏾', title: 'Senior Adult', age: '55+ Years', color: '#a855f7', desc: 'Contentment and healthy mind for older adults.' },
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

export default function Landing() {
  useReveal()

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

      <Navbar transparent />

      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section className="hero-bg min-h-screen flex items-center relative overflow-hidden pt-16">
        {/* Circuit SVG */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity:.07, pointerEvents:'none' }}>
          <defs>
            <pattern id="c" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <path d="M15 60H45M45 60V25M45 25H80M80 25V60M80 60H105" stroke="#4ade80" strokeWidth="1" fill="none"/>
              <circle cx="45" cy="60" r="3" fill="#4ade80"/>
              <circle cx="80" cy="25" r="3" fill="#4ade80"/>
              <path d="M25 95H60M60 95V108" stroke="#60a5fa" strokeWidth="1" fill="none"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#c)"/>
        </svg>

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
              Powered by Preflex Solutions Pvt. Ltd.
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Mental Wellness<br/>
              <span style={{ background:'linear-gradient(90deg,#22c55e,#0d9488)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                Assessment Tool
              </span>
            </h1>
            <p className="text-white/70 text-lg mb-8 leading-relaxed max-w-lg">
              A gate to personalized counselling &amp; support for all ages.
              Understand your mental wellness and get connected to the right help.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/register"
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
              Why Mental Wellness<br/>Matters Today
            </h2>
            <p className="text-slate-500 leading-relaxed mb-4">
              MindCheck is a professional mental wellness self-assessment platform developed by
              <strong className="text-slate-700"> Preflex Solutions Pvt. Ltd.</strong> to help individuals
              across all age groups understand and manage their mental health.
            </p>
            <p className="text-slate-500 leading-relaxed mb-6">
              From school students to senior adults, our tailored assessments provide actionable
              insights and connect users with qualified counsellors when professional help is needed.
            </p>
            <Link to="/register"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all hover:brightness-110"
                  style={{ background:'linear-gradient(135deg,#22c55e,#0d9488)' }}>
              Start Your Assessment
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4" data-reveal data-delay="2">
            {[
              { icon:'🎓', label:'Students',  sub:'School & College' },
              { icon:'💑', label:'Couples',   sub:'Relationship Support' },
              { icon:'🌱', label:'Recovery',  sub:'After Separation' },
              { icon:'🌟', label:'Seniors',   sub:'Healthy Ageing' },
            ].map(({ icon, label, sub }) => (
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
            {FEATURES.map((f, i) => (
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
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
              { icon:'📋', title:'Section-wise Tracking',  desc:'Students select their section (CS, ECE, MBA…) before taking the assessment.' },
              { icon:'📥', title:'Download Reports',       desc:'Admins can download full results filtered by institution and section as CSV or PDF.' },
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
              Built for Colleges<br/>&amp; Schools
            </h2>
            <p className="text-slate-500 leading-relaxed mb-6">
              MindCheck offers dedicated institution support — from student enrolment and
              section-wise assessments to bulk reporting for counsellors and administrators.
            </p>
            <Link to="/register"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all hover:brightness-110"
                  style={{ background:'linear-gradient(135deg,#22c55e,#0d9488)' }}>
              Register Your Institution
            </Link>
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
            <Link to="/register"
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

      {/* ── FOOTER ────────────────────────────────────────────────────────────── */}
      <footer id="contact" className="bg-slate-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="19" fill="url(#fg)"/>
                <defs><radialGradient id="fg" cx="35%" cy="30%" r="70%"><stop offset="0%" stopColor="#f87171"/><stop offset="100%" stopColor="#dc2626"/></radialGradient></defs>
                {[[12,12],[18,10],[24,12],[28,17],[27,23],[22,27],[16,27],[11,23],[11,17],[20,20]].map(([cx,cy],i)=>(
                  <circle key={i} cx={cx} cy={cy} r={1.8} fill="white" opacity={i<9?0.9:0.6}/>
                ))}
              </svg>
              <div>
                <p className="font-bold text-sm">Preflex Solutions Pvt. Ltd.</p>
                <p className="text-xs text-white/50">MindCheck Platform</p>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              A gate to personalized counselling &amp; mental wellness support for all ages.
            </p>
          </div>
          <div>
            <p className="font-semibold text-sm mb-3">Quick Links</p>
            <div className="space-y-2">
              {['Home','About','Features','Register','Sign In'].map(l => (
                <p key={l} className="text-white/50 text-sm hover:text-white transition-colors cursor-pointer">{l}</p>
              ))}
            </div>
          </div>
          <div>
            <p className="font-semibold text-sm mb-3">Contact</p>
            <p className="text-white/50 text-sm">Preflex Solutions Pvt. Ltd.</p>
            <a href="https://www.preflexsol.com" target="_blank" rel="noreferrer"
               className="text-green-400 text-sm hover:text-green-300 transition-colors">
              www.preflexsol.com
            </a>
          </div>
        </div>
        <div className="max-w-6xl mx-auto border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/40 text-xs">© 2025 Preflex Solutions Pvt. Ltd. All rights reserved.</p>
          <p className="text-white/40 text-xs">MindCheck — Mental Wellness Assessment Tool</p>
        </div>
      </footer>
    </div>
  )
}
