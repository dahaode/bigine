/**
 * 定义画面调度特写组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Sprite/CG.ts
 */

/// <reference path="Sprite.ts" />

namespace Sprite {
    import Util = __Bigine_Util;
    import G = __Bigine_C2D;

    export class CG extends Sprite {
        /**
         * 配置。
         */
        private _c: G.IBounds;

        /**
         * 构造函数。
         */
        constructor(theme: Util.IHashTable<any>) {
            super(0, 0, 1280, 720);
            this._c = <G.IBounds> theme;
            this.o(0);
        }

        /**
         * 更新图片。
         */
        public u(image: Resource.Resource<HTMLImageElement>): CG {
            return <CG> this.c()
                .a(new G.Image(image.o(), this._c));
        }
    }
}