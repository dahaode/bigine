/**
 * 定义基于 Node.JS 的资源操作组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 DaHao.de
 * @license   GPL-3.0+
 */

var bigine = require('../../bigine').$namespace('.util.resource')
    .$import('.error');

/**
 * 基于 Node.JS 的资源操作组件。
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
bigine.util.resource.node = function(method, url, data, onSuccess, onFailure, headers) {
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

module.exports = bigine.util.resource.node;
