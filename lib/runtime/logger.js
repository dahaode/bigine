/**
 * 日志器。
 *
 * @author    姚尧 <yyao@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

 var bigine = {
    runtime: {},
    error: require('bigine/error')
};

Date.prototype.format = function(fmt){
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o){
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
};

bigine.runtime.logger = function(stdout){
    var _logArr = new Array();
    var _stdout = stdout?stdout:console;
    var _output = {"info":_stdout.info,"debug":_stdout.debug,"warn":_stdout.warn,"error":_stdout.error};

    var generalLog = function(msg,level){
        // console.log(new Date().format("yyyy-MM-dd hh:mm:ss"));
        var log = {msg:msg,level:level,date:new Date()};
        _logArr.push(log);
        print(log);
        return log;
    }

    var print = function(log){
        var output = _output[log.level];
        output.call(_stdout,log.date.format("yyyy-MM-dd hh:mm:ss")+" ["+log.level+"] : "+log.msg);
    };

    this.info = function(msg){
        log = generalLog(msg,"info");
    };

    this.debug = function(msg){
        log = generalLog(msg,"debug");
    };
    this.warn = function(msg){
        log = generalLog(msg,"warn");
    };
    this.error = function(msg){
        log = generalLog(msg,"error");
    };

    
};

module.exports = bigine.runtime.logger;