<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# LuckyRush GSAP Animation System

## Overview
The LuckyRush website uses GSAP (GreenSock Animation Platform) for premium motion effects, micro-interactions, and reward feedback. All animations are centralized in `lib/gsap-animations.ts` as reusable hooks and functions.

## Key Principles
- **Do NOT redesign** - Animations are layered on top of existing UI without changing layout, colors, spacing, or typography
- **Performance first** - Use transform, opacity, scale, rotation; avoid animating width/height/layout properties
- **Respect reduced motion** - All animations check `prefers-reduced-motion` media query
- **Clean up** - All GSAP contexts/timelines are cleaned up on component unmount using `gsap.context()`

## Available Hooks & Functions

### Main Hooks
- `useLuckyRushAnimations()` - Master hook that initializes page load entrance, scroll animations, pointer effects, and random micro-moments
- `useGameCardAnimation(cardRef)` - Adds hover lift, glow, image movement, and click feedback to game cards
- `usePromoCardAnimation(cardRef)` - Adds hover effects to promo cards
- `useCategoryFilterAnimation(buttonRef, isActive)` - Animates category filter buttons with glow on active state
- `useSidebarMenuItemAnimation(itemRef, isActive)` - Adds sidebar menu hover effects and breathing glow for active items
- `useHeroMotion(heroRef)` - Adds subtle parallax, floating particles, and CTA glow to hero section
- `useSpinButtonAnimation(buttonRef)` - Adds idle pulse, hover shine, and click burst to spin buttons

### Standalone Functions
- `createSparkBurst(options)` - Creates a burst of sparkle particles
- `createCoinBurst(options)` - Creates floating coin particles
- `animateRewardCounter(element, targetValue, duration, prefix, suffix)` - Animates number counting
- `showRewardPopup(text, container, x, y)` - Shows a floating reward notification
- `animateLiveWin(row)` - Animates new win entries in live feed

## Particle System
Particles use LuckyRush theme colors: purple (#B84DFF), fuchsia (#D946EF), electric blue (#38BDF8), gold (#FBBF24), white (#FFFFFF).

## Implementation Examples

### Game Card
```tsx
function GameCard({ game }: { game: Game }) {
  const cardRef = useRef<HTMLElement>(null)
  useGameCardAnimation(cardRef)

  return <article ref={cardRef}>...</article>
}
```

### Reward Counter
```tsx
function AnimatedWinAmount({ amount, winId, isNew }: { amount: string; winId: string; isNew: boolean }) {
  const elementRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!isNew || !elementRef.current) return
    const match = amount.match(/^([+])([\d,]+)\s*(GC|SC)$/)
    if (!match) return
    const [, prefix, numericStr, suffix] = match
    const targetValue = parseInt(numericStr.replace(/,/g, ''), 10)
    animateRewardCounter(elementRef.current, targetValue, 0.8, prefix, ` ${suffix}`)
  }, [amount, winId, isNew])

  return <span ref={elementRef}>{amount}</span>
}
```

### Reward Popup
```tsx
<button
  onClick={(e) => {
    showRewardPopup('+100,000 GC', document.body, e.clientX, e.clientY)
    createSparkBurst({ x: e.clientX, y: e.clientY, count: 15, size: 5 })
  }}
>
  Claim Reward
</button>
```

## Animation Types

### Page Load Entrance
- Header: subtle opacity + y movement (0.4-0.6s)
- Left sidebar: x:-20 → 0, opacity 0 → 1
- Main hero: opacity 0 → 1, scale 0.985 → 1
- Promo cards: stagger from 0.05-0.08s
- Game cards: subtle y:15 → 0, stagger quickly
- Right sidebar: x:20 → 0, opacity 0 → 1

### Game Card Hover
- Scale: 1 → 1.025
- Image moves 2-4px
- Glow around border
- Duration: 0.2-0.35s

### Game Card Click
- Scale: 1 → 0.97 → 1.02 → 1
- Quick glow burst
- Tiny particles
- Duration: ~350-500ms

### Spin Button
- Idle: subtle purple/gold glow pulse every few seconds
- Hover: stronger glow, shine sweep, tiny scale increase
- Click: scale down, spring overshoot, radial glow burst, particles

### Live Win Entry
- Small glow pulse around new row
- Avatar briefly scales 1 → 1.08 → 1
- Reward number counts up
- Tiny particles near reward
- "just now" brightness pulse

## Performance Guidelines
- Use `gsap.context()` for React components to auto-cleanup
- Prefer `gsap.quickTo()` for pointer-follow effects
- Use `transform` and `opacity` over layout properties
- Kill timelines on component unmount
- Prevent particle accumulation by auto-removing completed particles
- Respect `prefers-reduced-motion` preference

## Dependencies
- `gsap` - Core animation library
- `gsap/ScrollTrigger` - Scroll-based animations
- `gsap/Flip` - State change transitions

## File Structure
```
lib/
  gsap-animations.ts  # All animation hooks and functions
app/
  page.tsx           # Main page using animation hooks
components/
  LuckyMatchGame.tsx # Mini-game with spin button animation
```
