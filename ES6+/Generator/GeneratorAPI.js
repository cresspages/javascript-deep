// Generator是异步编程的一种解决方案

/*
    具体表现：
        写法相似函数
        差异：
        function后带有*
        函数内部可通过yield终止一次
        调用时使用next执行下一次到yeield区间的内容
*/
function* Gen(){
    console.log('line:12', 1);
    yield console.log('line:13', 'yield1');
    console.log('line:12', 2);
    yield console.log('line:15', 'yield2');
    console.log('line:12', 3);
    return console.log('line:17', 'return');
}
const gen1 = Gen();
gen1.next();
    /*
        输出
        line:12 1
        line:13 yield1  
    */
gen1.next();
    /*
        输出
        line:12 2     
        line:15 yield2
    */
gen1.next();
    /*
        输出
        line:12 3     
        line:17 return
    */
gen1.next(); // {value: undefined, done: true}
// Generator 函数是分段执行的，yield表达式是暂停执行的标记，而next方法可以恢复执行。



// ---- 惰性求值 ----
function* Gen2(){
    yield 123 + 456;
}
// 此刻的123 + 456会在调用next方法时才会执行



// yield表达式如果用在另一个表达式之中，必须放在圆括号里面。
function* Gen3(){
    console.log('line:53', yield 1); // {value: 1, done: false}
    console.log('line:54' + (yield 2)); 
}
const gen2 = Gen3();
gen2.next();
gen2.next();
// 用作函数参数或者赋值表达式右边不用括号
function* Gen4() {
    foo(yield 'a', yield 'b'); // OK
    let input = yield; // OK
}
  

// ---- next的参数 ----
// yield与return类似 ，yield本身没有返回值(undefined),next方法可以传入一个参数作为上一个yield表达式的值
function* Gen5(){
    const a = yield 1;
    console.log(a);
    const b = yield 2;
    console.log(b);
}
const gen5 = Gen5();
console.log(gen5.next(123)); // 第一次调用next无作用，没有上一次yield表达式
console.log(gen5.next(456)); // 返回{ value: 1, done: false }， 打印456，传入456作为69行的表达式的值。
console.log(gen5.next(789)); // 返回{ value: 2, done: false }， 打印789，传入789作为71行的表达式的值。



// ---- for...of... ----
// for...of循环可以自动遍历 Generator 函数运行时生成的Iterator对象，且此时不再需要调用next方法。
function* Gen6(){
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
    return 6;
}
for(item of Gen6()){
    console.log("line:92", item); // 1 2 3 4 5
}
// 当Iterator对象的done值为true，则不取其值，所以最后一个return得值不会被打印



// 斐波那契
function* fbnq(){
    let [prev, curr] = [0, 1];
    for(;;){
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}
for(item of fbnq()){
    if(item > 50){ break }
    console.log(item);
}


// for...of... 遍历对象
function* Gen7(obj){
    const arrkey = Reflect.ownKeys(obj);

    for(let i = 0; i < arrkey.length; i++){
        yield [arrkey[i], obj[arrkey[i]]]
    }
}
const obj = {a: 1, b: '2'}
for(item of Gen7(obj)){
    const [key, value] = item;
    console.log(key, value);
    /*
        a 1
        b 2
    */
}
// 另一种写法  在对象上加上iterator接口
function* Gen8(){
    // 不使用Reflect.ownKeys的原因是Reflect.ownKeys会把计算属性([symbol.interator])遍历出来
    const arrkey = Object.keys(this);

    for(let i = 0; i < arrkey.length; i++){
        yield [arrkey[i], this[arrkey[i]]]
    }
}
const obj2 = {a: 1, b: '2'};
obj2[Symbol.iterator] = Gen8;
for(item of obj2){
    const [key, value] = item;
    console.log(key, value);
}


// throw
// Generator 函数返回的遍历器对象，都有一个throw方法，可以在函数体外抛出错误，然后在 Generator 函数体内捕获。
function* Gen9(){
    try {
        yield;
    } catch (error) {
        console.log('内部捕获', error);
    }
}
const gen9 = Gen9();
gen9.next();
try {
    gen9.throw('a');
    gen9.throw('b');
} catch (error) {
    console.log('外部捕获', error);
}


// return 终止generator
function* Gen10(){
    yield 1;
    yield 2;
    yield 3;
}
const gen10 = Gen10();
gen10.next('a'); // {value: 1, done: false}
gen10.return('b'); // {value: b, done: true}
gen10.next('c'); // {value: undefined, done: true}