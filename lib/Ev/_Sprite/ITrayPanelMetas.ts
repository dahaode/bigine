/**
 * 声明（画面调度）常驻按钮面板事件元信息接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/ITrayPanelMetas.ts
 */

/// <reference path="../../../include/tsd.d.ts" />
/// <reference path="../../Core/_Sprite/ITray.ts" />

namespace Ev {
    import Util = __Bigine_Util;

    export interface ITrayPanelMetas extends Util.IEventMetas<Core.ITray> {
    }
}
