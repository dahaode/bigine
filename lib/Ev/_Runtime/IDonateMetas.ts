/**
 * 声明（运行时）打赏成功元信息接口规范。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/IDonateMetas.ts
 */

/// <reference path="../../Core/_Runtime/IStates.ts" />

namespace Ev {
    import Util = __Bigine_Util;

    export interface IDonateMetas extends Util.IEventMetas<Core.IStates> {
        /**
         * 打赏的萝卜币。
         */
        amount: number;

        /**
         * 打赏成功回调。
         */
        suc: () => void;

        /**
         * 打赏失败回调。
         */
        fail: () => void;
    }
}
