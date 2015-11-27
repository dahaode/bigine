/**
 * 定义去除选项动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Flow/DropOption.ts
 */

/// <reference path="../../Action.ts" />
/// <reference path="Option.ts" />

namespace Tag {
    export class DropOption extends Action {
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'DropOption';
        }

        /**
         * 执行。
         */
        public p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime> {
            var states: Core.IStates = runtime.gS(),
                key: string = '$_' + this._p[0],
                opts: Option[] = states.g(key) || [];
            Util.some(opts, (option: Option, index: number) => {
                if (this._p[1] != option.$p(0))
                    return false;
                opts.splice(index, 1);
                return true;
            });
            states.s(key, opts);
            return runtime;
        }
    }
}
