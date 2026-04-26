import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { QUESTIONS, ANSWER_OPTIONS, CATEGORIES, calculateResult } from '../data/questions'
import { useAuth } from '../context/AuthContext'

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
  const { user, logout, authHeader } = useAuth()
  const navigate = useNavigate()

  const categoryId = user?.category
  const category   = CATEGORIES.find((c) => c.id === categoryId)

  const [questions, setQuestions]           = useState(null)
  const [current, setCurrent]               = useState(0)
  const [answers, setAnswers]               = useState({})
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const [submitting, setSubmitting]         = useState(false)

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

  if (!categoryId || questions === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (questions.length === 0) return null

  const question       = questions[current]
  const totalQuestions = questions.length
  const progress       = ((current + 1) / totalQuestions) * 100
  const answeredCount  = Object.keys(answers).length
  const isLast         = current === totalQuestions - 1

  const prevPart      = current > 0 ? questions[current - 1].part : null
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4 py-8">
      {/* Header */}
      <header className="max-w-2xl mx-auto flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm">
            <span className="text-lg">🧠</span>
          </div>
          <div>
            <p className="font-semibold text-slate-800 text-sm leading-tight">MindCheck</p>
            <p className="text-xs text-slate-500">{category?.label} Assessment</p>
          </div>
        </div>
        <button
          onClick={() => { logout(); navigate('/login', { replace: true }) }}
          className="text-sm text-slate-400 hover:text-red-500 transition-colors"
        >
          Sign out
        </button>
      </header>

      <div className="max-w-2xl mx-auto">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-slate-500 mb-2">
            <span>Question {current + 1} of {totalQuestions}</span>
            <span>{answeredCount} answered</span>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Part label */}
        {showPartHeader && (
          <div className="mb-3">
            <span className="inline-block text-xs font-semibold text-blue-600 bg-blue-100 rounded-full px-3 py-1 tracking-wide uppercase">
              {question.part}
            </span>
          </div>
        )}

        {/* Question card */}
        <div className="card shadow-sm mb-4">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-3">
            Q{question.id}
          </p>
          <p className="text-slate-800 font-medium text-lg leading-relaxed mb-5">
            {question.text}
          </p>

          {/* Answer options */}
          <div className="space-y-3">
            {ANSWER_OPTIONS.map((opt) => {
              const selected = currentAnswer === opt.value
              return (
                <button
                  key={opt.value}
                  onClick={() => selectAnswer(opt.value)}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl border-2 text-left
                    transition-all duration-150 active:scale-[0.98]
                    ${selected
                      ? 'border-blue-500 bg-blue-50 text-blue-800'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50/50'
                    }`}
                >
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center
                      text-sm font-bold transition-colors
                      ${selected ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-500'}`}
                  >
                    {opt.value}
                  </span>
                  <span className="font-medium">{opt.label}</span>
                  {selected && (
                    <svg className="ml-auto w-5 h-5 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              )
            })}
          </div>

          {/* Indicator hint */}
          <div className="mt-5 flex items-start gap-2 text-xs text-slate-400">
            <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{question.indicator}</span>
          </div>
        </div>

        {/* Unanswered warning */}
        {submitAttempted && answeredCount < totalQuestions && (
          <div className="mb-4 bg-amber-50 border border-amber-200 text-amber-700 rounded-xl px-4 py-3 text-sm">
            Please answer all {totalQuestions} questions before submitting.
            You have {totalQuestions - answeredCount} unanswered.
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            disabled={current === 0}
            className="btn-secondary flex-1 disabled:opacity-40"
          >
            ← Previous
          </button>

          {isLast ? (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="btn-primary flex-1 disabled:opacity-60"
            >
              {submitting ? 'Submitting…' : 'Submit Assessment'}
            </button>
          ) : (
            <button onClick={handleNext} className="btn-primary flex-1">
              Next →
            </button>
          )}
        </div>

        {/* Jump to unanswered */}
        {submitAttempted && answeredCount < totalQuestions && (
          <div className="mt-4 flex flex-wrap gap-2">
            {questions.map((q, idx) =>
              !answers[q.id] ? (
                <button
                  key={q.id}
                  onClick={() => setCurrent(idx)}
                  className="text-xs px-3 py-1.5 bg-amber-100 text-amber-700 border border-amber-200 rounded-lg hover:bg-amber-200 transition-colors"
                >
                  Q{q.id}
                </button>
              ) : null
            )}
          </div>
        )}
      </div>
    </div>
  )
}
