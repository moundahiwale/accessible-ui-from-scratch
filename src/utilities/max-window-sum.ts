// O(n) time, O(1) space
export function maxWindowSum(nums: number[], k: number): number | null {
  if (k <= 0 || k > nums.length) {
    return null;
  }

  let slidingSum = 0;
  for (let index = 0; index < k; index++) {
    slidingSum += nums[index];
  }
  let maxSum = slidingSum;

  for (let right = k; right < nums.length; right++) {
    const comingIn = nums[right];
    const goingOut = nums[right - k];
    slidingSum = slidingSum - goingOut + comingIn;
    if (slidingSum > maxSum) {
      maxSum = slidingSum;
    }
  }

  return maxSum;
}

// Brute force O(n x k)
// export function maxWindowSum(nums: number[], k: number): number | null {
//   if (k <= 0 || k > nums.length) {
//     return null;
//   }
//   let maxSum = -Infinity;
//   let sum = 0;

//   for (let index = 0; index <= nums.length - k; index++) {
//     sum = 0;
//     for (let j = index; j < index + k; j ++) {
//       sum = sum + nums[j];
//     }
//     if (sum > maxSum) {
//       maxSum = sum;
//     }
//   }

//   return maxSum;
// }
