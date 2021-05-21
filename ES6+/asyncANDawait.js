// async 为 Generator 函数的语法糖
// async => *    await => yield

async function async1(){
    console.log(1);
    await console.log(2);
    console.log(3);
}
console.log(4);
setTimeout(() => {
    console.log(5);
}, 0);
async1(); // 4 1 2 3 5


// async函数对 Generator 函数的改进
// (1)内置执行器。async函数不必和Generator函数一样 需要next才能有下一步的执行

