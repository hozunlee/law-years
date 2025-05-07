<script lang="ts">
	import { profileStore } from '$lib/stores/profile'
	import { Button } from '$lib/components/ui/button'
	import { Card } from '$lib/components/ui/card'
	import { Avatar } from '$lib/components/ui/avatar'
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs'
	import ProfileHeader from '$lib/components/profile/ProfileHeader.svelte'
	import EducationSection from '$lib/components/profile/EducationSection.svelte'
	import CareerSection from '$lib/components/profile/CareerSection.svelte'
	import CertificatesSection from '$lib/components/profile/CertificatesSection.svelte'
	import SpecialtiesSection from '$lib/components/profile/SpecialtiesSection.svelte'

	import LinkIcon from '@lucide/svelte/icons/link'
	import ContactIcon from '@lucide/svelte/icons/contact'

	const { profile, toggleEditMode } = profileStore

	console.log('$profile :>> ', $profile)
	// 현재 선택된 탭
	let currentTab = $state('profile')

	// 미디어 쿼리 감지 (클라이언트 측에서만 실행)
	let isDesktop = $state(false)

	function checkMediaQuery() {
		isDesktop = window.matchMedia('(min-width: 1024px)').matches
	}

	// 클라이언트 측에서만 실행되는 코드
	import { onMount } from 'svelte'

	onMount(() => {
		checkMediaQuery()
		window.addEventListener('resize', checkMediaQuery)

		return () => {
			window.removeEventListener('resize', checkMediaQuery)
		}
	})
</script>

<svelte:head>
	<title>{$profile.name} | 변호사 프로필</title>
	<meta name="description" content={$profile.motto} />
</svelte:head>

<!-- 데스크톱 레이아웃 -->
{#if isDesktop}
	<div class="container mx-auto max-w-7xl px-4 py-8">
		<div class="flex flex-col gap-8 lg:flex-row">
			<!-- 왼쪽 섹션: 프로필 이미지 및 기본 정보 -->
			<div class="lg:w-1/3">
				<div class="sticky top-8">
					<div class="mb-6 flex flex-col items-center">
						<div class="relative mb-4">
							<!-- <Avatar class="border-primary h-64 w-64 border-2"> -->
							<img
								src={$profile.profileImage || '/images/placeholder.jpg'}
								alt={$profile.name}
								class="h-full w-full object-cover"
							/>
							<!-- </Avatar> -->

							{#if $profile.isEditMode}
								<label
									for="profileImage"
									class="bg-primary absolute right-0 bottom-0 cursor-pointer rounded-full p-2 text-white"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="20"
										height="20"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<path
											d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"
										></path>
										<circle cx="12" cy="13" r="3"></circle>
									</svg>
									<input id="profileImage" type="file" accept="image/*" class="hidden" />
								</label>
							{/if}
						</div>

						<div class="w-full text-center">
							<h1 class="mb-1 text-3xl font-bold">{$profile.name} {$profile.position}</h1>
							<p class="mb-6 text-lg">{$profile.motto}</p>

							<div class="flex flex-col space-y-3">
								<div class="flex items-center justify-center space-x-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<path
											d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
										></path>
									</svg>
									<span>{$profile.phone}</span>
								</div>
								<div class="flex items-center justify-center space-x-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<path
											d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
										></path>
										<polyline points="22,6 12,13 2,6"></polyline>
									</svg>
									<span>{$profile.email}</span>
								</div>
								{#if $profile.address}
									<div class="flex items-center justify-center space-x-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
										>
											<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
											<circle cx="12" cy="10" r="3"></circle>
										</svg>
										<span>{$profile.address}</span>
									</div>
								{/if}
							</div>

							<div class="mt-8">
								<div class="mt-6 grid grid-cols-3 gap-4">
									<div class="text-center">
										<div class="text-3xl font-bold">{$profile.stats?.caseCount || 0}+</div>
										<div class="text-muted-foreground text-sm">사건</div>
									</div>
									<div class="text-center">
										<div class="text-3xl font-bold text-emerald-500">
											{$profile.stats?.winRate || 0}%
										</div>
										<div class="text-muted-foreground text-sm">승소율</div>
									</div>
									<div class="text-center">
										<div class="text-3xl font-bold">{$profile.stats?.yearCount || 0}y</div>
										<div class="text-muted-foreground text-sm">경력</div>
									</div>
								</div>
							</div>

							<div class="mt-6 flex w-full space-x-4">
								<Button class="w-full"><ContactIcon class="mr-2 size-4" />상담하기</Button>
								<Button class="w-full"><LinkIcon class="mr-2 size-4" />공유하기</Button>
							</div>
							{#if $profile.isEditMode}
								<div class="mt-6">
									<Button onclick={toggleEditMode} class="w-full">저장하기</Button>
								</div>
							{:else}
								<div class="mt-6">
									<Button onclick={toggleEditMode} variant="outline" class="w-full">
										편집하기
									</Button>
								</div>
							{/if}
						</div>
					</div>
				</div>
			</div>

			<!-- 오른쪽 섹션: 탭 및 콘텐츠 -->
			<div class="lg:w-2/3">
				<Tabs value={currentTab} class="w-full">
					<TabsList class="w-full">
						<TabsTrigger value="profile" onclick={() => (currentTab = 'profile')} class="flex-1"
							>전체</TabsTrigger
						>
						<TabsTrigger value="career" onclick={() => (currentTab = 'career')} class="flex-1"
							>경력</TabsTrigger
						>
						<TabsTrigger value="case" onclick={() => (currentTab = 'case')} class="flex-1"
							>사례</TabsTrigger
						>
						<TabsTrigger value="news" onclick={() => (currentTab = 'news')} class="flex-1"
							>소식</TabsTrigger
						>
					</TabsList>

					<TabsContent value="profile" class="mt-4 space-y-6">
						<Card class="p-6">
							<h2 class="mb-4 text-2xl font-semibold">경력</h2>
							<CareerSection />
						</Card>

						<Card class="p-6">
							<h2 class="mb-4 text-2xl font-semibold">학력</h2>
							<EducationSection />
						</Card>

						<Card class="p-6">
							<h2 class="mb-4 text-2xl font-semibold">자격</h2>
							<CertificatesSection />
						</Card>

						<Card class="p-6">
							<h2 class="mb-4 text-2xl font-semibold">전문 분야</h2>
							<SpecialtiesSection />
						</Card>
					</TabsContent>

					<TabsContent value="career">
						<Card class="p-6">
							<h2 class="mb-4 text-2xl font-semibold">경력</h2>
							<CareerSection />
						</Card>
					</TabsContent>

					<TabsContent value="case">
						<Card class="p-6">
							<p>준비 중입니다.</p>
						</Card>
					</TabsContent>

					<TabsContent value="news">
						<Card class="p-6">
							<p>준비 중입니다.</p>
						</Card>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	</div>

	<!-- 모바일 레이아웃 -->
{:else}
	<div class="container mx-auto max-w-md px-4 py-8">
		<ProfileHeader profile={$profile} />
		<div class="mt-6 flex w-full space-x-4">
			<Button class="w-full"><ContactIcon class="mr-2 size-4" />상담하기</Button>
			<Button class="w-full"><LinkIcon class="mr-2 size-4" />공유하기</Button>
		</div>
		{#if $profile.isEditMode}
			<div class="sticky top-0 z-10 mb-4 border-b bg-white py-2 dark:bg-slate-900">
				<Button onclick={toggleEditMode} class="w-full">저장하기</Button>
			</div>
		{:else}
			<div class="sticky top-0 z-10 mb-4 border-b bg-white py-2 dark:bg-slate-900">
				<Button onclick={toggleEditMode} variant="outline" class="w-full">편집하기</Button>
			</div>
		{/if}

		<div class="mb-4">
			<div class="flex items-center justify-between">
				<div class="flex space-x-2">
					<div class="text-3xl font-bold">{$profile.stats?.caseCount || 0}+</div>
					<div class="text-muted-foreground text-sm">사건</div>
				</div>
				<div class="flex space-x-2">
					<div class="text-3xl font-bold text-emerald-500">{$profile.stats?.winRate || 0}%</div>
					<div class="text-muted-foreground text-sm">승소율</div>
				</div>
				<div class="flex space-x-2">
					<div class="text-3xl font-bold">{$profile.stats?.yearCount || 0}y</div>
					<div class="text-muted-foreground text-sm">경력</div>
				</div>
			</div>
		</div>

		<Tabs value={currentTab} class="w-full">
			<TabsList class="w-full">
				<TabsTrigger value="profile" onclick={() => (currentTab = 'profile')} class="flex-1"
					>전체</TabsTrigger
				>
				<TabsTrigger value="career" onclick={() => (currentTab = 'career')} class="flex-1"
					>경력</TabsTrigger
				>
				<TabsTrigger value="case" onclick={() => (currentTab = 'case')} class="flex-1"
					>사례</TabsTrigger
				>
				<TabsTrigger value="news" onclick={() => (currentTab = 'news')} class="flex-1"
					>소식</TabsTrigger
				>
			</TabsList>

			<TabsContent value="profile" class="mt-4 space-y-6">
				<Card class="p-4">
					<h2 class="mb-2 text-xl font-semibold">경력</h2>
					<CareerSection />
				</Card>

				<Card class="p-4">
					<h2 class="mb-2 text-xl font-semibold">학력</h2>
					<EducationSection />
				</Card>

				<Card class="p-4">
					<h2 class="mb-2 text-xl font-semibold">자격</h2>
					<CertificatesSection />
				</Card>

				<Card class="p-4">
					<h2 class="mb-2 text-xl font-semibold">전문 분야</h2>
					<SpecialtiesSection />
				</Card>
			</TabsContent>

			<TabsContent value="career">
				<Card class="p-4">
					<h2 class="mb-2 text-xl font-semibold">경력</h2>
					<CareerSection />
				</Card>
			</TabsContent>

			<TabsContent value="case">
				<Card class="p-4">
					<p>준비 중입니다.</p>
				</Card>
			</TabsContent>

			<TabsContent value="news">
				<Card class="p-4">
					<p>준비 중입니다.</p>
				</Card>
			</TabsContent>
		</Tabs>
	</div>
{/if}
