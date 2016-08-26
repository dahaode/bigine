/**
 * 定义（运行时）（loading文件加载完成）就绪事件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/Loading.ts
 */

/// <reference path="../Event.ts" />
/// <reference path="ILoadingMetas.ts" />

namespace Ev {
    export class Loading extends Event<Core.IEpisode> {
        /**
         * 构造函数。
         */
        constructor(metas: ILoadingMetas) {
            super(metas);
        }

        /**
         * 获取类型。
         */
        public gT(): string {
            return 'loading';
        }
    }
}
