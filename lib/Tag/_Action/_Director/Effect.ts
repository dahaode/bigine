/**
 * 定义特效动画动作标签组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Director/Effect.ts
 */

/// <reference path="../../Action.ts" />

namespace Tag {
    export class Effect extends Action {
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'Effect';
        }

        /**
         * 执行。
         */
        public p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime> {
            var states: Core.IStates = runtime.gS(),
                onoff: boolean = this._p[0] == '开',
                name: string = '_ef',
                exist: string = states.g(name);
            if (onoff == (exist != undefined))
                return runtime;
            onoff ? states.s(name, this._c) : states.d(name);
            return runtime.gD().effect(onoff, this._c);
        }
    }
}
