"use client"

import type React from "react"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react"

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    value: "hello@clabs.edu",
    href: "mailto:hello@clabs.edu",
  },
  {
    icon: Phone,
    title: "Call Us",
    value: "+1 (234) 567-890",
    href: "tel:+1234567890",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    value: "123 Innovation Drive, Tech City, TC 12345",
    href: "#",
  },
  {
    icon: Clock,
    title: "Office Hours",
    value: "Mon-Sat: 9:00 AM - 6:00 PM",
    href: "#",
  },
]

const faqs = [
  {
    question: "What age groups do you serve?",
    answer:
      "CLABS offers programs for students from Grade 1 through Grade 12. Our curriculum is carefully designed with age-appropriate content and teaching methods for each grade level.",
  },
  {
    question: "Do students need any prior experience?",
    answer:
      "No prior experience is needed! Our programs start from the basics and progress gradually. We have beginner, intermediate, and advanced levels to accommodate all skill levels.",
  },
  {
    question: "What equipment do students need?",
    answer:
      "For in-person classes, all equipment is provided at our centers. For online classes, students need a computer with internet access. Specific hardware kits can be purchased or rented for home-based projects.",
  },
  {
    question: "How are the classes conducted?",
    answer:
      "We offer both in-person classes at our innovation labs and online virtual classes. Classes are typically 1-2 hours long, held weekly, with additional project work assignments.",
  },
  {
    question: "Can schools partner with CLABS?",
    answer:
      "We have partnership programs for schools including curriculum integration, teacher training, and on-site STEM labs. Contact us to discuss partnership opportunities.",
  },
  {
    question: "What is your refund policy?",
    answer:
      "We offer a full refund within the first two weeks of enrollment if you're not satisfied. After that, prorated refunds are available based on the remaining course duration.",
  },
]

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    setIsSubmitted(true)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero Banner */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#f0f7ff] to-[#e8f4ff] py-16 sm:py-20 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 text-center lg:px-8">
            <h1 className="mb-4 sm:mb-6 text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] font-bold text-[#0A1B2A]">
              Contact Us
            </h1>
            <p className="mx-auto max-w-2xl text-base sm:text-lg text-[#4A6382]">
              Have questions? We'd love to hear from you. Get in touch with our team.
            </p>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-10 sm:py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-2 lg:grid-cols-4">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.href}
                  className="premium-card flex flex-col items-center rounded-xl sm:rounded-2xl border border-border/50 bg-white p-4 sm:p-6 md:p-8 text-center"
                >
                  <div className="mb-3 sm:mb-5 flex h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 items-center justify-center rounded-xl sm:rounded-2xl bg-[#276EF1]/10 text-[#276EF1] transition-transform group-hover:scale-110">
                    <info.icon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" strokeWidth={1.5} />
                  </div>
                  <h3 className="mb-1 sm:mb-2 text-sm sm:text-base font-semibold text-[#0A1B2A]">{info.title}</h3>
                  <p className="text-xs sm:text-sm text-[#4A6382] break-all">{info.value}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Map */}
        <section className="bg-gradient-to-b from-[#f0f7ff] to-[#e8f4ff] py-10 sm:py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 sm:gap-8 grid-cols-1 lg:grid-cols-2">
              {/* Contact Form */}
              <div className="rounded-xl sm:rounded-2xl border border-border/50 bg-white p-5 sm:p-8 md:p-10 shadow-sm">
                <h2 className="mb-2 text-xl sm:text-2xl font-semibold text-[#0A1B2A]">Send us a Message</h2>
                <p className="mb-6 sm:mb-8 text-sm sm:text-base text-[#4A6382]">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>

                {isSubmitted ? (
                  <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-center">
                    <div className="mb-4 sm:mb-5 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-[#37D2C5]/10 text-[#37D2C5]">
                      <CheckCircle className="h-7 w-7 sm:h-8 sm:w-8" />
                    </div>
                    <h3 className="mb-2 text-lg sm:text-xl font-semibold text-[#0A1B2A]">Message Sent!</h3>
                    <p className="text-sm sm:text-base text-[#4A6382]">
                      Thank you for contacting us. We'll get back to you soon.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm text-[#0A1B2A]">
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          placeholder="John Doe"
                          required
                          className="rounded-lg sm:rounded-xl border-border/50 bg-[#f8fbff] focus:border-[#276EF1] focus:ring-[#276EF1]/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm text-[#0A1B2A]">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          required
                          className="rounded-lg sm:rounded-xl border-border/50 bg-[#f8fbff] focus:border-[#276EF1] focus:ring-[#276EF1]/20"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm text-[#0A1B2A]">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (234) 567-890"
                        className="rounded-lg sm:rounded-xl border-border/50 bg-[#f8fbff] focus:border-[#276EF1] focus:ring-[#276EF1]/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm text-[#0A1B2A]">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your inquiry..."
                        rows={4}
                        required
                        className="resize-none rounded-lg sm:rounded-xl border-border/50 bg-[#f8fbff] focus:border-[#276EF1] focus:ring-[#276EF1]/20"
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full rounded-full bg-gradient-to-r from-[#276EF1] to-[#37D2C5] py-5 sm:py-6 font-semibold text-white shadow-lg shadow-primary/20 btn-shimmer"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        "Sending..."
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>

              {/* Map Placeholder */}
              <div className="overflow-hidden rounded-xl sm:rounded-2xl border border-border/50 bg-white shadow-sm">
                <div className="relative h-64 sm:h-80 lg:h-full lg:min-h-[450px]">
                  <img
                    src="/modern-office-location-map.jpg"
                    alt="CLABS Location Map"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-[#0A1B2A]/5">
                    <div className="rounded-xl sm:rounded-2xl bg-white/95 p-4 sm:p-6 text-center shadow-xl backdrop-blur-sm mx-4">
                      <div className="mx-auto mb-2 sm:mb-3 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#276EF1]/10 text-[#276EF1]">
                        <MapPin className="h-5 w-5 sm:h-6 sm:w-6" />
                      </div>
                      <p className="text-sm sm:text-base font-semibold text-[#0A1B2A]">CLABS Innovation Center</p>
                      <p className="text-xs sm:text-sm text-[#4A6382]">123 Innovation Drive</p>
                      <p className="text-xs sm:text-sm text-[#4A6382]">Tech City, TC 12345</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-12 sm:py-16 md:py-20 lg:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-3 sm:mb-4 text-center text-2xl sm:text-[2rem] md:text-[2.5rem] font-semibold text-[#0A1B2A]">
                Frequently Asked Questions
              </h2>
              <p className="mb-8 sm:mb-12 text-center text-base sm:text-lg text-[#4A6382]">
                Find answers to common questions about our programs
              </p>

              <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`faq-${index}`}
                    className="rounded-xl sm:rounded-2xl border border-border/50 bg-white px-4 sm:px-6 shadow-sm"
                  >
                    <AccordionTrigger className="text-left text-sm sm:text-base font-semibold text-[#0A1B2A] hover:no-underline py-4 sm:py-5">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm sm:text-base text-[#4A6382] pb-4 sm:pb-5">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
