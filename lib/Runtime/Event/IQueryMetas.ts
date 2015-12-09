/**
 * 声明（运行时）查询存档数据事件元信息接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Runtime/Event/IQueryMetas.ts
 */

/// <reference path="../../Core/_Runtime/IStates.ts" />

namespace Runtime {
    import Util = __Bigine_Util;
    import Ev = __Bigine_Event;

    export namespace Event {
        export interface IQueryMetas extends Ev.IEventMetas<Core.IStates> {
            /**
             * 数据导入回调函数。
             */
            callback: (slots: Util.IHashTable<[string, number]>) => void;
        }
    }
}
