/**
 * 声明画面调度功能选择组件接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_Sprite/IChoose.ts
 */

/// <reference path="ISprite.ts" />
/// <reference path="../_Tag/IOptionTag.ts" />

namespace Core {
    export interface IChoose extends ISprite {
        /**
         * 配置。
         */
        u(options: IOptionTag[]): IChoose;
    }
}
