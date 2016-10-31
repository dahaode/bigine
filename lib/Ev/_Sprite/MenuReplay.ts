/**
 * 定义（画面调度）功能菜单重新开始事件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/MenuReplay.ts
 */

/// <reference path="../Event.ts" />
/// <reference path="IMenuReplayMetas.ts" />

namespace Ev {
    export class MenuReplay extends Event<Core.IMenu> {
        /**
         * 构造函数。
         */
        constructor(metas: IMenuReplayMetas) {
            super(metas);
        }

        /**
         * 获取类型。
         */
        public gT(): string {
            return 'menu.replay';
        }
    }
}
