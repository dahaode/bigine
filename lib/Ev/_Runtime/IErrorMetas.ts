/**
 * 声明（运行时）错误事件元信息接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/IErrorMetas.ts
 */

/// <reference path="../../../include/tsd.d.ts" />

namespace Ev {
    import Util = __Bigine_Util;

    export interface IErrorMetas extends Util.IEventMetas<any> {
        /**
         * 异常。
         */
        error: Error;
    }
}
