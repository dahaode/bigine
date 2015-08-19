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
    .$import('.util.promise')
    .$import('.util.resource'),
    $ = {},
    $r = bigine.util.resource,
    $p = bigine.util.promise;

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
    this.bgm$play();
    this.se$play();
    this.curtain$show().delay(500).then(function () {
        return self.logo$show($r.format('//s.dahao.de/lib/bigine/logo.png'));
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
    if (context.episode.auto) {
        context.logger.info('  [player] STORY');
        context.dispatch(new bigine.runtime.event['new']());
    } else {
        this.start$show($r.format(theme.image), [
            {
                x: theme['new'].left,
                y: theme['new'].top,
                w: theme['new'].width,
                h: theme['new'].height,
                i: $r.format(theme['new'].image),
                ih: $r.format(theme['new'].hover),
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
                i: $r.format(theme.load.image),
                ih: $r.format(theme.load.hover),
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
    return $p.resolve(context);
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
                return $p.reject(new bigine.error('左位已有人物'));
            }
            this.leftChar = metas.character;
            move = 'left';
            break;
        case bigine.runtime.director.POS_RIGHT:
            if (this.rightChar) {
                return $p.reject(new bigine.error('右位已有人物'));
            }
            this.rightChar = metas.character;
            move = 'right';
            break;
        default:
            if (this.middleChar) {
                return $p.reject(new bigine.error('中位已有人物'));
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
            this.leftChar = undefined;
            q = this.chars$out$left();
            break;
        case bigine.runtime.director.POS_RIGHT:
            this.rightChar = undefined;
            q = this.chars$out$right();
            break;
        default:
            this.middleChar = undefined;
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
        return self.cg$show($r.format(metas.cg.image.src));
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
            i: $r.format(theme.option.back.image),
            ih: $r.format(theme.option.back.hover),
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
        this.bgm.play();
    }
    if (!id) this.bgm.src = $r.format('//s.dahao.de/lib/bigine/oops.mp3');
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
        this.se.cd = -1;
        this.se.play();
    }
    if (!id) this.se.src = $r.format('//s.dahao.de/lib/bigine/oops.mp3');
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
        return self.end$show(
            $r.format(self.runtime.episode.theme.start.image),
            $r.format('//s.dahao.de/lib/bigine/thx.png')
        );
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
        image = '//s.dahao.de/lib/bigine/1star.png';
    switch (metas.rank) {
        case '完美':
            image = '//s.dahao.de/lib/bigine/3stars.png';
            break;
        case '优秀':
            image = '//s.dahao.de/lib/bigine/2stars.png';
            break;
        default:
    }
    return this.rank$show(
        $r.format(self.runtime.episode.theme.start.image),
        $r.format(image)
    ).then(function () {
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
    this.runtime.logger.error('bigine.runtime.director#destroy()');
};

module.exports = bigine.runtime.director;
