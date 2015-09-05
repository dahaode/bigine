/**
 * 定义基于 Promise 的序列调度组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Util/Q.ts
 */

/// <reference path="es6-promise.d.ts" />
/// <reference path="_Iterator/_iterator.ts" />
/// <reference path="Env.ts" />

module Util {
    if (!Env.Window || !('Promise' in window))
        require('es6-promise').polyfill();

    export class Q<T> extends Promise<T> {
        /**
         * catch() 方法的 ES3 别名方法。
         */
        fail<U>(onRejected?: (error: any) => U | Thenable<U>): Q<U> {
            return <Q<U>> this['catch'](onRejected);
        }

        /**
         * 顺序遍历数组。
         */
        static every<U>(array: U[], iterator: IArrayIterator<U, Thenable<any>>, $this?: any): Q<any> {
            $this = $this || array;
            var q: Q<any>;
            each<U>(array, (item, index) => {
                q = index ?
                    <Q<any>> q.then(() => {
                        return iterator.call($this, item, index, array);
                    }) :
                    new Q((resolve) => {
                        resolve(iterator.call($this, item, index, array));
                    });
            });
            return q;
        }
    }
}
