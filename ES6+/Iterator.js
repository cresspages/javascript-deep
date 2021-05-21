// 在ES6之后，新增了两中集合set和map。各自的访问访问方式不一样。Iterator就是提供一种统一的访问方式。

/*
    Iterator 的遍历过程是这样的。

    （1）创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。

    （2）第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员。

    （3）第二次调用指针对象的next方法，指针就指向数据结构的第二个成员。

    （4）不断调用指针对象的next方法，直到它指向数据结构的结束位置。

    每一次调用next方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含value和done两个属性的对象。其中，value属性是当前成员的值，done属性是一个布尔值，表示遍历是否结束。
*/
// 模拟next方法
const it = makeInterator([1, 2, 3]);

function makeInterator(item){
    var nextIndex = 0;
    return {
        next(){
            return nextIndex < item.length ? { value: item[nextIndex++], done: false } : { value: undefined, done: true }
        }
    }
}

console.log('line:28', it.next()); // { value: 1, done: false }
console.log('line:29', it.next()); // { value: 2, done: false }
console.log('line:30', it.next()); // { value: 3, done: false }
console.log('line:31', it.next()); // { value: undefined, done: true }


/*
原生具备 Iterator 接口的数据结构如下。

    Array
    Map
    Set
    String
    TypedArray
    函数的 arguments 对象
    NodeList 对象

*/

// 数组的Symbol.iterator属性。
const arr1 = [1, 'str', true];
const arriter = arr1[Symbol.iterator]();
console.log('line:37', arriter.next()); // { value: 1, done: false }
console.log('line:38', arriter.next()); // { value: 'str, done: false }
console.log('line:39', arriter.next()); // { value: true, done: false }
console.log('line:40', arriter.next()); // { value: undefined, done: true }


// 通过遍历器实现指针结构
const Obj = function(value){
    this.value = value;
    this.next = null;
}

Obj.prototype[Symbol.iterator] = function(){
    var current = this;
    return {
        next: function(){
            if(current){
                const value = current.value;
                current = current.next;
                return {value: value, done: false}
            } else {
                return {value: undefined, done: true}
            }
        }
    }
}

const obj1 = new Obj(1);
const obj2 = new Obj(2);
const obj3 = new Obj(3);

obj1.next = obj2;
obj2.next = obj3;

for(let item of obj1){
    console.log('line:85', item); // 1  2  3
}


// 自定义可便利对象
/*
    依赖数组iterator
    key为类似数组索引
    添加length属性记录长度
    添加[Symbol.iterator]可迭代
*/
const iteratorObj = {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3,
    [Symbol.iterator]: [][Symbol.iterator]
}
for(item of iteratorObj){
    console.log("line:104", item); // a  b  c
}


// 调用 Iterator 接口的场合
// 1、for...of...
// 2、解构赋值
// 3、拓展运算符
// 4、yield *


// 字符串的Iterator接口
const str = 'hi';
const strIterator = str[Symbol.iterator]();
console.log('line:118', strIterator.next()); // { value: 'h', done: false }
console.log('line:119', strIterator.next()); // { value: 'i', done: false }
console.log('line:120', strIterator.next()); // { value: undefined, done: true }