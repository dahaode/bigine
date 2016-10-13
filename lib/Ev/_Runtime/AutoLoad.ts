/**
 * 定义（运行时）自动读档数据事件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/AutoLoad.ts
 */

/// <reference path="../Event.ts" />
/// <reference path="IAutoLoadMetas.ts" />

namespace Ev {
    export class AutoLoad extends Event<Core.IStates> {
        /**
         * 是否验证通过。
         */
        private valid: boolean;

        /**
         * 构造函数。
         */
        constructor(metas: IAutoLoadMetas) {
            super(metas);
            this.valid = metas.valid;
        }

        /**
         * 获取类型。
         */
        public gT(): string {
            return 'autoload';
        }
    }
}
