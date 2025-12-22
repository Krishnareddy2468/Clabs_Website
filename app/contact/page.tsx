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
    value: "support@clabs.life",
    href: "mailto:support@clabs.life",
  },
  {
    icon: Phone,
    title: "Call Us",
    value: "+91 9502335257",
    href: "tel:+919502335257",
  },
  {
    icon: MapPin,
    title: "Bhainsa Office",
    value: "Above Honda Showroom, Nirmal Road, Bhainsa - 504103",
    href: "https://maps.google.com/?q=Above+Honda+Showroom+Nirmal+Road+Bhainsa+504103",
  },
  {
    icon: MapPin,
    title: "Hyderabad Office",
    value: "16-11-740/9/1, Rudra Towers, Opp: Ravindra Bharathi School, Dilsukhnagar - 500060",
    href: "https://maps.google.com/?q=16-11-740/9/1+Rudra+Towers+Dilsukhnagar+Hyderabad+500060",
  },
]

const faqs = [
  {
    question: "What classes do you offer programs for?",
    answer:
      "C LABS STEM ACADEMICS offers year-long academic programs specifically designed for students in Classes 3 through 9. Each class has its own specially designed academic book and curriculum.",
  },
  {
    question: "What is included in the year-long program?",
    answer:
      "The program includes a specially designed academic book for your child's class, year-long structured curriculum, hands-on activities, regular assessments, and comprehensive coverage of all STEM subjects aligned with educational standards.",
  },
  {
    question: "Are the academic books different for each class?",
    answer:
      "Yes, we have specially designed academic books for each standard from Class 3 to Class 9. Each book is age-appropriate and tailored to the specific learning outcomes for that class level.",
  },
  {
    question: "How is the curriculum delivered?",
    answer:
      "The year-long curriculum is delivered through a combination of classroom instruction, hands-on activities, experiments, and projects. Students receive their class-specific academic book and follow the structured program throughout the academic year.",
  },
  {
    question: "Can schools partner with C LABS for their STEM curriculum?",
    answer:
      "Yes! We offer comprehensive school partnership programs where we provide the academic books, curriculum, and teacher training for Classes 3-9. Contact us to discuss how we can integrate our STEM academics into your school.",
  },
  {
    question: "What subjects are covered in the academic books?",
    answer:
      "Our academic books cover all core STEM subjects including Science, Technology, Engineering, and Mathematics. The content is progressive, building upon concepts learned in previous classes, ensuring a strong foundation for higher education.",
  },
]

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to send message")
      }

      setIsSubmitted(true)
      setFormData({ name: "", email: "", phone: "", message: "" })
    } catch (error: any) {
      alert(`Failed to send message: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
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
            <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.href}
                  target={info.icon === MapPin ? "_blank" : undefined}
                  rel={info.icon === MapPin ? "noopener noreferrer" : undefined}
                  className="premium-card flex flex-col items-center rounded-xl sm:rounded-2xl border border-border/50 bg-white p-4 sm:p-6 md:p-8 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="mb-3 sm:mb-5 flex h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 items-center justify-center rounded-xl sm:rounded-2xl bg-[#276EF1]/10 text-[#276EF1] transition-transform group-hover:scale-110">
                    <info.icon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" strokeWidth={1.5} />
                  </div>
                  <h3 className="mb-1 sm:mb-2 text-sm sm:text-base font-semibold text-[#0A1B2A]">{info.title}</h3>
                  <p className="text-xs sm:text-sm text-[#4A6382]">{info.value}</p>
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
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your inquiry..."
                        rows={4}
                        required
                        className="resize-none rounded-lg sm:rounded-xl border-border/50 bg-[#f8fbff] focus:border-[#276EF1] focus:ring-[#276EF1]/20"
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full rounded-full bg-gradient-to-r from-[#276EF1] to-[#37D2C5] py-5 sm:py-6 font-semibold text-white shadow-lg shadow-primary/20 btn-shimmer disabled:opacity-50"
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
                    alt="C-LABS Location Map"
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
