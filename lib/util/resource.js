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
        $.$xhr('POST', 'http://api.dahao.de/resource/' + uuid + '/', resolve, reject, {
            'Origin': 'http://dahao.de'
        });
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
        $.$xhr('GET', $.$url(uuid) + 'theme.json', resolve, reject, {
            'Referer': 'http://dahao.de'
        });
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
        return $.$nhr(method, url, data, onSuccess, onFailure, headers);
    }
    var xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveX.Object('Microsoft.XMLHTTP');
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
            xhr.send(query);
        }
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
 * NodeJS 环境异步获取远端数据。
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
bigine.util.resource.$nhr = function(method, url, data, onSuccess, onFailure, headers) {
    var options = require('url').parse(url);
    if (options.hostname) {
        delete options.host;
    }
    options.method = method;
    options.headers = headers;
    data = require('querystring').stringify(data);
    if (data) {
        options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        options.headers['Content-Length'] = data.length;
    }
    var req = require('http').request(options, function (resp) {
        resp.setEncoding('utf8');
        var data = '';
        resp.on('data', function (chunk) {
            data += chunk.toString();
        });
        resp.on('end', function () {
            try {
                onSuccess(JSON.parse(data));
            } catch (error) {
                onFailure(error);
            }
        });
        if (200 != resp.statusCode) {
            onFailure(new bigine.error(resp.statusCode + ' ' + resp.statusMessage));
        }
    });
    req.on('error', function (error) {
        onFailure(error);
    });
    if (data) {
        req.write(data);
    }
    req.end();
};

module.exports = bigine.util.resource;
