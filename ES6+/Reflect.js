/*
Reflect设计目的:
    1、将object上的一些属于语言内部的方法（Object.definedProperty）放到Reflect上。未来新方法只会在Reflect
    2、修改Object对象的某些方法: Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个错误，而Reflect.defineProperty(obj, name, desc)则会返回false。
    3、让Object的操作变成函数式，某些Object参数式函数式（name in obj）和（delete object(name)）,在Reflect中就是（Reflect.has(name)）和（Reflect.deleteProperty(obj, name)）
    4、Reflect对象的方法与Proxy对象的方法一一对应。不管Proxy怎么修改默认行为，你总可以在Reflect上获取默认行为。
*/