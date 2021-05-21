// WeakSet 与 Set 最大的区别就是 WeakSet 只能存储引用类型的值

// WeakSet也只接受可迭代的数据类型
const ws = new WeakSet([[1,2], [3,4]]);
console.log("line:4", ws);


// WeakSet没有size  没有办法遍历成员  因为WeakSet对值的引用是弱类型  值有可能被清除(值未被引用就会被清除)  所以可能遍历不到数据


// WeakSet 与 Set相同的实例方法 add has delete
// const ws2 = new WeakSet([[], {}]);
// console.log(ws2.clear()) 没有clear方法

// WeakSet的一个用处是存储DOM节点，不用担心DOM节点在文档上移除