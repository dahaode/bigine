/**
 * 定义（运行时）打赏事件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/Donate.ts
 */

/// <reference path="../Event.ts" />
/// <reference path="IDonateMetas.ts" />

namespace Ev {
    export class Donate extends Event<Core.IStates> {
        /**
         * 打赏的数据。
         */
        private amount: number;

        /**
         * 打赏成功回调。
         */
        private suc: () => void;

        /**
         * 打赏失败回调。
         */
        private fail: () => void;

        /**
         * 构造函数。
         */
        constructor(metas: IDonateMetas) {
            super(metas);
            this.amount = metas.amount;
            this.suc = metas.suc;
            this.fail = metas.fail;
        }

        /**
         * 获取类型。
         */
        public gT(): string {
            return 'donate';
        }
    }
}
