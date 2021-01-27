var PADDING = 'padding', FULFILLED = 'fulfilled', REJECTED = 'rejected'; // 未决padding， 成功状态为 fulfilled, 失败状态为 rejected.

class MyPromise {
    static PADDING = 'padding';
    static FULFILLED = 'fulfilled';
    static REJECTED = 'rejected';

    constructor(executor){
        // executor必须为函数
        if(typeof executor !== 'function'){
            throw new TypeError('Promise resolver ' + executor + ' is not a function');
        }

        // 定义状态
        this._status = MyPromise.PADDING; // 定义初始状态
        this._value = undefined; // 成功值
        this._reason = undefined; // 失败值
        this._resolveCallback = []; // 成功回调函数
        this._rejectedCallback = []; // 失败回调函数

        let _resolve = function(parm){
            if(this._status == MyPromise.PADDING){
                this._value = parm;
                this._status = MyPromise.FULFILLED;
            }
        }
    
        let _reject = function(parm){
            if(this._status == MyPromise.PADDING){
                this._reason = parm;
                this._status = MyPromise.REJECTED;
            }
        }
    
        try {
            executor(_resolve, _reject);
        } catch (error) {
            console.log(error);
            _reject(error);
        }
    }

    then(ONRES, ONREJ){

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
}).then().then((res) => {
    console.log(res)
    return new Promise((res) => {res('pro2-then-then')})
})