import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { CATEGORIES, QUESTIONS } from '../data/questions'

function categoryLabel(id) {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id
}

function fmt(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  })
}

const EMPTY_Q = { part: '', text: '', indicator: '', reversed: false, safety_question: false }

export default function AdminDashboard() {
  const { logout, authHeader } = useAuth()
  const navigate = useNavigate()

  const [tab, setTab]                   = useState('pending')
  const [pendingUsers, setPendingUsers] = useState([])
  const [submissions, setSubmissions]   = useState([])
  const [stats, setStats]               = useState(null)
  const [expanded, setExpanded]         = useState(null)
  const [notes, setNotes]               = useState({})
  const [editedAnalysis, setEditedAnalysis]       = useState({})
  const [editedAdminAction, setEditedAdminAction] = useState({})
  const [declineReason, setDeclineReason]         = useState({})
  const [busy, setBusy]                 = useState({})
  const [loading, setLoading]           = useState(true)
  const [editingReleased, setEditingReleased] = useState(null)
  const [categoryQs, setCategoryQs]     = useState({})

  // Questions tab state
  const [qCategory, setQCategory]     = useState(CATEGORIES[0]?.id ?? '')
  const [questions, setQuestions]     = useState([])
  const [qLoading, setQLoading]       = useState(false)
  const [editingId, setEditingId]     = useState(null)
  const [editForm, setEditForm]       = useState(EMPTY_Q)
  const [addForm, setAddForm]         = useState({ ...EMPTY_Q })
  const [showAdd, setShowAdd]         = useState(false)
  const [qBusy, setQBusy]             = useState({})

  const headers = { ...authHeader(), 'Content-Type': 'application/json' }

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const [pRes, sRes, stRes] = await Promise.all([
        fetch('/api/admin/pending-users',  { headers: authHeader() }),
        fetch('/api/admin/submissions',    { headers: authHeader() }),
        fetch('/api/admin/stats',          { headers: authHeader() }),
      ])
      const [pData, sData, stData] = await Promise.all([pRes.json(), sRes.json(), stRes.json()])
      if (pData.ok)  setPendingUsers(pData.users)
      if (sData.ok)  setSubmissions(sData.submissions)
      if (stData.ok) setStats(stData)
    } finally {
      setLoading(false)
    }
  // authHeader is stable
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => { load() }, [load])

  async function approveUser(id) {
    setBusy((b) => ({ ...b, [`approve-${id}`]: true }))
    await fetch(`/api/admin/approve-user/${id}`, { method: 'POST', headers })
    setBusy((b) => ({ ...b, [`approve-${id}`]: false }))
    load()
  }

  async function declineUser(id) {
    setBusy((b) => ({ ...b, [`decline-${id}`]: true }))
    await fetch(`/api/admin/decline-user/${id}`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ reason: declineReason[id] || '' }),
    })
    setBusy((b) => ({ ...b, [`decline-${id}`]: false }))
    load()
  }

  async function releaseResult(id) {
    setBusy((b) => ({ ...b, [`release-${id}`]: true }))
    await fetch(`/api/admin/release-result/${id}`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        adminNotes:  notes[id] || '',
        aiAnalysis:  editedAnalysis[id] ?? null,
        adminAction: editedAdminAction[id] ?? null,
      }),
    })
    setBusy((b) => ({ ...b, [`release-${id}`]: false }))
    load()
  }

  async function editResult(id) {
    setBusy((b) => ({ ...b, [`edit-${id}`]: true }))
    await fetch(`/api/admin/edit-result/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        adminNotes:  notes[id] ?? null,
        aiAnalysis:  editedAnalysis[id] ?? null,
        adminAction: editedAdminAction[id] ?? null,
      }),
    })
    setBusy((b) => ({ ...b, [`edit-${id}`]: false }))
    setEditingReleased(null)
    load()
  }

  async function deleteUser(id) {
    if (!confirm('Delete this user and all their submissions? This cannot be undone.')) return
    setBusy((b) => ({ ...b, [`del-user-${id}`]: true }))
    await fetch(`/api/admin/users/${id}`, { method: 'DELETE', headers })
    setBusy((b) => ({ ...b, [`del-user-${id}`]: false }))
    load()
  }

  async function wipePending() {
    if (!confirm('Delete ALL pending / unverified test users? This cannot be undone.')) return
    setBusy((b) => ({ ...b, wipe: true }))
    const res = await fetch('/api/admin/wipe-pending', { method: 'DELETE', headers })
    const data = await res.json()
    setBusy((b) => ({ ...b, wipe: false }))
    alert(`Deleted ${data.deleted} user(s).`)
    load()
  }

  async function loadCategoryQs(category) {
    if (categoryQs[category]) return
    const res  = await fetch(`/api/admin/questions?category=${category}`, { headers: authHeader() })
    const data = await res.json()
    if (data.ok) {
      const byId = {}
      data.questions.forEach((q) => { byId[q.id] = q })
      setCategoryQs((prev) => ({ ...prev, [category]: byId }))
    }
  }

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  // Get question by DB id — uses live questions loaded from API, falls back to static data
  function getQuestion(category, qId) {
    const fromApi = categoryQs[category]?.[Number(qId)]
    if (fromApi) return { text: fromApi.text, safetyQuestion: fromApi.safety_question }
    const qs = QUESTIONS[category] || []
    return qs.find((q) => q.id === Number(qId))
  }

  // ── Questions tab helpers ─────────────────────────────────────────────────
  async function loadQuestions(catId) {
    setQLoading(true)
    try {
      const res  = await fetch(`/api/admin/questions?category=${catId}`, { headers: authHeader() })
      const data = await res.json()
      setQuestions(data.ok ? data.questions : [])
    } finally {
      setQLoading(false)
    }
  }

  useEffect(() => {
    if (tab === 'questions') loadQuestions(qCategory)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, qCategory])

  async function seedCategory() {
    if (!confirm(`Reset all "${categoryLabel(qCategory)}" questions to defaults? This cannot be undone.`)) return
    setQBusy((b) => ({ ...b, seed: true }))
    await fetch('/api/admin/questions/seed', { method: 'POST', headers, body: JSON.stringify({ category: qCategory }) })
    setQBusy((b) => ({ ...b, seed: false }))
    loadQuestions(qCategory)
  }

  async function saveEdit(id) {
    setQBusy((b) => ({ ...b, [`save-${id}`]: true }))
    await fetch(`/api/admin/questions/${id}`, { method: 'PUT', headers, body: JSON.stringify(editForm) })
    setQBusy((b) => ({ ...b, [`save-${id}`]: false }))
    setEditingId(null)
    loadQuestions(qCategory)
  }

  async function deleteQuestion(id) {
    if (!confirm('Delete this question?')) return
    setQBusy((b) => ({ ...b, [`del-${id}`]: true }))
    await fetch(`/api/admin/questions/${id}`, { method: 'DELETE', headers })
    setQBusy((b) => ({ ...b, [`del-${id}`]: false }))
    loadQuestions(qCategory)
  }

  async function addQuestion() {
    if (!addForm.part || !addForm.text || !addForm.indicator) return
    setQBusy((b) => ({ ...b, add: true }))
    await fetch('/api/admin/questions', {
      method: 'POST',
      headers,
      body: JSON.stringify({ ...addForm, category_id: qCategory }),
    })
    setQBusy((b) => ({ ...b, add: false }))
    setAddForm({ ...EMPTY_Q })
    setShowAdd(false)
    loadQuestions(qCategory)
  }

  const answerLabel = { A: 'Rarely/Never', B: 'Sometimes', C: 'Often', D: 'Almost Always' }

  const pending  = submissions
    .filter((s) => !s.result_released)
    .sort((a, b) => (b.safety_flag - a.safety_flag) || (new Date(b.submitted_at) - new Date(a.submitted_at)))
  const reviewed = submissions
    .filter((s) => s.result_released)
    .sort((a, b) => new Date(b.released_at) - new Date(a.released_at))

  function renderCard(s) {
    const isOpen = expanded === s.id
    const isSafe = s.safety_flag
    return (
      <div
        key={s.id}
        className={`rounded-2xl border-2 p-4 bg-white transition-all
          ${isSafe && !s.result_released ? 'border-red-300' : 'border-slate-200'}`}
      >
        {/* Row summary */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="font-semibold text-slate-800">{s.user_name}</p>
              {isSafe && (
                <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">
                  ⚠️ Safety Flag
                </span>
              )}
              {s.result_released && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                  Released
                </span>
              )}
            </div>
            <p className="text-sm text-slate-500">{s.user_email}</p>
            <p className="text-xs text-slate-400 mt-0.5">
              {categoryLabel(s.category)} &middot; {s.label} ({s.score}/{s.total}) &middot; {fmt(s.submitted_at)}
            </p>
          </div>
          <button
            onClick={() => {
              setExpanded(isOpen ? null : s.id)
              if (!isOpen) {
                if (editedAnalysis[s.id] === undefined)
                  setEditedAnalysis((a) => ({ ...a, [s.id]: s.ai_analysis ?? '' }))
                if (editedAdminAction[s.id] === undefined)
                  setEditedAdminAction((a) => ({ ...a, [s.id]: s.admin_action ?? '' }))
                if (notes[s.id] === undefined)
                  setNotes((n) => ({ ...n, [s.id]: s.admin_notes ?? '' }))
                loadCategoryQs(s.category)
              }
            }}
            className="text-sm text-blue-600 hover:underline shrink-0"
          >
            {isOpen ? 'Collapse' : 'View & Review'}
          </button>
        </div>

        {/* Expanded detail */}
        {isOpen && (
          <div className="mt-4 pt-4 border-t border-slate-200 space-y-5">

            {/* Answers */}
            <div>
              <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">Test Answers</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-72 overflow-y-auto pr-1">
                {Object.entries(s.answers).map(([qId, answer]) => {
                  const q = getQuestion(s.category, qId)
                  const isRisk = (answer === 'C' || answer === 'D') && q?.safetyQuestion
                  return (
                    <div
                      key={qId}
                      className={`rounded-xl p-2.5 text-xs border
                        ${isRisk ? 'border-red-200 bg-red-50' : 'border-slate-100 bg-slate-50'}`}
                    >
                      <p className="text-slate-500 mb-1 leading-snug">{q ? q.text : `Question ${qId}`}</p>
                      <p className={`font-semibold ${isRisk ? 'text-red-700' : 'text-slate-800'}`}>
                        {answer} — {answerLabel[answer]}{isRisk && ' ⚠️'}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* PDF result */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">PDF Result</p>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full
                  ${s.level === 'healthy' ? 'bg-green-100 text-green-700' :
                    s.level === 'high'    ? 'bg-red-100 text-red-700' :
                                            'bg-amber-100 text-amber-700'}`}>
                  {s.label}
                </span>
                <span className="text-xs text-slate-400">{s.score}/{s.total * 4}</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-600 leading-relaxed select-text">
                {s.action || <span className="text-slate-400 italic">No PDF result generated.</span>}
              </div>
            </div>

            {/* Admin Answer */}
            {!s.result_released && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                    Admin Answer <span className="text-slate-400 font-normal normal-case">(shown to user)</span>
                  </p>
                  {s.action && (
                    <button
                      type="button"
                      onClick={() => setEditedAdminAction((a) => ({ ...a, [s.id]: s.action }))}
                      className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 hover:bg-blue-100 hover:text-blue-700 transition-colors"
                    >
                      ↑ Copy from PDF
                    </button>
                  )}
                </div>
                <textarea
                  rows={3}
                  value={editedAdminAction[s.id] ?? ''}
                  onChange={(e) => setEditedAdminAction((a) => ({ ...a, [s.id]: e.target.value }))}
                  placeholder="Type the result to show the user, or copy from PDF above…"
                  className="input-field text-sm resize-y"
                />
              </div>
            )}
            {s.result_released && s.admin_action && editingReleased !== s.id && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                  Admin Answer <span className="text-slate-400 font-normal normal-case">(released to user)</span>
                </p>
                <div className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-600 leading-relaxed">
                  {s.admin_action}
                </div>
              </div>
            )}

            {/* AI Assessment */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">AI Assessment</p>
                {!s.ai_analysis && !s.result_released && (
                  <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">Still generating…</span>
                )}
              </div>
              <textarea
                rows={6}
                value={editedAnalysis[s.id] ?? s.ai_analysis ?? ''}
                onChange={(e) => setEditedAnalysis((a) => ({ ...a, [s.id]: e.target.value }))}
                placeholder="AI analysis will appear here once generated. You can also write or edit it manually."
                disabled={s.result_released && editingReleased !== s.id}
                className="input-field text-sm resize-y disabled:bg-slate-50 disabled:text-slate-500"
              />
            </div>

            {/* Release / Edit actions */}
            {!s.result_released ? (
              <div className="space-y-2 pt-1 border-t border-slate-100">
                <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                  Personal note to user (optional)
                </p>
                <textarea
                  rows={2}
                  value={notes[s.id] || ''}
                  onChange={(e) => setNotes((n) => ({ ...n, [s.id]: e.target.value }))}
                  placeholder="e.g. We recommend speaking with a counsellor…"
                  className="input-field text-sm resize-none"
                />
                <button
                  onClick={() => releaseResult(s.id)}
                  disabled={busy[`release-${s.id}`]}
                  className="btn-primary disabled:opacity-50"
                >
                  {busy[`release-${s.id}`] ? 'Releasing…' : 'Release Result to User'}
                </button>
              </div>
            ) : editingReleased === s.id ? (
              <div className="space-y-3 pt-1 border-t border-slate-100">
                <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide">Editing Released Result</p>
                <div className="space-y-1">
                  <p className="text-xs text-slate-500">Admin Answer (shown to user)</p>
                  <textarea
                    rows={3}
                    value={editedAdminAction[s.id] ?? ''}
                    onChange={(e) => setEditedAdminAction((a) => ({ ...a, [s.id]: e.target.value }))}
                    className="input-field text-sm resize-y"
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-slate-500">Personal note to user</p>
                  <textarea
                    rows={2}
                    value={notes[s.id] || ''}
                    onChange={(e) => setNotes((n) => ({ ...n, [s.id]: e.target.value }))}
                    className="input-field text-sm resize-none"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => editResult(s.id)}
                    disabled={busy[`edit-${s.id}`]}
                    className="btn-primary flex-1 disabled:opacity-50"
                  >
                    {busy[`edit-${s.id}`] ? 'Saving…' : 'Save Changes'}
                  </button>
                  <button onClick={() => setEditingReleased(null)} className="btn-secondary flex-1">Cancel</button>
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold text-slate-600">Released {fmt(s.released_at)}</p>
                  {s.admin_notes && <p className="text-sm text-slate-700 mt-1">{s.admin_notes}</p>}
                </div>
                <button
                  onClick={() => setEditingReleased(s.id)}
                  className="text-xs px-3 py-1.5 rounded-lg bg-amber-100 text-amber-700 hover:bg-amber-200 transition-colors shrink-0"
                >
                  Edit Result
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-lg">🧠</span>
            </div>
            <div>
              <p className="font-semibold text-slate-800 leading-none">MindCheck</p>
              <p className="text-xs text-slate-500 mt-0.5">Admin Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={wipePending}
              disabled={busy.wipe}
              className="text-xs px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 font-medium transition-colors disabled:opacity-50"
            >
              {busy.wipe ? 'Wiping…' : '🗑 Wipe test users'}
            </button>
            <button onClick={handleLogout} className="text-sm text-slate-500 hover:text-red-500 transition-colors">
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-3 gap-4">
            <div className="card shadow-sm text-center py-4">
              <p className="text-3xl font-bold text-blue-600">{stats.pendingUsers}</p>
              <p className="text-xs text-slate-500 mt-1">Pending Approvals</p>
            </div>
            <div className="card shadow-sm text-center py-4">
              <p className="text-3xl font-bold text-slate-700">{stats.totalSubmissions}</p>
              <p className="text-xs text-slate-500 mt-1">Total Assessments</p>
            </div>
            <div className={`card shadow-sm text-center py-4 ${stats.unreviewedSafetyFlags > 0 ? 'border-red-300 bg-red-50' : ''}`}>
              <p className={`text-3xl font-bold ${stats.unreviewedSafetyFlags > 0 ? 'text-red-600' : 'text-slate-700'}`}>
                {stats.unreviewedSafetyFlags}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {stats.unreviewedSafetyFlags > 0 ? '⚠️ Urgent Safety Flags' : 'Safety Flags (unreviewed)'}
              </p>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 bg-slate-100 rounded-xl p-1 w-fit flex-wrap">
          {[
            { key: 'pending',     label: `Pending Approvals${pendingUsers.length > 0 ? ` (${pendingUsers.length})` : ''}` },
            { key: 'submissions', label: `Assessments${submissions.length > 0 ? ` (${submissions.length})` : ''}` },
            { key: 'questions',   label: 'Questions' },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
                ${tab === t.key ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-800'}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {loading && (
          <div className="card shadow-sm text-center py-10 text-slate-400">Loading…</div>
        )}

        {/* ── Pending Users Tab ─────────────────────────────────────────────── */}
        {!loading && tab === 'pending' && (
          <>
            {pendingUsers.length === 0 ? (
              <div className="card shadow-sm text-center py-10">
                <p className="text-3xl mb-2">✅</p>
                <p className="text-slate-600 font-medium">No pending registrations</p>
              </div>
            ) : (
              <div className="space-y-3">
                {pendingUsers.map((u) => (
                  <div key={u.id} className="card shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-semibold text-slate-800">{u.name}</p>
                          {!u.email_verified && (
                            <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">
                              Email not verified
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-slate-500">{u.email}</p>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {categoryLabel(u.category)} &middot; Registered {fmt(u.created_at)}
                        </p>
                      </div>

                      {/* Decline reason input */}
                      <div className="flex flex-col sm:flex-row gap-2 shrink-0">
                        <input
                          type="text"
                          placeholder="Decline reason (optional)"
                          value={declineReason[u.id] || ''}
                          onChange={(e) => setDeclineReason((d) => ({ ...d, [u.id]: e.target.value }))}
                          className="input-field text-sm py-1.5 w-48"
                        />
                        <button
                          onClick={() => approveUser(u.id)}
                          disabled={busy[`approve-${u.id}`]}
                          className="px-4 py-1.5 rounded-xl bg-green-600 text-white text-sm font-medium hover:bg-green-700 disabled:opacity-50 transition-colors"
                        >
                          {busy[`approve-${u.id}`] ? 'Approving…' : 'Approve'}
                        </button>
                        <button
                          onClick={() => declineUser(u.id)}
                          disabled={busy[`decline-${u.id}`]}
                          className="px-4 py-1.5 rounded-xl bg-red-100 text-red-700 text-sm font-medium hover:bg-red-200 disabled:opacity-50 transition-colors"
                        >
                          {busy[`decline-${u.id}`] ? 'Declining…' : 'Decline'}
                        </button>
                        <button
                          onClick={() => deleteUser(u.id)}
                          disabled={busy[`del-user-${u.id}`]}
                          className="px-4 py-1.5 rounded-xl bg-slate-100 text-slate-500 text-sm font-medium hover:bg-red-100 hover:text-red-600 disabled:opacity-50 transition-colors"
                        >
                          {busy[`del-user-${u.id}`] ? 'Deleting…' : 'Delete'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ── Submissions Tab ───────────────────────────────────────────────── */}
        {!loading && tab === 'submissions' && (
          <>
            {submissions.length === 0 ? (
              <div className="card shadow-sm text-center py-10">
                <p className="text-3xl mb-2">📋</p>
                <p className="text-slate-600 font-medium">No submissions yet</p>
              </div>
            ) : (
              <>
                {/* Needs Review */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <p className="font-semibold text-slate-800">Needs Review</p>
                    {pending.length > 0 && (
                      <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${pending.some((s) => s.safety_flag) ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                        {pending.length}
                      </span>
                    )}
                  </div>
                  {pending.length === 0 ? (
                    <div className="card shadow-sm text-center py-6 text-sm text-slate-400">All assessments reviewed</div>
                  ) : (
                    <div className="space-y-3">{pending.map(renderCard)}</div>
                  )}
                </div>

                {/* Reviewed */}
                {reviewed.length > 0 && (
                  <div className="pt-4 border-t-2 border-slate-200">
                    <div className="flex items-center gap-2 mb-3">
                      <p className="font-semibold text-slate-800">Reviewed</p>
                      <span className="text-xs bg-green-100 text-green-700 px-2.5 py-0.5 rounded-full font-medium">
                        {reviewed.length}
                      </span>
                    </div>
                    <div className="space-y-3">{reviewed.map(renderCard)}</div>
                  </div>
                )}
              </>
            )}
          </>
        )}
        {/* ── Questions Tab ─────────────────────────────────────────────────── */}
        {tab === 'questions' && (
          <div className="space-y-4">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-3">
              <select
                value={qCategory}
                onChange={(e) => { setQCategory(e.target.value); setEditingId(null); setShowAdd(false) }}
                className="input-field py-2 text-sm w-56"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
              <button
                onClick={seedCategory}
                disabled={qBusy.seed}
                className="px-4 py-2 rounded-xl bg-amber-100 text-amber-800 text-sm font-medium hover:bg-amber-200 disabled:opacity-50 transition-colors"
              >
                {qBusy.seed ? 'Loading…' : 'Reset to Defaults'}
              </button>
              <button
                onClick={() => { setShowAdd((v) => !v); setEditingId(null) }}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors ml-auto"
              >
                {showAdd ? 'Cancel' : '+ Add Question'}
              </button>
            </div>

            {/* Add form */}
            {showAdd && (
              <div className="card shadow-sm space-y-3 border-2 border-blue-200">
                <p className="text-sm font-semibold text-blue-700">New Question</p>
                <input className="input-field text-sm" placeholder="Part / Section (e.g. Part 1: Mood and Emotions)" value={addForm.part} onChange={(e) => setAddForm((f) => ({ ...f, part: e.target.value }))} />
                <textarea className="input-field text-sm resize-none" rows={2} placeholder="Question text" value={addForm.text} onChange={(e) => setAddForm((f) => ({ ...f, text: e.target.value }))} />
                <textarea className="input-field text-sm resize-none" rows={2} placeholder="Indicator / explanation" value={addForm.indicator} onChange={(e) => setAddForm((f) => ({ ...f, indicator: e.target.value }))} />
                <div className="flex items-center gap-6 text-sm text-slate-600">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={addForm.reversed} onChange={(e) => setAddForm((f) => ({ ...f, reversed: e.target.checked }))} className="w-4 h-4 accent-blue-600" />
                    Reversed scoring
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={addForm.safety_question} onChange={(e) => setAddForm((f) => ({ ...f, safety_question: e.target.checked }))} className="w-4 h-4 accent-red-500" />
                    Safety question
                  </label>
                </div>
                <button onClick={addQuestion} disabled={qBusy.add} className="btn-primary disabled:opacity-50 w-full">
                  {qBusy.add ? 'Adding…' : 'Add Question'}
                </button>
              </div>
            )}

            {/* Question list */}
            {qLoading ? (
              <div className="card text-center py-8 text-slate-400">Loading questions…</div>
            ) : questions.length === 0 ? (
              <div className="card text-center py-10">
                <p className="text-slate-500">No questions found. Use "Reset to Defaults" to load the default set.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {questions.map((q) => (
                  <div key={q.id} className="card shadow-sm">
                    {editingId === q.id ? (
                      <div className="space-y-3">
                        <input className="input-field text-sm" placeholder="Part / Section" value={editForm.part} onChange={(e) => setEditForm((f) => ({ ...f, part: e.target.value }))} />
                        <textarea className="input-field text-sm resize-none" rows={2} placeholder="Question text" value={editForm.text} onChange={(e) => setEditForm((f) => ({ ...f, text: e.target.value }))} />
                        <textarea className="input-field text-sm resize-none" rows={2} placeholder="Indicator" value={editForm.indicator} onChange={(e) => setEditForm((f) => ({ ...f, indicator: e.target.value }))} />
                        <div className="flex items-center gap-6 text-sm text-slate-600">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" checked={editForm.reversed} onChange={(e) => setEditForm((f) => ({ ...f, reversed: e.target.checked }))} className="w-4 h-4 accent-blue-600" />
                            Reversed scoring
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" checked={editForm.safety_question} onChange={(e) => setEditForm((f) => ({ ...f, safety_question: e.target.checked }))} className="w-4 h-4 accent-red-500" />
                            Safety question
                          </label>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => saveEdit(q.id)} disabled={qBusy[`save-${q.id}`]} className="btn-primary flex-1 disabled:opacity-50">
                            {qBusy[`save-${q.id}`] ? 'Saving…' : 'Save'}
                          </button>
                          <button onClick={() => setEditingId(null)} className="btn-secondary flex-1">Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start gap-3">
                        <span className="shrink-0 w-7 h-7 rounded-lg bg-slate-100 text-slate-500 text-xs font-bold flex items-center justify-center mt-0.5">
                          {q.sort_order}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-slate-400 mb-0.5">{q.part}</p>
                          <p className="text-sm text-slate-800 font-medium leading-snug">{q.text}</p>
                          <p className="text-xs text-slate-400 mt-1 leading-snug">{q.indicator}</p>
                          <div className="flex gap-2 mt-1.5 flex-wrap">
                            {q.reversed && <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">Reversed</span>}
                            {q.safety_question && <span className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full">⚠️ Safety</span>}
                            {!q.active && <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">Inactive</span>}
                          </div>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <button
                            onClick={() => { setEditingId(q.id); setEditForm({ part: q.part, text: q.text, indicator: q.indicator, reversed: q.reversed, safety_question: q.safety_question }) }}
                            className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-blue-100 hover:text-blue-700 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteQuestion(q.id)}
                            disabled={qBusy[`del-${q.id}`]}
                            className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 text-red-500 hover:bg-red-100 hover:text-red-700 disabled:opacity-50 transition-colors"
                          >
                            {qBusy[`del-${q.id}`] ? '…' : 'Delete'}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
