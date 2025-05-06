<script lang="ts">
	import { profileStore } from '$lib/stores/profile';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';

	const { profile, addEducation, updateEducation, removeEducation } = profileStore;
</script>

<div class="space-y-2">
	{#each $profile.career as career (career.id)}
		<div class="border-b pb-2 last:border-0">
			{#if $profile.isEditMode && career.isEditing}
				<div class="flex flex-col space-y-2">
					<Input
						type="text"
						value={career.organization}
						onchange={(e) => updateEducation(career.id, { organization: e.target.value })}
						placeholder="기관/회사명"
					/>
					<Input
						type="text"
						value={career.position}
						onchange={(e) => updateEducation(career.id, { position: e.target.value })}
						placeholder="직책"
					/>
					<Input
						type="text"
						value={career.period}
						onchange={(e) => updateEducation(career.id, { period: e.target.value })}
						placeholder="기간 (예: 2020-2022)"
					/>
					<div class="flex justify-end space-x-2">
						<Button
							variant="outline"
							size="sm"
							onclick={() => updateEducation(career.id, { isEditing: false })}
						>
							완료
						</Button>
						<Button variant="destructive" size="sm" onclick={() => removeEducation(career.id)}>
							삭제
						</Button>
					</div>
				</div>
			{:else if $profile.isEditMode}
				<div class="flex items-center justify-between">
					<div>
						<div class="font-medium">{career.organization}</div>
						{#if career.position}<div class="text-muted-foreground text-sm">
								{career.position}
							</div>{/if}
						{#if career.period}<div class="text-muted-foreground text-sm">{career.period}</div>{/if}
					</div>
					<Button
						variant="ghost"
						size="sm"
						onclick={() => updateEducation(career.id, { isEditing: true })}
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
					<div class="font-medium">{career.organization}</div>
					{#if career.position}<div class="text-muted-foreground text-sm">
							{career.position}
						</div>{/if}
					{#if career.period}<div class="text-muted-foreground text-sm">{career.period}</div>{/if}
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
			경력 추가
		</Button>
	{/if}
</div>
