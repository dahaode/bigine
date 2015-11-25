/**
 * 声明动画接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_G/IAnimation.ts
 */

namespace Core {
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
        p(element: any): Promise<any>;

        /**
         * 中止。
         */
        h(): IAnimation;

        /**
         * 暂停。
         */
        w(): IAnimation;

        /**
         * 恢复播放。
         */
        r(): IAnimation;

        /**
         * 获取暂停状态。
         */
        gW(): boolean;
    }
}
