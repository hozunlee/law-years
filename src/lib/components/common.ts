export function getValue(e: Event) {
	return (e.target as HTMLInputElement)?.value ?? ''
}
