export function lengthOfLongestSubstring(str: string) {
  const seen = new Set<string>();
  let left = 0;
  let best = 0;
  
  for (let right = 0; right < str.length; right++) {
    const currentChar = str[right];

    while (seen.has(currentChar)) {
      seen.delete(str[left]);
      left++;
    }

    seen.add(currentChar);
    
    best = Math.max(best, right - left + 1);
  }

  return best;
}
