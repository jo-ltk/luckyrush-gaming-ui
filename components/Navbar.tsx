'use client'

import Image from 'next/image'
import { Bell, Home, Plus, Search, Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useState, useRef, useEffect } from 'react'

function useCountUp(value: string, duration: number = 1000) {
  const [displayValue, setDisplayValue] = useState('0')

  useEffect(() => {
    const numericValue = parseFloat(value.replace(/,/g, ''))
    const isDecimal = value.includes('.')
    let currentValue = 0
    let startTime: number | null = null

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Linear interpolation for smooth counting
      currentValue = numericValue * progress

      if (isDecimal) {
        setDisplayValue(currentValue.toFixed(2))
      } else {
        setDisplayValue(Math.floor(currentValue).toLocaleString())
      }

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [value, duration])

  return displayValue
}

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
  const animatedAmount = useCountUp(amount, 1200)
  const coinImage = type === 'GC' ? '/golden-crown-coin.png' : '/emerald-crown-coin.png'

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
          shadow-[inset_0_1px_1px_rgba(255,255,255,.45)]
          `,
          coinClassName
        )}
      >
        <Image
          src={coinImage}
          alt={`${type} coin`}
          width={24}
          height={24}
          className="size-[24px] object-contain"
        />
      </div>

      {/* Balance */}
      <span className="min-w-0 flex-1 truncate text-[13px] font-bold text-[#E8E5F2]">
        {animatedAmount}
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

function JoinNowButton() {
  const [isShining, setIsShining] = useState(false)
  const timeoutRef = useRef<number | null>(null)

  const triggerShine = () => {
    setIsShining(true)

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = window.setTimeout(() => {
      setIsShining(false)
    }, 700)
  }

  const handlePointerEnter = () => {
    triggerShine()
  }

  const handlePointerDown = () => {
    triggerShine()
  }

  return (
    <a
      href="#join"
      className="
        group
        relative
        inline-flex
        h-[42px]
        w-[82px]
        items-center
        justify-center
        overflow-hidden
        rounded-[11px]
        border
        border-fuchsia-400/40
        bg-gradient-to-r
        from-[#8F32E8]
        via-[#D946EF]
        to-[#C026D3]
        text-[11px]
        font-bold
        text-white
        shadow-[0_0_18px_rgba(217,70,239,.28)]
        transition-all
        duration-300
        hover:brightness-110
        sm:h-[44px]
        sm:w-[95px]
        sm:text-[12px]
        md:w-[108px]
        lg:h-[48px]
        lg:w-[128px]
        lg:text-[13px]
      "
      onPointerEnter={handlePointerEnter}
      onPointerDown={handlePointerDown}
    >
      <span
        className={cn(
          `
            absolute
            inset-0
            -translate-x-full
            bg-gradient-to-r
            from-transparent
            via-white/15
            to-transparent
            transition-transform
            duration-700
          `,
          isShining && 'translate-x-full'
        )}
      />

      <span className="relative z-10">
        Join Now
      </span>
    </a>
  )
}

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header
      className="
        fixed
        inset-x-0
        top-0
        z-30
        h-auto
        border-b
        border-[#24213B]
        bg-[#07061A]/95
        backdrop-blur-xl
      "
    >
      {/* Top glow */}
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
          min-h-[68px]
          w-full
          items-center
          gap-2
          px-3
          sm:px-4
          md:px-5
          lg:gap-3
          xl:px-6
        "
      >
        {/* LOGO */}
        <LuckyRushLogo
          className="
            h-[38px]
            w-[125px]
            shrink-0
            sm:h-[42px]
            sm:w-[138px]
            md:h-[44px]
            md:w-[145px]
            lg:h-[46px]
            lg:w-[150px]
            xl:h-[48px]
            xl:w-[154px]
          "
        />

        {/* DESKTOP NAV */}
        <nav
          aria-label="Primary"
          className="
            hidden
            shrink-0
            items-center
            gap-0.5
            lg:flex
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
                  h-[44px]
                  w-[100px]
                  items-center
                  justify-center
                  gap-2
                  overflow-hidden
                  rounded-[12px]
                  border
                  border-[#B84DFF]/45
                  bg-gradient-to-r
                  from-[#8F32E8]
                  via-[#6523B7]
                  to-[#32145F]
                  text-[13px]
                  font-bold
                  text-white
                  shadow-[0_0_16px_rgba(153,51,238,.28)]
                  transition-all
                  duration-300
                  xl:h-[48px]
                  xl:w-[118px]
                  xl:gap-2.5
                  xl:text-[14px]
                "
              >
                <span
                  className="
                    absolute
                    left-0
                    top-1/2
                    h-[30px]
                    w-[3px]
                    -translate-y-1/2
                    rounded-r-full
                    bg-[#E765FF]
                    shadow-[0_0_9px_3px_rgba(231,101,255,.65)]
                  "
                />

                <span
                  className="
                    pointer-events-none
                    absolute
                    inset-[1px]
                    rounded-[11px]
                    border
                    border-white/[0.08]
                  "
                />

                <Home
                  className="
                    relative
                    z-10
                    size-[17px]
                    text-[#F0B5FF]
                    xl:size-[19px]
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
                  h-[44px]
                  items-center
                  rounded-[12px]
                  px-2.5
                  text-[12px]
                  font-medium
                  text-[#A9A8BB]
                  transition-all
                  duration-200
                  hover:bg-white/[0.035]
                  hover:text-white
                  xl:h-[48px]
                  xl:px-3.5
                  xl:text-[14px]
                "
              >
                {item.label}

                <span
                  className="
                    absolute
                    bottom-[6px]
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

        {/* SPACER */}
        <div className="min-w-1 flex-1" />

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          aria-label="Menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="
            relative
            flex
            size-[42px]
            shrink-0
            items-center
            justify-center
            rounded-full
            border
            border-[#292642]
            bg-[#0C0A20]
            text-[#A9A8BB]
            transition-all
            duration-300
            hover:border-violet-400/40
            hover:bg-violet-500/[.08]
            hover:text-white
            lg:hidden
          "
        >
          {mobileMenuOpen ? (
            <X className="size-[18px]" strokeWidth={2} />
          ) : (
            <Menu className="size-[18px]" strokeWidth={2} />
          )}
        </button>

        {/* RIGHT SIDE */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">

          {/* SEARCH */}
          <label
            className="
              group
              relative
              hidden
              h-[42px]
              w-[170px]
              items-center
              lg:flex
              xl:h-[46px]
              xl:w-[235px]
            "
          >
            <Search
              className="
                pointer-events-none
                absolute
                left-3
                size-[16px]
                text-[#77758D]
                transition-colors
                duration-200
                group-focus-within:text-violet-300
                xl:left-3.5
                xl:size-[17px]
              "
            />

            <input
              type="search"
              aria-label="Search games"
              placeholder="Search games..."
              className="
                h-full
                w-full
                rounded-[12px]
                border
                border-[#292642]
                bg-[#0B0A1F]
                py-0
                pl-9
                pr-3
                text-[12px]
                text-white
                outline-none
                placeholder:text-[#68667B]
                transition-all
                duration-300
                xl:pl-10
                xl:pr-4
                xl:text-[13px]
              "
            />
          </label>

          {/* BALANCES */}
          <div className="hidden xl:flex items-center gap-2">
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
          </div>

          {/* NOTIFICATIONS */}
          <button
            type="button"
            aria-label="Notifications"
            className="
              relative
              flex
              size-[42px]
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-[#292642]
              bg-[#0C0A20]
              text-[#A9A8BB]
              transition-all
              duration-300
              hover:border-violet-400/40
              hover:bg-violet-500/[.08]
              hover:text-white
              lg:size-[44px]
              xl:size-[46px]
            "
          >
            <Bell className="size-[18px] lg:size-[19px] xl:size-[20px]" strokeWidth={2} />

            {/* Notification dot */}
            <span
              className="
                absolute
                right-2
                top-2
                size-[8px]
                rounded-full
                bg-red-500
                shadow-[0_0_8px_rgba(239,68,68,.6)]
                lg:size-[9px]
                xl:size-[10px]
              "
            />
          </button>

          {/* LOGIN */}
          <a
            href="#login"
            className="
              inline-flex
              h-[42px]
              w-[70px]
              items-center
              justify-center
              rounded-[11px]
              border
              border-[#403667]
              bg-[#0C0A20]
              text-[12px]
              font-bold
              text-[#D4D1DF]
              transition-all
              duration-300
              hover:border-violet-400/55
              hover:bg-violet-500/[.08]
              hover:text-white
              sm:h-[44px]
              sm:w-[78px]
              sm:text-[13px]
              md:w-[85px]
              lg:h-[46px]
              lg:w-[92px]
            "
          >
            Login
          </a>

          {/* JOIN NOW */}
          <JoinNowButton />
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="
              lg:hidden
              overflow-hidden
              border-t
              border-[#24213B]
              bg-[#0A081E]
            "
          >
            <div className="flex flex-col gap-1 p-3">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    `
                      flex
                      h-[48px]
                      items-center
                      justify-center
                      rounded-[12px]
                      text-[14px]
                      font-semibold
                      transition-all
                    `,
                    item.active
                      ? `
                        border
                        border-[#B84DFF]/45
                        bg-gradient-to-r
                        from-[#8F32E8]
                        via-[#6523B7]
                        to-[#32145F]
                        text-white
                        shadow-[0_0_16px_rgba(153,51,238,.28)]
                      `
                      : `
                        border
                        border-[#292642]
                        bg-[#0C0A20]
                        text-[#A9A8BB]
                        hover:bg-white/[0.035]
                        hover:text-white
                      `
                  )}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
