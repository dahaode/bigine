/**
 * 资源预加载器。
 *
 * @author    姚尧 <yyao@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

 var bigine = {
    runtime: {
        queue:require("bigine/runtime/queue")
    },
    error: require('bigine/error')
};

/**
 * 资源预加载对象。
 * @param {screen} 屏幕宽度
 *        {audioName} 音频文件名
 *        {srategy} 下载策略：(高性能策略)performance (平衡策略)balance (省流量策略)low 不设置此参数默认平衡策略
 */
bigine.runtime.resource = function(screen,audioName,srategy){
    /**
    * 构造屏幕尺寸参数
    */
    var _screen = screen;

    /**
    * 构造音频文件名参数
    */
    var _audioName = audioName;

    /**
    * 资源加载策略
    */
    var _srategy = srategy;

    /**
    * 验证音频标识正则
    */
    var _audioTypeReg = /^audio$/i;

    /**
    * 域名
    */
    var _domainSuf = "bigood.com";
    
    /**
    * 预下载队列
    */
    var _queue = new bigine.runtime.queue();

    /**
     * 已下载资源记录
     * @type hash array
     * @format {
     *      uuid:{String},
     *      source:{Object},      //资源对象
     * }
     * @description 使用fetchedList[uuid]来获取资源文件对象，Audio或Image
     */
    var fetchedList = new Array();

    /**
     * 设定图片资源类型及资源比例。
     */
    var _spec = {
        snap : {
            ratio : 1,
            format : 'jpg'
        },
        head : {
            ratio : 0.05,
            format : 'png'
        },
        stand : {
            ratio : 0.6,
            format : 'png'
        },
        mapbase : {
            ratio : 1,
            format : 'jpg'
        },
        maphigh : {
            ratio : 1,
            format : 'png'
        }
    };


    /**
     * 验证资源类型
     */
    var typeValidate = function(type){
        return _spec[type] || _audioTypeReg.test(type);
    };

    /**
     * 已下载资源列表长度
     */
    var fetchedCount = function(){
        var count = 0 ;
        for(key in fetchedList){
            count++;
        }
        return count;
    };

    /**
     * 根据uuid计算二级域名
     * @param (String)uuid
     */
    var domain = function(uuid){
        return "http://a"+(1 + (parseInt(uuid[0], 10) % 8)) + "."+_domainSuf+"/"+uuid+"/";
    };

    /**
     * 下载音频文件资源
     * @param (String)domain
     *        (String)uuid
     */
    var loadAudio = function(uuid){
        //音频文件src
        var audioSrc = domain(uuid)+_audioName;
        //测试音频文件，应使用audioSrc替换
        var audio = new Audio("http://123.yy2k.com/new27/2015ndxgst4/1.mp3");
        //音频文件下载完成事件
        audio.addEventListener("suspend",function(e){
            if(uuid=="6060606060"){console.log("uuid==="+uuid);}
            fetchedList[uuid] = audio;
            _queue.del(uuid);
        });
        var source = _queue.getSourceInPrefetchQ(uuid);
        if(source){
            source.status = true;
            source.obj = audio;
        }
        return audio;
    };

    /**
     * 下载图片文件资源
     * @param (String)domain
     *        (String)uuid
     *        (String)type 图片文件标识，以_spec中设置为准
     */
    var loadImage = function(uuid,type){
        var sourceObj = _spec[type];
        //图片文件名
        var sourceName = _screen*sourceObj.ratio+"."+sourceObj.format;
        var imageSrc = domain(uuid)+sourceName;
        //测试图片，应使用imageSrc替换
        var image = new Image();
        image.src = "http://www.onlinedown.net/bigsoftimg/iosimg/295271_4.jpg";
        image.onload = function(){
            fetchedList[uuid] = image;
            _queue.del(uuid);
        };
        var source = _queue.getSourceInPrefetchQ(uuid);
        if(source){
            source.status = true;
            source.obj = image;
        }
        return image;
    };

    /**
     * 下载资源
     *
     * @Return 资源文件对象，Audio或Image
     * @param  {String} uuid
     *         {String} type
     *
     */
    var loadSource = function(uuid,type){
        if(fetchedList[uuid]){
            return fetchedList[uuid];
        }
        if(_audioTypeReg.test(type)){
            return loadAudio(uuid);
        }
        return loadImage(uuid,type);
    };

    /**
     * 下载队列中的资源
     *
     * @param  {number} index 设置下载存放在队列中从索引0开始存放的资源数量
     * @param  {number} num (可选参数)
     * @description  
     *      如果只传入index参数,则表示下载存放在队列中从索引0开始存放的资源【数量】
     *      如果index参数和num参数同时存在，则index代表索引开始位置(从0开始),num代表下载数量
     * }
     */
    // var fetchSource = function(index,num){
    var fetchSource = function(index,num){
        if("number" != typeof index){
            throw new bigine.error('参数[index]类型错误：”' + index + '” 不是数字', this.$line);
        }
        
        if(index < 1 || index > _queue.length()){
            throw new bigine.error('参数[index]超出队列范围：”' + index + '” ', this.$line);
        }
        var prefetchQ = _queue.getPrefetchQ();
        if("undefined" == typeof num){
            for(var i = 0 ; i<index;i++ ){
                var source = prefetchQ[i];
                if(!source.status){
                    loadSource(source.uuid,source.type);
                }

            }
            return;
        }


        if("number" != typeof num){
            throw new bigine.error('参数[num]类型错误：”' + num + '” 不是数字', this.$line);
        }

        if(num < 1 || num+index > prefetchQ.length){
            throw new bigine.error('参数[num]设置超出队列范围：”' + num + '”', this.$line);
        }

        for(var i = index ; i<index+num;i++ ){
            var source = prefetchQ[i];
            if(!source.status){
                loadSource(source.uuid,source.type);
            }
        }
    };

    /**
     * 高性能自动资源加载策略
     * 高性能下载策略代表一旦队列中有新加入的资源列表，则立即下载
     *
     */
    var performanceSrategy = function(){
        console.log("performanceSrategy");
        setInterval(function(){
            console.log("performanceSrategy:"+_queue.length()+"   "+_queue.loadingLength());
            var prefetchQ = _queue.getPrefetchQ();
            if(_queue.length()-_queue.loadingLength() == 0){
                return;
            }
            
            for(var i = 0 ; i<prefetchQ.length;i++ ){
                var source = prefetchQ[i];
                if(!source.status){
                    loadSource(source.uuid,source.type);
                }
            }
        }, 500);
    };

    /**
     * 平衡自动资源加载策略
     * 平衡自动资源加载策略代表会保持资源队列中最多30个正在下载的资源，直到队列完成
     */
    var balanceSrategy = function(){
        console.log("balanceSrategy");
        setInterval(function(){
            console.log("balanceSrategy:"+_queue.length()+"   "+_queue.loadingLength());
            if(_queue.length() == 0){
                return;
            }
            
            fetchSource(_queue.length()<30?_queue.length():30);
        },1000);
    };

    /**
     * 省流量自动资源加载策略
     * 平衡自动资源加载策略代表每次下载15个资源，15个资源下载完成后再进行下载，直到队列完成
     *
     */
    var lowSrategy = function(){
        console.log("lowSrategy");
        setInterval(function(){
            console.log("lowSrategy:"+_queue.length()+"   "+_queue.loadingLength());
            if(_queue.length() == 0){
                return;
            }
            
            var fetchedLength = fetchedCount();
            var loadingLength = _queue.loadingLength();
            if(loadingLength % 15 == 0){
                fetchSource(_queue.length()<15?_queue.length():15);
            }

        },1000);
    };

    /**
     * 存放资源信息到下载队列中
     *
     * @Return 本类对象，可使用方法链来进行队列添加，例如：queue().queue().queue()
     * @param  {String} uuid
     *         {String} type
     *         {boolean} priority 可选参数，设置是否优先下载
     *
     */
    this.queue = function(uuid,type,priority){
        if(!typeValidate(type)){
            throw new bigine.error('资源类型错误：”' + type + '”', this.$line);
        }

        if(priority){
            _queue.add(uuid,type);
            loadSource(uuid,type);
            return this;
        }
        _queue.add(uuid,type);
        return this;
    };

    

    /**
     * 从队列中提取资源对象，如果已下载，则从已下载资源列表中提取，如未下载,则立即下载
     *
     * @Return 资源对象，Audio或Image对象
     * @param  {String} uuid
     *         {String} type 可选参数，如果所get的资源不在queue中，则需要加上此参数
     *
     */
    this.get = function(uuid,type){
        var uuidInFetched = fetchedList[uuid];
        if(uuidInFetched){
            return uuidInFetched;
        }

        var source = _queue.getSourceInPrefetchQ(uuid);
        if(source){
            if(source.status && source.obj){
                return source.obj;
            }
            return loadSource(source.uuid,source.type);
        }

        if(!typeValidate(type)){
            throw new bigine.error('资源类型错误：”' + type + '”', this.$line);
        }
        _queue.add(uuid,type);
        return loadSource(uuid,type);
    };


    //构造默认资源下载策略
    if(!srategy || "balance" == srategy){
        balanceSrategy();
        return;
    }

    switch(srategy){
        case "low" :
        lowSrategy();
        break;
        case "balance" :
        balanceSrategy();
        break;
        case "performance" :
        performanceSrategy();
        break;
        
    }

    //performanceSrategy();
    //balanceSrategy();
    //lowSrategy();
};

module.exports = bigine.runtime.resource;
