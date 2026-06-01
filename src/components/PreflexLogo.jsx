import logo from '../pages/preflex-logo-1.jpg'

export default function PreflexLogo({ size = 38 }) {
  return <img src={logo} alt="Preflex Solutions" width={size} height={size} style={{ objectFit: 'contain' }} />
}
