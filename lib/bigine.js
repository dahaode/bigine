/**
 * 定义入口组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 DaHao.de
 * @license   GPL-3.0+
 */

/**
 * 快捷入口方法。
 *
 * @return {(bigine.core.tag|Object)}
 */
var bigine = function() {
        bigine.$import('.episode.index').$import('.runtime.runtime').$import('.tag.root').$import('.util');
        return $.tag.apply($, arguments) || $.run.apply($, arguments);
    },
    $ = {};

/**
 * 版本。
 *
 * @const {String}
 */
bigine.$version = '0.1.0';

/**
 * 重建标签。
 *
 * @param  {Number} index
 * @param  {Number=} lineNumber
 * @param  {String=} content
 * @param  {Array=} params
 * @param  {Array=} children
 * @param  {String=} id
 * @return {bigine.core.tag}
 */
$.tag = function(index, lineNumber, content, params, children, id) {
    if ('number' != typeof index || !bigine.episode.index[index]) {
        return;
    }
    var args = [],
        ii;
    for (ii = 1; ii < arguments.length; ii++) {
        args.push(arguments[ii]);
    }
    lineNumber = 0;
    content = id = '';
    params = children = [];
    ii = args.shift();
    if (ii && bigine.util.isNumber(ii)) {
        lineNumber = ii;
        ii = args.shift();
    }
    if (ii && bigine.util.isString(ii)) {
        content = ii;
        ii = args.shift();
    }
    if (ii && bigine.util.isArray(ii) && bigine.util.isString(ii[0])) {
        params = ii;
        ii = args.shift();
    }
    if (ii && bigine.util.isArray(ii)) {
        children = ii;
        ii = args.shift();
    }
    if (ii && bigine.util.isString(ii)) {
        id = ii;
    }
    var tag, name;
    if ('bigine.tag.root' == bigine.episode.index[index]) {
        tag = new bigine.tag.root();
        return tag.$append(children);
    } else if ('bigine.core.tag' == bigine.episode.index[index]) {
        name = params.shift();
    }
    tag = new (bigine.$require(bigine.episode.index[index]))(lineNumber, params, content);
    if (id) {
        tag.id = id;
    }
    tag.$append(children);
    if (name) {
        tag.$params.unshift(name);
    }
    return tag;
};

/**
 * 运行。
 *
 * @param  {Array<bigine.core.tag>} tags
 * @param  {Number=} level
 * @param  {bigine.runtime.director=} director
 * @return {Object}
 */
$.run = function(tags, level, director) {
    var root;
    if (tags instanceof bigine.tag.root) {
        root = tags;
    } else {
        if (bigine.util.isArray(tags)) {
            root = new bigine.tag.root();
            root.$append(tags);
        } else {
            return;
        }
    }
    return (new bigine.runtime.runtime(root, level)).setup(director);
};

/**
 * 继承。
 *
 * @param  {Function} parent
 * @param  {Function} ctor
 * @return {Function}
 * @see https://github.com/google/closure-library/blob/master/closure/goog/base.js
 */
bigine.$extends = function(parent, ctor) {
    switch (parent) {
        case Object:
            ctor.prototype = {};
            break;
        case Array:
            ctor.prototype = [];
            break;
        default:
            if ('string' == typeof parent) {
                parent = this.$require(parent);
            }
            ctor.prototype = Object.create(parent.prototype);
    }
    ctor.prototype.constructor = ctor;
    return ctor;
};

/**
 * 初始化命名空间。
 *
 * @param  {String} namespace
 * @return {Object}
 */
bigine.$namespace = function(namespace) {
    var nodes = $.extract(namespace);
    if ('bigine' == nodes[0]) {
        return this.$import(nodes);
    }
    namespace = {
        $import: this.$import,
        $require: this.$require
    };
    return namespace.$import(nodes);
};

/**
 * 将命名空间分段。
 *
 * @param  {(String|Array<String>)} namespace
 * @return {Array<String>}
 */
$.extract = function(namespace) {
    var nodes = namespace;
    if (!(namespace instanceof Array)) {
        if ('.js' == namespace.substr(-3)) {
            namespace = namespace.substr(0, namespace.length - 3);
            nodes = namespace.split('/');
        } else if (-1 < namespace.indexOf('/')) {
            nodes = namespace.split('/');
        } else {
            nodes = namespace.split('.');
            nodes[0] = nodes[0] || 'bigine';
        }
        if ('.' == nodes[0]) {
            nodes.shift();
        }
    } else {
        nodes[0] = nodes[0] || 'bigine';
    }
    return nodes;
};

/**
 * 加载组件。
 *
 * @param  {String} namespace
 * @return {Object}
 * @chainable
 */
bigine.$import = function(namespace) {
    this.$require(namespace);
    return this;
};

/**
 * 加载组件。
 *
 * @param  {String} namespace
 * @return {bigine.core.component}
 */
bigine.$require = function(namespace) {
    this.$map = this.$map || {};
    var nodes = $.extract(namespace),
        parent = this,
        node;
    namespace = nodes.join('.');
    if (this.$map[namespace]) {
        return this.$map[namespace];
    }
    node = nodes.pop();
    if (1 < nodes.length) {
        parent = this.$require(nodes.slice(0));
    }
    if ('bigine' == nodes[0]) {
        nodes[0] = '.';
    }
    try {
        parent[node] = require(nodes.join('/') + '/' + node);
    } catch (error) {
        if ('MODULE_NOT_FOUND' != error.code) {
            throw error;
        }
        parent[node] = {};
    }
    this.$map[namespace] = parent[node];
    return parent[node];
};

/**
 * Browserify HACK
 *
 * @return {Null}
 * @ignore
 */
$.browserify = function() {
    require('./error');
    require('./core/component');
    require('./core/token');
    require('./util');
    require('./episode/game');
    require('./episode/index');
    require('./core/tag');
    require('./core/emittable');
    require('./util/key');
    require('./util/promise');
    require('./core/episode');
    require('./tag/autostart');
    require('./tag/player');
    require('./util/resource');
    require('./tag/suite');
    require('./tag/theme');
    require('./tag/entity');
    require('./entity/common/audio');
    require('./entity/common/image');
    require('./entity/bgm');
    require('./entity/se');
    require('./entity/cg');
    require('./entity/weather');
    require('./entity/character');
    require('./entity/character/avatar');
    require('./entity/character/pose');
    require('./entity/map');
    require('./entity/map/base');
    require('./entity/map/point');
    require('./entity/map/point/hilite');
    require('./entity/map/point/region');
    require('./entity/map/point/room');
    require('./entity/map/template');
    require('./entity/map/template/point');
    require('./core/scene');
    require('./tag/action');
    require('./action/room/fallback');
    require('./tag/scene');
    require('./tag/scene/type');
    require('./tag/scene/assertion');
    require('./tag/scene/plot');
    require('./entity/room');
    require('./entity/room/map');
    require('./entity/room/snap');
    require('./tag/root');
    require('./util/parser');
    require('./action/character/appear');
    require('./action/character/disappear');
    require('./action/character/place');
    require('./action/character/pose');
    require('./action/dialog/monolog');
    require('./action/dialog/speak');
    require('./action/dialog/tip');
    require('./action/dialog/voiceover');
    require('./action/episode/done');
    require('./action/episode/fail');
    require('./action/episode/rank');
    require('./action/room/bgm');
    require('./action/room/cgoff');
    require('./action/room/cgon');
    require('./action/room/fake');
    require('./action/room/halt');
    require('./action/room/layout');
    require('./action/room/move');
    require('./action/room/sound');
    require('./action/room/weather');
    require('./action/value/assert');
    require('./action/value/assign');
    require('./action/value/test');
    require('./action/value/choose');
    require('./action/value/or');
    require('./action/value/otherwise');
    require('./action/value/then');
    require('./action/value/when');
    require('./action/value/xcrease');
    require('./runtime/env');
    require('./runtime/director');
    require('./runtime/director/node');
    require('./runtime/director/classic');
    require('./runtime/director/factory');
    require('./runtime/logger');
    require('./runtime/state');
    require('./runtime/runtime');
};

module.exports = bigine;
