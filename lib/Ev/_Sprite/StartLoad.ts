/**
 * 定义（画面调度）开始菜单继续游戏事件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/StartLoad.ts
 */

/// <reference path="../Event.ts" />
/// <reference path="IStartLoadMetas.ts" />

namespace Ev {
    export class StartLoad extends Event<Core.IStart> {
        /**
         * 构造函数。
         */
        constructor(metas: IStartLoadMetas) {
            super(metas);
        }

        /**
         * 获取类型。
         */
        public gT(): string {
            return 'start.load';
        }
    }
}
