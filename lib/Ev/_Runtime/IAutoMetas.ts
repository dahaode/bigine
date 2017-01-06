/**
 * 声明（运行时）自动播放数据元信息接口规范。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/IAutoMetas.ts
 */

/// <reference path="../../Core/_Runtime/IStates.ts" />

namespace Ev {
    import Util = __Bigine_Util;

    export interface IAutoMetas extends Util.IEventMetas<Core.IStates> {
		/**
		 * 自动播放开关。
		 */
        auto: boolean;
    }
}
