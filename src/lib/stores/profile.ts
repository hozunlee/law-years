import { browser } from '$app/environment';
import { writable, type Writable } from 'svelte/store';
import { v4 as uuid } from 'uuid';
import type { LawyerProfile, Education } from '$lib/types/profile';

// 샘플 데이터
const sampleProfile: LawyerProfile = {
	id: 'kang-seok-hyun',
	name: '강석현',
	position: '변호사',
	email: 'shkang@daedolaw.com',
	phone: '010-7765-5367',
	profileImage: '/images/kang.png',
	motto: '강한 변론, 강한 변호',
	address: '서울 서초구 서초대로111길 52번지',
	isEditMode: false,
	stats: {
		caseCount: 27,
		winRate: 92,
		yearCount: 8
	},
	education: [
		{ id: uuid(), school: '해성고등학교' },
		{ id: uuid(), school: '경희대학교 행정학과 학사' },
		{ id: uuid(), school: '경희대학교 법학과 전문석사' },
		{ id: uuid(), school: '호주 제임스쿡 대학교(James Cook University) 일반연수 과정 수료' },
		{ id: uuid(), school: '일본 추오 대학교(Chuo University) 법학 연수과정 수료' }
	],
	career: [
		{ id: uuid(), organization: '대한민국 헌법재판소 실무연수' },
		{ id: uuid(), organization: '제20대 대통령선거 후보 법률특보' },
		{ id: uuid(), organization: '경희대학교 로스쿨(법학전문대학원) 겸임교수' },
		{ id: uuid(), organization: '서울동부교육지원청 학교폭력처분 심의위원' },
		{ id: uuid(), organization: '서울시 및 강남구청 자문변호사' },
		{ id: uuid(), organization: '대한변호사협회 금융변호사회 이사(임원)' },
		{ id: uuid(), organization: '경기도 공공투자관리센터 타당성 검수위원' },
		{ id: uuid(), organization: '대형 법무법인 건설·부동산팀, 전국 네트워크 법무법인 형사·의료팀' },
		{ id: uuid(), organization: '국민권익위원회 자문변호사' }
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
};

// Svelte store로 상태 관리
function createProfileStore() {
	const initialProfile = browser
		? JSON.parse(localStorage.getItem('lawyerProfile') || JSON.stringify(sampleProfile))
		: sampleProfile;

	const profile: Writable<LawyerProfile> = writable(initialProfile);

	function updateProfile(updatedProfile: Partial<LawyerProfile>) {
		profile.update((p) => {
			const newProfile = { ...p, ...updatedProfile };
			if (browser) {
				localStorage.setItem('lawyerProfile', JSON.stringify(newProfile));
			}
			return newProfile;
		});
	}

	function toggleEditMode() {
		profile.update((p) => {
			const newProfile = { ...p, isEditMode: !p.isEditMode };
			if (browser && !newProfile.isEditMode) {
				localStorage.setItem('lawyerProfile', JSON.stringify(newProfile));
			}
			return newProfile;
		});
	}

	function addEducation() {
		profile.update((p) => ({
			...p,
			education: [...p.education, { id: uuid(), school: '', isEditing: true }]
		}));
	}

	function updateEducation(id: string, data: Partial<Education>) {
		profile.update((p) => ({
			...p,
			education: p.education.map((item) => (item.id === id ? { ...item, ...data } : item))
		}));
	}

	function removeEducation(id: string) {
		profile.update((p) => ({
			...p,
			education: p.education.filter((item) => item.id !== id)
		}));
	}

	return {
		profile,
		updateProfile,
		toggleEditMode,
		addEducation,
		updateEducation,
		removeEducation
	};
}

export const profileStore = createProfileStore();
