// 动态规划 最长公共子串
function lws(str1, str2) {
  let result = [ new Array(str2.length + 1).fill(0) ]; // 第一行设为0

  for (let i = 1; i <= str1.length; i++) {
    result[ i ] = [ 0 ]; // 第一列设为0
    for (let j = 1; j <= str2.length; j++) {
      if (str1[ i - 1 ] === str2[ j - 1 ]) {
        result[ i ][ j ] = result[ i - 1 ][ j - 1 ] + 1;
      } else {
        result[ i ][ j ] = Math.max(result[ i - 1 ][ j ], result[ i ][ j - 1 ]);
      }
    }
  }
  return result;
}

console.log(lws('llx123', 'llx13'))
