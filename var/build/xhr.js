/**
 * 用于 NodeJS 的 XMLHttpRequest 模拟组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 */

function NodeXHR() {
    this.responseText =
    this.statusText = '';
    this.status = 0;
    this.timeout = 10000;
}

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
                if ($this.onload)
                    $this.onload();
            });
        });
    req.setTimeout($this.timeout, function () {
        if ($this.ontimeout)
            $this.ontimeout();
    });
    req.on('error', function (error) {
        if ($this.onerror)
            $this.onerror();
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
