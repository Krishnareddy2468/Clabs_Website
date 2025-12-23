import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Cpu, Code, Wifi, Shield, ArrowRight } from "lucide-react"

const programs = [
	{
		icon: Cpu,
		title: "Class 3-5 Program",
		description:
			"Foundation level STEM academics with hands-on activities and age-appropriate academic books for Classes 3, 4, and 5.",
		popular: true,
	},
	{
		icon: Code,
		title: "Class 6-7 Program",
		description:
			"Intermediate STEM curriculum focusing on coding, robotics, and scientific concepts with dedicated academic materials.",
		popular: false,
	},
	{
		icon: Wifi,
		title: "Class 8-9 Program",
		description:
			"Advanced STEM academics preparing students for competitive exams with comprehensive year-long coursework.",
		popular: false,
	},
	{
		icon: Shield,
		title: "Year-Long Curriculum",
		description:
			"Specially designed academic books for each standard covering all STEM subjects throughout the academic year.",
		popular: false,
	},
]

export function ProgramsPreview() {
	return (
		<section className="bg-gradient-to-b from-[#f0f7ff] to-[#e8f4ff] py-16 sm:py-24 md:py-28 lg:py-36">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="mb-10 sm:mb-12 md:mb-16 flex flex-col items-center justify-between gap-4 sm:gap-6 md:flex-row">
					<div className="text-center md:text-left">
						<h2 className="mb-2 text-2xl sm:text-[2rem] md:text-[2.5rem] font-semibold text-slate-900">
							Our Programs
						</h2>
						<p className="text-base sm:text-lg text-slate-600">
							Year-long STEM academics for Classes 3 to 9
						</p>
					</div>
					<Button
						variant="outline"
						className="rounded-full border-indigo-200 bg-white px-5 sm:px-6 text-indigo-600 hover:bg-indigo-600 hover:text-white hover:border-indigo-600"
						asChild
					>
						<Link href="/programs">
							View All Programs
							<ArrowRight className="ml-2 h-4 w-4" />
						</Link>
					</Button>
				</div>

				<div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
					{programs.map((program, index) => (
						<Link
							key={index}
							href="/programs"
							className="group flex flex-col overflow-hidden rounded-xl sm:rounded-2xl border border-indigo-100 bg-white hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300"
						>
							<div className="bg-indigo-50/50 p-5 sm:p-6 relative">
								{program.popular && (
									<span className="absolute top-3 sm:top-4 right-3 sm:right-4 rounded-full bg-indigo-100 px-2 sm:px-2.5 py-1 text-[10px] sm:text-xs font-medium text-indigo-700">
										Popular
									</span>
								)}
								<div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl bg-white text-indigo-600 shadow-sm">
									<program.icon
										className="h-6 w-6 sm:h-7 sm:w-7"
										strokeWidth={1.5}
									/>
								</div>
							</div>
							<div className="flex flex-1 flex-col p-5 sm:p-6">
								<h3 className="mb-2 text-base sm:text-lg font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
									{program.title}
								</h3>
								<p className="mb-4 sm:mb-5 flex-1 text-sm leading-relaxed text-slate-600">
									{program.description}
								</p>
								<span className="inline-flex items-center rounded-full bg-indigo-50 px-3 sm:px-4 py-2 text-sm font-medium text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
									Learn More
									<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
								</span>
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	)
}
