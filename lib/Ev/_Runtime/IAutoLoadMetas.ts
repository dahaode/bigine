/**
 * 声明（运行时）自动读档数据元信息接口规范。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/IAutoLoadMetas.ts
 */

/// <reference path="../../Core/_Runtime/IStates.ts" />

namespace Ev {
    import Util = __Bigine_Util;

    export interface IAutoLoadMetas extends Util.IEventMetas<Core.IStates> {
		/**
		 * 是否验证通过。
		 */
        valid: boolean;
    }
}
