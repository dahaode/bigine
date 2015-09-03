/**
 * 定义（运行时）抽象事件组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_Event/Event.ts
 */

/// <reference path="IEventMetas.ts" />
/// <reference path="../../Util/_Iterator/_iterator.ts" />

module Core {
    export class Event<T> {
        /**
         * 触发对象。
         */
        target: T;

        /**
         * 构造函数。
         */
        constructor(metas: IEventMetas<T>) {
            Util.each(metas, (value, key) => {
                this[key] = value;
            });
        }

        /**
         * 获取类型。
         */
        gT(): string {
            return '';
        }
    }
}
