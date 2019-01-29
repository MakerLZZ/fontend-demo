const s = 'Hello jimi!';

//1.includes()：返回布尔值，表示是否找到了参数字符串。
let a1 = s.includes('i');
console.log(a1);//true
let a2 = s.includes('Hello', 6);//false,从第N个字符开始
console.log(a2);//true

//2.startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部
let b1 = s.startsWith('j');
console.log(b1);//false
let b2 = s.startsWith('jimi', 6);//从第N个字符开始
console.log(b2);//false

//3.endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部
let c1 = s.endsWith('!');
console.log(c1);//true
let c2 = s.endsWith('jimi', 6);//从第N个字符往回找
console.log(c2);//false

//4.repeat()：返回一个新字符串，表示将原字符串重复n次。
let d1 = s.repeat(2);
console.log(d1);//Hello jimiHello jimi
let d2 = s.repeat(1.8);
console.log(d2);//Hello jimi 会被取向下取整