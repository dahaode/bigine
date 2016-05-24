/**
 * 声明（运行时）付款数据元信息接口规范。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/IPayMetas.ts
 */

/// <reference path="../../Core/_Runtime/IStates.ts" />

namespace Ev {
    import Util = __Bigine_Util;

    export interface IPayMetas extends Util.IEventMetas<Core.IStates> {
        /**
         * 付费多少萝卜币。
         */
        amount: number;

        /**
         * 选项id，唯一标识。
         */
        id: string;

        /**
         * 付费成功回调。
         */
        suc: () => void;

        /**
         * 付费失败回调。
         */
        fail: () => void;
    }
}
