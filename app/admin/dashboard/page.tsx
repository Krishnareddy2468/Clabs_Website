"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AdminDashboardRedirect() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the main admin dashboard
    router.push("/admin")
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Redirecting...</p>
    </div>
  )
}
