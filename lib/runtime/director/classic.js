/**
 * 定义传统模式运行时场面（视觉、听觉、交互）指挥器组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../../bigine').$namespace('.runtime.director')
    .$import('.error')
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
        doc = window.document,
        els = doc.getElementsByClassName('bg-player'),
        size;
    this.viewport = $.$div('bg-player', {
        player: {
            cover: {},
            viewport: {}
        }
    });
    this.viewport.$cover = this.viewport.$_player.$_cover;
    if (els.length) {
        els[0].parentNode.replaceChild(this.viewport, els[0]);
    } else {
        doc.body.appendChild(this.viewport);
        this.viewport.className = 'bg-player fullscreen';
    }
    this.width = this.viewport.$_player.$_viewport.scrollWidth;
    this.height = this.viewport.$_player.$_viewport.scrollHeight;
    size = this.height / 9 * 16;
    if (size > this.width) {
        size = this.width / 16 * 9;
        this.zoom = size / 720;
        size = {
            height: size + 'px',
            marginTop: (this.height - size) / 2 + 'px'
        };
        this.height = size;
    } else if (size < this.width) {
        this.zoom = size / 1280;
        size = {
            width: size + 'px'
        };
        this.width = size;
    } else {
        size = {};
    }
    runtime.logger.info('[director]', this.width, 'x', this.height, '(', (this.zoom * 100), '%)');
    $.$style(this.viewport.$_player.$_viewport, size);
    runtime.episode.$on('ready', function () {
        runtime.logger.info(' [episode] ready');
        if (self.began) {
            self.$play();
        }
        self.began = true;
    }).$ready().fail(function (error) {
        self.runtime.logger.error(error);
    });
    bigine.util.on(this.viewport.$cover, 'click', function () {
        self.play();
    });
    return this;
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
    var el;
    if (className instanceof window.HTMLElement) {
        el = className;
    } else {
        el = $.$element('div');
        if (bigine.util.isString(className)) {
            el.className = className;
        } else {
            el.className = className.join(' ');
        }
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
    if (tagName instanceof window.HTMLElement) {
        return tagName;
    }
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
    this.style[key] = value;
};

/** @inheritDoc */
bigine.runtime.director.classic.prototype.play = function() {
    this.runtime.logger.info('  [player] PLAY');
    var self = this;
    this.$cover$hide().then(function () {
        if (!self.began) {
            self.began = true;
        } else {
            self.$play();
        }
    }).fail(function (error) {
        self.runtime.logger.error(error);
    });
    return this;
};

/**
 * 隐藏封面。
 *
 * @return {bigine.util.promise}
 */
bigine.runtime.director.classic.prototype.$cover$hide = function() {
    this.runtime.logger.debug('[director] #cover hide');
    $.$hide(this.viewport.$cover);
    this.viewport.$cover.style.backgroundImage = '';
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
    this.$start$show();
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
    this.viewport.$start = this.viewport.$_player.$_viewport.appendChild($.$div('start', {
        'new': {},
        load: {}
    }));
    this.viewport.$start.$new = this.viewport.$start.$_new;
    this.viewport.$start.$load = this.viewport.$start.$_load;
    this.viewport.$start.style.backgroundImage = 'url(' + this.runtime.episode.theme.start.image + ')';
    var self = this;
    bigine.util.on(this.$style(this.viewport.$start.$new, this.runtime.episode.theme.start['new']), 'click', function() {
        self.runtime.logger.info('  [player] NEW');
        self.$curtain$show().then(function () {
            return self.$start$hide();
        }).then(function () {
            return self.runtime.episode.begin(self.runtime);
        }).fail(function (error) {
            self.runtime.logger.error(error);
        });
    });
    bigine.util.on(this.$style(this.viewport.$start.$load, this.runtime.episode.theme.start.load), 'click', function() {
        self.runtime.logger.info('  [player] LOAD');
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
    var self = this;
    switch (key) {
        case 'top':
        case 'left':
        case 'bottom':
        case 'right':
        case 'width':
        case 'height':
            this.element.style[key] = (this.zoom * value) + 'px';
            return;
        case 'image':
            this.element.style.backgroundImage = 'url(' + value + ')';
            bigine.util.on(this.element, 'mouseleave', function() {
                self.element.style.backgroundImage = 'url(' + value + ')';
            });
            return;
        case 'hover':
            bigine.util.on(this.element, 'mouseenter', function() {
                self.element.style.backgroundImage = 'url(' + value + ')';
            });
            return;
        case 'color0':
            this.element.style.backgroundColor = value;
            return;
        case 'color2':
            return;
        case 'opacity':
            if (bigine.util.isDefined(this.element.style.opacity)) {
                this.element.style.opacity = value;
            } else {
                this.element.style.filter = 'alpha(opacity=' + 100 * value + ')';
            }
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
    var self = this;
    return promise.tick(function (counter, times) {
        if (1 == counter) {
            $.$show(self.viewport.$curtain);
        }
        self.$style(self.viewport.$curtain, {
            opacity: counter / times
        });
    }, 25); // 1 tick = 20 ms
};

/**
 * 绘制幕帘。
 *
 * @return {void}
 */
bigine.runtime.director.classic.prototype.$curtain$render = function() {
    this.$curtain$render = bigine.util.noop;
    this.runtime.logger.debug('[director] #curtain render');
    this.viewport.$curtain = this.viewport.$_player.$_viewport.appendChild($.$div('curtain'));
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
                self.viewport.$map.style.backgroundImage = 'url(' + $.$url(point.image.src, 'png') + ')';
            },
            mouseleave: function() {
                self.viewport.$map.style.backgroundImage = '';
            },
            click: function() {
                point.target.room.enter(self.runtime).fail(function (error) {
                    self.runtime.logger.error(error);
                });
            }
        });
        $.$style(el, {
            left: (this.zoom / 1.5 * point.region.left) + 'px',
            top: (this.zoom / 1.5 * point.region.top) + 'px',
            width: (this.zoom / 1.5 * (1920 - point.region.right - point.region.left)) + 'px',
            height: (this.zoom / 1.5 * (1080 - point.region.bottom - point.region.top)) + 'px'
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
    this.viewport.$map = this.viewport.$_player.$_viewport.appendChild($.$div('map'));
};

/**
 * 绘制背景。
 *
 * @return {void}
 */
bigine.runtime.director.classic.prototype.$back$render = function() {
    this.$back$render = bigine.util.noop;
    this.runtime.logger.debug('[director] #back render');
    this.viewport.$back = this.viewport.$_player.$_viewport.appendChild($.$div('back'));
};

/** @inheritDoc */
bigine.runtime.director.classic.prototype.setTime = function(metas, context) {
    this.time = metas.time;
    if (this.room && this.room.time != this.time) {
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
    this.viewport.$back.style.backgroundImage = 'url(' + $.$url(snap, 'jpg') + ')';
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
    return 'http://a' + (parseInt(id[0], 16) % 8 + 1) + '.bigood.com/' + id + '/origin.' + type;
};

/** @inheritDoc */
bigine.runtime.director.classic.prototype.voiceover = function(metas, context) {
    var self = this;
    return promise.all([
        this.$speak$hide(),
        this.$monolog$hide(),
        this.$voiceover$show(context.state.convert(metas.words)),
        this.$curtain$hide()
    ]).click(this.viewport.$voiceover).then(function () {
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
    var el = this.viewport.$_player.$_viewport.appendChild($.$div('words', {
        speak: {}
    }));
    this.viewport.$speak = el.$_speak;
    bigine.util.each(this.runtime.episode.theme.speak, $.$speak$render$unit, this);
    this.hilite.speak = this.runtime.episode.theme.speak.text.color2;
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
    var el = this.viewport.$speak.appendChild(this.$style($.$div(className), styles));
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
    var el = this.viewport.$monolog.appendChild(this.$style($.$div(className), styles));
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
    this.viewport.$voiceover.$text.innerHTML = $.$hilite(words, this.hilite.voiceover);
    this.viewport.$voiceover.className = 'voiceover active';
    $.$show(this.viewport.$voiceover);
    return this.oops();
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
    return words.replace(/【(.+)】/g, function (match, p1) {
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
    var el = this.viewport.$voiceover.appendChild(this.$style($.$div(className), styles));
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
    return promise.tick(function (counter, times) {
        switch (counter) {
            case times:
                $.$hide(self.viewport.$curtain);
                break;
            default:
                self.$style(self.viewport.$curtain, {
                    opacity: (times - counter) / times
                });
        }
    }, 25); // 1 tick = 20 ms
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
    return promise.all([
        this.$chars$animate(metas.character),
        this.$curtain$hide()
    ]).pass(context);
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
    this.viewport.$chars = this.viewport.$_player.$_viewport.appendChild($.$div('chars', {
        cleft: {},
        cmiddle: {},
        cright: {}
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
    this.viewport.$chars.$middle.style.backgroundImage = 'url(' + $.$url(pose, 'png') + ')';
    $.$show(this.viewport.$chars.$middle);
    return this.oops();
};

/**
 * 动画显示左位人物。
 *
 * @param  {String} pose
 * @return {bigine.util.promise}
 */
bigine.runtime.director.classic.prototype.$chars$animate$left = function(pose) {
    this.runtime.logger.debug('[director] #chars left animate', pose);
    this.viewport.$chars.$left.style.backgroundImage = 'url(' + $.$url(pose, 'png') + ')';
    $.$show(this.viewport.$chars.$left);
    return this.oops();
};

/**
 * 动画显示右位人物。
 *
 * @param  {String} pose
 * @return {bigine.util.promise}
 */
bigine.runtime.director.classic.prototype.$chars$animate$right = function(pose) {
    this.runtime.logger.debug('[director] #chars right animate', pose);
    this.viewport.$chars.$right.style.backgroundImage = 'url(' + $.$url(pose, 'png') + ')';
    $.$show(this.viewport.$chars.$right);
    return this.oops();
};

/** @inheritDoc */
bigine.runtime.director.classic.prototype.speak = function(metas, context) {
    var self = this;
    return promise.all([
        this.$voiceover$hide(),
        this.$monolog$hide(),
        this.$speak$show(metas.nick || metas.from.title, metas.from.avatar, context.state.convert(metas.words)),
        this.$curtain$hide()
    ]).click(this.viewport.$speak).then(function () {
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
    this.runtime.logger.debug('[director] #speak show', name, avatar, words);
    this.viewport.$speak.$avatar.style.backgroundImage = avatar ?
        ('url(' + $.$url(avatar, 'png') + ')') :
        '';
    this.viewport.$speak.$name.innerHTML = name;
    this.viewport.$speak.$text.innerHTML = $.$hilite(words, this.hilite.speak);
    $.$show(this.viewport.$speak);
    this.viewport.$speak.className = 'speak active';
    return this.oops();
};

/** @inheritDoc */
bigine.runtime.director.classic.prototype.showCG = function(metas, context) {
    return promise.all([
        this.$cg$show(metas.cg.image.src),
        this.$curtain$hide()
    ]).pass(context);
};

/**
 * 显示特写。
 *
 * @param  {String} image
 * @return {bigine.util.promise}
 */
bigine.runtime.director.classic.prototype.$cg$show = function(image) {
    this.$cg$render();
    this.runtime.logger.debug('[director] #cg show', image);
    this.viewport.$cg.style.backgroundImage = 'url(' + $.$url(image, 'jpg') + ')';
    $.$show(this.viewport.$cg);
    $.$hide(this.viewport.$chars);
    return this.oops();
};

/**
 * 绘制特写。
 *
 * @return {void}
 */
bigine.runtime.director.classic.prototype.$cg$render = function() {
    this.$cg$render = bigine.util.noop;
    this.runtime.logger.debug('[director] #cg render');
    this.viewport.$cg = this.viewport.$_player.$_viewport.appendChild($.$div('cg'));
    if (this.runtime.episode.theme.cg) {
        this.$style(this.viewport.$cg, this.runtime.episode.theme.cg);
    }
};

/** @inheritDoc */
bigine.runtime.director.classic.prototype.monolog = function(metas, context) {
    var self = this;
    return promise.all([
        this.$voiceover$hide(),
        this.$speak$hide(),
        this.$monolog$show(metas.player.title, metas.player.avatar, context.state.convert(metas.words)),
        this.$curtain$hide()
    ]).click(this.viewport.$monolog).then(function () {
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
    this.viewport.$monolog.$avatar.style.backgroundImage = avatar ?
        ('url(' + $.$url(avatar, 'png') + ')') :
        '';
    this.viewport.$monolog.$name.innerHTML = name;
    this.viewport.$monolog.$text.innerHTML = $.$hilite(words, this.hilite.monolog);
    this.viewport.$monolog.className = 'monolog active';
    $.$show(this.viewport.$monolog);
    return this.oops();
};

/** @inheritDoc */
bigine.runtime.director.classic.prototype.clearCG = function(context) {
    return this.$cg$hide().pass(context);
};

/**
 * 隐藏旁白。
 *
 * @return {bigine.util.promise}
 */
bigine.runtime.director.classic.prototype.$cg$hide = function() {
    this.$cg$render();
    this.runtime.logger.debug('[director] #cg hide');
    $.$show(this.viewport.$chars);
    $.$hide(this.viewport.$cg);
    return this.oops();
};

/** @inheritDoc */
bigine.runtime.director.classic.prototype.changePose = function(metas, context) {
    var pose = metas.character.poses[metas.pose] || metas.character.poses[''];
    switch (metas.character.position) {
        case bigine.runtime.director.POS_LEFT:
            context.logger.debug('[debug] #chars left show', pose);
            this.viewport.$chars.$left.style.backgroundImage = 'url(' + $.$url(pose, 'png') + ')';
            break;
        case bigine.runtime.director.POS_RIGHT:
            context.logger.debug('[debug] #chars right show', pose);
            this.viewport.$chars.$right.style.backgroundImage = 'url(' + $.$url(pose, 'png') + ')';
            break;
        default:
            context.logger.debug('[debug] #chars middle show', pose);
            this.viewport.$chars.$middle.style.backgroundImage = 'url(' + $.$url(pose, 'png') + ')';
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
    return this.$curtain$show();
};

/** @inheritDoc */
bigine.runtime.director.classic.prototype.free = function(context) {
    return this.$curtain$hide();
};

/** @inheritDoc */
bigine.runtime.director.classic.prototype.tip = function(metas, context) {
    var self = this;
    return promise.all([
        this.$tip$show(context.state.convert(metas.words)),
        this.$curtain$hide()
    ]).click(this.viewport.$tip).pass(context);
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
    this.viewport.$tip = bigine.util.on($.$div('tip'), 'click', function () {
        $.$hide(self.viewport.$tip);
    });
    this.viewport.$speak.parentNode.appendChild(this.viewport.$tip);
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
    var el = this.viewport.$tip.appendChild(this.$style($.$div(className), styles));
    if ('text' == className) {
        this.viewport.$tip.$text = el;
    }
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
    this.leftChar = undefined;
    this.viewport.$chars.$left.style.backgroundImage = '';
    $.$hide(this.viewport.$chars.$left);
    return this.oops();
};

/**
 * 中位人物离场。
 *
 * @return {bigine.util.promise}
 */
bigine.runtime.director.classic.prototype.$chars$hide$middle = function() {
    this.middleChar = undefined;
    this.viewport.$chars.$middle.style.backgroundImage = '';
    $.$hide(this.viewport.$chars.$middle);
    return this.oops();
};

/**
 * 右位人物离场。
 *
 * @return {bigine.util.promise}
 */
bigine.runtime.director.classic.prototype.$chars$hide$right = function() {
    this.rightChar = undefined;
    this.viewport.$chars.$right.style.backgroundImage = '';
    $.$hide(this.viewport.$chars.$right);
    return this.oops();
};

/** @inheritDoc */
bigine.runtime.director.classic.prototype.setChar = function(metas, context) {
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
    return promise.all([
        this.$chars$show(metas.character),
        this.$curtain$hide()
    ]).pass(context);
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
    this.viewport.$chars.$middle.style.backgroundImage = 'url(' + $.$url(pose, 'png') + ')';
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
    this.viewport.$chars.$left.style.backgroundImage = 'url(' + $.$url(pose, 'png') + ')';
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
    this.viewport.$chars.$right.style.backgroundImage = 'url(' + $.$url(pose, 'png') + ')';
    $.$show(this.viewport.$chars.$right);
    return this.oops();
};

/** @inheritDoc */
bigine.runtime.director.classic.prototype.choose = function(metas, context) {
    return promise.all([
        this.$choose$show(metas.options),
        this.$curtain$hide()
    ]).then(function (data) {
        return data[0];
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
            top: - self.height + 'px',
            left: - self.width + 'px'
        });
        $.$show(self.viewport.$choose);
        $.$style(self.viewport.$choose.$options, {
            top: (self.height - self.viewport.$choose.$options.scrollHeight) / 2 + 'px',
            left: (self.width - self.viewport.$choose.$options.scrollWidth) / 2 + 'px'
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
        el = this.director.viewport.$choose.$options.appendChild($.$div('option'));
    el.innerHTML = this.director.runtime.state.convert(title);
    if (this.director.runtime.episode.theme.choose.option) {
        this.director.$style(el, this.director.runtime.episode.theme.choose.option);
    }
    bigine.util.on(el, 'mouseleave', function () {
        el.style.backgroundImage = '';
    });
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
    this.viewport.$choose = this.viewport.$_player.$_viewport.appendChild($.$div('choose', {options: {}}));
    this.viewport.$choose.$options = this.viewport.$choose.$_options;
};

module.exports = bigine.runtime.director.classic;
