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
    'use strict';

    export class Choose extends Action {
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'Choose';
        }

        /**
         * 执行。
         */
        public p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime> {
            var opts: Util.IHashTable<Option> = {};
            Util.each(this._s, (tag: Unknown) => {
                var opt: Option = Option.f(tag, this._p[0]);
                opts[opt.gT()] = opt;
            });
            return runtime.gD().choose(opts);
        }
    }
}
