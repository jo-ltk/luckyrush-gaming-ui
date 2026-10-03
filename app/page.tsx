'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Bell, ChevronRight, CircleHelp, Crown, Flame, Gamepad2, Gem, Gift, Heart, Home, LayoutGrid,
  LifeBuoy, Menu, Search, ShieldCheck, Sparkles, Star, TrendingUp, Trophy, Zap,
} from 'lucide-react'
import { LuckyMatchGame } from '@/components/LuckyMatchGame'
import { LuckyRushLogo, Navbar } from '@/components/Navbar'
import { SparkleBadge } from '@/components/SparkleBadge'
import { FirstVisitPopups } from '@/components/FirstVisitPopups'
import { cn } from '@/lib/utils'
import {
  useLuckyRushAnimations,
  useGameCardAnimation,
  usePromoCardAnimation,
  useCategoryFilterAnimation,
  useSidebarMenuItemAnimation,
  useHeroMotion,
  animateLiveWin,
  createSparkBurst,
  animateRewardCounter,
  showRewardPopup,
} from '@/lib/gsap-animations'
import gsap from 'gsap'

type Game = { name: string; category: string; tags?: string[]; colors: string; badge?: string; icon: string; cover?: string; }

const navPrimary = [
  { label: 'Home', icon: Home }, { label: 'Favorites', icon: Heart },
  { label: 'All Games', icon: LayoutGrid }, { label: 'Slots', icon: Zap },
  { label: 'Table Games', icon: Trophy }, { label: 'Live Casino', icon: Sparkles },
  { label: 'New Games', icon: Star },
]
const navSecondary = [
  { label: 'Promotions', icon: Gift }, { label: 'Daily Rewards', icon: Crown },
  { label: 'VIP Club', icon: ShieldCheck }, { label: 'Help Center', icon: CircleHelp },
]
const games: Game[] = [
  { name: 'Neon Fortune', category: 'For You', tags: ['Slots', 'Bonus Buy'], colors: 'from-fuchsia-700 via-violet-600 to-indigo-950', badge: 'NEW', icon: '✦', cover: '/neon-fortune-777-jackpot.png' },
  { name: 'Golden Safari', category: 'Trending', tags: ['Slots', 'Live Casino'], colors: 'from-amber-500 via-orange-700 to-emerald-950', badge: 'HOT', icon: '♛', cover: '/golden-safari-lion-jackpot.png' },
  { name: 'Lucky Lanterns', category: 'New Games', tags: ['Slots', 'Bonus Buy'], colors: 'from-red-500 via-fuchsia-600 to-indigo-950', badge: 'NEW', icon: '✧', cover: '/lucky-lanterns-fortune-in-gold.png' },
  { name: 'Ruby Rush', category: 'Jackpots', tags: ['Slots', 'Table Games'], colors: 'from-rose-700 via-red-500 to-orange-900', badge: 'EXCLUSIVE', icon: '◆', cover: '/ruby-rush-glimmering-treasure-jackpot.png' },
  { name: 'Cosmic Coins', category: 'Trending', tags: ['Slots', 'Bonus Buy'], colors: 'from-cyan-500 via-blue-700 to-violet-950', badge: 'HOT', icon: '✦', cover: '/cosmic-coins-astronaut-jackpot.png' },
  { name: 'Jungle Jackpot', category: 'Jackpots', tags: ['Slots', 'Live Casino'], colors: 'from-lime-600 via-emerald-700 to-teal-950', badge: 'JACKPOT', icon: '♜', cover: '/jungle-jackpot-monkey-adventure.png' },
  { name: 'Royal Reels', category: 'For You', tags: ['Slots', 'Table Games'], colors: 'from-yellow-500 via-amber-700 to-purple-950', badge: 'VIP', icon: '♚', cover: '/royal-reels-the-golden-king.png' },
  { name: 'Mystic Gems', category: 'Popular', tags: ['Slots', 'Live Casino'], colors: 'from-purple-600 via-blue-600 to-slate-950', badge: 'NEW', icon: '◇', cover: '/mystic-gems-neon-crystal-fantasy.png' },
  { name: 'Treasure Trail', category: 'Hold & Win', tags: ['Slots', 'Bonus Buy'], colors: 'from-orange-500 via-yellow-700 to-red-950', badge: 'BONUS', icon: '☼', cover: '/pirate-treasure-trail-adventure.png' },
  { name: 'Candy Vault', category: 'Popular', tags: ['Slots', 'Table Games'], colors: 'from-pink-500 via-purple-600 to-sky-950', badge: 'NEW', icon: '●', cover: '/candy-vault-sweet-fantasy-kingdom.png' },
  { name: 'Dragon Gold', category: 'Jackpots', tags: ['Slots', 'Live Casino'], colors: 'from-red-700 via-orange-600 to-amber-950', badge: 'EXCLUSIVE', icon: '♨', cover: '/dragon-gold-fiery-treasure-quest.png' },
  { name: 'Moonlight Wins', category: 'For You', tags: ['Slots', 'Table Games'], colors: 'from-indigo-500 via-violet-700 to-slate-950', badge: 'HOT', icon: '☾', cover: '/moonlit-wolf-wins.png' },
]
type Win = {
  user: string
  amount: string
  time: string
  avatar: string
}

type DisplayWin = Win & {
  id: string
}

function AnimatedWinAmount({ amount, winId, isNew }: { amount: string; winId: string; isNew: boolean }) {
  const elementRef = useRef<HTMLSpanElement>(null)
  const animatedIds = useRef<Set<string>>(new Set())

  useEffect(() => {
    if (!isNew || !elementRef.current) {
      return
    }

    if (animatedIds.current.has(winId)) {
      return
    }

    const match = amount.match(/^([+])([\d,]+)\s*(GC|SC)$/)
    if (!match) return

    animatedIds.current.add(winId)
    const [, prefix, numericStr, suffix] = match
    const targetValue = parseInt(numericStr.replace(/,/g, ''), 10)

    animateRewardCounter(elementRef.current, targetValue, 0.8, prefix, ` ${suffix}`)
  }, [amount, winId, isNew])

  return <span ref={elementRef}>{amount}</span>
}

const wins: Win[] = [
  { user: 'PlayfulTiger', amount: '+250,000 GC', time: '2 min ago', avatar: '/win-playful-tiger.png' },
  { user: 'LuckyStar88', amount: '+1,200 SC', time: '5 min ago', avatar: '/win-lucky-star.png' },
  { user: 'SpinMaster', amount: '+75,000 GC', time: '8 min ago', avatar: '/win-spin-master.png' },
  { user: 'QueenBee', amount: '+500 SC', time: '12 min ago', avatar: '/win-queen-bee.png' },
  { user: 'GameKing', amount: '+320,000 GC', time: '15 min ago', avatar: '/win-game-king.png' },
  { user: 'MoonlightWolf', amount: '+185,000 GC', time: '18 min ago', avatar: '/moonlit-wolf-wins.png' },
  { user: 'GoldenDragon', amount: '+2,400 SC', time: '21 min ago', avatar: '/golden-safari-lion-jackpot.png' },
]

function NavItem({
  item,
  active = false,
  onSelect,
}: {
  item: typeof navPrimary[number]
  active?: boolean
  onSelect?: () => void
}) {
  const Icon = item.icon
  const itemRef = useRef<HTMLButtonElement>(null)
  useSidebarMenuItemAnimation(itemRef, active)

  return (
    <button
      ref={itemRef}
      type="button"
      onClick={onSelect}
      className={cn(
        'group relative flex h-[58px] w-full cursor-pointer items-center gap-[22px] rounded-[14px] px-[22px] text-left text-[15px] font-bold transition-all duration-300',
        active && 'overflow-hidden border border-[#B84DFF]/55 bg-gradient-to-r from-[#8F32E8] via-[#6523B7] to-[#32145F] text-white shadow-[0_0_18px_rgba(153,51,238,.28)]',
        !active && 'border border-transparent text-[#A9A9BC] hover:bg-white/[0.035] hover:text-[#E8E4F3]',
      )}
    >
      {active && (
        <span
          className="pointer-events-none absolute left-0 top-1/2 h-[42px] w-[3px] -translate-y-1/2 rounded-r-full bg-[#E765FF] shadow-[0_0_10px_3px_rgba(231,101,255,.65)]"
        />
      )}

      {active && (
        <span
          className="pointer-events-none absolute inset-[1px] rounded-[13px] border border-white/[0.08]"
        />
      )}

      <Icon
        className={cn(
          'relative z-10 size-[25px] shrink-0 transition-all duration-300',
          active
            ? 'text-[#F1B8FF] drop-shadow-[0_0_7px_rgba(235,130,255,.45)]'
            : 'text-[#A7A8BA] group-hover:text-[#D7B7FF]',
        )}
        strokeWidth={active ? 2.2 : 1.8}
      />

      <span className="relative z-10">{item.label}</span>
    </button>
  )
}

function Sidebar() {
  const [active, setActive] = useState('Home')

  return (
    <aside className="fixed bottom-0 left-0 top-[80px] z-20 flex w-[264px] flex-col border-r border-white/[.08] bg-[#08051A] px-3 py-6 max-h-[calc(100vh-80px)] overflow-y-auto">
      <div className="flex flex-col gap-[3px]">
        {navPrimary.map(item => (
          <NavItem key={item.label} item={item} active={active === item.label} onSelect={() => setActive(item.label)} />
        ))}
      </div>
      <div className="my-5 h-px bg-white/[.08]" />
      <div className="flex flex-col gap-[3px]">
        {navSecondary.map(item => (
          <NavItem key={item.label} item={item} active={active === item.label} onSelect={() => setActive(item.label)} />
        ))}
      </div>
      <div className="flex-1 min-h-[20px]" />
      <div className="group relative min-h-[262px] overflow-hidden rounded-[15px] border border-[#29204A] bg-[#100D27] shadow-[0_8px_30px_rgba(0,0,0,.25)] transition-all duration-300 hover:border-[#7138A8]/60 hover:shadow-[0_8px_35px_rgba(123,58,237,.18)]">
        <Image
          src="/vip-club-golden-crown.png"
          alt=""
          fill
          className="object-cover object-top opacity-100 transition-transform duration-700 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#100D27]/90" />
        <div className="pointer-events-none absolute left-1/2 top-[35px] h-[100px] w-[150px] -translate-x-1/2 rounded-full bg-[#8B35E8]/10 blur-[40px]" />
        <div className="relative z-10 flex h-full min-h-[262px] flex-col items-start justify-end px-5 pb-5">
          <p className="text-[18px] font-bold leading-none tracking-[-0.02em] text-[#FFE45C] drop-shadow-[0_1px_8px_rgba(255,214,50,.25)]">
            Join Our VIP Club
          </p>
          <p className="mt-2 text-[14px] font-normal leading-[21px] text-[#D4D0E2]">
            Unlock exclusive rewards
            <br />
            and special perks!
          </p>
          <button
            type="button"
            className="mt-5 flex h-[55px] w-full cursor-pointer items-center justify-between rounded-[14px] border border-[#913AFF] bg-gradient-to-r from-[#241044] to-[#3A1768] px-5 text-[14px] font-bold text-white shadow-[0_0_12px_rgba(145,58,255,.18),inset_0_1px_0_rgba(255,255,255,.08)] transition-all duration-300 hover:border-[#B55AFF] hover:from-[#2D1255] hover:to-[#491B7D] hover:shadow-[0_0_22px_rgba(168,85,247,.32)]"
          >
            <span>Learn More</span>
            <ChevronRight className="size-[22px] text-[#D27AFF] transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </aside>
  )
}

const heroSlides = [
  { src: '/hero-neon-casino-adventure.png', alt: 'Lucky Rush Neon Casino Adventure', position: 'object-[72%_center]' },
  { src: '/hero-fortune-wheel-extravaganza.png', alt: 'Neon Casino Fortune Wheel Extravaganza', position: 'object-center' },
  { src: '/hero-neon-tiger-jackpot.png', alt: 'Neon Tiger Jackpot Celebration', position: 'object-[60%_center]' },
]

function Hero() {
  const [current, setCurrent] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)
  useHeroMotion(heroRef)

  useEffect(() => {
    const t = setInterval(() => setCurrent(i => (i + 1) % heroSlides.length), 4500)
    return () => clearInterval(t)
  }, [])

  return (
    <div ref={heroRef} className="relative min-h-[240px] sm:min-h-[292px] overflow-hidden rounded-[18px] border border-[#30234A] bg-[#100A24] shadow-[0_12px_40px_rgba(0,0,0,.22)]">
      {/* Carousel images */}
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <Image
            src={heroSlides[current].src}
            alt={heroSlides[current].alt}
            fill
            className={cn('object-cover opacity-95', heroSlides[current].position)}
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0d0820] via-[#1a0e3b]/75 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0820]/60 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex h-full min-h-[292px] flex-col justify-center px-6 py-6 sm:px-8 sm:py-7 lg:px-9 lg:py-8">
        <p className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.25em] text-fuchsia-300">
          <Sparkles className="size-3" /> Your lucky era starts here
        </p>
        <h1 className="w-fit text-[36px] sm:text-[46px] md:text-[52px] lg:text-[58px] xl:text-[66px] 2xl:text-[72px] font-black leading-[0.92] tracking-tight select-none">
          <span className="block bg-gradient-to-b from-white via-[#F5EDFF] to-[#BF7EFF] bg-clip-text text-transparent drop-shadow-[0_4px_6px_rgba(0,0,0,0.95)] drop-shadow-[0_0_18px_rgba(191,126,255,0.4)] whitespace-nowrap">
            PLAY. SPIN.
          </span>
          <span className="block bg-gradient-to-b from-[#FFFAD0] via-[#F5B520] to-[#994F00] bg-clip-text text-transparent drop-shadow-[0_4px_6px_rgba(0,0,0,0.95)] drop-shadow-[0_0_18px_rgba(245,181,32,0.4)] whitespace-nowrap">
            GET REWARDED.
          </span>
        </h1>
        <p className="mt-3 max-w-[280px] text-[13px] sm:text-md leading-5 text-slate-300">
          Thousands of games. Daily rewards.<br />
          New favorites every week.
        </p>
        <div className="mt-5 flex gap-2">
          <button
            className="
              rounded-[11px]
              border
              border-fuchsia-400/30
              bg-gradient-to-r
              from-[#8F32E8]
              to-[#D946EF]
              px-4
              py-2.5
              sm:px-5
              sm:py-3
              text-[10px]
              font-bold
              uppercase
              tracking-widest
              text-white
              shadow-[0_0_18px_rgba(217,70,239,.25)]
              transition-all
              hover:brightness-110
              hover:shadow-[0_0_25px_rgba(217,70,239,.38)]
            "
          >
            Play Now
          </button>
          <button className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 sm:px-4 sm:py-2.5 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur">
            View Games
          </button>
        </div>

        {/* Dot indicators */}
        <div className="absolute bottom-4 right-6 flex items-center gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={cn(
                'rounded-full transition-all duration-500',
                i === current
                  ? 'h-2 w-6 bg-fuchsia-400 shadow-[0_0_8px_rgba(232,121,249,.7)]'
                  : 'size-2 bg-white/30 hover:bg-white/55',
              )}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function LatestWins() {
  const [displayWins, setDisplayWins] = useState<DisplayWin[]>(() =>
    wins.map((w, i) => ({ ...w, id: `${w.user}-${i}` }))
  )

  const nextIndex = useRef(0)
  const rowRefs = useRef<Map<string, HTMLElement>>(new Map())

  useEffect(() => {
    let timeout: number

    const addLiveWin = () => {
      setDisplayWins(prev => {
        const source = wins[nextIndex.current % wins.length]
        nextIndex.current++

        const newWin: DisplayWin = {
          ...source,
          id: `${source.user}-${Date.now()}`,
          time: 'just now',
        }

        const newWins = [newWin, ...prev].slice(0, 7)

        // Trigger animation for the new win
        setTimeout(() => {
          const row = rowRefs.current.get(newWin.id)
          if (row) {
            gsap.fromTo(
              row,
              { boxShadow: '0 0 0 rgba(217, 70, 239, 0)' },
              {
                boxShadow: '0 0 20px rgba(217, 70, 239, 0.3)',
                duration: 0.4,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut',
              }
            )

            const avatar = row.querySelector('img')
            if (avatar) {
              gsap.fromTo(
                avatar,
                { scale: 1 },
                {
                  scale: 1.08,
                  duration: 0.3,
                  yoyo: true,
                  repeat: 1,
                  ease: 'power2.inOut',
                }
              )
            }

            const rewardText = row.querySelector('.text-amber-300')
            if (rewardText) {
              const rect = rewardText.getBoundingClientRect()
              createSparkBurst({
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2,
                count: 6,
                size: 3,
              })
            }

            const timeText = row.querySelector('.text-fuchsia-300')
            if (timeText) {
              gsap.fromTo(
                timeText,
                { filter: 'brightness(1)' },
                {
                  filter: 'brightness(1.5)',
                  duration: 0.3,
                  yoyo: true,
                  repeat: 1,
                  ease: 'power2.inOut',
                }
              )
            }
          }
        }, 50)

        return newWins
      })

      // Random 2.4–3.8 sec interval
      timeout = window.setTimeout(addLiveWin, 2400 + Math.random() * 1400)
    }

    timeout = window.setTimeout(addLiveWin, 2800)

    return () => window.clearTimeout(timeout)
  }, [])

  return (
    <section className="w-full flex-shrink-0 rounded-2xl border border-white/[.08] bg-white/[.035] p-4 overflow-hidden" style={{ height: '480px' }}>
      <div className="mb-4 flex items-center justify-between flex-shrink-0">
        <div>
          <p className="text-[14px] font-bold uppercase tracking-[.2em] text-fuchsia-300">
            Live activity
          </p>

          <h2 className="mt-1 text-xl font-bold text-white">
            Latest Wins
          </h2>
        </div>

        <button className="text-[15px] font-bold text-slate-500 hover:text-fuchsia-300">
          View All
        </button>
      </div>

      <div className="flex flex-col gap-2 overflow-hidden">
        <AnimatePresence initial={false}>
          {displayWins.map((win: DisplayWin, index: number) => (
            <motion.div
              key={win.id}
              ref={(el) => {
                if (el) rowRefs.current.set(win.id, el)
              }}
              initial={{
                opacity: 0,
                y: -45,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: 30,
              }}
              transition={{
                opacity: {
                  duration: 0.32,
                },
                y: {
                  type: 'spring',
                  stiffness: 700,
                  damping: 40,
                  mass: 0.35,
                },
              }}
              className={cn(
                'relative flex items-center gap-2.5 rounded-xl border border-white/[.05] bg-black/20 p-2 h-14 flex-shrink-0',
                index === 0 &&
                  'shadow-[0_0_18px_rgba(217,70,239,.12)]'
              )}
            >
              {/* LIVE indicator on newest player */}
              {index === 0 && (
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.15, 0.9] }}
                  transition={{
                    duration: 0.9,
                    repeat: 2,
                  }}
                  className="absolute -left-1.5 top-1/2 size-2 -translate-y-1/2 rounded-full bg-fuchsia-400 shadow-[0_0_10px_3px_rgba(217,70,239,.55)]"
                />
              )}

              <div className="relative size-9 shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={win.avatar}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-[15px] font-semibold text-white">
                  {win.user}
                </p>

                <p className="text-[14px] font-bold text-amber-300">
                  <AnimatedWinAmount amount={win.amount} winId={win.id} isNew={index === 0} />
                </p>
              </div>

              <p
                className={cn(
                  'self-start pt-0.5 text-[13px]',
                  index === 0
                    ? 'font-semibold text-fuchsia-300'
                    : 'text-slate-600'
                )}
              >
                {win.time}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  )
}

function MiniGameCenter() {
  return (
    <section className="flex flex-col flex-shrink-0">
      <p className="mb-1 px-1 text-[10px] font-bold uppercase tracking-[.2em] text-fuchsia-300">Mini Game Center</p>
      <LuckyMatchGame />
    </section>
  )
}

function PromoCard({ item }: { item: typeof items[number] }) {
  const cardRef = useRef<HTMLDivElement>(null)
  usePromoCardAnimation(cardRef)
  const Icon = item.icon

  return (
    <div
      ref={cardRef}
      className={cn(
        'group relative flex h-[100px] sm:h-[120px] items-start overflow-hidden rounded-xl border p-3 sm:p-4 transition-shadow hover:shadow-[0_8px_25px_rgba(168,85,247,.18)]',
        item.background
          ? item.accent === 'cyan'
            ? 'border-cyan-300/40 hover:border-cyan-200/60'
            : 'border-amber-300/30 hover:border-amber-200/50'
          : cn('border-white/[.07] bg-gradient-to-br hover:border-fuchsia-300/30', item.color),
      )}
    >
            {item.background && (
              <>
                <Image
                  src={item.background}
                  alt=""
                  fill
                  className={cn('object-cover scale-[1.12]', item.align === 'right' ? 'object-left' : 'object-center')}
                />
                <div
                  className={cn(
                    'absolute inset-0',
                    item.align === 'right'
                      ? item.title === 'Free-to-Play'
                        ? 'bg-gradient-to-r from-transparent via-[#2a1600]/20 to-[#140a00]/70'
                        : 'bg-gradient-to-r from-transparent via-[#1a0a2e]/25 to-[#12071f]/70'
                      : 'bg-[#04122c]/35',
                  )}
                />
              </>
            )}
      {item.background && (
        <>
          <Image
            src={item.background}
            alt=""
            fill
            className={cn('object-cover scale-[1.12]', item.align === 'right' ? 'object-left' : 'object-center')}
          />
          <div
            className={cn(
              'absolute inset-0',
              item.align === 'right'
                ? item.title === 'Free-to-Play'
                  ? 'bg-gradient-to-r from-transparent via-[#2a1600]/20 to-[#140a00]/70'
                  : 'bg-gradient-to-r from-transparent via-[#1a0a2e]/25 to-[#12071f]/70'
                : 'bg-[#04122c]/35',
            )}
          />
        </>
      )}
      <div className="relative z-10 flex w-full flex-col items-start">
        <p className="text-xl sm:text-2xl md:text-3xl font-black leading-[0.92] tracking-tight text-white drop-shadow-[0_3px_5px_rgba(0,0,0,0.95)] drop-shadow-[0_0_14px_rgba(191,126,255,0.4)]">{item.title}</p>
        <p className={cn('mt-2 text-sm sm:text-lg leading-5', item.background ? 'text-white/90' : 'text-slate-400')}>{item.text}</p>
      </div>
    </div>
  )
}

function PromoCards() {
  const items = [
    { title: 'Daily Rewards', text: 'Log in every day and claim exciting rewards!', icon: Gift, color: 'from-fuchsia-500/25 to-violet-500/5', background: '/daily-rewards-banner.png', accent: 'gold', align: 'right' },
    { title: 'New Games Weekly', text: 'Fresh games, new experiences every week.', icon: Sparkles, color: 'from-cyan-500/20 to-blue-500/5', background: '/new-games-banner.png', accent: 'cyan', align: 'left' },
    { title: 'Free-to-Play', text: 'Play your favorite games with GC & SC', icon: Zap, color: 'from-amber-500/20 to-orange-500/5', background: '/free-to-play-banner.png', accent: 'gold', align: 'right' },
    { title: 'VIP Club', text: 'Unlock exclusive rewards and special perks', icon: Crown, color: 'from-yellow-500/20 to-amber-500/5', background: '/vip-club-golden-crown.png', accent: 'gold', align: 'right' },
  ]
  return (
    <motion.div initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.18 } } }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {items.map(item => (
        <motion.div
          key={item.title}
          variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
        >
          <PromoCard item={item} />
        </motion.div>
      ))}
    </motion.div>
  )
}

function GameCard({ game }: { game: Game }) {
  const cardRef = useRef<HTMLElement>(null)
  useGameCardAnimation(cardRef)

  return (
    <motion.article ref={cardRef} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.32 }} className="group relative min-w-0">
      <div className={cn('relative aspect-[1.4/1] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br shadow-[0_10px_24px_rgba(0,0,0,.28)] transition duration-300 group-hover:shadow-[0_10px_28px_rgba(168,85,247,.3)]', game.colors)}>
        {game.cover ? (
          <Image src={game.cover} alt={game.name} fill className="object-cover" />
        ) : (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(255,255,255,.4),transparent_18%),radial-gradient(circle_at_80%_80%,rgba(0,0,0,.5),transparent_55%)]" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-white/90 drop-shadow-[0_3px_6px_rgba(0,0,0,.5)]">{game.icon}</span>
              <span className="mt-2 max-w-[90%] text-center text-sm font-bold uppercase leading-none tracking-tight text-white drop-shadow-lg">{game.name}</span>
              <span className="mt-1 text-[8px] font-bold uppercase tracking-[.3em] text-white/70">LuckyRush Original</span>
            </div>
          </>
        )}
        {game.badge && (
          <SparkleBadge
            className={cn('absolute left-2 top-2 rounded-lg px-3 py-2 text-[11px] font-bold tracking-wider text-white',
              game.badge === 'NEW' ? 'bg-[#FF20E8] shadow-[0_0_18px_rgba(255,32,232,.6)]' :
              game.badge === 'EXCLUSIVE' ? 'bg-[#6D19FF] shadow-[0_0_18px_rgba(109,25,255,.6)]' :
              game.badge === 'HOT' ? 'bg-[#FF4500] shadow-[0_0_18px_rgba(255,69,0,.6)]' :
              game.badge === 'JACKPOT' ? 'bg-[#FFD700] shadow-[0_0_18px_rgba(255,215,0,.6)]' :
              game.badge === 'VIP' ? 'bg-[#9D4EDD] shadow-[0_0_18px_rgba(157,78,221,.6)]' :
              game.badge === 'BONUS' ? 'bg-[#00CED1] shadow-[0_0_18px_rgba(0,206,209,.6)]' :
              'bg-[#6D19FF] shadow-[0_0_18px_rgba(109,25,255,.6)]'
            )}
            badgeType={game.badge as "NEW" | "EXCLUSIVE" | "HOT" | "JACKPOT" | "VIP" | "BONUS"}
          >
            {game.badge}
          </SparkleBadge>
        )}
        <button aria-label={`Favorite ${game.name}`} className="absolute right-2 top-2 rounded-full bg-black/25 p-1.5 text-white/70 backdrop-blur transition hover:bg-black/50 hover:text-pink-300">
          <Heart className="size-3.5" />
        </button>
      </div>
      <p className="mt-2 truncate text-[13px] font-bold text-slate-300">{game.name}</p>
      <p className="mt-0.5 text-[11px] uppercase tracking-wider text-slate-600">Slots · Play now</p>
    </motion.article>
  )
}

function MobileHeader() { return <header className="sticky top-4 z-40 flex items-center justify-between border-b border-white/10 bg-[#08051A]/95 px-4 py-3 backdrop-blur-xl"><LuckyRushLogo height={36} className="h-9 w-[107px]" /><div className="flex items-center gap-1.5"><div className="rounded-lg border border-amber-400/20 bg-amber-400/[.06] px-2 py-1 text-[10px] font-bold text-white"><span className="text-amber-300">GC</span> 25,600</div><div className="rounded-lg border border-emerald-400/20 bg-emerald-400/[.06] px-2 py-1 text-[10px] font-bold text-white"><span className="text-emerald-300">SC</span> 12.50</div><button aria-label="Notifications" className="flex size-8 items-center justify-center rounded-lg border border-white/10 bg-white/[.04] text-slate-300"><Bell className="size-4" /></button></div></header> }

function MobileQuickNav() { const items = [{ label: 'Home', icon: Home, color: 'text-fuchsia-400' }, { label: 'Slots', icon: Zap, color: 'text-amber-400' }, { label: 'Live Casino', icon: Sparkles, color: 'text-cyan-400' }, { label: 'Table Games', icon: Trophy, color: 'text-yellow-400' }, { label: 'Promotions', icon: Gift, color: 'text-pink-400' }, { label: 'Search', icon: Search, color: 'text-slate-400' }]; return <nav aria-label="Quick navigation" className="flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">{items.map(({ label, icon: Icon, color }, index) => <button key={label} className={cn('flex min-w-[72px] shrink-0 flex-col items-center gap-1.5 rounded-xl border px-3 py-2.5 text-[10px] font-bold transition-all duration-300', index === 0 ? 'border-fuchsia-400/50 bg-fuchsia-500/15 text-white shadow-[0_0_15px_rgba(217,70,239,.25)]' : 'border-white/10 bg-white/[.03] text-slate-400 hover:border-white/20 hover:bg-white/[.06]')}><Icon className={cn('size-5', index === 0 ? 'text-fuchsia-300 drop-shadow-[0_0_8px_rgba(217,70,239,.5)]' : color)} />{label}</button>)}</nav> }

function MobileHero() {
  const [current, setCurrent] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setCurrent(i => (i + 1) % heroSlides.length), 4500)
    return () => clearInterval(t)
  }, [])
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative mx-4 min-h-[220px] overflow-hidden rounded-2xl border border-fuchsia-300/20 bg-[#160c32]"
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.85, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <Image src={heroSlides[current].src} alt={heroSlides[current].alt} fill className={cn('object-cover opacity-90', heroSlides[current].position)} priority />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-r from-[#110b27] via-[#1a0e3b]/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0820]/55 via-transparent to-transparent" />
      <div className="relative z-10 flex min-h-[220px] flex-col justify-center px-5 py-6">
        <p className="text-[9px] font-bold uppercase tracking-[.2em] text-fuchsia-300">Your lucky era starts here</p>
        <h1 className="mt-2 text-[32px] xs:text-[36px] font-black leading-[0.92] tracking-tight select-none">
          <span className="block bg-gradient-to-b from-white via-[#F5EDFF] to-[#BF7EFF] bg-clip-text text-transparent drop-shadow-[0_3px_4px_rgba(0,0,0,0.95)] drop-shadow-[0_0_14px_rgba(191,126,255,0.4)] whitespace-nowrap">PLAY. SPIN.</span>
          <span className="block bg-gradient-to-b from-[#FFFAD0] via-[#F5B520] to-[#994F00] bg-clip-text text-transparent drop-shadow-[0_3px_4px_rgba(0,0,0,0.95)] drop-shadow-[0_0_14px_rgba(245,181,32,0.4)] whitespace-nowrap">GET REWARDED.</span>
        </h1>
        <p className="mt-2 max-w-[180px] text-[11px] leading-4 text-slate-300">Thousands of games. Daily rewards.</p>
        <button className="mt-4 w-fit rounded-lg bg-gradient-to-r from-fuchsia-500 to-pink-500 px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-white shadow-lg">Play Now <ChevronRight className="ml-1 inline size-3" /></button>
      </div>
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={cn(
              'rounded-full transition-all duration-500',
              i === current ? 'h-1.5 w-5 bg-fuchsia-400 shadow-[0_0_6px_rgba(232,121,249,.7)]' : 'size-1.5 bg-white/35 hover:bg-white/55',
            )}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </motion.section>
  )
}


function MobilePromos() {
  const items = [
    { title: 'Daily Rewards', text: 'Claim every day', icon: Gift, background: '/daily-rewards-banner.png', accent: 'gold', align: 'right' },
    { title: 'New Games', text: 'Fresh experiences', icon: Sparkles, background: '/new-games-banner.png', accent: 'cyan', align: 'left' },
    { title: 'Free-to-Play', text: 'Play with GC & SC', icon: Zap, background: '/free-to-play-banner.png', accent: 'gold', align: 'right' },
  ]
  return (
    <div className="flex gap-3 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {items.map(({ title, text, icon: Icon, background, accent, align }) => (
        <motion.div
          whileTap={{ scale: 0.97 }}
          key={title}
          className={cn(
            'relative flex min-h-[84px] min-w-[220px] items-center overflow-hidden rounded-xl border p-3',
            background
              ? accent === 'cyan'
                ? 'border-cyan-300/40'
                : 'border-amber-300/30'
              : 'border-amber-400/20 bg-gradient-to-br from-amber-500/20 to-orange-500/5',
          )}
        >
          {background && (
            <>
              <Image
                src={background}
                alt=""
                fill
                className={cn('object-cover scale-[1.12]', align === 'right' ? 'object-left' : 'object-center')}
              />
              <div
                className={cn(
                  'absolute inset-0',
                  align === 'right'
                    ? title === 'Free-to-Play'
                      ? 'bg-gradient-to-r from-transparent via-[#2a1600]/20 to-[#140a00]/65'
                      : 'bg-gradient-to-r from-transparent via-[#1a0a2e]/20 to-[#12071f]/65'
                    : 'bg-[#04122c]/35',
                )}
              />
            </>
          )}
          <div className={cn('relative z-10 flex items-center gap-3', align === 'right' && 'ml-auto w-[55%]')}>
            {align !== 'right' && (
              <div className="flex size-9 items-center justify-center rounded-lg bg-white/10 text-fuchsia-200">
                <Icon className="size-4" />
              </div>
            )}
            <div>
              <p className="text-xs font-bold text-white drop-shadow-[0_1px_6px_rgba(0,0,0,.55)]">{title}</p>
              <p className={cn('mt-1 text-[10px]', background ? 'text-white/85' : 'text-slate-400')}>{text}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function MobileGameSection({ title, games: sectionGames }: { title: string; games: Game[] }) { return <section className="flex flex-col gap-3"><div className="flex items-center justify-between px-4"><h2 className="text-lg font-bold text-white">{title}</h2><button className="text-[11px] font-bold text-fuchsia-300">View All</button></div><div className="flex gap-3 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">{sectionGames.map(game => <div key={game.name} className="w-[142px] shrink-0"><GameCard game={game} /></div>)}</div></section> }

function MobileBottomNav() { const items = [{ label: 'Home', icon: Home, color: 'text-fuchsia-400' }, { label: 'Games', icon: LayoutGrid, color: 'text-cyan-400' }, { label: 'Rewards', icon: Crown, color: 'text-amber-400' }, { label: 'Promotions', icon: Gift, color: 'text-pink-400' }, { label: 'More', icon: Menu, color: 'text-slate-400' }]; return <nav className="fixed inset-x-0 bottom-0 z-50 flex h-[68px] items-end justify-around border-t border-white/10 bg-[#08051A]/95 px-2 pb-2 pt-1 backdrop-blur-xl">{items.map(({ label, icon: Icon, color }, i) => <button key={label} className={cn('flex min-w-[56px] flex-col items-center gap-1 rounded-xl px-2 py-1 text-[10px] font-bold transition-all duration-300', i === 2 ? 'bg-gradient-to-t from-fuchsia-600 to-violet-600 text-white shadow-[0_0_20px_rgba(217,70,239,.45)]' : 'text-slate-500 hover:text-slate-300')}><Icon className={cn('size-5', i === 2 ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,.3)]' : color)} />{label}</button>)}</nav> }

function MobileLobby() { return <div className="flex flex-col gap-5 pb-24 md:hidden"><MobileHeader /><MobileHero /><MobileQuickNav /><MobilePromos /><div className="px-8"><p className="mb-1 text-[10px] font-bold uppercase tracking-[.2em] text-fuchsia-300">Mini Game Center</p><LuckyMatchGame /></div><MobileGameSection title="Popular Games" games={games.slice(0, 6)} /><MobileGameSection title="Featured Slots" games={games.slice(6, 12)} /><MobileGameSection title="Live Casino" games={games.slice(2, 8)} /><MobileBottomNav /></div> }

export default function Page() {
  const [filter, setFilter] = useState('For You')
  useLuckyRushAnimations()

  const filters = [
    { label: 'For You', icon: Flame, iconClass: 'text-white' },
    { label: 'Trending', icon: TrendingUp, iconClass: 'text-[#C9C6D8]' },
    { label: 'New Games', icon: Star, iconClass: 'text-[#C9C6D8]' },
    { label: 'Jackpots', icon: Crown, iconClass: 'text-[#F0C14B]' },
    { label: 'Hold & Win', icon: Gem, iconClass: 'text-[#D7D3EA]' },
    { label: 'Popular', icon: Gamepad2, iconClass: 'text-[#C9C6D8]' },
    { label: 'Slots', icon: Zap, iconClass: 'text-[#E8C15A]' },
    { label: 'Live Casino', icon: Sparkles, iconClass: 'text-[#C9B6FF]' },
    { label: 'Table Games', icon: Trophy, iconClass: 'text-[#F0C14B]' },
  ]

  const visible =
    filter === 'For You' || filter === 'Slots'
      ? games
      : games.filter(game => game.category === filter || game.tags?.includes(filter))

  return (
    <>
      <FirstVisitPopups />
      <main
      className="
        relative
        min-h-screen
        md:h-screen
        md:overflow-hidden
        bg-[#05040F]
        text-white
        selection:bg-violet-500/30
      "
    >
      {/* ========================================================= */}
      {/* BACKGROUND AMBIENT LIGHT */}
      {/* ========================================================= */}

      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          fixed
          -left-52
          top-24
          size-[34rem]
          rounded-full
          bg-violet-700/[.07]
          blur-[130px]
        "
        animate={{
          opacity: [0.45, 0.7, 0.45],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          fixed
          bottom-[-12rem]
          right-[-8rem]
          size-[32rem]
          rounded-full
          bg-fuchsia-600/[.06]
          blur-[130px]
        "
        animate={{
          opacity: [0.35, 0.55, 0.35],
          scale: [1, 1.06, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* MOBILE */}
      <MobileLobby />

      {/* DESKTOP */}
      <div className="hidden md:block">
        <Navbar />
        <Sidebar />

        {/* RIGHT SIDEBAR - FIXED */}
        <aside className="fixed bottom-0 right-0 top-[80px] z-20 flex w-[280px] flex-col border-l border-white/[.08] bg-[#08051A] px-3 lg:w-[295px] xl:w-[315px] 2xl:w-[335px] max-h-[calc(100vh-80px)] overflow-y-auto">
          <div className="flex flex-col gap-4">
            <LatestWins />
            <MiniGameCenter />
          </div>
        </aside>

        <div className="ml-[264px] mr-[280px] h-screen pt-[80px] lg:mr-[295px] xl:mr-[315px] 2xl:mr-[335px]">
          <div className="flex h-[calc(100vh-80px)] w-full flex-col px-4 py-4 xl:px-6 xl:py-5 overflow-y-auto">

            {/* ================================================= */}
            {/* MAIN CONTENT */}
            {/* ================================================= */}

            <div className="flex min-h-0 flex-1 flex-col justify-between gap-4 xl:gap-5">

              {/* HERO */}
              <Hero />

              {/* PROMO CARDS */}
              <PromoCards />

              {/* ================================================= */}
              {/* GAME LOBBY */}
              {/* ================================================= */}

              <section className="relative">
                <div className="relative z-10 mb-3 flex items-center gap-3">
                  <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {filters.map(({ label, icon: Icon, iconClass }) => {
                      const active = filter === label
                      const buttonRef = useRef<HTMLButtonElement>(null)
                      useCategoryFilterAnimation(buttonRef, active)

                      return (
                        <button
                          key={label}
                          ref={buttonRef}
                          type="button"
                          onClick={() => setFilter(label)}
                          className={cn(
                            'flex h-[38px] shrink-0 items-center gap-1.5 rounded-full px-[14px] text-[13px] font-bold tracking-[-0.01em] transition-all duration-200',
                            active
                              ? 'bg-gradient-to-r from-[#7B3CFF] via-[#9B45F0] to-[#C44BFF] text-white shadow-[0_0_18px_rgba(168,85,247,.38)]'
                              : 'border border-white/[0.12] bg-[#16122C]/85 text-[#D4D0E4] hover:border-white/20 hover:bg-[#1C1836] hover:text-white',
                          )}
                        >
                          <Icon
                            className={cn('size-[15px] shrink-0', active ? 'text-white' : iconClass)}
                            strokeWidth={active ? 2.2 : 1.9}
                          />
                          {label}
                        </button>
                      )
                    })}
                  </div>

                  <button
                    type="button"
                    className="flex shrink-0 items-center gap-1 text-[13px] font-bold text-[#B7B3C9] transition-colors hover:text-white"
                  >
                    View All Games
                    <ChevronRight className="size-4" />
                  </button>
                </div>

                <motion.div
                  layout
                  className="relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 xl:gap-3.5"
                >
                  {visible.map(game => (
                    <GameCard
                      key={game.name}
                      game={game}
                    />
                  ))}
                </motion.div>
              </section>

              {/* ================================================= */}
              {/* WELCOME BONUS */}
              {/* ================================================= */}

              <section
                className="
                  group
                  relative
                  flex
                  flex-1
                  min-h-[140px]
                  sm:min-h-[165px]
                  flex-col
                  justify-center
                  overflow-hidden
                  rounded-[18px]
                  border
                  border-[#43226A]
                  bg-[#120B25]
                  shadow-[0_10px_35px_rgba(0,0,0,.2)]
                "
              >
                {/* Background image */}
                <Image
                  src="/welcome-bonus-gift-coins.png"
                  alt=""
                  fill
                  className="
                    object-cover
                    object-left
                    transition-transform
                    duration-700
                    group-hover:scale-[1.025]
                  "
                />

                {/* Main overlay */}
                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-r
                    from-[#12091F]/10
                    via-[#12091F]/45
                    to-[#12091F]/90
                  "
                />

                {/* Purple glow */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    right-[20%]
                    top-1/2
                    h-32
                    w-52
                    -translate-y-1/2
                    rounded-full
                    bg-violet-500/[.08]
                    blur-[55px]
                  "
                />

                {/* Content */}
                <div
                  className="
                    relative
                    z-10
                    flex
                    h-full
                    w-full
                    min-h-[140px]
                    sm:min-h-[165px]
                    items-center
                    px-5
                    py-4
                    sm:px-8
                    sm:py-5
                  "
                >
                  {/* RIGHT CONTENT */}
                  <div className="flex flex-col items-end ml-auto">
                    <p
                      className="
                        text-[10px]
                        sm:text-[11px]
                        font-bold
                        uppercase
                        tracking-[.2em]
                        text-fuchsia-300
                      "
                    >
                      A little something extra
                    </p>

                    <h2
                      className="mt-1 whitespace-nowrap bg-gradient-to-b from-[#FFFAD0] via-[#F5B520] to-[#994F00] bg-clip-text text-[24px] sm:text-[32px] md:text-[42px] lg:text-[58px] xl:text-[62px] font-black leading-[0.92] tracking-tight text-transparent drop-shadow-[0_4px_6px_rgba(0,0,0,0.95)]"
                    >
                      WELCOME BONUS
                    </h2>

                   

                    <div className="mt-4 sm:mt-5 flex gap-2 sm:gap-3">
                      <button
                        type="button"
                        onClick={(e) => {
                          showRewardPopup('+100,000 GC', document.body, e.clientX, e.clientY)
                          createSparkBurst({
                            x: e.clientX,
                            y: e.clientY,
                            count: 15,
                            size: 5,
                          })
                        }}
                        className="
                          flex
                          h-[42px]
                          sm:h-[48px]
                          items-center
                          justify-center
                          rounded-[12px]
                          border
                          border-amber-400/30
                          bg-gradient-to-r
                          from-amber-500
                          to-yellow-400
                          px-4
                          sm:px-6
                          text-[11px]
                          sm:text-[12px]
                          font-bold
                          uppercase
                          tracking-widest
                          text-[#1a0a00]
                          shadow-[0_0_18px_rgba(251,191,36,.25)]
                          transition-all
                          hover:brightness-110
                          hover:shadow-[0_0_25px_rgba(251,191,36,.38)]
                        "
                      >
                        Claim Reward
                      </button>
                      <button
                        type="button"
                        className="
                          flex
                          h-[42px]
                          sm:h-[48px]
                          items-center
                          justify-center
                          rounded-[12px]
                          border
                          border-white/20
                          bg-white/10
                          px-4
                          sm:px-6
                          text-[11px]
                          sm:text-[12px]
                          font-bold
                          uppercase
                          tracking-widest
                          text-white
                          backdrop-blur
                          transition-all
                          hover:bg-white/15
                          hover:border-white/30
                        "
                      >
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </div>

          </div>
        </div>
      </div>
    </main>
    </>
  )
}

