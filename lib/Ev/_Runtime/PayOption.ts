/**
 * 定义（运行时）付费数据事件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/PayOption.ts
 */

/// <reference path="Pay.ts" />

namespace Ev {
    export class PayOption extends Pay {
        /**
         * 获取类型。
         */
        public gT(): string {
            return 'pay.option';
        }
    }
}
