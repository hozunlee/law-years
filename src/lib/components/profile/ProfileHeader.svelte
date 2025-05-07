<script lang="ts">
	import type { LawyerProfile } from '$lib/types/profile'
	import { Avatar } from '$lib/components/ui/avatar'
	import { Input } from '$lib/components/ui/input'
	import { Textarea } from '$lib/components/ui/textarea'
	import { profileStore } from '$lib/stores/profile'

	import { getValue } from '$lib/components/common'

	export let profile: LawyerProfile

	const { updateProfile } = profileStore

	// 이미지 업로드 처리 (프로토타입은 로컬 스토리지만 사용)
	function handleImageUpload(event: Event) {
		const input = event.target as HTMLInputElement
		if (!input.files?.length) return

		const file = input.files[0]
		const reader = new FileReader()
		reader.onload = (e) => {
			updateProfile({ profileImage: e.target?.result as string })
		}
		reader.readAsDataURL(file)
	}
</script>

<div class="mb-6 flex flex-col items-center">
	<div class="relative mb-4">
		<!-- <Avatar class="border-primary h-32 w-32 border-2"> -->
		<img
			src={profile.profileImage || '/images/placeholder.jpg'}
			alt={profile.name}
			class="h-full w-full object-cover"
		/>
		<!-- </Avatar> -->

		{#if profile.isEditMode}
			<label
				for="profileImage"
				class="bg-primary absolute right-0 bottom-0 cursor-pointer rounded-full p-2 text-white"
			>
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
						d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"
					></path>
					<circle cx="12" cy="13" r="3"></circle>
				</svg>
				<input
					id="profileImage"
					type="file"
					accept="image/*"
					class="hidden"
					onchange={handleImageUpload}
				/>
			</label>
		{/if}
	</div>

	<div class="w-full text-center">
		{#if profile.isEditMode}
			<Input
				type="text"
				value={profile.name}
				onchange={(e) => updateProfile({ name: getValue(e) })}
				class="mb-1 text-center text-2xl font-bold"
				placeholder="이름"
			/>
			<Input
				type="text"
				value={profile.position}
				onchange={(e) => updateProfile({ position: getValue(e) })}
				class="mb-2 text-center"
				placeholder="직책"
			/>
			<Textarea
				value={profile.motto}
				onchange={(e) => updateProfile({ motto: getValue(e) })}
				class="mb-4 resize-none text-center"
				placeholder="소개글"
			/>
		{:else}
			<h1 class="mb-1 text-2xl font-bold">{profile.name} {profile.position}</h1>
			<p class="mb-4">{profile.motto}</p>
		{/if}

		<div class="flex flex-col space-y-2">
			{#if profile.isEditMode}
				<Input
					type="email"
					value={profile.email}
					onchange={(e) => updateProfile({ email: getValue(e) })}
					placeholder="이메일"
				/>
				<Input
					type="tel"
					value={profile.phone}
					onchange={(e) => updateProfile({ phone: getValue(e) })}
					placeholder="전화번호"
				/>
				<Input
					type="text"
					value={profile.address}
					onchange={(e) => updateProfile({ address: getValue(e) })}
					placeholder="주소"
				/>
			{:else}
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
					<span>{profile.phone}</span>
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
						<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
						></path>
						<polyline points="22,6 12,13 2,6"></polyline>
					</svg>
					<span>{profile.email}</span>
				</div>
			{/if}
		</div>
	</div>
</div>
