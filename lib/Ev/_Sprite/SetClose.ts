/**
 * 定义（画面调度）设置菜单关闭事件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/SetClose.ts
 */

/// <reference path="../Event.ts" />
/// <reference path="ISetCloseMetas.ts" />

namespace Ev {
    export class SetClose extends Event<Core.ISet> {
        /**
         * 构造函数。
         */
        constructor(metas: ISetCloseMetas) {
            super(metas);
        }

        /**
         * 获取类型。
         */
        public gT(): string {
            return 'set.close';
        }
    }
}
