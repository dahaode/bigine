/**
 * 定义神态动画动作标签组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Director/Expression.ts
 */

/// <reference path="../../Action.ts" />

namespace Tag {
    export class Expression extends Action {
        /**
         * 神态动画名。
         */
        private _a: string;

        /**
         * 构造函数。
         */
        constructor(params: string[], content: string, children: Unknown[], lineNo?: number) {
            super(params, content, children, lineNo);
            switch (params[0]) {
                case '渐变':
                    this._a = 'Gradient';
                    break;
                case '默认':
                case undefined:
                    this._a = undefined;
                    break;
                default:
                    throw new E(E.TAG_PARAMS_NOT_TRUE, lineNo);
            }
        }
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'Expression';
        }

        /**
         * 执行。
         */
        public p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime> {
            var states: Core.IStates = runtime.gS(),
                curtain: string = states.g('_rb');
            if (curtain == this._a)
                return runtime;
            this._a ? states.s('_rb', this._a) : states.d('_rb');
            return runtime.gD().expression(this._a);
        }
    }
}
