let flag = 1;
let p = new Promise((resolve, reject) => {
    if (flag === 1) {
        return resolve('成功');
    } else {
        return reject('失败');
    }
});

p.then(res => {
    console.log(res);
});

p.catch(err => {
    console.log(err);
});

new Promise(resolve => {
    setTimeout(() => {
        return resolve(111);
    }, 2000);
}).then(res => {
    console.log(res);
    return new Promise(resolve => {
        setTimeout(() => {
            let a = res + 1;
            return resolve(a);
        }, 1000);
    });
}).then(res => {
    console.log(res);
    return new Promise(resolve => {
        setTimeout(() => {
            let b = res + 1;
            resolve(b);
        }, 3000);
    });
}).then((res) => {
    console.log(res);
});