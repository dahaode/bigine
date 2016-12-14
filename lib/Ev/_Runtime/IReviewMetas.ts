/**
 * 声明（运行时）需要增加的回看脚本通知事件元信息接口规范。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/IStateMetas.ts
 */

/// <reference path="../../Core/_Runtime/IStates.ts" />

namespace Ev {
    import Util = __Bigine_Util;

    export interface IReviewMetas extends Util.IEventMetas<Core.IStates> {
        /**
         * 类型。
         */
        type: string;
        /**
         * 数据。
         */
        data: Array<string>;
        /**
         * 附加。
         */
        more: string;
    }
}
