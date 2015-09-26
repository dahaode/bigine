/**
 * 定义（运行时）（播放准备）就绪事件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Runtime/Event/Ready.ts
 */

/// <reference path="Event.ts" />
/// <reference path="IReadyMetas.ts" />

namespace Runtime {
    export namespace Event {
        export class Ready extends Event<Core.IEpisode> {
            /**
             * 构造函数。
             */
            constructor(metas: IReadyMetas) {
                super(metas);
            }

            /**
             * 获取类型。
             */
            public gT(): string {
                return 'ready';
            }
        }
    }
}
