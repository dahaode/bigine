var __Bigine_Util = require("bigine.util");
var __Bigine_C2D = require("bigine.c2d");
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
    })();
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
 * @copyright © 2015 Dahao.de
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
             * 左。
             */
            Position[Position["Left"] = 1] = "Left";
            /**
             * 左中。
             */
            Position[Position["CLeft"] = 2] = "CLeft";
            /**
             * 中。
             */
            Position[Position["Center"] = 3] = "Center";
            /**
             * 右中。
             */
            Position[Position["CRight"] = 4] = "CRight";
            /**
             * 右。
             */
            Position[Position["Right"] = 5] = "Right";
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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
    })(Ev.Event);
    Ev.Ready = Ready;
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
    })(Ev.Event);
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
    })(Ev.Event);
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
            if (types.Raw == type) {
                this._l = uri;
                if ('//s.dahao.de/theme/' != this._l.substr(0, 19))
                    throw new E(E.RES_INVALID_URI);
                ext = this._l.substr(-4);
                if (ie9 && ('.jpg' == ext || '.png' == ext))
                    this._l = '//dahao.de/.9' + this._l.substr(18);
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
                this._l = '//a' + (1 + parseInt(uri[0], 16) % 8) + '.dahao.de/' + uri + '/' + filename;
                if (ie9 && '.mp3' != this._l.substr(-4))
                    this._l = '//dahao.de/.9' + this._l.substr(13);
            }
            this._l = env.Protocol + this._l;
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
                    var url = _this._l + '?bigine', xhr, img;
                    if ('.mp3' == _this._l.substr(-4)) {
                        _this._l = url;
                        return resolve(url);
                    }
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
    })();
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
            ep.r(this);
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
            if (!(id in this._e[type]))
                throw new E(E.EP_ENTITY_NOT_FOUND, lineNo || 0);
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
        return Episode;
    })();
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
    })(Ev.Event);
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
    })(Ev.Event);
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
    })(Ev.Event);
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
            this._s = {};
            this._l = false;
        }
        /**
         * 设置值。
         */
        States.prototype.s = function (key, value) {
            this._r.gL().d('[state]', key, '=', '$' == key[0] ? value : JSON.stringify(value));
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
        States.prototype.e = function (manual) {
            var _this = this;
            if (!this._p)
                return {};
            var save = function (id) {
                _this._s[manual ? '1' : 'auto'] = [id, +new Date()];
            };
            this._r.dispatchEvent(new Ev.Save({
                target: this,
                manual: manual,
                data: this._p,
                callback: save
            }));
            return this._p;
        };
        /**
         * 导入数据。
         */
        States.prototype.i = function (data) {
            this._d = data;
            this._p = undefined;
            return this;
        };
        /**
         * 查询档位存档编号。
         */
        States.prototype.q = function (index) {
            return this._s[index];
        };
        /**
         * 加载存档信息。
         */
        States.prototype.l = function () {
            var _this = this;
            if (this._l)
                return;
            this._l = true;
            var query = function (slots) {
                _this._s = slots;
            };
            this._r.dispatchEvent(new Ev.Query({
                target: this,
                callback: query
            }));
        };
        return States;
    })();
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
    })();
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
    })(Ev.Event);
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
        Director.prototype.stars = function (rank) {
            return this._p;
        };
        /**
         * 播放背景音乐。
         */
        Director.prototype.playBGM = function (resource) {
            return this._p;
        };
        /**
         * 播放音效。
         */
        Director.prototype.playSE = function (resource) {
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
        Director.prototype.asRoom = function (resource, time) {
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
         * 显示存档读档菜单。
         */
        Director.prototype.qs = function (load, opacity) {
            if (load === void 0) { load = true; }
            if (opacity === void 0) { opacity = 1; }
            this._o = load;
            return this._p;
        };
        /**
         * 隐藏存档读档菜单。
         */
        Director.prototype.qh = function (succeed) {
            return this._p;
        };
        /**
         * 绑定视图。
         */
        Director.prototype.b = function (viewport) {
            return this;
        };
        return Director;
    })();
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
    })(Runtime.Director);
    Runtime.NodeDirector = NodeDirector;
})(Runtime || (Runtime = {}));
/**
 * 声明（运行时）读档继续事件元信息接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/IResumeMetas.ts
 */
/// <reference path="../../Core/_Runtime/IEpisode.ts" />
/**
 * 定义（运行时）读档继续事件。
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
    })(Ev.Event);
    Ev.Resume = Resume;
})(Ev || (Ev = {}));
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
        Sprite.prototype.v = function (immediately) {
            if (immediately === void 0) { immediately = false; }
            if (immediately)
                this.o(1);
            if (this._o)
                return Promise.resolve(this);
            return this.p(new G.FadeIn(500));
        };
        /**
         * 隐藏。
         */
        Sprite.prototype.h = function (immediately) {
            if (immediately === void 0) { immediately = false; }
            if (immediately)
                this.o(0);
            if (!this._o)
                return Promise.resolve(this);
            return this.p(new G.FadeOut(500));
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
        return Sprite;
    })(G.Sprite);
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
    })(Sprite.Sprite);
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
                .a(new G.Text(_director, _director['size'], _director['h'], this.$a(_director['align']))
                .tc(_director['color'])
                .a(new G.TextPhrase('作品'))).a(new G.Text(_title, _title['size'], _title['h'], this.$a(_title['align']))
                .tc(_title['color'])
                .a(this._x = new G.TextPhrase()));
        }
        /**
         * 设置名称。
         */
        Author.prototype.u = function (title) {
            this._x.t(title);
            return this.o(1);
        };
        return Author;
    })(Sprite.Sprite);
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
    })(Ev.Event);
    Ev.StartNew = StartNew;
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
    })(Ev.Event);
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
            var w = 1280, h = 720, raw = Core.IResource.Type.Raw, rr = Resource.Resource, url = '//s.dahao.de/theme/' + id + '/', _new = theme['new'], _load = theme['load'], _title = theme['title'], $new = false, $load = false;
            _super.call(this, 0, 0, w, h);
            this._rr = [
                rr.g(url + theme['image'], raw),
                rr.g(url + _new['image'], raw),
                rr.g(url + _new['hover'], raw),
                rr.g(url + _load['image'], raw),
                rr.g(url + _load['hover'], raw)
            ];
            this.o(0)
                .a(new G.Image(this._rr[0].o(), 0, 0, w, h))
                .a(new G.Button(_new)
                .b(function () {
                if ($new)
                    return;
                $new = true;
                _this.dispatchEvent(new Ev.StartNew({ target: _this }));
                _this.p(new G.Delay(100)).then(function () {
                    $new = false;
                });
            }, new G.Image(this._rr[2].o(), _new, true), new G.Image(this._rr[1].o(), _new, true))).a(new G.Button(_load)
                .b(function () {
                if ($load)
                    return;
                $load = true;
                _this.dispatchEvent(new Ev.StartLoad({ target: _this }));
                _this.p(new G.Delay(100)).then(function () {
                    $load = false;
                });
            }, new G.Image(this._rr[4].o(), _load, true), new G.Image(this._rr[3].o(), _load, true))).a(new G.Text(_title, _title['size'], _title['h'], this.$a(_title['align']))
                .tc(_title['color'])
                .a(this._x = new G.TextPhrase()));
        }
        /**
         * 设置名称。
         */
        Start.prototype.u = function (title) {
            this._x.t(title);
            return this.o(1);
        };
        return Start;
    })(Sprite.Sprite);
    Sprite.Start = Start;
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
/**
 * 定义基于 HTML Canvas 的（运行时）场效调度器组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Runtime/_Director/CanvasDirector.ts
 */
/// <reference path="Director.ts" />
/// <reference path="../../Ev/_Runtime/Resume.ts" />
/// <reference path="../../Ev/_Runtime/Save.ts" />
/// <reference path="../../Sprite/_pack.ts" />
/**
 * * b - 背景
 * * M - 地图
 * * c - 人物
 * * g - 特写
 *     * p - 图片
 * * s - 对白
 *     * a - 头像
 *     * n - 名称
 *     * w - 文本
 * * m - 独白
 *     * a - 头像
 *     * n - 名称
 *     * w - 文本
 * * v - 旁白
 *     * w - 文本
 * * t - 提醒
 *     * w - 文本
 * * D - 选择
 * * $. - 功能菜单按钮
 * * A - 作者
 *     * t - 作者名
 * * S - 开始菜单
 *     * t - 作品名
 * * $ - 功能菜单
 *     * m - 遮罩层
 *     * f - 功能层
 *     * s - 档位层
 *         * _ - 自动档
 *             * t - 时间
 *         * _. - 自动档禁止状态
 *         * 1 - 第一档
 *             * t - 时间
 *         * 1. - 第一档禁止状态
 * * C - 幕帘
 * * L - 加载进度条
 *     * e - 完成进度条
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
            var doc = document, els = doc.querySelectorAll('.bg-work'), canvas = doc.createElement('canvas'), raw = Core.IResource.Type.Raw, bounds = CanvasDirector.BOUNDS, assets = '//s.dahao.de/theme/_/';
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
                .a(new G.Sprite(bounds).i('g').o(0))
                .a(new G.Sprite(bounds).i('s').o(0))
                .a(new G.Sprite(bounds).i('m').o(0))
                .a(new G.Sprite(bounds).i('v').o(0))
                .a(new G.Sprite(bounds).i('t').o(0))
                .a(new G.Sprite(bounds).i('$').o(0))
                .a(this._x['c'] = new Sprite.Curtain())
                .a(new G.Sprite(0, bounds.h - 3, bounds.w, 3).a(new G.Color(0, 0, bounds.w, 3, '#0cf').i('e')).i('L').o(0));
            this.f();
            this._s = {
                b: new Audio(),
                e: new Audio()
            };
            this._s['b'].autoplay = true;
            this._s['b'].loop = true;
            this._s['e'].autoplay = true;
            this._s['e']['cd'] = -1;
            this._i = {
                o: Resource.Resource.g(assets + 'logo.png', raw),
                e: Resource.Resource.g(assets + 'thx.png', raw),
                s: Resource.Resource.g(assets + 'oops.mp3', raw),
                s3: Resource.Resource.g(assets + '3stars.png', raw),
                s2: Resource.Resource.g(assets + '2stars.png', raw),
                s1: Resource.Resource.g(assets + '1star.png', raw),
                f: Resource.Resource.g(assets + 'focus.mp3', raw),
                c: Resource.Resource.g(assets + 'click.mp3', raw)
            };
            this._f = {};
            this._e = [0, 0];
            this._l = function (event) {
                if (13 == event.keyCode && !_this._a && _this._t)
                    _this._t.h();
            };
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
         * 开始动画。
         */
        CanvasDirector.prototype.OP = function (start, title, author) {
            var _this = this;
            if (title) {
                this._x['s'].u(title);
            }
            return this.c([[this._i['o']]])
                .then(function () { return _this.reset(); })
                .then(function () {
                var gLogo = new G.Image(_this._i['o'].o(), CanvasDirector.BOUNDS), gEntry = _this._c.q('$.')[0];
                _this._c.z()
                    .a(gLogo, _this._x['c']);
                gEntry.o(0);
                return _this.lightOn()
                    .then(function () { return gLogo.p(new G.Delay(1000)); })
                    .then(function () { return _this.lightOff(); })
                    .then(function () {
                    _this._c.e(gLogo);
                    if (!author)
                        return;
                    var gAuthor = _this._x['a'].u(author);
                    return _this.lightOn()
                        .then(function () { return gAuthor.p(new G.Delay(1000)); })
                        .then(function () { return _this.lightOff(); })
                        .then(function () { return gAuthor.o(0); });
                }).then(function () { return _super.prototype.OP.call(_this, start, title, author); })
                    .then(function (runtime) {
                    gEntry.o(1);
                    if (!start)
                        return runtime;
                    _this._x['s'].o(1);
                    return _this.lightOn();
                });
            });
        };
        /**
         * 完结动画。
         */
        CanvasDirector.prototype.ED = function () {
            var _this = this;
            return this.c([[this._i['e']]])
                .then(function () {
                var gED = new G.Image(_this._i['e'].o(), CanvasDirector.BOUNDS);
                _this.playBGM();
                _this.playSE();
                return _this.lightOff()
                    .then(function () {
                    _this._c.a(gED, _this._x['c']);
                    _this._c.q('$.')[0].o(0);
                    _this._c.q('$')[0].o(0);
                    return _this.lightOn();
                }).then(function () { return gED.p(new G.Delay(2000)); })
                    .then(function () { return _this.lightOff(); })
                    .then(function () {
                    _this._c.e(gED);
                    return _super.prototype.ED.call(_this);
                });
            });
        };
        /**
         * 人物出场。
         */
        CanvasDirector.prototype.charOn = function (resource, position) {
            var _this = this;
            var states = this._r.gS(), gChars = this._c.q('c')[0], gCG = this._c.q('g')[0], kamount = '$c', gChar = this.$c(resource, position);
            states.s(kamount, 1 + (states.g(kamount) || 0));
            gChars.a(gChar.i(position));
            if (gCG.gO()) {
                gChar.o(1);
                return this._p;
            }
            gChars.o(1);
            return gChar.p(this._m = new G.FadeIn(500))
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
                return gChar.p(this._m = new G.FadeOut(500)).then(function () {
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
            var states = this._r.gS(), kamount = '$c', gChars = this._c.q('c')[0], gCG = this._c.q('g')[0], gChar = gChars.q(position)[0];
            if (gChar) {
                gChars.e(gChar);
            }
            else
                states.s(kamount, 1 + (states.g(kamount) || 0));
            gChar = this.$c(resource, position).o(1).i(position);
            gChars.a(gChar);
            if (!gCG.gO())
                gChars.o(1);
            return this._p;
        };
        /**
         * 人物移动。
         */
        CanvasDirector.prototype.charMove = function (from, to) {
            var _this = this;
            var gChars = this._c.q('c')[0], gChar = gChars.q(from)[0], pos = Core.IDirector.Position, x;
            if (!gChar)
                return this._p;
            switch (to) {
                case pos.Left:
                    x = 0;
                    break;
                case pos.CLeft:
                    x = 200;
                    break;
                case pos.Center:
                    x = 400;
                    break;
                case pos.CRight:
                    x = 600;
                    break;
                case pos.Right:
                    x = 800;
                    break;
            }
            return gChar.p(this._m = new G.Move(500, {
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
            var bounds = CanvasDirector.BOUNDS, pos = Core.IDirector.Position, w = 0 | bounds.h / 3 * 2, x;
            switch (position) {
                case pos.Left:
                    x = 0;
                    break;
                case pos.CLeft:
                    x = 200;
                    break;
                case pos.Center:
                    x = 400;
                    break;
                case pos.CRight:
                    x = 600;
                    break;
                case pos.Right:
                    x = 800;
                    break;
            }
            return new G.Image(resource.o(), x, 0, w, bounds.h)
                .i(position)
                .o(0);
        };
        /**
         * 某白。
         */
        CanvasDirector.prototype.words = function (words, theme, who, avatar) {
            var _this = this;
            var code = theme[0], gFrame = this._c.q(code)[0], gAvatar = gFrame.q('a')[0], gName = gFrame.q('n')[0], gWords = gFrame.q('w')[0];
            if (avatar && gAvatar)
                gAvatar.a(new G.Image(avatar.o(), gAvatar.gB(), true));
            if (who && gName)
                gName.a(new G.TextPhrase(who));
            this.$w(gWords.o(0), words, this._f[code]['h']);
            gFrame.o(1);
            return this.lightOn()
                .then(function () {
                var aType = _this._m = new G.Type(1), aWFC;
                if (_this._a)
                    return gWords.p(aType);
                _this._t = aWFC = new G.WaitForClick(function () {
                    aType.h();
                });
                return Promise.race([
                    gWords.p(aType).then(function () { return aWFC.h(); }),
                    gFrame.p(aWFC)
                ]);
            }).then(function () {
                if (_this._a)
                    return gWords.p(_this._h = _this._t = _this._m = new G.TypeDelay(9));
                return gFrame.p(_this._h = _this._t = _this._m = new G.WaitForClick());
            }).then(function () {
                gFrame.o(0);
                if (gAvatar)
                    gAvatar.c();
                if (gName)
                    gName.c();
                gWords.c();
                return _this._r;
            });
        };
        /**
         * 提示。
         */
        CanvasDirector.prototype.tip = function (words) {
            var _this = this;
            var gTip = this._c.q('t')[0], gWords = gTip.q('w')[0];
            this.$w(gWords, words, this._f['t']['h']);
            return this.lightOn()
                .then(function () { return gTip.p(_this._h = new G.FadeIn(250)
                .c(new G.WaitForClick())
                .c(new G.FadeOut(250))); }).then(function () {
                gWords.c();
                return _this._r;
            });
        };
        ;
        /**
         * 评分动画。
         */
        CanvasDirector.prototype.stars = function (rank) {
            var _this = this;
            var ranks = Core.IDirector.Stars, key = 's';
            switch (rank) {
                case ranks.Perfect:
                    key += '3';
                    break;
                case ranks.Awesome:
                    key += '2';
                    break;
                case ranks.OK:
                    key += '1';
                    break;
            }
            return this.c([[this._i[key]]])
                .then(function () {
                var gStars = new G.Image(_this._i[key].o(), CanvasDirector.BOUNDS);
                return _this.lightOff()
                    .then(function () {
                    _this._c.a(gStars, _this._x['c']);
                    return _this.lightOn();
                }).then(function () { return gStars.p(new G.Delay(2000)); })
                    .then(function () { return _this.lightOff(); })
                    .then(function () {
                    _this._c.e(gStars);
                    return _this._r;
                });
            });
        };
        /**
         * 播放背景音乐。
         */
        CanvasDirector.prototype.playBGM = function (resource) {
            var _this = this;
            var oops = this._i['s'].l(), url = resource ? resource.l() : oops, bgm = this._s['b'], volume = bgm.volume, change = function () {
                bgm.volume = volume;
                if (bgm.src != url)
                    bgm.src = url;
                return _super.prototype.playBGM.call(_this, resource);
            };
            if (!resource)
                bgm.play();
            if (bgm.src && bgm.src != oops)
                return new G.AudioFadeOut(1500).p(bgm).then(change);
            return change();
        };
        /**
         * 播放音效。
         */
        CanvasDirector.prototype.playSE = function (resource) {
            var _this = this;
            var url = (resource || this._i['s']).l(), se = this._s['e'], type = 'ended', resume = function () {
                se.removeEventListener(type, resume);
                _this._s['b'].play();
            };
            se.addEventListener(type, resume);
            se.src = url;
            if (!resource)
                this._s['e'].play();
            return _super.prototype.playSE.call(this, resource);
        };
        /**
         * 关闭特写。
         */
        CanvasDirector.prototype.hideCG = function () {
            var _this = this;
            return _super.prototype.hideCG.call(this).then(function (runtime) {
                var gCG = _this._c.q('g')[0], gChars = _this._c.q('c')[0], gImage = gCG.q('p')[0];
                return Promise.all([
                    gChars.p(new G.FadeIn(500)),
                    gCG.p(new G.FadeOut(500))
                ]).then(function () {
                    if (!_this._r.gS().g('$c'))
                        gChars.o(0);
                    gCG.e(gImage);
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
                var bounds = CanvasDirector.BOUNDS, gChars = _this._c.q('c')[0], gCG = _this._c.q('g')[0], gImage = new G.Image(resource.o(), bounds.w / 10, bounds.h / 10, bounds.w * 4 / 5, bounds.h * 4 / 5).i('p');
                gCG.a(gImage);
                return _this.lightOn()
                    .then(function () {
                    return Promise.all([
                        gChars.p(new G.FadeOut(500)),
                        gCG.p(new G.FadeIn(500))
                    ]).then(function () { return gCG.p(_this._h = new G.WaitForClick()); });
                }).then(function () { return runtime; });
            });
        };
        /**
         * 设置房间。
         */
        CanvasDirector.prototype.asRoom = function (resource, time) {
            var _this = this;
            if (time === void 0) { time = false; }
            return _super.prototype.asRoom.call(this, resource).then(function (runtime) {
                var gOld = _this._c.q('b')[0], gNew = new G.Image(resource.o(), CanvasDirector.BOUNDS).i('b')
                    .o(0);
                _this._c.a(gNew, 'M');
                if (!time || _this._x['c'].gO()) {
                    gNew.o(1);
                    _this._c.e(gOld);
                    return runtime;
                }
                return gNew.p(new G.FadeIn(500)).then(function () {
                    _this._c.e(gOld);
                    return runtime;
                });
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
            return Promise.all([
                this._i['cn'].o(),
                this._i['ch'].o()
            ]).then(function (images) {
                var w = images[0].width, h = images[0].height, m = 16, t = 0 | (CanvasDirector.BOUNDS.h - options.length * (h + m) + m) / 2, gChoose = _this._c.q('D')[0], gOptions = [], gOption;
                return new Promise(function (resolve, reject) {
                    var anime = new G.FadeIn(250), clicked = false;
                    _this._q = function () {
                        E.doHalt()['catch'](function (error) {
                            reject(error);
                        });
                    };
                    Util.each(options, function (option, index) {
                        gOption = new G.Button(0, t + index * (h + m), w, h)
                            .b(function () {
                            if (clicked)
                                return;
                            clicked = true;
                            _this.playSE(_this._i['c']);
                            anime.h();
                            option.p(_this._r);
                            resolve(gOptions);
                        }, new G.Image(_this._i['ch'].o()), new G.Image(_this._i['cn'].o()))
                            .addEventListener('$focus', function () {
                            _this.playSE(_this._i['f']);
                        }).a(new G.Text(0, 0, w, h, 32, h / 2 + 16, G.Text.Align.Center)
                            .ts(_this._f['c']['s'], _this._f['c']['s'], _this._f['c']['s'])
                            .a(new G.TextPhrase(option.gT(), _this._f['c']['c'])));
                        gOptions.push(gOption);
                        gChoose.a(gOption);
                    });
                    gChoose.o(0);
                    _this.lightOn()
                        .then(function () { return gChoose.p(anime); });
                }).then(function () {
                    return gChoose.p(new G.FadeOut(250))
                        .then(function () { return gChoose.c(); })
                        .then(function () { return _this._r; });
                });
            });
        };
        /**
         * 重置状态。
         */
        CanvasDirector.prototype.reset = function () {
            var _this = this;
            return _super.prototype.reset.call(this).then(function (runtime) {
                var gBack = _this._c.q('b')[0], gColor = new G.Color(CanvasDirector.BOUNDS, '#000');
                _this._c.a(gColor, gBack)
                    .e(gBack);
                gColor.i('b');
                _this._c.q('M')[0].c();
                _this._c.q('c')[0].c()
                    .o(0);
                _this._c.q('g')[0].c()
                    .o(0);
                _this._c.q('s')[0].o(0);
                _this._c.q('m')[0].o(0);
                _this._c.q('v')[0].o(0);
                _this._c.q('t')[0].o(0);
                _this._c.q('D')[0].o(0);
                return runtime;
            });
        };
        /**
         * （读档继续时）设置特写。
         */
        CanvasDirector.prototype.setCG = function (resource) {
            var _this = this;
            return _super.prototype.setCG.call(this, resource).then(function (runtime) {
                var bounds = CanvasDirector.BOUNDS;
                _this._c.q('g')[0].a(new G.Image(resource.o(), bounds.w / 10, bounds.h / 10, bounds.w * 4 / 5, bounds.h * 4 / 5).i('p'))
                    .o(1);
                return runtime;
            });
        };
        /**
         * 使用主题。
         */
        CanvasDirector.prototype.t = function (id, theme) {
            var _this = this;
            var url = '//s.dahao.de/theme/' + id + '/', chapter = theme['author'], section = chapter['director'], raw = Core.IResource.Type.Raw, bounds = CanvasDirector.BOUNDS, resources = [], gVoiceOver = this._c.q('v')[0], gMonolog = this._c.q('m')[0], gSpeak = this._c.q('s')[0], gTip = this._c.q('t')[0], gMenu = this._c.q('$')[0], gMenuWay = false, right = G.Text.Align.Right, gMenuEntry, gMenuMask, gMenuFeatures, gMenuSlots, gChoose;
            this._x['s'] = new Sprite.Start(id, theme['start'])
                .addEventListener('start.new', function (event) {
                _this.playSE(_this._i['c']);
                _this.lightOff().then(function () {
                    event.target.h(true);
                    _this._r.dispatchEvent(new Ev.Begin({ target: _this._r.gE() }));
                });
            }).addEventListener('start.load', function (event) {
                _this.playSE(_this._i['c']);
                _this.lightOff().then(function () {
                    event.target.h(true);
                    _this._r.dispatchEvent(new Ev.Resume({ target: _this._r.gE() }));
                });
            });
            resources.push(this._x['s'].l());
            this._c.a(this._x['s'], this._x['c']);
            this._c.a(this._x['a'] = new Sprite.Author(chapter), this._x['c']);
            // -------- voiceover --------
            chapter = theme['voiceover'];
            section = chapter['back'];
            resources.push([
                Resource.Resource.g(url + section['image'], raw) // 0
            ]);
            // 背景图
            gVoiceOver.a(new G.Image(resources[1][0].o(), section));
            section = chapter['text'];
            this._f['v'] = {
                h: section['color2']
            };
            // 文字区域
            gVoiceOver.a(new G.Text(section, 28, 32)
                .tc(section['color'])
                .ts(section['shadow'], section['shadow'], section['shadow'])
                .i('w'));
            // -------- monolog --------
            chapter = theme['monolog'];
            section = chapter['back'];
            resources.push([
                Resource.Resource.g(url + section['image'], raw) // 0
            ]);
            // 背景图
            gMonolog.a(new G.Image(resources[2][0].o(), section))
                .a(new G.Sprite(chapter['avatar'])
                .i('a'));
            section = chapter['name'];
            // 名字区域
            gMonolog.a(new G.Text(section, 42, 42)
                .tc(section['color'])
                .ts(section['shadow'], section['shadow'], section['shadow'])
                .i('n'));
            section = chapter['text'];
            this._f['m'] = {
                h: section['color2']
            };
            // 文字区域
            gMonolog.a(new G.Text(section, 28, 32)
                .tc(section['color'])
                .ts(section['shadow'], section['shadow'], section['shadow'])
                .i('w'));
            // -------- speak --------
            chapter = theme['speak'];
            section = chapter['back'];
            resources.push([
                Resource.Resource.g(url + section['image'], raw) // 0
            ]);
            // 背景图
            gSpeak.a(new G.Image(resources[3][0].o(), section))
                .a(new G.Sprite(chapter['avatar'])
                .i('a'));
            section = chapter['name'];
            // 名字区域
            gSpeak.a(new G.Text(section, 42)
                .tc(section['color'])
                .ts(section['shadow'], section['shadow'], section['shadow'])
                .i('n'));
            section = chapter['text'];
            this._f['s'] = {
                h: section['color2']
            };
            ;
            // 文字区域
            gSpeak.a(new G.Text(section, 28, 32)
                .tc(section['color'])
                .ts(section['shadow'], section['shadow'], section['shadow'])
                .i('w'));
            // -------- tip --------
            chapter = theme['tip'];
            section = chapter['back'];
            resources.push([
                Resource.Resource.g(url + section['image'], raw) // 0
            ]);
            // 背景图
            gTip.a(new G.Image(resources[4][0].o(), section));
            section = chapter['text'];
            this._f['t'] = {
                h: section['color2']
            };
            ;
            // 文字区域
            gTip.a(new G.Text(section, 28, 32, G.Text.Align.Center)
                .tc(section['color'])
                .ts(section['shadow'], section['shadow'], section['shadow'])
                .i('w'));
            // -------- choose --------
            chapter = theme['choose'];
            gChoose = new G.Sprite((bounds.w - chapter['w']) / 2, 0, chapter['w'], bounds.h)
                .i('D')
                .o(0);
            chapter = chapter['option'];
            section = chapter['back'];
            resources.push([
                Resource.Resource.g(url + section['image'], raw),
                Resource.Resource.g(url + section['hover'], raw) // 1
            ]);
            this._i['cn'] = resources[5][0];
            this._i['ch'] = resources[5][1];
            section = chapter['text'];
            this._f['c'] = {
                s: section['shadow'],
                c: section['color']
            };
            this._c.a(gChoose, this._x['s']);
            // -------- menu --------
            chapter = theme['menu'];
            gMenu.a((gMenuMask = new G.Color(bounds, chapter['mask']['color0'])).i('m'))
                .a((gMenuFeatures = new G.Sprite(bounds)).i('f'))
                .a((gMenuSlots = new G.Sprite(bounds)).i('s').o(0));
            section = chapter['enter'];
            resources.push([
                Resource.Resource.g(url + section['image'], raw),
                Resource.Resource.g(url + section['hover'], raw) // 1
            ]);
            // 入口按钮
            this._c.a((gMenuEntry = new G.Button(section).b(function () {
                if (_this._m)
                    _this._m.w();
                gMenuEntry.o(0);
                gMenuMask.o(.4);
                gMenuSlots.o(0);
                gMenuFeatures.o(1);
                gMenu.o(1);
            }, new G.Image(resources[6][1].o()), new G.Image(resources[6][0].o()))).i('$.'), 'A');
            section = chapter['back'];
            resources[6].push(Resource.Resource.g(url + section['image'], raw), // 2
            Resource.Resource.g(url + section['hover'], raw) // 3
            );
            // 关闭按钮
            gMenuFeatures.a(new G.Button(section).b(function () {
                if (_this._m)
                    _this._m.r();
                gMenuEntry.o(1);
                gMenu.o(0);
            }, new G.Image(resources[6][3].o()), new G.Image(resources[6][2].o())));
            // 返回按钮
            gMenuSlots.a(new G.Button(section).b(function () {
                if (!gMenuWay) {
                    _this.qh(false);
                    return;
                }
                gMenuSlots.o(0);
                gMenuFeatures.o(1);
            }, new G.Image(resources[6][3].o()), new G.Image(resources[6][2].o())));
            section = chapter['save'];
            resources[6].push(Resource.Resource.g(url + section['image'], raw), // 4
            Resource.Resource.g(url + section['hover'], raw) // 5
            );
            // 存档按钮
            gMenuFeatures.a(new G.Button(section).b(function () {
                gMenuWay = true;
                _this.qs(false, .4);
            }, new G.Image(resources[6][5].o()), new G.Image(resources[6][4].o())));
            section = chapter['load'];
            resources[6].push(Resource.Resource.g(url + section['image'], raw), // 6
            Resource.Resource.g(url + section['hover'], raw) // 7
            );
            // 读档按钮
            gMenuFeatures.a(new G.Button(section).b(function () {
                gMenuWay = true;
                _this.qs(true, .4);
            }, new G.Image(resources[6][7].o()), new G.Image(resources[6][6].o())));
            section = chapter['auto'];
            resources[6].push(Resource.Resource.g(url + section['image'], raw), // 8
            Resource.Resource.g(url + section['hover'], raw) // 9
            );
            section = chapter['autotext'];
            // 自动档按钮
            gMenuSlots.a(new G.Button(chapter['auto']).b(function () {
                _this._r.l(_this._r.gS().q('auto')[0]);
            }, new G.Image(resources[6][9].o()), new G.Image(resources[6][8].o()))
                .a(new G.Text(section, section['size'], section['h'], right, true)
                .tc(section['color'])
                .i('t')).i('_'));
            // 自动档按钮（禁用状态）
            gMenuSlots.a(new G.Sprite(chapter['auto'])
                .a(new G.Image(resources[6][8].o()))
                .a(new G.Text(section, chapter['disabled']['size'], section['h'], right, true)
                .tc(chapter['disabled']['color'])
                .a(new G.TextPhrase('无'))).i('_.').o(0));
            section = chapter['1'];
            resources[6].push(Resource.Resource.g(url + section['image'], raw), // 10
            Resource.Resource.g(url + section['hover'], raw) // 11
            );
            section = chapter['1text'];
            // 第一档按钮
            gMenuSlots.a(new G.Button(chapter['1']).b(function () {
                if (_this._o) {
                    _this._r.l(_this._r.gS().q('1')[0]);
                    return;
                }
                _this._r.gS().e(true);
                if (_this._m)
                    _this._m.r();
                gMenuEntry.o(1);
                gMenu.o(0);
            }, new G.Image(resources[6][11].o()), new G.Image(resources[6][10].o()))
                .a(new G.Text(section, section['size'], section['h'], right, true)
                .tc(section['color'])
                .i('t')).i('1'));
            // 第一档按钮（禁用状态）
            gMenuSlots.a(new G.Sprite(chapter['1'])
                .a(new G.Image(resources[6][10].o()))
                .a(new G.Text(section, chapter['disabled']['size'], section['h'], right, true)
                .tc(chapter['disabled']['color'])
                .a(new G.TextPhrase('无'))).i('1.').o(0));
            section = chapter['2'];
            resources[6].push(Resource.Resource.g(url + section['image'], raw) // 12
            );
            // 第二档按钮
            gMenuSlots.a(new G.Image(resources[6][12].o(), section));
            section = chapter['3'];
            resources[6].push(Resource.Resource.g(url + section['image'], raw) // 13
            );
            // 第三档按钮
            gMenuSlots.a(new G.Image(resources[6][13].o(), section));
            section = chapter['4'];
            resources[6].push(Resource.Resource.g(url + section['image'], raw) // 14
            );
            // 第二档按钮
            gMenuSlots.a(new G.Image(resources[6][14].o(), section));
            section = chapter['enabled'];
            this.c(resources);
            return this;
        };
        /**
         * 设置自动播放。
         */
        CanvasDirector.prototype.a = function (auto) {
            if (this._m && this._m.gW())
                return this._a;
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
            this._s['b'].volume = volume;
            this._s['e'].volume = volume;
            return _super.prototype.v.call(this, volume);
        };
        /**
         * 修正 DOM 定位。
         */
        CanvasDirector.prototype.f = function () {
            this._c.z();
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
        };
        /**
         * 自我销毁。
         */
        CanvasDirector.prototype.d = function () {
            this._c.h();
            this._c = undefined;
            this._s['b'].pause();
            this._s['e'].pause();
            this._s = {};
            window.removeEventListener('keydown', this._l);
        };
        /**
         * 取消阻塞。
         */
        CanvasDirector.prototype.h = function () {
            if (this._m)
                this._m.h();
            if (this._h) {
                this._h.h();
                this._h = undefined;
            }
            if (this._q) {
                this._c.q('D')[0].c().o(0);
                this._q();
                this._q = undefined;
            }
            this.playBGM();
            this.playSE();
        };
        /**
         * 显示存档读档菜单。
         */
        CanvasDirector.prototype.qs = function (load, opacity) {
            if (load === void 0) { load = true; }
            if (opacity === void 0) { opacity = 1; }
            _super.prototype.qs.call(this, load, opacity);
            var gEntry = this._c.q('$.')[0], gMenu = this._c.q('$')[0], gMask = gMenu.q('m')[0], gFeatures = gMenu.q('f')[0], gSlots = gMenu.q('s')[0], gAuto = gSlots.q('_')[0], gAutoDisabled = gSlots.q('_.')[0], g1 = gSlots.q('1')[0], g1Disabled = gSlots.q('1.')[0], states = this._r.gS(), slot = states.q('auto'), time = function (stamp) {
                var date = new Date(stamp), node = date.getHours(), clob = ' ' + (10 > node ? '0' : '') + node;
                node = date.getMinutes();
                clob += ':' + (10 > node ? '0' : '') + node;
                return date.getFullYear() + '-' + (1 + date.getMonth()) + '-' + date.getDate() + clob;
            };
            gEntry.o(0);
            gMask.o(0);
            gFeatures.o(0);
            gSlots.o(1);
            gAuto.o(load && slot ? 1 : 0);
            if (slot)
                gAuto.q('t')[0].c()
                    .a(new G.TextPhrase(time(slot[1])));
            gAutoDisabled.o(load && !slot ? 1 : 0);
            slot = states.q('1');
            g1.o(!load || slot ? 1 : 0);
            if (slot)
                g1.q('t')[0].c()
                    .a(new G.TextPhrase(time(slot[1])));
            g1Disabled.o(load && !slot ? 1 : 0);
            gMenu.o(1);
            return this.lightOn();
        };
        /**
         * 隐藏存档读档菜单。
         */
        CanvasDirector.prototype.qh = function (succeed) {
            var _this = this;
            return this.lightOff()
                .then(function () {
                _this._c.q('$.')[0].o(1);
                _this._x['s'].o(succeed ? 0 : 1);
                _this._c.q('$')[0].o(0);
            }).then(function () {
                return succeed ?
                    _this.reset() :
                    _this.lightOn();
            });
        };
        /**
         * 绑定视图。
         */
        CanvasDirector.prototype.b = function (viewport) {
            this._c.b(viewport);
            return this;
        };
        /**
         * 将文本添加至画面文字元素中。
         */
        CanvasDirector.prototype.$w = function (element, words, hiColor) {
            var buffer = '', hilite = false, ii;
            element.c();
            for (ii = 0; ii < words.length; ii++) {
                if ('【' == words[ii] && !hilite) {
                    element.a(new G.TextPhrase(buffer));
                    buffer = '';
                    hilite = true;
                }
                else if ('】' == words[ii] && hilite) {
                    element.a(new G.TextPhrase(buffer, hiColor));
                    buffer = '';
                    hilite = false;
                }
                else
                    buffer += words[ii];
            }
            if (buffer)
                element.a(new G.TextPhrase(buffer, hilite ? hiColor : ''));
            return element;
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
    })(Runtime.Director);
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
    })(Ev.Event);
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
    })(Ev.Event);
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
    })(Ev.Event);
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
        Auto: '自动播放',
        Player: '主角',
        Resources: '素材包',
        Theme: '主题',
        Scene: '事件',
        Type: '类型',
        Conditions: '条件',
        Content: '内容',
        CharOn: '人物出场',
        CharOff: '人物离场',
        CharSet: '设置人物',
        CharPose: '改变神态',
        CharMove: '人物移动',
        Monolog: '独白',
        Speak: '对白',
        Tip: '提示',
        VoiceOver: '旁白',
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
        DefOptions: '定义选择',
        AddOption: '添加选项',
        DropOption: '去除选项',
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
        53: ['Unknown', 1, 0],
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
        11: ['Stars', 1, -1],
        12: ['PlayBGM', 1, -1],
        64: ['StopBGM', 0, -1],
        13: ['HideCG', 0, -1],
        14: ['ShowCG', 1, -1],
        15: ['AsRoom', 1, -1],
        16: ['Freeze', 0, -1],
        17: ['AsTime', 1, -1],
        18: ['Enter', 1, -1],
        19: ['PlaySE', 1, -1],
        20: ['Weather', 1, -1],
        58: ['Loop', 0, -1, {
                '-1': [1]
            }],
        59: ['LoopBreak', 0, -1],
        25: ['Choose', [0, 1], 0, {
                53: [0]
            }],
        65: ['DefOptions', 0, 1, {
                53: [0]
            }],
        66: ['AddOption', 2, 0],
        67: ['DropOption', 2, -1],
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
        22: ['Assert', [2, 3], -1],
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
            }]
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
        if ('captureStackTrace' in Error)
            Error['captureStackTrace'](this, E);
        this.signal = (lineNo in E.Signal) ?
            lineNo :
            E.Signal.OK;
        if (0 < lineNo)
            message = '第 ' + lineNo + ' 行' + message;
        _super.call(this);
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
    return E;
})(Error);
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
    })();
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
    })(Tag.Unknown);
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
    })(Tag.Unknown);
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
    })(Tag.Image);
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
            this._o = {};
            _super.call(this, params, content, children, lineNo);
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
    })(Tag.Unknown);
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
    })(Tag.ResTable);
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
    })(Tag.Entity);
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
    })(Tag.Unknown);
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
    })(Tag.Entity);
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
    })(Tag.Entity);
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
    })(Tag.Entity);
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
    })(Tag.Image);
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
    })(Tag.Image);
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
            this._a = {};
            _super.call(this, params, content, children, lineNo);
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
    })(Tag.Unknown);
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
    })(Tag.Unknown);
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
    })(Tag.Unknown);
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
                return co.p(type.PreLeave, runtime);
            })
                .then(function () { return _this._mo.p(type.PreEnter, runtime); }) // 播放关联（目标）房间进入前事件
                .then(function () { return director.lightOff(); })
                .then(function () {
                states.d(kcn)
                    .d(kco)
                    .d(kdn)
                    .d(kdo);
                if (!cn)
                    return runtime;
                return co.p(type.PostLeave, runtime);
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
                }).then(function () { return director.asRoom(_this._mo.o(states.g(kt))); })
                    .then(function () { return director.asMap(map ? map.gP() : {}); })
                    .then(function () { return _this._mo.p(type.PostEnter, runtime); });
            }); });
            return E.doHalt(); // 中断原有时序流。
        };
        return Enter;
    })(Tag.Action);
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
            if (this._m && this._p[0])
                this._o = ep.q(this._m, Core.IEpisode.Entity.Map, this._l).gP(this._p[0]);
        };
        /**
         * 交互逻辑。
         */
        Point.prototype.p = function (runtime) {
            var room = this.gR();
            Tag.Enter.prototype.p.call({
                _p: [room.gI()],
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
    })(Tag.Unknown);
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
            this._a = {};
            _super.call(this, params, content, children, lineNo);
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
    })(Tag.Entity);
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
    })(Tag.Unknown);
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
    })(Tag.ResTable);
    Tag.Times = Times;
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
var Tag;
(function (Tag) {
    var Util = __Bigine_Util;
    var DefRoom = (function (_super) {
        __extends(DefRoom, _super);
        /**
         * 构造函数。
         */
        function DefRoom(params, content, children, lineNo) {
            this._a = {};
            _super.call(this, params, content, children, lineNo);
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
        DefRoom.prototype.p = function (type, runtime) {
            return (type in this._a ?
                Util.Q.every(this._a[type], function (scene) {
                    if (runtime.gH())
                        return E.doHalt();
                    return scene.p(runtime);
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
    })(Tag.Entity);
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
    })(Tag.Unknown);
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
    })(Tag.Unknown);
    Tag.Player = Player;
})(Tag || (Tag = {}));
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
var Tag;
(function (Tag) {
    var Util = __Bigine_Util;
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
            Util.Remote.get('//s.dahao.de/theme/' + this._c + '/theme.json', callback, function (error, status) {
                throw error;
            });
        };
        return Theme;
    })(Tag.Unknown);
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
            Util.Remote.post('//api.dahao.de/resource/' + this._c + '/', {}, function (data) {
                var ret = {};
                ret['rooms'] = {};
                Util.each(data['rooms'] || {}, function (room, index) {
                    var times = [];
                    Util.each(room['snaps'] || {}, function (id, title) {
                        times.push(new Tag.Unknown([title], id, [], -1));
                    });
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
                    ret['chars'][index] = new Tag.DefChar([], chr['title'], [
                        new Tag.Avatar([], chr['avatar'], [], -1),
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
                callback(ret);
            }, function (error, status) {
                throw error;
            });
        };
        return Resources;
    })(Tag.Unknown);
    Tag.Resources = Resources;
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
    })(Tag.Unknown);
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
    })(Tag.Unknown);
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
            var states = runtime.gS(), kroom = '_rd', room = states.g(kroom), ktime = '_t', time = states.g(ktime), director = runtime.gD(), map = this._mo.gM();
            if (!time) {
                time = '午';
                states.s(ktime, time);
            }
            if (room == this._p[0])
                return runtime;
            states.s(kroom, this._p[0]);
            states.s('$rd', this._mo);
            return director.asRoom(this._mo.o(time))
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
    })(Tag.Action);
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
                case '左':
                    this._mp = pos.Left;
                    break;
                case '右':
                    this._mp = pos.Right;
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
    })(Tag.Action);
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
            var states = runtime.gS(), key = '_b', bgm = states.g(key);
            if (bgm == this._p[0])
                return runtime;
            states.s(key, this._p[0]);
            return runtime.gD().playBGM(this._mo.o());
        };
        /**
         * 获取依赖素材资源列表。
         */
        PlayBGM.prototype.$d = function () {
            return [this._mo.o()];
        };
        /**
         * 获取关联音乐。
         */
        PlayBGM.prototype.gB = function () {
            return this._mo;
        };
        return PlayBGM;
    })(Tag.Action);
    Tag.PlayBGM = PlayBGM;
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
            return runtime.gD().playSE(this._mo.o());
        };
        /**
         * 获取依赖素材资源列表。
         */
        PlaySE.prototype.$d = function () {
            return [this._mo.o()];
        };
        /**
         * 获取关联音效。
         */
        PlaySE.prototype.gS = function () {
            return this._mo;
        };
        return PlaySE;
    })(Tag.Action);
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
            return runtime.gD().showCG(this._mo.o());
        };
        /**
         * 获取依赖素材资源列表。
         */
        ShowCG.prototype.$d = function () {
            return [this._mo.o()];
        };
        /**
         * 获取关联特写。
         */
        ShowCG.prototype.gC = function () {
            return this._mo;
        };
        return ShowCG;
    })(Tag.Action);
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
            var pos = Core.IDirector.Position, type = Core.IEpisode.Entity, states = runtime.gS(), director = runtime.gD(), episode = runtime.gE(), kid = '.c', kdata = '_c', kpose = '_s', kpos = '.p', q = Promise.resolve(runtime), kroom = states.g('_rd'), kdo = '$rd', bgm = states.g('_b'), cg = states.g(kid), l = pos.Left, lChar = states.g(kid + l), cl = pos.CLeft, clChar = states.g(kid + cl), c = pos.Center, cChar = states.g(kid + c), cr = pos.CRight, crChar = states.g(kid + cr), r = pos.Right, rChar = states.g(kid + r), ctype = type.Chr, room;
            if (bgm)
                q = q.then(function () { return director.playBGM(episode.q(bgm, type.BGM).o()); });
            if (kroom && !states.g(kdo))
                q = q.then(function () {
                    states.s(kdo, room = episode.q(kroom, type.Room));
                    return director.asRoom(room.o(states.g('_t')))
                        .then(function () { return room.gM() ? director.asMap(room.gM().gP()) : runtime; });
                });
            if (cg)
                q = q.then(function () {
                    states.m(kid, kdata);
                    return director.setCG(episode.q(cg, type.CG).o());
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
    })(Tag.Action);
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
    })(Tag.Idable);
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
    })(Tag.Action);
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
    })(Tag.Unknown);
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
    })(Tag.Unknown);
    Tag.Scene = Scene;
})(Tag || (Tag = {}));
/**
 * 定义（作品）根标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Structure/Root.ts
 */
/// <reference path="../Unknown.ts" />
/// <reference path="../../Core/_Tag/IRootTag.ts" />
/// <reference path="Resources.ts" />
/// <reference path="Theme.ts" />
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
         * 压缩键名序列。
         */
        Root.SERIALS = 'qwertyuiopasdfghjklzxcvbnm$_QWERTYUIOPASDFGHJKLZXCVBNM';
        return Root;
    })(Tag.Unknown);
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
    })(Tag.Action);
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
                case '左':
                    this._mp = pos.Left;
                    break;
                case '右':
                    this._mp = pos.Right;
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
    })(Tag.Action);
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
    })(Tag.Action);
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
    })(Tag.Idable);
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
    })(Tag.Idable);
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
            runtime.gS().e(false);
            return runtime;
        };
        return Save;
    })(Tag.Action);
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
    })(Tag.Action);
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
    })(Tag.Action);
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
                    break;
                case '优秀':
                    this._ms = stars.Awesome;
                    break;
                case '完美':
                    this._ms = stars.Perfect;
                    break;
                default:
                    throw new E(E.ACT_ILLEGAL_STARS, lineNo);
            }
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
            return runtime.gD().stars(this._ms);
        };
        return Stars;
    })(Tag.Action);
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
    })(Tag.Action);
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
    })(Tag.Action);
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
    })(Tag.Action);
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
    })(Tag.Action);
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
    })(Tag.Action);
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
         * （执行）检查。
         */
        Assign.prototype.t = function (states) {
            var depth = states.g('$d');
            states.s(this._p[0], this.$v(this._c))
                .c(this._p[0], '$v' + depth)
                .s('$t' + depth, false);
            return true;
        };
        /**
         * 执行。
         */
        Assign.prototype.p = function (runtime) {
            this.t(runtime.gS());
            return runtime;
        };
        return Assign;
    })(Tag.Action);
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
    })(Tag.Action);
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
         * （执行）检查。
         */
        Increase.prototype.t = function (states) {
            var depth = states.g('$d');
            states.s(this._p[0], states.g(this._p[0]) + this.$v(this._c))
                .c(this._p[0], '$v' + depth)
                .s('$t' + depth, false);
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
    })(Tag.Action);
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
    })(Tag.Action);
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
    })(Tag.Action);
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
    })(Tag.Action);
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
    })(Tag.Action);
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
    })(Tag.Action);
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
    })(Tag.Action);
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
        return Option;
    })(Tag.Unknown);
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
            var opts;
            if (this._c) {
                opts = runtime.gS().g('$_' + this._c) || [];
                if (this._p[0])
                    Util.each(opts, function (option) {
                        option.sK(_this._p[0]);
                    });
            }
            else {
                opts = [];
                Util.each(this._s, function (tag) {
                    opts.push(Tag.Option.f(tag).sK(_this._p[0]));
                });
            }
            if (opts.length)
                return runtime.gD().choose(opts);
            return runtime;
        };
        return Choose;
    })(Tag.Action);
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
/// <reference path="../../Action.ts" />
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
            return runtime.gD().tip(runtime.gS().t(this._c));
        };
        return Tip;
    })(Tag.Action);
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
    })(Tag.Action);
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
                case '左':
                    this._mp = pos.Left;
                    break;
                case '右':
                    this._mp = pos.Right;
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
    })(Tag.Action);
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
    })(Tag.Action);
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
            return runtime.gD().playBGM();
        };
        return StopBGM;
    })(Tag.Action);
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
            var opts = [];
            Util.each(this._s, function (tag) {
                opts.push(Tag.Option.f(tag));
            });
            runtime.gS().s('$_' + this._c, opts);
            return runtime;
        };
        return DefOptions;
    })(Tag.Action);
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
            var states = runtime.gS(), key = '$_' + this._p[0], opts = states.g(key) || [];
            opts.push(new Tag.Option([this._p[1]], this._c || this._p[1], [], this._l));
            states.s(key, opts);
            return runtime;
        };
        return AddOption;
    })(Tag.Action);
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
    })(Tag.Action);
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
            states.s(this._p[0], 1 | 100 * Math.random())
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
    })(Tag.Action);
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
    })(Tag.Action);
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
    })(Tag.Action);
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
    })(Tag.Action);
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
    })(Tag.Action);
    Tag.Subtract = Subtract;
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
                this._fh = false;
            this._fp = this._d.gD();
            this._fv = 1;
            this._fa = this._e.gA();
            this._d.a(this._fa);
            this._t = Promise.resolve(this);
            this.addEventListener('ready', function () {
                _this._s.l();
                _this._d.t(_this._e.gT(), _this._e.gC());
                _this._fr = true;
                if (_this._fp) {
                    _this._fp = false;
                    _this.play();
                }
            });
            this.addEventListener('begin', function () {
                _this.t(function () { return _this._e.p(Core.ISceneTag.Type.Begin, _this); });
            });
            this.addEventListener('resume', function () {
                _this._d.qs();
            });
            this.addEventListener('end', function () {
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
         * 播放。
         */
        Runtime.prototype.play = function () {
            if (this._fp)
                return this;
            this._fp = true;
            if (!this._fr)
                return this;
            this._s.i({});
            this._d.playBGM();
            this._d.playSE();
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
            if (undefined !== auto)
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
         * 设置作品标题。
         */
        Runtime.prototype.title = function (title) {
            this._n = title;
            return this;
        };
        /**
         * 设置作者。
         */
        Runtime.prototype.author = function (title) {
            this._c = title;
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
        Runtime.prototype.l = function (id) {
            var _this = this;
            var load = function (data) {
                var fresh = !data || {} == data, episode = _this._e, states = _this._s, ks = '_s', ktn = '_rt', kcn = '_rc', kco = '$rc', kdc = '_c', krc = '.c', pos = Core.IDirector.Position, tn, cn, enter;
                _this._d.qh(true).then(function () {
                    if (!fresh)
                        states.i(data);
                    if (fresh || !states.g(ks))
                        return _this.dispatchEvent(new Ev.Begin({
                            target: episode
                        }));
                    states.m('_a', '.a') // 识别重建用状态数据
                        .m(ks, '.s')
                        .m(kdc, krc)
                        .m(kdc + pos.Left, krc + pos.Left)
                        .m(kdc + pos.Center, krc + pos.Center)
                        .m(kdc + pos.Right, krc + pos.Right);
                    _this._fh = true; // 中止现有时序流
                    _this._d.h();
                    _this.t(function () {
                        _this._fh = false;
                        tn = states.g(ktn);
                        cn = states.g(kcn);
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
            this.dispatchEvent(new Ev.Load({
                target: this._s,
                callback: load,
                id: id
            }));
        };
        /**
         * 绑定视图。
         */
        Runtime.prototype.bind = function (viewport) {
            this._d.b(viewport);
            return this;
        };
        return Runtime;
    })();
    Runtime_1.Runtime = Runtime;
})(Runtime || (Runtime = {}));
/**
 * 定义词法标签行组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
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
                this._t = ['', ''];
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
        TagLine.prototype.t = function () {
            var name = this._t[0], params = this._t[1] ?
                this._t[1].split('，') :
                [], content = this._t[2], children = [], proto, tag;
            Util.each(this._c, function (obj) {
                children.push(obj.t());
            });
            if (-1 == this._i)
                return new Tag.Root(children);
            if (!(name in Tag.C)) {
                params.unshift(name);
                name = 'UNKNOWN';
            }
            proto = eval('Tag.' + Tag.C[name]);
            tag = new proto(params, content, children, this._l[0]);
            if (tag instanceof Tag.Idable || 'Scene' == tag.gN())
                tag.i(u());
            return tag;
        };
        /**
         * 语法。
         */
        TagLine.GRAMMAR = /^(\t*)([^\s（：]+)(?:|：(.*)|（(.*)）：(.*)|（(.*)）)$/;
        return TagLine;
    })();
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
    Bigine.version = '0.17.2';
})(Bigine || (Bigine = {}));
module.exports = Bigine;
//# sourceMappingURL=bigine.js.map
