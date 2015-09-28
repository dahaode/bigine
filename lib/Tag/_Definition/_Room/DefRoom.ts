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

namespace Tag {
    export class DefRoom extends Entity implements Core.IRoomTag {
        /**
         * 已添加地事件。
         */
        private _a: Util.IHashTable<Core.ISceneTag[]>;

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
        public a(scene: Core.ISceneTag): DefRoom {
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
            return Util.Q.every(this._a[type], (scene: Core.ISceneTag) => {
                if (runtime.gH())
                    return Util.Q.doHalt<Core.IRuntime>();
                return scene.p(runtime);
            }).then(() => {
                if (Core.ISceneTag.Type.PostEnter == type)
                    return runtime.gD().lightOn();
                return runtime;
            });
        }

        /**
         * 获取资源。
         */
        public o(id?: string): Core.IResource<HTMLImageElement> {
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
        public d(): Core.IResource<HTMLImageElement>[] {
            var map: DefMap = this.gM();
            if (map)
                return map.d();
            return (<Times> this.$q('Times')[0]).d();
        }
    }
}
