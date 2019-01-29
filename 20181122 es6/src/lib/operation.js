//1.``字符串

//1.1``字符串能够换行
const a = `广东省
           深圳市
           宝安区`;
// console.log(a)//能够输出完整的参数包括空格

//1.2``字符串能够进行运算
const b = {
    name: '李合飞',
    age: '18',
    sex: '未知',
    skill: '摄影',
};
const c = `${b.name}性别${b.sex}今年${b.age}岁，他会${b.skill}`;
console.log(c);

//2. ...运算符
//2.1 ...能够合并数组
let arr = [20, 4304, 434, 3923, 429];
let [arr1, ...arr2] = arr;
console.log(arr1);
console.log(arr2);

//2.2 ...能够解开数组
let arr3 = [20, 30, 40];
let arr4 = [30, 40, 50];
let arr5 = [...arr3, ...arr4];
console.log(arr5);

//2.3 ...在函数中使用
const numbers = (...num) => {
    console.log(a + num[0]);
};
numbers(1, 2, 3, 4);