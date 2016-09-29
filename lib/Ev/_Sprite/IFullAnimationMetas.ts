/**
 * 声明（画面调度）全屏文本动画事件元信息接口规范。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/IFullAnimationMetas.ts
 */

/// <reference path="../../../include/tsd.d.ts" />
/// <reference path="../../Core/_Sprite/IFull.ts" />

namespace Ev {
    import Util = __Bigine_Util;
    import G = __Bigine_C2D;

    export interface IFullAnimationMetas extends Util.IEventMetas<Core.IFull> {
        /**
         * 动画。
         */
        animation: G.Animation;
        /**
         * 打字效果动画。
         */
        type: G.Animation;
    }
}
