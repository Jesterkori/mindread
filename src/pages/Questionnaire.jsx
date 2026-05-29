import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { QUESTIONS, ANSWER_OPTIONS, CATEGORIES, calculateResult } from '../data/questions'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'

/* ── Detect emotion from question text (based on keyword approach) ──────────── */
function detectEmotion(text) {
  const t = (text || '').toLowerCase()
  const SAD     = ['sad','empty','cry','crying','grief','lonel','hopeless','worthless','burden','despair','loss','isolat','depress','emptiness','low mood','nothing to look forward','flat','withdrawn','no one','tears','weep']
  const ANGRY   = ['angry','anger','frustrat','irritab','annoy','furious','resent','snapping','yelling','outburst','temper','cynical','contempt','rage','hate']
  const ANXIOUS = ['worry','worrying','worried','anxious','anxiety','panic','dread','overwhelm','afraid','fear','racing heart','racing mind','shortness','dizzi','paralyz','catastroph','scared','heart']
  if (SAD.some(w => t.includes(w)))     return 'sad'
  if (ANGRY.some(w => t.includes(w)))   return 'angry'
  if (ANXIOUS.some(w => t.includes(w))) return 'anxious'
  return 'neutral'
}

/* ── Animated emotion face — large, right side of question, no labels ────────── */
function EmotionFace({ emotion }) {
  const isSad     = emotion === 'sad'
  const isAngry   = emotion === 'angry'
  const isAnxious = emotion === 'anxious'

  const browL = isSad    ? [27,37,47,29]
              : isAngry  ? [27,29,47,39]
              : isAnxious? [27,27,47,33]
              :             [27,32,47,32]
  const browR = isSad    ? [63,29,83,37]
              : isAngry  ? [63,39,83,29]
              : isAnxious? [63,33,83,27]
              :             [63,32,83,32]

  const eyeRy = isAnxious ? 12 : isAngry ? 6 : 9
  const mouth = isSad    ? 'M 40 77 Q 55 66 70 77'
              : isAngry  ? 'M 40 73 L 70 73'
              : isAnxious? 'M 46 72 Q 55 78 64 72'
              :              'M 40 70 Q 55 78 70 70'
  const browW = isAngry ? 5 : 3.5

  return (
    <svg width="110" height="115" viewBox="0 0 110 115" fill="none">
      <g>
        {isAngry && (
          <animateTransform attributeName="transform" additive="sum"
            type="translate" values="0,0;3,0;-3,0;3,0;-3,0;0,0"
            dur="0.35s" repeatCount="indefinite"/>
        )}

        {/* Head */}
        <circle cx="55" cy="55" r="44" fill="rgba(255,220,190,0.95)"
                stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>

        {/* Eyebrows */}
        <line x1={browL[0]} y1={browL[1]} x2={browL[2]} y2={browL[3]}
              stroke="#444" strokeWidth={browW} strokeLinecap="round"/>
        <line x1={browR[0]} y1={browR[1]} x2={browR[2]} y2={browR[3]}
              stroke="#444" strokeWidth={browW} strokeLinecap="round"/>

        {/* Left eye — blinking */}
        <ellipse cx="38" cy="55" rx="9" ry={eyeRy} fill="#1a1a2e">
          <animate attributeName="ry"
            values={`${eyeRy};${eyeRy};${eyeRy};${eyeRy};0.5;${eyeRy}`}
            dur="4s" repeatCount="indefinite"/>
        </ellipse>
        <circle cx="41" cy="51" r="3" fill="white" opacity="0.9"/>

        {/* Right eye — blinking (offset) */}
        <ellipse cx="72" cy="55" rx="9" ry={eyeRy} fill="#1a1a2e">
          <animate attributeName="ry"
            values={`${eyeRy};${eyeRy};${eyeRy};${eyeRy};0.5;${eyeRy}`}
            dur="4s" begin="0.15s" repeatCount="indefinite"/>
        </ellipse>
        <circle cx="75" cy="51" r="3" fill="white" opacity="0.9"/>

        {/* Mouth */}
        <path d={mouth} stroke="#b06060" strokeWidth="3.5" fill="none" strokeLinecap="round"/>

        {/* Sad — falling tears */}
        {isSad && <>
          <ellipse cx="26" cy="65" rx="3.5" ry="7" fill="#93c5fd" opacity="0.85">
            <animate attributeName="cy" from="65" to="92" dur="1.4s" repeatCount="indefinite"/>
            <animate attributeName="opacity" from="0.85" to="0" dur="1.4s" repeatCount="indefinite"/>
          </ellipse>
          <ellipse cx="84" cy="65" rx="3.5" ry="7" fill="#93c5fd" opacity="0.85">
            <animate attributeName="cy" from="65" to="92" dur="1.4s" begin="0.6s" repeatCount="indefinite"/>
            <animate attributeName="opacity" from="0.85" to="0" dur="1.4s" begin="0.6s" repeatCount="indefinite"/>
          </ellipse>
        </>}

        {/* Anxious — sweat drop on forehead */}
        {isAnxious && (
          <ellipse cx="88" cy="36" rx="4" ry="8" fill="#bfdbfe" opacity="0.8">
            <animate attributeName="cy" from="36" to="54" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" from="0.8" to="0" dur="2s" repeatCount="indefinite"/>
          </ellipse>
        )}
      </g>
    </svg>
  )
}

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

const bgStyle = { background: 'linear-gradient(135deg, #0c1f3a 0%, #0d3556 40%, #0b4a52 70%, #0a5c5c 100%)' }

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
    if (!categoryId) { navigate('/dashboard', { replace: true }); return }
    fetch(`/api/questions/${categoryId}`, { headers: authHeader() })
      .then((r) => r.json())
      .then((data) => {
        const qs = data.ok && data.questions.length > 0
          ? data.questions.map(dbRowToQuestion)
          : (QUESTIONS[categoryId] ?? [])
        setQuestions(qs)
      })
      .catch(() => setQuestions(QUESTIONS[categoryId] ?? []))
  }, [categoryId]) // eslint-disable-line react-hooks/exhaustive-deps

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
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.05, pointerEvents: 'none' }}>
          <defs>
            <pattern id="circ-q" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <path d="M15 60 H45 M45 60 V25 M45 25 H80 M80 25 V60 M80 60 H105" stroke="#4ade80" strokeWidth="1" fill="none"/>
              <circle cx="45" cy="60" r="3" fill="#4ade80"/><circle cx="80" cy="25" r="3" fill="#4ade80"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circ-q)"/>
        </svg>
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
            style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(16px)', border: '1.5px solid rgba(255,255,255,0.12)' }}>
            <p className="text-sm font-medium text-white/70 mb-3">Your section</p>
            <div className="grid grid-cols-2 gap-2 max-h-72 overflow-y-auto pr-1">
              {availSections.map((s) => {
                const sel = section === s
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSection(s)}
                    className="px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-all"
                    style={{
                      background: sel ? 'rgba(74,222,128,0.2)' : 'rgba(255,255,255,0.05)',
                      border: `1.5px solid ${sel ? 'rgba(74,222,128,0.7)' : 'rgba(255,255,255,0.1)'}`,
                      color: sel ? '#4ade80' : 'rgba(255,255,255,0.7)',
                    }}
                  >
                    {s}
                  </button>
                )
              })}
            </div>

            <button
              onClick={() => { if (section) setSectionConfirmed(true) }}
              disabled={!section}
              className="mt-5 w-full py-3 rounded-xl font-bold text-sm text-white transition-all hover:brightness-110 active:scale-95 disabled:opacity-40"
              style={{ background: 'linear-gradient(135deg,#22c55e,#0d9488)' }}
            >
              {section ? `Continue with ${section}` : 'Select a section to continue'}
            </button>
          </div>
        </div>
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
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.05, pointerEvents: 'none' }}>
        <defs>
          <pattern id="circ-qa" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
            <path d="M15 60 H45 M45 60 V25 M45 25 H80 M80 25 V60 M80 60 H105" stroke="#4ade80" strokeWidth="1" fill="none"/>
            <circle cx="45" cy="60" r="3" fill="#4ade80"/><circle cx="80" cy="25" r="3" fill="#4ade80"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circ-qa)"/>
      </svg>

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
          <div className="flex gap-4 items-start">

            {/* Left: question text + answers + indicator */}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white/30 uppercase tracking-widest mb-3">
                Q{question.id}
              </p>
              <p className="text-white font-medium text-lg leading-relaxed mb-5">
                {question.text}
              </p>

              {/* Answer options */}
              <div className="space-y-2.5">
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

              {/* Indicator hint */}
              <div className="mt-5 flex items-start gap-2 text-xs text-white/30">
                <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{question.indicator}</span>
              </div>
            </div>

            {/* Right: emotion face — large, driven by question content */}
            <div className="flex-shrink-0 hidden sm:flex items-center pt-6">
              <EmotionFace emotion={detectEmotion(question.text)} />
            </div>

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
    </div>
  )
}
