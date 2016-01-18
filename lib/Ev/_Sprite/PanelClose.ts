/**
 * 定义（画面调度）面板关闭事件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/PanelClose.ts
 */

/// <reference path="../Event.ts" />
/// <reference path="IPanelCloseMetas.ts" />

namespace Ev {
    export class PanelClose extends Event<Core.IPanel> {
        /**
         * 构造函数。
         */
        constructor(metas: IPanelCloseMetas) {
            super(metas);
        }

        /**
         * 获取类型。
         */
        public gT(): string {
            return 'panel.close';
        }
    }
}
