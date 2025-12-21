"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Building2, 
  Calendar, 
  Users, 
  Settings, 
  LayoutDashboard,
  Menu,
  X,
  LogOut,
  ChevronDown,
  Image,
  FileText,
  Bell,
  Cpu
} from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  title: string
  href: string
  icon: React.ElementType
  children?: { title: string; href: string }[]
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Schools",
    href: "/admin/schools",
    icon: Building2,
    children: [
      { title: "All Schools", href: "/admin/schools" },
      { title: "Add New", href: "/admin/schools?action=add" },
    ],
  },
  {
    title: "Events",
    href: "/admin/events",
    icon: Calendar,
    children: [
      { title: "All Events", href: "/admin/events" },
      { title: "Create Event", href: "/admin/events?action=create" },
    ],
  },
  {
    title: "Registrations",
    href: "/admin/registrations",
    icon: Users,
  },
  {
    title: "Gallery",
    href: "/admin/gallery",
    icon: Image,
  },
  {
    title: "Content",
    href: "/admin/content",
    icon: FileText,
    children: [
      { title: "Programs", href: "/admin/content/programs" },
      { title: "Testimonials", href: "/admin/content/testimonials" },
      { title: "FAQs", href: "/admin/content/faqs" },
    ],
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>(["Schools", "Events"])
  const pathname = usePathname()

  const toggleExpanded = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    )
  }

  const isActive = (href: string) => {
    const basePath = href.split('?')[0]
    if (basePath === "/admin") return pathname === "/admin"
    return pathname.startsWith(basePath)
  }

  const isExactActive = (href: string) => {
    const [path, query] = href.split('?')
    if (query) {
      return pathname === path && typeof window !== 'undefined' && window.location.search.includes(query)
    }
    return pathname === path
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 z-50 h-full w-64 bg-[#0A1B2A] text-white transform transition-transform duration-200 lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#276EF1] to-[#37D2C5] flex items-center justify-center">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg">C LABS Admin</span>
          </Link>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 hover:bg-white/10 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100%-8rem)]">
          {navItems.map((item) => (
            <div key={item.title}>
              {item.children ? (
                <>
                  <button
                    onClick={() => toggleExpanded(item.title)}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      isActive(item.href) 
                        ? "bg-white/10 text-white" 
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      {item.title}
                    </div>
                    <ChevronDown className={cn(
                      "w-4 h-4 transition-transform",
                      expandedItems.includes(item.title) && "rotate-180"
                    )} />
                  </button>
                  {expandedItems.includes(item.title) && (
                    <div className="ml-8 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setSidebarOpen(false)}
                          className={cn(
                            "block px-3 py-2 rounded-lg text-sm transition-colors",
                            isActive(child.href.split('?')[0]) && child.href.includes('?') === false
                              ? "bg-white/10 text-white"
                              : "text-white/60 hover:bg-white/5 hover:text-white"
                          )}
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive(item.href)
                      ? "bg-white/10 text-white"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.title}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <Link 
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Back to Website
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Header */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex-1 lg:flex-none" />

          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-gray-100 rounded-lg">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#276EF1] to-[#37D2C5] flex items-center justify-center text-white text-sm font-medium">
                A
              </div>
              <span className="hidden sm:block text-sm font-medium text-gray-700">Admin</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
