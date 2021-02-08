// 若 i <= k < j，当 k 为奇数时， A[k] > A[k+1]，且当 k 为偶数时，A[k] < A[k+1]；
// 或 若 i <= k < j，当 k 为偶数时，A[k] > A[k+1] ，且当 k 为奇数时， A[k] < A[k+1]。

/**
 * @param {number[]} arr
 * @return {number}
 */
var maxTurbulenceSize = function (arr) {
    let max = 1,
        evenNum = 1,
        oddNum = 1;
    for (let i = 0; i < arr.length; i++) {
        if (i % 2) {
            evenNum = arr[i] > arr[i + 1] ? evenNum + 1 : 1
            oddNum = arr[i] < arr[i + 1] ? oddNum + 1 : 1
        } else {
            evenNum = arr[i] < arr[i + 1] ? evenNum + 1 : 1
            oddNum = arr[i] > arr[i + 1] ? oddNum + 1 : 1
        }
        max = Math.max(evenNum, oddNum, max);
    }
    return max;
};