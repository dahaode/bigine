/**
 * 定义（运行时）打赏事件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/Donate.ts
 */

/// <reference path="Pay.ts" />

namespace Ev {
    export class Donate extends Pay {
        /**
         * 获取类型。
         */
        public gT(): string {
            return 'donate';
        }
    }
}
