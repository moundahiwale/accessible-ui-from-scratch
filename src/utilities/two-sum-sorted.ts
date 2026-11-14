export function twoSumSorted(arr: number[], target: number) {
  let left = 0, right = arr.length - 1;
  while(left < right) {
    const sum = arr[left] + arr[right];
    if (sum === target) {
      return [left, right];
    }
    else if(sum < target) {
      left++;
    }
    else if(sum > target) {
      right--;
    }
  }
  return [];
}