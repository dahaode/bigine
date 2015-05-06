/**
 * 定义传统模式运行时场面（视觉、听觉、交互）指挥器组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../../bigine').$namespace('.runtime.director')
    .$import('.util.promise'),
    $ = {};

/**
 * 传统模式运行时场面（视觉、听觉、交互）指挥器组件。
 *
 * @return {bigine.runtime.director.classic}
 * @constructor
 * @extends {bigine.runtime.director}
 */
bigine.runtime.director.classic = bigine.$extends(bigine.runtime.director, function() {
    /** @override */
    this.$prototype = 'bigine.runtime.director.classic';
});

/**
 * 初始化图层。
 *
 * @return {HTMLElement}
 */
$.layers = function() {
    var div = function(className, child) {
        var el = document.createElement('div');
        el.className = className;
        if (child) {
            el.appendChild(child);
        }
        return el;
    },
        box = div('bg-container'),
        els = document.getElementsByTagName('bg-viewport');
    $.viewport = div('bg-viewport', div('bg-viewport-inner', div('bg-container-outer', box)));
    $.viewport.back = box.appendChild(div('bg-layer-back'));
    $.viewport.weather = box.appendChild(div('bg-layer-weather'));
    $.viewport.chars = box.appendChild(div('bg-layer-chars'));
    $.viewport.graph = box.appendChild(div('bg-layer-graph'));
    $.viewport.words = box.appendChild(div('bg-layer-words'));
    $.viewport.curtain = box.appendChild(div('bg-layer-curtain'));
    $.viewport.choose = box.appendChild(div('bg-layer-choose'));
    $.viewport.pause = box.appendChild(div('bg-layer-pause'));
    $.viewport.start = box.appendChild(div('bg-layer-start'));
    $.viewport.motion = box.appendChild(div('bg-layer-motion'));
    $.viewport.barrages = $.viewport.firstChild.appendChild(div('bg-layer-barrages'));
    $.viewport.cover = $.viewport.firstChild.appendChild(div('bg-layer-cover'));
    if (els.length) {
        els[0].parentElement.replaceChild($.viewport, els[0]);
    } else {
        document.body.appendChild($.viewport);
    }
    return $.viewport;
};

/** @inheritDoc */
bigine.runtime.director.classic.prototype.init = function(episode, context) {
    $.layers();
    var self = this,
        el = $.viewport.firstChild.firstChild,
        w = $.viewport.offsetWidth,
        h = $.viewport.offsetHeight,
        t = Math.round(w / 16 * 9);
    if (t > h) {
        t = Math.round(h / 9 * 16);
        w = (w - t) / 2;
        el.style.width = t + 'px';
        el.style.left = w + 'px';
    } else if (t < h) {
        h = (h - t) / 2;
        el.style.height = t + 'px';
        el.style.top = h + 'px';
    }
    bigine.util.on('click', $.viewport.cover, function (event) {
        self.play(episode, context);
    });
    return this;
};

/** @inheritDoc */
bigine.runtime.director.classic.prototype.play = function(episode, context) {
    var self = this;
    $.autostart = episode.autostart();
    context.logger.debug('[autostart]', $.autostart);
    if (episode.autostart()) {
        $.curtain = true;
        $.viewport.curtain.style.display = 'block';
        episode.start(context);
    } else {
        bigine.util.on('click', $.viewport.start, function (event) {
            $.viewport.start.style.display = 'none';
            $.curtain = true;
            $.viewport.curtain.style.display = 'block';
            episode.begin(context);
        }).style.display = 'block';
    }
    $.viewport.cover.style.display = 'none';
    return this;
};

/** @inheritDoc */
bigine.runtime.director.classic.prototype.curtain = function(context, enable) {
    if (undefined === $.curtain) {
        $.curtain = 'block' == $.viewport.curtain.style.display;
    }
    if (undefined === enable) {
        enable = !$.curtain;
    } else {
        enable = !!enable;
    }
    context.logger.debug('[director] curtain', enable);
    $.curtain = enable;
    var start = 0,
        end = 0;
    if ($.curtain) {
        end = 100;
    } else {
        start = 100;
    }
    return bigine.util.promise.transform(function (resolve) {
        if (100 == start + end) {
            $.viewport.curtain.style.display = 'block';
        }
        if (start > end) {
            start--;
        } else {
            start++;
        }
        if (undefined === $.viewport.curtain.style.opacity) {
            $.viewport.curtain.style.filter = 'alpha(opacity=' + start + ')';
        } else {
            $.viewport.curtain.style.opacity = start / 100;
        }
        if (start == end) {
            resolve(context);
            if (!end) {
                $.viewport.curtain.style.display = 'none';
            }
        }
    }, 10);
};

/** @inheritDoc */
bigine.runtime.director.classic.prototype.room = function(context, room) {
    if (room) {
        $.room = room;
        if (room.interactive) {
            context.logger.debug('[director] map set to', room.interactive.map.image.src);
            return this.oops(context);
        }
        return this.layout(context, $.layout);
    }
    delete $.room;
    return this.curtain(context, true);
};

/** @inheritDoc */
bigine.runtime.director.classic.prototype.layout = function(context, layout) {
    $.layout = layout;
    var snap = $.room.snaps[$.layout] || $.room.snaps['午'];
    context.logger.debug('[director] background set to', snap);
    return this.oops(context);
};

/** @inheritDoc */
bigine.runtime.director.classic.prototype.bgm = function(context, sound) {
    context.logger.debug('[director] sound (loop)', sound.audio.src);
    return this.oops(context);
};

/** @inheritDoc */
bigine.runtime.director.classic.prototype.cg = function(context, cg) {
    if (cg) {
        context.logger.debug('[director] CG set to', cg.image.src);
    } else {
        context.logger.debug('[director] CG off');
    }
    return this.oops(context);
};

/** @inheritDoc */
bigine.runtime.director.classic.prototype.lchar = function(context, who, animated) {
    animated = !!animated || false;
    if (who && !animated) {
        context.logger.debug('[director] left char (place) to', who.poses[who.pose]);
        return this.oops(context);
    }
    if ($.curtain) {
        this.curtain(context);
    }
    if (!who) {
        context.logger.debug('[director] left char (0.1secs) cleared');
        return bigine.util.promise.delay(100, context);
    }
    context.logger.debug('[director] left char (0.1secs) to', who.poses[who.pose]);
    return bigine.util.promise.delay(100, context);
};

/** @inheritDoc */
bigine.runtime.director.classic.prototype.cchar = function(context, who, animated) {
    animated = !!animated || false;
    if (who && !animated) {
        context.logger.debug('[director] center char (place) to', who.poses[who.pose]);
        return this.oops(context);
    }
    if ($.curtain) {
        this.curtain(context);
    }
    if (!who) {
        context.logger.debug('[director] center char (0.1secs) cleared');
        return bigine.util.promise.delay(100, context);
    }
    context.logger.debug('[director] center char (0.1secs) to', who.poses[who.pose]);
    return bigine.util.promise.delay(100, context);
};

/** @inheritDoc */
bigine.runtime.director.classic.prototype.rchar = function(context, who, animated) {
    animated = !!animated || false;
    if (who && !animated) {
        context.logger.debug('[director] right char (place) to', who.poses[who.pose]);
        return this.oops(context);
    }
    if ($.curtain) {
        this.curtain(context);
    }
    if (!who) {
        context.logger.debug('[director] right char (0.1secs) cleared');
        return bigine.util.promise.delay(100, context);
    }
    context.logger.debug('[director] right char (0.1secs) to', who.poses[who.pose]);
    return bigine.util.promise.delay(100, context);
};

/** @inheritDoc */
bigine.runtime.director.classic.prototype.charpos = function(character) {
    if (!$.chars) {
        return -1;
    }
    for (var ii = 0; ii < 3; ii++) {
        if ($.chars[ii] && $.chars[ii].title == character.title) {
            return ii;
        }
    }
    return -1;
};

/** @inheritDoc */
bigine.runtime.director.classic.prototype.se = function(context, sound) {
    context.logger.debug('[director] sound (once)', sound.audio);
    return this.oops(context);
};

/** @inheritDoc */
bigine.runtime.director.classic.prototype.voiceover = function(context, words) {
    $.viewport.words.style.display = 'block';
    if ($.curtain) {
        this.curtain(context);
    }
    var self = this,
        reset = function() {
            $.viewport.words.style.display = 'none';
            return self.oops(context);
        };
    if ($.autostart) {
        var time = Math.ceil(words.length * 1000 / 6);
        context.logger.debug('[director] voiceover (', time / 1000, 'secs)', words);
        return bigine.util.promise.delay(time).then(reset);
    }
    context.logger.debug('[director] voiceover (click)', words);
    return bigine.util.promise.click($.viewport).then(reset);
};

/** @inheritDoc */
bigine.runtime.director.classic.prototype.say = function(context, who, words, nick) {
    $.viewport.words.style.display = 'block';
    if ($.curtain) {
        this.curtain(context);
    }
    var self = this,
        reset = function() {
            $.viewport.words.style.display = 'none';
            return self.oops(context);
        };
    nick = nick || who.title;
    if ($.autostart) {
        var time = Math.ceil(words.length * 1000 / 6);
        context.logger.debug('[director]', nick, 'say (', time / 1000, 'secs)', words);
        return bigine.util.promise.delay(time).then(reset);
    }
    context.logger.debug('[director]', nick, 'say (click)', words);
    return bigine.util.promise.click($.viewport).then(reset);
};

module.exports = bigine.runtime.director.classic;
