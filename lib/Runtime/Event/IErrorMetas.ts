/**
 * 声明（运行时）错误事件元信息接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Runtime/Event/IErrorMetas.ts
 */

/// <reference path="../../../include/tsd.d.ts" />

namespace Runtime {
    import Ev = __Bigine_Event;

    export namespace Event {
        export interface IErrorMetas extends Ev.IEventMetas<any> {
            /**
             * 异常。
             */
            error: Error;
        }
    }
}
