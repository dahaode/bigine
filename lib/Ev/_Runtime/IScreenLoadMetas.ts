/**
 * 声明（运行时）弹出 / 关闭读档提示 数据元信息接口规范。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/IScreenLoadMetas.ts
 */

/// <reference path="../../Core/_Runtime/IStates.ts" />

namespace Ev {
    import Util = __Bigine_Util;

    export interface IScreenLoadMetas extends Util.IEventMetas<Core.IStates> {
		/**
		 * open / close。
		 */
        type: string;
    }
}
