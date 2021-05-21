// js的Object本质上是键值对的集合(hash结构) 键只能是字符串
// Map 类似与对象，但是键可以为任何数据类型 实现了 值--值 的对应

const m = new Map();
const objKey = {a: 'a'};
const objVal = {b: 'b'};
// 设置
m.set(objKey, objVal);
// 获取
console.log('line:9', m.get(objKey)); // { b: 'b' }


// 实例方法
m.has(objKey); // true  同Set.prototype.has
m.delete(objKey); // true  同Set.prototype.delete


// 可以接收数组类型的值
const m2 = new Map([
    ['name', 'chris'],
    ['other', 'null'],
    [null, null],
    [undefined, undefined]
]);
// 第一位将成为键 第二位将成为值


// 如果给同样的键赋两次值，后面的值将会替换前面的值
const m3 = new Map();
m3.set('chris', 'yes');
m3.set('chris', 'no');
console.log('line:32', m3); // Map { 'chris' => 'no' }

// 读取未知得值返回undefined


// 注意：只有对同一个对象的引用，才会被视为同一个键
const m4 = new Map();
m4.set(['5'], 'yes');
console.log('line:40', m4.get(['5'])); // undefined  此处 ['5'] 是与set时的 ['5'] 是不一样的内存地址  所以是两个值
// 同理：同样值的引用类型在Map中是两种键
const m5 = new Map();
const k1 = ['5'];
const k2 = ['5'];
m5.set(k1, 111).set(k2, 222);
console.log('line:46', m5); // Map { [ '5' ] => 111, [ '5' ] => 222 }
// 拓展：
// 0  &  -0 是同一个键    布尔值true和字符串true是两个不同的值   NaN视为同一个键


// ---- 属性 ----
// size  成员总数
const m6 = new Map([[1,2], [3,4]]);
console.log('line:54', m6.size); // 2

// ---- 方法 ----
// get set has(同Set) delete(同Set) clear(同Set)


// ---- 遍历 ----
// 利用keys
const m7 = new Map([['f', 'fv'], ['t', 'tv']])
for(let item of m7.keys()){ console.log('line:63', item) } // f  t   打印键

// 利用values
const m8 = new Map([['f', 'fv'], ['t', 'tv']])
for(let item of m8.values()){ console.log('line:67', item) } // fv  tv  打印值

// 利用values
const m9 = new Map([['f', 'fv'], ['t', 'tv']])
for(let item of m9.entries()){ console.log('line:71', item) } // ['f', 'fv']  ['t', 'tv']  键值都打印  和不使用entries方法效果一样

// 或者使用 forEach  和  entries  一样


// map结构转数组 (...解构)
const m10 = new Map([
    [1, 'one'],
    [2, 'two'],
    [3, 'three'],
]);
console.log('line:82', [...m10.keys()]); // [ 1, 2, 3 ]
console.log('line:82', [...m10.values()]); // [ 'one', 'two', 'three' ]
console.log('line:83', [...m10.entries()]); // [ [ 1, 'one' ], [ 2, 'two' ], [ 3, 'three' ] ]