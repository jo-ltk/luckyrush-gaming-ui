'use client'

import { useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Bell, ChevronRight, CircleHelp, Crown, Gift, Heart, Home, LayoutGrid,
  LifeBuoy, Menu, Search, ShieldCheck, Sparkles, Star, Trophy, Zap,
} from 'lucide-react'
import { LuckyRushLogo, Navbar } from '@/components/Navbar'
import { cn } from '@/lib/utils'

type Game = { name: string; category: string; colors: string; badge?: string; icon: string; cover?: string; }

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
  { name: 'Neon Fortune', category: 'For You', colors: 'from-fuchsia-700 via-violet-600 to-indigo-950', badge: 'NEW', icon: '✦', cover: '/neon-fortune-777-jackpot.png' },
  { name: 'Golden Safari', category: 'Trending', colors: 'from-amber-500 via-orange-700 to-emerald-950', icon: '♛', cover: '/golden-safari-lion-jackpot.png' },
  { name: 'Lucky Lanterns', category: 'New Games', colors: 'from-red-500 via-fuchsia-600 to-indigo-950', badge: 'NEW', icon: '✧', cover: '/lucky-lanterns-fortune-in-gold.png' },
  { name: 'Ruby Rush', category: 'Jackpots', colors: 'from-rose-700 via-red-500 to-orange-900', badge: 'EXCLUSIVE', icon: '◆', cover: '/ruby-rush-glimmering-treasure-jackpot.png' },
  { name: 'Cosmic Coins', category: 'Trending', colors: 'from-cyan-500 via-blue-700 to-violet-950', icon: '✦', cover: '/cosmic-coins-astronaut-jackpot.png' },
  { name: 'Jungle Jackpot', category: 'Jackpots', colors: 'from-lime-600 via-emerald-700 to-teal-950', icon: '♜', cover: '/jungle-jackpot-monkey-adventure.png' },
  { name: 'Royal Reels', category: 'For You', colors: 'from-yellow-500 via-amber-700 to-purple-950', icon: '♚', cover: '/royal-reels-the-golden-king.png' },
  { name: 'Mystic Gems', category: 'Popular', colors: 'from-purple-600 via-blue-600 to-slate-950', icon: '◇', cover: '/mystic-gems-neon-crystal-fantasy.png' },
  { name: 'Treasure Trail', category: 'Hold & Win', colors: 'from-orange-500 via-yellow-700 to-red-950', icon: '☼', cover: '/pirate-treasure-trail-adventure.png' },
  { name: 'Candy Vault', category: 'Popular', colors: 'from-pink-500 via-purple-600 to-sky-950', badge: 'NEW', icon: '●', cover: '/candy-vault-sweet-fantasy-kingdom.png' },
  { name: 'Dragon Gold', category: 'Jackpots', colors: 'from-red-700 via-orange-600 to-amber-950', icon: '♨', cover: '/dragon-gold-fiery-treasure-quest.png' },
  { name: 'Moonlight Wins', category: 'For You', colors: 'from-indigo-500 via-violet-700 to-slate-950', icon: '☾', cover: '/moonlit-wolf-wins.png' },
]
const wins = [
  { user: 'PlayfulTiger', amount: '+250,000 GC', time: '2 min ago', avatar: '/win-playful-tiger.png' },
  { user: 'LuckyStar88', amount: '+1,200 SC', time: '5 min ago', avatar: '/win-lucky-star.png' },
  { user: 'SpinMaster', amount: '+75,000 GC', time: '8 min ago', avatar: '/win-spin-master.png' },
  { user: 'QueenBee', amount: '+500 SC', time: '12 min ago', avatar: '/win-queen-bee.png' },
  { user: 'GameKing', amount: '+320,000 GC', time: '15 min ago', avatar: '/win-game-king.png' },
]

function NavItem({ item, active = false }: { item: typeof navPrimary[number]; active?: boolean }) {
  const Icon = item.icon
  return <motion.button whileHover={{ x: 3 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.22 }} className={cn('group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] font-medium transition-all', active ? 'bg-gradient-to-r from-violet-600/80 to-fuchsia-600/70 text-white shadow-[0_0_22px_rgba(168,85,247,.3)] ring-1 ring-fuchsia-300/30' : 'text-slate-400 hover:bg-white/5 hover:text-white hover:shadow-[0_0_18px_rgba(168,85,247,.15)]')}><Icon className={cn('size-[17px] transition-transform duration-200 group-hover:scale-110', active ? 'text-fuchsia-100' : 'text-slate-500')} />{item.label}</motion.button>
}

function Sidebar() { return <aside className="fixed bottom-0 left-0 top-[72px] z-20 flex w-[224px] flex-col border-r border-white/[.08] bg-[#08051A]/95 px-4 py-6 backdrop-blur-xl"><div className="flex flex-col gap-1">{navPrimary.map((item, i) => <NavItem key={item.label} item={item} active={i === 0} />)}</div><div className="my-5 h-px bg-white/[.08]" /><div className="flex flex-col gap-1">{navSecondary.map(item => <NavItem key={item.label} item={item} />)}</div><div className="relative mt-auto min-h-[210px] overflow-hidden rounded-2xl border border-fuchsia-400/20 bg-[#160d29] p-4 shadow-[0_0_28px_rgba(124,58,237,.16)]"><Image src="/vip-club-golden-crown.png" alt="" fill className="object-cover object-top" /><div className="relative z-10 flex h-full min-h-[178px] flex-col justify-end"><p className="text-sm font-semibold text-white drop-shadow-[0_1px_8px_rgba(0,0,0,.7)]">Join Our VIP Club</p><p className="mt-1 text-[11px] leading-4 text-violet-100/90">Unlock exclusive rewards and special perks!</p><button className="mt-3 flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-fuchsia-300">Learn More <ChevronRight className="size-3" /></button></div></div></aside> }

function Hero() { return <div className="relative min-h-[292px] overflow-hidden rounded-2xl border border-fuchsia-300/20 bg-[#160c32] shadow-[0_12px_50px_rgba(0,0,0,.25)]"><Image src="/luckyrush-hero.png" alt="Neon casino jackpot night with Miami skyline, slot machine, and gold coins" fill className="object-cover object-[72%_center] opacity-95" priority /><div className="absolute inset-0 bg-gradient-to-r from-[#110b27] via-[#1a0e3b]/70 to-transparent" /><div className="relative z-10 flex h-full min-h-[292px] flex-col justify-center px-9 py-8"><p className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.25em] text-fuchsia-300"><Sparkles className="size-3" /> Your lucky era starts here</p><h1 className="max-w-[300px] text-[42px] font-black leading-[.94] tracking-tight text-white">PLAY. SPIN.<br /><span className="bg-gradient-to-r from-fuchsia-300 via-pink-400 to-amber-300 bg-clip-text text-transparent">GET REWARDED.</span></h1><p className="mt-3 max-w-[265px] text-xs leading-5 text-slate-300">Thousands of games. Daily rewards.<br />New favorites every week.</p><div className="mt-5 flex gap-2"><button className="rounded-lg bg-gradient-to-r from-fuchsia-500 to-pink-500 px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-white shadow-lg">Play Now</button><button className="rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-white backdrop-blur">View Games</button></div></div></div> }

function LatestWins() { return <motion.section initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45, delay: 0.18 }} className="self-start rounded-2xl border border-white/[.08] bg-white/[.035] p-4"><div className="mb-4 flex items-center justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-fuchsia-300">Live activity</p><h2 className="mt-1 text-base font-bold text-white">Latest Wins</h2></div><button className="text-[11px] font-semibold text-slate-500 hover:text-fuchsia-300">View All</button></div><div className="flex flex-col gap-2.5">{wins.map(({ user, amount, time, avatar }) => <div key={user} className="flex items-center gap-2.5 rounded-xl border border-white/[.05] bg-black/20 p-2"><div className="relative size-9 shrink-0 overflow-hidden rounded-lg"><Image src={avatar} alt="" fill className="object-cover" /></div><div className="min-w-0 flex-1"><p className="truncate text-[11px] font-semibold text-white">{user}</p><p className="text-[10px] font-bold text-amber-300">{amount}</p></div><p className="self-start pt-0.5 text-[9px] text-slate-600">{time}</p></div>)}</div></motion.section> }

function PromoCards() {
  const items = [
    { title: 'Daily Rewards', text: 'Log in every day and claim exciting rewards!', icon: Gift, color: 'from-fuchsia-500/25 to-violet-500/5', background: '/daily-rewards-banner.png', accent: 'gold', align: 'right' },
    { title: 'New Games Weekly', text: 'Fresh games, new experiences every week.', icon: Sparkles, color: 'from-cyan-500/20 to-blue-500/5', background: '/new-games-banner.png', accent: 'cyan', align: 'left' },
    { title: 'Free-to-Play', text: 'Play your favorite games with GC & SC.', icon: Zap, color: 'from-amber-500/20 to-orange-500/5', background: '/free-to-play-banner.png', accent: 'gold', align: 'right' },
  ]
  return (
    <motion.div initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.18 } } }} className="grid grid-cols-3 gap-3">
      {items.map(item => {
        const Icon = item.icon
        return (
          <motion.div
            key={item.title}
            variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.25 }}
            className={cn(
              'group relative flex min-h-[96px] items-center gap-3 overflow-hidden rounded-xl border p-3.5 transition-shadow hover:shadow-[0_8px_25px_rgba(168,85,247,.18)]',
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
            <div className={cn('relative z-10 flex items-center gap-3', item.align === 'right' && 'ml-auto w-[58%] justify-end')}>
              {item.align !== 'right' && (
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-fuchsia-200 transition-transform duration-200 group-hover:scale-110">
                  <Icon className="size-4" />
                </div>
              )}
              <div>
                <p className="text-xs font-bold text-white drop-shadow-[0_1px_6px_rgba(0,0,0,.55)]">{item.title}</p>
                <p className={cn('mt-1 text-[10px] leading-4', item.background ? 'text-white/85' : 'text-slate-400')}>{item.text}</p>
              </div>
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

function GameCard({ game }: { game: Game }) {
  return (
    <motion.article initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.32 }} whileHover={{ y: -4 }} className="group relative min-w-0">
      <div className={cn('relative aspect-[1.08/1] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br shadow-[0_10px_24px_rgba(0,0,0,.28)] transition duration-300 group-hover:shadow-[0_10px_28px_rgba(168,85,247,.3)]', game.colors)}>
        {game.cover ? (
          <Image src={game.cover} alt={game.name} fill className="object-cover" />
        ) : (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(255,255,255,.4),transparent_18%),radial-gradient(circle_at_80%_80%,rgba(0,0,0,.5),transparent_55%)]" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-white/90 drop-shadow-[0_3px_6px_rgba(0,0,0,.5)]">{game.icon}</span>
              <span className="mt-2 max-w-[90%] text-center text-sm font-black uppercase leading-none tracking-tight text-white drop-shadow-lg">{game.name}</span>
              <span className="mt-1 text-[8px] font-bold uppercase tracking-[.3em] text-white/70">LuckyRush Original</span>
            </div>
          </>
        )}
        {game.badge && (
          <span className={cn('absolute left-2 top-2 rounded-md px-1.5 py-1 text-[8px] font-black tracking-wider text-white', game.badge === 'NEW' ? 'bg-[#FF20E8] shadow-[0_0_14px_rgba(255,32,232,.4)]' : 'bg-[#6D19FF] shadow-[0_0_14px_rgba(109,25,255,.4)]')}>
            {game.badge}
          </span>
        )}
        <button aria-label={`Favorite ${game.name}`} className="absolute right-2 top-2 rounded-full bg-black/25 p-1.5 text-white/70 backdrop-blur transition hover:bg-black/50 hover:text-pink-300">
          <Heart className="size-3.5" />
        </button>
      </div>
      <p className="mt-2 truncate text-[11px] font-semibold text-slate-300">{game.name}</p>
      <p className="mt-0.5 text-[9px] uppercase tracking-wider text-slate-600">Slots · Play now</p>
    </motion.article>
  )
}

function MobileHeader() { return <header className="sticky top-0 z-40 flex items-center justify-between border-b border-white/10 bg-[#08051A]/95 px-4 py-3 backdrop-blur-xl"><LuckyRushLogo height={36} className="h-9 w-[107px]" /><div className="flex items-center gap-1.5"><div className="rounded-lg border border-amber-400/20 bg-amber-400/[.06] px-2 py-1 text-[10px] font-bold text-white"><span className="text-amber-300">GC</span> 25,600</div><div className="rounded-lg border border-emerald-400/20 bg-emerald-400/[.06] px-2 py-1 text-[10px] font-bold text-white"><span className="text-emerald-300">SC</span> 12.50</div><button aria-label="Notifications" className="flex size-8 items-center justify-center rounded-lg border border-white/10 bg-white/[.04] text-slate-300"><Bell className="size-4" /></button></div></header> }

function MobileQuickNav() { const items = [{ label: 'Home', icon: Home }, { label: 'Slots', icon: Zap }, { label: 'Live Casino', icon: Sparkles }, { label: 'Table Games', icon: Trophy }, { label: 'Promotions', icon: Gift }, { label: 'Search', icon: Search }]; return <nav aria-label="Quick navigation" className="flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">{items.map(({ label, icon: Icon }, index) => <button key={label} className={cn('flex min-w-[72px] shrink-0 flex-col items-center gap-1.5 rounded-xl border px-3 py-2.5 text-[10px] font-semibold', index === 0 ? 'border-fuchsia-400/50 bg-fuchsia-500/15 text-white' : 'border-white/10 bg-white/[.03] text-slate-400')}><Icon className="size-5" />{label}</button>)}</nav> }

function MobileHero() { return <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="relative mx-4 min-h-[220px] overflow-hidden rounded-2xl border border-fuchsia-300/20 bg-[#160c32]"><Image src="/luckyrush-hero.png" alt="Neon casino jackpot night with Miami skyline, slot machine, and gold coins" fill className="object-cover object-[72%_center] opacity-90" priority /><div className="absolute inset-0 bg-gradient-to-r from-[#110b27] via-[#1a0e3b]/80 to-transparent" /><div className="relative z-10 flex min-h-[220px] flex-col justify-center px-5 py-6"><p className="text-[9px] font-bold uppercase tracking-[.2em] text-fuchsia-300">Your lucky era starts here</p><h1 className="mt-2 text-[32px] font-black leading-[.94] tracking-tight text-white">PLAY. SPIN.<br /><span className="bg-gradient-to-r from-fuchsia-300 via-pink-400 to-amber-300 bg-clip-text text-transparent">GET REWARDED.</span></h1><p className="mt-2 max-w-[180px] text-[11px] leading-4 text-slate-300">Thousands of games. Daily rewards.</p><button className="mt-4 w-fit rounded-lg bg-gradient-to-r from-fuchsia-500 to-pink-500 px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-white shadow-lg">Play Now <ChevronRight className="ml-1 inline size-3" /></button></div><div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5"><span className="h-1.5 w-5 rounded-full bg-fuchsia-400" /><span className="size-1.5 rounded-full bg-white/40" /><span className="size-1.5 rounded-full bg-white/40" /></div></motion.section> }

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

function MobileGameSection({ title, games: sectionGames }: { title: string; games: Game[] }) { return <section className="flex flex-col gap-3"><div className="flex items-center justify-between px-4"><h2 className="text-lg font-bold text-white">{title}</h2><button className="text-[11px] font-semibold text-fuchsia-300">View All</button></div><div className="flex gap-3 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">{sectionGames.map(game => <div key={game.name} className="w-[142px] shrink-0"><GameCard game={game} /></div>)}</div></section> }

function MobileBottomNav() { const items = [{ label: 'Home', icon: Home }, { label: 'Games', icon: LayoutGrid }, { label: 'Rewards', icon: Crown }, { label: 'Promotions', icon: Gift }, { label: 'More', icon: Menu }]; return <nav className="fixed inset-x-0 bottom-0 z-50 flex h-[68px] items-end justify-around border-t border-white/10 bg-[#08051A]/95 px-2 pb-2 pt-1 backdrop-blur-xl">{items.map(({ label, icon: Icon }, i) => <button key={label} className={cn('flex min-w-[56px] flex-col items-center gap-1 rounded-xl px-2 py-1 text-[10px] font-semibold', i === 2 ? 'bg-gradient-to-t from-fuchsia-600 to-violet-600 text-white shadow-[0_0_20px_rgba(217,70,239,.45)]' : 'text-slate-500')}><Icon className="size-5" />{label}</button>)}</nav> }

function MobileLobby() { return <div className="flex flex-col gap-5 pb-24 md:hidden"><MobileHeader /><MobileHero /><MobileQuickNav /><MobilePromos /><MobileGameSection title="Popular Games" games={games.slice(0, 6)} /><MobileGameSection title="Featured Slots" games={games.slice(6, 12)} /><MobileGameSection title="Live Casino" games={games.slice(2, 8)} /><MobileBottomNav /></div> }

export default function Page() { const [filter, setFilter] = useState('For You'); const filters = ['For You', 'Trending', 'New Games', 'Jackpots', 'Hold & Win', 'Popular']; const visible = filter === 'For You' ? games : games.filter(game => game.category === filter); return <main className="relative min-h-screen overflow-hidden bg-[#05030F] text-white selection:bg-fuchsia-500/40"><motion.div aria-hidden="true" className="pointer-events-none fixed -left-40 top-28 size-[32rem] rounded-full bg-violet-700/10 blur-[120px]" animate={{ opacity: [0.35, 0.55, 0.35], scale: [1, 1.04, 1] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} /><motion.div aria-hidden="true" className="pointer-events-none fixed bottom-0 right-0 size-[28rem] rounded-full bg-fuchsia-600/10 blur-[120px]" animate={{ opacity: [0.25, 0.45, 0.25] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} /><MobileLobby /><div className="hidden md:block"><Navbar /><Sidebar /><div className="ml-[224px] pt-[76px]"><div className="mx-auto max-w-[1600px] px-7 py-7"><div className="grid grid-cols-[minmax(0,1fr)_292px] gap-6"><div className="flex min-w-0 flex-col gap-6"><Hero /><PromoCards /><div><div className="mb-4 flex items-end justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-slate-500">Explore the lobby</p><h2 className="mt-1 text-xl font-bold text-white">Find your next favorite</h2></div><div className="flex gap-1 rounded-xl border border-white/[.07] bg-white/[.03] p-1">{filters.map(item => <button key={item} onClick={() => setFilter(item)} className={cn('rounded-lg px-3 py-2 text-[10px] font-semibold transition', filter === item ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg' : 'text-slate-500 hover:text-white')}>{item}</button>)}</div></div><div className="grid grid-cols-6 gap-x-4 gap-y-6">{visible.map(game => <GameCard key={game.name} game={game} />)}</div></div><section className="relative overflow-hidden rounded-2xl border border-fuchsia-400/20 bg-[#211352] p-6 shadow-[0_0_35px_rgba(168,85,247,.15)]"><Image src="/welcome-bonus-gift-coins.png" alt="" fill className="object-cover object-left" /><div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#12071f]/20 to-[#12071f]/55" /><div className="relative z-10 flex items-center justify-between pl-[26%]"><div><p className="text-[10px] font-bold uppercase tracking-[.25em] text-amber-300">A little something extra</p><h2 className="mt-1 text-2xl font-black text-white drop-shadow-[0_1px_8px_rgba(0,0,0,.55)]">WELCOME BONUS</h2><p className="mt-1 text-xs text-violet-100/90">Sign up now and get <strong className="text-amber-300">FREE COINS</strong> to start playing!</p></div><div className="flex items-center gap-5"><div className="text-center"><p className="text-2xl font-black text-amber-300">100,000</p><p className="text-[9px] font-bold uppercase tracking-widest text-white/80">GC</p></div><span className="text-2xl font-black text-pink-300">+</span><div className="text-center"><p className="text-2xl font-black text-pink-300">10</p><p className="text-[9px] font-bold uppercase tracking-widest text-white/80">SC</p></div><button className="rounded-xl bg-gradient-to-r from-amber-300 to-orange-400 px-5 py-3 text-[10px] font-black uppercase tracking-widest text-[#33130b] shadow-lg">Claim Reward</button></div></div></section></div><LatestWins /></div></div></div></div></main> }

