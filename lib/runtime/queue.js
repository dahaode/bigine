 /**
 * 资源预加载队列。
 *
 * @author    姚尧 <yyao@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

 var bigine = {
    runtime: {},
    error: require('bigine/error')
};

bigine.runtime.queue = function(){
    /**
     * 资源下载队列，只存放未下载资源
     *
     * @type array
     * @format {
     *      uuid:{String},
     *      type:{String},      //资源类型
     *      status:{boolean}     //状态标识，false代表未下载，true代表下载中
     * }
     */
    var prefetchQ = new Array();

    /**
     * 存入资源信息到预加载队列中
     *
     * @param uuid:{String}
     *        type:{String}      //资源类型
     * 
     */
    this.add = function(uuid,type){
        prefetchQ.push({uuid:uuid,type:type,status:false});
    };

    /**
     * 根据uuid删除预加载队列中的元素
     *
     * @param uuid:{String}
     * 
     */
    this.del = function(uuid){
        if(prefetchQ.length < 1) return;
        var isExist = false;
        var i = 0;
        for(var index in prefetchQ){
            var uuidInQ = prefetchQ[index].uuid;
            if(uuid == uuidInQ){
                i=index;
                isExist = true;
                break;
            }
        }

        if(!isExist || !prefetchQ[i]){
            return;
        }
        prefetchQ[i] = undefined;
        prefetchQ.splice(i,1);
    };

    /**
     * 返回加载队列对象
     *
     * @param uuid:{String}
     * 
     */
    this.getPrefetchQ = function(){
        return prefetchQ;
    };

    /**
     * 返回队列中正处于在下载状态的资源数量
     *
     */
    this.loadingLength = function(){
        var loadingCount = 0;
        for(var i = 0 ; i < prefetchQ.length ; i++){
            var source = prefetchQ[i];
            if(source.status){
                loadingCount++;
            }
        }
        return loadingCount;
    };

    this.length = function(){
        return prefetchQ.length;
    }

    /**
     * 获取加载队列中的资源信息
     *
     * @param uuid:{String}
     * @return Obj
     * @format {
     *      uuid:{String},
     *      type:{String},      //资源类型
     * }
     * 
     */
    this.getSourceInPrefetchQ = function(uuid){
        for(var i = 0 ; i < prefetchQ.length; i++){
            var uuidInQ = prefetchQ[i].uuid;
            if(uuid == uuidInQ){
                return prefetchQ[i];
            }
        }
    };
    
};

module.exports = bigine.runtime.queue;