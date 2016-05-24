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
            var opts: Option[] = [],
                states: Core.IStates = runtime.gS();
            Util.each(this._s, (tag: Unknown) => {
                if ('i' in tag) {
                    let isPay: boolean = states.qp((<Option> tag).gI(), (<Option> tag).gM());
                    (<Option> tag).sA(isPay);
                    opts.push(<Option> tag);
                } else {
                    opts.push(Option.f(tag));
                }
            });
            runtime.gS().s('$_' + this._c, opts);
            return runtime;
        }
    }
}
