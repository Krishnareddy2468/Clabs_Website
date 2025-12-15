import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Parent",
    image: "/professional-woman-smiling.png",
    content:
      "My daughter has transformed from being scared of technology to building her own robots. CLABS made learning fun and engaging!",
    rating: 5,
  },
  {
    name: "Dr. Michael Chen",
    role: "School Principal",
    image: "/professional-man-suit-portrait.png",
    content:
      "Partnering with CLABS has elevated our STEM curriculum significantly. The students are more curious and innovative than ever.",
    rating: 5,
  },
  {
    name: "Emily Roberts",
    role: "Student, Grade 8",
    image: "/young-teenage-girl-student-portrait.jpg",
    content:
      "I never thought coding could be this cool! Now I'm creating my own AI games and can't wait to learn more.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-16 sm:py-24 md:py-28 lg:py-36 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 sm:mb-12 md:mb-16 max-w-2xl text-center">
          <h2 className="mb-3 sm:mb-4 text-2xl sm:text-[2rem] md:text-[2.5rem] font-semibold text-[#0A1B2A]">
            What People Say
          </h2>
          <p className="text-base sm:text-lg text-[#4A6382]">
            Hear from parents, educators, and students about their CLABS experience
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="premium-card relative overflow-hidden rounded-xl sm:rounded-2xl border border-border/50 bg-white p-6 sm:p-8"
            >
              <Quote className="absolute right-4 sm:right-6 top-4 sm:top-6 h-8 w-8 sm:h-10 sm:w-10 text-[#276EF1]/10" />

              <div className="mb-4 sm:mb-5 flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 fill-[#FFC947] text-[#FFC947]" />
                ))}
              </div>

              <p className="mb-5 sm:mb-6 text-sm sm:text-base text-[#4A6382] leading-relaxed">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-3 sm:gap-4">
                <img
                  src={testimonial.image || "/placeholder.svg?height=48&width=48&query=professional portrait"}
                  alt={testimonial.name}
                  className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover border-2 border-[#276EF1]/10"
                />
                <div>
                  <p className="text-sm sm:text-base font-semibold text-[#0A1B2A]">{testimonial.name}</p>
                  <p className="text-xs sm:text-sm text-[#4A6382]">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
