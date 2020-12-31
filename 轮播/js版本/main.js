/* 
    当底部控制项和左右控制项都不存在，可以提供一种 1/5 这种显示标明当前第几个
*/
var carousel = {
    // 属性后备注1为可传入的参数
    showType: 'pan', // 切换类型 1

    CC: null, // 轮播容器宽度
    CI: null, // 图片容器项(平移类型需要以此为容器移动)
    cItem: null, // 切换图片项
    prev: null, // 控制切换上一张
    next: null, // 控制切换下一张
    iItemCont: null, // 底部控制项容器
    iItem: null, // 底部控制项
    CIWidth: null, // 图片容器宽度

    nowShowItemIndex: 0, // 当前显示的项目下标

    interval: 10000, // 间隔时间 1
    delay: 1000, // 每一项切换的时间
    isPN: true, // 是否可切换前一项与后一项 1
    isB: true, // 是否可以根据底部按钮切换 1
    isHover: false, // 鼠标移入容器是否停止轮播 1

    timer: null, // 定时器
    startTime: Date.now(), // 节流 开始时间
    endTime: null, // 节流 结束时间

    count: 0,

    init: function(data){
        this.showType = data.showType || this.showType;
        this.interval = data.interval || this.interval;
        if(!((data.isPN == false) ? false : true)){
            this.isPN = false;
        }
        if(!((data.isB == false) ? false : true)){
            this.isB = false;
        }
        
        try {
            // 如果基本数据类型调用toString就会报错, 所以使用try
            this.isHover = (data.isHover.toString() == 'true') && true || this.isHover;    
        } catch (error) {
            this.isHover = false;
        }

        this.CC = document.getElementById('carousel-container'); // 轮播容器
        this.CI = document.getElementById('carousel-inner'); // 图片容器

        try {
            this.cItem = document.getElementById('carousel-inner').getElementsByClassName('carousel-item');
            this.iItem = document.getElementById('carousel-indicators').getElementsByClassName('carousel-indicators-item');
        } catch (error) {
            console.log(error);
        }
        
        if(this.cItem == null || this.cItem.length == 0){
            // 容器未命名或命名错误，容器id为carousel-inner、容器内项id为carousel-item
            throw new RangeError('The container is unnamed or incorrectly named, the container id is carousel-inner, and the item id in the container is carousel-item');
        }

        this.iItemCont = document.getElementById('carousel-indicators'); // 底部圆点控制器
        this.prev = document.getElementById('carousel-control-prev');
        this.next = document.getElementById('carousel-control-next');
        
        if(!['pan', 'transition'].includes(this.showType)){
            throw new RangeError('data.showType must be pan or transition');
        }

        // 如果是transition类型下，默认设置第一个样式
        if(this.showType == 'transition'){
            this.CI.classList.add('ci-transition');
            this.cItem[0].classList.add('ci-t-active');
        } else if (this.showType == 'pan') {
            this.CI.classList.add('ci-pan');
            this._setPanStyle(); // pan类型下的样式
        }
        
        if(this.isPN){ // 是否开启可切换前一项与后一项
            this._handerPrev();
            this._handerNext();
        } else {
            this.prev.setAttribute('style', 'display: none');
            this.next.setAttribute('style', 'display: none');
        }

        if(this.isB){ // 是否开启根据底部按钮切换
            this._bottomCtrl();
        } else {
            this.iItemCont.setAttribute('style', 'display: none');
        }

        if(this.isHover){
            this._isHoverStop();
        }

        this._leaveStop(); // 含调用定时器

    },
    _changeItem: function(){
        this.timer = setInterval(function(){

            this._handerPrevAndNext('next');

        }.bind(carousel), this.interval);
        // 定时器第一个参数函数若要改变this指向不可用call和apply，这两者都会执行函数，需要使用bind
    },
    _handerPrev: function(){ // 控制显示上一张
        this.prev.addEventListener('click', function(){

            // 控制节流
            this._Throttling(function(){
                clearInterval(this.timer);

                this._handerPrevAndNext('prev');
                
                this._changeItem(); // 打开定时器
            })

        }.bind(carousel));
    },
    _handerNext: function(){ // 控制显示下一张
        
        this.next.addEventListener('click', function(){
            
            // 控制节流
            this._Throttling(function(){
                clearInterval(this.timer);

                this._handerPrevAndNext('next');
                
                this._changeItem(); // 打开定时器
            })

        }.bind(carousel));
    },
    _handerPrevAndNext: function(type){ // 处理切换状态

        let length = this.cItem.length - 1; // 总需要切换元素个数
        let nowindex = this.nowShowItemIndex; // 当前切换到的元素下标

        if(type == 'prev'){
            nowindex == 0 ? this.nowShowItemIndex = length : this.nowShowItemIndex--;
        } else if(type == 'next') {
            nowindex == length ? this.nowShowItemIndex = 0 : this.nowShowItemIndex++;
        }
        
        this.showType == 'pan' ? this._Pan() : this._transition();

    },
    _bottomCtrl: function(){ // 底部控制项
        for(let i = 0; i < this.iItem.length; i++){
            this.iItem[i].dataset.i = i;  // html5设置自定义属性data-
        }
        
        this.iItemCont.addEventListener('click', function(e){
            if(e.target.className.indexOf('carousel-indicators-item') != -1){
                this._Throttling(function(){
                    clearInterval(this.timer);

                    let index = e.target.dataset.i; // html5获取自定义属性data-
                    this.nowShowItemIndex = index;
    
                    this.showType == 'pan' ? this._Pan() : this._transition();
    
                    this._changeItem(); // 打开定时器
                });

            }
        }.bind(this));

    },
    _bottomCtrlStyle: function(){
        for(let i = 0; i < this.iItem.length; i++){
            this.iItem[i].classList.remove('carousel-indicators-item--active');
        }
        console.log(this.nowShowItemIndex);
        this.iItem[this.nowShowItemIndex].classList.add('carousel-indicators-item--active');
    },
    _Pan: function(){ // 平移类型的切换
        
        this._panMove();
        this._bottomCtrlStyle(); // 改变底部控制项的样式
    },
    _transition: function(){ // 过渡类型的切换
        for(let i = 0; i < this.cItem.length; i++){
            this.cItem[i].classList.remove('ci-t-active');
        }
        this.cItem[this.nowShowItemIndex].classList.add('ci-t-active');

        this._bottomCtrlStyle(); // 改变底部控制项的样式
    },
    _Throttling(callback){ // 节流函数
        carousel.endTime = Date.now();
        if(carousel.endTime - carousel.startTime >= carousel.delay){
            callback.call(carousel);
            carousel.startTime = Date.now();
        }
    },
    _isHoverStop(){ // 鼠标移入，轮播停止
        this.CI.onmouseenter = () => {
            clearInterval(this.timer);
        }
        this.CI.onmouseleave = () => {
            this._changeItem(); // 打开定时器
        }
    },
    _leaveStop(){ // 当用户看不见网页时，轮播会避免启动（例如，当浏览器选项卡处于非活动状态，浏览器窗口最小化等）。
        let vEvent = 'visibilitychange';
        if (document.webkitHidden != undefined) {
            vEvent = 'webkitvisibilitychange';
        }

        function visibilityChanged() {
            if (document.hidden || document.webkitHidden) {
                clearInterval(this.timer);
            } else {
                // 此处的定时器进入页面就开始调用
                this._changeItem(); // 打开定时器
            }
        }

        document.addEventListener(vEvent, visibilityChanged.bind(this), false);
    },
    _setPanStyle(){ // 设置在pan下的样式
        if(this.CC){
            // 轮播容器宽度
            var CCWidth = this.CC.clientWidth;
            // 获取有几个切换项目
            var len = this.cItem.length + 1;
            // 设置图片容器宽度
            this.CI.setAttribute('style', `width: ${len * CCWidth}px`);
            this.CIWidth = len * CCWidth;

            // 把轮播的第一项复制一份放到最后
            var VirtualNode = this.cItem[0].cloneNode(true);
            document.getElementById('carousel-inner').appendChild(VirtualNode);

            for(let i = 0; i < len; i++){
                this.cItem[i].setAttribute('style', `width: ${CCWidth}px`)
            }
        } else {
            // 获取容器出错，容器id应为carousel-container
            throw new Error('Error getting container, container id should be carousel-container')
        }
    },
    _panMove(delay, distance){ // pan模式下的运动函数
        var moveLength = distance - distance / delay;
        moveLength = moveLength > delay ? moveLength : distance;
        return moveLength;
    }
}

var data = {
    showType: 'pan',
    isPN: true,
    isB: true,
    isHover: true
}

carousel.init(data);