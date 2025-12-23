"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2, Edit2, Plus, Upload } from "lucide-react"

interface TeamMember {
	id: string
	name: string
	role: string
	image_url: string | null
	display_order: number
}

export default function AdminTeamPage() {
	const [members, setMembers] = useState<TeamMember[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [editingId, setEditingId] = useState<string | null>(null)
	const [formData, setFormData] = useState({
		name: "",
		role: "",
		image_url: "",
		display_order: 0,
	})

	useEffect(() => {
		fetchMembers()
	}, [])

	const fetchMembers = async () => {
		try {
			const res = await fetch("/api/team")
			const data = await res.json()
			setMembers(Array.isArray(data) ? data : [])
		} catch (error) {
			console.error("Failed to fetch team members:", error)
		} finally {
			setIsLoading(false)
		}
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsSubmitting(true)

		try {
			const url = editingId ? `/api/team/${editingId}` : "/api/team"
			const method = editingId ? "PUT" : "POST"

			const res = await fetch(url, {
				method,
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			})

			if (res.ok) {
				await fetchMembers()
				resetForm()
			}
		} catch (error) {
			console.error("Failed to save team member:", error)
		} finally {
			setIsSubmitting(false)
		}
	}

	const handleEdit = (member: TeamMember) => {
		setEditingId(member.id)
		setFormData({
			name: member.name,
			role: member.role,
			image_url: member.image_url || "",
			display_order: member.display_order,
		})
	}

	const handleDelete = async (id: string) => {
		if (!confirm("Are you sure you want to delete this team member?")) return

		try {
			const res = await fetch(`/api/team/${id}`, { method: "DELETE" })
			if (res.ok) {
				await fetchMembers()
			}
		} catch (error) {
			console.error("Failed to delete team member:", error)
		}
	}

	const resetForm = () => {
		setFormData({ name: "", role: "", image_url: "", display_order: 0 })
		setEditingId(null)
	}

	const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return

		const formData = new FormData()
		formData.append("file", file)

		try {
			const res = await fetch("/api/upload", {
				method: "POST",
				body: formData,
			})

			if (res.ok) {
				const { url } = await res.json()
				setFormData((prev) => ({ ...prev, image_url: url }))
			}
		} catch (error) {
			console.error("Failed to upload image:", error)
		}
	}

	if (isLoading) {
		return (
			<div className="flex h-screen items-center justify-center">
				<div className="text-center">
					<div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
					<p className="text-slate-600">Loading team members...</p>
				</div>
			</div>
		)
	}

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold text-slate-900">Team Management</h1>
				<p className="text-slate-600 mt-2">Manage your team members</p>
			</div>

			{/* Form */}
			<div className="bg-white rounded-xl border border-slate-200 p-6">
				<h2 className="text-xl font-semibold text-slate-900 mb-4">
					{editingId ? "Edit Team Member" : "Add Team Member"}
				</h2>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<Label htmlFor="name">Name *</Label>
							<Input
								id="name"
								value={formData.name}
								onChange={(e) => setFormData({ ...formData, name: e.target.value })}
								required
							/>
						</div>
						<div>
							<Label htmlFor="role">Role *</Label>
							<Input
								id="role"
								value={formData.role}
								onChange={(e) => setFormData({ ...formData, role: e.target.value })}
								required
							/>
						</div>
						<div>
							<Label htmlFor="display_order">Display Order</Label>
							<Input
								id="display_order"
								type="number"
								value={formData.display_order || 0}
								onChange={(e) =>
									setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })
								}
							/>
						</div>
						<div>
							<Label htmlFor="image">Image</Label>
							<div className="flex gap-2">
								<Input
									id="image"
									type="file"
									accept="image/*"
									onChange={handleImageUpload}
									className="flex-1"
								/>
							</div>
							{formData.image_url && (
								<img
									src={formData.image_url}
									alt="Preview"
									className="mt-2 h-20 w-20 object-cover rounded-lg"
								/>
							)}
						</div>
					</div>
					<div className="flex gap-2">
						<Button type="submit" disabled={isSubmitting}>
							{isSubmitting ? "Saving..." : editingId ? "Update" : "Add"} Team Member
						</Button>
						{editingId && (
							<Button type="button" variant="outline" onClick={resetForm}>
								Cancel
							</Button>
						)}
					</div>
				</form>
			</div>

			{/* Team Members List */}
			<div className="bg-white rounded-xl border border-slate-200 p-6">
				<h2 className="text-xl font-semibold text-slate-900 mb-4">Team Members</h2>
				{members.length === 0 ? (
					<p className="text-center text-slate-500 py-8">No team members yet. Add one above!</p>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{members.map((member) => (
							<div
								key={member.id}
								className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow"
							>
								{member.image_url ? (
									<img
										src={member.image_url}
										alt={member.name}
										className="w-full h-48 object-cover rounded-lg mb-3"
									/>
								) : (
									<div className="w-full h-48 bg-gradient-to-br from-indigo-100 to-slate-100 rounded-lg mb-3 flex items-center justify-center">
										<div className="text-5xl font-bold text-indigo-600">
											{member.name.charAt(0)}
										</div>
									</div>
								)}
								<h3 className="font-semibold text-slate-900">{member.name}</h3>
								<p className="text-sm text-slate-600 mb-2">{member.role}</p>
								<p className="text-xs text-slate-400 mb-3">Order: {member.display_order}</p>
								<div className="flex gap-2">
									<Button
										size="sm"
										variant="outline"
										onClick={() => handleEdit(member)}
										className="flex-1"
									>
										<Edit2 className="w-4 h-4 mr-1" />
										Edit
									</Button>
									<Button
										size="sm"
										variant="outline"
										onClick={() => handleDelete(member.id)}
										className="text-red-600 hover:text-red-700 hover:bg-red-50"
									>
										<Trash2 className="w-4 h-4" />
									</Button>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	)
}
