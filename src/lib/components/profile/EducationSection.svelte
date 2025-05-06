<script lang="ts">
	import { profileStore } from '$lib/stores/profile'
	import { Button } from '$lib/components/ui/button'
	import { Input } from '$lib/components/ui/input'

	const { profile, addEducation, updateEducation, removeEducation } = profileStore
</script>

<div class="space-y-2">
	{#each $profile.education as education (education.id)}
		<div class="border-b pb-2 last:border-0">
			{#if $profile.isEditMode && education.isEditing}
				<div class="flex flex-col space-y-2">
					<Input
						type="text"
						value={education.school}
						onchange={(e) => updateEducation(education.id, { school: e.target.value })}
						placeholder="학교/기관명"
					/>
					<Input
						type="text"
						value={education.degree}
						onchange={(e) => updateEducation(education.id, { degree: e.target.value })}
						placeholder="학위/과정"
					/>
					<Input
						type="text"
						value={education.period}
						onchange={(e) => updateEducation(education.id, { period: e.target.value })}
						placeholder="기간 (예: 2010-2014)"
					/>
					<div class="flex justify-end space-x-2">
						<Button
							variant="outline"
							size="sm"
							onclick={() => updateEducation(education.id, { isEditing: false })}
						>
							완료
						</Button>
						<Button variant="destructive" size="sm" onclick={() => removeEducation(education.id)}>
							삭제
						</Button>
					</div>
				</div>
			{:else if $profile.isEditMode}
				<div class="flex items-center justify-between">
					<div>
						<div class="font-medium">{education.school}</div>
						{#if education.degree}<div class="text-muted-foreground text-sm">
								{education.degree}
							</div>{/if}
						{#if education.period}<div class="text-muted-foreground text-sm">
								{education.period}
							</div>{/if}
					</div>
					<Button
						variant="ghost"
						size="sm"
						onclick={() => updateEducation(education.id, { isEditing: true })}
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
							<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
							<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
						</svg>
					</Button>
				</div>
			{:else}
				<div>
					<div class="font-medium">{education.school}</div>
					{#if education.degree}<div class="text-muted-foreground text-sm">
							{education.degree}
						</div>{/if}
					{#if education.period}<div class="text-muted-foreground text-sm">
							{education.period}
						</div>{/if}
				</div>
			{/if}
		</div>
	{/each}

	{#if $profile.isEditMode}
		<Button variant="outline" class="w-full" onclick={addEducation}>
			<svg
				class="mr-2"
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
				<line x1="12" y1="5" x2="12" y2="19"></line>
				<line x1="5" y1="12" x2="19" y2="12"></line>
			</svg>
			학력 추가
		</Button>
	{/if}
</div>
