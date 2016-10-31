/**
 * 声明（画面调度）功能菜单重新开始事件元信息接口规范。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/IMenuReplayMetas.ts
 */

/// <reference path="../../../include/tsd.d.ts" />
/// <reference path="../../Core/_Sprite/IMenu.ts" />

namespace Ev {
    import Util = __Bigine_Util;

    export interface IMenuReplayMetas extends Util.IEventMetas<Core.IMenu> {
    }
}
