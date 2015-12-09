/**
 * 定义（运行时）抽象事件组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Runtime/Event/Event.ts
 */

/// <reference path="../../../include/tsd.d.ts" />

namespace Runtime {
    import Ev = __Bigine_Event;

    export namespace Event {
        export class Event<T> implements Ev.IEvent<T> {
            /**
             * 事件触发对象。
             */
            public target: T;

            /**
             * 构造函数。
             */
            constructor(metas: Ev.IEventMetas<T>) {
                this.target = metas.target;
            }

            /**
             * 获取类型。
             */
            public gT(): string {
                return '';
            }
        }
    }
}
