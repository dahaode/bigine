/**
 * 定义（作品事件）条件标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Structure/_Scene/Conditions.ts
 */

/// <reference path="../../_Action/Action.ts" />

namespace Tag {
    'use strict';

    export class Conditions extends Unknown implements IAssertable {
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'Conditions';
        }

        /**
         * 检查。
         */
        public t(states: Runtime.IStates): boolean {
            return Util.every(this._s, (condition: Action) => condition.t(states));
        }
    }
}
