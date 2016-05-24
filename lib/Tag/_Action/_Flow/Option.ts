/**
 * 定义选项动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Flow/Option.ts
 */

/// <reference path="../../Unknown.ts" />
/// <reference path="../../../Core/_Tag/IOptionTag.ts" />

namespace Tag {
    export class Option extends Unknown implements Core.IOptionTag {
        /**
         * 关联状态名称。
         */
        protected _k: string;

        /**
         * 唯一编号。
         */
        protected _i: string;

        /**
         * 是否已付费。
         */
        protected _a: boolean;

        /**
         * 类型转换。
         */
        public static f(tag: Unknown): Option {
            if ('Unknown' != tag.gN())
                throw new E(E.ACT_OPTION_CAST_FAILURE, tag.gL());
            let opt: Option = new Option([tag.$p(0)], tag.$c(), [], tag.gL());
            return opt;
        }

        /**
         * 获取描述文字。
         */
        public gT(): string {
            return this._c || this._p[0];
        }

        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'Option';
        }

        /**
         * 交互逻辑。
         */
        public p(runtime: Core.IRuntime): void {
            var states: Core.IStates = runtime.gS(),
                depth: number = states.g('$d'),
                kv: string = '$v' + depth;
            states.s(kv, this.$v(this._p[0]))
                .s('$t' + depth, false);
            if (this._k)
                states.c(kv, this._k);
        }

        /**
         * 设置状态键名。
         */
        public sK(key: string): Option {
            this._k = key;
            return this;
        }

        /**
         * 获取萝卜币。
         */
        public gM(): number {
            return parseInt(this._p[1], 10) || 0;
        }

        /**
         * 设置是否付费信息。
         */
        public sA(is: boolean): Option {
            this._a = is;
            return this;
        }

        /**
         * 获取是否付费信息。
         */
        public gA(): boolean {
            return this._a;
        }

        /**
         * 获取编号。
         */
        public gI(): string {
            return this._i;
        }

        /**
         * 恢复编号。
         */
        public i(id: string): void {
            this._i = id;
        }

        /**
         * 转化为运行时（Javascript）代码。
         */
        public toJsrn(): string {
            var clob: string = super.toJsrn();
            return this._p[1] ? clob.substr(0, clob.length - 1) + ',"' + this._i + '")' : clob;
        }
    }
}
