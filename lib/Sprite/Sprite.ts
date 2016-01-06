/**
 * 定义画面调度抽象组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Sprite/Sprite.ts
 */

/// <reference path="../../include/tsd.d.ts" />

namespace Sprite {
    import G = __Bigine_C2D;

    export abstract class Sprite extends G.Sprite {
        /**
         * 显示。
         */
        public v(immediately: boolean = false): Promise<Sprite> {
            if (immediately)
                this.o(1);
            if (this._o)
                return Promise.resolve(this);
            return <Promise<Sprite>> this.p(new G.FadeIn(500));
        }

        /**
         * 隐藏。
         */
        public h(immediately: boolean = false): Promise<Sprite> {
            if (immediately)
                this.o(0);
            if (!this._o)
                return Promise.resolve(this);
            return <Promise<Sprite>> this.p(new G.FadeOut(500));
        }
    }
}
