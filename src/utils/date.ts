export function formatDate(date: Date): string {
	return date.toLocaleDateString('en-IE', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		timeZone: 'UTC',
	});
}