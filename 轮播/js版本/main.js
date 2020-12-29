/* 
    data = {
        showType: string: pan(平移 默认)/transition(过渡)  图片切换方式
        elem: {
            cItem: dom节点  每一个切换项
            prev: dom节点  查看上一个
            next: dom节点  查看下一个
            iItem: dom节点  查看每一项的控制项
        }
    }
*/

var carousel = {
    showType: 'pan',
    elem: { // 固定元素类
        cItem: null,
        prev: null,
        next: null,
        iItem: null
    },
    
    init: function(data){
        this.showType = data.showType || this.showType;
        this.cItem = document.getElementById('carousel-inner').getElementsByClassName('carousel-item');
        this.iItem = document.getElementById('carousel-indicators').getElementsByClassName('carousel-indicators-item');
        this.prev = document.getElementById('carousel-control-prev');
        this.next = document.getElementById('carousel-control-next');
        this._distribution();
    },
    _distribution: function(){ // 分发状态
        switch (this.showType) {
            case 'pan':
                this._Pan();
                break;
            case 'transition':
                this._transition();
                break;
            default:
                throw new RangeError('data.showType must be pan or transition');
        }
    },
    _Pan: function(){ // 平移类型的切换
        console.log('pan')
    },
    _transition: function(){ // 过渡类型的切换
        
    }
}

var data = {
    showType: 'transition'
}

carousel.init(data);