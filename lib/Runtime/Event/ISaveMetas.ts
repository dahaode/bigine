/**
 * 声明（运行时）存档事件元信息接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Runtime/Event/ISaveMetas.ts
 */

/// <reference path="../../Core/_Runtime/IStates.ts" />

namespace Runtime {
    import Util = __Bigine_Util;

    export namespace Event {
        export interface ISaveMetas extends Util.IEventMetas<Core.IStates> {
            /**
             * 数据。
             */
            data: Util.IHashTable<any>;

            /**
             * 是否手动存档。
             */
            manual: boolean;

            /**
             * 回调函数。
             */
            callback: (id: string) => void;
        }
    }
}
