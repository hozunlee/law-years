import { browser } from '$app/environment'
import { writable } from 'svelte/store'
import { v4 as uuid } from 'uuid'
import type { LawyerProfile } from '$lib/types/profile'

// 샘플 데이터
const sampleProfile: LawyerProfile = {
	id: 'kang-seok-hyun',
	name: '강석현',
	position: '강한변론 변호사',
	email: 'shkang@daedolaw.com',
	phone: '010-7765-5367',
	profileImage: '/images/kang.png',
	motto: '함께 고민하고 해결을 위해 최선을 다하겠습니다.',
	address: '서울 서초구 서초대로111길 52번지',
	isEditMode: false,
	stats: {
		caseCount: 27,
		winRate: 92,
		yearCount: 8
	},
	education: [
		{ id: uuid(), school: '해성고등학교', startDate: '2004-03', endDate: '2007-02' },
		{ id: uuid(), school: '경희대학교 행정학과 학사', startDate: '2007-03', endDate: '2011-02' },
		{ id: uuid(), school: '경희대학교 법학과 전문석사', startDate: '2011-03', endDate: '2014-02' },
		{
			id: uuid(),
			school: '호주 제임스쿡 대학교(James Cook University) 일반연수 과정 수료',
			startDate: '2013-07',
			endDate: '2013-12'
		},
		{
			id: uuid(),
			school: '일본 추오 대학교(Chuo University) 법학 연수과정 수료',
			startDate: '2014-07',
			endDate: '2014-12'
		}
	],
	career: [
		{
			id: uuid(),
			organization: '대한민국 헌법재판소 실무연수',
			startDate: '2014-03',
			endDate: '2015-02'
		},
		{
			id: uuid(),
			organization: '제20대 대통령선거 후보 법률특보',
			startDate: '2021-01',
			endDate: '2022-03'
		},
		{
			id: uuid(),
			organization: '경희대학교 로스쿨(법학전문대학원) 겸임교수',
			startDate: '2018-03',
			endDate: '2020-02'
		},
		{
			id: uuid(),
			organization: '서울동부교육지원청 학교폭력처분 심의위원',
			startDate: '2019-03',
			endDate: '2021-02'
		},
		{
			id: uuid(),
			organization: '서울시 및 강남구청 자문변호사',
			startDate: '2017-03',
			endDate: '2020-12'
		},
		{
			id: uuid(),
			organization: '대한변호사협회 금융변호사회 이사(임원)',
			startDate: '2020-01',
			endDate: '2022-12'
		},
		{
			id: uuid(),
			organization: '경기도 공공투자관리센터 타당성 검수위원',
			startDate: '2021-03',
			endDate: '2023-02'
		},
		{
			id: uuid(),
			organization: '대형 법무법인 건설·부동산팀, 전국 네트워크 법무법인 형사·의료팀',
			startDate: '2015-03',
			endDate: '2017-12'
		},
		{
			id: uuid(),
			organization: '국민권익위원회 자문변호사',
			startDate: '2022-01',
			endDate: '2024-12'
		}
	],
	certificates: [
		{ id: uuid(), name: '변호사' },
		{ id: uuid(), name: '부동산권리분석사 1급' },
		{ id: uuid(), name: '학교폭력예방상담사 1급' },
		{ id: uuid(), name: '부부심리상담사 1급' },
		{ id: uuid(), name: '군심리상담사 1급' },
		{ id: uuid(), name: '병원행정관리사' }
	],
	specialties: [
		{ id: uuid(), name: '건설·부동산' },
		{ id: uuid(), name: '일반민사' },
		{ id: uuid(), name: '의료·산업재해·교통사고' },
		{ id: uuid(), name: '학교폭력·일반형사' }
	]
}

// 로컬 스토리지에서 데이터 불러오기 또는 샘플 데이터 사용
const storedProfile = browser
	? JSON.parse(localStorage.getItem('lawyerProfile') || JSON.stringify(sampleProfile))
	: sampleProfile

// Svelte 스토어 생성
const profile = writable<LawyerProfile>(storedProfile)

// 프로필 정보 업데이트 함수
function updateProfile(updatedProfile: Partial<LawyerProfile>) {
	profile.update((p) => {
		const newProfile = { ...p, ...updatedProfile }
		if (browser) {
			localStorage.setItem('lawyerProfile', JSON.stringify(newProfile))
		}
		return newProfile
	})
}

// 편집 모드 토글
function toggleEditMode() {
	profile.update((p) => {
		const newProfile = { ...p, isEditMode: !p.isEditMode }
		if (browser && !newProfile.isEditMode) {
			localStorage.setItem('lawyerProfile', JSON.stringify(newProfile))
		}
		return newProfile
	})
}

// 경력 관련 함수
function addCareer() {
	profile.update((p) => {
		const newProfile = {
			...p,
			career: [...p.career, { id: uuid(), organization: '', isEditing: true }]
		}
		return newProfile
	})
}

function updateCareer(
	id: string,
	data: Partial<{
		organization: string
		position: string
		period: string
		isEditing: boolean
		startDate?: string
		endDate?: string
	}>
) {
	profile.update((p) => {
		const newProfile = {
			...p,
			career: p.career.map((item) => (item.id === id ? { ...item, ...data } : item))
		}
		return newProfile
	})
}

function removeCareer(id: string) {
	profile.update((p) => {
		const newProfile = {
			...p,
			career: p.career.filter((item) => item.id !== id)
		}
		return newProfile
	})
}

// 학력 관련 함수
function addEducation() {
	profile.update((p) => {
		const newProfile = {
			...p,
			education: [...p.education, { id: uuid(), school: '', isEditing: true }]
		}
		return newProfile
	})
}

function updateEducation(
	id: string,
	data: Partial<{
		school: string
		degree: string
		period: string
		isEditing: boolean
		startDate?: string
		endDate?: string
	}>
) {
	profile.update((p) => {
		const newProfile = {
			...p,
			education: p.education.map((item) => (item.id === id ? { ...item, ...data } : item))
		}
		return newProfile
	})
}

function removeEducation(id: string) {
	profile.update((p) => {
		const newProfile = {
			...p,
			education: p.education.filter((item) => item.id !== id)
		}
		return newProfile
	})
}

// 자격증 관련 함수
function addCertificate() {
	profile.update((p) => {
		const newProfile = {
			...p,
			certificates: [...p.certificates, { id: uuid(), name: '', isEditing: true }]
		}
		return newProfile
	})
}

function updateCertificate(
	id: string,
	data: Partial<{ name: string; issuedBy: string; isEditing: boolean }>
) {
	profile.update((p) => {
		const newProfile = {
			...p,
			certificates: p.certificates.map((item) => (item.id === id ? { ...item, ...data } : item))
		}
		return newProfile
	})
}

function removeCertificate(id: string) {
	profile.update((p) => {
		const newProfile = {
			...p,
			certificates: p.certificates.filter((item) => item.id !== id)
		}
		return newProfile
	})
}

// 전문 분야 관련 함수
function addSpecialty() {
	profile.update((p) => {
		const newProfile = {
			...p,
			specialties: [...p.specialties, { id: uuid(), name: '', isEditing: true }]
		}
		return newProfile
	})
}

function updateSpecialty(id: string, data: Partial<{ name: string; isEditing: boolean }>) {
	profile.update((p) => {
		const newProfile = {
			...p,
			specialties: p.specialties.map((item) => (item.id === id ? { ...item, ...data } : item))
		}
		return newProfile
	})
}

function removeSpecialty(id: string) {
	profile.update((p) => {
		const newProfile = {
			...p,
			specialties: p.specialties.filter((item) => item.id !== id)
		}
		return newProfile
	})
}

// 프로필 스토어 내보내기
export const profileStore = {
	profile,
	updateProfile,
	toggleEditMode,
	addCareer,
	updateCareer,
	removeCareer,
	addEducation,
	updateEducation,
	removeEducation,
	addCertificate,
	updateCertificate,
	removeCertificate,
	addSpecialty,
	updateSpecialty,
	removeSpecialty
}
