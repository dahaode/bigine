/**
 * 定义（画面调度）全屏文本动画事件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/FullAnimation.ts
 */

/// <reference path="../Event.ts" />
/// <reference path="IFullAnimationMetas.ts" />

namespace Ev {
    import G = __Bigine_C2D;

    export class FullAnimation extends Event<Core.IFull> {
        /**
         * 动画。
         */
        public animation: G.Animation;

        /**
         * 打字效果动画。。
         */
        public type: G.Animation;

        /**
         * 构造函数。
         */
        constructor(metas: IFullAnimationMetas) {
            super(metas);
            this.animation = metas.animation;
            this.type = metas.type;
        }

        /**
         * 获取类型。
         */
        public gT(): string {
            return 'full.animation';
        }
    }
}
