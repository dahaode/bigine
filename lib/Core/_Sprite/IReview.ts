/**
 * 声明画面调度回看接口规范。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Sprite/IReview.ts
 */

/// <reference path="ISprite.ts" />

namespace Core {
    export interface IReview extends ISprite {
        /**
         * 配置。
         */
        u(): IReview;
    }
}
