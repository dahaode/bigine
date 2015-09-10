/**
 * 定义（运行时）（播放准备）就绪事件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Runtime/Event/Ready.ts
 */

/// <reference path="../../Core/Event.ts" />
/// <reference path="IReadyMetas.ts" />

module Runtime.Event {
    export class Ready extends Core.Event<IEpisode> {
        /**
         * 构造函数。
         */
        constructor(metas: IReadyMetas) {
            super(metas);
        }

        /**
         * 获取类型。
         */
        gT(): string {
            return 'ready';
        }
    }
}
