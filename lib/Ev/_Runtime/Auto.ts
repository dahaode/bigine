/**
 * 定义（运行时）自动播放数据事件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/Auto.ts
 */

/// <reference path="../Event.ts" />
/// <reference path="IAutoMetas.ts" />

namespace Ev {
    export class Auto extends Event<Core.IStates> {
        /**
         * 自动播放开关。
         */
        private auto: boolean;

        /**
         * 构造函数。
         */
        constructor(metas: IAutoMetas) {
            super(metas);
            this.auto = metas.auto;
        }

        /**
         * 获取类型。
         */
        public gT(): string {
            return 'auto';
        }
    }
}
