import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { FileText, Users, CreditCard, AlertTriangle, Scale, BookOpen } from "lucide-react"

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="bg-gradient-to-b from-[#EAF7FF] to-white pt-24 sm:pt-28 md:pt-32 pb-10 sm:pb-12 md:pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full bg-[#276EF1]/10 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-[#276EF1]">
              <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Legal
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#0A1B2A]">
              Terms of Service
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
                Welcome to CLABS. These Terms of Service ("Terms") govern your use of our website, programs, and
                services. By accessing our website or enrolling in our programs, you agree to be bound by these Terms.
                Please read them carefully.
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-6 sm:space-y-8 md:space-y-12">
              {/* Acceptance of Terms */}
              <div className="rounded-xl sm:rounded-2xl border border-[#E5E7EB] bg-white p-5 sm:p-6 md:p-8">
                <div className="mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-[#276EF1]/10">
                    <Scale className="h-4 w-4 sm:h-5 sm:w-5 text-[#276EF1]" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-semibold text-[#0A1B2A]">1. Acceptance of Terms</h2>
                </div>
                <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-[#0A1B2A]/70">
                  <p>
                    By accessing or using C-LABS services, you acknowledge that you have read, understood, and agree to
                    be bound by these Terms. If you are enrolling a minor, you represent that you are the parent or
                    legal guardian and accept these Terms on their behalf.
                  </p>
                  <p>
                    We reserve the right to modify these Terms at any time. Continued use of our services after changes
                    constitutes acceptance of the modified Terms.
                  </p>
                </div>
              </div>

              {/* Programs and Enrollment */}
              <div className="rounded-xl sm:rounded-2xl border border-[#E5E7EB] bg-white p-5 sm:p-6 md:p-8">
                <div className="mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-[#37D2C5]/10">
                    <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-[#37D2C5]" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-semibold text-[#0A1B2A]">2. Programs and Enrollment</h2>
                </div>
                <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-[#0A1B2A]/70">
                  <p>
                    <strong className="text-[#0A1B2A]">Eligibility:</strong> Our programs are designed for students in
                    grades K-12. Age and grade requirements may vary by program.
                  </p>
                  <p>
                    <strong className="text-[#0A1B2A]">Registration:</strong> Enrollment is subject to availability and
                    completion of required registration forms. We reserve the right to refuse enrollment at our
                    discretion.
                  </p>
                  <p>
                    <strong className="text-[#0A1B2A]">Program Changes:</strong> We reserve the right to modify program
                    content, schedules, and instructors as needed to maintain educational quality.
                  </p>
                  <p>
                    <strong className="text-[#0A1B2A]">Attendance:</strong> Regular attendance is expected. Excessive
                    absences may affect program completion certificates.
                  </p>
                </div>
              </div>

              {/* Payment Terms */}
              <div className="rounded-xl sm:rounded-2xl border border-[#E5E7EB] bg-white p-5 sm:p-6 md:p-8">
                <div className="mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-[#FFC947]/10">
                    <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 text-[#FFC947]" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-semibold text-[#0A1B2A]">3. Payment Terms</h2>
                </div>
                <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-[#0A1B2A]/70">
                  <p>
                    <strong className="text-[#0A1B2A]">Fees:</strong> Program fees are as stated at the time of
                    enrollment. All fees are in USD unless otherwise specified.
                  </p>
                  <p>
                    <strong className="text-[#0A1B2A]">Payment:</strong> Payment is due at the time of enrollment unless
                    alternative arrangements are made. We accept major credit cards, bank transfers, and other approved
                    payment methods.
                  </p>
                  <p>
                    <strong className="text-[#0A1B2A]">Refund Policy:</strong>
                  </p>
                  <ul className="ml-4 sm:ml-6 list-disc space-y-1.5 sm:space-y-2">
                    <li>Full refund if cancellation is made 14+ days before program start</li>
                    <li>50% refund if cancellation is made 7-13 days before program start</li>
                    <li>No refund for cancellations less than 7 days before program start</li>
                    <li>Pro-rated refunds may be available for medical emergencies with documentation</li>
                  </ul>
                </div>
              </div>

              {/* Code of Conduct */}
              <div className="rounded-xl sm:rounded-2xl border border-[#E5E7EB] bg-white p-5 sm:p-6 md:p-8">
                <div className="mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-[#276EF1]/10">
                    <Users className="h-4 w-4 sm:h-5 sm:w-5 text-[#276EF1]" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-semibold text-[#0A1B2A]">4. Code of Conduct</h2>
                </div>
                <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-[#0A1B2A]/70">
                  <p>All participants are expected to:</p>
                  <ul className="ml-4 sm:ml-6 list-disc space-y-1.5 sm:space-y-2">
                    <li>Treat instructors, staff, and fellow students with respect</li>
                    <li>Follow safety guidelines when using equipment and materials</li>
                    <li>Refrain from disruptive behavior that interferes with learning</li>
                    <li>Use technology and equipment responsibly and ethically</li>
                    <li>Respect intellectual property and not share course materials without permission</li>
                  </ul>
                  <p>Violation of the code of conduct may result in dismissal from the program without refund.</p>
                </div>
              </div>

              {/* Intellectual Property */}
              <div className="rounded-xl sm:rounded-2xl border border-[#E5E7EB] bg-white p-5 sm:p-6 md:p-8">
                <div className="mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-[#37D2C5]/10">
                    <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-[#37D2C5]" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-semibold text-[#0A1B2A]">5. Intellectual Property</h2>
                </div>
                <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-[#0A1B2A]/70">
                  <p>
                    <strong className="text-[#0A1B2A]">Our Content:</strong> All curriculum, course materials, logos,
                    and website content are the property of CLABS and protected by intellectual property laws.
                  </p>
                  <p>
                    <strong className="text-[#0A1B2A]">Student Projects:</strong> Students retain ownership of original
                    projects created during our programs. CLABS reserves the right to showcase student work for
                    promotional purposes with appropriate consent.
                  </p>
                  <p>
                    <strong className="text-[#0A1B2A]">Media Release:</strong> By enrolling, you consent to the use of
                    photographs and videos taken during programs for promotional and educational purposes unless you opt
                    out in writing.
                  </p>
                </div>
              </div>

              {/* Limitation of Liability */}
              <div className="rounded-xl sm:rounded-2xl border border-[#E5E7EB] bg-white p-5 sm:p-6 md:p-8">
                <div className="mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-[#FFC947]/10">
                    <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-[#FFC947]" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-semibold text-[#0A1B2A]">6. Limitation of Liability</h2>
                </div>
                <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-[#0A1B2A]/70">
                  <p>
                    C-LABS provides educational services on an "as is" basis. We do not guarantee specific educational
                    outcomes or career results.
                  </p>
                  <p>
                    To the maximum extent permitted by law, C-LABS shall not be liable for any indirect, incidental,
                    special, or consequential damages arising from your participation in our programs.
                  </p>
                  <p>
                    Our total liability for any claim shall not exceed the amount paid for the specific program giving
                    rise to the claim.
                  </p>
                </div>
              </div>

              {/* Governing Law */}
              <div className="rounded-xl sm:rounded-2xl border border-[#E5E7EB] bg-white p-5 sm:p-6 md:p-8">
                <div className="mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-[#276EF1]/10">
                    <Scale className="h-4 w-4 sm:h-5 sm:w-5 text-[#276EF1]" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-semibold text-[#0A1B2A]">7. Governing Law</h2>
                </div>
                <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-[#0A1B2A]/70">
                  <p>
                    These Terms shall be governed by and construed in accordance with the laws of the State of
                    California, without regard to its conflict of law provisions.
                  </p>
                  <p>
                    Any disputes arising from these Terms shall be resolved through binding arbitration in Tech City,
                    California, unless prohibited by law.
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div className="rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#276EF1] to-[#37D2C5] p-5 sm:p-6 md:p-8 text-white">
                <div className="mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-white/20">
                    <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-semibold">Questions?</h2>
                </div>
                <p className="mb-3 sm:mb-4 text-sm sm:text-base text-white/90">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="space-y-1.5 sm:space-y-2 text-sm sm:text-base text-white/90">
                  <p>
                    <strong>Email:</strong> legal@clabs.edu
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
