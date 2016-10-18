/**
 * 定义（运行时）付费数据事件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/Guid.ts
 */

/// <reference path="../Event.ts" />
/// <reference path="IGuidMetas.ts" />

namespace Ev {
    export class Guid extends Event<Core.IStates> {
        /**
         * 新手引导完成回调。
         */
        private continue: () => void;

        /**
         * 新手引导开始回调。
         */
        private pause: () => void;

        /**
         * 构造函数。
         */
        constructor(metas: IGuidMetas) {
            super(metas);
            this.continue = metas.continue;
            this.pause = metas.pause;
        }

        /**
         * 获取类型。
         */
        public gT(): string {
            return 'guid';
        }
    }
}
