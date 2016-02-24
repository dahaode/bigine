/**
 * 定义[增加元素]动作标签组件。
 *
 * @author    姚尧 <yyao@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Logic/CollPush.ts
 */

/// <reference path="../../Action.ts" />

namespace Tag {
    import Util = __Bigine_Util;

    export class CollPush extends Action {
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'CollPush';
        }

        /**
         * 执行。
         */
        public p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime> {
            var states: Core.IStates = runtime.gS(),
                collection: Util.IHashTable<any> = states.g(this._p[0]),
                addItem: Util.IHashTable<any> = states.g(this._c),
                type: string = "：";
            // 要证元素的数据类型是否匹配集合的数据类型
            if ('object' != typeof addItem || !(type in addItem) || addItem[type] != collection[type]) {
                throw new E(E.COLL_STRUCT_DISMATCHED, this._l);
            }
            collection[''].push(addItem);
            return runtime;
        }
    }
}
