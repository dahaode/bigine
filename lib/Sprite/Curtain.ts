/**
 * 定义画面调度幕帘组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Sprite/Curtain.ts
 */

/// <reference path="Sprite.ts" />

namespace Sprite {
    import G = __Bigine_C2D;

    export class Curtain extends Sprite {
        /**
         * 构造函数。
         */
        constructor(color: string = '#000') {
            let w: number = 1280,
                h: number = 720;
            super(0, 0, w, h);
            this.a(new G.Color(0, 0, w, h, color));
        }
    }
}
