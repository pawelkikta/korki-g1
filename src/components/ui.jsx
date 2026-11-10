import React from 'react'
import { Lightbulb, AlertTriangle, XCircle, Zap, CheckCircle2, Check, Search } from 'lucide-react'

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

// Nagłówek ekranu – leży na „stole”, nie na kartce. Jeden na ekran.
export function PageHeader({ eyebrow, title, lead, meta, children }) {
  return (
    <header className="pt-1">
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
        <div className="min-w-0">
          {eyebrow ? <div className="eyebrow">{keepCase(eyebrow)}</div> : null}
          <h1 className="mt-1 font-slab text-[28px] font-bold leading-[1.15] tracking-[-0.015em] text-ink md:text-[34px]">{title}</h1>
        </div>
        {meta ? <div className="pb-1 text-[14px] font-semibold tabular-nums text-ink-2">{meta}</div> : null}
      </div>
      {lead ? <p className="mt-2.5 max-w-[68ch] font-serif text-[17.5px] leading-[1.55] text-ink-2">{lead}</p> : null}
      {children ? <div className="mt-4">{children}</div> : null}
    </header>
  )
}

// Kartka z nagłówkiem. accent – pasek z lewej tylko dla stanu (pułapka, zaliczone), nie jako ozdoba.
export function SectionFrame({ tag, title, subtitle, badge, children, accent, className = '' }) {
  return (
    <section className={`sheet relative z-[1] overflow-hidden ${className}`}>
      {accent ? <div className="absolute inset-y-0 left-0 w-1" style={{ background: accent }} /> : null}
      <div className="px-5 pb-4 pt-5 md:px-7 md:pt-6">
        {tag || badge ? (
          <div className="flex items-start justify-between gap-4">
            {tag ? <div className="eyebrow flex items-center gap-1.5">{keepCase(tag)}</div> : <div />}
            {badge ? (React.isValidElement(badge) ? badge : <Badge>{badge}</Badge>) : null}
          </div>
        ) : null}
        {title ? <h2 className={`${tag || badge ? 'mt-1.5' : ''} font-slab text-[21px] font-semibold leading-snug tracking-[-0.01em] text-ink md:text-[23px]`}>{title}</h2> : null}
        {subtitle ? <p className="mt-1.5 max-w-[70ch] font-serif text-[16px] leading-[1.55] text-ink-2">{subtitle}</p> : null}
      </div>
      {children != null ? <div className="border-t border-rule px-5 py-5 md:px-7 md:py-6">{children}</div> : null}
    </section>
  )
}

export function Badge({ children, tone = 'plain' }) {
  const cls = {
    plain: 'bg-paper-3 text-ink-2',
    ok: 'bg-ok-soft text-ok',
    red: 'bg-red-soft text-red-ink',
    accent: 'bg-accent-soft text-accent-ink',
  }[tone]
  return <span className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-0.5 text-[12.5px] font-semibold tabular-nums ${cls}`}>{children}</span>
}

const BOX_STYLES = {
  remember: { line: 'var(--accent)', bg: 'var(--accent-soft)', label: 'Zapamiętaj', color: 'var(--accent-ink)', Icon: Lightbulb },
  ok: { line: 'var(--ok)', bg: 'var(--ok-soft)', label: 'Dobrze', color: 'var(--ok)', Icon: CheckCircle2 },
  warning: { line: 'var(--warn)', bg: 'var(--warn-soft)', label: 'Uwaga', color: 'var(--warn)', Icon: AlertTriangle },
  mistake: { line: 'var(--red)', bg: 'var(--red-soft)', label: 'Najczęstszy błąd', color: 'var(--red)', Icon: XCircle },
  trap: { line: 'var(--red)', bg: 'var(--red-soft)', label: 'Pułapka egzaminacyjna', color: 'var(--red)', Icon: Zap },
}

// Notatka na marginesie: kolorowa kreska z lewej, etykieta, tekst do czytania.
export function NoteBox({ type = 'remember', title, children }) {
  const s = BOX_STYLES[type] ?? BOX_STYLES.remember
  const Icon = s.Icon
  return (
    <div className="rounded-r-[3px] border-l-[3px] px-4 py-3" style={{ borderColor: s.line, background: s.bg }}>
      <div className="eyebrow flex items-center gap-1.5" style={{ color: s.color }}>
        <Icon className="h-3.5 w-3.5 shrink-0" /> {keepCase(title ?? s.label)}
      </div>
      <div className="mt-1.5 font-serif text-[16px] leading-[1.6] text-ink">{children}</div>
    </div>
  )
}

export function Button({ children, className = '', variant = 'primary', disabled = false, ...props }) {
  const v =
    variant === 'secondary'
      ? 'bg-paper text-ink shadow-[inset_0_0_0_1px_var(--rule-2)] hover:bg-paper-2'
      : variant === 'danger'
      ? 'bg-red-ink text-white hover:brightness-110'
      : variant === 'ok'
      ? 'bg-ok text-white hover:brightness-110'
      : 'bg-accent text-white shadow-[0_1px_2px_rgba(30,40,90,0.25)] hover:bg-accent-hover'

  return (
    <button
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded-[4px] px-4 py-2.5 text-[14.5px] font-semibold leading-5 transition disabled:cursor-not-allowed disabled:opacity-40 ${v} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

// Liczba z podpisem. tone: ink (stan), red (do zapamiętania albo zły stan), ok (dobry stan).
export function ValueTile({ value, label, tone = 'ink' }) {
  const color = tone === 'red' ? 'var(--red)' : tone === 'ok' ? 'var(--ok)' : 'var(--ink)'
  return (
    <div className="rounded-[3px] bg-paper-2 px-3.5 py-3 shadow-[inset_0_0_0_1px_var(--rule)]">
      <div className="font-mono text-[21px] font-bold leading-tight tracking-tight tabular-nums" style={{ color }}>{value}</div>
      <div className="mt-1 text-[13px] leading-[1.35] text-ink-2">{label}</div>
    </div>
  )
}

export function DataTable({ head, rows, caption }) {
  return (
    <div className="overflow-x-auto">
      {caption ? <div className="eyebrow mb-2">{keepCase(caption)}</div> : null}
      <table className="w-full border-collapse text-[14.5px]">
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h} className="eyebrow border-b-2 border-ink/70 px-3 py-2 text-left !text-ink-2">
                {keepCase(h)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-rule">
              {r.map((c, j) => (
                <td key={j} className={`px-3 py-2.5 align-top leading-[1.5] ${j === 0 ? 'font-mono font-semibold text-ink' : 'text-ink-2'}`}>
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
  const cls = {
    amber: 'bg-accent-soft text-accent-ink',
    red: 'bg-red-soft text-red-ink',
    green: 'bg-ok-soft text-ok',
    slate: 'bg-paper-3 text-ink-2',
  }[tone] ?? 'bg-paper-3 text-ink-2'
  return <span className={`inline-flex items-center rounded-[3px] px-2 py-0.5 text-[12.5px] font-semibold ${cls}`}>{children}</span>
}

export function ProgressBar({ value, max, tone = 'amber' }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0
  const color = tone === 'green' ? 'var(--ok)' : 'var(--accent)'
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-paper-3 shadow-[inset_0_0_0_1px_var(--rule)]">
      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: color }} />
    </div>
  )
}

// Zakładki segregatora – zmieniają WIDOK. Stoją bezpośrednio nad kartką (SectionFrame albo .sheet z z-[1]):
// aktywna zakładka zlewa się z kartką, nieaktywne chowają się za nią.
// tabs: [{ id, label, kicker?, icon?, done? }]
export function FolderTabs({ tabs, value, onChange, label }) {
  return (
    <div role="tablist" aria-label={label} className="relative -mb-1 flex gap-1 overflow-x-auto px-1.5 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {tabs.map((t) => {
        const on = t.id === value
        const Icon = t.icon
        return (
          <button
            key={t.id}
            role="tab"
            aria-selected={on}
            onClick={() => onChange(t.id)}
            className={`relative shrink-0 rounded-t-[7px] px-4 pb-3 pt-2 text-left transition ${
              on
                ? 'z-[2] bg-paper text-ink shadow-[0_-2px_4px_rgba(60,48,20,0.07)]'
                : 'z-0 mt-1.5 bg-tab text-ink-2 hover:bg-[#ede4cc] hover:text-ink'
            }`}
          >
            {t.kicker ? <div className={`eyebrow ${on ? '!text-accent-ink' : ''}`}>{t.kicker}</div> : null}
            <div className="flex items-center gap-1.5 whitespace-nowrap text-[14.5px] font-semibold">
              {Icon ? <Icon className={`h-4 w-4 shrink-0 ${on ? 'text-accent' : ''}`} /> : null}
              {t.label}
              {t.done ? <Check className="h-3.5 w-3.5 shrink-0 text-ok" aria-label="zaliczone" /> : null}
            </div>
          </button>
        )
      })}
    </div>
  )
}

// Filtry – ZAWĘŻAJĄ listę. Małe „pigułki”, aktywna w kolorze atramentu. value === null → wszystkie.
export function FilterChips({ options, value, onChange, allLabel = 'Wszystkie' }) {
  const chip = (on) =>
    `rounded-full px-3 py-1 text-[13.5px] font-medium transition ${
      on ? 'bg-ink text-paper' : 'bg-paper-2 text-ink-2 shadow-[inset_0_0_0_1px_var(--rule-2)] hover:text-ink'
    }`
  return (
    <div className="flex flex-wrap gap-1.5" role="group">
      <button className={chip(value === null)} aria-pressed={value === null} onClick={() => onChange(null)}>{allLabel}</button>
      {options.map((o) => (
        <button key={o} className={chip(value === o)} aria-pressed={value === o} onClick={() => onChange(value === o ? null : o)}>
          {o}
        </button>
      ))}
    </div>
  )
}

// Przełącznik – WŁĄCZA/WYŁĄCZA opcję (np. losowa kolejność).
export function Switch({ checked, onChange, label, hint }) {
  return (
    <button role="switch" aria-checked={checked} onClick={() => onChange(!checked)} className="inline-flex items-center gap-2.5 text-left text-[14px] text-ink-2 hover:text-ink">
      <span className={`relative h-5 w-9 shrink-0 rounded-full transition ${checked ? 'bg-accent' : 'bg-rule-2'}`}>
        <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${checked ? 'left-[18px]' : 'left-0.5'}`} />
      </span>
      <span>
        <span className="font-semibold">{label}</span>
        {hint != null ? <span className="text-ink-3"> · {hint}</span> : null}
      </span>
    </button>
  )
}

// Wygląd odpowiedzi ABCD – wspólny dla „Sprawdź się” i testu ABCD.
export function optionClass(isAnswered, isCorrect, isPicked) {
  if (!isAnswered) return 'bg-paper text-ink shadow-[inset_0_0_0_1px_var(--rule-2)] hover:bg-paper-2 hover:shadow-[inset_0_0_0_1.5px_var(--accent)]'
  if (isCorrect) return 'bg-ok-soft text-ink shadow-[inset_0_0_0_1.5px_var(--ok)]'
  if (isPicked) return 'bg-red-soft text-ink shadow-[inset_0_0_0_1.5px_var(--red)]'
  return 'bg-paper text-ink-3 shadow-[inset_0_0_0_1px_var(--rule)]'
}

export function OptionLetter({ letter, isAnswered, isCorrect, isPicked }) {
  const tone = isAnswered && isCorrect ? 'bg-ok text-white' : isAnswered && isPicked ? 'bg-red-ink text-white' : 'bg-paper-3 text-ink-2'
  return <span className={`mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-bold ${tone}`}>{letter}</span>
}

// Pole wyszukiwania.
export function SearchField({ value, onChange, placeholder }) {
  return (
    <label className="flex min-w-[220px] flex-1 items-center gap-2 rounded-[4px] bg-paper px-3 py-2.5 shadow-[inset_0_0_0_1px_var(--rule-2)] focus-within:shadow-[inset_0_0_0_1.5px_var(--accent)]">
      <Search className="h-4 w-4 shrink-0 text-ink-3" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-[15px] text-ink outline-none placeholder:text-ink-3"
      />
    </label>
  )
}

// Skrót klawiszowy w podpowiedziach.
export function Kbd({ children }) {
  return <kbd className="rounded-[3px] bg-paper-3 px-1.5 py-px font-mono text-[11.5px] font-semibold text-ink-2 shadow-[inset_0_-1px_0_var(--rule-2)]">{children}</kbd>
}
