//1.简洁写法
const c = '麻辣香锅';
let chongqing = {
    a: '重庆火锅',
    b: '重庆小面',
    c
};
// console.log(chongqing)//能够添加到

//2. assign()，将后面对象的第一层属性的copy给第一个对象

// let shenzhen = {
//     d:'生蚝',
//     e:'荔枝'
// };
let o1 = {};
Object.assign(o1, chongqing, { d: '生蚝', e: '荔枝' });
// console.log(o1); // o1拥有重庆小面和重庆火锅
o1.a = '1';
// console.log(chongqing)// 实现对象深拷贝

//3.Object.keys() 获取所有的key
let o2 = Object.keys(chongqing);
console.log(o2); // 获取到key值

//4.Object.value() 获取所有的value
let o3 = Object.values(chongqing);
console.log(o3); // 获取到所有的values

//4. Object.entries() 以二位数组的方式获取value和kee
let o4 = Object.entries(chongqing);
console.log(o4); // [['a','重庆小面',['b','重庆火锅']]]