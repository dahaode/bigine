/**
 * 定义切幕动画动作标签组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Director/Curtains.ts
 */

/// <reference path="../../Action.ts" />

namespace Tag {
    export class Curtains extends Action {
        /**
         * 切幕动画名。
         */
        private _a: string;

        /**
         * 构造函数。
         */
        constructor(params: string[], content: string, children: Unknown[], lineNo?: number) {
            super(params, content, children, lineNo);
            switch (params[0]) {
                case '淡入淡出':
                    this._a = 'Fade';
                    break;
                case '水平百叶窗':
                    this._a = 'ShutterH';
                    break;
                case '垂直百叶窗':
                    this._a = 'ShutterV';
                    break;
                case '渐变':
                    this._a = 'Gradient';
                    break;
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
            return 'Curtains';
        }

        /**
         * 执行。
         */
        public p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime> {
            var states: Core.IStates = runtime.gS(),
                curtain: string = states.g('_ra');
            if (curtain == this._a)
                return runtime;
            this._a ? states.s('_ra', this._a) : states.d('_ra');
            return runtime.gD().curtain(this._a);
        }
    }
}
