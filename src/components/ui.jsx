import React from 'react'
import { Lightbulb, AlertTriangle, XCircle, Zap } from 'lucide-react'

// Paleta: jasny motyw biel/szarość, akcent butelkowa zieleń; czerwień tylko dla pułapek/błędów
export const AMBER = 'var(--c-1a5c46)'
export const AMBER_SOFT = 'var(--c-14543e)'
export const RED = 'var(--c-c03538)'

// CSS `uppercase` zmienia znaczenie jednostek i symboli: mA → MA (megaamper), mΩ → MΩ (megaom), ms → MS,
// kV → KV, IΔn → IΔN, gG → GG. keepCase() owija takie fragmenty w <span class="normal-case">: napis zostaje
// w wersalikach, a jednostki i symbole – zapisane poprawnie. Działa na tekście, tablicach i prostych elementach.
const UNITS_AFTER_NUMBER = 'mA|kA|µA|ms|µs|mΩ|kΩ|mV|kV|kW|kVA|kWh|mm|cm|km|Hz|min|m|s|h'
const UNITS_ALONE = 'mA|kA|ms|mΩ|kΩ|mV|kV|kW|kVA|kWh|mm|Hz'
const CASE_RE = new RegExp(
  `((?<=\\d\\s?)(?:${UNITS_AFTER_NUMBER})(?![\\p{L}\\d])` +
    `|(?<=^|[\\s(/])(?:${UNITS_ALONE})(?![\\p{L}\\d])` +
    `|IΔn|(?<![\\p{L}])(?:In|Ia|Ik|Iz|Zs|gG|aM|nN)(?![\\p{L}\\d])|cos ?φ)`,
  'u',
)

export function keepCase(node) {
  if (typeof node === 'string') {
    const parts = node.split(CASE_RE)
    if (parts.length === 1) return node
    // jeden <span> na całość: w kontenerach flex (przyciski, tytuły ramek) tekst zostaje jednym elementem i nie traci spacji
    return <span>{parts.map((p, i) => (i % 2 ? <span key={i} className="normal-case">{p}</span> : p))}</span>
  }
  if (Array.isArray(node)) return node.map((n, i) => <React.Fragment key={i}>{keepCase(n)}</React.Fragment>)
  if (React.isValidElement(node) && (typeof node.type === 'string' || node.type === React.Fragment) && node.props.children != null) {
    return React.cloneElement(node, undefined, keepCase(node.props.children))
  }
  return node
}

// Dwuwarstwowy chamfer: ostra 1px ramka na ściętym kształcie, bez filtra (bezpieczne dla animacji wewnątrz).
export function Chamfer({ edge = 'var(--edge)', bg = 'var(--c-ffffff)', size = 'lg', className = '', style, children, ...props }) {
  const c = size === 'lg' ? 'cham-lg' : size === 'sm' ? 'cham-sm' : 'cham'
  return (
    <div className={c} style={{ background: edge, ...style }} {...props}>
      <div className={`${c} ${className}`} style={{ background: bg, margin: '1px' }}>
        {children}
      </div>
    </div>
  )
}

export function Button({ children, className = '', variant = 'primary', disabled = false, ...props }) {
  const v =
    variant === 'secondary'
      ? { cls: 'bg-[color:var(--b-f3f6f4)] text-gray-800 hover:bg-[color:var(--b-e8edea)]', e: 'var(--c-b9c4bd)' }
      : variant === 'danger'
      ? { cls: 'bg-[color:var(--b-b3261e)] text-white hover:bg-[color:var(--b-c8423c)]', e: 'var(--c-8f1d17)' }
      : { cls: 'bg-[color:var(--b-1a5c46)] text-white hover:bg-[color:var(--b-21745a)]', e: 'var(--c-0f4030)' }

  return (
    <button
      disabled={disabled}
      style={{ '--e': v.e }}
      className={`cham edge inline-flex items-center justify-center px-4 py-2 text-sm font-semibold uppercase tracking-[0.08em] transition disabled:cursor-not-allowed disabled:opacity-40 ${v.cls} ${className}`}
      {...props}
    >
      {keepCase(children)}
    </button>
  )
}

export function SectionFrame({ tag, title, subtitle, badge, children, accent = AMBER }) {
  return (
    <Chamfer size="lg">
      <section>
        <div className="flex items-stretch border-b border-[color:var(--c-e3e8e5)] bg-[color:var(--b-f3f6f4)]">
          <div className="w-1.5" style={{ background: accent }} />
          <div className="flex-1 px-4 py-3.5">
            <div className="flex items-center justify-between gap-4">
              {tag ? <div className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-gray-500">{keepCase(tag)}</div> : <div />}
              {badge ? <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--c-14543e)]">{keepCase(badge)}</div> : null}
            </div>
            <h2 className="mt-1.5 text-lg font-extrabold tracking-tight text-gray-900">{title}</h2>
            {subtitle ? <div className="mt-1 text-[13px] leading-5 text-gray-600">{subtitle}</div> : null}
          </div>
        </div>
        <div className="p-4">{children}</div>
      </section>
    </Chamfer>
  )
}

const BOX_STYLES = {
  remember: { border: 'var(--c-bcd4c8)', bg: 'var(--c-e7f0eb)', label: 'Zapamiętaj', color: 'var(--c-14543e)', Icon: Lightbulb },
  warning: { border: 'var(--c-ecd9a8)', bg: 'var(--c-fdf6e3)', label: 'Uwaga', color: 'var(--c-8a5a00)', Icon: AlertTriangle },
  mistake: { border: 'var(--c-e5b8b4)', bg: 'var(--c-fdf0ee)', label: 'Najczęstszy błąd', color: 'var(--c-b3261e)', Icon: XCircle },
  trap: { border: 'var(--c-e5b8b4)', bg: 'var(--c-fdf0ee)', label: 'Pułapka egzaminacyjna', color: 'var(--c-b3261e)', Icon: Zap },
}

export function NoteBox({ type = 'remember', title, children }) {
  const s = BOX_STYLES[type] ?? BOX_STYLES.remember
  const Icon = s.Icon
  return (
    <div className="cham edge px-3.5 py-3" style={{ '--e': s.border, background: s.bg }}>
      <div className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: s.color }}>
        <Icon className="h-3.5 w-3.5" /> {keepCase(title ?? s.label)}
      </div>
      <div className="mt-1.5 text-[13px] leading-6 text-gray-800">{children}</div>
    </div>
  )
}

export function ValueTile({ value, label, tone = 'amber' }) {
  const color = tone === 'red' ? 'var(--c-b3261e)' : 'var(--c-14543e)'
  return (
    <div className="cham edge bg-[color:var(--b-fafbfa)] px-3 py-2.5">
      <div className="font-mono text-xl font-extrabold tracking-tight" style={{ color }}>{value}</div>
      <div className="mt-1 text-[11px] leading-4 text-gray-600">{label}</div>
    </div>
  )
}

export function DataTable({ head, rows, caption }) {
  return (
    <div className="overflow-x-auto">
      {caption ? <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.16em] text-gray-500">{keepCase(caption)}</div> : null}
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h} className="border border-[color:var(--c-d7ded9)] bg-[color:var(--b-eef3f0)] px-3 py-2 text-left font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[color:var(--c-14543e)]">
                {keepCase(h)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j} className={`border border-[color:var(--c-e3e8e5)] bg-[color:var(--b-f6f8f7)] px-3 py-2 align-top leading-5 ${j === 0 ? 'font-mono font-medium text-[color:var(--c-14543e)]' : 'text-gray-700'}`}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function Tag({ children, tone = 'slate' }) {
  const map = {
    amber: { cls: 'bg-[color:var(--b-e7f0eb)] text-[color:var(--c-14543e)]', e: 'var(--c-bcd4c8)' },
    red: { cls: 'bg-[color:var(--b-fdf0ee)] text-[color:var(--c-b3261e)]', e: 'var(--c-e5b8b4)' },
    green: { cls: 'bg-[color:var(--b-e9f4ed)] text-[color:var(--c-1f7a4d)]', e: 'var(--c-9fcab1)' },
    slate: { cls: 'bg-[color:var(--b-fafbfa)] text-gray-600', e: 'var(--c-d7ded9)' },
  }
  const t = map[tone] ?? map.slate
  return (
    <span style={{ '--e': t.e }} className={`cham-sm edge inline-flex items-center px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.14em] ${t.cls}`}>
      {keepCase(children)}
    </span>
  )
}

export function ProgressBar({ value, max, tone = 'amber' }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0
  const color = tone === 'green' ? 'var(--c-1f7a4d)' : 'var(--c-1a5c46)'
  return (
    <div className="h-2 w-full border border-[color:var(--c-d7ded9)] bg-[color:var(--b-f6f8f7)]">
      <div className="h-full transition-all duration-500" style={{ width: `${pct}%`, background: color }} />
    </div>
  )
}
