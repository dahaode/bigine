/**
 * 定义（运行时）作品组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Runtime/Episode.ts
 */

/// <reference path="Event/Ready.ts" />
/// <reference path="_Resource/Prefetcher.ts" />

module Runtime {
    export class Episode implements IEpisode {
        /**
         * 已添加地事件。
         */
        private _a: Util.IHashTable<Tag.IScene[]>;

        /**
         * 已注册地实体。
         */
        private _e: Util.IHashTable<Util.IHashTable<Tag.IEntity>>;

        /**
         * 主题。
         */
        private _t: Util.IHashTable<Util.IHashTable<any>>;

        /**
         * 构造函数。
         */
        constructor(ep: Tag.IRoot, runtime: IRuntime) {
            this._a = {};
            this._e = {};
            ep.r(this);
            Promise.all([
                new Promise<void>((resolve) => {
                    var res = ep.l((entities) => {
                        Util.each(entities, (typed) => {
                            Util.each(typed, (entity) => {
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
                new Promise<void>((resolve) => {
                    ep.t((data) => {
                        this._t = data;
                        resolve();
                    });
                })
            ]).then(() => {
                runtime.dispatchEvent(new Event.Ready({
                    target: this
                }));
            });
        }

        /**
         * 添加事件。
         */
        a(scene: Tag.IScene): Episode {
            var type = scene.gT();
            this._a[type] = this._a[type] || [];
            this._a[type].push(scene);
            return this;
        }

        /**
         * 播放。
         */
        p(type: Tag.IScene.Type, runtime: IRuntime): Promise<IRuntime> {
            if (!(type in this._a))
                return Promise.resolve(runtime);
            return Util.Q.every(this._a[type], (scene) => scene.p(runtime));
        }

        /**
         * 注册实体。
         */
        f(tag: Tag.IEntity): Episode {
            var type = tag.gT();
            this._e[type] = this._e[type] || {};
            this._e[type][tag.gI()] = tag;
            return this;
        }

        /**
         * 查询实体。
         */
        q(id: string, type: Core.IEpisode.Entity): Tag.IEntity {
            this._e[type] = this._e[type] || {};
            if (!(id in this._e[type]))
                throw new E(E.EP_ENTITY_NOT_FOUND);
            return this._e[type][id];
        }

        /**
         * 注册资源。
         */
        r(uri: string, type: IResource.Type): Resource {
            return new Resource(uri, type);
        }

        /**
         * 获取主题信息。
         */
        t(category: string): Util.IHashTable<any> {
            if (!this._t)
                throw new E(E.EP_THEME_NOT_LOADED);
            return this._t[category];
        }

        /**
         * 预加载指定资源组。
         *
         * @param resources 一个（作品）事件所包含地所有资源
         */
        c(resources: Resource[][]): Promise<void> {
            return Prefecher.c(resources);
        }
    }
}
