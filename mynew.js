// 实现new

function myNew(parent, ...parm){
    let child = Object.create(parent.prototype);
    let result = parent.apply(child, parm);
    return typeof result === 'object' ? result : child;
}

function Fun1(name){
    this.name = name;
}
Fun1.prototype.say = function(){
    console.log(`say:${this.name}`)
    return 'a';
}
var fun2 = new Fun1('crise');
console.log(fun2.name, fun2.say());

var fun3 = myNew(Fun1, 'crise');
console.log(fun3.name, fun3.say());