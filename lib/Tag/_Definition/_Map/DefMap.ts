/**
 * 定义地图（定义）标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Definition/_Map/DefMap.ts
 */

/// <reference path="../Entity.ts" />
/// <reference path="BGImage.ts" />
/// <reference path="Point.ts" />

module Tag {
    export class DefMap extends Entity {
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
            this._a = {};
            super(params, content, children, lineNo);
            if (!this.$q('BGImage').length && !params.length)
                throw new E(E.DEF_MAP_BGIMAGE_NOT_FOUND, lineNo);
            Util.each(<Point[]> this.$q('Point'), (point) => {
                this._a[point.gI()] = point;
                point.sM(params[0]);
            });
        }

        /**
         * 获取标签名称。
         */
        gN(): string {
            return 'DefMap';
        }

        /**
         * 绑定（运行时）作品（实体）。
         */
        $b(ep: Runtime.IEpisode): void {
            if (this._p[0])
                this._o = <DefMap> ep.q(this._p[0], Core.IEpisode.Entity.Map);
        }

        /**
         * 获取类型。
         */
        gT(): Core.IEpisode.Entity {
            return Core.IEpisode.Entity.Map;
        }

        /**
         * 获取资源。
         */
        o(): Runtime.IResource {
            return (<BGImage> this.$q('BGImage')[0] || this._o).o();
        }

        /**
         * 获取交互点集合。
         */
        gP(): Util.IHashTable<Point>;
        gP(id: string): Point;
        gP(id?: string): any {
            if (id) {
                if (!(id in this._a))
                    throw new E(E.DEF_MAP_POINT_NOT_FOUND, this._l);
                return this._a[id];
            }
            return this._a;
        }
    }
}
