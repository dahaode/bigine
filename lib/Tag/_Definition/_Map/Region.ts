/**
 * 定义（地图交互点）区域标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Definition/_Map/Region.ts
 */

/// <reference path="../../Unknown.ts" />

module Tag {
    export class Region extends Unknown {
        /**
         * 座标。
         */
        private _a: Util.IHashTable<number>;

        /**
         * 构造函数。
         */
        constructor(params: string[], content: string, children: Unknown[], lineNo?: number) {
            this._a = {};
            super(params, content, children, lineNo);
            var p = content.split('，');
            if (4 > p.length || 5 < p.length)
                throw new E(E.DEF_MAP_REGION_BROKEN, lineNo);
            this._a['x'] = parseFloat(p[3]);
            this._a['y'] = parseFloat(p[0]);
            this._a['w'] = 1920 - this._a['x'] - parseFloat(p[1]);
            this._a['h'] = 1080 - this._a['y'] - parseFloat(p[2]);
            this._a['z'] = p[4] ? parseFloat(p[4]) : 0;
        }

        /**
         * 获取标签名称。
         */
        gN(): string {
            return SCHEMA.T['Point'];
        }

        /**
         * 获取横轴座标值。
         */
        gX(): number {
            return this._a['x'];
        }

        /**
         * 获取纵轴座标值。
         */
        gY(): number {
            return this._a['y'];
        }

        /**
         * 获取深轴座标值。
         */
        gZ(): number {
            return this._a['z'];
        }

        /**
         * 获取宽度值。
         */
        gW(): number {
            return this._a['w'];
        }

        /**
         * 获取高度值。
         */
        gH(): number {
            return this._a['h'];
        }
    }
}
