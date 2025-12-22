import Link from "next/link"
import { Cpu, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react"

const footerLinks = {
  programs: [
    { label: "Robotics", href: "/programs#robotics" },
    { label: "AI & Coding", href: "/programs#ai-coding" },
    { label: "IoT", href: "/programs#iot" },
    { label: "Cybersecurity", href: "/programs#cybersecurity" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/about#team" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
  ],
  resources: [
    { label: "Blog", href: "#" },
    { label: "FAQs", href: "/contact#faq" },
    { label: "Support", href: "/contact" },
    { label: "Careers", href: "#" },
  ],
}

const socialLinks = [
  {
    href: "#",
    label: "Facebook",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"
        />
      </svg>
    ),
  },
  {
    href: "#",
    label: "Twitter",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"
        />
      </svg>
    ),
  },
  {
    href: "#",
    label: "LinkedIn",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 2a2 2 0 100 4 2 2 0 000-4z"
        />
      </svg>
    ),
  },
  {
    href: "#",
    label: "Instagram",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
]

export function Footer() {
  return (
    <footer className="bg-[#0A1B2A] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20">
        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand - Full width on mobile */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="flex h-9 w-9 sm:h-10 sm:w-10 lg:h-11 lg:w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#276EF1] to-[#37D2C5]">
                <Cpu className="h-5 w-5 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white" />
              </div>
              <span className="text-xl sm:text-xl lg:text-2xl font-bold tracking-tight">C-LABS</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm sm:text-[15px] leading-relaxed text-white/60">
              Empowering the next generation with future-ready skills through hands-on learning in Robotics, Coding, AI,
              IoT & Cybersecurity.
            </p>

            <div className="mt-6 flex gap-2 sm:gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="flex h-11 w-11 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition-all hover:border-[#37D2C5] hover:text-[#37D2C5] active:scale-95 touch-manipulation"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:contents">
            {/* Programs */}
            <div>
              <h3 className="mb-4 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white/40">Programs</h3>
              <ul className="space-y-3">
                {footerLinks.programs.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-1 text-sm sm:text-[15px] text-white/60 transition-colors hover:text-[#37D2C5] active:text-[#37D2C5] touch-manipulation"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="mb-4 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white/40">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-1 text-sm sm:text-[15px] text-white/60 transition-colors hover:text-[#37D2C5] active:text-[#37D2C5] touch-manipulation"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="mb-4 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white/40">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:support@clabs.life"
                  className="flex items-center gap-3 rounded-xl bg-white/5 px-3 py-3 sm:bg-transparent sm:px-0 sm:py-0 text-sm sm:text-[15px] text-white/60 hover:text-[#37D2C5] active:bg-white/10 sm:active:bg-transparent transition-colors touch-manipulation"
                >
                  <Mail className="h-4 w-4 shrink-0 text-[#37D2C5]" />
                  <span className="break-all">support@clabs.life</span>
                  <ArrowUpRight className="h-3.5 w-3.5 ml-auto sm:hidden text-white/30" />
                </a>
              </li>
              <li>
                <a
                  href="tel:+919502335257"
                  className="flex items-center gap-3 rounded-xl bg-white/5 px-3 py-3 sm:bg-transparent sm:px-0 sm:py-0 text-sm sm:text-[15px] text-white/60 hover:text-[#37D2C5] active:bg-white/10 sm:active:bg-transparent transition-colors touch-manipulation"
                >
                  <Phone className="h-4 w-4 shrink-0 text-[#37D2C5]" />
                  <span>+91 9502335257</span>
                  <ArrowUpRight className="h-3.5 w-3.5 ml-auto sm:hidden text-white/30" />
                </a>
              </li>
              <li className="space-y-2">
                <div className="flex items-start gap-3 rounded-xl bg-white/5 px-3 py-3 sm:bg-transparent sm:px-0 sm:py-0 text-sm sm:text-[15px] text-white/60">
                  <MapPin className="h-4 w-4 shrink-0 text-[#37D2C5] mt-0.5" />
                  <span className="leading-relaxed">Above Honda Showroom, Nirmal Road, Bhainsa - 504103</span>
                </div>
                <div className="flex items-start gap-3 rounded-xl bg-white/5 px-3 py-3 sm:bg-transparent sm:px-0 sm:py-0 text-sm sm:text-[15px] text-white/60">
                  <MapPin className="h-4 w-4 shrink-0 text-[#37D2C5] mt-0.5" />
                  <span className="leading-relaxed">16-11-740/9/1, Rudra Towers, Dilsukhnagar - 500060</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 sm:mt-14 lg:mt-16 border-t border-white/10 pt-6 sm:pt-8">
          <div className="flex flex-col items-center gap-5 sm:gap-6 md:flex-row md:justify-between">
            <div className="order-1 md:order-2 w-full md:w-auto overflow-x-auto scrollbar-hide">
              <div className="flex items-center justify-center md:justify-end gap-4 sm:gap-6 min-w-max px-2 sm:px-0">
                <Link
                  href="/terms"
                  className="text-xs sm:text-sm text-white/40 hover:text-white/70 active:text-white/70 whitespace-nowrap touch-manipulation py-1"
                >
                  Terms of Service
                </Link>
                <Link
                  href="/privacy"
                  className="text-xs sm:text-sm text-white/40 hover:text-white/70 active:text-white/70 whitespace-nowrap touch-manipulation py-1"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/cookies"
                  className="text-xs sm:text-sm text-white/40 hover:text-white/70 active:text-white/70 whitespace-nowrap touch-manipulation py-1"
                >
                  Cookie Policy
                </Link>
              </div>
            </div>

            <p className="order-2 md:order-1 text-xs sm:text-sm text-white/40 text-center md:text-left pb-[env(safe-area-inset-bottom)]">
              &copy; {new Date().getFullYear()} C-LABS. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
