'use client'

import Image from 'next/image'
import { Home, Plus, Search } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Lobby', href: '#lobby', active: true },
  { label: 'Slots', href: '#slots', active: false },
  { label: 'Live Casino', href: '#live-casino', active: false },
  { label: 'Jackpot', href: '#jackpot', active: false },
  { label: 'Promotions', href: '#promotions', active: false },
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
        `
        group
        flex
        h-[46px]
        w-[145px]
        shrink-0
        items-center
        gap-2
        rounded-[13px]
        bg-[#0C0A20]
        px-2
        transition-all
        duration-300
        `,
        borderClassName,
        'hover:border-violet-400/40 hover:bg-[#100D28]'
      )}
    >
      {/* Coin */}
      <div
        className={cn(
          `
          flex
          size-[29px]
          shrink-0
          items-center
          justify-center
          rounded-full
          text-[9px]
          font-black
          tracking-tight
          shadow-[inset_0_1px_1px_rgba(255,255,255,.45)]
          `,
          coinClassName
        )}
      >
        {type}
      </div>

      {/* Balance */}
      <span className="min-w-0 flex-1 truncate text-[13px] font-semibold text-[#E8E5F2]">
        {amount}
      </span>

      {/* Plus */}
      <button
        type="button"
        aria-label={`Add ${type}`}
        className="
          flex
          size-[26px]
          shrink-0
          items-center
          justify-center
          rounded-full
          border
          border-amber-200/20
          bg-gradient-to-b
          from-[#FFE96A]
          to-[#E5AA20]
          text-[#211600]
          shadow-[0_0_10px_rgba(240,180,41,.22)]
          transition-all
          duration-200
          hover:scale-105
          hover:brightness-110
          active:scale-95
        "
      >
        <Plus className="size-3.5 stroke-[3]" />
      </button>
    </div>
  )
}


export function Navbar() {
  return (
    <header
      className="
        fixed
        inset-x-0
        top-0
        z-30
        h-[76px]
        border-b
        border-[#24213B]
        bg-[#07061A]/95
        backdrop-blur-xl
      "
    >
      {/* subtle top ambient glow */}
      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-violet-500/40
          to-transparent
        "
      />

      <div
        className="
          flex
          h-full
          w-full
          items-center
          gap-4
          px-5
          xl:px-6
        "
      >
        {/* LOGO */}
        <LuckyRushLogo
          className="h-[48px] w-[154px]"
        />

        {/* MAIN NAV */}
        <nav
          aria-label="Primary"
          className="
            flex
            h-full
            shrink-0
            items-center
            gap-1
          "
        >
          {navItems.map((item) =>
            item.active ? (
              <a
                key={item.label}
                href={item.href}
                className="
                  group
                  relative
                  flex
                  h-[48px]
                  w-[118px]
                  items-center
                  justify-center
                  gap-2.5
                  overflow-hidden
                  rounded-[14px]
                  border
                  border-[#B84DFF]/45
                  bg-gradient-to-r
                  from-[#8F32E8]
                  via-[#6523B7]
                  to-[#32145F]
                  text-[14px]
                  font-semibold
                  text-white
                  shadow-[0_0_16px_rgba(153,51,238,.28)]
                  transition-all
                  duration-300
                  hover:border-[#D05AFF]/65
                  hover:shadow-[0_0_22px_rgba(168,85,247,.4)]
                "
              >
                {/* left glow */}
                <span
                  className="
                    absolute
                    left-0
                    top-1/2
                    h-[34px]
                    w-[3px]
                    -translate-y-1/2
                    rounded-r-full
                    bg-[#E765FF]
                    shadow-[0_0_9px_3px_rgba(231,101,255,.65)]
                  "
                />

                {/* inner highlight */}
                <span
                  className="
                    pointer-events-none
                    absolute
                    inset-[1px]
                    rounded-[13px]
                    border
                    border-white/[0.08]
                  "
                />

                <Home
                  className="
                    relative
                    z-10
                    size-[19px]
                    text-[#F0B5FF]
                    drop-shadow-[0_0_7px_rgba(235,130,255,.5)]
                  "
                  strokeWidth={2.2}
                />

                <span className="relative z-10">
                  {item.label}
                </span>
              </a>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="
                  group
                  relative
                  inline-flex
                  h-[48px]
                  items-center
                  rounded-[13px]
                  px-3.5
                  text-[14px]
                  font-medium
                  text-[#A9A8BB]
                  transition-all
                  duration-200
                  hover:bg-white/[0.035]
                  hover:text-white
                "
              >
                {item.label}

                {/* hover underline glow */}
                <span
                  className="
                    absolute
                    bottom-[7px]
                    left-1/2
                    h-[2px]
                    w-0
                    -translate-x-1/2
                    rounded-full
                    bg-violet-400
                    shadow-[0_0_8px_rgba(168,85,247,.7)]
                    transition-all
                    duration-300
                    group-hover:w-5
                  "
                />
              </a>
            )
          )}
        </nav>

        {/* FLEX SPACER */}
        <div className="min-w-4 flex-1" />

        {/* RIGHT SIDE */}
        <div className="flex shrink-0 items-center gap-2">

          {/* SEARCH */}
          <label
            className="
              group
              relative
              flex
              h-[46px]
              w-[235px]
              items-center
            "
          >
            <Search
              className="
                pointer-events-none
                absolute
                left-3.5
                size-[17px]
                text-[#77758D]
                transition-colors
                duration-200
                group-focus-within:text-violet-300
              "
              strokeWidth={2}
            />

            <input
              type="search"
              aria-label="Search games"
              placeholder="Search games..."
              className="
                h-full
                w-full
                rounded-[13px]
                border
                border-[#292642]
                bg-[#0B0A1F]
                py-0
                pl-10
                pr-4
                text-[13px]
                text-white
                outline-none
                placeholder:text-[#68667B]
                transition-all
                duration-300
                hover:border-[#3B315C]
                focus:border-violet-400/55
                focus:bg-[#0E0C26]
                focus:shadow-[0_0_0_3px_rgba(139,92,246,.10)]
              "
            />
          </label>

          {/* GC */}
          <BalanceWidget
            type="GC"
            amount="25,600"
            borderClassName="border border-amber-400/20"
            coinClassName="
              bg-gradient-to-b
              from-[#FFE566]
              via-[#F5C518]
              to-[#D4A017]
              text-[#1a1200]
            "
          />

          {/* SC */}
          <BalanceWidget
            type="SC"
            amount="12.50"
            borderClassName="border border-emerald-400/20"
            coinClassName="
              bg-gradient-to-b
              from-[#6EE7A8]
              via-[#22C55E]
              to-[#15803D]
              text-white
            "
          />

          {/* LOGIN */}
          <a
            href="#login"
            className="
              inline-flex
              h-[46px]
              w-[92px]
              items-center
              justify-center
              rounded-[13px]
              border
              border-[#403667]
              bg-[#0C0A20]
              text-[13px]
              font-semibold
              text-[#D4D1DF]
              transition-all
              duration-300
              hover:border-violet-400/55
              hover:bg-violet-500/[.08]
              hover:text-white
              hover:shadow-[0_0_16px_rgba(139,92,246,.14)]
            "
          >
            Login
          </a>

          {/* JOIN NOW */}
          <a
            href="#join"
            className="
              group
              relative
              inline-flex
              h-[48px]
              w-[128px]
              items-center
              justify-center
              overflow-hidden
              rounded-[13px]
              border
              border-fuchsia-400/40
              bg-gradient-to-r
              from-[#8F32E8]
              via-[#D946EF]
              to-[#C026D3]
              text-[13px]
              font-bold
              text-white
              shadow-[0_0_18px_rgba(217,70,239,.28)]
              transition-all
              duration-300
              hover:brightness-110
              hover:shadow-[0_0_25px_rgba(217,70,239,.42)]
              active:scale-[.98]
            "
          >
            <span
              className="
                absolute
                inset-0
                -translate-x-full
                bg-gradient-to-r
                from-transparent
                via-white/15
                to-transparent
                transition-transform
                duration-700
                group-hover:translate-x-full
              "
            />

            <span className="relative z-10">
              Join Now
            </span>
          </a>
        </div>
      </div>
    </header>
  )
}
