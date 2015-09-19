/**
 * 声明画面动画接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_G/IAnimation.ts
 */

/// <reference path="IGraphicElement.ts" />

namespace Core {
    'use strict';

    export interface IAnimation {
        // constructor(duration: number, metas?: Util.IHashTable<any>);

        /**
         * 链式动画。
         */
        c(next: IAnimation): IAnimation;

        /**
         * 循环。
         */
        l(times?: number): IAnimation;

        /**
         * 执行。
         */
        p(element: IGraphicElement): Promise<IGraphicElement>;

        /**
         * 中止。
         */
        h(): IAnimation;
    }
}
