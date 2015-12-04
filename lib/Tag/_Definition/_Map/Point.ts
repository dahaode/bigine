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

namespace Tag {
    export class Point extends Unknown implements Core.IPointTag {
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
                if (!this.$q('HLImage').length) {
                    throw new E(E.DEF_MAP_HLIMAGE_NOT_FOUND, lineNo);
                } else if (!this.$q('Region').length)
                    throw new E(E.DEF_MAP_REGION_NOT_FOUND, lineNo);
        }

        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'Point';
        }

        /**
         * 绑定（运行时）作品（实体）。
         */
        public $b(ep: Core.IEpisode): void {
            if (this._m && this._p[0])
                this._o = (<DefMap> ep.q(this._m, Core.IEpisode.Entity.Map, this._l)).gP(this._p[0]);
        }

        /**
         * 交互逻辑。
         */
        public p(runtime: Core.IRuntime): void {
            var room: DefRoom = this.gR();
            (<Promise<Core.IRuntime>> Enter.prototype.p.call({
                _p: [room.gI()],
                _mo: room
            }, runtime))['catch'](E.ignoreHalt);
        }

        /**
         * 获取唯一编号。
         */
        public gI(): string {
            return this._c;
        }

        /**
         * 获取高亮图资源。
         */
        public o(): Core.IResource<HTMLImageElement> {
            return (<HLImage> this.$q('HLImage')[0] || this._o).o();
        }

        /**
         * 设置地图（模板）。
         */
        public sM(id: string): void {
            this._m = id;
        }

        /**
         * 获取横轴座标值。
         */
        public gX(): number {
            return (<Region> this.$q('Region')[0] || this._o).gX();
        }

        /**
         * 获取纵轴座标值。
         */
        public gY(): number {
            return (<Region> this.$q('Region')[0] || this._o).gY();
        }

        /**
         * 获取深轴座标值。
         */
        public gZ(): number {
            return (<Region> this.$q('Region')[0] || this._o).gZ();
        }

        /**
         * 获取宽度值。
         */
        public gW(): number {
            return (<Region> this.$q('Region')[0] || this._o).gW();
        }

        /**
         * 获取高度值。
         */
        public gH(): number {
            return (<Region> this.$q('Region')[0] || this._o).gH();
        }

        /**
         * 获取相关房间。
         */
        public gR(): DefRoom {
            var obj: Point | Target = <Target> this.$q('Target')[0] || this._o;
            if (obj)
                return obj.gR();
            throw new E(E.DEF_MAP_TARGET_NOT_FOUND, this._l);
        }
    }
}
