/**
 * 定义（画面调度）档位菜单读档事件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/SlotsLoad.ts
 */

/// <reference path="../Event.ts" />
/// <reference path="ISlotsLoadMetas.ts" />

namespace Ev {
    export class SlotsLoad extends Event<Core.ISlots> {
        /**
         * 存档编号。
         */
        public id: string;

        /**
         * 构造函数。
         */
        constructor(metas: ISlotsLoadMetas) {
            super(metas);
            this.id = metas.id;
        }

        /**
         * 获取类型。
         */
        public gT(): string {
            return 'slots.load';
        }
    }
}
