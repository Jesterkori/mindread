import { Link } from 'react-router-dom'
import PreflexLogo from './PreflexLogo'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-10 px-6 mt-auto">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 mb-6">
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <PreflexLogo size={32} />
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
            <a href="/"          className="block text-white/50 text-sm hover:text-white transition-colors">Home</a>
            <a href="/#about"    className="block text-white/50 text-sm hover:text-white transition-colors">About</a>
            <a href="/#features" className="block text-white/50 text-sm hover:text-white transition-colors">Features</a>
            <Link to="/register" className="block text-white/50 text-sm hover:text-white transition-colors">Register</Link>
            <Link to="/login"    className="block text-white/50 text-sm hover:text-white transition-colors">Sign In</Link>
          </div>
        </div>

        <div>
          <p className="font-semibold text-sm mb-3">Contact</p>
          <p className="text-white/50 text-sm mb-1">Preflex Solutions Pvt. Ltd.</p>
          <a href="https://www.preflexsol.com" target="_blank" rel="noreferrer"
             className="text-green-400 text-sm hover:text-green-300 transition-colors block mb-1">
            www.preflexsol.com
          </a>
          <a href="mailto:support@preflexsol.com"
             className="text-white/50 text-sm hover:text-white transition-colors block">
            support@preflexsol.com
          </a>
          <a href="tel:+919886629446"
             className="text-white/50 text-sm hover:text-white transition-colors block">
            +91 98866 29446
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto border-t border-white/10 pt-5 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-white/40 text-xs">© 2026 Preflex Solutions Pvt. Ltd. All rights reserved.</p>
        <p className="text-white/40 text-xs">MindCheck — Mental Wellness Assessment Tool</p>
      </div>
    </footer>
  )
}
