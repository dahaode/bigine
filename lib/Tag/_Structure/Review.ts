/**
 * 定义显示回看动作标签组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Director/Review.ts
 */

/// <reference path="../Action.ts" />

namespace Tag {
    export class Review extends Action {
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'Review';
        }
    }
}
