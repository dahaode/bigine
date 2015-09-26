/**
 * 用于 NodeJS 的 XMLHttpRequest 模拟组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 */

function NodeXHR() {
    this._l = {};
    this.responseText =
    this.statusText = '';
    this.status = 0;
}

NodeXHR.prototype.addEventListener = function(type, callback) {
    this._l[type] = this._l[type] || [];
    this._l[type].push(callback);
};

NodeXHR.prototype.open = function(method, url, async) {
    var options = require('url').parse(url);
    if ('hostname' in options)
        delete options.host;
    options.method = method;
    options.headers = {
        Origin: options.protocol + '//dahao.de',
        Referer: options.protocol + '//dahao.de'
    };
    this._o = options;
};

NodeXHR.prototype.setRequestHeader = function(title, value) {
    this._o.headers[title] = value;
};

NodeXHR.prototype.send = function(data) {
    var $this = this,
        req = require(this._o.protocol.replace(/:$/, '')).request(this._o, function (resp) {
            resp.setEncoding('utf8');
            $this.status = resp.statusCode;
            $this.statusText = resp.statusMessage;
            resp.on('data', function (chunk) {
                $this.responseText += chunk;
            });
            resp.on('end', function (chunk) {
                ($this._l['load'] || []).forEach(function (listener) {
                    listener.call($this);
                });
            });
        });
    req.on('error', function (error) {
        ($this._l['error'] || []).forEach(function (listener) {
            listener.call($this);
        });
    });
    if (data)
        req.write(data);
    req.end();
};

module.exports = {
    create: function() {
        return new NodeXHR();
    }
};
