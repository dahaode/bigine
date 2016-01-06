/**
 * 声明（运行时）查询存档数据事件元信息接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/IQueryMetas.ts
 */

/// <reference path="../../Core/_Runtime/IStates.ts" />

namespace Ev {
    import Util = __Bigine_Util;

    export interface IQueryMetas extends Util.IEventMetas<Core.IStates> {
        /**
         * 数据导入回调函数。
         */
        callback: (slots: Util.IHashTable<[string, number]>) => void;
    }
}
