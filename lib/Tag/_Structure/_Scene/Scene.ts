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
    'use strict';

    export class Scene extends Unknown implements IScene {
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
        public $b(ep: Runtime.IEpisode): void {
            ((<Type> this.$q('Type')[0]).gR() || ep).a(this);
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
        public p(runtime: Runtime.IRuntime): Runtime.IRuntime | Thenable<Runtime.IRuntime> {
            var conds: Conditions = <Conditions> this.$q('Conditions')[0];
            if (!conds || !conds.t(runtime.gS()))
                return runtime;
            return (<Content> this.$q('Content')[0]).p(runtime);
        }

        /**
         * 获取类型。
         */
        public gT(): IScene.Type {
            return (<Type> this.$q('Type')[0]).gT();
        }
    }
}
