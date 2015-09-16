/**
 * 定义评分标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Flow/Stars.ts
 */

/// <reference path="../Action.ts" />
/// <reference path="../../../Runtime/IDirector.ts" />

namespace Tag {
    'use strict';

    export class Stars extends Action {
        /**
         * 星级。
         */
        private _ms: Runtime.IDirector.Stars;

        /**
         * 构造函数。
         */
        constructor(params: string[], content: string, children: Unknown[], lineNo?: number) {
            super(params, content, children, lineNo);
            var stars: typeof Runtime.IDirector.Stars = Runtime.IDirector.Stars;
            switch (params[0]) {
                case '及格':
                    this._ms = stars.OK;
                    break;
                case '优秀':
                    this._ms = stars.Awesome;
                    break;
                case '完美':
                    this._ms = stars.Perfect;
                    break;
                default:
                    throw new E(E.ACT_ILLEGAL_STARS, lineNo);
            }
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
        public p(runtime: Runtime.IRuntime): Runtime.IRuntime | Thenable<Runtime.IRuntime> {
            return runtime.gD().stars(this._ms);
        }
    }
}
