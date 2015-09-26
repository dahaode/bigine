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
    export class Content extends Unknown implements Core.IPerformableTag {
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'Content';
        }

        /**
         * 执行。
         */
        public p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime> {
            var director: Core.IDirector = runtime.gD();
            runtime.gS().s('$d', 1);
            return director.c(<Core.IResource<string | HTMLImageElement>[][]> Loop.prototype.c.call(this))
                .then(() => Util.Q.every(this._s, (action: Action) => action.p(runtime)));
        }

        /**
         * 获取关键动作编号列表。
         */
        public a(): string[] {
            return Loop.prototype.a.call(this);
        }
    }
}
