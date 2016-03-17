/**
 * 定义停顿动作标签组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Director/Pause.ts
 */

/// <reference path="../../Action.ts" />

namespace Tag {
    export class Pause extends Action {
        /**
         * 人物名称。
         */
        private _ms: number;

        /**
         * 构造函数。
         */
        constructor(params: string[], content: string, children: Unknown[], lineNo?: number) {
            super(params, content, children, lineNo);
            switch (params[0]) {
                case '短':
                    this._ms = 500;
                    break;
                case '中':
                    this._ms = 1000;
                    break;
                case '长':
                    this._ms = 5000;
                    break;
                case undefined:
                    this._ms = 0;
                    break;
                default:
                    throw new E(E.TAG_PARAMS_NOT_TRUE, lineNo);
            }
        }
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'Pause';
        }

        /**
         * 执行。
         */
        public p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime> {
            return runtime.gD().pause(this._ms);
        }
    }
}
