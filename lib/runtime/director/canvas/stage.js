/**
 * 定义画布模式运行时场面（视觉、听觉、交互）舞台组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 DaHao.de
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../../../bigine').$namespace('.runtime.director.canvas')
    .$import('.error')
    .$import('.core.component')
    .$import('.util.promise'),
    $,
    promise = bigine.util.promise;

/**
 * 画布模式运行时场面（视觉、听觉、交互）指挥器组件。
 *
 * @param  {bigine.runtime.runtime}   runtime
 * @param  {CanvasRenderingContext2D} canvasContext
 * @return {bigine.runtime.director.canvas}
 * @constructor
 * @extends {bigine.runtime.director}
 */
bigine.runtime.director.canvas.stage = bigine.$extends(bigine.core.component, function (runtime, canvasContext) {
    /** @override */
    this.$prototype = 'bigine.runtime.director.canvas.stage';

    /**
     * 画面指挥器组件实例。
     *
     * @type {bigine.runtime.runtime}
     */
    this.$runtime = runtime;

    /**
     * 画布。
     *
     * @type {HTMLCanvasElement}
     */
    this.canvas = canvasContext.canvas;

    /**
     * 画面缩放比例。
     *
     * @type {Number}
     */
    this.zoom = 1;

    /**
     * 画布句柄。
     *
     * @type {CanvasRenderingContext2D}
     */
    this.$ctx = canvasContext;

    /**
     * 幕帘状态。
     *
     * @type {Boolean}
     */
    this.$curtain = true;

    /**
     * 画面层。（背景、左位、中位、右位、CG、评分）
     *
     * @type {Image[]}
     */
    this.$layers = [];

    /**
     * 是否显示遮罩层。
     *
     * @type {Boolean}
     */
    this.$mask =

    /**
     * 地图是否采用开始画面模式。（高亮图仅绘制区域）
     *
     * @type {Boolean}
     */
    this.$start = false;

    /**
     * 地图交互点。
     *
     * @type {Object[]}
     */
    this.$map = undefined;

    /**
     * 文字遮罩集合。
     *
     * @type {Object<ImageData>}
     */
    this.$text = {};

    var self = this;
    bigine.util.on(this.canvas, {
        mousemove: function(event) {
            if (self.$curtain || !self.$map) return;
            var x = event.offsetX / self.zoom,
                y = event.offsetY / self.zoom,
                p = -1;
            bigine.util.some(self.$map, function (point, index) {
                if (x >= point.x && x <= point.xw && y >= point.y && y <= point.yh) {
                    p = index;
                    return true;
                }
            });
            if (self.$map.hover != p) {
                self.$map.hover = p;
                if (!self.$mask) self.render();
            }
        },
        click: function() {
            if (self.$curtain || self.$mask || !self.$map || -1 == self.$map.hover) return;
            self.$map[self.$map.hover].f();
            if (self.$start) self.$map = undefined;
            self.$start = false;
        }
    });
});

/**
 * 渲染。
 *
 * @return {void}
 */
bigine.runtime.director.canvas.stage.prototype.render = function() {
    var self = this,
        w = 1280,
        h = 720;
    if (this.$layers[0]) this.$ctx.drawImage(this.$layers[0], 0, 0, w, h);
    if (this.$layers[4]) {
        this.$ctx.save();
        this.$ctx.shadowColor = '#000';
        this.$ctx.shadowBlur = 20;
        this.$ctx.drawImage(this.$layers[4], 128, 72, 1024, 576);
        this.$ctx.restore();
    } else {
        if (this.$layers[1]) this.$ctx.drawImage(this.$layers[1], 80, 0, 480, 720);
        if (this.$layers[3]) this.$ctx.drawImage(this.$layers[3], 720, 0, 480, 720);
        if (this.$layers[2]) this.$ctx.drawImage(this.$layers[2], 400, 0, 480, 720);
    }
    if (this.$map) {
        if (this.$start) {
            bigine.util.each(this.$map, function (btn, index) {
                var i = self.$map.hover == index ? 'ih' : 'i';
                self.$ctx.drawImage(btn[i], btn.x, btn.y, btn.w, btn.h);
            });
        } else if (-1 != self.$map.hover) self.$ctx.drawImage(self.$map[self.$map.hover].i, 0, 0, w, h);
    }
    if (this.$layers[5]) this.$ctx.drawImage(this.$layers[5], 0, 0, w, h);
};

/**
 * 设置层。
 *
 * @param  {Number} index
 * @param  {Image=}  image
 * @return {bigine.runtime.director.canvas.stage}
 */
bigine.runtime.director.canvas.stage.prototype.setLayer = function(index, image) {
    if (!index) {
        this.$map = undefined;
        this.$layers = [];
    }
    this.$layers[index] = image;
    return this;
};

/**
 * 动画显示层。
 *
 * @param  {Number} index
 * @param  {Image=} image
 * @return {bigine.util.promise}
 */
bigine.runtime.director.canvas.stage.prototype.animateLayer = function(index, image) {
    if (this.$curtain || image == this.$layers[index]) return promise.resolve();
    var self = this,
        move = image ? 'in' : 'out',
        x,
        y = 0,
        w = 480,
        h = 720,
        state;
    image = image || this.$layers[index];
    this.$layers[index] = undefined;
    switch (index) {
        case 1:
            x = 80;
            break;
        case 2:
            x = 400;
            break;
        case 3:
            x = 720;
            break;
        case 4:
            x = 128;
            y = 72;
            w = 1024;
            h = 576;
            this.$ctx.save();
            this.$ctx.shadowColor = '#000';
            this.$ctx.shadowBlur = 20;
            break;
    }
    return promise.animate(function (elapsed, duration) {
        if (1 == elapsed) {
            self.render();
            state = self.$ctx.getImageData(0, 0, 1280, 720);
        }
        var ratio = elapsed / duration;
        if ('in' != move) ratio = 1 - ratio;
        self.$ctx.putImageData(state, 0, 0);
        self.$ctx.globalAlpha = ratio;
        self.$ctx.drawImage(image, x, y, w, h);
        self.$ctx.globalAlpha = 1;
    }, 15).then(function () {
        if (4 == index) self.$ctx.restore();
        if ('in' == move) self.setLayer(index, image);
    });
};

/**
 * 设置开始画面。
 *
 * @param {Object[]} points
 * @return {bigine.runtime.director.canvas.stage}
 */
bigine.runtime.director.canvas.stage.prototype.setStart = function(points) {
    this.setMap(points).$start = true;
    return this;
};

/**
 * 设置地图。
 *
 * @param {Object[]} points
 * @return {bigine.runtime.director.canvas.stage}
 */
bigine.runtime.director.canvas.stage.prototype.setMap = function(points) {
    if (!points) return this;
    var self = this;
    this.$start = false;
    this.$map = [];
    bigine.util.each(points, function (point) {
        point.xw = point.x + point.w;
        point.yh = point.y + point.h;
        self.$map.push(point);
    });
    this.$map.hover = -1;
    return this;
};

/**
 * 设置选择。
 *
 * @param {Object[]} points
 * @param {Object} theme
 * @return {bigine.runtime.director.canvas.stage}
 */
bigine.runtime.director.canvas.stage.prototype.setChoose = function(points, theme) {
    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        i = points[0].i,
        ih = points[0].ih,
        w = i.width,
        h = i.height;
    canvas.width = w;
    canvas.height = h;
    ctx.font = '32px sans-serif';
    ctx.textBaseline = 'top';
    ctx.fillStyle = theme.color;
    ctx.shadowBlur = theme.shadow;
    ctx.shadowColor = '#000';
    ctx.shadowOffsetX = theme.shadow;
    ctx.shadowOffsetY = theme.shadow;
    bigine.util.each(points, function (point, index) {
        var x = (w - ctx.measureText(point.t).width) / 2,
            y = h / 2 - 16;
        points[index].i = new Image();
        points[index].ih = new Image();
        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(i, 0, 0, w, h);
        ctx.fillText(point.t, x, y);
        points[index].i.src = canvas.toDataURL();
        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(ih, 0, 0, w, h);
        ctx.fillText(point.t, x, y);
        points[index].ih.src = canvas.toDataURL();
        delete points[index].t;
    });
    canvas = undefined;
    this.setMap(points).$start = true;
    return this;
};

/**
 * 落幕。
 *
 * @return {bigine.util.promise}
 */
bigine.runtime.director.canvas.stage.prototype.close = function() {
    if (this.$curtain) return promise.resolve();
    this.$curtain = true;
    var self = this,
        state = this.$ctx.getImageData(0, 0, 1280, 720);
    return promise.animate(function (elapsed, duration) {
        self.$ctx.fillStyle = 'rgba(0,0,0,' + elapsed / duration + ')';
        self.$ctx.putImageData(state, 0, 0);
        self.$ctx.fillRect(0, 0, 1280, 720);
    }, 30);
};

/**
 * 开幕。
 *
 * @param  {ImageData} state
 * @return {bigine.util.promise}
 */
bigine.runtime.director.canvas.stage.prototype.open = function(state) {
    if (!this.$curtain) return promise.resolve();
    var self = this;
    return promise.animate(function (elapsed, duration) {
        if (1 == elapsed) {
            self.render();
            if (!state) state = this.$ctx.getImageData(0, 0, 1280, 720);
        }
        self.$ctx.fillStyle = 'rgba(0,0,0,' + (1 - elapsed / duration) + ')';
        if (state) self.$ctx.putImageData(state, 0, 0);
        self.$ctx.fillRect(0, 0, 1280, 720);
    }, 30).then(function () {
        self.$curtain = false;
    });
};

/**
 * 打字。
 *
 * @param  {String} title
 * @param  {Image?} avatar
 * @param  {String} words
 * @param  {Object} theme
 * @return {bigine.util.promise}
 */
bigine.runtime.director.canvas.stage.prototype.type = function(title, avatar, words, theme) {
    var self = this,
        speed = 1, // 打字速度（帧）
        delay = 10, // 阅读延时速度（帧），包含打字耗时
        chars = '',
        masks = '',
        ii,
        stat;
    this.$mask = true;
    for (ii =  stat = 0; ii < words.length; ii++) {
        if ('【' == words[ii]) stat = 1;
        else if ('】' == words[ii]) stat = 0;
        else {
            chars += words[ii];
            masks += stat;
        }
    }
    return new promise(function (resolve) {
        if (self.$text[title]) resolve(self.$text[title]);
        self.$text[title] = new Image();
        bigine.util.on(self.$text[title], 'load', function () {
            resolve(self.$text[title]);
        });
        self.render();
        var w = 1280,
            h = 720,
            state = self.$ctx.getImageData(0, 0, w, h);
        self.$ctx.clearRect(0, 0, w, h);
        self.$ctx.drawImage(theme.back.image, theme.back.left, theme.back.top, theme.back.width, theme.back.height);
        if (avatar && theme.avatar) self.$ctx.drawImage(avatar, theme.avatar.left, theme.avatar.top, theme.avatar.width, theme.avatar.height);
        if (title && theme.name) {
            self.$ctx.save();
            self.$ctx.font = '48px sans-serif';
            self.$ctx.textBaseline = 'top';
            self.$ctx.fillStyle = theme.name.color;
            self.$ctx.shadowBlur = theme.name.shadow;
            self.$ctx.shadowColor = '#000';
            self.$ctx.shadowOffsetX = theme.name.shadow;
            self.$ctx.shadowOffsetY = theme.name.shadow;
            self.$ctx.fillText(title, theme.name.left, theme.name.top);
            self.$ctx.restore();
        }
        self.$text[title].src = self.canvas.toDataURL();
        self.$ctx.putImageData(state, 0, 0);
    }).then(function (image) {
        self.$ctx.drawImage(image, 0, 0);
        self.$ctx.save();
        self.$ctx.font = '32px sans-serif';
        self.$ctx.textBaseline = 'top';
        self.$ctx.shadowBlur = theme.text.shadow;
        self.$ctx.shadowColor = '#000';
        self.$ctx.shadowOffsetX = theme.text.shadow;
        self.$ctx.shadowOffsetY = theme.text.shadow;
        var auto = self.$runtime.episode.auto,
            skip = false,
            offset = 0,
            pos = {
                x: theme.text.left,
                y: theme.text.top,
                x0: theme.text.left
            },
            limit = theme.text.left + theme.text.top,
            q = function () {
                if (auto) return;
                skip = true;
                for (offset++; offset < chars.length; offset++) pos = self.type$char(
                    chars[offset],
                    '1' == masks[offset] ? theme.text.color2 : theme.text.color,
                    pos,
                    limit
                );
            };
        if ('#TIP' == title) {
            auto = false;
            limit = self.$ctx.measureText(chars).width;
            switch (theme.text.align) {
                case 'center':
                    pos.x += theme.text.width / 2 - limit / 2;
                    break;
                case 'right':
                    pos.x += theme.text.width - limit;
                    break;
            }
            offset = -1;
            limit = 9999;
            q = promise.resolve().then(q);
        } else q = promise.race([
                promise.animate(function (elapsed, duration) {
                    if (skip || 1 != speed && 1 != elapsed % speed) return;
                    offset = 1 == speed ? elapsed - 1 : Math.floor(elapsed / speed);
                    pos = self.type$char(
                        chars[offset],
                        '1' == masks[offset] ? theme.text.color2 : theme.text.color,
                        pos,
                        limit
                    );
                }, speed * chars.length),
                promise.click(self.canvas, [13]).then(q)
            ]);
        q = q.then(function () {
            self.$ctx.restore();
        });
        if (auto) return q.tick(chars.length * (delay - speed));
        return q.click(self.canvas, [13]);
    });
};

/**
 * 打一个字。
 *
 * @param  {String} chr
 * @param  {String} color
 * @param  {{x, y, x0}} pos
 * @param  {Number} limit
 * @return {{x, y, x0}}
 */
bigine.runtime.director.canvas.stage.prototype.type$char = function(chr, color, pos, limit) {
    var w = this.$ctx.measureText(chr).width;
    if (w + pos.x > limit) {
        pos.x = pos.x0;
        pos.y += 38;
    }
    this.$ctx.fillStyle = color;
    this.$ctx.fillText(chr, pos.x, pos.y);
    pos.x += w;
    return pos;
};

/**
 * 提示。
 *
 * @param  {String} words
 * @param  {Object} theme
 * @return {bigine.util.promise}
 */
bigine.runtime.director.canvas.stage.prototype.tip = function(words, theme) {
    return this.type('#TIP', undefined, words, theme);
};

/**
 * 清除动态渲染。
 *
 * @return {void}
 */
bigine.runtime.director.canvas.stage.prototype.clear = function() {
    if (this.$mask) this.render();
    this.$mask = false;
};

module.exports = bigine.runtime.director.canvas.stage;
