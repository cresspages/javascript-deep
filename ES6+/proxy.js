// proxy为在对 对象的操作的时候加了一层拦截,拦截后可做出需要的结果

const p = new Proxy({}, {
    get(target, propKey, receiver){
        console.log(target, propKey, receiver);
        return 123;
    },
    set(target, propKey, value, receiver){
        console.log(target, propKey, value, receiver);
        return 456;
    }
});
// 以上代码将对对象p的所有设置操作的属性值都为456, 对所有获取操作的值都为123
p.a = 'str';
console.log(p.a);
/*
    打印出
    {} a str {}
    {} a {}
    123  

    首先p.a = 'str' 是一个设置操作，所以会执行set函数
    第二 log函数p.a 是一个获取操作，所以执行get
    最后 为p.a所获取的值 一律为123
*/


// ---- 实例方法 ----
// get 拦截某个属性的读取操作， 可以接受三个参数，依次为目标对象，属性名，proxy本身（严格地说，是操作行为所针对的对象），其中最后一个参数可选。
// 已有示例

// set 拦截某个属性的设置操作，可以接受四个参数，依次为目标对象、属性名、属性值和 Proxy 实例本身，其中最后一个参数可选。
// 已有示例