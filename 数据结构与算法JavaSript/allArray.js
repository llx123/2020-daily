// 数组全排列

function AllArray(arr) {
  let result = [];
  (function fn(n){
    for(let i=n;i<arr.length;i++) {
      if(i!==n){
        [arr[i], arr[n]] = [arr[n], arr[i]];
      }
      if(n+1 < arr.length-1) {
        fn(n+1);
      } else {
        result.push(arr.slice());
      }
      if(i!==n){
        [arr[i], arr[n]] = [arr[n], arr[i]];
      }
    }
  })(0);
  return result;
}

console.log(AllArray([1,2,3,4]));
