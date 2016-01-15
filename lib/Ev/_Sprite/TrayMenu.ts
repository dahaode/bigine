/**
 * 定义（画面调度）常驻按钮菜单事件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/TrayMenu.ts
 */

/// <reference path="../Event.ts" />
/// <reference path="ITrayMenuMetas.ts" />

namespace Ev {
    export class TrayMenu extends Event<Core.ITray> {
        /**
         * 构造函数。
         */
        constructor(metas: ITrayMenuMetas) {
            super(metas);
        }

        /**
         * 获取类型。
         */
        public gT(): string {
            return 'tray.menu';
        }
    }
}
