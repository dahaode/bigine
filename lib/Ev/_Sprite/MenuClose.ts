/**
 * 定义（画面调度）功能菜单关闭事件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/MenuClose.ts
 */

/// <reference path="../Event.ts" />
/// <reference path="IMenuCloseMetas.ts" />

namespace Ev {
    export class MenuClose extends Event<Core.IMenu> {
        /**
         * 构造函数。
         */
        constructor(metas: IMenuCloseMetas) {
            super(metas);
        }

        /**
         * 获取类型。
         */
        public gT(): string {
            return 'menu.close';
        }
    }
}
