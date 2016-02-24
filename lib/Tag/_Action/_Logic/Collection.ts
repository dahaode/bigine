/**
 * 定义[定义集合]动作标签组件。
 *
 * @author    姚尧 <yyao@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Logic/Collection.ts
 */

/// <reference path="../../Action.ts" />

namespace Tag {
    import Util = __Bigine_Util;

    export class Collection extends Action {
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'Collection';
        }

        /**
         * 执行。
         */
        public p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime> {
            var states: Core.IStates = runtime.gS(),
                type: string = '：',
                coll: Util.IHashTable<any> = {
                    '：': this._p[0],
                    '': []
                },
                obj: Util.IHashTable<any>;
            Util.each(this._s, (child: Unknown) => {
                obj = states.g(child.$p(0));
                if ('object' != typeof obj || !(type in obj) || obj[type] != this._p[0]) {
                    throw new E(E.COLL_STRUCT_DISMATCHED, this._l);
                }
                coll[''].push(obj);
            });
            states.s(this._c, coll);
            return runtime;
        }
    }
}
