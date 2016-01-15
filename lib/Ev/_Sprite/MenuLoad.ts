/**
 * 定义（画面调度）功能菜单读档事件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/MenuLoad.ts
 */

/// <reference path="../Event.ts" />
/// <reference path="IMenuLoadMetas.ts" />

namespace Ev {
    export class MenuLoad extends Event<Core.IMenu> {
        /**
         * 构造函数。
         */
        constructor(metas: IMenuLoadMetas) {
            super(metas);
        }

        /**
         * 获取类型。
         */
        public gT(): string {
            return 'menu.load';
        }
    }
}
