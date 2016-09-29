/**
 * 定义全屏文本动作标签组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Text/FullWords.ts
 */

/// <reference path="../../Action.ts" />

namespace Tag {
    export class FullWords extends Action {
        /**
         * 开关。
         */
        private _a: boolean;

        /**
         * 构造函数。
         */
        constructor(params: string[], content: string, children: Unknown[], lineNo?: number) {
            super(params, content, children, lineNo);
            this._a = params[0] == '开' ? true : false;
        }

        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'FullWords';
        }

        /**
         * 执行。
         */
        public p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime> {
            let states: Core.IStates = runtime.gS(),
                kdir: string = '_f',
                dir: boolean = states.g(kdir);
            if ((this._a && dir) || (!this._a && !dir)) return runtime;
            this._a ? states.s(kdir, true) : states.d('_f');
            return Promise.resolve(super.p(runtime)).then(() =>
                runtime.gD().fullWords(this._a)
            );
        }
    }
}
