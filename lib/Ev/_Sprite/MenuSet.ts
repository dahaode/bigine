/**
 * 定义（画面调度）功能菜单设置事件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/MenuSet.ts
 */

/// <reference path="../Event.ts" />
/// <reference path="IMenuSetMetas.ts" />

namespace Ev {
    export class MenuSet extends Event<Core.IMenu> {
        /**
         * 构造函数。
         */
        constructor(metas: IMenuSetMetas) {
            super(metas);
        }

        /**
         * 获取类型。
         */
        public gT(): string {
            return 'menu.set';
        }
    }
}
