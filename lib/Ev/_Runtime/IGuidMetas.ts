/**
 * 声明（运行时）新手引导数据元信息接口规范。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/IPayMetas.ts
 */

/// <reference path="../../Core/_Runtime/IStates.ts" />

namespace Ev {
    import Util = __Bigine_Util;

    export interface IGuidMetas extends Util.IEventMetas<Core.IStates> {
        /**
         * 新手引导完成回调。
         */
        continue: () => void;
        /**
         * 新手引导开始回调。
         */
        pause: () => void;
    }
}
