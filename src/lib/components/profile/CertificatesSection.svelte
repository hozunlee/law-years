<script lang="ts">
	import { profileStore } from '$lib/stores/profile'
	import { Button } from '$lib/components/ui/button'
	import { Input } from '$lib/components/ui/input'
	import { getValue } from '$lib/components/common'

	const { profile, addCertificate, updateCertificate, removeCertificate } = profileStore
</script>

<div class="space-y-2">
	{#each $profile.certificates as certificate (certificate.id)}
		<div class="border-b pb-2 last:border-0">
			{#if $profile.isEditMode && certificate.isEditing}
				<div class="flex flex-col space-y-2">
					<Input
						type="text"
						value={certificate.name}
						onchange={(e) => updateCertificate(certificate.id, { name: getValue(e) })}
						placeholder="자격증명"
					/>
					<Input
						type="text"
						value={certificate.issuedBy}
						onchange={(e) => updateCertificate(certificate.id, { issuedBy: getValue(e) })}
						placeholder="발급 기관"
					/>
					<div class="flex justify-end space-x-2">
						<Button
							variant="outline"
							size="sm"
							onclick={() => updateCertificate(certificate.id, { isEditing: false })}
						>
							완료
						</Button>
						<Button
							variant="destructive"
							size="sm"
							onclick={() => removeCertificate(certificate.id)}
						>
							삭제
						</Button>
					</div>
				</div>
			{:else if $profile.isEditMode}
				<div class="flex items-center justify-between">
					<div>
						<div class="font-medium">{certificate.name}</div>
						{#if certificate.issuedBy}<div class="text-muted-foreground text-sm">
								{certificate.issuedBy}
							</div>{/if}
					</div>
					<Button
						variant="ghost"
						size="sm"
						onclick={() => updateCertificate(certificate.id, { isEditing: true })}
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
					<div class="font-medium">{certificate.name}</div>
					{#if certificate.issuedBy}<div class="text-muted-foreground text-sm">
							{certificate.issuedBy}
						</div>{/if}
				</div>
			{/if}
		</div>
	{/each}

	{#if $profile.isEditMode}
		<Button variant="outline" class="w-full" onclick={addCertificate}>
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
			자격증 추가
		</Button>
	{/if}
</div>
