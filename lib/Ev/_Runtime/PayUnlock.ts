/**
 * 定义（运行时）解锁数据事件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/PayUnlock.ts
 */

/// <reference path="Pay.ts" />

namespace Ev {
    export class PayUnlock extends Pay {
        /**
         * 获取类型。
         */
        public gT(): string {
            return 'pay.unlock';
        }
    }
}
