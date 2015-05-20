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
    .$import('.runtime.env')
    .$import('.util.promise'),
    $ = {};

/**
 * 获取素材包内容。
 *
 * @param  {String} uuid
 * @return {bigine.util.promise}
 */
bigine.util.resource.getSuite = function(uuid) {
    return new bigine.util.promise(function (resolve, reject) {
        $.xhr('POST', 'http://api.bigood.com/resource/' + uuid + '/', resolve, reject);
    });
};

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
 * 获取主题配置。
 *
 * @param  {String} uuid
 * @return {bigine.util.promise}
 */
bigine.util.resource.getTheme = function(uuid) {
    return new bigine.util.promise(function (resolve, reject) {
        $.xhr('GET', bigine.util.resource.url(uuid) + 'theme.json', resolve, reject);
    });
};

/**
 * 异步获取远端数据。。
 *
 * @param  {String} method
 * @param  {String} url
 * @param  {Object=} data
 * @param  {Function=} onSuccess
 * @param  {Function=} onFailure
 * @return {void}
 */
$.xhr = function(method, url, data, onSuccess, onFailure) {
    if (bigine.util.isFunction(data)) {
        onFailure = onSuccess;
        onSuccess = data;
        data = false;
    }
    onSuccess = onSuccess || bigine.util.noop;
    onFailure = onFailure || bigine.util.noop;
    if (bigine.runtime.env.node.js && !bigine.runtime.env.node.webkit) {
        return $.http(method, url, data, onSuccess, onFailure);
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
 * NodeJS 环境异步获取远端数据。
 *
 * @param  {String} method
 * @param  {String} url
 * @param  {Object=} data
 * @param  {Function=} onSuccess
 * @param  {Function=} onFailure
 * @return {void}
 */
$.http = function(method, url, data, onSuccess, onFailure) {
    var options = require('url').parse(url);
    if (options.hostname) {
        delete options.host;
    }
    options.method = method;
    options.headers = {
        'Origin': 'http://www.bigood.com'
    };
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
