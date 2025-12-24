"use client"

import { useEffect, useState } from "react"
import { Users } from "lucide-react"

interface TeamMember {
	id: string
	name: string
	role: string
	image_url: string | null
	display_order: number
}

export function TeamSection() {
	const [team, setTeam] = useState<TeamMember[]>([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		fetch("/api/team")
			.then((res) => res.json())
			.then((data) => {
				setTeam(Array.isArray(data) ? data : [])
				setIsLoading(false)
			})
			.catch((err) => {
				console.error("Failed to load team members:", err)
				setIsLoading(false)
			})
	}, [])

	return (
		<section className="bg-slate-800 py-16 sm:py-20 md:py-24 lg:py-32">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<h2 className="mb-10 sm:mb-12 md:mb-16 text-center text-2xl sm:text-[2rem] md:text-[2.5rem] font-semibold text-white">
					Meet Our Team
				</h2>
				{isLoading ? (
					<div className="flex justify-center items-center py-20">
						<div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
					</div>
				) : team.length > 0 ? (
					<div className="grid gap-6 sm:gap-8 md:gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl mx-auto">
						{team.map((member) => (
							<div key={member.id} className="group text-center">
								<div className="mb-4 sm:mb-5 overflow-hidden rounded-2xl border-4 border-slate-600/50 bg-slate-700/30 shadow-xl transition-all duration-300 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/20">
									{member.image_url ? (
										<div className="relative aspect-[3/4] w-full overflow-hidden">
											<img
												src={member.image_url}
												alt={member.name}
												className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
											/>
										</div>
									) : (
										<div className="relative aspect-[3/4] w-full flex items-center justify-center bg-gradient-to-br from-indigo-500/20 to-slate-700">
											<div className="text-5xl font-bold text-indigo-400">
												{member.name.charAt(0)}
											</div>
										</div>
									)}
								</div>
								<h3 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-1">
									{member.name}
								</h3>
								<p className="text-xs sm:text-sm md:text-base text-slate-400">
									{member.role}
								</p>
							</div>
						))}
					</div>
				) : (
					<div className="text-center py-20">
						<div className="w-20 h-20 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
							<Users className="w-10 h-10 text-indigo-400" />
						</div>
						<p className="text-slate-300 font-semibold text-lg mb-2">
							No team members yet
						</p>
						<p className="text-sm text-slate-400">
							Add team members from admin panel
						</p>
					</div>
				)}
			</div>
		</section>
	)
}
