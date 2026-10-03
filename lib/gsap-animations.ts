'use client'

import { useRef, useEffect, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flip } from 'gsap/Flip'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, Flip)
}

// Type for React ref
type Ref<T> = React.RefObject<T> | { current: T | null }

// Particle colors based on LuckyRush theme
const PARTICLE_COLORS = [
  '#B84DFF', // purple
  '#D946EF', // fuchsia
  '#38BDF8', // electric blue
  '#FBBF24', // gold
  '#FFFFFF', // white
]

// Check for reduced motion preference
const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Check if mobile device
const isMobile = () => {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 768
}

// ============================================================
// PARTICLE SYSTEM
// ============================================================

export interface ParticleOptions {
  x: number
  y: number
  color?: string
  size?: number
  count?: number
  duration?: number
  container?: HTMLElement
}

export function createSparkBurst(options: ParticleOptions) {
  if (prefersReducedMotion()) return

  const {
    x,
    y,
    color,
    size = 4,
    count = 12,
    duration = 0.8,
    container = document.body,
  } = options

  const particles: HTMLElement[] = []

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('span')
    const angle = (i / count) * Math.PI * 2
    const distance = 60 + Math.random() * 80
    const particleColor = color || PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)]
    const particleSize = size + Math.random() * 4

    particle.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      width: ${particleSize}px;
      height: ${particleSize}px;
      background: ${particleColor};
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      box-shadow: 0 0 8px ${particleColor};
    `

    container.appendChild(particle)
    particles.push(particle)

    const destX = Math.cos(angle) * distance
    const destY = Math.sin(angle) * distance

    gsap.to(particle, {
      x: destX,
      y: destY,
      opacity: 0,
      scale: 0,
      rotation: Math.random() * 360,
      duration: duration * (0.8 + Math.random() * 0.4),
      ease: 'power2.out',
      onComplete: () => {
        particle.remove()
      },
    })
  }
}

export function createCoinBurst(options: ParticleOptions) {
  if (prefersReducedMotion()) return

  const { x, y, count = 8, container = document.body } = options

  for (let i = 0; i < count; i++) {
    const coin = document.createElement('div')
    const angle = (i / count) * Math.PI * 2
    const distance = 40 + Math.random() * 60

    coin.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      width: 16px;
      height: 16px;
      background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      box-shadow: 0 0 10px rgba(255, 215, 0, 0.6);
    `

    container.appendChild(coin)

    const destX = Math.cos(angle) * distance
    const destY = Math.sin(angle) * distance - 50 // Float upward

    gsap.timeline()
      .to(coin, {
        x: destX,
        y: destY,
        rotation: 720,
        duration: 0.6,
        ease: 'power2.out',
      })
      .to(coin, {
        opacity: 0,
        scale: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => coin.remove(),
      })
  }
}

// ============================================================
// REWARD COUNTER ANIMATION
// ============================================================

export function animateRewardCounter(
  element: HTMLElement,
  targetValue: number,
  duration: number = 0.8,
  prefix: string = '',
  suffix: string = ''
) {
  if (prefersReducedMotion()) {
    element.textContent = `${prefix}${targetValue.toLocaleString()}${suffix}`
    return
  }

  const startValue = 0
  const obj = { value: startValue }

  gsap.to(obj, {
    value: targetValue,
    duration,
    ease: 'power2.out',
    onUpdate: () => {
      element.textContent = `${prefix}${Math.floor(obj.value).toLocaleString()}${suffix}`
    },
  })
}

// ============================================================
// GAME CARD ANIMATIONS
// ============================================================

export function useGameCardAnimation(cardRef: Ref<HTMLElement>) {
  const ctxRef = useRef<gsap.Context | null>(null)

  useEffect(() => {
    if (!cardRef.current) return

    const ctx = gsap.context(() => {
      const card = cardRef.current
      if (!card) return

      // Hover animation
      const handleMouseEnter = () => {
        gsap.to(card, {
          scale: 1.025,
          duration: 0.25,
          ease: 'power2.out',
        })

        // Subtle image movement
        const image = card.querySelector('img')
        if (image) {
          gsap.to(image, {
            y: -3,
            duration: 0.25,
            ease: 'power2.out',
          })
        }

        // Glow effect
        gsap.to(card, {
          boxShadow: '0 0 30px rgba(168, 85, 247, 0.4)',
          duration: 0.25,
        })
      }

      const handleMouseLeave = () => {
        gsap.to(card, {
          scale: 1,
          duration: 0.2,
          ease: 'power2.out',
        })

        const image = card.querySelector('img')
        if (image) {
          gsap.to(image, {
            y: 0,
            duration: 0.2,
            ease: 'power2.out',
          })
        }

        gsap.to(card, {
          boxShadow: '0 10px 24px rgba(0, 0, 0, 0.28)',
          duration: 0.2,
        })
      }

      const handleClick = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        // Click feedback
        gsap.timeline()
          .to(card, {
            scale: 0.97,
            duration: 0.08,
            ease: 'power2.in',
          })
          .to(card, {
            scale: 1.02,
            duration: 0.12,
            ease: 'elastic.out(1, 0.5)',
          })
          .to(card, {
            scale: 1,
            duration: 0.15,
            ease: 'power2.out',
          })

        // Quick glow burst
        gsap.to(card, {
          boxShadow: '0 0 40px rgba(217, 70, 239, 0.6)',
          duration: 0.15,
          yoyo: true,
          repeat: 1,
        })

        // Particles
        createSparkBurst({
          x: e.clientX,
          y: e.clientY,
          count: 8,
          size: 3,
        })
      }

      card.addEventListener('mouseenter', handleMouseEnter)
      card.addEventListener('mouseleave', handleMouseLeave)
      card.addEventListener('click', handleClick)

      return () => {
        card.removeEventListener('mouseenter', handleMouseEnter)
        card.removeEventListener('mouseleave', handleMouseLeave)
        card.removeEventListener('click', handleClick)
      }
    }, cardRef)

    ctxRef.current = ctx

    return () => {
      ctx.revert()
    }
  }, [cardRef])
}

// ============================================================
// SPIN BUTTON ANIMATION
// ============================================================

export function useSpinButtonAnimation(buttonRef: Ref<HTMLElement>) {
  const ctxRef = useRef<gsap.Context | null>(null)

  useEffect(() => {
    if (!buttonRef.current) return

    const ctx = gsap.context(() => {
      const button = buttonRef.current
      if (!button) return

      // Idle pulse
      const pulseTimeline = gsap.timeline({ repeat: -1, yoyo: true })
      pulseTimeline.to(button, {
        boxShadow: '0 0 20px rgba(217, 70, 239, 0.5)',
        scale: 1.02,
        duration: 2,
        ease: 'sine.inOut',
      })

      // Hover effect
      const handleMouseEnter = () => {
        gsap.to(button, {
          scale: 1.05,
          boxShadow: '0 0 30px rgba(217, 70, 239, 0.7)',
          duration: 0.2,
          ease: 'power2.out',
        })

        // Shine effect
        const shine = document.createElement('div')
        shine.style.cssText = `
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          pointer-events: none;
        `
        button.appendChild(shine)

        gsap.to(shine, {
          left: '150%',
          duration: 0.6,
          ease: 'power2.out',
          onComplete: () => shine.remove(),
        })
      }

      const handleMouseLeave = () => {
        gsap.to(button, {
          scale: 1,
          boxShadow: '0 0 18px rgba(217, 70, 239, 0.25)',
          duration: 0.2,
          ease: 'power2.out',
        })
      }

      const handleClick = (e: MouseEvent) => {
        const rect = button.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        // Click compression
        gsap.timeline()
          .to(button, {
            scale: 0.92,
            duration: 0.08,
            ease: 'power2.in',
          })
          .to(button, {
            scale: 1.08,
            duration: 0.15,
            ease: 'elastic.out(1, 0.4)',
          })
          .to(button, {
            scale: 1,
            duration: 0.2,
            ease: 'power2.out',
          })

        // Radial glow burst
        gsap.to(button, {
          boxShadow: '0 0 50px rgba(217, 70, 239, 0.8)',
          duration: 0.2,
          yoyo: true,
          repeat: 1,
        })

        // Particles around button
        createSparkBurst({
          x: centerX,
          y: centerY,
          count: 16,
          size: 5,
          duration: 1,
        })
      }

      button.addEventListener('mouseenter', handleMouseEnter)
      button.addEventListener('mouseleave', handleMouseLeave)
      button.addEventListener('click', handleClick)

      return () => {
        pulseTimeline.kill()
        button.removeEventListener('mouseenter', handleMouseEnter)
        button.removeEventListener('mouseleave', handleMouseLeave)
        button.removeEventListener('click', handleClick)
      }
    }, buttonRef)

    ctxRef.current = ctx

    return () => {
      ctx.revert()
    }
  }, [buttonRef])
}

// ============================================================
// REWARD POPUP
// ============================================================

export function showRewardPopup(
  text: string,
  container: HTMLElement = document.body,
  x?: number,
  y?: number
) {
  if (prefersReducedMotion()) return

  const popup = document.createElement('div')
  popup.textContent = text
  popup.style.cssText = `
    position: fixed;
    ${x !== undefined ? `left: ${x}px;` : 'left: 50%;'}
    ${y !== undefined ? `top: ${y}px;` : 'top: 50%;'}
    ${x === undefined ? 'transform: translateX(-50%);' : ''}
    padding: 12px 24px;
    background: linear-gradient(135deg, #8F32E8 0%, #D946EF 100%);
    color: white;
    font-weight: bold;
    font-size: 16px;
    border-radius: 12px;
    pointer-events: none;
    z-index: 10000;
    box-shadow: 0 0 30px rgba(217, 70, 239, 0.6);
    white-space: nowrap;
  `

  container.appendChild(popup)

  // Particles around popup
  const rect = popup.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  createSparkBurst({
    x: centerX,
    y: centerY,
    count: 12,
    size: 4,
  })

  gsap.timeline()
    .fromTo(
      popup,
      { opacity: 0, scale: 0.8, y: 15 },
      { opacity: 1, scale: 1.08, y: 0, duration: 0.3, ease: 'back.out(1.7)' }
    )
    .to(popup, {
      scale: 1,
      duration: 0.15,
      ease: 'power2.out',
    })
    .to(
      popup,
      {
        y: -20,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
        delay: 0.8,
      },
      '>'
    )
    .to(popup, {
      display: 'none',
      duration: 0,
      onComplete: () => popup.remove(),
    })
}

// ============================================================
// LIVE WIN ANIMATION
// ============================================================

export function animateLiveWin(row: HTMLElement) {
  if (!row) return

  // Glow pulse
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

  // Avatar scale
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

  // Tiny particles near reward
  const rewardText = row.querySelector('[class*="amber-300"]')
  if (rewardText) {
    const rect = rewardText.getBoundingClientRect()
    createSparkBurst({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      count: 6,
      size: 3,
    })
  }

  // "just now" brightness pulse
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

// ============================================================
// PROMO CARD ANIMATION
// ============================================================

export function usePromoCardAnimation(cardRef: Ref<HTMLElement>) {
  const ctxRef = useRef<gsap.Context | null>(null)

  useEffect(() => {
    if (!cardRef.current) return

    const ctx = gsap.context(() => {
      const card = cardRef.current
      if (!card) return

      const handleMouseEnter = () => {
        gsap.to(card, {
          y: -4,
          duration: 0.25,
          ease: 'power2.out',
        })

        const image = card.querySelector('img')
        if (image) {
          gsap.to(image, {
            scale: 1.03,
            duration: 0.25,
            ease: 'power2.out',
          })
        }

        gsap.to(card, {
          boxShadow: '0 8px 25px rgba(168, 85, 247, 0.18)',
          duration: 0.25,
        })
      }

      const handleMouseLeave = () => {
        gsap.to(card, {
          y: 0,
          duration: 0.2,
          ease: 'power2.out',
        })

        const image = card.querySelector('img')
        if (image) {
          gsap.to(image, {
            scale: 1,
            duration: 0.2,
            ease: 'power2.out',
          })
        }

        gsap.to(card, {
          boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
          duration: 0.2,
        })
      }

      const handleClick = (e: MouseEvent) => {
        createSparkBurst({
          x: e.clientX,
          y: e.clientY,
          count: 10,
          size: 4,
        })
      }

      card.addEventListener('mouseenter', handleMouseEnter)
      card.addEventListener('mouseleave', handleMouseLeave)
      card.addEventListener('click', handleClick)

      return () => {
        card.removeEventListener('mouseenter', handleMouseEnter)
        card.removeEventListener('mouseleave', handleMouseLeave)
        card.removeEventListener('click', handleClick)
      }
    }, cardRef)

    ctxRef.current = ctx

    return () => {
      ctx.revert()
    }
  }, [cardRef])
}

// ============================================================
// CATEGORY FILTER ANIMATION
// ============================================================

export function useCategoryFilterAnimation(buttonRef: Ref<HTMLElement>, isActive: boolean) {
  const ctxRef = useRef<gsap.Context | null>(null)

  useEffect(() => {
    if (!buttonRef.current) return

    const ctx = gsap.context(() => {
      const button = buttonRef.current
      if (!button) return

      if (isActive) {
        // Active state glow
        gsap.to(button, {
          boxShadow: '0 0 18px rgba(168, 85, 247, 0.38)',
          scale: 1.05,
          duration: 0.2,
          ease: 'power2.out',
        })

        // Animated highlight
        const highlight = document.createElement('div')
        highlight.style.cssText = `
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          pointer-events: none;
          border-radius: inherit;
        `
        button.appendChild(highlight)

        gsap.to(highlight, {
          left: '150%',
          duration: 0.8,
          ease: 'power2.out',
          onComplete: () => highlight.remove(),
        })
      } else {
        gsap.to(button, {
          boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
          scale: 1,
          duration: 0.2,
          ease: 'power2.out',
        })
      }
    }, buttonRef)

    ctxRef.current = ctx

    return () => {
      ctx.revert()
    }
  }, [buttonRef, isActive])
}

// ============================================================
// SIDEBAR MENU ANIMATION
// ============================================================

export function useSidebarMenuItemAnimation(itemRef: Ref<HTMLElement>, isActive: boolean) {
  const ctxRef = useRef<gsap.Context | null>(null)

  useEffect(() => {
    if (!itemRef.current) return

    const ctx = gsap.context(() => {
      const item = itemRef.current
      if (!item) return

      const handleMouseEnter = () => {
        const icon = item.querySelector('svg')
        if (icon) {
          gsap.to(icon, {
            x: 2,
            duration: 0.2,
            ease: 'power2.out',
          })
        }

        gsap.to(item, {
          filter: 'brightness(1.1)',
          duration: 0.2,
          ease: 'power2.out',
        })

        if (!isActive) {
          gsap.to(item, {
            boxShadow: '0 0 15px rgba(168, 85, 247, 0.15)',
            duration: 0.2,
            ease: 'power2.out',
          })
        }
      }

      const handleMouseLeave = () => {
        const icon = item.querySelector('svg')
        if (icon) {
          gsap.to(icon, {
            x: 0,
            duration: 0.2,
            ease: 'power2.out',
          })
        }

        gsap.to(item, {
          filter: 'brightness(1)',
          duration: 0.2,
          ease: 'power2.out',
        })

        if (!isActive) {
          gsap.to(item, {
            boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
            duration: 0.2,
            ease: 'power2.out',
          })
        }
      }

      item.addEventListener('mouseenter', handleMouseEnter)
      item.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        item.removeEventListener('mouseenter', handleMouseEnter)
        item.removeEventListener('mouseleave', handleMouseLeave)
      }
    }, itemRef)

    ctxRef.current = ctx

    return () => {
      ctx.revert()
    }
  }, [itemRef, isActive])

  // Selected item breathing glow
  useEffect(() => {
    if (!isActive || !itemRef.current) return

    const item = itemRef.current
    const pulseTimeline = gsap.timeline({ repeat: -1, yoyo: true })
    pulseTimeline.to(item, {
      boxShadow: '0 0 25px rgba(217, 70, 239, 0.4)',
      duration: 2,
      ease: 'sine.inOut',
    })

    return () => {
      pulseTimeline.kill()
    }
  }, [isActive, itemRef])
}

// ============================================================
// PAGE LOAD ENTRANCE
// ============================================================

export function usePageLoadEntrance() {
  useEffect(() => {
    if (prefersReducedMotion() || typeof document === 'undefined') return

    const timeline = gsap.timeline()

    // Header
    const header = document.querySelector('header')
    if (header) {
      timeline.fromTo(
        header,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      )
    }

    // Left sidebar
    const leftSidebar = document.querySelector('aside:first-of-type')
    if (leftSidebar) {
      timeline.fromTo(
        leftSidebar,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.3'
      )
    }

    // Main hero
    const hero = document.querySelector('[class*="Hero"]') || document.querySelector('section')
    if (hero) {
      timeline.fromTo(
        hero,
        { opacity: 0, scale: 0.985 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      )
    }

    // Promo cards
    const promoCards = document.querySelectorAll('[class*="PromoCards"] > div > div')
    if (promoCards.length > 0) {
      timeline.fromTo(
        promoCards,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out' },
        '-=0.3'
      )
    }

    // Game cards
    const gameCards = document.querySelectorAll('[class*="GameCard"]')
    if (gameCards.length > 0) {
      timeline.fromTo(
        gameCards,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.35, stagger: 0.05, ease: 'power2.out' },
        '-=0.2'
      )
    }

    // Right sidebar
    const rightSidebar = document.querySelector('aside:last-of-type')
    if (rightSidebar) {
      timeline.fromTo(
        rightSidebar,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.3'
      )
    }

    return () => {
      timeline.kill()
    }
  }, [])
}

// ============================================================
// HERO SUBTLE MOTION
// ============================================================

export function useHeroMotion(heroRef: Ref<HTMLElement>) {
  const ctxRef = useRef<gsap.Context | null>(null)

  useEffect(() => {
    if (!heroRef.current) return

    const ctx = gsap.context(() => {
      const hero = heroRef.current
      if (!hero) return

      // Very slow parallax on background
      const image = hero.querySelector('img')
      if (image) {
        gsap.to(image, {
          y: 10,
          duration: 8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      }

      // Floating light particles (subtle)
      const particleContainer = document.createElement('div')
      particleContainer.style.cssText = `
        position: absolute;
        inset: 0;
        pointer-events: none;
        overflow: hidden;
      `
      hero.appendChild(particleContainer)

      for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div')
        const size = 2 + Math.random() * 3
        particle.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
        `
        particleContainer.appendChild(particle)

        gsap.to(particle, {
          y: -50 - Math.random() * 50,
          x: (Math.random() - 0.5) * 30,
          opacity: 0,
          duration: 4 + Math.random() * 3,
          repeat: -1,
          delay: Math.random() * 2,
          ease: 'none',
        })
      }

      // Subtle glow around CTA
      const cta = hero.querySelector('button')
      if (cta) {
        gsap.to(cta, {
          boxShadow: '0 0 25px rgba(217, 70, 239, 0.4)',
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      }

      return () => {
        particleContainer.remove()
      }
    }, heroRef)

    ctxRef.current = ctx

    return () => {
      ctx.revert()
    }
  }, [heroRef])
}

// ============================================================
// SCROLL ANIMATIONS
// ============================================================

export function useScrollAnimations() {
  useEffect(() => {
    if (prefersReducedMotion() || typeof document === 'undefined') return

    // Animate sections as they enter viewport
    const sections = document.querySelectorAll('section')
    sections.forEach(section => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])
}

// ============================================================
// MOUSE/POINTER EFFECT
// ============================================================

// DISABLED - This was causing the entire window to move with mouse movement
// The existing sparkle cursor effect in SparkleCursor.tsx should be used instead
export function usePointerEffect() {
  // No-op function to prevent breaking existing code
  useEffect(() => {
    // Intentionally empty - disabled to prevent unwanted window movement
  }, [])
}

// ============================================================
// RANDOM MICRO-MOMENTS
// ============================================================

export function useRandomMicroMoments() {
  useEffect(() => {
    if (prefersReducedMotion() || typeof document === 'undefined') return

    // Occasional sparkle near rewards
    const rewardElements = document.querySelectorAll('[class*="amber-300"], [class*="text-fuchsia-300"]')

    const addRandomSparkle = () => {
      if (rewardElements.length === 0) return

      const randomElement = rewardElements[Math.floor(Math.random() * rewardElements.length)]
      const rect = randomElement.getBoundingClientRect()

      createSparkBurst({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        count: 3,
        size: 2,
      })
    }

    // Random sparkles every 3-6 seconds
    const interval = setInterval(() => {
      if (Math.random() > 0.5) {
        addRandomSparkle()
      }
    }, 4000)

    return () => {
      clearInterval(interval)
    }
  }, [])
}

// ============================================================
// FIRST-VISIT POPUP ANIMATIONS
// ============================================================

export interface PopupOptions {
  title: string
  subtitle: string
  reward: string
  buttonText: string
  onClaim?: () => void
  delay?: number
}

export function showWelcomePopup(options: PopupOptions) {
  if (prefersReducedMotion()) return

  const { title, subtitle, reward, buttonText, onClaim, delay = 1500 } = options

  // Check if already shown this session
  if (typeof window !== 'undefined' && sessionStorage.getItem('luckyrush-welcome-shown')) {
    return
  }

  setTimeout(() => {
    // Mark as shown
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('luckyrush-welcome-shown', 'true')
    }

    // Create backdrop
    const backdrop = document.createElement('div')
    backdrop.style.cssText = `
      position: fixed;
      inset: 0;
      background: rgba(8, 5, 26, 0.75);
      backdrop-filter: blur(4px);
      z-index: 9998;
      opacity: 0;
    `
    document.body.appendChild(backdrop)

    // Create popup
    const popup = document.createElement('div')
    popup.style.cssText = `
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) scale(0.8);
      width: min(90%, 400px);
      background: linear-gradient(135deg, #120A3A 0%, #1A0E3B 50%, #0D0820 100%);
      border: 2px solid rgba(184, 77, 255, 0.4);
      border-radius: 20px;
      padding: 32px 24px;
      z-index: 9999;
      opacity: 0;
      box-shadow: 0 0 60px rgba(184, 77, 255, 0.3), 0 20px 60px rgba(0, 0, 0, 0.5);
    `

    popup.innerHTML = `
      <div style="text-align: center;">
        <div style="
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #D946EF;
          margin-bottom: 8px;
          text-shadow: 0 0 10px rgba(217, 70, 239, 0.5);
        ">${title}</div>
        <div style="
          font-size: 18px;
          font-weight: 700;
          color: #FFFFFF;
          margin-bottom: 16px;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
        ">${subtitle}</div>
        <div class="reward-amount" style="
          font-size: 36px;
          font-weight: 900;
          background: linear-gradient(135deg, #FFE45C 0%, #F5B520 50%, #994F00 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 24px;
          text-shadow: 0 0 20px rgba(245, 181, 32, 0.4);
        ">0</div>
        <button class="claim-button" style="
          width: 100%;
          height: 52px;
          background: linear-gradient(135deg, #8F32E8 0%, #D946EF 100%);
          border: 2px solid rgba(184, 77, 255, 0.5);
          border-radius: 14px;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: white;
          cursor: pointer;
          box-shadow: 0 0 20px rgba(217, 70, 239, 0.4);
          transition: all 0.2s ease;
        ">${buttonText}</button>
      </div>
    `

    document.body.appendChild(popup)

    const button = popup.querySelector('.claim-button') as HTMLElement
    const rewardEl = popup.querySelector('.reward-amount') as HTMLElement

    // Animate backdrop
    gsap.to(backdrop, { opacity: 1, duration: 0.4, ease: 'power2.out' })

    // Animate popup entrance
    gsap.timeline()
      .to(popup, {
        opacity: 1,
        scale: 1.05,
        duration: 0.3,
        ease: 'back.out(1.5)',
      })
      .to(popup, {
        scale: 1,
        duration: 0.15,
        ease: 'power2.out',
      })
      .add(() => {
        // Animate reward counter
        const match = reward.match(/^([\d,]+)\s*(GC|SC)$/)
        if (match && rewardEl) {
          const [, numericStr, suffix] = match
          const targetValue = parseInt(numericStr.replace(/,/g, ''), 10)
          animateRewardCounter(rewardEl, targetValue, 1.2, '', ` ${suffix}`)
        }

        // Particle burst around popup (fewer on mobile)
        const rect = popup.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const particleCount = isMobile() ? 12 : 20
        const coinCount = isMobile() ? 5 : 8

        createSparkBurst({
          x: centerX,
          y: centerY,
          count: particleCount,
          size: 5,
          duration: 1.2,
        })

        // Floating coins
        createCoinBurst({
          x: centerX,
          y: centerY,
          count: coinCount,
        })
      }, '-=0.1')

    // Button pulse
    const pulseTimeline = gsap.timeline({ repeat: -1, yoyo: true })
    pulseTimeline.to(button, {
      boxShadow: '0 0 30px rgba(217, 70, 239, 0.6)',
      scale: 1.02,
      duration: 2,
      ease: 'sine.inOut',
    })

    // Button click handler
    button.addEventListener('click', () => {
      const rect = button.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      // Button press
      gsap.to(button, { scale: 0.95, duration: 0.08, ease: 'power2.in' })

      // Popup flash
      gsap.to(popup, {
        boxShadow: '0 0 80px rgba(217, 70, 239, 0.6)',
        duration: 0.15,
        yoyo: true,
        repeat: 1,
      })

      // Reward pop
      if (rewardEl) {
        gsap.to(rewardEl, {
          scale: 1.15,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          ease: 'power2.inOut',
        })
      }

      // Particle burst (fewer on mobile)
      const particleCount = isMobile() ? 10 : 15
      createSparkBurst({
        x: centerX,
        y: centerY,
        count: particleCount,
        size: 4,
        duration: 0.8,
      })

      // Glow expansion
      gsap.to(popup, {
        boxShadow: '0 0 100px rgba(184, 77, 255, 0.5)',
        duration: 0.3,
        onComplete: () => {
          // Close popup
          gsap.timeline()
            .to(popup, {
              opacity: 0,
              scale: 0.9,
              duration: 0.3,
              ease: 'power2.in',
            })
            .to(backdrop, {
              opacity: 0,
              duration: 0.3,
              ease: 'power2.in',
            }, '<')
            .call(() => {
              popup.remove()
              backdrop.remove()
              pulseTimeline.kill()
              if (onClaim) onClaim()
            })
        },
      })
    })
  }, delay)
}

export function showBonusPopup(options: Partial<PopupOptions>) {
  if (prefersReducedMotion()) return

  const { title = 'LUCKY BONUS', subtitle = 'YOU FOUND A BONUS!', reward = '+25,000 GC', buttonText = 'COLLECT', onClaim, delay = 800 } = options

  setTimeout(() => {
    // Create backdrop
    const backdrop = document.createElement('div')
    backdrop.style.cssText = `
      position: fixed;
      inset: 0;
      background: rgba(8, 5, 26, 0.6);
      backdrop-filter: blur(3px);
      z-index: 9998;
      opacity: 0;
    `
    document.body.appendChild(backdrop)

    // Create popup (smaller)
    const popup = document.createElement('div')
    popup.style.cssText = `
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) scale(0.9);
      width: min(85%, 320px);
      background: linear-gradient(135deg, #1A0E3B 0%, #0D0820 100%);
      border: 2px solid rgba(251, 191, 36, 0.5);
      border-radius: 16px;
      padding: 24px 20px;
      z-index: 9999;
      opacity: 0;
      box-shadow: 0 0 50px rgba(251, 191, 36, 0.3), 0 15px 40px rgba(0, 0, 0, 0.4);
    `

    popup.innerHTML = `
      <div style="text-align: center;">
        <div style="
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #FBBF24;
          margin-bottom: 6px;
          text-shadow: 0 0 10px rgba(251, 191, 36, 0.5);
        ">${title}</div>
        <div style="
          font-size: 16px;
          font-weight: 700;
          color: #FFFFFF;
          margin-bottom: 12px;
        ">${subtitle}</div>
        <div class="reward-amount" style="
          font-size: 28px;
          font-weight: 900;
          background: linear-gradient(135deg, #FFE45C 0%, #F5B520 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 20px;
        ">0</div>
        <button class="collect-button" style="
          width: 100%;
          height: 46px;
          background: linear-gradient(135deg, #D946EF 0%, #8F32E8 100%);
          border: 2px solid rgba(184, 77, 255, 0.5);
          border-radius: 12px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: white;
          cursor: pointer;
          box-shadow: 0 0 15px rgba(217, 70, 239, 0.4);
        ">${buttonText}</button>
      </div>
    `

    document.body.appendChild(popup)

    const button = popup.querySelector('.collect-button') as HTMLElement
    const rewardEl = popup.querySelector('.reward-amount') as HTMLElement

    // Animate backdrop
    gsap.to(backdrop, { opacity: 1, duration: 0.3, ease: 'power2.out' })

    // Quick scale-in
    gsap.timeline()
      .to(popup, {
        opacity: 1,
        scale: 1,
        duration: 0.25,
        ease: 'back.out(1.3)',
      })
      .add(() => {
        // Animate reward counter
        const match = reward.match(/^([+]?)([\d,]+)\s*(GC|SC)$/)
        if (match && rewardEl) {
          const [, prefix, numericStr, suffix] = match
          const targetValue = parseInt(numericStr.replace(/,/g, ''), 10)
          animateRewardCounter(rewardEl, targetValue, 0.6, prefix || '', ` ${suffix}`)
        }

        // Purple/gold glow
        gsap.to(popup, {
          boxShadow: '0 0 60px rgba(251, 191, 36, 0.4)',
          duration: 0.3,
          yoyo: true,
          repeat: 1,
        })

        // Sparkle burst (fewer on mobile)
        const rect = popup.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const particleCount = isMobile() ? 8 : 12

        createSparkBurst({
          x: centerX,
          y: centerY,
          count: particleCount,
          size: 4,
        })
      })
      .to(popup, {
        scale: 1.02,
        duration: 0.15,
        ease: 'power2.out',
      })
      .to(popup, {
        scale: 1,
        duration: 0.15,
        ease: 'power2.out',
      })

    // Button click handler
    button.addEventListener('click', () => {
      const rect = button.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      // Button press
      gsap.to(button, { scale: 0.93, duration: 0.08, ease: 'power2.in' })

      // Sparkle burst (fewer on mobile)
      const particleCount = isMobile() ? 6 : 10
      createSparkBurst({
        x: centerX,
        y: centerY,
        count: particleCount,
        size: 3,
      })

      // Close popup
      gsap.timeline()
        .to(popup, {
          opacity: 0,
          scale: 0.85,
          duration: 0.25,
          ease: 'power2.in',
        })
        .to(backdrop, {
          opacity: 0,
          duration: 0.25,
          ease: 'power2.in',
        }, '<')
        .call(() => {
          popup.remove()
          backdrop.remove()
          if (onClaim) onClaim()
        })
    })
  }, delay)
}

export function showLiveWinNotification(username: string, amount: string) {
  if (prefersReducedMotion()) return

  const isMobileDevice = isMobile()
  const notification = document.createElement('div')
  notification.style.cssText = `
    position: fixed;
    right: ${isMobileDevice ? '10px' : '20px'};
    bottom: ${isMobileDevice ? '80px' : '100px'};
    background: linear-gradient(135deg, rgba(26, 14, 59, 0.95) 0%, rgba(13, 8, 32, 0.95) 100%);
    border: 1px solid rgba(184, 77, 255, 0.4);
    border-radius: 12px;
    padding: ${isMobileDevice ? '10px 12px' : '12px 16px'};
    z-index: 9997;
    opacity: 0;
    transform: translateX(50px);
    box-shadow: 0 0 30px rgba(184, 77, 255, 0.25);
    min-width: ${isMobileDevice ? '150px' : '180px'};
  `

  notification.innerHTML = `
    <div style="
      font-size: ${isMobileDevice ? '11px' : '13px'};
      font-weight: 600;
      color: #FFFFFF;
      margin-bottom: 4px;
    ">${username}</div>
    <div class="win-amount" style="
      font-size: ${isMobileDevice ? '13px' : '15px'};
      font-weight: 700;
      color: #FBBF24;
      text-shadow: 0 0 10px rgba(251, 191, 36, 0.4);
    ">${amount}</div>
    <div style="
      font-size: ${isMobileDevice ? '9px' : '10px'};
      font-weight: 600;
      color: #D946EF;
      margin-top: 4px;
      letter-spacing: 0.1em;
    ">JUST NOW</div>
  `

  document.body.appendChild(notification)

  const winAmount = notification.querySelector('.win-amount') as HTMLElement

  // Slide in
  gsap.timeline()
    .to(notification, {
      opacity: 1,
      x: 0,
      duration: 0.4,
      ease: 'power2.out',
    })
    .to(notification, {
      boxShadow: '0 0 40px rgba(217, 70, 239, 0.35)',
      duration: 0.3,
      yoyo: true,
      repeat: 1,
    })

  // Stay briefly then slide out
  gsap.to(notification, {
    opacity: 0,
    x: 50,
    duration: 0.4,
    ease: 'power2.in',
    delay: 3,
    onComplete: () => notification.remove(),
  })
}

// ============================================================
// MAIN HOOK - USE LUCKY RUSH ANIMATIONS
// ============================================================

export function useLuckyRushAnimations() {
  usePageLoadEntrance()
  useScrollAnimations()
  usePointerEffect()
  useRandomMicroMoments()
}
