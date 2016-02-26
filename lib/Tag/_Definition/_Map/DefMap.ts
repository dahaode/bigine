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

namespace Tag {
    import Util = __Bigine_Util;

    export class DefMap extends Entity implements Core.IMapTag {
        /**
         * 交互点集合。
         */
        private _a: Util.IHashTable<Point>;

        /**
         * 原型。
         */
        private _o: DefMap;

        /**
         * 构造函数。
         */
        constructor(params: string[], content: string, children: Unknown[], lineNo?: number) {
            super(params, content, children, lineNo);
            this._a = {};
            if (!this.$q('BGImage').length && !params.length)
                throw new E(E.DEF_MAP_BGIMAGE_NOT_FOUND, lineNo);
            Util.each(this.$q('Point'), (point: Point) => {
                this._a[point.gI()] = point;
                point.sM(params[0]);
            });
        }

        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'DefMap';
        }

        /**
         * 绑定（运行时）作品（实体）。
         */
        public $b(ep: Core.IEpisode): void {
            if (this._p[0])
                this._o = <DefMap> ep.q(this._p[0], Core.IEpisode.Entity.Map, this._l);
        }

        /**
         * 获取类型。
         */
        public gT(): Core.IEpisode.Entity {
            return Core.IEpisode.Entity.Map;
        }

        /**
         * 获取资源。
         */
        public o(): Core.IResource<HTMLImageElement> {
            return (<BGImage> this.$q('BGImage')[0] || this._o).o();
        }

        /**
         * 获取交互点集合。
         */
        public gP(): Util.IHashTable<Point>;
        public gP(id: string): Point;
        public gP(id?: string): any {
            if (id) {
                if (!(id in this._a))
                    throw new E(E.DEF_MAP_POINT_NOT_FOUND, this._l);
                return this._a[id];
            }
            return this._a;
        }

        /**
         * 获取所有关联资源。
         */
        public d(): Core.IResource<HTMLImageElement>[] {
            var ret: Core.IResource<HTMLImageElement>[] = [this.o()];
            Util.each(this._a, (point: Point) => {
                ret.push(point.o());
            });
            return ret;
        }
    }
}
