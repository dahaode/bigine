/**
 * 声明（运行时）错误事件元信息接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Runtime/Event/IErrorMetas.ts
 */

/// <reference path="../../Core/_Runtime/IEventMetas.ts" />

namespace Runtime {
    'use strict';

    export namespace Event {
        export interface IErrorMetas extends Core.IEventMetas<any> {
            /**
             * 异常。
             */
            error: Error;
        }
    }
}
