// WeakMap与Map区别在于  WeakMap只能接收对象作为键名(null除外)
const wm = new WeakMap();
// wm.set('q', 111); // TypeError: Invalid value used as weak map key
// wm.set(Symbol(), 111); // TypeError: Invalid value used as weak map key
// wm.set(null, 111); // TypeError: Invalid value used as weak map key
// wm.set(undefined, 111); // TypeError: Invalid value used as weak map key
wm.set({}, "object");
wm.set([], "array");
wm.set(new RegExp(), "reg");
wm.set(function(){}, "object");
console.log('line:11', wm);

// WeakMap只有四个方法可用 get()、set()、has()、delete()。