/**
 * 定义（运行时）弹出 / 关闭快速进入下一集提示 数据事件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/ScreenSave.ts
 */

/// <reference path="../Event.ts" />
/// <reference path="IScreenSaveMetas.ts" />

namespace Ev {
    export class ScreenSave extends Event<Core.IStates> {
        /**
         * open / close。
         */
        private type: string;

        /**
         * 构造函数。
         */
        constructor(metas: IScreenSaveMetas) {
            super(metas);
            this.type = metas.type;
        }

        /**
         * 获取类型。
         */
        public gT(): string {
            return 'screen.save';
        }
    }
}
