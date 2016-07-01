/**
 * 定义定义数据动作标签组件。
 *
 * @author    姚尧 <yyao@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Logic/Define.ts
 */

/// <reference path="../../Action.ts" />

namespace Tag {
    import Util = __Bigine_Util;
    export class Define extends Action {
        /**
         * 对应的结构体。
         */
        private _ms: Struct;

        /**
         * 标签定义的数据。
         */
        private _md: Util.IHashTable<any>;

        /**
         * 构造函数。
         */
        constructor(params: string[], content: string, children: Unknown[], lineNo?: number) {
            super(params, content, children, lineNo);
            this._md = {};
            Util.each(children, (child: Unknown) => {
                var fieldName: string = child.$p(0);
                var fieldVal: string = child.$c();
                this._md[fieldName] = fieldVal;
            });
        }

        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'Define';
        }

        /**
         * 绑定（运行时）作品（实体）。
         */
        public $b(ep: Core.IEpisode): void {
            this._ms = <Struct> ep.q(this._p[0], Core.IEpisode.Entity.Struct, this._l);
        }

        /**
         * 执行。
         */
        public p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime> {
            // 如果是继承上一章的数据
            let states: Core.IStates = runtime.gS(),
                field: Util.IHashTable<any> = states.g(this._c);
            if (field) return runtime;
            runtime.gS().s(this._c, this._ms.g(this._md));
            return runtime;
        }
    }
}
