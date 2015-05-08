/**
 * 定义资源操作组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../bigine').$namespace('.util.resource')
    .$import('.error')
    .$import('.util.promise'),
    $ = {};

/**
 * 获取资源远端 URL 。
 *
 * @param  {String} uuid
 * @return {String}
 */
bigine.util.resource.url = function(uuid) {
    var index = 1 + parseInt(uuid[0], 16) % 8;
    if (!index) {
        return uuid;
    }
    return 'http://a' + index + '.bigood.com/' + uuid + '/';
};

/**
 * 获取资源。
 *
 * @param  {String} uuid
 * @return {bigine.util.promise}
 */
bigine.util.resource.get = function(uuid) {
    return new bigine.util.promise(function (resolve, reject) {
        $.xhr('GET', bigine.util.resource.url(uuid) + 'theme.json', true, resolve, reject);
    });
};

/**
 * 创建 XHR 对象。
 *
 * @return {XMLHttpRequest}
 */
$.xhr = function(method, url, async, onSuccess, onFailure) {
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveX.Object('Microsoft.XMLHTTP');
    onSuccess = onSuccess || bigine.util.noop;
    onFailure = onFailure || bigine.util.noop;
    xhr.onreadystatechange = function() {
        if (4 != xhr.readyState) {
            return true;
        }
        if (200 != xhr.status) {
            onFailure(new bigine.error('资源读取服务器响应 ' + xhr.status));
            return false;
        }
        onSuccess(xhr.responseText);
    };
    xhr.onerror = function(event) {
        onFailure(event.error);
    };
    xhr.open(method, url, async);
    xhr.send();
    return xhr;
};

module.exports = bigine.util.resource;
