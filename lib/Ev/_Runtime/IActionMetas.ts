/**
 * 声明（运行时）关键帧播报事件元信息接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/IActionMetas.ts
 */

/// <reference path="../../../include/tsd.d.ts" />
/// <reference path="../../Core/_Tag/IIdableTag.ts" />

namespace Ev {
    import Util = __Bigine_Util;

    export interface IActionMetas extends Util.IEventMetas<Core.IIdableTag> {
    }
}
