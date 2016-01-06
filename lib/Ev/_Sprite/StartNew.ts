/**
 * 定义（画面调度）开始菜单新游戏事件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/StartNew.ts
 */

/// <reference path="../Event.ts" />
/// <reference path="IStartNewMetas.ts" />

namespace Ev {
    export class StartNew extends Event<Core.IStart> {
        /**
         * 构造函数。
         */
        constructor(metas: IStartNewMetas) {
            super(metas);
        }

        /**
         * 获取类型。
         */
        public gT(): string {
            return 'start.new';
        }
    }
}
