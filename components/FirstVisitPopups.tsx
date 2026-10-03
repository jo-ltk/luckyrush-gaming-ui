'use client'

import { useEffect } from 'react'
import { showWelcomePopup, showBonusPopup, showLiveWinNotification } from '@/lib/gsap-animations'

export function FirstVisitPopups() {
  useEffect(() => {
    // Check if already shown this session
    if (typeof window !== 'undefined' && sessionStorage.getItem('luckyrush-welcome-shown')) {
      return
    }

    // Show welcome popup after delay
    showWelcomePopup({
      title: 'WELCOME TO LUCKYRUSH',
      subtitle: 'YOUR LUCKY REWARD IS WAITING',
      reward: '100,000 GC + 10 SC',
      buttonText: 'CLAIM REWARD',
      delay: 1800,
      onClaim: () => {
        // After welcome popup is claimed, show bonus popup
        showBonusPopup({
          title: 'LUCKY BONUS',
          subtitle: 'YOU FOUND A BONUS!',
          reward: '+25,000 GC',
          buttonText: 'COLLECT',
          delay: 600,
          onClaim: () => {
            // Occasionally show live win notifications
            setTimeout(() => {
              showLiveWinNotification('QueenBee', '+500 SC')
            }, 2000)
          },
        })
      },
    })
  }, [])

  return null
}
