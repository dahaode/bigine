/**
 * 定义选择动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Flow/Choose.ts
 */

/// <reference path="../Action.ts" />
/// <reference path="Option.ts" />

module Tag {
    export class Choose extends Action {
        /**
         * 获取标签名称。
         */
        gN(): string {
            return 'Choose';
        }

        /**
         * 执行。
         */
        p(runtime: Runtime.IRuntime): Runtime.IRuntime | Thenable<Runtime.IRuntime> {
            var opts: Util.IHashTable<Option> = {};
            Util.each(this._s, (tag) => {
                var opt = Option.f(tag, this._p[0]);
                opts[opt.gT()] = opt;
            });
            return runtime.gD().choose(opts);
        }
    }
}
