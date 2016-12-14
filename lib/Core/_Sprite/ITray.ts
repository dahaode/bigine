/**
 * 声明画面调度常驻按钮组件接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_Sprite/ITray.ts
 */

/// <reference path="ISprite.ts" />

namespace Core {
    export interface ITray extends ISprite {
        /**
         * 配置面板。
         */
        u(panel: boolean, review: boolean): ITray;
    }
}
