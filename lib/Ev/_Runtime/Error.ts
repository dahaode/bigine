/**
 * 定义（运行时）异常事件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/Error.ts
 */

/// <reference path="../Event.ts" />
/// <reference path="IErrorMetas.ts" />

namespace Ev {
    export class Error extends Event<any> {
        /**
         * 异常。
         */
        public error: Error;

        /**
         * 构造函数。
         */
        constructor(metas: IErrorMetas) {
            super(metas);
            this.error = metas.error;
        }

        /**
         * 获取类型。
         */
        public gT(): string {
            return 'error';
        }
    }
}
