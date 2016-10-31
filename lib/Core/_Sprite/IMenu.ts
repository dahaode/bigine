/**
 * 声明画面调度功能菜单组件接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_Sprite/IMenu.ts
 */

/// <reference path="ISprite.ts" />

namespace Core {
    export interface IMenu extends ISprite {
		/**
		 * 显示菜单。
		 */
        u(series: boolean): IMenu;
    }
}
