'use client'

import Image from 'next/image'
import { Home, Plus, Search } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Lobby', href: '#lobby', active: true },
  { label: 'Slots', href: '#slots' },
  { label: 'Live Casino', href: '#live-casino' },
  { label: 'Jackpot', href: '#jackpot' },
  { label: 'Promotions', href: '#promotions' },
] as const

export function LuckyRushLogo({
  className,
  height = 52,
}: {
  className?: string
  height?: number
}) {
  const width = Math.round((2158 / 729) * height)

  return (
    <a
      href="#lobby"
      aria-label="LuckyRush home"
      className={cn('relative flex shrink-0 items-center', className)}
    >
      <Image
        src="/luckyrush-logo.png"
        alt="LuckyRush"
        width={width}
        height={height}
        className="h-full w-auto object-contain object-left"
        priority
      />
    </a>
  )
}

function BalanceWidget({
  type,
  amount,
  coinClassName,
  borderClassName,
}: {
  type: 'GC' | 'SC'
  amount: string
  coinClassName: string
  borderClassName: string
}) {
  return (
    <div
      className={cn(
        'flex h-[48px] w-[158px] shrink-0 items-center gap-2 rounded-[14px] bg-[#0B0A1F]/95 pl-2.5 pr-2',
        borderClassName,
      )}
    >
      <div
        className={cn(
          'flex size-[30px] shrink-0 items-center justify-center rounded-full text-[10px] font-black tracking-tight shadow-[inset_0_1px_0_rgba(255,255,255,.35)]',
          coinClassName,
        )}
      >
        {type}
      </div>
      <span className="min-w-0 flex-1 truncate text-[14px] font-semibold tracking-tight text-white">
        {type} {amount}
      </span>
      <button
        type="button"
        aria-label={`Add ${type}`}
        className="flex size-[28px] shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-[#FFE566] to-[#F0B429] text-[#1a1200] shadow-[0_0_10px_rgba(240,180,41,.35)] transition hover:brightness-110 active:scale-95"
      >
        <Plus className="size-3.5 stroke-[3]" />
      </button>
    </div>
  )
}

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-30 h-[76px] border-b border-white/[0.08] bg-[#07061A]/92 backdrop-blur-md">
      <div className="flex h-full w-full items-center gap-3 px-6 xl:gap-4 xl:px-7">
        <LuckyRushLogo className="h-[52px] w-[154px]" />

        <nav aria-label="Primary" className="flex shrink-0 items-center gap-1">
          {navItems.map((item) =>
            item.active ? (
              <a
                key={item.label}
                href={item.href}
                className="inline-flex h-[50px] w-[128px] items-center justify-center gap-2 rounded-[14px] bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#6D28D9] text-[14px] font-semibold text-white shadow-[0_0_20px_rgba(139,92,246,.42)] transition hover:brightness-110"
              >
                <Home className="size-[16px] shrink-0" strokeWidth={2.25} />
                {item.label}
              </a>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="inline-flex h-[50px] items-center px-3 text-[14px] font-semibold text-white/90 transition-colors duration-200 hover:text-white"
              >
                {item.label}
              </a>
            ),
          )}
        </nav>

        <div className="min-w-2 flex-1" aria-hidden />

        <div className="flex shrink-0 items-center gap-2.5">
          <label className="relative flex h-[48px] w-[280px] items-center">
            <Search
              className="pointer-events-none absolute left-3.5 size-[16px] text-slate-400"
              strokeWidth={2}
            />
            <input
              type="search"
              aria-label="Search games"
              placeholder="Search games, providers..."
              className="h-full w-full rounded-[14px] border border-[#4C3F8A]/55 bg-[#0A0A1F] py-0 pr-4 pl-10 text-[14px] text-white outline-none placeholder:text-slate-500 transition-[box-shadow,border-color] focus:border-violet-400/60 focus:shadow-[0_0_0_3px_rgba(139,92,246,.18)]"
            />
          </label>

          <BalanceWidget
            type="GC"
            amount="25,600"
            borderClassName="border border-amber-400/25"
            coinClassName="bg-gradient-to-b from-[#FFE566] via-[#F5C518] to-[#D4A017] text-[#1a1200]"
          />
          <BalanceWidget
            type="SC"
            amount="12.50"
            borderClassName="border border-emerald-400/25"
            coinClassName="bg-gradient-to-b from-[#6EE7A8] via-[#22C55E] to-[#15803D] text-white"
          />

          <a
            href="#login"
            className="inline-flex h-[48px] w-[110px] items-center justify-center rounded-[14px] border border-violet-300/35 bg-transparent text-[14px] font-semibold text-white transition hover:border-violet-300/55 hover:bg-white/[0.04]"
          >
            Login
          </a>
          <a
            href="#join"
            className="inline-flex h-[50px] w-[145px] items-center justify-center rounded-[14px] bg-gradient-to-r from-[#EC4899] via-[#D946EF] to-[#C026D3] text-[14px] font-bold text-white shadow-[0_0_20px_rgba(236,72,153,.42)] transition hover:brightness-110"
          >
            Join Now
          </a>
        </div>
      </div>
    </header>
  )
}
