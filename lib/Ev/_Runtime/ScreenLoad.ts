/**
 * 定义（运行时）弹出 / 关闭读档提示 数据事件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/ScreenLoad.ts
 */

/// <reference path="../Event.ts" />
/// <reference path="IScreenLoadMetas.ts" />

namespace Ev {
    export class ScreenLoad extends Event<Core.IStates> {
        /**
         * open / close。
         */
        private type: string;

        /**
         * 构造函数。
         */
        constructor(metas: IScreenLoadMetas) {
            super(metas);
            this.type = metas.type;
        }

        /**
         * 获取类型。
         */
        public gT(): string {
            return 'screen.load';
        }
    }
}
