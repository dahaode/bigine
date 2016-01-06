/**
 * 定义（运行时）完结事件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/End.ts
 */

/// <reference path="../Event.ts" />
/// <reference path="IEndMetas.ts" />

namespace Ev {
    export class End extends Event<Core.IEpisode> {
        /**
         * 构造函数。
         */
        constructor(metas: IEndMetas) {
            super(metas);
        }

        /**
         * 获取类型。
         */
        public gT(): string {
            return 'end';
        }
    }
}
