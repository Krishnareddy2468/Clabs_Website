import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Cpu, Code, Wifi, Shield, FlaskConical, ArrowRight, Check } from "lucide-react"

const programs = [
	{
		id: "class-3-5",
		icon: Cpu,
		title: "Classes 3-5 Program",
		subtitle: "Foundation STEM Academics",
		description:
			"Year-long academic program for Classes 3, 4, and 5 with specially designed academic books. Covers fundamental STEM concepts through engaging, age-appropriate curriculum aligned with educational standards.",
		features: [
			"Dedicated academic books for each class",
			"Year-long structured curriculum",
			"Hands-on activities and experiments",
			"Regular assessments and progress tracking",
			"Foundation in Science, Math & Technology",
		],
		grades: "Classes 3-5",
	},
	{
		id: "class-6-7",
		icon: Code,
		title: "Classes 6-7 Program",
		subtitle: "Intermediate STEM Academics",
		description:
			"Comprehensive year-long curriculum for Classes 6 and 7 with advanced STEM concepts. Includes specialized academic books designed to build strong foundations in coding, robotics, and scientific thinking.",
		features: [
			"Standard-specific academic textbooks",
			"Advanced coding and programming",
			"Robotics and automation concepts",
			"Scientific method and research skills",
			"Project-based learning approach",
		],
		grades: "Classes 6-7",
	},
	{
		id: "class-8-9",
		icon: Wifi,
		title: "Classes 8-9 Program",
		subtitle: "Advanced STEM Academics",
		description:
			"Advanced year-long academic program for Classes 8 and 9. Comprehensive curriculum with specially designed books preparing students for competitive exams and higher education in STEM fields.",
		features: [
			"Competitive exam preparation",
			"Advanced STEM concepts",
			"Class-specific academic materials",
			"Real-world project development",
			"College preparatory curriculum",
		],
		grades: "Classes 8-9",
	},
	{
		id: "curriculum",
		icon: FlaskConical,
		title: "Academic Book Series",
		subtitle: "Specially Designed Curriculum",
		description:
			"Each class from 3 to 9 has its own specially designed academic book covering all STEM subjects. Year-long curriculum ensures progressive learning with age-appropriate content and activities.",
		features: [
			"One book per standard (Class 3-9)",
			"Aligned with educational boards",
			"Activity-based learning modules",
			"Regular revision and assessments",
			"Teacher support materials included",
		],
		grades: "All Classes 3-9",
	},
]

export default function ProgramsPage() {
	return (
		<div className="flex min-h-screen flex-col">
			<Navigation />
			<main className="flex-1">
				{/* Hero Banner */}
				<section className="relative overflow-hidden bg-gradient-to-b from-[#f0f7ff] to-[#e8f4ff] py-16 sm:py-20 md:py-24 lg:py-32">
					<div className="container mx-auto px-4 sm:px-6 text-center lg:px-8">
						<h1 className="mb-4 sm:mb-6 text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] font-bold text-[#0A1B2A]">
							C LABS STEM ACADEMICS
						</h1>
						<p className="mx-auto max-w-2xl text-base sm:text-lg text-[#4A6382]">
							Year-long academic program for Classes 3-9 with specially designed academic books for each standard
						</p>
					</div>
				</section>

				{/* Programs Grid */}
				<section className="py-16 sm:py-20 md:py-24 lg:py-32">
					<div className="container mx-auto px-4 sm:px-6 lg:px-8">
						<div className="grid gap-6 sm:gap-8">
							{programs.map((program, index) => (
								<div
									key={program.id}
									id={program.id}
									className="premium-card overflow-hidden rounded-xl sm:rounded-2xl border border-border/50 bg-white"
								>
									<div className="grid grid-cols-1 md:grid-cols-5">
										{/* Program Header */}
										<div className="bg-gradient-to-br from-[#276EF1] to-[#37D2C5] p-6 sm:p-8 md:col-span-2 md:p-10 relative">
											{index === 0 && (
												<span className="absolute top-4 sm:top-6 right-4 sm:right-6 rounded-full bg-white/20 px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-medium text-white">
													Most Popular
												</span>
											)}
											<div className="mb-4 sm:mb-6 flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 items-center justify-center rounded-xl sm:rounded-2xl bg-white/20 text-white backdrop-blur-sm">
												<program.icon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" strokeWidth={1.5} />
											</div>
											<h2 className="mb-2 text-xl sm:text-2xl md:text-3xl font-bold text-white">{program.title}</h2>
											<p className="mb-4 sm:mb-5 text-base sm:text-lg text-white/80">{program.subtitle}</p>
											<span className="inline-block rounded-full bg-white/20 px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-medium text-white">
												{program.grades}
											</span>
										</div>

										{/* Program Details */}
										<div className="p-6 sm:p-8 md:col-span-3 md:p-10">
											<p className="mb-5 sm:mb-6 text-sm sm:text-base text-[#4A6382] leading-relaxed">
												{program.description}
											</p>
											<h3 className="mb-3 sm:mb-4 text-sm sm:text-base font-semibold text-[#0A1B2A]">
												What You&apos;ll Learn:
											</h3>
											<ul className="mb-6 sm:mb-8 grid gap-2 sm:gap-3 grid-cols-1 sm:grid-cols-2">
												{program.features.map((feature, i) => (
													<li key={i} className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-[#4A6382]">
														<div className="flex h-4 w-4 sm:h-5 sm:w-5 shrink-0 items-center justify-center rounded-full bg-[#37D2C5]/10">
															<Check className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-[#37D2C5]" />
														</div>
														{feature}
													</li>
												))}
											</ul>
											<Button
												className="w-full sm:w-auto rounded-full bg-gradient-to-r from-[#276EF1] to-[#37D2C5] px-6 text-white shadow-lg shadow-primary/20 btn-shimmer"
												asChild
											>
												<Link href="/contact">
													Enroll Now
													<ArrowRight className="ml-2 h-4 w-4" />
												</Link>
											</Button>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* CTA Section */}
				<section className="bg-gradient-to-b from-[#f0f7ff] to-[#e8f4ff] py-16 sm:py-20 md:py-24 lg:py-32">
					<div className="container mx-auto px-4 sm:px-6 text-center lg:px-8">
						<h2 className="mb-4 sm:mb-5 text-2xl sm:text-[2rem] md:text-[2.5rem] font-semibold text-[#0A1B2A]">
							Ready to Enroll Your Child?
						</h2>
						<p className="mx-auto mb-8 sm:mb-10 max-w-xl text-base sm:text-lg text-[#4A6382]">
							Get your child enrolled in our comprehensive year-long STEM academic program. Contact us to learn more
							about our class-specific curriculum.
						</p>
						<Button
							size="lg"
							className="w-full sm:w-auto rounded-full bg-gradient-to-r from-[#276EF1] to-[#37D2C5] px-8 sm:px-10 py-5 sm:py-6 text-base font-semibold text-white shadow-xl shadow-primary/25 btn-shimmer"
							asChild
						>
							<Link href="/contact">Enroll Now - Contact Us</Link>
						</Button>
					</div>
				</section>
			</main>
			<Footer />
		</div>
	)
}
