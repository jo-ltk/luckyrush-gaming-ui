'use client'

import { useCallback, useEffect, useId, useRef, useState } from 'react'
import Image from 'next/image'

type SymbolId = 'crown' | 'diamond' | 'gift' | 'seven' | 'star' | 'coin' | 'chest' | 'clover'
const SYMBOLS: SymbolId[] = ['crown', 'diamond', 'gift', 'seven', 'star', 'coin', 'chest', 'clover']

const REWARDS: Record<SymbolId, string> = {
  crown: '+250,000 GC',
  diamond: '+1,200 SC',
  gift: '+25,000 GC',
  seven: '+75,000 GC',
  star: '+10,000 GC',
  coin: '+5,000 GC',
  chest: '+50,000 GC',
  clover: '+500 SC',
}

const WIN_CHANCE = 0.22
const BASE_MS = 1900
const STAGGER_MS = 500
const VISIBLE = 5

const RECENT_WINS = [
  { name: 'PlayfulTiger', amt: '+250,000 GC', color: 'text-yellow-300', time: '2 min ago', avatar: '/win-playful-tiger.png' },
  { name: 'LuckyStar88', amt: '+1,200 SC', color: 'text-green-400', time: '5 min ago', avatar: '/win-lucky-star.png' },
  { name: 'SpinMaster', amt: '+75,000 GC', color: 'text-yellow-300', time: '8 min ago', avatar: '/win-spin-master.png' },
  { name: 'QueenBee', amt: '+500 SC', color: 'text-green-400', time: '12 min ago', avatar: '/win-queen-bee.png' },
  { name: 'GameKing', amt: '+320,000 GC', color: 'text-yellow-300', time: '15 min ago', avatar: '/win-game-king.png' },
]

const rand = () => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]

function rollResult(): SymbolId[] {
  if (Math.random() < WIN_CHANCE) {
    const s = rand()
    return [s, s, s]
  }
  const r = [rand(), rand(), rand()]
  if (r[0] === r[1] && r[1] === r[2]) r[2] = SYMBOLS[(SYMBOLS.indexOf(r[2]) + 1) % SYMBOLS.length]
  return r
}

function buildStrip(tail: SymbolId[], final: SymbolId, i: number): SymbolId[] {
  const filler = Array.from({ length: 16 + i * 7 }, rand)
  return [...tail, ...filler, rand(), rand(), final, rand(), rand()]
}

function Gem({ id, className = '', uid }: { id: SymbolId; className?: string; uid: string }) {
  const g = (k: string) => `${uid}-${id}-${k}`
  const u = (k: string) => `url(#${g(k)})`
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <linearGradient id={g('gold')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFEF9A" />
          <stop offset="1" stopColor="#D98E12" />
        </linearGradient>
        <linearGradient id={g('purple')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#E58BFF" />
          <stop offset="1" stopColor="#6A2BFF" />
        </linearGradient>
        <linearGradient id={g('red')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FF6A5A" />
          <stop offset="1" stopColor="#B5101F" />
        </linearGradient>
        <linearGradient id={g('green')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7CFF6B" />
          <stop offset="1" stopColor="#12902A" />
        </linearGradient>
        <linearGradient id={g('blue')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7DC8FF" />
          <stop offset="1" stopColor="#2A3BFF" />
        </linearGradient>
        <linearGradient id={g('wood')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#C0713A" />
          <stop offset="1" stopColor="#6B3414" />
        </linearGradient>
      </defs>
      {id === 'crown' && (
        <g strokeLinejoin="round">
          <path d="M7 46 L10 18 L23 31 L32 12 L41 31 L54 18 L57 46 Z" fill={u('gold')} stroke="#FFF6C2" strokeWidth="1.5" />
          <rect x="7" y="46" width="50" height="9" rx="3" fill={u('gold')} stroke="#FFF6C2" strokeWidth="1.5" />
          <circle cx="32" cy="38" r="4.5" fill="#E8142E" stroke="#FFC4C4" />
          <circle cx="10" cy="17" r="3" fill="#FFE27A" />
          <circle cx="32" cy="11" r="3" fill="#FFE27A" />
          <circle cx="54" cy="17" r="3" fill="#FFE27A" />
        </g>
      )}
      {id === 'diamond' && (
        <g strokeLinejoin="round">
          <path d="M16 12 H48 L59 26 L32 57 L5 26 Z" fill={u('purple')} stroke="#F3D4FF" strokeWidth="1.5" />
          <path d="M5 26 H59 M22 26 L32 57 L42 26 L36 12 M28 12 L22 26" fill="none" stroke="#fff" strokeOpacity=".65" strokeWidth="1.2" />
        </g>
      )}
      {id === 'gift' && (
        <g>
          <rect x="10" y="28" width="44" height="27" rx="3" fill={u('red')} stroke="#FFB0A8" strokeWidth="1.2" />
          <rect x="7" y="20" width="50" height="11" rx="3" fill={u('red')} stroke="#FFB0A8" strokeWidth="1.2" />
          <rect x="28" y="20" width="8" height="35" fill={u('gold')} />
          <path d="M32 20 C20 4 8 14 26 20 Z M32 20 C44 4 56 14 38 20 Z" fill={u('gold')} />
        </g>
      )}
      {id === 'seven' && (
        <>
          <path d="M13 14 H51 L30 52" fill="none" stroke="#FFD9A0" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13 14 H51 L30 52" fill="none" stroke={u('red')} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
      {id === 'star' && (
        <path d="M32 5 L40 24 L60 25 L44 38 L49 58 L32 46 L15 58 L20 38 L4 25 L24 24 Z" fill={u('blue')} stroke="#CFE6FF" strokeWidth="1.8" strokeLinejoin="round" />
      )}
      {id === 'coin' && (
        <g>
          <circle cx="32" cy="32" r="27" fill={u('gold')} stroke="#FFF6C2" strokeWidth="2" />
          <circle cx="32" cy="32" r="20" fill="none" stroke="#A8680B" strokeOpacity=".7" strokeWidth="2" />
          <path d="M20 40 L22 28 L28 34 L32 24 L36 34 L42 28 L44 40 Z" fill="#FFF3B0" />
        </g>
      )}
      {id === 'chest' && (
        <g strokeLinejoin="round">
          <path d="M8 30 C8 14 56 14 56 30 Z" fill={u('wood')} stroke="#FFD27A" strokeWidth="1.5" />
          <rect x="8" y="30" width="48" height="25" rx="3" fill={u('wood')} stroke="#FFD27A" strokeWidth="1.5" />
          <rect x="8" y="28" width="48" height="5" fill={u('gold')} />
          <rect x="27" y="29" width="10" height="12" rx="2" fill={u('gold')} stroke="#FFF6C2" />
        </g>
      )}
      {id === 'clover' && (
        <g fill={u('green')} stroke="#C8FFC0" strokeWidth="1.2">
          <circle cx="23" cy="23" r="12" />
          <circle cx="41" cy="23" r="12" />
          <circle cx="23" cy="39" r="12" />
          <circle cx="41" cy="39" r="12" />
          <path d="M32 40 Q34 52 44 58" fill="none" stroke="#12902A" strokeWidth="4" strokeLinecap="round" />
        </g>
      )}
    </svg>
  )
}

type Particle = { id: number; x: number; y: number; color: string; size: number }
const PCOL = ['#FFD84D', '#FF4DD8', '#8A5BFF', '#4DB8FF']

export function LuckyMatchGame({ className = '' }: { className?: string }) {
  const uid = useId().replace(/:/g, '')
  const [strips, setStrips] = useState<SymbolId[][]>(() =>
    [0, 1, 2].map((i) => Array.from({ length: VISIBLE }, (_, k) => SYMBOLS[(i * 3 + k * 2) % SYMBOLS.length])),
  )
  const [running, setRunning] = useState([false, false, false])
  const [moving, setMoving] = useState([false, false, false])
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState<'win' | 'lose' | null>(null)
  const [reward, setReward] = useState<string | null>(null)
  const [particles, setParticles] = useState<Particle[]>([])
  const timers = useRef<number[]>([])
  useEffect(() => () => timers.current.forEach(window.clearTimeout), [])

  const spin = useCallback(() => {
    if (spinning) return
    setSpinning(true)
    setResult(null)
    setReward(null)
    setParticles([])
    const final = rollResult()
    setStrips((p) => p.map((s, i) => buildStrip(s.slice(-VISIBLE), final[i], i)))
    setRunning([false, false, false])
    setMoving([true, true, true])
    requestAnimationFrame(() => requestAnimationFrame(() => setRunning([true, true, true])))

    final.forEach((_, i) => {
      timers.current.push(
        window.setTimeout(() => {
          setMoving((m) => m.map((v, k) => (k === i ? false : v)))
          timers.current.push(
            window.setTimeout(() => {
              setRunning((r) => r.map((v, k) => (k === i ? false : v)))
              setStrips((p) => p.map((s, k) => (k === i ? s.slice(-VISIBLE) : s)))
            }, 450),
          )
          if (i === 2) {
            timers.current.push(
              window.setTimeout(() => {
                const win = final[0] === final[1] && final[1] === final[2]
                setResult(win ? 'win' : 'lose')
                if (win) {
                  setReward(REWARDS[final[0]])
                  setParticles(
                    Array.from({ length: 30 }, (_, id) => {
                      const a = (id / 30) * Math.PI * 2 + Math.random() * 0.4
                      const d = 80 + Math.random() * 110
                      return { id, x: Math.cos(a) * d, y: Math.sin(a) * d, color: PCOL[id % 4], size: 4 + Math.random() * 5 }
                    }),
                  )
                }
                setSpinning(false)
              }, 480),
            )
          }
        }, BASE_MS + i * STAGGER_MS),
      )
    })
  }, [spinning])

  const win = result === 'win'

  return (
    <section className={`flex h-full min-h-0 w-full flex-col ${className}`.trim()} aria-label="Lucky Match mini-game">
      <div className="relative w-full shrink-0" style={{ aspectRatio: '1065 / 1477' }}>
        <div
          className="absolute overflow-hidden rounded-[12%]"
          style={{ left: '15.4%', width: '69.3%', top: '30.1%', height: '40.6%' }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0630] via-[#120A3A] to-[#070419]" />
          <div className="relative flex h-full gap-[4%]">
            {strips.map((strip, i) => {
              const n = strip.length
              const shift = running[i] ? -((n - VISIBLE) / n) * 100 : 0
              return (
                <div
                  key={i}
                  className="relative min-w-0 flex-1 overflow-hidden rounded-[10%] border border-indigo-400/25 bg-[#0A0524] shadow-[inset_0_0_12px_rgba(0,0,0,0.75)]"
                >
                  <div
                    className={`will-change-transform ${moving[i] ? 'blur-[1px]' : ''}`}
                    style={{
                      height: `${(n / VISIBLE) * 100}%`,
                      transform: `translateY(${shift}%)`,
                      transition: running[i]
                        ? `transform ${BASE_MS + i * STAGGER_MS}ms cubic-bezier(0.15, 0.85, 0.3, 1.04)`
                        : 'none',
                    }}
                  >
                    {strip.map((s, k) => (
                      <div key={k} className="flex items-center justify-center" style={{ height: `${100 / n}%` }}>
                        <Gem
                          id={s}
                          uid={`${uid}-${i}-${k}`}
                          className={`h-[78%] w-[78%] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] transition-transform duration-500 ${
                            win && !running[i] && k === 2 ? 'scale-125' : ''
                          }`}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,3,20,0.85),transparent_28%,transparent_72%,rgba(5,3,20,0.85)),linear-gradient(to_right,rgba(0,0,0,0.45),transparent_25%,transparent_75%,rgba(0,0,0,0.45))]" />
                </div>
              )
            })}
          </div>

          <div
            className={`pointer-events-none absolute inset-x-[1%] top-[40%] h-[20%] rounded-md border-2 ${
              win
                ? 'animate-pulse border-yellow-200 bg-yellow-300/20 shadow-[0_0_18px_rgba(255,210,60,1),inset_0_0_12px_rgba(255,210,60,0.7)]'
                : 'border-yellow-400/80 bg-yellow-400/5 shadow-[0_0_12px_rgba(255,170,30,0.55),inset_0_0_10px_rgba(255,170,30,0.35)]'
            }`}
          />

          {particles.map((p) => (
            <span
              key={p.id}
              className="lm-particle pointer-events-none absolute left-1/2 top-1/2 z-30 rounded-full"
              style={{
                width: p.size,
                height: p.size,
                background: p.color,
                boxShadow: `0 0 8px ${p.color}`,
                ['--x' as string]: `${p.x}px`,
                ['--y' as string]: `${p.y}px`,
              }}
            />
          ))}

          <div className="pointer-events-none absolute inset-x-0 top-[4%] z-20 text-center" aria-live="polite">
            {win && (
              <div className="lm-rise">
                <div className="text-[8px] font-bold tracking-[0.22em] text-fuchsia-200 drop-shadow-[0_1px_6px_rgba(0,0,0,.8)]">
                  MATCHED 3!
                </div>
                <div className="bg-gradient-to-b from-yellow-100 to-yellow-400 bg-clip-text text-[13px] font-bold text-transparent drop-shadow-[0_0_10px_rgba(255,216,77,0.7)]">
                  {reward}
                </div>
              </div>
            )}
            {result === 'lose' && (
              <div className="lm-rise text-[11px] font-bold text-white/70 drop-shadow-[0_1px_6px_rgba(0,0,0,.8)]">
                Try Again
              </div>
            )}
          </div>
        </div>

        <Image
          src="/lucky-match-neon-slot-frame.png"
          alt="Lucky Match"
          fill
          className="pointer-events-none z-10 object-contain"
          sizes="292px"
          priority={false}
        />

        <button
          type="button"
          onClick={spin}
          disabled={spinning}
          aria-label="Spin Lucky Match"
          className="absolute z-20 cursor-pointer rounded-full disabled:cursor-not-allowed"
          style={{ left: '22.5%', width: '55%', top: '78.8%', height: '9.2%' }}
        />
      </div>

      <div className="relative z-20 mx-[2%] -mt-[16%] mb-0 flex min-h-0 flex-1 flex-col rounded-[18px] border border-indigo-400/45 bg-[#0A0624]/95 p-2.5 shadow-[0_8px_28px_rgba(0,0,0,0.45),0_0_18px_rgba(110,60,255,0.18)]">
        <div className="mb-2 flex items-center justify-between px-0.5">
          <div className="flex items-center gap-1.5 text-[12px] font-bold tracking-wide text-[#F0C14B]">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
              <path d="M7 3h10v3h3v2a4 4 0 0 1-4 4h-.4A5 5 0 0 1 13 14.9V17h3v3H8v-3h3v-2.1A5 5 0 0 1 8.4 12H8a4 4 0 0 1-4-4V6h3V3Zm-1 5a2 2 0 0 0 1 1.7V8H6Zm12 0h-1v1.7A2 2 0 0 0 18 8Z" />
            </svg>
            RECENT WINS
          </div>
          <button type="button" className="text-[11px] font-bold text-[#C44BFF] hover:text-[#E678FF]">
            View All ›
          </button>
        </div>
        <ul className="flex min-h-0 flex-1 flex-col justify-evenly gap-1.5">
          {RECENT_WINS.map((w) => (
            <li
              key={w.name}
              className="flex items-center gap-2 rounded-[12px] border border-white/[0.07] bg-white/[0.035] px-2 py-1.5"
            >
              <span className="relative size-8 shrink-0 overflow-hidden rounded-lg">
                <Image src={w.avatar} alt="" fill className="object-cover" />
              </span>
              <span className="min-w-0 flex-1 truncate text-left text-[12px] font-normal text-white/90">{w.name}</span>
              <span className="shrink-0 text-right">
                <span className={`block text-[12px] font-bold leading-tight ${w.color}`}>{w.amt}</span>
                <span className="mt-0.5 block text-[10px] font-normal leading-tight text-white/40">{w.time}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        @keyframes lm-burst {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          100% { transform: translate(calc(-50% + var(--x)), calc(-50% + var(--y))) scale(0.2); opacity: 0; }
        }
        .lm-particle { animation: lm-burst 1.1s ease-out forwards; }
        @keyframes lm-rise { from { transform: translateY(10px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .lm-rise { animation: lm-rise .5s ease-out both; }
        @media (prefers-reduced-motion: reduce) { .lm-particle, .lm-rise { animation-duration: .01s; } }
      `}</style>
    </section>
  )
}
