/**
 * 声明（画面调度）回看关闭事件元信息接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/IReviewCloseMetas.ts
 */

/// <reference path="../../Core/_Sprite/IReview.ts" />

namespace Ev {
    import Util = __Bigine_Util;

    export interface IReviewCloseMetas extends Util.IEventMetas<Core.IReview> {
    }
}
