import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { QUESTIONS, ANSWER_OPTIONS, CATEGORIES, calculateResult } from '../data/questions'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CircuitBackground from '../components/CircuitBackground'
import { bgStyle, glassCard } from '../styles/theme'

/* ── Detect emotion from question text — mirrors the pygame keyword approach ── */
function detectEmotion(text) {
  const t = (text || '').toLowerCase()
  const SAD      = ['sad','empty','flat','depressed','cry','lonely','down','grief','hopeless','worthless','burden','despair','isolat','withdrawn','emptiness','loss','tears','weep','nothing to look forward','low mood']
  const HAPPY    = ['happy','joy','excited','good','great','smile','hopeful','positive','energized','enjoy','celebrat','look forward','meaningful','purpose']
  const ANGRY    = ['angry','mad','furious','hate','frustrated','annoyed','irritab','resent','snapping','yelling','outburst','temper','cynical','contempt','rage','resentful']
  const SURPRISE = ['panic','dread','overwhelm','racing','shortness','dizzi','paralyz','afraid','fear','sudden','shock','wow','surprise','intense','physical']
  if (SAD.some(w => t.includes(w)))      return 'sad'
  if (HAPPY.some(w => t.includes(w)))    return 'happy'
  if (ANGRY.some(w => t.includes(w)))    return 'angry'
  if (SURPRISE.some(w => t.includes(w))) return 'surprised'
  return 'neutral'
}

/* ── Full teen character — matches pygame design exactly ─────────────────────── */
function EmotionFace({ emotion = 'neutral' }) {
  const isSad  = emotion === 'sad'
  const isHap  = emotion === 'happy'
  const isAng  = emotion === 'angry'
  const isSur  = emotion === 'surprised'
  const eyeR   = isSur ? 13 : 9

  return (
    <svg viewBox="0 40 140 210" fill="none" style={{ width: '100%', height: '100%' }}>

      {/* ── Hoodie body ── */}
      <ellipse cx="70" cy="225" rx="90" ry="90" fill="rgb(40,80,150)"/>
      <line x1="56" y1="174" x2="56" y2="214" stroke="rgb(200,200,200)" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="84" y1="174" x2="84" y2="214" stroke="rgb(200,200,200)" strokeWidth="2.5" strokeLinecap="round"/>

      {/* ── Neck ── */}
      <rect x="57" y="133" width="26" height="22" fill="rgb(255,218,185)" rx="3"/>

      {/* ── Head group (angry shake via animateTransform) ── */}
      <g>
        {isAng && <animateTransform attributeName="transform" additive="sum"
          type="translate" values="0,0;3,0;-3,0;3,0;-3,0;0,0" dur="0.35s" repeatCount="indefinite"/>}

        {/* Head */}
        <circle cx="70" cy="93" r="44" fill="rgb(255,218,185)"/>

        {/* Backward cap */}
        <path d="M 28 82 A 44 38 0 0 1 112 82 Z" fill="rgb(200,50,50)"/>
        <line x1="28" y1="82" x2="9" y2="100" stroke="rgb(200,50,50)" strokeWidth="6" strokeLinecap="round"/>

        {/* Freckles */}
        {[[50,105],[54,103],[46,101],[90,105],[86,103],[94,101]].map(([x,y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="2" fill="rgb(210,160,120)"/>
        ))}

        {/* ── Eyebrows ── */}
        {isSad && <>
          <line x1="23" y1="75" x2="53" y2="64" stroke="rgb(30,20,20)" strokeWidth="3.5" strokeLinecap="round"/>
          <line x1="87" y1="64" x2="117" y2="75" stroke="rgb(30,20,20)" strokeWidth="3.5" strokeLinecap="round"/>
        </>}
        {isAng && <>
          <line x1="23" y1="64" x2="53" y2="76" stroke="rgb(30,20,20)" strokeWidth="4.5" strokeLinecap="round"/>
          <line x1="87" y1="76" x2="117" y2="64" stroke="rgb(30,20,20)" strokeWidth="4.5" strokeLinecap="round"/>
        </>}
        {isSur && <>
          <path d="M 23 66 Q 38 50 53 66" stroke="rgb(30,20,20)" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
          <path d="M 87 66 Q 102 50 117 66" stroke="rgb(30,20,20)" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
        </>}
        {!isSad && !isAng && !isSur && <>
          <path d="M 23 68 Q 38 61 53 68" stroke="rgb(30,20,20)" strokeWidth="3" fill="none" strokeLinecap="round"/>
          <path d="M 87 68 Q 102 61 117 68" stroke="rgb(30,20,20)" strokeWidth="3" fill="none" strokeLinecap="round"/>
        </>}

        {/* ── Left eye (blinking) ── */}
        <g>
          <g><animate attributeName="opacity" values="1;1;1;1;0;1" dur="4s" repeatCount="indefinite"/>
            <circle cx="43" cy="87" r={eyeR} fill="rgb(30,20,20)"/>
            <circle cx="47" cy="83" r="3" fill="white" opacity="0.9"/>
          </g>
          <line x1="34" y1="87" x2="52" y2="87" stroke="rgb(30,20,20)" strokeWidth="3" strokeLinecap="round">
            <animate attributeName="opacity" values="0;0;0;0;1;0" dur="4s" repeatCount="indefinite"/>
          </line>
        </g>

        {/* ── Right eye (blinking, offset) ── */}
        <g>
          <g><animate attributeName="opacity" values="1;1;1;1;0;1" dur="4s" begin="0.15s" repeatCount="indefinite"/>
            <circle cx="97" cy="87" r={eyeR} fill="rgb(30,20,20)"/>
            <circle cx="101" cy="83" r="3" fill="white" opacity="0.9"/>
          </g>
          <line x1="88" y1="87" x2="106" y2="87" stroke="rgb(30,20,20)" strokeWidth="3" strokeLinecap="round">
            <animate attributeName="opacity" values="0;0;0;0;1;0" dur="4s" begin="0.15s" repeatCount="indefinite"/>
          </line>
        </g>

        {/* ── Mouth ── */}
        {isHap && <path d="M 43 116 A 27 20 0 0 0 97 116" stroke="rgb(100,40,40)" strokeWidth="4" fill="none" strokeLinecap="round"/>}
        {isSad && <path d="M 43 124 A 27 18 0 0 1 97 124" stroke="rgb(100,40,40)" strokeWidth="4" fill="none" strokeLinecap="round"/>}
        {isAng && <line x1="45" y1="120" x2="95" y2="120" stroke="rgb(100,40,40)" strokeWidth="4" strokeLinecap="round"/>}
        {isSur && <ellipse cx="70" cy="120" rx="10" ry="13" fill="rgb(100,40,40)" opacity="0.9"/>}
        {!isHap && !isSad && !isAng && !isSur &&
          <line x1="50" y1="119" x2="90" y2="119" stroke="rgb(100,40,40)" strokeWidth="3" strokeLinecap="round"/>}

        {/* ── Sad tears ── */}
        {isSad && <>
          <ellipse cx="31" cy="98" rx="3" ry="6" fill="rgb(100,150,255)" opacity="0.85">
            <animate attributeName="cy" from="98" to="130" dur="1.4s" repeatCount="indefinite"/>
            <animate attributeName="opacity" from="0.85" to="0" dur="1.4s" repeatCount="indefinite"/>
          </ellipse>
          <ellipse cx="109" cy="98" rx="3" ry="6" fill="rgb(100,150,255)" opacity="0.85">
            <animate attributeName="cy" from="98" to="130" dur="1.4s" begin="0.6s" repeatCount="indefinite"/>
            <animate attributeName="opacity" from="0.85" to="0" dur="1.4s" begin="0.6s" repeatCount="indefinite"/>
          </ellipse>
        </>}
      </g>
    </svg>
  )
}
EmotionFace.propTypes = { emotion: PropTypes.string }

function dbRowToQuestion(row) {
  return {
    id:             row.id,
    part:           row.part,
    text:           row.text,
    indicator:      row.indicator,
    reversed:       row.reversed,
    safetyQuestion: row.safety_question,
  }
}

export default function Questionnaire() {
  const { user, authHeader } = useAuth()
  const navigate = useNavigate()

  const categoryId = user?.category
  const category   = CATEGORIES.find((c) => c.id === categoryId)

  const [questions, setQuestions]             = useState(null)
  const [current, setCurrent]                 = useState(0)
  const [answers, setAnswers]                 = useState({})
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const [submitting, setSubmitting]           = useState(false)

  // Section selection (for institution users)
  const [section, setSection]               = useState('')
  const [sectionConfirmed, setSectionConfirmed] = useState(false)
  const [availSections, setAvailSections]   = useState(null) // null=loading, []=none
  const needsSection = !!(user?.institution) && user.institution !== 'none'

  useEffect(() => {
    if (!needsSection) { setAvailSections([]); return }
    fetch('/api/user/sections', { headers: authHeader() })
      .then(r => r.json())
      .then(d => setAvailSections(d.ok ? d.sections.map(s => s.name) : []))
      .catch(() => setAvailSections([]))
  }, [needsSection]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const safeCategory = CATEGORIES.find(c => c.id === categoryId)?.id
    if (!safeCategory) { navigate('/dashboard', { replace: true }); return }
    fetch(`/api/questions/${encodeURIComponent(safeCategory)}`, { headers: authHeader() })
      .then((r) => r.json())
      .then((data) => {
        const qs = data.ok && data.questions.length > 0
          ? data.questions.map(dbRowToQuestion)
          : (QUESTIONS[categoryId] ?? [])
        setQuestions(qs)
      })
      .catch(() => setQuestions(QUESTIONS[categoryId] ?? []))
  }, [categoryId]) // eslint-disable-line react-hooks/exhaustive-deps

  // Keyboard shortcuts: A/B/C/D or 1/2/3/4 = pick answer, Enter/→ = next, ← = prev
  useEffect(() => {
    if (!questions) return
    const q = questions[current]
    if (!q) return
    function onKey(e) {
      if (['INPUT','SELECT','TEXTAREA'].includes(e.target.tagName)) return
      const KEY_MAP = { A:'A', B:'B', C:'C', D:'D', '1':'A', '2':'B', '3':'C', '4':'D' }
      const pick = KEY_MAP[e.key.toUpperCase()]
      if (pick) { setAnswers(prev => ({ ...prev, [q.id]: pick })); return }
      const isNext = e.key === 'Enter' || e.key === 'ArrowRight'
      if (isNext && answers[q.id] && current < questions.length - 1) {
        setCurrent(c => c + 1)
      }
      if (e.key === 'ArrowLeft' && current > 0) setCurrent(c => c - 1)
    }
    globalThis.addEventListener('keydown', onKey)
    return () => globalThis.removeEventListener('keydown', onKey)
  }, [current, answers, questions]) // eslint-disable-line react-hooks/exhaustive-deps

  // Wait for sections to load before showing section picker
  if (!categoryId || questions === null || (needsSection && !sectionConfirmed && availSections === null)) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={bgStyle}>
        <div className="w-8 h-8 border-2 border-green-400 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (questions.length === 0) return null

  // If institution user but no sections configured, skip section picker
  if (needsSection && !sectionConfirmed && availSections?.length === 0) {
    setSectionConfirmed(true)
  }

  // ── Section picker screen ─────────────────────────────────────────────────
  if (needsSection && !sectionConfirmed && availSections?.length > 0) {
    return (
      <div className="min-h-screen relative overflow-hidden" style={bgStyle}>
        <CircuitBackground opacity={0.05} />
        <Navbar />
        <div className="relative z-10 max-w-lg mx-auto px-4 pt-28 pb-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
              style={{ background: 'rgba(74,222,128,0.15)', border: '1.5px solid rgba(74,222,128,0.3)' }}>
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
            </div>
            <h1 className="text-2xl font-extrabold text-white">Select Your Section</h1>
            <p className="text-white/50 text-sm mt-2">
              {user.institution} · Choose your class section before starting the assessment.
            </p>
          </div>

          <div className="rounded-2xl p-6"
            style={glassCard}>
            <label htmlFor="section-select" className="block text-sm font-medium text-white/70 mb-2">Your section</label>
            <select
              id="section-select"
              value={section}
              onChange={e => setSection(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && section) setSectionConfirmed(true) }}
              autoFocus
              className="w-full px-4 py-3 rounded-xl text-sm font-medium outline-none transition-all"
              style={{
                background: 'rgb(8,24,52)',
                border: `1.5px solid ${section ? 'rgba(74,222,128,0.6)' : 'rgba(255,255,255,0.15)'}`,
                color: 'white',
                colorScheme: 'dark',
              }}
            >
              <option value="">— choose your section —</option>
              {availSections.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            <button
              onClick={() => { if (section) setSectionConfirmed(true) }}
              disabled={!section}
              className="mt-4 w-full py-3 rounded-xl font-bold text-sm text-white transition-all hover:brightness-110 active:scale-95 disabled:opacity-40"
              style={{ background: 'linear-gradient(135deg,#22c55e,#0d9488)' }}
            >
              {section ? `Continue with ${section}` : 'Select a section to continue'}
            </button>
            <p className="text-center text-white/25 text-xs mt-2">Press Enter to confirm</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  // ── Assessment screen ──────────────────────────────────────────────────────
  const question       = questions[current]
  const totalQuestions = questions.length
  const progress       = ((current + 1) / totalQuestions) * 100
  const answeredCount  = Object.keys(answers).length
  const isLast         = current === totalQuestions - 1

  const prevPart       = current > 0 ? questions[current - 1].part : null
  const showPartHeader = question.part !== prevPart

  function selectAnswer(value) {
    setAnswers((prev) => ({ ...prev, [question.id]: value }))
  }

  function handleNext() {
    if (current < totalQuestions - 1) setCurrent((c) => c + 1)
  }

  function handlePrev() {
    if (current > 0) setCurrent((c) => c - 1)
  }

  async function handleSubmit() {
    setSubmitAttempted(true)
    if (answeredCount < totalQuestions) return

    const result = calculateResult(answers, categoryId, questions)
    setSubmitting(true)
    try {
      await fetch('/api/questionnaire/submit', {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category:      categoryId,
          categoryLabel: category?.label,
          answers,
          questions,
          score:       result.score,
          total:       result.total,
          level:       result.level,
          label:       result.label,
          action:      result.action,
          safety_flag: result.safetyFlag,
          section:     section || null,
        }),
      })
    } catch {
      // Navigate even if network fails
    } finally {
      setSubmitting(false)
    }

    navigate('/thankyou', { replace: true, state: { safetyFlag: result.safetyFlag } })
  }

  const currentAnswer = answers[question.id]

  return (
    <div className="min-h-screen relative overflow-hidden" style={bgStyle}>
      <CircuitBackground opacity={0.05} />

      <Navbar />

      <div className="relative z-10 max-w-2xl mx-auto px-4 pt-24 pb-12">
        {/* Section / category badge */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="text-xs font-semibold px-3 py-1 rounded-full"
            style={{ background: 'rgba(74,222,128,0.15)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.3)' }}>
            {category?.label} Assessment
          </span>
          {section && (
            <span className="text-xs font-semibold px-3 py-1 rounded-full"
              style={{ background: 'rgba(96,165,250,0.15)', color: '#93c5fd', border: '1px solid rgba(96,165,250,0.3)' }}>
              {section}
            </span>
          )}
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-white/45 mb-2">
            <span>Question {current + 1} of {totalQuestions}</span>
            <span>{answeredCount} answered</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%`, background: 'linear-gradient(90deg,#22c55e,#0d9488)' }}
            />
          </div>
        </div>

        {/* Part label */}
        {showPartHeader && (
          <div className="mb-3">
            <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide"
              style={{ background: 'rgba(74,222,128,0.12)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.25)' }}>
              {question.part}
            </span>
          </div>
        )}

        {/* Question card */}
        <div className="rounded-2xl p-6 mb-4"
          style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(16px)', border: '1.5px solid rgba(255,255,255,0.12)' }}>

          {/* Question number + text — full width */}
          <p className="text-xs font-medium text-white/30 uppercase tracking-widest mb-3">
            Q{question.id}
          </p>
          <p className="text-white font-medium text-lg leading-relaxed mb-5">
            {question.text}
          </p>

          {/* Answers beside the emotion face — face head starts at first option level */}
          <div className="flex gap-4 items-start">
            <div className="flex-1 min-w-0 space-y-2.5">
              {ANSWER_OPTIONS.map((opt) => {
                const selected = currentAnswer === opt.value
                return (
                  <button
                    key={opt.value}
                    onClick={() => selectAnswer(opt.value)}
                    className="w-full flex items-center gap-4 px-5 py-4 rounded-xl text-left transition-all duration-150 active:scale-[0.98]"
                    style={{
                      background: selected ? 'rgba(74,222,128,0.15)' : 'rgba(255,255,255,0.05)',
                      border: `2px solid ${selected ? 'rgba(74,222,128,0.6)' : 'rgba(255,255,255,0.1)'}`,
                    }}
                  >
                    <span
                      className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-colors"
                      style={{
                        background: selected ? 'rgba(74,222,128,0.8)' : 'rgba(255,255,255,0.08)',
                        color: selected ? '#0c1f3a' : 'rgba(255,255,255,0.5)',
                      }}
                    >
                      {opt.value}
                    </span>
                    <span className="font-medium" style={{ color: selected ? '#4ade80' : 'rgba(255,255,255,0.75)' }}>
                      {opt.label}
                    </span>
                    {selected && (
                      <svg className="ml-auto w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Emotion face — head starts at same level as first answer option */}
            <div className="flex-shrink-0 hidden sm:block" style={{ width: '130px' }}>
              <EmotionFace emotion={detectEmotion(question.text)} />
            </div>
          </div>

          {/* Indicator hint */}
          <div className="mt-5 flex items-start gap-2 text-xs text-white/30">
            <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{question.indicator}</span>
          </div>
        </div>

        {/* Unanswered warning */}
        {submitAttempted && answeredCount < totalQuestions && (
          <div className="mb-4 rounded-xl px-4 py-3 text-sm"
            style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.3)', color: '#fbbf24' }}>
            Please answer all {totalQuestions} questions before submitting.
            You have {totalQuestions - answeredCount} unanswered.
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            disabled={current === 0}
            className="flex-1 py-3 rounded-xl font-semibold text-sm transition-all disabled:opacity-30"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.7)' }}
          >
            ← Previous
          </button>

          {isLast ? (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="flex-1 py-3 rounded-xl font-bold text-sm text-white transition-all hover:brightness-110 active:scale-95 disabled:opacity-60"
              style={{ background: 'linear-gradient(135deg,#22c55e,#0d9488)' }}
            >
              {submitting ? 'Submitting…' : 'Submit Assessment'}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex-1 py-3 rounded-xl font-bold text-sm text-white transition-all hover:brightness-110 active:scale-95"
              style={{ background: 'linear-gradient(135deg,#22c55e,#0d9488)' }}
            >
              Next →
            </button>
          )}
        </div>

        {/* Jump to unanswered */}
        {submitAttempted && answeredCount < totalQuestions && (
          <div className="mt-4 flex flex-wrap gap-2">
            {questions
              .filter((q) => !answers[q.id])
              .map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => setCurrent(questions.indexOf(q))}
                  className="text-xs px-3 py-1.5 rounded-lg transition-colors"
                  style={{ background: 'rgba(251,191,36,0.15)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.3)' }}
                >
                  Q{q.id}
                </button>
              ))
            }
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
