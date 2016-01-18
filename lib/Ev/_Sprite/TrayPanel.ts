/**
 * 定义（画面调度）常驻按钮面板事件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/TrayPanel.ts
 */

/// <reference path="../Event.ts" />
/// <reference path="ITrayPanelMetas.ts" />

namespace Ev {
    export class TrayPanel extends Event<Core.ITray> {
        /**
         * 构造函数。
         */
        constructor(metas: ITrayPanelMetas) {
            super(metas);
        }

        /**
         * 获取类型。
         */
        public gT(): string {
            return 'tray.panel';
        }
    }
}
