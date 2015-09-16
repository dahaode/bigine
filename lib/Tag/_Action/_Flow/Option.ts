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
    'use strict';

    export class Option extends Unknown implements Core.IOptionTag {
        /**
         * 关联状态名称。
         */
        public _k: string;

        /**
         * 类型转换。
         */
        public static f(tag: Unknown, key?: string): Option {
            if ('Unknown' != tag.gN())
                throw new E(E.ACT_OPTION_CAST_FAILURE, tag.gL());
            var opt: Option = new Option([tag.$p(0)], tag.$c(), [], tag.gL());
            opt._k = key;
            return opt;
        }

        /**
         * 获取描述文字。
         */
        public gT(): string {
            return this._c || this._p[0];
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
    }
}
