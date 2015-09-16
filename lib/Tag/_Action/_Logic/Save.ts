/**
 * 定义自动存档动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Logic/Save.ts
 */

/// <reference path="../Action.ts" />

namespace Tag {
    'use strict';

    export class Save extends Action {
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'Save';
        }

        /**
         * 执行。
         */
        public p(runtime: Runtime.IRuntime): Runtime.IRuntime | Thenable<Runtime.IRuntime> {
            var scene: Unknown = this.gU(),
                brief: string = this._p[0];
            if (!brief) {
                while ('Scene' != scene.gN())
                    scene = scene.gU();
                brief = scene.$c();
            }
            runtime.gS().e(brief);
            return runtime;
        }
    }
}
