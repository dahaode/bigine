/**
 * 定义[删除元素]动作标签组件。
 *
 * @author    姚尧 <yyao@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Logic/CollPop.ts
 */

/// <reference path="../../Action.ts" />

namespace Tag {
    import Util = __Bigine_Util;

    export class CollPop extends Action {
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'CollPop';
        }

        /**
         * 执行。
         */
        public p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime> {
            var states: Core.IStates = runtime.gS(),
                coll: Array<Util.IHashTable<any>> = states.g(this._p[0])[''],
                delItem: Util.IHashTable<any> = states.g(this._c);
            Util.every(coll, (item: Util.IHashTable<any>, index: number) => {
                if (delItem == item) {
                    coll.splice(index, 1);
                    return false;
                }
                return true;
            });
            return runtime;
        }
    }
}
