/**
 * 定义传统模式运行时场面（视觉、听觉、交互）指挥器组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 DaHao.de
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../../bigine').$namespace('.runtime.director')
    .$import('.error')
    .$import('.runtime.event.new')
    .$import('.runtime.event.continue')
    .$import('.util.promise'),
    $,
    promise = bigine.util.promise;

/**
 * 传统模式运行时场面（视觉、听觉、交互）指挥器组件。
 *
 * @return {bigine.runtime.director.classic}
 * @constructor
 * @extends {bigine.runtime.director}
 */
bigine.runtime.director.classic = bigine.$extends(bigine.runtime.director, function () {
    bigine.runtime.director.call(this);
    /** @override */
    this.$prototype = 'bigine.runtime.director.classic';

    /**
     * 缩放比例。
     *
     * @type {Number}
     */
    this.zoom = 1;

    /**
     * 视区宽度。
     *
     * @type {Number}
     */
    this.width =

    /**
     * 视区高度。
     *
     * @type {Number}
     */
    this.height = 0;

    /**
     * 页面视区元素。
     *
     * @type {HTMLElement}
     */
    this.viewport = undefined;

    /**
     * 是否已开始播放。
     *
     * @type {Bool}
     */
    this.began = false;

    /**
     * 高亮色。
     *
     * @type {Object<String>}
     */
    this.hilite = {};
});

$ = bigine.runtime.director.classic;

/** @inheritDoc */
bigine.runtime.director.classic.prototype.init = function(runtime) {
    this.runtime = runtime;
    var self = this,
        body = window.document.body,
        els = body.querySelectorAll('.bg-player'),
        size,
        el = $.$div('bg-player', {
            viewport: 0
        }),
        autoplay = false;
    this.viewport = el.$_viewport;
    if (els.length) {
        if (els[0].hasAttribute('auto')) {
            autoplay = true;
        }
        els[0].parentNode.replaceChild(el, els[0]);
    } else {
        autoplay = true;
        body.appendChild(el);
        el.className = 'bg-player fullscreen';
    }
    this.fix();
    runtime.episode.$on('ready', function () {
        runtime.logger.info(' [episode] ready');
        self.$monolog$render();
        self.$monolog$render();
        self.$voiceover$render();
        if (self.began) {
            self.$play();
        }
        self.began = true;
    }).$ready().fail(function (error) {
        self.runtime.logger.error(error);
    });
    return autoplay;
};

/** @inheritDoc */
bigine.runtime.director.classic.prototype.fix = function() {
    this.width = this.viewport.parentNode.clientWidth;
    this.height = this.viewport.parentNode.clientHeight;
    size = this.height / 9 * 16;
    if (size > this.width) {
        size = this.width / 16 * 9;
        size = {
            width: '100%',
            height: size + 'px',
            marginTop: (this.height - size) / 2 + 'px'
        };
        this.height = size;
    } else if (size < this.width) {
        this.width = size;
        size = {
            width: size + 'px',
            height: '100%',
            marginTop: 0
        };
    } else {
        size = {
            width: '100%',
            height: '100%',
            marginTop: 0
        };
    }
    this.zoom = this.height / 720;
    this.runtime.logger.info('[director]', this.width, 'x', this.height, '(', (this.zoom * 100), '%)');
    $.$style(this.viewport, size);
};

/**
 * 创建 DIV 元素。
 *
 * @param  {(String|HTMLElement|Array<String>)} className
 * @param  {Object<String, Object>=} children
 * @return {HTMLElement}
 * @static
 */
bigine.runtime.director.classic.$div = function(className, children) {
    var el = $.$element('div');
    if (bigine.util.isString(className)) {
        el.className = className;
    } else {
        el.className = className.join(' ');
    }
    bigine.util.each(children || {}, $.$div.$append, el);
    return el;
};

/**
 * 创建元素。
 *
 * @param  {String} tagName
 * @return {HTMLElement}
 * @static
 */
bigine.runtime.director.classic.$element = function(tagName) {
    return window.document.createElement(tagName);
};

/**
 * 添加子元素。
 *
 * @this   {HTMLElement}
 * @param  {Object<String, Object>} item
 * @param  {String} index
 * @return {void}
 * @static
 */
bigine.runtime.director.classic.$div.$append = function(item, index) {
    var el = $.$div(index, item);
    this.appendChild(el);
    if (bigine.util.isString(index)) {
        this['$_' + index] = el;
    }
};

/**
 * 调整样式。
 *
 * @param  {HTMLElement} element
 * @param  {Object} changeset
 * @return {HTMLElement}
 * @static
 */
bigine.runtime.director.classic.$style = function(element, changeset) {
    bigine.util.each(changeset, $.$style.$apply, element);
    return element;
};

/**
 * 调整单条样式。
 *
 * @this   {HTMLElement}
 * @param  {?} value
 * @param  {String} key
 * @return {void}
 * @static
 */
bigine.runtime.director.classic.$style.$apply = function(value, key) {
    switch (key) {
        case 'opacity':
            if (bigine.util.isDefined(this.style.opacity)) {
                this.style.opacity = value;
            } else {
                this.style.filter = 'alpha(opacity=' + 100 * value + ')';
            }
            break;
        default:
            this.style[key] = value;
    }
};

/** @inheritDoc */
bigine.runtime.director.classic.prototype.play = function() {
    this.runtime.logger.info('  [player] PLAY');
    var self = this;
    this.$curtain$show().delay(500).then(function () {
        return self.$logo$show();
    }).then(function () {
        return self.$curtain$hide();
    }).delay(2000).then(function () {
        return self.$curtain$show();
    }).then(function () {
        return self.$logo$hide();
    }).then(function () {
        if (!self.began) {
            self.began = true;
        } else {
            self.$play();
        }
    });
    return this;
};

/**
 * 显示 LOGO 。
 *
 * @return {bigine.util.promise}
 */
bigine.runtime.director.classic.prototype.$logo$show = function() {
    this.$logo$render();
    this.runtime.logger.debug('[director] #logo show');
    $.$show(this.viewport.$logo);
    return this.oops();
};

/**
 * 渲染 LOGO 。
 *
 * @return {void}
 */
bigine.runtime.director.classic.prototype.$logo$render = function() {
    this.$logo$render = bigine.util.noop;
    this.runtime.logger.debug('[director] #logo render');
    this.viewport.$logo = this.viewport.appendChild($.$div('logo'));
    this.viewport.$logo.innerHTML = '<img src="data:image/png;base64,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">';
};

/**
 * 隐藏 LOGO 。
 *
 * @return {bigine.util.promise}
 */
bigine.runtime.director.classic.prototype.$logo$hide = function() {
    this.runtime.logger.debug('[director] #logo hide');
    $.$hide(this.viewport.$logo);
    return this.oops();
};

/**
 * 显示元素。
 *
 * @param  {...HTMLElement} element
 * @return {void}
 * @static
 */
bigine.runtime.director.classic.$show = function(element) {
    for (var ii = 0; ii < arguments.length; ii++) {
        if (arguments[ii]) {
            arguments[ii].style.display = 'block';
        }
    }
};

/**
 * 隐藏元素。
 *
 * @param  {HTMLElement} element
 * @return {void}
 * @static
 */
bigine.runtime.director.classic.$hide = function(element) {
    for (var ii = 0; ii < arguments.length; ii++) {
        if (arguments[ii]) {
            arguments[ii].style.display = 'none';
        }
    }
};

/**
 * 播放。
 *
 * 此方法会在作品准备就绪且点击播放按钮后执行。
 *
 * @return {void}
 */
bigine.runtime.director.classic.prototype.$play = function() {
    this.$bgm$render();
    this.$se$render();
    if (this.runtime.episode.auto) {
        var self = this;
        this.runtime.logger.info(' [runtime] AUTOSTART');
        this.$bgm$activate();
        this.$se$activate();
        this.$curtain$show().then(function () {
            return self.$start$hide();
        }).then(function () {
            self.runtime.dispatch(new bigine.runtime.event['new']());
        });
    } else {
        this.$start$show();
    }
};

/**
 * 显示开始界面。
 *
 * @return {bigine.util.promise}
 */
bigine.runtime.director.classic.prototype.$start$show = function() {
    this.$start$render();
    this.runtime.logger.debug('[director] #start show');
    return this.oops();
};

/**
 * 绘制开始界面。
 *
 * @return {void}
 */
bigine.runtime.director.classic.prototype.$start$render = function() {
    this.$start$render = bigine.util.noop();
    this.runtime.logger.debug('[director] #start render');
    this.viewport.$start = this.viewport.appendChild($.$div('start', {
        'new': 0,
        load: 0
    }));
    var self = this,
        theme = this.runtime.episode.theme.start,
        el;
    el = $.$element('img');
    el.src = theme.image;
    this.viewport.$start.appendChild(el);
    this.viewport.$start.$new = this.viewport.$start.$_new;
    this.viewport.$start.$new.appendChild($.$element('img'));
    this.viewport.$start.$load = this.viewport.$start.$_load;
    this.viewport.$start.$load.appendChild($.$element('img'));
    bigine.util.on(this.$style(this.viewport.$start.$new, theme['new']), 'click', function() {
        self.runtime.logger.info('  [player] NEW');
        self.$bgm$activate();
        self.$se$activate();
        self.$curtain$show().then(function () {
            return self.$start$hide();
        }).then(function () {
            self.runtime.dispatch(new bigine.runtime.event['new']());
        });
    });
    bigine.util.on(this.$style(this.viewport.$start.$load, theme.load), 'click', function() {
        self.runtime.logger.info('  [player] LOAD');
        self.$bgm$activate();
        self.$se$activate();
        self.$curtain$show().then(function () {
            return self.$start$hide();
        }).then(function () {
            self.runtime.dispatch(new bigine.runtime.event['continue']());
        });
    });
};

/**
 * 应用主题样式。
 *
 * 此方法会根据比例自动缩放尺寸。
 *
 * @param  {HTMLElement} element
 * @param  {Object<String, ?>} changeset
 * @return {HTMLElement}
 */
bigine.runtime.director.classic.prototype.$style = function(element, changeset) {
    var context = {
        element: element,
        zoom: this.zoom
    };
    bigine.util.each(changeset, $.$style$apply, context);
    return element;
};

/**
 * 应用单条主题样式。
 *
 * @this {{element:HTMLElement, zoom:Number}}
 * @param  {?} value
 * @param  {String} key
 * @return {void}
 * @static
 */
bigine.runtime.director.classic.$style$apply = function(value, key) {
    var self = this,
        el;
    switch (key) {
        case 'top':
        case 'bottom':
        case 'height':
            this.element.style[key] = value / 7.2 + '%';
            return;
        case 'left':
        case 'right':
        case 'width':
            this.element.style[key] = value / 12.8 + '%';
            return;
        case 'image':
            if ('IMG' == this.element.tagName) {
                el = this.element;
            } else {
                el = this.element.getElementsByTagName('img');
                el = el.length ? el[0] : undefined;
            }
            if (el) {
                el.src = value;
            }
            return;
        case 'hover':
            if ('IMG' == this.element.tagName) {
                el = this.element;
            } else {
                el = this.element.getElementsByTagName('img');
                el = el.length ? el[0] : undefined;
            }
            if (el) {
                bigine.util.on(el.parentNode, 'mouseenter', function () {
                    el.setAttribute('data-src', el.src);
                    el.src = value;
                });
                bigine.util.on(el.parentNode, 'mouseleave', function () {
                    el.src = el.getAttribute('data-src');
                });
            }
            return;
        case 'color0':
            this.element.style.backgroundColor = value;
            return;
        case 'color2':
            return;
        case 'opacity':
            $.$style.$apply.call(this.element, value, key);
            return;
        case 'shadow':
            value = (this.zoom * value);
            this.element.style.textShadow = '0 0 ' + value + 'px #000, 0 ' + (value / 2) + 'px ' + (value / 2) + 'px #000';
            return;
        case 'shadow0':
            value = (this.zoom * value);
            this.element.style.boxShadow = value + 'px ' + value + 'px ' + value + 'px #000';
            return;
        case 'align':
            this.element.style.textAlign = value;
            return;
        case 'bold':
            this.element.style.fontWeight = 'bolder';
            return;
        default:
            this.element.style[key] = value;
    }
};

/**
 * 显示幕帘。
 *
 * @return {bigine.util.promise}
 */
bigine.runtime.director.classic.prototype.$curtain$show = function() {
    this.$curtain$render();
    this.runtime.logger.debug('[director] #curtain show');
    if (this.curtain) {
        return this.oops();
    }
    this.curtain = true;
    if (this.viewport.$se) {
        this.viewport.$se.src = 'http://s.dahao.de/oops.mp3';
    }
    var self = this;
    return $.$fade$in(this.viewport.$curtain, 25); // 1 tick = 20 ms
};

/**
 * 绘制幕帘。
 *
 * @return {void}
 */
bigine.runtime.director.classic.prototype.$curtain$render = function() {
    this.$curtain$render = bigine.util.noop;
    this.runtime.logger.debug('[director] #curtain render');
    this.viewport.$curtain = this.viewport.appendChild($.$div('curtain'));
};

/**
 * 动画：淡入显示元素。
 *
 * @param  {HTMLElement} element
 * @param  {Number} frames
 * @return {bigine.util.promise}
 */
bigine.runtime.director.classic.$fade$in = function(element, frames) {
    return promise.tick(function (counter) {
        if (1 == counter) {
            $.$show(element);
        }
        $.$style.$apply.call(element, counter / frames, 'opacity');
    }, frames);
};

/**
 * 隐藏开始界面。
 *
 * @return {bigine.util.promise}
 */
bigine.runtime.director.classic.prototype.$start$hide = function() {
    this.runtime.logger.debug('[director] #start hide');
    $.$hide(this.viewport.$start);
    return this.oops();
};

/** @inheritDoc */
bigine.runtime.director.classic.prototype.setRoom = function(metas, context) {
    this.room = metas.room;
    if (this.room.interactive) {
        return this.$map$show(this.room.interactive.map).pass(context);
    }
    return this.setTime({time: this.time}, context);
};

/**
 * 设置地图。
 *
 * @param  {bigine.entity.map} map
 * @return {bigine.util.promise}
 */
bigine.runtime.director.classic.prototype.$map$show = function(map) {
    this.$map$render();
    this.runtime.logger.debug('[director] #map show', map);
    this.viewport.$map.innerHTML = '';
    this.viewport.$map.$hilite = this.viewport.$map.appendChild($.$div('hilite'));
    bigine.util.each(map.points, $.$map$show$point, this);
    $.$show(this.viewport.$map);
    return this.$back$show(map.image.src);
};

/**
 * 设置地图交互点。
 *
 * @this   {bigine.runtime.director.classic}
 * @param  {bigine.entity.map.point} point
 * @param  {String} index
 * @return {void}
 * @static
 */
bigine.runtime.director.classic.$map$show$point = function(point, index) {
    if ('length' == index) {
        return;
    }
    var self = this,
        el = bigine.util.on(this.viewport.$map.appendChild($.$div('point')), {
            mouseenter: function() {
                self.runtime.logger.debug('[director] #map hover', point);
                self.viewport.$map.$hilite.innerHTML = '<img src="' + $.$url(point.image.src, 'png') + '">';
            },
            mouseleave: function() {
                self.viewport.$map.$hilite.innerHTML = '';
            },
            click: function() {
                point.target.room.enter(self.runtime).fail(function (error) {
                    self.runtime.logger.error(error);
                });
            }
        });
        $.$style(el, {
            left: point.region.left / 19.2 + '%',
            top: point.region.top / 10.8 + '%',
            width: (1920 - point.region.right - point.region.left) / 19.2 + '%',
            height: (1080 - point.region.bottom - point.region.top) / 10.8 + '%'
        });
};

/**
 * 绘制地图。
 *
 * @return {void}
 */
bigine.runtime.director.classic.prototype.$map$render = function() {
    this.$map$render = bigine.util.noop;
    this.$back$render();
    this.runtime.logger.debug('[director] #map render');
    this.viewport.$map = this.viewport.appendChild($.$div('map'));
};

/**
 * 绘制背景。
 *
 * @return {void}
 */
bigine.runtime.director.classic.prototype.$back$render = function() {
    this.$back$render = bigine.util.noop;
    this.runtime.logger.debug('[director] #back render');
    this.viewport.$back = this.viewport.appendChild($.$div('back'));
};

/** @inheritDoc */
bigine.runtime.director.classic.prototype.setTime = function(metas, context) {
    this.time = metas.time;
    if (this.room) {
        this.room.time = this.time;
        return this.$back$show(this.room.snaps[this.time] || this.room.snaps['']).pass(context);
    }
    return this.oops(context);
};

/**
 * 显示背景。
 *
 * @param  {String} snap
 * @return {bigine.util.promise}
 */
bigine.runtime.director.classic.prototype.$back$show = function(snap) {
    this.$back$render();
    this.runtime.logger.debug('[director] #back show', snap);
    this.viewport.$back.innerHTML = '<img src="' + $.$url(snap, 'jpg') + '">';
    return this.oops();
};

/**
 * 获取远端素材 URL 。
 *
 * @param  {String} id
 * @param  {String} type
 * @return {String}
 */
bigine.runtime.director.classic.$url = function(id, type) {
    var url = 'http://a' + (parseInt(id[0], 16) % 8 + 1) + '.dahao.de/' + id + '/';
    if ('mp3' == type) {
        return url + '128.mp3';
    }
    return url + 'origin.' + type;
};

/** @inheritDoc */
bigine.runtime.director.classic.prototype.voiceover = function(metas, context) {
    var self = this;
    return this.$curtain$hide().then(function () {
        self.$se$cd();
        return self.$voiceover$show(context.state.convert(metas.words));
    }).then(function () {
        return self.$voiceover$hide();
    }).then(function () {
        self.viewport.$voiceover.className = 'voiceover';
        return context;
    });
};

/**
 * 隐藏对白。
 *
 * @return {bigine.util.promise}
 */
bigine.runtime.director.classic.prototype.$speak$hide = function() {
    this.$speak$render();
    this.runtime.logger.debug('[director] #speak hide');
    $.$hide(this.viewport.$speak);
    return this.oops();
};

/**
 * 绘制对白。
 *
 * @return {void}
 */
bigine.runtime.director.classic.prototype.$speak$render = function() {
    this.$speak$render = bigine.util.noop;
    this.runtime.logger.debug('[director] #speak render');
    var theme = this.runtime.episode.theme.speak,
        el = this.viewport.appendChild($.$div('words', {
            speak: 0
        }));
    this.viewport.$words = el;
    this.viewport.$speak = el.$_speak;
    bigine.util.each(theme, $.$speak$render$unit, this);
    this.hilite.speak = theme.text.color2;
};

/**
 * 绘制对白部件。
 *
 * @this   {bigine.runtime.director.classic}
 * @param  {Object} styles
 * @param  {String} className
 * @return {void}
 * @static
 */
bigine.runtime.director.classic.$speak$render$unit = function (styles, className) {
    var el;
    if (styles.image) {
        el = $.$element('img');
        el.className = className;
    } else {
        el = $.$div(className);
    }
    switch (className) {
        case 'text':
            this.viewport.$speak.$text = el;
            break;
        case 'name':
            this.viewport.$speak.$name = el;
            break;
        case 'avatar':
            this.viewport.$speak.$avatar = el;
            break;
    }
    this.viewport.$speak.appendChild(this.$style(el, styles));
};

/**
 * 隐藏独白。
 *
 * @return {bigine.util.promise}
 */
bigine.runtime.director.classic.prototype.$monolog$hide = function() {
    this.$monolog$render();
    this.runtime.logger.debug('[director] #monolog hide');
    $.$hide(this.viewport.$monolog);
    return this.oops();
};

/**
 * 绘制独白。
 *
 * @return {void}
 */
bigine.runtime.director.classic.prototype.$monolog$render = function() {
    this.$monolog$render = bigine.util.noop;
    this.runtime.logger.debug('[director] #monolog render');
    if (!this.runtime.episode.theme.monolog) {
        this.$speak$render();
        this.viewport.$monolog = this.viewport.$speak;
        this.hilite.monolog = this.hilite.speak;
        return;
    }
    this.$speak$render();
    this.viewport.$monolog = $.$div('monolog');
    this.viewport.$speak.parentNode.appendChild(this.viewport.$monolog);
    bigine.util.each(this.runtime.episode.theme.monolog, $.$monolog$render$unit, this);
    this.hilite.monolog = this.runtime.episode.theme.monolog.text.color2;
};

/**
 * 绘制独白部件。
 *
 * @this   {bigine.runtime.director.classic}
 * @param  {Object} styles
 * @param  {String} className
 * @return {void}
 * @static
 */
bigine.runtime.director.classic.$monolog$render$unit = function (styles, className) {
    var el;
    if (styles.image) {
        el = $.$element('img');
        el.className = className;
    } else {
        el = $.$div(className);
    }
    switch (className) {
        case 'text':
            this.viewport.$monolog.$text = el;
            break;
        case 'name':
            this.viewport.$monolog.$name = el;
            break;
        case 'avatar':
            this.viewport.$monolog.$avatar = el;
            break;
    }
    this.viewport.$monolog.appendChild(this.$style(el, styles));
};

/**
 * 显示旁白。
 *
 * @param  {String} words
 * @return {bigine.util.promise}
 */
bigine.runtime.director.classic.prototype.$voiceover$show = function(words) {
    this.$voiceover$render();
    this.runtime.logger.debug('[director] #voiceover show', words);
    this.viewport.$voiceover.$text.innerHTML = '';
    this.viewport.$voiceover.className = 'voiceover active';
    $.$show(this.viewport.$voiceover);
    return this.$type($.$hilite(words, this.hilite.voiceover), this.viewport.$voiceover.$text);
};

/**
 * 显示文字。
 *
 * @param  {String} words
 * @param  {HTMLElement} container
 * @return {bigine.util.promise}
 */
bigine.runtime.director.classic.prototype.$type = function(words, container) {
    var duration = 5,
        buff = '',
        hon = '',
        hoff = '</span>',
        nodes = [],
        h = false,
        ii, jj;
    for (ii = 0; ii < words.length; ii++) {
        if ('<span ' == words.substr(ii, 6)) {
            if (!hon) {
                jj = words.indexOf('">', ii);
                hon = words.substring(ii, 2 + jj);
            }
            h = true;
            ii += hon.length - 1;
            continue;
        }
        if ('<' == words[ii]) {
            h = false;
            ii += 6;
            continue;
        }
        nodes.push([words[ii], h]);
    }
    h = false;
    jj = promise.tick(function (index, times) {
        if (index == times) {
            index++;
        }
        if (h || ((index - 1) % duration)) {
            return;
        }
        index = (index - 1) / duration;
        var words = '',
            ii;
        for (ii = 0; ii < index; ii++) {
            if (nodes[ii][1]) {
                words += hon + nodes[ii][0] + hoff;
            } else {
                words += nodes[ii][0];
            }
        }
        container.innerHTML = words.replace(hoff + hon, '');
    }, duration * nodes.length);
    if (this.runtime.episode.auto) {
        return jj.delay(1000);
    }
    jj = promise.race([
        jj,
        promise.click(this.viewport, [13]).then(function () {
            h = true;
            container.innerHTML = words;
        })
    ]);
    return jj.click(this.viewport, [13]);
};

/**
 * 高亮关键词。
 *
 * @param  {String} words
 * @param  {String=} color
 * @return {String}
 * @static
 */
bigine.runtime.director.classic.$hilite = function(words, color) {
    return words.replace(/<[^>]*>/g, '').replace(/【([^】]+)】/g, function (match, p1) {
        if (!color) {
            return p1;
        }
        return '<span style="color:' + color + '">' + p1 + '</span>';
    });
};

/**
 * 绘制旁白。
 *
 * @return {void}
 */
bigine.runtime.director.classic.prototype.$voiceover$render = function() {
    this.$voiceover$render = bigine.util.noop;
    this.runtime.logger.debug('[director] #voiceover render');
    if (!this.runtime.episode.theme.voiceover) {
        this.$monolog$render();
        this.viewport.$voiceover = this.viewport.$monolog;
        this.hilite.voiceover = this.hilite.monolog;
        return;
    }
    this.$speak$render();
    this.viewport.$voiceover = $.$div('voiceover');
    this.viewport.$speak.parentNode.appendChild(this.viewport.$voiceover);
    bigine.util.each(this.runtime.episode.theme.voiceover, $.$voiceover$render$unit, this);
    this.hilite.voiceover = this.runtime.episode.theme.voiceover.text.color2;
};

/**
 * 绘制旁白部件。
 *
 * @this   {bigine.runtime.director.classic}
 * @param  {Object} styles
 * @param  {String} className
 * @return {void}
 * @static
 */
bigine.runtime.director.classic.$voiceover$render$unit = function (styles, className) {
    var el;
    if (styles.image) {
        el = $.$element('img');
        el.className = className;
    } else {
        el = $.$div(className);
    }
    this.viewport.$voiceover.appendChild(this.$style(el, styles));
    if ('text' == className) {
        this.viewport.$voiceover.$text = el;
    }
};

/**
 * 隐藏幕帘。
 *
 * @return {bigine.util.promise}
 */
bigine.runtime.director.classic.prototype.$curtain$hide = function() {
    if (!this.curtain) {
        return this.oops();
    }
    this.curtain = false;
    this.runtime.logger.debug('[director] #curtain hide');
    var self = this;
    return $.$fade$out(this.viewport.$curtain, 25); // 1 tick = 20 ms
};

/**
 * 动画：淡出隐藏元素。
 *
 * @param  {HTMLElement} element
 * @param  {Number} frames
 * @return {bigine.util.promise}
 */
bigine.runtime.director.classic.$fade$out = function(element, frames) {
    return promise.tick(function (counter) {
        if (counter == frames) {
            $.$hide(element);
            $.$style.$apply.call(element, 1, 'opacity');
            return;
        }
        $.$style.$apply.call(element, 1 - counter / frames, 'opacity');
    }, frames);
};

/** @inheritDoc */
bigine.runtime.director.classic.prototype.charTowards = function(metas, context) {
    switch (metas.position) {
        case bigine.runtime.director.POS_LEFT:
            if (this.leftChar) {
                return promise.reject(new bigine.error('左位已有人物'));
            }
            this.leftChar = metas.character;
            break;
        case bigine.runtime.director.POS_RIGHT:
            if (this.rightChar) {
                return promise.reject(new bigine.error('右位已有人物'));
            }
            this.rightChar = metas.character;
            break;
        default:
            if (this.middleChar) {
                return promise.reject(new bigine.error('中位已有人物'));
            }
            this.middleChar = metas.character;
    }
    var self = this;
    return this.$curtain$hide().then(function () {
        return self.$chars$animate(metas.character);
    }).pass(context);
};

/**
 * 动画显示人物。
 *
 * @param  {bigine.entity.character} character
 * @return {bigine.util.promise}
 */
bigine.runtime.director.classic.prototype.$chars$animate = function(character) {
    this.$chars$render();
    var id = character.poses[character.pose] || character.poses[''];
    switch (character.position) {
        case bigine.runtime.director.POS_LEFT:
            return this.$chars$animate$left(id);
        case bigine.runtime.director.POS_RIGHT:
            return this.$chars$animate$right(id);
    }
    return this.$chars$animate$middle(id);
};

/**
 * 绘制人物。
 *
 * @return {void}
 */
bigine.runtime.director.classic.prototype.$chars$render = function() {
    this.$chars$render = bigine.util.noop;
    this.runtime.logger.debug('[director] #chars render');
    this.viewport.$chars = this.viewport.appendChild($.$div('chars', {
        cleft: 0,
        cmiddle: 0,
        cright: 0
    }));
    this.viewport.$chars.$left = this.viewport.$chars.$_cleft;
    this.viewport.$chars.$middle = this.viewport.$chars.$_cmiddle;
    this.viewport.$chars.$right = this.viewport.$chars.$_cright;
};

/**
 * 动画显示中位人物。
 *
 * @param  {String} pose
 * @return {bigine.util.promise}
 */
bigine.runtime.director.classic.prototype.$chars$animate$middle = function(pose) {
    this.runtime.logger.debug('[director] #chars middle animate', pose);
    this.viewport.$chars.$middle.innerHTML = '<img src="' + $.$url(pose, 'png') + '">';
    this.viewport.$chars.$middle.style.top = '23.5%';
    return promise.all([
        $.$fade$in(this.viewport.$chars.$middle, 10),
        $.$climb(this.viewport.$chars.$middle, - this.height * 0.075, 10)
    ]);
};

/**
 * 动画：纵向移动元素。
 *
 * @param  {HTMLElement} element
 * @param  {Number} distance
 * @param  {Number} frames
 * @return {bigine.util.promise}
 */
bigine.runtime.director.classic.$climb = function(element, distance, frames) {
    return promise.tick(function (counter) {
        if (1 == counter) {
            $.$show(element);
        }
        element.style.top = 100 * (distance / frames + element.offsetTop) / element.parentNode.clientHeight + '%';
    }, frames);
};

/**
 * 动画显示左位人物。
 *
 * @param  {String} pose
 * @return {bigine.util.promise}
 */
bigine.runtime.director.classic.prototype.$chars$animate$left = function(pose) {
    this.runtime.logger.debug('[director] #chars left animate', pose);
    this.viewport.$chars.$left.innerHTML = '<img src="' + $.$url(pose, 'png') + '">';
    this.viewport.$chars.$left.style.left = 0;
    var self = this;
    return promise.all([
        $.$fade$in(this.viewport.$chars.$left, 10),
        $.$move(this.viewport.$chars.$left, this.width * 0.025, 10)
    ]);
};

/**
 * 动画：横向移动元素。
 *
 * @param  {HTMLElement} element
 * @param  {Number} distance
 * @param  {Number} frames
 * @return {bigine.util.promise}
 */
bigine.runtime.director.classic.$move = function(element, distance, frames) {
    return promise.tick(function (counter) {
        if (1 == counter) {
            $.$show(element);
        }
        element.style.left = 100 * (distance / frames + element.offsetLeft) / element.parentNode.clientWidth + '%';
    }, frames);
};

/**
 * 动画显示右位人物。
 *
 * @param  {String} pose
 * @return {bigine.util.promise}
 */
bigine.runtime.director.classic.prototype.$chars$animate$right = function(pose) {
    this.runtime.logger.debug('[director] #chars right animate', pose);
    this.viewport.$chars.$right.innerHTML = '<img src="' + $.$url(pose, 'png') + '">';
    this.viewport.$chars.$right.style.left = '70%';
    return promise.all([
        $.$fade$in(this.viewport.$chars.$right, 10),
        $.$move(this.viewport.$chars.$right, - this.width * 0.025, 10)
    ]);
};

/** @inheritDoc */
bigine.runtime.director.classic.prototype.speak = function(metas, context) {
    var self = this;
    return this.$curtain$hide().then(function () {
        self.$se$cd();
        return self.$speak$show(metas.nick || metas.from.title, metas.from.avatar, context.state.convert(metas.words));
    }).then(function () {
        return self.$speak$hide();
    }).then(function () {
        self.viewport.$speak.className = 'speak';
        return context;
    });
};

/**
 * 隐藏旁白。
 *
 * @return {bigine.util.promise}
 */
bigine.runtime.director.classic.prototype.$voiceover$hide = function() {
    this.$voiceover$render();
    this.runtime.logger.debug('[director] #voiceover hide');
    $.$hide(this.viewport.$voiceover);
    return this.oops();
};

/**
 * 显示对白。
 *
 * @param  {String} name
 * @param  {{src}=} avatar
 * @param  {String} words
 * @return {bigine.util.promise}
 */
bigine.runtime.director.classic.prototype.$speak$show = function(name, avatar, words) {
    this.$speak$render();
    if (avatar) {
        avatar = avatar.src;
    }
    this.runtime.logger.debug('[director] #speak show', name, words);
    this.viewport.$speak.$avatar.innerHTML = avatar ?
        ('<img src="' + $.$url(avatar, 'png') + '">') :
        '';
    this.viewport.$speak.$name.innerHTML = name;
    this.viewport.$speak.$text.innerHTML = '';
    $.$show(this.viewport.$speak);
    this.viewport.$speak.className = 'speak active';
    return this.$type($.$hilite(words, this.hilite.speak), this.viewport.$speak.$text);
};

/** @inheritDoc */
bigine.runtime.director.classic.prototype.showCG = function(metas, context) {
    var self = this;
    return this.$curtain$hide().then(function () {
        return self.$cg$show(metas.cg.image.src);
    }).pass(context);
};

/**
 * 显示特写。
 *
 * @param  {String} image
 * @return {bigine.util.promise}
 */
bigine.runtime.director.classic.prototype.$cg$show = function(image) {
    var self = this;
    this.$cg$render();
    this.runtime.logger.debug('[director] #cg show', image);
    this.viewport.$cg.innerHTML = '<img src="' + $.$url(image, 'jpg') + '">';
    $.$hide(this.viewport.$words, this.viewport.$chars);
    return promise.all([
        $.$fade$in(this.viewport.$cg, 25),
        $.$shrink(this.viewport.$cg, 10)
    ]).click(this.viewport, [13]).then(function () {
        $.$show(self.viewport.$words);
    });
};

/**
 * 动画：缩小元素。
 *
 * @param  {HTMLElement} element
 * @param  {Number} frames
 * @return {bigine.util.promise}
 */
bigine.runtime.director.classic.$shrink = function(element, frames) {
    var self = this,
        offset;
    return promise.tick(function (counter) {
        if (1 == counter) {
            $.$show(element);
        }
        offset = 35 * counter / frames - 25;
        $.$style(element, {
            left: offset + '%',
            top: offset + '%',
            width: (100 - 2 * offset) + '%',
            height: (100 - 2 * offset) + '%'
        });
    }, frames);
};

/**
 * 绘制特写。
 *
 * @return {void}
 */
bigine.runtime.director.classic.prototype.$cg$render = function() {
    this.$cg$render = bigine.util.noop;
    this.runtime.logger.debug('[director] #cg render');
    this.viewport.$cg = this.viewport.appendChild($.$div('cg'));
    if (this.runtime.episode.theme.cg) {
        this.$style(this.viewport.$cg, this.runtime.episode.theme.cg);
    }
};

/** @inheritDoc */
bigine.runtime.director.classic.prototype.monolog = function(metas, context) {
    var self = this;
    return this.$curtain$hide().then(function () {
        self.$se$cd();
        return self.$monolog$show(metas.player.title, metas.player.avatar, context.state.convert(metas.words));
    }).then(function () {
        return self.$monolog$hide();
    }).then(function () {
        self.viewport.$monolog.className = 'monolog';
        return context;
    });
};

/**
 * 显示独白。
 *
 * @param  {String} name
 * @param  {{src}=} avatar
 * @param  {String} words
 * @return {bigine.util.promise}
 */
bigine.runtime.director.classic.prototype.$monolog$show = function(name, avatar, words) {
    this.$monolog$render();
    if (avatar) {
        avatar = avatar.src;
    }
    this.runtime.logger.debug('[director] #monolog show', name, avatar, words);
    this.viewport.$monolog.$avatar.innerHTML = avatar ?
        ('<img src="' + $.$url(avatar, 'png') + '">') :
        '';
    this.viewport.$monolog.$name.innerHTML = name;
    this.viewport.$monolog.$text.innerHTML = '';
    this.viewport.$monolog.className = 'monolog active';
    $.$show(this.viewport.$monolog);
    return this.$type($.$hilite(words, this.hilite.monolog), this.viewport.$monolog.$text);
};

/** @inheritDoc */
bigine.runtime.director.classic.prototype.clearCG = function(context) {
    return this.$cg$hide().pass(context);
};

/**
 * 隐藏特写。
 *
 * @return {bigine.util.promise}
 */
bigine.runtime.director.classic.prototype.$cg$hide = function() {
    this.$cg$render();
    this.runtime.logger.debug('[director] #cg hide');
    var self = this;
    $.$hide(this.viewport.$words);
    return $.$fade$out(this.viewport.$cg, 10).then(function () {
        $.$show(self.viewport.$words, self.viewport.$chars);
    });
};

/** @inheritDoc */
bigine.runtime.director.classic.prototype.changePose = function(metas, context) {
    var pose = metas.character.poses[metas.pose] || metas.character.poses[''];
    switch (metas.character.position) {
        case bigine.runtime.director.POS_LEFT:
            context.logger.debug('[debug] #chars left show', pose);
            this.viewport.$chars.$left.innerHTML = '<img src="' + $.$url(pose, 'png') + '">';
            break;
        case bigine.runtime.director.POS_RIGHT:
            context.logger.debug('[debug] #chars right show', pose);
            this.viewport.$chars.$right.innerHTML = '<img src="' + $.$url(pose, 'png') + '">';
            break;
        default:
            context.logger.debug('[debug] #chars middle show', pose);
            this.viewport.$chars.$middle.innerHTML = '<img src="' + $.$url(pose, 'png') + '">';
            break;
    }
    return this.oops(context);
};

/** @inheritDoc */
bigine.runtime.director.classic.prototype.rest = function(context) {
    if (this.leftChar) {
        this.leftChar.position = undefined;
    }
    if (this.middleChar) {
        this.middleChar.position = undefined;
    }
    if (this.rightChar) {
        this.rightChar.position = undefined;
    }
    this.room = this.leftChar = this.middleChar = this.rightChar = undefined;
    if (this.viewport.$chars) {
        $.$hide(this.viewport.$chars.$left, this.viewport.$chars.$middle, this.viewport.$chars.$right);
    }
    $.$hide(this.viewport.$voiceover, this.viewport.$monolog, this.viewport.$speak,
        this.viewport.$map, this.viewport.$tip
    );
    return this.$curtain$show().pass(context);
};

/** @inheritDoc */
bigine.runtime.director.classic.prototype.free = function(context) {
    return this.$curtain$hide().pass(context);
};

/** @inheritDoc */
bigine.runtime.director.classic.prototype.tip = function(metas, context) {
    var self = this;
    return this.$curtain$hide().then(function () {
        return self.$tip$show(context.state.convert(metas.words));
    }).click(this.viewport, [13]).then(function () {
        return self.$tip$hide();
    }).pass(context);
};

/**
 * 显示提示。
 *
 * @param  {String} words
 * @return {bigine.util.promise}
 */
bigine.runtime.director.classic.prototype.$tip$show = function(words) {
    this.$tip$render();
    this.runtime.logger.debug('[director] #tip show', words);
    this.viewport.$tip.$text.innerHTML = $.$hilite(words, this.hilite.tip);
    $.$show(this.viewport.$tip);
    return this.oops();
};

/**
 * 绘制提示。
 *
 * @return {void}
 */
bigine.runtime.director.classic.prototype.$tip$render = function() {
    var self = this;
    this.$tip$render = bigine.util.noop;
    this.runtime.logger.debug('[director] #tip render');
    this.$speak$render();
    this.viewport.$tip = this.viewport.$speak.parentNode.appendChild($.$div('tip'));
    bigine.util.each(this.runtime.episode.theme.tip, $.$tip$render$unit, this);
    this.hilite.tip = this.runtime.episode.theme.tip.text.color2;
};

/**
 * 绘制提示部件。
 *
 * @this   {bigine.runtime.director.classic}
 * @param  {Object} styles
 * @param  {String} className
 * @return {void}
 * @static
 */
bigine.runtime.director.classic.$tip$render$unit = function (styles, className) {
    var el;
    if ('back' == className) {
        el = $.$element('img');
        el.className = className;
    } else {
        el = $.$div(className);
    }
    this.viewport.$tip.appendChild(this.$style(el, styles));
    if ('text' == className) {
        this.viewport.$tip.$text = el;
    }
};

/**
 * 隐藏提示。
 *
 * @return {bigine.util.promise}
 */
bigine.runtime.director.classic.prototype.$tip$hide = function() {
    this.$tip$render();
    this.runtime.logger.debug('[director] #tip hide');
    $.$hide(this.viewport.$tip);
    return this.oops();
};

/** @inheritDoc */
bigine.runtime.director.classic.prototype.charAway = function(metas, context) {
    var promise;
    switch (metas.character.position) {
        case bigine.runtime.director.POS_LEFT:
            promise = this.$chars$hide$left();
            break;
        case bigine.runtime.director.POS_RIGHT:
            promise = this.$chars$hide$right();
            break;
        default:
            promise = this.$chars$hide$middle();
    }
    return promise.pass(context);
};

/**
 * 左位人物离场。
 *
 * @return {bigine.util.promise}
 */
bigine.runtime.director.classic.prototype.$chars$hide$left = function() {
    var self = this;
    this.leftChar = undefined;
    return promise.all([
        $.$fade$out(this.viewport.$chars.$left, 10),
        $.$move(this.viewport.$chars.$left, - this.width * 0.025, 10)
    ]).then(function () {
        self.viewport.$chars.$left.style.left = '2.5%';
    });
};

/**
 * 中位人物离场。
 *
 * @return {bigine.util.promise}
 */
bigine.runtime.director.classic.prototype.$chars$hide$middle = function() {
    var self = this;
    this.middleChar = undefined;
    return promise.all([
        $.$fade$out(this.viewport.$chars.$middle, 10),
        $.$climb(this.viewport.$chars.$middle, this.height * 0.075, 10)
    ]).then(function () {
        self.viewport.$chars.$middle.style.top = '16%';
    });
};

/**
 * 右位人物离场。
 *
 * @return {bigine.util.promise}
 */
bigine.runtime.director.classic.prototype.$chars$hide$right = function() {
    var self = this;
    this.rightChar = undefined;
    return promise.all([
        $.$fade$out(this.viewport.$chars.$right, 10),
        $.$move(this.viewport.$chars.$right, this.width * 0.025, 10)
    ]).then(function () {
        self.viewport.$chars.$right.style.left = '67.5%';
    });
};

/** @inheritDoc */
bigine.runtime.director.classic.prototype.setChar = function(metas, context) {
    switch (metas.position) {
        case bigine.runtime.director.POS_LEFT:
            this.leftChar = metas.character;
            break;
        case bigine.runtime.director.POS_RIGHT:
            this.rightChar = metas.character;
            break;
        default:
            this.middleChar = metas.character;
    }
    return this.$chars$show(metas.character).pass(context);
};

/**
 * 显示人物。
 *
 * @param  {bigine.entity.character} character
 * @return {bigine.util.promise}
 */
bigine.runtime.director.classic.prototype.$chars$show = function(character) {
    this.$chars$render();
    var id = character.poses[character.pose] || character.poses[''];
    switch (character.position) {
        case bigine.runtime.director.POS_LEFT:
            return this.$chars$show$left(id);
        case bigine.runtime.director.POS_RIGHT:
            return this.$chars$show$right(id);
    }
    return this.$chars$show$middle(id);
};

/**
 * 显示中位人物。
 *
 * @param  {String} pose
 * @return {bigine.util.promise}
 */
bigine.runtime.director.classic.prototype.$chars$show$middle = function(pose) {
    this.runtime.logger.debug('[director] #chars middle show', pose);
    this.viewport.$chars.$middle.innerHTML = '<img src="' + $.$url(pose, 'png') + '">';
    $.$show(this.viewport.$chars.$middle);
    return this.oops();
};

/**
 * 显示左位人物。
 *
 * @param  {String} pose
 * @return {bigine.util.promise}
 */
bigine.runtime.director.classic.prototype.$chars$show$left = function(pose) {
    this.runtime.logger.debug('[director] #chars left show', pose);
    this.viewport.$chars.$left.innerHTML = '<img src="' + $.$url(pose, 'png') + '">';
    $.$show(this.viewport.$chars.$left);
    return this.oops();
};

/**
 * 显示右位人物。
 *
 * @param  {String} pose
 * @return {bigine.util.promise}
 */
bigine.runtime.director.classic.prototype.$chars$show$right = function(pose) {
    this.runtime.logger.debug('[director] #chars right show', pose);
    this.viewport.$chars.$right.innerHTML = '<img src="' + $.$url(pose, 'png') + '">';
    $.$show(this.viewport.$chars.$right);
    return this.oops();
};

/** @inheritDoc */
bigine.runtime.director.classic.prototype.choose = function(metas, context) {
    var self = this;
    return this.$curtain$hide().then(function () {
        return self.$choose$show(metas.options);
    });
};

/**
 * 显示选择框。
 *
 * @param  {Object} options
 * @return {bigine.util.promise}
 */
bigine.runtime.director.classic.prototype.$choose$show = function(options) {
    this.$choose$render();
    this.runtime.logger.debug('[director] #choose show', options);
    var self = this;
    return new promise(function (resolve) {
        self.viewport.$choose.$options.innerHTML = '';
        bigine.util.each(options, $.$choose$show$option, {
            director: self,
            resolve: resolve
        });
        $.$style(self.viewport.$choose.$options, {
            top: '-100%',
            left: '-100%',
            width: self.runtime.episode.theme.choose.width / 12.8 + '%'
        });
        $.$show(self.viewport.$choose);
        $.$style(self.viewport.$choose.$options, {
            top: (50 - 50 * self.viewport.$choose.$options.scrollHeight / self.height) + '%',
            left: (50 - 50 * self.viewport.$choose.$options.scrollWidth / self.width) + '%'
        });
    });
};

/**
 * 显示选择框选项。
 *
 * @this   {{director:bigine.runtime.director.classic, resolve:Function}}
 * @param  {String} title
 * @param  {?} value
 * @return {void}
 * @static
 */
bigine.runtime.director.classic.$choose$show$option = function(title, value) {
    var self = this,
        el = this.director.viewport.$choose.$options.appendChild($.$div('option', {
            text: 0
        })),
        img = el.appendChild($.$element('img'));
        theme = this.director.runtime.episode.theme.choose.option;
    el.$_text.innerHTML = this.director.runtime.state.convert(title);
    if (theme) {
        this.director.$style(el.$_text, theme.text);
        this.director.$style(img, theme.back);
    }
    bigine.util.once(el, 'click', function () {
        $.$hide(self.director.viewport.$choose);
        self.resolve(value);
    });
};

/**
 * 绘制选择框。
 *
 * @return {void}
 */
bigine.runtime.director.classic.prototype.$choose$render = function() {
    this.$choose$render = bigine.util.noop;
    this.runtime.logger.debug('[director] #choose render');
    this.viewport.$choose = this.viewport.appendChild($.$div('choose', {
        options: 0
    }));
    this.viewport.$choose.$options = this.viewport.$choose.$_options;
};

/** @inheritDoc */
bigine.runtime.director.classic.prototype.playBGM = function(metas, context) {
    return this.$bgm$play(metas.bgm.audio.src).pass(context);
};

/**
 * 播放背景音乐。
 *
 * @param  {String} url
 * @return {bigine.util.promise}
 */
bigine.runtime.director.classic.prototype.$bgm$play = function(audio) {
    this.$bgm$render();
    var src = $.$url(audio, 'mp3');
    if (src != this.viewport.$bgm.src) {
        this.runtime.logger.debug('[director] #bgm play', audio);
        this.viewport.$bgm.src = src;
    }
    return this.oops();
};

/**
 * 渲染背景音乐层。
 *
 * @return {void}
 */
bigine.runtime.director.classic.prototype.$bgm$render = function() {
    this.$bgm$render = bigine.util.noop;
    this.runtime.logger.debug('[director] #bgm render');
    this.viewport.$bgm = this.viewport.appendChild($.$audio({
        autoplay: true,
        loop: true,
        preload: 'auto'
    }));
    this.viewport.$bgm.className = 'bgm';
};

/**
 * 创建音频标签。
 *
 * @param  {Object=} options
 * @return {HTMLAudioElement}
 * @static
 */
bigine.runtime.director.classic.$audio = function(options) {
    options = options || {};
    var audio;
    audio = $.$element('audio');
    audio.play = audio.play || bigine.util.noop;
    audio.pause = audio.pause || bigine.util.noop;
    bigine.util.each(options, $.$audio.$attr, audio);
    audio.src = 'http://s.dahao.de/oops.mp3';
    return audio;
};

/**
 * 设置属性。
 *
 * @param  {String} value
 * @param  {String} attr
 * @return {void}
 * @this   {HTMLAudioElement}
 */
bigine.runtime.director.classic.$audio.$attr = function(value, attr) {
    this[attr] = value;
};

/**
 * 对移动设备激活背景音乐用音频标签。
 *
 * @return {void}
 */
bigine.runtime.director.classic.prototype.$bgm$activate = function() {
    this.$bgm$activate = bigine.util.noop;
    this.runtime.logger.debug('[director] #bgm activate');
    this.viewport.$bgm.play();
};

/** @inheritDoc */
bigine.runtime.director.classic.prototype.playSE = function(metas, context) {
    return this.$se$play(metas.se.audio.src).pass(context);
};

/**
 * 播放音效。
 *
 * @param  {String} audio
 * @return {bigine.util.promise}
 */
bigine.runtime.director.classic.prototype.$se$play = function(audio) {
    this.$se$render();
    this.viewport.$se.src = $.$url(audio, 'mp3');
    this.viewport.$se.$cd = 2;
    return this.oops();
};

/**
 * 音效自动停止计数。
 *
 * @return {void}
 */
bigine.runtime.director.classic.prototype.$se$cd = function() {
    if (!--this.viewport.$se.$cd) {
        this.viewport.$se.src = 'http://s.dahao.de/oops.mp3';
    }
};

/**
 * 渲染音效层。
 *
 * @return {void}
 */
bigine.runtime.director.classic.prototype.$se$render = function() {
    this.$se$render = bigine.util.noop;
    this.runtime.logger.debug('[director] #se render');
    this.viewport.$se = this.viewport.appendChild($.$audio({
        autoplay: true,
        preload: true
    }));
    this.viewport.$se.className = 'se';
    this.viewport.$se.$cd = 0;
};

/**
 * 对移动设备激活音效用音频标签。
 *
 * @return {void}
 */
bigine.runtime.director.classic.prototype.$se$activate = function() {
    this.$se$activate = bigine.util.noop;
    this.runtime.logger.debug('[director] #se activate');
    this.viewport.$se.play();
};

/** @inheritDoc */
bigine.runtime.director.classic.prototype.end = function(context) {
    var self = this;
    return this.rest(context).delay(500).then(function () {
        if (self.viewport.$bgm) {
            self.viewport.$bgm.pause();
        }
        if (self.viewport.$se) {
            self.viewport.$se.pause();
        }
        return self.$end$show();
    }).then(function () {
        return self.$curtain$hide();
    }).delay(2000).then(function () {
        return self.$curtain$show();
    }).then(function () {
        return self.$end$hide();
    }).pass(context);
};

/**
 * 显示完结动画。
 *
 * @return {bigine.util.promise}
 */
bigine.runtime.director.classic.prototype.$end$show = function() {
    this.$end$render();
    this.runtime.logger.debug('[director] #end show');
    $.$show(this.viewport.$end);
    return this.oops();
};

/**
 * 渲染完结动画。
 *
 * @return {void}
 */
bigine.runtime.director.classic.prototype.$end$render = function() {
    this.$end$render = bigine.util.noop;
    this.runtime.logger.debug('[director] #end render');
    this.viewport.$end = this.viewport.appendChild($.$div('end', {
        back: 0,
        box: {
            text: 0
        }
    }));
    var theme = this.runtime.episode.theme.end,
        end = this.viewport.$end;
    this.$style(end.$_back, theme.back);
    this.$style(end.$_box.$_text, theme.text).innerHTML = '谢谢观赏<br><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAYCAMAAAA73KjcAAAAGFBMVEVMaXEAzP8AzP8AzP8AzP8AzP8AzP8AzP9gYKrVAAAAB3RSTlMAJZzkdku/V8FOkgAAAaxJREFUeNrtVEmOw0AINKv//+Nhpz2ZS0bKLSUlGKgGGrCvL/4DVUSGz+aQO6DyySR4Fz6ZRe/Guy0DeGj7NBjLfZMI0m0yDKwkc0vC4CgVOQxJixO8kV1FeJSN7WQbR3uaLDsuTp+mYQ/iaxxD8i39KMPGDg7FwPVBunAj11NDfnUdojcYmHaRJewkXRCNj84LwUxOTCqAHgUZB0S9LfLYob1ARqdUy7LBsU6RUaYheLVsLuR9Lnb6jH1iV20YJPaY00k2mKunJ/Y7KtNjRpQG6lamYQJ1lyBS9SrsAEuPAUTCTgs7XEoOWTSdQ+dIgKkWJQ7BVn4m0RDktWDepOXsBoTXN9sh5zelCqY8hKi1M1pb4o2vWYfCwVMBnJ7ksEOfSS62WordOzc8xEhapkfbDVZVdEsSIOc+eHk56dEfrgvJnR1aHNXgBcGmqTTyBSrXsNV1DJaBIqz/z6dAomrzOYnP913CUOqf30L2rMqlIFHY0UwApOipUwoqRQhxn3HJYKXlE8gRxj2PFRbE3QIA5rSywAX+ZygJZjxVZmRJsp0CdK1rLfD1xbv4AU2fErdwii0HAAAAAElFTkSuQmCC">';
};

/**
 * 隐藏完结动画。
 *
 * @return {bigine.util.promise}
 */
bigine.runtime.director.classic.prototype.$end$hide = function() {
    this.runtime.logger.debug('[director] #end hide');
    $.$hide(this.viewport.$end);
    return this.oops();
};

/** @inheritDoc */
bigine.runtime.director.classic.prototype.rank = function(metas, context) {
    var self = this;
    return this.rest().then(function () {
        console.log(metas);
        self.$rank$show(metas.rank);
    }).then(function () {
        self.$curtain$hide();
    }).pass(context);
};

/**
 * 显示评分。
 *
 * @param  {String} rank
 * @return {bigine.util.promise}
 */
bigine.runtime.director.classic.prototype.$rank$show = function(rank) {
    this.$rank$render();
    this.runtime.logger.debug('[director] #rank show', rank);
    this.viewport.$rank.$_text3.innerHTML = rank;
    switch (rank) {
        case '完美':
            rank = 3;
            break;
        case '优秀':
            rank = 2;
            break;
        default:
            rank = 1;
    }
    this.viewport.$rank.$_stars.innerHTML = '<img src="' + this.runtime.episode.theme.rank.star.image + rank + '.png">';
    $.$show(this.viewport.$rank);
    return this.oops();
};

/**
 * 渲染评分。
 *
 * @return {void}
 */
bigine.runtime.director.classic.prototype.$rank$render = function() {
    this.$rank$render = bigine.util.noop;
    this.runtime.logger.debug('[director] #rank render');
    this.viewport.$rank = this.viewport.appendChild($.$div('rank', {
        mask: 0,
        text1: 0,
        text2: 0,
        stars: 0,
        text3: 0
    }));
    var theme = this.runtime.episode.theme.rank,
        rank = this.viewport.$rank;
    rank.appendChild(this.$style($.$element('img'), theme.back));
    this.$style(rank.$_mask, theme.mask);
    this.$style(rank.$_text1, theme.text1).innerHTML = '恭喜通关';
    this.$style(rank.$_text2, theme.text2).innerHTML = '您获得了';
    this.$style(rank.$_stars, theme.star);
    this.$style(rank.$_text3, theme.text3);
};

/**
 * 隐藏评分。
 *
 * @return {bigine.util.promise}
 */
bigine.runtime.director.classic.prototype.$rank$hide = function() {
    this.runtime.logger.debug('[director] #rank hide');
    $.$hide(this.viewport.$rank);
    return this.oops();
};

/** @inheritDoc */
bigine.runtime.director.classic.prototype.destroy = function() {
    if (this.viewport.$bgm) {
        this.viewport.$bgm.pause();
    }
    if (this.viewport.$se) {
        this.viewport.$se.pause();
    }
    this.viewport = undefined;
    window.document.body.querySelectorAll('.bg-player')[0].innerHTML = '';
};

module.exports = bigine.runtime.director.classic;
