/**
 * 声明（画面调度）设置菜单关闭事件元信息接口规范。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/ISetCloseMetas.ts
 */

/// <reference path="../../../include/tsd.d.ts" />
/// <reference path="../../Core/_Sprite/ISet.ts" />

namespace Ev {
    import Util = __Bigine_Util;

    export interface ISetCloseMetas extends Util.IEventMetas<Core.ISet> {
    }
}
