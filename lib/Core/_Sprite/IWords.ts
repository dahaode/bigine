/**
 * 声明画面调度某白接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Sprite/IWords.ts
 */

/// <reference path="ISprite.ts" />
/// <reference path="../_Resource/IResource.ts" />

namespace Core {
    export interface IWords extends ISprite {
        /**
         * 旁白。
         */
        vv(clob: string, auto?: boolean): Promise<IWords>;

        /**
         * 独白。
         */
        vm(avatar: IResource<HTMLImageElement>, name: string, clob: string, auto?: boolean): Promise<IWords>;

        /**
         * 对白。
         */
        vs(avatar: IResource<HTMLImageElement>, name: string, clob: string, auto?: boolean): Promise<IWords>;
    }
}
