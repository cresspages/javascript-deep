import { a, b, fun, f1, interval } from './export1.js';

console.log(a, b, f1, interval);

fun();

import { e as e1 } from './export1.js'; // 导入也可以重命名
console.log(e1);

// 导入默认接口
import def from './export1.js'; // export default 导出的可以随意指定变量名
def();

// 转发接口
// 把export1的接口转发到import2中
// import {c, d} from './export1.js';
// export {c, d}

// console.log(c, d); // 当前模块仍可以使用此接口

// 第二种写法
export {c, d} from './export1.js'; // 从export1中导出c,d接口。所以此种写法不能在当前模块中使用
// console.log(c,d); 报错
