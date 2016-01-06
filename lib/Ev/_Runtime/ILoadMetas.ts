/**
 * 声明（运行时）读档事件元信息接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/ILoadMetas.ts
 */

/// <reference path="../../Core/_Runtime/IStates.ts" />

namespace Ev {
    import Util = __Bigine_Util;

    export interface ILoadMetas extends Util.IEventMetas<Core.IStates> {
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
