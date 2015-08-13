/**
 * 定义资源操作组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 DaHao.de
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../bigine').$namespace('.util.resource')
    .$import('.error')
    .$import('.runtime.env')
    .$import('.util.promise'),
    $ = bigine.util.resource;

/**
 * 获取素材包内容。
 *
 * @param  {String} uuid
 * @return {bigine.util.promise}
 * @static
 */
bigine.util.resource.getSuite = function(uuid) {
    return new bigine.util.promise(function (resolve, reject) {
        $.$xhr('POST', 'http://api.dahao.de/resource/' + uuid + '/', resolve, reject);
    });
};

/**
 * 获取主题配置。
 *
 * @param  {String} uuid
 * @return {bigine.util.promise}
 * @static
 */
bigine.util.resource.getTheme = function(uuid) {
    return new bigine.util.promise(function (resolve, reject) {
        $.$xhr('GET', $.$url(uuid) + 'theme.json', resolve, reject);
    });
};

/**
 * 获取资源远端 URL 。
 *
 * @param  {String} id
 * @return {String}
 * @static
 */
bigine.util.resource.$url = function(id) {
    return 'http://s.dahao.de/theme/' + id + '/';
};

/**
 * 异步获取远端数据。
 *
 * @param  {String} method
 * @param  {String} url
 * @param  {Object=} data
 * @param  {Function=} onSuccess
 * @param  {Function=} onFailure
 * @param  {Object=} headers
 * @return {void}
 * @static
 */
bigine.util.resource.$xhr = function(method, url, data, onSuccess, onFailure, headers) {
    if (bigine.util.isFunction(data)) {
        headers = onFailure;
        onFailure = onSuccess;
        onSuccess = data;
        data = false;
    }
    onSuccess = onSuccess || bigine.util.noop;
    onFailure = onFailure || bigine.util.noop;
    headers = headers || {};
    if (bigine.runtime.env.node.js) {
        return (bigine.$require('.util.resource.node'))(method, url, data, onSuccess, onFailure, headers);
    }
    if (window.XDomainRequest) {
        return $.$xdr(method, url, data, onSuccess, onFailure);
    }
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveX.Object('Microsoft.XMLHTTP');
    xhr.onreadystatechange = function() {
        if (4 != xhr.readyState) {
            return true;
        }
        if (200 != xhr.status) {
            onFailure(new bigine.error(xhr.status + ' ' + xhr.statusText));
            return false;
        }
        try {
            onSuccess(JSON.parse(xhr.responseText));
        } catch (error) {
            onFailure(error);
        }
    };
    xhr.onerror = function(event) {
        onFailure(event.error);
    };
    xhr.open(method, url, true);
    bigine.util.each(headers, $.$xhr.$header, xhr);
    if (data) {
        var query = [];
        for (var ii in data) {
            if (data.hasOwnProperty(ii)) {
                query += ii + '=' + encodeURIComponent(data[ii]);
            }
        }
        query = query.join('&');
        if (query) {
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.setRequestHeader('Content-Length', query.length);
        }
        xhr.send(query);
    } else {
        xhr.send();
    }
};

/**
 * 设置附加头信息。
 *
 * @this   {XMLHttpRequest}
 * @param  {*} value
 * @param  {String} key
 * @return {void}
 * @static
 */
bigine.util.resource.$xhr.$header = function(value, key) {
    this.setRequestHeader(key, value);
};

/**
 * IE8 IE9 异步获取远端数据。
 *
 * @param  {String} method
 * @param  {String} url
 * @param  {Object=} data
 * @param  {Function=} onSuccess
 * @param  {Function=} onFailure
 * @return {void}
 * @static
 */
bigine.util.resource.$xdr = function(method, url, data, onSuccess, onFailure) {
    $.$xdr.$ = $.$xdr.$ || [];
    var xdr = new XDomainRequest();
    xdr.onload = function() {
        try {
            onSuccess(JSON.parse(xdr.responseText));
        } catch (error) {
            onFailure(error);
        }
    };
    xdr.onerror = function(event) {
        onFailure(event.error);
    };
    xdr.ontimeout = function() {
        onFailure();
    };
    xdr.onprogress = function() {};
    xdr.open(method, url);
    if (data) {
        var query = [];
        for (var ii in data) {
            if (data.hasOwnProperty(ii)) {
                query += ii + '=' + encodeURIComponent(data[ii]);
            }
        }
        query = query.join('&');
        xdr.send(query);
    } else {
        xdr.send();
    }
    $.$xdr.$.push(xdr);
};

module.exports = bigine.util.resource;
