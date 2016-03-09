/**
 * 定义（画面调度）开始菜单继续游戏事件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/StartSeries.ts
 */

/// <reference path="../Event.ts" />
/// <reference path="IStartSeriesMetas.ts" />

namespace Ev {
    export class StartSeries extends Event<Core.IStart> {
        /**
         * 构造函数。
         */
        constructor(metas: IStartSeriesMetas) {
            super(metas);
        }

        /**
         * 获取类型。
         */
        public gT(): string {
            return 'start.series';
        }
    }
}
