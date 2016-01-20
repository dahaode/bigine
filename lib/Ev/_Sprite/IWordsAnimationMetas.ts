/**
 * 声明（画面调度）某白动画事件元信息接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/IWordsAnimationMetas.ts
 */

/// <reference path="../../../include/tsd.d.ts" />
/// <reference path="../../Core/_Sprite/IWords.ts" />

namespace Ev {
    import Util = __Bigine_Util;
    import G = __Bigine_C2D;

    export interface IWordsAnimationMetas extends Util.IEventMetas<Core.IWords> {
        /**
         * 动画。
         */
        animation: G.Animation;
    }
}
