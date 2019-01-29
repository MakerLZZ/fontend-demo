<template>
    <div>
        <ul class="es6-ul">
            <li><button @click="() => printStringES6()">String</button></li>
            <li><button @click="() => printNumberES6()">Number</button></li>
            <li><button @click="() => printObjectES6()">Object</button></li>
            <li><button @click="() => printFunctionES6()">Function</button></li>
            <li><button @click="() => printArrayES6()">Array</button></li>
        </ul>
        <ul class="es6-ul">
            <li><button @click="() => printMapOrSetES6()">Map/Set</button></li>
            <li><button @click="() => printOperationES6()">Operation</button></li>
            <li><button @click="() => printStatementES6()">Statement</button></li>
            <li><button @click="() => printPromiseES6()">Promise</button></li>
            <li><button @click="() => printExportES6()">Export</button></li>
        </ul>
    </div>
</template>
<script>
export default {
    methods: {
        //打印StringES6
        printStringES6() {
            console.clear();
            console.log('String ES6');

            const s = 'Hello jimi!';
            console.log('s = '+ s);

            //1.includes()：返回布尔值，表示是否找到了参数字符串。
            console.log('\nincludes()：返回布尔值，表示是否找到了参数字符串');
            let a1 = s.includes('i');
            console.log('s.includes(\'i\') = ' + a1);//true
            let a2 = s.includes('Hello', 6);//false,从第N个字符开始
            console.log('s.includes(\'Hello\', 6) = ' + a2);//false

            //2.startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部
            console.log('\nstartsWith()：返回布尔值，表示参数字符串是否在原字符串的头部');
            let b1 = s.startsWith('j');
            console.log('s.startsWith(\'i\') = ' + b1);//false
            let b2 = s.startsWith('jimi', 6);//从第N个字符开始
            console.log('s.startsWith(\'jimi\', 6) = ' + b2);//true

            //3.endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部
            console.log('\nendsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部');
            let c1 = s.endsWith('!');
            console.log('s.endsWith(\'!\')' + c1);//true
            let c2 = s.endsWith('jimi', 6);//从第N个字符往回找
            console.log('s.endsWith(\'jimi\', 6)' + c2);//false

            //4.repeat()：返回一个新字符串，表示将原字符串重复n次。
            console.log('\nrepeat()：返回一个新字符串，表示将原字符串重复n次');
            let d1 = s.repeat(2);
            console.log('s.repeat(2)' + d1);//Hello jimi!Hello jimi!
            let d2 = s.repeat(1.8);
            console.log('s.repeat(1.8)' + d2);//Hello jimi! 会被取向下取整
        },
        //打印NumberES6
        printNumberES6() {
            console.clear();
            console.log('Number ES6');

            //1.isFinite()：检查是否是有限的Number
            console.log('\nisFinite()：检查是否是有限的Number');
            const a1 = isFinite(1);
            console.log('isFinite(1) = ' + a1);
            const a2  = isFinite(Infinity);
            console.log('isFinite(Infinity) = ' + a2);
            const a3 = isFinite('15');
            console.log('isFinite(\'15\') = ' + a3);
            // console.log(a1, a2, a3);//true,false,true

            //2.isNaN()：检查一个数字是否是NAN
            console.log('\nisNaN()：检查一个数字是否是NAN');
            const b1 = isNaN(1 - 'jimi');
            console.log('isNaN(1 - \'jimi\') = ' + b1);
            const b2 = isNaN('12');
            console.log('isNaN(\'12\') = ' + b2);
            // console.log(b1, b2);//true,flase

            //3.isInteger()：检查一个数字是否为整数
            console.log('\nisInteger()：检查一个数字是否为整数');
            const c1 = Number.isInteger(15);
            console.log('Number.isInteger(15) = ' + c1);
            const c2 = Number.isInteger(15.1);
            console.log('Number.isInteger(15.1) = ' + c2);
            // console.log(c1, c2);//true,false
        },
        //打印ObjectES6
        printObjectES6() {
            console.clear();
            console.log('Object ES6');
            
            //1.简洁写法
            const c = '麻辣香锅';
            let chongqing = {
                c,
                a:'重庆火锅',
                b:'重庆小面',
            };
            console.log(chongqing);//能够添加到

            //2. assign()：方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）
            // Object.assign()方法的第一个参数是目标对象，后面的参数都是源对象。
            // 注意，如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。
            let o1 = {};
            Object.assign(o1,chongqing, {d:'生蚝',e:'荔枝'});
            console.log(o1); // o1拥有麻辣香锅和重庆火锅和重庆小面和生蚝和荔枝
            o1.a = '1';
            console.log(o1);// 实现对象深拷贝

            //3.Object.keys() 获取所有的key
            let o2 = Object.keys(chongqing);
            console.log(o2); // 获取到key值 c,a,b

            //4.Object.value() 获取所有的value
            let o3 = Object.values(chongqing);
            console.log(o3); // 获取到所有的values 麻辣香锅 重庆火锅 重庆小面 

            //4. Object.entries() 以二位数组的方式获取value和key
            let o4 = Object.entries(chongqing);
            console.log(o4); // [['c','麻辣香锅'],['a','重庆火锅'],['b','重庆小面']]]
        },
        //打印FunctionES6
        printFunctionES6(){
            console.clear();
            console.log('Function ES6');
            //1.ES6允许函数参数内部进行赋值
            function mlxg(a, b = 1) {
                return a + b;
            }
            console.log(mlxg(2)); //3

            //2.ES6function的length为形参的个数
            let a = function mlxg(a, b) {
                return a + b;
            }.length;
            console.log(a);//获取的长度为2
            let b = function mlxg(a, b = 1, c) {
                return a + b + c;
            }.length;
            console.log(b);//获取的长度为1，对形参进行重新赋值会终断形参个数的计算

            //3.f => 函数
            //3.1普通函数的this指向当前指向的函数
            let arr = [1,2,3,4,5];
            arr.forEach(function() {
                console.log(this);
            },Array);
            //3.1 箭头函数当中没有this，因此改变this指向为{}对象。而他当中本身的this指向上级作用域的this
            arr.forEach(() => {
                console.log(this);
            },Array);

            //4.箭头函数没有arguments
            function fn(a,b,c){
                console.log(a,b,c);
                console.log(arguments);
            }
            fn(1,2,3);

            const arrow = (a,b,c) => {
                console.log(a,b,c);
                console.log(arguments);//arguments长度为0
            };
            arrow(1,2,3);
        },
        //打印ArrayES6
        printArrayES6() {
            console.clear();
            console.log('Array ES6');

            let arr = [1,3,2,4,5];

            //1. find，用来寻找第一个符合条件的值
            // let a = arr.find(function(v) {
            //     return v < 5; 
            // });
            let a = arr.find(v => v < 5);
            console.log(a); // 1

            // 2. findIndex，用来寻找第一个符合条件的值的下标
            let b = arr.findIndex(v => v > 3); 
            console.log(b); // 3

            //3. filter，用来寻找多个符合条件的值
            let newArr1 = arr.filter(v => v % 2 === 0); 
            console.log(newArr1);//找到所有偶数

            //4.concat将两个数组进行拼接
            let arr1 = [];
            // arr1.concat(arr,[1,2]);
            arr1 = arr1.concat(arr,[1,2]);
            console.log(arr1);//由于concat异步所以arr1=[];arr1 = arr1.concat(arr,[1,2]);可实现

            //5.Array.from()对伪数组进行数组化
            let array1 = {
                0:'1',
                1:'2',
                2:'3',
                'length':3
            };
            let array2 = Array.from(array1);
            console.log(array2);//将对伪数组转化为真数组

            //ES5拓展
            //1. forEach，用来循环数组 从1开始
            arr.forEach((v) => {
                console.log(v);
            });

            //2.some用来循环数组, 任意一项返回true 则返回true
            let newArr2 = arr.some((v) => {
                console.log(v);
                return v > 4;
            });
            console.log(newArr2); //true
        },
        //打印Map/SetES6
        printMapOrSetES6() {
            console.clear();
            console.log('MapOrSet ES6');
            //1.Set数组
            let s = new Set([1,2,2,8,5]);
            //1.1 Set的值唯一，在Set当中，所有值都唯一
            s.forEach((v) => {
                console.log(v);
            });//其中一个2会被去除

            //1.2 Set没有下标
            s.forEach((item,index) => {
                console.log(index);//index数为值的本身
            });

            //1.3 set 方法
            s.add(6);//添加值
            s.delete(2);//删除值
            console.log(s.has(1));// 判断是否存在某值
            s.clear();//清空所有值
            console.log(s.size);

            //2.Map方法
            let m = new Map([[1,'a'],[2,'b'],[3,'c']]);
            // console.log(m)

            //2.1特性：值可以为任何数，不一定为字符串
            m.forEach((item,index) => {
                console.log(item,index);//item为value，index为key
                // console.log(typeof(index))
            });

            // let q = m.get(1);//获取值
            // console.log(q)//a
            m.set(4,'d');//设置值
            m.delete(2);//删除值
            // console.log(m) // 循环打印才行

            // console.log(m.has(1))//true 判断是否存在某值,
            //此处判断是判断key名
            m.clear(); //清空所有值
            console.log(m.size);
        },
        //打印OperationES6
        printOperationES6() {
            console.clear();
            console.log('Operation');
            //1.``字符串

            //1.1``字符串能够换行
            const a = `广东省
                深圳市
                宝安区`;
            console.log(a);//能够输出完整的参数包括空格

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
            numbers(1,2,3,4);
        },
        //打印StatementES6
        printStatementES6() {
            console.clear();
            console.log('Statement');
            //1.定义常量
            const a = 1;
            // a = 2;报错，不能对常量进行值的修改
            console.log(a);
            //常量的本质：声明的常量是将变量指向一个固定的地址，这个地址不能改变，因此成为常量。

            //2.定义变量
            let b = 2;
            // let b = 1;let声明的变量在同一作用域下不能够进行重新定义
            //在其他作用域中
            function fn(){
                // let b = 2;
                // console.log(b);
                return;
            }
            console.log(b);
            fn();

            //3.for循环中，只有内部能够拿到i，外部不能拿到。
            for (let i = 0; i < 10; i++) {
                //return;
            }
            // console.log(i);//报错。

            //4.获取循环中的变量，会获取本次结果，而不会获取最终结果
            let c = [];
            for (let i = 0; i < 10; i++) {
                c[i] = function () {
                    console.log(i);
                };
            }
            //c[6](); // 6
            //结果是6，如果用var声明，则是10。

            //5.如果let在这个块级作用域里声明了变量，那么这个变量只能够在这个作用域内部获取。
            let f = 1;
            let tmp = 123;
            //let tmp = 12;
            if (f) {
                console.log(tmp,111);//tmp获取不到
                let tmp = 12;
            }
            console.log(tmp);
        },
        //打印PromiseES6
        printPromiseES6() {
            console.clear();
            console.log('Promise');
            //promise 的由来
            //Promise 实例
            //1.语法
            //声明promise
            let flag = 0;
            let p = new Promise((resolve, reject) => {
                if (flag === 0) {
                    resolve('成功');
                } else {
                    reject('失败');
                }
            });
            //成功调用
            p.then(res => {
                console.log(res);
            });
            //失败调用
            p.catch(err => {
                console.log(err);
            });

            //2.pomise中异步改成同步操作
            new Promise(resolve => {
                setTimeout(() => {
                    return resolve(111);
                }, 2000);
            }).then(yes => {
                console.log(yes);
                return new Promise(resolve => {
                    setTimeout(function() {
                        let a = yes + 1;
                        return resolve(a);
                    }, 3000);
                });
            }).then(yes => {
                console.log(yes);
                return new Promise(resolve => {
                    setTimeout(function() {
                        let b = yes + 1;
                        return resolve(b);
                    }, 1000);
                });
            }).then(yes => {
                console.log(yes);
            });

        },
        //打印ExportES6
        printExportES6() {
            console.clear();
            console.log('Export');
            console.log('没有default 可以导出多个');
            console.log('export default 导出对象有且只能有一个');

            //1、导出函数，
            // export const shenzhen = v =>{
            //     console.log(v+1);
            // };
            // //2.可以多个
            // export const chongqing = v =>{
            //     console.log(v+2);
            // };

            //2.导出对象，有且只能拥有一个
            // export default  {
            //     name:"jimi"
            // }
        }
    }
};
</script>
<style scoped>
    .es6-ul {
        display: flex;
        justify-content: center;
    }

    .es6-ul > li {
        list-style: none;
    }

    .es6-ul > li > button {
        width: 150px;
        height: 50px;
        margin: 10px;
        padding: 0;
        border: 0;
        border-radius: 10px;
        outline: none;
        font-size: 12px;
        font-weight: 800;
        color: #fff;
        cursor: pointer;
        background-color: #00a0e9;
    }
</style>

