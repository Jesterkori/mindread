import logo from '../pages/preflex-logo-1.jpg'

export default function PreflexLogo({ height = 38 }) {
  return <img src={logo} alt="Preflex Solutions" height={height} style={{ height, width: 'auto', objectFit: 'contain', display: 'block' }} />
}
