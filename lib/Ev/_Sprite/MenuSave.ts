/**
 * 定义（画面调度）功能菜单存档事件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/MenuSave.ts
 */

/// <reference path="../Event.ts" />
/// <reference path="IMenuSaveMetas.ts" />

namespace Ev {
    export class MenuSave extends Event<Core.IMenu> {
        /**
         * 构造函数。
         */
        constructor(metas: IMenuSaveMetas) {
            super(metas);
        }

        /**
         * 获取类型。
         */
        public gT(): string {
            return 'menu.save';
        }
    }
}
