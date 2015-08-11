/**
 * 定义画布模式运行时场面（视觉、听觉、交互）指挥器组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 DaHao.de
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../../bigine').$namespace('.runtime.director')
    .$import('.error')
    .$import('.util.promise'),
    $,
    promise = bigine.util.promise;

/**
 * 画布模式运行时场面（视觉、听觉、交互）指挥器组件。
 *
 * @return {bigine.runtime.director.canvas}
 * @constructor
 * @extends {bigine.runtime.director}
 */
bigine.runtime.director.canvas = bigine.$extends(bigine.runtime.director, function () {
    bigine.runtime.director.call(this);
    /** @override */
    this.$prototype = 'bigine.runtime.director.canvas';

    /**
     * 舞台组件实例。
     *
     * @type {bigine.runtime.director.canvas.stage}
     */
    this.stage = undefined;
});
$ = bigine.runtime.director.canvas;

/** @inheritDoc */
bigine.runtime.director.canvas.prototype.init = function(runtime) {
    bigine.runtime.director.prototype.init.call(this, runtime);
    var self = this,
        body = window.document.body,
        els = body.querySelectorAll('.bg-player'),
        autoplay = false,
        el = document.createElement('div');
    el.style.backgroundColor = '#000';
    el.innerHTML = '<canvas class="viewport" width="1280" height="720"></canvas>';
    if (els.length) {
        if (els[0].hasAttribute('auto')) {
            autoplay = true;
        }
        els[0].parentNode.replaceChild(el, els[0]);
        el.className = 'bg-player';
    } else {
        autoplay = true;
        body.appendChild(el);
        el.className = 'bg-player fullscreen';
    }
    this.stage = new (bigine.$require('.runtime.director.canvas.stage'))(runtime, el.firstChild.getContext('2d'));
    this.fix();
    return autoplay;
};

/** @inheritDoc */
bigine.runtime.director.canvas.prototype.fix = function() {
    var self = this,
        canvas = this.stage.canvas,
        size = 0,
        styles;
    this.width = canvas.parentNode.clientWidth;
    this.height =  canvas.parentNode.clientHeight;
    size = this.height / 9 * 16;
    if (size > this.width) {
        size = this.width / 16 * 9;
        styles = {
            width: '100%',
            height: size + 'px',
            marginTop: (this.height - size) / 2 + 'px',
            marginLeft: 0
        };
        this.height = size;
    } else if (size < this.width) {
        styles = {
            width: size + 'px',
            height: '100%',
            marginTop: 0,
            marginLeft: (this.width - size) / 2 + 'px'
        };
        this.width = size;
    } else {
        styles = {
            width: '100%',
            height: '100%',
            marginTop: 0,
            marginLeft: 0
        };
    }
    this.stage.zoom = this.height / 720;
    this.runtime.logger.info('[director]', this.width, 'x', this.height, '(', 100 * this.stage.zoom, '%)');
    bigine.util.each(styles, function (value, key) {
        canvas.style[key] = value;
    });
};

/** @inheritDoc */
bigine.runtime.director.canvas.prototype.curtain$show = function() {
    this.runtime.logger.debug('[director] #curtain show');
    return this.stage.close();
};

/** @inheritDoc */
bigine.runtime.director.canvas.prototype.curtain$hide = function() {
    this.runtime.logger.debug('[director] #curtain hide');
    return this.stage.open();
};

/** @inheritDoc */
bigine.runtime.director.canvas.prototype.logo$show = function(url) {
    this.runtime.logger.debug('[director] #logo show');
    var self = this;
    return $.$image(url).then(function (image) {
        self.stage.setLayer(0, image).render();
    });
};

/** @inheritDoc */
bigine.runtime.director.canvas.prototype.logo$hide = function() {
    this.runtime.logger.debug('[director] #logo hide');
    return this.oops();
};

/** @inheritDoc */
bigine.runtime.director.canvas.prototype.start$show = function(bg, btns) {
    this.runtime.logger.debug('[director] #start show');
    var self = this;
    return promise.all([
        $.$image(bg),
        $.$image(btns[0].i),
        $.$image(btns[0].ih),
        $.$image(btns[1].i),
        $.$image(btns[1].ih)
    ]).then(function (images) {
        btns[0].i = images[1];
        btns[0].ih = images[2];
        btns[1].i = images[3];
        btns[1].ih = images[4];
        return self.stage.setLayer(0, images[0]).setStart(btns).render();
    });
};

/** @inheritDoc */
bigine.runtime.director.canvas.prototype.start$hide = function() {
    this.runtime.logger.debug('[director] #start hide');
    return this.oops();
};

/** @inheritDoc */
bigine.runtime.director.canvas.prototype.map$show = function(base, points) {
    this.runtime.logger.debug('[director] #map show', points);
    var self = this,
        q = [];
    bigine.util.each(points, function (point) {
        q.push($.$image($.$url(point.i, 'png')));
    });
    return this.back$show(base).then(function () {
        return promise.all(q);
    }).then(function (images) {
        bigine.util.each(images, function (image, index) {
            points[index].i = image;
        });
        self.stage.setMap(points);
    });
};

/** @inheritDoc */
bigine.runtime.director.canvas.prototype.back$show = function(snap) {
    this.runtime.logger.debug('[director] #back show', snap);
    var self = this;
    return $.$image($.$url(snap, 'jpg')).then(function (image) {
        return self.stage.setLayer(0, image);
    });
};

/** @inheritDoc */
bigine.runtime.director.canvas.prototype.voiceover$show = function(theme, words) {
    this.runtime.logger.debug('[director] #voiceover show', words);
    var self = this;
    return $.$image(theme.back.image).then(function (image) {
        theme.back.image = image;
        return self.stage.type('', false, words, theme);
    });
};

/** @inheritDoc */
bigine.runtime.director.canvas.prototype.voiceover$hide = function() {
    this.runtime.logger.debug('[director] #voiceover hide');
    this.stage.clear();
    return this.oops();
};

/** @inheritDoc */
bigine.runtime.director.canvas.prototype.monolog$show = function(theme, title, avatar, words) {
    this.runtime.logger.debug('[director] #monolog show', words);
    var self = this;
    return promise.all([
        $.$image(theme.back.image),
        avatar ? $.$image($.$url(avatar.src, 'png')) : false
    ]).then(function (images) {
        theme.back.image = images[0];
        return self.stage.type(title, images[1], words, theme);
    });
};

/** @inheritDoc */
bigine.runtime.director.canvas.prototype.monolog$hide = function() {
    this.runtime.logger.debug('[director] #monolog hide');
    this.stage.clear();
    return this.oops();
};

/** @inheritDoc */
bigine.runtime.director.canvas.prototype.speak$show = function(theme, title, avatar, words) {
    this.runtime.logger.debug('[director] #speak show', words);
    var self = this;
    return promise.all([
        $.$image(theme.back.image),
        avatar ? $.$image($.$url(avatar.src, 'png')) : false
    ]).then(function (images) {
        theme.back.image = images[0];
        return self.stage.type(title, images[1], words, theme);
    });
};

/** @inheritDoc */
bigine.runtime.director.canvas.prototype.speak$hide = function() {
    this.runtime.logger.debug('[director] #speak hide');
    this.stage.clear();
    return this.oops();
};

/** @inheritDoc */
bigine.runtime.director.canvas.prototype.tip$show = function(theme, words) {
    this.runtime.logger.debug('[director] #tip show', words);
    var self = this;
    return $.$image(theme.back.image).then(function (image) {
        theme.back.image = image;
        return self.stage.tip(words, theme);
    });
};

/** @inheritDoc */
bigine.runtime.director.canvas.prototype.tip$hide = function() {
    this.runtime.logger.debug('[director] #tip hide');
    this.stage.clear();
    return this.oops();
};

/** @inheritDoc */
bigine.runtime.director.canvas.prototype.chars$set$left = function(pose) {
    this.runtime.logger.debug('[director] #char left set', pose);
    var self = this;
    return $.$image($.$url(pose, 'png')).then(function (image) {
        self.stage.setLayer(1, image);
    });
};

/** @inheritDoc */
bigine.runtime.director.canvas.prototype.chars$set$middle = function(pose) {
    this.runtime.logger.debug('[director] #char middle set', pose);
    var self = this;
    return $.$image($.$url(pose, 'png')).then(function (image) {
        self.stage.setLayer(2, image);
    });
};

/** @inheritDoc */
bigine.runtime.director.canvas.prototype.chars$set$right = function(pose) {
    this.runtime.logger.debug('[director] #char right set', pose);
    var self = this;
    return $.$image($.$url(pose, 'png')).then(function (image) {
        self.stage.setLayer(3, image);
    });
};

/** @inheritDoc */
bigine.runtime.director.canvas.prototype.chars$in$left = function(pose) {
    this.runtime.logger.debug('[director] #char left in', pose);
    var self = this;
    return $.$image($.$url(pose, 'png')).then(function (image) {
        return self.stage.animateLayer(1, image);
    });
};

/** @inheritDoc */
bigine.runtime.director.canvas.prototype.chars$in$middle = function(pose) {
    this.runtime.logger.debug('[director] #char middle in', pose);
    var self = this;
    return $.$image($.$url(pose, 'png')).then(function (image) {
        return self.stage.animateLayer(2, image);
    });
};

/** @inheritDoc */
bigine.runtime.director.canvas.prototype.chars$in$right = function(pose) {
    this.runtime.logger.debug('[director] #char right in', pose);
    var self = this;
    return $.$image($.$url(pose, 'png')).then(function (image) {
        return self.stage.animateLayer(3, image);
    });
};

/** @inheritDoc */
bigine.runtime.director.canvas.prototype.chars$out$left = function() {
    this.runtime.logger.debug('[director] #char left out');
    return this.stage.animateLayer(1);
};

/** @inheritDoc */
bigine.runtime.director.canvas.prototype.chars$out$middle = function() {
    this.runtime.logger.debug('[director] #char middle out');
    return this.stage.animateLayer(2);
};

/** @inheritDoc */
bigine.runtime.director.canvas.prototype.chars$out$right = function() {
    this.runtime.logger.debug('[director] #char right out');
    return this.stage.animateLayer(3);
};

/** @inheritDoc */
bigine.runtime.director.canvas.prototype.cg$show = function(image) {
    this.runtime.logger.debug('[director] #cg show', image);
    var self = this;
    return $.$image($.$url(image, 'jpg')).then(function (image) {
        return self.stage.animateLayer(4, image);
    }).click(this.stage.canvas, [13]);
};

/** @inheritDoc */
bigine.runtime.director.canvas.prototype.cg$hide = function() {
    this.runtime.logger.debug('[director] #cg hide');
    return this.stage.animateLayer(4);
};

/** @inheritDoc */
bigine.runtime.director.canvas.prototype.choose$show = function(theme, options) {
    this.runtime.logger.debug('[director] #choose show', options);
    if (!options.length) return promise.resolve(false);
    var self = this;
    return promise.all([
        $.$image(options[0].i),
        $.$image(options[0].ih)
    ]).then(function (images) {
        var margin = 16,
            height = (images[0].height + margin) * options.length - margin,
            top = 360 - height / 2;
        return new promise(function (resolve) {
            bigine.util.each(options, function (option, index) {
                options[index].i = images[0];
                options[index].ih = images[1];
                options[index].c = resolve;
                options[index].y = top + index * (images[0].height + margin);
                options[index].h = images[0].height;
            });
            self.stage.setChoose(options, theme).render();
        });
    });
};

/** @inheritDoc */
bigine.runtime.director.canvas.prototype.bgm$play = function(id) {
    bigine.runtime.director.prototype.bgm$play.call(this, id);
    if (id) this.bgm.src = $.$url(id, 'mp3');
    return this.oops();
};

/** @inheritDoc */
bigine.runtime.director.canvas.prototype.se$play = function(id) {
    bigine.runtime.director.prototype.se$play.call(this, id);
    if (id) this.se.src = $.$url(id, 'mp3');
    return this.oops();
};

/** @inheritDoc */
bigine.runtime.director.canvas.prototype.end$show = function(base, cover) {
    this.runtime.logger.debug('[director] #end show');
    var self = this;
    return promise.all([
        $.$image(base),
        $.$image(cover)
    ]).then(function (images) {
        self.stage.setLayer(0, images[0]).setLayer(5, images[1]).render();
    });
};

/** @inheritDoc */
bigine.runtime.director.canvas.prototype.end$hide = function() {
    this.runtime.logger.debug('[director] #end hide');
    return this.oops();
};

/** @inheritDoc */
bigine.runtime.director.canvas.prototype.rank$show = function(base, cover) {
    this.runtime.logger.debug('[director] #rank show');
    var self = this;
    return promise.all([
        $.$image(base),
        $.$image(cover)
    ]).then(function (images) {
        self.stage.setLayer(0, images[0]).setLayer(5, images[1]).render();
    });
};

/**
 * 下载图片。
 *
 * @param  {String} src
 * @return {bigine.util.promise}
 */
bigine.runtime.director.canvas.$image = function(src) {
    return new promise(function (resolve) {
        if (src instanceof Image) return resolve(src);
        var img = new Image();
        bigine.util.on(img, 'load', function () {
            resolve(img);
        });
        img.src = src;
    });
};

/**
 * 获取远端素材 URL 。
 *
 * @param  {String} id
 * @param  {String} type
 * @return {String}
 */
bigine.runtime.director.canvas.$url = function(id, type) {
    var url = 'http://a' + (parseInt(id[0], 16) % 8 + 1) + '.dahao.de/' + id + '/';
    if ('mp3' == type) {
        return url + '128.mp3';
    }
    return url + 'origin.' + type;
};

module.exports = bigine.runtime.director.canvas;
