/**
 * 资源预加载器。
 *
 * @author    姚尧 <yyao@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

 var bigine = {
    runtime: {
        resource:{}
    },
    error: require('bigine/error')
},$={};

/**
* 定义队列列表
*/
$.queue = [];
/**
* 正在下载中队列列表
*/
$.pending = [];
/**
* 已下载完成列表
*/
$.fetched = [];
/**
* 已使用资源列表
*/
$.used = [];
/**
* 加入队列的资源总量
*/
$.queuedCount = 0;
/**
* 正在下载中的资源数量
*/
$.pendingCount = 0;
/**
* 已下载完成的资源数量
*/
$.fetchedCount = 0 ;
/**
* 验证音频标识正则
*/
$.audioTypeReg = /^audio$/i;
/**
* 域名
*/
$.domainSuf = "bigood.com";

/**
* 设置同时下载资源个数
*/
$.size = 10;
/**
* 设置是否nodejs代码检测
*/
bigine.runtime.resource.nodejs = false;

bigine.runtime.resource = function(screen,audioName,size){
    /**
     * 构造屏幕尺寸参数
     */
    $.screen = screen;
     /**
     * 构造音频文件名参数
     */
    $.audioName = audioName;

    $.size = size;

};



/**
 * 验证资源类型
 */
$.typeValidate = function(type){
    return $.spec[type] || $.audioTypeReg.test(type);
};

/**
 * 设定图片资源类型及资源比例。
 */
$.spec = {
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
 * 根据uuid计算二级域名
 * @param (String)uuid
 */
$.domain = function(uuid){
    return "http://a"+(1 + (parseInt(uuid[0], 10) % 8)) + "."+$.domainSuf+"/"+uuid+"/";
};

/**
 * 下载音频文件资源
 * @param (String)domain
 *        (String)uuid
 */
$.loadAudio = function(uuid){
    //音频文件src
    var audioSrc = $.domain(uuid)+$.audioName;
    //测试音频文件，应使用audioSrc替换
    // var audio = new Audio("http://cc.stream.qqmusic.qq.com/C100001PmjKk4Lx5Oy.m4a?fromtag=52");
    var audio = new Audio(audioSrc);
    if(!$.pending[uuid]){
        $.pending[uuid] = audio;
        $.pendingCount++;
    }
    //音频文件下载完成事件
    audio.addEventListener("suspend",function(e){
        $.fetched[uuid] = audio;
        $.fetchedCount++;
        $.delQ(uuid);
        delete $.pending[uuid];
        $.pendingCount--;
    });
    return audio;
};

/**
 * 下载图片文件资源
 * @param (String)domain
 *        (String)uuid
 *        (String)type 图片文件标识，以_spec中设置为准
 */
$.loadImage = function(uuid,type){
    var sourceObj = $.spec[type];
    //图片文件名
    var sourceName = $.screen*sourceObj.ratio+"."+sourceObj.format;
    var imageSrc = $.domain(uuid)+sourceName;
    //测试图片，应使用imageSrc替换
    var image = new Image();
    // image.src = "http://www.onlinedown.net/bigsoftimg/iosimg/295271_4.jpg";
    image.src = imageSrc;
    if(!$.pending[uuid]){
        $.pending[uuid] = image;
        $.pendingCount++;
    }
    image.onload = function(){
        $.fetched[uuid] = image;
        $.fetchedCount++;
        $.delQ(uuid);
        delete $.pending[uuid];
        $.pendingCount--;
    };
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
$.loadSource = function(uuid,type){
    if($.pending[uuid] || $.fetched[uuid] || $.used[uuid]){
        return $.pending[uuid] || $.fetched[uuid] || $.used[uuid];
    }
    
    if($.audioTypeReg.test(type)){
        return $.loadAudio(uuid);
    }
    return $.loadImage(uuid,type);
};

/**
 * 预下载资源
 * 检测，当正在下载队列数量小于size时，自动将预加载队列中的资源放入正在下载队列中。
 *
 */
$.preLoad = function(){
    var queueLength = $.queue.length;
    if(queueLength == 0){
        return;
    }
    var count = queueLength>$.size?$.size:queueLength;
    for(var i = 0 ; i < count;i++){
        var source = $.queue[i];
        if($.pending[source.uuid] || $.used[source.uuid] || $.fetched[source.uuid]){
            continue;
        }
        $.loadSource(source.uuid,source.type);
    }
};

/**
 * 删除预未下载列表中的资源
 */
$.delQ = function(uuid){
    var isExist = false;
    var i = 0;
    for(var index in $.queue){
        var uuidInQ = $.queue[index].uuid;
        if(uuid == uuidInQ){
            i=index;
            isExist = true;
            break;
        }
    }

    if(!isExist || !$.queue[i]){
        return;
    }
    $.queue[i] = undefined;
    $.queue.splice(i,1);
};

/**
 * 从未下载队列中查找uuid对应的资源
 */
$.getSourceInQ = function(uuid){
    for(var index in $.queue){
        var uuidInQ = $.queue[index].uuid;
        if(uuid == uuidInQ){
            return $.queue[index];
        }
    }
};


/**
 * 获取资源，对外开放的方法
 * 如果资源正在下载中或已下载完成或已使用过，则直接返回资源对象
 * 如资源未下载，则马上进行下载，并返回资源对象
 * 如资源不在任意队列列表中，则需type参数进行新资源下载。
 * @Return 资源文件对象，Audio或Image
 * @param  {String} uuid
 *         {String} type  可选参数
 *
 */
bigine.runtime.resource.prototype.get = function(uuid,type){
    // console.log("queuedCount = "+$.queuedCount+"  fetchedCount = "+$.fetchedCount+"  pendingCount size = "+$.pendingCount
    //     +"  queue size = "+$.queue.length+"  fetched size = "+$.fetched.length+"  used size = "+$.used.length);
    if($.pendingCount < $.size){
        $.preLoad();
    }
    if($.pending[uuid] || $.used[uuid]){
        return $.pending[uuid] || $.used[uuid];
    }
    if($.fetched[uuid]){
        $.usedCount++;
        $.used[uuid] = $.fetched[uuid];
        return $.used[uuid];
    }
    var source = $.getSourceInQ(uuid);
    if(source){
        return $.loadSource(source.uuid,source.type);
    }

    if(!type){
        throw new bigine.error("未加入队列的资源需定义type属性", this.$line);
    }
    $.queue++;
    $.queue.push({uuid:uuid,type:type});
    return $.loadSource(uuid,type);
};

/**
 * 将资源放入预加载队列中，对外开放的方法
 * 如果正在下载中的资源小于size属性，则将资源放入正在下载队列，否则放入预下载队列
 * @Return 本类对象，方便构成方法链
 * @param  {String} uuid
 *         {String} type
 *
 */
bigine.runtime.resource.prototype.queue = function(uuid,type){
    if(this.nodejs) {
        return this;
    };
    if(!$.typeValidate(type)){
        throw new bigine.error('资源类型错误：”' + type + '”', this.$line);
    }
    $.queuedCount++;
    $.queue.push({uuid:uuid,type:type});
    if($.pendingCount < $.size){
        $.loadSource(uuid,type);
    }
    return this;
};

module.exports = bigine.runtime.resource;
