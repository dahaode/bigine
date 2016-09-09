/**
 * 声明（画面调度）档位菜单存档事件元信息接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/ISlotsSaveMetas.ts
 */

/// <reference path="../../../include/tsd.d.ts" />
/// <reference path="../../Core/_Sprite/ISlots.ts" />

namespace Ev {
    import Util = __Bigine_Util;

    export interface ISlotsSaveMetas extends Util.IEventMetas<Core.ISlots> {
		/**
		 * 档位
		 */
        slot: string;
    }
}
