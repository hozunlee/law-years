export interface Education {
	id: string
	school: string
	degree?: string
	startDate?: string
	endDate?: string
	period?: string
	isEditing?: boolean
}

export interface Career {
	id: string
	organization: string
	position?: string
	startDate?: string
	endDate?: string
	period?: string
	isEditing?: boolean
}

export interface Certificate {
	id: string
	name: string
	issuedBy?: string
	isEditing?: boolean
}

export interface Specialty {
	id: string
	name: string
	isEditing?: boolean
}

export interface LawyerProfile {
	id: string
	name: string
	position?: string
	email?: string
	phone?: string
	profileImage?: string
	motto?: string
	address?: string
	education: Education[]
	career: Career[]
	certificates: Certificate[]
	specialties: Specialty[]
	stats?: {
		caseCount?: number
		winRate?: number
		yearCount?: number
	}
	isEditMode: boolean
}
