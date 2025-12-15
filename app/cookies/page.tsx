import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Cookie, Settings, BarChart3, Shield, ToggleRight } from "lucide-react"

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="bg-gradient-to-b from-[#EAF7FF] to-white pt-24 sm:pt-28 md:pt-32 pb-10 sm:pb-12 md:pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full bg-[#276EF1]/10 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-[#276EF1]">
              <Cookie className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Legal
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#0A1B2A]">
              Cookie Policy
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
                This Cookie Policy explains how CLABS uses cookies and similar tracking technologies when you visit our
                website. By using our website, you consent to the use of cookies as described in this policy.
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-6 sm:space-y-8 md:space-y-12">
              {/* What Are Cookies */}
              <div className="rounded-xl sm:rounded-2xl border border-[#E5E7EB] bg-white p-5 sm:p-6 md:p-8">
                <div className="mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-[#276EF1]/10">
                    <Cookie className="h-4 w-4 sm:h-5 sm:w-5 text-[#276EF1]" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-semibold text-[#0A1B2A]">What Are Cookies?</h2>
                </div>
                <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-[#0A1B2A]/70">
                  <p>
                    Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you
                    visit a website. They are widely used to make websites work more efficiently and provide information
                    to website owners.
                  </p>
                  <p>
                    Cookies can be "session cookies" (deleted when you close your browser) or "persistent cookies"
                    (remain on your device for a set period or until you delete them).
                  </p>
                </div>
              </div>

              {/* Types of Cookies */}
              <div className="rounded-xl sm:rounded-2xl border border-[#E5E7EB] bg-white p-5 sm:p-6 md:p-8">
                <div className="mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-[#37D2C5]/10">
                    <Settings className="h-4 w-4 sm:h-5 sm:w-5 text-[#37D2C5]" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-semibold text-[#0A1B2A]">Types of Cookies We Use</h2>
                </div>
                <div className="space-y-4 sm:space-y-6 text-sm sm:text-base text-[#0A1B2A]/70">
                  <div>
                    <p className="font-semibold text-[#0A1B2A]">Essential Cookies</p>
                    <p className="mt-1">
                      These cookies are necessary for the website to function properly. They enable core functionality
                      such as security, network management, and account access. You cannot opt out of these cookies.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#0A1B2A]">Performance Cookies</p>
                    <p className="mt-1">
                      These cookies collect information about how visitors use our website, such as which pages are
                      visited most often. This data helps us improve our website's performance and user experience.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#0A1B2A]">Functional Cookies</p>
                    <p className="mt-1">
                      These cookies allow the website to remember choices you make (such as your preferred language or
                      region) and provide enhanced, personalized features.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#0A1B2A]">Marketing Cookies</p>
                    <p className="mt-1">
                      These cookies track your online activity to help advertisers deliver more relevant advertising or
                      to limit how many times you see an ad. These cookies can share that information with other
                      organizations or advertisers.
                    </p>
                  </div>
                </div>
              </div>

              {/* Cookie Details Table */}
              <div className="rounded-xl sm:rounded-2xl border border-[#E5E7EB] bg-white p-5 sm:p-6 md:p-8">
                <div className="mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-[#FFC947]/10">
                    <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-[#FFC947]" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-semibold text-[#0A1B2A]">Specific Cookies We Use</h2>
                </div>
                <div className="overflow-x-auto -mx-5 sm:mx-0 px-5 sm:px-0">
                  <table className="w-full text-xs sm:text-sm min-w-[500px]">
                    <thead>
                      <tr className="border-b border-[#E5E7EB]">
                        <th className="py-2 sm:py-3 text-left font-semibold text-[#0A1B2A]">Cookie Name</th>
                        <th className="py-2 sm:py-3 text-left font-semibold text-[#0A1B2A]">Type</th>
                        <th className="py-2 sm:py-3 text-left font-semibold text-[#0A1B2A]">Duration</th>
                        <th className="py-2 sm:py-3 text-left font-semibold text-[#0A1B2A]">Purpose</th>
                      </tr>
                    </thead>
                    <tbody className="text-[#0A1B2A]/70">
                      <tr className="border-b border-[#E5E7EB]/50">
                        <td className="py-2 sm:py-3">_session</td>
                        <td className="py-2 sm:py-3">Essential</td>
                        <td className="py-2 sm:py-3">Session</td>
                        <td className="py-2 sm:py-3">Maintains user session state</td>
                      </tr>
                      <tr className="border-b border-[#E5E7EB]/50">
                        <td className="py-2 sm:py-3">_csrf</td>
                        <td className="py-2 sm:py-3">Essential</td>
                        <td className="py-2 sm:py-3">Session</td>
                        <td className="py-2 sm:py-3">Security token for form submissions</td>
                      </tr>
                      <tr className="border-b border-[#E5E7EB]/50">
                        <td className="py-2 sm:py-3">_ga</td>
                        <td className="py-2 sm:py-3">Performance</td>
                        <td className="py-2 sm:py-3">2 years</td>
                        <td className="py-2 sm:py-3">Google Analytics tracking</td>
                      </tr>
                      <tr className="border-b border-[#E5E7EB]/50">
                        <td className="py-2 sm:py-3">_gid</td>
                        <td className="py-2 sm:py-3">Performance</td>
                        <td className="py-2 sm:py-3">24 hours</td>
                        <td className="py-2 sm:py-3">Google Analytics user distinction</td>
                      </tr>
                      <tr>
                        <td className="py-2 sm:py-3">preferences</td>
                        <td className="py-2 sm:py-3">Functional</td>
                        <td className="py-2 sm:py-3">1 year</td>
                        <td className="py-2 sm:py-3">Stores user preferences</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Third Party Cookies */}
              <div className="rounded-xl sm:rounded-2xl border border-[#E5E7EB] bg-white p-5 sm:p-6 md:p-8">
                <div className="mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-[#276EF1]/10">
                    <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-[#276EF1]" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-semibold text-[#0A1B2A]">Third-Party Cookies</h2>
                </div>
                <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-[#0A1B2A]/70">
                  <p>
                    We may also use third-party cookies from trusted partners to help us analyze website usage and
                    deliver relevant content. These include:
                  </p>
                  <ul className="ml-4 sm:ml-6 list-disc space-y-1.5 sm:space-y-2">
                    <li>
                      <strong>Google Analytics:</strong> For website traffic analysis and user behavior insights
                    </li>
                    <li>
                      <strong>YouTube:</strong> For embedded video content functionality
                    </li>
                    <li>
                      <strong>Social Media Platforms:</strong> For sharing features and social media integration
                    </li>
                  </ul>
                  <p>These third parties have their own privacy policies governing their use of cookies.</p>
                </div>
              </div>

              {/* Managing Cookies */}
              <div className="rounded-xl sm:rounded-2xl border border-[#E5E7EB] bg-white p-5 sm:p-6 md:p-8">
                <div className="mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-[#37D2C5]/10">
                    <ToggleRight className="h-4 w-4 sm:h-5 sm:w-5 text-[#37D2C5]" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-semibold text-[#0A1B2A]">Managing Your Cookie Preferences</h2>
                </div>
                <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-[#0A1B2A]/70">
                  <p>You can control and manage cookies in several ways:</p>
                  <p>
                    <strong className="text-[#0A1B2A]">Browser Settings:</strong> Most browsers allow you to view,
                    manage, delete, and block cookies. Note that blocking all cookies may affect website functionality.
                  </p>
                  <p>
                    <strong className="text-[#0A1B2A]">Opt-Out Tools:</strong>
                  </p>
                  <ul className="ml-4 sm:ml-6 list-disc space-y-1.5 sm:space-y-2">
                    <li>
                      Google Analytics Opt-out:{" "}
                      <a
                        href="https://tools.google.com/dlpage/gaoptout"
                        className="text-[#276EF1] hover:underline break-all"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        tools.google.com/dlpage/gaoptout
                      </a>
                    </li>
                    <li>
                      Network Advertising Initiative:{" "}
                      <a
                        href="https://optout.networkadvertising.org"
                        className="text-[#276EF1] hover:underline break-all"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        optout.networkadvertising.org
                      </a>
                    </li>
                  </ul>
                  <p>
                    <strong className="text-[#0A1B2A]">Do Not Track:</strong> Some browsers have a "Do Not Track"
                    feature. We currently do not respond to Do Not Track signals.
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div className="rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#276EF1] to-[#37D2C5] p-5 sm:p-6 md:p-8 text-white">
                <div className="mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-white/20">
                    <Cookie className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-semibold">Questions About Cookies?</h2>
                </div>
                <p className="mb-3 sm:mb-4 text-sm sm:text-base text-white/90">
                  If you have any questions about our use of cookies, please contact us:
                </p>
                <div className="space-y-1.5 sm:space-y-2 text-sm sm:text-base text-white/90">
                  <p>
                    <strong>Email:</strong> privacy@clabs.edu
                  </p>
                  <p>
                    <strong>Phone:</strong> +1 (234) 567-890
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
