const example = {
    clientList: {}, // 订阅消息缓存

    // 添加订阅
    addSubscription: function(key, fn){
        // 不存在同种类型订阅，创建集合
        if(!this.clientList[key]){
            this.clientList[key] = []
        }
        // 分类保存订阅
        this.clientList[key].push(fn);
    },

    // 发布订阅的消息
    release: function(){
        // 截取发布的第一个参数
        const key = [].shift.call(arguments);
        const subscriptionList = this.clientList[key];
        if(!subscriptionList){ return; }
        subscriptionList.forEach(element => {
            element(arguments);
        });
    },

    // 移除订阅
    removeSubscription: function(){
        // 获取发布的第一个参数
        const key = [].shift.call(arguments);
        const subscriptionList = this.clientList[key];
        const fn = [].shift.call(arguments);
        if(!subscriptionList){ return; }
        for(let i = 0; i < subscriptionList.length; i++){
            fn === subscriptionList[i] && subscriptionList.splice(i, i + 1);
        }
    }
}

const fna1 = function(){
    console.log('fna1');
}
const fna2 = function(){
    console.log('fna2');
}
const fnb1 = function(){
    console.log('fnb1');
}
const fnb2 = function(){
    console.log('fnb2');
}
const fnc1 = function(){
    console.log('fnc1');
}
const fnc2 = function(){
    console.log('fnc2');
}

// 订阅
example.addSubscription('a', fna1);
example.addSubscription('a', fna2);
example.addSubscription('b', fnb1);
example.addSubscription('b', fnb2);
example.addSubscription('c', fnc1);
example.addSubscription('c', fnc2);

// 发布
example.release('a');

// 移除
example.removeSubscription('b', fnb2);
example.release('b');