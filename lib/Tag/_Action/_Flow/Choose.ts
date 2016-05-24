/**
 * 定义选择动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Flow/Choose.ts
 */

/// <reference path="../../Action.ts" />
/// <reference path="Option.ts" />

namespace Tag {
    import Util = __Bigine_Util;

    export class Choose extends Action {
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'Choose';
        }

        /**
         * 构造函数。
         */
        constructor(params: string[], content: string, children: Unknown[], lineNo?: number) {
            if (!children.length && !content.length)
                throw new E(E.OPT_OPTIONS_MISSING, lineNo);
            if (children.length && content)
                throw new E(E.OPT_OPTIONS_CONFLICT, lineNo);
            super(params, content, children, lineNo);
        }

        /**
         * 执行。
         */
        public p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime> {
            var opts: Option[],
                states: Core.IStates = runtime.gS();
            if (this._c) {
                opts = runtime.gS().g('$_' + this._c) || [];
                Util.each(opts, (option: Option) => {
                    if ('i' in option && option.gI())
                        option.sA(states.qp(option.gI(), option.gM()));
                });
                if (this._p[0])
                    Util.each(opts, (option: Option) => {
                        option.sK(this._p[0]);
                    });
            } else {
                opts = [];
                Util.each(this._s, (tag: Unknown) => {
                    if ('i' in tag) {
                        let isPay: boolean = states.qp((<Option> tag).gI(), (<Option> tag).gM());
                        (<Option> tag).sA(isPay);
                        opts.push(<Option> tag);
                    } else {
                        opts.push(Option.f(tag).sK(this._p[0]));
                    }
                });
            }
            if (opts.length)
                return runtime.gD().choose(opts);
            return runtime;
        }
    }
}
