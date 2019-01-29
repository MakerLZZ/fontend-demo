//1.isFinite()：检查是否时有限的Number
const a1 = isFinite(1);
const a2 = isFinite(Infinity);
const a3 = isFinite('15');
console.log(a1, a2, a3);//true,false,true

//2.isNan()：检查一个数字是否时NAN
const b1 = isNaN(1 - 'jimi');
const b2 = isNaN('12');
console.log(b1, b2);//true，flase

//3.isinteger()：检查一个数字是否为整数
const c1 = Number.isInteger(15);
const c2 = Number.isInteger(15.1);
console.log(c1, c2);//true,false