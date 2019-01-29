
let arr = [1, 3, 2, 4, 5];

//1. find，用来寻找第一个符合条件的值	
let a = arr.find(function (v) { return v < 5; });
console.log(a); // 1

// 2. findIndex，用来寻找第一个符合条件的值的下标
let b = arr.findIndex(v => v > 3);
console.log(b); // 3

//3. filter，用来寻找多个符合条件的值
let newArr1 = arr.filter(v => v % 2 === 0);
console.log(newArr1);//找到所有偶数

//4.concat将两个数组进行拼接
let arr1 = [];
arr1.concat(arr, [1, 2]);
console.log(arr1);

//5.Array.from()对伪数组进行数组化
let array1 = {
    0: '1',
    1: '2',
    2: '3',
    'length': 3
};
let array2 = Array.from(array1);
console.log(array2);//江湖对伪数组进行转化为真数组


//ES5拓展
//1. forEach，用来循环数组
arr.forEach((v) => {
    console.log(v);
});

//2.some用来循环数组,找到第一个返回true的值
let newArr2 = arr.some((v) => {
    console.log(v);
    return v > 4;
});
console.log(newArr2); //true
