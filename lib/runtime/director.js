/**
 * 定义运行时场面（视觉、听觉、交互）指挥器组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 DaHao.de
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../bigine').$namespace('.runtime')
    .$import('.core.component')
    .$import('.runtime.event.new')
    .$import('.runtime.event.continue')
    .$import('.util.promise'),
    $ = {};

/**
 * 运行时画面指挥器组件。
 *
 * @return {bigine.runtime.director}
 * @constructor
 * @extends {bigine.core.component}
 */
bigine.runtime.director = bigine.$extends(bigine.core.component, function () {
    /** @override */
    this.$prototype = 'bigine.runtime.director';

    /**
     * 运行时。
     *
     * @type {bigine.runtime.runtime}
     */
    this.runtime =

    /**
     * 当前展示房间。
     *
     * @type {bigine.entity.room}
     */
    this.room =

    /**
     * 当前左位人物。
     *
     * @type {bigine.entity.character}
     */
    this.leftChar =

    /**
     * 当前中位人物。
     *
     * @type {bigine.entity.character}
     */
    this.middleChar =

    /**
     * 当前右位人物。
     *
     * @type {bigine.entity.character}
     */
    this.rightChar = undefined;

    /**
     * 当前时间。
     *
     * @type {String}
     */
    this.time = '午';

    /**
     * 当前幕帘状态。
     *
     * @type {Boolean}
     */
    this.curtain = true;

    /**
     * 是否已开始播放。
     *
     * @type {Bool}
     */
    this.began = false;

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
     * 背景音乐。
     *
     * @type {Audio}
     */
    this.bgm =

    /**
     * 音效。
     *
     * @type {Audio}
     */
    this.se = undefined;
});

/**
 * 左位。
 *
 * @define {String}
 */
bigine.runtime.director.POS_LEFT = '左';

/**
 * 中位。
 *
 * @define {String}
 */
bigine.runtime.director.POS_MIDDLE = '中';

/**
 * 右位。
 *
 * @define {String}
 */
bigine.runtime.director.POS_RIGHT = '右';

/**
 * 初始化。
 *
 * @param  {bigine.runtime.runtime} runtime
 * @return {Boolean} 是否自动播放
 */
bigine.runtime.director.prototype.init = function(runtime) {
    var self = this;
    this.runtime = runtime;
    runtime.addEventListener('ready', function () {
        runtime.logger.info(' [episode] ready');
        if (self.began) self._play();
        self.began = true;
    });
    runtime.episode.$ready().fail(function (error) {
        runtime.logger.error(error);
    });
    return false;
};

/**
 * 调整播放区域大小。
 *
 * @return {void}
 */
bigine.runtime.director.prototype.fix = function() {
    this.runtime.logger.error('bigine.runtime.director#fix()');
};

/**
 * 播放。
 *
 * @return {bigine.runtime.director}
 */
bigine.runtime.director.prototype.play = function() {
    this.runtime.logger.info('  [player] PLAY');
    var self = this;
    this.curtain$show().delay(500).then(function () {
        return self.logo$show('data:image/png;base64,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');
    }).then(function () {
        return self.curtain$hide();
    }).delay(2000).then(function () {
        return self.curtain$show();
    }).then(function () {
        return self.logo$hide();
    }).then(function () {
        if (self.began) self._play();
        self.began = true;
    });
    return this;
};

/**
 * （在素材包和主题包下载完成后正式）播放。
 *
 * @return {void}
 */
bigine.runtime.director.prototype._play = function() {
    var self = this,
        context = this.runtime,
        theme = this.runtime.episode.theme.start;
    this.bgm$play();
    this.se$play();
    if (context.episode.auto) {
        context.logger.info('  [player] STORY');
        context.dispatch(new bigine.runtime.event['new']());
    } else {
        this.start$show(theme.image, [
            {
                x: theme['new'].left,
                y: theme['new'].top,
                w: theme['new'].width,
                h: theme['new'].height,
                i: theme['new'].image,
                ih: theme['new'].hover,
                f: function() {
                    context.logger.info('  [player] NEW');
                    self.curtain$show().then(function () {
                        self.runtime.dispatch(new bigine.runtime.event['new']());
                    });
                }
            },
            {
                x: theme.load.left,
                y: theme.load.top,
                w: theme.load.width,
                h: theme.load.height,
                i: theme.load.image,
                ih: theme.load.hover,
                f: function() {
                    context.logger.info('  [player] CONTINUE');
                    self.curtain$show().then(function () {
                        self.runtime.dispatch(new bigine.runtime.event['continue']());
                    });
                }
            }
        ]).then(function () {
            self.curtain$hide();
        });
    }
};

/**
 * 显示幕帘。
 *
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.curtain$show = function() {
    this.runtime.logger.error('bigine.runtime.director#curtain$show()');
    return this.oops();
};

/**
 * 隐藏幕帘。
 *
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.curtain$hide = function() {
    this.runtime.logger.error('bigine.runtime.director#curtain$hide()');
    return this.oops();
};

/**
 * 显示 LOGO。
 *
 * @param  {String} image
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.logo$show = function(image) {
    this.runtime.logger.error('bigine.runtime.director#logo$show(', image, ')');
    return this.oops();
};

/**
 * 隐藏 LOGO。
 *
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.logo$hide = function() {
    this.runtime.logger.error('bigine.runtime.director#logo$hide()');
    return this.oops();
};

/**
 * 显示开始菜单。
 *
 * @param  {String}   image
 * @param  {Object[]} buttons
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.start$show = function(image, buttons) {
    this.runtime.logger.error('bigine.runtime.director#start$show(', image, ',', buttons, ')');
    return this.oops();
};

/**
 * 隐藏开始菜单。
 *
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.start$hide = function() {
    this.runtime.logger.error('bigine.runtime.director#start$hide()');
    return this.oops();
};

/**
 * 无画面变更。
 *
 * 此方法用于不涉及场面控制变化地游戏事件动作组件。
 *
 * @param  {Object} context
 * @return {bigine.util.promise}
 * @final
 */
bigine.runtime.director.prototype.oops = function(context) {
    return bigine.util.promise.resolve(context);
};

/**
 * 设置房间。
 *
 * @param  {{room}} metas
 * @param  {Object} context
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.setRoom = function(metas, context) {
    if (this.room == metas.room) return this.oops(context);
    this.room = metas.room;
    if (this.room.interactive) {
        var self = this,
            points = [];
        bigine.util.each(this.room.interactive.map.points, function (point, title) {
            if ('length' == title) return;
            points.push({
                x: point.region.left / 1.5,
                y: point.region.top / 1.5,
                w: 1280 - (point.region.right + point.region.left) / 1.5,
                h: 720 - (point.region.bottom + point.region.top) / 1.5,
                i: point.image.src,
                t: point.target.room,
                f: function() {
                    this.t.enter(context).fail(function (error) {
                        context.logger.error(error);
                    });
                }
            });
        });
        return this.map$show(this.room.interactive.map.image.src, points).pass(context);
    }
    return this.setTime({time: this.time}, context);
};

/**
 * 显示地图。
 *
 * @param  {String}   base
 * @param  {Object[]} points
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.map$show = function(base, points) {
    this.runtime.logger.error('bigine.runtime.director#map$show(', base, ',', points, ')');
    return this.oops();
};

/**
 * 设置时间。
 *
 * @param  {{time}} metas
 * @param  {Object} context
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.setTime = function(metas, context) {
    this.time = metas.time;
    if (this.room) {
        this.room.time = this.time;
        return this.back$show(this.room.snaps[this.time] || this.room.snaps['']).pass(context);
    }
    return this.oops(context);
};

/**
 * 显示背景。
 *
 * @param  {String} snap
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.back$show = function(snap) {
    this.runtime.logger.error('bigine.runtime.director#back$show(', snap, ')');
    return this.oops();
};

/**
 * 独白。
 *
 * @param  {{id, words}} metas
 * @param  {Object} context
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.voiceover = function(metas, context) {
    var self = this;
    return this.curtain$hide().then(function () {
        self.se$cd();
        return self.voiceover$show(self.runtime.episode.theme.voiceover, context.state.convert(metas.words));
    }).then(function () {
        self.voiceover$hide();
    }).pass(context);
};

/**
 * 显示旁白。
 *
 * @param  {Object} theme
 * @param  {String} words
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.voiceover$show = function(theme, words) {
    this.runtime.logger.error('bigine.runtime.director#voiceover$show(', theme, ',', words, ')');
    return this.oops();
};

/**
 * 隐藏旁白。
 *
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.voiceover$hide = function() {
    this.runtime.logger.error('bigine.runtime.director#voiceover$hide()');
    return this.oops();
};

/**
 * 独白。
 *
 * @param  {{id, words, player}} metas
 * @param  {Object} context
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.monolog = function(metas, context) {
    var self = this;
    return this.curtain$hide().then(function () {
        self.se$cd();
        return self.monolog$show(
            self.runtime.episode.theme.monolog || self.runtime.episode.theme.voiceover,
            metas.player.title,
            metas.player.avatar,
            context.state.convert(metas.words)
        );
    }).then(function () {
        self.monolog$hide();
    }).pass(context);
};

/**
 * 显示独白。
 *
 * @param  {Object} theme
 * @param  {String} title
 * @param  {{src}=} avatar
 * @param  {String} words
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.monolog$show = function(theme, title, avatar, words) {
    this.runtime.logger.error('bigine.runtime.director#monolog$show(', theme, ',', title, ',', avatar, ',', words, ')');
    return this.oops();
};

/**
 * 隐藏独白。
 *
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.monolog$hide = function() {
    this.runtime.logger.error('bigine.runtime.director#monolog$hide()');
    return this.oops();
};

/**
 * 对白。
 *
 * @param  {{id, words, from, to, nick}} metas
 * @param  {Object} context
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.speak = function(metas, context) {
    var self = this;
    return this.curtain$hide().then(function () {
        self.se$cd();
        return self.speak$show(
            self.runtime.episode.theme.speak || self.runtime.episode.theme.monolog || self.runtime.episode.theme.voiceover,
            metas.nick || metas.from.title,
            metas.from.avatar,
            context.state.convert(metas.words)
        );
    }).then(function () {
        return self.speak$hide();
    }).pass(context);
};

/**
 * 显示对白。
 *
 * @param  {Object} theme
 * @param  {String} title
 * @param  {{src}=} avatar
 * @param  {String} words
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.speak$show = function(theme, title, avatar, words) {
    this.runtime.logger.error('bigine.runtime.director#speak$show(', theme, ',', title, ',', avatar, ',', words, ')');
    return this.oops();
};

/**
 * 隐藏对白。
 *
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.speak$hide = function() {
    this.runtime.logger.error('bigine.runtime.director#speak$hide()');
    return this.oops();
};

/**
 * 提示。
 *
 * @param  {{words}} metas
 * @param  {Object} context
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.tip = function(metas, context) {
    var self = this;
    return this.curtain$hide().then(function () {
        self.se$cd();
        return self.tip$show(self.runtime.episode.theme.tip, context.state.convert(metas.words));
    }).then(function () {
        return self.tip$hide();
    }).pass(context);
};

/**
 * 显示提示。
 *
 * @param  {Object} theme
 * @param  {String} words
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.tip$show = function(theme, words) {
    this.runtime.logger.error('bigine.runtime.director#tip$show(', theme, ',', words, ')');
    return this.oops();
};

/**
 * 隐藏提示。
 *
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.tip$hide = function() {
    this.runtime.logger.error('bigine.runtime.director#tip$hide()');
    return this.oops();
};

/**
 * 设置人物。
 *
 * @param  {{character, position, pose}} metas
 * @param  {Object} context
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.setChar = function(metas, context) {
    var move;
    switch (metas.position) {
        case bigine.runtime.director.POS_LEFT:
            this.leftChar = metas.character;
            move = 'left';
            break;
        case bigine.runtime.director.POS_RIGHT:
            this.rightChar = metas.character;
            move = 'right';
            break;
        default:
            this.middleChar = metas.character;
            move = 'middle';
    }
    move = 'chars$set$' + move;
    return this[move](metas.character.poses[metas.pose] || metas.character.poses['']).pass(context);
};

/**
 * 设置左位人物。
 *
 * @param  {String} pose
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.chars$set$left = function(pose) {
    this.runtime.logger.error('bigine.runtime.director#chars$set$left(', pose, ')');
    return this.oops();
};

/**
 * 设置中位人物。
 *
 * @param  {String} pose
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.chars$set$middle = function(pose) {
    this.runtime.logger.error('bigine.runtime.director#chars$set$middle(', pose, ')');
    return this.oops();
};

/**
 * 设置右位人物。
 *
 * @param  {String} pose
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.chars$set$right = function(pose) {
    this.runtime.logger.error('bigine.runtime.director#chars$set$right(', pose, ')');
    return this.oops();
};

/**
 * 改变人物姿态。
 *
 * @param  {{chracter, pose}} metas
 * @param  {Object} context
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.changePose = function(metas, context) {
    var move;
    switch (metas.character.position) {
        case bigine.runtime.director.POS_LEFT:
            move = 'left';
            break;
        case bigine.runtime.director.POS_RIGHT:
            move = 'right';
            break;
        default:
            move = 'middle';
    }
    move = 'chars$set$' + move;
    return this[move](metas.character.poses[metas.pose] || metas.character.poses['']).pass(context);
};

/**
 * 人物出场。
 *
 * @param  {{character, position, pose}} metas
 * @param  {Object} context
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.charTowards = function(metas, context) {
    var self = this,
        move;
    switch (metas.position) {
        case bigine.runtime.director.POS_LEFT:
            if (this.leftChar) {
                return promise.reject(new bigine.error('左位已有人物'));
            }
            this.leftChar = metas.character;
            move = 'left';
            break;
        case bigine.runtime.director.POS_RIGHT:
            if (this.rightChar) {
                return promise.reject(new bigine.error('右位已有人物'));
            }
            this.rightChar = metas.character;
            move = 'right';
            break;
        default:
            if (this.middleChar) {
                return promise.reject(new bigine.error('中位已有人物'));
            }
            this.middleChar = metas.character;
            move = 'middle';
    }
    move = 'chars$in$' + move;
    return this.curtain$hide().then(function () {
        return self[move](metas.character.poses[metas.pose] || metas.character.poses['']);
    }).pass(context);
};

/**
 * 动画展示左位人物。
 *
 * @param  {String} pose
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.chars$in$left = function(pose) {
    this.runtime.logger.error('bigine.runtime.director#chars$in$left(', pose, ')');
    return this.oops();
};

/**
 * 动画展示中位人物。
 *
 * @param  {String} pose
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.chars$in$middle = function(pose) {
    this.runtime.logger.error('bigine.runtime.director#chars$in$middle(', pose, ')');
    return this.oops();
};

/**
 * 动画展示右位人物。
 *
 * @param  {String} pose
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.chars$in$right = function(pose) {
    this.runtime.logger.error('bigine.runtime.director#chars$in$right(', pose, ')');
    return this.oops();
};

/**
 * 人物离场。
 *
 * @param  {{character}} metas
 * @param  {Object} context
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.charAway = function(metas, context) {
    var q;
    switch (metas.character.position) {
        case bigine.runtime.director.POS_LEFT:
            q = this.chars$out$left();
            break;
        case bigine.runtime.director.POS_RIGHT:
            q = this.chars$out$right();
            break;
        default:
            q = this.chars$out$middle();
    }
    return q.pass(context);
};

/**
 * 动画隐藏左位人物。
 *
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.chars$out$left = function() {
    this.runtime.logger.error('bigine.runtime.director#chars$out$left()');
    return this.oops();
};

/**
 * 动画隐藏中位人物。
 *
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.chars$out$middle = function() {
    this.runtime.logger.error('bigine.runtime.director#chars$out$middle()');
    return this.oops();
};

/**
 * 动画隐藏右位人物。
 *
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.chars$out$right = function() {
    this.runtime.logger.error('bigine.runtime.director#chars$out$right()');
    return this.oops();
};

/**
 * 显示特写。
 *
 * @param  {{cg}} metas
 * @param  {Object} context
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.showCG = function(metas, context) {
    var self = this;
    return this.curtain$hide().then(function () {
        return self.cg$show(metas.cg.image.src);
    }).pass(context);
};

/**
 * 关闭特写。
 *
 * @param  {Object} context
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.clearCG = function(context) {
    return this.cg$hide().pass(context);
};

/**
 * 展示特写。
 *
 * @param  {String} image
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.cg$show = function(image) {
    this.runtime.logger.error('bigine.runtime.director#cg$show(', image, ')');
    return this.oops();
};

/**
 * 关闭特写。
 *
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.cg$hide = function() {
    this.runtime.logger.error('bigine.runtime.director#cg$hide()');
    return this.oops();
};

/**
 * 幕间休息。
 *
 * @param  {Object} context
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.rest = function(context) {
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
    return this.curtain$show().pass(context);
};

/**
 * 进入自由模式。
 *
 * @param  {Object} context
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.free = function(context) {
    return this.curtain$hide().pass(context);
};

/**
 * 选择。
 *
 * @param  {{options}} metas
 * @param  {Object} context
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.choose = function(metas, context) {
    var self = this,
        theme = this.runtime.episode.theme.choose,
        btns = [],
        count = 0;
    bigine.util.each(metas.options, function (title, value) {
        if (5 < count++) return;
        btns.push({
            x: 640 - theme.width / 2,
            y: 0,
            w: theme.width,
            h: 0,
            i: theme.option.back.image,
            ih: theme.option.back.hover,
            t: title,
            v: value,
            c: undefined, // resolve
            f: function() {
                this.c(this.v);
            }
        });
    });
    return this.curtain$hide().then(function () {
        return self.choose$show(theme.option.text, btns);
    });
};

/**
 * 显示选项。
 *
 * @param  {Object} theme
 * @param  {Object[]} options
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.choose$show = function(theme, options) {
    this.runtime.logger.error('bigine.runtime.director#choose$show(', theme, ',', options,')');
    return this.oops(context);
};

/**
 * 播放背景音乐。
 *
 * @param  {{bgm}} metas
 * @param  {Object} context
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.playBGM = function(metas, context) {
    return this.bgm$play(metas.bgm.audio.src).pass(context);
};

/**
 * 播放背景音乐。
 *
 * @param  {String} id
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.bgm$play = function(id) {
    if (!this.bgm) {
        this.runtime.logger.debug('[director] #bgm init');
        this.bgm = new Audio();
        this.bgm.autoplay = true;
        this.bgm.loop = true;
    }
    if (!id) this.bgm.src = 'http://s.dahao.de/oops.mp3';
    return this.oops();
};

/**
 * 播放音效。
 *
 * @param  {{se}} metas
 * @param  {Object} context
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.playSE = function(metas, context) {
    return this.se$play(metas.se.audio.src).pass(context);
};

/**
 * 播放音效。
 *
 * @param  {String} id
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.se$play = function(id) {
    if (!this.se) {
        this.runtime.logger.debug('[director] #se init');
        this.se = new Audio();
        this.se.autoplay = true;
    }
    if (!id) this.se.src = 'http://s.dahao.de/oops.mp3';
    else this.se.cd = 2;
    return this.oops();
};

/**
 * 延时停止音效。
 *
 * @return {void}
 */
bigine.runtime.director.prototype.se$cd = function() {
    if (!--this.se.cd) this.se$play();
};

/**
 * 播放 END 。
 *
 * @param  {Object} context
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.end = function(context) {
    var self = this;
    this.bgm$play();
    this.se$play();
    return this.curtain$show().delay(500).then(function () {
        return self.end$show(self.runtime.episode.theme.start.image, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABQAAAALQAgMAAACyEzXFAAAADFBMVEUAAACSkpLX19f///9Lq6FbAAAAA3RSTlPM4PH2B5qcAAAHKUlEQVR4AezBAQEAAAQAIP9XewFUAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALRJ9uwiynHsisP4lZ1pLRo8Yc5bZ+X9SgoO8yic1DKc2oZVYWbahXFwv8h5DWF0hTkOc8rd0VS7e/T0RU+Sq9RPruHZ3W/lv5e/Y9X1cd0YTu1eFXE+FZHsxnBqd9+hLS+G1OHCeTB5lr1EfJqZi4xwrVg427Ku1aubbgIoRauLKETGrQYunG2Wpmr1qs2JVhd7rJhlKxbOEDBXwLCxdznMohUL5+Nuqvv8ELCddVoEacMy82LhNADFekBE81mO98SCGQImrPrnTR8TzZcw74kFcwB4/qabPg7ZtbJKMxQ9sWCGgL4IZD9tQtkH9DMAXFikbgU4xsl+Wtx95H4O4IIZAvqrfDPVTb7Pi08bkeZV9vxOLJiP8149QMN+hfi06JzklRzuxMIpEjO/S0Dt2r5YO4eAloMBtZxsoxMbzpjZ3QBq/SMSzMfL4T7gI7Mss/w0890oojUkfbFgRqR9wCZLKtpeCbRi21lGdWMwDccnHO8BHvg9WgFnIrhwGmaGrT1A/wQ/myrL9BkOALONViych1n0Aaf0K0XrACs53IqFc8xySur17hZQAR8iuHCOcMk9A1TA7a8KLpxClXTP790A6hHZqQQXTsmx1V0CanknBoIbzATcPmBdTCXaesAUN5imBYz2AE29tXWAO2zhBnMCZQPoOsCcc1lbKlof8NfMcIMZw7IPGLHXTLQWsPv9qhUL5hiKPmB8MKACLnCDGcFCLKMVoDkIUAF/TIEbTIF5A1i2gLkCDgEvav4Jsu3Fwun3TCxjlg1ghAIOASf4tlniBlOSBjDuAA+Dk6ZpAKiAM0pcOP1eNIDnbqTySwEPBLQON5jSXuHDUFBJhAIeDJhXuMEcQSmWSQto6BUAKmDyE9xgxuDEYlrAqQLeBeCTBTeYfsjLbppCkWX6CVwPKCKm8cANpgFSkQQK8ZwKuB4w7wEGE46L2BYwZpcqa9pUwH3AdMRKLJyww1wiPODnZcyP9AoPAeMtsxIL5wg2WMi4AazSUTUaAirg5vGcf7Vi4YxhwlION4AU0XKkfwOHgHwT3tOKhdPgYpxMqSj8ningOsAdqsOtWDhzlmOcWHYpIpykCrgOEJadWDgti4g/H4I/toCigOsB551YOBNmQmrgpAcsPaB+jVkHuOXFIlw4DVvyGrHwVJYjliJ6hQdZwMmEWfZsynAeRuTiGFwNF1Mo4JoAdv0TCZThjD1XDssR0AJyU5NtAbUR3MGboRFbDmYhEgPzBnChR2RYBLM3RMBxC0U4Zd6abUV4RgVck63k4sgb5bAYzFRELE6kJRsCatNCxIulOczC2ZRTiOQeVQHXNPmgiICTBNJwNhkvZ6ASPSJrOiR18GdJqs+Hsy12/n3LR0W/xhxUlt3FHM2lTQHvY6lomqZpmqZpmqZpmqZpD1bRteK7SMKiVPZ6pGirLCXfdTELM7eXuEmxWaUCT7F/HnM+HVeHS1PkxDDbdMJ3nSmIy4i5aAFgYRY1oDkNM4FLcGM4PmJSThd5PdmGrRbwkvIwTgYpYFEDTv8Ic4FrYAzzGtB1gD+GWQv4jtJQidb1cr5cuxymMMsaMPlxNV0I/9y4g6exuYgwLplbnnl79Ykq7wC/WU7PIFrXiNQD3rk0ZQ2Yn3JmIRw3HtCsAO2WWcYun7eAPy+TM6TSTwEnNaCrAXlL9bhP9wE3XDLjQsC/KeAawLOlqewlVc32QbkA0D+5+fE+4NkQUAF3nGkBIaIQ4acNYD4XD7i9D7jjAe8sk4X0U0Cc+Z8zcAmV2EoEmiPCB4VND5jMPOAjrwUPSJmczmRtCohMma0Aq7QGtPmJDlBkD/Bs+Agr4JkOMI2ZrwDzmdjb8xpweneAekSmf6zMDpdUbIkt9o+IWJvbk9V07gFf9sH2iNgy2Q0BFfBOzL+4xHHiK6YPmNupfTN20b/CeZmcDgAVMAHztxrQ/qiaXADI1L4FFPAeAG78qQbMQ8DK1C8o+oAbCjgEzHfZ+GMNmPwR0wDu7gNewqYHrPLZCnB6JgRUwD+w8QcPeBo84ATGHjBxNWBlasAxdIDXlIYQUAG3+ZQHNIVlLhyPcR3gxL+7NMsI0hbwinKigOsA5y0VqXA8sn9uAKc1YNwAyt4v0peUoypRwAO7J/8TeYQy/b89OBYAAAAAGORvPYtd1Q4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACHqnjzoJjSYsAAAAAElFTkSuQmCC');
    }).then(function () {
        return self.curtain$hide();
    }).delay(2000).then(function () {
        return self.curtain$show();
    }).then(function () {
        return self.end$hide();
    }).pass(context);
};

/**
 * 显示 ED。
 *
 * @param  {String} base
 * @param  {String} cover
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.end$show = function(base, cover) {
    this.runtime.logger.error('bigine.runtime.director#end$show(', base, ',', cover, ')');
    return this.oops();
};

/**
 * 隐藏 ED。
 *
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.end$hide = function() {
    this.runtime.logger.error('bigine.runtime.director#end$hide()');
    return this.oops();
};

/**
 * 评分。
 *
 * @param  {{rank}} metas
 * @param  {Object} context
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.rank = function(metas, context) {
    var self = this,
        image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABQAAAALQCAMAAAD4oy1kAAAAwFBMVEUAAAAALjkAM0AABwoAGB4AEhcAHiYAAgMABQcADBAAGyMACgwAJS8AIioAKTMAFRoAOEcAEBMAPUwAQVIARlgAS10AT2MAX3cAbooAVGkAZoAAWW8Ad5QAh6gAf58AkLQAqNIAm8IAtuQAAAAABgje3t4DJCypqakgY3MnQ0ksLCx4eHhfX18bMTbExMSSkpJGRkYvPUAAzP8rSVAqTVb9/f0vP0Q/wOELi6w1ttcYmLguQUYsrc0mVWAjpMRQ0fGPN02HAAAAMXRSTlPM1tfO0dDTzc3P0s7U09XR2c/Z29zd3uHm3+Pg5+vq7vTx+fvh9eXn/vzS3tvz8OTXVzvORgAAd8BJREFUeAHs3DeagzgcwFEdgIoCXKDPQkf43/9wuw5iwMOkjcbzXuPs8gcKkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABJ9GdNfcSpdelBylwAOI0dEny6G8TN92ujmiNq9/6spARzDUCNayUp8Ju/8bt42MS6qBAKH0MXN/MMA5uV3Tft9yynAs5ta3n4WwGHn3VPcTQngCFr1hp8Ngad3tevi7pwADqGry7j1XC5qRFnbBnAxx93poaRzAjiIcTlxW0K22hczLhN7Q9qqcVPSVT7eBCDAOW761ZndfHvRL/mb0qNuc2I46N8BAV1dneGNcZe71M87w98xN9c4lnyznA/mZkyHABgE5/UG56s6r1r4Jsc35fT8AMpmgm+s0bTRsAC+KqBLV32+q+v+5btJAF8XMMZnigC+KkAAPwcI4JgflO3y70FWgQHy4i2A9+tBLurqeUn7shO+QwJisQSwrM4Gc3sugK8GEEBgRQBrvphXE3uzAAK/I4B7BBAQwCk3+6vAW+l5AZQ//SSAJX4iHQHgntCfbYMRwBcFlC9XgQXwtQACCFC+3AYjgC8KKH9rFTia+sKrwIAA7jjFYkgAvyiAXV1/4YUBtsE8mt0BEPgtq8APptg4pdcCCGBevb/bv1pMAwIvF8D53HbBRP74/G8c425KAK8SwI9n+Lrls3NK59XzowAY4mrYDeAUiz5tjDXuardeDa5jOgaAYcnYXgD7aM77p3+tjEMsyiESCDBFU8ehXNxKd3s+pXr/cNrkL8ebYQnpokzpEAD9a8opvTOMF2mtn2Nl2F4T0sxTlw4AMP5dlJJvTuNWvuhT6qYSK3X4+M/qWQOBJ9ZGuPEdNXUlNsomcX2NjZwAnle+L4DM8Q358dKPvPN3B7k2GKBv+1hyfK3fXvxb+vTOUGLRJeDZ2QU9bJc2Pr8dzPzFfr+xJXBMAE9telvH7XKp8YnT6gZYdUofGmcTgIcAxLSz7WVX62Rd5W9fN5WaAJ7d8PNfGNwCAAAAAAAAAAAAAAAAAAAAAPzBrp3kLKwDURS+mymVZFtlT87+t/bCTyB0r++CdL8RMfOjcvNPyeq6qFz6pIN20PUss8nM7EstCG0m/PkALkgpn+k7mJkVLEktSP3pAAbRJJ5pM+PXTJ2DmVmH1CYhHg2N2MH7r6GLhCEJKm8KtEl+TcrM7BRaEE3S4EVX5zd0bQbk62DYf2sCPFEAzcwKYu9gPyQsteOj7yD71R7N0ucAfpZADJ2BmdkEQlLB0CGo3z8DbBBNFzzTZyuAbDoDM7MBEFJC6iLIxwvhrk3rU7vem24GRNMfD2ACTJ2CmdkCilCH0mMAo3RR1+WKcfzbYuqiAUvKWn9oC7wCqKZzMDNLGElIM5rGvAVwSU0XE1IqmEcAE2JpUwxpQb4H8Pzjn5lZTSWh40Y3SE2mdhPm0T8FKU2uC61JCkISxAH0apxx/DMzS+LhRC9IFdTnyS1ISSsYx9/jD5wBBkTXyZiZJXH0T0FKeYxrAxh6DqDUdbUgtYHsN/k5gE1nY2aWxNG/4xY42uMAOPNHELnTpgW8XQ633vUqQGZmpwxgvwWvQepewB5QRUjBK20KkNTzjQNoZt8SwEE0jYgApi4mpQlMDeia+YOnCTABJCVvHEAz+5YAqmvDReiqSy1qSQ1KO0B3E+p9AoTyBGhmX2JG6mpm5tSDpk08RBEYOj6qg15Al88Azey7tJjajRi6KYClHwmkdo1SB2n0R5C993H+AJqZVU3NSCmPuAUsXSUM6Lf1BN1kUwcpeBcOoJmdH6SS0OPrvxZE00XBPF7/QQumDh2kjEcQm3QAzez0JiwloeP1X+UaUJJawNQ9gEEpob0EcDOZ33YGaGZWhG4B1KQkwdSE1ASm7gFMWGpBvQewYHxXAM3MFswjgOqSBgypYA5i6B7AASlpwnwLoALaVwXQzCyhSUk8LUlqQVdv2jSY0oA4jgVfA9iC/PUADgiZmZ1Ku091XbsOpc1o2hUsTWDdWke+BlBj3le67mbkBVAyMzuXlUtS48nQTcUGquXDcguIeQTwhtjwekmyGzIzO6VR3NXQXXIRrSCW9FjA9hbA4Efq0PgRtfRdzMxGboa0+IW9uzasMIbBABhmXCHMnP1H+5m5eXwn6avcGjrXP3N7vH9pvwBfH7PV6wTgZQsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAVw+GC3dW6t7Keu9sVwt0yOix6qIpeqORE2Jyzr+8APOp2GnXTdVyRJGr29xIv+1HtvVy+7EU1xVfcUY14G/c64LPH4+djp49e95P80+V+oo9Bj/0+R71O9jZFyG5d8M6tA0EA1zFD4JgjrqDw/T9cdyaOvd44/56gr/R+O7bFhx7lC+ZHPmG9YehnJJPJdcqG2WiUtfEqalNMt0nKv/fw934Buq9zUM8imGXNMZNt1rSfhOpjg6GhM59LxJhW4xUtl0ssWnOjXtCX6fVjWy3XiryIlcpOouyDE5Z3OV20Q8I5dsRo1+sVq3Y3btrDeEWer2db9d96pr1SHq9H7Pa4xe7GteV4lBjnTocO+OEuGn9YYx/ZxcoSyykkgfzPGltyR3/bD3rKWlvCingVYE5D2gw3YoQZDUfYnQzkzs2wJLyD3gADuL3/F2C3dANipQwavgAlswW/fhkcNGpsJMFw4/oPqzZurJylsnZ6lvyhTAn2bQVuQwVygxLTKkFZezlk2yOBqkDZlWQDcqcjEjWgJJB7HjWgpCEVgXjSIdoTE6skmPd8i7b3PRFOG9+TrT7EVB9G4Sf3rojtPlt/53raDliAPXaJnLhOLftTZ/lBGSkiubLVVPlhaqb5QPWfM68bcKhsACXoZeT6D+QuZq78XPtNJXx2QTr67/8ClCRNk3z9YRG/eiRD3OAhcBToDvQVqPpPPQdCogFlfA32sYKtjDtruQyOhq5AKCMoQIT2ko7nQFOBlwNCZ24Y78iYBlRPgfV4qgElGHpxwzSeLrYCP+7BbwjHdKAel4RnGJfgVY/gRg8M8kH7YTyWH+Kx90z9JdrvwHUg234XDPnTPPXt99is7+zZ15LVMBCE4SLnbJPz+7/jBvVaPb9aZZeLS07rIPZ2F/joGa3gbxn8o323p6fSV/QzfgAQ+Jk/9b/HtxMS9FMG/p5F5F/JqQn4/yNQ7B8DmARiDHbe6VZIIPyTgQ3AbmCbAHq6gEawEYhxOBiss/DbnIaJYLvWzuDSZ+HVHdAIWsJaA+2gEHTYA/UvGukE/mgC/uwEogY2S0Cg1KkRfbrCPkYE0rqd/K4H9lk/42f9JvWvZrCvxf7pR8WhVyf429z7av6ae555SywfZt5i4Drot0y632L95t0v9XMm5W8U8LlS/dv633n/TgAoCS5D8LGA9k83DTR/BNApBLagAk5boBXMQbgy+LZdXAjawToKL+0Xm+AiAjkLswmyCtrB2kG4DvysjwhsMX+7NZDhKPxbh4GD+4GG+2NvMXDOH/Vj+0P5Q/f7Af3ab9j6Dc2vtemsfmh933T0FaIVRql/2/9sqH1l8F1SPn2OJ1/yN+h3bzr7gr8pgOSPAJI/Anh5Aznv3/EMzA5oANkDk8AAEAY67oAGkNvAXQLfogbqdqIGxjQsBcVgcRDV4dvtUVrbcAmEgSotJnD7l41ZGAL+LAT+AH9H28C/2Aa26x8jS3Pzl/jRP6X4R/5y8sXgOx17aZ9Oxp0PqWPvhh4HX9unLIjZc/VjiB/5u2/97uXyr+Pn/vfY+HEA7vZ5+3em/tk+8ldyATBfQrL9BYAPUsD6GPLOADoQ8CEJxBj8KnvgPSMICe8cfDt9G357518quNweKFgTjyJO7AS5EkQwC1vAn3e3BRwIRBEsCP6e1kBPqTs98OTsK1gHAv9YwKP2N5Y/8DeG9iV/2rN658r2h2jjV+0zfix++dDL6tf+irj3jd3vfdGvLv/ahgbl717Wv2n7exjtj9s/6RcA9vePF8FfApj26XYuDyFP9x5CsgJm2ABhIBaBAtAGikDUwNsK2K75NlB/2/gywpdhLgXHNxGWwTUUBIJ+HB6CGsh9oP4VG0GUQBiIGqjjVaCXgcXAJLDs7U6nT7s6tA/6Mc0+Jmdfx/6DPgto+MjfXvGDfM41e2eiVEt2K9HgBu75cm3a0A+P//+XLw5iodqrUq4ogvBYWWfw1O15ndRWSludDoTLR6ZfQU9dj1Wx8L2rz1V4v4dU/H5V9Wv7Z/8n9rn+/fk6/vsMAIp/AiDaOMDZBYLB1zY+cRhXwuX+IwJR90MGI/jF0nGg+iJbCLomnjOC9oIzBUnGzOnAFmQwA90PgYCTDQRay3OGfXzT9TD+svfjQdXNbvitpW8dfm4L3xB4sdzrLcct8gG+te7d2r6neuaal/aY4Keex+PvV/Nn92f6UcAYf2r/bvD3Df6dbH9Av3MA/N/m36jxFDCZwAxA28BGYKt8PwSEf3MwMJwHYgTVFSYbg9wYfjQENxQkG4NVGJPS9ZiAqSu8ZSD/z2+ZgDBwPA2EgPaBYuBIQYf81O7gy/QLmb9FZHlc+jb8XPeafbusc8r4rREXurw68HO62egz/uz6in07+Dny0uwz/Zx8ifQDf/ep93t7kLN/zT8DMOv49O8CoH1gZCAIdCFsAFYkkMEQz4S0KIQXAcB3Cn6dICgMOiN9ezods6mE2weKhagjgs/1LBoPBBEUlBOMAelCgxkIBIXAo55wE2xN8fHUK/81/rDB+znyp9TLUPiCP1e/zruUU54L33Te91Kvgl5ZPlq9R8avPsea95HHZ37t/cAfem3MtR669fsQOr9r+LlP/745+4fq9I8TQOgHAF3+XgA8oxGAQW8uezSB6gjfji6ogn0UaASKgG6ImIA+DSwC3rURhIK2gfKCILBjMnFobmYgGcHS0hSu51U+C/xLvUJXuHqmJqBTMTAwQtAE9F80G9Ohn+Hn0vdw3uOv8n71MR383V5q+K74m7LN6Fnog3+z8XO3o/X+I2n+Nfti1zebvwP+fVf2D838y+2P7P+smX+XTk+EAMBlLOSwEP6mbrAoODLwlzAhAgEfhMDqiDQEaYpoXi5Uw3z90SeCWEGSMWZgnzt1W3jRUgrLBi6TwkrGIEEw52IMQcVkDDwek2+mn/l33PaYKt/Q8J2tH5FzVbzbkV5NdbSEvtsj2fX5wA/6LVp/YGPjI+VeXPyCPyWfoV9o/waBv9H/fT4ALwC6HXxQBgPABEGsIKGY6AE9IHJ75ymRPC8sJ/joURGS0rwXAtZfWl2gWiMrBAuAUFBdYUCYGIhFygQ0Axt/YqDgJ0+oaIvpl+An/qnuPez5/g3vh/Wz89vS77cMv9+c7ltCLvNIG2LgZ1E47bt9W4vz6/PlpfVr79cag89L+yPaPx//iXz1Pjn/ZvoJgRf/TthAJACOHtD9YHdDiEZ/t4ZivgsIfHvhAnNfOISk61VNvMdMQbdGckIGCKJtU+TF6cAG4WIEFwLqPPDYBQJB+0BBcLSEvGb28Syqc78Bf8Sdl76HCl9PekA/IdCF7zDVxmCH+DcYPzzf64dUpUB0fvX5WkWYfoaf8Tf3PhDwc/RZABT/1P+FgecbIOfwdwFQ/NNk3ARA74jpfsjYDWlFG9jDwsj0C/EYtOYDoeDcIY7N4efXd7tA9YaPGsMVdgsBaSDYMgLHUthG8LwEP8vs88Gf2h5u+S7THu/5SG91aZWTNvmQUs28l4ifLF8NQUqc9TnsooavZz0gX951RfTF9EuLX3L0+ZvcX9Q8/nYVwOcXpH6QgD+vHhAMpungDQVR6AmPwyFuiGAFAaCN4BcIuCRkGoEsjqmPgh/V8OOOgU3Blhi4hSD8c0AQCmplTKGhuyEKxqgSPhyUq6/z7PsH8OOZd/ztm76NQFq+f6Hwtfnb7NWh8DX8KnOE87Pnywk/5fskYw/47Q/93PW4i6GXZeNVzv2New9uBdFW3nyV8Ff6YP/jAqA00M8ENAAxga3YDA5HgWNL+P4WjQaCczgQCM59EfTFMUEYiOwDlY1RZ+TJEFzWJ+wYKK2xGA3K2QTOp4G9MgsAqjXMc8701QvNa17CkqsWdW+ufOGf6ddq6+d08zPOz+RTl7desdeBjL457GJtJ92+CH4Uvsj08+AHBIz0MwBNv+gAP38F1lUEHzNw4Z8Z6EI4uUCbQG9M9YTI14WAQmBoDntejgNBpIE5BWSQBoebhFNzGPlA0FMiEFC1cMwG2gcWm0YEqjTuNw/k4/vA+x3g7y9ecxD2u6z0A3/1jfnLy5vx2o732fiBv1/Lu5t8U6vX/FO7l8pX7Htw+TsPvSHVvrP5+90xAD3/YfaNAJx1QXB2gQYgmgFY8U0IeLQlxoWwGiLUwV9BoFYmTNuz6muthmHgEpUuCkp7Bj4BwDgzF1fquyHifDQIbPp5UnishHkk0MerIbcBX8ae436G39L36BVX7nqw3XQe8/Uq06Hba+fnejeXvQo30+faV7wddfGCA293bvDBv/o8zv0Zf8r+IR//jdNvLEA4bH8YgLMFvAA4a56KMwNHB7hOhlQzBAAGEsLAuSViH7hkY+wF89iwGFjKaenWGwL5ci0MBr1CsDZoIXFAe/QNQRDopVnzgaBB6NIYFg70+/tMv0Wa89WWA+wfox4T+Tzn8YKY7vACq+OJ3l8tvL3FHnFMX33Mda/bHj73m+0fvY/7uPaKY6GD6lcAvALQn3lR0plm8AxASQycbw2Bf7aB0opAHwnW0xgcQ4IeF1kRqJgMSUF1hpECMgAQdTZmXR84ExAAhlyMozGHDBQEj8WfJFxrNI+6wb51ufMYePFK0yXo/GL+2fjV+kbQF/ocwh9THTJ+0faJfRr0mLq+lU8FfTZ/3nk/TX58c/RliL+gj+4/uPiXNAPweDuMEzHHCISBUFCxaKLR35EL/GlG4Ne0O/DwRHAphaGgeiMygw1AQVC94e6JNAXHeWHwZwh6if5Wiw/0eWARbODgMfvqJbGsf8XfX9Xwbc27/cg6Lyv98loXbTQg4ML6PrU5KHiXjsdj7vT6sI+tLlF3od3rni/wS51fJV/2wb+89xnt4Of+73kAzrr08UaImyGBf7cP7wqkG4xSO+S7o3SgTwRxgeOwCEVNi4k5Q/DGQEBIXpZ1qhK+BALCwGddKCIGyglOdbAaIn8DgWYgrWGeY3mpqcMuPMNuewY90IQ+dIP+sNFvXOS3yfalfN+o9n1Uu3Q7LMYmY8fDADT8fPDX2nc+1ubHvd2f+Rd3v2gB4Mn0y6degX7tyZ8IGHYjFP6MQFPwXnujC4Dam5rWJSgeqCNBOUGGRczAeiIG0dgafqoPwrihK4IGIwgtRiPoWpilWYKgmiOJhn839Bp7Zy701bUe2nClgz8uMEL73S5zx+O50PfUlg/28U6zHerx7rq8TjjPq00Ju+jgT12PeeIN97dJ/m35N4dfZgAer3+ZdkBfM3AfBGCkoAHoOzOPLk3yaeC9myHIuxLkA1NjWAEZpwTNQORDQRNQmxOmI0H41xBkd5N6Ir5Ycz8pDGi0PDUnBGcOosYiftFyw0MLXnyhL01fnfoZf1ziRtIP7Z3fSxk/zv3yxvq4wg/rp0vLpS+d8TMASc8n7+e2h/E3dz5U/NL6M/tG/v3M6G8L/J0E4GUBR/aJgGd7IXhynQRKdan9uC9Vx4GsSVA1XAg0BNkbo2kRK4VkFhu4jcnM921qmeoCQU2KaHXMtD5wmRVeVmfpJhFB0DcLzwJ8fGa55p33+/lao3m9Vbs/4w/r58t6n+LS+l7YHOJ9irmU5bP4rzWxrw/9TD6jbyl8K5rVcurP+MP7KfhX7JtXP4f2x6SJfTeNbZBLHyNgqINNQDOQlKcA2AwMDZH3tnCYEvnOFPyaZ4bz3JyH5hBR2KktolGRcoK/alyEYVVcoK+XawAuCCQhXWDRwpjQExEGPypzL7MPGEf47e9ym7N+nu5tGX7Gn+GX7mwTADnceN+StoFePVmGn5q+O/Yl/Ln6vQ/BP659K4sg2fudj/9dZe9nADD3QqzxINCjIRIlwTQkjNQSqSeUw/VZv9eIQ0FVwvUlAm5zEe0GvTkBBPpYsBFIOSwIomlKZIoHHjEQip0CIbZvjLv4Pss86kE/O1o/O7+m39jzoNvLL0ssd+OlRT7us92T7UNKutQL8PGNZv5p5FdKg29lCdDB6R+a+fdRAF5l8NlAYK6DtRvBAETsjEYCYOSgYjFTc7gqk/rw9UrzJZsMzZmDfGMEDcHFDQYfuK+GGfFnUE579IXA8oGxKYLEQIY2uF7pr406vtTiHZ0fOrrN0lMeK/60y95ZF8147Lq8ol+8sCiF+5p8+6qXTeJCHyNuC/vqEfn+UeV7e5x8sf0Ll17O4WfDb5Lxd/HvNAM/PhjsOvggGq35EFZlaXO0dmZ9Jw4Kf4oI3r6Q7WC6X845GS+SQSzT0g0jOhNkobSOBO0D581ZtoGIDsR0rZxwyCdsJEWIpgkPTbmp7tWCFy92DqXvSw678Buxr3vzeZ8DLpVx8YmffsCEPvV5pQfrFwn4jfz7rn6vD70fJ4C+9beVer/H0x9XBPqz50LOB2JoBx8wEAKiw+X5rx/EpFUO+0iwXm0B6YzAwbczbkPQVjDfubmaQSlMy80INAO9L8FrY9wcdn9YUnmLpl4H37APKe0C/iBfWnJQycew3UBbXVrLBr/Q5513GXimo14Jfhx6pMleWT9utTwufOfKF/wNANTiA+nw9E+6AoCfog8dBL5+AUOGg8dKuG8QHlrCvkhYZlAR6bhBkE+FBdG0ThWF1shCwN2ZoG/bVEQaAg4MpBrmVqDjtTEuh0cOzmKZM+xL3m9ueYQL3eJe0/XW3nF9fYf8QB/YmzfWP2p7n7GHtqNAEr3eecJXcZc58NyRZ4noi+Dn4LPxd8r/Xetf/gXN4OPJEBj4cyZgzEbTEsEEGn9uiRyTcEVgfXpeZI9DTIPkeEzAoOIxvUxaDCxBwHGR/hIQ9Cb9fUJGJPxbJp65NwddYtBZ6ItVr8wf9HtJ1xY9wb+d6wtbrLY/Q33zVW5y9DqDYbTtDX3Gn1xfAmDu+i6CfOho7mNu/x6n/wzAy/59fhU8E9AAdDb65wRB5aPD4lQAGO8QsREc5kV8HOiuSC6HPUHsLQrpkpH5OLBrYY0Lk5KWE1RfmHhgDEpre4Kh9go7Y87Uc6/Xzs9pF221L2jPI77Pqny1yzRPtgXweW9zoS/ucLnznb3Ww9rq3e5Vs/Pbkw/4OfMn/r2WMVv4Zf7NyT8O1DGA/4ztz5cB/OBlIVsKGoCWTeA+HT3FYhwQNAN9LGgS5oERN4gdlan/J60RmTA1HBrDeyNYDPAVw+Og3BIRRL5QhPt3weBJyfShIp/gpznf36Qx7QL7Vvgl+jF9LfGL0yVv06+zffTz7yShTyr2acKD7/nUz9Nu5p8W/h0OfhiA6MTmq389AK86GAAui7LS5ZlFQI4D5QO9L0vlcAHw9qb4yOXwvE2w2sLeniAIioTaJlN6BINGoIaG1RRZpoX5kgsct2eRlPYq6WZhcY3PRD2eZfVC2GulU7/hGt8/N/2Y/WPOo/EndcNXm1zGRgeCebJ9He0TBPMW09n00e0NSw7c9L2J6iTAD/oNe19W8lH7ugA+BuC/noDXlZkug4/bIeSfqIOVDURw0GeBHZNmWs47tIp/36Ujwe4PU/4U/zw8bB/YDIwLVYlqcNuwN0qrGtaQyP5iuSox47VyEMoUhGp8bp9C42IaG4KIfotO/Bx2Ge7xBX4a84i3VvrKtrC/T8av6Hdmics81+a9Loq6mH150UF9CIA6/dONb7P5C87vHX8w8OLfPwF+H+oHG4AQEB1Go4uB04RI7gxz8gIH4d96sUhsjWzkmbn6inJnhEpMwyJaodXZmLBBEFhodYym5ZQRVGdEFGz82Ruu8JNEvpLJVw/6cz3jfgPDj4SQ+715oq2kqTaJ9OaEPdk+jfVK9QOZ6edjP/q+cdXpfaTfHzL+Dkc/avY06sLf5+skAI8X5sM/KOhi2AhsyQIKgGqPFABvH7pks08Ee3qOgAzXrce1qj4Y1OQcRqQZ+L5EsDm4t4ELB8eE9FIMKxyDHxQFaY+IhUf6P0f8mnx5yqNF1q90SL9FO/g1BPk9UdUb4DeAj96ub27b4k8A7OxUUtu+epf5w/jNpe949pdEuXSw+FT5l8/H3wVAXjMBRwh2MFAWMAPQNvB3MRiziBIjQLDL4foO54Hf2QW24N8YF0SeFmGxpn0g/6dWX/ipCcgsxLo/EApWZRmdIBeMm4LFwUrtiYRmHuRDPu8LO0292W8Hv2fq3hfhr3LhrE9U00Od3nFvM1ZvubFjn21+gHop3sLd5dKOd/xcOu8CBjv1Mt70sdz1sYz9Hpo/r345b//aynyyrnvTT4wHW+RhYiSm28K+S9OarSBlCRjsn22OBJeFWt3qmxZp3U1yKbxhoDHYJ4Jxm77mRFglDQaP+iILBHU8iCtcAn30N/garvFwxlnwmxY6+yqP2fo54rxAT7ZvQWCVvfJ7S7FbX9ZQ884S8/hZRfO8h0PPrx/a+WIKmn6I9PO/AoDXUeAEP1lAyZPB0rgwUNnAP/TmaK3N6nG52QdSphyNjUA/zc2JgjEk85627TTG4dUixiDjYNjA4YZh9IaioAGCfPJh5tn1NQJpwJh+4zb7ofI1+9zunbeXspwMhQsqm3q5zeFWL02O7WIDbzQFfYAPVZ8t0K97dAbgXPu6/VvmYEn+obMBQB9mnddl/vg6WwOjbSK6Xi3tjLYbzCMit6e+t/zjO0wOd2eE//FOEOysf26MzHctMWfVGk3gvFFfGwRLQmC4XW4dFykR1DsvSmo1euFtfRN1OfR+6K3cb61ZP5odrnjJWsYtLjTlp0m2u2V7X6x3Cbpw4Cf0ueQ9HvadBz7c+R3497Ml+/cvST9fqv8wZwIemEAoaOksUKJMYFTYd4iEgrj1zdsT+MH+7r5qmKOpuY4JEhS0H1RYkHCMS2H7QLRPSOtKERHQq2N8s5IEDwtpGDso11ZPub5APzzffN7ntEsOOXvAd9vw+P2+7vUOq3miA/mgD7fXRxpY/IIeb2ngHo01tM87rx1fIs9e+AL+5qnf3P298s//ztcGzwRcJkOOACi9nZNwFMjerDcPqOvkuivyLaSl69NhQWqbr4QEtUBBGRkT0IPDWBJfLlIHWY+CoFPSNEaQM4LNwBdaruBvOzIyoBAaMlDH3wbwvNAgLnO+abzMA/x5ymO8r9wrDXB9FLvCYMEP/o1X9N71OZ/21lesD/bt17notC8hsDUavyag9121DL/j4z/0r7/97cpDn+8GLx2Rw3PAHI4Bfu4MYwbvKyBo+FlvnZHbRkEFpSl7Xl66Hl4BSE5ms1SVd24NKynN3WRou076FQ7wjyPBentkeL5frjE4QfBAvrhczs/wK/49v9HP7q/vsAy7TJ10QXmBX8Fv2uDyRf3dcZZt7nN8xzvr7ST53lG/vOUv3nNUL4oac2++9Hxe/wL8/sUAvFzg+VSgjwKlTMD/Z+/MmtvGmbZdjpYvcmwr2+yZHKVU1oEOpuyaLZPM//9XHxs3m5eaAARqknofK8WbJNCUM8/i2Nd0oxsNkxmjEulx90Cfqy200iT1BLQZFP7111ApeFM8c1MQzEsFRwJ/aUB5KJzVSRerpAMEhZ9Cchhl/KsDcDisPBmIEr+a5yc0F4/yyMJe0IdEPY02keooJXrTjJTkfXjI+XdT3NNWlnv/TbdPC8oQsLzbg3Lnuvv3alrTl0jA8wFoz9fVrLYP2IYgPRJQKxDWJIHArd025Oer9zQsLAimUSwcKAgBv/v33++IhtekRjIpp4gaXqBdKCKwVCUdxJEipc4JdQiqWllx8Tv6tvAMf8RuyY1fBL/uQZWGpuVyFzy/ejfTke+H+vehJeN4TweFLo+PVwl3gp+uIJY0cvJV3D5fJBk0/MhEsfhX7fWiMUkFDu2uBzX6tTv/oTn9+39VDIMaAAxu4HkE7PG3Ii8MBbfF89WXGmXEzIjvWdLk8kj4r3///WeZTBYE05TmCMNIwKthw0G9RrDsCb6pQ7DQTNrIM2qhBQN1l9TVu9wb7UZ7OGQy1o8tt7sGv7jkZ08l6LWZSmfOqYy5XpJJ48pmu0N9383+8XGf4Jf7fpUEhx6TCFjGnwZKnDNxag3syxMfduVHXbbcv3b1y1QAzvrqZTHnUxAI1noFskOuXBujoAEQioGZ5AxmIKRMcFvsKdhNyvKZA9jpLb8lw5YRHAliYamZF6lXSNtQzovEtDCOYHa6HIreYJYntoK/RDjEqzQQVAEvEmjR8QYP+PdWY69xZxdTPLoI+iHHHuhDIl+60dVjp8g9T1+V3b6irmO8S4mfxpHgHuwrJn01SRX0+YwWucoAfJLu3wzA53WNAWijSSMp4eoZIj5Lq0ywD2sJDF1Yg5QaWa//MQCaCyj+ESfdxDNG6CSDH+iOCfsR6KMaMXi0ZdgFAtOQAGIYMQRGBgJBu2khI0aBQM32mO4NgPf5+t64hwszrl817sXrKzT1o9ZP6IN/dtO9PujKjULPZmm0p3f/8GAuYBCuO9xrJHj9EDdE8UAZgFKf8Bjjjz1vm/rKXzHzYUM7+4H3Ny/9Pb2UsP5+WilhlBVHN3QUC8eNItmRIr1BMEyWuLhvxBxA05vrIUiKhYJyBkNHVXaVxt/QanFM47D13A8UWACgPSguCtqdLol6Ge35SKgDenxds3jnEvdQJF/M9uL7wT3d5Y0ez/Imzqz52YPTZyN+n2Yq/R4eu+thdyvy6ZYaXVwgnz0BfRpryutd6m1Oy1lfVPf9nmsEgNO9P02z/kcAbKRDKAs8PyGSH6g5GCNRjVBoJigWFrtLmwMoF7Bw4mY339T6Svv++qAjAvqUn6xkMwhEhVbSsZu0pp9yDkYeSvedB3j/4/292U0dMY9Ebw1/byGfXRIEtAH2jQLfl9UDyt2AfT7FHb37xwfTXsuzFflyX2WxT2O/NpweBmlbPtRNN3kPPL9xyXPb+SPzi04U/tnwhM++nH3AViDcgODJUJgOqppWtRVBMiO5inHw2397vV7mDaVLJ4xAwYx/1cywxpd6qJHOAPhaBNRYWBEkLcLW4dha2iR30CJg032TetnOjog+u44VKl1CX6tCvUv5+A41ry+2NQB5Nz72HrfNZnXwMwSaC5iV9ZmiI0/tu1w/1vyoEAhy7Il92VaPXK9G2pxWSHwAwG+88/MMwRgI1zbK2TPJDxyETWJYwzhmWUYGypIDaPq8jYvjQ1akcODmjbYPs900JyAkHH7Vi9UxcDArlaZEMA29iIeR3LboCN53HmC67vWOeMXp49y28ZIf6Q6yvVqvRGR7EUcGFM8tIuzVQL63e6g9pxBT8W5aAZT2kA+PTxYAVLBLEyst/QK+XOTPtqha7RcPOKoX/KVJtiQfYDoAZ/xdeiDcWglEp2PhISu82dhoGq1Db0MTBeGPtUB7aKr15t9Br+33ROlhCqVLLaXxBNktYo9GKWsh444g2+UgRLVQWqxBxMPiYGci9wp7xAl/BsBIu4g+XSP1kPWtKfJC37rGuQ7lcAqnGDnnsyrnast6s5JYYoiZjuQAunYUulRW+9CaGhei3oq2UgN/CkNeSe28x4vi4l8TgODvqQfAM/7aFTEgcJQaPnezsEbKrVY2rSoRMQgkEB76F30GgJ+3OmuJrcODvJc00p65WCHDZvza8eul/XK5GyisIGEnrAmi6A8CwnspIdCdPOZkItA3zD37cPukN4g8b0Y/NHL8JIxCR4Ni01JaGewB4N7PPJCAoNpBpq2Pwe9rK4a8yAMLRRwJfbh/GrWBqS7Ql0e+Gity16KsufTlKXVHqPJP8GuvBrbDYEoDoyiURqW9c2RDDIWvxT7pZffhWgBUyERAbPgrtpBRQCz8lc4ePg6FNeUt9VHZD2RJkHjYyGSIcmUEvD/SALsi98gy8x9G0Pud2JuGUa6jeHRvZdWPDs6oAkDOKqLsiIrMgX7dtSvnef2wIipbbELhnR8HSTMJDzMKhc5s9fBpyrofse/05Ed7/c+G/yPNOl0IAwDbvbLYI6ypGAmXuwcSd8C/NCDCYSXsxgAUAeUA4gKmXxYRUM20QkPp3spU3DLnCLzSfaqHFouBGvO8SPWYTU1JWrDz+T4oQ54m3QiiJsYS8cI+avxy/JX8PlQ9uwPqjTs308pFwgFM08dDwJ6PiX9LtrOllzzhAQD9gX60tC+V+sVyFzSt7sWeabt+Sf7OEfAFHJ7u1Zo2NNzAkf+fEFgGILtEyg0TbGYxkAbk46QIbuDKKWgaHEBcQI+CNeBTwL9CU+nYTpCwuNZOlcSwRptraZFj/mkMGCRPjDIAim3OPQ+dwR4v+JmOPU0h3ZEne3H81NBqHPrm2V4t+FFOqTk/pijN1GMm9u0dgjvop0mWqls4OLCS6Nj6S62laV7o1w+vgurLfnm704L31+h69bToNwPQ53qb1FavVBvS7bNEWbzdLAXCv/JqYHfVdoqgrU8hQSwHEP295djhHoB2QcBb3XbxO7kGfFjjSBgvkP3Cul0CiARdKhz0qBR3ULPrfqQRHjPyGUM1E/HaGOTkC8oOrsxau5TSHRo4qMjJd9do47L3AFjP4foo7qXUhUi3saljyVTz/JCHGkhJOZTzL6oY+l4qAGcQlt1AxpPJ4BgJ108RoYjArIyAmGhcHWNWqFsd1ndewj7p2VAbRuMYCilgoB8zV8oOl+LhPDOME4jwA/EEaxCEgQjnrQzAqtjPpolaxOD70cqUs3sd25UiZ5W7oNjClEZjol6rlcv61rD3sbvSsP+4363X4yzvOl/pQ/CurNBxqF7wstLPnIZ6zrfQ8MrmL+x6Cvz+BwCcsVfPh4h5GvUyqSSGkzQzhaOF7Q4Y5DCl2EBG6WHwpwcJht2z/Rv0BRewe1hDX6cFQdol1frq00omRMFEw4CQnAheICr30CpTkGKZgML7TLDOhm60eyyIV0r2wj/YJxH1wr7R6R2Be9Av3SHjUULfjbepGBzAhMHuPmhHhx5FuwCwSMLIP+zR9l7NqBXzIjp82OjyI3KmR79Tip/nDqj/04TwiIFAD7MuyIcUAmcpYbeqKeH4CSkRQFjUs38zXW1HfaTlDuIGDhMrgrTXdMel1ESQMpmYEUlPBkFFk9Va6fSQH6FuWhT77v7T/Uie1Bj1q8dEWUMX4U9uXxl+mQrpjkw3SDantKHQuPQW/Jn71yFwvxP2lO9ol7jAP7NBH5vbCqLgT/hrSD+q/kPr0o/286kHvjX1ZA5/m4+Pq6kFwO5pFMWgRk2MDBYD0Yr2CZkvODiA6NdV0X9Yx5NFEI31PUhzxdZZsjL+IZ19UUYgfbTQG91KyQqAekyGvxECP5HRFSelUZTrE5yNJ5bn7OvuytltUmzlQpFkqXlzdxPtYqH9g7hn5Puo5zAsWURtI/o0FiTo5R1NGQGfRlQves5FMyTg18DfhW5/m9MhALAJQXtysVZyzL+6FzgsxUBATYgShjSl9yu4F13AUi9BHEEbSxAMPaUJhUFhqA4kJ+zLZGyQRYF/mSdYXRw0/Nnzqbv76x7SoSL77I7sI+aFeqz8BTVL/BT1xnxvYB+m+35kem0B0KiXtJe1a+zsYGdvRj4b8P8iACWPJSq+XzvzsQCA032/55eEv7lPYB2BzyP/eKsT8IXfmmMuZKGlleqJwpjdrYHJq/bRryUA/rrdZvhDR72k0yjJKGwbvtFlFggMFAyiZoSkCO0TXHUMOsU+GfhMBr6BgTnu2MImO90aJNg3bmyQ97SCfqhEv0yDu8xZHWzrDd/iQxf7WvD7kPjXD4eAuSgiXZqjGeuS5Y10S3oFANulzi/0uPiRFf6g3xcHv4iVqFn/YwJqPDMERguDYHlf3GY4KV82O8ploXE2GEsTPGRV8JU5gH+Mb3MBJfbEZzI30AAoY+QNBoFCc3TY4RqaSYceWv44Bn32+joTrlmZg4KfsNc7gZ3hraqyOLoosAf3HHya+N+WrJjs1RPSHdT5UTTpWQ+NfPtki3xJ9q+e9d5W/nruoV3Ib2Cb9FlZQmBOPbIeemrZ3nbw6w2AA/k0VTR7fxclAFgloD11wT5UzgbDP0pMW1KNID6gLG1i7+xfI/n8/nVF4wTNeYDFOZu+/QBl7Znc/XMjnikS42EkuuAOCjwaiIvtyeSBL46gHk7oqAufD6mpv55CzAv8QpUz8HMAcnpH2EkYgKcxyg/rOAh9GtFhOBZ6W4x3lz6s6I0RyuP1wgoJWQ97iC0a6LOhXfZnavQ8uDgAzgWBmiYsArYhyFbJRiqkLfmCxMc2cuz61R9gL9x39NVXTzhIGFcEfcdVyAyzho9Y5XIGRuEEZhGxJiAYDpM0CVnBAXTg4QBqeBk5h6HJLgmD4Dsr8+N/X6m1AeyzmxpneX/ZAeUa06XQF+kMP3O297BvmHEBt+l22gWteGzQVNbRYfz2U0K9cxt/FCwUI9/nuqsAtN+WC698nmsDo4YF3Qr4SAajVj54tNzc8v7IiZAz1idpBfAPXRh2vV+JgGAQACI2jCxZEfRfXzl/8I8weEAAHNQ0NIKX4AqVgmyf6ydnFXtxbQJ67vy5+TJr1qdZ70Es9WlOFvDTnUksd+HxoeGgKU3SmnxvCH1NHNJ2eHD0jSh42Ip8CYEgL4qjy7GQWCfTNRSWlvK9bNPUQ8UWEUur4hmJfd142QCcY+EvOzQJq6ffc85PQoTBJ+DnMwXSeIUKdO461gG9cN3QPIH18yHOgn/eWVPmurkUeBNP2KSFDBXSQNDlnDlx4jCmSQ6glPCHqajZscksc/D17KZjIcSNzl+IeCl3QYWTenVHDU5z7QCPvsB5PTBPIES/77IcL54eE5UumL61NzS2imFvN2MgT8zZDQClYS3bdzzh9J3f8gop5TjrMiqjCYHNaHXJKi8F+vNfg2H3AEOuuGfge/A3vt5vzF+wmxyiGWazHjiGoHrQCYTXxS6qDkFNQe4IAr8oamTsYl2QYsFhEu+iB+jTy5MSV+1G+cZee6LuUAF+4C+KU9si/Uj72jIrPUwPot3D7zbGIPhwamNbucC5FPiy5kfTyVO5Dky9V1O+DQDi/LXZNwPwiQbA2Fl/QFkNLVDsEUNOuERAzQ2xEGiTzDvxT7ce3m5WLtbQ3UjqZ45aX/pO1NhC0NsmaNAICmNtjAsG5iuDwA/BLEHw0wkVoAf5OuHvaZLI+OadTDU26Bfgh9akPoIMfWsV98n/S9fHkn7XsBvW9zTqBnz1HR7HNfJJ/qNSpR/co+qveM6brLbvB/vaAJwLX54k+fDM7UU3Pn0sAWz3i9YIB4EgYrcRdVg1sfYnK82dAwj3xgh8txkdL7JFAHBgoEZbqycWhoKDMIU/GS66QknFLoLhfSwt1T1+OiVOavfZpoauNFZOL0J+TB5tcdwa7WuTXWHftQ3Z1jY5gA9lAP5+YJmPVi4cYVQucY6dJKkRYN3vnLrnBc1Opzt/eH6TTj2afcCnKuWBNfQAfB7dwCYFi3HwC59L0qfecqMNQIzls5/AnwlT+v7ltX5/XjkHgWA1JyL6GQmDFN7lHfXXOIP5xmFTOGo93zQCmxAOYNUFxKtDhQ8owRlRDxsVypyp8osi6s3RRztTrzHie7uL2NOEdtfLwD7GhLq8sYGG2M30aJhW8ke/Px3wFre62dDy/r6hbW+zQkFgNz/PeqW2dweTEwaAZNU0YuINNgDoC9vLZ9///P7zX39UBQf/+vz+5++fLWmnj3Sokl0SXdf9kG3ywnAwVghGGEZHUFehPIaXkVL4+yjnr6nHx9fiYF1xoQ/d+ZCzT5NDT0/kXpl/SyGP9QPA1+n6dn04HIqRrwAIBn/r/uBaK7bR4Qsb2/SyocTFzc1wNelXXfuzQXoxPt580QDgpdJvJh7iL8uMdha47AYSCUPAkhfo72wNUVlCWaur73549/c/f5ytf/4WB0cOIHtFWAxMkyOw92UQHBwAIPTJCSQ3QgstaQAOEAq5ESPfY4e1T/3AJBPw1Th4VQh1NY3RZyPn9XI0vO4s9I30K6Z6abaYROC7vumAJtDl+l34S7boZ4+Gw2G3K3Vyjn3smagY5YOShqxvGiqKLqDu9uqf5rnm5VIE7RCuHxUxrAKSEG75gEUXcHiTzECsSjMDwld3b9vkm8LBdz9/92xJIGzG0mulYxzsVgV/WCMn0J6AkB40bJkTiPD69o+S0exTGvzSoEeXPuNzU/r8zUtSHBxcpCHwr3BskU1IOMf5Y6WPbhFH6OP8IhsG73l9G30+hNvXXTh/Qt9v3fibDXo3Dl5vX9HOQAbiCF8SZCi+xdZWBQBS/fIc+rVO+7ChTkAAaPMlau4OjRoARNWKaPIhqo9On4UQWL4g7Lt5/UubfOdz8Ie3V0vKy+ickGvcPZUXOglmEj4Qp67jBEI+R57dfGIPVHTUyQKB43/2Zf3YIow78hxMMrzUO6/yA/lI3NN2alUSiXze4yUose4If5JZCXd2mdLkpmbjoJZyB/qlHR5iHCvD+qAm//FCOfo0uby4S8/54a+gp/kCNFcAtgGoId1BvDb3hWhiXdBgyOLgcWbul19Z6Pv6+uufX38wBDr+CIVtYgWr92u6OZfgV6YgTmDmCb58CKCTYGFPNYm42EmJ+peBg659scbPRqLem5JoYg/3NOiO8AOBa2HwsFd7q5IIdx17Ev6ePU7Asg47AXBY7yMpxlTS0RJLvV85P54I8NW8v3biF80YfMppjzSgFgjbueAiBZ+HoJhF5428wRAI3/wjUjUuH4LZvMwTvFuNMsKGwpAREQFDWtjekLPhtpoSKdQJXgFASMaMrUGTZjN4NLiwtc5H0B2r+5yCUbcc2hvX/NjZa6Z0nTQi4HId6IcNAW1AA/jsskF3nYFbr3HJkNfw/djmO0556DZrBMAh+6Epsm/qYb/2zHrSbl9ohdBWKw2MWEOpSRUHUFDTBq0/t9mnOeJwGjM/7z5ssr3CUgyCVR5oYl8/ANSEnBsOv1gmqPHu4TEwsEpDwmONEX+fGAIqdztyL1Hh7A7M+vlF7v8h5TrY3aFHXvJOHZ4fRtQT90h1SB9lwztNGov68IHqPkbmOgCJgU3JFuwaR1yeWvqT+2dDA4BzGuQS9JWcP1Rn34vi+XGydJKmns1i9/mvkyRjCB82L/szHf8EQAQMAwA9O6y8sBBYVN45gQ+idnX+VSJjDbp5Sn9qv9vtKMVGtci3AD7oV21sJR2ljAyB293vBQeQTIflPQS9ziDzAfPcRHx8+JAAyJpf1fsT71C2+Gd2KHcZhOtnQ13TN358Y5oJSDYEYSNqSKmI0RBQCARlJ/p5Fvj/7f7+qy7DGIOE2fjnPtuvU190G5oNazjm37b/Re+m4rFKKCDPDxymV3Ig4ENioA3nqB05P+xwAO9khHPbXLRziCLwjf2sGLUo6uRLs2u7+813euD/ISFvsAiDp8j+wo4OTLCh6fy9yIr9FnrxRFzU8zb8pgPwUlf9ZgJi1jVxbzBmbBjthka7ASCCgL3XFocWGnny4e/kThgAl9sxAamLEQCRlrs4XzhTTIjIEP9GgfDtbm8ETM/jl5MQ7eGfMr308Kt1NsAAgkj2sN63JPO7lGTIEgER9DMQQj64l97bkv+XA1AjsCuW/UmypHhmA45fG4CsALIIOBc+fzsic1/mHlYy64ngIzPuDcFUrb1wGANhdqcvPoiAX1Hwb9WJ0yVgIDuF+c0GgD6sK6KXIGQRbo77yK+NgL0AoOwv5N9tFuyyIpkMCfTZjNYFAFLu3B+vh+OH8AHR7+jj4PGBPDPO4B/t0MLJCQ0p8aF5AQHNHq/8iYQT2r58u/SbWyJMzIbYDfgK5AOANo4JSNlByMqln1XydhDw6/OP4BeBQjmB6QKAbBZm41fFHRxXBcpIphkiYAc89BgcQhn+J+xlKv9G6Q0/1ml0cpt/Ietn2lCKfTVel0/t3R3Y5xG9PsJfivw06Stt/28K7ap5EE0BgKVup5pbBJxy3Pm3rjkZoiFiEPWoo0UMMuxhLvD+yNXJNgL++rX596v7f95srjP0EvfJEdgtoxL70Bo1jlWCgoqCDW2CXxr9cRYKiP6ZPtcnUf41+Ge6pbDPAYiw4Z7mqpZp9c90fFTl0Yv851VHQKU9VPEMADtpDhrywv5e419bkM5p5+98xmGt+eLfRDUX/y4agLMvyNadBgFBYPPsdFTtmdpTb7DcGUwE/OcrXu/Tr5O6iXirGLO84Xphl7Bb6Fr3cLBSSBWwGlgmoXwy9wE1uKcnHvJiswxmfMVO7j3i/5HjgLiwsNjRr6Hlcqj1K7l+Wx9UVP7hgPMH/FBe7iL8Nfy/aYca+b7K2HCNni8x/UFablruo1H1oulSNbfC0iRbQxSuPwUx0wDYKAgUBCtdoxcf3v/1tfnnjUToMlJoGag5ByD5EXbArusKFESKgkfs68nGq1924x3yD8HF5P+JeyIeJ5gUxKdhmS/rbKWBciDZiCXTbd9te2U+oBw/cr0IGwtV+dcWXSXZ6OtTKDdg49v5TiChTw7C2ee7dAl7WCJidUtc0/9bjLIgZiIywPxA4gcCQCPgu3/+6dhVuwtX/c++E/82ai8ibWPfVA2cI1c9X909Iz0uLN9GUYEPBASCIE0DcvA9wsUAzsA/zzyzANkIf8vqAb/sDMrC3ZC2Pq/k/5lWnQ9oorsL1Et3m3+/n+v/UensLxqjFnqgYeWcX+yomAnk7Vta+5spqKFWEcOi30T/r+79xQVB3xSXxJK2E/DrKPGPPsImLQXa7cK2LAgkLC4FptkPfZTcICWsJxMERIBNM7aoVwqZB/9PBIzcwyh+4Jwunechgb1B7hOi47MrV0bA1OaAoj+72PCLvtj/exEB6BCk0W5REHFa2TPWCIDAb/YBvx32paGuBvbaXaJfFN774izOqnEKJgL++HX49yP88wjYKOgF0enRhATAbNWLghDfDgb6Cir5gloHrOsxwo6ZwT88JP7J9YNxNQnGg4da+x8u/MUTpOgVAfk0Kfzdug+opb80VAtf+Lxd/9foaE8grKGMu9Lm33bdi57W4p8HTd+C5t3BMm3AFRT4NJ+nIvYQaWCiXxJ4EPAr8U+HZpvoL9xDUNKsV6niBbISqGB4fVp+cnjwAQ8P0/VYnuX/rRX7Cn11CpKcKTMPU4cmjyQA2iDuAcBkujMNAYEdo7B4Zv1fLo6TweELCZAgqDfqd79oBr3u+fkcdbTdV/OFaKZd6bNsGRAAkvc9SyRBXhQROOqOyo44IPiiI+DPX86/n1X/ZyL3EcLgrb+QFA5VgZK4sHX7WrMho8y9YaK/gLOoTcDHqlcY/T/KXVq+n3zRU6t+nGNZ1nVoIKbvziC505sPB29vKvHG/IXxr2iXRs26zCYDHH7OmF20PF00ep6aqbmg4DbMumyFVhYIF/A8+rEIWCwItIdGHTIoXKAzwof7Otk+x7Gie/Hv1Su7g5x6IqNgiPAC4aDNAIKj1RNCllnfVGaNsvABv0ziX1vEvQS9+Hx6kZZkfiP4kJZHRT4zkbzp5APi/+EB8tGX+H/IUQcHqXim9aRGzfHHj3L9evuXhvAYZM+6aMV+tsBvmP5LAAwMX9AVUKMNUSDQrgUE/Jxf6TaD8XPxFv/UT25lLYU7G+lNI7/HZlPhQRzMKmCU4JG0RhAnTVDwSwmI/7e+aaNPj9y/DnU2rPvHblMCn90OwIoGl4/kx/Di+XT3AZPY/PuF+Y8chwS+AuAivXO8EVXP0fXTwBa4L9r6McwcNTHrQjWpE4yG6TkQTfoE/FGfhTYYG6wOgB0BC1zTpYExv8Q/baJn8U+jPVTEkA3xFzzAFS5gwF4/wr9KLHyLRc8ECPjV/D+HK/AL634JgOvY5qBH4TIs/clAsJ91ARb/bOQkS4uCfdub3WUAfmH984tAQdxB5DEGHCzo9BpgE4ASUdNMwMtSPK6+zb+J+0A4HskNaOgL0YsC9yAip2XauPjwU8KbBt3SP4xiYC7j30L9Q5QCsUHPSjjcdsPRaYzlEDgC0AyE79eXz/Uv3SXPi7LjWINyPRBw/9/4F1sRln2/ioh83RiArkfa+kOfHM0ytGY61tYIGBf/7P0s/tHuZQIHyYughSYCjtICYN0JLCz8fYsdUGe1d7+RCGtuAwF8SO/AkDYwNbEQOOSCv/88XQGEn7ScpGMUV6tuWm04YkwAXJnGbh+1bXJwxIDAPVYAtXi2ZsOs2RQIsgoo8A0vPQE/AsEv8v9oS53m2NOFEd+ve9IolRy+gX/Hb3qndDIn4Cb5gPQ9nS4Pf2l81RBrgEVlC3/jgy8XJ8LfQMFvqg/+TD2e83qhasxVSHWENzSUZaHiiel22ZAI+N3nswT/6KfeA9BEOYxJk0CH+IiWWWkqrv/ZiJQc1laRYlmgBhFwbwi0W/L3Nv/kWsaw18+vTPaIfmxxQ2sWL5d1AX86iIV/T0TZQuCuAbrm+p8BsLb4h5WkuSzWApk6UagwNQcS3r75U4Bn5w95E0hJJKxpgaoUFOhsrhHQ8h/e0dyrYd5+Ef+Qwl9xbzusBaItyWCbEOv/0RmEeokkCoIh4C0MLOl2dxhwBwL9/eNp/qn1tDAYiv1QoCAW+POkb6ci+KzvC6UvAYD4zCP8pXXAXSPr22z/3BaLxbIQS8yUAaIceW0ANjXT5BLF8c3tDliafCiqgT4pVv+xerPQQjaJPWS9Yd6cz783iX+JgDYS+aJkb0fuC3uDSXCGORaHUDmXILKWZdFl90KVYODgjZYEb5QJwQNsoE/aG/88n+I5jt7/q6vv6i+PT6Of6lujX//YqHd7E/2omaS3ToDgZtfG39n1L4S9kE9zLt9kZBo6UdKld1L/g6kirmL6FjQDkKW/9LS1OCmPSEairtUHGNjPKRf891nXPf4fIW+gnxYBNcBBSJcLDwjFvAF4Ma21czj3yEQu1gGlj5m57y5KoOUcin/i3VEChFQzwA19/N1TRYnZmkp7PxgpfA56Ffw/6ols3hx+Oz//W8p+ZJ/UmVdZAxQJn2d+oMaiCHvbusATgGfyjaea6ydhtUSdVSYOw0zSBA0FO40IH/DdEdt0167+/tHX//Qo82tjlIORzXE2FLCHOVoDhIBmopAcXqcBIIl/9nIQ1wCf3pijHg2AFFWvxb/OqTx29rTCOM73eurDpGmEb/4/Delf3QKgICjPmOzHVk+GwcP5C4CLSLvw9gL2ebF8XbRbq4oyrdH2315NHzDfBIJ5IZo5WE+FTFgigXqxA2C5D0Ke/g0vzXqHP48Yp7t29fefHxZD/hc3UNkQOX6aVBeItqfESiCekZiBLyWi4G4lAjIgrdjto9dXFX9kt77xdIccQNFU8hmDg8zFQJlLL/xrlD6z+yOs/pnRjSybZhSc6vyhwv43AEiYIFEwhRZ6AgBbVQkxC+LUM2s6AC/YBZybwPhoT3785XQKwkAfX4yzHxoLIuKtavV3p/OCYANgkpgnOfdscMNuNORAagykd74kojj18AXjSSIC4K0ZZGptNlfP7umiACYxVAoYvM7dPzIfzj1avtTlSZ8t/p8k9mnO+We1lVQCTgcg6V9mG4W8ci8YTaX0r8qhawKASOm+6bFvPAV49gMvWviB0K2FvFwLf9iFronXIIIamxTtlnh4Zfg7TzuBT0P0A1enpd/ocSk0ANREk3yhzgeNqgZ09yst993qdWlvRsHErrt2K5gcgN7r/nrNaeZuaa+bn+buZc6Jw7JY+aOO+7i9Q7oh4ArXTwN1QoPlFEQGQKRNcTa2AOhuug1nqVQJzSpLNTWXBcDEvsxFxRDqW9J8MObZfV9K/aDh3rD3jVPQvetzdnor6ZCot3+7PuvRXX40vVls5P1tvA5aKKwikMYwaYo9YUy9TTUMbfJhCcXR8vwEQqVo0/EawuG6f+7+wy7gNR3vSX9gDQWI9HixUR8sAbRsm+ri/+WoayxLf1hsiHu12jX64Bc+2gmAGzhYBl3+mZ6Mg/zIFfy+jH9C4KSy52+q/m+OgoU+M6Ycfd7AIwEw/p9bDr/0uK0PSQWX9cPfZ+ueENihJ3Mlxc3ACNfGXR5o4AOKr9RB013qmEjpkfpE7mGq+8cHB4MdwgUkzB01uZKZAKwbd48RxQ8DALVtOsCv9PKKHMgZx4BsYvjbEvRDrAoCQD0chl4+CjPyz4yG5u4HFy7gNz4R7uzOpyUA6k6TFFqfamZtWzCs6935APwxdUEQ8ZT8yEph9Boo6Ktadi0HAGo+TojiEiL3rNDtWueHeEDMYp0zcE/uo8VA+qCOCdi/95Bb3zoAbRTtyP263ydDoIsML5bC2DcF/smUG6g5jXq3UQD8nbYIUcVPD4t+2+I5QW98of4ZBib1Flm6VvkzVkGKfb8VAM4AxKuHf1OSIRBvMIpnIOnhhP7YvYPgpSpLAp+tPz8IekEjR69g83uejCjqgyVIiM90xJvlcMJQ2hSyjmeRp2ffzv+2AQhXk9gIbAj2cHzZPR7wUv0MBJncxOVlFZAF0vC9yqLhyDdeTrWHSX27x/jjvapx/fOLDS+hOaDrJAAVDespsk8AnOn37aQ9sM4BIFqMMsBgDytf6qP9sz2ntZzOPZR+n6RkUfJiA+QLy3+wLwDQTZBndyaxhaN0jT9Ldv8mg8ks6lvcYn6UtecTve1U/lKWGCsA2iQAuyPIUUf2KS1gxsLV9RVPMxA7ZuJHri20m6zftQ8EJ7ANQFLAYHABAPkBDObztqouoAImsiAXrnn5T8hjeA74mCdSkFwbgW8y4R8UhHs2NvSsc+jCbVft9nnn8W/PQNgX6/6YWMsHfmYs9VqvlGM5TZLt2VdyFIp8Ndn7zV2s8quHv/wJAfBGoKspuX72sALI/zo8vay7NaIZLOiLhS828flKg7S9bvGPr2PuvAuMTZCvhb889UElYK3+pcnBdiPUOQd8kfIFP73YVdT0c5AWGgFg0NCZchEJOIl96LsU03Kbqgj0+c2id/US/9Ise0w6jaMKN15hX1NDVyyDDLXJmjQYvPwTy4Fo7+++dPoH0NvzRhbkptEPlcTLko1vyRscXpG9Az4MUVA9YfW9qGtl0ribeAgwHVMFwD4ITs/kLAjnIdEONU3PRz4gaZCGSIbMTbC+NQUAmlnRZAAKf0iZj+dD3leLMouwzGcGlt4Q714T8YOcPq74Wv7S/YJD4MJ+XxRDXGy+sozd8c04LVHHWKPIl9hXdiLXQMVDCHgZNDIFHXYRf5gEwbEZ4OAArvsCbZIgZseUL4rvo8UAf4OL1l+n96SHjoDArg5B0sCvgoyHEzEI/9DJjXCm2mrg0PhyguY+CJdT6tfshEUhqF7qxNO0YPtbQQIgpX4iIZBjbOtdTjzM2vXjB4GvpleDAyiDJp+x/4t/qeX7rWWtHSjUJ3Mupqb1MO3Z/ivBv05p0iPJ3u/8BMwbJ6oMGkHD3L79KcXOCXi6RUAzY0MH8r+6okto0hQUlhEOgh9wSzzknVf+hADIrkXqoattAXkrKRwQkuv8JcD6uZizLkvkfTP5lshW1Ls4rRcjecLjfFk0BO7OYGCXBh4RL7f53cWR0Qui/C9vhCCJKqkJfmqIdbQbTexLd+pYEDi4vtlHtBXefO6hmJ5dOgbzxtl6N7iBHLxJ89Xkj9orx16SBo7nwZEU0ZifjuzkY2ecRtZK9c0N/fCx84RwwKDn7eliIR/QhpbIqh2rmAee3BJrOgAZLkdz9rcKwKZOgE/P6S735wJwbTiLEv9Oa7eBdr2BvdUI/txa6omCdIF9jhMblWmgzllDPBK4T4EYrMQwZxy4s+dRqEtmGvtP3dyZy+dOIIEwLVJjn2jpVqyLHbtkFWsBgT4+oAywh7WyGzfw9558dvcKMa++TJQs6S+M4qXgCdrTpmBFAFDTAMCFD+WmMG0RXc0AvHT2TT/ybVLTv0U46/ysoJdKiFemlwl48TLJrF0CoFe3UPgciv4iAm3m1Iu49Q2RR6Xqzxf/isekk6IQ+RyASgJHxNnAh2IgX3hMQDzc3vTqQXore+2O4HoYbJZlEfqt3FNcP+/WUMgNb8NhwMEaVUUip+C1sGcjCNQLGASKeIArDq/a+DrgxmdTA4PVToEjAHJgdWWvEwtBp5UtLjHOepLrgPWUxxTywT9NRfIJe5JmEiDTIEjlij2r7/4sqO0BvjUAQkBmjBAB20PIR/J3CwAQBPQdF2smql3sMT4lv289gEvUurt6QFDQbl49GE7zo+8GznV3cxRc+5OkF5kC+HrwBDXrneD3xHY/guFk6ru3HNXIHH5z/EWR+PV3GNhnQZS1V8a+h59mG3VP7JS/scFwF9xAekMDwIKOFsPPPw6Jj2Y9kcwHf1tfAEDWTeAgK8yydaR5jjtsplLn3454yN9+qDLu/X7/XlZB95uQ7mXkGDiz7AaDnvCEe2YW0ZdmQc/6YVnd3Uie/yBMFfx82IO+3nDa7Q+HPS6fPvS3xz0kDVrfhKORGAjHU7omtWRItz6wPHER70UBwJVaxahOxqUcCABMEwTc7QyBiX1kREgD07isk6gHAJ2GpzSUWY3TIXERsNkcfz4P6Rvb7tsAYFsUDRTzvqN2f5uJgn0e7qDh5V0Nf28+dHpTQ2C3G3jrjp48Pp9M+piyjn5KtyzIp0kidWoygGi3hfa7DYpbfs0MANS0B3q4e973Xt3ynYgOP7v3OyJgZPTTs16nF6pwKMI2D9V7VSsfTGVgvT/qNv9G4Cmj4V8rQM/Y9pGXw4dOByFQjmBshxB3aVtZoHw+jaqRbirwbxFPR8dsAvCsc9EvN/Cd1/5aWd+FJuIGzlktHXVJ6Hs6s8Gc+XwS+9YqgPv0oddbPgvqAEhhc6h5cQmJkC80wNrGmI98b5q0mUwdTtndJt2Q/dBkd+KejcLWXWd5bAsFwZ9pTzWMKxFQAAzs05iMnrgE4cmWVAwt9hnF6VXNQmBnxuj3up8RxZGhUaIr8Q19/Ng9Pf52m01CoICIkv3hFS1V0+0BMNP02ugehvSGjuc1VMoA0QT2Yc160voi3y/0vJeJFGCkG/jR5qrJwOj0uR0P77g9gb/NZrXppk+VNDCUszuQL2jJGBse0PmUDWPu+XnBS2p0YAKBBKCiI6kPe1x3OIDinM09/m7u7m4MgQ49V6LlzvhZ07D+58GvA1ogXqocei3Smfsnjqc3ctrbbcEfBIRsEgGBKNAveH87+84bAsmB2C19/KA0cLro3egVMR4pTOGgsm70x7eppFYhjA11AM74uwhlzDuz5sUuWXaP4UfXNbBnQwt+pHsj/WQKgbpfFtj2/QeTotqNIfD+z1wHATCKBXs+0JwuitzQdbCJftdUmAxmyH5YZtYcP7uTYth69Xgs+Xl7x59JCETipNLA9mV5kvIrB6kUxklILbZGmqYuu9keWlr7uZnxxKcKBrca+fYxrxP39Pgo72+1TUpeIPlhQ2CadpvBBcQD1CQIuprJED9hFZGoQ404WIERvzCXvxlupl/U5LIXrBcRf3H5L3W0rwIQ6GGpYYEfVkTkI1tVe9/n6Q15f8NqnnmBuxyB321WpZPNR8W8ODWh/TMcSNAj5wsUxkf+UoLswAF36Q3DamBGAAR/dygi0EG5v0kAtGFAoIkZ5BY3CstpNQzStkGGjTHULzaLubZBEPRacXznw0fJIl/wZwsSdBlLCHQAamARkEAYBKYPEB5hq0c+ohoGcYxDXfgN5RqYGYIXVPSCpsJv1OUqiCybRIa36QByYtHAwQ0/5SspzT+M8bcT/jiSbFtG4L39ykXa2RNwp1cJu9QeL6FPlrNQsSUCL0OJMljypT8By6Z9BX/oyhEYtZeH6BSUJ6gJAcCC5LR205pjTPSsQ8Af2qZqirkQ2uaDQQEwETDdh525fxw4L1k6JMFP/BMAlaVCrAbKK9zYpcl0Vk00/p9qoV3TAJjRb26J9dSVIw/yaW5nPlxYQf0SM2o2LWdFO2Y+ViuO7uCY3qR3ZfxtYx1zQuDPMQ282XKmWY67eOo34BtzUGLPrIbbbma7mWb5dpJBDugpSJVpzEp6KOLv6oh/sjMEPuwcjwMIRdZcA5EhYd+QJlXt+EEmlANykmf/xu6XSpp4yyz99lGSE9jhr7s8PqaFlgXCu0MskjGXvXByM6P3CyQkrv2sUQ9YBKD0XKNp0USg5nLoO3PwgqLfM475KNKPKKJ4wFsr7u00QNAum/WjPoTAccPaMdN+Fv6ce7GJlSHwx5AGzk/1iC2di6Tb8oHXywECZQ36dTSxDwD6VgwNSfhmwKq37gL+Dlr7uwJ+zr+EwENA4O4OgUEJEgqAw3SLKBdkd3Ainl1gsXuYYh4oZyACf+79hfVWjFX3pRAIfyi07BnCAoKDNA+5kTSXFftkxUIYFNr6FkVNNA3UZ+49cf232Lft+anfWnaur82m07vbslzHZuX0W2nmRdreHbl0vfcXEhjYyzECdytfokLYRTnmvIGKXoUEP2Ht1lf+ggdIl764QUMEBHyQ68ilE/4g2pWMAYI3VhaYAfCK0aaEvvTqa4Oa70LjLM8K6xHJO6rb5Gg3Q68cJpKSJWvOUZJV0hr8/Qb+lnqCVgmBRr5eu+Nd2pGCLg+GXZwf7HpRAKASwqN1QKRUX0Ol5tCXp5l/zW0fkC9TaLOB+qSbhkwin+5ebvQ/zgF++g3ACXw94O8A/jICCmxaXB9i5pcbClkIgFEtzdtzz7C3pnne4BmlzipKLYgmrpuihKOcWM8eXQl/fPnKLJtxAq8iAg/2VVOCpG57NGbQHbcOZLFS2RDBj8dGMZ5T3YeVQFl2VbQ7xt9ux1+ORNGljQGBH3crGpLRXSuIUkEJ9gWpDIaiaLSoqYU/G5A3F571tHR60wd/mXUVfT8vp0KNuBexk9OpF2aqHkbyX4M+Cfxun3t/WE43eYH7d54GXpbFEW56sPsKZ072dSUA2ie6KTU2I8efvDGfg67Etrt9xJ94luin50ry1xQId3/8kwXMd3f+ueRktevmLklzD2Cxzx6NEv8f9P9M0v9Ru8XApWZFyLiGehm4yDf20OPvIPxxslIa02zGoNUuVUangPnowDnNnYUoFEim69SBmVAwWwlE9EZoVAXOlTBP2OGb1uzKhqqody6EvYiiFxtQlX+r0QG91Dr7hDhvok9z/Jzw90Zlz5xSSRVLdlrlxvfH3QPATENPUN8XofjObpccod73S/ban7y0BAD2hghkPHLvz/AE5672AX/wjrHHIbayIQbA8DW3RUUYiOvpC4F3Ss6IgYiyaTjo52qqqb4CY7XX7x+BUbbJJwFQ+KssPowYuEoJYcsXhwCZdj1BLJpoxbjdMrDaLRoUUu1f59+pgsAnoBmB7bq/BgCLQe8xATVnXh9vufD9cAGV5EWvtsS+Gjh2dtt5c+/fDvjztAZdC/JwNhXafnqvNPCxm2IG+DOmsbaHn5c+8gMt15xqbpPZQ8cVZES5G1w/ch8dj3D6/HYp9Qv+nqVPn3VT94Z472ZDoPmAd/4hY9QdCISCvgkZhRVB6VqDbNMaF1D/spCRPvCH9jKWA9kLf7st3iEA9HZjeIZeFth5jduaVpmEPz38rJ0HQXuiD9jeFjLT7wnrFAPbh7xVW5wKfNBvkOxCpQszZazJkK13JOKxa1emabn+8/0nx58Tz4zTaYytELjbJvZR5GbYW0q+tAUA1yyAXQ/E04cmtXsJ8LjRrBgT+JkxinedYOhZj7/+rQNfup/pzQyTfWSTZGbyAiPxcB5hpbNX/6OGyXVLYpitK1FyCNON8A5xiA17a3u0o85Sv6YtpTNFbX1O2u0MgTsWNxD7GfOkSNg0XM8GQ0BN5WAYF7BQJkEQNQPwUp3A/9zlNOrkoR4ej3iVlvg3IDCEuoiKFjM1qcj27hcqX0hnVDv0aVQ6ZPfTbktWw1f9CNdsLy+hLr/WvSCfHoWJiCYvBkD2ZRh0Av6U0Rjrmbw/p90zSTZvYqJdbicv0P65mgifTRrZN6LJ8Kdo2Gw2EAfxeo3hE+ITOYnCn77xsYyyJrzAHemRscJR9uCvtByoqbQ92IaoPBBmCAzUcHkh8Jz4RTXHrwpAFv9QY5+bSzYq5Dhc+XmLeht+Lz6EDi2ZQoEyyY2t/YP2SnRrw+DxDQemEeQJepLPmIl+o11mQ3ipUQAUfHD9csm/292NScfby5fdH3l59FFn4wW601hDIK6nxiv/3zhsHzZpFg0LCMQzzHVdeu8LZ8z7OzpsJBlR4Z0UcXIbvWS9SMBIP59iTQyq1uSPtwijk4mQWhA874d7Cvrv2Q93/3MV4Gd3nX9+BWUR79axx2MfoFAtq+C3JD5Wj08omDBm/7wfBUnbZgr6gJ5SHMHxYeZV7OseepreGlRCefMd/pdmJSeCiHChH3ppTxqe9QTUi4uYuApBpYR5CSJVk9gHC1kMlNzHjZS7DW98MFTN2HfdNfQalMcdHEJmSexD8dSRwMFIwu7a0C+hyT+9SHmDhHYl4CV5gfPOXyefxpr71wIgzp/uskLXjtUw8IPqqNNd1jjE5UiyU0HvsHNL49K3+kO7tZAH+CRZmCBgzMCefTbAv4A+SdDL5at70EuS/dKQ99Jl6EtTN2OY0pcgYT+hZ6PVQPdGQ2rYniRQKHk+GBTae2gpKIvH7vL309dV1+SI1xw8ZzPS6zamiqkXjJ5gHhEf11fRYbchahoi/zQX2+Tr0fDEekPPbZ//P3tnwhtFsmxhjZh94YEXllng///L5+iMw9fRJ6Kq/OQnI6lOd2VmY6ThGvzd2LOT6jd3ABg74lqjw74v+PM8B7oe0IysOBbYOejqfBb8XyUtYiFCL9Zxqvqdjg5EWqCOdlZHGQkPAbBITmjv+pp+CJwJcvCPPb+mry8E/lAIile94RPXQsSSEeHDIl+5XL26xvU7AwAJlzZVNMosqd9Y9UadQY/whMs97LVLBGVKeIlc3O6UmDfrjS88poJ1T8is77A77gSgtFn3ZwD8wzVkPOjvRbT0SlzEIXkds86T+MmJR36VfrAW+NYO4DoZ8pjjx89/Gj5xyOsmi8X0Njc1X4RIQrQixZEersjGSbrTp7vLF+6qTRhHWYQwVQCcfOLOE0b5sd6vvlYuW9cOEZm5uqHfWVREHdIUBsYsVjHARwc8YWMgncKalZX5OAOgEiFC4fWEN2y/nVn537srfLq/vx4tfvGqZ1X8Ab6h34Ma1NtsRyVfU92Cu6vDBvII7amCL6JJKC05qlfQNggxZeKt+QBco0HPWGFFLvEGfgBw9n4Rfm4eRL67pydeoTjmVsEYwixEmxAkNFgpyHFZt0BfZ6DIBvgSk3wjdeykazhD5OYlznVGY2kkhoOWTaPaqlRi9fcmCYVvPBN8rC34O3GDT21kPfLYaoj8Ofj+2J1rn2KWQQFgFnFpGlztCdU4uR2pZLmkL9SbgfYNvnJFEF/lhxtR71zhF89qM1MT7mUftMr7iuBXEK9afEsLhPGEEohwTwsesiGwFX/StdEtHKd4kRVh9bofJ2GoZFA4tdL/bZW0/TpYhjjWvjoG9sFBVcYsG3AsjIGBivcU7RPw100Anhx89bo/CjdnE3C82O0N4Nu9zS2lYb7SkNplLAjdAMXe48j6rVTvcuAYYu0F4YAc96XlgvzH3kNluL6qteuFf0oZC+be5XR3ea0lNll+0jIBBcr8isxCSAoArYR6rBRUL3EagYl1xnkp37MvCHjNPxGRYGEVQYuQMljxuPjXctmpGw0GWrvwocIYCwUeReBcEQ0A43TqtYJ/x6/6tXvNrdeD05jvpbpZO3IACnhaiqicLRdVkLuNj4izfub4cI09nfIxc8bIh2jspas2RKq1yXeoeSMpJN0pyyHdFV0+3scSG2eEOYidiANdigWpnAaDEwxl0VIgEwdKY4qUCp+FaYgHvekWZ4mm9OOe7BomHyMth0SzsvpsyDglIXa6Qt7MADyrAl9fs/F3nIAYfofSvRpkWmbX6yhh/1XXZXJxC/4uKiUsB6w80rdxIKK3L1p6C/cuh0QfM12ePgEPHVGSR4kOYUmpjHd38XS6v+cY8LuHhqywDxyWoCD/QYqoCQvuJogp6c4OP9rmMgf+tJh12IOyRBPn/IglikM/4wW4bKygHghYNRUFKiESj2Z8uA3YVsScaZDvQ63tx2KqN1veABBh+7nkWViNM9leS/iWq7RdupJCLR1SKWLRgshMkro9JDf4VBMcm4y+ZQt18q4z9M0Ai14OCvmU3IB/opvQF/v904PWl9lhYMUh+ZOQ+HcsMkjfMMkctRCT92aLZeEvN7cJWxub1HJvDtKYIwAqONje064iQYzAXIyA33J0RAJdVzm/g14wDPyeUiEn/BCxv0592mN/xlX5J9XCD/BJ+jcbp16aMJIdG2R2+44DSlTidIBvHOJIIXMc136Rj3KugnebQb+E0NJlv1tvJKzdA71BDxylhOL9DQW1UECYJyn/gLFUlSHUOvP9KHpbb3lau450Cg7yZEnfbYwpODvFXMs5JkWKFTgRUJNTASDazAd/50bgCcCx9jkedKTWGRH3A4DtRAOmHsVxfXSnl9IWGqcGU28tGVTSNgu7DtrFXnCXAGwFAKHDBvjihYS+YBLpXPSNZUfR91DP6A6RH/FCGYKBCUKEJ68imUtm5Af5/mEN7gkArg+bbvF17mQsGKwFMyb9u7pVsg+t67ZUr+Dw84zI0SFZe3HAU9/pjb9bnW57AMzUR5vxvQ7JKFTd1fgT6ltSy4DBj9s2SuJWaxE9rQSqFuzEvV5vWUl35Mp8+pZ60IShVUTgluASXuwVvAS0h1jX+ekDunzt8oV6fohzR0H0DghSN73+rMnqsXmEAfsaah2LxMk+IiYPbnNQCNTufTo0FOMP18EYxsA6OKHagaPmuflzY0jotAK/s+zvwTs/vNmNyz1akfZgjn0I8iEq+/LATbPrpcHCioHH4xL3yCqm5soVzbqTb1ZFdC+UZ1pjc3woRSHXUBDt4oUlJXPqndX5LVMMNQYfwIsdPXJ0LQrmsar6xe9uGIg1SJ5YFC+ZEvGeQVq1jZh5/6a+vVgknKxC/rInt/iiqVi6zwqXnAgU/G2W6qIbCO7fEuJ6rYKY0/zbHfwyOL/xDKLZo9Y4V9tPe21qR1zBWDs4NsuXtwJ8uLBxIkwvcfTW13gBvebSDvgHEui+VaEJIv0wOLxrA14PjR7juWh9iE/x7sF4L+OQ/wDpk5ohuQBQf0YVZ2tNHMYiaYoWiWHTNzOZb2lvBvKxtQkV14jTIG7km65jKhkR4oHSthGIys+E4oCbc6JnnfR7LQCO2plyOmqe7OdJjznNwU3bFDZvdqjNIqaX4uhyH5efaU412gf10JXxxImIX7wUfiv5CRxfjL2Em4gXz6wPOoiSOiDQVxIlpEdUMRj8m9TVyvBd6RHIgRtIDoQLPXGsQAcm4QDBMmc6D/+TL8uIxLNfF0MypEh3wK5yieemg1/h7uDT/T1Ivz981ulAPpvx8r6W+SEyHlV4Ltd5jniZ+KffO7h8RAdSGOukX8B6sbvF+94O3F0E+tLmi0elfoCv6CEeKeFnqPugVU/QL7aipGe8ACAxwpvcsnIjojORSiMgijM1MhiD8WlHwHDHV+6twVjGqCCDtWieI9ZiWWEc4d3J+TjBRVRHj0bg5nUha/1/1Xnnx3EAogOVL+8p+gN8CNOPf3Q7bi8mn4uAeMM+Tj3qeCfm4rT2HXFtx3px3SQGEXkDV9vZkQZYQR/wC6c2nkU2MLenx8dYTIFCKXMlWIO1WEYlMoQFwSBZknnaNKO+LkcucZ+5SJyhk6YrxlYxyEgeRAs4wxQaaZAuxdEAsNxPeKRBLp6sl33udISXvz/4VH/jLzqY+nUAVvJpVdrDAOiDrch34PNquYZfn+3gpjWP8pVOhLcd/ix9MXCu8edK6hOJeDrL3tM7JK8X+PXlzIKS8IcW0T6YPn+O9bKwowXN9Qo9FAzer7UmiRUU1ISZtAOvrEFOi38lL4I6F5kCGoljiJgDF+dhBHIwf5ixhC56iDvVhLBNzrrAr0cgJmCTDDnKv5cH4KlvLYYvYvyhozE/5L29ob6pl5u0W/SBPFfWkxVH961NpIoH5nXYY5U/F3tTBIe4oUMLwItdnyk2tmwHgnuxAD5D3+fQh7WsVyhoqCdWITFBGJIdKI84JOyW2mnpnQTDtYPC1C4CEdePCIqmcndKEX/dfZa4kyOQtHCF4C0CpQMWYIimqbk1bscIfBGdzu/zAUhNu2643AEgBJT952nfeC/sqczZpEhfbFXUfm1UtWxmMjyopxO2XoqhJ3Fgm6WMKErWxQI1lF1lOoEXuEglnVGhF+/PkiBn+lA2ofAzEE0vekUVS2QwHksNJ7CF78JDHcX+AwB8O/0afx09DE1DXx3ugRFQ6u+LYZK0lLepx0sdcl4dvd5oKAo83hv3QjoBuK3dvK+bf36lr+61LPNN4y1PYj/jW+qb226OsW13O7Ghe76deBziTBkH2DuumulVuGxJB7rbgiy5I5K9jwV/4t/ntbr+qYd//lnneBUaLlA2IUKcYhEwVsnrBDtZqthqv4/AEPNa9eRdnmQosCYsWDUmh8mHDFNj7BolETDWBoCbZdGOwVcH4Nn65gDsrjhHO5kPhtpXA5CsB/eTW8GLFTePBh/qgKd9aRxNwEIob180clDgHLIUR+wIArZ2301Js4f6ZLxV0uXyz5b4bdUUlCIqGKoQDFnBtKTUcCxMVBD2BUJqBvlGkSTaERgsEJRUk1lpSI/xLgFxheMxAUBDIH4OBJQ8FbxbGX2OR3jNWy9byff1a36x/A4VPcv1RdMwv3LlZNHeXJaGen/O0Mv1WchDK91ZL5jUJjFYRXiAFkm/MKha+D1i/MG9dHdhn5BmpPv4z8ePa4slnio4SJgwFulRKiWDTfNc7FeD+JUiKaO8dM7MCIcFQVjIYVPOQcqq40EEgqs7fAiBOMJzQoTBRr8NgoEIAp4zsr5jADLyAD3nbvMy2Z660jT+WlHk567vVqYD0VIw2nwCXuzE9naEdUdSFwePz+RGs0YE8pFDvR5XWui3/M1a4Ffxlw5trOgj60dJ59wuRIxXvi/LZ72uPGPk9dP5R7yXFgARmWzqpvW0ddP1eIXDQzoSEwSFiHIp84Sl2RP28dGhYUoMBGRS4F5z3KsA8Gx96wDYaK/pd7zMvDa6GQF1vQ3gQ1sjqjr0lRLmDn7rvS8GM9c5fVh7rHSz1ct5xT0eqRT6UYBSUh7XPLqy+Z7WhF0e4hWA0zKIr4uC0qKqQCgCrjcElAgM3l2WVl1k0CX26ZggXOt+0BBT0NUwMJbKQcQEmdAIQNXwH26Ra4qi0Tkf5vURCP1G/O13fRD8k1r6/Ti5vks2p57pzPDv8vjsPT1u8K1HNbjH7Dwf0KJ9U2Q68HZ7BTey8QLw5eZmX2yLfsXum3D395Oe1nVcu0EQuzB1YasEeUkQ6w8IqzEEO+HzS1jJg4AgTDT8HSMhfSQhRlxU/l22agViB9abh5N/Wts24d3eELMoprvTX56AZw544N9g/nn6d49/88WWQ7Uz/7x+bpMefV0z5EPUtGDo+QC+mX5E5jXkJJajesfapjnQvdZi+IG/4vc+4vTWSF/6tf84+AS/p1cQMJWH+AWDoZuDF/xRS5iSKQgEISDz94u4hylOVMnEU0jIwWnIciR/PHbUWe8Imotj4B8NIshqo0P9yEDBbxOAMPDlCHiKW/ZGOfta/7dnH6JBaLjVqCt3psvDEr4e95tn8vX5jX3qkcQAd80nF80ccC+2O0w+a++IJ17Sw01jr4X8yHSsNdMZprT0BrVfcasw0SoEIiuVSVPwcUgOx1KkGznXQkqc7xo9Mi0BbRyrjsgK02typIsHeudcEw8EgUxMUEK45kMwAeOZrUAQOPbHAb9XujHpHP3yZgOA/W2X13G/29QvKujL56KdBo/Z8vvTK1p2Ynz8FBF3gnouiFdbOUpsq9h72uKN7kO5yfVlNIv6eiv6AGDyqWi5uduwQzsUVL4EW7AQEEswBQQ1XpUGFoMgsqigdiWOtMTmEMRHbnPGkND76DxDnCREZgRKFYGURiMIeFk67WeD0atmg8/Bz6Jf7LX1o73rssx6qexj0p+Ns5dwfMeu3sbyY8hmD8A5vscgvgPIw8TjwI0Z+dIvzOE+ql0SFUG8p9MjKnV+oA8Vp7egD33KJ5ZP8WKLd6POK67eMIkRKUiNkoLxSJrf1VmDLtoBYSLf7Cl/rK0d0B9vXOLZGCSy8nNfIg0HfWJMvVH4PRScACgdBOCvL8O/U3PqN3S88Xce9Izru9PzGyoj/cZLOyTaOrYvG5ptPowEgIfX2+lbH4PCVjpInBAZXhTYixU9oNuJBo9NrYsifhbnM/J9CszlHoo1Ng7rSR42us2SiIHiYGC5BgTRA8agGKhNox1AoGKDCOpZQ93oHXNhcSwiYdXbjoN/Ir99hGGC1ifyIwy8nZhVNaeDfyMVPFfEkAx+kZLoU7Ptt50AFgb3Mr9T2rdmPoS/coERRS8YfrGO46so73P65WqCebPeYeIx9ZifQ1Thd6eFW8mfxEWV8SExoKnLjj+Ykqaf8EeqF5mXC+B06lW+zO92e7AwUCrOcFqDzUCtrBJ8YJKWTpIYeP8u1rWYMAx1orxyU60/HBryIqhxhFFbGjinQ3Jc4L4ZCAR7E/BMhrxK+A/3t+Z+q+8redGf3/FxO93vptJZd3u16Y61cbG41bcY+WhQk22wYerBv3jW2qJOq6SL2uKNqwv2kD6R6wB/ANBDfiQ85PMWYc/tkO9fVoQtGA/KZDEQBIMBZcmHC65ZNVcXMtXriXl61zg7o+NZawGh5Nljr52hbtPUzhlsR6t6s9yIQJuaSntIy8Cdchg0EfA4AE+ltTyg7zmzD5T4iBX11p9f6ot8rmk/vH430btzx+ReLkNGRRuEaqcWxL5eIW1I0JPKZ0XJctjKWkKl2C9Uq/x6/C3s5Qro4lmr9EnLp3jHi98lyTmeEiTKi6QgYNqBsRRD0LvmpDu7bcSkVjp4GLIABF2GiAw+7vBunUypEIwV3eAvnmlsqlmBzI32vpDFQLh3sDfu+QQ8pXDBc7Ifdt8v9DNlE6SmHnRFfzXxS7sH8hnODPHbKHKZyfdDaTdFEC8/bMTzAN8d2Iun1/2OcHzRBzK+nvQoIb/bNId5vAtvCbpQIM4lGur3m9IaxAzEEsQUTDuQzmFBsDAwVsZYNzfPHRAtxpKHCYnYgkD8YcuN6IAsHogsIdKUxVAVkw/4m6dGP685OJZzSOqLFT8fByDDHGcAvo9nSnzU63z7nK/fTv7noZhfqzmzAfXiKZlbnYuRdzmEdtBHZbNdOs7luyqbo9APXQ+xsnzvjL+CPonTQfUU/FQDgkgEnCoEk+sa4VVuJo5Hy9pVFgQO26bid5iF49wtcsWlrolprPuuMJoYSDqkArC2CW92h+BBTYXRswn44gA8UyAHmn+FwIF9mnjQ3/JBz1tewpVXWCJ3fZWTm0v8LN6nBo6efqpUWadesG9X97lQ0Fy4J98vFpQTRgMOafY9GgBhX2v8LRe1Gn3xjPrC+wu/ZgTMtbED8YQxA+NZqnNkUP5PZIACAodykMXAki7eE4mnar1nGquLCx5snEObw6TtIhH1tlcAHisK3I8Enqng/yv2Drf/ztXP+31vaypkveIS1xf19c4kfVcMGgHAet2ai3Jmz+tSRzYwjwzGnuhfA3x+W9sVBFOYfT7S75824fsP9Is3hh9SSM/15Un/Xl6pf/O0OLi+1us2R9xHBD07TIkMGgGI7hvdcYo3ViHCKuzKCDEGrZfOSwVDfYUgKRHvEfldgn8lGHj0IuHFv8YLfnMYgeeNmQctv+e7v5reyNBnh58E/LD+rhxf7bBPajMeTKu3aaVFtHLoQWQ3toJ8o297z2ExLw5rH/RgPb2S+71cWhTcG+J+NeXRwO9a4p0W07/xcP53cfGAR2wElADgeouAgmApD9SyB0C+xRzJF7fysC2pkd0aGQg4UhANBCQZgiNcCPgtISwZA02HneCXRt957Tn4k2Afygy/Eh9SP+qU23wdfzRkFrMvVjR3tfV5DiqYB/Id9HHd2MvxLfWeynu9xTsd4lG6F8MvpNuKRJBUD78iJXKRbD3tBwQFsQedgn2dYHGFkTpF4kEBfWsYISagbx8Bwm31oUKMQVRS/ZIyYzvVMQV/pTTmaE3M0UlZ44iYZ1yXuaMzA3yIfgj+SXulz+9L5R/xP+gXC/SbC17gH9NcKPRDW3V99NlDP1K6m9DrDRIX0JOv+5gnDZAny6tDSkZS0+XWp3zFIdhXJPe2Y99/T6/L/l+cYxlZWCBIwQzyMmkJABblAK+QX8a+dnh4X65kn1hYa6rdIaaWUGrqZPCGEf5wGbBfICht2IBDKuR9i0BUxwT+WgmI9rriBhKeI2COh//Wt702/r4Z879kP2K9sf2K9UfVs2SzTccWt3l8S5vo+CaOqifbph69GncD8kKkNmLJcyiznqivco4nVxzfFn44vpbshX2OvORer/WF+HosjaAgHEQeELQhWlfTVFNYgr0eivRdvc/jeknKk+TWVVJr5gwCg3AQd3gjLQIBhx6RHN32Y71Iqb87aZyRsPyr5uLgZ4xHoNTtlKll3wxAWt/QPPKUqnerfKHp98I/Ur825QXycYGHzD93fVXT4PBTKUQ8iGoWqMeJxoSReIKeDL8Hlya58FPeV/qhsdq55Dw+IVUzm9O7JOzFc0jA8FaWHbamEUOgiqRpGUYfLDu8RJI4HuQ45GbiRhmdrVLdpjGwFsloNysQlQLpawJeU9AHBkotAn1CVrz95vQDAESHTMDT/T1e/kLrW2/8SbCvjrovo/7axC+WnwpeSPp25BP2ungf0EM7mVywxy4JeQ+0bzQivWEX9mZNcOyUOe+yL6mC64s6+FX06Tkufv9kCaIpK1IQCAXLzZwfLDLIfOn9VDFVlJDwYUgaW8a4UJB72/cKZA7nQ5gUA/18bHRFIMNS8YCxAY+bgCcA9wE4E3Bwf8HfTvcH7KPuhdTvWPdCvTOJD691HmJ+nedLvBtR1nKkgMWrlpltN+pR5CtzrEAe0k++gJBqBxwAv2u391Ox/b44/kxf4/31a5yk/9Ya7/VlVzUGs36QlhKvktbIacsMf1wpYYsLXpuClYQkSh7IGpsIOgBB2Fdubbe+OijodYKYgeiIJ0xG5PeWgRLXZ4qA8aD1gyZ5NcyZDXlpAPa1LxWA/K3s0U/sawc9E/sDf1I70XSCn987xAvRolvdXQuhowcSuHhcBry1xDroQ69r5MWSFpIXOxP8o7u3q3VBbvAF3OBcKj7BwPgKPJwh2BmCNS8sCuq6kXiAoIzB3MCfdsTNc4gcSVs8ox3BwbXX1Aj0Q1299GQG9hBsJ0dTE+NeMBPzN68OBn+xujbxp/3Us9vfmuDfencz72vsD7V3HIl+x/D3dhxlteP1tlZfvEazb47padeB4QUciGV1dp8BEH28vr7Nkh6ouL1E/YBfRZ+WXQHJtVYIFmEIbqVEPvokwalCRke0myVZSxMrJFKBSgE1YqoCQ2xBIPMT5kYRR+AzZmXZgIQbjQB8nhN86sUAmJvRL+Uzr9z9XS2/Zd5LyfsCP+S2H+Sz+ua9DrYpvVFtPM4FfxVzHCW8tkI9aj/UGgH8+lrneNHq0VY6f9m2/aDfsyUExjJZgv82liCyZrnpuk2FBfWtWbuOKx6ISzzBsFXa8SbSxBiE1kAsZYD5YDjQGfj7VBdIc4gDELVG4DOjgKfQAL619nILcPZ+Y/GmX0lFz4y7Gsb8Ab/J9jNVy89GUmUQqNVVvVkX1cv3KICXP6ifa0mztjgg+DeUvKCS9UU7Mb+vLySDYNFEwJoXHsxA9LlTYw3Gm++7lEXlMsfjhHTPgCWJrXsu9usB1GgnKVwmxng2pJuSAAPRhEAguBcF/PWshXnJBpA/1hPf+fd/vP/f9u4CMaEYBgDoXG+Bu3P/qy0bDuncea+KfqBtcNhzGTnEaF52LjqdaDsvGS1SpjfqlXRTw1wzN3hGfVB/k/kPoP5mg7JmatgcprqpXlFM5kTM/E7U0bzsMhbVxeXjCou0435htS4Lv5D15v+JEwDLb6G/WW1R7eUo+ynyF6tWq7WnBNtqixSdL3WdpGRdvOjty1AA/LHQufmtmetFvl7kdARuwjsvz8uXyJjzkq+YQzdL5W1uch7czOg/58Uxyg8AhDoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4HcBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgARblNyUGzrpCAAAAAElFTkSuQmCC';
    switch (metas.rank) {
        case '完美':
            image = 'data:image/png;base64,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';
            break;
        case '优秀':
            image = 'data:image/png;base64,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';
            break;
        default:
    }
    return this.rank$show(self.runtime.episode.theme.start.image, image).then(function () {
        return self.curtain$hide();
    }).pass(context);
};

/**
 * 显示评分。
 *
 * @param  {String} base
 * @param  {String} cover
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.rank$show = function(base, cover) {
    this.runtime.logger.error('bigine.runtime.director#rank$show(', base, ',', cover, ')');
    return this.oops();
};

/**
 * 销毁。
 *
 * @return {void}
 */
bigine.runtime.director.prototype.destroy = function() {
    context.logger.error('bigine.runtime.director#destroy()');
};

module.exports = bigine.runtime.director;
