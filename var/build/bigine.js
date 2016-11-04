var __Bigine_Util = require("bigine.util");
var __Bigine_C2D = require("bigine.c2d");
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 定义（运行时）抽象事件组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/Event.ts
 */
/// <reference path="../../include/tsd.d.ts" />
var Ev;
(function (Ev) {
    var Event = (function () {
        /**
         * 构造函数。
         */
        function Event(metas) {
            this.target = metas.target;
        }
        /**
         * 获取类型。
         */
        Event.prototype.gT = function () {
            return '';
        };
        return Event;
    }());
    Ev.Event = Event;
})(Ev || (Ev = {}));
/**
 * 声明标签接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_Tag/ITag.ts
 */
/// <reference path="../_Runtime/IEpisode.ts" />
/**
 * 声明带唯一标识标签接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_Tag/IIdableTag.ts
 */
/// <reference path="ITag.ts" />
/**
 * 声明实体定义标签接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_Tag/IEntityTag.ts
 */
/// <reference path="ITag.ts" />
/**
 * 声明根标签接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_Tag/IRootTag.ts
 */
/// <reference path="../../../include/tsd.d.ts" />
/// <reference path="IEntityTag.ts" />
/**
 * 声明（运行时）数据状态接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_Runtime/IStates.ts
 */
/// <reference path="../../../include/tsd.d.ts" />
/**
 * 1. `_` 表明为场效相关信息，需要被存档记录；
 *     * `_a` - 动作编号 - Runtime
 *     * `_b` - 背景音乐名 - Tag
 *     * `_e` - 环境音乐名 - Tag    // 添加环境音乐命令时所需记录的存档信息
 *     * `_c` - 特写名 - Tag
 *     * `_c<站位>` - 人物名 - Tag
 *     * `_s<站位>` - 人物神态名 - Tag
 *     * `_rc` - （所在）房间名 - Tag
 *     * `_rd` - （显示）房间名 - Tag
 *     * `_rt` - （移动目标）房间名 - Tag
 *     * `_p` - 时序类型 - Runtime
 *     * `_s` - 事件编号 - Runtime
 *     * `_t` - 时刻名 - Tag
 *     * `_w` - 天气名 - Tag
 *     * `_z` -  房间状态 - Tag    // 添加镜头控制命令时所需记录的存档信息
 *     * `_ra` -  切幕动画 - Tag    // 添加切幕动画命令时所需记录的存档信息
 *     * `_rb` -  神态动画 - Tag    // 添加神态动画命令时所需记录的存档信息
 *     * `_f` -  全屏文本 - Tag    // 添加全屏文本命令时所需记录的存档信息
 *     * `_td` -  全屏文本 - Tag    // 打赏时间
 * 2. `.` 表明为会话持久信息，不能被存档记录；
 *     * `.p<人物名>` - 人物站位 - Runtime/Tag
 *     * `.a` - 动作编号 - Runtime/Tag
 *     * `.s` - 事件编号 - Runtime
 *     * `.c` - 特写名 - Tag
 *     * `.c<站位>` - 人物名 - Tag
 *     * `.z` -  房间状态 - Tag
 *     * `.l` -  资源加载状态 - Tag
 *     * `.al` -  自动读档标记 - Tag
 *     * `.oc` -  screen 的 open 事件标记 - Tag
 * 3. `$` 表明为注册对象，不能被存档记录；
 *     * `$c` - 人物数量 - Runtime
 *     * `$d` - 事件逻辑层深度 - Tag
 *     * `$rc` - （所在）房间对象 - Tag
 *     * `$rd` - （显示）房间对象 - Tag
 *     * `$rt` - （移动目标）房间对象 - Tag
 *     * `$t<深度>` - 比较是否完成 - Tag
 *     * `$v<深度>` - 当前比较值 - Tag
 *     * `$_<选项名>` - 选项定义 - Tag
 * 4. 其它为作品运行信息，需要被存档记录。
 */
var Core;
(function (Core) {
    var IStates;
    (function (IStates) {
        /**
         * 存档类型。
         */
        (function (Save) {
            /**
             * 作品内部存档。
             */
            Save[Save["Work"] = 0] = "Work";
            /**
             * 前一集连载存档。
             */
            Save[Save["Series"] = 1] = "Series";
            /**
             * 本集连载存档。
             */
            Save[Save["End"] = 2] = "End";
        })(IStates.Save || (IStates.Save = {}));
        var Save = IStates.Save;
    })(IStates = Core.IStates || (Core.IStates = {}));
})(Core || (Core = {}));
/**
 * 声明（运行时）资源（如：图片、音频等）组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_Resource/IResource.ts
 */
var Core;
(function (Core) {
    var IResource;
    (function (IResource) {
        /**
         * 类型。
         */
        (function (Type) {
            /**
             * 房间（图片）。
             */
            Type[Type["Room"] = 0] = "Room";
            /**
             * 地图（高亮图片）。
             */
            Type[Type["Map"] = 1] = "Map";
            /**
             * 人物立绘（图片）。
             */
            Type[Type["Pose"] = 2] = "Pose";
            /**
             * 人物头像（图片）。
             */
            Type[Type["Avatar"] = 3] = "Avatar";
            /**
             * 特写（图片）。
             */
            Type[Type["CG"] = 4] = "CG";
            /**
             * 背景音乐。
             */
            Type[Type["BGM"] = 5] = "BGM";
            /**
             * 音效。
             */
            Type[Type["SE"] = 6] = "SE";
            /**
             * 原生（图片）。
             */
            Type[Type["Raw"] = 7] = "Raw";
            /**
             * 环境音乐。
             */
            Type[Type["ESM"] = 8] = "ESM";
        })(IResource.Type || (IResource.Type = {}));
        var Type = IResource.Type;
    })(IResource = Core.IResource || (Core.IResource = {}));
})(Core || (Core = {}));
/**
 * 声明地图（定义）标签接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_Tag/IMapTag.ts
 */
/// <reference path="IEntityTag.ts" />
/// <reference path="IPointTag.ts" />
/**
 * 声明房间（定义）标签接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_Tag/IRoomTag.ts
 */
/// <reference path="IMapTag.ts" />
/// <reference path="ISceneHost.ts" />
/// <reference path="../_Resource/IResource.ts" />
/**
 * 声明（运行时场效）交互按钮接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_Runtime/IButtonable.ts
 */
/// <reference path="IRuntime.ts" />
/**
 * 声明（地图）交互点标签接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_Tag/IPointTag.ts
 */
/// <reference path="IRoomTag.ts" />
/// <reference path="../_Runtime/IButtonable.ts" />
/// <reference path="../_Resource/IResource.ts" />
/**
 * 声明选项动作标签接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_Tag/IOptionTag.ts
 */
/// <reference path="ITag.ts" />
/// <reference path="../_Runtime/IButtonable.ts" />
/// <reference path="../_Tag/IIdableTag.ts" />
/**
 * 声明（运行时）场效调度器接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_Runtime/IDirector.ts
 */
/// <reference path="../_Resource/IResource.ts" />
/// <reference path="IRuntime.ts" />
/// <reference path="../_Tag/IPointTag.ts" />
/// <reference path="../_Tag/IOptionTag.ts" />
var Core;
(function (Core) {
    var IDirector;
    (function (IDirector) {
        /**
         * 位置。
         */
        (function (Position) {
            /**
             * 最左。
             */
            Position[Position["LLeft"] = 1] = "LLeft";
            /**
             * 左。
             */
            Position[Position["Left"] = 2] = "Left";
            /**
             * 左中。
             */
            Position[Position["CLeft"] = 3] = "CLeft";
            /**
             * 中。
             */
            Position[Position["Center"] = 4] = "Center";
            /**
             * 右中。
             */
            Position[Position["CRight"] = 5] = "CRight";
            /**
             * 右。
             */
            Position[Position["Right"] = 6] = "Right";
            /**
             * 最右。
             */
            Position[Position["RRight"] = 7] = "RRight";
        })(IDirector.Position || (IDirector.Position = {}));
        var Position = IDirector.Position;
        /**
         * 评分星级。
         */
        (function (Stars) {
            /**
             * 及格。
             */
            Stars[Stars["OK"] = 0] = "OK";
            /**
             * 优秀。
             */
            Stars[Stars["Awesome"] = 1] = "Awesome";
            /**
             * 完美。
             */
            Stars[Stars["Perfect"] = 2] = "Perfect";
            /**
             * 超绝。
             */
            Stars[Stars["Superb"] = 3] = "Superb";
            /**
             * 传奇。
             */
            Stars[Stars["Legend"] = 4] = "Legend";
        })(IDirector.Stars || (IDirector.Stars = {}));
        var Stars = IDirector.Stars;
    })(IDirector = Core.IDirector || (Core.IDirector = {}));
})(Core || (Core = {}));
/**
 * 声明运行时接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_Runtime/IRuntime.ts
 */
/// <reference path="../_Tag/IRootTag.ts" />
/// <reference path="IStates.ts" />
/// <reference path="IDirector.ts" />
var Core;
(function (Core) {
    var IRuntime;
    (function (IRuntime) {
        /**
         * 连载类型。
         */
        (function (Series) {
            /**
             * 非连载。
             */
            Series[Series["Alone"] = 0] = "Alone";
            /**
             * 第一集。
             */
            Series[Series["First"] = 1] = "First";
            /**
             * 后续集。
             */
            Series[Series["Rest"] = 2] = "Rest";
            /**
             * 最后一集。
             */
            Series[Series["Last"] = 3] = "Last";
        })(IRuntime.Series || (IRuntime.Series = {}));
        var Series = IRuntime.Series;
    })(IRuntime = Core.IRuntime || (Core.IRuntime = {}));
})(Core || (Core = {}));
/**
 * 声明可执行标签接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_Tag/IPerformableTag.ts
 */
/// <reference path="ITag.ts" />
/// <reference path="../_Runtime/IRuntime.ts" />
/**
 * 声明（作品）事件标签接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_Tag/ISceneTag.ts
 */
/// <reference path="IIdableTag.ts" />
/// <reference path="IPerformableTag.ts" />
var Core;
(function (Core) {
    var ISceneTag;
    (function (ISceneTag) {
        /**
         * 类型。
         */
        (function (Type) {
            /**
             * 开始时。
             */
            Type[Type["Begin"] = 0] = "Begin";
            /**
             * 失败时。
             */
            Type[Type["Fail"] = 1] = "Fail";
            /**
             * 完结时。
             */
            Type[Type["End"] = 2] = "End";
            /**
             * 离开房间前。
             */
            Type[Type["PreLeave"] = 3] = "PreLeave";
            /**
             * 进入房间前。
             */
            Type[Type["PreEnter"] = 4] = "PreEnter";
            /**
             * 离开房间后。
             */
            Type[Type["PostLeave"] = 5] = "PostLeave";
            /**
             * 进入房间后。
             */
            Type[Type["PostEnter"] = 6] = "PostEnter";
        })(ISceneTag.Type || (ISceneTag.Type = {}));
        var Type = ISceneTag.Type;
        ;
    })(ISceneTag = Core.ISceneTag || (Core.ISceneTag = {}));
})(Core || (Core = {}));
/**
 * 声明（作品）事件宿主接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_Tag/ISceneHost.ts
 */
/// <reference path="ISceneTag.ts" />
/**
 * 声明（运行时）作品接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_Runtime/IEpisode.ts
 */
/// <reference path="../_Tag/ISceneHost.ts" />
/// <reference path="IRuntime.ts" />
/// <reference path="../_Tag/IEntityTag.ts" />
/// <reference path="../_Resource/IResource.ts" />
var Core;
(function (Core) {
    var IEpisode;
    (function (IEpisode) {
        /**
         * 实体类型。
         */
        (function (Entity) {
            /**
             * 房间。
             */
            Entity[Entity["Room"] = 0] = "Room";
            /**
             * 角色。
             */
            Entity[Entity["Chr"] = 1] = "Chr";
            /**
             * 背景音乐。
             */
            Entity[Entity["BGM"] = 2] = "BGM";
            /**
             * 音效。
             */
            Entity[Entity["SE"] = 3] = "SE";
            /**
             * 特写。
             */
            Entity[Entity["CG"] = 4] = "CG";
            /**
             * 地图。
             */
            Entity[Entity["Map"] = 5] = "Map";
            /**
             * 天气。
             */
            Entity[Entity["Weather"] = 6] = "Weather";
            /**
             * 主角（特殊类型）。
             */
            Entity[Entity["Player"] = 7] = "Player";
            /**
             * 结构。
             */
            Entity[Entity["Struct"] = 8] = "Struct";
        })(IEpisode.Entity || (IEpisode.Entity = {}));
        var Entity = IEpisode.Entity;
    })(IEpisode = Core.IEpisode || (Core.IEpisode = {}));
})(Core || (Core = {}));
/**
 * 声明（运行时）（播放准备）就绪事件元信息接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/IReadyMetas.ts
 */
/// <reference path="../../Core/_Runtime/IEpisode.ts" />
/**
 * 定义（运行时）（播放准备）就绪事件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/Ready.ts
 */
/// <reference path="../Event.ts" />
/// <reference path="IReadyMetas.ts" />
var Ev;
(function (Ev) {
    var Ready = (function (_super) {
        __extends(Ready, _super);
        /**
         * 构造函数。
         */
        function Ready(metas) {
            _super.call(this, metas);
        }
        /**
         * 获取类型。
         */
        Ready.prototype.gT = function () {
            return 'ready';
        };
        return Ready;
    }(Ev.Event));
    Ev.Ready = Ready;
})(Ev || (Ev = {}));
/**
 * 声明（运行时）（loading文件加载完成）就绪事件元信息接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/ILoadingMetas.ts
 */
/// <reference path="../../Core/_Runtime/IEpisode.ts" />
/**
 * 定义（运行时）（loading文件加载完成）就绪事件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/Loading.ts
 */
/// <reference path="../Event.ts" />
/// <reference path="ILoadingMetas.ts" />
var Ev;
(function (Ev) {
    var Loading = (function (_super) {
        __extends(Loading, _super);
        /**
         * 构造函数。
         */
        function Loading(metas) {
            _super.call(this, metas);
        }
        /**
         * 获取类型。
         */
        Loading.prototype.gT = function () {
            return 'loading';
        };
        return Loading;
    }(Ev.Event));
    Ev.Loading = Loading;
})(Ev || (Ev = {}));
/**
 * 声明（运行时）错误事件元信息接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/IErrorMetas.ts
 */
/// <reference path="../../../include/tsd.d.ts" />
/**
 * 定义（运行时）异常事件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/Error.ts
 */
/// <reference path="../Event.ts" />
/// <reference path="IErrorMetas.ts" />
var Ev;
(function (Ev) {
    var Error = (function (_super) {
        __extends(Error, _super);
        /**
         * 构造函数。
         */
        function Error(metas) {
            _super.call(this, metas);
            this.error = metas.error;
        }
        /**
         * 获取类型。
         */
        Error.prototype.gT = function () {
            return 'error';
        };
        return Error;
    }(Ev.Event));
    Ev.Error = Error;
})(Ev || (Ev = {}));
/**
 * 声明（运行时）完结事件元信息接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/IEndMetas.ts
 */
/// <reference path="../../../include/tsd.d.ts" />
/// <reference path="../../Core/_Runtime/IEpisode.ts" />
/**
 * 定义（运行时）完结事件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/End.ts
 */
/// <reference path="../Event.ts" />
/// <reference path="IEndMetas.ts" />
var Ev;
(function (Ev) {
    var End = (function (_super) {
        __extends(End, _super);
        /**
         * 构造函数。
         */
        function End(metas) {
            _super.call(this, metas);
        }
        /**
         * 获取类型。
         */
        End.prototype.gT = function () {
            return 'end';
        };
        return End;
    }(Ev.Event));
    Ev.End = End;
})(Ev || (Ev = {}));
/**
 * 定义资源组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Resource/Resource.ts
 */
/// <reference path="../../include/tsd.d.ts" />
/// <reference path="../Core/_Resource/IResource.ts" />
var Resource;
(function (Resource_1) {
    var Util = __Bigine_Util;
    /**
     * 资源池。
     */
    var $r = {};
    var Resource = (function () {
        /**
         * 构造函数。
         */
        function Resource(uri, type) {
            var env = Util.ENV, types = Core.IResource.Type, ie9 = env.MSIE && 'undefined' == typeof URL, ext;
            var offline = Bigine.offline;
            if (types.Raw == type) {
                var path = 'res/theme' + uri.substr(uri.indexOf('\/'));
                //var path: string = '/Users/atfacg-dev/temp/res/theme' + uri.substr(uri.indexOf('\/'));
                this._l = offline ? path : ('http://s.dahao.de/theme/' + uri);
                ext = this._l.substr(-4);
                if (ie9 && ('.jpg' == ext || '.png' == ext))
                    this._l = (offline ? 'app://res/.9/' : 'http://dahao.de/.9/') + uri;
            }
            else {
                if (!/^[\d0-f]{8}-[\d0-f]{4}-[\d0-f]{4}-[\d0-f]{4}-[\d0-f]{12}$/i.test(uri))
                    throw new E(E.RES_INVALID_URI);
                var height = 720 <= env.Screen.Height ? 720 : 360, filename = height + '.';
                switch (type) {
                    case types.Room:
                    case types.CG:
                        filename += 'jpg';
                        break;
                    case types.Map:
                    case types.Pose:
                        filename += 'png';
                        break;
                    case types.Avatar:
                        filename = Math.round(height / 4) + '.png';
                        break;
                    case types.BGM:
                    case types.SE:
                        filename = (env.Mobile ? 64 : 128) + '.mp3';
                        break;
                }
                var local = 'res/' + uri.substr(0, 2) + '/' + uri.substr(2, 2) + '/' + uri + '/' + filename;
                //var local: string = '/Users/atfacg-dev/temp/res/' + uri.substr(0, 2) + '/' + uri.substr(2, 2) + '/' + uri + '/' + filename;
                this._l = offline ?
                    local :
                    ('http://a' + (1 + parseInt(uri[0], 16) % 8) + '.dahao.de/' + uri + '/' + filename);
                if (ie9 && '.mp3' != this._l.substr(-4))
                    this._l = (offline ? 'app://res/.9/' : 'http://dahao.de/.9/') + uri;
            }
            this._w = [];
            this._r = false;
        }
        /**
         * 获取资源。
         */
        Resource.g = function (uri, type) {
            uri = uri.replace(/^.+:\/\//, '//');
            var key = uri + type;
            if (!(key in $r))
                $r[key] = new Resource(uri, type);
            return $r[key];
        };
        /**
         * 获取真实 URL 。
         */
        Resource.prototype.l = function () {
            return this._l;
        };
        /**
         * 获取 DOM 对象。
         */
        Resource.prototype.o = function () {
            var _this = this;
            if (!this._q) {
                this._q = new Promise(function (resolve, reject) {
                    var url = _this._l, xhr, img;
                    if ('.mp3' == _this._l.substr(-4)) {
                        _this._l = url;
                        return resolve(url);
                    }
                    if (!Bigine.offline)
                        url = url + '?bigine-0.24.1' + Bigine.domain;
                    if (Util.ENV.MSIE && 'undefined' != typeof URL) {
                        xhr = new XMLHttpRequest();
                        xhr.open('GET', url);
                        xhr.onload = function () {
                            var blob = URL.createObjectURL(xhr.response);
                            img = new Image();
                            img.onload = function () {
                                URL.revokeObjectURL(blob);
                                resolve(img);
                            };
                            img.src = blob;
                        };
                        xhr.responseType = 'blob';
                        xhr.send();
                        return;
                    }
                    img = new Image();
                    img.crossOrigin = '';
                    img.onload = function () {
                        resolve(img);
                    };
                    img.src = url;
                });
                this._q.then(function () {
                    _this._r = true;
                });
                if (this._w.length) {
                    Util.each(this._w.splice(0), function (callback) {
                        _this._q.then(callback);
                    });
                }
            }
            return this._q;
        };
        /**
         * 加载完成时通知。
         */
        Resource.prototype.w = function (callback) {
            if (this._q) {
                this._q.then(callback);
            }
            else
                this._w.push(callback);
            return this;
        };
        return Resource;
    }());
    Resource_1.Resource = Resource;
})(Resource || (Resource = {}));
/**
 * 定义（运行时）作品组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Runtime/Episode.ts
 */
/// <reference path="../Ev/_Runtime/Ready.ts" />
/// <reference path="../Ev/_Runtime/Loading.ts" />
/// <reference path="../Ev/_Runtime/Error.ts" />
/// <reference path="../Ev/_Runtime/End.ts" />
/// <reference path="../Resource/Resource.ts" />
var Runtime;
(function (Runtime) {
    var Util = __Bigine_Util;
    var Episode = (function () {
        /**
         * 构造函数。
         */
        function Episode(ep, runtime) {
            var _this = this;
            this._a = {};
            this._e = {};
            this._p = ep.a();
            this._s = ep.gS();
            this._t = ep.gT();
            this._l = null;
            ep.r(this);
            var load = function () {
                Promise.all([
                    new Promise(function (resolve) {
                        var res = ep.l(function (entities) {
                            Util.each(entities, function (typed) {
                                Util.each(typed, function (entity) {
                                    entity.r(_this);
                                });
                            });
                            resolve();
                        });
                        if (!res)
                            resolve();
                    }).then(function () {
                        ep.b(_this);
                    }),
                    new Promise(function (resolve) {
                        ep.t(function (data) {
                            _this._c = data;
                            resolve();
                        });
                    })
                ]).then(function () {
                    runtime.dispatchEvent(new Ev.Ready({
                        target: _this
                    }));
                })['catch'](function (error) {
                    runtime.dispatchEvent(new Ev.Error({
                        target: _this,
                        error: error
                    }));
                });
            };
            if (Bigine.offline) {
                load();
                return;
            }
            var uri = 'http://s.dahao.de/theme/_/load.json?0.24.2-' + Bigine.domain;
            Util.Remote.get(uri, function (des) {
                _this._l = des;
                runtime.dispatchEvent(new Ev.Loading({
                    target: _this
                }));
                load();
            }, function (error, status) {
                throw error;
            });
        }
        /**
         * 添加事件。
         */
        Episode.prototype.a = function (scene) {
            var type = scene.gT();
            this._a[type] = this._a[type] || [];
            this._a[type].push(scene);
            return this;
        };
        /**
         * 播放。
         */
        Episode.prototype.p = function (type, runtime) {
            var _this = this;
            var q;
            if (type in this._a) {
                runtime.gS().s('_p', type);
                q = Util.Q.every(this._a[type], function (scene) {
                    if (runtime.gH())
                        return E.doHalt();
                    return scene.p(runtime);
                });
            }
            else
                q = Promise.resolve(runtime);
            return q.then(function () {
                if (Core.ISceneTag.Type.End == type)
                    runtime.dispatchEvent(new Ev.End({
                        target: _this
                    }));
                return runtime;
            });
        };
        /**
         * 注册实体。
         */
        Episode.prototype.f = function (tag) {
            var type = tag.gT(), id = tag.gI();
            this._e[type] = this._e[type] || {};
            if (id in this._e[type])
                throw new E(E.EP_DUPLICATE_ENTITY, this._e[type][id].gL());
            this._e[type][id] = tag;
            return this;
        };
        /**
         * 查询实体。
         */
        Episode.prototype.q = function (id, type, lineNo) {
            this._e[type] = this._e[type] || {};
            if (!(id in this._e[type])) {
                return this._e[type][' '];
            }
            return this._e[type][id];
        };
        /**
         * 注册资源。
         */
        Episode.prototype.r = function (uri, type) {
            return Resource.Resource.g(uri, type);
        };
        /**
         * 获取素材包名称。
         */
        Episode.prototype.gS = function () {
            return this._s;
        };
        /**
         * 获取主题名称。
         */
        Episode.prototype.gT = function () {
            return this._t;
        };
        /**
         * 是否自动播放。
         */
        Episode.prototype.gA = function () {
            return this._p;
        };
        /**
         * 获取主题信息。
         */
        Episode.prototype.gC = function () {
            if (!this._c)
                throw new E(E.EP_THEME_NOT_LOADED);
            return this._c;
        };
        /**
         * 获取Loading主题信息。
         */
        Episode.prototype.gL = function () {
            return this._l;
        };
        return Episode;
    }());
    Runtime.Episode = Episode;
})(Runtime || (Runtime = {}));
/**
 * 声明（运行时）查询存档数据事件元信息接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/IQueryMetas.ts
 */
/// <reference path="../../Core/_Runtime/IStates.ts" />
/**
 * 定义（运行时）查询存档数据事件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/Query.ts
 */
/// <reference path="../Event.ts" />
/// <reference path="IQueryMetas.ts" />
var Ev;
(function (Ev) {
    var Query = (function (_super) {
        __extends(Query, _super);
        /**
         * 构造函数。
         */
        function Query(metas) {
            _super.call(this, metas);
            this.callback = metas.callback;
        }
        /**
         * 获取类型。
         */
        Query.prototype.gT = function () {
            return 'query';
        };
        return Query;
    }(Ev.Event));
    Ev.Query = Query;
})(Ev || (Ev = {}));
/**
 * 声明（运行时）存档事件元信息接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/ISaveMetas.ts
 */
/// <reference path="../../Core/_Runtime/IStates.ts" />
/**
 * 定义（运行时）存档事件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/Save.ts
 */
/// <reference path="../Event.ts" />
/// <reference path="ISaveMetas.ts" />
var Ev;
(function (Ev) {
    var Save = (function (_super) {
        __extends(Save, _super);
        /**
         * 构造函数。
         */
        function Save(metas) {
            _super.call(this, metas);
            this.data = metas.data;
            this.series = metas.series || false;
            this.manual = metas.manual;
            this.callback = metas.callback;
        }
        /**
         * 获取类型。
         */
        Save.prototype.gT = function () {
            return 'save';
        };
        return Save;
    }(Ev.Event));
    Ev.Save = Save;
})(Ev || (Ev = {}));
/**
 * 声明（运行时）数据变化时向外暴露元信息接口规范。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/IStateMetas.ts
 */
/// <reference path="../../Core/_Runtime/IStates.ts" />
/**
 * 定义（运行时）存档事件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/State.ts
 */
/// <reference path="../Event.ts" />
/// <reference path="IStateMetas.ts" />
var Ev;
(function (Ev) {
    var State = (function (_super) {
        __extends(State, _super);
        /**
         * 构造函数。
         */
        function State(metas) {
            _super.call(this, metas);
            this.data = metas.data;
        }
        /**
         * 获取类型。
         */
        State.prototype.gT = function () {
            return 'state';
        };
        return State;
    }(Ev.Event));
    Ev.State = State;
})(Ev || (Ev = {}));
/**
 * 定义（运行时）数据状态管理器组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Runtime/States.ts
 */
/// <reference path="../Core/_Runtime/IStates.ts" />
/// <reference path="../Core/_Runtime/IRuntime.ts" />
/// <reference path="../Ev/_Runtime/Query.ts" />
/// <reference path="../Ev/_Runtime/Save.ts" />
/// <reference path="../Ev/_Runtime/State.ts" />
var Runtime;
(function (Runtime) {
    var Util = __Bigine_Util;
    var States = (function () {
        /**
         * 构造函数。
         */
        function States(runtime) {
            this._d = {};
            this._r = runtime;
            this._s = {
                'series': {},
                'work': {},
                'end': {}
            };
            this._sp = {};
            this._l = false;
            this._all = false;
        }
        /**
         * 设置值。
         */
        States.prototype.s = function (key, value) {
            this._r.gL().d('[state]', key, '=', value);
            this._d[key] = value;
            return this;
        };
        /**
         * 获取值。
         */
        States.prototype.g = function (key) {
            return this._d[key];
        };
        /**
         * 删除值。
         */
        States.prototype.d = function (key) {
            var _this = this;
            var length = key.length - 1, logger = this._r.gL();
            if ('*' == key[length]) {
                key = key.substr(0, length);
                Util.each(this._d, function (value, index) {
                    if (index.length == length || index.substr(0, length) != key)
                        return;
                    logger.d('[state]', index, '=');
                    delete _this._d[index];
                });
                return this;
            }
            logger.d('[state]', key, '=');
            delete this._d[key];
            return this;
        };
        /**
         * 比较两个值是否一致。
         */
        States.prototype.a = function (key1, key2) {
            return this._d[key1] == this._d[key2];
        };
        /**
         * 复制值。
         */
        States.prototype.c = function (src, dest) {
            this._r.gL().d('[state]', dest, '=', src);
            this._d[dest] = this._d[src];
            return this;
        };
        /**
         * 移动值。
         */
        States.prototype.m = function (src, dest) {
            return this.c(src, dest)
                .d(src);
        };
        /**
         * 转化文本中的变量名至实际值。
         */
        States.prototype.t = function (text) {
            var _this = this;
            var convert = function (match, p1) { return _this._d[p1]; };
            return text.replace(/〈([^〉]+)〉/g, convert).replace(/＜([^＞]+)＞/g, convert);
        };
        /**
         * 生成快照（以备存档）。
         */
        States.prototype.p = function () {
            var _this = this;
            this._p = {};
            Util.each(this._d, function (value, key) {
                if ('.' != key[0] && '$' != key[0] && undefined != value)
                    _this._p[key] = value;
            });
            //start:生成快照的时候，向外暴露
            this._r.dispatchEvent(new Ev.State({
                target: this,
                data: this._p
            }));
            //ended:生成快照的时候，向外暴露
            return this;
        };
        /**
         * 导出数据（存档）。
         *
         * 此方法应触发 Save 事件。
         */
        States.prototype.e = function (manual, series, callback) {
            var _this = this;
            if (!this._p)
                return {};
            var save = function (id) {
                _this._s[series ? 'end' : 'work'][manual] = [id, +new Date()];
                if (callback)
                    callback();
            }, data = this._p;
            if (series) {
                data = {
                    ' ': true
                };
                Util.each(this._p, function (value, key) {
                    if ('_' != key[0])
                        data[key] = value;
                });
            }
            this._r.dispatchEvent(new Ev.Save({
                target: this,
                series: series,
                manual: manual,
                data: data,
                callback: save
            }));
            return this._p;
        };
        /**
         * 导入数据。
         */
        States.prototype.i = function (data) {
            this._d = data;
            this._p = Util.clone(data);
            return this;
        };
        /**
         * 查询档位存档编号。
         */
        States.prototype.q = function (index, series) {
            var save = Core.IStates.Save, type = 'work';
            switch (series) {
                case save.Series:
                    type = 'series';
                    break;
                case save.End:
                    type = 'end';
                    break;
            }
            return this._s[type][index];
        };
        /**
         * 查询档位所有存档。
         */
        States.prototype.qa = function (series) {
            var save = Core.IStates.Save, type = 'work';
            switch (series) {
                case save.Series:
                    type = 'series';
                    break;
                case save.End:
                    type = 'end';
                    break;
            }
            return this._s[type];
        };
        /**
         * 加载存档信息。
         */
        States.prototype.l = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                if (_this._l)
                    return resolve(_this);
                _this._l = true;
                var query = function (slots) {
                    if (!slots) {
                        _this._l = false;
                        return reject();
                    }
                    _this._s = slots;
                    resolve(_this);
                };
                _this._r.dispatchEvent(new Ev.Query({
                    target: _this,
                    callback: query
                }));
            });
        };
        /**
         * 查询是否付费。
         */
        States.prototype.qp = function (id, count, donate) {
            if (donate === void 0) { donate = false; }
            if (this._all && !donate)
                return true;
            if ((id in this._sp) && donate ? this._sp[id] >= count : this._sp[id] == count.toString())
                return true;
            return false;
        };
        /**
         * 加载付费信息。
         */
        States.prototype.lp = function (data) {
            this._all = false;
            if (typeof data == 'string' && data == 'all') {
                this._all = true;
            }
            else if (typeof data == 'object') {
                this._sp = data;
            }
            return this;
        };
        /**
         * 增加付费信息。
         */
        States.prototype.ep = function (id, count) {
            if (!this._all)
                this._sp[id] = count.toString();
            return this;
        };
        return States;
    }());
    Runtime.States = States;
})(Runtime || (Runtime = {}));
/**
 * 定义（资源）预加载器组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Resource/Prefetcher.ts
 */
/// <reference path="Resource.ts" />
var Resource;
(function (Resource) {
    var Util = __Bigine_Util;
    /**
     * 唯一实例。
     */
    var instance;
    var Prefecher = (function () {
        /**
         * 构造函数。
         */
        function Prefecher() {
            this._p = Promise.resolve();
        }
        /**
         * 预加载资源。
         */
        Prefecher.c = function (resources, logger) {
            if (!resources.length)
                return Promise.resolve();
            if (!instance)
                instance = new Prefecher;
            var ret;
            Util.each(resources, function (group) {
                var p = instance.q(group, logger);
                if (!ret)
                    ret = p;
            });
            return ret;
        };
        /**
         * 排队。
         */
        Prefecher.prototype.q = function (resources, logger) {
            var _this = this;
            return new Promise(function (resolve) {
                _this._p = _this._p.then(function () {
                    if (logger)
                        logger.d('[cache]', resources);
                    var tasks = [];
                    Util.each(resources, function (resource) {
                        tasks.push(resource.o());
                    });
                    return Promise.all(tasks).then(function () {
                        resolve();
                    });
                });
            });
        };
        return Prefecher;
    }());
    Resource.Prefecher = Prefecher;
})(Resource || (Resource = {}));
/**
 * 声明（运行时）开场事件元信息接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/IBeginMetas.ts
 */
/// <reference path="../../../include/tsd.d.ts" />
/// <reference path="../../Core/_Runtime/IEpisode.ts" />
/**
 * 定义（运行时）开场事件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/Begin.ts
 */
/// <reference path="../Event.ts" />
/// <reference path="IBeginMetas.ts" />
var Ev;
(function (Ev) {
    var Begin = (function (_super) {
        __extends(Begin, _super);
        /**
         * 构造函数。
         */
        function Begin(metas) {
            _super.call(this, metas);
        }
        /**
         * 获取类型。
         */
        Begin.prototype.gT = function () {
            return 'begin';
        };
        return Begin;
    }(Ev.Event));
    Ev.Begin = Begin;
})(Ev || (Ev = {}));
/**
 * 定义抽象（运行时）场效调度器组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Runtime/_Director/Director.ts
 */
/// <reference path="../../Core/_Runtime/IDirector.ts" />
/// <reference path="../../Resource/Prefetcher.ts" />
/// <reference path="../../Ev/_Runtime/Begin.ts" />
var Runtime;
(function (Runtime) {
    var Director = (function () {
        /**
         * 构造函数。
         */
        function Director(runtime) {
            this._r = runtime;
            this._p = Promise.resolve(this._r);
            this._d =
                this._a =
                    this._ra =
                        this._o = false;
            this._v = 1;
        }
        /**
         * 预加载指定资源组。
         *
         * @param resources 一个（作品）事件所包含地所有资源
         */
        Director.prototype.c = function (resources) {
            return Resource.Prefecher.c(resources, this._r.gL());
        };
        /**
         * 加载动画。
         */
        Director.prototype.Load = function (loaded, theme) {
            return this._p;
        };
        /**
         * 开始动画。
         */
        Director.prototype.OP = function (start, title, author) {
            if (!start)
                this._r.dispatchEvent(new Ev.Begin({
                    target: this._r.gE()
                }));
            return this._p;
        };
        /**
         * 完结动画。
         */
        Director.prototype.ED = function () {
            return this._p;
        };
        /**
         * 失败动画。
         */
        Director.prototype.FAIL = function () {
            return this._p;
        };
        /**
         * 人物出场。
         */
        Director.prototype.charOn = function (resource, position) {
            return this.charSet(resource, position);
        };
        /**
         * 人物离场。
         */
        Director.prototype.charOff = function (position) {
            return this._p;
        };
        /**
         * 设置人物。
         */
        Director.prototype.charSet = function (resource, position) {
            return this._p;
        };
        /**
         * 人物移动。
         */
        Director.prototype.charMove = function (from, to) {
            return this._p;
        };
        /**
         * 某白。
         */
        Director.prototype.words = function (words, theme, who, avatar) {
            return this._p;
        };
        /**
         * 提示。
         */
        Director.prototype.tip = function (words) {
            return this._p;
        };
        ;
        /**
         * 评分动画。
         */
        Director.prototype.stars = function (rank, grade, value) {
            return this._p;
        };
        /**
         * 播放 背景音乐 / 环境音乐。
         */
        Director.prototype.playMusic = function (type, resource, vol) {
            return this._p;
        };
        /**
         * 播放音效。
         */
        Director.prototype.playSE = function (resource, vol) {
            return this._p;
        };
        /**
         * 设置音量。
         */
        Director.prototype.volumeSet = function (type, vol) {
            return this._p;
        };
        /**
         * 关闭特写。
         */
        Director.prototype.hideCG = function () {
            return this._p;
        };
        /**
         * 展示特写。
         */
        Director.prototype.showCG = function (resource) {
            return this._p;
        };
        /**
         * 设置房间。
         */
        Director.prototype.asRoom = function (resource, time, map) {
            return this._p;
        };
        /**
         * 设置地图。
         */
        Director.prototype.asMap = function (points) {
            return this._p;
        };
        /**
         * 关灯（落幕）。
         */
        Director.prototype.lightOff = function () {
            return this._p;
        };
        /**
         * 开灯（开幕）。
         */
        Director.prototype.lightOn = function () {
            return this._p;
        };
        /**
         * 选择。
         */
        Director.prototype.choose = function (options) {
            return this._p;
        };
        /**
         * 重置人物及状态。
         */
        Director.prototype.reset = function () {
            this._r.gS().s('$c', 0)
                .d('.p*');
            return this._p;
        };
        /**
         * （读档继续时）设置特写。
         */
        Director.prototype.setCG = function (resource) {
            return this._p;
        };
        /**
         * 停顿。
         */
        Director.prototype.pause = function (milsec) {
            return this._p;
        };
        /**
         * 切幕动画。
         */
        Director.prototype.curtain = function (name) {
            return this._p;
        };
        /**
         * 移动镜头。
         */
        Director.prototype.cameraMove = function (mx, my, ms) {
            return this._p;
        };
        /**
         * 放大/缩小镜头。
         */
        Director.prototype.cameraZoom = function (mx, my, ms, scale) {
            return this._p;
        };
        /**
         * 抖动镜头。
         */
        Director.prototype.cameraShake = function () {
            return this._p;
        };
        /**
         * 状态栏开/关。
         */
        Director.prototype.status = function (onoff) {
            return this._p;
        };
        /**
         * 神态动画。
         */
        Director.prototype.expression = function (name) {
            return this._p;
        };
        /**
         * 全屏文本 开 / 关。
         */
        Director.prototype.fullWords = function (on) {
            return this._p;
        };
        /**
         * 清除全屏文本。
         */
        Director.prototype.fullClean = function () {
            return this._p;
        };
        /**
         * 隐藏全屏文本。
         */
        Director.prototype.fullHide = function () {
            return this._p;
        };
        /**
         * 获取动态创建标识。
         */
        Director.prototype.gD = function () {
            return this._d;
        };
        /**
         * 使用主题。
         */
        Director.prototype.t = function (id, theme) {
            return this;
        };
        /**
         * 配置状态。
         */
        Director.prototype.s = function (sheet) {
            return this;
        };
        /**
         * 配置面板。
         */
        Director.prototype.p = function (sheet) {
            return this;
        };
        /**
         * 设置自动播放。
         */
        Director.prototype.a = function (auto) {
            return this._a = auto;
        };
        /**
         * 设置音量。
         */
        Director.prototype.v = function (volume) {
            this._v = volume;
            return this;
        };
        /**
         * 修正 DOM 定位。
         */
        Director.prototype.f = function () {
            //
        };
        /**
         * 自我销毁。
         */
        Director.prototype.d = function () {
            //
        };
        /**
         * 取消阻塞。
         */
        Director.prototype.h = function () {
            //
        };
        /**
         * 绑定视图。
         */
        Director.prototype.b = function (viewport) {
            return this;
        };
        /**
         * 连载模式。
         */
        Director.prototype.e = function (type) {
            return this;
        };
        /**
         * 暂停播放。
         */
        Director.prototype.rp = function () {
            this._ra = this._a;
            this._a = false;
            return this;
        };
        /**
         * 恢复播放。
         */
        Director.prototype.rr = function () {
            this._a = this._ra;
            return this;
        };
        Director.prototype.sl = function (id, aotuload) {
            //
        };
        return Director;
    }());
    Runtime.Director = Director;
})(Runtime || (Runtime = {}));
/**
 * 定义 NodeJS 用（运行时）场效调度器组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Runtime/_Director/NodeDirector.ts
 */
/// <reference path="Director.ts" />
var Runtime;
(function (Runtime) {
    var NodeDirector = (function (_super) {
        __extends(NodeDirector, _super);
        function NodeDirector() {
            _super.apply(this, arguments);
        }
        return NodeDirector;
    }(Runtime.Director));
    Runtime.NodeDirector = NodeDirector;
})(Runtime || (Runtime = {}));
/**
 * 声明画面调度组件接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_Sprite/ISprite.ts
 */
/// <reference path="../../../include/tsd.d.ts" />
/// <reference path="../_Resource/IResource.ts" />
/**
 * 定义画面调度抽象组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Sprite/Sprite.ts
 */
/// <reference path="../Core/_Sprite/ISprite.ts" />
/// <reference path="../Resource/Resource.ts" />
var Sprite;
(function (Sprite_1) {
    var G = __Bigine_C2D;
    var Sprite = (function (_super) {
        __extends(Sprite, _super);
        function Sprite() {
            _super.apply(this, arguments);
        }
        /**
         * 显示。
         */
        Sprite.prototype.v = function (duration) {
            if (0 === duration)
                this.o(1);
            if (this._o)
                return Promise.resolve(this);
            return this.p(new G.FadeIn(duration || 250));
        };
        /**
         * 隐藏。
         */
        Sprite.prototype.h = function (duration) {
            if (0 === duration)
                this.o(0);
            if (!this._o)
                return Promise.resolve(this);
            return this.p(new G.FadeOut(duration || 250));
        };
        /**
         * 获取远端资源列表。
         */
        Sprite.prototype.l = function () {
            return this._rr || [];
        };
        /**
         * 识别文本对齐方式。
         */
        Sprite.prototype.$a = function (desc) {
            var aligns = G.Text.Align;
            switch (desc) {
                case 'center':
                case 'middle':
                    return aligns.Center;
                case 'right':
                    return aligns.Right;
            }
            return aligns.Left;
        };
        /**
         * 处理文本高亮规则。
         */
        Sprite.prototype.$w = function (element, words, hiColor) {
            var buffer = '', color = '', hilite = false, ii;
            element.c();
            for (ii = 0; ii < words.length; ii++) {
                if ('【' == words[ii] && !hilite) {
                    element.a(new G.TextPhrase(buffer));
                    buffer = '';
                    color = words.substr(ii + 1, 7);
                    if (/^#[0-9a-fA-F]{6}$/.test(color)) {
                        ii += 7;
                    }
                    else {
                        color = hiColor;
                    }
                    hilite = true;
                }
                else if ('】' == words[ii] && hilite) {
                    element.a(new G.TextPhrase(buffer, color));
                    buffer = color = '';
                    hilite = false;
                }
                else
                    buffer += words[ii];
            }
            if (buffer)
                element.a(new G.TextPhrase(buffer, hilite ? color : ''));
            return this;
        };
        return Sprite;
    }(G.Sprite));
    Sprite_1.Sprite = Sprite;
})(Sprite || (Sprite = {}));
/**
 * 定义画面调度幕帘组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Sprite/Curtain.ts
 */
/// <reference path="Sprite.ts" />
var Sprite;
(function (Sprite) {
    var G = __Bigine_C2D;
    var Curtain = (function (_super) {
        __extends(Curtain, _super);
        /**
         * 构造函数。
         */
        function Curtain(color) {
            if (color === void 0) { color = '#000'; }
            var w = 1280, h = 720;
            _super.call(this, 0, 0, w, h);
            this.a(new G.Color(0, 0, w, h, color));
        }
        return Curtain;
    }(Sprite.Sprite));
    Sprite.Curtain = Curtain;
})(Sprite || (Sprite = {}));
/**
 * 定义画面调度作者信息组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Sprite/Author.ts
 */
/// <reference path="Sprite.ts" />
var Sprite;
(function (Sprite) {
    var G = __Bigine_C2D;
    var Author = (function (_super) {
        __extends(Author, _super);
        /**
         * 构造函数。
         */
        function Author(theme) {
            var w = 1280, h = 720, _director = theme['director'], _title = theme['title'];
            _super.call(this, 0, 0, w, h);
            this.o(0)
                .a(new G.Color(0, 0, w, h, '#000'))
                .a(new G.Text(_director, _director['s'], _director['h'], this.$a(_director['a']))
                .tc(_director['c'])
                .a(new G.TextPhrase('作品'))).a(new G.Text(_title, _title['s'], _title['h'], this.$a(_title['a']))
                .tc(_title['c'])
                .a(this._x = new G.TextPhrase()));
        }
        /**
         * 设置名称。
         */
        Author.prototype.u = function (title) {
            if (!/^[\d0-f]{8}-[\d0-f]{4}-[\d0-f]{4}-[\d0-f]{4}-[\d0-f]{12}$/i.test(title)) {
                this._x.t(title);
            }
            else {
                var res = Resource.Resource.g(title, Core.IResource.Type.Room);
                this.a(new G.Image(res.o(), { x: 0, y: 0, w: 1280, h: 720 }));
            }
            return this;
        };
        return Author;
    }(Sprite.Sprite));
    Sprite.Author = Author;
})(Sprite || (Sprite = {}));
/**
 * 声明画面调度开始菜单组件接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_Sprite/IStart.ts
 */
/// <reference path="ISprite.ts" />
/**
 * 声明（画面调度）开始菜单新游戏事件元信息接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/IStartNewMetas.ts
 */
/// <reference path="../../../include/tsd.d.ts" />
/// <reference path="../../Core/_Sprite/IStart.ts" />
/**
 * 定义（画面调度）开始菜单新游戏事件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/StartNew.ts
 */
/// <reference path="../Event.ts" />
/// <reference path="IStartNewMetas.ts" />
var Ev;
(function (Ev) {
    var StartNew = (function (_super) {
        __extends(StartNew, _super);
        /**
         * 构造函数。
         */
        function StartNew(metas) {
            _super.call(this, metas);
        }
        /**
         * 获取类型。
         */
        StartNew.prototype.gT = function () {
            return 'start.new';
        };
        return StartNew;
    }(Ev.Event));
    Ev.StartNew = StartNew;
})(Ev || (Ev = {}));
/**
 * 声明（画面调度）开始菜单连载游戏事件元信息接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/IStartSeriesMetas.ts
 */
/// <reference path="../../../include/tsd.d.ts" />
/// <reference path="../../Core/_Sprite/IStart.ts" />
/**
 * 定义（画面调度）开始菜单继续游戏事件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/StartSeries.ts
 */
/// <reference path="../Event.ts" />
/// <reference path="IStartSeriesMetas.ts" />
var Ev;
(function (Ev) {
    var StartSeries = (function (_super) {
        __extends(StartSeries, _super);
        /**
         * 构造函数。
         */
        function StartSeries(metas) {
            _super.call(this, metas);
        }
        /**
         * 获取类型。
         */
        StartSeries.prototype.gT = function () {
            return 'start.series';
        };
        return StartSeries;
    }(Ev.Event));
    Ev.StartSeries = StartSeries;
})(Ev || (Ev = {}));
/**
 * 声明（画面调度）开始菜单继续游戏事件元信息接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/IStartLoadMetas.ts
 */
/// <reference path="../../../include/tsd.d.ts" />
/// <reference path="../../Core/_Sprite/IStart.ts" />
/**
 * 定义（画面调度）开始菜单继续游戏事件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/StartLoad.ts
 */
/// <reference path="../Event.ts" />
/// <reference path="IStartLoadMetas.ts" />
var Ev;
(function (Ev) {
    var StartLoad = (function (_super) {
        __extends(StartLoad, _super);
        /**
         * 构造函数。
         */
        function StartLoad(metas) {
            _super.call(this, metas);
        }
        /**
         * 获取类型。
         */
        StartLoad.prototype.gT = function () {
            return 'start.load';
        };
        return StartLoad;
    }(Ev.Event));
    Ev.StartLoad = StartLoad;
})(Ev || (Ev = {}));
/**
 * 定义画面调度开始菜单组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Sprite/Start.ts
 */
/// <reference path="Sprite.ts" />
/// <reference path="../Resource/Resource.ts" />
/// <reference path="../Ev/_Sprite/StartNew.ts" />
/// <reference path="../Ev/_Sprite/StartSeries.ts" />
/// <reference path="../Ev/_Sprite/StartLoad.ts" />
var Sprite;
(function (Sprite) {
    var G = __Bigine_C2D;
    var Start = (function (_super) {
        __extends(Start, _super);
        /**
         * 构造函数。
         */
        function Start(id, theme) {
            var _this = this;
            var w = 1280, h = 720, raw = Core.IResource.Type.Raw, rr = Resource.Resource, _new = theme['new'], _series = theme['series'], _load = theme['load'], _title = theme['title'];
            _super.call(this, 0, 0, w, h);
            this._rr = [
                rr.g(theme['i'], raw),
                rr.g(_new['i'], raw),
                rr.g(_new['ih'], raw),
                rr.g(_series['i'], raw),
                rr.g(_series['ih'], raw),
                rr.g(_load['i'], raw),
                rr.g(_load['ih'], raw)
            ];
            this._y = {};
            this._bn =
                this._ke = undefined;
            this.o(0)
                .a(new G.Image(this._rr[0].o(), 0, 0, w, h))
                .a(this._y['n'] = new G.Button(_new)
                .b(function () {
                _this.dispatchEvent(new Ev.StartNew({ target: _this }));
            }, new G.Image(this._rr[2].o(), _new, true), new G.Image(this._rr[1].o(), _new, true))).a(this._y['s'] = new G.Button(_series)
                .b(function () {
                _this.dispatchEvent(new Ev.StartSeries({ target: _this }));
            }, new G.Image(this._rr[4].o(), _series, true), new G.Image(this._rr[3].o(), _series, true))
                .o(0)).a(this._y['l'] = new G.Button(_load)
                .b(function () {
                _this.dispatchEvent(new Ev.StartLoad({ target: _this }));
            }, new G.Image(this._rr[6].o(), _load, true), new G.Image(this._rr[5].o(), _load, true))).a(new G.Text(_title, _title['s'], _title['lh'], this.$a(_title['a']))
                .tc(_title['c'])
                .a(this._x = new G.TextPhrase()));
        }
        /**
         * 设置名称。
         */
        Start.prototype.u = function (title, series, stage) {
            if (title)
                this._x.t(title);
            if (series) {
                this._y['n'].o(0);
                this._y['s'].o(1);
            }
            this.ev(series, stage);
            return this;
        };
        /**
         * 添加按键事件。
         */
        Start.prototype.ev = function (series, stage) {
            var _this = this;
            this._ke = function (event) {
                var old = _this._bn;
                switch (event.keyCode) {
                    case 37:
                        _this._bn = series ? _this._y['s'] : _this._y['n'];
                        break;
                    case 39:
                        _this._bn = _this._y['l'];
                        break;
                    case 13:
                        if (_this._bn == _this._y['n']) {
                            _this.dispatchEvent(new Ev.StartNew({ target: _this }));
                        }
                        else if (_this._bn == _this._y['s']) {
                            _this.dispatchEvent(new Ev.StartSeries({ target: _this }));
                        }
                        else if (_this._bn == _this._y['l']) {
                            _this.dispatchEvent(new Ev.StartLoad({ target: _this }));
                        }
                        return;
                }
                if (_this._bn) {
                    var bound = _this._bn.gB();
                    stage.$s(bound.x, bound.y);
                    if (old != undefined && old != _this._bn) {
                        old.dispatchEvent(new G.SpriteBlurEvent({
                            target: old,
                            x: bound.x,
                            y: bound.y,
                            from: undefined,
                            fromX: 0,
                            fromY: 0,
                            stage: stage
                        }));
                    }
                    if (old != _this._bn) {
                        _this._bn.dispatchEvent(new G.SpriteFocusEvent({
                            target: _this._bn,
                            x: bound.x,
                            y: bound.y,
                            from: undefined,
                            fromX: 0,
                            fromY: 0,
                            stage: stage
                        }));
                    }
                }
            };
            window.addEventListener('keydown', this._ke);
        };
        /**
         * 隐藏。
         */
        Start.prototype.h = function (duration) {
            if (this._ke) {
                window.removeEventListener('keydown', this._ke);
                this._ke = undefined;
            }
            this._bn = undefined;
            return _super.prototype.h.call(this, duration);
        };
        return Start;
    }(Sprite.Sprite));
    Sprite.Start = Start;
})(Sprite || (Sprite = {}));
/**
 * 声明画面调度某白接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Sprite/IWords.ts
 */
/// <reference path="ISprite.ts" />
/// <reference path="../_Resource/IResource.ts" />
/**
 * 声明（画面调度）某白动画事件元信息接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/IWordsAnimationMetas.ts
 */
/// <reference path="../../../include/tsd.d.ts" />
/// <reference path="../../Core/_Sprite/IWords.ts" />
/**
 * 定义（画面调度）某白动画事件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/WordsAnimation.ts
 */
/// <reference path="../Event.ts" />
/// <reference path="IWordsAnimationMetas.ts" />
var Ev;
(function (Ev) {
    var WordsAnimation = (function (_super) {
        __extends(WordsAnimation, _super);
        /**
         * 构造函数。
         */
        function WordsAnimation(metas) {
            _super.call(this, metas);
            this.animation = metas.animation;
        }
        /**
         * 获取类型。
         */
        WordsAnimation.prototype.gT = function () {
            return 'words.animation';
        };
        return WordsAnimation;
    }(Ev.Event));
    Ev.WordsAnimation = WordsAnimation;
})(Ev || (Ev = {}));
/**
 * 定义画面调度某白组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Sprite/Words.ts
 */
/// <reference path="Sprite.ts" />
/// <reference path="../Resource/Resource.ts" />
/// <reference path="../Ev/_Sprite/WordsAnimation.ts" />
var Sprite;
(function (Sprite) {
    var Util = __Bigine_Util;
    var G = __Bigine_C2D;
    var Words = (function (_super) {
        __extends(Words, _super);
        /**
         * 构造函数。
         */
        function Words(id, voiceover, monolog, speak) {
            var w = 1280, h = 720, raw = Core.IResource.Type.Raw, rr = Resource.Resource, _vback = voiceover['back'], _vtext = voiceover['text'], _vcurs = voiceover['cursor'], _mback = monolog['back'], _mavat = monolog['avatar'], _mname = monolog['name'], _mtext = monolog['text'], _mcurs = monolog['cursor'], _sback = speak['back'], _savat = speak['avatar'], _sname = speak['name'], _stext = speak['text'], _scurs = speak['cursor'], left = G.Text.Align.Left;
            _super.call(this, 0, 0, w, h);
            this._rr = [
                rr.g(_vback['i'], raw),
                rr.g(_mback['i'], raw),
                rr.g(_sback['i'], raw),
            ];
            this._x = {};
            this._c = {
                v: _vtext['ch'],
                m: _mtext['ch'],
                s: _stext['ch']
            };
            this._bs = {
                m: _mavat,
                s: _savat
            };
            this._si = undefined;
            this._tp = {
                v: { x: _vtext['x'], y: _vtext['y'] },
                m: { x: _mtext['x'], y: _mtext['y'] },
                s: { x: _stext['x'], y: _stext['y'] },
                c: { x: 0, y: 0 }
            };
            this._cb = {
                v: Util.clone(_vtext),
                m: Util.clone(_mtext),
                s: Util.clone(_stext)
            };
            this.o(0)
                .a(this._x['v'] = new G.Sprite(_vback)
                .a(new G.Image(this._rr[0].o(), _vback, true))
                .a(this._x['vt'] = new G.Sprite(_vback))
                .o(0)).a(this._x['m'] = new G.Sprite(_mback)
                .a(new G.Image(this._rr[1].o(), _mback, true))
                .a(this._x['ma'] = new G.Sprite(_mavat, true))
                .a(new G.Text(_mname, _mname['s'], _mname['lh'], left, true)
                .tc(_mname['c'])
                .ts(_mname['ss'], _mname['ss'], _mname['ss'])
                .a(this._x['mn'] = new G.TextPhrase())).a(this._x['mt'] = new G.Sprite(_mback))
                .o(0)).a(this._x['s'] = new G.Sprite(_sback)
                .a(new G.Image(this._rr[2].o(), _sback, true))
                .a(this._x['sa'] = new G.Sprite(_savat, true))
                .a(new G.Text(_sname, _sname['s'], _sname['lh'], left, true)
                .tc(_sname['c'])
                .ts(_sname['ss'], _sname['ss'], _sname['ss'])
                .a(this._x['sn'] = new G.TextPhrase())).a(this._x['st'] = new G.Sprite(_sback)).o(0));
            if (_vcurs) {
                var vo = rr.g(_vcurs['i'], raw);
                this._rr.push(vo);
                this._x['v'].a(this._x['vc'] = new G.Image(vo.o(), _vcurs, true));
            }
            if (_mcurs) {
                var mo = rr.g(_mcurs['i'], raw);
                this._rr.push(mo);
                this._x['m'].a(this._x['mc'] = new G.Image(mo.o(), _mcurs, true));
            }
            if (_scurs) {
                var so = rr.g(_scurs['i'], raw);
                this._rr.push(so);
                this._x['s'].a(this._x['sc'] = new G.Image(so.o(), _scurs, true));
            }
        }
        /**
         * 隐藏。
         */
        Words.prototype.h = function (duration) {
            var _this = this;
            if (this._h) {
                this._h.h();
                this._h = undefined;
                this.dispatchEvent(new Ev.WordsAnimation({
                    target: this,
                    animation: undefined
                }));
            }
            return _super.prototype.h.call(this, duration).then(function () {
                _this._x['v'].o(0);
                _this._x['m'].o(0);
                _this._x['s'].o(0);
                if (_this._si) {
                    clearInterval(_this._si);
                    _this._si = undefined;
                }
                return _this;
            });
        };
        /**
         * 旁白。
         */
        Words.prototype.vv = function (clob, auto) {
            var _this = this;
            if (auto === void 0) { auto = false; }
            this._x['v'].o(1);
            return this.split(clob, 'v', auto).then(function () {
                _this._x['v'].o(0);
                if (_this._si) {
                    clearInterval(_this._si);
                    _this._si = undefined;
                }
                return _this;
            });
        };
        /**
         * 独白。
         */
        Words.prototype.vm = function (avatar, name, clob, auto) {
            var _this = this;
            if (auto === void 0) { auto = false; }
            this._x['ma']
                .c()
                .a(new G.Image(avatar.o(), this._bs['m'], true));
            this._x['mn'].t(name);
            this._x['m'].o(1);
            return this.split(clob, 'm', auto).then(function () {
                _this._x['m'].o(0);
                if (_this._si) {
                    clearInterval(_this._si);
                    _this._si = undefined;
                }
                return _this;
            });
        };
        /**
         * 对白。
         */
        Words.prototype.vs = function (avatar, name, clob, auto) {
            var _this = this;
            if (auto === void 0) { auto = false; }
            this._x['sa']
                .c()
                .a(new G.Image(avatar.o(), this._bs['s'], true));
            this._x['sn'].t(name);
            this._x['s'].o(1);
            return this.split(clob, 's', auto).then(function () {
                _this._x['s'].o(0);
                if (_this._si) {
                    clearInterval(_this._si);
                    _this._si = undefined;
                }
                return _this;
            });
        };
        /**
         * 文本分解。
         */
        Words.prototype.split = function (clob, theme, auto) {
            var _this = this;
            var words = clob.split('\\r'), _txt = theme + 't', funcs = [];
            this._x[_txt].c();
            this._cb[theme].y = this._tp[theme].y;
            Util.each(words, function (word, index) {
                var bufs = word.split('\\l');
                if (bufs.length == 1) {
                    funcs.push(function () { return _this.every(word, theme, auto, index == words.length - 1); });
                }
                else {
                    Util.each(bufs, function (buffer, i) {
                        funcs.push(function () { return _this.every(buffer, theme, auto, false, i); });
                    });
                }
            });
            return funcs.reduce(function (previous, current) {
                return previous.then(current);
            }, Promise.resolve());
        };
        /**
         * 对于分解的话逐行进行处理。
         */
        Words.prototype.every = function (clob, theme, auto, wait, pause) {
            var _this = this;
            if (pause === void 0) { pause = -1; }
            var _img = theme + 'c', _txt = theme + 't', eRow = 0, tBound = Util.clone(this._cb[theme]), tText, image = this._x[_img], left = G.Text.Align.Left, lHeight = Math.max(tBound['lh'], tBound['s']);
            if (image)
                image.o(0);
            while (/^\\n.*/.test(clob)) {
                eRow++;
                clob = clob.substr(2);
            }
            if (eRow > 0) {
                tBound.y += eRow * lHeight;
                this._tp['c'].x = 0;
            }
            else {
                if (pause > 0)
                    tBound.y -= lHeight;
            }
            if (clob == '')
                return Promise.resolve(this);
            tText = new G.Text(tBound, tBound['s'], tBound['lh'], left, true)
                .tc(tBound['c'])
                .tl(tBound['ls'])
                .to(pause > 0 ? this._tp['c'].x : 0)
                .ts(tBound['ss'], tBound['ss'], tBound['ss']);
            this._x[_txt].a(tText);
            this.$w(tText.o(0), clob, this._c[theme]);
            this._x[theme].o(1);
            return this.$v(tText, auto, image, pause >= 0 ? true : wait).then(function () {
                if (_this._h) {
                    var pnt = tText.gCp();
                    _this._cb[theme].y = pnt.y;
                    _this._tp['c'].x = pnt.x - _this._tp[theme].x;
                }
                return _this;
            });
        };
        /**
         * 显示内容文字。
         */
        Words.prototype.$v = function (text, auto, image, wait) {
            var _this = this;
            this.o(1);
            return new Promise(function (resolve) {
                var aType = new G.Type(1), aWFC;
                if (auto)
                    return text.p(aType).then(function () {
                        resolve();
                    });
                aWFC = new G.WaitForClick(function () {
                    aType.h();
                });
                _this._h = aWFC;
                _this.dispatchEvent(new Ev.WordsAnimation({
                    target: _this,
                    animation: aWFC
                }));
                Promise.race([
                    text.p(aType).then(function () {
                        aWFC.h();
                    }),
                    _this.p(aWFC)
                ]).then(function () {
                    _this._h = undefined;
                    _this.dispatchEvent(new Ev.WordsAnimation({
                        target: _this,
                        animation: undefined
                    }));
                    resolve();
                });
            }).then(function () {
                var animation, target;
                if (wait) {
                    if (auto) {
                        animation = new G.TypeDelay(9);
                        target = text;
                    }
                    else {
                        animation = new G.WaitForClick();
                        target = _this;
                        if (image) {
                            image.o(1);
                            _this._si = setInterval(function () {
                                var next = image.gO() == 1 ? 0 : 1;
                                image.o(next);
                            }, 500);
                        }
                    }
                }
                else {
                    animation = new G.TypeDelay(0.1);
                    target = text;
                }
                _this._h = animation;
                _this.dispatchEvent(new Ev.WordsAnimation({
                    target: _this,
                    animation: animation
                }));
                return target.p(animation);
            });
        };
        return Words;
    }(Sprite.Sprite));
    Sprite.Words = Words;
})(Sprite || (Sprite = {}));
/**
 * 声明画面调度常驻按钮组件接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_Sprite/ITray.ts
 */
/// <reference path="ISprite.ts" />
/**
 * 声明（画面调度）常驻按钮菜单事件元信息接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/ITrayMenuMetas.ts
 */
/// <reference path="../../../include/tsd.d.ts" />
/// <reference path="../../Core/_Sprite/ITray.ts" />
/**
 * 定义（画面调度）常驻按钮菜单事件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/TrayMenu.ts
 */
/// <reference path="../Event.ts" />
/// <reference path="ITrayMenuMetas.ts" />
var Ev;
(function (Ev) {
    var TrayMenu = (function (_super) {
        __extends(TrayMenu, _super);
        /**
         * 构造函数。
         */
        function TrayMenu(metas) {
            _super.call(this, metas);
        }
        /**
         * 获取类型。
         */
        TrayMenu.prototype.gT = function () {
            return 'tray.menu';
        };
        return TrayMenu;
    }(Ev.Event));
    Ev.TrayMenu = TrayMenu;
})(Ev || (Ev = {}));
/**
 * 声明（画面调度）常驻按钮面板事件元信息接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/ITrayPanelMetas.ts
 */
/// <reference path="../../../include/tsd.d.ts" />
/// <reference path="../../Core/_Sprite/ITray.ts" />
/**
 * 定义（画面调度）常驻按钮面板事件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/TrayPanel.ts
 */
/// <reference path="../Event.ts" />
/// <reference path="ITrayPanelMetas.ts" />
var Ev;
(function (Ev) {
    var TrayPanel = (function (_super) {
        __extends(TrayPanel, _super);
        /**
         * 构造函数。
         */
        function TrayPanel(metas) {
            _super.call(this, metas);
        }
        /**
         * 获取类型。
         */
        TrayPanel.prototype.gT = function () {
            return 'tray.panel';
        };
        return TrayPanel;
    }(Ev.Event));
    Ev.TrayPanel = TrayPanel;
})(Ev || (Ev = {}));
/**
 * 定义画面调度常驻按钮栏组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Sprite/Start.ts
 */
/// <reference path="Sprite.ts" />
/// <reference path="../Resource/Resource.ts" />
/// <reference path="../Ev/_Sprite/TrayMenu.ts" />
/// <reference path="../Ev/_Sprite/TrayPanel.ts" />
var Sprite;
(function (Sprite) {
    var G = __Bigine_C2D;
    var Tray = (function (_super) {
        __extends(Tray, _super);
        /**
         * 构造函数。
         */
        function Tray(id, theme) {
            var _this = this;
            var w = 1280, h = 720, raw = Core.IResource.Type.Raw, rr = Resource.Resource, _menu = theme['menu'], _panel = theme['panel'];
            _super.call(this, 0, 0, w, h, true);
            this._rr = [
                rr.g(_menu['i'], raw),
                rr.g(_menu['ih'], raw),
                rr.g(_panel['i'], raw),
                rr.g(_panel['ih'], raw)
            ];
            this.o(0)
                .a(new G.Button(_menu)
                .b(function () {
                _this.dispatchEvent(new Ev.TrayMenu({ target: _this }));
            }, new G.Image(this._rr[1].o(), _menu, true), new G.Image(this._rr[0].o(), _menu, true))).a(this._x = new G.Button(_panel)
                .b(function () {
                _this.dispatchEvent(new Ev.TrayPanel({ target: _this }));
            }, new G.Image(this._rr[3].o(), _panel, true), new G.Image(this._rr[2].o(), _panel, true)));
        }
        /**
         * 配置面板。
         */
        Tray.prototype.u = function (panel) {
            this._x.o(0 + panel);
            return this;
        };
        return Tray;
    }(Sprite.Sprite));
    Sprite.Tray = Tray;
})(Sprite || (Sprite = {}));
/**
 * 声明画面调度功能菜单组件接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_Sprite/IMenu.ts
 */
/// <reference path="ISprite.ts" />
/**
 * 声明（画面调度）功能菜单关闭事件元信息接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/IMenuCloseMetas.ts
 */
/// <reference path="../../../include/tsd.d.ts" />
/// <reference path="../../Core/_Sprite/IMenu.ts" />
/**
 * 定义（画面调度）功能菜单关闭事件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/MenuClose.ts
 */
/// <reference path="../Event.ts" />
/// <reference path="IMenuCloseMetas.ts" />
var Ev;
(function (Ev) {
    var MenuClose = (function (_super) {
        __extends(MenuClose, _super);
        /**
         * 构造函数。
         */
        function MenuClose(metas) {
            _super.call(this, metas);
        }
        /**
         * 获取类型。
         */
        MenuClose.prototype.gT = function () {
            return 'menu.close';
        };
        return MenuClose;
    }(Ev.Event));
    Ev.MenuClose = MenuClose;
})(Ev || (Ev = {}));
/**
 * 声明（画面调度）功能菜单存档事件元信息接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/IMenuSaveMetas.ts
 */
/// <reference path="../../../include/tsd.d.ts" />
/// <reference path="../../Core/_Sprite/IMenu.ts" />
/**
 * 定义（画面调度）功能菜单存档事件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/MenuSave.ts
 */
/// <reference path="../Event.ts" />
/// <reference path="IMenuSaveMetas.ts" />
var Ev;
(function (Ev) {
    var MenuSave = (function (_super) {
        __extends(MenuSave, _super);
        /**
         * 构造函数。
         */
        function MenuSave(metas) {
            _super.call(this, metas);
        }
        /**
         * 获取类型。
         */
        MenuSave.prototype.gT = function () {
            return 'menu.save';
        };
        return MenuSave;
    }(Ev.Event));
    Ev.MenuSave = MenuSave;
})(Ev || (Ev = {}));
/**
 * 声明（画面调度）功能菜单读档事件元信息接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/IMenuLoadMetas.ts
 */
/// <reference path="../../../include/tsd.d.ts" />
/// <reference path="../../Core/_Sprite/IMenu.ts" />
/**
 * 定义（画面调度）功能菜单读档事件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/MenuLoad.ts
 */
/// <reference path="../Event.ts" />
/// <reference path="IMenuLoadMetas.ts" />
var Ev;
(function (Ev) {
    var MenuLoad = (function (_super) {
        __extends(MenuLoad, _super);
        /**
         * 构造函数。
         */
        function MenuLoad(metas) {
            _super.call(this, metas);
        }
        /**
         * 获取类型。
         */
        MenuLoad.prototype.gT = function () {
            return 'menu.load';
        };
        return MenuLoad;
    }(Ev.Event));
    Ev.MenuLoad = MenuLoad;
})(Ev || (Ev = {}));
/**
 * 声明（画面调度）功能菜单设置事件元信息接口规范。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/IMenuSetMetas.ts
 */
/// <reference path="../../../include/tsd.d.ts" />
/// <reference path="../../Core/_Sprite/IMenu.ts" />
/**
 * 定义（画面调度）功能菜单设置事件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/MenuSet.ts
 */
/// <reference path="../Event.ts" />
/// <reference path="IMenuSetMetas.ts" />
var Ev;
(function (Ev) {
    var MenuSet = (function (_super) {
        __extends(MenuSet, _super);
        /**
         * 构造函数。
         */
        function MenuSet(metas) {
            _super.call(this, metas);
        }
        /**
         * 获取类型。
         */
        MenuSet.prototype.gT = function () {
            return 'menu.set';
        };
        return MenuSet;
    }(Ev.Event));
    Ev.MenuSet = MenuSet;
})(Ev || (Ev = {}));
/**
 * 声明（画面调度）功能菜单重新开始事件元信息接口规范。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/IMenuReplayMetas.ts
 */
/// <reference path="../../../include/tsd.d.ts" />
/// <reference path="../../Core/_Sprite/IMenu.ts" />
/**
 * 定义（画面调度）功能菜单重新开始事件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/MenuReplay.ts
 */
/// <reference path="../Event.ts" />
/// <reference path="IMenuReplayMetas.ts" />
var Ev;
(function (Ev) {
    var MenuReplay = (function (_super) {
        __extends(MenuReplay, _super);
        /**
         * 构造函数。
         */
        function MenuReplay(metas) {
            _super.call(this, metas);
        }
        /**
         * 获取类型。
         */
        MenuReplay.prototype.gT = function () {
            return 'menu.replay';
        };
        return MenuReplay;
    }(Ev.Event));
    Ev.MenuReplay = MenuReplay;
})(Ev || (Ev = {}));
/**
 * 定义画面调度功能菜单组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Sprite/Menu.ts
 */
/// <reference path="Sprite.ts" />
/// <reference path="../Resource/Resource.ts" />
/// <reference path="../Ev/_Sprite/MenuClose.ts" />
/// <reference path="../Ev/_Sprite/MenuSave.ts" />
/// <reference path="../Ev/_Sprite/MenuLoad.ts" />
/// <reference path="../Ev/_Sprite/MenuSet.ts" />
/// <reference path="../Ev/_Sprite/MenuReplay.ts" />
var Sprite;
(function (Sprite) {
    var G = __Bigine_C2D;
    var Menu = (function (_super) {
        __extends(Menu, _super);
        /**
         * 构造函数。
         */
        function Menu(id, theme) {
            var _this = this;
            var w = 1280, h = 720, raw = Core.IResource.Type.Raw, rr = Resource.Resource, _close = theme['close'], _mask = theme['mask'], _save = theme['save'], _load = theme['load'], _set = theme['set'], _replay = theme['replay'];
            _super.call(this, 0, 0, w, h);
            this._rr = [
                rr.g(_close['i'], raw),
                rr.g(_close['ih'], raw),
                rr.g(_save['i'], raw),
                rr.g(_save['ih'], raw),
                rr.g(_load['i'], raw),
                rr.g(_load['ih'], raw),
                rr.g(_set['i'], raw),
                rr.g(_set['ih'], raw),
                rr.g(_replay['i'], raw),
                rr.g(_replay['ih'], raw)
            ];
            this.o(0)
                .a(new G.Color(0, 0, w, h, _mask['cb']).o(_mask['o']))
                .a(new G.Button(_close)
                .b(function () {
                _this.dispatchEvent(new Ev.MenuClose({ target: _this }));
            }, new G.Image(this._rr[1].o(), _close, true), new G.Image(this._rr[0].o(), _close, true))).a(new G.Button(_save)
                .b(function () {
                _this.dispatchEvent(new Ev.MenuSave({ target: _this }));
            }, new G.Image(this._rr[3].o(), _save, true), new G.Image(this._rr[2].o(), _save, true))).a(new G.Button(_load)
                .b(function () {
                _this.dispatchEvent(new Ev.MenuLoad({ target: _this }));
            }, new G.Image(this._rr[5].o(), _load, true), new G.Image(this._rr[4].o(), _load, true))).a(new G.Button(_set)
                .b(function () {
                _this.dispatchEvent(new Ev.MenuSet({ target: _this }));
            }, new G.Image(this._rr[7].o(), _set, true), new G.Image(this._rr[6].o(), _set, true))).a(this._x = new G.Button(_replay)
                .b(function () {
                _this.dispatchEvent(new Ev.MenuReplay({ target: _this }));
            }, new G.Image(this._rr[9].o(), _replay, true), new G.Image(this._rr[8].o(), _replay, true)));
        }
        Menu.prototype.u = function (series) {
            series ? this._x.o(1) : this._x.o(0);
            return this;
        };
        return Menu;
    }(Sprite.Sprite));
    Sprite.Menu = Menu;
})(Sprite || (Sprite = {}));
/**
 * 声明画面调度档位菜单组件接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_Sprite/ISlots.ts
 */
/// <reference path="ISprite.ts" />
/// <reference path="../_Runtime/IStates.ts" />
/**
 * 声明（画面调度）档位菜单关闭事件元信息接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/ISlotsCloseMetas.ts
 */
/// <reference path="../../../include/tsd.d.ts" />
/// <reference path="../../Core/_Sprite/ISlots.ts" />
/**
 * 定义（画面调度）档位菜单关闭事件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/SlotsClose.ts
 */
/// <reference path="../Event.ts" />
/// <reference path="ISlotsCloseMetas.ts" />
var Ev;
(function (Ev) {
    var SlotsClose = (function (_super) {
        __extends(SlotsClose, _super);
        /**
         * 构造函数。
         */
        function SlotsClose(metas) {
            _super.call(this, metas);
        }
        /**
         * 获取类型。
         */
        SlotsClose.prototype.gT = function () {
            return 'slots.close';
        };
        return SlotsClose;
    }(Ev.Event));
    Ev.SlotsClose = SlotsClose;
})(Ev || (Ev = {}));
/**
 * 声明（画面调度）档位菜单读档事件元信息接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/ISlotsLoadMetas.ts
 */
/// <reference path="../../../include/tsd.d.ts" />
/// <reference path="../../Core/_Sprite/ISlots.ts" />
/**
 * 定义（画面调度）档位菜单读档事件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/SlotsLoad.ts
 */
/// <reference path="../Event.ts" />
/// <reference path="ISlotsLoadMetas.ts" />
var Ev;
(function (Ev) {
    var SlotsLoad = (function (_super) {
        __extends(SlotsLoad, _super);
        /**
         * 构造函数。
         */
        function SlotsLoad(metas) {
            _super.call(this, metas);
            this.id = metas.id;
        }
        /**
         * 获取类型。
         */
        SlotsLoad.prototype.gT = function () {
            return 'slots.load';
        };
        return SlotsLoad;
    }(Ev.Event));
    Ev.SlotsLoad = SlotsLoad;
})(Ev || (Ev = {}));
/**
 * 声明（画面调度）档位菜单存档事件元信息接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/ISlotsSaveMetas.ts
 */
/// <reference path="../../../include/tsd.d.ts" />
/// <reference path="../../Core/_Sprite/ISlots.ts" />
/**
 * 定义（画面调度）档位菜单存档事件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/SlotsSave.ts
 */
/// <reference path="../Event.ts" />
/// <reference path="ISlotsSaveMetas.ts" />
var Ev;
(function (Ev) {
    var SlotsSave = (function (_super) {
        __extends(SlotsSave, _super);
        /**
         * 构造函数。
         */
        function SlotsSave(metas) {
            _super.call(this, metas);
            this.slot = metas.slot;
        }
        /**
         * 获取类型。
         */
        SlotsSave.prototype.gT = function () {
            return 'slots.save';
        };
        return SlotsSave;
    }(Ev.Event));
    Ev.SlotsSave = SlotsSave;
})(Ev || (Ev = {}));
/**
 * 定义画面调度档位菜单组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Sprite/Slots.ts
 */
/// <reference path="Sprite.ts" />
/// <reference path="../Resource/Resource.ts" />
/// <reference path="../Ev/_Sprite/SlotsClose.ts" />
/// <reference path="../Ev/_Sprite/SlotsLoad.ts" />
/// <reference path="../Ev/_Sprite/SlotsSave.ts" />
var Sprite;
(function (Sprite) {
    var Util = __Bigine_Util;
    var G = __Bigine_C2D;
    var Slots = (function (_super) {
        __extends(Slots, _super);
        /**
         * 构造函数。
         */
        function Slots(id, theme) {
            var _this = this;
            var w = 1280, h = 720, raw = Core.IResource.Type.Raw, rr = Resource.Resource, _close = theme['close'], _mask = theme['mask'], _auto = theme['auto'], _1 = theme['1'], _2 = theme['2'], _3 = theme['3'], _4 = theme['4'];
            _super.call(this, 0, 0, w, h);
            this._c = [_auto, _1, _2, _3, _4];
            this._x = {};
            this._rr = [
                rr.g(_close['i'], raw),
                rr.g(_close['ih'], raw),
                rr.g(_auto['i'], raw),
                rr.g(_auto['ih'], raw),
                rr.g(_1['i'], raw),
                rr.g(_1['ih'], raw),
                rr.g(_2['i'], raw),
                rr.g(_2['ih'], raw),
                rr.g(_3['i'], raw),
                rr.g(_3['ih'], raw),
                rr.g(_4['i'], raw),
                rr.g(_4['ih'], raw)
            ];
            this.o(0)
                .a(new G.Color(0, 0, w, h, _mask['cb']).o(_mask['o']))
                .a(new G.Button(_close)
                .b(function () {
                _this.dispatchEvent(new Ev.SlotsClose({ target: _this }));
            }, new G.Image(this._rr[1].o(), _close, true), new G.Image(this._rr[0].o(), _close, true)));
        }
        /**
         * 显示存档位。
         */
        Slots.prototype.vs = function (runtime, duration) {
            var _this = this;
            var states = runtime.gS();
            return states.l().then(function () {
                var slots = states.qa();
                var last = 1;
                var right = G.Text.Align.Right;
                var button = function (index, slot) {
                    if (index != 'auto' && index != 'pay') {
                        var _ii = 4 + (last - 1) * 2, _i = _this._c[index], _it = _this._c[index]['text'];
                        _this.a(_this._x[index] = new G.Button(_i)
                            .b(function () {
                            _this.dispatchEvent(new Ev.SlotsSave({
                                target: _this,
                                slot: index
                            }));
                        }, new G.Image(_this._rr[_ii + 1].o(), _i, true), new G.Image(_this._rr[_ii].o(), _i, true))
                            .a(new G.Text(_it, _it['s'], _it['lh'], right, true)
                            .tc(_it['c'])
                            .a(new G.TextPhrase(slot ? _this.$d(slot[1]) : '（无）'))));
                        last++;
                    }
                };
                Util.each(slots, function (slot, index) {
                    button(index, slot);
                });
                if (last <= 4)
                    button(last.toString());
                if (last <= 4) {
                    for (var i = last; i <= 4; i++) {
                        var _ii = 4 + (i - 1) * 2;
                        var _i = _this._c[i];
                        _this.a(_this._x[i.toString()] = new G.Image(_this._rr[_ii].o(), _i));
                    }
                }
                return _this.v(duration);
            });
        };
        /**
         * 显示读档位。
         */
        Slots.prototype.vl = function (runtime, duration) {
            var _this = this;
            var states = runtime.gS();
            runtime.dispatchEvent(new Ev.ScreenLoad({
                target: states,
                type: 'open'
            }));
            states.s('.oc', true);
            return states.l().then(function () {
                var slots = states.qa();
                var last = 1;
                var right = G.Text.Align.Right;
                var $a = states.q('auto'), _a = _this._c[0], _at = _a['text'];
                var button = function (index, slot) {
                    if (index != 'auto' && index != 'pay') {
                        var _ii = 4 + (last - 1) * 2, _i = _this._c[index], _it = _this._c[index]['text'];
                        _this.a(_this._x[index] = new G.Button(_i)
                            .b(function () {
                            _this.dispatchEvent(new Ev.SlotsLoad({
                                target: _this,
                                id: slot[0]
                            }));
                        }, new G.Image(_this._rr[_ii + 1].o(), _i, true), new G.Image(_this._rr[_ii].o(), _i, true))
                            .a(new G.Text(_it, _it['s'], _it['lh'], right, true)
                            .tc(_it['c'])
                            .a(new G.TextPhrase(slot ? _this.$d(slot[1]) : '（无）'))));
                        last++;
                    }
                };
                Util.each(slots, function (slot, index) {
                    button(index, slot);
                });
                if (last <= 4) {
                    for (var i = last; i <= 4; i++) {
                        var _ii = 4 + (i - 1) * 2;
                        var _i = _this._c[i];
                        _this.a(_this._x[i.toString()] = new G.Image(_this._rr[_ii].o(), _i));
                    }
                }
                _this.a(_this._x['a'] = $a ?
                    new G.Button(_a)
                        .b(function () {
                        _this.dispatchEvent(new Ev.SlotsLoad({
                            target: _this,
                            id: $a[0]
                        }));
                    }, new G.Image(_this._rr[3].o(), _a, true), new G.Image(_this._rr[2].o(), _a, true)) :
                    new G.Sprite(_a)
                        .a(new G.Image(_this._rr[2].o(), _a, true)));
                _this._x['a']
                    .a(new G.Text(_at, _at['s'], _at['lh'], right, true)
                    .tc(_at['c'])
                    .a(new G.TextPhrase($a ? _this.$d($a[1]) : '（无）')));
                return _this.v(duration);
            });
        };
        /**
         * 隐藏。
         */
        Slots.prototype.h = function (duration) {
            var _this = this;
            return _super.prototype.h.call(this, duration).then(function () {
                Util.each(_this._x, function (item) {
                    _this.e(item);
                });
                _this._x = {};
                return _this;
            });
        };
        /**
         * 格式化时间。
         */
        Slots.prototype.$d = function (stamp) {
            var date = new Date(stamp), field = date.getHours(), clob = ' ' + (10 > field ? '0' : '') + field;
            field = date.getMinutes();
            clob += ':' + (10 > field ? '0' : '') + field;
            return date.getFullYear() + '-' + (1 + date.getMonth()) + '-' + date.getDate() + clob;
        };
        return Slots;
    }(Sprite.Sprite));
    Sprite.Slots = Slots;
})(Sprite || (Sprite = {}));
/**
 * 定义画面调度状态信息组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Sprite/Status.ts
 */
/// <reference path="Sprite.ts" />
/// <reference path="../Resource/Resource.ts" />
/// <reference path="../Core/_Runtime/IRuntime.ts" />
/// <reference path="../Ev/_Runtime/State.ts" />
var Sprite;
(function (Sprite) {
    var Util = __Bigine_Util;
    var G = __Bigine_C2D;
    var Status = (function (_super) {
        __extends(Status, _super);
        /**
         * 构造函数。
         */
        function Status(id, theme) {
            var w = 1280, h = 720, raw = Core.IResource.Type.Raw, rr = Resource.Resource, left = G.Text.Align.Left, right = G.Text.Align.Right, _back = theme['back'], i = 1, j;
            _super.call(this, 0, 0, w, h, true);
            this._rr = [
                rr.g(_back['i'], raw)
            ];
            this.o(0)
                .a(new G.Image(this._rr[0].o(), _back));
            this._x = {};
            this._y = {};
            for (; i < 7; i++) {
                j = theme[i];
                this.a(this._x[i + 't'] = new G.Text(j['title'], j['title']['s'], j['title']['lh'], left)
                    .tc(j['title']['c'])
                    .o(0)).a(this._x[i + 'v'] = new G.Text(j['value'], j['value']['s'], j['value']['lh'], right)
                    .tc(j['value']['c'])
                    .o(0));
            }
        }
        /**
         * 配置。
         */
        Status.prototype.u = function (sheet, runtime) {
            var _this = this;
            Util.each(sheet, function (item, index) {
                if (!item[0])
                    return;
                _this._x[++index + 't'].o(1)
                    .c()
                    .a(new G.TextPhrase(item[0]));
                _this._x[index + 'v'].o(1);
                _this._y[item[1]] = [index + 'v', ''];
            });
            runtime.addEventListener('state', function (ev) {
                Util.each(_this._y, function (conf, name) {
                    var value = ev.data[name];
                    if (undefined === value) {
                        value = '';
                    }
                    else
                        value = value.toString();
                    if (value == conf[1])
                        return;
                    _this._y[name][1] = value;
                    _this._x[conf[0]].c().a(new G.TextPhrase(value));
                });
            });
            this.o(1);
            return this;
        };
        return Status;
    }(Sprite.Sprite));
    Sprite.Status = Status;
})(Sprite || (Sprite = {}));
/**
 * 声明画面调度面板组件接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_Sprite/IPanel.ts
 */
/// <reference path="ISprite.ts" />
/// <reference path="../_Runtime/IRuntime.ts" />
/**
 * 声明（画面调度）面板关闭事件元信息接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/IPanelCloseMetas.ts
 */
/// <reference path="../../../include/tsd.d.ts" />
/// <reference path="../../Core/_Sprite/IPanel.ts" />
/**
 * 定义（画面调度）面板关闭事件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/PanelClose.ts
 */
/// <reference path="../Event.ts" />
/// <reference path="IPanelCloseMetas.ts" />
var Ev;
(function (Ev) {
    var PanelClose = (function (_super) {
        __extends(PanelClose, _super);
        /**
         * 构造函数。
         */
        function PanelClose(metas) {
            _super.call(this, metas);
        }
        /**
         * 获取类型。
         */
        PanelClose.prototype.gT = function () {
            return 'panel.close';
        };
        return PanelClose;
    }(Ev.Event));
    Ev.PanelClose = PanelClose;
})(Ev || (Ev = {}));
/**
 * 定义画面调度面板信息组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Sprite/Panel.ts
 */
/// <reference path="Sprite.ts" />
/// <reference path="../Resource/Resource.ts" />
/// <reference path="../Ev/_Sprite/PanelClose.ts" />
/// <reference path="../Ev/_Runtime/State.ts" />
var Sprite;
(function (Sprite) {
    var Util = __Bigine_Util;
    var G = __Bigine_C2D;
    var Panel = (function (_super) {
        __extends(Panel, _super);
        /**
         * 构造函数。
         */
        function Panel(id, theme) {
            var w = 1280, h = 720, raw = Core.IResource.Type.Raw, rr = Resource.Resource, _close = theme['close'], _tab = theme['tab'], _simp = theme['simp'], _coll = theme['coll'];
            _super.call(this, 0, 0, w, h);
            this._pt = theme;
            this._pi = false;
            this._ti = 0;
            this._tai = {};
            this._rr = [
                // 0: 面板背景
                rr.g(theme['back']['i'], raw),
                // 1: 关闭按钮
                rr.g(_close['i'], raw),
                // 2: 关闭按钮~hover
                rr.g(_close['ih'], raw),
                // 3: 标签按钮
                rr.g(_tab['title']['i'], raw),
                // 4: 标签按钮激活状态图片
                rr.g(_tab['title']['ia'], raw),
                // 5: 简单面板背景
                rr.g(_simp['back']['i'], raw),
                // 6: 集合面板背景
                rr.g(_coll['back']['i'], raw),
                // 7: 集合面板上一个按钮
                rr.g(_coll['arrow']['p']['i'], raw),
                // 8: 集合面板上一个按钮~hover
                rr.g(_coll['arrow']['p']['ih'], raw),
                // 9: 集合面板下一个按钮
                rr.g(_coll['arrow']['n']['i'], raw),
                // 10: 集合面板下一个按钮~hover
                rr.g(_coll['arrow']['n']['ih'], raw)
            ];
            this._st = {};
            this._sv = {};
            this._svt = {};
            this._ct = {};
            this._cv = {};
            this._ca = {};
            this._pb = {};
            this._sTypes = ['心', '星'];
            this._eTypes = ['人物', '房间', '特写'];
            this._tResource = {};
            this._cc = [];
            this._cp = 0;
            this._dr = {};
            this.o(0);
        }
        /**
         * 配置。
         */
        Panel.prototype.u = function (sheet, runtime) {
            var _this = this;
            this._ep = runtime.gE();
            if (sheet.length == 0)
                return this;
            // 集合面板翻页上一页按钮
            var pBounds = this._pt['coll']['arrow']['p'];
            this.pI()
                .a(this._ca['p'] = new G.Button(pBounds)
                .b(function () {
                _this._cp = _this._cp == 0 ? (_this._cc.length - 1) : (_this._cp - 1);
                _this.uC(sheet[_this._ti], _this._dr);
            }, new G.Image(this._rr[8].o(), pBounds, true), new G.Image(this._rr[7].o(), pBounds, true)));
            this._ca['p'].o(0);
            // 集合面板翻页下一页按钮
            var nBounds = this._pt['coll']['arrow']['n'];
            this.a(this._ca['n'] = new G.Button(nBounds)
                .b(function () {
                _this._cp = (_this._cp == _this._cc.length - 1) ? 0 : (_this._cp + 1);
                _this.uC(sheet[_this._ti], _this._dr);
            }, new G.Image(this._rr[10].o(), nBounds, true), new G.Image(this._rr[9].o(), nBounds, true)));
            this._ca['n'].o(0);
            this.uT(sheet);
            // 显示第一个标签页的数据
            this.uContent(sheet[0], null);
            // 监听数据变化
            runtime.addEventListener('state', function (ev) {
                _this._dr = ev.data;
                _this.uContent(sheet[_this._ti], ev.data);
            });
            return this;
        };
        /**
         * 初始化渲染。
         */
        Panel.prototype.pI = function () {
            var _this = this;
            if (this._pi)
                return this;
            var w = 1280, h = 720, raw = Core.IResource.Type.Raw, rr = Resource.Resource, theme = this._pt, _mask = theme['mask'], _back = theme['back'], _close = theme['close'], _simp = theme['simp'], _coll = theme['coll'], _type = theme['type'], i = 1, left = G.Text.Align.Left;
            // 渲染面板初始样式
            this.a(new G.Color(0, 0, w, h, _mask['cb']).o(_mask['o']))
                .a(new G.Image(this._rr[0].o(), _back))
                .a(new G.Button(_close)
                .b(function () {
                _this.dispatchEvent(new Ev.PanelClose({ target: _this }));
            }, new G.Image(this._rr[2].o(), _close, true), new G.Image(this._rr[1].o(), _close, true)));
            // 简单面板背景
            this.a(this._pb['s'] = new G.Image(this._rr[5].o(), _simp['back'], true));
            this._pb['s'].o(0);
            // 集合面板背景
            this.a(this._pb['c'] = new G.Image(this._rr[6].o(), _coll['back'], true));
            this._pb['c'].o(0);
            // 构造简单面板中渲染数据名的容器
            for (; i < 13; i++) {
                var titleTxt = new G.Text(_simp[i]['title'], _simp[i]['title']['s'], _simp[i]['title']['lh'], left);
                this._st[i + 't'] = titleTxt;
                this.a(this._st[i + 't']).o(0);
            }
            Util.each(_type, function (typeTheme, typeName) {
                _this._tResource[typeName] = {};
                _this._tResource[typeName]['ei'] = rr.g(typeTheme['ei'], raw);
                _this._tResource[typeName]['fi'] = rr.g(typeTheme['fi'], raw);
            });
            // 集合面板数据标题和数据值
            Util.each(_coll, function (config, name) {
                if (name == 'back' || name == 'arrow')
                    return;
                if (name == 'head') {
                    // 初始化集合面板数据值显示元素
                    _this._cv[name] = new G.Sprite(config, false, true);
                    _this.a(_this._cv[name]);
                    _this._cv[name].o(0);
                }
                else if (name == 'name') {
                    // 初始化集合面板数据值显示元素
                    var align = _this.align(config['a']);
                    _this._cv[name] = new G.Text(config, config['s'], config['lh'], align, true);
                    _this.a(_this._cv[name]);
                    _this._cv[name].o(0);
                }
                else {
                    var tBounds = config['title'];
                    var vBounds = config['value'];
                    // 初始化集合面板数据标题元素
                    _this._ct[name + 't'] = new G.Text(tBounds, tBounds['s'], tBounds['lh']);
                    _this.a(_this._ct[name + 't']);
                    _this._ct[name + 't'].o(0);
                    // 初始化集合面板数据值显示元素
                    _this._cv[name + 'v'] = new G.Sprite(vBounds, false, true);
                    _this.a(_this._cv[name + 'v']);
                    _this._cv[name + 'v'].o(0);
                }
            });
            return this;
        };
        /**
         * 绘制面板标签
         */
        Panel.prototype.uT = function (sheet) {
            var _this = this;
            var align = this.align(this._pt['tab']['title']['a']);
            var activeImage;
            // 渲染面板切换标签
            Util.each(sheet, function (data, index) {
                var tabBtn = _this._tai[data['n']];
                if (!tabBtn) {
                    var tabPosi = _this._pt['tab'][index + 1 + ''];
                    var titleBounds = Util.clone(_this._pt['tab']['title']);
                    var tabText = new G.Text(titleBounds, titleBounds['s'], titleBounds['lh'], align);
                    _this._tai[index + 't'] = tabText;
                    var tabBounds = Util.clone(titleBounds);
                    tabBounds['x'] = tabPosi['x'];
                    tabBounds['y'] = tabPosi['y'];
                    var tabImage = new G.Image(_this._rr[3].o(), tabBounds, true);
                    _this._tai[data['n']] = tabBtn = new G.Button(tabBounds)
                        .b(function () {
                        if (index == _this._ti)
                            return;
                        _this._ti = index;
                        _this._cp = 0;
                        _this.clean();
                        _this.uT(sheet);
                        _this.uContent(data, _this._dr);
                    }, null, tabImage);
                    tabBtn.a(tabText.a(new G.TextPhrase(data['n']))).o(1);
                    _this.a(tabBtn);
                }
                if (index == _this._ti) {
                    activeImage = new G.Image(_this._rr[4].o(), tabBtn.gB(), true);
                    tabBtn.a(activeImage, _this._tai[_this._ti + 't']);
                }
                else {
                    tabBtn.e(_this._tai['a']);
                }
                if (index >= 5)
                    return false;
            });
            this._tai['a'] = activeImage;
            return this;
        };
        /**
         * 绘制面板内容
         */
        Panel.prototype.uContent = function (sheet, data) {
            if (!sheet)
                return this;
            this.clean();
            var type = sheet['：'];
            switch (type) {
                case 'simp':
                    this.uS(sheet, data);
                    break;
                case 'coll':
                    this.uC(sheet, data);
                    break;
            }
            return this;
        };
        /**
         * 绘制简单面板
         */
        Panel.prototype.uS = function (sheet, data) {
            var _this = this;
            this._pb['s'].o(1);
            var simpData = sheet['c'];
            if (!simpData || simpData.length == 0)
                return this;
            var simpTheme = this._pt['simp'], left = G.Text.Align.Left;
            Util.each(simpData, function (simpField, index) {
                // 画出简单面板中显示的数据名
                _this._st[index + 1 + 't'].c().a(new G.TextPhrase(simpField['alias'])).o(1);
                /* 画出简单面板中显示的数据值 */
                // 获取数据类型
                var type = _this._svt[simpField['name']] || simpField['type'];
                // 保存数据类型到本地
                if (type && !_this._svt[simpField['name']]) {
                    _this._svt[simpField['name']] = type;
                }
                // 获取数据值
                var value = data ? data[simpField['name']] : '';
                // 构建数据值渲染容器
                if (!_this._sv[simpField['name']]) {
                    var i = index + 1 + '';
                    if (type && Util.indexOf(_this._sTypes, type) > -1) {
                        _this.a(_this._sv[simpField['name']] = new G.Sprite(simpTheme[i]['value'], false, true));
                    }
                    else {
                        _this.a(_this._sv[simpField['name']] = new G.Text(simpTheme[i]['value'], simpTheme[i]['value']['s'], simpTheme[i]['value']['lh'], left));
                    }
                }
                // 如果数据类型是图片类型
                if (type && Util.indexOf(_this._sTypes, type) > -1) {
                    _this._sv[simpField['name']].c();
                    var rValue = value ? parseInt(value, 10) : 0;
                    for (var j = 0; j < rValue; j++) {
                        var typeBound = Util.clone(_this._pt['type'][type]);
                        typeBound['x'] = j * (_this._pt['type'][type]['m'] + _this._pt['type'][type]['w']);
                        typeBound['y'] = (simpTheme[index + 1 + '']['value']['lh'] - _this._pt['type'][type]['h']) / 2;
                        var image = new G.Image(_this._tResource[type]['ei'].o(), typeBound, false);
                        _this._sv[simpField['name']].a(image);
                    }
                    _this._sv[simpField['name']].o(1);
                }
                else {
                    _this._sv[simpField['name']].c().a(new G.TextPhrase(value + '')).o(1);
                }
            });
            return this;
        };
        /**
         * 绘制集合面板
         */
        Panel.prototype.uC = function (sheet, data) {
            var _this = this;
            if (!data)
                return this;
            // 渲染背景
            this._pb['c'].o(1);
            // 取出集合数据
            var collName = sheet['cn'][0];
            this._cc = data[collName][''];
            var name = this._cc[this._cp];
            var collData = data[name];
            // 取出集合的结构
            var cStruct = this._ep.q(sheet['s'], Core.IEpisode.Entity.Struct);
            var i = 1;
            if (collData) {
                Util.each(cStruct.gS(), function (field) {
                    var fieldName = field.$c(), fieldValue = collData[fieldName], fieldType = field.gT();
                    // 渲染头像
                    if (field.iE()) {
                        var hBounds = _this._pt['coll']['head'];
                        var iBounds = { x: 0, y: 0, w: hBounds['w'], h: hBounds['h'] };
                        var entity = field.gIE(fieldValue);
                        _this._cv['head'].c().a(new G.Image(entity.o().o(), iBounds)).o(1);
                    }
                    else if (field.iN()) {
                        _this._cv['name'].c().a(new G.TextPhrase(fieldValue)).o(1);
                    }
                    else {
                        if (fieldValue == '空') {
                            i++;
                            return;
                        }
                        _this._ct[i + 't'].c().a(new G.TextPhrase(fieldName)).o(1);
                        // 心或星类型的字段
                        _this._cv[i + 'v'].c(); // 先清空
                        if (Util.indexOf(_this._sTypes, field.gT()) > -1) {
                            var lValue = field.gL(), rValue = fieldValue;
                            for (var j = 0; j < lValue; j++) {
                                var tTheme = _this._pt['type'][field.gT()], typeBound = Util.clone(tTheme), res = j < rValue ? _this._tResource[fieldType]['ei'] : _this._tResource[fieldType]['fi'], image = new G.Image(res.o(), typeBound, false);
                                typeBound['x'] = j * (_this._pt['type'][fieldType]['m'] + _this._pt['type'][fieldType]['w']);
                                typeBound['y'] = (_this._pt['coll'][i + '']['value']['lh'] - _this._pt['type'][fieldType]['h']) / 2;
                                _this._cv[i + 'v'].a(image);
                            }
                            _this._cv[i + 'v'].o(1);
                        }
                        else {
                            // 普通字段
                            var tValue = _this._pt['coll'][i + '']['value'], iBound = Util.clone(tValue), align = G.Text.Align.Left;
                            iBound['x'] = 0;
                            iBound['y'] = 0;
                            _this._cv[i + 'v'].a(new G.Text(iBound, iBound['s'], iBound['lh'], align, false).c().a(new G.TextPhrase(fieldValue + ''))).o(1);
                        }
                        i++;
                    }
                });
            }
            this._ca['p'].o(1);
            this._ca['n'].o(1);
            return this;
        };
        /**
         * 清除面板
         */
        Panel.prototype.clean = function () {
            // 清除简单面板标题元素集合
            Util.each(this._st, function (text) {
                text.c().o(0);
            });
            // 清除简单面板值元素集合
            Util.each(this._sv, function (text) {
                text.c().o(0);
            });
            // 清除集合面板标题元素集合
            Util.each(this._ct, function (text) {
                text.c().o(0);
            });
            // 清除集合面板值元素集合
            Util.each(this._cv, function (text) {
                text.c().o(0);
            });
            // 清除集合面板翻页元素集合
            Util.each(this._ca, function (btn) {
                btn.o(0);
            });
            // 清除简单面板背景
            this._pb['s'].o(0);
            // 清除集合面板背景
            this._pb['c'].o(0);
        };
        /**
         * 获取对齐方式
         */
        Panel.prototype.align = function (ali) {
            var align = G.Text.Align.Center;
            switch (ali) {
                case 'l':
                    align = G.Text.Align.Left;
                    break;
                case 'r':
                    align = G.Text.Align.Right;
                    break;
                default:
                    align = G.Text.Align.Center;
                    break;
            }
            return align;
        };
        return Panel;
    }(Sprite.Sprite));
    Sprite.Panel = Panel;
})(Sprite || (Sprite = {}));
/**
 * 定义画面调度提示组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Sprite/Tip.ts
 */
/// <reference path="Sprite.ts" />
/// <reference path="../Resource/Resource.ts" />
var Sprite;
(function (Sprite) {
    var G = __Bigine_C2D;
    var Tip = (function (_super) {
        __extends(Tip, _super);
        /**
         * 构造函数。
         */
        function Tip(id, theme) {
            var w = 1280, h = 720, raw = Core.IResource.Type.Raw, rr = Resource.Resource, _back = theme['back'], _text = theme['text'];
            _super.call(this, 0, 0, w, h);
            this._rr = [
                rr.g(_back['i'], raw)
            ];
            this._c = _text['ch'];
            this.o(0)
                .a(new G.Image(this._rr[0].o(), _back))
                .a(this._x = new G.Text(_text, _text['s'], _text['lh'], G.Text.Align.Center)
                .tc(_text['c'])
                .ts(_text['ss']));
        }
        /**
         * 更新文本。
         */
        Tip.prototype.u = function (clob) {
            return this.$w(this._x, clob, this._c);
        };
        return Tip;
    }(Sprite.Sprite));
    Sprite.Tip = Tip;
})(Sprite || (Sprite = {}));
/**
 * 声明画面调度功能选择组件接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_Sprite/IChoose.ts
 */
/// <reference path="ISprite.ts" />
/// <reference path="../_Tag/IOptionTag.ts" />
/**
 * 声明（画面调度）选择事件元信息接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/IChooseMetas.ts
 */
/// <reference path="../../../include/tsd.d.ts" />
/// <reference path="../../Core/_Sprite/IChoose.ts" />
/**
 * 定义（画面调度）选择事件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/Choose.ts
 */
/// <reference path="../Event.ts" />
/// <reference path="IChooseMetas.ts" />
var Ev;
(function (Ev) {
    var Choose = (function (_super) {
        __extends(Choose, _super);
        /**
         * 构造函数。
         */
        function Choose(metas) {
            _super.call(this, metas);
            this.choice = metas.choice;
        }
        /**
         * 获取类型。
         */
        Choose.prototype.gT = function () {
            return 'choose';
        };
        return Choose;
    }(Ev.Event));
    Ev.Choose = Choose;
})(Ev || (Ev = {}));
/**
 * 定义画面调度选择组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Sprite/Choose.ts
 */
/// <reference path="Sprite.ts" />
/// <reference path="../Resource/Resource.ts" />
/// <reference path="../Ev/_Sprite/Choose.ts" />
var Sprite;
(function (Sprite) {
    var Util = __Bigine_Util;
    var G = __Bigine_C2D;
    var Choose = (function (_super) {
        __extends(Choose, _super);
        /**
         * 构造函数。
         */
        function Choose(id, theme) {
            var w = 1280, h = 720, raw = Core.IResource.Type.Raw, rr = Resource.Resource;
            _super.call(this, 0, 0, w, h);
            this._rr = [
                rr.g(theme['back']['i'], raw),
                rr.g(theme['back']['ih'], raw),
                rr.g(theme['radish']['i'], raw)
            ];
            this._c = theme;
            this._bn = [];
            this._bi =
                this._ke = undefined;
            this.o(0);
        }
        /**
         * 配置。
         */
        Choose.prototype.u = function (options, stage) {
            var _this = this;
            var margin = this._c['m'], _back = this._c['back'], _text = this._c['text'], _count = this._c['count'], _radish = this._c['radish'], opts = options.slice(0, 6), x = 0 | (1280 - _back['w']) / 2, y = 0 | (720 - opts.length * _back['h'] - (opts.length - 1) * margin) / 2;
            this.c();
            this._bn = [];
            this._bi = undefined;
            Util.each(options.slice(0, 6), function (option) {
                var text = new G.Text(x + _text['x'], y + _text['y'], _text['w'], _text['h'], _text['s'], _text['lh'], G.Text.Align.Center)
                    .tc(_text['c'])
                    .ts(_text['ss']);
                var money = option.gA() ? 0 : option.gM();
                var btn = new G.Button(x, y, _back['w'], _back['h'])
                    .b(function () {
                    _this.dispatchEvent(new Ev.Choose({
                        target: _this,
                        choice: option
                    }));
                }, new G.Image(_this._rr[1].o(), x, y, _back['w'], _back['h'], true), new G.Image(_this._rr[0].o(), x, y, _back['w'], _back['h'], true));
                _this._bn.push(btn);
                _this.$w(text, option.gT(), _text['ch']);
                _this.a(btn).a(text);
                if (money) {
                    var xC = x + _text['x'] + _text['w'] - _count['w'], yC = y + _text['y'] + 0.5 * _back['h'], xR = x + _text['x'] + _text['w'] - _count['w'] - _radish['w'] - 10, yR = y + _text['y'] + 0.5 * (_back['h'] - _radish['h']), count = new G.Text(xC, yC, _count['w'], _count['h'], _count['s'], _count['lh'], G.Text.Align.Left)
                        .tc(_count['c'])
                        .ts(_count['ss']);
                    _this.$w(count, money.toString(), _count['ch']);
                    _this.a(new G.Image(_this._rr[2].o(), xR, yR, _radish['w'], _radish['h'], true))
                        .a(count);
                }
                y += _back['h'] + margin;
            });
            this.ev(options, stage);
            return this;
        };
        /**
         * 添加按键事件。
         */
        Choose.prototype.ev = function (options, stage) {
            var _this = this;
            this._ke = function (event) {
                var old = _this._bi;
                switch (event.keyCode) {
                    case 38:
                        if (!_this._bi) {
                            _this._bi = 0;
                        }
                        else {
                            _this._bi--;
                        }
                        break;
                    case 40:
                        if (_this._bi == undefined) {
                            _this._bi = 0;
                        }
                        else if (_this._bi < _this._bn.length - 1) {
                            _this._bi++;
                        }
                        break;
                    case 13:
                        if (_this._bi != undefined) {
                            _this.dispatchEvent(new Ev.Choose({
                                target: _this,
                                choice: options[_this._bi]
                            }));
                        }
                        return;
                }
                if (old != _this._bi) {
                    var btn = _this._bn[_this._bi], bound = btn.gB();
                    stage.$s(bound.x, bound.y);
                    if (old != undefined && _this._bn[old]) {
                        _this._bn[old].dispatchEvent(new G.SpriteBlurEvent({
                            target: _this._bn[old],
                            x: bound.x,
                            y: bound.y,
                            from: undefined,
                            fromX: 0,
                            fromY: 0,
                            stage: stage
                        }));
                    }
                    if (_this._bn[_this._bi]) {
                        _this._bn[_this._bi].dispatchEvent(new G.SpriteFocusEvent({
                            target: _this._bn[_this._bi],
                            x: bound.x,
                            y: bound.y,
                            from: undefined,
                            fromX: 0,
                            fromY: 0,
                            stage: stage
                        }));
                    }
                }
                if (event.keyCode == 38 || event.keyCode == 40)
                    event.preventDefault();
            };
            window.addEventListener('keydown', this._ke);
        };
        /**
         * 隐藏。
         */
        Choose.prototype.h = function (duration) {
            window.removeEventListener('keydown', this._ke);
            this._bn = [];
            this._bi = undefined;
            return _super.prototype.h.call(this, duration);
        };
        return Choose;
    }(Sprite.Sprite));
    Sprite.Choose = Choose;
})(Sprite || (Sprite = {}));
/**
 * 定义画面调度特写组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Sprite/CG.ts
 */
/// <reference path="Sprite.ts" />
var Sprite;
(function (Sprite) {
    var G = __Bigine_C2D;
    var CG = (function (_super) {
        __extends(CG, _super);
        /**
         * 构造函数。
         */
        function CG(theme) {
            _super.call(this, 0, 0, 1280, 720);
            this._c = theme;
            this.o(0);
        }
        /**
         * 更新图片。
         */
        CG.prototype.u = function (image) {
            return image ? this.c()
                .a(new G.Image(image.o(), this._c)) :
                this.c()
                    .a(new G.Color(this._c, '#000'));
        };
        return CG;
    }(Sprite.Sprite));
    Sprite.CG = CG;
})(Sprite || (Sprite = {}));
/**
 * 定义画面调度连载档位菜单组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Sprite/SeriesSlots.ts
 */
/// <reference path="Sprite.ts" />
/// <reference path="../Resource/Resource.ts" />
/// <reference path="../Ev/_Sprite/SlotsClose.ts" />
/// <reference path="../Ev/_Sprite/SlotsLoad.ts" />
/// <reference path="../Ev/_Sprite/SlotsSave.ts" />
var Sprite;
(function (Sprite) {
    var Util = __Bigine_Util;
    var G = __Bigine_C2D;
    var SeriesSlots = (function (_super) {
        __extends(SeriesSlots, _super);
        /**
         * 构造函数。
         */
        function SeriesSlots(id, theme) {
            var _this = this;
            var w = 1280, h = 720, raw = Core.IResource.Type.Raw, rr = Resource.Resource, _desc = theme['text'], _close = theme['close'], _mask = theme['mask'], _auto = theme['auto'], _1 = theme['1'], _2 = theme['2'], _3 = theme['3'], _4 = theme['4'];
            _super.call(this, 0, 0, w, h);
            this._c = [_auto, _1, _2, _3, _4];
            this._x = {};
            this._rr = [
                rr.g(_close['i'], raw),
                rr.g(_close['ih'], raw),
                rr.g(_auto['i'], raw),
                rr.g(_auto['ih'], raw),
                rr.g(_1['i'], raw),
                rr.g(_1['ih'], raw),
                rr.g(_2['i'], raw),
                rr.g(_2['ih'], raw),
                rr.g(_3['i'], raw),
                rr.g(_3['ih'], raw),
                rr.g(_4['i'], raw),
                rr.g(_4['ih'], raw)
            ];
            this.o(0)
                .a(new G.Color(0, 0, w, h, _mask['cb']).o(_mask['o']))
                .a(new G.Button(_close)
                .b(function () {
                _this.dispatchEvent(new Ev.SlotsClose({ target: _this }));
            }, new G.Image(this._rr[1].o(), _close, true), new G.Image(this._rr[0].o(), _close, true)))
                .a(this._de = new G.Text(_desc, _desc['s'], _desc['lh'], this.$a(_desc['a']), true)
                .tc(_desc['c'])
                .a(new G.TextPhrase(_desc['desc'])));
        }
        /**
         * 显示存档位。
         */
        SeriesSlots.prototype.vs = function (runtime, fs, duration) {
            var _this = this;
            var states = runtime.gS();
            runtime.dispatchEvent(new Ev.ScreenSave({
                target: states,
                type: 'open'
            }));
            states.s('.oc', true);
            return states.l().then(function () {
                var type = Core.IStates.Save.End;
                var series = Core.IRuntime.Series.Last;
                var right = G.Text.Align.Right;
                var slots = states.qa(type);
                var last = 1;
                var button = function (index, slot) {
                    if (index != 'auto') {
                        var _ii = 4 + (last - 1) * 2, _i = _this._c[index], _it = _this._c[index]['text'];
                        _this.e(_this._x[index])
                            .a(_this._x[index] = new G.Button(_i)
                            .b(function () {
                            _this.dispatchEvent(new Ev.SlotsSave({
                                target: _this,
                                slot: index
                            }));
                        }, new G.Image(_this._rr[_ii + 1].o(), _i, true), new G.Image(_this._rr[_ii].o(), _i, true))
                            .a(new G.Text(_it, _it['s'], _it['lh'], right, true)
                            .tc(_it['c'])
                            .a(new G.TextPhrase(slot ? _this.$d(slot[1]) : '（无）'))));
                        last++;
                    }
                };
                fs == series ? _this._de.o(0) : _this._de.o(1);
                Util.each(slots, function (slot, index) {
                    button(index, slot);
                });
                if (last <= 4)
                    button(last.toString());
                if (last <= 4) {
                    for (var i = last; i <= 4; i++) {
                        var _ii = 4 + (i - 1) * 2;
                        var _i = _this._c[i];
                        _this.e(_this._x[i.toString()])
                            .a(_this._x[i.toString()] = new G.Image(_this._rr[_ii].o(), _i));
                    }
                }
                return _this.v(duration);
            });
            /*let type: Core.IStates.Save = Core.IStates.Save.End,
                series: Core.IRuntime.Series = Core.IRuntime.Series.Last,
                right: G.Text.Align = G.Text.Align.Right;
            let succ: () => Promise<SeriesSlots>;
            let fail: () => Promise<SeriesSlots>;
            let loop: () => Promise<SeriesSlots> = () => {
                return states.l()
                    .then(() => succ())
                    .catch(() => fail());
            };
            fs == series ? this._de.o(0) : this._de.o(1);
            succ = () => {
                let slots: Util.IHashTable<[string, number]> = states.qa(type);
                let last: number = 1;
                let button: (index: string, slot?: [string, number]) => void = (index: string, slot?: [string, number]) => {
                    if (index != 'auto') {
                        let _ii: number = 4 + (last - 1) * 2,
                            _i: Util.IHashTable<any> = this._c[index],
                            _it: Util.IHashTable<any> = this._c[index]['text'];
                        this.e(this._x[index])
                            .a(this._x[index] = new G.Button(<G.IBounds> _i)
                            .b(() => {
                                this.dispatchEvent(new Ev.SlotsSave({
                                    target: this,
                                    slot: index,
                                }));
                            }, new G.Image(this._rr[_ii + 1].o(), <G.IBounds> _i, true), new G.Image(this._rr[_ii].o(), <G.IBounds> _i, true))
                            .a(new G.Text(<G.IBounds> _it, _it['s'], _it['lh'], right, true)
                                .tc(_it['c'])
                                .a(new G.TextPhrase(slot ? this.$d(slot[1]) : '（无）'))
                            )
                        );
                        last++;
                    }
                };
                Util.each(slots, (slot: [string, number], index: string) => {
                    button(index, slot);
                });
                if (last <= 4) button(last.toString());
                if (last <= 4) {
                    for (var i: number = last; i <= 4; i++) {
                        let _ii: number = 4 + (i - 1) * 2;
                        let _i: Util.IHashTable<any> = this._c[i];
                        this.e(this._x[i.toString()])
                            .a(this._x[i.toString()] = new G.Image(this._rr[_ii].o(), <G.IBounds> _i));
                    }
                }
                return this.v(duration);
            };
            fail = () => {
                let _1: G.IBounds = this._c['1'];
                let _1t: Util.IHashTable<any> = _1['text'];
                this.e(this._x['1'])
                    .a(this._x['1'] = new G.Button(<G.IBounds> _1)
                    .b(() => {
                        loop();
                    }, new G.Image(this._rr[5].o(), <G.IBounds> _1, true), new G.Image(this._rr[4].o(), <G.IBounds> _1, true))
                    .a(new G.Text(<G.IBounds> _1t, _1t['s'], _1t['lh'], right, true)
                        .tc(_1t['c'])
                        .a(new G.TextPhrase('（未登录）'))
                    )
                );
                return this.v(duration);
            };
            return loop();*/
        };
        /**
         * 显示读档位。
         */
        SeriesSlots.prototype.vl = function (runtime, duration) {
            var _this = this;
            var states = runtime.gS();
            return states.l().then(function () {
                var type = Core.IStates.Save.Series, $a = states.q('auto', type), _a = _this._c[0], _at = _a['text'], slots = states.qa(type), right = G.Text.Align.Right;
                var last = 1;
                var button = function (index, slot) {
                    if (index != 'auto' && index != 'pay') {
                        var _ii = 4 + (last - 1) * 2, _i = _this._c[index], _it = _this._c[index]['text'];
                        _this.a(_this._x[index] = new G.Button(_i)
                            .b(function () {
                            _this.dispatchEvent(new Ev.SlotsLoad({
                                target: _this,
                                id: slot[0]
                            }));
                        }, new G.Image(_this._rr[_ii + 1].o(), _i, true), new G.Image(_this._rr[_ii].o(), _i, true))
                            .a(new G.Text(_it, _it['s'], _it['lh'], right, true)
                            .tc(_it['c'])
                            .a(new G.TextPhrase(slot ? _this.$d(slot[1]) : '（无）'))));
                        last++;
                    }
                };
                Util.each(slots, function (slot, index) {
                    button(index, slot);
                });
                if (last <= 4) {
                    for (var i = last; i <= 4; i++) {
                        var _ii = 4 + (i - 1) * 2;
                        var _i = _this._c[i];
                        _this.a(_this._x[i.toString()] = new G.Image(_this._rr[_ii].o(), _i));
                    }
                }
                _this.a(_this._x['a'] = $a ?
                    new G.Button(_a)
                        .b(function () {
                        _this.dispatchEvent(new Ev.SlotsLoad({
                            target: _this,
                            id: $a[0]
                        }));
                    }, new G.Image(_this._rr[3].o(), _a, true), new G.Image(_this._rr[2].o(), _a, true)) :
                    new G.Sprite(_a)
                        .a(new G.Image(_this._rr[2].o(), _a, true)));
                _this._x['a']
                    .a(new G.Text(_at, _at['s'], _at['lh'], right, true)
                    .tc(_at['c'])
                    .a(new G.TextPhrase($a ? _this.$d($a[1]['date']) : '（无）')));
                _this._de.o(0);
                return _this.v(duration);
            });
        };
        /**
         * 隐藏。
         */
        SeriesSlots.prototype.h = function (duration) {
            var _this = this;
            return _super.prototype.h.call(this, duration).then(function () {
                Util.each(_this._x, function (item) {
                    _this.e(item);
                });
                _this._x = {};
                return _this;
            });
        };
        /**
         * 格式化时间。
         */
        SeriesSlots.prototype.$d = function (stamp) {
            var date = new Date(stamp), field = date.getHours(), clob = ' ' + (10 > field ? '0' : '') + field;
            field = date.getMinutes();
            clob += ':' + (10 > field ? '0' : '') + field;
            return date.getFullYear() + '-' + (1 + date.getMonth()) + '-' + date.getDate() + clob;
        };
        return SeriesSlots;
    }(Sprite.Sprite));
    Sprite.SeriesSlots = SeriesSlots;
})(Sprite || (Sprite = {}));
/**
 * 声明画面调度设置菜单组件接口规范。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_Sprite/ISet.ts
 */
/// <reference path="ISprite.ts" />
/// <reference path="../_Runtime/IStates.ts" />
/**
 * 声明（画面调度）设置菜单关闭事件元信息接口规范。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/ISetCloseMetas.ts
 */
/// <reference path="../../../include/tsd.d.ts" />
/// <reference path="../../Core/_Sprite/ISet.ts" />
/**
 * 定义（画面调度）设置菜单关闭事件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/SetClose.ts
 */
/// <reference path="../Event.ts" />
/// <reference path="ISetCloseMetas.ts" />
var Ev;
(function (Ev) {
    var SetClose = (function (_super) {
        __extends(SetClose, _super);
        /**
         * 构造函数。
         */
        function SetClose(metas) {
            _super.call(this, metas);
        }
        /**
         * 获取类型。
         */
        SetClose.prototype.gT = function () {
            return 'set.close';
        };
        return SetClose;
    }(Ev.Event));
    Ev.SetClose = SetClose;
})(Ev || (Ev = {}));
/**
 * 声明（画面调度）设置菜单音量调节事件元信息接口规范。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/ISetVolumeMetas.ts
 */
/// <reference path="../../../include/tsd.d.ts" />
/// <reference path="../../Core/_Sprite/ISet.ts" />
/**
 * 定义（画面调度）设置菜单音量调节事件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/SetVolume.ts
 */
/// <reference path="../Event.ts" />
/// <reference path="ISetVolumeMetas.ts" />
var Ev;
(function (Ev) {
    var SetVolume = (function (_super) {
        __extends(SetVolume, _super);
        /**
         * 构造函数。
         */
        function SetVolume(metas) {
            _super.call(this, metas);
            this.bVolume = metas.bVolume;
            this.eVolume = metas.eVolume;
        }
        /**
         * 获取类型。
         */
        SetVolume.prototype.gT = function () {
            return 'set.volume';
        };
        return SetVolume;
    }(Ev.Event));
    Ev.SetVolume = SetVolume;
})(Ev || (Ev = {}));
/**
 * 定义画面调度设置菜单组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Sprite/Set.ts
 */
/// <reference path="Sprite.ts" />
/// <reference path="../Resource/Resource.ts" />
/// <reference path="../Ev/_Sprite/SetClose.ts" />
/// <reference path="../Ev/_Sprite/SetVolume.ts" />
var Sprite;
(function (Sprite) {
    var Util = __Bigine_Util;
    var G = __Bigine_C2D;
    var Set = (function (_super) {
        __extends(Set, _super);
        /**
         * 构造函数。
         */
        function Set(id, theme) {
            var _this = this;
            var w = 1280, h = 720, raw = Core.IResource.Type.Raw, rr = Resource.Resource, _close = theme['close'], _mask = theme['mask'], _title = theme['title'], _bgm = theme['bgm'], _se = theme['se'];
            _super.call(this, 0, 0, w, h);
            this._pt = theme;
            this._vo = true;
            this._rr = [
                rr.g(_close['i'], raw),
                rr.g(_close['ih'], raw),
                rr.g(_bgm['bar']['i'], raw),
                rr.g(_bgm['bg']['i'], raw),
                rr.g(_bgm['bar']['ih'], raw)
            ];
            this.o(0)
                .a(new G.Color(0, 0, w, h, _mask['cb']).o(_mask['o']))
                .a(new G.Button(_close)
                .b(function () {
                _this.dispatchEvent(new Ev.SetClose({ target: _this }));
            }, new G.Image(this._rr[1].o(), _close, true), new G.Image(this._rr[0].o(), _close, true))).a(new G.Text(_title, _title['s'], _title['lh'], this.$a(_title['a']), true)
                .tc(_title['c'])
                .a(new G.TextPhrase('声音设定'))).a(new G.Text(_bgm['name'], _bgm['name']['s'], _bgm['name']['lh'], this.$a(_bgm['name']['a']), true)
                .tc(_bgm['name']['c'])
                .a(new G.TextPhrase('音乐'))).a(new G.Button(_bgm['bar'])
                .b(function (event) {
                _this.sv(event['x'], 'bgm');
            }, new G.Image(this._rr[2].o(), _bgm['bar'], true), new G.Image(this._rr[2].o(), _bgm['bar'], true))).a(new G.Image(this._rr[3].o(), _bgm['bg'], true))
                .a(this._xb = new G.Text(_bgm['volume'], _bgm['volume']['s'], _bgm['volume']['lh'], this.$a(_bgm['volume']['a']), true)).a(new G.Text(_se['name'], _se['name']['s'], _se['name']['lh'], this.$a(_se['name']['a']), true)
                .tc(_se['name']['c'])
                .a(new G.TextPhrase('音效'))).a(new G.Button(_se['bar'])
                .b(function (event) {
                _this.sv(event['x'], 'se');
            }, new G.Image(this._rr[2].o(), _se['bar'], true), new G.Image(this._rr[2].o(), _se['bar'], true))).a(new G.Image(this._rr[3].o(), _se['bg'], true))
                .a(this._xe = new G.Text(_se['volume'], _se['volume']['s'], _se['volume']['lh'], this.$a(_se['volume']['a']), true));
        }
        /**
         * 调节音乐/音效。
         */
        Set.prototype.sv = function (x, voice) {
            if (!this._vo)
                return;
            var gBound = Util.clone(this._pt[voice]['bar']), width = Math.max(gBound['x'], Math.min(x, gBound['w'] + gBound['x'])) - gBound['x'], count = Math.round(width / this._pt[voice]['bar']['w'] * 100);
            if (count <= 2) {
                count = gBound['w'] = 0;
            }
            else if (count >= 98) {
                count = 100;
            }
            else {
                gBound['w'] = width;
            }
            switch (voice) {
                case 'bgm':
                    this._vb = count;
                    this._xb.c().a(new G.TextPhrase(this._vb.toString()));
                    if (this._ib) {
                        this.e(this._ib);
                        this._ib = undefined;
                    }
                    if (count != 0)
                        this.a(this._ib = new G.Image(this._rr[4].o(), gBound, true));
                    break;
                case 'se':
                    this._ve = count;
                    this._xe.c().a(new G.TextPhrase(this._ve.toString()));
                    if (this._ie) {
                        this.e(this._ie);
                        this._ie = undefined;
                    }
                    if (count != 0)
                        this.a(this._ie = new G.Image(this._rr[4].o(), gBound, true));
                    break;
            }
            this.dispatchEvent(new Ev.SetVolume({ target: this, bVolume: this._vb, eVolume: this._ve }));
        };
        /**
         * 显示音乐/音效调节。
         */
        Set.prototype.vv = function (bVolume, eVolume, on, duration) {
            this._vo = on;
            if (!this._vo)
                bVolume = eVolume = 0;
            this._vb = Math.round(bVolume * 100);
            this._ve = Math.round(eVolume * 100);
            this._xb.c().a(new G.TextPhrase(this._vb.toString()));
            this._xe.c().a(new G.TextPhrase(this._ve.toString()));
            var bBound = Util.clone(this._pt['bgm']['bar']), eBound = Util.clone(this._pt['se']['bar']);
            bBound['w'] = Math.round(bVolume * bBound['w']);
            eBound['w'] = Math.round(eVolume * eBound['w']);
            if (this._ib) {
                this.e(this._ib);
                this._ib = undefined;
            }
            if (this._ie) {
                this.e(this._ie);
                this._ie = undefined;
            }
            if (this._vb != 0)
                this.a(this._ib = new G.Image(this._rr[4].o(), bBound, true));
            if (this._ve != 0)
                this.a(this._ie = new G.Image(this._rr[4].o(), eBound, true));
            return this.v(duration);
        };
        return Set;
    }(Sprite.Sprite));
    Sprite.Set = Set;
})(Sprite || (Sprite = {}));
/**
 * 定义画面调度评分组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Sprite/Stars.ts
 */
/// <reference path="Sprite.ts" />
var Sprite;
(function (Sprite) {
    var G = __Bigine_C2D;
    var Stars = (function (_super) {
        __extends(Stars, _super);
        /**
         * 构造函数。
         */
        function Stars(theme) {
            var w = 1280, h = 720, raw = Core.IResource.Type.Raw, rr = Resource.Resource, _name = theme['name'], _value = theme['value'], _pic = theme['pic'], center = G.Text.Align.Center;
            _super.call(this, 0, 0, w, h);
            this._rr = [
                rr.g(_pic['1'], raw),
                rr.g(_pic['2'], raw),
                rr.g(_pic['3'], raw),
                rr.g(_pic['4'], raw),
                rr.g(_pic['5'], raw)
            ];
            // 渲染评分初始样式
            this.o(0)
                .a(this._xs = new G.Sprite({ x: 0, y: 0, w: w, h: h }))
                .a(this._nt = new G.Text(_name, _name['s'], _name['lh'], center))
                .a(this._vt = new G.Text(_value, _value['s'], _value['lh'], center));
        }
        /**
         * 设置名称、数据值。
         */
        Stars.prototype.u = function (key, name, value) {
            this._xs.c().a(new G.Image(this._rr[key].o(), { x: 0, y: 0, w: 1280, h: 720 }));
            this._nt.c().a(new G.TextPhrase(name));
            this._vt.c().a(new G.TextPhrase(value));
            return this;
        };
        return Stars;
    }(Sprite.Sprite));
    Sprite.Stars = Stars;
})(Sprite || (Sprite = {}));
/**
 * 定义Loading信息组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Sprite/Loading.ts
 */
/// <reference path="Sprite.ts" />
var Sprite;
(function (Sprite) {
    var Util = __Bigine_Util;
    var G = __Bigine_C2D;
    var Loading = (function (_super) {
        __extends(Loading, _super);
        /**
         * 构造函数。
         */
        function Loading(theme) {
            var w = 1280, h = 720, _text = theme['text'];
            _super.call(this, 0, 0, w, h);
            this._rr = [
                Resource.Resource.g('_/loading.png', Core.IResource.Type.Raw)
            ];
            this._ws = theme['words'] || {};
            this._si = undefined;
            this.o(0)
                .a(this._gi = new G.Image(this._rr[0].o(), 0, 0, w, h))
                .a(new G.Text(_text, _text['s'], _text['h'], this.$a(_text['a']))
                .tc(_text['c'])
                .a(this._x = new G.TextPhrase('')));
        }
        /**
         * 设置底层信息。
         */
        Loading.prototype.u = function () {
            var _this = this;
            var speed = 0.05, time = 30, index = 1, max = 0;
            Util.each(this._ws, function (word) {
                max++;
            });
            index = 1 + Math.round(Math.random() * (max - 1));
            this._gi.o(1);
            this._si = setInterval(function () {
                var now = _this._gi.gO();
                speed = (now >= 1 || now <= 0.4) ? (speed * -1) : speed;
                now += speed;
                _this._gi.o(now);
                if (max > 0 && time >= 30) {
                    if (!_this._ws[index])
                        index = 1;
                    _this._x.t(_this._ws[index]);
                    index++;
                    time = 0;
                }
                time++;
            }, 100);
            return this;
        };
        /**
         * 隐藏。
         */
        Loading.prototype.h = function (duration) {
            if (this._si) {
                clearInterval(this._si);
                this._si = undefined;
            }
            return _super.prototype.h.call(this, duration);
        };
        return Loading;
    }(Sprite.Sprite));
    Sprite.Loading = Loading;
})(Sprite || (Sprite = {}));
/**
 * 声明画面调度全屏文本接口规范。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Sprite/IFull.ts
 */
/// <reference path="ISprite.ts" />
/// <reference path="../_Resource/IResource.ts" />
/**
 * 声明（画面调度）全屏文本动画事件元信息接口规范。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/IFullAnimationMetas.ts
 */
/// <reference path="../../../include/tsd.d.ts" />
/// <reference path="../../Core/_Sprite/IFull.ts" />
/**
 * 定义（画面调度）全屏文本动画事件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/FullAnimation.ts
 */
/// <reference path="../Event.ts" />
/// <reference path="IFullAnimationMetas.ts" />
var Ev;
(function (Ev) {
    var FullAnimation = (function (_super) {
        __extends(FullAnimation, _super);
        /**
         * 构造函数。
         */
        function FullAnimation(metas) {
            _super.call(this, metas);
            this.animation = metas.animation;
            this.type = metas.type;
        }
        /**
         * 获取类型。
         */
        FullAnimation.prototype.gT = function () {
            return 'full.animation';
        };
        return FullAnimation;
    }(Ev.Event));
    Ev.FullAnimation = FullAnimation;
})(Ev || (Ev = {}));
/**
 * 定义画面调度全屏文本组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Sprite/Full.ts
 */
/// <reference path="Sprite.ts" />
/// <reference path="../Resource/Resource.ts" />
/// <reference path="../Ev/_Sprite/FullAnimation.ts" />
var Sprite;
(function (Sprite) {
    var Util = __Bigine_Util;
    var G = __Bigine_C2D;
    var Full = (function (_super) {
        __extends(Full, _super);
        /**
         * 构造函数。
         */
        function Full(id, full) {
            var w = 1280, h = 720, raw = Core.IResource.Type.Raw, rr = Resource.Resource, _back = full['back'], _text = full['text'], canvas = document.createElement('canvas');
            _super.call(this, 0, 0, w, h);
            this._rr = [
                rr.g(_back['i'], raw)
            ];
            this._x = {};
            this._cb = Util.clone(_text);
            this._be = _text;
            this._c = _text['ch'];
            this._tl = this._tx = 0;
            canvas.width = 1280;
            canvas.height = 720;
            this._ct = canvas.getContext('2d');
            this._ct.canvas.style.letterSpacing = _text['ls'] + 'px'; // 设置字间距
            this._ct.font = _text['s'] + 'px/' + Math.max(_text['lh'], _text['s']) + 'px ' + G.TextPhrase.FONT;
            this._ct.textBaseline = 'middle';
            this._ct.shadowBlur = this._ct.shadowOffsetX = this._ct.shadowOffsetY = _text['ss'];
            this.o(0)
                .a(new G.Sprite(_back)
                .a(new G.Image(this._rr[0].o(), _back, true))
                .a(this._x['f'] = new G.Sprite(_back))).o(0);
        }
        /**
         * 隐藏。
         */
        Full.prototype.h = function (duration) {
            var _this = this;
            if (this._h) {
                this._h.h();
                this._h = undefined;
                this.dispatchEvent(new Ev.FullAnimation({
                    target: this,
                    animation: undefined,
                    type: undefined
                }));
            }
            return _super.prototype.h.call(this, duration).then(function () {
                _this.$c();
                _this._x['f'].o(0);
                return _this;
            });
        };
        /**
         * 文本。
         */
        Full.prototype.u = function (clob, auto) {
            var _this = this;
            if (auto === void 0) { auto = false; }
            var words = clob.split('\\r'), funcs = [];
            Util.each(words, function (word, index) {
                var bufs = word.split('\\l');
                if (bufs.length == 1) {
                    funcs.push(function () { return _this.every(word, auto, index == words.length - 1); });
                }
                else {
                    var str = word.replace(/\\l/g, '')
                        .replace(/\\n/g, '')
                        .replace(/【#[0-9a-fA-F]{6}/g, '')
                        .replace(/【/g, '')
                        .replace(/】/g, '');
                    var row = Math.ceil(_this._ct.measureText(str).width / _this._be.w);
                    if (_this._tl + row > _this._be['row'])
                        _this.$c(); // 预计会有多少行内容，超出最大行，重起绘制
                    Util.each(bufs, function (buffer, i) {
                        funcs.push(function () { return _this.every(buffer, auto, false, i); });
                    });
                }
            });
            return funcs.reduce(function (previous, current) {
                return previous.then(current);
            }, Promise.resolve());
        };
        /**
         * 对于分解的话进行处理。
         */
        Full.prototype.every = function (clob, auto, wait, pause) {
            var _this = this;
            if (pause === void 0) { pause = -1; }
            var eRow = 0, row, tBound, bBound = this._be, tText, left = G.Text.Align.Left, lHeight = Math.max(bBound['lh'], bBound['s']), sClob;
            while (/^\\n.*/.test(clob)) {
                eRow++;
                clob = clob.substr(2);
            }
            if (eRow > 0) {
                this._cb.y += eRow * lHeight;
                this._tl += eRow;
                this._tx = 0;
            }
            else {
                if (pause > 0 && clob != '')
                    this._cb.y -= lHeight;
            }
            if (clob == '')
                return Promise.resolve(this);
            sClob = clob.replace(/【#[0-9a-fA-F]{6}/g, '')
                .replace(/【/g, '')
                .replace(/】/g, '');
            this._ct.save();
            row = Math.ceil(this._ct.measureText(sClob).width / bBound.w);
            if (this._tl + row > bBound['row'] && pause < 1)
                this.$c(); // 预计会有多少行内容，超出最大行，重起绘制
            tBound = Util.clone(this._cb);
            tText = new G.Text(tBound, tBound['s'], tBound['lh'], left, true)
                .tc(tBound['c'])
                .tl(tBound['ls'])
                .to(pause > 0 ? this._tx : 0)
                .ts(tBound['ss'], tBound['ss'], tBound['ss']);
            this._x['f'].a(tText);
            this.$w(tText.o(0), clob, this._c);
            this._x['f'].o(1);
            return this.$v(tText, auto, pause >= 0 ? true : wait).then(function () {
                if (_this._h) {
                    var pnt = tText.gCp();
                    _this._cb.y = pnt.y;
                    _this._tx = pnt.x - bBound.x;
                    _this._tl = (pnt.y - bBound.y) / lHeight;
                }
                return _this;
            });
        };
        /**
         * 清除文本内容。
         */
        Full.prototype.clean = function () {
            return Promise.resolve(this.$c());
        };
        /**
         * 显示内容文字。
         */
        Full.prototype.$v = function (text, auto, wait) {
            var _this = this;
            this.o(1);
            return new Promise(function (resolve) {
                var aType = new G.Type(1), aWFC;
                if (auto)
                    return text.p(aType).then(function () {
                        resolve();
                    });
                aWFC = new G.WaitForClick(function () {
                    aType.h();
                });
                _this._h = aWFC;
                _this.dispatchEvent(new Ev.FullAnimation({
                    target: _this,
                    animation: aWFC,
                    type: aType
                }));
                Promise.race([
                    text.p(aType).then(function () {
                        aWFC.h();
                    }),
                    _this.p(aWFC)
                ]).then(function () {
                    _this._h = undefined;
                    _this.dispatchEvent(new Ev.FullAnimation({
                        target: _this,
                        animation: undefined,
                        type: undefined
                    }));
                    resolve();
                });
            }).then(function () {
                var animation, target;
                if (wait) {
                    if (auto) {
                        animation = new G.TypeDelay(9);
                        target = text;
                    }
                    else {
                        animation = new G.WaitForClick();
                        target = _this;
                    }
                }
                else {
                    animation = new G.TypeDelay(0.1);
                    target = text;
                }
                _this._h = animation;
                _this.dispatchEvent(new Ev.FullAnimation({
                    target: _this,
                    animation: animation,
                    type: undefined
                }));
                return target.p(animation);
            });
        };
        Full.prototype.$c = function () {
            this._tl = 0;
            this._cb = Util.clone(this._be);
            this._x['f'].c();
            return this;
        };
        return Full;
    }(Sprite.Sprite));
    Sprite.Full = Full;
})(Sprite || (Sprite = {}));
/**
 * 打包所有已定义地画面调度组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Sprite/_pack.ts
 */
/// <reference path="Curtain.ts" />
/// <reference path="Author.ts" />
/// <reference path="Start.ts" />
/// <reference path="Words.ts" />
/// <reference path="Tray.ts" />
/// <reference path="Menu.ts" />
/// <reference path="Slots.ts" />
/// <reference path="Status.ts" />
/// <reference path="Panel.ts" />
/// <reference path="Tip.ts" />
/// <reference path="Choose.ts" />
/// <reference path="CG.ts" />
/// <reference path="SeriesSlots.ts" />
/// <reference path="Set.ts" />
/// <reference path="Stars.ts" />
/// <reference path="Loading.ts" />
/// <reference path="Full.ts" />
/**
 * 定义基于 HTML Canvas 的（运行时）场效调度器组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Runtime/_Director/CanvasDirector.ts
 */
/// <reference path="Director.ts" />
/// <reference path="../../Sprite/_pack.ts" />
/**
 * * b - 背景
 * * M - 地图
 * * c - 人物
 * * L - 加载进度条
 * * e - 完成进度条
 */
var Runtime;
(function (Runtime) {
    var Util = __Bigine_Util;
    var G = __Bigine_C2D;
    var CanvasDirector = (function (_super) {
        __extends(CanvasDirector, _super);
        /**
         * 构造函数。
         */
        function CanvasDirector(runtime) {
            var _this = this;
            _super.call(this, runtime);
            var doc = document, els = doc.querySelectorAll('.bg-work'), canvas = doc.createElement('canvas'), raw = Core.IResource.Type.Raw, bounds = CanvasDirector.BOUNDS, assets = '_/';
            canvas.width = bounds.w;
            canvas.height = bounds.h;
            canvas.className = 'viewport';
            if (!els.length) {
                this._d = true;
                els = [doc.createElement('div')];
                els[0].className = 'bg-work dynamic';
                doc.body.appendChild(els[0]);
            }
            els[0].appendChild(canvas);
            this._x = {};
            this._c = new G.Stage(canvas.getContext('2d'))
                .a(new G.Color(bounds, '#000').i('b'))
                .a(new G.Sprite(bounds).i('M').o(0))
                .a(new G.Sprite(bounds).i('c').o(0))
                .a(this._x['c'] = new Sprite.Curtain())
                .a(new G.Sprite(0, bounds.h - 12, bounds.w, 12)
                .a(new G.Color(0, 0, bounds.w, 12, '#e7e7e7'))
                .a(new G.Color(0, 1, bounds.w, 10, '#0cf').i('e')).i('L').o(0));
            this.f();
            this._vo = true;
            this._ca = [undefined, undefined];
            this._pc = undefined;
            this._fd = false;
            this._ft = undefined;
            this._i = {
                o: Resource.Resource.g(assets + 'logo.png', raw),
                s: Resource.Resource.g(assets + 'oops.mp3', raw),
                f: Resource.Resource.g(assets + 'focus.mp3', raw),
                c: Resource.Resource.g(assets + 'click.mp3', raw)
            };
            this._s = {
                b: new Audio(),
                e: new Audio(),
                s: new Audio()
            };
            this._s['b'].autoplay = this._s['e'].autoplay = this._s['s'].autoplay = true;
            this._s['b'].loop = this._s['s'].loop = true;
            this._s['b'].src = this._s['s'].src = this._i['s'].l();
            this._s['b']['baseVolume'] = this._s['e']['baseVolume'] = this._s['s']['baseVolume'] = 1;
            this._s['b']['scale'] = this._s['e']['scale'] = this._s['s']['scale'] = 1;
            this._s['e']['cd'] = -1;
            this._f = {};
            this._e = [0, 0];
            this._l = function (event) {
                if ((event.keyCode == 13 || event.keyCode == 88) && !_this._a && _this._t && !_this._pc) {
                    if (_this._ft)
                        _this._ft.h();
                    _this._t.h();
                }
            };
            this._fs = Core.IRuntime.Series.Alone;
            window.addEventListener('keydown', this._l);
        }
        /**
         * 预加载指定资源组。
         *
         * @param resources 一个（作品）事件所包含地所有资源
         */
        CanvasDirector.prototype.c = function (resources) {
            var _this = this;
            var gLoading = this._c.q('L')[0], gElapsed = gLoading.q('e')[0], bounds = CanvasDirector.BOUNDS, progress = function (done) {
                var e = _this._e;
                e[0 + done]++;
                if (e[0] == e[1]) {
                    _this._e = [0, 0];
                    return gLoading.o(0);
                }
                gElapsed.x((e[1] / e[0] - 1) * bounds.w);
                gLoading.o(1);
            };
            Util.each(resources, function (frame) {
                Util.each(frame, function (resource) {
                    progress(false);
                    resource.w(function (value) {
                        progress(true);
                    });
                });
            });
            return Resource.Prefecher.c(resources, this._r.gL());
        };
        /**
         * 加载动画。
         */
        CanvasDirector.prototype.Load = function (loaded, theme) {
            if (loaded) {
                if (!this._x['ld'])
                    this._c.a(this._x['ld'] = new Sprite.Loading(theme));
                this._x['ld'].u().v(0);
                return _super.prototype.Load.call(this, loaded);
            }
            else {
                if (this._x['ld'])
                    this._x['ld'].h(0);
                return _super.prototype.Load.call(this, loaded);
            }
        };
        /**
         * 开始动画。
         */
        CanvasDirector.prototype.OP = function (start, title, author) {
            var _this = this;
            var series = Core.IRuntime.Series.Rest == this._fs || Core.IRuntime.Series.Last == this._fs;
            this._x['s'].u(title, series, this._c);
            this._x['m'].u(series);
            return this.c([[this._i['o']]])
                .then(function () { return _this.reset(); })
                .then(function () {
                var gLogo = new G.Image(_this._i['o'].o(), CanvasDirector.BOUNDS);
                _this._c.z()
                    .a(gLogo, _this._x['c']);
                return _this.lightOn()
                    .then(function () { return gLogo.p(new G.Delay(1000)); })
                    .then(function () { return _this.lightOff(); })
                    .then(function () {
                    _this._c.e(gLogo);
                    if (!author && !title)
                        return;
                    var gAuthor = _this._x['a'].u(author ? author : title);
                    gAuthor.v(0);
                    return _this.lightOn()
                        .then(function () { return gAuthor.p(new G.Delay(1000)); })
                        .then(function () { return _this.lightOff(); })
                        .then(function () { return gAuthor.o(0); });
                }).then(function () { return _super.prototype.OP.call(_this, start, title, author); })
                    .then(function (runtime) {
                    if (!_this._a)
                        _this._x['t'].v(0);
                    if (!start)
                        return runtime;
                    _this._x['s'].v(0);
                    return _this.lightOn();
                });
            });
        };
        /**
         * 完结动画。
         */
        CanvasDirector.prototype.ED = function () {
            var _this = this;
            return this.lightOff()
                .then(function () {
                _this.playMusic(Core.IResource.Type.BGM);
                _this.playMusic(Core.IResource.Type.ESM);
                _this.playSE();
                _this._r.dispatchEvent(new Ev.Fin({
                    target: _this._r.gE()
                }));
                _this._x['t'].h(0);
                return _super.prototype.ED.call(_this);
            }).then(function () { return _this.$s(); });
        };
        /**
         * 连载存档。
         */
        CanvasDirector.prototype.$s = function () {
            var _this = this;
            if (Core.IRuntime.Series.Alone == this._fs)
                return Promise.resolve(this._r);
            return new Promise(function (resolve) {
                var $c = 'slots.close', $s = 'slots.save', close, save;
                close = function () {
                    _this._x['ss'].removeEventListener($s, save);
                    _this._x['ss'].removeEventListener($c, close);
                    resolve(_this._r);
                };
                save = function () {
                    _this._x['ss'].removeEventListener($s, save);
                    _this._x['ss'].removeEventListener($c, close);
                    resolve(_this._r);
                };
                _this.lightOn().then(function () {
                    var callback = function () {
                        _this._x['ss']
                            .addEventListener($c, close)
                            .addEventListener($s, save).vs(_this._r, _this._fs);
                    };
                    _this._r.gS().e('auto', true, callback);
                });
            }).then(function () { return _this.lightOff(); });
        };
        /**
         * 人物出场。
         */
        CanvasDirector.prototype.charOn = function (resource, position) {
            var _this = this;
            var states = this._r.gS(), gChars = this._c.q('c')[0], kamount = '$c', gChar = this.$c(resource, position);
            states.s(kamount, 1 + (states.g(kamount) || 0));
            gChars.a(gChar.i(position));
            if (this._x['G'].gO()) {
                gChar.o(1);
                return this._p;
            }
            gChars.o(1);
            return gChar.p(new G.FadeIn(500))
                .then(function () { return _this._r; });
        };
        /**
         * 人物离场。
         */
        CanvasDirector.prototype.charOff = function (position) {
            var _this = this;
            var states = this._r.gS(), kamount = '$c', amount = states.g(kamount), gChars = this._c.q('c')[0], gChar = gChars.q(position)[0];
            if (gChar) {
                states.s(kamount, --amount);
                return gChar.p(new G.FadeOut(500)).then(function () {
                    gChars.e(gChar);
                    if (!amount)
                        gChars.o(0);
                    return _this._r;
                });
            }
            return this._p;
        };
        /**
         * 设置人物。
         */
        CanvasDirector.prototype.charSet = function (resource, position) {
            var _this = this;
            var states = this._r.gS(), kamount = '$c', gChars = this._c.q('c')[0], gOld = gChars.q(position)[0], gNew;
            gNew = this.$c(resource, position).o(0).i(position);
            gChars.a(gNew);
            if (!this._x['G'].gO())
                gChars.o(1);
            if (this._ca[1] == 'Gradient') {
                if (gOld) {
                    return Promise.all([
                        gOld.p(new G.FadeOut(500)),
                        gNew.p(new G.FadeIn(500))
                    ]).then(function () {
                        gChars.e(gOld);
                        return _this._r;
                    });
                }
                else {
                    return gNew.p(new G.FadeIn(500)).then(function () {
                        states.s(kamount, 1 + (states.g(kamount) || 0));
                        return _this._r;
                    });
                }
            }
            else {
                if (gOld) {
                    gChars.e(gOld);
                }
                else
                    states.s(kamount, 1 + (states.g(kamount) || 0));
                gNew.o(1);
                return this._p;
            }
        };
        /**
         * 人物移动。
         */
        CanvasDirector.prototype.charMove = function (from, to) {
            var _this = this;
            var gChars = this._c.q('c')[0], gChar = gChars.q(from)[0], x = this.$x(to);
            if (!gChar)
                return this._p;
            return gChar.p(new G.Move(500, {
                x: x,
                y: gChar.gB().y
            })).then(function () {
                gChar.i(to);
                return _this._r;
            });
        };
        /**
         * 创建立绘。
         */
        CanvasDirector.prototype.$c = function (resource, position) {
            // 为防止立绘随着镜头的缩放而缩放，这里的立绘显示暂设定为固定IBounds{ x: 0, y: 0, w: 1280, h: 720 }
            //var bounds: G.IBounds = CanvasDirector.BOUNDS,
            var bounds = { x: 0, y: 0, w: 1280, h: 720 }, x = this.$x(position);
            // 为防止立绘在镜头的变化过程中错位，这里暂使用绝对定位（第六个参数设为true）
            return new G.Image(resource.o(), x, 0, bounds.w, bounds.h, true)
                .i(position)
                .o(0);
        };
        /**
         * 计算立绘位置 x 坐标。
         */
        CanvasDirector.prototype.$x = function (position) {
            var pos = Core.IDirector.Position, x = 0;
            switch (position) {
                case pos.LLeft:
                    x = -600;
                    break;
                case pos.Left:
                    x = -400;
                    break;
                case pos.CLeft:
                    x = -200;
                    break;
                case pos.Center:
                    x = 0;
                    break;
                case pos.CRight:
                    x = 200;
                    break;
                case pos.Right:
                    x = 400;
                    break;
                case pos.RRight:
                    x = 600;
                    break;
            }
            return x;
        };
        /**
         * 某白。
         */
        CanvasDirector.prototype.words = function (words, theme, who, avatar) {
            var _this = this;
            if (this._fd) {
                return theme == 'voiceover' ? this.full(words) : _super.prototype.words.call(this, words, theme);
            }
            else {
                var sprite_1 = this._x['W'];
                return this._x['c'].h(20).then(function () {
                    var type = theme[0];
                    if ('v' == type)
                        return sprite_1.vv(words, _this._a);
                    return sprite_1['v' + type](avatar, who, words, _this._a);
                }).then(function () {
                    sprite_1.h(0);
                    return _this._r;
                });
            }
        };
        /**
         * 某白在全屏中显示。
         */
        CanvasDirector.prototype.full = function (words) {
            var _this = this;
            return this.lightOn().then(function () {
                return _this._x['F'].u(words, _this._a);
            }).then(function () { return _this._r; });
        };
        /**
         * 全屏文本 开 / 关。
         */
        CanvasDirector.prototype.fullWords = function (on) {
            var _this = this;
            if (on) {
                this._fd = true;
                return _super.prototype.fullWords.call(this, on);
            }
            else {
                return _super.prototype.fullWords.call(this, on).then(function (runtime) {
                    _this._fd = false;
                    _this._x['F'].h();
                    return _this._r;
                });
            }
        };
        /**
         * 清除全屏文本。
         */
        CanvasDirector.prototype.fullClean = function () {
            var _this = this;
            return _super.prototype.fullClean.call(this).then(function (runtime) {
                _this._x['F'].clean();
                return _this._r;
            });
        };
        /**
         * 隐藏全屏文本。
         */
        CanvasDirector.prototype.fullHide = function () {
            var _this = this;
            return _super.prototype.fullHide.call(this).then(function (runtime) {
                _this._x['F'].o(0);
                return _this._r;
            });
        };
        /**
         * 提示。
         */
        CanvasDirector.prototype.tip = function (words) {
            var _this = this;
            var gTip = this._x['T'];
            return this.lightOn()
                .then(function () { return gTip.u(words).v(); })
                .then(function () { return gTip.p(new G.WaitForClick()); })
                .then(function () { return gTip.h(); })
                .then(function () { return _this._r; });
        };
        ;
        /**
         * 评分动画。
         */
        CanvasDirector.prototype.stars = function (rank, grade, value) {
            var _this = this;
            var stars = this._x['sr'], key = rank, score = parseInt(value, 10) || 0;
            return this.lightOff()
                .then(function () {
                _this._r.dispatchEvent(new Ev.Rank({
                    target: _this._r.gE(),
                    grade: grade,
                    score: score
                }));
                _this._x['t'].h(0);
                stars.u(key, _this._r.nickname(), value).v();
                return _this.lightOn();
            }).then(function () { return stars.p(new G.Delay(2000)); })
                .then(function () { return _this.lightOff(); })
                .then(function () {
                stars.h(0);
                return _this._r;
            });
        };
        /**
         * 播放 背景音乐 / 环境音乐。
         */
        CanvasDirector.prototype.playMusic = function (type, resource, vol) {
            var _this = this;
            var oops = this._i['s'].l(), url = resource ? resource.l() : oops, music = type == Core.IResource.Type.BGM ? this._s['b'] : this._s['s'], volume = music['baseVolume'] * (vol || 1), change = function () {
                music['scale'] = vol || 1;
                music.volume = volume;
                if (music.src != url)
                    music.src = url;
                return _super.prototype.playMusic.call(_this, type, resource, vol);
            };
            if (!resource)
                music.play();
            if (music.src && music.src != oops)
                return new G.AudioFadeOut(1500).p(music).then(change);
            return change();
        };
        /**
         * 播放音效。
         */
        CanvasDirector.prototype.playSE = function (resource, vol) {
            var _this = this;
            var url = (resource || this._i['s']).l(), se = this._s['e'], type = 'ended', resume = function () {
                se.removeEventListener(type, resume);
                _this._s['b'].play();
                _this._s['s'].play();
            };
            se.addEventListener(type, resume);
            se.volume = se['baseVolume'] * (vol || 1);
            se.src = url;
            if (!resource)
                this._s['e'].play();
            return _super.prototype.playSE.call(this, resource, vol);
        };
        /**
         * 设置音量。
         */
        CanvasDirector.prototype.volumeSet = function (type, vol) {
            var mType = Core.IResource.Type;
            var mMusic;
            switch (type) {
                case mType.BGM:
                    mMusic = this._s['b'];
                    break;
                case mType.ESM:
                    mMusic = this._s['s'];
                    break;
                case mType.SE:
                    mMusic = this._s['e'];
                    break;
            }
            mMusic['scale'] = vol;
            new G.AudioFade(1500, vol * mMusic['baseVolume']).p(mMusic);
            return _super.prototype.volumeSet.call(this, type, vol);
        };
        /**
         * 关闭特写。
         */
        CanvasDirector.prototype.hideCG = function () {
            var _this = this;
            return _super.prototype.hideCG.call(this).then(function (runtime) {
                var gCG = _this._x['G'], gChars = _this._c.q('c')[0];
                return Promise.all([
                    gChars.p(new G.FadeIn(500)),
                    gCG.h()
                ]).then(function () {
                    if (!_this._r.gS().g('$c'))
                        gChars.o(0);
                    return runtime;
                });
            });
        };
        /**
         * 展示特写。
         */
        CanvasDirector.prototype.showCG = function (resource) {
            var _this = this;
            return _super.prototype.showCG.call(this, resource).then(function (runtime) {
                var gChars = _this._c.q('c')[0], gCG = _this._x['G'];
                return _this.lightOn()
                    .then(function () {
                    return Promise.all([
                        gChars.p(new G.FadeOut(500)),
                        gCG.u(resource).v()
                    ]).then(function () { return gCG.p(_this._h = new G.WaitForClick()); });
                }).then(function () { return runtime; });
            });
        };
        /**
         * 设置房间。
         */
        CanvasDirector.prototype.asRoom = function (resource, time, map) {
            var _this = this;
            if (time === void 0) { time = false; }
            if (map === void 0) { map = false; }
            return _super.prototype.asRoom.call(this, resource)
                .then(function (runtime) {
                // 强制复位
                var camera = runtime.gS().g('.z');
                var gOld = _this._c.q('b')[0];
                if (camera) {
                    gOld.x(0).y(0).sW(1280).sH(720);
                    runtime.gS().d('.z');
                    runtime.gS().d('_z');
                }
                var gNew = new G.Image(resource.o(), CanvasDirector.BOUNDS).i('b')
                    .o(0);
                _this._c.a(gNew, 'M');
                if (time) {
                    return gNew.p(new G.FadeIn(500)).then(function () {
                        _this._c.e(gOld);
                        return runtime;
                    });
                }
                if (!_this._ca[0] || map) {
                    return _this.lightOn().then(function () {
                        _this._c.e(gOld);
                        gNew.o(1);
                        return runtime;
                    });
                }
                // 进入房间特效
                return _this.$ca(gOld, gNew);
            });
        };
        /**
         * 进入房间特效。
         */
        CanvasDirector.prototype.$ca = function (gOld, gNew) {
            var _this = this;
            var gCurtain = this._x['c'], curtain;
            switch (this._ca[0]) {
                case 'Fade':
                    return gCurtain.v(500)
                        .then(function () {
                        gOld.o(0);
                        _this.lightOn();
                    }).then(function () {
                        gNew.p(new G.FadeIn(500));
                        _this._c.e(gOld);
                        return _this._r;
                    });
                case 'ShutterH':
                    curtain = new G.Shutter(1000, { direction: 'H' });
                    break;
                case 'ShutterV':
                    curtain = new G.Shutter(1000, { direction: 'V' });
                    break;
                case 'Gradient':
                    return gNew.p(new G.FadeIn(500)).then(function () {
                        _this._c.e(gOld);
                        return _this._r;
                    });
                default:
                    return this.lightOn().then(function () {
                        _this._c.e(gOld);
                        gNew.o(1);
                        return _this._r;
                    });
            }
            return this.lightOn()
                .then(function () {
                return gNew.p(curtain);
            }).then(function () {
                _this._c.e(gOld);
                gNew.o(1);
                return _this._r;
            });
        };
        /**
         * 设置地图。
         */
        CanvasDirector.prototype.asMap = function (points) {
            var _this = this;
            var gMap = this._c.q('M')[0], gPoints = [], bounds = CanvasDirector.BOUNDS, gPoint, z, added;
            Util.each(points, function (point) {
                z = point.gZ();
                gPoint = new G.Button(point.gX(), point.gY(), point.gW(), point.gH())
                    .b(function () {
                    _this.playSE(_this._i['c']);
                    point.p(_this._r);
                }, new G.Image(point.o().o(), bounds, true))
                    .addEventListener('$focus', function () {
                    _this.playSE(_this._i['f']);
                });
                added = Util.some(gPoints, function (item, index) {
                    if (z >= item[0])
                        return false;
                    gPoints.splice(index, 0, [z, gPoint]);
                    return true;
                });
                if (!added)
                    gPoints.push([z, gPoint]);
            });
            gMap.c()
                .o(1);
            Util.each(gPoints, function (item) {
                gMap.a(item[1]);
            });
            return this._p;
        };
        /**
         * 关灯（落幕）。
         */
        CanvasDirector.prototype.lightOff = function () {
            var _this = this;
            return this._x['c'].v().then(function () { return _this._r; });
        };
        /**
         * 开灯（开幕）。
         */
        CanvasDirector.prototype.lightOn = function () {
            var _this = this;
            return this._x['c'].h().then(function () { return _this._r; });
        };
        /**
         * 选择。
         */
        CanvasDirector.prototype.choose = function (options) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this._q = function () {
                    E.doHalt()['catch'](function (error) {
                        reject(error);
                    });
                };
                var gChoose = _this._x['C'], event = 'choose', states = _this._r.gS(), handler = function () {
                    if (_this._pc) {
                        var option_1 = _this._pc, isPay = void 0, amount_1;
                        if (option_1.gI()) {
                            isPay = states.qp(option_1.gI(), option_1.gM());
                            option_1.sA(isPay);
                        }
                        amount_1 = option_1.gA() ? 0 : option_1.gM();
                        if (!amount_1) {
                            option_1.p(_this._r);
                            gChoose.removeEventListener(event, handler);
                            gChoose.h().then(function () {
                                resolve(_this._r);
                            });
                            _this._pc = undefined;
                        }
                        else {
                            var id_1 = option_1.gI(), fail = function () { return; }, suc = function () {
                                option_1.p(_this._r);
                                states.ep(id_1, amount_1);
                                gChoose.removeEventListener(event, handler);
                                gChoose.h().then(function () {
                                    resolve(_this._r);
                                });
                                _this._pc = undefined;
                            };
                            _this._r.dispatchEvent(new Ev.PayOption({
                                target: states,
                                amount: amount_1,
                                id: id_1,
                                suc: suc,
                                fail: fail
                            }));
                        }
                    }
                };
                gChoose.u(options, _this._c).addEventListener(event, handler);
                _this.lightOn()
                    .then(function () { return gChoose.v(); });
            });
        };
        /**
         * 重置状态。
         */
        CanvasDirector.prototype.reset = function () {
            var _this = this;
            return _super.prototype.reset.call(this).then(function (runtime) {
                var gBack = _this._c.q('b')[0], gColor = new G.Color(CanvasDirector.BOUNDS, '#000');
                // 需要先删除旧选择再添加新选择，否则在选择处读档时，时序流中断(因为未删除监听事件)
                _this._c.e(_this._x['C']);
                _this._x['C'] = new Sprite.Choose('', _this._pt['choose'])
                    .addEventListener('choose', function (ev) {
                    _this._pc = ev.choice;
                });
                _this._c.a(_this._x['C'], _this._x['t']);
                _this._c.a(gColor, gBack)
                    .e(gBack);
                gColor.i('b');
                _this._c.q('M')[0].c();
                _this._c.q('c')[0].c()
                    .o(0);
                _this._pc = undefined;
                _this._fd = false;
                _this._x['G'].h(0);
                _this._x['W'].h(0);
                _this._x['F'].h(0);
                _this._x['T'].h(0);
                _this._x['C'].h(0);
                return runtime;
            });
        };
        /**
         * （读档继续时）设置特写。
         */
        CanvasDirector.prototype.setCG = function (resource) {
            var _this = this;
            return _super.prototype.setCG.call(this, resource).then(function (runtime) {
                _this._x['G'].u(resource).v(0);
                return runtime;
            });
        };
        /**
         * 停顿。
         */
        CanvasDirector.prototype.pause = function (milsec) {
            var _this = this;
            if (milsec) {
                return this._c.p(new G.Delay(milsec)).then(function () {
                    return _super.prototype.pause.call(_this, milsec);
                });
            }
            else {
                // 建立临时透明层，使得可以响应WaitForClick事件。
                var sPause_1 = new G.Sprite(CanvasDirector.BOUNDS, false);
                this._c.a(sPause_1.i('P').o(1));
                return sPause_1.p(new G.WaitForClick()).then(function () {
                    _this._c.e(sPause_1);
                    return _super.prototype.pause.call(_this, milsec);
                });
            }
        };
        /**
         * 切幕动画。
         */
        CanvasDirector.prototype.curtain = function (name) {
            this._ca[0] = name;
            return _super.prototype.curtain.call(this, name);
        };
        /**
         * 移动镜头。
         */
        CanvasDirector.prototype.cameraMove = function (mx, my, ms) {
            var _this = this;
            var gRoom = this._c.q('b')[0], x = Math.round(mx * (1 - 5 / 3) * 1280), y = Math.round(my * (1 - 5 / 3) * 720);
            if (!gRoom)
                return this._p;
            var sClick = new G.Sprite(CanvasDirector.BOUNDS, false); // 建立临时透明层，使得可以响应WaitForClick事件。
            this._c.a(sClick.i('P').o(1));
            return new Promise(function (resolve) {
                var aMove = new G.Move(ms, { x: x, y: y }), aWFC = new G.WaitForClick(function () {
                    aMove.h();
                });
                _this._t = _this._h = aWFC;
                Promise.race([
                    gRoom.p(aMove).then(function () {
                        aWFC.h();
                    }),
                    sClick.p(aWFC)
                ]).then(function () {
                    _this._c.e(sClick);
                    _this._t = _this._h = undefined;
                    aMove.h();
                    gRoom.x(x).y(y);
                    resolve(_this._r);
                });
            });
        };
        /**
         * 放大/缩小镜头。
         */
        CanvasDirector.prototype.cameraZoom = function (mx, my, ms, scale) {
            var _this = this;
            var gRoom = this._c.q('b')[0], bound = gRoom.gB();
            if (!gRoom)
                return this._p;
            var sClick = new G.Sprite(CanvasDirector.BOUNDS, false); // 建立临时透明层，使得可以响应WaitForClick事件。
            this._c.a(sClick.i('P').o(1));
            return new Promise(function (resolve) {
                var aZoom = new G.Zoom(ms, { mx: mx, my: my, scale: scale }), aWFC = new G.WaitForClick(function () {
                    aZoom.h();
                });
                _this._t = _this._h = aWFC;
                Promise.race([
                    gRoom.p(aZoom).then(function () {
                        aWFC.h();
                    }),
                    sClick.p(aWFC)
                ]).then(function () {
                    _this._c.e(sClick);
                    _this._t = _this._h = undefined;
                    aZoom.h();
                    var px = scale * (5 / 3 - 1) * 1280, py = scale * (5 / 3 - 1) * 720;
                    gRoom.x(Math.round(bound.x - mx * px))
                        .y(Math.round(bound.y - my * py))
                        .sW(Math.round(bound.w + px))
                        .sH(Math.round(bound.h + py));
                    resolve(_this._r);
                });
            });
        };
        /**
         * 抖动镜头。
         */
        CanvasDirector.prototype.cameraShake = function () {
            var gRoom = this._c.q('b')[0];
            gRoom.p(new G.Shake(500));
            return _super.prototype.cameraShake.call(this);
        };
        /**
         * 状态栏开/关。
         */
        CanvasDirector.prototype.status = function (onoff) {
            var gStatus = this._x['S'];
            onoff ? gStatus.v(0) : gStatus.h(0);
            return _super.prototype.status.call(this, onoff);
        };
        /**
         * 切幕动画。
         */
        CanvasDirector.prototype.expression = function (name) {
            this._ca[1] = name;
            return _super.prototype.expression.call(this, name);
        };
        /**
         * 使用主题。
         */
        CanvasDirector.prototype.t = function (id, theme) {
            var _this = this;
            var resources = [], gCurtain = this._x['c'], slotsFromStart = false, states = this._r.gS();
            this._pt = theme;
            // 特写。
            this._c.a(this._x['G'] = new Sprite.CG(theme['cg']), gCurtain);
            // 状态。
            this._x['S'] = new Sprite.Status(id, theme['status']);
            resources.unshift(this._x['S'].l());
            this._c.a(this._x['S'], gCurtain);
            // 某白。
            this._x['W'] = new Sprite.Words(id, theme['voiceover'], theme['monolog'], theme['speak'])
                .addEventListener('words.animation', function (ev) {
                _this._t = _this._h = ev.animation;
            });
            resources.unshift(this._x['W'].l());
            this._c.a(this._x['W'], gCurtain);
            // 全屏文本。
            this._x['F'] = new Sprite.Full(id, theme['full'])
                .addEventListener('full.animation', function (ev) {
                _this._t = _this._h = ev.animation;
                _this._ft = ev.type;
            });
            resources.unshift(this._x['F'].l());
            this._c.a(this._x['F'], gCurtain);
            // 选择。
            this._x['C'] = new Sprite.Choose(id, theme['choose']);
            resources.unshift(this._x['C'].l());
            this._c.a(this._x['C'], gCurtain);
            // 常驻按钮。
            this._x['t'] = new Sprite.Tray(id, theme['tray'])
                .addEventListener('tray.menu', function () {
                _this._x['m'].v();
                _this._x['t'].h();
            }).addEventListener('tray.panel', function () {
                _this._x['P'].v();
                _this._x['t'].h();
            });
            resources.unshift(this._x['t'].l());
            this._c.a(this._x['t'], gCurtain);
            // 提示。
            this._x['T'] = new Sprite.Tip(id, theme['tip']);
            resources.unshift(this._x['T'].l());
            this._c.a(this._x['T'], gCurtain);
            // 面板。
            this._x['P'] = new Sprite.Panel(id, theme['panel'])
                .addEventListener('panel.close', function () {
                _this._x['t'].v();
                _this._x['P'].h();
            });
            resources.unshift(this._x['P'].l());
            this._c.a(this._x['P'], gCurtain);
            // 功能菜单。
            this._x['m'] = new Sprite.Menu(id, theme['menu'])
                .addEventListener('menu.close', function () {
                _this._x['t'].v();
                _this._x['m'].h();
            }).addEventListener('menu.save', function () {
                slotsFromStart = false;
                _this._x['sl'].vs(_this._r)
                    .then(function () {
                    _this._x['m'].h(0);
                })['catch'](function () {
                    return;
                });
            }).addEventListener('menu.load', function () {
                slotsFromStart = false;
                _this._x['sl'].vl(_this._r)
                    .then(function () {
                    _this._x['m'].h(0);
                })['catch'](function () {
                    return;
                });
            }).addEventListener('menu.set', function () {
                _this._x['st'].vv(_this._s['b']['baseVolume'], _this._s['e']['baseVolume'], _this._vo)
                    .then(function () {
                    _this._x['m'].h(0);
                })['catch'](function () {
                    return;
                });
            }).addEventListener('menu.replay', function () {
                _this._x['m'].h();
                _this._t = _this._h = undefined;
                _this._r.stop();
                _this._x['s'].u(_this._r.gTitle(), true, _this._c).v(0);
            });
            resources.unshift(this._x['m'].l());
            this._c.a(this._x['m'], gCurtain);
            // 开始菜单。
            this._x['s'] = new Sprite.Start(id, theme['start'])
                .addEventListener('start.new', function (event) {
                _this.playSE(_this._i['c']);
                _this.lightOff().then(function () {
                    event.target.h(0);
                    _this._r.dispatchEvent(new Ev.Begin({ target: _this._r.gE() }));
                });
            }).addEventListener('start.series', function (event) {
                slotsFromStart = true;
                _this.playSE(_this._i['c']);
                _this._x['ss'].vl(_this._r);
            }).addEventListener('start.load', function (event) {
                slotsFromStart = true;
                _this.playSE(_this._i['c']);
                _this._x['sl'].vl(_this._r)['catch'](function () {
                    return;
                });
            });
            resources.unshift(this._x['s'].l());
            this._c.a(this._x['s'], gCurtain);
            // 档位菜单。
            this._x['sl'] = new Sprite.Slots(id, theme['slots'])
                .addEventListener('slots.close', function () {
                if (states.g('.oc')) {
                    _this._r.dispatchEvent(new Ev.ScreenLoad({
                        target: _this._r.gS(),
                        type: 'close'
                    }));
                    states.d('.oc');
                }
                _this._x[slotsFromStart ? 's' : 'm'].v();
                _this._x['sl'].h();
            }).addEventListener('slots.save', function (ev) {
                _this._x[slotsFromStart ? 's' : 'm'].v();
                _this._x['sl'].h();
                _this._r.gS().e(ev.slot);
            }).addEventListener('slots.load', function (ev) {
                _this._r.dispatchEvent(new Ev.ScreenLoad({
                    target: _this._r.gS(),
                    type: 'close'
                }));
                _this.sl(ev.id);
            });
            resources.push(this._x['sl'].l());
            this._c.a(this._x['sl'], gCurtain);
            // 连载档位菜单。
            this._x['ss'] = new Sprite.SeriesSlots(id, theme['series'])
                .addEventListener('slots.close', function () {
                if (!slotsFromStart && states.g('.oc')) {
                    _this._r.dispatchEvent(new Ev.ScreenSave({
                        target: _this._r.gS(),
                        type: 'close'
                    }));
                    states.d('.oc');
                }
                slotsFromStart = false;
                _this._x['ss'].h();
            }).addEventListener('slots.save', function (ev) {
                _this._r.dispatchEvent(new Ev.ScreenSave({
                    target: _this._r.gS(),
                    type: 'close'
                }));
                _this._x['ss'].h();
                _this._r.gS().e(ev.slot, true);
            }).addEventListener('slots.load', function (ev) {
                slotsFromStart = false;
                _this.sl(ev.id);
            });
            resources.push(this._x['ss'].l());
            this._c.a(this._x['ss'], gCurtain);
            // 设置菜单。
            this._x['st'] = new Sprite.Set(id, theme['set'])
                .addEventListener('set.close', function () {
                _this._x[slotsFromStart ? 's' : 'm'].v();
                _this._x['st'].h();
            }).addEventListener('set.volume', function (ev) {
                var bgm = _this._s['b'];
                var esm = _this._s['s'];
                var se = _this._s['e'];
                bgm['baseVolume'] = ev.bVolume * 0.01;
                bgm.volume = ev.bVolume * 0.01 * bgm['scale'];
                esm['baseVolume'] = ev.bVolume * 0.01;
                esm.volume = ev.bVolume * 0.01 * esm['scale'];
                se['baseVolume'] = ev.eVolume * 0.01;
                se.volume = ev.eVolume * 0.01 * se['scale'];
            });
            resources.push(this._x['st'].l());
            this._c.a(this._x['st'], gCurtain);
            // 保存评分配置
            this._c.a(this._x['sr'] = new Sprite.Stars(theme['stars']), gCurtain);
            resources.push(this._x['sr'].l());
            // 作者
            this._c.a(this._x['a'] = new Sprite.Author(theme['author']), gCurtain);
            this.c(resources);
            return this;
        };
        CanvasDirector.prototype.sl = function (id, aotuload) {
            var _this = this;
            if (aotuload === void 0) { aotuload = false; }
            if (id) {
                this.lightOff().then(function () {
                    if (_this._x['sl'])
                        _this._x['sl'].h(0);
                    if (_this._x['ss'])
                        _this._x['ss'].h(0);
                    _this._x['s'].h(0);
                    if (!_this._a)
                        _this._x['t'].v(0);
                    _this._r.l(id, aotuload);
                });
            }
        };
        /**
         * 配置状态。
         */
        CanvasDirector.prototype.s = function (sheet) {
            if (sheet.length)
                this._x['S'].u(sheet, this._r);
            return this;
        };
        /**
         * 配置面板。
         */
        CanvasDirector.prototype.p = function (sheet) {
            if (sheet && sheet.length > 0) {
                this._x['P'].u(sheet, this._r);
            }
            else
                this._x['t'].u(false);
            return this;
        };
        /**
         * 设置自动播放。
         */
        CanvasDirector.prototype.a = function (auto) {
            var tray = this._x['t'];
            if (tray) {
                tray[auto ? 'h' : 'v']();
                if (auto) {
                    this._x['m'].h();
                    this._x['P'].h();
                }
            }
            if (this._t) {
                this._t.h();
                this._t = undefined;
            }
            return _super.prototype.a.call(this, auto);
        };
        /**
         * 设置音量。
         */
        CanvasDirector.prototype.v = function (volume) {
            this._s['b']['baseVolume'] = volume;
            this._s['b'].volume = volume * this._s['b']['scale'];
            this._s['s']['baseVolume'] = volume;
            this._s['s'].volume = volume * this._s['s']['scale'];
            this._s['e']['baseVolume'] = volume;
            this._s['e'].volume = volume * this._s['e']['scale'];
            this._vo = volume > 0;
            var set = this._x['st'];
            if (set.gO() > 0)
                set.vv(volume, volume, this._vo);
            return _super.prototype.v.call(this, volume);
        };
        /**
         * 修正 DOM 定位。
         */
        CanvasDirector.prototype.f = function () {
            var work = document.querySelectorAll('.bg-work')[0], canvas = work.firstChild, w0 = work.offsetWidth, h0 = work.offsetHeight, w = (h0 * 16 / 9) | 0, h = h0, l = 0, t = 0;
            if (w > w0) {
                w = w0;
                h = (w0 * 9 / 16) | 0;
                t = ((h0 - h) / 2) | 0;
            }
            else if (w < w0)
                l = ((w0 - w) / 2) | 0;
            canvas.style.width = w + 'px';
            canvas.style.marginLeft = l + 'px';
            canvas.style.height = h + 'px';
            canvas.style.marginTop = t + 'px';
            this._c.z();
        };
        /**
         * 自我销毁。
         */
        CanvasDirector.prototype.d = function () {
            this._c.h();
            this._c = undefined;
            this._s['b'].pause();
            this._s['e'].pause();
            this._s['s'].pause();
            this._s = {};
            window.removeEventListener('keydown', this._l);
        };
        /**
         * 取消阻塞。
         */
        CanvasDirector.prototype.h = function () {
            if (this._h) {
                this._h.h();
                this._h = undefined;
            }
            if (this._q) {
                this._x['C'].c().o(0);
                this._q();
                this._q = undefined;
            }
            this.playMusic(Core.IResource.Type.BGM);
            this.playMusic(Core.IResource.Type.ESM);
            this.playSE();
        };
        /**
         * 绑定视图。
         */
        CanvasDirector.prototype.b = function (viewport) {
            this._c.b(viewport);
            return this;
        };
        /**
         * 连载模式。
         */
        CanvasDirector.prototype.e = function (type) {
            this._fs = type;
            return this;
        };
        /**
         * 暂停播放。
         */
        CanvasDirector.prototype.rp = function () {
            this._s['b'].pause();
            this._s['s'].pause();
            return _super.prototype.rp.call(this);
        };
        /**
         * 恢复播放。
         */
        CanvasDirector.prototype.rr = function () {
            this._s['b'].play();
            this._s['s'].play();
            return _super.prototype.rp.call(this);
        };
        /**
         * 尺寸。
         */
        CanvasDirector.BOUNDS = {
            x: 0,
            y: 0,
            w: 1280,
            h: 720
        };
        return CanvasDirector;
    }(Runtime.Director));
    Runtime.CanvasDirector = CanvasDirector;
})(Runtime || (Runtime = {}));
/**
 * 定义（运行时）场效调度器工厂组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Runtime/_Director/DirectorFactory.ts
 */
/// <reference path="../../../include/tsd.d.ts" />
/// <reference path="NodeDirector.ts" />
/// <reference path="CanvasDirector.ts" />
var Runtime;
(function (Runtime) {
    var Util = __Bigine_Util;
    var DirectorFactory;
    (function (DirectorFactory) {
        function c(runtime) {
            var env = Util.ENV;
            if (!env.Window)
                return new Runtime.NodeDirector(runtime);
            if (!env.Canvas)
                throw new E(E.SUPPORT_NO_CANVAS);
            return new Runtime.CanvasDirector(runtime);
        }
        DirectorFactory.c = c;
    })(DirectorFactory = Runtime.DirectorFactory || (Runtime.DirectorFactory = {}));
})(Runtime || (Runtime = {}));
/**
 * 声明（运行时）继续游戏事件元信息接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/IResumeMetas.ts
 */
/// <reference path="../../../include/tsd.d.ts" />
/// <reference path="../../Core/_Runtime/IEpisode.ts" />
/**
 * 定义（运行时）继续游戏事件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/Resume.ts
 */
/// <reference path="../Event.ts" />
/// <reference path="IResumeMetas.ts" />
var Ev;
(function (Ev) {
    var Resume = (function (_super) {
        __extends(Resume, _super);
        /**
         * 构造函数。
         */
        function Resume(metas) {
            _super.call(this, metas);
        }
        /**
         * 获取类型。
         */
        Resume.prototype.gT = function () {
            return 'resume';
        };
        return Resume;
    }(Ev.Event));
    Ev.Resume = Resume;
})(Ev || (Ev = {}));
/**
 * 声明（运行时）读档事件元信息接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/ILoadMetas.ts
 */
/// <reference path="../../Core/_Runtime/IStates.ts" />
/**
 * 定义（运行时）读档事件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/Load.ts
 */
/// <reference path="../Event.ts" />
/// <reference path="ILoadMetas.ts" />
var Ev;
(function (Ev) {
    var Load = (function (_super) {
        __extends(Load, _super);
        /**
         * 构造函数。
         */
        function Load(metas) {
            _super.call(this, metas);
            this.callback = metas.callback;
            this.id = metas.id;
        }
        /**
         * 获取类型。
         */
        Load.prototype.gT = function () {
            return 'load';
        };
        return Load;
    }(Ev.Event));
    Ev.Load = Load;
})(Ev || (Ev = {}));
/**
 * 声明（运行时）剧情事件播报事件元信息接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/ISceneMetas.ts
 */
/// <reference path="../../../include/tsd.d.ts" />
/// <reference path="../../Core/_Tag/ISceneTag.ts" />
/**
 * 定义（运行时）剧情事件播报事件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/Scene.ts
 */
/// <reference path="../Event.ts" />
/// <reference path="ISceneMetas.ts" />
var Ev;
(function (Ev) {
    var Scene = (function (_super) {
        __extends(Scene, _super);
        /**
         * 构造函数。
         */
        function Scene(metas) {
            _super.call(this, metas);
            this.id = metas.target.gI();
            this.title = metas.title;
            this.actions = metas.actions;
        }
        /**
         * 获取类型。
         */
        Scene.prototype.gT = function () {
            return 'scene';
        };
        return Scene;
    }(Ev.Event));
    Ev.Scene = Scene;
})(Ev || (Ev = {}));
/**
 * 声明（运行时）关键帧播报事件元信息接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/IActionMetas.ts
 */
/// <reference path="../../../include/tsd.d.ts" />
/// <reference path="../../Core/_Tag/IIdableTag.ts" />
/**
 * 定义（运行时）关键帧播报事件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/Action.ts
 */
/// <reference path="../Event.ts" />
/// <reference path="IActionMetas.ts" />
var Ev;
(function (Ev) {
    var Action = (function (_super) {
        __extends(Action, _super);
        /**
         * 构造函数。
         */
        function Action(metas) {
            _super.call(this, metas);
            this.id = metas.target.gI();
            this.kind = metas.target.gN().toLowerCase();
        }
        /**
         * 获取类型。
         */
        Action.prototype.gT = function () {
            return 'action';
        };
        return Action;
    }(Ev.Event));
    Ev.Action = Action;
})(Ev || (Ev = {}));
/**
 * 定义语法规约。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_schema.ts
 */
var Tag;
(function (Tag) {
    /**
     * 类到标签映射。
     */
    Tag.T = {
        Unknown: 'UNKNOWN',
        Root: 'ROOT',
        DefBGM: '音乐',
        Audio: '音源',
        Image: '画面',
        DefCG: '特写',
        DefChar: '人物',
        Avatar: '头像',
        Poses: '姿态',
        DefMap: '地图',
        BGImage: '底图',
        Point: '交互点',
        HLImage: '高亮',
        Region: '区域',
        Target: '对应房间',
        DefRoom: '房间',
        Link: '使用地图',
        Times: '时刻',
        DefSE: '音效',
        DefWeather: '天气',
        Struct: '结构',
        Field: '字段',
        FieldType: '类别',
        FieldLimit: '上限',
        Auto: '自动播放',
        Player: '主角',
        Resources: '素材包',
        Theme: '主题',
        Status: '状态',
        Panel: '面板',
        SimpPanel: '简单面板',
        SimpEle: '条目',
        EleName: '数据名',
        EleType: '数据类别',
        CollPanel: '集合面板',
        CollSource: '使用集合',
        CollStruct: '集合结构',
        Scene: '事件',
        Type: '类型',
        Conditions: '条件',
        Content: '内容',
        CharOn: '人物出场',
        CharOff: '人物离场',
        CharSet: '设置人物',
        CharPose: '改变神态',
        CharMove: '人物移动',
        CameraSet: '设置镜头',
        CameraZoom: '放大镜头',
        CameraReset: '复位镜头',
        CameraMove: '移动镜头',
        CameraShake: '抖动镜头',
        Monolog: '独白',
        Speak: '对白',
        Tip: '提示',
        VoiceOver: '旁白',
        FullWords: '全屏文本',
        FullClean: '清除文本',
        FullHide: '隐藏文本',
        Save: '自动存档',
        End: '游戏完结',
        Fail: '游戏失败',
        Stars: '评分',
        PlayBGM: '播放音乐',
        HideCG: '关闭特写',
        ShowCG: '展示特写',
        AsRoom: '设置房间',
        Freeze: '移动中止',
        AsTime: '设置时间',
        Enter: '进入房间',
        PlaySE: '播放音效',
        Weather: '设置天气',
        StopBGM: '停止音乐',
        Pause: '停顿',
        Curtains: '切幕动画',
        Expression: '神态动画',
        ShowStatus: '显示状态栏',
        HideStatus: '隐藏状态栏',
        PlayESM: '环境音乐',
        StopESM: '环境静音',
        StopSE: '停止音效',
        VolumeSet: '设置音量',
        Assert: '当数据',
        Assign: '设置数据',
        Compare: '对比数据',
        Increase: '增加数据',
        LoopBreak: '循环中止',
        Maximum: '最大数据',
        Minimum: '最小数据',
        Choose: '选择',
        Random: '随机数据',
        IfTime: '当时间',
        Copy: '复制数据',
        Add: '数据合值',
        Subtract: '数据差值',
        Product: '数据倍值',
        Define: '定义数据',
        Collection: '定义集合',
        CollPop: '删除元素',
        CollPush: '增加元素',
        Donate: '打赏',
        Unlock: '解锁',
        DefOptions: '定义选择',
        AddOption: '添加选项',
        DropOption: '去除选项',
        Option: '选项',
        And: '且',
        Or: '或',
        Otherwise: '否则',
        Then: '那么',
        When: '如果',
        Loop: '循环',
        WhenVar: '如果数据'
    };
    /**
     * 语法规则。
     *
     * {
     *     [index: number]: {
     *         name: string,
     *         params: number[], // [最小量, 最大量]
     *         content: number // -1 禁止，0 可选，1 必须,
     *         children: {
     *             [index: number]: number[] // [最小量, 最大量]
     *         }
     *     }
     * }
     */
    Tag.S = {
        '-1': ['Root', 0, -1, {
                54: [0, 1],
                55: [0, 1],
                56: 1,
                57: 1,
                73: [0, 1],
                74: [0, 1],
                76: [0],
                49: [1],
                33: [0],
                34: [0],
                35: [0],
                38: [0],
                44: [0],
                47: [0],
                48: [0]
            }],
        54: ['Auto', 0, -1],
        55: ['Player', 0, 1],
        56: ['Resources', 0, 1],
        57: ['Theme', 0, 1],
        73: ['Status', 0, -1, {
                53: [0, 6]
            }],
        74: ['Panel', 0, -1, {
                84: [0],
                88: [0]
            }],
        84: ['SimpPanel', 0, 1, {
                85: [1]
            }],
        85: ['SimpEle', 0, 1, {
                86: 1,
                87: [0, 1]
            }],
        86: ['EleName', 0, 1],
        87: ['EleType', 0, 1],
        88: ['CollPanel', 0, 1, {
                89: 1,
                90: 1
            }],
        89: ['CollSource', 0, 1],
        90: ['CollStruct', 0, 1],
        49: ['Scene', 0, 1, {
                50: 1,
                51: [0, 1],
                52: 1
            }],
        50: ['Type', 0, 1],
        51: ['Conditions', 0, -1, {
                '-1': [0]
            }],
        52: ['Content', 0, -1, {
                '-1': [1]
            }],
        33: ['DefBGM', 0, 1, {
                32: 1
            }],
        32: ['Audio', 0, 1],
        34: ['DefCG', 0, 1, {
                31: 1
            }],
        31: ['Image', 0, 1],
        35: ['DefChar', [0, 1], 1, {
                36: [0, 1],
                37: [0, 1]
            }],
        36: ['Avatar', 0, 1],
        37: ['Poses', 0, -1, {
                53: [0]
            }],
        38: ['DefMap', [0, 1], 1, {
                39: [0, 1],
                40: [1]
            }],
        39: ['BGImage', 0, 1],
        40: ['Point', [0, 1], 1, {
                41: [0, 1],
                42: [0, 1],
                43: [0, 1]
            }],
        41: ['HLImage', 0, 1],
        42: ['Region', 0, 1],
        43: ['Target', 0, 1],
        44: ['DefRoom', 0, 1, {
                45: [0, 1],
                46: [0, 1]
            }],
        45: ['Link', 0, 1],
        46: ['Times', 0, -1, {
                53: [1]
            }],
        47: ['DefSE', 0, 1, {
                32: 1
            }],
        48: ['DefWeather', 0, 1],
        53: ['Unknown', [1, 2], 0],
        0: ['CharOn', [0, 1], 1],
        1: ['CharOff', 1, -1],
        2: ['CharSet', [0, 1], 1],
        3: ['CharPose', 1, 1],
        62: ['CharMove', 1, 1],
        4: ['Monolog', 0, 1],
        5: ['Speak', [2, 3], 1],
        6: ['Tip', 0, 1],
        7: ['VoiceOver', 0, 1],
        8: ['Save', [0, 1], -1],
        9: ['End', 0, -1],
        10: ['Fail', 0, -1],
        11: ['Stars', [1, 2], -1],
        12: ['PlayBGM', [1, 2], -1],
        103: ['PlayESM', [1, 2], -1],
        64: ['StopBGM', 0, -1],
        104: ['StopESM', 0, -1],
        105: ['StopSE', 0, -1],
        13: ['HideCG', 0, -1],
        14: ['ShowCG', 1, -1],
        15: ['AsRoom', [1, 2], 0],
        16: ['Freeze', 0, -1],
        17: ['AsTime', 1, -1],
        18: ['Enter', 1, -1],
        19: ['PlaySE', [1, 2], -1],
        20: ['Weather', 1, -1],
        91: ['Pause', [0, 1], -1],
        92: ['CameraSet', 0, 1],
        93: ['CameraReset', [0, 1], -1],
        94: ['CameraZoom', [0, 1], 1],
        95: ['CameraMove', [0, 1], 1],
        96: ['Curtains', [0, 1], -1],
        97: ['CameraShake', 0, -1],
        100: ['ShowStatus', 0, -1],
        101: ['HideStatus', 0, -1],
        102: ['Expression', [0, 1], -1],
        106: ['VolumeSet', 2, -1],
        107: ['FullWords', 1, -1],
        108: ['FullClean', 0, -1],
        109: ['FullHide', 0, -1],
        110: ['Unlock', 1, -1],
        58: ['Loop', 0, -1, {
                '-1': [1]
            }],
        59: ['LoopBreak', 0, -1],
        25: ['Choose', [0, 1], 0, {
                53: [0],
                99: [0]
            }],
        65: ['DefOptions', 0, 1, {
                53: [0],
                99: [0]
            }],
        66: ['AddOption', [2, 3], 0],
        67: ['DropOption', 2, -1],
        99: ['Option', [1, 2], 0],
        23: ['Assign', 1, 1],
        30: ['Increase', 1, 1],
        68: ['Random', 1, -1],
        69: ['IfTime', 1, -1],
        70: ['Copy', 2, -1],
        71: ['Add', 1, -1, {
                53: [1]
            }],
        72: ['Subtract', 2, -1, {
                53: [1]
            }],
        75: ['Product', 1, -1, {
                53: [1]
            }],
        22: ['Assert', [2, 3], -1],
        98: ['Donate', 1, -1],
        24: ['Compare', 1, -1],
        21: ['And', 0, -1, {
                '-1': [1]
            }],
        26: ['Or', 0, -1, {
                '-1': [1]
            }],
        60: ['Maximum', [0, 1], -1, {
                53: [1]
            }],
        61: ['Minimum', [0, 1], -1, {
                53: [1]
            }],
        28: ['Then', 0, -1, {
                '-1': [1]
            }],
        29: ['When', 1, -1, {
                '-1': [1]
            }],
        63: ['WhenVar', 1, -1, {
                '-1': [1]
            }],
        27: ['Otherwise', 0, -1, {
                '-1': [1]
            }],
        76: ['Struct', 0, 1, {
                77: [1]
            }],
        77: ['Field', 0, 1, {
                78: [0, 1],
                79: [0, 1]
            }],
        78: ['FieldType', 0, 1],
        79: ['FieldLimit', 0, 1],
        80: ['Define', 1, 1, {
                53: [0]
            }],
        81: ['Collection', 1, 1, {
                53: [0]
            }],
        82: ['CollPush', 1, 1],
        83: ['CollPop', 1, 1] // [集合名] 数据名
    };
    var ii, jj;
    for (ii in Tag.S)
        if (Tag.S.hasOwnProperty(ii)) {
            if (!(Tag.S[ii][1] instanceof Array))
                Tag.S[ii][1] = [Tag.S[ii][1], Tag.S[ii][1]];
            if (Tag.S[ii][3])
                for (jj in Tag.S[ii][3])
                    if (!(Tag.S[ii][3][jj] instanceof Array))
                        Tag.S[ii][3][jj] = [Tag.S[ii][3][jj], Tag.S[ii][3][jj]];
        }
    /**
     * 标签到类映射。
     */
    Tag.C = {
        游戏结束: 'End',
        当线索: 'Assert',
        设置线索: 'Assign',
        对比线索: 'Compare'
    };
    for (ii in Tag.T)
        if (Tag.T.hasOwnProperty(ii) && !(Tag.T[ii] in Tag.C))
            Tag.C[Tag.T[ii]] = ii;
    /**
     * 标签索引。
     */
    Tag.I = {};
    for (ii in Tag.S)
        if (Tag.S.hasOwnProperty(ii))
            Tag.I[Tag.S[ii][0]] = ii;
})(Tag || (Tag = {}));
/**
 * 定义引擎异常。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      E.ts
 */
/// <reference path="../include/tsd.d.ts" />
var E = (function (_super) {
    __extends(E, _super);
    /**
     * 构造函数。
     */
    function E(message, lineNo) {
        _super.call(this);
        if ('captureStackTrace' in Error)
            Error['captureStackTrace'](this, E);
        this.signal = (lineNo in E.Signal) ?
            lineNo :
            E.Signal.OK;
        if (0 < lineNo)
            message = '第 ' + lineNo + ' 行' + message;
        this.name = 'BigineError';
        this.message = message;
    }
    /**
     * 中断顺序时序流。
     */
    E.doHalt = function () {
        return Promise.reject(new E('', E.Signal.HALT));
    };
    /**
     * 忽略中断信号。
     */
    E.ignoreHalt = function (error) {
        if (E.Signal.HALT == error.signal)
            return Promise.resolve();
        return Promise.reject(error);
    };
    /**
     * 中断循环时序流。
     */
    E.doBreak = function () {
        return Promise.reject(new E('', E.Signal.BREAK));
    };
    /**
     * 忽略循环中断信号。
     */
    E.ignoreBreak = function (error) {
        if (E.Signal.BREAK == error.signal)
            return Promise.resolve();
        return Promise.reject(error);
    };
    E.SCHEMA_TAG_NOT_DECLARED = '标签尚未声明语法规则';
    E.SCHEMA_CHILD_NOT_ALLOWED = '上级标签不支持此子标签';
    E.LEX_ILLEGAL_SOURCE = '语法格式错误';
    E.LEX_UNEXPECTED_INDENTATION = '缩进深度错误';
    E.TAG_PARAMS_TOO_FEW = '标签参数个数不满足最低要求';
    E.TAG_PARAMS_TOO_MANY = '标签参数个数超过最大限制';
    E.TAG_PARAMS_NOT_TRUE = '标签参数不正确';
    E.TAG_CONTENT_FORBIDEN = '标签不接受内容';
    E.TAG_CONTENT_REQUIRED = '标签内容缺失';
    E.TAG_CHILDREN_TOO_FEW = '子标签数量不满足最低要求';
    E.TAG_CHILDREN_TOO_MANY = '子标签数量超过最大限制';
    E.DEF_CHAR_AVATAR_NOT_FOUND = '头像标签缺失';
    E.DEF_CHAR_POSES_NOT_FOUND = '姿态标签未定义';
    E.DEF_EPISODE_NOT_REGISTERED = '关联实体尚未注册';
    E.DEF_EPISODE_NOT_BINDED = '关联实体尚未绑定';
    E.DEF_ROOM_EMPTY = '使用地图标签和时刻标签均未定义';
    E.DEF_MAP_REGION_BROKEN = '区域定义信息出错';
    E.DEF_MAP_BGIMAGE_NOT_FOUND = '底图标签缺失';
    E.DEF_MAP_HLIMAGE_NOT_FOUND = '高亮图标签缺失';
    E.DEF_MAP_REGION_NOT_FOUND = '区域标签缺失';
    E.DEF_MAP_TARGET_NOT_FOUND = '对应房间标签缺失';
    E.DEF_MAP_POINT_NOT_FOUND = '继承交互点未定义';
    E.SCENE_TYPE_UNKNOWN = '无效的事件类型';
    E.ROOT_NOT_PARENT = '根标签没有父标签';
    E.ACT_ILLEGAL_POSITION = '无效地人物站位';
    E.ACT_ILLEGAL_CAMERA_MOVE = '无效地镜头移动位置';
    E.ACT_CHAR_NOT_ON = '人物并不在场';
    E.ACT_CHAR_ONSTAGE = '人物已在场';
    E.ACT_ILLEGAL_STARS = '无效地评分星级';
    E.ACT_CG_NOT_SHOWN = '并未展示任何特写';
    E.ACT_CG_ALREADY_SHOWN = '正在展示另一特写';
    E.ACT_ILLEGAL_OP = '无效的比较符';
    E.ACT_OPTION_CAST_FAILURE = '无法转化为选项';
    E.RES_INVALID_URI = '无效的资源地址';
    E.ENV_NOT_AVAILABLE = '环境不满足播放条件';
    E.EP_DUPLICATE_ENTITY = '实体编号重复';
    E.EP_ENTITY_NOT_FOUND = '实体不存在';
    E.EP_THEME_NOT_LOADED = '主题数据尚未加载完成';
    E.G_PARENT_NOT_FOUND = '画面父元素未绑定';
    E.SUPPORT_NO_CANVAS = '浏览器不支持 Canvas';
    E.UTIL_REMOTE_TIMEOUT = '远端请求超时';
    E.OPT_OPTIONS_MISSING = '选项声明缺失';
    E.OPT_OPTIONS_CONFLICT = '选项声明冲突';
    E.COLL_STRUCT_DISMATCHED = '数据非指定结构类型';
    E.STRUCT_FIELD_MISSING = '实体字段内容缺失';
    E.STRUCT_FIELD_TYPE_TOO_MANY = '指定类型的字段定义过多';
    E.STRUCT_FIELD_CANNOT_EMPTY = '非空字段未设置数据';
    E.FULL_ROW_TOO_MANY = '全屏文本中旁白文字过多';
    return E;
}(Error));
var E;
(function (E) {
    (function (Signal) {
        /**
         * 中断循环。
         */
        Signal[Signal["BREAK"] = -99] = "BREAK";
        /**
         * 中断时序播放。
         */
        Signal[Signal["HALT"] = -98] = "HALT";
        /**
         * 正常。
         */
        Signal[Signal["OK"] = 0] = "OK";
    })(E.Signal || (E.Signal = {}));
    var Signal = E.Signal;
})(E || (E = {}));
/**
 * 定义未知标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/Unknown.ts
 */
/// <reference path="../Core/_Tag/ITag.ts" />
/// <reference path="_schema.ts" />
/// <reference path="../E.ts" />
var Tag;
(function (Tag) {
    var Util = __Bigine_Util;
    var Unknown = (function () {
        /**
         * 构造函数。
         */
        function Unknown(params, content, children, lineNo) {
            var _this = this;
            this._l = lineNo || 0;
            this._r =
                this._b = false;
            this._q = {};
            var schema = Tag.S[this.$i()], contraints = {};
            if (params.length < schema[1][0]) {
                throw new E(E.TAG_PARAMS_TOO_FEW, lineNo);
            }
            else if (undefined !== schema[1][1] && params.length > schema[1][1])
                throw new E(E.TAG_PARAMS_TOO_MANY, lineNo);
            this._p = params;
            if (-1 == schema[2] && content.length) {
                throw new E(E.TAG_CONTENT_FORBIDEN, lineNo);
            }
            else if (1 == schema[2] && !content.length)
                throw new E(E.TAG_CONTENT_REQUIRED, lineNo);
            this._c = content;
            Util.each(schema[3] || {}, function (value, index) {
                var counter;
                if ('number' == typeof value) {
                    counter = [value, value];
                }
                else {
                    counter = value.slice(0);
                    if (1 == counter.length)
                        counter[1] = Infinity;
                }
                counter[2] = counter[3] = 0;
                contraints[index] = counter;
            });
            Util.each(children, function (tag) {
                var index = tag.$i(!!contraints[-1]);
                if (!(index in contraints))
                    throw new E(E.SCHEMA_CHILD_NOT_ALLOWED, tag.gL());
                contraints[index][2]++;
                contraints[index][3] = tag.gL();
                tag.$u(_this);
            });
            Util.each(contraints, function (counter) {
                if (-1 != counter[0] && counter[0] > counter[2])
                    throw new E(E.TAG_CHILDREN_TOO_FEW, counter[3] || lineNo);
                if (counter[1] < counter[2])
                    throw new E(E.TAG_CHILDREN_TOO_MANY, counter[3]);
            });
            this._s = children;
        }
        /**
         * 获取行号。
         */
        Unknown.prototype.gL = function () {
            return this._l;
        };
        /**
         * 获取标签名称。
         */
        Unknown.prototype.gN = function () {
            return 'Unknown';
        };
        /**
         * 注册（子标签实体及自身实体）至作品。
         */
        Unknown.prototype.r = function (ep) {
            if (this._r)
                return;
            this._r = true;
            Util.each(this._s, function (tag) {
                tag.r(ep);
            });
            this.$r(ep);
        };
        /**
         * 注册（自身实体）至（运行时）作品。
         */
        Unknown.prototype.$r = function (ep) {
            //
        };
        /**
         * 绑定（运行时）作品（实体到子标签及自身）。
         */
        Unknown.prototype.b = function (ep) {
            if (this._b)
                return;
            this._b = true;
            Util.each(this._s, function (tag) {
                tag.b(ep);
            });
            this.$b(ep);
        };
        /**
         * 绑定（运行时）作品（实体）。
         */
        Unknown.prototype.$b = function (ep) {
            //
        };
        /**
         * 转化为（中文）剧本（代码）。
         */
        Unknown.prototype.toString = function () {
            if (-1 == this._l)
                return '';
            var clob = Tag.T[this.gN()], params = this._p.slice(0);
            if ('UNKNOWN' == clob)
                clob = params.shift();
            if (params.length)
                clob += '（' + params.join('，') + '）';
            if (this._c || this._s.length)
                clob += '：';
            clob += this._c + '\n';
            Util.each(this._s, function (tag) {
                clob += '\t' + tag.toString().replace(/\n/g, '\n\t').replace(/\t$/, '');
            });
            return clob;
        };
        /**
         * 转化为运行时（Javascript）代码。
         */
        Unknown.prototype.toJsrn = function () {
            var _this = this;
            if (-1 == this._l)
                return '';
            var parts = [this.$i()], params = [], children = [], clob;
            if (this._c)
                parts.push(this.$v(this._c));
            if (this._p.length) {
                Util.each(this._p, function (param) {
                    params.push(_this.$v(param));
                });
                parts.push(params);
            }
            Util.each(this._s, function (tag) {
                children.push(tag.toJsrn());
            });
            clob = JSON.stringify(parts);
            clob = clob.substr(1, clob.length - 2);
            if (children.length)
                clob += ',[' + children.join(',') + ']';
            return '$(' + clob + ')';
        };
        /**
         * 尝试将数值字符串转为数值。
         */
        Unknown.prototype.$v = function (orig) {
            if ('真' == orig) {
                return 1;
            }
            else if ('伪' == orig)
                return 0;
            var ret = orig - 0;
            return isNaN(ret) ? orig : ret;
        };
        /**
         * 设置父标签。
         */
        Unknown.prototype.$u = function (parent) {
            this._u = parent;
        };
        /**
         * 获取父标签。
         */
        Unknown.prototype.gU = function () {
            return this._u;
        };
        /**
         * 获取标签索引号。
         */
        Unknown.prototype.$i = function (abstract) {
            var index = Tag.I[this.gN()];
            if (undefined === index)
                throw new E(E.SCHEMA_TAG_NOT_DECLARED, this._l);
            return index - 0;
        };
        /**
         * 获取指定参数。
         */
        Unknown.prototype.$p = function (index) {
            return this._p[index];
        };
        /**
         * 获取内容。
         */
        Unknown.prototype.$c = function () {
            return this._c;
        };
        /**
         * 过滤名称符合要求地子标签。
         */
        Unknown.prototype.$q = function (name) {
            var _this = this;
            if (!(name in Tag.I))
                throw new E(E.SCHEMA_TAG_NOT_DECLARED);
            if (!(name in this._q)) {
                this._q[name] = [];
                Util.each(this._s, function (tag) {
                    if (tag.gN() == name)
                        _this._q[name].push(tag);
                });
            }
            return this._q[name];
        };
        return Unknown;
    }());
    Tag.Unknown = Unknown;
})(Tag || (Tag = {}));
/**
 * 定义实体（定义）抽象组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/Entity.ts
 */
/// <reference path="Unknown.ts" />
/// <reference path="../Core/_Tag/IEntityTag.ts" />
var Tag;
(function (Tag) {
    var Entity = (function (_super) {
        __extends(Entity, _super);
        function Entity() {
            _super.apply(this, arguments);
        }
        /**
         * 注册（自身实体）至（运行时）作品。
         */
        Entity.prototype.$r = function (ep) {
            ep.f(this);
        };
        /**
         * 获取唯一编号。
         */
        Entity.prototype.gI = function () {
            return this._c;
        };
        /**
         * 获取类型。
         */
        Entity.prototype.gT = function () {
            return Core.IEpisode.Entity.CG;
        };
        return Entity;
    }(Tag.Unknown));
    Tag.Entity = Entity;
})(Tag || (Tag = {}));
/**
 * 定义画面标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Definition/Image.ts
 */
/// <reference path="../Unknown.ts" />
var Tag;
(function (Tag) {
    var Image = (function (_super) {
        __extends(Image, _super);
        function Image() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        Image.prototype.gN = function () {
            return 'Image';
        };
        /**
         * 注册（自身实体）至（运行时）作品。
         */
        Image.prototype.$r = function (ep) {
            this._o = ep.r(this._c, Core.IResource.Type.CG);
        };
        /**
         * 获取资源。
         */
        Image.prototype.o = function () {
            if (!this._r)
                throw new E(E.DEF_EPISODE_NOT_REGISTERED, this._l);
            return this._o;
        };
        return Image;
    }(Tag.Unknown));
    Tag.Image = Image;
})(Tag || (Tag = {}));
/**
 * 定义（人物）头像标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Definition/_Char/Avatar.ts
 */
/// <reference path="../Image.ts" />
var Tag;
(function (Tag) {
    var Avatar = (function (_super) {
        __extends(Avatar, _super);
        function Avatar() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        Avatar.prototype.gN = function () {
            return 'Avatar';
        };
        /**
         * 注册（自身实体）至（运行时）作品。
         */
        Avatar.prototype.$r = function (ep) {
            this._o = ep.r(this._c, Core.IResource.Type.Avatar);
        };
        return Avatar;
    }(Tag.Image));
    Tag.Avatar = Avatar;
})(Tag || (Tag = {}));
/**
 * 定义资源表抽象标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Definition/ResTable.ts
 */
/// <reference path="../Unknown.ts" />
var Tag;
(function (Tag) {
    var ResTable = (function (_super) {
        __extends(ResTable, _super);
        /**
         * 构造函数。
         */
        function ResTable(params, content, children, lineNo) {
            _super.call(this, params, content, children, lineNo);
            this._o = {};
        }
        /**
         * 获取资源。
         */
        ResTable.prototype.o = function (id) {
            if (!this._r)
                throw new E(E.DEF_EPISODE_NOT_REGISTERED, this._l);
            return this._o[id] || this._o['默认'];
        };
        return ResTable;
    }(Tag.Unknown));
    Tag.ResTable = ResTable;
})(Tag || (Tag = {}));
/**
 * 定义（人物）姿态标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Definition/_Char/Poses.ts
 */
/// <reference path="../ResTable.ts" />
var Tag;
(function (Tag) {
    var Util = __Bigine_Util;
    var Poses = (function (_super) {
        __extends(Poses, _super);
        function Poses() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        Poses.prototype.gN = function () {
            return 'Poses';
        };
        /**
         * 注册（自身实体）至（运行时）作品。
         */
        Poses.prototype.$r = function (ep) {
            var _this = this;
            Util.each(this._s, function (tag, index) {
                var id = tag.$p(0);
                _this._o[id] = ep.r(tag.$c(), Core.IResource.Type.Pose);
                if (!index)
                    _this._o['默认'] = _this._o[id];
            });
        };
        /**
         * 获取所有关联资源。
         */
        Poses.prototype.d = function () {
            var ret = [];
            Util.each(this._o, function (resource, index) {
                if ('默认' != index)
                    ret.push(resource);
            });
            return ret;
        };
        return Poses;
    }(Tag.ResTable));
    Tag.Poses = Poses;
})(Tag || (Tag = {}));
/**
 * 定义人物（定义）标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Definition/_Char/DefChar.ts
 */
/// <reference path="../../Entity.ts" />
/// <reference path="Avatar.ts" />
/// <reference path="Poses.ts" />
var Tag;
(function (Tag) {
    var DefChar = (function (_super) {
        __extends(DefChar, _super);
        /**
         * 构造函数。
         */
        function DefChar(params, content, children, lineNo) {
            _super.call(this, params, content, children, lineNo);
            if (!this.$q('Avatar').length && !params.length)
                throw new E(E.DEF_CHAR_AVATAR_NOT_FOUND, lineNo);
        }
        /**
         * 获取标签名称。
         */
        DefChar.prototype.gN = function () {
            return 'DefChar';
        };
        /**
         * 绑定（运行时）作品（实体）。
         */
        DefChar.prototype.$b = function (ep) {
            if (this._p[0])
                this._o = ep.q(this._p[0], Core.IEpisode.Entity.Chr, this._l);
        };
        /**
         * 获取类型。
         */
        DefChar.prototype.gT = function () {
            return Core.IEpisode.Entity.Chr;
        };
        /**
         * 获取资源。
         */
        DefChar.prototype.o = function (id) {
            var q = this.$q(id ? 'Poses' : 'Avatar');
            if (!q.length) {
                if (!this._b)
                    throw new E(E.DEF_EPISODE_NOT_BINDED, this._l);
                if (this._o) {
                    return this._o.o(id);
                }
                else
                    throw new E(E.DEF_CHAR_POSES_NOT_FOUND, this._l);
            }
            return q[0].o(id);
        };
        /**
         * 获取所有关联资源。
         */
        DefChar.prototype.d = function () {
            if (this._o)
                return this._o.d();
            var poses = this.$q('Poses')[0], ret = [this.$q('Avatar')[0].o()];
            if (poses)
                ret = ret.concat(poses.d());
            return ret;
        };
        return DefChar;
    }(Tag.Entity));
    Tag.DefChar = DefChar;
})(Tag || (Tag = {}));
/**
 * 定义音源标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Definition/Audio.ts
 */
/// <reference path="../Unknown.ts" />
var Tag;
(function (Tag) {
    var Audio = (function (_super) {
        __extends(Audio, _super);
        function Audio() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        Audio.prototype.gN = function () {
            return 'Audio';
        };
        /**
         * 注册（自身实体）至（运行时）作品。
         */
        Audio.prototype.$r = function (ep) {
            this._o = ep.r(this._c, Core.IResource.Type.BGM);
        };
        /**
         * 获取资源。
         */
        Audio.prototype.o = function () {
            if (!this._r)
                throw new E(E.DEF_EPISODE_NOT_REGISTERED, this._l);
            return this._o;
        };
        return Audio;
    }(Tag.Unknown));
    Tag.Audio = Audio;
})(Tag || (Tag = {}));
/**
 * 定义背景音乐（定义）标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Definition/DefBGM.ts
 */
/// <reference path="../Entity.ts" />
/// <reference path="Audio.ts" />
var Tag;
(function (Tag) {
    var DefBGM = (function (_super) {
        __extends(DefBGM, _super);
        function DefBGM() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        DefBGM.prototype.gN = function () {
            return 'DefBGM';
        };
        /**
         * 获取类型。
         */
        DefBGM.prototype.gT = function () {
            return Core.IEpisode.Entity.BGM;
        };
        /**
         * 获取资源。
         */
        DefBGM.prototype.o = function () {
            return this.$q('Audio')[0].o();
        };
        return DefBGM;
    }(Tag.Entity));
    Tag.DefBGM = DefBGM;
})(Tag || (Tag = {}));
/**
 * 定义特写（定义）标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Definition/DefCG.ts
 */
/// <reference path="../Entity.ts" />
/// <reference path="Image.ts" />
var Tag;
(function (Tag) {
    var DefCG = (function (_super) {
        __extends(DefCG, _super);
        function DefCG() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        DefCG.prototype.gN = function () {
            return 'DefCG';
        };
        /**
         * 获取资源。
         */
        DefCG.prototype.o = function () {
            return this.$q('Image')[0].o();
        };
        return DefCG;
    }(Tag.Entity));
    Tag.DefCG = DefCG;
})(Tag || (Tag = {}));
/**
 * 定义音效（定义）标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Definition/DefSE.ts
 */
/// <reference path="../Entity.ts" />
/// <reference path="Audio.ts" />
var Tag;
(function (Tag) {
    var DefSE = (function (_super) {
        __extends(DefSE, _super);
        function DefSE() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        DefSE.prototype.gN = function () {
            return 'DefSE';
        };
        /**
         * 获取类型。
         */
        DefSE.prototype.gT = function () {
            return Core.IEpisode.Entity.SE;
        };
        /**
         * 获取资源。
         */
        DefSE.prototype.o = function () {
            return this.$q('Audio')[0].o();
        };
        return DefSE;
    }(Tag.Entity));
    Tag.DefSE = DefSE;
})(Tag || (Tag = {}));
/**
 * 定义（地图）底图标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Definition/_Map/BGImage.ts
 */
/// <reference path="../Image.ts" />
var Tag;
(function (Tag) {
    var BGImage = (function (_super) {
        __extends(BGImage, _super);
        function BGImage() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        BGImage.prototype.gN = function () {
            return 'BGImage';
        };
        /**
         * 注册（自身实体）至（运行时）作品。
         */
        BGImage.prototype.$r = function (ep) {
            this._o = ep.r(this._c, Core.IResource.Type.Room);
        };
        return BGImage;
    }(Tag.Image));
    Tag.BGImage = BGImage;
})(Tag || (Tag = {}));
/**
 * 定义（地图交互点）高亮图标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Definition/_Map/HLImage.ts
 */
/// <reference path="../Image.ts" />
var Tag;
(function (Tag) {
    var HLImage = (function (_super) {
        __extends(HLImage, _super);
        function HLImage() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        HLImage.prototype.gN = function () {
            return 'HLImage';
        };
        /**
         * 注册（自身实体）至（运行时）作品。
         */
        HLImage.prototype.$r = function (ep) {
            this._o = ep.r(this._c, Core.IResource.Type.Map);
        };
        return HLImage;
    }(Tag.Image));
    Tag.HLImage = HLImage;
})(Tag || (Tag = {}));
/**
 * 定义（地图交互点）区域标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Definition/_Map/Region.ts
 */
/// <reference path="../../Unknown.ts" />
var Tag;
(function (Tag) {
    var Region = (function (_super) {
        __extends(Region, _super);
        /**
         * 构造函数。
         */
        function Region(params, content, children, lineNo) {
            _super.call(this, params, content, children, lineNo);
            this._a = {};
            var p = content.split('，');
            if (4 > p.length || 5 < p.length)
                throw new E(E.DEF_MAP_REGION_BROKEN, lineNo);
            this._a['x'] = 0 | p[3] / 1.5;
            this._a['y'] = 0 | p[0] / 1.5;
            this._a['w'] = 1280 - this._a['x'] - (0 | p[1] / 1.5);
            this._a['h'] = 720 - this._a['y'] - (0 | p[2] / 1.5);
            this._a['z'] = (p[4] || 0) - 0;
        }
        /**
         * 获取标签名称。
         */
        Region.prototype.gN = function () {
            return 'Region';
        };
        /**
         * 获取横轴座标值。
         */
        Region.prototype.gX = function () {
            return this._a['x'];
        };
        /**
         * 获取纵轴座标值。
         */
        Region.prototype.gY = function () {
            return this._a['y'];
        };
        /**
         * 获取深轴座标值。
         */
        Region.prototype.gZ = function () {
            return this._a['z'];
        };
        /**
         * 获取宽度值。
         */
        Region.prototype.gW = function () {
            return this._a['w'];
        };
        /**
         * 获取高度值。
         */
        Region.prototype.gH = function () {
            return this._a['h'];
        };
        return Region;
    }(Tag.Unknown));
    Tag.Region = Region;
})(Tag || (Tag = {}));
/**
 * 定义（地图交互点）对应房间标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Definition/_Map/Target.ts
 */
/// <reference path="../../Unknown.ts" />
/// <reference path="../_Room/DefRoom.ts" />
var Tag;
(function (Tag) {
    var Target = (function (_super) {
        __extends(Target, _super);
        function Target() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        Target.prototype.gN = function () {
            return 'Target';
        };
        /**
         * 绑定（运行时）作品（实体）。
         */
        Target.prototype.$b = function (ep) {
            this._o = ep.q(this._c, Core.IEpisode.Entity.Room, this._l);
        };
        /**
         * 获取关联对象。
         */
        Target.prototype.gR = function () {
            if (!this._b)
                throw new E(E.DEF_EPISODE_NOT_BINDED, this._l);
            return this._o;
        };
        return Target;
    }(Tag.Unknown));
    Tag.Target = Target;
})(Tag || (Tag = {}));
/**
 * 实现抽象动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/Action.ts
 */
/// <reference path="Unknown.ts" />
/// <reference path="../Core/_Tag/IPerformableTag.ts" />
var Tag;
(function (Tag) {
    var Action = (function (_super) {
        __extends(Action, _super);
        function Action() {
            _super.apply(this, arguments);
        }
        /**
         * 获取代号。
         */
        Action.prototype.$i = function (abstract) {
            return abstract ? -1 : _super.prototype.$i.call(this, abstract);
        };
        /**
         * （执行）检查。
         */
        Action.prototype.t = function (states) {
            return false;
        };
        /**
         * 执行。
         */
        Action.prototype.p = function (runtime) {
            return runtime;
        };
        /**
         * 获取依赖素材资源列表。
         */
        Action.prototype.$d = function () {
            return [];
        };
        return Action;
    }(Tag.Unknown));
    Tag.Action = Action;
})(Tag || (Tag = {}));
/**
 * 定义进入房间动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Flow/Enter.ts
 */
/// <reference path="../../Action.ts" />
/// <reference path="../../_Definition/_Room/DefRoom.ts" />
var Tag;
(function (Tag) {
    var Enter = (function (_super) {
        __extends(Enter, _super);
        function Enter() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        Enter.prototype.gN = function () {
            return 'Enter';
        };
        /**
         * 绑定（运行时）作品（实体）。
         */
        Enter.prototype.$b = function (ep) {
            this._mo = ep.q(this._p[0], Core.IEpisode.Entity.Room, this._l);
        };
        /**
         * 执行。
         */
        Enter.prototype.p = function (runtime) {
            var _this = this;
            var states = runtime.gS(), kcx = '_c*', kcn = '_rc', cn = states.g(kcn), kdn = '_rd', ktn = '_rt', kt = '_t', kco = '$rc', co = states.g(kco), kdo = '$rd', kto = '$rt', director = runtime.gD(), type = Core.ISceneTag.Type;
            if (cn == this._p[0])
                return director.lightOff()
                    .then(function () {
                    states.d(kcx);
                    return director.reset();
                }).then(function () {
                    // 恢复房间默认背景后开灯。
                    states.c(kcn, kdn)
                        .c(kco, kdo);
                    return director.asRoom(states.g(kdo).o(states.g(kt)))
                        .then(function () { return director.lightOn(); });
                });
            runtime.t(function () { return Promise.resolve() // 新建时序流，
                .then(function () {
                states.s(ktn, _this._p[0])
                    .s(kto, _this._mo);
                if (!cn)
                    return runtime;
                return co.p(type.PreLeave, runtime, _this._p[0]);
            })
                .then(function () {
                return _this._mo.p(type.PreEnter, runtime, _this._p[0]);
            }) // 播放关联（目标）房间进入前事件
                .then(function () {
                return director.lightOff();
            })
                .then(function () {
                states.d(kcn)
                    .d(kco)
                    .d(kdn)
                    .d(kdo);
                if (!cn)
                    return runtime;
                return co.p(type.PostLeave, runtime, _this._p[0]);
            })
                .then(function () {
                if (runtime.gH())
                    return E.doHalt();
                states.m(ktn, kcn)
                    .m(kto, kco)
                    .c(kcn, kdn)
                    .c(kco, kdo);
                director.c([_this._mo.d()]);
                var map = _this._mo.gM();
                return director.lightOff()
                    .then(function () {
                    states.d(kcx);
                    return director.reset();
                }).then(function () {
                    return director.asRoom(_this._mo.o(states.g(kt)), false, map ? true : false);
                })
                    .then(function () {
                    return director.asMap(map ? map.gP() : {});
                })
                    .then(function () {
                    return _this._mo.p(type.PostEnter, runtime, _this._p[0]);
                });
            }); });
            return E.doHalt(); // 中断原有时序流。
        };
        return Enter;
    }(Tag.Action));
    Tag.Enter = Enter;
})(Tag || (Tag = {}));
/**
 * 定义（地图）交互点标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Definition/_Map/Point.ts
 */
/// <reference path="../../Unknown.ts" />
/// <reference path="../../../Core/_Tag/IPointTag.ts" />
/// <reference path="HLImage.ts" />
/// <reference path="Region.ts" />
/// <reference path="Target.ts" />
/// <reference path="../../_Action/_Flow/Enter.ts" />
var Tag;
(function (Tag) {
    var Point = (function (_super) {
        __extends(Point, _super);
        /**
         * 构造函数。
         */
        function Point(params, content, children, lineNo) {
            _super.call(this, params, content, children, lineNo);
            if (!params.length)
                if (!this.$q('HLImage').length) {
                    throw new E(E.DEF_MAP_HLIMAGE_NOT_FOUND, lineNo);
                }
                else if (!this.$q('Region').length)
                    throw new E(E.DEF_MAP_REGION_NOT_FOUND, lineNo);
        }
        /**
         * 获取标签名称。
         */
        Point.prototype.gN = function () {
            return 'Point';
        };
        /**
         * 绑定（运行时）作品（实体）。
         */
        Point.prototype.$b = function (ep) {
            if (this._m && this._p[0]) {
                var map = ep.q(this._m, Core.IEpisode.Entity.Map, this._l);
                this._o = map ? map.gP(this._p[0]) : undefined;
            }
        };
        /**
         * 交互逻辑。
         */
        Point.prototype.p = function (runtime) {
            var room = this.gR(), obj = this.$q('Target')[0] || this._o, rp = room.gI() == ' ' ? obj.$c() : room.gI();
            Tag.Enter.prototype.p.call({
                _p: [rp],
                _mo: room
            }, runtime)['catch'](E.ignoreHalt);
        };
        /**
         * 获取唯一编号。
         */
        Point.prototype.gI = function () {
            return this._c;
        };
        /**
         * 获取高亮图资源。
         */
        Point.prototype.o = function () {
            return (this.$q('HLImage')[0] || this._o).o();
        };
        /**
         * 设置地图（模板）。
         */
        Point.prototype.sM = function (id) {
            this._m = id;
        };
        /**
         * 获取横轴座标值。
         */
        Point.prototype.gX = function () {
            return (this.$q('Region')[0] || this._o).gX();
        };
        /**
         * 获取纵轴座标值。
         */
        Point.prototype.gY = function () {
            return (this.$q('Region')[0] || this._o).gY();
        };
        /**
         * 获取深轴座标值。
         */
        Point.prototype.gZ = function () {
            return (this.$q('Region')[0] || this._o).gZ();
        };
        /**
         * 获取宽度值。
         */
        Point.prototype.gW = function () {
            return (this.$q('Region')[0] || this._o).gW();
        };
        /**
         * 获取高度值。
         */
        Point.prototype.gH = function () {
            return (this.$q('Region')[0] || this._o).gH();
        };
        /**
         * 获取相关房间。
         */
        Point.prototype.gR = function () {
            var obj = this.$q('Target')[0] || this._o;
            if (obj)
                return obj.gR();
            throw new E(E.DEF_MAP_TARGET_NOT_FOUND, this._l);
        };
        return Point;
    }(Tag.Unknown));
    Tag.Point = Point;
})(Tag || (Tag = {}));
/**
 * 定义地图（定义）标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Definition/_Map/DefMap.ts
 */
/// <reference path="../../Entity.ts" />
/// <reference path="../../../Core/_Tag/IMapTag.ts" />
/// <reference path="BGImage.ts" />
/// <reference path="Point.ts" />
var Tag;
(function (Tag) {
    var Util = __Bigine_Util;
    var DefMap = (function (_super) {
        __extends(DefMap, _super);
        /**
         * 构造函数。
         */
        function DefMap(params, content, children, lineNo) {
            var _this = this;
            _super.call(this, params, content, children, lineNo);
            this._a = {};
            if (!this.$q('BGImage').length && !params.length)
                throw new E(E.DEF_MAP_BGIMAGE_NOT_FOUND, lineNo);
            Util.each(this.$q('Point'), function (point) {
                _this._a[point.gI()] = point;
                point.sM(params[0]);
            });
        }
        /**
         * 获取标签名称。
         */
        DefMap.prototype.gN = function () {
            return 'DefMap';
        };
        /**
         * 绑定（运行时）作品（实体）。
         */
        DefMap.prototype.$b = function (ep) {
            if (this._p[0])
                this._o = ep.q(this._p[0], Core.IEpisode.Entity.Map, this._l);
        };
        /**
         * 获取类型。
         */
        DefMap.prototype.gT = function () {
            return Core.IEpisode.Entity.Map;
        };
        /**
         * 获取资源。
         */
        DefMap.prototype.o = function () {
            return (this.$q('BGImage')[0] || this._o).o();
        };
        DefMap.prototype.gP = function (id) {
            if (id) {
                if (!(id in this._a))
                    throw new E(E.DEF_MAP_POINT_NOT_FOUND, this._l);
                return this._a[id];
            }
            return this._a;
        };
        /**
         * 获取所有关联资源。
         */
        DefMap.prototype.d = function () {
            var ret = [this.o()];
            Util.each(this._a, function (point) {
                ret.push(point.o());
            });
            return ret;
        };
        return DefMap;
    }(Tag.Entity));
    Tag.DefMap = DefMap;
})(Tag || (Tag = {}));
/**
 * 定义（房间）使用地图标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Definition/_Room/Link.ts
 */
/// <reference path="../../Unknown.ts" />
/// <reference path="../_Map/DefMap.ts" />
var Tag;
(function (Tag) {
    var Link = (function (_super) {
        __extends(Link, _super);
        function Link() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        Link.prototype.gN = function () {
            return 'Link';
        };
        /**
         * 绑定（运行时）作品（实体）。
         */
        Link.prototype.$b = function (ep) {
            this._o = ep.q(this._c, Core.IEpisode.Entity.Map, this._l);
        };
        /**
         * 获取关联地图。
         */
        Link.prototype.gM = function () {
            if (!this._b)
                throw new E(E.DEF_EPISODE_NOT_BINDED, this._l);
            return this._o;
        };
        return Link;
    }(Tag.Unknown));
    Tag.Link = Link;
})(Tag || (Tag = {}));
/**
 * 定义（房间）时刻标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Definition/_Room/Times.ts
 */
/// <reference path="../ResTable.ts" />
var Tag;
(function (Tag) {
    var Util = __Bigine_Util;
    var Times = (function (_super) {
        __extends(Times, _super);
        function Times() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        Times.prototype.gN = function () {
            return 'Times';
        };
        /**
         * 注册（自身实体）至（运行时）作品。
         */
        Times.prototype.$r = function (ep) {
            var _this = this;
            Util.each(this._s, function (tag, index) {
                var id = tag.$p(0);
                _this._o[id] = ep.r(tag.$c(), Core.IResource.Type.Room);
                if (!index)
                    _this._o['默认'] = _this._o[id];
            });
        };
        /**
         * 获取所有关联资源。
         */
        Times.prototype.d = function () {
            var ret = [];
            Util.each(this._o, function (resource, index) {
                if ('默认' != index)
                    ret.push(resource);
            });
            return ret;
        };
        return Times;
    }(Tag.ResTable));
    Tag.Times = Times;
})(Tag || (Tag = {}));
/**
 * 定义（作品事件）类型标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Structure/_Scene/Type.ts
 */
/// <reference path="../../Unknown.ts" />
/// <reference path="../../_Definition/_Room/DefRoom.ts" />
var Tag;
(function (Tag) {
    var Type = (function (_super) {
        __extends(Type, _super);
        /**
         * 构造函数。
         */
        function Type(params, content, children, lineNo) {
            _super.call(this, params, content, children, lineNo);
            var match = content.match(/^(进入|离开)（(.+)）(前|后)$/), term = content, type = Core.ISceneTag.Type;
            if (match) {
                this._o = match[2];
                term = match[1] + '房间' + match[3];
            }
            else {
                match = content.match(/^(([012])|([3-6])(.+))$/);
                if (match) {
                    this._o = match[4];
                    term = (match[2] || match[3]) - 0;
                }
            }
            switch (term) {
                case '开始时':
                case type.Begin:
                    this._t = type.Begin;
                    break;
                case '完结时':
                case type.End:
                    this._t = type.End;
                    break;
                case '失败时':
                case type.Fail:
                    this._t = type.Fail;
                    break;
                case '离开房间前':
                case type.PreLeave:
                    this._t = type.PreLeave;
                    break;
                case '进入房间前':
                case type.PreEnter:
                    this._t = type.PreEnter;
                    break;
                case '离开房间后':
                case type.PostLeave:
                    this._t = type.PostLeave;
                    break;
                case '进入房间后':
                case type.PostEnter:
                    this._t = type.PostEnter;
                    break;
                default:
                    throw new E(E.SCENE_TYPE_UNKNOWN, lineNo);
            }
            this._c = this._t + (this._o || '');
        }
        /**
         * 获取标签名称。
         */
        Type.prototype.gN = function () {
            return 'Type';
        };
        /**
         * 绑定（运行时）作品（实体）。
         */
        Type.prototype.$b = function (ep) {
            if (this._o)
                this._o = ep.q(this._o, Core.IEpisode.Entity.Room, this._l);
        };
        /**
         * 获取类型。
         */
        Type.prototype.gT = function () {
            return this._t;
        };
        /**
         * 获取关联对象。
         */
        Type.prototype.gR = function () {
            if (!this._b)
                throw new E(E.DEF_EPISODE_NOT_BINDED, this._l);
            return this._o;
        };
        return Type;
    }(Tag.Unknown));
    Tag.Type = Type;
})(Tag || (Tag = {}));
/**
 * 定义（作品事件）条件标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Structure/_Scene/Conditions.ts
 */
/// <reference path="../../Action.ts" />
var Tag;
(function (Tag) {
    var Util = __Bigine_Util;
    var Conditions = (function (_super) {
        __extends(Conditions, _super);
        function Conditions() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        Conditions.prototype.gN = function () {
            return 'Conditions';
        };
        /**
         * 检查。
         */
        Conditions.prototype.t = function (states) {
            return Util.every(this._s, function (condition) { return condition.t(states); });
        };
        return Conditions;
    }(Tag.Unknown));
    Tag.Conditions = Conditions;
})(Tag || (Tag = {}));
/**
 * 定义设置房间动作组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Director/AsRoom.ts
 */
/// <reference path="../../Action.ts" />
/// <reference path="../../_Definition/_Room/DefRoom.ts" />
var Tag;
(function (Tag) {
    var AsRoom = (function (_super) {
        __extends(AsRoom, _super);
        function AsRoom() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        AsRoom.prototype.gN = function () {
            return 'AsRoom';
        };
        /**
         * 绑定（运行时）作品（实体）。
         */
        AsRoom.prototype.$b = function (ep) {
            this._mo = ep.q(this._p[0], Core.IEpisode.Entity.Room, this._l);
        };
        /**
         * 执行。
         */
        AsRoom.prototype.p = function (runtime) {
            var states = runtime.gS(), kroom = '_rd', room = states.g(kroom), ktime = '_t', time = this._p[1] || states.g(ktime), director = runtime.gD(), map = this._mo.gM();
            if (!time)
                time = '午';
            if (room == this._p[0])
                return runtime;
            states.s(ktime, time);
            states.s(kroom, this._p[0]);
            states.s('$rd', this._mo);
            return director.asRoom(this._mo.o(time), false, map ? true : false)
                .then(function () { return director.asMap(map ? map.gP() : {}); });
        };
        /**
         * 获取依赖素材资源列表。
         */
        AsRoom.prototype.$d = function () {
            return this._mo.d();
        };
        /**
         * 获取关联房间。
         */
        AsRoom.prototype.gR = function () {
            return this._mo;
        };
        return AsRoom;
    }(Tag.Action));
    Tag.AsRoom = AsRoom;
})(Tag || (Tag = {}));
/**
 * 定义人物出场动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Director/CharOn.ts
 */
/// <reference path="../../Action.ts" />
/// <reference path="../../_Definition/_Char/DefChar.ts" />
var Tag;
(function (Tag) {
    var CharOn = (function (_super) {
        __extends(CharOn, _super);
        /**
         * 构造函数。
         */
        function CharOn(params, content, children, lineNo) {
            _super.call(this, params, content, children, lineNo);
            var pos = Core.IDirector.Position, exp = content.split('，');
            switch (params[0]) {
                case '最左':
                    this._mp = pos.LLeft;
                    break;
                case '左':
                    this._mp = pos.Left;
                    break;
                case '左中':
                    this._mp = pos.CLeft;
                    break;
                case '最右':
                    this._mp = pos.RRight;
                    break;
                case '右':
                    this._mp = pos.Right;
                    break;
                case '右中':
                    this._mp = pos.CRight;
                    break;
                case '中':
                case undefined:
                    this._mp = pos.Center;
                    break;
                default:
                    throw new E(E.ACT_ILLEGAL_POSITION, lineNo);
            }
            this._mc = exp[0];
            this._ms = exp[1] || '默认';
        }
        /**
         * 获取标签名称。
         */
        CharOn.prototype.gN = function () {
            return 'CharOn';
        };
        /**
         * 绑定（运行时）作品（实体）。
         */
        CharOn.prototype.$b = function (ep) {
            this._mo = ep.q(this._mc, Core.IEpisode.Entity.Chr, this._l);
        };
        /**
         * 执行。
         */
        CharOn.prototype.p = function (runtime) {
            var states = runtime.gS(), kpos = '.p' + this._mc, pos = states.g(kpos);
            if (pos)
                throw new E(E.ACT_CHAR_ONSTAGE, this._l);
            states.s(kpos, this._mp);
            states.s('_c' + this._mp, this._mc);
            states.s('_s' + this._mp, this._ms);
            return runtime.gD().charOn(this._mo.o(this._ms), this._mp);
        };
        /**
         * 获取依赖素材资源列表。
         */
        CharOn.prototype.$d = function () {
            return [this._mo.o(this._ms)];
        };
        /**
         * 获取关联人物。
         */
        CharOn.prototype.gC = function () {
            return this._mo;
        };
        return CharOn;
    }(Tag.Action));
    Tag.CharOn = CharOn;
})(Tag || (Tag = {}));
/**
 * 定义播放音乐动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Director/PlayBGM.ts
 */
/// <reference path="../../Action.ts" />
/// <reference path="../../_Definition/DefBGM.ts" />
var Tag;
(function (Tag) {
    var PlayBGM = (function (_super) {
        __extends(PlayBGM, _super);
        function PlayBGM() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        PlayBGM.prototype.gN = function () {
            return 'PlayBGM';
        };
        /**
         * 绑定（运行时）作品（实体）。
         */
        PlayBGM.prototype.$b = function (ep) {
            this._mo = ep.q(this._p[0], Core.IEpisode.Entity.BGM, this._l);
        };
        /**
         * 执行。
         */
        PlayBGM.prototype.p = function (runtime) {
            var states = runtime.gS(), key = '_b', vol = 0.01 * parseInt(this._p[1] || '100', 10), bgm = states.g(key);
            if (bgm && bgm[0] == this._p[0])
                return runtime;
            states.s(key, this._p);
            return runtime.gD().playMusic(Core.IResource.Type.BGM, this._mo ? this._mo.o() : undefined, vol);
        };
        /**
         * 获取依赖素材资源列表。
         */
        PlayBGM.prototype.$d = function () {
            return this._mo ? [this._mo.o()] : [];
        };
        /**
         * 获取关联音乐。
         */
        PlayBGM.prototype.gB = function () {
            return this._mo;
        };
        return PlayBGM;
    }(Tag.Action));
    Tag.PlayBGM = PlayBGM;
})(Tag || (Tag = {}));
/**
 * 定义播放环境音乐动作标签组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Director/PlayESM.ts
 */
/// <reference path="../../Action.ts" />
/// <reference path="../../_Definition/DefBGM.ts" />
var Tag;
(function (Tag) {
    var PlayESM = (function (_super) {
        __extends(PlayESM, _super);
        function PlayESM() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        PlayESM.prototype.gN = function () {
            return 'PlayESM';
        };
        /**
         * 绑定（运行时）作品（实体）。
         */
        PlayESM.prototype.$b = function (ep) {
            this._mo = ep.q(this._p[0], Core.IEpisode.Entity.BGM, this._l);
        };
        /**
         * 执行。
         */
        PlayESM.prototype.p = function (runtime) {
            var states = runtime.gS(), key = '_e', vol = 0.01 * parseInt(this._p[1] || '100', 10), esm = states.g(key);
            if (esm && esm[0] == this._p[0])
                return runtime;
            states.s(key, this._p);
            return runtime.gD().playMusic(Core.IResource.Type.ESM, this._mo ? this._mo.o() : undefined, vol);
        };
        /**
         * 获取依赖素材资源列表。
         */
        PlayESM.prototype.$d = function () {
            return this._mo ? [this._mo.o()] : [];
        };
        /**
         * 获取关联音乐。
         */
        PlayESM.prototype.gB = function () {
            return this._mo;
        };
        return PlayESM;
    }(Tag.Action));
    Tag.PlayESM = PlayESM;
})(Tag || (Tag = {}));
/**
 * 定义播放音效动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Director/PlaySE.ts
 */
/// <reference path="../../Action.ts" />
/// <reference path="../../_Definition/DefSE.ts" />
var Tag;
(function (Tag) {
    var PlaySE = (function (_super) {
        __extends(PlaySE, _super);
        function PlaySE() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        PlaySE.prototype.gN = function () {
            return 'PlaySE';
        };
        /**
         * 绑定（运行时）作品（实体）。
         */
        PlaySE.prototype.$b = function (ep) {
            this._mo = ep.q(this._p[0], Core.IEpisode.Entity.SE, this._l);
        };
        /**
         * 执行。
         */
        PlaySE.prototype.p = function (runtime) {
            var vol = 0.01 * parseInt(this._p[1] || '100', 10);
            return runtime.gD().playSE(this._mo ? this._mo.o() : undefined, vol);
        };
        /**
         * 获取依赖素材资源列表。
         */
        PlaySE.prototype.$d = function () {
            return this._mo ? [this._mo.o()] : [];
        };
        /**
         * 获取关联音效。
         */
        PlaySE.prototype.gS = function () {
            return this._mo;
        };
        return PlaySE;
    }(Tag.Action));
    Tag.PlaySE = PlaySE;
})(Tag || (Tag = {}));
/**
 * 定义展示特写动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Director/ShowCG.ts
 */
/// <reference path="../../Action.ts" />
/// <reference path="../../_Definition/DefCG.ts" />
var Tag;
(function (Tag) {
    var ShowCG = (function (_super) {
        __extends(ShowCG, _super);
        function ShowCG() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        ShowCG.prototype.gN = function () {
            return 'ShowCG';
        };
        /**
         * 绑定（运行时）作品（实体）。
         */
        ShowCG.prototype.$b = function (ep) {
            this._mo = ep.q(this._p[0], Core.IEpisode.Entity.CG, this._l);
        };
        /**
         * 执行。
         */
        ShowCG.prototype.p = function (runtime) {
            var states = runtime.gS(), key = '_c', cg = states.g(key);
            if (cg)
                throw new E(E.ACT_CG_ALREADY_SHOWN, this._l);
            states.s(key, this._p[0]);
            return runtime.gD().showCG(this._mo ? this._mo.o() : undefined);
        };
        /**
         * 获取依赖素材资源列表。
         */
        ShowCG.prototype.$d = function () {
            return this._mo ? [this._mo.o()] : [];
        };
        /**
         * 获取关联特写。
         */
        ShowCG.prototype.gC = function () {
            return this._mo;
        };
        return ShowCG;
    }(Tag.Action));
    Tag.ShowCG = ShowCG;
})(Tag || (Tag = {}));
/**
 * 定义唯一标识标签抽象组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/Idable.ts
 */
/// <reference path="Action.ts" />
/// <reference path="../Core/_Tag/IIdableTag.ts" />
var Tag;
(function (Tag) {
    var Idable = (function (_super) {
        __extends(Idable, _super);
        function Idable() {
            _super.apply(this, arguments);
        }
        /**
         * 转化为运行时（Javascript）代码。
         */
        Idable.prototype.toJsrn = function () {
            var clob = _super.prototype.toJsrn.call(this);
            return clob.substr(0, clob.length - 1) + ',"' + this._i + '")';
        };
        /**
         * 执行。
         */
        Idable.prototype.p = function (runtime) {
            if (!this._d)
                return runtime;
            var pos = Core.IDirector.Position, type = Core.IEpisode.Entity, states = runtime.gS(), director = runtime.gD(), episode = runtime.gE(), kid = '.c', kdata = '_c', kpose = '_s', kpos = '.p', kcmr = '.z', q = Promise.resolve(runtime), kroom = states.g('_rd'), kdo = '$rd', kcamera = '_z', camera = states.g(kcamera), bgm = states.g('_b'), esm = states.g('_e'), cg = states.g(kid), cur = states.g('_ra'), exp = states.g('_rb'), kfull = '_f', full = states.g(kfull), ll = pos.LLeft, llChar = states.g(kid + ll), l = pos.Left, lChar = states.g(kid + l), cl = pos.CLeft, clChar = states.g(kid + cl), c = pos.Center, cChar = states.g(kid + c), cr = pos.CRight, crChar = states.g(kid + cr), r = pos.Right, rChar = states.g(kid + r), rr = pos.RRight, rrChar = states.g(kid + rr), ctype = type.Chr, room;
            if (bgm)
                q = q.then(function () {
                    var defbgm = episode.q(typeof bgm == 'string' ? bgm : bgm[0], type.BGM);
                    var vol = typeof bgm == 'string' ? 1 : 0.01 * parseInt(bgm[1] || '100', 10);
                    return director.playMusic(Core.IResource.Type.BGM, defbgm ? defbgm.o() : undefined, vol);
                });
            if (esm)
                q = q.then(function () {
                    var defesm = episode.q(typeof esm == 'string' ? esm : esm[0], type.BGM);
                    var vol = typeof esm == 'string' ? 1 : 0.01 * parseInt(esm[1] || '100', 10);
                    return director.playMusic(Core.IResource.Type.ESM, defesm ? defesm.o() : undefined, vol);
                });
            if (cur)
                q = q.then(function () {
                    return director.curtain(cur);
                });
            if (exp)
                q = q.then(function () {
                    return director.expression(exp);
                });
            if (kroom && !states.g(kdo))
                q = q.then(function () {
                    states.s(kdo, room = episode.q(kroom, type.Room));
                    return director.asRoom(room.o(states.g('_t')), false, room.gM() ? true : false)
                        .then(function () {
                        if (!camera)
                            return runtime;
                        var strArr = camera.split(','), mx = parseFloat(strArr[0]), my = parseFloat(strArr[1]);
                        states.s(kcmr, camera);
                        return director.cameraZoom(mx, my, 20, 1);
                    })
                        .then(function () { return room.gM() ? director.asMap(room.gM().gP()) : runtime; });
                });
            if (cg)
                q = q.then(function () {
                    states.m(kid, kdata);
                    var defcg = episode.q(cg, type.CG), rescg = defcg ? defcg.o() : undefined;
                    return director.setCG(rescg);
                });
            if (llChar)
                q = q.then(function () {
                    states.m(kid + ll, kdata + ll)
                        .s(kpos + llChar, ll);
                    return director.charSet(episode.q(llChar, ctype).o(states.g(kpose + ll)), ll);
                });
            if (lChar)
                q = q.then(function () {
                    states.m(kid + l, kdata + l)
                        .s(kpos + lChar, l);
                    return director.charSet(episode.q(lChar, ctype).o(states.g(kpose + l)), l);
                });
            if (clChar)
                q = q.then(function () {
                    states.m(kid + cl, kdata + cl)
                        .s(kpos + clChar, cl);
                    return director.charSet(episode.q(clChar, ctype).o(states.g(kpose + cl)), cl);
                });
            if (cChar)
                q = q.then(function () {
                    states.m(kid + c, kdata + c)
                        .s(kpos + cChar, c);
                    return director.charSet(episode.q(cChar, ctype).o(states.g(kpose + c)), c);
                });
            if (crChar)
                q = q.then(function () {
                    states.m(kid + cr, kdata + cr)
                        .s(kpos + crChar, cr);
                    return director.charSet(episode.q(crChar, ctype).o(states.g(kpose + cr)), cr);
                });
            if (rChar)
                q = q.then(function () {
                    states.m(kid + r, kdata + r)
                        .s(kpos + rChar, r);
                    return director.charSet(episode.q(rChar, ctype).o(states.g(kpose + r)), r);
                });
            if (rrChar)
                q = q.then(function () {
                    states.m(kid + rr, kdata + rr)
                        .s(kpos + rrChar, rr);
                    return director.charSet(episode.q(rrChar, ctype).o(states.g(kpose + rr)), rr);
                });
            if (full)
                q = q.then(function () {
                    return director.fullWords(full);
                });
            return q;
        };
        /**
         * 获取编号。
         */
        Idable.prototype.gI = function () {
            return this._i;
        };
        /**
         * 恢复编号。
         */
        Idable.prototype.i = function (id) {
            this._i = id;
        };
        /**
         * 恢复人物和特写。
         */
        Idable.prototype.d = function () {
            this._d = true;
            return this;
        };
        return Idable;
    }(Tag.Action));
    Tag.Idable = Idable;
})(Tag || (Tag = {}));
/**
 * 定义对白动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Text/Speak.ts
 */
/// <reference path="../../Idable.ts" />
/// <reference path="../../_Definition/_Char/DefChar.ts" />
var Tag;
(function (Tag) {
    var Speak = (function (_super) {
        __extends(Speak, _super);
        function Speak() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        Speak.prototype.gN = function () {
            return 'Speak';
        };
        /**
         * 绑定（运行时）作品（实体）。
         */
        Speak.prototype.$b = function (ep) {
            this._mc = ep.q(this._p[0], Core.IEpisode.Entity.Chr, this._l);
        };
        /**
         * 执行。
         */
        Speak.prototype.p = function (runtime) {
            var _this = this;
            return Promise.resolve(_super.prototype.p.call(this, runtime))
                .then(function () { return runtime.a(_this).gD()
                .words(runtime.gS().t(_this._c), 'speak', _this._p[2] || _this._mc.gI(), _this._mc.o()); });
        };
        /**
         * 获取依赖素材资源列表。
         */
        Speak.prototype.$d = function () {
            return [this._mc.o()];
        };
        /**
         * 获取关联人物。
         */
        Speak.prototype.gC = function () {
            return this._mc;
        };
        return Speak;
    }(Tag.Idable));
    Tag.Speak = Speak;
})(Tag || (Tag = {}));
/**
 * 声明块标签接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_Tag/IBlock.ts
 */
/**
 * 定义循环动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Logic/Loop.ts
 */
/// <reference path="../../_Action/_Director/AsRoom.ts" />
/// <reference path="../../_Action/_Director/CharOn.ts" />
/// <reference path="../../_Action/_Director/PlayBGM.ts" />
/// <reference path="../../_Action/_Director/PlayESM.ts" />
/// <reference path="../../_Action/_Director/PlaySE.ts" />
/// <reference path="../../_Action/_Director/ShowCG.ts" />
/// <reference path="../../_Action/_Text/Speak.ts" />
/// <reference path="../../../Core/_Tag/IBlock.ts" />
var Tag;
(function (Tag) {
    var Util = __Bigine_Util;
    var Loop = (function (_super) {
        __extends(Loop, _super);
        function Loop() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        Loop.prototype.gN = function () {
            return 'Loop';
        };
        /**
         * （执行）检查。
         */
        Loop.prototype.t = function (states) {
            return false;
        };
        /**
         * 执行。
         */
        Loop.prototype.p = function (runtime) {
            var _this = this;
            var states = runtime.gS(), logger = runtime.gL(), title = 'LOOP', kd = '$d', depth = states.g(kd), kid = '.a', id, loop = function () {
                return Util.Q.every(_this._s, function (action) {
                    if (runtime.gH())
                        return E.doBreak();
                    id = states.g(kid);
                    if (id) {
                        if ('gI' in action) {
                            if (action.gI() != id)
                                return runtime;
                            states.d(kid);
                            action.d();
                        }
                        else if ('gA' in action) {
                            if (-1 == Util.indexOf(action.gA(), id))
                                return runtime;
                        }
                        else
                            return runtime;
                    }
                    return action.p(runtime);
                }).then(loop);
            };
            logger.o(title);
            states.s(kd, 1 + depth);
            return loop()['catch'](E.ignoreBreak)['catch'](function (error) {
                if (error && E.Signal.HALT == error.signal)
                    logger.c(title);
                throw error;
            }).then(function () {
                states.s(kd, depth);
                logger.c(title);
                return runtime;
            });
        };
        /**
         * 获取关键动作编号列表。
         */
        Loop.prototype.gA = function () {
            var ids = [];
            Util.each(this._s, function (action) {
                switch (action.gN()) {
                    case 'Monolog':
                    case 'Speak':
                    case 'VoiceOver':
                    case 'Tip':
                    case 'Unlock':
                    case 'Donate':
                        ids.push(action.gI());
                        break;
                    case 'Loop':
                    case 'Otherwise':
                    case 'Then':
                    case 'When':
                    case 'WhenVar':
                        ids = ids.concat(action.gA());
                        break;
                }
            });
            return ids;
        };
        /**
         * 获取使用资源列表。
         */
        Loop.prototype.c = function () {
            var frame = [], resources = [], pack = function () {
                if (frame.length) {
                    resources.push(frame);
                    frame = [];
                }
            };
            Util.each(this._s, function (action) {
                switch (action.gN()) {
                    case 'AsRoom':
                    case 'CharOn':
                    case 'CharPose':
                    case 'CharSet':
                    case 'PlayBGM':
                    case 'PlayESM':
                    case 'PlaySE':
                    case 'ShowCG':
                        frame = frame.concat(action.$d());
                        break;
                    case 'Monolog':
                    case 'Speak':
                        frame = frame.concat(action.$d());
                        pack();
                        break;
                    case 'VoiceOver':
                        pack();
                        break;
                    case 'Loop':
                    case 'Otherwise':
                    case 'Then':
                    case 'When':
                    case 'WhenVar':
                        pack();
                        resources = resources.concat(action.c());
                        break;
                }
            });
            if (frame.length)
                resources.push(frame);
            return resources;
        };
        return Loop;
    }(Tag.Action));
    Tag.Loop = Loop;
})(Tag || (Tag = {}));
/**
 * 定义（作品事件）内容标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Structure/_Scene/Content.ts
 */
/// <reference path="../../_Action/_Logic/Loop.ts" />
var Tag;
(function (Tag) {
    var Util = __Bigine_Util;
    var Content = (function (_super) {
        __extends(Content, _super);
        function Content() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        Content.prototype.gN = function () {
            return 'Content';
        };
        /**
         * 执行。
         */
        Content.prototype.p = function (runtime) {
            var _this = this;
            var director = runtime.gD(), states = runtime.gS(), logger = runtime.gL(), title = 'CONTENT', kid = '.a', id = states.g(kid);
            logger.o(title);
            states.s('$d', 1);
            return director.c(Tag.Loop.prototype.c.call(this))
                .then(function () { return Util.Q.every(_this._s, function (action) {
                if (runtime.gH())
                    return E.doHalt();
                id = states.g(kid);
                if (id) {
                    if ('gI' in action) {
                        if (action.gI() != id)
                            return runtime;
                        states.d(kid);
                        action.d();
                    }
                    else if ('gA' in action) {
                        if (-1 == Util.indexOf(action.gA(), id))
                            return runtime;
                    }
                    else
                        return runtime;
                }
                return action.p(runtime);
            }); })['catch'](function (error) {
                if (error && E.Signal.HALT == error.signal)
                    logger.c(title);
                throw error;
            }).then(function () {
                logger.c(title);
                return runtime;
            });
        };
        /**
         * 获取关键动作编号列表。
         */
        Content.prototype.gA = function () {
            return Tag.Loop.prototype.gA.call(this);
        };
        return Content;
    }(Tag.Unknown));
    Tag.Content = Content;
})(Tag || (Tag = {}));
/**
 * 定义（作品）事件标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Structure/_Scene/Scene.ts
 */
/// <reference path="Type.ts" />
/// <reference path="Conditions.ts" />
/// <reference path="Content.ts" />
var Tag;
(function (Tag) {
    var Scene = (function (_super) {
        __extends(Scene, _super);
        function Scene() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        Scene.prototype.gN = function () {
            return 'Scene';
        };
        /**
         * 绑定（运行时）作品（实体）。
         */
        Scene.prototype.$b = function (ep) {
            (this.$q('Type')[0].gR() || ep).a(this);
        };
        /**
         * 转化为运行时（Javascript）代码。
         */
        Scene.prototype.toJsrn = function () {
            var clob = _super.prototype.toJsrn.call(this);
            return clob.substr(0, clob.length - 1) + ',"' + this._i + '")';
        };
        /**
         * 获取编号。
         */
        Scene.prototype.gI = function () {
            return this._i;
        };
        /**
         * 恢复编号。
         */
        Scene.prototype.i = function (id) {
            this._i = id;
        };
        /**
         * 执行。
         */
        Scene.prototype.p = function (runtime) {
            var states = runtime.gS(), logger = runtime.gL(), title = 'SCENE ' + this._c, tconds = 'CONDITIONS', kid = '.s', id = states.g(kid), conds = this.$q('Conditions')[0], rconds, content;
            logger.o(title);
            if (id) {
                if (id != this._i)
                    return runtime;
                states.d(kid);
            }
            else if (conds) {
                logger.o(tconds);
                rconds = conds.t(runtime.gS());
                logger.c(tconds);
                if (!rconds) {
                    logger.c(title);
                    return runtime;
                }
            }
            content = this.$q('Content')[0];
            return Promise.resolve(content.p(runtime.s(this, this._c, content.gA())))['catch'](function (error) {
                if (error && E.Signal.HALT == error.signal)
                    logger.c(title);
                throw error;
            }).then(function () {
                logger.c(title);
                return runtime;
            });
        };
        /**
         * 获取类型。
         */
        Scene.prototype.gT = function () {
            return this.$q('Type')[0].gT();
        };
        return Scene;
    }(Tag.Unknown));
    Tag.Scene = Scene;
})(Tag || (Tag = {}));
/**
 * 定义房间（定义）标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Definition/_Room/DefRoom.ts
 */
/// <reference path="../../Entity.ts" />
/// <reference path="../../../Core/_Tag/IRoomTag.ts" />
/// <reference path="Link.ts" />
/// <reference path="Times.ts" />
/// <reference path="../../_Structure/_Scene/Scene.ts" />
var Tag;
(function (Tag) {
    var Util = __Bigine_Util;
    var DefRoom = (function (_super) {
        __extends(DefRoom, _super);
        /**
         * 构造函数。
         */
        function DefRoom(params, content, children, lineNo) {
            _super.call(this, params, content, children, lineNo);
            this._a = {};
            if (!this.$q('Link').length && !this.$q('Times').length)
                throw new E(E.DEF_ROOM_EMPTY, lineNo);
        }
        /**
         * 获取标签名称。
         */
        DefRoom.prototype.gN = function () {
            return 'DefRoom';
        };
        /**
         * 获取类型。
         */
        DefRoom.prototype.gT = function () {
            return Core.IEpisode.Entity.Room;
        };
        /**
         * 添加事件。
         */
        DefRoom.prototype.a = function (scene) {
            var type = scene.gT();
            this._a[type] = this._a[type] || [];
            this._a[type].push(scene);
            return this;
        };
        /**
         * 播放。
         */
        DefRoom.prototype.p = function (type, runtime, name) {
            return (type in this._a ?
                Util.Q.every(this._a[type], function (scene) {
                    if (runtime.gH())
                        return E.doHalt();
                    if (name) {
                        if (scene.$q('Type')[0].$c() == type.toString() + name)
                            return scene.p(runtime);
                    }
                    else {
                        return scene.p(runtime);
                    }
                }) :
                Promise.resolve(runtime)).then(function () { return Core.ISceneTag.Type.PostEnter == type ?
                runtime.gD().lightOn() :
                runtime; });
        };
        /**
         * 获取资源。
         */
        DefRoom.prototype.o = function (id) {
            var map = this.gM();
            if (map)
                return map.o();
            return this.$q('Times')[0].o(id);
        };
        /**
         * 获取关联地图。
         */
        DefRoom.prototype.gM = function () {
            var l = this.$q('Link')[0];
            if (!l)
                return;
            return l.gM();
        };
        /**
         * 获取所有关联资源。
         */
        DefRoom.prototype.d = function () {
            var map = this.gM();
            if (map)
                return map.d();
            return this.$q('Times')[0].d();
        };
        return DefRoom;
    }(Tag.Entity));
    Tag.DefRoom = DefRoom;
})(Tag || (Tag = {}));
/**
 * 定义自动播放标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Structure/Auto.ts
 */
/// <reference path="../Unknown.ts" />
var Tag;
(function (Tag) {
    var Auto = (function (_super) {
        __extends(Auto, _super);
        function Auto() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        Auto.prototype.gN = function () {
            return 'Auto';
        };
        return Auto;
    }(Tag.Unknown));
    Tag.Auto = Auto;
})(Tag || (Tag = {}));
/**
 * 定义主角标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Definition/Player.ts
 */
/// <reference path="../Unknown.ts" />
/// <reference path="_Char/DefChar.ts" />
var Tag;
(function (Tag) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        Player.prototype.gN = function () {
            return 'Player';
        };
        /**
         * 绑定（运行时）作品（实体）。
         */
        Player.prototype.$b = function (ep) {
            this._o = ep.q(this._c, Core.IEpisode.Entity.Chr, this._l);
            ep.f(this);
        };
        /**
         * 获取唯一编号。
         */
        Player.prototype.gI = function () {
            return '';
        };
        /**
         * 获取类型。
         */
        Player.prototype.gT = function () {
            return Core.IEpisode.Entity.Player;
        };
        /**
         * 获取关联角色。
         */
        Player.prototype.gC = function () {
            if (!this._b)
                throw new E(E.DEF_EPISODE_NOT_BINDED, this._l);
            return this._o;
        };
        return Player;
    }(Tag.Unknown));
    Tag.Player = Player;
})(Tag || (Tag = {}));
/**
 * 声明默认主题对象组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_Resource/ITheme.ts
 */
/// <reference path="../../../include/tsd.d.ts" />
var Core;
(function (Core) {
    var ITheme;
    (function (ITheme) {
        ITheme.THEME = {
            "author": {
                "title": {
                    "x": 0,
                    "y": 324,
                    "w": 1280,
                    "h": 72,
                    "s": 72,
                    "lh": 72,
                    "a": "center",
                    "c": "#fff"
                },
                "director": {
                    "x": 0,
                    "y": 408,
                    "w": 1280,
                    "h": 24,
                    "s": 24,
                    "lh": 24,
                    "a": "center",
                    "c": "#fff"
                }
            },
            "full": {
                "back": {
                    "x": 0,
                    "y": 0,
                    "w": 1280,
                    "h": 720,
                    "i": "full.png"
                },
                "text": {
                    "x": 100,
                    "y": 100,
                    "w": 1080,
                    "h": 520,
                    "lh": 38,
                    "ls": 5,
                    "s": 28,
                    "ss": 3,
                    "c": "#fff",
                    "ch": "#f90",
                    "row": 13
                }
            },
            "stars": {
                "name": {
                    "x": -200,
                    "y": -200,
                    "w": 100,
                    "h": 72,
                    "s": 38,
                    "lh": 72,
                    "a": "center",
                    "c": "#fff"
                },
                "value": {
                    "x": -100,
                    "y": -200,
                    "w": 100,
                    "h": 72,
                    "s": 38,
                    "lh": 72,
                    "a": "center",
                    "c": "#fff"
                },
                "pic": {
                    "1": "rank/star.png",
                    "2": "rank/stars2.png",
                    "3": "rank/stars3.png",
                    "4": "rank/stars4.png",
                    "5": "rank/stars5.png"
                }
            },
            "start": {
                "i": "start/bg.jpg",
                "new": {
                    "x": 494,
                    "y": 218,
                    "w": 0,
                    "h": 0,
                    "i": "start/new.png",
                    "ih": "start/new~hover.png"
                },
                "series": {
                    "x": 494,
                    "y": 218,
                    "w": 0,
                    "h": 0,
                    "i": "start/Continue.png",
                    "ih": "start/Continue~hover.png"
                },
                "load": {
                    "x": 494,
                    "y": 384,
                    "w": 0,
                    "h": 0,
                    "i": "start/load.png",
                    "ih": "start/load~hover.png"
                },
                "title": {
                    "x": 1280,
                    "y": 0,
                    "w": 1020,
                    "h": 48,
                    "s": 48,
                    "lh": 48,
                    "c": "#ff9600"
                }
            },
            "speak": {
                "back": {
                    "x": 0,
                    "y": 490,
                    "w": 1280,
                    "h": 230,
                    "i": "speak.png"
                },
                "avatar": {
                    "x": 0,
                    "y": 492,
                    "w": 228,
                    "h": 228
                },
                "name": {
                    "x": 234,
                    "y": 540,
                    "w": 700,
                    "h": 155,
                    "s": 30,
                    "lh": 42,
                    "ss": 0,
                    "c": "#fff"
                },
                "text": {
                    "x": 250,
                    "y": 590,
                    "w": 800,
                    "h": 155,
                    "s": 28,
                    "lh": 36,
                    "ss": 0,
                    "ls": 5,
                    "c": "#fff",
                    "ch": "#f90"
                }
            },
            "monolog": {
                "back": {
                    "x": 0,
                    "y": 490,
                    "w": 1280,
                    "h": 230,
                    "i": "speak.png"
                },
                "avatar": {
                    "x": 0,
                    "y": 492,
                    "w": 228,
                    "h": 228
                },
                "name": {
                    "x": 234,
                    "y": 540,
                    "w": 700,
                    "h": 155,
                    "s": 30,
                    "lh": 42,
                    "ss": 0,
                    "c": "#fff"
                },
                "text": {
                    "x": 250,
                    "y": 590,
                    "w": 800,
                    "h": 155,
                    "s": 28,
                    "lh": 36,
                    "ss": 0,
                    "ls": 5,
                    "c": "#fff",
                    "ch": "#f90"
                }
            },
            "voiceover": {
                "back": {
                    "x": 0,
                    "y": 490,
                    "w": 1280,
                    "h": 230,
                    "i": "speak.png"
                },
                "text": {
                    "x": 250,
                    "y": 540,
                    "w": 800,
                    "h": 155,
                    "s": 28,
                    "lh": 36,
                    "ss": 0,
                    "ls": 5,
                    "c": "#fff",
                    "ch": "#f90"
                }
            },
            "cg": {
                "x": 0,
                "y": 0,
                "w": 1280,
                "h": 720
            },
            "tip": {
                "back": {
                    "x": 0,
                    "y": 300,
                    "w": 1280,
                    "h": 110,
                    "i": "tip.png"
                },
                "text": {
                    "x": 0,
                    "y": 340,
                    "w": 1280,
                    "h": 30,
                    "s": 36,
                    "lh": 48,
                    "c": "#fff",
                    "ch": "#f90",
                    "ss": 3
                }
            },
            "choose": {
                "m": 20,
                "back": {
                    "w": 800,
                    "h": 66,
                    "i": "choose/image.png",
                    "ih": "choose/hover.png"
                },
                "text": {
                    "x": 0,
                    "y": 0,
                    "w": 800,
                    "h": 66,
                    "s": 32,
                    "lh": 66,
                    "c": "#fff",
                    "ch": "#f90",
                    "ss": 2
                },
                "radish": {
                    "x": 0,
                    "y": 0,
                    "w": 80,
                    "h": 42,
                    "i": "choose/luobo.png"
                },
                "count": {
                    "x": 0,
                    "y": 0,
                    "w": 80,
                    "h": 28,
                    "s": 28,
                    "lh": 28,
                    "c": "#f90",
                    "ch": "#f90",
                    "ss": 2
                }
            },
            "tray": {
                "menu": {
                    "x": 1164,
                    "y": 580,
                    "w": 96,
                    "h": 96,
                    "i": "menu/menu.png",
                    "ih": "menu/menu~hover.png"
                },
                "panel": {
                    "x": 1100,
                    "y": 618,
                    "w": 60,
                    "h": 63,
                    "i": "menu/panel.png",
                    "ih": "menu/panel~hover.png"
                }
            },
            "menu": {
                "mask": {
                    "cb": "#000",
                    "o": 0.8
                },
                "close": {
                    "x": 1166,
                    "y": 582,
                    "w": 94,
                    "h": 94,
                    "i": "menu/back.png",
                    "ih": "menu/back~hover.png"
                },
                "save": {
                    "x": 466,
                    "y": 100,
                    "w": 0,
                    "h": 0,
                    "i": "menu/save.png",
                    "ih": "menu/save~hover.png"
                },
                "load": {
                    "x": 466,
                    "y": 240,
                    "w": 0,
                    "h": 0,
                    "i": "menu/load.png",
                    "ih": "menu/load~hover.png"
                },
                "set": {
                    "x": 466,
                    "y": 380,
                    "w": 0,
                    "h": 0,
                    "i": "menu/setup.png",
                    "ih": "menu/setup~hover.png"
                },
                "replay": {
                    "x": 466,
                    "y": 520,
                    "w": 0,
                    "h": 0,
                    "i": "menu/replay.png",
                    "ih": "menu/replay~hover.png"
                }
            },
            "set": {
                "mask": {
                    "cb": "#000",
                    "o": 0.8
                },
                "close": {
                    "x": 1166,
                    "y": 582,
                    "w": 94,
                    "h": 94,
                    "i": "menu/back.png",
                    "ih": "menu/back~hover.png"
                },
                "title": {
                    "x": 320,
                    "y": 190,
                    "w": 600,
                    "h": 36,
                    "s": 48,
                    "lh": 42,
                    "c": "#fff",
                    "a": "left"
                },
                "bgm": {
                    "name": {
                        "x": 390,
                        "y": 294,
                        "w": 100,
                        "h": 36,
                        "s": 25,
                        "lh": 42,
                        "c": "#fff",
                        "a": "left"
                    },
                    "bar": {
                        "x": 530,
                        "y": 297,
                        "w": 365,
                        "h": 23,
                        "i": "menu/bar.png",
                        "ih": "menu/bar.png"
                    },
                    "bg": {
                        "x": 0,
                        "y": 0,
                        "w": 1280,
                        "h": 720,
                        "i": "menu/barbg02.png"
                    },
                    "volume": {
                        "x": 920,
                        "y": 294,
                        "w": 50,
                        "h": 50,
                        "s": 25,
                        "lh": 42,
                        "c": "#fff",
                        "a": "center"
                    }
                },
                "se": {
                    "name": {
                        "x": 400,
                        "y": 424,
                        "w": 100,
                        "h": 36,
                        "s": 25,
                        "lh": 42,
                        "c": "#fff",
                        "a": "left"
                    },
                    "bar": {
                        "x": 530,
                        "y": 427,
                        "w": 365,
                        "h": 23,
                        "i": "menu/bar.png",
                        "ih": "menu/bar.png"
                    },
                    "bg": {
                        "x": 0,
                        "y": 0,
                        "w": 1280,
                        "h": 720,
                        "i": "menu/barbg02.png"
                    },
                    "volume": {
                        "x": 920,
                        "y": 424,
                        "w": 50,
                        "h": 50,
                        "s": 25,
                        "lh": 42,
                        "c": "#fff",
                        "a": "center"
                    }
                }
            },
            "slots": {
                "mask": {
                    "cb": "#000",
                    "o": 0.8
                },
                "close": {
                    "x": 1166,
                    "y": 582,
                    "w": 94,
                    "h": 94,
                    "i": "menu/back.png",
                    "ih": "menu/back~hover.png"
                },
                "auto": {
                    "x": 416,
                    "y": 470,
                    "w": 484,
                    "h": 120,
                    "i": "menu/auto.png",
                    "ih": "menu/auto~hover.png",
                    "text": {
                        "x": 560,
                        "y": 500,
                        "w": 320,
                        "h": 80,
                        "s": 25,
                        "lh": 80,
                        "c": "#fff"
                    }
                },
                "1": {
                    "x": 154,
                    "y": 114,
                    "w": 484,
                    "h": 120,
                    "i": "menu/1.png",
                    "ih": "menu/1~hover.png",
                    "text": {
                        "x": 300,
                        "y": 142,
                        "w": 320,
                        "h": 80,
                        "s": 25,
                        "lh": 80,
                        "c": "#fff"
                    }
                },
                "2": {
                    "x": 674,
                    "y": 114,
                    "w": 484,
                    "h": 120,
                    "i": "menu/2.png",
                    "ih": "menu/2~hover.png",
                    "text": {
                        "x": 822,
                        "y": 144,
                        "w": 320,
                        "h": 80,
                        "s": 25,
                        "lh": 80,
                        "c": "#fff"
                    }
                },
                "3": {
                    "x": 154,
                    "y": 305,
                    "w": 484,
                    "h": 120,
                    "i": "menu/3.png",
                    "ih": "menu/3~hover.png",
                    "text": {
                        "x": 300,
                        "y": 334,
                        "w": 320,
                        "h": 80,
                        "s": 25,
                        "lh": 80,
                        "c": "#fff"
                    }
                },
                "4": {
                    "x": 674,
                    "y": 305,
                    "w": 484,
                    "h": 120,
                    "i": "menu/4.png",
                    "ih": "menu/4~hover.png",
                    "text": {
                        "x": 822,
                        "y": 334,
                        "w": 320,
                        "h": 80,
                        "s": 25,
                        "lh": 80,
                        "c": "#fff"
                    }
                }
            },
            "series": {
                "mask": {
                    "cb": "#000",
                    "o": 0.8
                },
                "close": {
                    "x": 1166,
                    "y": 582,
                    "w": 94,
                    "h": 94,
                    "i": "menu/back.png",
                    "ih": "menu/back~hover.png"
                },
                "text": {
                    "x": 20,
                    "y": 690,
                    "w": 1280,
                    "h": 24,
                    "s": 24,
                    "lh": 24,
                    "c": "#fff",
                    "desc": "本集已完结。"
                },
                "auto": {
                    "x": 416,
                    "y": 470,
                    "w": 484,
                    "h": 120,
                    "i": "menu/auto.png",
                    "ih": "menu/auto~hover.png",
                    "text": {
                        "x": 560,
                        "y": 500,
                        "w": 320,
                        "h": 80,
                        "s": 25,
                        "lh": 80,
                        "c": "#fff"
                    }
                },
                "1": {
                    "x": 154,
                    "y": 114,
                    "w": 484,
                    "h": 120,
                    "i": "menu/1.png",
                    "ih": "menu/1~hover.png",
                    "text": {
                        "x": 300,
                        "y": 142,
                        "w": 320,
                        "h": 80,
                        "s": 25,
                        "lh": 80,
                        "c": "#fff"
                    }
                },
                "2": {
                    "x": 674,
                    "y": 114,
                    "w": 484,
                    "h": 120,
                    "i": "menu/2.png",
                    "ih": "menu/2~hover.png",
                    "text": {
                        "x": 822,
                        "y": 142,
                        "w": 320,
                        "h": 80,
                        "s": 25,
                        "lh": 80,
                        "c": "#fff"
                    }
                },
                "3": {
                    "x": 154,
                    "y": 305,
                    "w": 484,
                    "h": 120,
                    "i": "menu/3.png",
                    "ih": "menu/3~hover.png",
                    "text": {
                        "x": 300,
                        "y": 334,
                        "w": 320,
                        "h": 80,
                        "s": 25,
                        "lh": 80,
                        "c": "#fff"
                    }
                },
                "4": {
                    "x": 674,
                    "y": 305,
                    "w": 484,
                    "h": 120,
                    "i": "menu/4.png",
                    "ih": "menu/4~hover.png",
                    "text": {
                        "x": 822,
                        "y": 334,
                        "w": 320,
                        "h": 80,
                        "s": 25,
                        "lh": 80,
                        "c": "#fff"
                    }
                }
            },
            "status": {
                "back": {
                    "x": 0,
                    "y": 14,
                    "w": 1280,
                    "h": 62,
                    "i": "status.png"
                },
                "1": {
                    "title": {
                        "x": 64,
                        "y": 8,
                        "w": 140,
                        "h": 40,
                        "s": 24,
                        "lh": 60,
                        "c": "#fff"
                    },
                    "value": {
                        "x": 64,
                        "y": 8,
                        "w": 140,
                        "h": 40,
                        "s": 24,
                        "lh": 60,
                        "c": "#fff"
                    }
                },
                "2": {
                    "title": {
                        "x": 240,
                        "y": 8,
                        "w": 140,
                        "h": 40,
                        "s": 24,
                        "lh": 60,
                        "c": "#fff"
                    },
                    "value": {
                        "x": 240,
                        "y": 8,
                        "w": 140,
                        "h": 40,
                        "s": 24,
                        "lh": 60,
                        "c": "#fff"
                    }
                },
                "3": {
                    "title": {
                        "x": 445,
                        "y": 8,
                        "w": 140,
                        "h": 40,
                        "s": 24,
                        "lh": 60,
                        "c": "#fff"
                    },
                    "value": {
                        "x": 445,
                        "y": 8,
                        "w": 140,
                        "h": 40,
                        "s": 24,
                        "lh": 60,
                        "c": "#fff"
                    }
                },
                "4": {
                    "title": {
                        "x": 650,
                        "y": 8,
                        "w": 140,
                        "h": 40,
                        "s": 24,
                        "lh": 60,
                        "c": "#fff"
                    },
                    "value": {
                        "x": 650,
                        "y": 8,
                        "w": 140,
                        "h": 40,
                        "s": 24,
                        "lh": 60,
                        "c": "#fff"
                    }
                },
                "5": {
                    "title": {
                        "x": 855,
                        "y": 8,
                        "w": 140,
                        "h": 40,
                        "s": 24,
                        "lh": 60,
                        "c": "#fff"
                    },
                    "value": {
                        "x": 855,
                        "y": 8,
                        "w": 140,
                        "h": 40,
                        "s": 24,
                        "lh": 60,
                        "c": "#fff"
                    }
                },
                "6": {
                    "title": {
                        "x": 1060,
                        "y": 8,
                        "w": 140,
                        "h": 40,
                        "s": 24,
                        "lh": 60,
                        "c": "#fff"
                    },
                    "value": {
                        "x": 1060,
                        "y": 8,
                        "w": 140,
                        "h": 40,
                        "s": 24,
                        "lh": 60,
                        "c": "#fff"
                    }
                }
            },
            "panel": {
                "mask": {
                    "cb": "#000",
                    "o": 0.8
                },
                "back": {
                    "x": 0,
                    "y": 0,
                    "w": 0,
                    "h": 0,
                    "i": "panel/panelbg.png"
                },
                "close": {
                    "x": 1080,
                    "y": 36,
                    "w": 82,
                    "h": 61,
                    "i": "panel/close.png",
                    "ih": "panel/close~hover.png"
                },
                "tab": {
                    "title": {
                        "w": 155,
                        "h": 56,
                        "i": "panel/tab.png",
                        "ia": "panel/tab~choose.png",
                        "s": 28,
                        "lh": 60,
                        "c": "#ffffff"
                    },
                    "1": {
                        "x": 120,
                        "y": 42
                    },
                    "2": {
                        "x": 280,
                        "y": 42
                    },
                    "3": {
                        "x": 440,
                        "y": 42
                    },
                    "4": {
                        "x": 600,
                        "y": 42
                    },
                    "5": {
                        "x": 760,
                        "y": 42
                    },
                    "6": {
                        "x": 920,
                        "y": 42
                    }
                },
                "type": {
                    "星": {
                        "w": 25,
                        "h": 25,
                        "m": 5,
                        "ei": "panel/star.png",
                        "fi": "panel/star~hover.png"
                    },
                    "心": {
                        "w": 25,
                        "h": 25,
                        "m": 5,
                        "ei": "panel/heart.png",
                        "fi": "panel/heart~hover.png"
                    }
                },
                "simp": {
                    "back": {
                        "x": 0,
                        "y": 0,
                        "w": 0,
                        "h": 0,
                        "i": "panel/simppanelbg.png"
                    },
                    "1": {
                        "title": {
                            "x": 155,
                            "y": 170,
                            "w": 210,
                            "h": 74,
                            "s": 32,
                            "lh": 74,
                            "c": "#fff"
                        },
                        "value": {
                            "x": 330,
                            "y": 170,
                            "w": 300,
                            "h": 74,
                            "s": 32,
                            "lh": 74,
                            "c": "#fff"
                        }
                    },
                    "2": {
                        "title": {
                            "x": 150,
                            "y": 247,
                            "w": 210,
                            "h": 74,
                            "s": 32,
                            "lh": 74,
                            "c": "#fff"
                        },
                        "value": {
                            "x": 330,
                            "y": 247,
                            "w": 300,
                            "h": 74,
                            "s": 32,
                            "lh": 74,
                            "c": "#fff"
                        }
                    },
                    "3": {
                        "title": {
                            "x": 155,
                            "y": 327,
                            "w": 210,
                            "h": 74,
                            "s": 32,
                            "lh": 74,
                            "c": "#fff"
                        },
                        "value": {
                            "x": 330,
                            "y": 327,
                            "w": 300,
                            "h": 74,
                            "s": 32,
                            "lh": 74,
                            "c": "#fff"
                        }
                    },
                    "4": {
                        "title": {
                            "x": 155,
                            "y": 407,
                            "w": 210,
                            "h": 74,
                            "s": 32,
                            "lh": 74,
                            "c": "#fff"
                        },
                        "value": {
                            "x": 330,
                            "y": 407,
                            "w": 300,
                            "h": 74,
                            "s": 32,
                            "lh": 74,
                            "c": "#fff"
                        }
                    },
                    "5": {
                        "title": {
                            "x": 155,
                            "y": 487,
                            "w": 210,
                            "h": 74,
                            "s": 32,
                            "lh": 74,
                            "c": "#fff"
                        },
                        "value": {
                            "x": 330,
                            "y": 487,
                            "w": 300,
                            "h": 74,
                            "s": 32,
                            "lh": 74,
                            "c": "#fff"
                        }
                    },
                    "6": {
                        "title": {
                            "x": 155,
                            "y": 567,
                            "w": 210,
                            "h": 74,
                            "s": 32,
                            "lh": 74,
                            "c": "#fff"
                        },
                        "value": {
                            "x": 330,
                            "y": 567,
                            "w": 300,
                            "h": 74,
                            "s": 32,
                            "lh": 74,
                            "c": "#fff"
                        }
                    },
                    "7": {
                        "title": {
                            "x": 675,
                            "y": 170,
                            "w": 210,
                            "h": 74,
                            "s": 32,
                            "lh": 74,
                            "c": "#fff"
                        },
                        "value": {
                            "x": 850,
                            "y": 170,
                            "w": 300,
                            "h": 74,
                            "s": 32,
                            "lh": 74,
                            "c": "#fff"
                        }
                    },
                    "8": {
                        "title": {
                            "x": 675,
                            "y": 247,
                            "w": 210,
                            "h": 74,
                            "s": 32,
                            "lh": 74,
                            "c": "#fff"
                        },
                        "value": {
                            "x": 850,
                            "y": 247,
                            "w": 300,
                            "h": 74,
                            "s": 32,
                            "lh": 74,
                            "c": "#fff"
                        }
                    },
                    "9": {
                        "title": {
                            "x": 675,
                            "y": 327,
                            "w": 210,
                            "h": 74,
                            "s": 32,
                            "lh": 74,
                            "c": "#fff"
                        },
                        "value": {
                            "x": 850,
                            "y": 327,
                            "w": 300,
                            "h": 74,
                            "s": 32,
                            "lh": 74,
                            "c": "#fff"
                        }
                    },
                    "10": {
                        "title": {
                            "x": 675,
                            "y": 407,
                            "w": 210,
                            "h": 74,
                            "s": 32,
                            "lh": 74,
                            "c": "#fff"
                        },
                        "value": {
                            "x": 850,
                            "y": 407,
                            "w": 300,
                            "h": 74,
                            "s": 32,
                            "lh": 74,
                            "c": "#fff"
                        }
                    },
                    "11": {
                        "title": {
                            "x": 675,
                            "y": 487,
                            "w": 210,
                            "h": 74,
                            "s": 32,
                            "lh": 74,
                            "c": "#fff"
                        },
                        "value": {
                            "x": 850,
                            "y": 487,
                            "w": 300,
                            "h": 74,
                            "s": 32,
                            "lh": 74,
                            "c": "#fff"
                        }
                    },
                    "12": {
                        "title": {
                            "x": 675,
                            "y": 567,
                            "w": 210,
                            "h": 74,
                            "s": 32,
                            "lh": 74,
                            "c": "#fff"
                        },
                        "value": {
                            "x": 850,
                            "y": 567,
                            "w": 300,
                            "h": 74,
                            "s": 32,
                            "lh": 74,
                            "c": "#fff"
                        }
                    }
                },
                "coll": {
                    "back": {
                        "x": 0,
                        "y": 0,
                        "w": 0,
                        "h": 0,
                        "i": "panel/collpanelbg.png"
                    },
                    "arrow": {
                        "p": {
                            "x": 20,
                            "y": 343,
                            "w": 80,
                            "h": 80,
                            "i": "panel/p.png",
                            "ih": "panel/p~hover.png"
                        },
                        "n": {
                            "x": 1192,
                            "y": 343,
                            "w": 80,
                            "h": 80,
                            "i": "panel/n.png",
                            "ih": "panel/n~hover.png"
                        }
                    },
                    "head": {
                        "x": 150,
                        "y": 260,
                        "w": 150,
                        "h": 150
                    },
                    "name": {
                        "x": 150,
                        "y": 400,
                        "w": 150,
                        "h": 80,
                        "s": 36,
                        "lh": 80,
                        "c": "#000"
                    },
                    "1": {
                        "title": {
                            "x": 350,
                            "y": 220,
                            "w": 210,
                            "h": 66,
                            "s": 28,
                            "lh": 66,
                            "c": "#fff"
                        },
                        "value": {
                            "x": 500,
                            "y": 220,
                            "w": 300,
                            "h": 66,
                            "s": 28,
                            "lh": 66,
                            "c": "#fff"
                        }
                    },
                    "2": {
                        "title": {
                            "x": 350,
                            "y": 290,
                            "w": 210,
                            "h": 66,
                            "s": 28,
                            "lh": 66,
                            "c": "#fff"
                        },
                        "value": {
                            "x": 500,
                            "y": 290,
                            "w": 300,
                            "h": 66,
                            "s": 28,
                            "lh": 66,
                            "c": "#fff"
                        }
                    },
                    "3": {
                        "title": {
                            "x": 350,
                            "y": 360,
                            "w": 210,
                            "h": 66,
                            "s": 28,
                            "lh": 66,
                            "c": "#fff"
                        },
                        "value": {
                            "x": 500,
                            "y": 360,
                            "w": 300,
                            "h": 66,
                            "s": 28,
                            "lh": 66,
                            "c": "#fff"
                        }
                    },
                    "4": {
                        "title": {
                            "x": 350,
                            "y": 430,
                            "w": 210,
                            "h": 66,
                            "s": 28,
                            "lh": 66,
                            "c": "#fff"
                        },
                        "value": {
                            "x": 500,
                            "y": 430,
                            "w": 300,
                            "h": 66,
                            "s": 28,
                            "lh": 66,
                            "c": "#fff"
                        }
                    },
                    "5": {
                        "title": {
                            "x": 350,
                            "y": 500,
                            "w": 210,
                            "h": 66,
                            "s": 28,
                            "lh": 66,
                            "c": "#fff"
                        },
                        "value": {
                            "x": 500,
                            "y": 500,
                            "w": 300,
                            "h": 66,
                            "s": 28,
                            "lh": 66,
                            "c": "#fff"
                        }
                    },
                    "6": {
                        "title": {
                            "x": 750,
                            "y": 220,
                            "w": 210,
                            "h": 80,
                            "s": 28,
                            "lh": 66,
                            "c": "#fff"
                        },
                        "value": {
                            "x": 900,
                            "y": 220,
                            "w": 300,
                            "h": 80,
                            "s": 28,
                            "lh": 66,
                            "c": "#fff"
                        }
                    },
                    "7": {
                        "title": {
                            "x": 750,
                            "y": 290,
                            "w": 210,
                            "h": 80,
                            "s": 28,
                            "lh": 66,
                            "c": "#fff"
                        },
                        "value": {
                            "x": 900,
                            "y": 290,
                            "w": 300,
                            "h": 80,
                            "s": 28,
                            "lh": 66,
                            "c": "#fff"
                        }
                    },
                    "8": {
                        "title": {
                            "x": 750,
                            "y": 360,
                            "w": 210,
                            "h": 80,
                            "s": 28,
                            "lh": 66,
                            "c": "#fff"
                        },
                        "value": {
                            "x": 900,
                            "y": 360,
                            "w": 300,
                            "h": 80,
                            "s": 28,
                            "lh": 66,
                            "c": "#fff"
                        }
                    },
                    "9": {
                        "title": {
                            "x": 750,
                            "y": 430,
                            "w": 210,
                            "h": 80,
                            "s": 28,
                            "lh": 66,
                            "c": "#fff"
                        },
                        "value": {
                            "x": 900,
                            "y": 430,
                            "w": 300,
                            "h": 80,
                            "s": 28,
                            "lh": 66,
                            "c": "#fff"
                        }
                    },
                    "10": {
                        "title": {
                            "x": 750,
                            "y": 500,
                            "w": 210,
                            "h": 80,
                            "s": 28,
                            "lh": 66,
                            "c": "#fff"
                        },
                        "value": {
                            "x": 900,
                            "y": 500,
                            "w": 300,
                            "h": 80,
                            "s": 28,
                            "lh": 66,
                            "c": "#fff"
                        }
                    }
                }
            }
        };
    })(ITheme = Core.ITheme || (Core.ITheme = {}));
})(Core || (Core = {}));
/**
 * 定义主题标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Structure/Theme.ts
 */
/// <reference path="../../../include/tsd.d.ts" />
/// <reference path="../Unknown.ts" />
/// <reference path="../../Core/_Resource/ITheme.ts" />
var Tag;
(function (Tag) {
    var Util = __Bigine_Util;
    var _base = '_';
    var Theme = (function (_super) {
        __extends(Theme, _super);
        function Theme() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        Theme.prototype.gN = function () {
            return 'Theme';
        };
        /**
         * 加载远端数据。
         */
        Theme.prototype.l = function (callback) {
            var _this = this;
            var version = Bigine.version, domain = Bigine.domain, src = this.path(Core.ITheme.THEME, _base);
            if (Bigine.offline) {
                var xhr_1 = new XMLHttpRequest();
                xhr_1.onload = function () {
                    callback(_this.extend(_this.path(JSON.parse(xhr_1.responseText), _this._c), src));
                };
                try {
                    xhr_1.open('get', 'res/theme/theme.json', true);
                    //xhr.open('get', '/Users/atfacg-dev/temp/res/theme/theme.json', true);
                    xhr_1.send();
                }
                catch (ex) {
                    throw ex.message;
                }
            }
            else {
                Util.Remote.get('http://s.dahao.de/theme/' + this._c + '/theme.json?' + version + domain, function (des) {
                    des = _this.path(des, _this._c);
                    callback(_this.extend(des, src));
                }, function (error, status) {
                    throw error;
                });
            }
        };
        /**
         * 主题中有缺省元素，使用默认主题替换。
         */
        Theme.prototype.extend = function (des, src) {
            var _this = this;
            Util.each(src, function (data, index) {
                if (!(index in des)) {
                    des[index] = data;
                }
                else {
                    if (typeof data == 'object')
                        _this.extend(des[index], data);
                }
            });
            return des;
        };
        Theme.prototype.path = function (src, theme) {
            var _this = this;
            Util.each(src, function (data, index) {
                if (typeof data == 'object') {
                    _this.path(data, theme);
                }
                else if (typeof data == 'string') {
                    if (/.png$/.test(data) || /.jpg$/.test(data)) {
                        src[index] = theme + '/' + data;
                    }
                }
            });
            return src;
        };
        return Theme;
    }(Tag.Unknown));
    Tag.Theme = Theme;
})(Tag || (Tag = {}));
/**
 * 定义主题包标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Structure/Resources.ts
 */
/// <reference path="../../../include/tsd.d.ts" />
/// <reference path="../Unknown.ts" />
/// <reference path="../_Definition/_Room/DefRoom.ts" />
/// <reference path="../_Definition/_Char/DefChar.ts" />
/// <reference path="../_Definition/DefBGM.ts" />
/// <reference path="../_Definition/DefCG.ts" />
/// <reference path="../_Definition/DefSE.ts" />
var Tag;
(function (Tag) {
    var Util = __Bigine_Util;
    var Resources = (function (_super) {
        __extends(Resources, _super);
        function Resources() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        Resources.prototype.gN = function () {
            return 'Resources';
        };
        /**
         * 加载远端数据。
         */
        Resources.prototype.l = function (callback) {
            var _this = this;
            if (Bigine.offline) {
                var xhr_2 = new XMLHttpRequest();
                xhr_2.onload = function () {
                    callback(_this.ls(JSON.parse(xhr_2.responseText)));
                };
                try {
                    xhr_2.open('get', 'res/res.json', true);
                    //xhr.open('get', '/Users/atfacg-dev/temp/res/res.json', true);
                    xhr_2.send();
                }
                catch (ex) {
                    throw ex.message;
                }
            }
            else {
                Util.Remote.post('//api.dahao.de/resource/' + this._c + '/', {}, function (data) {
                    callback(_this.ls(data));
                }, function (error, status) {
                    throw error;
                });
            }
        };
        Resources.prototype.ls = function (data) {
            var ret = {};
            ret['rooms'] = {};
            Util.each(data['rooms'] || {}, function (room, index) {
                var times = [];
                Util.each(room['snaps'] || {}, function (id, title) {
                    times.push(new Tag.Unknown([title], id, [], -1));
                });
                if (times.length == 0) {
                    times.push(new Tag.Unknown(['默认'], '00000000-0000-0000-0000-000000000000', [], -1));
                }
                ret['rooms'][index] = new Tag.DefRoom([], room['title'], [
                    new Tag.Times([], '', times, -1)
                ], -1);
            });
            ret['chars'] = {};
            Util.each(data['chars'] || {}, function (chr, index) {
                var poses = [];
                Util.each(chr['poses'] || {}, function (id, title) {
                    poses.push(new Tag.Unknown([title], id, [], -1));
                });
                if (poses.length == 0) {
                    poses.push(new Tag.Unknown(['默认'], '00000000-0000-0000-0000-000000000002', [], -1));
                }
                ret['chars'][index] = new Tag.DefChar([], chr['title'], [
                    new Tag.Avatar([], (chr['avatar'] || '00000000-0000-0000-0000-000000000001'), [], -1),
                    new Tag.Poses([], '', poses, -1)
                ], -1);
            });
            ret['maps'] = {};
            Util.each(data['maps'] || {}, function (map, index) {
                var children = [
                    new Tag.BGImage([], map['base'], [], -1)
                ];
                Util.each(map['points'] || {}, function (point) {
                    var region = point['region'], regstr = region.top + '，' + region.right + '，' + region.bottom + '，' + region.left;
                    if ('priority' in point)
                        regstr += '，' + point['priority'];
                    children.push(new Tag.Point([], point['title'], [
                        new Tag.HLImage([], point['hilite'], [], -1),
                        new Tag.Region([], regstr, [], -1)
                    ], -1));
                });
                if (children.length == 1) {
                    children.push(new Tag.Point([], '默认', [
                        new Tag.HLImage([], '00000000-0000-0000-0000-000000000003', [], -1),
                        new Tag.Region([], '0，0，1080，1920，0', [], -1)
                    ], -1));
                }
                ret['maps'][index] = new Tag.DefMap([], map['title'], children, -1);
            });
            ret['bgms'] = {};
            Util.each(data['bgms'] || {}, function (bgm, index) {
                ret['bgms'][index] = new Tag.DefBGM([], bgm['title'], [
                    new Tag.Audio([], bgm['audio'], [], -1)
                ], -1);
            });
            ret['cgs'] = {};
            Util.each(data['cgs'] || {}, function (cg, index) {
                ret['cgs'][index] = new Tag.DefCG([], cg['title'], [
                    new Tag.Image([], cg['image'], [], -1)
                ], -1);
            });
            ret['ses'] = {};
            Util.each(data['ses'] || {}, function (se, index) {
                ret['ses'][index] = new Tag.DefSE([], se['title'], [
                    new Tag.Audio([], se['audio'], [], -1)
                ], -1);
            });
            ret = this.ll(ret);
            return ret;
        };
        /**
         * 加载默认数据。
         */
        Resources.prototype.ll = function (ret) {
            ret['rooms']['00000000-0000-0000-0000-000000000000'] = new Tag.DefRoom([], ' ', [
                new Tag.Times([], '', [
                    new Tag.Unknown(['晨'], '00000000-0000-0000-0000-000000000000', [], -1),
                    new Tag.Unknown(['午'], '00000000-0000-0000-0000-000000000000', [], -1),
                    new Tag.Unknown(['晚'], '00000000-0000-0000-0000-000000000000', [], -1),
                    new Tag.Unknown(['夜'], '00000000-0000-0000-0000-000000000000', [], -1)
                ], -1)], -1);
            ret['chars']['00000000-0000-0000-0000-000000000001'] = new Tag.DefChar([], ' ', [
                new Tag.Avatar([], '00000000-0000-0000-0000-000000000001', [], -1),
                new Tag.Poses([], '', [new Tag.Unknown(['默认'], '00000000-0000-0000-0000-000000000002', [], -1)], -1)
            ], -1);
            return ret;
        };
        return Resources;
    }(Tag.Unknown));
    Tag.Resources = Resources;
})(Tag || (Tag = {}));
/**
 * 定义状态标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Structure/Status.ts
 */
/// <reference path="../../../include/tsd.d.ts" />
/// <reference path="../Unknown.ts" />
var Tag;
(function (Tag) {
    var Util = __Bigine_Util;
    var Status = (function (_super) {
        __extends(Status, _super);
        function Status() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        Status.prototype.gN = function () {
            return 'Status';
        };
        /**
         * 列举配置。
         */
        Status.prototype.l = function () {
            var sheet = [];
            Util.each(this._s, function (tag) {
                var title = tag.$p(0), value = tag.$c();
                if ('空' == title)
                    title = value = '';
                sheet.push([title, value || title]);
            });
            Util.some(Util.clone(sheet).reverse(), function (item) {
                if (item[0])
                    return true;
                sheet.pop();
                return false;
            });
            return sheet;
        };
        return Status;
    }(Tag.Unknown));
    Tag.Status = Status;
})(Tag || (Tag = {}));
/**
 * 定义面板标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Structure/_Panel/Panel.ts
 */
/// <reference path="../../../../include/tsd.d.ts" />
/// <reference path="../../Unknown.ts" />
var Tag;
(function (Tag) {
    var Util = __Bigine_Util;
    var Panel = (function (_super) {
        __extends(Panel, _super);
        /**
         * 构造函数。
         */
        function Panel(params, content, children, lineNo) {
            _super.call(this, params, content, children, lineNo);
            if (!children || children.length == 0)
                throw new E(E.TAG_CHILDREN_TOO_FEW, this._l);
        }
        /**
         * 获取标签名称。
         */
        Panel.prototype.gN = function () {
            return 'Panel';
        };
        /**
         * 列举配置。
         */
        Panel.prototype.l = function () {
            var sheet = [];
            // let sheet: Util.IHashTable<any> = {};
            Util.each(this._s, function (tag) {
                var tagName = tag.gN();
                var tagValue;
                if ('SimpPanel' == tagName) {
                    tagValue = tag.g();
                }
                else if ('CollPanel' == tagName) {
                    tagValue = tag.g();
                }
                sheet.push(tagValue);
            });
            return sheet;
        };
        return Panel;
    }(Tag.Unknown));
    Tag.Panel = Panel;
})(Tag || (Tag = {}));
/**
 * 定义（作品）根标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Structure/Root.ts
 */
/// <reference path="../Unknown.ts" />
/// <reference path="../../Core/_Tag/IRootTag.ts" />
/// <reference path="Resources.ts" />
/// <reference path="Theme.ts" />
/// <reference path="Status.ts" />
/// <reference path="_Panel/Panel.ts" />
var Tag;
(function (Tag) {
    var Util = __Bigine_Util;
    var Root = (function (_super) {
        __extends(Root, _super);
        /**
         * 构造函数。
         */
        function Root(children) {
            _super.call(this, [], '', children);
        }
        /**
         * 获取标签名称。
         */
        Root.prototype.gN = function () {
            return 'Root';
        };
        /**
         * 绑定（运行时）作品（实体到子标签及自身）。
         */
        Root.prototype.b = function (ep) {
            var player = this.$q('Player')[0];
            if (player)
                player.b(ep);
            _super.prototype.b.call(this, ep);
        };
        /**
         * 转化为（中文）剧本（代码）。
         */
        Root.prototype.toString = function () {
            var clob = '';
            Util.each(this._s, function (tag) {
                clob += tag.toString();
            });
            return clob;
        };
        /**
         * 转化为运行时（Javascript）代码。
         */
        Root.prototype.toJsrn = function () {
            var children = [], profiler = function (src) {
                // 分析代码中各字符串的重复频度。
                var profile = {}, buffer = '', found = false, escaped = false, index = 0, chr;
                for (; index < src.length; index++) {
                    chr = src[index];
                    if (!found) {
                        if ('"' == chr) {
                            found = true;
                            buffer = chr;
                            continue;
                        }
                    }
                    buffer += chr;
                    if ('\\' == chr) {
                        escaped = !escaped;
                    }
                    else if ('"' == chr && !escaped) {
                        profile[buffer] = 1 + (profile[buffer] || 0);
                        buffer = '';
                        found = false;
                    }
                    else {
                        escaped = false;
                    }
                }
                return profile;
            }, dictor = function (profile) {
                // 将可压缩率（重复次数 * 单次节省字符数）最高的字符串制作字典。
                var result = {}, deltas = [0], terms = [''];
                Util.each(profile, function (times, term) {
                    var tlen = term.length, delta = (times - 1) * (tlen - 3) - 2;
                    if (1 > delta)
                        return;
                    Util.some(deltas, function (value, index) {
                        if (delta < value)
                            return false;
                        deltas.splice(index, 0, delta);
                        terms.splice(index, 0, term);
                        return true;
                    });
                });
                terms.pop();
                Util.every(terms, function (term, index) {
                    if (1 + index > Root.SERIALS.length)
                        return false;
                    result[Root.SERIALS[index]] = term;
                    return true;
                });
                return result;
            }, dict = {}, dlobs = [], echars = /[-\/\\^$*+?.()|[\]{}]/g, clob;
            Util.each(this._s, function (tag) {
                children.push(tag.toJsrn());
            });
            clob = children.join(',');
            dict = dictor(profiler(clob));
            Util.each(dict, function (term, code) {
                clob = clob.replace(new RegExp(term.replace(echars, '\\$&'), 'g'), '_.' + code);
                dlobs.push(code + ':' + term);
            });
            return '(function($,_){return $([' + clob + '])})(require("bigine"),{' + dlobs.join(',') + '})';
        };
        /**
         * 获取父标签。
         */
        Root.prototype.gU = function () {
            throw new E(E.ROOT_NOT_PARENT);
        };
        /**
         * 是否自动播放。
         */
        Root.prototype.a = function () {
            return 0 < this.$q('Auto').length;
        };
        /**
         * 加载资源包。
         */
        Root.prototype.l = function (callback) {
            var resources = this.$q('Resources')[0];
            if (!resources)
                return false;
            resources.l(callback);
            return true;
        };
        /**
         * 获取资源包名称。
         */
        Root.prototype.gS = function () {
            return this.$q('Resources')[0].$c();
        };
        /**
         * 加载主题。
         */
        Root.prototype.t = function (callback) {
            this.$q('Theme')[0].l(callback);
        };
        /**
         * 获取主题名称。
         */
        Root.prototype.gT = function () {
            return this.$q('Theme')[0].$c();
        };
        /**
         * 获取状态配置。
         */
        Root.prototype.s = function () {
            var status = this.$q('Status')[0];
            if (!status)
                return [];
            return status.l();
        };
        /**
         * 获取面板配置。
         */
        Root.prototype.p = function () {
            var panel = this.$q('Panel')[0];
            if (!panel)
                return [];
            return panel.l();
        };
        /**
         * 压缩键名序列。
         */
        Root.SERIALS = 'qwertyuiopasdfghjklzxcvbnm$_QWERTYUIOPASDFGHJKLZXCVBNM';
        return Root;
    }(Tag.Unknown));
    Tag.Root = Root;
})(Tag || (Tag = {}));
/**
 * 定义人物离场动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Director/CharOff.ts
 */
/// <reference path="../../Action.ts" />
var Tag;
(function (Tag) {
    var CharOff = (function (_super) {
        __extends(CharOff, _super);
        /**
         * 构造函数。
         */
        function CharOff(params, content, children, lineNo) {
            _super.call(this, params, content, children, lineNo);
            this._mc = params[0];
        }
        /**
         * 获取标签名称。
         */
        CharOff.prototype.gN = function () {
            return 'CharOff';
        };
        /**
         * 绑定（运行时）作品（实体）。
         */
        CharOff.prototype.$b = function (ep) {
            ep.q(this._mc, Core.IEpisode.Entity.Chr, this._l);
        };
        /**
         * 执行。
         */
        CharOff.prototype.p = function (runtime) {
            var states = runtime.gS(), kpos = '.p' + this._mc, pos = states.g(kpos);
            if (!pos)
                throw new E(E.ACT_CHAR_NOT_ON, this._l);
            return runtime.gD().charOff(pos)
                .then(function () {
                states.d(kpos);
                states.d('_c' + pos);
                states.d('_s' + pos);
                return runtime;
            });
        };
        return CharOff;
    }(Tag.Action));
    Tag.CharOff = CharOff;
})(Tag || (Tag = {}));
/**
 * 定义设置人物动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Director/CharSet.ts
 */
/// <reference path="../../Action.ts" />
/// <reference path="../../_Definition/_Char/DefChar.ts" />
var Tag;
(function (Tag) {
    var CharSet = (function (_super) {
        __extends(CharSet, _super);
        /**
         * 构造函数。
         */
        function CharSet(params, content, children, lineNo) {
            _super.call(this, params, content, children, lineNo);
            var pos = Core.IDirector.Position, exp = content.split('，');
            switch (params[0]) {
                case '最左':
                    this._mp = pos.LLeft;
                    break;
                case '左':
                    this._mp = pos.Left;
                    break;
                case '左中':
                    this._mp = pos.CLeft;
                    break;
                case '最右':
                    this._mp = pos.RRight;
                    break;
                case '右':
                    this._mp = pos.Right;
                    break;
                case '右中':
                    this._mp = pos.CRight;
                    break;
                case '中':
                case undefined:
                    this._mp = pos.Center;
                    break;
                default:
                    throw new E(E.ACT_ILLEGAL_POSITION, lineNo);
            }
            this._mc = exp[0];
            this._ms = exp[1] || '默认';
        }
        /**
         * 获取标签名称。
         */
        CharSet.prototype.gN = function () {
            return 'CharSet';
        };
        /**
         * 绑定（运行时）作品（实体）。
         */
        CharSet.prototype.$b = function (ep) {
            this._mo = ep.q(this._mc, Core.IEpisode.Entity.Chr, this._l);
        };
        /**
         * 执行。
         */
        CharSet.prototype.p = function (runtime) {
            var states = runtime.gS(), kpos = '.p' + this._mc, pos = states.g(kpos);
            if (pos)
                throw new E(E.ACT_CHAR_ONSTAGE, this._l);
            states.s(kpos, this._mp);
            states.s('_c' + this._mp, this._mc);
            states.s('_s' + this._mp, this._ms);
            return runtime.gD().charSet(this._mo.o(this._ms), this._mp);
        };
        /**
         * 获取依赖素材资源列表。
         */
        CharSet.prototype.$d = function () {
            return [this._mo.o(this._ms)];
        };
        /**
         * 获取关联人物。
         */
        CharSet.prototype.gC = function () {
            return this._mo;
        };
        return CharSet;
    }(Tag.Action));
    Tag.CharSet = CharSet;
})(Tag || (Tag = {}));
/**
 * 定义改变神态动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Director/CharPose.ts
 */
/// <reference path="../../Action.ts" />
/// <reference path="../../_Definition/_Char/DefChar.ts" />
var Tag;
(function (Tag) {
    var CharPose = (function (_super) {
        __extends(CharPose, _super);
        /**
         * 构造函数。
         */
        function CharPose(params, content, children, lineNo) {
            _super.call(this, params, content, children, lineNo);
            this._mc = params[0];
            this._ms = content;
        }
        /**
         * 获取标签名称。
         */
        CharPose.prototype.gN = function () {
            return 'CharPose';
        };
        /**
         * 绑定（运行时）作品（实体）。
         */
        CharPose.prototype.$b = function (ep) {
            this._mo = ep.q(this._mc, Core.IEpisode.Entity.Chr, this._l).o(this._ms);
        };
        /**
         * 执行。
         */
        CharPose.prototype.p = function (runtime) {
            var states = runtime.gS(), kpos = '.p' + this._mc, pos = states.g(kpos);
            if (!pos)
                throw new E(E.ACT_CHAR_NOT_ON, this._l);
            states.s('_s' + pos, this._ms);
            return runtime.gD().charSet(this._mo, pos);
        };
        /**
         * 获取依赖素材资源列表。
         */
        CharPose.prototype.$d = function () {
            return [this._mo];
        };
        return CharPose;
    }(Tag.Action));
    Tag.CharPose = CharPose;
})(Tag || (Tag = {}));
/**
 * 定义独白动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Text/Monolog.ts
 */
/// <reference path="../../Idable.ts" />
/// <reference path="../../_Definition/_Char/DefChar.ts" />
var Tag;
(function (Tag) {
    var Monolog = (function (_super) {
        __extends(Monolog, _super);
        function Monolog() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        Monolog.prototype.gN = function () {
            return 'Monolog';
        };
        /**
         * 绑定（运行时）作品（实体）。
         */
        Monolog.prototype.$b = function (ep) {
            this._mc = ep.q('', Core.IEpisode.Entity.Player, this._l).gC();
        };
        /**
         * 执行。
         */
        Monolog.prototype.p = function (runtime) {
            var _this = this;
            return Promise.resolve(_super.prototype.p.call(this, runtime))
                .then(function () { return runtime.a(_this).gD()
                .words(runtime.gS().t(_this._c), 'monolog', _this._mc.gI(), _this._mc.o()); });
        };
        /**
         * 获取依赖素材资源列表。
         */
        Monolog.prototype.$d = function () {
            return [this._mc.o()];
        };
        /**
         * 获取关联人物。
         */
        Monolog.prototype.gC = function () {
            return this._mc;
        };
        return Monolog;
    }(Tag.Idable));
    Tag.Monolog = Monolog;
})(Tag || (Tag = {}));
/**
 * 定义旁白动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Text/VoiceOver.ts
 */
/// <reference path="../../Idable.ts" />
var Tag;
(function (Tag) {
    var VoiceOver = (function (_super) {
        __extends(VoiceOver, _super);
        function VoiceOver() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        VoiceOver.prototype.gN = function () {
            return 'VoiceOver';
        };
        /**
         * 执行。
         */
        VoiceOver.prototype.p = function (runtime) {
            var _this = this;
            return Promise.resolve(_super.prototype.p.call(this, runtime))
                .then(function () { return runtime.a(_this).gD()
                .words(runtime.gS().t(_this._c), 'voiceover'); });
        };
        return VoiceOver;
    }(Tag.Idable));
    Tag.VoiceOver = VoiceOver;
})(Tag || (Tag = {}));
/**
 * 定义自动存档动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Logic/Save.ts
 */
/// <reference path="../../Action.ts" />
var Tag;
(function (Tag) {
    var Save = (function (_super) {
        __extends(Save, _super);
        function Save() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        Save.prototype.gN = function () {
            return 'Save';
        };
        /**
         * 执行。
         */
        Save.prototype.p = function (runtime) {
            var scene = this.gU(), brief = this._p[0];
            if (!brief) {
                while ('Scene' != scene.gN())
                    scene = scene.gU();
                brief = scene.$c();
            }
            runtime.gS().e('auto');
            return runtime;
        };
        return Save;
    }(Tag.Action));
    Tag.Save = Save;
})(Tag || (Tag = {}));
/**
 * 定义游戏完结事件动作组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Flow/End.ts
 */
/// <reference path="../../Action.ts" />
var Tag;
(function (Tag) {
    var End = (function (_super) {
        __extends(End, _super);
        function End() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        End.prototype.gN = function () {
            return 'End';
        };
        /**
         * 执行。
         */
        End.prototype.p = function (runtime) {
            runtime.gS().d('_rc')
                .d('_rd')
                .d('$rc')
                .d('$rd');
            runtime.t(function () { return runtime.gD().ED()
                .then(function () { return runtime.gE().p(Core.ISceneTag.Type.End, runtime); }); });
            return E.doHalt();
        };
        return End;
    }(Tag.Action));
    Tag.End = End;
})(Tag || (Tag = {}));
/**
 * 定义游戏失败事件动作组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Flow/Fail.ts
 */
/// <reference path="../../Action.ts" />
var Tag;
(function (Tag) {
    var Fail = (function (_super) {
        __extends(Fail, _super);
        function Fail() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        Fail.prototype.gN = function () {
            return 'Fail';
        };
        /**
         * 执行。
         */
        Fail.prototype.p = function (runtime) {
            runtime.gS().d('_rc')
                .d('_rd')
                .d('$rc')
                .d('$rd');
            runtime.t(function () { return runtime.gD().FAIL()
                .then(function () { return runtime.gE().p(Core.ISceneTag.Type.Fail, runtime); }); });
            return E.doHalt();
        };
        return Fail;
    }(Tag.Action));
    Tag.Fail = Fail;
})(Tag || (Tag = {}));
/**
 * 定义评分标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Flow/Stars.ts
 */
/// <reference path="../../Action.ts" />
/// <reference path="../../../Core/_Runtime/IDirector.ts" />
var Tag;
(function (Tag) {
    var Stars = (function (_super) {
        __extends(Stars, _super);
        /**
         * 构造函数。
         */
        function Stars(params, content, children, lineNo) {
            _super.call(this, params, content, children, lineNo);
            var stars = Core.IDirector.Stars;
            switch (params[0]) {
                case '及格':
                    this._ms = stars.OK;
                    this._mp = 'jige';
                    break;
                case '优秀':
                    this._ms = stars.Awesome;
                    this._mp = 'youxiu';
                    break;
                case '完美':
                    this._ms = stars.Perfect;
                    this._mp = 'wanmei';
                    break;
                case '超绝':
                    this._ms = stars.Superb;
                    this._mp = 'chaojue';
                    break;
                case '传奇':
                    this._ms = stars.Legend;
                    this._mp = 'chuanqi';
                    break;
                default:
                    throw new E(E.ACT_ILLEGAL_STARS, lineNo);
            }
            this._mv = params[1] || '';
        }
        /**
         * 获取标签名称。
         */
        Stars.prototype.gN = function () {
            return 'Stars';
        };
        /**
         * 执行。
         */
        Stars.prototype.p = function (runtime) {
            var states = runtime.gS(), star = states.g(this._mv), value = star ? this.$v(star).toString() : '0';
            return runtime.gD().stars(this._ms, this._mp, value);
        };
        return Stars;
    }(Tag.Action));
    Tag.Stars = Stars;
})(Tag || (Tag = {}));
/**
 * 定义关闭特写动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Director/HideCG.ts
 */
/// <reference path="../../Action.ts" />
var Tag;
(function (Tag) {
    var HideCG = (function (_super) {
        __extends(HideCG, _super);
        function HideCG() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        HideCG.prototype.gN = function () {
            return 'HideCG';
        };
        /**
         * 执行。
         */
        HideCG.prototype.p = function (runtime) {
            var states = runtime.gS(), key = '_c', cg = states.g(key);
            if (!cg)
                throw new E(E.ACT_CG_NOT_SHOWN, this._l);
            states.d(key);
            return runtime.gD().hideCG();
        };
        return HideCG;
    }(Tag.Action));
    Tag.HideCG = HideCG;
})(Tag || (Tag = {}));
/**
 * 定义设置时间动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Director/AsTime.ts
 */
/// <reference path="../../Action.ts" />
/// <reference path="../../_Definition/_Room/DefRoom.ts" />
var Tag;
(function (Tag) {
    var AsTime = (function (_super) {
        __extends(AsTime, _super);
        function AsTime() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        AsTime.prototype.gN = function () {
            return 'AsTime';
        };
        /**
         * 执行。
         */
        AsTime.prototype.p = function (runtime) {
            var states = runtime.gS(), ktime = '_t', time = states.g(ktime), room = states.g('$rd');
            states.s(ktime, this._p[0]);
            if (time == this._p[0] || !room)
                return runtime;
            return runtime.gD().asRoom(room.o(this._p[0]), true);
        };
        /**
         * 获取时间。
         */
        AsTime.prototype.gT = function () {
            return this._p[0];
        };
        return AsTime;
    }(Tag.Action));
    Tag.AsTime = AsTime;
})(Tag || (Tag = {}));
/**
 * 定义移动中止动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Flow/Freeze.ts
 */
/// <reference path="../../Action.ts" />
var Tag;
(function (Tag) {
    var Freeze = (function (_super) {
        __extends(Freeze, _super);
        function Freeze() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        Freeze.prototype.gN = function () {
            return 'Freeze';
        };
        /**
         * 执行。
         */
        Freeze.prototype.p = function (runtime) {
            return E.doHalt();
        };
        return Freeze;
    }(Tag.Action));
    Tag.Freeze = Freeze;
})(Tag || (Tag = {}));
/**
 * 定义设置天气动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Director/Weather.ts
 */
/// <reference path="../../Action.ts" />
var Tag;
(function (Tag) {
    var Weather = (function (_super) {
        __extends(Weather, _super);
        function Weather() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        Weather.prototype.gN = function () {
            return 'Weather';
        };
        /**
         * 执行。
         */
        Weather.prototype.p = function (runtime) {
            runtime.gS().s('_w', this._p[0]);
            return runtime;
        };
        return Weather;
    }(Tag.Action));
    Tag.Weather = Weather;
})(Tag || (Tag = {}));
/**
 * 定义当数据动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Logic/Assert.ts
 */
/// <reference path="../../Action.ts" />
var Tag;
(function (Tag) {
    var Assert = (function (_super) {
        __extends(Assert, _super);
        function Assert() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        Assert.prototype.gN = function () {
            return 'Assert';
        };
        /**
         * （执行）检查。
         */
        Assert.prototype.t = function (states) {
            var real = this.$v(states.g(this._p[0])), expected = states.g(this._p[1]), depth = states.g('$d'), ret;
            expected = this.$v(undefined === expected ?
                this._p[1] :
                expected);
            switch (this._p[2] || '等于') {
                case '等于':
                    this._p.splice(2);
                    ret = real == expected;
                    break;
                case '不等于':
                    ret = real != expected;
                    break;
                case '大于':
                    ret = real > expected;
                    break;
                case '不大于':
                    ret = real <= expected;
                    break;
                case '小于':
                    ret = real < expected;
                    break;
                case '不小于':
                    ret = real >= expected;
                    break;
                default:
                    throw new E(E.ACT_ILLEGAL_OP, this._l);
            }
            states.s('$v' + depth, ret)
                .s('$t' + depth, false);
            return ret;
        };
        /**
         * 执行。
         */
        Assert.prototype.p = function (runtime) {
            this.t(runtime.gS());
            return runtime;
        };
        return Assert;
    }(Tag.Action));
    Tag.Assert = Assert;
})(Tag || (Tag = {}));
/**
 * 定义设置数据动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Logic/Assign.ts
 */
/// <reference path="../../Action.ts" />
var Tag;
(function (Tag) {
    var Assign = (function (_super) {
        __extends(Assign, _super);
        function Assign() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        Assign.prototype.gN = function () {
            return 'Assign';
        };
        /**
         * 绑定（运行时）作品（实体）。
         */
        Assign.prototype.$b = function (ep) {
            this._ep = ep;
        };
        /**
         * （执行）检查。
         */
        Assign.prototype.t = function (states) {
            var depth = states.g('$d');
            var sign = '／';
            // 如果是设置结构体类型数据中字段值
            if (/^.+／.+$/ig.test(this._p[0])) {
                var vari = this._p[0].split(sign)[0];
                var fieldName = this._p[0].split(sign)[1];
                var data = states.g(vari);
                var cStruct = this._ep.q(data['：'], Core.IEpisode.Entity.Struct);
                // 如果是实体类型字段
                if ('object' == typeof data[fieldName]) {
                    // 取出集合的结构
                    data[fieldName] = this._ep.q(this._c, cStruct.gET(fieldName), this._l);
                }
                else {
                    data[fieldName] = this._c;
                }
                states.s(vari, data);
            }
            else {
                states.s(this._p[0], this.$v(this._c))
                    .c(this._p[0], '$v' + depth)
                    .s('$t' + depth, false);
            }
            return true;
        };
        /**
         * 执行。
         */
        Assign.prototype.p = function (runtime) {
            if (/.*／$/.test(this._p[0]))
                throw new E(E.LEX_ILLEGAL_SOURCE, this._l);
            this.t(runtime.gS());
            return runtime;
        };
        return Assign;
    }(Tag.Action));
    Tag.Assign = Assign;
})(Tag || (Tag = {}));
/**
 * 定义对比数据动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Logic/Compare.ts
 */
/// <reference path="../../Action.ts" />
var Tag;
(function (Tag) {
    var Compare = (function (_super) {
        __extends(Compare, _super);
        function Compare() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        Compare.prototype.gN = function () {
            return 'Compare';
        };
        /**
         * （执行）检查。
         */
        Compare.prototype.t = function (states) {
            var depth = states.g('$d');
            states.c(this._p[0], '$v' + depth)
                .s('$t' + depth, false);
            return true;
        };
        /**
         * 执行。
         */
        Compare.prototype.p = function (runtime) {
            this.t(runtime.gS());
            return runtime;
        };
        return Compare;
    }(Tag.Action));
    Tag.Compare = Compare;
})(Tag || (Tag = {}));
/**
 * 定义设置数据动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Logic/Increase.ts
 */
/// <reference path="../../Action.ts" />
var Tag;
(function (Tag) {
    var Increase = (function (_super) {
        __extends(Increase, _super);
        function Increase() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        Increase.prototype.gN = function () {
            return 'Increase';
        };
        /**
         * 绑定（运行时）作品（实体）。
         */
        Increase.prototype.$b = function (ep) {
            this._ep = ep;
        };
        /**
         * （执行）检查。
         */
        Increase.prototype.t = function (states) {
            var depth = states.g('$d');
            var sign = '／';
            // 如果是设置结构体类型数据中字段值
            if (/^.+／.+$/ig.test(this._p[0])) {
                var vari = this._p[0].split(sign)[0];
                var fieldName = this._p[0].split(sign)[1];
                var data = states.g(vari);
                var cStruct = this._ep.q(data['：'], Core.IEpisode.Entity.Struct);
                // 如果是实体类型字段
                if ('object' == typeof data[fieldName]) {
                    // 取出集合的结构
                    data[fieldName] = this._ep.q(this._c, cStruct.gET(fieldName), this._l);
                }
                else if ('string' == typeof data[fieldName]) {
                    data[fieldName] = parseInt(data[fieldName], 10) + this.$v(this._c);
                }
                else if ('number' == typeof data[fieldName]) {
                    data[fieldName] += this.$v(this._c);
                }
                else {
                    data[fieldName] = this.$v(this._c);
                }
                states.s(vari, data);
            }
            else {
                states.s(this._p[0], states.g(this._p[0]) + this.$v(this._c))
                    .c(this._p[0], '$v' + depth)
                    .s('$t' + depth, false);
            }
            return true;
        };
        /**
         * 执行。
         */
        Increase.prototype.p = function (runtime) {
            this.t(runtime.gS());
            return runtime;
        };
        return Increase;
    }(Tag.Action));
    Tag.Increase = Increase;
})(Tag || (Tag = {}));
/**
 * 定义循环中止动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Flow/LoopBreak.ts
 */
/// <reference path="../../Action.ts" />
var Tag;
(function (Tag) {
    var LoopBreak = (function (_super) {
        __extends(LoopBreak, _super);
        function LoopBreak() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        LoopBreak.prototype.gN = function () {
            return 'LoopBreak';
        };
        /**
         * 执行。
         */
        LoopBreak.prototype.p = function (runtime) {
            return E.doBreak();
        };
        return LoopBreak;
    }(Tag.Action));
    Tag.LoopBreak = LoopBreak;
})(Tag || (Tag = {}));
/**
 * 定义且动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Logic/And.ts
 */
/// <reference path="../../Action.ts" />
var Tag;
(function (Tag) {
    var Util = __Bigine_Util;
    var And = (function (_super) {
        __extends(And, _super);
        function And() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        And.prototype.gN = function () {
            return 'And';
        };
        /**
         * （执行）检查。
         */
        And.prototype.t = function (states) {
            var depth = states.g('$d'), ret = Util.every(this._s, function (tag) { return tag.t(states); });
            states.s('$v' + depth, ret)
                .s('$t' + depth, false);
            return ret;
        };
        /**
         * 执行。
         */
        And.prototype.p = function (runtime) {
            this.t(runtime.gS());
            return runtime;
        };
        return And;
    }(Tag.Action));
    Tag.And = And;
})(Tag || (Tag = {}));
/**
 * 定义或动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Logic/Or.ts
 */
/// <reference path="../../Action.ts" />
var Tag;
(function (Tag) {
    var Util = __Bigine_Util;
    var Or = (function (_super) {
        __extends(Or, _super);
        function Or() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        Or.prototype.gN = function () {
            return 'Or';
        };
        /**
         * （执行）检查。
         */
        Or.prototype.t = function (states) {
            var depth = states.g('$d'), ret = Util.some(this._s, function (tag) { return tag.t(states); });
            states.s('$v' + depth, ret)
                .s('$t' + depth, false);
            return ret;
        };
        /**
         * 执行。
         */
        Or.prototype.p = function (runtime) {
            this.t(runtime.gS());
            return runtime;
        };
        return Or;
    }(Tag.Action));
    Tag.Or = Or;
})(Tag || (Tag = {}));
/**
 * 定义否则动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Logic/Otherwise.ts
 */
/// <reference path="Loop.ts" />
var Tag;
(function (Tag) {
    var Util = __Bigine_Util;
    var Otherwise = (function (_super) {
        __extends(Otherwise, _super);
        function Otherwise() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        Otherwise.prototype.gN = function () {
            return 'Otherwise';
        };
        /**
         * （执行）检查。
         */
        Otherwise.prototype.t = function (states) {
            var key = '$t' + states.g('$d');
            if (states.g(key))
                return true;
            states.s(key, true);
            return Util.every(this._s, function (tag) { return tag.t(states); });
        };
        /**
         * 执行。
         */
        Otherwise.prototype.p = function (runtime) {
            var states = runtime.gS(), logger = runtime.gL(), title = 'OTHERWISE', kd = '$d', depth = states.g(kd), kt = '$t' + depth, kid = '.a', id = states.g(kid);
            if (!id && states.g(kt))
                return runtime;
            logger.o(title);
            states.s(kt, true)
                .s(kd, 1 + depth);
            return Util.Q.every(this._s, function (action) {
                id = states.g(kid);
                if (id) {
                    if ('gI' in action) {
                        if (action.gI() != id)
                            return runtime;
                        states.d(kid);
                        action.d();
                    }
                    else if ('gA' in action) {
                        if (-1 == Util.indexOf(action.gA(), id))
                            return runtime;
                    }
                    else
                        return runtime;
                }
                return action.p(runtime);
            })['catch'](function (error) {
                if (error && E.Signal.HALT == error.signal)
                    logger.c(title);
                throw error;
            }).then(function () {
                states.s(kd, depth);
                logger.c(title);
                return runtime;
            });
        };
        /**
         * 获取关键动作编号列表。
         */
        Otherwise.prototype.gA = function () {
            return Tag.Loop.prototype.gA.call(this);
        };
        /**
         * 获取使用资源列表。
         */
        Otherwise.prototype.c = function () {
            return Tag.Loop.prototype.c.call(this);
        };
        return Otherwise;
    }(Tag.Action));
    Tag.Otherwise = Otherwise;
})(Tag || (Tag = {}));
/**
 * 定义那么动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Logic/Then.ts
 */
/// <reference path="Loop.ts" />
var Tag;
(function (Tag) {
    var Util = __Bigine_Util;
    var Then = (function (_super) {
        __extends(Then, _super);
        function Then() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        Then.prototype.gN = function () {
            return 'Then';
        };
        /**
         * （执行）检查。
         */
        Then.prototype.t = function (states) {
            var depth = states.g('$d'), kt = '$t' + depth, kv = '$v' + depth;
            if (states.g(kt) || !states.g(kv))
                return true;
            states.s(kt, true);
            return Util.every(this._s, function (tag) { return tag.t(states); });
        };
        /**
         * 执行。
         */
        Then.prototype.p = function (runtime) {
            var states = runtime.gS(), logger = runtime.gL(), title = 'THEN', kd = '$d', depth = states.g(kd), kt = '$t' + depth, kv = '$v' + depth, kid = '.a', id = states.g(kid);
            if (!id && (states.g(kt) || !states.g(kv)))
                return runtime;
            logger.o(title);
            states.s(kt, true)
                .s(kd, 1 + depth);
            return Util.Q.every(this._s, function (action) {
                id = states.g(kid);
                if (id) {
                    if ('gI' in action) {
                        if (action.gI() != id)
                            return runtime;
                        states.d(kid);
                        action.d();
                    }
                    else if ('gA' in action) {
                        if (-1 == Util.indexOf(action.gA(), id))
                            return runtime;
                    }
                    else
                        return runtime;
                }
                return action.p(runtime);
            })['catch'](function (error) {
                if (error && E.Signal.HALT == error.signal)
                    logger.c(title);
                throw error;
            }).then(function () {
                states.s(kd, depth);
                logger.c(title);
                return runtime;
            });
        };
        /**
         * 获取关键动作编号列表。
         */
        Then.prototype.gA = function () {
            return Tag.Loop.prototype.gA.call(this);
        };
        /**
         * 获取使用资源列表。
         */
        Then.prototype.c = function () {
            return Tag.Loop.prototype.c.call(this);
        };
        return Then;
    }(Tag.Action));
    Tag.Then = Then;
})(Tag || (Tag = {}));
/**
 * 定义如果动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Logic/When.ts
 */
/// <reference path="Loop.ts" />
var Tag;
(function (Tag) {
    var Util = __Bigine_Util;
    var When = (function (_super) {
        __extends(When, _super);
        function When() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        When.prototype.gN = function () {
            return 'When';
        };
        /**
         * （执行）检查。
         */
        When.prototype.t = function (states) {
            var depth = states.g('$d'), kt = '$t' + depth, kv = '$v' + depth;
            if (states.g(kt) || states.g(kv) != this.$v(this._p[0]))
                return true;
            states.s(kt, true);
            return Util.every(this._s, function (tag) { return tag.t(states); });
        };
        /**
         * 执行。
         */
        When.prototype.p = function (runtime) {
            var states = runtime.gS(), logger = runtime.gL(), value = this.$v(this._p[0]), title = 'WHEN ' + value, kd = '$d', depth = states.g(kd), kt = '$t' + depth, kv = '$v' + depth, kid = '.a', id = states.g(kid);
            if (!id && (states.g(kt) || states.g(kv) != value))
                return runtime;
            logger.o(title);
            states.s(kt, true)
                .s(kd, 1 + depth);
            return Util.Q.every(this._s, function (action) {
                id = states.g(kid);
                if (id) {
                    if ('gI' in action) {
                        if (action.gI() != id)
                            return runtime;
                        states.d(kid);
                        action.d();
                    }
                    else if ('gA' in action) {
                        if (-1 == Util.indexOf(action.gA(), id))
                            return runtime;
                    }
                    else
                        return runtime;
                }
                return action.p(runtime);
            })['catch'](function (error) {
                if (error && E.Signal.HALT == error.signal)
                    logger.c(title);
                throw error;
            }).then(function () {
                states.s(kd, depth);
                logger.c(title);
                return runtime;
            });
        };
        /**
         * 获取关键动作编号列表。
         */
        When.prototype.gA = function () {
            return Tag.Loop.prototype.gA.call(this);
        };
        /**
         * 获取使用资源列表。
         */
        When.prototype.c = function () {
            return Tag.Loop.prototype.c.call(this);
        };
        return When;
    }(Tag.Action));
    Tag.When = When;
})(Tag || (Tag = {}));
/**
 * 定义选项动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Flow/Option.ts
 */
/// <reference path="../../Unknown.ts" />
/// <reference path="../../../Core/_Tag/IOptionTag.ts" />
var Tag;
(function (Tag) {
    var Option = (function (_super) {
        __extends(Option, _super);
        function Option() {
            _super.apply(this, arguments);
        }
        /**
         * 类型转换。
         */
        Option.f = function (tag) {
            if ('Unknown' != tag.gN())
                throw new E(E.ACT_OPTION_CAST_FAILURE, tag.gL());
            var opt = new Option([tag.$p(0)], tag.$c(), [], tag.gL());
            return opt;
        };
        /**
         * 获取描述文字。
         */
        Option.prototype.gT = function () {
            return this._c || this._p[0];
        };
        /**
         * 获取标签名称。
         */
        Option.prototype.gN = function () {
            return 'Option';
        };
        /**
         * 交互逻辑。
         */
        Option.prototype.p = function (runtime) {
            var states = runtime.gS(), depth = states.g('$d'), kv = '$v' + depth;
            states.s(kv, this.$v(this._p[0]))
                .s('$t' + depth, false);
            if (this._k)
                states.c(kv, this._k);
        };
        /**
         * 设置状态键名。
         */
        Option.prototype.sK = function (key) {
            this._k = key;
            return this;
        };
        /**
         * 获取萝卜币。
         */
        Option.prototype.gM = function () {
            return parseInt(this._p[1], 10) || 0;
        };
        /**
         * 设置是否付费信息。
         */
        Option.prototype.sA = function (is) {
            this._a = is;
            return this;
        };
        /**
         * 获取是否付费信息。
         */
        Option.prototype.gA = function () {
            return this._a;
        };
        /**
         * 获取编号。
         */
        Option.prototype.gI = function () {
            return this._i;
        };
        /**
         * 恢复编号。
         */
        Option.prototype.i = function (id) {
            this._i = id;
        };
        /**
         * 转化为运行时（Javascript）代码。
         */
        Option.prototype.toJsrn = function () {
            var clob = _super.prototype.toJsrn.call(this);
            return this._p[1] ? clob.substr(0, clob.length - 1) + ',"' + this._i + '")' : clob;
        };
        return Option;
    }(Tag.Unknown));
    Tag.Option = Option;
})(Tag || (Tag = {}));
/**
 * 定义选择动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Flow/Choose.ts
 */
/// <reference path="../../Action.ts" />
/// <reference path="Option.ts" />
var Tag;
(function (Tag) {
    var Util = __Bigine_Util;
    var Choose = (function (_super) {
        __extends(Choose, _super);
        /**
         * 构造函数。
         */
        function Choose(params, content, children, lineNo) {
            if (!children.length && !content.length)
                throw new E(E.OPT_OPTIONS_MISSING, lineNo);
            if (children.length && content)
                throw new E(E.OPT_OPTIONS_CONFLICT, lineNo);
            _super.call(this, params, content, children, lineNo);
        }
        /**
         * 获取标签名称。
         */
        Choose.prototype.gN = function () {
            return 'Choose';
        };
        /**
         * 执行。
         */
        Choose.prototype.p = function (runtime) {
            var _this = this;
            var opts, states = runtime.gS();
            if (this._c) {
                opts = runtime.gS().g('$_' + this._c) || [];
                Util.each(opts, function (option) {
                    if ('i' in option && option.gI())
                        option.sA(states.qp(option.gI(), option.gM()));
                });
                if (this._p[0])
                    Util.each(opts, function (option) {
                        option.sK(_this._p[0]);
                    });
            }
            else {
                opts = [];
                Util.each(this._s, function (tag) {
                    if ('i' in tag) {
                        var isPay = states.qp(tag.gI(), tag.gM());
                        tag.sA(isPay);
                        opts.push(tag);
                    }
                    else {
                        opts.push(Tag.Option.f(tag).sK(_this._p[0]));
                    }
                });
            }
            if (opts.length)
                return runtime.gD().choose(opts);
            return runtime;
        };
        return Choose;
    }(Tag.Action));
    Tag.Choose = Choose;
})(Tag || (Tag = {}));
/**
 * 定义提示动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Text/Tip.ts
 */
/// <reference path="../../Idable.ts" />
var Tag;
(function (Tag) {
    var Tip = (function (_super) {
        __extends(Tip, _super);
        function Tip() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        Tip.prototype.gN = function () {
            return 'Tip';
        };
        /**
         * 执行。
         */
        Tip.prototype.p = function (runtime) {
            var _this = this;
            //return runtime.gD().tip(runtime.gS().t(this._c));
            return Promise.resolve(_super.prototype.p.call(this, runtime))
                .then(function () { return runtime.a(_this).gD()
                .tip(runtime.gS().t(_this._c)); });
        };
        return Tip;
    }(Tag.Idable));
    Tag.Tip = Tip;
})(Tag || (Tag = {}));
/**
 * 定义最大数据动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Logic/Maximum.ts
 */
/// <reference path="../../Action.ts" />
var Tag;
(function (Tag) {
    var Util = __Bigine_Util;
    var Maximum = (function (_super) {
        __extends(Maximum, _super);
        function Maximum() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        Maximum.prototype.gN = function () {
            return 'Maximum';
        };
        /**
         * （执行）检查。
         */
        Maximum.prototype.t = function (states) {
            var max = 0, depth = states.g('$d'), value;
            Util.each(this._s, function (tag) {
                value = states.g(tag.$p(0)) - 0 || 0;
                if (value > max)
                    max = value;
            });
            states.s('$v' + depth, max)
                .s('$t' + depth, false);
            if (this._p[0])
                states.s(this._p[0], max);
            return true;
        };
        /**
         * 执行。
         */
        Maximum.prototype.p = function (runtime) {
            this.t(runtime.gS());
            return runtime;
        };
        return Maximum;
    }(Tag.Action));
    Tag.Maximum = Maximum;
})(Tag || (Tag = {}));
/**
 * 定义人物移动动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Director/CharMove.ts
 */
/// <reference path="../../Action.ts" />
var Tag;
(function (Tag) {
    var CharMove = (function (_super) {
        __extends(CharMove, _super);
        /**
         * 构造函数。
         */
        function CharMove(params, content, children, lineNo) {
            _super.call(this, params, content, children, lineNo);
            this._mc = params[0];
            var pos = Core.IDirector.Position;
            switch (content) {
                case '最左':
                    this._mp = pos.LLeft;
                    break;
                case '左':
                    this._mp = pos.Left;
                    break;
                case '左中':
                    this._mp = pos.CLeft;
                    break;
                case '最右':
                    this._mp = pos.RRight;
                    break;
                case '右':
                    this._mp = pos.Right;
                    break;
                case '右中':
                    this._mp = pos.CRight;
                    break;
                case '中':
                case undefined:
                    this._mp = pos.Center;
                    break;
                default:
                    throw new E(E.ACT_ILLEGAL_POSITION, lineNo);
            }
        }
        /**
         * 获取标签名称。
         */
        CharMove.prototype.gN = function () {
            return 'CharMove';
        };
        /**
         * 绑定（运行时）作品（实体）。
         */
        CharMove.prototype.$b = function (ep) {
            ep.q(this._mc, Core.IEpisode.Entity.Chr, this._l);
        };
        /**
         * 执行。
         */
        CharMove.prototype.p = function (runtime) {
            var _this = this;
            var states = runtime.gS(), kpos = '.p' + this._mc, pos = states.g(kpos);
            if (!pos)
                throw new E(E.ACT_CHAR_NOT_ON, this._l);
            if (pos == this._mp)
                return runtime;
            return runtime.gD().charMove(pos, this._mp)
                .then(function () {
                states.s(kpos, _this._mp);
                states.m('_c' + pos, '_c' + _this._mp);
                states.m('_s' + pos, '_s' + _this._mp);
                return runtime;
            });
        };
        return CharMove;
    }(Tag.Action));
    Tag.CharMove = CharMove;
})(Tag || (Tag = {}));
/**
 * 定义如果数据动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Logic/WhenVar.ts
 */
/// <reference path="Loop.ts" />
var Tag;
(function (Tag) {
    var Util = __Bigine_Util;
    var WhenVar = (function (_super) {
        __extends(WhenVar, _super);
        function WhenVar() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        WhenVar.prototype.gN = function () {
            return 'WhenVar';
        };
        /**
         * （执行）检查。
         */
        WhenVar.prototype.t = function (states) {
            var depth = states.g('$d'), kt = '$t' + depth, kv = '$v' + depth;
            if (states.g(kt) || states.g(kv) != this.$v(states.g(this._p[0])))
                return true;
            states.s(kt, true);
            return Util.every(this._s, function (tag) { return tag.t(states); });
        };
        /**
         * 执行。
         */
        WhenVar.prototype.p = function (runtime) {
            var states = runtime.gS(), logger = runtime.gL(), value = this.$v(states.g(this._p[0])), title = 'WHENVAR ' + this._p[0], kd = '$d', depth = states.g(kd), kt = '$t' + depth, kv = '$v' + depth, kid = '.a', id = states.g(kid);
            if (!id && (states.g(kt) || states.g(kv) != value))
                return runtime;
            logger.o(title);
            states.s(kt, true)
                .s(kd, 1 + depth);
            return Util.Q.every(this._s, function (action) {
                id = states.g(kid);
                if (id) {
                    if ('gI' in action) {
                        if (action.gI() != id)
                            return runtime;
                        states.d(kid);
                        action.d();
                    }
                    else if ('gA' in action) {
                        if (-1 == Util.indexOf(action.gA(), id))
                            return runtime;
                    }
                    else
                        return runtime;
                }
                return action.p(runtime);
            })['catch'](function (error) {
                if (error && E.Signal.HALT == error.signal)
                    logger.c(title);
                throw error;
            }).then(function () {
                states.s(kd, depth);
                logger.c(title);
                return runtime;
            });
        };
        /**
         * 获取关键动作编号列表。
         */
        WhenVar.prototype.gA = function () {
            return Tag.Loop.prototype.gA.call(this);
        };
        /**
         * 获取使用资源列表。
         */
        WhenVar.prototype.c = function () {
            return Tag.Loop.prototype.c.call(this);
        };
        return WhenVar;
    }(Tag.Action));
    Tag.WhenVar = WhenVar;
})(Tag || (Tag = {}));
/**
 * 定义停止音乐动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Director/StopBGM.ts
 */
/// <reference path="../../Action.ts" />
var Tag;
(function (Tag) {
    var StopBGM = (function (_super) {
        __extends(StopBGM, _super);
        function StopBGM() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        StopBGM.prototype.gN = function () {
            return 'StopBGM';
        };
        /**
         * 执行。
         */
        StopBGM.prototype.p = function (runtime) {
            runtime.gS().d('_b');
            return runtime.gD().playMusic(Core.IResource.Type.BGM);
        };
        return StopBGM;
    }(Tag.Action));
    Tag.StopBGM = StopBGM;
})(Tag || (Tag = {}));
/**
 * 定义定义选择动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Flow/DefOptions.ts
 */
/// <reference path="../../Action.ts" />
/// <reference path="Option.ts" />
var Tag;
(function (Tag) {
    var Util = __Bigine_Util;
    var DefOptions = (function (_super) {
        __extends(DefOptions, _super);
        function DefOptions() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        DefOptions.prototype.gN = function () {
            return 'DefOptions';
        };
        /**
         * 执行。
         */
        DefOptions.prototype.p = function (runtime) {
            var opts = [], states = runtime.gS();
            Util.each(this._s, function (tag) {
                if ('i' in tag) {
                    var isPay = states.qp(tag.gI(), tag.gM());
                    tag.sA(isPay);
                    opts.push(tag);
                }
                else {
                    opts.push(Tag.Option.f(tag));
                }
            });
            runtime.gS().s('$_' + this._c, opts);
            return runtime;
        };
        return DefOptions;
    }(Tag.Action));
    Tag.DefOptions = DefOptions;
})(Tag || (Tag = {}));
/**
 * 定义添加选项动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Flow/AddOption.ts
 */
/// <reference path="../../Action.ts" />
/// <reference path="Option.ts" />
var Tag;
(function (Tag) {
    var AddOption = (function (_super) {
        __extends(AddOption, _super);
        function AddOption() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        AddOption.prototype.gN = function () {
            return 'AddOption';
        };
        /**
         * 执行。
         */
        AddOption.prototype.p = function (runtime) {
            var states = runtime.gS(), key = '$_' + this._p[0], opts = states.g(key) || [], params = this._p[2] ? [this._p[1], this._p[2]] : [this._p[1]], opt = new Tag.Option(params, this._c || this._p[1], [], this._l);
            if (this._p[2])
                opt.i(this.gI());
            opts.push(opt);
            states.s(key, opts);
            return runtime;
        };
        /**
         * 获取编号。
         */
        AddOption.prototype.gI = function () {
            return this._i;
        };
        /**
         * 恢复编号。
         */
        AddOption.prototype.i = function (id) {
            this._i = id;
        };
        /**
         * 转化为运行时（Javascript）代码。
         */
        AddOption.prototype.toJsrn = function () {
            var clob = _super.prototype.toJsrn.call(this);
            return this._p[2] ? clob.substr(0, clob.length - 1) + ',"' + this._i + '")' : clob;
        };
        return AddOption;
    }(Tag.Action));
    Tag.AddOption = AddOption;
})(Tag || (Tag = {}));
/**
 * 定义去除选项动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Flow/DropOption.ts
 */
/// <reference path="../../Action.ts" />
/// <reference path="Option.ts" />
var Tag;
(function (Tag) {
    var Util = __Bigine_Util;
    var DropOption = (function (_super) {
        __extends(DropOption, _super);
        function DropOption() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        DropOption.prototype.gN = function () {
            return 'DropOption';
        };
        /**
         * 执行。
         */
        DropOption.prototype.p = function (runtime) {
            var _this = this;
            var states = runtime.gS(), key = '$_' + this._p[0], opts = states.g(key) || [];
            Util.some(opts, function (option, index) {
                if (_this._p[1] != option.$p(0))
                    return false;
                opts.splice(index, 1);
                return true;
            });
            states.s(key, opts);
            return runtime;
        };
        return DropOption;
    }(Tag.Action));
    Tag.DropOption = DropOption;
})(Tag || (Tag = {}));
/**
 * 定义随机数据动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Logic/Random.ts
 */
/// <reference path="../../Action.ts" />
var Tag;
(function (Tag) {
    var Random = (function (_super) {
        __extends(Random, _super);
        function Random() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        Random.prototype.gN = function () {
            return 'Random';
        };
        /**
         * （执行）检查。
         */
        Random.prototype.t = function (states) {
            var depth = states.g('$d');
            states.s(this._p[0], Math.round(100 * Math.random()))
                .c(this._p[0], '$v' + depth)
                .s('$t' + depth, false);
            return true;
        };
        /**
         * 执行。
         */
        Random.prototype.p = function (runtime) {
            this.t(runtime.gS());
            return runtime;
        };
        return Random;
    }(Tag.Action));
    Tag.Random = Random;
})(Tag || (Tag = {}));
/**
 * 定义当时间动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Logic/IfTime.ts
 */
/// <reference path="../../Action.ts" />
var Tag;
(function (Tag) {
    var IfTime = (function (_super) {
        __extends(IfTime, _super);
        function IfTime() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        IfTime.prototype.gN = function () {
            return 'IfTime';
        };
        /**
         * （执行）检查。
         */
        IfTime.prototype.t = function (states) {
            var depth = states.g('$d'), ret = this._p[0] == states.g('_t');
            states.s('$v' + depth, ret)
                .s('$t' + depth, false);
            return ret;
        };
        /**
         * 执行。
         */
        IfTime.prototype.p = function (runtime) {
            this.t(runtime.gS());
            return runtime;
        };
        return IfTime;
    }(Tag.Action));
    Tag.IfTime = IfTime;
})(Tag || (Tag = {}));
/**
 * 定义复制数据动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Logic/Copy.ts
 */
/// <reference path="../../Action.ts" />
var Tag;
(function (Tag) {
    var Copy = (function (_super) {
        __extends(Copy, _super);
        function Copy() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        Copy.prototype.gN = function () {
            return 'Copy';
        };
        /**
         * （执行）检查。
         */
        Copy.prototype.t = function (states) {
            var depth = states.g('$d');
            states.c(this._p[1], this._p[0])
                .c(this._p[0], '$v' + depth)
                .s('$t' + depth, false);
            return true;
        };
        /**
         * 执行。
         */
        Copy.prototype.p = function (runtime) {
            this.t(runtime.gS());
            return runtime;
        };
        return Copy;
    }(Tag.Action));
    Tag.Copy = Copy;
})(Tag || (Tag = {}));
/**
 * 定义数据合值动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Logic/Add.ts
 */
/// <reference path="../../Action.ts" />
var Tag;
(function (Tag) {
    var Util = __Bigine_Util;
    var Add = (function (_super) {
        __extends(Add, _super);
        function Add() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        Add.prototype.gN = function () {
            return 'Add';
        };
        /**
         * （执行）检查。
         */
        Add.prototype.t = function (states) {
            var value = 0, depth = states.g('$d');
            Util.each(this._s, function (tag) {
                value += states.g(tag.$p(0)) - 0 || 0;
            });
            states.s(this._p[0], value)
                .c(this._p[0], '$v' + depth)
                .s('$t' + depth, false);
            return true;
        };
        /**
         * 执行。
         */
        Add.prototype.p = function (runtime) {
            this.t(runtime.gS());
            return runtime;
        };
        return Add;
    }(Tag.Action));
    Tag.Add = Add;
})(Tag || (Tag = {}));
/**
 * 定义数据差值动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Logic/Subtract.ts
 */
/// <reference path="../../Action.ts" />
var Tag;
(function (Tag) {
    var Util = __Bigine_Util;
    var Subtract = (function (_super) {
        __extends(Subtract, _super);
        function Subtract() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        Subtract.prototype.gN = function () {
            return 'Subtract';
        };
        /**
         * （执行）检查。
         */
        Subtract.prototype.t = function (states) {
            var value = states.g(this._p[1]), depth = states.g('$d');
            Util.each(this._s, function (tag) {
                value -= states.g(tag.$p(0)) - 0 || 0;
            });
            states.s(this._p[0], value)
                .c(this._p[0], '$v' + depth)
                .s('$t' + depth, false);
            return true;
        };
        /**
         * 执行。
         */
        Subtract.prototype.p = function (runtime) {
            this.t(runtime.gS());
            return runtime;
        };
        return Subtract;
    }(Tag.Action));
    Tag.Subtract = Subtract;
})(Tag || (Tag = {}));
/**
 * 定义数据倍值动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Logic/Product.ts
 */
/// <reference path="../../Action.ts" />
var Tag;
(function (Tag) {
    var Util = __Bigine_Util;
    var Product = (function (_super) {
        __extends(Product, _super);
        function Product() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        Product.prototype.gN = function () {
            return 'Product';
        };
        /**
         * （执行）检查。
         */
        Product.prototype.t = function (states) {
            var value = 1, depth = states.g('$d');
            Util.each(this._s, function (tag) {
                value *= states.g(tag.$p(0)) - 0 || 0;
            });
            states.s(this._p[0], value)
                .c(this._p[0], '$v' + depth)
                .s('$t' + depth, false);
            return true;
        };
        /**
         * 执行。
         */
        Product.prototype.p = function (runtime) {
            this.t(runtime.gS());
            return runtime;
        };
        return Product;
    }(Tag.Action));
    Tag.Product = Product;
})(Tag || (Tag = {}));
/**
 * 定义定义数据动作标签组件。
 *
 * @author    姚尧 <yyao@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Logic/Define.ts
 */
/// <reference path="../../Action.ts" />
var Tag;
(function (Tag) {
    var Util = __Bigine_Util;
    var Define = (function (_super) {
        __extends(Define, _super);
        /**
         * 构造函数。
         */
        function Define(params, content, children, lineNo) {
            var _this = this;
            _super.call(this, params, content, children, lineNo);
            this._md = {};
            Util.each(children, function (child) {
                var fieldName = child.$p(0);
                var fieldVal = child.$c();
                _this._md[fieldName] = fieldVal;
            });
        }
        /**
         * 获取标签名称。
         */
        Define.prototype.gN = function () {
            return 'Define';
        };
        /**
         * 绑定（运行时）作品（实体）。
         */
        Define.prototype.$b = function (ep) {
            this._ms = ep.q(this._p[0], Core.IEpisode.Entity.Struct, this._l);
        };
        /**
         * 执行。
         */
        Define.prototype.p = function (runtime) {
            // 如果是继承上一章的数据
            var states = runtime.gS(), field = states.g(this._c);
            if (field)
                return runtime;
            runtime.gS().s(this._c, this._ms.g(this._md));
            return runtime;
        };
        return Define;
    }(Tag.Action));
    Tag.Define = Define;
})(Tag || (Tag = {}));
/**
 * 定义[定义集合]动作标签组件。
 *
 * @author    姚尧 <yyao@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Logic/Collection.ts
 */
/// <reference path="../../Action.ts" />
var Tag;
(function (Tag) {
    var Util = __Bigine_Util;
    var Collection = (function (_super) {
        __extends(Collection, _super);
        function Collection() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        Collection.prototype.gN = function () {
            return 'Collection';
        };
        /**
         * 执行。
         */
        Collection.prototype.p = function (runtime) {
            var _this = this;
            var states = runtime.gS(), type = '：', coll = {
                '：': this._p[0],
                '': []
            }, obj;
            Util.each(this._s, function (child) {
                var name = child.$p(0);
                obj = states.g(name);
                if ('object' != typeof obj || !(type in obj) || obj[type] != _this._p[0]) {
                    throw new E(E.COLL_STRUCT_DISMATCHED, _this._l);
                }
                coll[''].push(name);
            });
            states.s(this._c, coll);
            return runtime;
        };
        return Collection;
    }(Tag.Action));
    Tag.Collection = Collection;
})(Tag || (Tag = {}));
/**
 * 定义[增加元素]动作标签组件。
 *
 * @author    姚尧 <yyao@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Logic/CollPush.ts
 */
/// <reference path="../../Action.ts" />
var Tag;
(function (Tag) {
    var CollPush = (function (_super) {
        __extends(CollPush, _super);
        function CollPush() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        CollPush.prototype.gN = function () {
            return 'CollPush';
        };
        /**
         * 执行。
         */
        CollPush.prototype.p = function (runtime) {
            var states = runtime.gS(), collection = states.g(this._p[0]), addItem = states.g(this._c), type = "：";
            // 要证元素的数据类型是否匹配集合的数据类型
            if ('object' != typeof addItem || !(type in addItem) || addItem[type] != collection[type]) {
                throw new E(E.COLL_STRUCT_DISMATCHED, this._l);
            }
            collection[''].push(addItem);
            return runtime;
        };
        return CollPush;
    }(Tag.Action));
    Tag.CollPush = CollPush;
})(Tag || (Tag = {}));
/**
 * 定义[删除元素]动作标签组件。
 *
 * @author    姚尧 <yyao@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Logic/CollPop.ts
 */
/// <reference path="../../Action.ts" />
var Tag;
(function (Tag) {
    var Util = __Bigine_Util;
    var CollPop = (function (_super) {
        __extends(CollPop, _super);
        function CollPop() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        CollPop.prototype.gN = function () {
            return 'CollPop';
        };
        /**
         * 执行。
         */
        CollPop.prototype.p = function (runtime) {
            var states = runtime.gS(), coll = states.g(this._p[0])[''], delItem = states.g(this._c);
            Util.every(coll, function (item, index) {
                if (delItem == item) {
                    coll.splice(index, 1);
                    return false;
                }
                return true;
            });
            return runtime;
        };
        return CollPop;
    }(Tag.Action));
    Tag.CollPop = CollPop;
})(Tag || (Tag = {}));
/**
 * 定义结构标签组件。
 *
 * @author    姚尧 <yyao@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_State/Struct.ts
 */
/// <reference path="../Entity.ts" />
var Tag;
(function (Tag) {
    var Util = __Bigine_Util;
    var Struct = (function (_super) {
        __extends(Struct, _super);
        /**
         * 构造函数。
         */
        function Struct(params, content, children, lineNo) {
            _super.call(this, params, content, children, lineNo);
            var entCount = 0;
            var nameCount = 0;
            Util.each(children, function (child) {
                if (child.iE()) {
                    entCount++;
                }
                if (child.iN()) {
                    nameCount++;
                }
            });
            if (entCount > 1 || nameCount > 1)
                throw new E(E.STRUCT_FIELD_TYPE_TOO_MANY, this._l);
        }
        /**
         * 获取标签名称。
         */
        Struct.prototype.gN = function () {
            return 'Struct';
        };
        /**
         * 获取类型。
         */
        Struct.prototype.gT = function () {
            return Core.IEpisode.Entity.Struct;
        };
        /**
         * 获取类型。
         */
        Struct.prototype.gS = function () {
            return this._s;
        };
        /**
         * 获取实体字段的实体类型。
         */
        Struct.prototype.gET = function (fieldName) {
            var entityType;
            Util.every(this._s, function (field) {
                if (field.$c() == fieldName && field.iE()) {
                    entityType = field.gET();
                    return false;
                }
                return true;
            });
            return entityType;
        };
        /**
         * 根据字段名判断是否实体类型的字段。
         */
        Struct.prototype.iE = function (fieldName) {
            var isEntity = false;
            Util.every(this._s, function (field) {
                if (field.$c() == fieldName && field.iE()) {
                    isEntity = true;
                    return false;
                }
                return true;
            });
            return isEntity;
        };
        /**
         * 获取结构体对象。
         */
        Struct.prototype.g = function (data) {
            var result = { '：': this._c };
            Util.each(this._s, function (child) {
                var fieldVal = data[child.$c()];
                result[child.$c()] = child.g(fieldVal ? fieldVal : null);
            });
            return result;
        };
        return Struct;
    }(Tag.Entity));
    Tag.Struct = Struct;
})(Tag || (Tag = {}));
/**
 * 定义字段标签组件。
 *
 * @author    姚尧 <yyao@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_State/Field.ts
 */
/// <reference path="../Unknown.ts" />
var Tag;
(function (Tag) {
    var Util = __Bigine_Util;
    var Field = (function (_super) {
        __extends(Field, _super);
        /**
         * 构造函数。
         */
        function Field(params, content, children, lineNo) {
            _super.call(this, params, content, children, lineNo);
            this.numberTypes = ['心', '星'];
            this.nameTypes = ['名称'];
            this.entityTypes = {
                '人物': Core.IEpisode.Entity.Chr,
                '房间': Core.IEpisode.Entity.Room,
                '特写': Core.IEpisode.Entity.CG
            };
        }
        /**
         * 绑定（运行时）作品（实体）。
         */
        Field.prototype.$b = function (ep) {
            this._ep = ep;
        };
        /**
         * 获取标签名称。
         */
        Field.prototype.gN = function () {
            return 'Field';
        };
        /**
         * 是否实体类型。
         */
        Field.prototype.iE = function () {
            var fieldType;
            Util.each(this._s, function (child) {
                if (child.gN() == 'FieldType') {
                    fieldType = child.$c();
                }
            });
            return this.entityTypes[fieldType] != null && this.entityTypes[fieldType] != undefined;
        };
        /**
         * 获取实体类型值。
         */
        Field.prototype.gIE = function (val) {
            if (this._s.length == 0)
                return undefined;
            var fieldType = null;
            Util.each(this._s, function (child) {
                if (child.gN() == 'FieldType') {
                    fieldType = child.$c();
                }
            });
            if (this.entityTypes[fieldType]) {
                if (!val)
                    throw new E(E.STRUCT_FIELD_MISSING, this._l);
                var obj = this._ep.q(val, this.entityTypes[fieldType], this._l);
                return obj;
            }
            return undefined;
        };
        /**
         * 是否名称类型。
         */
        Field.prototype.iN = function () {
            var fieldType;
            Util.each(this._s, function (child) {
                if (child.gN() == 'FieldType') {
                    fieldType = child.$c();
                }
            });
            return Util.indexOf(this.nameTypes, fieldType) > -1;
        };
        /**
         * 获取字段类型。
         */
        Field.prototype.gT = function () {
            var fieldType;
            Util.each(this._s, function (child) {
                if (child.gN() == 'FieldType') {
                    fieldType = child.$c();
                }
            });
            return fieldType;
        };
        /**
         * 获取字段类型。
         */
        Field.prototype.gET = function () {
            var entity = this.entityTypes[this.gT()];
            return entity;
        };
        /**
         * 获取上限。
         */
        Field.prototype.gL = function () {
            if (this._s.length == 0)
                return 0;
            var fieldLimit = 0;
            Util.each(this._s, function (child) {
                if (child.gN() == 'FieldLimit') {
                    fieldLimit = parseInt(child.$c(), 10) || 0;
                }
            });
            return fieldLimit;
        };
        /**
         * 获取字段的值。
         */
        Field.prototype.g = function (val) {
            if (this._s.length == 0)
                return val ? val : '';
            var fieldType = null;
            var fieldLimit = null;
            Util.each(this._s, function (child) {
                if (child.gN() == 'FieldType') {
                    fieldType = child.$c();
                }
                if (child.gN() == 'FieldLimit') {
                    fieldLimit = child.$c();
                }
            });
            if (Util.indexOf(this.numberTypes, fieldType) > -1) {
                var limit = parseInt(fieldLimit, 10);
                var value = (val != null && val != undefined) ? parseInt(val, 10) : 0;
                return value > limit ? limit : value;
            }
            else if (this.entityTypes[fieldType]) {
                if (!val)
                    throw new E(E.STRUCT_FIELD_MISSING, this._l);
                return val;
            }
            return val ? val : '';
        };
        return Field;
    }(Tag.Unknown));
    Tag.Field = Field;
})(Tag || (Tag = {}));
/**
 * 定义类别标签组件。
 *
 * @author    姚尧 <yyao@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_State/FieldType.ts
 */
/// <reference path="../Unknown.ts" />
var Tag;
(function (Tag) {
    var FieldType = (function (_super) {
        __extends(FieldType, _super);
        function FieldType() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        FieldType.prototype.gN = function () {
            return 'FieldType';
        };
        return FieldType;
    }(Tag.Unknown));
    Tag.FieldType = FieldType;
})(Tag || (Tag = {}));
/**
 * 定义上限标签组件。
 *
 * @author    姚尧 <yyao@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_State/FieldLimit.ts
 */
/// <reference path="../Unknown.ts" />
var Tag;
(function (Tag) {
    var FieldLimit = (function (_super) {
        __extends(FieldLimit, _super);
        function FieldLimit() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        FieldLimit.prototype.gN = function () {
            return 'FieldLimit';
        };
        return FieldLimit;
    }(Tag.Unknown));
    Tag.FieldLimit = FieldLimit;
})(Tag || (Tag = {}));
/**
 * 定义集合面板标签组件。
 *
 * @author    姚尧 <yyao@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Structure/_Panel/CollPanel.ts
 */
/// <reference path="../../Unknown.ts" />
var Tag;
(function (Tag) {
    var Util = __Bigine_Util;
    var CollPanel = (function (_super) {
        __extends(CollPanel, _super);
        function CollPanel() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        CollPanel.prototype.gN = function () {
            return 'CollPanel';
        };
        /**
         * 根据标签结构生成数据结构。
         */
        CollPanel.prototype.g = function () {
            var result = {};
            var colls = [];
            var strutc = '';
            Util.each(this._s, function (child) {
                if ('CollSource' == child.gN()) {
                    colls.push(child.$c());
                }
                else if ('CollStruct' == child.gN()) {
                    strutc = child.$c();
                }
            });
            result["cn"] = colls;
            result["s"] = strutc;
            result["："] = "coll";
            result["n"] = this._c;
            return result;
        };
        return CollPanel;
    }(Tag.Unknown));
    Tag.CollPanel = CollPanel;
})(Tag || (Tag = {}));
/**
 * 定义使用集合标签组件。
 *
 * @author    姚尧 <yyao@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Structure/_Panel/CollSource.ts
 */
/// <reference path="../../Unknown.ts" />
var Tag;
(function (Tag) {
    // import Util = __Bigine_Util;
    var CollSource = (function (_super) {
        __extends(CollSource, _super);
        function CollSource() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        CollSource.prototype.gN = function () {
            return 'CollSource';
        };
        return CollSource;
    }(Tag.Unknown));
    Tag.CollSource = CollSource;
})(Tag || (Tag = {}));
/**
 * 定义集合结构标签组件。
 *
 * @author    姚尧 <yyao@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Structure/_Panel/CollStruct.ts
 */
/// <reference path="../../Unknown.ts" />
var Tag;
(function (Tag) {
    // import Util = __Bigine_Util;
    var CollStruct = (function (_super) {
        __extends(CollStruct, _super);
        function CollStruct() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        CollStruct.prototype.gN = function () {
            return 'CollStruct';
        };
        return CollStruct;
    }(Tag.Unknown));
    Tag.CollStruct = CollStruct;
})(Tag || (Tag = {}));
/**
 * 定义简单面板标签组件。
 *
 * @author    姚尧 <yyao@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Structure/_Panel/SimpPanel.ts
 */
/// <reference path="../../Unknown.ts" />
var Tag;
(function (Tag) {
    var Util = __Bigine_Util;
    var SimpPanel = (function (_super) {
        __extends(SimpPanel, _super);
        function SimpPanel() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        SimpPanel.prototype.gN = function () {
            return 'SimpPanel';
        };
        /**
         * 根据标签结构生成数据结构。
         */
        SimpPanel.prototype.g = function () {
            var result = {};
            result['c'] = [];
            Util.each(this._s, function (ele) {
                result['c'].push(ele.g());
            });
            result['n'] = this._c;
            result['：'] = 'simp';
            return result;
        };
        return SimpPanel;
    }(Tag.Unknown));
    Tag.SimpPanel = SimpPanel;
})(Tag || (Tag = {}));
/**
 * 定义条目标签组件。
 *
 * @author    姚尧 <yyao@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Structure/_Panel/SimpEle.ts
 */
/// <reference path="../../Unknown.ts" />
var Tag;
(function (Tag) {
    var Util = __Bigine_Util;
    var SimpEle = (function (_super) {
        __extends(SimpEle, _super);
        function SimpEle() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        SimpEle.prototype.gN = function () {
            return 'SimpEle';
        };
        /**
         * 根据标签结构生成数据结构。
         */
        SimpEle.prototype.g = function () {
            var result = {};
            result['alias'] = this._c;
            Util.each(this._s, function (child) {
                if ('EleName' == child.gN()) {
                    result['name'] = child.$c();
                }
                else if ('EleType' == child.gN()) {
                    result['type'] = child.$c();
                }
            });
            return result;
        };
        return SimpEle;
    }(Tag.Unknown));
    Tag.SimpEle = SimpEle;
})(Tag || (Tag = {}));
/**
 * 定义数据名标签组件。
 *
 * @author    姚尧 <yyao@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Structure/_Panel/EleName.ts
 */
/// <reference path="../../Unknown.ts" />
var Tag;
(function (Tag) {
    // import Util = __Bigine_Util;
    var EleName = (function (_super) {
        __extends(EleName, _super);
        function EleName() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        EleName.prototype.gN = function () {
            return 'EleName';
        };
        return EleName;
    }(Tag.Unknown));
    Tag.EleName = EleName;
})(Tag || (Tag = {}));
/**
 * 定义数据类别标签组件。
 *
 * @author    姚尧 <yyao@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Structure/_Panel/EleType.ts
 */
/// <reference path="../../Unknown.ts" />
var Tag;
(function (Tag) {
    // import Util = __Bigine_Util;
    var EleType = (function (_super) {
        __extends(EleType, _super);
        function EleType() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        EleType.prototype.gN = function () {
            return 'EleType';
        };
        return EleType;
    }(Tag.Unknown));
    Tag.EleType = EleType;
})(Tag || (Tag = {}));
/**
 * 定义停顿动作标签组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Director/Pause.ts
 */
/// <reference path="../../Action.ts" />
var Tag;
(function (Tag) {
    var Pause = (function (_super) {
        __extends(Pause, _super);
        /**
         * 构造函数。
         */
        function Pause(params, content, children, lineNo) {
            _super.call(this, params, content, children, lineNo);
            switch (params[0]) {
                case '短':
                    this._ms = 500;
                    break;
                case '中':
                    this._ms = 1000;
                    break;
                case '长':
                    this._ms = 5000;
                    break;
                case undefined:
                    this._ms = 0;
                    break;
                default:
                    throw new E(E.TAG_PARAMS_NOT_TRUE, lineNo);
            }
        }
        /**
         * 获取标签名称。
         */
        Pause.prototype.gN = function () {
            return 'Pause';
        };
        /**
         * 执行。
         */
        Pause.prototype.p = function (runtime) {
            return runtime.gD().pause(this._ms);
        };
        return Pause;
    }(Tag.Action));
    Tag.Pause = Pause;
})(Tag || (Tag = {}));
/**
 * 定义镜头动画动作标签组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Director/Camera.ts
 */
/// <reference path="../../Action.ts" />
var Tag;
(function (Tag) {
    var Camera = (function (_super) {
        __extends(Camera, _super);
        /**
         * 构造函数。
         */
        function Camera(params, content, children, lineNo) {
            _super.call(this, params, content, children, lineNo);
            switch (params[0]) {
                case '快':
                    this._ms = 500;
                    break;
                case '中':
                    this._ms = 4000;
                    break;
                case '慢':
                    this._ms = 8000;
                    break;
                case undefined:
                    this._ms = 20; // 虽说设置镜头不需要动画效果，为算法统一，将时间设为1帧，即20ms。
                    break;
                default:
                    throw new E(E.TAG_PARAMS_NOT_TRUE, lineNo);
            }
            switch (content) {
                case '左上':
                    this._mx = 0;
                    this._my = 0;
                    break;
                case '上':
                    this._mx = 0.5;
                    this._my = 0;
                    break;
                case '右上':
                    this._mx = 1;
                    this._my = 0;
                    break;
                case '左':
                    this._mx = 0;
                    this._my = 0.5;
                    break;
                case '中':
                    this._mx = 0.5;
                    this._my = 0.5;
                    break;
                case '右':
                    this._mx = 1;
                    this._my = 0.5;
                    break;
                case '左下':
                    this._mx = 0;
                    this._my = 1;
                    break;
                case '下':
                    this._mx = 0.5;
                    this._my = 1;
                    break;
                case '右下':
                    this._mx = 1;
                    this._my = 1;
                    break;
                case '':
                    break;
                default:
                    throw new E(E.ACT_ILLEGAL_CAMERA_MOVE, lineNo);
            }
        }
        return Camera;
    }(Tag.Action));
    Tag.Camera = Camera;
})(Tag || (Tag = {}));
/**
 * 定义移动镜头动画动作标签组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Director/CameraMove.ts
 */
/// <reference path="Camera.ts" />
var Tag;
(function (Tag) {
    var CameraMove = (function (_super) {
        __extends(CameraMove, _super);
        function CameraMove() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        CameraMove.prototype.gN = function () {
            return 'CameraMove';
        };
        /**
         * 执行。
         */
        CameraMove.prototype.p = function (runtime) {
            var states = runtime.gS(), camera = states.g('.z'), now = this._mx.toString() + ',' + this._my.toString();
            if (!camera || camera == now)
                return runtime;
            return runtime.gD().cameraMove(this._mx, this._my, this._ms)
                .then(function () {
                states.s('.z', now);
                states.s('_z', now);
                return runtime;
            });
        };
        return CameraMove;
    }(Tag.Camera));
    Tag.CameraMove = CameraMove;
})(Tag || (Tag = {}));
/**
 * 定义放大镜头动画动作标签组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Director/CameraZoom.ts
 */
/// <reference path="Camera.ts" />
var Tag;
(function (Tag) {
    var CameraZoom = (function (_super) {
        __extends(CameraZoom, _super);
        function CameraZoom() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        CameraZoom.prototype.gN = function () {
            return 'CameraZoom';
        };
        /**
         * 执行。
         */
        CameraZoom.prototype.p = function (runtime) {
            var states = runtime.gS(), camera = states.g('.z'), now = this._mx.toString() + ',' + this._my.toString();
            if (camera)
                return runtime;
            return runtime.gD().cameraZoom(this._mx, this._my, this._ms, 1)
                .then(function () {
                states.s('.z', now);
                states.s('_z', now);
                return runtime;
            });
        };
        return CameraZoom;
    }(Tag.Camera));
    Tag.CameraZoom = CameraZoom;
})(Tag || (Tag = {}));
/**
 * 定义复位镜头动画动作标签组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Director/CameraReset.ts
 */
/// <reference path="Camera.ts" />
var Tag;
(function (Tag) {
    var CameraReset = (function (_super) {
        __extends(CameraReset, _super);
        function CameraReset() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        CameraReset.prototype.gN = function () {
            return 'CameraReset';
        };
        /**
         * 执行。
         */
        CameraReset.prototype.p = function (runtime) {
            var states = runtime.gS(), camera = states.g('.z'), strArr, mx, my;
            if (!camera)
                return runtime;
            strArr = camera.split(',');
            if (strArr.length !== 2)
                return runtime;
            mx = parseFloat(strArr[0]);
            my = parseFloat(strArr[1]);
            return runtime.gD().cameraZoom(mx, my, this._ms, -1)
                .then(function () {
                states.d('.z');
                states.d('_z');
                return runtime;
            });
        };
        return CameraReset;
    }(Tag.Camera));
    Tag.CameraReset = CameraReset;
})(Tag || (Tag = {}));
/**
 * 定义设置镜头动画动作标签组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Director/CameraSet.ts
 */
/// <reference path="Camera.ts" />
var Tag;
(function (Tag) {
    var CameraSet = (function (_super) {
        __extends(CameraSet, _super);
        function CameraSet() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        CameraSet.prototype.gN = function () {
            return 'CameraSet';
        };
        /**
         * 执行。
         */
        CameraSet.prototype.p = function (runtime) {
            var states = runtime.gS(), camera = states.g('.z'), now = this._mx.toString() + ',' + this._my.toString();
            if (camera)
                return runtime;
            return runtime.gD().cameraZoom(this._mx, this._my, this._ms, 1)
                .then(function () {
                states.s('.z', now);
                states.s('_z', now);
                return runtime;
            });
        };
        return CameraSet;
    }(Tag.Camera));
    Tag.CameraSet = CameraSet;
})(Tag || (Tag = {}));
/**
 * 定义切幕动画动作标签组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Director/Curtains.ts
 */
/// <reference path="../../Action.ts" />
var Tag;
(function (Tag) {
    var Curtains = (function (_super) {
        __extends(Curtains, _super);
        /**
         * 构造函数。
         */
        function Curtains(params, content, children, lineNo) {
            _super.call(this, params, content, children, lineNo);
            switch (params[0]) {
                case '淡入淡出':
                    this._a = 'Fade';
                    break;
                case '水平百叶窗':
                    this._a = 'ShutterH';
                    break;
                case '垂直百叶窗':
                    this._a = 'ShutterV';
                    break;
                case '渐变':
                    this._a = 'Gradient';
                    break;
                case undefined:
                    this._a = undefined;
                    break;
                default:
                    throw new E(E.TAG_PARAMS_NOT_TRUE, lineNo);
            }
        }
        /**
         * 获取标签名称。
         */
        Curtains.prototype.gN = function () {
            return 'Curtains';
        };
        /**
         * 执行。
         */
        Curtains.prototype.p = function (runtime) {
            var states = runtime.gS(), curtain = states.g('_ra');
            if (curtain == this._a)
                return runtime;
            this._a ? states.s('_ra', this._a) : states.d('_ra');
            return runtime.gD().curtain(this._a);
        };
        return Curtains;
    }(Tag.Action));
    Tag.Curtains = Curtains;
})(Tag || (Tag = {}));
/**
 * 定义抖动镜头动画动作标签组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Director/CameraShake.ts
 */
/// <reference path="Camera.ts" />
var Tag;
(function (Tag) {
    var CameraShake = (function (_super) {
        __extends(CameraShake, _super);
        function CameraShake() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        CameraShake.prototype.gN = function () {
            return 'CameraShake';
        };
        /**
         * 执行。
         */
        CameraShake.prototype.p = function (runtime) {
            return runtime.gD().cameraShake();
        };
        return CameraShake;
    }(Tag.Camera));
    Tag.CameraShake = CameraShake;
})(Tag || (Tag = {}));
/**
 * 定义显示状态栏动作标签组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Director/ShowStatus.ts
 */
/// <reference path="../../Action.ts" />
var Tag;
(function (Tag) {
    var ShowStatus = (function (_super) {
        __extends(ShowStatus, _super);
        function ShowStatus() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        ShowStatus.prototype.gN = function () {
            return 'ShowStatus';
        };
        /**
         * 执行。
         */
        ShowStatus.prototype.p = function (runtime) {
            return runtime.gD().status(true);
        };
        return ShowStatus;
    }(Tag.Action));
    Tag.ShowStatus = ShowStatus;
})(Tag || (Tag = {}));
/**
 * 定义隐藏状态栏动作标签组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Director/HideStatus.ts
 */
/// <reference path="../../Action.ts" />
var Tag;
(function (Tag) {
    var HideStatus = (function (_super) {
        __extends(HideStatus, _super);
        function HideStatus() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        HideStatus.prototype.gN = function () {
            return 'HideStatus';
        };
        /**
         * 执行。
         */
        HideStatus.prototype.p = function (runtime) {
            return runtime.gD().status(false);
        };
        return HideStatus;
    }(Tag.Action));
    Tag.HideStatus = HideStatus;
})(Tag || (Tag = {}));
/**
 * 定义神态动画动作标签组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Director/Expression.ts
 */
/// <reference path="../../Action.ts" />
var Tag;
(function (Tag) {
    var Expression = (function (_super) {
        __extends(Expression, _super);
        /**
         * 构造函数。
         */
        function Expression(params, content, children, lineNo) {
            _super.call(this, params, content, children, lineNo);
            switch (params[0]) {
                case '渐变':
                    this._a = 'Gradient';
                    break;
                case '默认':
                case undefined:
                    this._a = undefined;
                    break;
                default:
                    throw new E(E.TAG_PARAMS_NOT_TRUE, lineNo);
            }
        }
        /**
         * 获取标签名称。
         */
        Expression.prototype.gN = function () {
            return 'Expression';
        };
        /**
         * 执行。
         */
        Expression.prototype.p = function (runtime) {
            var states = runtime.gS(), curtain = states.g('_rb');
            if (curtain == this._a)
                return runtime;
            this._a ? states.s('_rb', this._a) : states.d('_rb');
            return runtime.gD().expression(this._a);
        };
        return Expression;
    }(Tag.Action));
    Tag.Expression = Expression;
})(Tag || (Tag = {}));
/**
 * 声明（运行时）付款数据元信息接口规范。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/IPayMetas.ts
 */
/// <reference path="../../Core/_Runtime/IStates.ts" />
/**
 * 定义（运行时）付费数据事件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/Pay.ts
 */
/// <reference path="../Event.ts" />
/// <reference path="IPayMetas.ts" />
var Ev;
(function (Ev) {
    var Pay = (function (_super) {
        __extends(Pay, _super);
        /**
         * 构造函数。
         */
        function Pay(metas) {
            _super.call(this, metas);
            this.amount = metas.amount;
            this.suc = metas.suc;
            this.fail = metas.fail;
            this.id = metas.id;
        }
        /**
         * 获取类型。
         */
        Pay.prototype.gT = function () {
            return 'pay';
        };
        return Pay;
    }(Ev.Event));
    Ev.Pay = Pay;
})(Ev || (Ev = {}));
/**
 * 定义（运行时）打赏事件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/Donate.ts
 */
/// <reference path="Pay.ts" />
var Ev;
(function (Ev) {
    var Donate = (function (_super) {
        __extends(Donate, _super);
        function Donate() {
            _super.apply(this, arguments);
        }
        /**
         * 获取类型。
         */
        Donate.prototype.gT = function () {
            return 'donate';
        };
        return Donate;
    }(Ev.Pay));
    Ev.Donate = Donate;
})(Ev || (Ev = {}));
/**
 * 定义打赏数据动作标签组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Logic/Donate.ts
 */
/// <reference path="../../Idable.ts" />
/// <reference path="../../../Ev/_Runtime/Donate.ts" />
var Tag;
(function (Tag) {
    var Donate = (function (_super) {
        __extends(Donate, _super);
        function Donate() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        Donate.prototype.gN = function () {
            return 'Donate';
        };
        /**
         * 执行。
         */
        Donate.prototype.p = function (runtime) {
            var _this = this;
            return Promise.resolve(_super.prototype.p.call(this, runtime))
                .then(function () {
                var amount = parseInt(_this._p[0], 10) || 0, states = runtime.gS(), id = _this.gI(), ktime = '_td', td = states.g(ktime), tn = new Date().getTime(), depth = states.g('$d'), yes = function () { return states.s('$v' + depth, true).s('$t' + depth, false); }, no = function () { return states.s('$v' + depth, false).s('$t' + depth, false); };
                if (td && states.qp(id, td, true)) {
                    yes();
                    states.d(ktime);
                    return runtime;
                }
                else {
                    return new Promise(function (resolve) {
                        var suc = function () {
                            yes();
                            resolve(runtime);
                        }, fail = function () {
                            no();
                            resolve(runtime);
                        };
                        states.s(ktime, tn);
                        runtime.a(_this);
                        states.l().then(function () {
                            states.e('pay');
                            runtime.dispatchEvent(new Ev.Donate({
                                target: states,
                                amount: amount,
                                id: id,
                                suc: suc,
                                fail: fail
                            }));
                        }).catch(function () {
                            no();
                            resolve(runtime);
                        });
                    });
                }
            });
        };
        return Donate;
    }(Tag.Idable));
    Tag.Donate = Donate;
})(Tag || (Tag = {}));
/**
 * 声明剧情结束事件元信息接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/IFinMetas.ts
 */
/// <reference path="../../../include/tsd.d.ts" />
/// <reference path="../../Core/_Runtime/IEpisode.ts" />
/**
 * 定义剧情结束事件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/Fin.ts
 */
/// <reference path="../Event.ts" />
/// <reference path="IFinMetas.ts" />
var Ev;
(function (Ev) {
    var Fin = (function (_super) {
        __extends(Fin, _super);
        /**
         * 构造函数。
         */
        function Fin(metas) {
            _super.call(this, metas);
        }
        /**
         * 获取类型。
         */
        Fin.prototype.gT = function () {
            return 'fin';
        };
        return Fin;
    }(Ev.Event));
    Ev.Fin = Fin;
})(Ev || (Ev = {}));
/**
 * 声明评分事件元信息接口规范。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/IRankMetas.ts
 */
/// <reference path="../../../include/tsd.d.ts" />
/// <reference path="../../Core/_Runtime/IEpisode.ts" />
/**
 * 定义评分事件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/Rank.ts
 */
/// <reference path="../Event.ts" />
/// <reference path="IRankMetas.ts" />
var Ev;
(function (Ev) {
    var Rank = (function (_super) {
        __extends(Rank, _super);
        /**
         * 构造函数。
         */
        function Rank(metas) {
            _super.call(this, metas);
            this.grade = metas.grade;
            this.score = metas.score;
        }
        /**
         * 获取类型。
         */
        Rank.prototype.gT = function () {
            return 'rank';
        };
        return Rank;
    }(Ev.Event));
    Ev.Rank = Rank;
})(Ev || (Ev = {}));
/**
 * 定义（运行时）付费数据事件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/PayOption.ts
 */
/// <reference path="Pay.ts" />
var Ev;
(function (Ev) {
    var PayOption = (function (_super) {
        __extends(PayOption, _super);
        function PayOption() {
            _super.apply(this, arguments);
        }
        /**
         * 获取类型。
         */
        PayOption.prototype.gT = function () {
            return 'pay.option';
        };
        return PayOption;
    }(Ev.Pay));
    Ev.PayOption = PayOption;
})(Ev || (Ev = {}));
/**
 * 声明（运行时）自动读档数据元信息接口规范。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/IAutoLoadMetas.ts
 */
/// <reference path="../../Core/_Runtime/IStates.ts" />
/**
 * 定义（运行时）自动读档数据事件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/AutoLoad.ts
 */
/// <reference path="../Event.ts" />
/// <reference path="IAutoLoadMetas.ts" />
var Ev;
(function (Ev) {
    var AutoLoad = (function (_super) {
        __extends(AutoLoad, _super);
        /**
         * 构造函数。
         */
        function AutoLoad(metas) {
            _super.call(this, metas);
            this.valid = metas.valid;
        }
        /**
         * 获取类型。
         */
        AutoLoad.prototype.gT = function () {
            return 'autoload';
        };
        return AutoLoad;
    }(Ev.Event));
    Ev.AutoLoad = AutoLoad;
})(Ev || (Ev = {}));
/**
 * 声明（运行时）弹出 / 关闭读档提示 数据元信息接口规范。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/IScreenLoadMetas.ts
 */
/// <reference path="../../Core/_Runtime/IStates.ts" />
/**
 * 定义（运行时）弹出 / 关闭读档提示 数据事件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/ScreenLoad.ts
 */
/// <reference path="../Event.ts" />
/// <reference path="IScreenLoadMetas.ts" />
var Ev;
(function (Ev) {
    var ScreenLoad = (function (_super) {
        __extends(ScreenLoad, _super);
        /**
         * 构造函数。
         */
        function ScreenLoad(metas) {
            _super.call(this, metas);
            this.type = metas.type;
        }
        /**
         * 获取类型。
         */
        ScreenLoad.prototype.gT = function () {
            return 'screen.load';
        };
        return ScreenLoad;
    }(Ev.Event));
    Ev.ScreenLoad = ScreenLoad;
})(Ev || (Ev = {}));
/**
 * 声明（运行时）弹出 / 关闭快速进入下一集提示 数据元信息接口规范。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/IScreenSaveMetas.ts
 */
/// <reference path="../../Core/_Runtime/IStates.ts" />
/**
 * 定义（运行时）弹出 / 关闭快速进入下一集提示 数据事件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/ScreenSave.ts
 */
/// <reference path="../Event.ts" />
/// <reference path="IScreenSaveMetas.ts" />
var Ev;
(function (Ev) {
    var ScreenSave = (function (_super) {
        __extends(ScreenSave, _super);
        /**
         * 构造函数。
         */
        function ScreenSave(metas) {
            _super.call(this, metas);
            this.type = metas.type;
        }
        /**
         * 获取类型。
         */
        ScreenSave.prototype.gT = function () {
            return 'screen.save';
        };
        return ScreenSave;
    }(Ev.Event));
    Ev.ScreenSave = ScreenSave;
})(Ev || (Ev = {}));
/**
 * 定义停止环境音乐动作标签组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Director/StopESM.ts
 */
/// <reference path="../../Action.ts" />
var Tag;
(function (Tag) {
    var StopESM = (function (_super) {
        __extends(StopESM, _super);
        function StopESM() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        StopESM.prototype.gN = function () {
            return 'StopESM';
        };
        /**
         * 执行。
         */
        StopESM.prototype.p = function (runtime) {
            runtime.gS().d('_e');
            return runtime.gD().playMusic(Core.IResource.Type.ESM);
        };
        return StopESM;
    }(Tag.Action));
    Tag.StopESM = StopESM;
})(Tag || (Tag = {}));
/**
 * 定义停止音效动作标签组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Director/StopSE.ts
 */
/// <reference path="../../Action.ts" />
var Tag;
(function (Tag) {
    var StopSE = (function (_super) {
        __extends(StopSE, _super);
        function StopSE() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        StopSE.prototype.gN = function () {
            return 'StopSE';
        };
        /**
         * 执行。
         */
        StopSE.prototype.p = function (runtime) {
            runtime.gS().d('_e');
            return runtime.gD().playSE();
        };
        return StopSE;
    }(Tag.Action));
    Tag.StopSE = StopSE;
})(Tag || (Tag = {}));
/**
 * 定义设置音量动作标签组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Director/VolumeSet.ts
 */
/// <reference path="../../Action.ts" />
var Tag;
(function (Tag) {
    var VolumeSet = (function (_super) {
        __extends(VolumeSet, _super);
        /**
         * 构造函数。
         */
        function VolumeSet(params, content, children, lineNo) {
            _super.call(this, params, content, children, lineNo);
            var type = Core.IResource.Type;
            switch (params[0]) {
                case '音效':
                    this._mt = type.SE;
                    break;
                case '环境':
                    this._mt = type.ESM;
                    break;
                case '音乐':
                case undefined:
                    this._mt = type.BGM;
                    break;
            }
        }
        /**
         * 获取标签名称。
         */
        VolumeSet.prototype.gN = function () {
            return 'VolumeSet';
        };
        /**
         * 执行。
         */
        VolumeSet.prototype.p = function (runtime) {
            return runtime.gD().volumeSet(this._mt, 0.01 * parseInt(this._p[1], 10) || 1);
        };
        return VolumeSet;
    }(Tag.Action));
    Tag.VolumeSet = VolumeSet;
})(Tag || (Tag = {}));
/**
 * 定义全屏文本动作标签组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Text/FullWords.ts
 */
/// <reference path="../../Action.ts" />
var Tag;
(function (Tag) {
    var FullWords = (function (_super) {
        __extends(FullWords, _super);
        /**
         * 构造函数。
         */
        function FullWords(params, content, children, lineNo) {
            _super.call(this, params, content, children, lineNo);
            this._a = params[0] == '开' ? true : false;
        }
        /**
         * 获取标签名称。
         */
        FullWords.prototype.gN = function () {
            return 'FullWords';
        };
        /**
         * 执行。
         */
        FullWords.prototype.p = function (runtime) {
            var _this = this;
            var states = runtime.gS(), kdir = '_f', dir = states.g(kdir);
            if ((this._a && dir) || (!this._a && !dir))
                return runtime;
            this._a ? states.s(kdir, true) : states.d('_f');
            return Promise.resolve(_super.prototype.p.call(this, runtime)).then(function () {
                return runtime.gD().fullWords(_this._a);
            });
        };
        return FullWords;
    }(Tag.Action));
    Tag.FullWords = FullWords;
})(Tag || (Tag = {}));
/**
 * 定义清除全屏文本动作标签组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Text/FullClean.ts
 */
/// <reference path="../../Action.ts" />
var Tag;
(function (Tag) {
    var FullClean = (function (_super) {
        __extends(FullClean, _super);
        function FullClean() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        FullClean.prototype.gN = function () {
            return 'FullClean';
        };
        /**
         * 执行。
         */
        FullClean.prototype.p = function (runtime) {
            var states = runtime.gS(), kdir = '_f', dir = states.g(kdir);
            if (!dir)
                return runtime;
            return Promise.resolve(_super.prototype.p.call(this, runtime)).then(function () {
                return runtime.gD().fullClean();
            });
        };
        return FullClean;
    }(Tag.Action));
    Tag.FullClean = FullClean;
})(Tag || (Tag = {}));
/**
 * 定义隐藏全屏文本动作标签组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Text/FullHide.ts
 */
/// <reference path="../../Action.ts" />
var Tag;
(function (Tag) {
    var FullHide = (function (_super) {
        __extends(FullHide, _super);
        function FullHide() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        FullHide.prototype.gN = function () {
            return 'FullHide';
        };
        /**
         * 执行。
         */
        FullHide.prototype.p = function (runtime) {
            var states = runtime.gS(), kdir = '_f', dir = states.g(kdir);
            if (!dir)
                return runtime;
            return Promise.resolve(_super.prototype.p.call(this, runtime)).then(function () {
                return runtime.gD().fullHide();
            });
        };
        return FullHide;
    }(Tag.Action));
    Tag.FullHide = FullHide;
})(Tag || (Tag = {}));
/**
 * 定义（运行时）解锁数据事件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/PayUnlock.ts
 */
/// <reference path="Pay.ts" />
var Ev;
(function (Ev) {
    var PayUnlock = (function (_super) {
        __extends(PayUnlock, _super);
        function PayUnlock() {
            _super.apply(this, arguments);
        }
        /**
         * 获取类型。
         */
        PayUnlock.prototype.gT = function () {
            return 'pay.unlock';
        };
        return PayUnlock;
    }(Ev.Pay));
    Ev.PayUnlock = PayUnlock;
})(Ev || (Ev = {}));
/**
 * 定义购买数据动作标签组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Logic/Unlock.ts
 */
/// <reference path="../../Idable.ts" />
/// <reference path="../../../Ev/_Runtime/PayUnlock.ts" />
var Tag;
(function (Tag) {
    var Unlock = (function (_super) {
        __extends(Unlock, _super);
        function Unlock() {
            _super.apply(this, arguments);
        }
        /**
         * 获取标签名称。
         */
        Unlock.prototype.gN = function () {
            return 'Unlock';
        };
        /**
         * 执行。
         */
        Unlock.prototype.p = function (runtime) {
            var _this = this;
            return Promise.resolve(_super.prototype.p.call(this, runtime))
                .then(function () {
                var amount = parseInt(_this._p[0], 10) || 0, states = runtime.gS(), kal = '.al', autoload = states.g(kal), depth = states.g('$d'), id = _this.gI(), yes = function () { return states.s('$v' + depth, true).s('$t' + depth, false); }, no = function () { return states.s('$v' + depth, false).s('$t' + depth, false); };
                if (states.qp(id, amount)) {
                    yes();
                    return runtime;
                }
                else {
                    if (autoload) {
                        states.d(kal);
                        no();
                        return runtime;
                    }
                    return new Promise(function (resolve) {
                        var suc = function () {
                            states.ep(id, amount);
                            yes();
                            resolve(runtime);
                        }, fail = function () {
                            no();
                            resolve(runtime);
                        };
                        runtime.a(_this);
                        states.e('pay', false, function () {
                            runtime.dispatchEvent(new Ev.PayUnlock({
                                target: states,
                                amount: amount,
                                id: id,
                                suc: suc,
                                fail: fail
                            }));
                        });
                    });
                }
            });
        };
        return Unlock;
    }(Tag.Idable));
    Tag.Unlock = Unlock;
})(Tag || (Tag = {}));
/**
 * 打包所有已定义地标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_pack.ts
 */
/// <reference path="_Definition/_Char/DefChar.ts" />
/// <reference path="_Definition/DefBGM.ts" />
/// <reference path="_Definition/DefCG.ts" />
/// <reference path="_Definition/DefSE.ts" />
/// <reference path="_Definition/_Room/DefRoom.ts" />
/// <reference path="_Definition/_Map/DefMap.ts" />
/// <reference path="_Structure/Auto.ts" />
/// <reference path="_Definition/Player.ts" />
/// <reference path="_Structure/Theme.ts" />
/// <reference path="_Structure/Resources.ts" />
/// <reference path="_Structure/_Scene/Scene.ts" />
/// <reference path="_Structure/Root.ts" />
/// <reference path="_Action/_Director/CharOn.ts" />
/// <reference path="_Action/_Director/CharOff.ts" />
/// <reference path="_Action/_Director/CharSet.ts" />
/// <reference path="_Action/_Director/CharPose.ts" />
/// <reference path="_Action/_Text/Monolog.ts" />
/// <reference path="_Action/_Text/Speak.ts" />
/// <reference path="_Action/_Text/VoiceOver.ts" />
/// <reference path="_Action/_Logic/Save.ts" />
/// <reference path="_Action/_Flow/End.ts" />
/// <reference path="_Action/_Flow/Fail.ts" />
/// <reference path="_Action/_Flow/Stars.ts" />
/// <reference path="_Action/_Director/PlayBGM.ts" />
/// <reference path="_Action/_Director/HideCG.ts" />
/// <reference path="_Action/_Director/ShowCG.ts" />
/// <reference path="_Action/_Director/AsRoom.ts" />
/// <reference path="_Action/_Director/AsTime.ts" />
/// <reference path="_Action/_Flow/Enter.ts" />
/// <reference path="_Action/_Flow/Freeze.ts" />
/// <reference path="_Action/_Director/PlaySE.ts" />
/// <reference path="_Action/_Director/Weather.ts" />
/// <reference path="_Action/_Logic/Assert.ts" />
/// <reference path="_Action/_Logic/Assign.ts" />
/// <reference path="_Action/_Logic/Compare.ts" />
/// <reference path="_Action/_Logic/Increase.ts" />
/// <reference path="_Action/_Flow/LoopBreak.ts" />
/// <reference path="_Action/_Logic/And.ts" />
/// <reference path="_Action/_Logic/Or.ts" />
/// <reference path="_Action/_Logic/Otherwise.ts" />
/// <reference path="_Action/_Logic/Then.ts" />
/// <reference path="_Action/_Logic/When.ts" />
/// <reference path="_Action/_Logic/Loop.ts" />
/// <reference path="_Action/_Flow/Choose.ts" />
/// <reference path="_Action/_Text/Tip.ts" />
/// <reference path="_Action/_Logic/Maximum.ts" />
/// <reference path="_Action/_Director/CharMove.ts" />
/// <reference path="_Action/_Logic/WhenVar.ts" />
/// <reference path="_Action/_Director/StopBGM.ts" />
/// <reference path="_Action/_Flow/DefOptions.ts" />
/// <reference path="_Action/_Flow/AddOption.ts" />
/// <reference path="_Action/_Flow/DropOption.ts" />
/// <reference path="_Action/_Logic/Random.ts" />
/// <reference path="_Action/_Logic/IfTime.ts" />
/// <reference path="_Action/_Logic/Copy.ts" />
/// <reference path="_Action/_Logic/Add.ts" />
/// <reference path="_Action/_Logic/Subtract.ts" />
/// <reference path="_Structure/Status.ts" />
/// <reference path="_Action/_Logic/Product.ts" />
/// <reference path="_Action/_Logic/Define.ts" />
/// <reference path="_Action/_Logic/Collection.ts" />
/// <reference path="_Action/_Logic/CollPush.ts" />
/// <reference path="_Action/_Logic/CollPop.ts" />
/// <reference path="_State/Struct.ts" />
/// <reference path="_State/Field.ts" />
/// <reference path="_State/FieldType.ts" />
/// <reference path="_State/FieldLimit.ts" />
/// <reference path="_Structure/_Panel/Panel.ts" />
/// <reference path="_Structure/_Panel/CollPanel.ts" />
/// <reference path="_Structure/_Panel/CollSource.ts" />
/// <reference path="_Structure/_Panel/CollStruct.ts" />
/// <reference path="_Structure/_Panel/SimpPanel.ts" />
/// <reference path="_Structure/_Panel/SimpEle.ts" />
/// <reference path="_Structure/_Panel/EleName.ts" />
/// <reference path="_Structure/_Panel/EleType.ts" />
/// <reference path="_Action/_Director/Pause.ts" />
/// <reference path="_Action/_Director/CameraMove.ts" />
/// <reference path="_Action/_Director/CameraZoom.ts" />
/// <reference path="_Action/_Director/CameraReset.ts" />
/// <reference path="_Action/_Director/CameraSet.ts" />
/// <reference path="_Action/_Director/Curtains.ts" />
/// <reference path="_Action/_Director/CameraShake.ts" />
/// <reference path="_Action/_Director/ShowStatus.ts" />
/// <reference path="_Action/_Director/HideStatus.ts" />
/// <reference path="_Action/_Director/Expression.ts" />
/// <reference path="_Action/_Logic/Donate.ts" />
/// <reference path="../Ev/_Runtime/Fin.ts" />
/// <reference path="../Ev/_Runtime/Rank.ts" />
/// <reference path="../Ev/_Runtime/PayOption.ts" />
/// <reference path="../Ev/_Runtime/AutoLoad.ts" />
/// <reference path="../Ev/_Runtime/ScreenLoad.ts" />
/// <reference path="../Ev/_Runtime/ScreenSave.ts" />
/// <reference path="_Action/_Director/PlayESM.ts" />
/// <reference path="_Action/_Director/StopESM.ts" />
/// <reference path="_Action/_Director/StopSE.ts" />
/// <reference path="_Action/_Director/VolumeSet.ts" />
/// <reference path="_Action/_Text/FullWords.ts" />
/// <reference path="_Action/_Text/FullClean.ts" />
/// <reference path="_Action/_Text/FullHide.ts" />
/// <reference path="_Action/_Logic/Unlock.ts" />
/**
 * 定义（作品）运行时组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Runtime/Runtime.ts
 */
/// <reference path="Episode.ts" />
/// <reference path="States.ts" />
/// <reference path="_Director/DirectorFactory.ts" />
/// <reference path="../Ev/_Runtime/Begin.ts" />
/// <reference path="../Ev/_Runtime/Resume.ts" />
/// <reference path="../Ev/_Runtime/Load.ts" />
/// <reference path="../Ev/_Runtime/Query.ts" />
/// <reference path="../Ev/_Runtime/Scene.ts" />
/// <reference path="../Ev/_Runtime/Action.ts" />
/// <reference path="../Tag/_pack.ts" />
var Runtime;
(function (Runtime_1) {
    var Util = __Bigine_Util;
    var Runtime = (function () {
        /**
         * 构造函数。
         */
        function Runtime(ep) {
            var _this = this;
            this._a = {};
            this._e = new Runtime_1.Episode(ep, this);
            this._l = Util.ConsoleLogger.singleton();
            this._s = new Runtime_1.States(this);
            this._d = Runtime_1.DirectorFactory.c(this);
            this._fr =
                this._fl =
                    this._fh = false;
            this._fp = this._d.gD();
            this._fv = 1;
            this._fa = this._e.gA();
            this._d.a(this._fa);
            this._fb = true;
            this._t = Promise.resolve(this);
            this._al = [undefined, undefined, undefined];
            this.addEventListener('loading', function () {
                _this._fl = true;
                if (_this._fp) {
                    _this._d.Load(true, _this._e.gL());
                }
            });
            this.addEventListener('ready', function () {
                _this._d.t(_this._e.gT(), _this._e.gC())
                    .s(ep.s())
                    .p(ep.p());
                _this._fr = true;
                _this._d.Load(false);
                _this._s.l().then(function () {
                    var valid = false;
                    if (_this._al[0] && _this._al[2] == 'pay') {
                        var pay = _this._s.q('pay');
                        if (pay && pay[1]['_a'] == _this._al[0]) {
                            _this._al[1] = pay[1];
                            valid = true;
                        }
                    }
                    if (_this._al[0] && _this._al[2] == 'manual') {
                        var manual = _this._s.q('auto', Core.IStates.Save.Series);
                        if (manual && _this._al[0] == manual[0] && manual[1]['data']) {
                            _this._al[1] = manual[1]['data'];
                            valid = true;
                        }
                    }
                    _this._fp = false;
                    _this.dispatchEvent(new Ev.AutoLoad({
                        target: _this._s,
                        valid: valid
                    }));
                    if (!valid)
                        _this._al = [undefined, undefined, undefined];
                }).catch(function () {
                    _this._al = [undefined, undefined, undefined];
                    _this.dispatchEvent(new Ev.AutoLoad({
                        target: _this._s,
                        valid: false
                    }));
                });
                // 在网页端，在此 this._fp === false，调试
                if (_this._fp) {
                    _this._fp = false;
                    _this.play();
                }
            });
            this.addEventListener('begin', function () {
                _this._fb = true;
                _this._fh = false;
                _this._s.d(' ');
                _this.t(function () { return _this._e.p(Core.ISceneTag.Type.Begin, _this); });
            });
            this.addEventListener('resume', function () {
                _this._fb = true;
            });
            this.addEventListener('end', function () {
                _this._fb =
                    _this._fp = false;
            });
        }
        /**
         * 新增事件监听。
         */
        Runtime.prototype.addEventListener = function (type, listener) {
            this._a[type] = this._a[type] || [];
            if (!Util.some(this._a[type], function (reged) { return reged == listener; }))
                this._a[type].push(listener);
            return this;
        };
        /**
         * 取消事件监听。
         */
        Runtime.prototype.removeEventListener = function (type, listener) {
            var _this = this;
            if (!(type in this._a))
                return this;
            Util.some(this._a[type], function (reged, index) {
                if (reged != listener)
                    return false;
                _this._a[type].splice(index, 1);
                return true;
            });
            return this;
        };
        /**
         * 发生事件。
         */
        Runtime.prototype.dispatchEvent = function (event) {
            var type = event.gT();
            this._l.d('[event]', event);
            if (!(type in this._a))
                return this;
            Util.each(this._a[type], function (listener) {
                listener(event);
            });
            return this;
        };
        /**
         * 获取作品组件。
         */
        Runtime.prototype.gE = function () {
            return this._e;
        };
        /**
         * 获取日志组件。
         */
        Runtime.prototype.gL = function () {
            return this._l;
        };
        /**
         * 获取数据状态组件。
         */
        Runtime.prototype.gS = function () {
            return this._s;
        };
        /**
         * 获取场效调度器组件。
         */
        Runtime.prototype.gD = function () {
            return this._d;
        };
        /**
         * 点击开始播放、重新播放调用。
         */
        Runtime.prototype.play = function () {
            if (this._al[0] && this._al[1]) {
                this._d.sl(this._al[0], true);
                return this;
            }
            if (this._fp)
                return this;
            this._fp = true;
            this._fb = false;
            if (!this._fr)
                return this;
            this._s.i({});
            this._d.playMusic(Core.IResource.Type.BGM);
            this._d.playMusic(Core.IResource.Type.ESM);
            this._d.playSE();
            this._d.Load(false);
            this._d.OP(!this._e.gA(), this._n, this._c);
            return this;
        };
        /**
         * 重新播放。
         */
        Runtime.prototype.replay = function () {
            return this.play();
        };
        /**
         * 销毁。
         */
        Runtime.prototype.destroy = function () {
            var _this = this;
            return new Promise(function (resolve) {
                _this._fh = true; // 中止现有时序流
                _this._d.d();
                _this.t(function () {
                    resolve(_this);
                    return _this;
                });
            });
        };
        /**
         * DOM 定位修正。
         */
        Runtime.prototype.fix = function () {
            this._d.f();
        };
        /**
         * 设置或获取自动播放设置。
         */
        Runtime.prototype.auto = function (auto) {
            if (this._fb && undefined !== auto)
                this._fa = this._d.a(!!auto);
            return this._fa;
        };
        /**
         * 设置或获取音量。
         */
        Runtime.prototype.volume = function (volume) {
            if (undefined !== volume)
                this._d.v(this._fv = Math.min(1, Math.max(0, parseFloat(volume))));
            return this._fv;
        };
        /**
         * 是否正在播放。
         */
        Runtime.prototype.isPlaying = function () {
            return this._fp;
        };
        /**
         * 是否准备就绪标识。
         */
        Runtime.prototype.isReady = function () {
            return this._fr;
        };
        /**
         * 设置作品标题。
         */
        Runtime.prototype.title = function (title) {
            this._n = title;
            return this;
        };
        /**
         * 获取作品标题。
         */
        Runtime.prototype.gTitle = function () {
            return this._n;
        };
        /**
         * 设置作者/logo。
         */
        Runtime.prototype.author = function (title) {
            this._c = title;
            return this;
        };
        /**
         * 设置跨域标记。
         */
        Runtime.prototype.domain = function (text) {
            Bigine.domain = text || '';
            return this;
        };
        /**
         * 设置玩家昵称。
         */
        Runtime.prototype.user = function (nickname) {
            this._nn = nickname;
            return this;
        };
        /**
         * 获取玩家昵称
         */
        Runtime.prototype.nickname = function () {
            return this._nn || '您';
        };
        /**
         * 获取剧情付费信息
         */
        Runtime.prototype.plots = function (data) {
            this._s.lp(data);
            return this;
        };
        /**
         * 自动读档
         */
        Runtime.prototype.autoLoad = function (id, type) {
            this._al[0] = id;
            this._al[2] = type;
            return this;
        };
        /**
         * 播报当前事件。
         */
        Runtime.prototype.s = function (scene, title, actions) {
            this._s.s('_s', scene.gI())
                .d('_a');
            this.dispatchEvent(new Ev.Scene({
                target: scene,
                title: title,
                actions: actions
            }));
            return this;
        };
        /**
         * 播报当前关键帧。
         */
        Runtime.prototype.a = function (action) {
            this._s.s('_a', action.gI())
                .p();
            this.dispatchEvent(new Ev.Action({
                target: action
            }));
            return this;
        };
        /**
         * 是否中止播放。
         */
        Runtime.prototype.gH = function () {
            return this._fh;
        };
        /**
         * 声明时序流。
         */
        Runtime.prototype.t = function (flow) {
            var _this = this;
            this._t = this._t.then(flow)['catch'](E.ignoreHalt)['catch'](function (reason) {
                _this._l.e(reason);
                throw reason;
            }).then(function () { return _this; });
            return this;
        };
        /**
         * 读档继续。
         */
        Runtime.prototype.l = function (id, autoload) {
            var _this = this;
            this._fh = true; // 中止现有时序流
            var load = function (data) {
                var fresh = !data || {} == data, episode = _this._e, states = _this._s, ks = '_s', ktn = '_rt', kcn = '_rc', kco = '$rc', kdc = '_c', kal = '.al', krc = '.c', pos = Core.IDirector.Position, tn, cn, enter;
                _this._d.reset().then(function () {
                    if (!fresh)
                        states.i(data);
                    if (fresh || !states.g(ks) || states.g(' ')) {
                        _this._fh = false;
                        return _this.dispatchEvent(new Ev.Begin({
                            target: episode
                        }));
                    }
                    states.m('_a', '.a') // 识别重建用状态数据
                        .m(ks, '.s')
                        .m(kdc, krc)
                        .m(kdc + pos.LLeft, krc + pos.LLeft)
                        .m(kdc + pos.Left, krc + pos.Left)
                        .m(kdc + pos.CLeft, krc + pos.CLeft)
                        .m(kdc + pos.Center, krc + pos.Center)
                        .m(kdc + pos.CRight, krc + pos.CRight)
                        .m(kdc + pos.Right, krc + pos.Right)
                        .m(kdc + pos.RRight, krc + pos.RRight);
                    if (autoload)
                        states.s(kal, true);
                    _this._d.h();
                    _this.t(function () {
                        _this._fh = false;
                        tn = states.g(ktn);
                        cn = states.g(kcn);
                        _this.dispatchEvent(new Ev.Resume({
                            target: episode
                        }));
                        if (tn || cn) {
                            if (cn) {
                                if (tn) {
                                    states.s(kco, episode.q(cn, Core.IEpisode.Entity.Room));
                                }
                                else {
                                    tn = cn;
                                    states.d(kcn);
                                }
                            }
                            enter = new Tag.Enter([tn || cn], '', [], -1);
                            enter.b(episode);
                            return enter.p(_this)['catch'](E.ignoreHalt);
                        }
                        return episode.p(states.g('_p'), _this);
                    });
                });
            };
            if (autoload) {
                load(this._al[1]);
                this._al = [undefined, undefined, undefined];
            }
            else {
                this.dispatchEvent(new Ev.Load({
                    target: this._s,
                    callback: load,
                    id: id
                }));
            }
        };
        /**
         * 绑定视图。
         */
        Runtime.prototype.bind = function (viewport) {
            this._d.b(viewport);
            return this;
        };
        /**
         * 连载模式。
         */
        Runtime.prototype.series = function (value) {
            var series = Core.IRuntime.Series, fs;
            switch (value) {
                case 'f':
                    fs = series.First;
                    break;
                case 'l':
                    fs = series.Last;
                    break;
                default:
                    fs = series.Rest;
                    break;
            }
            this._d.e(fs);
            return this;
        };
        /**
         * 暂停播放。
         */
        Runtime.prototype.pause = function () {
            this._d.rp();
            return this;
        };
        /**
         * 恢复播放。
         */
        Runtime.prototype.resume = function () {
            this._d.rr();
            return this;
        };
        /**
         * 停止播放。
         */
        Runtime.prototype.stop = function () {
            var _this = this;
            this._fh = true;
            this._d.reset().then(function () {
                _this._s.i({});
                _this._d.h();
            });
            return this;
        };
        return Runtime;
    }());
    Runtime_1.Runtime = Runtime;
})(Runtime || (Runtime = {}));
/**
 * 定义词法标签行组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Lex/TagLine.ts
 */
/// <reference path="../Tag/_pack.ts" />
var Lex;
(function (Lex) {
    var Util = __Bigine_Util;
    var TagLine = (function () {
        /**
         * 构造函数。
         */
        function TagLine(source, lineNo) {
            if (!lineNo) {
                this._i = -1;
                this._t = ['ROOT', ''];
                this._c = [];
                this._l = [0, 0];
            }
            else {
                var tokens = TagLine.GRAMMAR.exec(source);
                if (!tokens)
                    throw new E(E.LEX_ILLEGAL_SOURCE, lineNo);
                this._i = tokens[1].length;
                this._t = [tokens[2], tokens[4] || tokens[6] || '', tokens[3] || tokens[5] || ''];
                this._c = [];
                this._l = [lineNo, lineNo];
            }
        }
        /**
         * 获取缩进深度。
         */
        TagLine.prototype.gI = function () {
            return this._i;
        };
        /**
         * 获取令牌。
         */
        TagLine.prototype.gT = function () {
            return this._t;
        };
        /**
         * 获取子标签。
         */
        TagLine.prototype.gC = function () {
            return this._c;
        };
        /**
         * 获取行号。
         */
        TagLine.prototype.gL = function () {
            return this._l;
        };
        /**
         * 添加子标签。
         */
        TagLine.prototype.a = function (child) {
            this._c.push(child);
            return this;
        };
        /**
         * 转化为标签。
         */
        TagLine.prototype.t = function (parent) {
            if (parent === void 0) { parent = ''; }
            var name = this._t[0], params = this._t[1] ?
                this._t[1].split('，') :
                [], content = this._t[2], children = [], constraints, proto, tag;
            if (!(name in Tag.C) || 'UNKNOWN' == parent) {
                params.unshift(name);
                name = 'UNKNOWN';
            }
            else if (parent) {
                constraints = Tag.S[Tag.I[Tag.C[parent]]];
                if (4 > constraints.length || 53 in constraints[3] || !('-1' in constraints[3] || Tag.I[Tag.C[name]] in constraints[3])) {
                    params.unshift(name);
                    name = 'UNKNOWN';
                }
            }
            Util.each(this._c, function (obj) {
                children.push(obj.t(name));
            });
            if (-1 == this._i)
                return new Tag.Root(children);
            proto = eval('Tag.' + Tag.C[name]);
            if (params.length > 1 && parent.indexOf('选择') > -1)
                proto = eval('Tag.Option');
            tag = new proto(params, content, children, this._l[0]);
            if (tag instanceof Tag.Idable || 'Scene' == tag.gN())
                tag.i(u());
            if (tag instanceof Tag.Option)
                tag.i(u());
            if (tag instanceof Tag.AddOption && params.length > 2)
                tag.i(u());
            return tag;
        };
        /**
         * 语法。
         */
        TagLine.GRAMMAR = /^(\t*)([^\s（：]+)(?:|：(.*)|（(.*)）：(.*)|（(.*)）)$/;
        return TagLine;
    }());
    Lex.TagLine = TagLine;
    /**
     * 创建 UUID 。
     */
    function u() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, u_);
    }
    /**
     * UUID 单字符处理。
     */
    function u_(symbol) {
        var seed = 0 | 16 * Math.random();
        if ('y' == symbol)
            seed = 8 | 3 & seed;
        return seed.toString(16);
    }
})(Lex || (Lex = {}));
/**
 * 定义解析器组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Lex/Parser.ts
 */
/// <reference path="TagLine.ts" />
var Lex;
(function (Lex) {
    var Util = __Bigine_Util;
    var Parser;
    (function (Parser) {
        function c(source) {
            var lines = source instanceof Array ?
                source :
                source.split(/\r?\n/), hierarchy = [new Lex.TagLine()], depth = 0, blank = /^\s*$/, depth2, tag;
            Util.each(lines, function (line, index) {
                if (blank.test(line))
                    return;
                index++;
                tag = new Lex.TagLine(line, index);
                depth2 = tag.gI();
                if (depth2 > 1 + depth) {
                    throw new E(E.LEX_UNEXPECTED_INDENTATION, index);
                }
                else if (depth2 != depth) {
                    if (depth2 < depth)
                        hierarchy.splice(1 + depth2);
                    depth = depth2;
                }
                hierarchy[1 + depth] = tag;
                hierarchy[depth].a(tag);
            });
            return hierarchy[0].t();
        }
        Parser.c = c;
    })(Parser = Lex.Parser || (Lex.Parser = {}));
})(Lex || (Lex = {}));
/**
 * 定义引擎入口程序。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Bigine.ts
 */
/// <reference path="Runtime/Runtime.ts" />
/// <reference path="Lex/Parser.ts" />
function Bigine(code) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if ('string' == typeof code)
        return Lex.Parser.c(code);
    if (code instanceof Tag.Root)
        return new Runtime.Runtime(code);
    if (code instanceof Array) {
        if ('string' == typeof code[0])
            return Lex.Parser.c(code);
        return new Runtime.Runtime(new Tag.Root(code));
    }
    if (!(code in Tag.S))
        throw new E(E.SCHEMA_TAG_NOT_DECLARED);
    var proto = eval('Tag.' + Tag.S[code][0]), content = '', params = [], children = [], id = '', arg = args.shift(), type = typeof arg, tag;
    if ('string' == type || 'number' == type) {
        content += arg;
        arg = args.shift();
    }
    if (arg instanceof Array) {
        type = typeof arg[0];
        if ('string' == type || 'number' == type) {
            params = arg;
            arg = args.shift();
        }
    }
    if (arg instanceof Array) {
        children = arg;
        arg = args.shift();
    }
    if ('string' == typeof arg)
        id = arg;
    tag = new proto(params, content, children, 0);
    if (id && ('i' in tag))
        tag.i(id);
    return tag;
}
var Bigine;
(function (Bigine) {
    Bigine.version = '0.25.1';
    Bigine.domain = '';
    //export var offline: boolean = true;
    Bigine.offline = typeof window != 'undefined' ? (window['bigine'] ? window['bigine']['mode'] == 'offline' : false) : false;
})(Bigine || (Bigine = {}));
module.exports = Bigine;
//# sourceMappingURL=bigine.js.map
