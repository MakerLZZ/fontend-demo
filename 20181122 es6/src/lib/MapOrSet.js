//1.Set数组
let s = new Set([1, 2, 2, 8, 5]);
//1.1 Set的值唯一，在Set当中，所有值都唯一
//console.log(s)//其中一个2会被去除

//1.2 Set没有下标
s.forEach((item, index) => {
    console.log(index);//index数为值的本身
});

//1.3set 方法
s.add(6);//添加值

s.delete(2);//删除值

// console.log(s.has(1))// 判断是否存在某值

s.clear();//清空所有值
// console.log(s)

//2.Map方法
let m = new Map([[1, 'a'], [2, 'b'], [3, 'c']]);
// console.log(m)

//2.1特性：值可以为任何数，不一定为字符串
m.forEach((item, index) => {
    console.log(item, index);//item为value，index为key
    // console.log(typeof(index))
});


// let q = m.get(1);//获取值
// console.log(q)//a

m.set(4, 'd');//设置值

m.delete(2);//删除值
// console.log(m)

// console.log(m.has(1))//true 判断是否存在某值,
//此处判断是判断key名
m.clear(); //清空所有值