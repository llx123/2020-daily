/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findMaxAverage = function (nums, k) {
  let max, leftKey = 0;
  while (leftKey + k <= nums.length) {
    let arr = nums.slice(leftKey, leftKey + k),
      num = 0;
    for (let i = 0; i < arr.length; i++) {
      num += arr[i];
    }
    leftKey++;
    max = max === undefined ? num / k : Math.max(num / k, max);
  }
  return max;
};