/**
 * 声明（运行时）数据变化时向外暴露元信息接口规范。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/IStateMetas.ts
 */

/// <reference path="../../Core/_Runtime/IStates.ts" />

namespace Ev {
    import Util = __Bigine_Util;

    export interface IStateMetas extends Util.IEventMetas<Core.IStates> {
        /**
         * 向外暴露的数据。
         */
        data: Util.IHashTable<any>;
    }
}
