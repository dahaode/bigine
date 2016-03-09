/**
 * 声明（画面调度）开始菜单连载游戏事件元信息接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/IStartSeriesMetas.ts
 */

/// <reference path="../../../include/tsd.d.ts" />
/// <reference path="../../Core/_Sprite/IStart.ts" />

namespace Ev {
    import Util = __Bigine_Util;

    export interface IStartSeriesMetas extends Util.IEventMetas<Core.IStart> {
    }
}
