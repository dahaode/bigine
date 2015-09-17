/**
 * 定义（运行时）作品组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Runtime/Episode.ts
 */

/// <reference path="Event/Ready.ts" />
/// <reference path="Event/Error.ts" />
/// <reference path="Event/End.ts" />
/// <reference path="_Resource/Resource.ts" />

namespace Runtime {
    'use strict';

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
        private _t: Util.IHashTable<Util.IHashTable<any>>;

        /**
         * 是否自动播放标识。
         */
        private _p: boolean;

        /**
         * 构造函数。
         */
        constructor(ep: Core.IRootTag, runtime: Core.IRuntime) {
            this._a = {};
            this._e = {};
            this._p = ep.a();
            ep.r(this);
            Promise.all([
                new Promise<void>((resolve: (value?: void | Thenable<void>) => void) => {
                    var res: boolean = ep.l((entities: Util.IHashTable<Util.IHashTable<Core.IEntityTag>>) => {
                        Util.each(entities, (typed: Util.IHashTable<Core.IEntityTag>) => {
                            Util.each(typed, (entity: Core.IEntityTag) => {
                                this.f(entity);
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
                        this._t = data;
                        resolve();
                    });
                })
            ]).then(() => {
                runtime.dispatchEvent(new Event.Ready({
                    target: this
                }));
            })['catch']((error: any) => {
                runtime.dispatchEvent(new Event.Error({
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
            if (!(type in this._a))
                return Promise.resolve(runtime);
            return Util.Q.every(this._a[type], (scene: Core.ISceneTag) => scene.p(runtime)).then(() => {
                if (Core.ISceneTag.Type.End == type)
                    runtime.dispatchEvent(new Event.End({
                        target: this
                    }));
                return runtime;
            });
        }

        /**
         * 注册实体。
         */
        public f(tag: Core.IEntityTag): Episode {
            var type: Core.IEpisode.Entity = tag.gT();
            this._e[type] = this._e[type] || {};
            this._e[type][tag.gI()] = tag;
            return this;
        }

        /**
         * 查询实体。
         */
        public q(id: string, type: Core.IEpisode.Entity): Core.IEntityTag {
            this._e[type] = this._e[type] || {};
            if (!(id in this._e[type]))
                throw new E(E.EP_ENTITY_NOT_FOUND);
            return this._e[type][id];
        }

        /**
         * 注册资源。
         */
        public r(uri: string, type: Core.IResource.Type): Resource {
            return new Resource(uri, type);
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
        public gT(): Util.IHashTable<Util.IHashTable<any>> {
            if (!this._t)
                throw new E(E.EP_THEME_NOT_LOADED);
            return this._t;
        }
    }
}
