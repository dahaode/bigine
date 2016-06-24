/**
 * 定义设置数据动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Logic/Increase.ts
 */

/// <reference path="../../Action.ts" />

namespace Tag {
    import Util = __Bigine_Util;

    export class Increase extends Action {
        private _ep: Core.IEpisode;
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'Increase';
        }

        /**
         * 绑定（运行时）作品（实体）。
         */
        public $b(ep: Core.IEpisode): void {
            this._ep = ep;
        }

        /**
         * （执行）检查。
         */
        public t(states: Core.IStates): boolean {
            var depth: number = states.g('$d');
            let sign: string = '／';
            // 如果是设置结构体类型数据中字段值
            if (/^.+／.+$/ig.test(this._p[0])) {
                let vari: string = this._p[0].split(sign)[0];
                let fieldName: string = this._p[0].split(sign)[1];
                let data: Util.IHashTable<any> = states.g(vari);
                let cStruct: Tag.Struct = <Tag.Struct> this._ep.q(data['：'], Core.IEpisode.Entity.Struct);
                // 如果是实体类型字段
                if ('object' == typeof data[fieldName]) {
                    // 取出集合的结构
                    data[fieldName] = this._ep.q(this._c, cStruct.gET(fieldName), this._l);
                } else if ('string' == typeof data[fieldName]) {
                    data[fieldName] = parseInt(data[fieldName], 10) + <number> this.$v(this._c);
                } else if ('number' == typeof data[fieldName]) {
                    data[fieldName] += this.$v(this._c);
                } else {
                    data[fieldName] = this.$v(this._c);
                }
                states.s(vari, data);
            } else {
                states.s(this._p[0], states.g(this._p[0]) + this.$v(this._c))
                    .c(this._p[0], '$v' + depth)
                    .s('$t' + depth, false);
            }
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
