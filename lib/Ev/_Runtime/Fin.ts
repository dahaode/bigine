/**
 * 定义剧情结束事件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/Fin.ts
 */

/// <reference path="../Event.ts" />
/// <reference path="IFinMetas.ts" />

namespace Ev {
    export class Fin extends Event<Core.IEpisode> {
        /**
         * 构造函数。
         */
        constructor(metas: IFinMetas) {
            super(metas);
        }

        /**
         * 获取类型。
         */
        public gT(): string {
            return 'fin';
        }
    }
}
