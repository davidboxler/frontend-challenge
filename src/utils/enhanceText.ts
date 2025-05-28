export function enhanceText(input: string): string {
  const div = document.createElement('div');
  div.innerText = input;
  return div.innerHTML;
}