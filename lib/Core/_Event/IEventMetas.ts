/**
 * 声明（运行时）事件元信息接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_Event/IEventMetas.ts
 */

/// <reference path="../../../include/tsd.d.ts" />

namespace Core {
    import Util = __Bigine_Util;

    export interface IEventMetas<T> extends Util.IHashTable<any> {
        /**
         * 触发对象。
         */
        target: T;
    }
}
