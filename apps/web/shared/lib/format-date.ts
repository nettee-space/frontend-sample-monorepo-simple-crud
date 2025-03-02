export function formatToLocaleDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString('ko-KR');
}
