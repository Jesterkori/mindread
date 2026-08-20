// Compact "pay to release your result" nudge shown on dashboards while a submission
// is unpaid and awaiting review. Renders nothing if no QR is configured in Site Config.
export default function PaymentReminder({ qr, note }) {
  if (!qr) return null

  return (
    <div className="rounded-xl p-3 mt-3" style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.25)' }}>
      <p className="text-xs font-semibold text-amber-300 mb-2">Payment pending — pay to release your result</p>
      <div className="flex items-start gap-3">
        <div className="rounded-lg p-1.5 shrink-0" style={{ background: 'white' }}>
          <img src={qr} alt="Payment QR code" style={{ width: 88, height: 88, objectFit: 'contain' }} />
        </div>
        {note && <p className="text-xs text-white/55 leading-relaxed whitespace-pre-line">{note}</p>}
      </div>
    </div>
  )
}
