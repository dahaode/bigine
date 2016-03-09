/**
 * 声明画面调度开始菜单组件接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_Sprite/IStart.ts
 */

/// <reference path="ISprite.ts" />

namespace Core {
    export interface IStart extends ISprite {
        /**
         * 更新作品标题。
         */
        u(title: string, series: boolean): IStart;
    }
}
