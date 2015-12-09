/**
 * 声明（运行时）关键帧播报事件元信息接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Runtime/Event/IActionMetas.ts
 */

/// <reference path="../../../include/tsd.d.ts" />
/// <reference path="../../Core/_Tag/IIdableTag.ts" />

namespace Runtime {
    import Util = __Bigine_Util;

    export namespace Event {
        export interface IActionMetas extends Util.IEventMetas<Core.IIdableTag> {
        }
    }
}
