/* 
    策略模式：
        表现：把一组可能存在多重if else的语句进行条件结果分离
        定义：声明一系列规则，封装起来。需要用到的规则再提取。
*/ 

// 例子：
// 登录操作：满足相应的登录需求即可验证登录
// 假定登录有四种形式：账号、手机号、身份证号、人脸

// 策略
const strategy = {
    account: (val) => {
        const reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/;
        return reg.test(val);
    },
    phone: (val) => {
        const reg = /^[1][3,4,5,7,8][0-9]{9}$/;
        return reg.test(val);
    },
    idNumber: (val) => {
        const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        return reg.test(val);
    },
    faceID: (val) => {
        return Boolean(val);
    },
    password: (val) => {
        return Boolean(val);
    }
}

// 验证规则
const Validator = function(){
    this.cache = []; // 保存需要验证的规则

    // 添加策略规则
    this.addStrategy = function(strategyName, checkVal){
        this.cache.push(function(){
            return strategy[strategyName](checkVal);
        });
    }

    // 执行检查策略
    this.check = function(){
        const len = this.cache.length;
        for (let index = 0; index < len; index++) {
            let bool = this.cache[index]();
            if(!bool) {
                return false;
            }
            if(len - 1 == index){
                return true;
            }
        }
    }
}

// 登录对象一：手机号登录
const person1 = new Validator();
person1.addStrategy('phone', '13409826583');
person1.addStrategy('password', '');
console.log(person1.check());

// 登录对象二：人脸登录
const person2 = new Validator();
person2.addStrategy('faceID', 'ID');
person2.addStrategy('password', '13409826583lzm');
console.log(person2.check());