/**
 * 定义（作品事件）内容标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Structure/_Scene/Content.ts
 */

/// <reference path="../../_Action/Action.ts" />

module Tag {
    export class Content extends Unknown implements IPerformable {
        /**
         * 获取标签名称。
         */
        gN(): string {
            return SCHEMA.T['Content'];
        }

        /**
         * 执行。
         */
        p(runtime: Runtime.IRuntime): Util.Q<Runtime.IRuntime> {
            return Util.Q.every(<Action[]> this._s, (action) => action.p(runtime));
        }
    }
}
