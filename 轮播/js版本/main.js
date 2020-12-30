/* 
*/

var carousel = {
    // 属性后备注1为可传入的参数
    showType: 'pan', // 切换类型 1

    CI: null, // 图片容器项(平移类型需要以此为容器移动)
    cItem: null, // 切换图片项
    prev: null, // 控制切换上一张
    next: null, // 控制切换下一张
    iItemCont: null, // 底部控制项容器
    iItem: null, // 底部控制项

    nowShowItemIndex: 0, // 当前显示的项目下标

    interval: 3000, // 间隔时间 1
    isPN: true, // 是否可切换前一项与后一项 1
    isB: true, // 是否可以根据底部按钮切换 1

    timer: null, // 定时器

    init: function(data){
        this.showType = data.showType || this.showType;
        try {
            this.cItem = document.getElementById('carousel-inner').getElementsByClassName('carousel-item');
            this.iItem = document.getElementById('carousel-indicators').getElementsByClassName('carousel-indicators-item');
        } catch (error) {
            console.log(error);
        }

        if(this.cItem == null){
            throw new RangeError('');
        }
        this.iItemCont = document.getElementById('carousel-indicators');
        this.prev = document.getElementById('carousel-control-prev');
        this.next = document.getElementById('carousel-control-next');
        
        if(!['pan', 'transition'].includes(this.showType)){
            throw new RangeError('data.showType must be pan or transition');
        }
        
        this._changeItem();

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
            this.iItem.setAttribute('style', 'display: none');
        }

    },
    _changeItem: function(){
        this.timer = setInterval(function(){

            this._handerPrevAndNext('next');

        }.bind(carousel), this.interval);
        // 定时器第一个参数函数若要改变this指向不可用call和apply，这两者都会执行函数，需要使用bind
    },
    _handerPrev: function(){ // 控制显示上一张
        this.prev.addEventListener('click', function(e){
            
            clearInterval(this.timer);

            this._handerPrevAndNext('prev');

            this.showType == 'pan' ? this._changeItem() : this._changeItem(); // 打开定时器
        }.bind(carousel));
    },
    _handerNext: function(){ // 控制显示下一张
        this.next.addEventListener('click', function(e){

            clearInterval(this.timer);

            this._handerPrevAndNext('next');
            
            this.showType == 'pan' ? this._changeItem() : this._changeItem(); // 打开定时器
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
                clearInterval(this.timer);

                let index = e.target.dataset.i; // html5获取自定义属性data-
                this.nowShowItemIndex = index;

                this.showType == 'pan' ? this._Pan() : this._transition();

                this.showType == 'pan' ? this._changeItem() : this._changeItem(); // 打开定时器

            }
        }.bind(this));

    },
    _bottomCtrlStyle: function(){
        for(let i = 0; i < this.iItem.length; i++){
            this.iItem[i].classList.remove('carousel-indicators-item--active');
        }
        this.iItem[this.nowShowItemIndex].classList.add('carousel-indicators-item--active');
    },
    _Pan: function(){ // 平移类型的切换
        this.CI = document.getElementById('carousel-inner');
        console.log('pan')

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
        
    }
}

var data = {
    showType: 'transition'
}

carousel.init(data);