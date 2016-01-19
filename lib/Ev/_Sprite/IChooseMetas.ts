/**
 * 声明（画面调度）选择事件元信息接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/IChooseMetas.ts
 */

/// <reference path="../../../include/tsd.d.ts" />
/// <reference path="../../Core/_Sprite/IChoose.ts" />

namespace Ev {
    import Util = __Bigine_Util;

    export interface IChooseMetas extends Util.IEventMetas<Core.IChoose> {
        /**
         * 选择值。
         */
        choice: Core.IOptionTag;
    }
}
