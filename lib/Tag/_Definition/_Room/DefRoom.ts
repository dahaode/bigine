/**
 * 定义房间（定义）标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Definition/_Room/DefRoom.ts
 */

/// <reference path="../Entity.ts" />
/// <reference path="../../IRoom.ts" />
/// <reference path="Link.ts" />
/// <reference path="Times.ts" />

namespace Tag {
    'use strict';

    export class DefRoom extends Entity implements IRoom {
        /**
         * 已添加地事件。
         */
        private _a: Util.IHashTable<IScene[]>;

        /**
         * 构造函数。
         */
        constructor(params: string[], content: string, children: Unknown[], lineNo?: number) {
            this._a = {};
            super(params, content, children, lineNo);
            if (!this.$q('Link').length && !this.$q('Times').length)
                throw new E(E.DEF_ROOM_EMPTY, lineNo);
        }

        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'DefRoom';
        }

        /**
         * 获取类型。
         */
        public gT(): Core.IEpisode.Entity {
            return Core.IEpisode.Entity.Room;
        }

        /**
         * 添加事件。
         */
        public a(scene: IScene): DefRoom {
            var type: IScene.Type = scene.gT();
            this._a[type] = this._a[type] || [];
            this._a[type].push(scene);
            return this;
        }

        /**
         * 播放。
         */
        public p(type: IScene.Type, runtime: Runtime.IRuntime): Promise<Runtime.IRuntime> {
            if (!(type in this._a))
                return Promise.resolve(runtime);
            return Util.Q.every(this._a[type], (scene: IScene) => scene.p(runtime));
        }

        /**
         * 获取资源。
         */
        public o(id?: string): Runtime.IResource {
            var map: DefMap = this.gM();
            if (map)
                return map.o();
            return (<Times> this.$q('Times')[0]).o(id);
        }

        /**
         * 获取关联地图。
         */
        public gM(): DefMap {
            var l: Link = <Link> this.$q('Link')[0];
            if (!l) return;
            return l.gM();
        }

        /**
         * 获取所有关联资源。
         */
        public d(): Runtime.IResource[] {
            var map: DefMap = this.gM();
            if (map)
                return map.d();
            return (<Times> this.$q('Times')[0]).d();
        }
    }
}
