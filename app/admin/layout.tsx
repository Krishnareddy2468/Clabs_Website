"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, Calendar, GraduationCap, Image, MessageSquare, LogOut, Images } from "lucide-react"
import { useEffect, useState } from "react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is authenticated
    const authenticated = localStorage.getItem("adminAuthenticated")
    
    if (!authenticated && pathname !== "/admin") {
      router.push("/admin")
    } else {
      setIsAuthenticated(!!authenticated)
    }
    setIsLoading(false)
  }, [pathname, router])

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated")
    router.push("/admin")
  }

  // Show login page without sidebar
  if (pathname === "/admin" || !isAuthenticated) {
    return <>{children}</>
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    )
  }

  const navItems = [
    { href: "/admin/schools", icon: GraduationCap, label: "Schools" },
    { href: "/admin/banners", icon: Images, label: "Banners" },
    { href: "/admin/events", icon: Calendar, label: "Events" },
    { href: "/admin/gallery", icon: Image, label: "Gallery" },
    { href: "/admin/contacts", icon: MessageSquare, label: "Contacts" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <aside className="w-64 bg-white border-r min-h-screen p-6 fixed">
          <h1 className="text-2xl font-bold text-[#276EF1] mb-8">C-LABS Admin</h1>
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-[#276EF1] text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-red-600 hover:bg-red-50 w-full mt-8"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </aside>
        <main className="flex-1 p-8 ml-64">{children}</main>
      </div>
    </div>
  )
}
