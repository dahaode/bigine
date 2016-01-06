/**
 * 定义（运行时）抽象事件组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/Event.ts
 */

/// <reference path="../../include/tsd.d.ts" />

namespace Ev {
    import Util = __Bigine_Util;

    export class Event<T> implements Util.IEvent<T> {
        /**
         * 事件触发对象。
         */
        public target: T;

        /**
         * 构造函数。
         */
        constructor(metas: Util.IEventMetas<T>) {
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
