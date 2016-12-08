/**
 * 定义作品失败事件动作组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Flow/Lose.ts
 */

/// <reference path="Fail.ts" />

namespace Tag {
    export class Lose extends Fail {
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'Lose';
        }
    }
}
