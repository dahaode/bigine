/**
 * 定义（运行时）付费数据事件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/Pay.ts
 */

/// <reference path="../Event.ts" />
/// <reference path="IPayMetas.ts" />

namespace Ev {
    export class Pay extends Event<Core.IStates> {
        /**
         * 付费多少萝卜。
         */
        private amount: number;

        /**
         * 选项id，唯一标识。
         */
        private id: string;

        /**
         * 付费成功回调。
         */
        private suc: () => void;

        /**
         * 付费失败回调。
         */
        private fail: () => void;

        /**
         * 构造函数。
         */
        constructor(metas: IPayMetas) {
            super(metas);
            this.amount = metas.amount;
            this.suc = metas.suc;
            this.fail = metas.fail;
            this.id = metas.id;
        }

        /**
         * 获取类型。
         */
        public gT(): string {
            return 'pay';
        }
    }
}
