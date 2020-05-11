// 背包问题
/*
  * weights: [] 物品质量
  * values: [] 物品价值
  * P 背包能装物品重量
*/
// 1、01背包 每个物品只能放一次
function unCompletePack(weights, values, P) {
  let result = new Array(weights.length);
  result[ -1 ] = new Array(P + 1).fill(0); // 兼容i=0 动态规划向上取最优
  for (let i = 0; i < weights.length; i++) { // 物品&质量
    result[ i ] = [];
    for (let j = 0; j <= P; j++) { // 背包承受质量拆分
      if (j < weights[ i ]) {
        result[ i ][ j ] = result[ i - 1 ][ j ];
      } else {
        result[ i ][ j ] = Math.max(result[ i - 1 ][ j ], values[ i ] + result[ i - 1 ][ j - weights[ i ] ]);
      }
    }
  }
  return result[ weights.length - 1 ][ P ]
}
console.log(unCompletePack([ 2, 3, 6, 9, 7 ], [ 3, 2, 5, 7, 3 ], 10));

// 2、完全背包 物品可添加多次
function completePack(weights, values, P) {
  let result = new Array(weights.length);
  result[ -1 ] = new Array(P + 1).fill(0); // 兼容i=0 动态规划向上取最优
  for (let i = 0; i < weights.length; i++) { // 物品&质量
    result[ i ] = [];
    for (let j = 0; j <= P; j++) { // 背包承受质量拆分
      result[ i ][ j ] = 0;
      for (let k = 0; k <= j / weights[ i ]; k++) { // 和01背包思路相同 只是一个物品可以放k次
        result[ i ][ j ] = Math.max(result[ i ][ j ], k * values[ i ] + result[ i - 1 ][ j - k * weights[ i ] ])
      }
    }
  }
  return result[ weights.length - 1 ][ P ];
}
console.log(completePack([ 2, 3, 6, 9, 7 ], [ 3, 2, 5, 7, 3 ], 10));
