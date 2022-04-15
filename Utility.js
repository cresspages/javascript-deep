// 获取地址栏的参数    name 需要获取的参数名
window.getQueryString = function (name) {
    try {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var url = location.href.split("?");
        r = url[1].match(reg);
        if (r != null) return unescape(r[2]);
        return "";
    } catch (e) {
        return "";
    }
}

// 获取cookies
window.getCookie = function (name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';'); //把cookie分割成组
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i]; //取得字符串
        while (c.charAt(0) == ' ') { //判断一下字符串有没有前导空格
            c = c.substring(1, c.length); //有的话，从第二位开始取
        }
        if (c.indexOf(nameEQ) == 0) { //如果含有我们要的name
            return unescape(c.substring(nameEQ.length, c.length)); //解码并截取我们要值
        }
    }
    return false;
}
// 删除cookies
window.clearCookie = function (name, value, seconds) {
    value = "";
    seconds = -1;
    seconds = seconds || 0; //seconds有值就直接赋值，
    var expires = "";
    if (seconds != 0) { //设置cookie生存时间
        var date = new Date();
        date.setTime(date.getTime() + (seconds * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    document.cookie = name + "=" + escape(value) + expires + "; path=/"; //转码并赋值
}
// 设置cookies
window.setCookie = function (name, value, seconds) {
    seconds = seconds || 0; //seconds有值就直接赋值，没有为0，这个根php不一样。
    var expires = "";
    if (seconds != 0) { //设置cookie生存时间
        var date = new Date();
        date.setTime(date.getTime() + (seconds * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    document.cookie = name + "=" + escape(value) + expires + "; path=/"; //转码并赋值
}

// 正则
window.reg = {
    password: /[\u4e00-\u9fa5]/, //密码不能输入中文
    idcard: /(^\d{18}$)|(^\d{17}(\d|[Xx])$)/,    //身份证号为字符和数字且为18位
    phone: /^1\d{10}$/,     //手机号正则（必须是1开头，只能是数字，并且是11位数字）
    officephone: /(^0\d{2,3}-\d{7,8}$)|(^0(\d{10,11})$)|(^1\d{10}$)/,//联系方式
    officetel:/(^0\d{2,3}-\d{7,8}$)|(^0(\d{10,11})$)/,//传真电话
    code: /^\d{4}$/,		      //验证码为纯数字
    name: /^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$|^[\u4E00-\u9FA5A-Za-z]+$|^[A-Za-z]+(·[A-Za-z]+)*$/, //姓名只能输入汉字或者英文            
    qqnum: /^[1-9][0-9]{5,11}$/,/*QQ正则*/
    email: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,//邮箱验证
    pheight: /^(0{1}|[1-9]\d{0,3}|.{0})$/,             //身高验证
    pzipcode: /^[0-9]{6}$/,  //邮编验证
    piccode: /^[a-zA-Z0-9]{6}$/, //图形验证码 6位
    tbzyz: /^\d{8}$/, //台胞证验证
}

// 日期处理
const DateHandle = {
    /* 
        格式化日期
        格式为：XXXX/XX/XX
    
        date Date对象
        type 空/complete/simple   默认simple类型
    */
    resizeTime(date, type) {
        if(!date){ return ''; }
        if(type){
            if(!['complete', 'simple'].includes(type)){
                throw new TypeError('type must be complete or simple');
        }} 
        var d = new Date(date);
        var year = d.getFullYear();
        var month = d.getMonth() + 1;
        var date = d.getDate();
        var day = d.getDay();
        var h = d.getHours();
        var m = d.getMinutes();
        var s = d.getSeconds();
        if (month < 10) { month = "0" + month };
        if (date < 10) { date = "0" + date };
        if (day < 10) { day = "0" + day };
        if (h < 10) { h = "0" + h; }
        if (m < 10) { m = "0" + m; }
        if (s < 10) { s = "0" + s; }
        var week = ["日", "一", "二", "三", "四", "五", "六"];
        switch (type) {
            case 'complete':
                var str = year + "年" + month + "月" + date + "日 星期" + week[+day] + " " + h + ":" + m + ":" + s;
                break;
            case 'simple':
                var str = year + "/" + month + "/" + date + " " + h + ":" + m;
                break;
            default:
                var str = year + "/" + month + "/" + date + " " + h + ":" + m;
                break;
        }
        
        return str;
    }
}

/*
  ------------------------------   日期格式化
*/
/*
  格式化为YYYY-MM-DD 或者 YYYY-MM-DD hh:mm:ss
  参数：params
    date: Date对象可接受的值 ( 不传为当前时间 )
    complete: 是否显示完整时间 默认false
    hyphen: 连字符 默认（ - ）   只作用于日期上   时间上默认为（ : ）且不可改变
        值为text将返回 yyyy年 mm月 dd日 hh时mm分ss秒
        注意：连字符不建议使用 （ . ） 在safair浏览器上这不是一个可接受的日期格式
*/
export const formatDate = ({ date, complete, hyphen } = {}) => {
  if(!date){ date = new Date(); }
  if(typeof complete !== 'boolean'){ complete = false; }
  if(!hyphen){ hyphen = '-'; }
  
  const year = date.getFullYear();
  const month = dateCompletion(date.getMonth() + 1);
  const day = dateCompletion(date.getDate());
  const horus = dateCompletion(date.getHours());
  const minutes = dateCompletion(date.getMinutes());
  const seconds = dateCompletion(date.getSeconds());
  if(hyphen == 'text'){
    if(complete){
      return `${year}年${month}月${day}日 ${horus}时${minutes}分${seconds}秒`;
    }
    return `${year}年${month}月${day}日`;
  } else {
    const date2 = `${year}${hyphen}${month}${hyphen}${day}`;
    const time = `${horus}:${minutes}:${seconds}`
    if(complete){
      return `${date2} ${time}`;
    }
    return date2;
  }
}
const dateCompletion = (str) => {
  if(!str && str != 0) return;
  str = str.toString();
  if(str.length == 1){
    return '0' + str;
  }
  return str;
}