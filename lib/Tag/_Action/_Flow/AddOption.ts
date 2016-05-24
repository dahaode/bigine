/**
 * 定义添加选项动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Flow/AddOption.ts
 */

/// <reference path="../../Action.ts" />
/// <reference path="Option.ts" />

namespace Tag {
    export class AddOption extends Action implements Core.IIdableTag {
        /**
         * 唯一编号。
         */
        protected _i: string;

        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'AddOption';
        }

        /**
         * 执行。
         */
        public p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime> {
            var states: Core.IStates = runtime.gS(),
                key: string = '$_' + this._p[0],
                opts: Option[] = states.g(key) || [],
                params: Array<any> = this._p[2] ? [this._p[1], this._p[2]] : [this._p[1]],
                opt: Option = new Option(params, this._c || this._p[1], [], this._l);
            if (this._p[2]) opt.i(this.gI());
            opts.push(opt);
            states.s(key, opts);
            return runtime;
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
            return this._p[2] ? clob.substr(0, clob.length - 1) + ',"' + this._i + '")' : clob;
        }
    }
}
