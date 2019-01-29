//1.ES6语序函数参数内部进行赋值
function mlxg(a, b = 1) {
    return a + b;
}
console.log(mlxg(2)); //3

//2.ES6的length属性
let a = function mlxg(a, b) {
    return a + b;
}.length;
console.log(a);//获取的长度为2
let b = function mlxg(a, b = 1, c) {
    return a + b + c;
}.length;
console.log(b);//获取的长度为1，对形参进行重新复制会终端形参个数的计算

//3.f => 函数
//3.1普通函数的this指向当前指向的函数
let arr = [1, 2, 3, 4, 5];
arr.forEach(function () {
    console.log(this);
}, Array);
//3.1 箭头函数当中没有this，因此改变this指向为{}对象。而他当中本身的this指向上级作用域的this
arr.forEach(() => {
    console.log(this);
}, Array);

//4.箭头函数没有arguments
function fn(a, b, c) {
    console.log(a, b, c);
    console.log(arguments);
}
fn(1, 2, 3);

const arrow = (a, b, c) => {
    console.log(a, b, c);
    // console.log(arguments)//获取不到值
};
arrow(1, 2, 3);