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
/// <reference path="_Resource/Resource.ts" />

namespace Runtime {
    import Util = __Bigine_Util;

    export class Episode implements Core.IEpisode {
        /**
         * 已添加地事件。
         */
        private _a: Util.IHashTable<Core.ISceneTag[]>;

        /**
         * 已注册地实体。
         */
        private _e: Util.IHashTable<Util.IHashTable<Core.IEntityTag>>;

        /**
         * 主题。
         */
        private _c: Util.IHashTable<Util.IHashTable<any>>;

        /**
         * 是否自动播放标识。
         */
        private _p: boolean;

        /**
         * 素材包名称。
         */
        private _s: string;

        /**
         * 主题名称。
         */
        private _t: string;

        /**
         * 构造函数。
         */
        constructor(ep: Core.IRootTag, runtime: Core.IRuntime) {
            this._a = {};
            this._e = {};
            this._p = ep.a();
            this._s = ep.gS();
            this._t = ep.gT();
            ep.r(this);
            Promise.all([
                new Promise<void>((resolve: (value?: void | Thenable<void>) => void) => {
                    var res: boolean = ep.l((entities: Util.IHashTable<Util.IHashTable<Core.IEntityTag>>) => {
                        Util.each(entities, (typed: Util.IHashTable<Core.IEntityTag>) => {
                            Util.each(typed, (entity: Core.IEntityTag) => {
                                entity.r(this);
                            });
                        });
                        resolve();
                    });
                    if (!res)
                        resolve();
                }).then(() => {
                    ep.b(this);
                }),
                new Promise<void>((resolve: (value?: void | Thenable<void>) => void) => {
                    ep.t((data: Util.IHashTable<Util.IHashTable<any>>) => {
                        this._c = data;
                        resolve();
                    });
                })
            ]).then(() => {
                runtime.dispatchEvent(new Ev.Ready({
                    target: this
                }));
            })['catch']((error: any) => {
                runtime.dispatchEvent(new Ev.Error({
                    target: this,
                    error: error
                }));
            });
        }

        /**
         * 添加事件。
         */
        public a(scene: Core.ISceneTag): Episode {
            var type: Core.ISceneTag.Type = scene.gT();
            this._a[type] = this._a[type] || [];
            this._a[type].push(scene);
            return this;
        }

        /**
         * 播放。
         */
        public p(type: Core.ISceneTag.Type, runtime: Core.IRuntime): Promise<Core.IRuntime> {
            var q: Promise<Core.IRuntime>;
            if (type in this._a) {
                runtime.gS().s('_p', type);
                q = Util.Q.every(this._a[type], (scene: Core.ISceneTag) => {
                    if (runtime.gH())
                        return E.doHalt<Core.IRuntime>();
                    return scene.p(runtime);
                });
            } else
                q = Promise.resolve(runtime);
            return q.then(() => {
                if (Core.ISceneTag.Type.End == type)
                    runtime.dispatchEvent(new Ev.End({
                        target: this
                    }));
                return runtime;
            });
        }

        /**
         * 注册实体。
         */
        public f(tag: Core.IEntityTag): Episode {
            var type: Core.IEpisode.Entity = tag.gT(),
                id: string = tag.gI();
            this._e[type] = this._e[type] || {};
            if (id in this._e[type])
                throw new E(E.EP_DUPLICATE_ENTITY, this._e[type][id].gL());
            this._e[type][id] = tag;
            return this;
        }

        /**
         * 查询实体。
         */
        public q(id: string, type: Core.IEpisode.Entity, lineNo?: number): Core.IEntityTag {
            this._e[type] = this._e[type] || {};
            if (!(id in this._e[type]))
                throw new E(E.EP_ENTITY_NOT_FOUND, lineNo || 0);
            return this._e[type][id];
        }

        /**
         * 注册资源。
         */
        public r(uri: string, type: Core.IResource.Type): Resource<string | HTMLImageElement> {
            return Resource.g<string | HTMLImageElement>(uri, type);
        }

        /**
         * 获取素材包名称。
         */
        public gS(): string {
            return this._s;
        }

        /**
         * 获取主题名称。
         */
        public gT(): string {
            return this._t;
        }

        /**
         * 是否自动播放。
         */
        public gA(): boolean {
            return this._p;
        }

        /**
         * 获取主题信息。
         */
        public gC(): Util.IHashTable<Util.IHashTable<any>> {
            if (!this._c)
                throw new E(E.EP_THEME_NOT_LOADED);
            return this._c;
        }
    }
}
