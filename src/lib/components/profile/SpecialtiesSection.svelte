<script lang="ts">
	import { profileStore } from '$lib/stores/profile'
	import { Button } from '$lib/components/ui/button'
	import { Input } from '$lib/components/ui/input'
	import { Badge } from '$lib/components/ui/badge'

	import { getValue } from '$lib/components/common'
	import { get } from 'svelte/store'

	const { profile, addSpecialty, updateSpecialty, removeSpecialty } = profileStore
</script>

<div class="space-y-2">
	{#if !$profile.isEditMode}
		<div class="flex flex-wrap gap-2">
			{#each $profile.specialties as specialty (specialty.id)}
				<Badge variant="secondary">{specialty.name}</Badge>
			{/each}
		</div>
	{:else}
		{#each $profile.specialties as specialty (specialty.id)}
			<div class="border-b pb-2 last:border-0">
				{#if specialty.isEditing}
					<div class="flex flex-col space-y-2">
						<Input
							type="text"
							value={specialty.name}
							onchange={(e) => updateSpecialty(specialty.id, { name: getValue(e) })}
							placeholder="전문 분야"
						/>
						<div class="flex justify-end space-x-2">
							<Button
								variant="outline"
								size="sm"
								onclick={() => updateSpecialty(specialty.id, { isEditing: false })}
							>
								완료
							</Button>
							<Button variant="destructive" size="sm" onclick={() => removeSpecialty(specialty.id)}>
								삭제
							</Button>
						</div>
					</div>
				{:else}
					<div class="flex items-center justify-between">
						<Badge variant="secondary">{specialty.name}</Badge>
						<Button
							variant="ghost"
							size="sm"
							onclick={() => updateSpecialty(specialty.id, { isEditing: true })}
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
				{/if}
			</div>
		{/each}

		<Button variant="outline" class="w-full" onclick={addSpecialty}>
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
			전문 분야 추가
		</Button>
	{/if}
</div>
