/**
 * 定义（画面调度）选择事件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/Choose.ts
 */

/// <reference path="../Event.ts" />
/// <reference path="IChooseMetas.ts" />

namespace Ev {
    export class Choose extends Event<Core.IChoose> {
        /**
         * 选择项。
         */
        public choice: Core.IOptionTag;

        /**
         * 构造函数。
         */
        constructor(metas: IChooseMetas) {
            super(metas);
            this.choice = metas.choice;
        }

        /**
         * 获取类型。
         */
        public gT(): string {
            return 'choose';
        }
    }
}
