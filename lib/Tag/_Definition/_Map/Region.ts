/**
 * 定义（地图交互点）区域标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Definition/_Map/Region.ts
 */

/// <reference path="../../Unknown.ts" />

namespace Tag {
    import Util = __Bigine_Util;

    export class Region extends Unknown {
        /**
         * 座标。
         */
        private _a: Util.IHashTable<number>;

        /**
         * 构造函数。
         */
        constructor(params: string[], content: string, children: Unknown[], lineNo?: number) {
            super(params, content, children, lineNo);
            this._a = {};
            var p: string[] = content.split('，');
            if (4 > p.length || 5 < p.length)
                throw new E(E.DEF_MAP_REGION_BROKEN, lineNo);
            this._a['x'] = 0 | (<any> p[3]) / 1.5;
            this._a['y'] = 0 | (<any> p[0]) / 1.5;
            this._a['w'] = 1280 - this._a['x'] - (0 | (<any> p[1]) / 1.5);
            this._a['h'] = 720 - this._a['y'] - (0 | (<any> p[2]) / 1.5);
            this._a['z'] = ((<any> p[4]) || 0) - 0;
        }

        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'Region';
        }

        /**
         * 获取横轴座标值。
         */
        public gX(): number {
            return this._a['x'];
        }

        /**
         * 获取纵轴座标值。
         */
        public gY(): number {
            return this._a['y'];
        }

        /**
         * 获取深轴座标值。
         */
        public gZ(): number {
            return this._a['z'];
        }

        /**
         * 获取宽度值。
         */
        public gW(): number {
            return this._a['w'];
        }

        /**
         * 获取高度值。
         */
        public gH(): number {
            return this._a['h'];
        }
    }
}
