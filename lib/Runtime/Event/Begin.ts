/**
 * 定义（运行时）开场事件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Runtime/Event/Begin.ts
 */

/// <reference path="Event.ts" />
/// <reference path="IBeginMetas.ts" />

namespace Runtime {
    export namespace Event {
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
}
