import { MessageCircle, Share2, Mail, ShieldCheck, LifeBuoy, CircleHelp } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Footer() {
  return (
    <footer className="relative border-t border-white/[.08] bg-[#08051A] px-4 py-6 lg:px-6 lg:py-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[16px] font-bold text-white">LuckyRush</h3>
            <p className="text-[13px] leading-relaxed text-slate-400">
              Your ultimate destination for premium social casino gaming. Play, spin, and get rewarded with daily bonuses and exclusive rewards.
            </p>
            <div className="flex gap-3 pt-2">
              <a
                href="#"
                className="flex size-9 items-center justify-center rounded-lg border border-white/[.08] bg-white/[.03] text-slate-400 transition-all hover:border-fuchsia-400/30 hover:bg-fuchsia-500/10 hover:text-fuchsia-300"
                aria-label="Social"
              >
                <MessageCircle className="size-4" />
              </a>
              <a
                href="#"
                className="flex size-9 items-center justify-center rounded-lg border border-white/[.08] bg-white/[.03] text-slate-400 transition-all hover:border-fuchsia-400/30 hover:bg-fuchsia-500/10 hover:text-fuchsia-300"
                aria-label="Social"
              >
                <Share2 className="size-4" />
              </a>
              <a
                href="#"
                className="flex size-9 items-center justify-center rounded-lg border border-white/[.08] bg-white/[.03] text-slate-400 transition-all hover:border-fuchsia-400/30 hover:bg-fuchsia-500/10 hover:text-fuchsia-300"
                aria-label="Social"
              >
                <MessageCircle className="size-4" />
              </a>
              <a
                href="#"
                className="flex size-9 items-center justify-center rounded-lg border border-white/[.08] bg-white/[.03] text-slate-400 transition-all hover:border-fuchsia-400/30 hover:bg-fuchsia-500/10 hover:text-fuchsia-300"
                aria-label="Social"
              >
                <Share2 className="size-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[16px] font-bold text-white">Quick Links</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <a href="#" className="text-[13px] text-slate-400 transition-colors hover:text-fuchsia-300">
                  All Games
                </a>
              </li>
              <li>
                <a href="#" className="text-[13px] text-slate-400 transition-colors hover:text-fuchsia-300">
                  Promotions
                </a>
              </li>
              <li>
                <a href="#" className="text-[13px] text-slate-400 transition-colors hover:text-fuchsia-300">
                  VIP Club
                </a>
              </li>
              <li>
                <a href="#" className="text-[13px] text-slate-400 transition-colors hover:text-fuchsia-300">
                  Daily Rewards
                </a>
              </li>
              <li>
                <a href="#" className="text-[13px] text-slate-400 transition-colors hover:text-fuchsia-300">
                  Leaderboard
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[16px] font-bold text-white">Support</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <a href="#" className="flex items-center gap-2 text-[13px] text-slate-400 transition-colors hover:text-fuchsia-300">
                  <LifeBuoy className="size-4" />
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 text-[13px] text-slate-400 transition-colors hover:text-fuchsia-300">
                  <CircleHelp className="size-4" />
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 text-[13px] text-slate-400 transition-colors hover:text-fuchsia-300">
                  <ShieldCheck className="size-4" />
                  Responsible Gaming
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 text-[13px] text-slate-400 transition-colors hover:text-fuchsia-300">
                  <Mail className="size-4" />
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[16px] font-bold text-white">Legal</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <a href="#" className="text-[13px] text-slate-400 transition-colors hover:text-fuchsia-300">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-[13px] text-slate-400 transition-colors hover:text-fuchsia-300">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-[13px] text-slate-400 transition-colors hover:text-fuchsia-300">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-[13px] text-slate-400 transition-colors hover:text-fuchsia-300">
                  Fair Play
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/[.05] pt-6 sm:flex-row">
          <p className="text-[12px] text-slate-500">
            © 2024 LuckyRush. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-lg border border-amber-400/20 bg-amber-400/[.06] px-3 py-1.5">
              <span className="text-[11px] font-bold text-amber-300">18+</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-emerald-400/20 bg-emerald-400/[.06] px-3 py-1.5">
              <span className="text-[11px] font-bold text-emerald-300">Secure</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
