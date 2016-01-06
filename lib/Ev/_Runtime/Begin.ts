/**
 * 定义（运行时）开场事件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/Begin.ts
 */

/// <reference path="../Event.ts" />
/// <reference path="IBeginMetas.ts" />

namespace Ev {
    export class Begin extends Event<Core.IEpisode> {
        /**
         * 构造函数。
         */
        constructor(metas: IBeginMetas) {
            super(metas);
        }

        /**
         * 获取类型。
         */
        public gT(): string {
            return 'begin';
        }
    }
}
