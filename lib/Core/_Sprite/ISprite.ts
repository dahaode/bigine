/**
 * 声明画面调度组件接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_Sprite/ISprite.ts
 */

/// <reference path="../../../include/tsd.d.ts" />
/// <reference path="../_Resource/IResource.ts" />

namespace Core {
    import G = __Bigine_C2D;

    export interface ISprite extends G.Sprite {
        /**
         * 显示。
         */
        v(immediately?: boolean): Promise<ISprite>;

        /**
         * 隐藏。
         */
        h(immediately?: boolean): Promise<ISprite>;

        /**
         * 获取远端资源列表。
         */
        l(): Core.IResource<HTMLImageElement | string>[];
    }
}
