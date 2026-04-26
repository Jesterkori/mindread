import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { CATEGORIES } from '../data/questions'

export default function CategorySelect() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleSelect(category) {
    navigate('/questionnaire', { state: { category } })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4 py-10">
      {/* Header */}
      <header className="max-w-2xl mx-auto flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm">
            <span className="text-xl">🧠</span>
          </div>
          <div>
            <p className="font-semibold text-slate-800 leading-tight">MindCheck</p>
            <p className="text-xs text-slate-500">Hello, {user?.name}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="text-sm text-slate-500 hover:text-red-500 transition-colors font-medium"
        >
          Sign out
        </button>
      </header>

      {/* Content */}
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">
            Who is this assessment for?
          </h1>
          <p className="text-slate-500">
            Select the category that best describes you. Each group has questions
            tailored to your life situation.
          </p>
        </div>

        {/* Instruction box */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl px-5 py-4 mb-8 text-sm text-blue-700 leading-relaxed">
          <strong>Instructions:</strong> Read each question and choose the answer that best
          describes how you have felt <strong>over the past two weeks</strong>. There are no right
          or wrong answers. Your responses are private and not stored on any server.
        </div>

        {/* Category cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleSelect(cat)}
              className={`text-left rounded-2xl border-2 ${cat.border} ${cat.bg} p-5
                         hover:shadow-md hover:-translate-y-0.5 active:scale-95
                         transition-all duration-200 group`}
            >
              <div className="flex items-start gap-4">
                <span className="text-4xl leading-none">{cat.icon}</span>
                <div>
                  <p className="font-semibold text-slate-800 text-base group-hover:text-blue-700 transition-colors">
                    {cat.label}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">{cat.ageRange}</p>
                  <p className="text-sm text-slate-600 mt-2 leading-snug">{cat.description}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center text-blue-600 text-sm font-medium">
                Start assessment
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-slate-400 mt-8 leading-relaxed">
          This assessment is for informational purposes only and does not constitute medical advice.
          If you are in crisis, please contact a healthcare professional or emergency services immediately.
        </p>
      </div>
    </div>
  )
}
