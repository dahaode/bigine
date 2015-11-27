/**
 * 定义添加选项动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Flow/AddOption.ts
 */

/// <reference path="../../Action.ts" />
/// <reference path="Option.ts" />

namespace Tag {
    export class AddOption extends Action {
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'AddOption';
        }

        /**
         * 执行。
         */
        public p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime> {
            var states: Core.IStates = runtime.gS(),
                key: string = '$_' + this._p[0],
                opts: Option[] = states.g(key) || [];
            opts.push(new Option([this._p[1]], this._c || this._p[1], [], this._l));
            states.s(key, opts);
            return runtime;
        }
    }
}
