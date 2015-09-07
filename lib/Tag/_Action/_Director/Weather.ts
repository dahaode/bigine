/**
 * 定义设置天气动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Director/Weather.ts
 */

/// <reference path="../Action.ts" />

module Tag {
    export class Weather extends Action {
        /**
         * 获取标签名称。
         */
        gN(): string {
            return 'Weather';
        }

        /**
         * 执行。
         */
        p(runtime: Runtime.IRuntime): Runtime.IRuntime | Thenable<Runtime.IRuntime> {
            runtime.gS().s('_w', this._p[0]);
            return runtime;
        }
    }
}
