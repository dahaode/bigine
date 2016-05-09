/**
 * 声明画面调度设置菜单组件接口规范。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_Sprite/ISet.ts
 */

/// <reference path="ISprite.ts" />
/// <reference path="../_Runtime/IStates.ts" />

namespace Core {
    export interface ISet extends ISprite {
        /**
         * 显示音乐/音效调节。
         */
        vv(bVolume: number, eVolume: number, on: boolean, duration?: number): Promise<ISet>;
    }
}
