/**
 * 定义（作品事件）内容标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Structure/_Scene/Content.ts
 */

/// <reference path="../../_Action/_Logic/Loop.ts" />

namespace Tag {
    'use strict';

    export class Content extends Unknown implements IPerformable {
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'Content';
        }

        /**
         * 执行。
         */
        public p(runtime: Runtime.IRuntime): Runtime.IRuntime | Thenable<Runtime.IRuntime> {
            runtime.gS().s('$d', 1);
            return runtime.gD().c(<Runtime.IResource[][]> Loop.prototype.c.call(this)).then(() => {
                return Util.Q.every(this._s, (action: Action) => action.p(runtime));
            });
        }
    }
}
