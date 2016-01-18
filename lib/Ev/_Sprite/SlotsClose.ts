/**
 * 定义（画面调度）档位菜单关闭事件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/SlotsClose.ts
 */

/// <reference path="../Event.ts" />
/// <reference path="ISlotsCloseMetas.ts" />

namespace Ev {
    export class SlotsClose extends Event<Core.ISlots> {
        /**
         * 构造函数。
         */
        constructor(metas: ISlotsCloseMetas) {
            super(metas);
        }

        /**
         * 获取类型。
         */
        public gT(): string {
            return 'slots.close';
        }
    }
}
