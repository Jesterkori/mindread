import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { CATEGORIES, QUESTIONS } from '../data/questions'
import Navbar from '../components/Navbar'

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

const bgStyle = { background: 'linear-gradient(135deg, #0c1f3a 0%, #0d3556 40%, #0b4a52 70%, #0a5c5c 100%)' }
const glass   = { background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(16px)', border: '1.5px solid rgba(255,255,255,0.12)' }
const glassInput = {
  background: 'rgba(255,255,255,0.08)',
  border: '1.5px solid rgba(255,255,255,0.15)',
  color: 'white',
  borderRadius: '0.75rem',
  padding: '0.5rem 0.875rem',
  fontSize: '0.875rem',
  outline: 'none',
  width: '100%',
}

function GlassInput({ className = '', style = {}, ...props }) {
  return (
    <input
      {...props}
      className={className}
      style={{ ...glassInput, ...style }}
      onFocus={e => (e.target.style.borderColor = 'rgba(74,222,128,0.6)')}
      onBlur={e  => (e.target.style.borderColor = 'rgba(255,255,255,0.15)')}
    />
  )
}

function GlassTextarea({ className = '', style = {}, ...props }) {
  return (
    <textarea
      {...props}
      className={className}
      style={{ ...glassInput, resize: 'vertical', ...style }}
      onFocus={e => (e.target.style.borderColor = 'rgba(74,222,128,0.6)')}
      onBlur={e  => (e.target.style.borderColor = 'rgba(255,255,255,0.15)')}
    />
  )
}

function GlassSelect({ children, className = '', style = {}, ...props }) {
  return (
    <select
      {...props}
      className={className}
      style={{
        ...glassInput,
        background: 'rgb(10,30,60)',   // solid dark so options are readable
        colorScheme: 'dark',
        ...style,
      }}
    >
      {children}
    </select>
  )
}

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

  // Filter state for submissions
  const [filterInstitution, setFilterInstitution] = useState('')
  const [filterSection, setFilterSection]         = useState('')

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
      method: 'POST', headers,
      body: JSON.stringify({ reason: declineReason[id] || '' }),
    })
    setBusy((b) => ({ ...b, [`decline-${id}`]: false }))
    load()
  }

  async function releaseResult(id) {
    setBusy((b) => ({ ...b, [`release-${id}`]: true }))
    await fetch(`/api/admin/release-result/${id}`, {
      method: 'POST', headers,
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
      method: 'PUT', headers,
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

  function handleLogout() { logout(); navigate('/login', { replace: true }) }

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
      method: 'POST', headers,
      body: JSON.stringify({ ...addForm, category_id: qCategory }),
    })
    setQBusy((b) => ({ ...b, add: false }))
    setAddForm({ ...EMPTY_Q })
    setShowAdd(false)
    loadQuestions(qCategory)
  }

  // ── CSV download ──────────────────────────────────────────────────────────
  function downloadCSV() {
    const params = new URLSearchParams()
    if (filterInstitution) params.set('institution', filterInstitution)
    if (filterSection)     params.set('section', filterSection)
    const token = localStorage.getItem('token') || ''
    fetch(`/api/admin/export/csv?${params}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob)
        const a   = document.createElement('a')
        a.href     = url
        a.download = `mindcheck${filterInstitution ? '_' + filterInstitution.replace(/ /g, '_') : ''}${filterSection ? '_' + filterSection.replace(/ /g, '_') : ''}_results.csv`
        a.click()
        URL.revokeObjectURL(url)
      })
  }

  // ── PDF print window — full individual reports ────────────────────────────
  function printPDF() {
    const filtered = filteredSubs
    const title = [filterInstitution, filterSection].filter(Boolean).join(' — ') || 'All Submissions'

    function esc(s) {
      return String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    }

    const cards = filtered.map((s, idx) => {
      const levelColor = s.level === 'healthy' ? '#16a34a' : s.level === 'high' ? '#dc2626' : '#d97706'
      const answers = Object.entries(s.answers ?? {}).map(([qId, ans]) => {
        const ansLabel = { A:'Rarely/Never', B:'Sometimes', C:'Often', D:'Almost Always' }
        return `<span class="ans-chip">${esc(qId)}: <b>${esc(ans)}</b> — ${ansLabel[ans] || ans}</span>`
      }).join('')

      return `
      <div class="card" style="page-break-inside:avoid;border:1px solid #e2e8f0;border-radius:10px;padding:20px;margin-bottom:24px">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px">
          <div>
            <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
              <span style="font-size:16px;font-weight:700;color:#0f172a">${idx + 1}. ${esc(s.user_name)}</span>
              <span style="background:${levelColor};color:white;font-size:11px;font-weight:600;padding:2px 10px;border-radius:20px">${esc(s.label)}</span>
              ${s.safety_flag ? '<span style="background:#dc2626;color:white;font-size:11px;font-weight:600;padding:2px 10px;border-radius:20px">⚠️ Safety Flag</span>' : ''}
              ${s.result_released ? '<span style="background:#15803d;color:white;font-size:11px;font-weight:600;padding:2px 10px;border-radius:20px">Released</span>' : '<span style="background:#1d4ed8;color:white;font-size:11px;padding:2px 10px;border-radius:20px">Under Review</span>'}
            </div>
            <p style="color:#475569;font-size:12px;margin:4px 0 0">${esc(s.user_email)}</p>
            <p style="color:#64748b;font-size:12px;margin:2px 0 0">
              ${esc(categoryLabel(s.category))}
              ${s.institution ? ` &middot; ${esc(s.institution)}` : ''}
              ${s.section ? ` &middot; Section: ${esc(s.section)}` : ''}
              &middot; Score: ${s.score}/${s.total * 4}
              &middot; ${fmt(s.submitted_at)}
            </p>
          </div>
        </div>

        ${answers ? `
        <div style="margin-bottom:12px">
          <p style="font-size:11px;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:.05em;margin:0 0 6px">Answers</p>
          <div style="display:flex;flex-wrap:wrap;gap:4px">${answers}</div>
        </div>` : ''}

        ${s.action ? `
        <div style="margin-bottom:12px">
          <p style="font-size:11px;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:.05em;margin:0 0 4px">PDF Result</p>
          <p style="font-size:13px;color:#1e293b;line-height:1.5;background:#f8fafc;padding:10px;border-radius:6px;margin:0">${esc(s.action)}</p>
        </div>` : ''}

        ${s.admin_action ? `
        <div style="margin-bottom:12px">
          <p style="font-size:11px;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:.05em;margin:0 0 4px">Admin Answer (shown to user)</p>
          <p style="font-size:13px;color:#1e293b;line-height:1.5;background:#f0fdf4;padding:10px;border-radius:6px;border-left:3px solid #16a34a;margin:0">${esc(s.admin_action)}</p>
        </div>` : ''}

        ${s.ai_analysis ? `
        <div style="margin-bottom:12px">
          <p style="font-size:11px;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:.05em;margin:0 0 4px">AI Assessment</p>
          <p style="font-size:13px;color:#1e293b;line-height:1.6;background:#f8fafc;padding:10px;border-radius:6px;margin:0;white-space:pre-wrap">${esc(s.ai_analysis)}</p>
        </div>` : ''}

        ${s.admin_notes ? `
        <div>
          <p style="font-size:11px;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:.05em;margin:0 0 4px">Note from Team</p>
          <p style="font-size:13px;color:#1e293b;line-height:1.5;background:#fffbeb;padding:10px;border-radius:6px;border-left:3px solid #d97706;margin:0">${esc(s.admin_notes)}</p>
        </div>` : ''}

        ${s.result_released ? `<p style="font-size:11px;color:#94a3b8;margin:10px 0 0">Released: ${fmt(s.released_at)}</p>` : ''}
      </div>`
    }).join('')

    const win = window.open('', '_blank')
    win.document.write(`<!DOCTYPE html><html><head>
      <meta charset="utf-8">
      <title>MindCheck Full Reports — ${esc(title)}</title>
      <style>
        body{font-family:Arial,sans-serif;padding:28px 32px;color:#1e293b;max-width:900px;margin:auto}
        h1{font-size:22px;font-weight:700;color:#0f172a;margin:0 0 4px}
        p.sub{color:#64748b;font-size:13px;margin:0 0 24px}
        .ans-chip{display:inline-block;font-size:11px;background:#f1f5f9;border:1px solid #e2e8f0;
                  border-radius:4px;padding:2px 7px;color:#334155}
        @media print{body{padding:16px}h1{font-size:18px}}
      </style>
      </head><body>
      <h1>MindCheck Assessment Reports</h1>
      <p class="sub">${esc(title)} &nbsp;·&nbsp; ${filtered.length} record${filtered.length !== 1 ? 's' : ''} &nbsp;·&nbsp; Exported ${new Date().toLocaleDateString('en-IN')}</p>
      ${cards || '<p style="color:#94a3b8">No records found.</p>'}
      <script>window.onload=()=>{ setTimeout(()=>window.print(), 300) }<\/script>
      </body></html>`)
    win.document.close()
  }

  // ── Filter helpers ────────────────────────────────────────────────────────
  const allInstitutions = [...new Set(submissions.map((s) => s.institution).filter(Boolean))]
  const allSections     = [...new Set(
    submissions
      .filter((s) => !filterInstitution || s.institution === filterInstitution)
      .map((s) => s.section)
      .filter(Boolean)
  )]

  const filteredSubs = submissions.filter((s) => {
    if (filterInstitution && s.institution !== filterInstitution) return false
    if (filterSection     && s.section     !== filterSection)     return false
    return true
  })

  const pending  = filteredSubs
    .filter((s) => !s.result_released)
    .sort((a, b) => (b.safety_flag - a.safety_flag) || (new Date(b.submitted_at) - new Date(a.submitted_at)))
  const reviewed = filteredSubs
    .filter((s) => s.result_released)
    .sort((a, b) => new Date(b.released_at) - new Date(a.released_at))

  const answerLabel = { A: 'Rarely/Never', B: 'Sometimes', C: 'Often', D: 'Almost Always' }

  function renderCard(s) {
    const isOpen = expanded === s.id
    const isSafe = s.safety_flag
    return (
      <div key={s.id} className="rounded-2xl p-4 transition-all"
        style={{ ...glass, borderColor: isSafe && !s.result_released ? 'rgba(248,113,113,0.5)' : 'rgba(255,255,255,0.12)' }}>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="font-semibold text-white">{s.user_name}</p>
              {isSafe && <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: 'rgba(248,113,113,0.2)', color: '#f87171' }}>⚠️ Safety Flag</span>}
              {s.result_released && <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: 'rgba(74,222,128,0.15)', color: '#4ade80' }}>Released</span>}
            </div>
            <p className="text-sm text-white/50">{s.user_email}</p>
            <p className="text-xs text-white/35 mt-0.5">
              {categoryLabel(s.category)}
              {s.section && <> &middot; <span className="text-blue-300">{s.section}</span></>}
              {s.institution && <> &middot; <span className="text-green-300/70">{s.institution}</span></>}
              &nbsp;&middot; {s.label} ({s.score}/{s.total}) &middot; {fmt(s.submitted_at)}
            </p>
          </div>
          <button
            onClick={() => {
              setExpanded(isOpen ? null : s.id)
              if (!isOpen) {
                if (editedAnalysis[s.id]    === undefined) setEditedAnalysis((a) => ({ ...a, [s.id]: s.ai_analysis ?? '' }))
                if (editedAdminAction[s.id] === undefined) setEditedAdminAction((a) => ({ ...a, [s.id]: s.admin_action ?? '' }))
                if (notes[s.id]             === undefined) setNotes((n) => ({ ...n, [s.id]: s.admin_notes ?? '' }))
                loadCategoryQs(s.category)
              }
            }}
            className="text-sm font-medium text-green-400 hover:text-green-300 shrink-0 transition-colors"
          >
            {isOpen ? 'Collapse' : 'View & Review'}
          </button>
        </div>

        {isOpen && (
          <div className="mt-4 pt-4 space-y-5" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>

            {/* Answers */}
            <div>
              <p className="text-xs font-semibold text-white/50 uppercase tracking-wide mb-2">Test Answers</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-72 overflow-y-auto pr-1">
                {Object.entries(s.answers).map(([qId, answer]) => {
                  const q = getQuestion(s.category, qId)
                  const isRisk = (answer === 'C' || answer === 'D') && q?.safetyQuestion
                  return (
                    <div key={qId} className="rounded-xl p-2.5 text-xs"
                      style={{ background: isRisk ? 'rgba(248,113,113,0.1)' : 'rgba(255,255,255,0.05)', border: `1px solid ${isRisk ? 'rgba(248,113,113,0.3)' : 'rgba(255,255,255,0.08)'}` }}>
                      <p className="text-white/45 mb-1 leading-snug">{q ? q.text : `Question ${qId}`}</p>
                      <p className={`font-semibold ${isRisk ? 'text-red-400' : 'text-white/80'}`}>
                        {answer} — {answerLabel[answer]}{isRisk && ' ⚠️'}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* PDF result */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-xs font-semibold text-white/50 uppercase tracking-wide">PDF Result</p>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ background: s.level === 'healthy' ? 'rgba(74,222,128,0.2)' : s.level === 'high' ? 'rgba(248,113,113,0.2)' : 'rgba(251,191,36,0.2)',
                           color:      s.level === 'healthy' ? '#4ade80' : s.level === 'high' ? '#f87171' : '#fbbf24' }}>
                  {s.label}
                </span>
                <span className="text-xs text-white/35">{s.score}/{s.total * 4}</span>
              </div>
              <div className="rounded-xl px-3 py-2.5 text-sm text-white/65 leading-relaxed select-text"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                {s.action || <span className="text-white/30 italic">No PDF result generated.</span>}
              </div>
            </div>

            {/* Admin Answer */}
            {!s.result_released && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-white/50 uppercase tracking-wide">
                    Admin Answer <span className="text-white/30 font-normal normal-case">(shown to user)</span>
                  </p>
                  {s.action && (
                    <button type="button"
                      onClick={() => setEditedAdminAction((a) => ({ ...a, [s.id]: s.action }))}
                      className="text-xs px-2.5 py-1 rounded-lg transition-colors"
                      style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)' }}>
                      ↑ Copy from PDF
                    </button>
                  )}
                </div>
                <GlassTextarea rows={3} value={editedAdminAction[s.id] ?? ''}
                  onChange={(e) => setEditedAdminAction((a) => ({ ...a, [s.id]: e.target.value }))}
                  placeholder="Type the result to show the user, or copy from PDF above…" />
              </div>
            )}
            {s.result_released && s.admin_action && editingReleased !== s.id && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-white/50 uppercase tracking-wide">
                  Admin Answer <span className="text-white/30 font-normal normal-case">(released)</span>
                </p>
                <div className="rounded-xl px-3 py-2.5 text-sm text-white/65 leading-relaxed"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  {s.admin_action}
                </div>
              </div>
            )}

            {/* AI Assessment */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-white/50 uppercase tracking-wide">AI Assessment</p>
                {!s.ai_analysis && !s.result_released && (
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(251,191,36,0.15)', color: '#fbbf24' }}>Still generating…</span>
                )}
              </div>
              <GlassTextarea rows={6}
                value={editedAnalysis[s.id] ?? s.ai_analysis ?? ''}
                onChange={(e) => setEditedAnalysis((a) => ({ ...a, [s.id]: e.target.value }))}
                placeholder="AI analysis will appear here once generated. You can also write or edit it manually."
                disabled={s.result_released && editingReleased !== s.id}
                style={{ opacity: s.result_released && editingReleased !== s.id ? 0.5 : 1 }} />
            </div>

            {/* Release / Edit actions */}
            {!s.result_released ? (
              <div className="space-y-2 pt-1" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <p className="text-xs font-semibold text-white/50 uppercase tracking-wide">Personal note to user (optional)</p>
                <GlassTextarea rows={2} value={notes[s.id] || ''}
                  onChange={(e) => setNotes((n) => ({ ...n, [s.id]: e.target.value }))}
                  placeholder="e.g. We recommend speaking with a counsellor…" style={{ resize: 'none' }} />
                <button onClick={() => releaseResult(s.id)} disabled={busy[`release-${s.id}`]}
                  className="w-full py-2.5 rounded-xl font-bold text-sm text-white transition-all hover:brightness-110 disabled:opacity-50"
                  style={{ background: 'linear-gradient(135deg,#22c55e,#0d9488)' }}>
                  {busy[`release-${s.id}`] ? 'Releasing…' : 'Release Result to User'}
                </button>
              </div>
            ) : editingReleased === s.id ? (
              <div className="space-y-3 pt-1" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <p className="text-xs font-semibold text-yellow-400 uppercase tracking-wide">Editing Released Result</p>
                <div className="space-y-1">
                  <p className="text-xs text-white/45">Admin Answer (shown to user)</p>
                  <GlassTextarea rows={3} value={editedAdminAction[s.id] ?? ''}
                    onChange={(e) => setEditedAdminAction((a) => ({ ...a, [s.id]: e.target.value }))} />
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-white/45">Personal note to user</p>
                  <GlassTextarea rows={2} value={notes[s.id] || ''}
                    onChange={(e) => setNotes((n) => ({ ...n, [s.id]: e.target.value }))} style={{ resize: 'none' }} />
                </div>
                <div className="flex gap-2">
                  <button onClick={() => editResult(s.id)} disabled={busy[`edit-${s.id}`]}
                    className="flex-1 py-2.5 rounded-xl font-bold text-sm text-white transition-all hover:brightness-110 disabled:opacity-50"
                    style={{ background: 'linear-gradient(135deg,#22c55e,#0d9488)' }}>
                    {busy[`edit-${s.id}`] ? 'Saving…' : 'Save Changes'}
                  </button>
                  <button onClick={() => setEditingReleased(null)}
                    className="flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all"
                    style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)', border: '1.5px solid rgba(255,255,255,0.12)' }}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="rounded-xl p-3 flex items-start justify-between gap-3"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div>
                  <p className="text-xs font-semibold text-white/50">Released {fmt(s.released_at)}</p>
                  {s.admin_notes && <p className="text-sm text-white/65 mt-1">{s.admin_notes}</p>}
                </div>
                <button onClick={() => setEditingReleased(s.id)}
                  className="text-xs px-3 py-1.5 rounded-lg shrink-0 transition-colors"
                  style={{ background: 'rgba(251,191,36,0.15)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.3)' }}>
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
    <div className="min-h-screen relative overflow-hidden" style={bgStyle}>
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.05, pointerEvents: 'none' }}>
        <defs>
          <pattern id="circ-ad" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
            <path d="M15 60 H45 M45 60 V25 M45 25 H80 M80 25 V60 M80 60 H105" stroke="#4ade80" strokeWidth="1" fill="none"/>
            <circle cx="45" cy="60" r="3" fill="#4ade80"/><circle cx="80" cy="25" r="3" fill="#4ade80"/>
            <path d="M25 95 H60 M60 95 V108" stroke="#60a5fa" strokeWidth="1" fill="none"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circ-ad)"/>
      </svg>

      <Navbar />

      <main className="relative z-10 max-w-5xl mx-auto px-4 pt-24 pb-12 space-y-6">

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: stats.pendingUsers,          label: 'Pending Approvals',      color: '#60a5fa' },
              { value: stats.totalSubmissions,       label: 'Total Assessments',      color: '#4ade80' },
              { value: stats.unreviewedSafetyFlags,  label: stats.unreviewedSafetyFlags > 0 ? '⚠️ Urgent Safety Flags' : 'Safety Flags (unreviewed)',
                color: stats.unreviewedSafetyFlags > 0 ? '#f87171' : 'rgba(255,255,255,0.5)',
                urgent: stats.unreviewedSafetyFlags > 0 },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl p-5 text-center" style={{ ...glass, borderColor: s.urgent ? 'rgba(248,113,113,0.4)' : 'rgba(255,255,255,0.12)' }}>
                <p className="text-3xl font-extrabold" style={{ color: s.color }}>{s.value}</p>
                <p className="text-xs text-white/45 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 rounded-xl p-1 w-fit flex-wrap"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
          {[
            { key: 'pending',     label: `Pending Approvals${pendingUsers.length > 0 ? ` (${pendingUsers.length})` : ''}` },
            { key: 'submissions', label: `Assessments${submissions.length > 0 ? ` (${submissions.length})` : ''}` },
            { key: 'questions',   label: 'Questions' },
          ].map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={tab === t.key
                ? { background: 'rgba(74,222,128,0.2)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.3)' }
                : { color: 'rgba(255,255,255,0.5)' }}>
              {t.label}
            </button>
          ))}
        </div>

        {loading && (
          <div className="rounded-2xl p-10 text-center" style={glass}>
            <div className="w-7 h-7 border-2 border-green-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-white/40 text-sm">Loading…</p>
          </div>
        )}

        {/* ── Pending Users Tab ──────────────────────────────────────────────── */}
        {!loading && tab === 'pending' && (
          <>
            {pendingUsers.length === 0 ? (
              <div className="rounded-2xl p-10 text-center" style={glass}>
                <p className="text-3xl mb-2">✅</p>
                <p className="text-white/60 font-medium">No pending registrations</p>
              </div>
            ) : (
              <div className="space-y-3">
                {pendingUsers.map((u) => (
                  <div key={u.id} className="rounded-2xl p-4" style={glass}>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-semibold text-white">{u.name}</p>
                          {!u.email_verified && (
                            <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                              style={{ background: 'rgba(251,191,36,0.15)', color: '#fbbf24' }}>
                              Email not verified
                            </span>
                          )}
                          {u.institution && (
                            <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                              style={{ background: 'rgba(74,222,128,0.15)', color: '#4ade80' }}>
                              🏫 {u.institution}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-white/50">{u.email}</p>
                        <p className="text-xs text-white/35 mt-0.5">
                          {categoryLabel(u.category)} &middot; Registered {fmt(u.created_at)}
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2 shrink-0">
                        <GlassInput type="text" placeholder="Decline reason (optional)"
                          value={declineReason[u.id] || ''}
                          onChange={(e) => setDeclineReason((d) => ({ ...d, [u.id]: e.target.value }))}
                          style={{ width: '11rem', padding: '0.375rem 0.75rem' }} />
                        <button onClick={() => approveUser(u.id)} disabled={busy[`approve-${u.id}`]}
                          className="px-4 py-1.5 rounded-xl text-sm font-medium text-white transition-all hover:brightness-110 disabled:opacity-50"
                          style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)' }}>
                          {busy[`approve-${u.id}`] ? 'Approving…' : 'Approve'}
                        </button>
                        <button onClick={() => declineUser(u.id)} disabled={busy[`decline-${u.id}`]}
                          className="px-4 py-1.5 rounded-xl text-sm font-medium transition-all disabled:opacity-50"
                          style={{ background: 'rgba(248,113,113,0.15)', color: '#f87171', border: '1px solid rgba(248,113,113,0.3)' }}>
                          {busy[`decline-${u.id}`] ? 'Declining…' : 'Decline'}
                        </button>
                        <button onClick={() => deleteUser(u.id)} disabled={busy[`del-user-${u.id}`]}
                          className="px-4 py-1.5 rounded-xl text-sm font-medium transition-all disabled:opacity-50"
                          style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
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

        {/* ── Submissions Tab ──────────────────────────────────────────────────── */}
        {!loading && tab === 'submissions' && (
          <>
            {/* Filter + download bar */}
            <div className="rounded-2xl p-4" style={glass}>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <svg className="w-4 h-4 text-white/40 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z"/>
                  </svg>
                  <GlassSelect value={filterInstitution}
                    onChange={(e) => { setFilterInstitution(e.target.value); setFilterSection('') }}
                    style={{ width: '180px' }}>
                    <option value="">All Institutions</option>
                    {allInstitutions.map((i) => <option key={i} value={i}>{i}</option>)}
                  </GlassSelect>
                  <GlassSelect value={filterSection} onChange={(e) => setFilterSection(e.target.value)}
                    disabled={!filterInstitution && allSections.length === 0}
                    style={{ width: '150px', opacity: (!filterInstitution && allSections.length === 0) ? 0.4 : 1 }}>
                    <option value="">All Sections</option>
                    {allSections.map((s) => <option key={s} value={s}>{s}</option>)}
                  </GlassSelect>
                  {(filterInstitution || filterSection) && (
                    <button onClick={() => { setFilterInstitution(''); setFilterSection('') }}
                      className="text-xs px-2.5 py-1.5 rounded-lg transition-colors"
                      style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.55)' }}>
                      Clear
                    </button>
                  )}
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={downloadCSV}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all hover:brightness-110"
                    style={{ background: 'rgba(74,222,128,0.2)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.35)' }}>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                    </svg>
                    CSV
                  </button>
                  <button onClick={printPDF}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all hover:brightness-110"
                    style={{ background: 'rgba(96,165,250,0.2)', color: '#93c5fd', border: '1px solid rgba(96,165,250,0.35)' }}>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
                    </svg>
                    PDF
                  </button>
                </div>
              </div>
              {(filterInstitution || filterSection) && (
                <p className="text-xs text-white/35 mt-2">
                  Showing {filteredSubs.length} of {submissions.length} submissions
                  {filterInstitution && <> · <span className="text-green-400/70">{filterInstitution}</span></>}
                  {filterSection     && <> · <span className="text-blue-400/70">{filterSection}</span></>}
                </p>
              )}
            </div>

            {submissions.length === 0 ? (
              <div className="rounded-2xl p-10 text-center" style={glass}>
                <p className="text-3xl mb-2">📋</p>
                <p className="text-white/60 font-medium">No submissions yet</p>
              </div>
            ) : (
              <>
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <p className="font-semibold text-white">Needs Review</p>
                    {pending.length > 0 && (
                      <span className="text-xs px-2.5 py-0.5 rounded-full font-medium"
                        style={{ background: pending.some((s) => s.safety_flag) ? 'rgba(248,113,113,0.2)' : 'rgba(96,165,250,0.2)',
                                 color:      pending.some((s) => s.safety_flag) ? '#f87171' : '#93c5fd' }}>
                        {pending.length}
                      </span>
                    )}
                  </div>
                  {pending.length === 0 ? (
                    <div className="rounded-2xl p-6 text-center text-sm text-white/35" style={glass}>All assessments reviewed</div>
                  ) : (
                    <div className="space-y-3">{pending.map(renderCard)}</div>
                  )}
                </div>

                {reviewed.length > 0 && (
                  <div className="pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                    <div className="flex items-center gap-2 mb-3">
                      <p className="font-semibold text-white">Reviewed</p>
                      <span className="text-xs px-2.5 py-0.5 rounded-full font-medium"
                        style={{ background: 'rgba(74,222,128,0.15)', color: '#4ade80' }}>
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

        {/* ── Questions Tab ──────────────────────────────────────────────────── */}
        {tab === 'questions' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <GlassSelect value={qCategory}
                onChange={(e) => { setQCategory(e.target.value); setEditingId(null); setShowAdd(false) }}
                style={{ width: '14rem' }}>
                {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
              </GlassSelect>
              <button onClick={seedCategory} disabled={qBusy.seed}
                className="px-4 py-2 rounded-xl text-sm font-medium transition-all disabled:opacity-50"
                style={{ background: 'rgba(251,191,36,0.15)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.3)' }}>
                {qBusy.seed ? 'Loading…' : 'Reset to Defaults'}
              </button>
              <button onClick={() => { setShowAdd((v) => !v); setEditingId(null) }}
                className="ml-auto px-4 py-2 rounded-xl text-sm font-medium text-white transition-all hover:brightness-110"
                style={{ background: 'linear-gradient(135deg,#22c55e,#0d9488)' }}>
                {showAdd ? 'Cancel' : '+ Add Question'}
              </button>
            </div>

            {showAdd && (
              <div className="rounded-2xl p-5 space-y-3"
                style={{ ...glass, borderColor: 'rgba(74,222,128,0.35)' }}>
                <p className="text-sm font-semibold text-green-400">New Question</p>
                <GlassInput placeholder="Part / Section (e.g. Part 1: Mood and Emotions)" value={addForm.part} onChange={(e) => setAddForm((f) => ({ ...f, part: e.target.value }))} />
                <GlassTextarea rows={2} placeholder="Question text" value={addForm.text} onChange={(e) => setAddForm((f) => ({ ...f, text: e.target.value }))} style={{ resize: 'none' }} />
                <GlassTextarea rows={2} placeholder="Indicator / explanation" value={addForm.indicator} onChange={(e) => setAddForm((f) => ({ ...f, indicator: e.target.value }))} style={{ resize: 'none' }} />
                <div className="flex items-center gap-6 text-sm text-white/60">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={addForm.reversed} onChange={(e) => setAddForm((f) => ({ ...f, reversed: e.target.checked }))} className="w-4 h-4 accent-green-500" />
                    Reversed scoring
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={addForm.safety_question} onChange={(e) => setAddForm((f) => ({ ...f, safety_question: e.target.checked }))} className="w-4 h-4 accent-red-500" />
                    Safety question
                  </label>
                </div>
                <button onClick={addQuestion} disabled={qBusy.add}
                  className="w-full py-2.5 rounded-xl font-bold text-sm text-white transition-all hover:brightness-110 disabled:opacity-50"
                  style={{ background: 'linear-gradient(135deg,#22c55e,#0d9488)' }}>
                  {qBusy.add ? 'Adding…' : 'Add Question'}
                </button>
              </div>
            )}

            {qLoading ? (
              <div className="rounded-2xl p-8 text-center" style={glass}>
                <div className="w-6 h-6 border-2 border-green-400 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                <p className="text-white/40 text-sm">Loading questions…</p>
              </div>
            ) : questions.length === 0 ? (
              <div className="rounded-2xl p-10 text-center" style={glass}>
                <p className="text-white/50">No questions found. Use "Reset to Defaults" to load the default set.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {questions.map((q) => (
                  <div key={q.id} className="rounded-2xl p-4" style={glass}>
                    {editingId === q.id ? (
                      <div className="space-y-3">
                        <GlassInput placeholder="Part / Section" value={editForm.part} onChange={(e) => setEditForm((f) => ({ ...f, part: e.target.value }))} />
                        <GlassTextarea rows={2} placeholder="Question text" value={editForm.text} onChange={(e) => setEditForm((f) => ({ ...f, text: e.target.value }))} style={{ resize: 'none' }} />
                        <GlassTextarea rows={2} placeholder="Indicator" value={editForm.indicator} onChange={(e) => setEditForm((f) => ({ ...f, indicator: e.target.value }))} style={{ resize: 'none' }} />
                        <div className="flex items-center gap-6 text-sm text-white/60">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" checked={editForm.reversed} onChange={(e) => setEditForm((f) => ({ ...f, reversed: e.target.checked }))} className="w-4 h-4 accent-green-500" />
                            Reversed scoring
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" checked={editForm.safety_question} onChange={(e) => setEditForm((f) => ({ ...f, safety_question: e.target.checked }))} className="w-4 h-4 accent-red-500" />
                            Safety question
                          </label>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => saveEdit(q.id)} disabled={qBusy[`save-${q.id}`]}
                            className="flex-1 py-2.5 rounded-xl font-bold text-sm text-white transition-all hover:brightness-110 disabled:opacity-50"
                            style={{ background: 'linear-gradient(135deg,#22c55e,#0d9488)' }}>
                            {qBusy[`save-${q.id}`] ? 'Saving…' : 'Save'}
                          </button>
                          <button onClick={() => setEditingId(null)}
                            className="flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all"
                            style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.6)', border: '1.5px solid rgba(255,255,255,0.12)' }}>
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start gap-3">
                        <span className="shrink-0 w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center mt-0.5"
                          style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}>
                          {q.sort_order}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-white/35 mb-0.5">{q.part}</p>
                          <p className="text-sm text-white/85 font-medium leading-snug">{q.text}</p>
                          <p className="text-xs text-white/35 mt-1 leading-snug">{q.indicator}</p>
                          <div className="flex gap-2 mt-1.5 flex-wrap">
                            {q.reversed        && <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(96,165,250,0.15)', color: '#93c5fd' }}>Reversed</span>}
                            {q.safety_question && <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(248,113,113,0.15)', color: '#f87171' }}>⚠️ Safety</span>}
                            {!q.active         && <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)' }}>Inactive</span>}
                          </div>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <button
                            onClick={() => { setEditingId(q.id); setEditForm({ part: q.part, text: q.text, indicator: q.indicator, reversed: q.reversed, safety_question: q.safety_question }) }}
                            className="text-xs px-3 py-1.5 rounded-lg transition-colors"
                            style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)' }}>
                            Edit
                          </button>
                          <button onClick={() => deleteQuestion(q.id)} disabled={qBusy[`del-${q.id}`]}
                            className="text-xs px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                            style={{ background: 'rgba(248,113,113,0.1)', color: '#f87171' }}>
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
