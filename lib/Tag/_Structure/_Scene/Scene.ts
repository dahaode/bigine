/**
 * 定义（作品）事件标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Structure/_Scene/Scene.ts
 */

/// <reference path="Type.ts" />
/// <reference path="Conditions.ts" />
/// <reference path="Content.ts" />

namespace Tag {
    export class Scene extends Unknown implements Core.ISceneTag {
        /**
         * 唯一编号。
         */
        private _i: string;

        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'Scene';
        }

        /**
         * 绑定（运行时）作品（实体）。
         */
        public $b(ep: Core.IEpisode): void {
            ((<Type> this.$q('Type')[0]).gR() || ep).a(this);
        }

        /**
         * 转化为运行时（Javascript）代码。
         */
        public toJsrn(): string {
            var clob: string = super.toJsrn();
            return clob.substr(0, clob.length - 1) + ',"' + this._i + '")';
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
         * 执行。
         */
        public p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime> {
            var conds: Conditions = <Conditions> this.$q('Conditions')[0],
                content: Content;
            if (conds && !conds.t(runtime.gS()))
                return runtime;
            content = <Content> this.$q('Content')[0];
            runtime.s(this, this._c, content.a());
            return content.p(runtime);
        }

        /**
         * 获取类型。
         */
        public gT(): Core.ISceneTag.Type {
            return (<Type> this.$q('Type')[0]).gT();
        }
    }
}
