<script lang="ts">
	import { profileStore } from '$lib/stores/profile';
	import { Button } from '$lib/components/ui/button';
	import { Card } from '$lib/components/ui/card';
	import { Avatar } from '$lib/components/ui/avatar';
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
	import ProfileHeader from '$lib/components/profile/ProfileHeader.svelte';
	// import EducationSection from '$lib/components/profile/EducationSection.svelte';
	import CareerSection from '$lib/components/profile/CareerSection.svelte';
	// import CertificatesSection from '$lib/components/profile/CertificatesSection.svelte';
	// import SpecialtiesSection from '$lib/components/profile/SpecialtiesSection.svelte';

	const { profile, toggleEditMode } = profileStore;

	console.log('$profile :>> ', $profile);
	// 현재 선택된 탭
	let currentTab = 'profile';
</script>

<svelte:head>
	<title>{$profile.name} | 변호사 프로필</title>
	<meta name="description" content={$profile.motto} />
</svelte:head>

<div class="container mx-auto max-w-md px-4 py-8">
	<ProfileHeader profile={$profile} />

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
				<!-- <EducationSection /> -->
			</Card>

			<Card class="p-4">
				<h2 class="mb-2 text-xl font-semibold">자격</h2>
				<!-- <CertificatesSection /> -->
			</Card>

			<Card class="p-4">
				<h2 class="mb-2 text-xl font-semibold">전문 분야</h2>
				<!-- <SpecialtiesSection /> -->
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
