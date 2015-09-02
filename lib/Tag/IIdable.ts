/**
 * 声明带唯一标识标签接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 */

/// <reference path="ITag.ts" />

module Tag {
    // ITag:b(), ITag:r()
    export interface IIdable extends ITag {
        /**
         * 获取编号。
         */
        gId(): string;

        /**
         * 恢复编号。
         */
        i(id: string): IIdable;
    }
}
