// 第一种导出

var a = 'cress';
var b = 1;
var c = undefined;
var d = [1,2,true];
var e = {attr1: 1, attr2: false}

export {
    a,
    b,
    c,
    d,
    e
}

// 第二种导出
export function fun(){ console.log(1) }

// 两种导出方式等价

// as 给导出的变量重命名
var f = 'another';
export {
    f as f1
}

// 接口可实时获取值
export var interval = 1;
setTimeout(() => interval = 5, 500);

// 导出默认接口
export default function(){
    console.log('default');
}