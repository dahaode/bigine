/**
 * 定义评分标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Flow/Stars.ts
 */

/// <reference path="../../Action.ts" />
/// <reference path="../../../Core/_Runtime/IDirector.ts" />

namespace Tag {
    export class Stars extends Action {
        /**
         * 星级。
         */
        private _ms: Core.IDirector.Stars;

        /**
         * 星级拼音。
         */
        private _mp: string;

        /**
         * 数据值。
         */
        private _mv: string;

        /**
         * 构造函数。
         */
        constructor(params: string[], content: string, children: Unknown[], lineNo?: number) {
            super(params, content, children, lineNo);
            var stars: typeof Core.IDirector.Stars = Core.IDirector.Stars;
            switch (params[0]) {
                case '及格':
                    this._ms = stars.OK;
                    this._mp = 'jige';
                    break;
                case '优秀':
                    this._ms = stars.Awesome;
                    this._mp = 'youxiu';
                    break;
                case '完美':
                    this._ms = stars.Perfect;
                    this._mp = 'wanmei';
                    break;
                case '超绝':
                    this._ms = stars.Superb;
                    this._mp = 'chaojue';
                    break;
                case '传奇':
                    this._ms = stars.Legend;
                    this._mp = 'chuanqi';
                    break;
                default:
                    throw new E(E.ACT_ILLEGAL_STARS, lineNo);
            }
            this._mv = params[1] || '';
        }

        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'Stars';
        }

        /**
         * 执行。
         */
        public p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime> {
            return runtime.gD().stars(this._ms, this._mp, this._mv);
        }
    }
}
