/**
 * 声明（画面调度）功能菜单关闭事件元信息接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/IMenuCloseMetas.ts
 */

/// <reference path="../../../include/tsd.d.ts" />
/// <reference path="../../Core/_Sprite/IMenu.ts" />

namespace Ev {
    import Util = __Bigine_Util;

    export interface IMenuCloseMetas extends Util.IEventMetas<Core.IMenu> {
    }
}
