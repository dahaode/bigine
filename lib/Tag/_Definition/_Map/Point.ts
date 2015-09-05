/**
 * 定义（地图）交互点标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Definition/_Map/Point.ts
 */

/// <reference path="../../Unknown.ts" />
/// <reference path="HLImage.ts" />
/// <reference path="Region.ts" />
/// <reference path="Target.ts" />

module Tag {
    export class Point extends Unknown {
        /**
         * 原型。
         */
        private _o: Point;

        /**
         * 地图（模板）编号。
         */
        private _m: string;

        /**
         * 构造函数。
         */
        constructor(params: string[], content: string, children: Unknown[], lineNo?: number) {
            super(params, content, children, lineNo);
            if (!params.length)
                if (!this.$q('HLImage').length)
                    throw new E(E.DEF_MAP_HLIMAGE_NOT_FOUND, lineNo);
                else if (!this.$q('Region').length)
                    throw new E(E.DEF_MAP_REGION_NOT_FOUND, lineNo);
        }

        /**
         * 获取标签名称。
         */
        gN(): string {
            return 'Point';
        }

        /**
         * 绑定（运行时）作品（实体）。
         */
        $b(ep: Runtime.IEpisode): void {
            if (this._m && this._p[0])
                this._o = (<DefMap> ep.q(this._m, Core.IEpisode.Entity.Map)).gP(this._m);
        }

        /**
         * 获取唯一编号。
         */
        gI(): string {
            return this._c;
        }

        /**
         * 获取高亮图资源。
         */
        o(): Runtime.IResource {
            return (<HLImage> this.$q('HLImage')[0] || this._o).o();
        }

        /**
         * 设置地图（模板）。
         */
        sM(id: string): void {
            this._m = id;
        }

        /**
         * 获取横轴座标值。
         */
        gX(): number {
            return (<Region> this.$q('Region')[0] || this._o).gX();
        }

        /**
         * 获取纵轴座标值。
         */
        gY(): number {
            return (<Region> this.$q('Region')[0] || this._o).gY();
        }

        /**
         * 获取深轴座标值。
         */
        gZ(): number {
            return (<Region> this.$q('Region')[0] || this._o).gZ();
        }

        /**
         * 获取宽度值。
         */
        gW(): number {
            return (<Region> this.$q('Region')[0] || this._o).gW();
        }

        /**
         * 获取高度值。
         */
        gH(): number {
            return (<Region> this.$q('Region')[0] || this._o).gH();
        }

        /**
         * 获取相关房间。
         */
        gR(): DefRoom {
            var obj = <Target> this.$q('Target')[0] || this._o;
            if (obj)
                return obj.gR();
            throw new E(E.DEF_MAP_TARGET_NOT_FOUND, this._l);
        }
    }
}
