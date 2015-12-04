/**
 * 定义定义选择动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Flow/DefOptions.ts
 */

/// <reference path="../../Action.ts" />
/// <reference path="Option.ts" />

namespace Tag {
    import Util = __Bigine_Util;

    export class DefOptions extends Action {
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'DefOptions';
        }

        /**
         * 执行。
         */
        public p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime> {
            var opts: Option[] = [];
            Util.each(this._s, (tag: Unknown) => {
                opts.push(Option.f(tag));
            });
            runtime.gS().s('$_' + this._c, opts);
            return runtime;
        }
    }
}
