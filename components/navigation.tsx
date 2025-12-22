"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X, Cpu, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/videos", label: "Videos" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-white/95 backdrop-blur-xl shadow-sm">
      <div className="container mx-auto flex h-16 sm:h-16 lg:h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 lg:h-11 lg:w-11 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-[#276EF1] to-[#37D2C5] shadow-lg shadow-primary/20">
            <Cpu className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white" />
          </div>
          <span className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground tracking-tight">C-LABS</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:gap-10 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[15px] font-medium text-muted-foreground transition-colors hover:text-primary relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center lg:flex">
          <Button
            className="rounded-full bg-gradient-to-r from-[#276EF1] to-[#37D2C5] px-6 lg:px-7 py-2.5 text-[15px] font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 btn-shimmer"
            asChild
          >
            <Link href="/programs">Explore Programs</Link>
          </Button>
        </div>

        <button
          className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-muted/80 active:bg-muted lg:hidden transition-colors touch-manipulation"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          <span
            className={cn(
              "absolute transition-all duration-200",
              isOpen ? "rotate-0 opacity-100" : "rotate-90 opacity-0",
            )}
          >
            <X className="h-5 w-5" />
          </span>
          <span
            className={cn(
              "absolute transition-all duration-200",
              isOpen ? "-rotate-90 opacity-0" : "rotate-0 opacity-100",
            )}
          >
            <Menu className="h-5 w-5" />
          </span>
        </button>
      </div>

      <div
        className={cn(
          "fixed inset-x-0 top-16 bottom-0 z-[999] lg:hidden",
          isOpen ? "block" : "hidden",
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setIsOpen(false)}
        />

        {/* Menu Content */}
        <nav className="relative h-full flex flex-col bg-white shadow-xl">
          <div className="flex-1 px-4 py-6 sm:px-6 overflow-visible">
            <div className="space-y-2">
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-5 py-3.5 text-lg font-medium text-foreground transition-all active:scale-[0.98] hover:bg-gray-50 active:bg-gray-100 touch-manipulation",
                    "animate-in fade-in slide-in-from-bottom-2",
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => setIsOpen(false)}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </Link>
              ))}
            </div>
          </div>

          <div className="shrink-0 border-t border-gray-200 bg-white px-4 py-5 sm:px-6 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
            <Button
              className="w-full rounded-xl bg-gradient-to-r from-[#276EF1] to-[#37D2C5] py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/25 active:scale-[0.98] transition-transform touch-manipulation"
              asChild
            >
              <Link href="/programs" onClick={() => setIsOpen(false)}>
                Explore Programs
              </Link>
            </Button>

            <div className="mt-3 flex flex-col items-center gap-2 text-sm text-muted-foreground">
              <a href="mailto:support@clabs.life" className="hover:text-primary transition-colors touch-manipulation py-1">
                support@clabs.life
              </a>
              <a href="tel:+919502335257" className="hover:text-primary transition-colors touch-manipulation py-1">
                +91 9502335257
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
