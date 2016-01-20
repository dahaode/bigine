/**
 * 定义（画面调度）某白动画事件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/WordsAnimation.ts
 */

/// <reference path="../Event.ts" />
/// <reference path="IWordsAnimationMetas.ts" />

namespace Ev {
    import G = __Bigine_C2D;

    export class WordsAnimation extends Event<Core.IWords> {
        /**
         * 动画。
         */
        public animation: G.Animation;

        /**
         * 构造函数。
         */
        constructor(metas: IWordsAnimationMetas) {
            super(metas);
            this.animation = metas.animation;
        }

        /**
         * 获取类型。
         */
        public gT(): string {
            return 'words.animation';
        }
    }
}
