// module.exports 等同于 exports  但不可用exports直接指向一个值
var a = 1;
module.exports.b = function(){
    return a;
}

exports.c = 'qqq';