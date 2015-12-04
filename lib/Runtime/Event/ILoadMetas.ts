/**
 * 声明（运行时）读档事件元信息接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Runtime/Event/ILoadMetas.ts
 */

/// <reference path="../../Core/_Event/IEventMetas.ts" />
/// <reference path="../../Core/_Runtime/IStates.ts" />

namespace Runtime {
    import Util = __Bigine_Util;

    export namespace Event {
        export interface ILoadMetas extends Core.IEventMetas<Core.IStates> {
            /**
             * 数据导入回调函数。
             */
            callback: (data: Util.IHashTable<any>) => void;

            /**
             * 存档编号。
             */
            id: string;
        }
    }
}
