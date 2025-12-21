import { BookOpen, Wrench, Lightbulb, FlaskConical } from "lucide-react"

const features = [
	{
		icon: BookOpen,
		title: "Academic Book Series",
		description:
			"Specially designed academic books for each standard from Class 3 to 9, aligned with educational standards.",
	},
	{
		icon: Wrench,
		title: "Year-Long Curriculum",
		description:
			"Comprehensive annual academic program covering all STEM subjects with progressive learning modules.",
	},
	{
		icon: Lightbulb,
		title: "Standard-Specific Content",
		description:
			"Age-appropriate content tailored for each class level, ensuring optimal learning progression throughout the year.",
	},
	{
		icon: FlaskConical,
		title: "Hands-On Learning",
		description:
			"Activity-based approach combining theoretical knowledge with practical experiments and projects.",
	},
]

export function FeaturesSection() {
	return (
		<section className="relative py-16 sm:py-24 md:py-28 lg:py-36 overflow-hidden">
			<div className="absolute inset-0 dot-pattern opacity-50" />

			<div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
				<div className="mx-auto mb-10 sm:mb-12 md:mb-16 max-w-2xl text-center px-2">
					<h2 className="mb-3 sm:mb-4 text-2xl sm:text-[2rem] md:text-[2.5rem] font-semibold text-[#0A1B2A]">
						Why Choose C LABS STEM ACADEMICS?
					</h2>
					<p className="text-base sm:text-lg text-[#4A6382]">
						Year-Long Academic Excellence for Classes 3-9
					</p>
				</div>

				<div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
					{features.map((feature, index) => (
						<div
							key={index}
							className="premium-card gradient-border group relative overflow-hidden rounded-xl sm:rounded-2xl border border-border/50 bg-white p-6 sm:p-8 text-center"
						>
							<div className="mx-auto mb-4 sm:mb-6 flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#276EF1]/10 to-[#37D2C5]/10 text-[#276EF1] transition-transform group-hover:scale-110">
								<feature.icon
									className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8"
									strokeWidth={1.5}
								/>
							</div>
							<h3 className="mb-2 sm:mb-3 text-base sm:text-lg font-semibold text-[#0A1B2A]">
								{feature.title}
							</h3>
							<p className="text-sm leading-relaxed text-[#4A6382]">
								{feature.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
