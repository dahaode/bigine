/**
 * 定义（运行时）抽象事件组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Core/Event.ts
 */

/// <reference path="IEventMetas.ts" />
/// <reference path="../Util/_iterator.ts" />

namespace Core {
    'use strict';

    export class Event<T> {
        /**
         * 触发对象。
         */
        public target: T;

        /**
         * 构造函数。
         */
        constructor(metas: IEventMetas<T>) {
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
