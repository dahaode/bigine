/**
 * 声明画面调度全屏文本接口规范。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Sprite/IFull.ts
 */

/// <reference path="ISprite.ts" />

namespace Core {
    export interface IFull extends ISprite {
        /**
         * 显示文本内容。
         */
        u(clob: string, auto?: boolean): Promise<IFull>;
    }
}
