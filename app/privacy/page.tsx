import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Shield, Eye, Database, Lock, UserCheck, Mail } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="bg-gradient-to-b from-[#EAF7FF] to-white pt-24 sm:pt-28 md:pt-32 pb-10 sm:pb-12 md:pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full bg-[#276EF1]/10 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-[#276EF1]">
              <Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Legal
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#0A1B2A]">
              Privacy Policy
            </h1>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-[#0A1B2A]/60">
              Last updated: December 15, 2025
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-10 sm:py-12 md:py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            {/* Introduction */}
            <div className="mb-8 sm:mb-12">
              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-[#0A1B2A]/70">
                At CLABS, we are committed to protecting your privacy and ensuring the security of your personal
                information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information
                when you visit our website or enroll in our programs.
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-6 sm:space-y-8 md:space-y-12">
              {/* Information We Collect */}
              <div className="rounded-xl sm:rounded-2xl border border-[#E5E7EB] bg-white p-5 sm:p-6 md:p-8">
                <div className="mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-[#276EF1]/10">
                    <Database className="h-4 w-4 sm:h-5 sm:w-5 text-[#276EF1]" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-semibold text-[#0A1B2A]">Information We Collect</h2>
                </div>
                <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-[#0A1B2A]/70">
                  <p>
                    <strong className="text-[#0A1B2A]">Personal Information:</strong> When you register for our programs
                    or contact us, we may collect:
                  </p>
                  <ul className="ml-4 sm:ml-6 list-disc space-y-1.5 sm:space-y-2">
                    <li>Student and parent/guardian names</li>
                    <li>Email addresses and phone numbers</li>
                    <li>Mailing addresses</li>
                    <li>Date of birth and grade level</li>
                    <li>School name and educational information</li>
                    <li>Payment and billing information</li>
                  </ul>
                  <p>
                    <strong className="text-[#0A1B2A]">Automatically Collected Information:</strong> We may
                    automatically collect certain information when you visit our website, including:
                  </p>
                  <ul className="ml-4 sm:ml-6 list-disc space-y-1.5 sm:space-y-2">
                    <li>IP address and browser type</li>
                    <li>Device information and operating system</li>
                    <li>Pages visited and time spent on our site</li>
                    <li>Referring website addresses</li>
                  </ul>
                </div>
              </div>

              {/* How We Use Information */}
              <div className="rounded-xl sm:rounded-2xl border border-[#E5E7EB] bg-white p-5 sm:p-6 md:p-8">
                <div className="mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-[#37D2C5]/10">
                    <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-[#37D2C5]" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-semibold text-[#0A1B2A]">How We Use Your Information</h2>
                </div>
                <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-[#0A1B2A]/70">
                  <p>We use the information we collect to:</p>
                  <ul className="ml-4 sm:ml-6 list-disc space-y-1.5 sm:space-y-2">
                    <li>Process enrollments and manage student accounts</li>
                    <li>Communicate about classes, schedules, and program updates</li>
                    <li>Send progress reports and educational materials</li>
                    <li>Process payments and send invoices</li>
                    <li>Respond to inquiries and provide customer support</li>
                    <li>Improve our programs and website experience</li>
                    <li>Send promotional communications (with your consent)</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </div>
              </div>

              {/* Data Protection */}
              <div className="rounded-xl sm:rounded-2xl border border-[#E5E7EB] bg-white p-5 sm:p-6 md:p-8">
                <div className="mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-[#FFC947]/10">
                    <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-[#FFC947]" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-semibold text-[#0A1B2A]">Data Protection & Security</h2>
                </div>
                <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-[#0A1B2A]/70">
                  <p>
                    We implement appropriate technical and organizational measures to protect your personal information,
                    including:
                  </p>
                  <ul className="ml-4 sm:ml-6 list-disc space-y-1.5 sm:space-y-2">
                    <li>Encryption of data in transit and at rest</li>
                    <li>Secure servers and firewalls</li>
                    <li>Regular security assessments and updates</li>
                    <li>Limited access to personal information by authorized personnel only</li>
                    <li>Employee training on data protection practices</li>
                  </ul>
                </div>
              </div>

              {/* Children's Privacy */}
              <div className="rounded-xl sm:rounded-2xl border border-[#E5E7EB] bg-white p-5 sm:p-6 md:p-8">
                <div className="mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-[#276EF1]/10">
                    <UserCheck className="h-4 w-4 sm:h-5 sm:w-5 text-[#276EF1]" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-semibold text-[#0A1B2A]">
                    Children's Privacy (COPPA Compliance)
                  </h2>
                </div>
                <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-[#0A1B2A]/70">
                  <p>As an educational organization serving K-12 students, we take children's privacy seriously:</p>
                  <ul className="ml-4 sm:ml-6 list-disc space-y-1.5 sm:space-y-2">
                    <li>
                      We collect personal information from children under 13 only with verifiable parental consent
                    </li>
                    <li>Parents can review, update, or delete their child's information at any time</li>
                    <li>We do not condition participation on disclosure of more information than necessary</li>
                    <li>We do not share children's personal information with third parties for marketing purposes</li>
                  </ul>
                </div>
              </div>

              {/* Your Rights */}
              <div className="rounded-xl sm:rounded-2xl border border-[#E5E7EB] bg-white p-5 sm:p-6 md:p-8">
                <div className="mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-[#37D2C5]/10">
                    <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-[#37D2C5]" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-semibold text-[#0A1B2A]">Your Rights</h2>
                </div>
                <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-[#0A1B2A]/70">
                  <p>You have the right to:</p>
                  <ul className="ml-4 sm:ml-6 list-disc space-y-1.5 sm:space-y-2">
                    <li>Access the personal information we hold about you</li>
                    <li>Request correction of inaccurate information</li>
                    <li>Request deletion of your personal information</li>
                    <li>Opt-out of marketing communications</li>
                    <li>Withdraw consent where processing is based on consent</li>
                    <li>Lodge a complaint with a supervisory authority</li>
                  </ul>
                </div>
              </div>

              {/* Contact */}
              <div className="rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#276EF1] to-[#37D2C5] p-5 sm:p-6 md:p-8 text-white">
                <div className="mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-white/20">
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-semibold">Contact Us</h2>
                </div>
                <p className="mb-3 sm:mb-4 text-sm sm:text-base text-white/90">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="space-y-1.5 sm:space-y-2 text-sm sm:text-base text-white/90">
                  <p>
                    <strong>Email:</strong> privacy@clabs.edu
                  </p>
                  <p>
                    <strong>Phone:</strong> +1 (234) 567-890
                  </p>
                  <p>
                    <strong>Address:</strong> 123 Innovation Drive, Tech City, TC 12345
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
