/**
 * 定义（运行时）开场事件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Runtime/Event/Begin.ts
 */

/// <reference path="../../Core/Event.ts" />
/// <reference path="IBeginMetas.ts" />

module Runtime.Event {
    export class Begin extends Core.Event<IEpisode> {
        /**
         * 构造函数。
         */
        constructor(metas: IBeginMetas) {
            super(metas);
        }

        /**
         * 获取类型。
         */
        gT(): string {
            return 'begin';
        }
    }
}
