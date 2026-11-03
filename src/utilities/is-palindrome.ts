function isAlphaNumeric(c: string): boolean {
  return /[a-z0-9]/i.test(c);
}

export function isPalindrome(s: string): boolean {
  let left = 0,
    right = s.length - 1;

  while (left < right) {
    if (!isAlphaNumeric(s.charAt(left))) {
      left++;
      continue;
    }

    if (!isAlphaNumeric(s.charAt(right))) {
      right--;
      continue;
    }

    if (s.charAt(left).toLowerCase() !== s.charAt(right).toLowerCase()) {
      return false;
    }

    left++;
    right--;
  }
  return true;
}
