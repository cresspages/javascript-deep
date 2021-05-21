const s1 = new Set();
const arr = [1,1,1,2,2,3,4,5,5,6];
arr.forEach(item => s1.add(item));
// 类似数组  成员值都是唯一的
console.log('line:5', s1); // Set { 1, 2, 3, 4, 5, 6 }

const s2 = new Set([1,1,2,3]);
// 可接受一个参数(可以是任何具有 iterable 接口的其他数据结构)  例如:DOM集合

// 去除数组的重复成员
const s3 = [...new Set(arr)];
console.log('line:12', s3); // [ 1, 2, 3, 4, 5, 6 ]
// 去除字符串的重复字符
console.log('line:14', [...new Set('qqwwee')].join('')); // qwe

// Set 内部判断两个值是否不同，使用的算法叫做“Same-value-zero equality”，它类似于精确相等运算符（===）
const s4 = new Set([3, '3']);
console.log('line:18', s4); // Set { 3, '3' }
const s5 = new Set([NaN]);
s5.add(NaN);
console.log('line:21', s5); // Set { NaN }


// ----- 属性 -----
// constructor： Set函数
console.log('line:26', Set.prototype.constructor); // [Function: Set]

// size： 集合包含的值数
const Sprop = new Set([1,2,3,4]);
console.log('line:30', Sprop.size); // 4


// ---- 方法 ----
// add
const Sm = new Set();
Sm.add(1); // 添加值  返回Set本身

// delete
Sm.add(2);
Sm.delete(2); // 删除值， 返回布尔值， 删除成功或失败

// has
Sm.add(3); 
Sm.has(4); // 查找值  返回布尔值  是否包含

// clear
Sm.clear(); // 清空集合  没有返回值
console.log('line:48', Sm);


// ---- 遍历 ----
// keys
const St = new Set(['chris', 'dachui', 'erdan', 'gousheng']);
St.forEach((key, value) => console.log('line:54', key, value));


// ---- 交集 并集 差集 ----
const s6 = new Set([1,3,4]);
const s7 = new Set([2,3,5]);
// 并集
const union = new Set([...s6, ...s7]);
// 差集 (s6 相对于 s7 的差集)
const subtraction = new Set([...s6].filter(item => !s7.has(item)));
// 交集
const intersection = new Set([...s6].filter(item => s7.has(item)));