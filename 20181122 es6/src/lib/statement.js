//1.定义常量
const a = 1;
// a = 2;报错，不能对常量进行值的修改
console.log(a);
//常量的本质：声明的常量是将变量指向一个固定的地址，这个地址不能改变，因此成为常量。


//2.定义变量
let b = 2;
// let b = 1;let声明的变量在同一作用域下不能够进行重新定义
//在其他作用域中
function fn() {
    // console.log(b);
    // let b = 2;
    return;
}
console.log(b);
fn();

//3.for循环中，只有内部能够拿到i，外部不能拿到。
for (let i = 0; i < 10; i++) {
    return;
}
// console.log(i);//报错。

//4.获取循环中的变量，会获取本次结果，而不会获取最终结果
let c = [];
for (let i = 0; i < 10; i++) {
    c[i] = function () {
        console.log(i);
    };
}
// console.log(c);
// c[6](); // 6
//结果是6，如果用var声明，则是1。

//5.如果let在这个块级作用域里声明了变量，那么这个变量只能够在这个作用域内部获取。
let f = 1;
var tmp = 123;
if (f) {
    console.log(tmp);
    let tmp;
}
console.log(tmp);
//tmp会报错，因为作用域内部声明了tmp，他只能够在作用域内部获取tmp，拿不到外部的tmp。