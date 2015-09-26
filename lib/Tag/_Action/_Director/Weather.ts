/**
 * 定义设置天气动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Director/Weather.ts
 */

/// <reference path="../../Action.ts" />

namespace Tag {
    export class Weather extends Action {
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'Weather';
        }

        /**
         * 执行。
         */
        public p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime> {
            runtime.gS().s('_w', this._p[0]);
            return runtime;
        }
    }
}
