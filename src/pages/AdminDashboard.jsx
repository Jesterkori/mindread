import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { CATEGORIES, QUESTIONS } from '../data/questions'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CircuitBackground from '../components/CircuitBackground'
import Icon from '../components/Icon'
import { bgStyle, glassCard } from '../styles/theme'

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

const glass   = glassCard
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

  const [pendingConfirm, setPendingConfirm] = useState(null)
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

  // Institutions tab state
  const [instList, setInstList]           = useState([])
  const [instLoading, setInstLoading]     = useState(false)
  const [newInstName, setNewInstName]     = useState('')
  const [expandedInst, setExpandedInst]   = useState(null)
  const [newSecName, setNewSecName]       = useState({})
  const [instBusy, setInstBusy]           = useState({})

  // Members tab state
  const [members, setMembers]               = useState([])
  const [membersLoading, setMembersLoading] = useState(false)
  const [memberSearch, setMemberSearch]     = useState('')

  // Logs tab state
  const [logs, setLogs]               = useState([])
  const [logsLoading, setLogsLoading] = useState(false)
  const [logsSearch, setLogsSearch]   = useState('')

  // Site Config tab state
  const [configDraft, setConfigDraft]   = useState({})
  const [configBusy, setConfigBusy]     = useState(false)
  const [configLoaded, setConfigLoaded] = useState(false)

  // Questions tab state
  const [qCategory, setQCategory]     = useState(CATEGORIES[0]?.id ?? '')
  const [questions, setQuestions]     = useState([])
  const [qLoading, setQLoading]       = useState(false)
  const [editingId, setEditingId]     = useState(null)
  const [editForm, setEditForm]       = useState(EMPTY_Q)
  const [addForm, setAddForm]         = useState({ ...EMPTY_Q })
  const [showAdd, setShowAdd]         = useState(false)
  const [qBusy, setQBusy]             = useState({})
  const [recomputing, setRecomputing] = useState(false)

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

  // ── Institution helpers ───────────────────────────────────────────────────
  const loadInstitutions = useCallback(async () => {
    setInstLoading(true)
    const res  = await fetch('/api/admin/institutions', { headers: authHeader() })
    const data = await res.json()
    if (data.ok) setInstList(data.institutions)
    setInstLoading(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => { if (tab === 'institutions') loadInstitutions() }, [tab, loadInstitutions])

  // ── Members helpers ───────────────────────────────────────────────────────
  async function loadMembers() {
    setMembersLoading(true)
    const res  = await fetch('/api/admin/members', { headers: authHeader() })
    const data = await res.json()
    if (data.ok) setMembers(data.members)
    setMembersLoading(false)
  }

  useEffect(() => { if (tab === 'members') loadMembers() }, [tab]) // eslint-disable-line react-hooks/exhaustive-deps

  async function disableMember(id) {
    setBusy(b => ({ ...b, [`disable-${id}`]: true }))
    await fetch(`/api/admin/disable-user/${id}`, { method: 'POST', headers })
    setBusy(b => ({ ...b, [`disable-${id}`]: false }))
    loadMembers()
  }

  async function enableMember(id) {
    setBusy(b => ({ ...b, [`enable-${id}`]: true }))
    await fetch(`/api/admin/enable-user/${id}`, { method: 'POST', headers })
    setBusy(b => ({ ...b, [`enable-${id}`]: false }))
    loadMembers()
  }

  // ── Logs helpers ──────────────────────────────────────────────────────────
  async function loadLogs(search = '') {
    setLogsLoading(true)
    const q   = search ? `?search=${encodeURIComponent(search)}` : ''
    const res = await fetch(`/api/admin/logs${q}`, { headers: authHeader() })
    const data = await res.json()
    if (data.ok) setLogs(data.logs)
    setLogsLoading(false)
  }

  useEffect(() => { if (tab === 'logs') loadLogs(logsSearch) }, [tab]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Site Config helpers ───────────────────────────────────────────────────
  async function loadConfig() {
    const res  = await fetch('/api/config')
    const data = await res.json()
    if (data.ok) { setConfigDraft(data.config); setConfigLoaded(true) }
  }

  useEffect(() => { if (tab === 'config' && !configLoaded) loadConfig() }, [tab, configLoaded]) // eslint-disable-line react-hooks/exhaustive-deps

  async function saveConfig() {
    setConfigBusy(true)
    await fetch('/api/admin/config', { method: 'PUT', headers, body: JSON.stringify({ configs: configDraft }) })
    setConfigBusy(false)
    loadConfig()
  }

  function getAboutCards() {
    try { return JSON.parse(configDraft.about_cards_json || '[]') } catch { return [] }
  }
  function updateAboutCard(i, field, value) {
    const updated = getAboutCards().map((c, idx) => idx === i ? { ...c, [field]: value } : c)
    setConfigDraft(d => ({ ...d, about_cards_json: JSON.stringify(updated) }))
  }
  function getFeatCards() {
    try { return JSON.parse(configDraft.features_json || '[]') } catch { return [] }
  }
  function updateFeatCard(i, field, value) {
    const updated = getFeatCards().map((c, idx) => idx === i ? { ...c, [field]: value } : c)
    setConfigDraft(d => ({ ...d, features_json: JSON.stringify(updated) }))
  }
  function handleLogoUpload(e) {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setConfigDraft(d => ({ ...d, logo_base64: reader.result }))
    reader.readAsDataURL(file)
  }

  function handleQrUpload(e) {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setConfigDraft(d => ({ ...d, payment_qr_base64: reader.result }))
    reader.readAsDataURL(file)
  }

  async function addInstitution() {
    const name = newInstName.trim()
    if (!name) return
    setInstBusy(b => ({ ...b, addInst: true }))
    await fetch('/api/admin/institutions', { method: 'POST', headers, body: JSON.stringify({ name }) })
    setInstBusy(b => ({ ...b, addInst: false }))
    setNewInstName('')
    loadInstitutions()
  }

  function deleteInstitution(id) {
    setPendingConfirm({ message: 'Delete this institution and ALL its sections? This cannot be undone.', action: async () => {
      setInstBusy(b => ({ ...b, [`delInst-${id}`]: true }))
      await fetch(`/api/admin/institutions/${id}`, { method: 'DELETE', headers })
      setInstBusy(b => ({ ...b, [`delInst-${id}`]: false }))
      loadInstitutions()
    }})
  }

  async function addSection(instId) {
    const name = (newSecName[instId] || '').trim()
    if (!name) return
    setInstBusy(b => ({ ...b, [`addSec-${instId}`]: true }))
    await fetch(`/api/admin/institutions/${instId}/sections`, { method: 'POST', headers, body: JSON.stringify({ name }) })
    setInstBusy(b => ({ ...b, [`addSec-${instId}`]: false }))
    setNewSecName(n => ({ ...n, [instId]: '' }))
    loadInstitutions()
  }

  async function deleteSection(secId) {
    setInstBusy(b => ({ ...b, [`delSec-${secId}`]: true }))
    await fetch(`/api/admin/institution-sections/${secId}`, { method: 'DELETE', headers })
    setInstBusy(b => ({ ...b, [`delSec-${secId}`]: false }))
    loadInstitutions()
  }

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

  async function togglePayment(id, confirmed) {
    setBusy((b) => ({ ...b, [`payment-${id}`]: true }))
    await fetch(`/api/admin/submissions/${id}/payment`, {
      method: 'POST', headers,
      body: JSON.stringify({ confirmed }),
    })
    setBusy((b) => ({ ...b, [`payment-${id}`]: false }))
    load()
  }

  function deleteUser(id) {
    setPendingConfirm({ message: 'Delete this user and all their submissions? This cannot be undone.', action: async () => {
      setBusy((b) => ({ ...b, [`del-user-${id}`]: true }))
      await fetch(`/api/admin/users/${id}`, { method: 'DELETE', headers })
      setBusy((b) => ({ ...b, [`del-user-${id}`]: false }))
      load()
    }})
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

  function seedCategory() {
    setPendingConfirm({ message: `Reset all "${categoryLabel(qCategory)}" questions to defaults? This cannot be undone.`, action: async () => {
      setQBusy((b) => ({ ...b, seed: true }))
      await fetch('/api/admin/questions/seed', { method: 'POST', headers, body: JSON.stringify({ category: qCategory }) })
      setQBusy((b) => ({ ...b, seed: false }))
      loadQuestions(qCategory)
    }})
  }

  async function saveEdit(id) {
    setQBusy((b) => ({ ...b, [`save-${id}`]: true }))
    await fetch(`/api/admin/questions/${id}`, { method: 'PUT', headers, body: JSON.stringify(editForm) })
    setQBusy((b) => ({ ...b, [`save-${id}`]: false }))
    setEditingId(null)
    loadQuestions(qCategory)
  }

  function deleteQuestion(id) {
    setPendingConfirm({ message: 'Delete this question?', action: async () => {
      setQBusy((b) => ({ ...b, [`del-${id}`]: true }))
      await fetch(`/api/admin/questions/${id}`, { method: 'DELETE', headers })
      setQBusy((b) => ({ ...b, [`del-${id}`]: false }))
      loadQuestions(qCategory)
    }})
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

  // ── Recompute career-fit results (one-time fix for old Healthy/Distress labels) ─
  async function recomputeCareerFit() {
    setRecomputing(true)
    try {
      const res  = await fetch('/api/admin/backfill-career-fit', { method: 'POST', headers: authHeader() })
      const data = await res.json()
      if (data.ok) { await load(); alert(`Updated ${data.updated} career-fit result${data.updated === 1 ? '' : 's'}.`) }
      else alert('Recompute failed. Please try again.')
    } catch {
      alert('Recompute failed. Please try again.')
    } finally {
      setRecomputing(false)
    }
  }

  // ── CSV download ──────────────────────────────────────────────────────────
  function downloadCSV() {
    const params = new URLSearchParams()
    if (filterInstitution) params.set('institution', filterInstitution)
    if (filterSection)     params.set('section', filterSection)
    fetch(`/api/admin/export/csv?${params}`, { headers: authHeader() })
      .then((r) => {
        if (!r.ok) throw new Error('Export failed')
        return r.blob()
      })
      .then((blob) => {
        const url = URL.createObjectURL(blob)
        const a   = document.createElement('a')
        a.href     = url
        a.download = `mindcheck${filterInstitution ? '_' + filterInstitution.replace(/ /g, '_') : ''}${filterSection ? '_' + filterSection.replace(/ /g, '_') : ''}_results.csv`
        a.click()
        URL.revokeObjectURL(url)
      })
      .catch(() => alert('CSV export failed. Please try again.'))
  }

  // ── PDF print window — full individual reports ────────────────────────────
  function printPDF() {
    const filtered = filteredSubs
    const title = [filterInstitution, filterSection].filter(Boolean).join(' — ') || 'All Submissions'

    function esc(s) {
      return String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    }

    const cards = filtered.map((s, idx) => {
      const levelColor = s.level === 'healthy' ? '#16a34a' : s.level === 'high' ? '#dc2626' : s.level === 'career' ? '#7c3aed' : '#d97706'
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
              ${s.safety_flag ? '<span style="background:#dc2626;color:white;font-size:11px;font-weight:600;padding:2px 10px;border-radius:20px;display:inline-flex;align-items:center;gap:4px"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>Safety Flag</span>' : ''}
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
              {isSafe && (
                <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: 'rgba(248,113,113,0.2)', color: '#f87171' }}>
                  <Icon name="alert-triangle" className="w-3 h-3" /> Safety Flag
                </span>
              )}
              {s.result_released && <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: 'rgba(74,222,128,0.15)', color: '#4ade80' }}>Released</span>}
              {s.payment_confirmed && <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: 'rgba(96,165,250,0.15)', color: '#60a5fa' }}>Paid</span>}
              {s.score_check && s.score_check !== 'OK' && (
                <span title={s.score_check} className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: 'rgba(251,191,36,0.15)', color: '#fbbf24' }}>
                  <Icon name="alert-triangle" className="w-3 h-3" /> AI Score Check
                </span>
              )}
            </div>
            <p className="text-sm text-white/50">{s.user_email}</p>
            <p className="text-xs text-white/35 mt-0.5">
              {categoryLabel(s.category)}
              {s.section && <> &middot; <span className="text-blue-300">{s.section}</span></>}
              {s.institution && <> &middot; <span className="text-green-300/70">{s.institution}</span></>}
              &nbsp;&middot; {s.label} ({s.score}/{s.total * 4}) &middot; {fmt(s.submitted_at)}
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

            {/* Payment status */}
            <div className="flex items-center justify-between rounded-xl px-3 py-2.5"
              style={{ background: s.payment_confirmed ? 'rgba(96,165,250,0.1)' : 'rgba(255,255,255,0.05)', border: `1px solid ${s.payment_confirmed ? 'rgba(96,165,250,0.3)' : 'rgba(255,255,255,0.08)'}` }}>
              <span className="text-sm text-white/70">
                Payment {s.payment_confirmed ? <span className="text-blue-400 font-semibold">received</span> : <span className="text-white/40">not yet confirmed</span>}
              </span>
              <button
                onClick={() => togglePayment(s.id, !s.payment_confirmed)}
                disabled={busy[`payment-${s.id}`]}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                style={{ background: s.payment_confirmed ? 'rgba(255,255,255,0.08)' : 'rgba(96,165,250,0.15)', color: s.payment_confirmed ? 'rgba(255,255,255,0.6)' : '#60a5fa' }}>
                {busy[`payment-${s.id}`] ? 'Saving…' : s.payment_confirmed ? 'Mark Unpaid' : 'Mark Paid'}
              </button>
            </div>

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
                      <p className={`font-semibold flex items-center gap-1 ${isRisk ? 'text-red-400' : 'text-white/80'}`}>
                        {answer} — {answerLabel[answer]}{isRisk && <Icon name="alert-triangle" className="w-3 h-3" />}
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
                  style={{ background: s.level === 'healthy' ? 'rgba(74,222,128,0.2)' : s.level === 'high' ? 'rgba(248,113,113,0.2)' : s.level === 'career' ? 'rgba(167,139,250,0.2)' : 'rgba(251,191,36,0.2)',
                           color:      s.level === 'healthy' ? '#4ade80' : s.level === 'high' ? '#f87171' : s.level === 'career' ? '#a78bfa' : '#fbbf24' }}>
                  {s.label}
                </span>
                <span className="text-xs text-white/35">{s.score}/{s.total * 4}</span>
              </div>
              <div className="rounded-xl px-3 py-2.5 text-sm text-white/65 leading-relaxed select-text"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                {s.action || <span className="text-white/30 italic">No PDF result generated.</span>}
              </div>
              {s.score_check && s.score_check !== 'OK' && (
                <div className="rounded-xl px-3 py-2.5 text-sm leading-relaxed flex items-start gap-2"
                  style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.3)', color: '#fbbf24' }}>
                  <Icon name="alert-triangle" className="w-4 h-4 shrink-0 mt-0.5" />
                  <span><b>AI score check:</b> {s.score_check} — please double-check before releasing.</span>
                </div>
              )}
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
      <CircuitBackground opacity={0.05} />

      <Navbar />

      {pendingConfirm && (
        <div className="fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
          <div className="rounded-2xl px-6 py-4 flex items-center gap-4 shadow-2xl max-w-lg w-full" style={glass}>
            <p className="flex-1 text-white/80 text-sm">{pendingConfirm.message}</p>
            <button onClick={() => { pendingConfirm.action(); setPendingConfirm(null) }}
                    className="px-4 py-1.5 rounded-xl text-sm font-semibold text-white shrink-0"
                    style={{ background: 'linear-gradient(135deg,#ef4444,#dc2626)' }}>
              Confirm
            </button>
            <button onClick={() => setPendingConfirm(null)}
                    className="px-4 py-1.5 rounded-xl text-sm font-semibold shrink-0"
                    style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <main className="relative z-10 max-w-5xl mx-auto px-4 pt-24 pb-12 space-y-6">

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: stats.pendingUsers,          label: 'Pending Approvals',      color: '#60a5fa' },
              { value: stats.totalSubmissions,       label: 'Total Assessments',      color: '#4ade80' },
              { value: stats.unreviewedSafetyFlags,  label: stats.unreviewedSafetyFlags > 0 ? 'Urgent Safety Flags' : 'Safety Flags (unreviewed)',
                color: stats.unreviewedSafetyFlags > 0 ? '#f87171' : 'rgba(255,255,255,0.5)',
                urgent: stats.unreviewedSafetyFlags > 0 },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl p-5 text-center" style={{ ...glass, borderColor: s.urgent ? 'rgba(248,113,113,0.4)' : 'rgba(255,255,255,0.12)' }}>
                <p className="text-3xl font-extrabold" style={{ color: s.color }}>{s.value}</p>
                <p className="text-xs text-white/45 mt-1 flex items-center justify-center gap-1">
                  {s.urgent && <Icon name="alert-triangle" className="w-3 h-3" style={{ color: s.color }} />}
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 rounded-xl p-1 w-fit flex-wrap"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
          {[
            { key: 'pending',      label: `Pending${pendingUsers.length > 0 ? ` (${pendingUsers.length})` : ''}` },
            { key: 'submissions',  label: `Assessments${submissions.length > 0 ? ` (${submissions.length})` : ''}` },
            { key: 'members',      label: `Members${members.length > 0 ? ` (${members.length})` : ''}` },
            { key: 'logs',         label: 'Activity Logs' },
            { key: 'config',       label: 'Site Config' },
            { key: 'institutions', label: `Institutions${instList.length > 0 ? ` (${instList.length})` : ''}` },
            { key: 'questions',    label: 'Questions' },
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
                <Icon name="check-circle" className="w-8 h-8 mx-auto mb-2 text-green-400" />
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
                            <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium"
                              style={{ background: 'rgba(74,222,128,0.15)', color: '#4ade80' }}>
                              <Icon name="building" className="w-3 h-3" /> {u.institution}
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
                  <button onClick={recomputeCareerFit} disabled={recomputing}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all hover:brightness-110 disabled:opacity-50"
                    style={{ background: 'rgba(167,139,250,0.2)', color: '#c4b5fd', border: '1px solid rgba(167,139,250,0.35)' }}>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                    </svg>
                    {recomputing ? 'Recomputing…' : 'Fix Career Results'}
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
                <Icon name="clipboard-list" className="w-8 h-8 mx-auto mb-2 text-white/40" />
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

        {/* ── Institutions Tab ─────────────────────────────────────────────── */}
        {tab === 'institutions' && (
          <div className="space-y-4">
            {/* Add institution */}
            <div className="rounded-2xl p-5" style={glass}>
              <p className="text-sm font-semibold text-white/70 mb-3">Add New Institution</p>
              <div className="flex gap-2">
                <GlassInput
                  placeholder="Institution name (e.g. Christ University)"
                  value={newInstName}
                  onChange={e => setNewInstName(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addInstitution()}
                  style={{ flex: 1 }}
                />
                <button
                  onClick={addInstitution}
                  disabled={instBusy.addInst || !newInstName.trim()}
                  className="px-5 py-2 rounded-xl font-bold text-sm text-white transition-all hover:brightness-110 disabled:opacity-40"
                  style={{ background: 'linear-gradient(135deg,#22c55e,#0d9488)', whiteSpace: 'nowrap' }}
                >
                  {instBusy.addInst ? 'Adding…' : '+ Add'}
                </button>
              </div>
            </div>

            {/* Institution list */}
            {instLoading ? (
              <div className="rounded-2xl p-8 text-center" style={glass}>
                <div className="w-6 h-6 border-2 border-green-400 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                <p className="text-white/40 text-sm">Loading…</p>
              </div>
            ) : instList.length === 0 ? (
              <div className="rounded-2xl p-10 text-center" style={glass}>
                <Icon name="building" className="w-8 h-8 mx-auto mb-2 text-white/40" />
                <p className="text-white/60 font-medium">No institutions yet</p>
                <p className="text-white/35 text-sm mt-1">Add one above to get started.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {instList.map(inst => {
                  const open = expandedInst === inst.id
                  return (
                    <div key={inst.id} className="rounded-2xl overflow-hidden" style={glass}>
                      {/* Institution header row */}
                      <div className="flex items-center gap-3 px-5 py-4">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                          style={{ background: 'rgba(74,222,128,0.15)', border: '1px solid rgba(74,222,128,0.3)' }}>
                          <Icon name="building" className="w-4 h-4 text-green-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-white">{inst.name}</p>
                          <p className="text-xs text-white/40">{inst.sections.length} section{inst.sections.length !== 1 ? 's' : ''}</p>
                        </div>
                        <button
                          onClick={() => setExpandedInst(open ? null : inst.id)}
                          className="text-sm font-medium text-green-400 hover:text-green-300 transition-colors px-2"
                        >
                          {open ? 'Collapse' : 'Manage'}
                        </button>
                        <button
                          onClick={() => deleteInstitution(inst.id)}
                          disabled={instBusy[`delInst-${inst.id}`]}
                          className="text-xs px-3 py-1.5 rounded-lg transition-colors disabled:opacity-40"
                          style={{ background: 'rgba(248,113,113,0.12)', color: '#f87171', border: '1px solid rgba(248,113,113,0.25)' }}
                        >
                          {instBusy[`delInst-${inst.id}`] ? '…' : 'Delete'}
                        </button>
                      </div>

                      {/* Expanded: sections list + add section */}
                      {open && (
                        <div className="px-5 pb-5 space-y-3" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                          <p className="text-xs font-semibold text-white/45 uppercase tracking-widest pt-3">Sections</p>

                          {inst.sections.length === 0 ? (
                            <p className="text-sm text-white/30 italic">No sections yet — add one below.</p>
                          ) : (
                            <div className="flex flex-wrap gap-2">
                              {inst.sections.map(sec => (
                                <div key={sec.id} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
                                  style={{ background: 'rgba(96,165,250,0.12)', border: '1px solid rgba(96,165,250,0.25)' }}>
                                  <span className="text-xs font-medium text-blue-300">{sec.name}</span>
                                  <button
                                    onClick={() => deleteSection(sec.id)}
                                    disabled={instBusy[`delSec-${sec.id}`]}
                                    className="text-blue-300/50 hover:text-red-400 transition-colors disabled:opacity-40 ml-0.5"
                                    title="Remove section"
                                  >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12"/>
                                    </svg>
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Add section inline */}
                          <div className="flex gap-2 pt-1">
                            <GlassInput
                              placeholder="New section name (e.g. 3rd Year)"
                              value={newSecName[inst.id] || ''}
                              onChange={e => setNewSecName(n => ({ ...n, [inst.id]: e.target.value }))}
                              onKeyDown={e => e.key === 'Enter' && addSection(inst.id)}
                              style={{ flex: 1 }}
                            />
                            <button
                              onClick={() => addSection(inst.id)}
                              disabled={instBusy[`addSec-${inst.id}`] || !(newSecName[inst.id] || '').trim()}
                              className="px-4 py-2 rounded-xl font-bold text-sm text-white transition-all hover:brightness-110 disabled:opacity-40"
                              style={{ background: 'linear-gradient(135deg,#22c55e,#0d9488)', whiteSpace: 'nowrap' }}
                            >
                              {instBusy[`addSec-${inst.id}`] ? '…' : '+ Section'}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
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
                            {q.safety_question && <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(248,113,113,0.15)', color: '#f87171' }}><Icon name="alert-triangle" className="w-3 h-3" /> Safety</span>}
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
        {/* ── Members Tab ───────────────────────────────────────────────────── */}
        {tab === 'members' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <GlassInput
                placeholder="Search by name or email…"
                value={memberSearch}
                onChange={(e) => setMemberSearch(e.target.value)}
                style={{ maxWidth: 300 }}
              />
              <button onClick={loadMembers} className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
                style={{ background: 'rgba(74,222,128,0.15)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.3)' }}>
                Refresh
              </button>
            </div>
            {membersLoading ? (
              <div className="rounded-2xl p-10 text-center" style={glass}>
                <div className="w-7 h-7 border-2 border-green-400 border-t-transparent rounded-full animate-spin mx-auto" />
              </div>
            ) : members.length === 0 ? (
              <div className="rounded-2xl p-10 text-center" style={glass}>
                <p className="text-white/50">No members yet.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {members
                  .filter(m => !memberSearch || m.name.toLowerCase().includes(memberSearch.toLowerCase()) || m.email.toLowerCase().includes(memberSearch.toLowerCase()))
                  .map(m => (
                  <div key={m.id} className="rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center gap-3" style={glass}>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-white">{m.name}</p>
                        {m.status === 'approved'  && <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background:'rgba(74,222,128,0.15)', color:'#4ade80' }}>Active</span>}
                        {m.status === 'disabled'  && <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background:'rgba(248,113,113,0.15)', color:'#f87171' }}>Disabled</span>}
                        {m.status === 'declined'  && <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background:'rgba(251,191,36,0.15)', color:'#fbbf24' }}>Declined</span>}
                        {m.status === 'pending'   && <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background:'rgba(148,163,184,0.15)', color:'#94a3b8' }}>Pending</span>}
                      </div>
                      <p className="text-sm text-white/50">{m.email}</p>
                      <p className="text-xs text-white/35 mt-0.5">
                        {categoryLabel(m.category)}
                        {m.institution && <> &middot; {m.institution}</>}
                        &nbsp;&middot; Joined {fmt(m.created_at)}
                      </p>
                    </div>
                    <div className="flex gap-2 shrink-0 flex-wrap">
                      {m.status === 'disabled' ? (
                        <button onClick={() => enableMember(m.id)} disabled={busy[`enable-${m.id}`]}
                          className="px-3 py-1.5 rounded-xl text-xs font-medium transition-all disabled:opacity-50"
                          style={{ background:'rgba(74,222,128,0.15)', color:'#4ade80', border:'1px solid rgba(74,222,128,0.3)' }}>
                          {busy[`enable-${m.id}`] ? 'Enabling…' : 'Enable'}
                        </button>
                      ) : (
                        <button onClick={() => disableMember(m.id)} disabled={busy[`disable-${m.id}`]}
                          className="px-3 py-1.5 rounded-xl text-xs font-medium transition-all disabled:opacity-50"
                          style={{ background:'rgba(251,191,36,0.1)', color:'#fbbf24', border:'1px solid rgba(251,191,36,0.25)' }}>
                          {busy[`disable-${m.id}`] ? 'Disabling…' : 'Disable'}
                        </button>
                      )}
                      <button onClick={() => deleteUser(m.id)} disabled={busy[`del-user-${m.id}`]}
                        className="px-3 py-1.5 rounded-xl text-xs font-medium transition-all disabled:opacity-50"
                        style={{ background:'rgba(248,113,113,0.1)', color:'#f87171', border:'1px solid rgba(248,113,113,0.25)' }}>
                        {busy[`del-user-${m.id}`] ? 'Deleting…' : 'Delete'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Activity Logs Tab ──────────────────────────────────────────────── */}
        {tab === 'logs' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <GlassInput
                placeholder="Search by name or email…"
                value={logsSearch}
                onChange={(e) => setLogsSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && loadLogs(logsSearch)}
                style={{ maxWidth: 300 }}
              />
              <button onClick={() => loadLogs(logsSearch)}
                className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
                style={{ background:'rgba(74,222,128,0.15)', color:'#4ade80', border:'1px solid rgba(74,222,128,0.3)' }}>
                Search
              </button>
              {logsSearch && (
                <button onClick={() => { setLogsSearch(''); loadLogs('') }}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-white/50 transition-all"
                  style={{ background:'rgba(255,255,255,0.06)' }}>
                  Clear
                </button>
              )}
            </div>
            {logsLoading ? (
              <div className="rounded-2xl p-10 text-center" style={glass}>
                <div className="w-7 h-7 border-2 border-green-400 border-t-transparent rounded-full animate-spin mx-auto" />
              </div>
            ) : logs.length === 0 ? (
              <div className="rounded-2xl p-10 text-center" style={glass}>
                <p className="text-white/50">No activity logs yet.</p>
              </div>
            ) : (
              <div className="space-y-1.5">
                {logs.map(log => (
                  <div key={log.id} className="rounded-xl px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-2" style={glass}>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                        log.action === 'login'
                          ? 'bg-green-500/15 text-green-400'
                          : 'bg-orange-500/15 text-orange-400'
                      }`}>
                        {log.action === 'login' ? '→ Login' : '← Logout'}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-semibold text-white">{log.user_name}</span>
                      <span className="text-xs text-white/40 ml-2">{log.user_email}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-white/35 shrink-0">
                      {log.ip_address && <span>IP: {log.ip_address}</span>}
                      <span>{fmt(log.created_at)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Site Config Tab ────────────────────────────────────────────────── */}
        {tab === 'config' && (
          <div className="space-y-6 max-w-2xl">
            <p className="text-sm text-white/50">Edit homepage content without touching the code. Changes go live immediately after saving.</p>

            {/* Hero */}
            <div className="rounded-2xl p-5 space-y-4" style={glass}>
              <p className="text-xs font-bold text-white/60 uppercase tracking-widest">Hero Section</p>
              {[
                { key: 'powered_by',    label: 'Powered-by badge text',           rows: 1 },
                { key: 'hero_title',    label: 'Hero heading (line 1)',            rows: 1 },
                { key: 'hero_line2',    label: 'Hero heading (line 2 — gradient)', rows: 1 },
                { key: 'hero_subtitle', label: 'Hero subtitle paragraph',          rows: 3 },
              ].map(({ key, label, rows }) => (
                <div key={key} className="space-y-1.5">
                  <p className="text-xs font-semibold text-white/50 uppercase tracking-wide">{label}</p>
                  {rows === 1
                    ? <GlassInput value={configDraft[key] ?? ''} onChange={e => setConfigDraft(d => ({ ...d, [key]: e.target.value }))} />
                    : <GlassTextarea rows={rows} value={configDraft[key] ?? ''} onChange={e => setConfigDraft(d => ({ ...d, [key]: e.target.value }))} />}
                </div>
              ))}
            </div>

            {/* Logo */}
            <div className="rounded-2xl p-5 space-y-4" style={glass}>
              <p className="text-xs font-bold text-white/60 uppercase tracking-widest">Logo</p>
              {configDraft.logo_base64 && (
                <div className="flex items-center gap-4">
                  <img src={configDraft.logo_base64} alt="Current logo"
                    style={{ height: 48, maxWidth: 200, objectFit: 'contain', background: 'white', borderRadius: 8, padding: 6 }} />
                  <button onClick={() => setConfigDraft(d => ({ ...d, logo_base64: '' }))}
                    className="text-xs px-3 py-1.5 rounded-lg transition-colors"
                    style={{ background: 'rgba(248,113,113,0.12)', color: '#f87171', border: '1px solid rgba(248,113,113,0.25)' }}>
                    Remove Logo
                  </button>
                </div>
              )}
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-white/50 uppercase tracking-wide">Upload New Logo (JPG / PNG)</p>
                <input type="file" accept="image/*" onChange={handleLogoUpload}
                  className="text-white/60 text-sm file:mr-3 file:px-4 file:py-1.5 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:text-white file:cursor-pointer" />
                <p className="text-xs text-white/30">Stored as base64 in the database — persists across deploys. Keep under 500 KB. Leave empty to use the default Preflex logo.</p>
              </div>
            </div>

            {/* Payment QR */}
            <div className="rounded-2xl p-5 space-y-4" style={glass}>
              <p className="text-xs font-bold text-white/60 uppercase tracking-widest">Payment QR Code</p>
              <p className="text-xs text-white/35">Shown to users right after they submit an assessment. There's no automated payment — you confirm payment yourself (e.g. with your accountant) and mark it in the Assessments tab before releasing results.</p>
              {configDraft.payment_qr_base64 && (
                <div className="flex items-center gap-4">
                  <img src={configDraft.payment_qr_base64} alt="Current payment QR"
                    style={{ height: 120, width: 120, objectFit: 'contain', background: 'white', borderRadius: 8, padding: 6 }} />
                  <button onClick={() => setConfigDraft(d => ({ ...d, payment_qr_base64: '' }))}
                    className="text-xs px-3 py-1.5 rounded-lg transition-colors"
                    style={{ background: 'rgba(248,113,113,0.12)', color: '#f87171', border: '1px solid rgba(248,113,113,0.25)' }}>
                    Remove QR Code
                  </button>
                </div>
              )}
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-white/50 uppercase tracking-wide">Upload QR Code (JPG / PNG)</p>
                <input type="file" accept="image/*" onChange={handleQrUpload}
                  className="text-white/60 text-sm file:mr-3 file:px-4 file:py-1.5 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:text-white file:cursor-pointer" />
                <p className="text-xs text-white/30">Leave empty to hide the payment popup entirely.</p>
              </div>
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-white/50 uppercase tracking-wide">Payment Instructions (amount, UPI ID, notes)</p>
                <GlassTextarea rows={3} value={configDraft.payment_instructions ?? ''}
                  onChange={e => setConfigDraft(d => ({ ...d, payment_instructions: e.target.value }))} />
              </div>
            </div>

            {/* About section */}
            <div className="rounded-2xl p-5 space-y-4" style={glass}>
              <p className="text-xs font-bold text-white/60 uppercase tracking-widest">About Section</p>
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-white/50 uppercase tracking-wide">Heading</p>
                <GlassInput value={configDraft.about_title ?? ''} onChange={e => setConfigDraft(d => ({ ...d, about_title: e.target.value }))} />
              </div>
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-white/50 uppercase tracking-wide">Paragraph 1</p>
                <GlassTextarea rows={3} value={configDraft.about_p1 ?? ''} onChange={e => setConfigDraft(d => ({ ...d, about_p1: e.target.value }))} />
              </div>
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-white/50 uppercase tracking-wide">Paragraph 2</p>
                <GlassTextarea rows={3} value={configDraft.about_p2 ?? ''} onChange={e => setConfigDraft(d => ({ ...d, about_p2: e.target.value }))} />
              </div>
              <div className="space-y-3 pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                <p className="text-xs font-semibold text-white/50 uppercase tracking-wide">Mini-Cards (4 items)</p>
                {getAboutCards().map((card, i) => (
                  <div key={i} className="rounded-xl p-3 space-y-2"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <p className="text-xs text-white/35">Card {i + 1}</p>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <p className="text-xs text-white/30 mb-1">Icon</p>
                        <GlassInput value={card.icon ?? ''} onChange={e => updateAboutCard(i, 'icon', e.target.value)}
                          style={{ textAlign: 'center', fontSize: '1.2rem' }} />
                      </div>
                      <div>
                        <p className="text-xs text-white/30 mb-1">Label</p>
                        <GlassInput value={card.label ?? ''} onChange={e => updateAboutCard(i, 'label', e.target.value)} />
                      </div>
                      <div>
                        <p className="text-xs text-white/30 mb-1">Subtitle</p>
                        <GlassInput value={card.sub ?? ''} onChange={e => updateAboutCard(i, 'sub', e.target.value)} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Features section */}
            <div className="rounded-2xl p-5 space-y-4" style={glass}>
              <p className="text-xs font-bold text-white/60 uppercase tracking-widest">Features Section (6 Cards)</p>
              {getFeatCards().map((feat, i) => (
                <div key={i} className="rounded-xl p-3 space-y-2"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <p className="text-xs text-white/35">Feature {i + 1}</p>
                  <div className="grid grid-cols-5 gap-2">
                    <div>
                      <p className="text-xs text-white/30 mb-1">Icon</p>
                      <GlassInput value={feat.icon ?? ''} onChange={e => updateFeatCard(i, 'icon', e.target.value)}
                        style={{ textAlign: 'center', fontSize: '1.2rem' }} />
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs text-white/30 mb-1">Title</p>
                      <GlassInput value={feat.title ?? ''} onChange={e => updateFeatCard(i, 'title', e.target.value)} />
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs text-white/30 mb-1">Description</p>
                      <GlassInput value={feat.desc ?? ''} onChange={e => updateFeatCard(i, 'desc', e.target.value)} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Institution section */}
            <div className="rounded-2xl p-5 space-y-4" style={glass}>
              <p className="text-xs font-bold text-white/60 uppercase tracking-widest">Institution Section</p>
              {[
                { key: 'institution_title', label: 'Section Title', rows: 1 },
                { key: 'institution_desc',  label: 'Description',   rows: 3 },
                { key: 'contact_email',     label: 'Contact Email', rows: 1 },
                { key: 'contact_phone',     label: 'Contact Phone', rows: 1 },
              ].map(({ key, label, rows }) => (
                <div key={key} className="space-y-1.5">
                  <p className="text-xs font-semibold text-white/50 uppercase tracking-wide">{label}</p>
                  {rows === 1
                    ? <GlassInput value={configDraft[key] ?? ''} onChange={e => setConfigDraft(d => ({ ...d, [key]: e.target.value }))} />
                    : <GlassTextarea rows={rows} value={configDraft[key] ?? ''} onChange={e => setConfigDraft(d => ({ ...d, [key]: e.target.value }))} />}
                </div>
              ))}
            </div>

            <button onClick={saveConfig} disabled={configBusy}
              className="px-6 py-3 rounded-xl font-bold text-sm text-white transition-all hover:brightness-110 disabled:opacity-50"
              style={{ background:'linear-gradient(135deg,#22c55e,#0d9488)' }}>
              {configBusy ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        )}

      </main>
      <Footer />
    </div>
  )
}
