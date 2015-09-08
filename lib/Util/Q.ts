/**
 * 定义基于 Promise 的序列调度组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Util/Q.ts
 */

/// <reference path="node.d.ts" />
/// <reference path="es6-promise.d.ts" />
/// <reference path="../E.ts" />
/// <reference path="_iterator.ts" />

require('es6-promise').polyfill();

module Util {
    export module Q {
        /**
         * 中断顺序时序流。
         */
        export function doHalt<T>(): Promise<T> {
            return Promise.reject<T>(new E('', E.Signal.HALT));
        }

        /**
         * 忽略中断信号。
         */
        export function ignoreHalt(error: E): Promise<void> {
            if (E.Signal.HALT == error.signal)
                return Promise.resolve();
            return Promise.reject(error);
        }

        /**
         * 中断循环时序流。
         */
        export function doBreak<T>(): Promise<T> {
            return Promise.reject<T>(new E('', E.Signal.BREAK));
        }

        /**
         * 忽略循环中断信号。
         */
        export function ignoreBreak(error: E): Promise<void> {
            if (E.Signal.BREAK == error.signal)
                return Promise.resolve();
            return Promise.reject(error);
        }

        /**
         * 顺序遍历数组。
         */
        export function every<T, U>(array: T[], iterator: IArrayIterator<T, U | Thenable<U>>, $this?: any): Promise<U> {
            $this = $this || array;
            var q: Promise<U>;
            each(array, (element, index) => {
                q = index ?
                    q.then(() => iterator.call($this, element, index, array)) :
                    new Promise((resolve) => {
                        resolve(iterator.call($this, element, index, array));
                    });
            });
            return q;
        }
    }
}
