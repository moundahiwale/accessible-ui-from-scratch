export function reverseString(chars: string[]) {
  let left = 0;
  let right = chars.length - 1;
  while (left < right) {
    const temp = chars[left];
    chars[left] = chars[right];
    chars[right] = temp;
    // Alternative swap: [chars[left], chars[right]] = [chars[right], chars[left]];
    left++;
    right--;
  }
}
