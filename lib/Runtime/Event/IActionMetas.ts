/**
 * 声明（运行时）关键帧播报事件元信息接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Runtime/Event/IActionMetas.ts
 */

/// <reference path="../../Core/_Event/IEventMetas.ts" />
/// <reference path="../../Core/_Tag/IIdableTag.ts" />

namespace Runtime {
    export namespace Event {
        export interface IActionMetas extends Core.IEventMetas<Core.IIdableTag> {
        }
    }
}
