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
        setTimeout(function () {
            let a = yes + 1;
            return resolve(a);
        }, 3000);
    });
}).then(yes => {
    console.log(yes);
    return new Promise(resolve => {
        setTimeout(function () {
            let b = yes + 1;
            return resolve(b);
        }, 1000);
    });
}).then(yes => {
    console.log(yes);
});