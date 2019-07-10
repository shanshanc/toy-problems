'use strict';

/*
 * Complete the 'maxDifference' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function maxDifference(arr) {
    // Write your code here
    if (!Array.isArray(arr)) return -1;
    let maxDiff = 0;
    for (let i = 1; i < arr.length; i++) {
        let innerArr = arr.slice(0, i);
        innerArr.forEach(inner => {
            if (arr[i] > inner) {
                const diff = arr[i] - inner;
                if (diff > maxDiff) maxDiff = diff;
            }
        });
    }
    if (maxDiff === 0) return -1;
    return maxDiff;
}

console.log(maxDifference([2,3,10,6,4,8,1]));
console.log(maxDifference([7, 9, 5, 6, 3, 2]));
console.log(maxDifference([50, 60, 100, 10, 70])); // 60

/*
Input : arr = {2, 3, 10, 6, 4, 8, 1}
Output : 8
Explanation : The maximum difference is between 10 and 2.

Input : arr = {7, 9, 5, 6, 3, 2}
Output : 2
Explanation : The maximum difference is between 9 and 7.
*/