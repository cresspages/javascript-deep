var PADDING = 'padding', FULFILLED = 'fulfilled', REJECTED = 'rejected'; // 未决padding， 成功状态为 fulfilled, 失败状态为 rejected.

class MyPromise {
    constructor(executor){
        // executor必须为函数
        if(typeof executor !== 'function'){
            throw new TypeError('Promise resolver ' + executor + ' is not a function');
        }

        // 定义状态
        this._status = PADDING; // 定义初始状态
        this._value = undefined; // 值

        try {
            executor(this._resolve.bind(this), this._reject.bind(this));
        } catch (error) {
            console.log(error);
        }
    }

    _resolve(parm){
        if(this._status == PADDING){
            this._value = parm;
            this._status = FULFILLED;
        }
    }

    _reject(parm){
        if(this._status == PADDING){
            this._value = parm;
            this._status = REJECTED;
        }
    }

    then(ONRES, ONREJ){
        var innerpro =  new MyPromise((res, rej) => {
            if(this._status == FULFILLED){
                if(typeof ONRES == 'function'){
                    MyPromise._handerReturnPromise.call(MyPromise, innerpro, this._value, res, rej);
                }
            }
            if(this._status == REJECTED){
                if(typeof ONREJ == 'function'){
                    ONREJ(this._value);
                } else {
                    throw new Error(`Uncaught (in promise) ${this._value}`);
                }
            }
        })
        return innerpro;
    }

    // 处理res推出promise
    /* 
        nowpro： 当前的promise
        value:  推出得值
    */
    _handerReturnPromise(nowpro, value, res, rej){
        // 防止自己返回自己
        if(nowpro === value){
            return reject(new TypeError('循环引用'));
        }

        if(value instanceof MyPromise){ // promise
            value.then((r) => {
                this._handerReturnPromise(nowpro, r, res, rej);
            }, (err) => {
                rej(err);
            });
        } else { // 其他类型
            res(value);
        }
    }
}

var pro = new MyPromise((res, rej) => {
    res(new MyPromise((res) => {res('pro-')}));
});
pro.then((res) => {
    console.log(res)
    return new MyPromise((res) => {res('pro-then')})
}).then((res) => {
    console.log(res)
})
var pro2 = new Promise((res, rej) => {
    res(new Promise((res) => {
        res(new Promise((res) => {
            res(new Promise((res) => {
                rej(1)
            }))
        }))
    }))
});
pro2.then((res) => {
    console.log(res)
    return new Promise((res) => {res('pro2-then')})
}).then((res) => {
    console.log(res)
    return new Promise((res) => {res('pro2-then-then')})
})

//console.log(pro);