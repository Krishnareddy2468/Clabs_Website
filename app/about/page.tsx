"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { TeamSection } from "@/components/home/team-section"
import { Target, Eye, Heart, Lightbulb, Rocket, Users } from "lucide-react"

const timeline = [
	{
		year: "2022",
		title: "Founded",
		description: "C-LABS started with a vision to make STEM accessible to all children.",
	},
	{
		year: "2022",
		title: "First 100 Students",
		description: "Reached our first milestone of training 100 young innovators.",
	},
	{
		year: "2023",
		title: "Online Expansion",
		description: "Launched virtual programs to continue education during global challenges.",
	},
	{
		year: "2023",
		title: "22+ Schools",
		description: "Partnered with over 22 schools to bring STEM to more classrooms.",
	},
	{
		year: "2023",
		title: "Innovation Labs",
		description: "Opened state-of-the-art innovation labs in multiple cities.",
	},
	{
		year: "2025",
		title: "3000+ Students",
		description: "Celebrated training over 15,000 students across the country.",
	},
]

const approaches = [
	{
		icon: Lightbulb,
		title: "Learn by Doing",
		description: "Hands-on projects and experiments that make abstract concepts tangible and memorable.",
	},
	{
		icon: Rocket,
		title: "Think Like Innovators",
		description: "Encouraging creative problem-solving and design thinking from an early age.",
	},
	{
		icon: Users,
		title: "Build the Future",
		description: "Preparing students for careers that don't exist yet with adaptable skill sets.",
	},
]

export default function AboutPage() {
	return (
		<div className="flex min-h-screen flex-col">
			<Navigation />
			<main className="flex-1">
				{/* Hero Banner */}
				<section className="relative overflow-hidden bg-gradient-to-b from-indigo-50 to-white py-16 sm:py-20 md:py-24 lg:py-32">
					<div className="container mx-auto px-4 sm:px-6 text-center lg:px-8">
						<h1 className="mb-4 sm:mb-6 text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] font-bold text-slate-900">
							About C-LABS
						</h1>
						<p className="mx-auto max-w-2xl text-base sm:text-lg text-slate-600">
							Shaping the next generation of innovators through hands-on STEM education
						</p>
					</div>
				</section>

				{/* Mission & Vision */}
				<section className="py-16 sm:py-20 md:py-24 lg:py-32">
					<div className="container mx-auto px-4 sm:px-6 lg:px-8">
						<div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 md:grid-cols-2">
							<div className="rounded-xl sm:rounded-2xl border border-indigo-100 bg-white p-6 sm:p-8 md:p-10 lg:p-12 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300">
								<div className="mb-4 sm:mb-6 inline-flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 items-center justify-center rounded-xl sm:rounded-2xl bg-indigo-600/10 text-indigo-600">
									<Target className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" strokeWidth={1.5} />
								</div>
								<h2 className="mb-4 sm:mb-5 text-xl sm:text-2xl font-semibold text-slate-900">Our Mission</h2>
								<p className="text-sm sm:text-base text-slate-600 leading-relaxed">
									To provide comprehensive year-long STEM academic programs for Classes 3-9 through specially
									designed academic books and curriculum. We believe every student deserves access to quality STEM
									education that builds strong foundations for future success.
								</p>
							</div>
							<div className="rounded-xl sm:rounded-2xl border border-indigo-100 bg-white p-6 sm:p-8 md:p-10 lg:p-12 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300">
								<div className="mb-4 sm:mb-6 inline-flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 items-center justify-center rounded-xl sm:rounded-2xl bg-indigo-500/10 text-indigo-500">
									<Eye className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" strokeWidth={1.5} />
								</div>
								<h2 className="mb-4 sm:mb-5 text-xl sm:text-2xl font-semibold text-slate-900">Our Vision</h2>
								<p className="text-sm sm:text-base text-slate-600 leading-relaxed">
									To become the leading provider of STEM academic programs in India, setting the standard for
									academic excellence from Class 3 to Class 9. We envision a generation well-prepared in STEM
									subjects through our year-long structured curriculum.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Why CLABS Exists */}
				<section className="bg-slate-800 py-16 sm:py-20 md:py-24 lg:py-32">
					<div className="container mx-auto px-4 sm:px-6 lg:px-8">
						<div className="mx-auto max-w-3xl text-center">
							<div className="mx-auto mb-4 sm:mb-6 inline-flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 items-center justify-center rounded-xl sm:rounded-2xl bg-indigo-500/20 text-indigo-400">
								<Heart className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" strokeWidth={1.5} />
							</div>
							<h2 className="mb-4 sm:mb-6 text-2xl sm:text-[2rem] md:text-[2.5rem] font-semibold text-white">
								Why CLABS Exists
							</h2>
							<p className="mb-6 sm:mb-8 text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed">
								In a rapidly evolving technological landscape, we noticed a significant gap between traditional
								education and the skills needed for the future. Too many children were learning about technology
								passively, without ever getting to build, create, or experiment.
							</p>
							<p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed">
								CLABS was founded to bridge this gap. We believe that every child deserves the opportunity to
								explore robotics, coding, AI, and other emerging technologies in a supportive, hands-on
								environment. Our programs are designed not just to teach skills, but to inspire a lifelong love
								of learning and innovation.
							</p>
							<p className="mt-4 max-w-2xl mx-auto text-sm sm:text-[15px] leading-relaxed text-slate-400">
								Providing year-long STEM academic excellence for Classes 3-9 through specially designed academic
								books and comprehensive curriculum.
							</p>
						</div>
					</div>
				</section>

				{/* Timeline */}
				<section className="py-16 sm:py-20 md:py-24 lg:py-32">
					<div className="container mx-auto px-4 sm:px-6 lg:px-8">
						<h2 className="mb-10 sm:mb-12 md:mb-16 text-center text-2xl sm:text-[2rem] md:text-[2.5rem] font-semibold text-slate-900">
							Our Journey
						</h2>
						<div className="relative mx-auto max-w-4xl">
							<div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-indigo-600 to-indigo-400 md:block" />
							<div className="space-y-6 sm:space-y-8 md:space-y-12">
								{timeline.map((item, index) => (
									<div
										key={index}
										className={`flex flex-col gap-4 md:flex-row md:gap-8 ${
											index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
										}`}
									>
										<div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
											<div
												className={`rounded-xl sm:rounded-2xl border border-indigo-100 bg-white p-5 sm:p-6 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 ${index % 2 === 0 ? "md:mr-8" : "md:ml-8"}`}
											>
												<span className="mb-2 inline-block rounded-full bg-indigo-50 px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-semibold text-indigo-600">
													{item.year}
												</span>
												<h3 className="mb-2 text-base sm:text-lg font-semibold text-slate-900">
													{item.title}
												</h3>
												<p className="text-sm text-slate-600">{item.description}</p>
											</div>
										</div>
										<div className="hidden h-5 w-5 shrink-0 self-center rounded-full bg-gradient-to-br from-indigo-600 to-indigo-400 shadow-lg shadow-indigo-500/30 md:block" />
										<div className="flex-1 hidden md:block" />
									</div>
								))}
							</div>
						</div>
					</div>
				</section>

				{/* Our Approach */}
				<section className="bg-white py-16 sm:py-20 md:py-24 lg:py-32">
					<div className="container mx-auto px-4 sm:px-6 lg:px-8">
						<h2 className="mb-10 sm:mb-12 md:mb-16 text-center text-2xl sm:text-[2rem] md:text-[2.5rem] font-semibold text-slate-900">
							Our Approach
						</h2>
						<div className="grid gap-6 sm:gap-8 md:gap-10 grid-cols-1 md:grid-cols-3">
							{approaches.map((approach, index) => (
								<div key={index} className="text-center">
									<div className="mx-auto mb-4 sm:mb-6 flex h-16 w-16 sm:h-18 sm:w-18 md:h-20 md:w-20 items-center justify-center rounded-xl sm:rounded-2xl bg-indigo-600/10 text-indigo-600">
										<approach.icon className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10" strokeWidth={1.5} />
									</div>
									<h3 className="mb-2 sm:mb-3 text-lg sm:text-xl font-semibold text-slate-900">
										{approach.title}
									</h3>
									<p className="text-sm sm:text-base text-slate-600 leading-relaxed">
										{approach.description}
									</p>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Team */}
				<TeamSection />
			</main>
			<Footer />
		</div>
	)
}