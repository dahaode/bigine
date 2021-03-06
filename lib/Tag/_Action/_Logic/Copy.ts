/**
 * 定义复制数据动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Logic/Copy.ts
 */

/// <reference path="../../Action.ts" />

namespace Tag {
    import Util = __Bigine_Util;
    export class Copy extends Action {
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'Copy';
        }

        /**
         * （执行）检查。
         */
        public t(states: Core.IStates): boolean {
            var depth: number = states.g('$d');
            var sign: string = '／';
            // 如果是设置结构体类型数据中字段值
            if (/^.+／.+$/ig.test(this._p[1])) {
                let vari: string = this._p[1].split(sign)[0];
                let fieldName: string = this._p[1].split(sign)[1];
                let data: Util.IHashTable<any> = states.g(vari);
                states.s(this._p[0], data[fieldName]);
            } else {
                states.c(this._p[1], this._p[0]);
            }
            states.c(this._p[0], '$v' + depth)
                .s('$t' + depth, false);
            return true;
        }

        /**
         * 执行。
         */
        public p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime> {
            this.t(runtime.gS());
            return runtime;
        }
    }
}
