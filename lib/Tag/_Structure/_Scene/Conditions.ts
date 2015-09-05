/**
 * 定义（作品事件）条件标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Structure/_Scene/Conditions.ts
 */

/// <reference path="../../_Action/Action.ts" />

module Tag {
    export class Conditions extends Unknown implements IAssertable {
        /**
         * 获取标签名称。
         */
        gN(): string {
            return SCHEMA.T['Conditions'];
        }

        /**
         * 检查。
         */
        t(states: Runtime.IStates): boolean {
            return Util.every(<Action[]> this._s, (condition) => condition.t(states));
        }
    }
}
